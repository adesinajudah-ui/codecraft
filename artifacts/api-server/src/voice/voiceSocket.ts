import type { Server as SocketIOServer, Socket } from "socket.io";
import { db } from "@workspace/db";
import { quizSessionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { verifyVoiceToken } from "./voiceToken";
import { getVoiceRoom, type VoiceParticipantState } from "./voiceRoom";
import { logger } from "../lib/logger";

/** Socket.IO room name for a competition's voice call. */
function roomName(code: string): string {
  return `voice:${code}`;
}

type VoiceSocketData = {
  userId: string;
  code: string;
  displayName: string;
};

function toPeerPayload(p: VoiceParticipantState) {
  return { userId: p.userId, displayName: p.displayName, muted: p.muted, speaking: p.speaking };
}

export function registerVoiceSignaling(io: SocketIOServer): void {
  io.on("connection", (socket: Socket) => {
    let joined: VoiceSocketData | null = null;

    // The client authenticates by presenting the signed token it fetched
    // from POST /quiz/sessions/:code/voice/token (an authenticated REST
    // call). We validate it here rather than trusting anything the client
    // claims about who it is or which room it belongs to.
    socket.on("voice_join", async (raw: unknown, ack?: (res: { ok: boolean; error?: string }) => void) => {
      try {
        const { token } = (raw ?? {}) as { token?: string };
        const payload = token ? verifyVoiceToken(token) : null;
        if (!payload) {
          ack?.({ ok: false, error: "Invalid or expired voice token" });
          socket.disconnect(true);
          return;
        }

        const room = getVoiceRoom(payload.code);
        if (!room || !room.active) {
          ack?.({ ok: false, error: "Voice chat is not active for this session" });
          socket.disconnect(true);
          return;
        }

        // Re-validate the participant against the live DB row — the token
        // only proves who issued the request, not that they're still a
        // participant in good standing (e.g. they could have been removed).
        const rows = await db.select().from(quizSessionsTable).where(eq(quizSessionsTable.code, payload.code)).limit(1);
        const session = rows[0];
        const participant = session?.participants.find((p) => p.userId === payload.userId);
        if (!session || !participant) {
          ack?.({ ok: false, error: "You are not a participant in this session" });
          socket.disconnect(true);
          return;
        }

        joined = { userId: payload.userId, code: payload.code, displayName: participant.displayName };
        (socket.data as VoiceSocketData) = joined;

        const existingPeers = Array.from(room.participants.values()).filter((p) => p.userId !== joined!.userId);

        room.participants.set(joined.userId, {
          userId: joined.userId,
          displayName: joined.displayName,
          socketId: socket.id,
          muted: false,
          speaking: false,
        });

        await socket.join(roomName(payload.code));

        ack?.({ ok: true });

        // Tell the newcomer who's already in the room so it can initiate
        // WebRTC offers to each of them.
        socket.emit("voice_room_state", {
          selfUserId: joined.userId,
          isHost: session.hostUserId === joined.userId,
          peers: existingPeers.map(toPeerPayload),
        });

        // Tell everyone else a new peer arrived so they can expect an offer.
        socket.to(roomName(payload.code)).emit("voice_peer_joined", toPeerPayload(room.participants.get(joined.userId)!));
      } catch (err) {
        logger.error({ err }, "voice_join failed");
        ack?.({ ok: false, error: "Internal error joining voice chat" });
        socket.disconnect(true);
      }
    });

    // ── WebRTC signaling relay (mesh topology) ────────────────────────────
    // The server never inspects SDP/ICE contents — it just relays them to
    // the intended peer, scoped to sockets that have actually joined this
    // room, so no signaling can cross between competitions.
    socket.on("voice_signal", (raw: unknown) => {
      if (!joined) return;
      const { toUserId, kind, data } = (raw ?? {}) as { toUserId?: string; kind?: string; data?: unknown };
      if (!toUserId || !kind) return;
      const room = getVoiceRoom(joined.code);
      const target = room?.participants.get(toUserId);
      if (!target?.socketId) return;
      io.to(target.socketId).emit("voice_signal", { fromUserId: joined.userId, kind, data });
    });

    socket.on("voice_mute", (raw: unknown) => {
      if (!joined) return;
      const { muted } = (raw ?? {}) as { muted?: boolean };
      const room = getVoiceRoom(joined.code);
      const self = room?.participants.get(joined.userId);
      if (!self) return;
      self.muted = Boolean(muted);
      socket.to(roomName(joined.code)).emit("voice_peer_mute", { userId: joined.userId, muted: self.muted });
    });

    // Lightweight, client-computed speaking indicator (based on local mic
    // volume analysis) — throttled on the client before it ever reaches here.
    socket.on("voice_speaking", (raw: unknown) => {
      if (!joined) return;
      const { speaking } = (raw ?? {}) as { speaking?: boolean };
      const room = getVoiceRoom(joined.code);
      const self = room?.participants.get(joined.userId);
      if (!self) return;
      self.speaking = Boolean(speaking);
      socket.to(roomName(joined.code)).emit("voice_peer_speaking", { userId: joined.userId, speaking: self.speaking });
    });

    // Host-only: remove a disruptive participant from the voice room.
    socket.on("voice_kick", (raw: unknown) => {
      if (!joined) return;
      const room = getVoiceRoom(joined.code);
      if (!room || room.hostUserId !== joined.userId) return;
      const { userId: targetUserId } = (raw ?? {}) as { userId?: string };
      if (!targetUserId || targetUserId === joined.userId) return;
      const target = room.participants.get(targetUserId);
      if (!target?.socketId) return;
      io.to(target.socketId).emit("voice_kicked");
      io.sockets.sockets.get(target.socketId)?.disconnect(true);
    });

    socket.on("voice_leave", () => {
      socket.disconnect(true);
    });

    socket.on("disconnect", () => {
      if (!joined) return;
      const room = getVoiceRoom(joined.code);
      if (room?.participants.get(joined.userId)?.socketId === socket.id) {
        room.participants.delete(joined.userId);
        socket.to(roomName(joined.code)).emit("voice_peer_left", { userId: joined.userId });
      }
    });
  });
}
