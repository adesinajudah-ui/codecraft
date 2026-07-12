import http from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import { logger } from "./lib/logger";
import { seedDatabase } from "./seed";
import { registerVoiceSignaling } from "./voice/voiceSocket";
import { setVoiceIo } from "./voice/voiceIo";
import { VOICE_SOCKET_PATH } from "./voice/constants";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Voice chat signaling needs a raw HTTP server to attach Socket.IO to
// (it upgrades some of the same connections Express is listening on).
const httpServer = http.createServer(app);

const io = new SocketIOServer(httpServer, {
  path: VOICE_SOCKET_PATH,
  cors: { origin: true, credentials: true },
});
setVoiceIo(io);
registerVoiceSignaling(io);

httpServer.listen(port, async (err?: Error) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");

  try {
    await seedDatabase();
  } catch (e) {
    logger.error({ err: e }, "Seed failed");
  }
});
