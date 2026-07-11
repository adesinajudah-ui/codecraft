---
name: orval query key params must match exactly
description: manual queryClient.setQueryData calls silently no-op if the query key params shape doesn't match the hook's key
---

Orval's generated `getXQueryKey(id, params)` includes `params` in the key array only
when `params` is truthy (`params ? [params] : []`). So `getXQueryKey(id)` and
`getXQueryKey(id, {})` produce **different** cache keys, even though `{}` looks empty.

**Why:** A component that fetches via `useListXQuery(id, {}, { query: { queryKey: getXQueryKey(id, {}) } })`
reads from key `[url, {}]`. If a mutation's `onSuccess`/SSE handler writes with
`getXQueryKey(id)` (key `[url]`), the write lands in a phantom cache entry the UI
never reads — updates appear to silently fail until the component remounts and
refetches (e.g. "message doesn't show until I leave and re-enter").

**How to apply:** When manually reading/writing an orval-generated query key outside
the hook call itself (mutation onSuccess, SSE/WebSocket handlers, optimistic updates),
call `getXQueryKey` with the exact same arguments (including empty-object params) used
in the corresponding `useX` hook's `query.queryKey` override.
