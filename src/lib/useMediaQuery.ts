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
  // layout on first render.
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    // Sync in case the query string itself changed, or the environment
    // shifted between the initial read above and this effect running.
    setMatches(mediaQueryList.matches);

    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
