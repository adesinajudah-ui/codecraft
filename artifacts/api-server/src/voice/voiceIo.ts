import type { Server as SocketIOServer } from "socket.io";

/**
 * Small singleton holder for the Socket.IO server instance.
 *
 * The HTTP server (and therefore the Socket.IO server bound to it) is
 * created in index.ts at process startup, but REST route handlers in
 * routes/quiz.ts also need to reach into active voice-room sockets (e.g. to
 * force-disconnect everyone when the host ends the call, or the competition
 * finishes). Rather than threading `io` through every router factory, we
 * stash it here once at startup and read it from route handlers.
 */

let io: SocketIOServer | undefined;

export function setVoiceIo(server: SocketIOServer): void {
  io = server;
}

export function getVoiceIo(): SocketIOServer | undefined {
  return io;
}
