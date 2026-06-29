---
name: api-client-react type declarations
description: lib/api-client-react needs its type declarations built before tsc --noEmit will pass in web/mobile packages.
---

# api-client-react Type Declarations

## Rule
Before running `tsc --noEmit` in `artifacts/codecraft-web` (or any consumer), the lib must have its declaration files emitted.

## Why
`lib/api-client-react` has `"emitDeclarationOnly": true` in its tsconfig. TypeScript project references require the `.d.ts` files to exist at `lib/api-client-react/dist/`. Without them, consumers get "Output file has not been built from source file" errors on every import.

## How to Apply
```bash
pnpm --filter @workspace/api-client-react exec tsc --declaration --emitDeclarationOnly --outDir dist
```

Or run the workspace root build which should cascade.
This only needs to be run once after changes to the lib's `src/` files.
