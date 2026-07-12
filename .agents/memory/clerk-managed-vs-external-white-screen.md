---
name: Clerk managed-vs-external white screen
description: Production app shows a blank white screen after publish when Clerk auth is involved — how to diagnose whether it's a managed/external Clerk mismatch or missing proxy wiring.
---

## Symptom

Published app loads the HTML shell and static assets fine (200s everywhere), API health checks pass, but the page never renders — just white. Preview/dev works fine.

## Root causes seen

1. **User manually swapped Replit-managed Clerk secrets for their own external Clerk keys** (e.g. to "test" something), not realizing the app's backend was built around Replit's Clerk proxy pattern (`clerkProxyMiddleware.ts`, `/api/__clerk`). `checkClerkManagementStatus()` then correctly reports `"external"`.
2. Even with correct managed secrets, the **client-side code was missing `proxyUrl` on `<ClerkProvider>`** and used the raw env var instead of `publishableKeyFromHost(...)` from `@clerk/react/internal`. Without `proxyUrl`, Clerk's JS SDK tries to load its script directly from the FAPI domain baked into the publishable key (a `clerk.<repl-name>.replit.app` subdomain) — which is not a real DNS entry Replit users can create, since Replit owns `*.replit.app`. The SDK hangs/fails silently and React never mounts past the loading state → white screen.

**Why:** decoding a `pk_live_...` key (base64, minus the trailing `$`) reveals the Frontend API domain Clerk's SDK will try to hit directly unless a `proxyUrl` reroutes it through the app's own server.

## How to apply

- If the user says they changed Clerk keys "to test something" and now prod is broken, ask whether they intended Replit-managed or their own Clerk account. If they want managed restored, call `setupClerkWhitelabelAuth()` again (idempotent) — it resets `CLERK_SECRET_KEY` / `CLERK_PUBLISHABLE_KEY` / `VITE_CLERK_PUBLISHABLE_KEY` to the Replit-managed values.
- Always re-diff the client `ClerkProvider` wiring against the clerk-auth skill's canonical snippet after any such fix — `proxyUrl` and `publishableKeyFromHost` are easy to lose in earlier edits and only bite in production (dev doesn't need the proxy).
- A quick way to confirm this class of bug from the outside: `curl` the production JS bundle for `pk_live_`/`pk_test_` strings, base64-decode to find the encoded FAPI domain, then check whether a plain `curl -I` to that domain resolves/serves — if it fails, the client is missing `proxyUrl`.
