import crypto from "crypto";

/**
 * Short-lived, HMAC-signed tokens that authorize a single (userId, session
 * code) pair to open the voice-chat Socket.IO connection.
 *
 * Socket.IO's handshake doesn't naturally carry the same-site session cookie
 * the way plain `fetch` calls to /api do inside this app's iframe-proxied
 * environment, so instead of teaching the socket layer to re-verify Clerk
 * sessions, we issue a token from an already-authenticated REST call
 * (which *does* use the normal cookie session) and have the socket layer
 * verify just this token. The token is scoped to one session code and
 * expires quickly, so it can't be reused elsewhere or after the fact.
 */

const TOKEN_TTL_MS = 6 * 60 * 60 * 1000; // 6h — comfortably longer than any single competition

function getSecret(): string {
  const secret = process.env["SESSION_SECRET"];
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is required but was not provided.");
  }
  return secret;
}

export type VoiceTokenPayload = {
  userId: string;
  code: string;
  exp: number; // unix ms
};

export function signVoiceToken(payload: Omit<VoiceTokenPayload, "exp">): { token: string; expiresAt: number } {
  const exp = Date.now() + TOKEN_TTL_MS;
  const full: VoiceTokenPayload = { ...payload, exp };
  const body = Buffer.from(JSON.stringify(full)).toString("base64url");
  const signature = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  return { token: `${body}.${signature}`, expiresAt: exp };
}

export function verifyVoiceToken(token: string): VoiceTokenPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, signature] = parts as [string, string];

  const expectedSignature = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as VoiceTokenPayload;
    if (typeof payload.userId !== "string" || typeof payload.code !== "string" || typeof payload.exp !== "number") {
      return null;
    }
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
