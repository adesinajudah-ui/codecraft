/**
 * Socket.IO is mounted under the API's own `/api` prefix (same as every
 * REST route) so the shared artifact proxy routes both the HTTP polling
 * fallback and the WebSocket upgrade to this service rather than the
 * frontend's dev server.
 */
export const VOICE_SOCKET_PATH = "/api/socket.io/";
