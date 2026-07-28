// useMediaQuery.ts: Lets a component know whether a CSS media query
// currently matches (e.g. "is the viewport at least 1024px wide?"), and
// keeps that up to date if the visitor resizes the window or rotates
// their device. Useful for the rare cases where a Tailwind responsive
// class isn't enough — i.e. when a component needs to switch between
// two entirely different pieces of logic (not just different styling)
// depending on screen size.
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  // Reads the initial match synchronously (rather than starting false
  // and flipping after mount) so there's no visible flash of the wrong
  // layout on first render. The `typeof window` guard keeps this from
  // throwing if the app is ever pre-rendered or server-rendered, where
  // there is no window object to ask.
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Re-sync in case the query string changed, or the viewport shifted
    // between the initial read above and this effect running. Comparing
    // first means an unchanged value doesn't schedule a re-render — the
    // previous version called setMatches unconditionally here, so every
    // mount paid for an extra render pass it didn't need.
    setMatches((prev) => (prev === mediaQueryList.matches ? prev : mediaQueryList.matches));

    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
