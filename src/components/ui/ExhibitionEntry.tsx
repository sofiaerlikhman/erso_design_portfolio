// ExhibitionEntry.tsx: One show in the Exhibitions list — the kind of
// show ("Solo Exhibition") as a small label, the title and year on one
// line, the venue underneath, and a short note about the work. Mirrors
// EducationEntry's hover behaviour so the two lists feel like a pair.
import type { ExhibitionItem } from "../../types/portfolio";

interface ExhibitionEntryProps {
  // One entry from portfolioData.ts's `exhibitions` array.
  item: ExhibitionItem;
}

export function ExhibitionEntry({ item }: ExhibitionEntryProps) {
  return (
    // "group" lets the title below react to the whole row being hovered.
    <div className="group -mx-4 rounded-t-2xl border-b border-divider px-4 py-6 transition-colors duration-300 hover:bg-text-dark/[0.03]">
      <div className="font-body text-[10px] uppercase tracking-[0.2em] text-text-dark/40">
        {item.kind}
      </div>
      <div className="mt-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline sm:gap-4">
        <div className="font-display text-xl text-text-dark transition-transform duration-300 ease-editorial group-hover:translate-x-1.5 sm:text-2xl">
          {item.title}
        </div>
        <div className="shrink-0 font-body text-sm text-text-dark/50">{item.year}</div>
      </div>
      <div className="mt-1 font-body text-sm text-text-dark/60">{item.venue}</div>
      <p className="mt-3 max-w-xl font-body text-sm text-text-dark/70">{item.description}</p>
    </div>
  );
}
