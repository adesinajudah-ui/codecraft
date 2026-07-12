import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { getVoiceToken } from "@workspace/api-client-react";

const STUN_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
];

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
 * Peer-to-peer (mesh) WebRTC group voice chat for a competition room.
 *
 * Each participant opens a direct RTCPeerConnection to every other
 * participant; audio never touches the server. Socket.IO is only used to
 * exchange signaling messages (who's in the room, SDP offers/answers, ICE
 * candidates, mute/speaking/kick notifications) — small, infrequent
 * messages that tolerate Socket.IO's automatic polling fallback and
 * reconnection just fine, unlike the audio stream itself.
 *
 * A mesh scales to roughly 6-8 simultaneous participants before per-peer
 * upload bandwidth and CPU usage become a problem; this is a deliberate
 * trade-off to avoid needing a self-hosted media relay server.
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
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const analyserCleanupRef = useRef<(() => void) | null>(null);
  const joinedRef = useRef(false);

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
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
      const nowSpeaking = avg > 12; // empirical threshold for voice activity
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

  function getOrCreatePeerConnection(socket: Socket, peerUserId: string): RTCPeerConnection {
    let pc = peerConnectionsRef.current.get(peerUserId);
    if (pc) return pc;

    pc = new RTCPeerConnection({ iceServers: STUN_SERVERS });
    peerConnectionsRef.current.set(peerUserId, pc);

    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) {
        pc.addTrack(track, streamRef.current);
      }
    }

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("voice_signal", { toUserId: peerUserId, kind: "ice-candidate", data: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      let audioEl = audioElementsRef.current.get(peerUserId);
      if (!audioEl) {
        audioEl = new Audio();
        audioEl.autoplay = true;
        audioElementsRef.current.set(peerUserId, audioEl);
      }
      audioEl.srcObject = event.streams[0] ?? null;
    };

    return pc;
  }

  async function makeOfferTo(socket: Socket, peerUserId: string) {
    const pc = getOrCreatePeerConnection(socket, peerUserId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit("voice_signal", { toUserId: peerUserId, kind: "offer", data: offer });
  }

  const join = useCallback(async () => {
    if (!sessionCode || !selfUserId || joinedRef.current) return;
    setError(null);
    setStatus("requesting-mic");

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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

    socket.on("voice_room_state", (payload: { selfUserId: string; isHost: boolean; peers: VoicePeer[] }) => {
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
      // Initiate offers to everyone already in the room.
      for (const peer of payload.peers) {
        void makeOfferTo(socket, peer.userId);
      }
    });

    socket.on("voice_peer_joined", (peer: VoicePeer) => {
      setPeers((prev) => new Map(prev).set(peer.userId, peer));
      // The newcomer initiates the offer to us; we just wait for it.
    });

    socket.on("voice_peer_left", ({ userId }: { userId: string }) => {
      const pc = peerConnectionsRef.current.get(userId);
      pc?.close();
      peerConnectionsRef.current.delete(userId);
      const audioEl = audioElementsRef.current.get(userId);
      if (audioEl) {
        audioEl.pause();
        audioEl.srcObject = null;
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

    socket.on("voice_signal", async ({ fromUserId, kind, data }: { fromUserId: string; kind: string; data: unknown }) => {
      const pc = getOrCreatePeerConnection(socket, fromUserId);
      if (kind === "offer") {
        await pc.setRemoteDescription(new RTCSessionDescription(data as RTCSessionDescriptionInit));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("voice_signal", { toUserId: fromUserId, kind: "answer", data: answer });
      } else if (kind === "answer") {
        await pc.setRemoteDescription(new RTCSessionDescription(data as RTCSessionDescriptionInit));
      } else if (kind === "ice-candidate") {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(data as RTCIceCandidateInit));
        } catch {
          /* benign if it arrives before setRemoteDescription in rare races */
        }
      }
    });

    socket.on("voice_kicked", () => {
      setError("You were removed from the voice chat by the host.");
      setStatus("idle");
      cleanup();
    });

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect" || reason === "io client disconnect") return;
      // Any other reason: socket.io will auto-reconnect and `rejoin` fires again on `connect`.
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
