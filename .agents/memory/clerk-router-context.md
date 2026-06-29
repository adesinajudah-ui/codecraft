---
name: Clerk Router context bug
description: useLocation() must be inside WouterRouter; ClerkProvider must be a child of WouterRouter.
---

# Clerk + Wouter Router Context Bug

## Rule
`useLocation()` (and all Wouter hooks) must be called inside `<WouterRouter>`. `ClerkProvider` must be a **child** of `<WouterRouter>`, not a parent or sibling.

## Why
Calling `useLocation()` outside a `<WouterRouter>` context causes a silent crash (blank screen, no error message) because Wouter throws internally but React catches it without surfacing it visibly.

## How to Apply
Canonical structure (from Clerk skill `setup-and-customization.md`):
```tsx
// App.tsx
export default function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />  // useLocation() is called HERE, inside Router
    </WouterRouter>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();  // safe: inside WouterRouter
  return (
    <ClerkProvider routerPush={...} routerReplace={...}>
      ...
    </ClerkProvider>
  );
}
```

**Wrong pattern** (causes blank screen):
```tsx
export default function App() {
  const [, setLocation] = useLocation();  // ERROR: outside WouterRouter
  return (
    <ClerkProvider routerPush={...}>
      <WouterRouter base={basePath}>
        ...
      </WouterRouter>
    </ClerkProvider>
  );
}
```
