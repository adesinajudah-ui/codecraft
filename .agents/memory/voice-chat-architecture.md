---
name: CodeCraft competition voice chat architecture
description: Why the group voice chat feature uses P2P mesh WebRTC + a custom HMAC socket token instead of a media server or Clerk-cookie socket auth.
---

## Mesh WebRTC, capped ~6-8 participants
Replit deployments expose only one external port, so a self-hosted SFU/TURN media relay isn't feasible. Voice chat for competitions uses direct peer-to-peer WebRTC mesh (every participant connects to every other participant) instead of a third-party service (Twilio/LiveKit/Agora/Daily.co) — user explicitly chose to avoid third-party services.

**Why:** mesh audio never touches the server, so no bandwidth-heavy relay is needed, but per-peer upload cost grows with N-1 connections — it stops scaling gracefully past ~6-8 people.
**How to apply:** if a future request asks for true 10-20 person scale, that requires re-opening the third-party media platform conversation (already declined once) — don't try to force the mesh further.

## Socket.IO only for signaling, custom HMAC token for socket auth
Socket.IO (mounted at `/api/socket.io/` on the api-server's own HTTP server, alongside REST) is used only for WebRTC signaling and room-state events (join/leave/mute/speaking/kick) — never for audio itself. Socket handshakes don't cleanly carry the Clerk session cookie in this proxied environment, so the client first calls an authenticated REST endpoint (`POST /quiz/sessions/:code/voice/token`) to get a short-lived (6h) HMAC-signed token (signed with `SESSION_SECRET`), then presents that token to the socket on `voice_join`. The server re-validates the token's userId against the live DB participant list at connect time (defense in depth against stale/kicked users).

**Why:** reuses the existing solid cookie-based REST auth path instead of building parallel cookie-forwarding logic for Socket.IO.
**How to apply:** any new realtime feature needing socket auth in this app should follow the same "REST-issued short-lived signed token" pattern rather than trying to pass Clerk cookies into the socket handshake.

## Voice room lifecycle
Voice rooms are in-memory per session `code` (same `Map` pattern as SSE clients), explicitly started/ended by the host via REST, and auto-torn-down when the quiz session's status flips to "finished". The existing SSE channel broadcasts `voice_started`/`voice_ended` so all connected clients learn the call started without needing an always-open Socket.IO connection.
