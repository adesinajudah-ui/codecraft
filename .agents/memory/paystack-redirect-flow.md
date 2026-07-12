---
name: Paystack redirect/Standard Checkout pattern
description: How to wire Paystack payments server-side without a frontend SDK, and how to get a verified user email for the transaction.
---

Use Paystack's Standard Checkout (redirect) flow instead of Inline.js when the app has no public key configured yet: backend calls `POST /transaction/initialize` with only `PAYSTACK_SECRET_KEY`, browser does a full redirect to the returned `authorization_url`, and on return the backend calls `GET /transaction/verify/:reference`. This needs zero frontend Paystack code and no public key.

**Why:** Avoids depending on a public key / client-side script tag, keeps all payment logic server-side, and works even before the user has added Paystack keys (the initialize call just 503s until then).

**How to apply:**
- Let the frontend pass its own base-path-aware `returnUrl` (e.g. `${origin}${BASE_URL}/wallet`) in the initialize request body, and have the backend append `?reference=<generated>` to it — don't hardcode a callback path server-side, since artifacts are mounted under a routing prefix the server doesn't know about.
- Server must generate the `reference` itself (never trust client-supplied references) and store it before calling Paystack.
- Verify endpoint should be idempotent: guard the credit with `UPDATE ... WHERE status = 'pending'` inside a transaction so a repeated verify call (e.g. user refreshing the return page) can't double-credit.
- Don't rely on Clerk's `sessionClaims` for the user's email (not reliably populated) — fetch it via `clerkClient.users.getUser(userId)` and pick the address matching `primaryEmailAddressId`, falling back to the first address.
