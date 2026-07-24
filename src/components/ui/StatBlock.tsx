// StatBlock.tsx: One number+label pair in the About section's stats row
// (e.g. "8+ / YEARS OF EXPERIENCE"). The actual counting-up animation
// lives in AnimatedCounter.tsx — this file just lays out the number
// above its label with a divider line on top.
import type { AboutStat } from "../../types/portfolio";
import { AnimatedCounter } from "../motion/AnimatedCounter";

// Props here come straight from one entry in portfolioData.ts's
// about.stats array (see src/data/portfolioData.ts).
export function StatBlock({ label, value }: AboutStat) {
  return (
    <div className="border-t border-divider pt-4">
      <AnimatedCounter
        value={value}
        className="font-display text-4xl text-text-dark sm:text-5xl"
      />
      <div className="mt-2 font-body text-sm uppercase tracking-wide text-text-dark/60">
        {label}
      </div>
    </div>
  );
}
