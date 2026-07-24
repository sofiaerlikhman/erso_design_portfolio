// MarqueeStrip.tsx: The section right under the Hero — two rows of
// small preview cards that slide sideways as you scroll. This file
// defines what one card looks like (MarqueeCard) and wires the data up;
// the actual scroll-driven sliding logic lives in
// src/components/motion/ScrollMarquee.tsx.
import { useMemo } from "react";
import { ScrollMarquee } from "../motion/ScrollMarquee";
import { FallbackImage } from "../ui/FallbackImage";
import { portfolioData } from "../../data/portfolioData";
import type { MarqueeItem } from "../../types/portfolio";

// One small preview card — a thumbnail image plus a label and tag.
function MarqueeCard({ item }: { item: MarqueeItem }) {
  return (
    <div className="flex w-[220px] items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 transition-transform duration-300 ease-editorial hover:scale-[1.03] sm:w-[260px]">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
        <FallbackImage
          src={item.image}
          alt={item.label}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <div className="truncate font-body text-sm text-text-light">{item.label}</div>
        <div className="truncate font-body text-xs text-text-light/50">{item.tag}</div>
      </div>
    </div>
  );
}

export function MarqueeStrip() {
  // The list of preview cards — comes straight from portfolioData.ts's
  // `marquee` array. portfolioData.marquee is a module-level constant,
  // so this reference never changes between renders — safe to read
  // directly, no useMemo needed for `items` itself.
  const items = portfolioData.marquee;

  // useMemo here keeps `rowTwo` as the *same array reference* across
  // re-renders (recomputing only if `items` itself ever changed), so
  // reversing the list isn't redone on every render for no reason.
  const rowTwo = useMemo(() => [...items].reverse(), [items]);

  return (
    <section className="relative bg-bg-dark py-16 sm:py-24">
      <ScrollMarquee
        rowOne={items}
        rowTwo={rowTwo}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <MarqueeCard item={item} />}
      />
    </section>
  );
}
