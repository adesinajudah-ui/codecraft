---
name: pnpm overrides must live in pnpm-workspace.yaml, not root package.json
description: adding "pnpm.overrides" to the root package.json in this template can shadow/conflict with existing overrides in pnpm-workspace.yaml
---

This monorepo template already declares `overrides:` under `pnpm-workspace.yaml`
(e.g. forcing a single `@types/react` version workspace-wide).

**Why:** Adding a separate `"pnpm": { "overrides": {...} }` block to the root
`package.json` (e.g. to pin `react`/`react-dom` for a new dependency like Uppy) caused
a duplicate `@types/react` version to reappear in the lockfile and reintroduced
"two different types with this name exist" TS errors across unrelated UI components —
even though both override sources targeted the same packages.

**How to apply:** Add any new version overrides as additional keys under the existing
`overrides:` map in `pnpm-workspace.yaml`, not as a new `pnpm.overrides` block in the
root `package.json`. Run `pnpm install` then a full `pnpm run typecheck` after any
override change to confirm no duplicate type packages were reintroduced.
