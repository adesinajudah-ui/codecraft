/**
 * In-memory state for competition voice-chat rooms.
 *
 * One voice room maps 1:1 to a quiz session `code`. State lives only in
 * process memory (same pattern as `sseClients` / `questionStartTimes` in
 * routes/quiz.ts) — it resets on server restart, which is acceptable since
 * a restart also drops the SSE connections and Socket.IO sockets that would
 * back it.
 */

export type VoiceParticipantState = {
  userId: string;
  displayName: string;
  socketId: string | null;
  muted: boolean;
  speaking: boolean;
};

export type VoiceRoomState = {
  code: string;
  hostUserId: string;
  active: boolean;
  startedAt: number | null;
  participants: Map<string, VoiceParticipantState>;
};

const voiceRooms = new Map<string, VoiceRoomState>();

export function getVoiceRoom(code: string): VoiceRoomState | undefined {
  return voiceRooms.get(code);
}

export function getOrCreateVoiceRoom(code: string, hostUserId: string): VoiceRoomState {
  let room = voiceRooms.get(code);
  if (!room) {
    room = { code, hostUserId, active: false, startedAt: null, participants: new Map() };
    voiceRooms.set(code, room);
  }
  return room;
}

export function startVoiceRoom(code: string, hostUserId: string): VoiceRoomState {
  const room = getOrCreateVoiceRoom(code, hostUserId);
  room.active = true;
  room.startedAt = Date.now();
  return room;
}

/** Ends the room, clearing participants. Returns the (now inactive) room, or undefined if it never existed. */
export function endVoiceRoom(code: string): VoiceRoomState | undefined {
  const room = voiceRooms.get(code);
  if (!room) return undefined;
  room.active = false;
  room.startedAt = null;
  room.participants.clear();
  return room;
}

export function deleteVoiceRoom(code: string): void {
  voiceRooms.delete(code);
}

export function serializeVoiceRoom(room: VoiceRoomState) {
  return {
    active: room.active,
    hostUserId: room.hostUserId,
    startedAt: room.startedAt ? new Date(room.startedAt).toISOString() : null,
    participants: Array.from(room.participants.values()).map((p) => ({
      userId: p.userId,
      displayName: p.displayName,
      muted: p.muted,
      speaking: p.speaking,
    })),
  };
}

export function emptyVoiceStatus(hostUserId: string) {
  return { active: false, hostUserId, startedAt: null, participants: [] as ReturnType<typeof serializeVoiceRoom>["participants"] };
}
