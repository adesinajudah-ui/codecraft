---
name: orval mixed path+query param name collision
description: An orval-generated operation that has both path params and query params can produce two differently-shaped exports with the identical name, breaking a wildcard barrel re-export.
---

When an OpenAPI operation has **both** path parameters and query parameters, orval (via the zod client generator) emits two different things named after the operation's `Params` type:
1. A runtime zod object for the **path params** inside `generated/api.ts`.
2. A pure TS `interface`/type for the **query params** inside `generated/types/<operationId>Params.ts`.

If `lib/api-zod/src/index.ts` (or an equivalent barrel) does `export * from "./generated/api"` **and** `export * from "./generated/types"` (wildcard barrel), TypeScript raises `TS2308: Cannot find module` / ambiguous-export errors because the same name is exported twice with different shapes.

**Why:** this is a structural quirk of the orval zod generator, not a spec authoring mistake — it happens for any operation mixing path + query params, and will recur for future operations with the same shape.

**How to apply:** don't wildcard-export the whole `generated/types` folder. Instead, in the barrel file, `export * from "./generated/api"` plus explicit `export * from "./generated/types/<file>"` lines for every type file **except** the colliding `<operationId>Params` one(s), with a comment explaining why. Whenever `pnpm --filter @workspace/api-spec run codegen` adds/removes a type file, update that explicit list (add new files; drop stale ones — a stale line causes `TS2307: Cannot find module`).
