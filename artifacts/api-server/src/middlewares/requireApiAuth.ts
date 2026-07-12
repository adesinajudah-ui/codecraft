import type { RequestHandler } from "express";
import { getAuth } from "@clerk/express";

/**
 * Drop-in replacement for Clerk's deprecated `requireAuth()` that behaves
 * correctly for an API server.
 *
 * `requireAuth()` redirects (302) unauthenticated requests to the Clerk
 * sign-in URL, which is wrong for a JSON API — callers get back an HTML page
 * instead of a JSON error, causing clients to crash when they try to parse it.
 *
 * This middleware inspects `req.auth` (populated by `clerkMiddleware()`) and
 * returns a plain 401 JSON response when there is no authenticated userId,
 * so API clients can handle the error correctly.
 */
export function requireApiAuth(): RequestHandler {
  return (req, res, next) => {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    next();
  };
}
