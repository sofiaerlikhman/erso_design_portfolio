// Magnet.tsx: A wrapper component that makes whatever you put inside it
// (usually a button) gently follow the mouse cursor when hovered — the
// "magnetic button" effect used on the Hero, Contact, and other CTAs
// around the site. This file only handles the *movement*; it doesn't
// care what's inside it or what it looks like.
import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface MagnetProps {
  children: ReactNode;
  className?: string;
  /** How far the element travels relative to cursor offset. 0.2–0.6 feels natural. */
  strength?: number;
  /** Spring stiffness — higher = snappier. */
  stiffness?: number;
  /** Spring damping — higher = less oscillation. */
  damping?: number;
  mass?: number;
  /** Scale applied on press/tap — set to 1 to disable. */
  tapScale?: number;
}

/**
 * Wraps any element (button, badge, etc.) and makes it drift toward the
 * cursor while hovered, springing back to rest on pointer leave.
 *
 * Cursor-tracking only engages for pointerType "mouse" — touch taps fire
 * pointermove/pointerup without a reliable pointerleave, which would
 * otherwise leave the element visually offset ("stuck") after a tap.
 * Respects prefers-reduced-motion by disabling the drift entirely (tap
 * feedback stays on — it's a brief, non-ambient cue, not the kind of
 * motion that setting targets).
 */
export function Magnet({
  children,
  className,
  strength = 0.35,
  stiffness = 150,
  damping = 15,
  mass = 0.5,
  tapScale = 0.96,
}: MagnetProps) {
  // A direct reference to the actual DOM element, so we can measure its
  // exact position/size on screen (see getBoundingClientRect below).
  const ref = useRef<HTMLDivElement>(null);

  // Whether the visitor's operating system has "reduce motion"
  // turned on in its accessibility settings. If so, we skip the
  // cursor-chasing animation out of respect for that preference.
  const shouldReduceMotion = useReducedMotion();

  // x and y are the element's current horizontal/vertical offset from
  // its resting position, in pixels. They start at 0 (not moved at all).
  // A "motion value" is Framer Motion's way of storing an animated
  // number that can update every animation frame *without* asking React
  // to re-render the whole component each time — much faster than
  // storing this in useState.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Instead of jumping straight to the target offset, useSpring makes x
  // and y *ease* toward it like a soft spring — stiffness controls how
  // quickly it responds, damping controls how much it wobbles before
  // settling, and mass controls how "heavy" it feels.
  const springX = useSpring(x, { stiffness, damping, mass });
  const springY = useSpring(y, { stiffness, damping, mass });

  // Runs continuously while the mouse moves over this element. It works
  // out how far the cursor is from the element's exact center, then
  // nudges x/y toward that offset (scaled down by `strength` so it
  // doesn't move as far as the cursor itself does).
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    // Skip entirely for touch taps (see the file comment above) and
    // when the visitor prefers reduced motion.
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    // getBoundingClientRect gives the element's exact pixel position and
    // size on screen right now, so we can calculate its center point.
    const rect = el.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  }

  // Returns the element to its resting position — the spring then eases
  // it smoothly back rather than snapping.
  function resetOffset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetOffset}
      // pointercancel fires when the browser takes the pointer away
      // mid-interaction (a system gesture, a context menu, scrolling
      // stealing the gesture). It does NOT guarantee a matching
      // pointerleave, so without this the button would stay frozen at
      // whatever offset it had reached when the pointer vanished.
      onPointerCancel={resetOffset}
      // whileTap: while the element is actively being pressed/clicked,
      // shrink it slightly (tapScale) for a bit of tactile feedback.
      whileTap={{ scale: tapScale }}
      // Feeding the two spring values into `style` is what actually
      // moves the element on screen each frame — Framer Motion applies
      // these as a hardware-accelerated CSS transform behind the scenes.
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
