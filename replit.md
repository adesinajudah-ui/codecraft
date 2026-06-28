# CodeCraft

A programming education platform (like SoloLearn) with a React/Vite web app and Expo mobile app. Users learn HTML, CSS, JavaScript, Java, C, and Python through structured lessons, Monaco code editor, solo and multiplayer quizzes, and a leaderboard.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5 + `@clerk/express` for auth
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec at `lib/api-spec/openapi.yaml`)
- Build: esbuild (CJS bundle)
- Web: React + Vite + Clerk + Monaco editor + Tailwind
- Mobile: Expo (React Native) + Expo Router + React Query

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for all API contracts
- `lib/db/src/schema.ts` — Drizzle ORM schema (source of truth for DB shape)
- `lib/api-client-react/` — generated React Query hooks (do not edit manually)
- `lib/api-zod/` — generated Zod schemas (do not edit manually)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/codecraft-web/src/` — React/Vite web app
- `artifacts/codecraft-mobile/app/` — Expo mobile screens

## Architecture decisions

- Contract-first: OpenAPI spec drives all codegen; update spec then run codegen before touching route handlers or clients.
- Auth: Clerk (`@clerk/express` on server, `@clerk/react` on web). Use `getAuth(req)` — never `req.auth?.userId` (types don't expose it).
- Expo API base URL is set at module level in `_layout.tsx` via `setBaseUrl(https://${EXPO_PUBLIC_DOMAIN})` — Expo bundles run outside the shared proxy and need absolute URLs.
- `@clerk/react@6.11.1` is pinned to match `@clerk/shared@4.22.0` used by `@clerk/express`.

## Product

- **Learn tab / Home**: Browse 6 programming languages → courses → lessons with code examples
- **Quiz tab**: Select a language + course, take a timed multiple-choice quiz, see score
- **Leaderboard**: Top users ranked by XP earned across all languages
- **Admin portal** (web only): Platform stats, user management (admin-gated)
- **Profile**: User stats, achievements, XP tracking (Clerk auth)

## Seeded data

- 6 languages: HTML, CSS, JavaScript, Java, C, Python (3 courses each = 18 courses)
- 14 lessons: HTML Basics (5), CSS Basics (3), JS Basics (3), Python Basics (3)
- 4 quizzes with 5 questions each (HTML, CSS, JS, Python)

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- **Never use `req.auth?.userId`** on the API server — use `getAuth(req)` from `@clerk/express`.
- **Clerk version lock**: `@clerk/react` must be `^6.x` to share `@clerk/shared@4.x` with `@clerk/express`. Do not downgrade to `@clerk/react@5.x`.
- Codegen output is in `lib/api-client-react/` and `lib/api-zod/` — always run codegen after OpenAPI changes.
- `pnpm --filter @workspace/db run push` must be run from the workspace root (not inside `lib/db`).

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
