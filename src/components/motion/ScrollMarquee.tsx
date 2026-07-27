// ScrollMarquee.tsx: Powers the two horizontally-scrolling rows of small
// preview cards under the Hero section. Unlike a typical "marquee" that
// loops on a timer, these rows only move in response to how far the
// visitor has scrolled the page — scroll down and the top row slides
// right while the bottom row slides left; stop scrolling and the rows
// stop too. This file is generic (it doesn't know what a "project" is —
// see the `T` type below) so it could be reused for any horizontally
// scrolling row of items, not just the marquee.
import { useMemo, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface MarqueeRowProps<T> {
  items: T[];
  direction: "left" | "right";
  // A shared 0–1 "how far scrolled" value, passed down from the parent
  // ScrollMarquee so both rows move together in sync.
  progress: MotionValue<number>;
  // True when the visitor prefers reduced motion — freezes the row in
  // place instead of sliding it.
  disabled: boolean;
  // A function that knows how to turn one item of type T into the
  // little card shown on screen — supplied by whoever uses
  // <ScrollMarquee>, since this file itself doesn't know what a
  // "project" or "marquee card" looks like.
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
}

// One row of the marquee (there are two — see ScrollMarquee below).
function MarqueeRow<T>({ items, direction, progress, disabled, renderItem, keyExtractor }: MarqueeRowProps<T>) {
  // Track is tripled (not just doubled) so the translated range — up to
  // one full "set" width — never runs out of content before the loop
  // point, even on ultra-wide viewports where a couple of duplicated
  // cards might not add up to the full screen width. The row only
  // travels a third of that (one sixth of the tripled track) over the
  // full scroll range, which is what keeps the sweep feeling slow and
  // deliberate rather than racing past.
  const range: [string, string] =
    direction === "right" ? ["-16.6667%", "0%"] : ["0%", "-16.6667%"];
  // x is this row's horizontal position, mapped directly from the
  // shared scroll progress (0 to 1) onto the percentage range above —
  // as progress increases while scrolling, x slides smoothly across
  // that range. When `disabled` is true, we map to a flat ["0%", "0%"]
  // instead, so the row simply never moves.
  const x = useTransform(progress, [0, 1], disabled ? ["0%", "0%"] : range);
  // The row's items repeated three times in a row, back to back, so
  // that as the strip slides by one "copy-width," there's always more
  // of the same content ready to take its place — this is what makes
  // the strip look like it never runs out, without actually looping.
  // useMemo avoids rebuilding this array on every render.
  const tripled = useMemo(() => [...items, ...items, ...items], [items]);

  return (
    // marquee-fade (defined in index.css) fades the row's edges to
    // transparent, so cards don't appear to cut off abruptly at the
    // screen edge.
    <div className="marquee-fade overflow-hidden">
      <motion.div style={{ x }} className="flex w-max gap-6 py-3">
        {tripled.map((item, i) => (
          <div key={`${keyExtractor(item, i)}-${i}`} className="shrink-0">
            {renderItem(item, i)}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

interface ScrollMarqueeProps<T> {
  rowOne: T[];
  rowTwo: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  className?: string;
}

/**
 * Dual-row ribbon whose horizontal offset is driven by scroll progress
 * through the section (not a time-based CSS loop) — row one sweeps right,
 * row two sweeps left, per the design spec. Disabled under
 * prefers-reduced-motion (rows render statically instead of sweeping).
 */
export function ScrollMarquee<T>({
  rowOne,
  rowTwo,
  renderItem,
  keyExtractor,
  className,
}: ScrollMarqueeProps<T>) {
  // A reference to this whole marquee section, so Framer Motion can
  // measure exactly when it's scrolled into and out of view.
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // scrollYProgress goes from 0 to 1 across the time this section is
  // scrolling through the viewport — offset ["start end", "end start"]
  // means progress is 0 when the section's top just barely enters the
  // bottom of the screen, and 1 once the section's bottom has scrolled
  // all the way past the top of the screen. So the sweeping motion is
  // scoped to exactly while this section is on screen, not the whole page.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={sectionRef} className={className}>
      <div className="flex flex-col gap-6">
        <MarqueeRow
          items={rowOne}
          direction="right"
          progress={scrollYProgress}
          disabled={!!shouldReduceMotion}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
        <MarqueeRow
          items={rowTwo}
          direction="left"
          progress={scrollYProgress}
          disabled={!!shouldReduceMotion}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </div>
    </div>
  );
}
