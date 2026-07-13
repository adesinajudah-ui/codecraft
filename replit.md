# CodeCraft

A programming education platform (like SoloLearn) with a React/Vite web app and Expo mobile app. Users learn HTML, CSS, JavaScript, Java, C, and Python through structured lessons, Monaco code editor, solo and multiplayer quizzes, and a leaderboard.

## Run & Operate

All registered artifacts are managed as Replit artifact workflows — start/stop from the Replit UI or via `WorkflowsRestart`.

- API server: `artifacts/api-server: API Server` — Express on port 8080, path `/api`
- Web app: `artifacts/codecraft-web: web` — Vite/React on port 26264, path `/`
- HTML course: `artifacts/codecraft-html: web` — Vite/React on port 26077, path `/html-course/`
- CSS course: `artifacts/codecraft-css: web` — Vite/React on port 25163, path `/css-course/`
- JS course: `artifacts/codecraft-js: web` — Vite/React on port 24297, path `/js-course/`
- Canvas/mockup sandbox: `artifacts/mockup-sandbox: Component Preview Server` — port 8081, path `/__mockup`

**Not registered as an artifact:** `artifacts/codecraft-mobile` (Expo app) has source files but no `.replit-artifact/artifact.toml`, so it has no workflow and does not run in this environment. Register it as an `expo` artifact if/when mobile needs to run on Replit.

One-off commands:
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes to Replit's built-in Postgres (dev only)

Required env:
- `DATABASE_URL` — Replit-managed Postgres (postgresql-16 module, auto-managed)
- `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY`, `VITE_CLERK_PUBLISHABLE_KEY` — **External Clerk** account (user-managed; set these in Replit Secrets from your Clerk dashboard → API Keys)

**Setup status (2026-07-13):** Re-imported from GitHub into a fresh environment. Installed dependencies, confirmed the Replit-managed Postgres database, requested external Clerk keys from the user, pushed the Drizzle schema, and started all 6 artifact workflows. DB auto-seeded with 6 languages, 45 lessons, 120 quiz questions, and 606 competition questions. Web app confirmed loading correctly with Clerk auth active. `codecraft-mobile` (Expo) is still unregistered as an artifact and does not run in this environment.

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

Auto-seeded on first API server start when tables are empty:
- 6 languages: HTML, CSS, JavaScript, Java, C, Python
- 6 courses (one per language)
- 45 lessons: HTML(10), JS(10), Python(10), CSS(5), Java(5), C(5)
- 6 quizzes × 20 questions = 120 questions total

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- **Never use `req.auth?.userId`** on the API server — use `getAuth(req)` from `@clerk/express`.
- **Clerk version lock**: `@clerk/react` must be `^6.x` to share `@clerk/shared@4.x` with `@clerk/express`. Do not downgrade to `@clerk/react@5.x`.
- Codegen output is in `lib/api-client-react/` and `lib/api-zod/` — always run codegen after OpenAPI changes.
- `pnpm --filter @workspace/db run push` must be run from the workspace root (not inside `lib/db`).

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
