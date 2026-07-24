// EducationEntry.tsx: One degree in the Education list — degree/field
// title, the date range, and the institution name underneath. Nudges
// slightly to the right and gets a faint background tint on hover, just
// as a bit of interactive polish.
import type { EducationItem } from "../../types/portfolio";

interface EducationEntryProps {
  // One entry from portfolioData.ts's `education` array.
  item: EducationItem;
}

export function EducationEntry({ item }: EducationEntryProps) {
  return (
    // The "group" class here lets the child title element below react
    // to *this whole row* being hovered (via group-hover:), not just
    // itself directly.
    <div className="group -mx-4 rounded-t-2xl border-b border-divider px-4 py-6 transition-colors duration-300 hover:bg-text-dark/[0.03]">
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline sm:gap-4">
        <div className="font-display text-xl text-text-dark transition-transform duration-300 ease-editorial group-hover:translate-x-1.5 sm:text-2xl">
          {item.degree} — {item.field}
        </div>
        <div className="shrink-0 font-body text-sm text-text-dark/50">{item.period}</div>
      </div>
      <div className="mt-1 font-body text-sm text-text-dark/60">{item.institution}</div>
    </div>
  );
}
