// ScrollMarquee.tsx: Powers the two horizontally-scrolling rows of small
// preview cards under the Hero section. On desktop (1024px+), these
// rows only move in response to how far the visitor has scrolled the
// page — scroll down and the top row slides right while the bottom row
// slides left; stop scrolling and the rows stop too. On mobile and
// tablet, scroll-linked movement felt broken (short, choppy scroll
// gestures don't cover much distance), so those rows instead loop on
// their own continuously, independent of scrolling. This file is
// generic (it doesn't know what a "project" is — see the `T` type
// below) so it could be reused for any horizontally scrolling row of
// items, not just the marquee.
import { useMemo, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMediaQuery } from "../../lib/useMediaQuery";

interface MarqueeRowProps<T> {
  items: T[];
  direction: "left" | "right";
  // A shared 0–1 "how far scrolled" value, passed down from the parent
  // ScrollMarquee so both rows move together in sync (desktop only).
  progress: MotionValue<number>;
  // True when the visitor prefers reduced motion — freezes the row in
  // place instead of sliding it.
  disabled: boolean;
  // True below the lg breakpoint — swaps this row from scroll-linked
  // movement to a continuous, self-playing loop (see ScrollMarquee).
  autoLoop: boolean;
  // A function that knows how to turn one item of type T into the
  // little card shown on screen — supplied by whoever uses
  // <ScrollMarquee>, since this file itself doesn't know what a
  // "project" or "marquee card" looks like.
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
}

// How long one full pass across the tripled track takes in auto-loop
// mode (mobile/tablet). Scroll-linked mode (desktop) has no fixed
// duration of its own — its speed is simply however fast the visitor
// scrolls.
const AUTO_LOOP_DURATION = 22;
const AUTO_LOOP_TRANSITION = { duration: AUTO_LOOP_DURATION, repeat: Infinity, ease: "linear" } as const;

// One row of the marquee (there are two — see ScrollMarquee below).
function MarqueeRow<T>({ items, direction, progress, disabled, autoLoop, renderItem, keyExtractor }: MarqueeRowProps<T>) {
  // Track is tripled (not just doubled) so the translated range — up to
  // one full "set" width — never runs out of content before the loop
  // point, even on ultra-wide viewports where a couple of duplicated
  // cards might not add up to the full screen width.
  const tripled = useMemo(() => [...items, ...items, ...items], [items]);

  // Scroll-linked range (desktop): the row only travels a sixth of the
  // tripled track over the full scroll range, which is what keeps the
  // sweep feeling slow and deliberate rather than racing past. Always
  // computed (hooks can't be called conditionally), even when autoLoop
  // means this particular value won't end up used.
  const scrollRange: [string, string] =
    direction === "right" ? ["-16.6667%", "0%"] : ["0%", "-16.6667%"];
  const scrollX = useTransform(progress, [0, 1], disabled ? ["0%", "0%"] : scrollRange);

  // Auto-loop range (mobile/tablet): a full "set" of the tripled track
  // (33.3333%) — repeating that exact distance is what makes the loop
  // invisible, since the duplicated content one set over looks
  // identical to the start, so the jump back at the end of each cycle
  // is imperceptible.
  const loopRange: [string, string] =
    direction === "right" ? ["-33.3333%", "0%"] : ["0%", "-33.3333%"];

  const track = tripled.map((item, i) => (
    <div key={`${keyExtractor(item, i)}-${i}`} className="shrink-0">
      {renderItem(item, i)}
    </div>
  ));

  return (
    // marquee-fade (defined in index.css) fades the row's edges to
    // transparent, so cards don't appear to cut off abruptly at the
    // screen edge.
    <div className="marquee-fade overflow-hidden">
      {autoLoop ? (
        <motion.div
          animate={disabled ? undefined : { x: loopRange }}
          transition={AUTO_LOOP_TRANSITION}
          className="flex w-max gap-6 py-3"
        >
          {track}
        </motion.div>
      ) : (
        <motion.div style={{ x: scrollX }} className="flex w-max gap-6 py-3">
          {track}
        </motion.div>
      )}
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
 * Dual-row ribbon. On desktop, horizontal offset is driven by scroll
 * progress through the section (row one sweeps right, row two sweeps
 * left, per the design spec). Below that, both rows loop continuously
 * on their own instead, since scroll-linked motion isn't reliable on
 * touch scrolling. Disabled under prefers-reduced-motion either way
 * (rows render statically instead of moving).
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

  // Matches Tailwind's lg breakpoint (1024px) — the same width the rest
  // of this recent work treats as "actual desktop." Below it, rows
  // auto-loop instead of waiting for scroll input.
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // scrollYProgress goes from 0 to 1 across the time this section is
  // scrolling through the viewport — offset ["start end", "end start"]
  // means progress is 0 when the section's top just barely enters the
  // bottom of the screen, and 1 once the section's bottom has scrolled
  // all the way past the top of the screen. So the sweeping motion is
  // scoped to exactly while this section is on screen, not the whole page.
  // Only actually drives movement on desktop, but it's cheap to compute
  // either way and keeps the hook call unconditional.
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
          autoLoop={!isDesktop}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
        <MarqueeRow
          items={rowTwo}
          direction="left"
          progress={scrollYProgress}
          disabled={!!shouldReduceMotion}
          autoLoop={!isDesktop}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </div>
    </div>
  );
}
