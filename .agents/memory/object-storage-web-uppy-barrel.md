---
name: object-storage-web ObjectUploader barrel breaks useUpload-only usage
description: importing useUpload from the template's index.ts also evaluates ObjectUploader.tsx, which can fail to resolve @uppy/react subpath exports
---

The `object-storage-web` skill template's `src/index.ts` re-exports both `ObjectUploader`
(Uppy dashboard-modal component) and `useUpload` (plain hook) from one barrel file.

**Why:** Vite/tsc resolve the whole barrel module graph on any import from it — even
`import { useUpload } from '@workspace/object-storage-web'` transitively parses
`ObjectUploader.tsx`, which imports `@uppy/react/dashboard-modal`. In this project that
subpath failed to resolve after a fresh install, breaking the whole app with a
"Failed to resolve import" Vite error, despite `ObjectUploader` never being used.

**How to apply:** If a project only needs the plain `<input type="file">` + `useUpload`
flow (no Uppy modal UI), remove the `export { ObjectUploader } ...` line from
`lib/object-storage-web/src/index.ts` so it isn't bundled, and import `ObjectUploader`
directly from its file path only if/when the Uppy modal is actually adopted.
