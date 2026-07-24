// a11y.ts ("a11y" is short for "accessibility"): Three ready-made sets of
// Tailwind classes, reused across every button/link in the project, so
// that things like keyboard-focus outlines and press feedback look
// consistent everywhere instead of being redefined slightly differently
// in every file.

/**
 * Shared focus-visible treatment for interactive elements, split by the
 * background they sit on (the ring-offset color has to match the local
 * surface or it shows as a mismatched halo). Use DARK on bg-dark surfaces
 * (navbar, footer, dark sections) and LIGHT on cream surfaces.
 */
// FOCUS_RING_DARK: the glowing outline shown around a button/link when a
// keyboard user Tab-key's onto it, tuned for elements that sit on the
// site's dark background sections.
export const FOCUS_RING_DARK =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/80 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark";

// FOCUS_RING_LIGHT: the same idea, but recolored for elements sitting on
// the cream-colored sections (About, Experience & Services) — using
// FOCUS_RING_DARK there would produce a dark halo that looks wrong
// against a light background.
export const FOCUS_RING_LIGHT =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-dark/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

/** Tap/press feedback for plain (non-motion) interactive elements. */
// TAP_SCALE: makes a button shrink very slightly the instant it's
// pressed/clicked, as a bit of visual confirmation that the click
// registered — a plain CSS version of the same feedback the Magnet
// component gives its buttons via Framer Motion.
export const TAP_SCALE = "transition-transform duration-150 active:scale-95";
