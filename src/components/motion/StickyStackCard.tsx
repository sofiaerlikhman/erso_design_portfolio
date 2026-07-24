// StickyStackCard.tsx: Creates the "sticky-stacking cards" effect in the
// Selected Projects section — each project card sticks to the top of
// the screen while you keep scrolling, then shrinks and dims slightly
// as the next card slides up and covers it. This file only handles that
// stick/shrink/dim behavior; the actual card content (title, images,
// etc.) is passed in as `children` from SelectedProjects.tsx.
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/cn";

interface StickyStackCardProps {
  // The card's actual content (title, tags, images) — supplied by
  // whichever component uses this wrapper.
  children: ReactNode;
  /** Position in the stack — later cards render above earlier ones. */
  index: number;
  className?: string;
}

/**
 * Pins a card at `top-24` and scales/dims it as the next card in the stack
 * scrolls over it. The outer spacer must be taller than the sticky card
 * itself — that extra height is the scroll distance the pin/scale plays
 * out across, e.g. 130vh outer wrapping a 70vh sticky card leaves ~60vh of
 * scroll for the effect before the next card takes over.
 */
export function StickyStackCard({ children, index, className }: StickyStackCardProps) {
  // A reference to the tall, empty "spacer" div below — Framer Motion
  // watches this element's position to know how far the visitor has
  // scrolled through this particular card's turn at the top of the
  // screen.
  const outerRef = useRef<HTMLDivElement>(null);

  // True if the visitor prefers reduced motion — if so, the card still
  // sticks to the top like normal (that's a layout behavior, not really
  // "motion"), but it won't shrink or dim as the next card arrives.
  const shouldReduceMotion = useReducedMotion();

  // scrollYProgress goes from 0 to 1 across the tall spacer div's own
  // height — offset ["start start", "end start"] means progress is 0
  // right when the spacer's top edge reaches the top of the screen
  // (that's the moment this card becomes "stuck"), and progress is 1
  // once the spacer's *bottom* edge also reaches the top of the screen
  // (that's the moment this card gets fully covered by the next one).
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end start"],
  });

  // As scrollYProgress goes from 0 to 1, shrink the card down to 88% of
  // its size and fade it to 55% opacity — visually signaling that it's
  // being "replaced" by whatever scrolls up next. Skipped (locked at no
  // change) when reduced motion is requested.
  const scale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 0.55]);

  return (
    // This outer div is deliberately much taller (130vh) than the card
    // itself (70vh) — that extra height is what gives the scroll-driven
    // animation room to play out before the card releases and the next
    // one takes its place.
    <div ref={outerRef} className="relative h-[130vh]">
      {/* "sticky top-24" is what actually pins the card near the top of
          the viewport while its parent spacer scrolls past underneath it. */}
      <div className="sticky top-24 h-[70vh]" style={{ zIndex: index + 1 }}>
        <motion.div
          style={{ scale, opacity }}
          className={cn(
            "h-full w-full origin-top overflow-hidden rounded-4xl border border-divider/20 bg-[#141414]",
            className,
          )}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
