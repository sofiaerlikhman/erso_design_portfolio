// AnimatedChar.tsx: Renders exactly one letter of the About section's
// bio paragraph, and controls that single letter's fade-in as you
// scroll. It's a small helper piece used only by AnimatedText.tsx — see
// that file for the full explanation of how a whole paragraph gets
// split into these one-letter pieces.
import { motion, useTransform, type MotionValue } from "framer-motion";

interface AnimatedCharProps {
  // The single character this instance is responsible for showing.
  char: string;
  // A shared "how far down the page have we scrolled" value (0 = not
  // yet, 1 = fully scrolled past), passed down from the parent
  // AnimatedText so every letter reacts to the *same* scroll position.
  progress: MotionValue<number>;
  // This letter's own little slice of that 0–1 scroll range — e.g. a
  // letter near the start of the sentence might fade in during
  // progress 0.00–0.01, while a letter near the end fades in during
  // 0.86–0.87. Together, all the letters' ranges create the left-to-
  // right "typing on" reveal effect.
  range: [number, number];
  className?: string;
}

/**
 * Renders a single character whose opacity is driven by a shared scroll
 * progress MotionValue. Must stay its own component (not inlined in a loop)
 * so each instance calls useTransform exactly once — see AnimatedText.
 */
export function AnimatedChar({ char, progress, range, className }: AnimatedCharProps) {
  // Maps this letter's slice of the scroll range to an opacity value:
  // while `progress` is below the start of `range`, opacity stays at
  // 0.15 (barely visible); once `progress` reaches the end of `range`,
  // opacity is 1 (fully visible); in between, it fades smoothly.
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className={className}>
      {char}
    </motion.span>
  );
}
