// AnimatedCounter.tsx: Makes a number count up from 0 to its real value
// (e.g. 0 → 8, or 0 → 24) once it scrolls into view, instead of just
// appearing instantly. Used for the "Years of Experience / Shipped
// Products / Client Partners" numbers in the About section (see
// StatBlock.tsx, which wraps this).
import { useEffect, useMemo, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  /** e.g. "8+", "24", "16" — any leading/trailing non-digit text is preserved as-is. */
  value: string;
  className?: string;
}

// Pulls the number out of a text value like "8+" so we know what to
// count up to, while keeping any extra text (like the "+") to display
// alongside it, unchanged, before and after the number.
function parseValue(value: string) {
  const match = value.match(/\d+(\.\d+)?/);
  if (!match || match.index === undefined) {
    // No number found at all (shouldn't normally happen) — just show
    // the text as-is with nothing to count.
    return { target: 0, prefix: "", suffix: value, decimals: 0 };
  }
  const [numericText] = match;
  return {
    // The final number to count up to, e.g. 8.
    target: parseFloat(numericText),
    // Any text before the number (usually empty).
    prefix: value.slice(0, match.index),
    // Any text after the number, e.g. "+".
    suffix: value.slice(match.index + numericText.length),
    // How many digits after the decimal point to show while counting,
    // e.g. a value like "4.5" would show one decimal place throughout
    // the count-up instead of jumping straight from a whole number.
    decimals: numericText.includes(".") ? numericText.split(".")[1].length : 0,
  };
}

/**
 * Counts up from 0 to the numeric part of `value` once it scrolls into
 * view, keeping any surrounding text (e.g. the "+" in "8+") unchanged.
 */
export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  // parseValue does a regex match + string slicing — cheap, but there's no
  // reason to redo it on every render when it only ever depends on `value`.
  const { target, prefix, suffix, decimals } = useMemo(() => parseValue(value), [value]);

  // A reference to this number's on-screen <span>, so we can watch when
  // it actually scrolls into view.
  const ref = useRef<HTMLSpanElement>(null);

  // isInView becomes true the first time this element scrolls into the
  // visible part of the screen, and (because of `once: true`) stays true
  // forever after that — the count-up should only ever play once, not
  // every time you scroll past it again.
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const shouldReduceMotion = useReducedMotion();

  // A reference to just the <span> holding the digits, so the ticking
  // number can be written straight into the DOM (see below).
  const numberRef = useRef<HTMLSpanElement>(null);

  // Runs whenever isInView, shouldReduceMotion, or the target number
  // changes. Once the element is in view, it either jumps straight to
  // the final number (if reduced motion is requested) or smoothly
  // animates from 0 up to `target` over 1.6 seconds.
  useEffect(() => {
    const node = numberRef.current;
    if (!node || !isInView) return;

    if (shouldReduceMotion) {
      node.textContent = target.toFixed(decimals);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      // Writing the new number straight onto the DOM node instead of
      // routing it through React state. onUpdate fires roughly 60 times
      // a second, and a setState per frame would re-render this whole
      // component that many times — for a change that only ever affects
      // one string of text. Three counters animating at once made that
      // hundreds of avoidable renders per second.
      onUpdate: (latest) => {
        node.textContent = latest.toFixed(decimals);
      },
    });

    // If this component disappears mid-count, stop the animation so it
    // doesn't keep writing to a node that's no longer on screen.
    return () => controls.stop();
  }, [isInView, shouldReduceMotion, target, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {/* Starts at a zero padded to the same number of decimal places the
          animation will use, so the very first frame is already the right
          shape and the text doesn't visibly jump width as it starts. */}
      <span ref={numberRef}>{(0).toFixed(decimals)}</span>
      {suffix}
    </span>
  );
}
