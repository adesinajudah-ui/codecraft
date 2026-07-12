import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { getVoiceToken } from "@workspace/api-client-react";

const STUN_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
];

/** Audio constraints tuned for voice — echo cancellation, noise suppression, auto-gain. */
const AUDIO_CONSTRAINTS: MediaTrackConstraints = {
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
};

export type VoicePeer = {
  userId: string;
  displayName: string;
  muted: boolean;
  speaking: boolean;
};

export type VoiceChatStatus = "idle" | "requesting-mic" | "connecting" | "joined" | "error";

interface UseVoiceChatOptions {
  courseId: string;
  sessionCode: string;
  selfUserId: string | undefined;
}

/**
 * Per-peer signaling state needed for Perfect Negotiation.
 *
 * Perfect Negotiation (RFC 8829 §4.1) lets both peers offer simultaneously
 * without coordination: one peer is "polite" (will rollback its own offer to
 * accept the remote one if there is a collision) and the other is "impolite"
 * (ignores incoming offers when it already has one in flight). The polite
 * peer is whichever has the lexicographically smaller userId — a purely
 * local, deterministic rule that never needs a server round-trip.
 *
 * ICE candidates that arrive before setRemoteDescription completes are
 * queued here and flushed immediately after the description is applied.
 */
interface PeerMeta {
  makingOffer: boolean;
  pendingCandidates: RTCIceCandidateInit[];
}

/**
 * Peer-to-peer (mesh) WebRTC group voice chat for a competition room.
 *
 * Each participant opens a direct RTCPeerConnection to every other
 * participant; audio never touches the server. Socket.IO is used only for
 * signaling (SDP offers/answers, ICE candidates, mute/speaking/kick).
 *
 * Connection topology: every peer makes offers to every other peer as soon
 * as they appear. Perfect Negotiation handles the resulting glare so no
 * server coordination is needed to decide who offers first. This means both
 * the HOST and every JOINER always attempt to connect — removing the
 * old "newcomer-only" asymmetry that caused hosts to miss connections.
 */
export function useVoiceChat({ courseId, sessionCode, selfUserId }: UseVoiceChatOptions) {
  const [status, setStatus] = useState<VoiceChatStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [peers, setPeers] = useState<Map<string, VoicePeer>>(new Map());
  const [selfMuted, setSelfMuted] = useState(false);
  const [selfSpeaking, setSelfSpeaking] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const socketRef = useRef<Socket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const selfUserIdRef = useRef<string | undefined>(selfUserId);
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());
  const peerMetaRef = useRef<Map<string, PeerMeta>>(new Map());
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const analyserCleanupRef = useRef<(() => void) | null>(null);
  const joinedRef = useRef(false);

  // Keep selfUserIdRef current for use in async callbacks
  useEffect(() => { selfUserIdRef.current = selfUserId; }, [selfUserId]);

  // ── Cleanup ────────────────────────────────────────────────────────────────
  const cleanup = useCallback(() => {
    joinedRef.current = false;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    analyserCleanupRef.current?.();
    analyserCleanupRef.current = null;

    for (const pc of peerConnectionsRef.current.values()) pc.close();
    peerConnectionsRef.current.clear();
    peerMetaRef.current.clear();

    for (const audioEl of audioElementsRef.current.values()) {
      audioEl.pause();
      audioEl.srcObject = null;
      audioEl.remove();
    }
    audioElementsRef.current.clear();

    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;

    socketRef.current?.disconnect();
    socketRef.current = null;

    setPeers(new Map());
    setSelfMuted(false);
    setSelfSpeaking(false);
    setElapsedSeconds(0);
  }, []);

  useEffect(() => cleanup, [cleanup]);

  // ── Local speaking indicator (mic volume analysis) ─────────────────────────
  function attachSpeakingDetector(stream: MediaStream, onSpeaking: (speaking: boolean) => void) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioCtx = new AudioCtx();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);

    let speaking = false;
    let raf = 0;
    const tick = () => {
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      const nowSpeaking = avg > 12;
      if (nowSpeaking !== speaking) {
        speaking = nowSpeaking;
        onSpeaking(speaking);
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      source.disconnect();
      analyser.disconnect();
      void audioCtx.close();
    };
  }

  // ── Per-peer meta ──────────────────────────────────────────────────────────
  function getPeerMeta(userId: string): PeerMeta {
    let meta = peerMetaRef.current.get(userId);
    if (!meta) {
      meta = { makingOffer: false, pendingCandidates: [] };
      peerMetaRef.current.set(userId, meta);
    }
    return meta;
  }

  // ── RTCPeerConnection factory ──────────────────────────────────────────────
  /**
   * Returns an existing PC for peerUserId, or creates a fresh one.
   *
   * The `onnegotiationneeded` handler implements the *offerer* side of
   * Perfect Negotiation: it fires automatically whenever the browser decides
   * negotiation is required (e.g. after addTrack), so we never call
   * createOffer manually. Both sides run this same logic; the polite/impolite
   * role (based on userId comparison) resolves any glare collision.
   */
  function getOrCreatePeerConnection(socket: Socket, peerUserId: string): RTCPeerConnection {
    let pc = peerConnectionsRef.current.get(peerUserId);
    if (pc) return pc;

    pc = new RTCPeerConnection({ iceServers: STUN_SERVERS });
    peerConnectionsRef.current.set(peerUserId, pc);

    // Add all local audio tracks so the remote side can hear us
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) {
        pc.addTrack(track, streamRef.current);
      }
    }

    // ── Perfect Negotiation — offerer side ────────────────────────────────
    pc.onnegotiationneeded = async () => {
      const meta = getPeerMeta(peerUserId);
      try {
        meta.makingOffer = true;
        // setLocalDescription without args creates the right type automatically
        await pc!.setLocalDescription();
        socket.emit("voice_signal", {
          toUserId: peerUserId,
          kind: "offer",
          data: pc!.localDescription,
        });
      } catch (err) {
        console.error("[voice] onnegotiationneeded failed:", err);
      } finally {
        meta.makingOffer = false;
      }
    };

    // ICE candidates: send immediately once gathered
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("voice_signal", {
          toUserId: peerUserId,
          kind: "ice-candidate",
          data: event.candidate,
        });
      }
    };

    // Remote audio: must be appended to the DOM or browsers block autoplay
    pc.ontrack = (event) => {
      let audioEl = audioElementsRef.current.get(peerUserId);
      if (!audioEl) {
        audioEl = new Audio();
        audioEl.autoplay = true;
        audioEl.volume = 1.0;
        // Detached Audio elements are blocked by autoplay policy in Chrome/Safari.
        // Attaching to the DOM lets the browser play without a user gesture.
        document.body.appendChild(audioEl);
        audioElementsRef.current.set(peerUserId, audioEl);
      }
      // Always update srcObject — the track event can fire multiple times
      audioEl.srcObject = event.streams[0] ?? null;
      // Explicitly start playback; some browsers need this after srcObject is set
      audioEl.play().catch(() => {
        // Autoplay blocked: will play once the user interacts with the page
      });
    };

    pc.onconnectionstatechange = () => {
      if (pc!.connectionState === "failed") {
        // Attempt ICE restart so the connection can recover without re-signaling
        pc!.restartIce();
      }
    };

    return pc;
  }

  // ── Main join flow ─────────────────────────────────────────────────────────
  const join = useCallback(async () => {
    if (!sessionCode || !selfUserId || joinedRef.current) return;
    setError(null);
    setStatus("requesting-mic");

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: AUDIO_CONSTRAINTS });
    } catch {
      setStatus("error");
      setError("Microphone access was denied. You can still take the quiz without voice chat.");
      return;
    }
    streamRef.current = stream;
    analyserCleanupRef.current = attachSpeakingDetector(stream, (speaking) => {
      setSelfSpeaking(speaking);
      socketRef.current?.emit("voice_speaking", { speaking });
    });

    setStatus("connecting");

    let tokenRes;
    try {
      tokenRes = await getVoiceToken(sessionCode);
    } catch {
      setStatus("error");
      setError("Couldn't start voice chat — please try again.");
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      return;
    }

    const basePath = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
    const socket = io(window.location.origin, {
      path: `${basePath}${tokenRes.socketPath}`.replace(/\/{2,}/g, "/"),
      withCredentials: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });
    socketRef.current = socket;

    const rejoin = () => {
      socket.emit("voice_join", { token: tokenRes!.token }, (res: { ok: boolean; error?: string }) => {
        if (!res.ok) {
          setStatus("error");
          setError(res.error ?? "Could not join the voice room.");
          cleanup();
        }
      });
    };

    socket.on("connect", rejoin);

    // ── voice_room_state: we just joined — connect to everyone already here ──
    socket.on(
      "voice_room_state",
      (payload: { selfUserId: string; isHost: boolean; peers: VoicePeer[] }) => {
        joinedRef.current = true;
        setIsHost(payload.isHost);
        setStatus("joined");
        setPeers((prev) => {
          const next = new Map(prev);
          for (const p of payload.peers) next.set(p.userId, p);
          return next;
        });
        if (!timerRef.current) {
          timerRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
        }
        // Create PCs for everyone already in the room.
        // onnegotiationneeded fires automatically after addTrack inside
        // getOrCreatePeerConnection, so both sides will send offers. Perfect
        // Negotiation (in voice_signal) resolves any glare collision.
        for (const peer of payload.peers) {
          getOrCreatePeerConnection(socket, peer.userId);
        }
      }
    );

    // ── voice_peer_joined: a new participant arrived — initiate connection ───
    // Previously this handler just waited for the newcomer's offer, which
    // meant the HOST (who receives this event) was entirely passive. Now both
    // sides call getOrCreatePeerConnection, which fires onnegotiationneeded
    // on both ends. Perfect Negotiation handles the resulting glare.
    socket.on("voice_peer_joined", (peer: VoicePeer) => {
      setPeers((prev) => new Map(prev).set(peer.userId, peer));
      getOrCreatePeerConnection(socket, peer.userId);
    });

    socket.on("voice_peer_left", ({ userId }: { userId: string }) => {
      const pc = peerConnectionsRef.current.get(userId);
      pc?.close();
      peerConnectionsRef.current.delete(userId);
      peerMetaRef.current.delete(userId);
      const audioEl = audioElementsRef.current.get(userId);
      if (audioEl) {
        audioEl.pause();
        audioEl.srcObject = null;
        audioEl.remove();
        audioElementsRef.current.delete(userId);
      }
      setPeers((prev) => {
        const next = new Map(prev);
        next.delete(userId);
        return next;
      });
    });

    socket.on("voice_peer_mute", ({ userId, muted }: { userId: string; muted: boolean }) => {
      setPeers((prev) => {
        const next = new Map(prev);
        const p = next.get(userId);
        if (p) next.set(userId, { ...p, muted });
        return next;
      });
    });

    socket.on("voice_peer_speaking", ({ userId, speaking }: { userId: string; speaking: boolean }) => {
      setPeers((prev) => {
        const next = new Map(prev);
        const p = next.get(userId);
        if (p) next.set(userId, { ...p, speaking });
        return next;
      });
    });

    // ── Perfect Negotiation — answerer side ───────────────────────────────────
    //
    // Both peers now send offers (via onnegotiationneeded). The "polite" peer
    // (lexicographically smaller userId) will rollback its own offer to accept
    // the remote offer when there is a collision. The "impolite" peer ignores
    // an incoming offer when one of its own is already in flight.
    //
    // ICE candidates that arrive before setRemoteDescription completes are
    // queued in PeerMeta.pendingCandidates and flushed right after.
    socket.on(
      "voice_signal",
      async ({
        fromUserId,
        kind,
        data,
      }: {
        fromUserId: string;
        kind: string;
        data: unknown;
      }) => {
        const myId = selfUserIdRef.current ?? "";
        const polite = myId < fromUserId; // deterministic, no coordination needed
        const pc = getOrCreatePeerConnection(socket, fromUserId);
        const meta = getPeerMeta(fromUserId);

        if (kind === "offer") {
          // Glare: we already have a local offer in flight
          const offerCollision = pc.signalingState !== "stable" || meta.makingOffer;
          if (offerCollision) {
            if (!polite) {
              // Impolite: ignore the incoming offer — our offer takes priority
              return;
            }
            // Polite: rollback our offer so we can accept the remote one
            await Promise.all([
              pc.setLocalDescription({ type: "rollback" }),
              pc.setRemoteDescription(new RTCSessionDescription(data as RTCSessionDescriptionInit)),
            ]);
          } else {
            await pc.setRemoteDescription(new RTCSessionDescription(data as RTCSessionDescriptionInit));
          }

          // Flush any ICE candidates that arrived before the remote description
          for (const c of meta.pendingCandidates) {
            await pc.addIceCandidate(c).catch(() => {});
          }
          meta.pendingCandidates = [];

          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit("voice_signal", { toUserId: fromUserId, kind: "answer", data: pc.localDescription });

        } else if (kind === "answer") {
          await pc.setRemoteDescription(new RTCSessionDescription(data as RTCSessionDescriptionInit));

          // Flush queued ICE candidates now that remote description is set
          for (const c of meta.pendingCandidates) {
            await pc.addIceCandidate(c).catch(() => {});
          }
          meta.pendingCandidates = [];

        } else if (kind === "ice-candidate") {
          if (pc.remoteDescription) {
            // Remote description already set — add immediately
            await pc.addIceCandidate(new RTCIceCandidate(data as RTCIceCandidateInit)).catch(() => {});
          } else {
            // Queue until setRemoteDescription completes (avoids silent drops)
            meta.pendingCandidates.push(data as RTCIceCandidateInit);
          }
        }
      }
    );

    socket.on("voice_kicked", () => {
      setError("You were removed from the voice chat by the host.");
      setStatus("idle");
      cleanup();
    });

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect" || reason === "io client disconnect") return;
      // Other reasons: socket.io auto-reconnects and fires "connect" → rejoin() runs again
    });
  }, [sessionCode, selfUserId, cleanup, courseId]);

  const leave = useCallback(() => {
    socketRef.current?.emit("voice_leave");
    cleanup();
    setStatus("idle");
  }, [cleanup]);

  const toggleMute = useCallback(() => {
    setSelfMuted((prev) => {
      const next = !prev;
      streamRef.current?.getAudioTracks().forEach((t) => (t.enabled = !next));
      socketRef.current?.emit("voice_mute", { muted: next });
      return next;
    });
  }, []);

  const kick = useCallback((userId: string) => {
    socketRef.current?.emit("voice_kick", { userId });
  }, []);

  return {
    status,
    error,
    peers: Array.from(peers.values()),
    selfMuted,
    selfSpeaking,
    isHost,
    elapsedSeconds,
    join,
    leave,
    toggleMute,
    kick,
  };
}
