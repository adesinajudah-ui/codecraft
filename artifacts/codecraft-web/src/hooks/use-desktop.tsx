import * as React from "react";

// Matches Tailwind's `lg` breakpoint: below this, users get the phone-style
// app shell; at or above it, users get the full desktop/laptop layout.
const DESKTOP_BREAKPOINT = 1024;

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth >= DESKTOP_BREAKPOINT : false,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const onChange = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    mql.addEventListener("change", onChange);
    onChange();
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}
