// AccordionItem.tsx: One expandable job entry in the work-history list
// (Experience & Services section) — shows the role/company/period
// always, and reveals the full description, skill tags, and key wins
// when clicked.
import { useState } from "react";
import { Plus } from "lucide-react";
import type { ExperienceItem } from "../../types/portfolio";
import { cn } from "../../lib/cn";
import { FOCUS_RING_LIGHT } from "../../lib/a11y";

interface AccordionItemProps {
  // One entry from portfolioData.ts's `experience` array.
  item: ExperienceItem;
  // Whether this entry should already be expanded the moment the page
  // loads (ServicesResume.tsx uses this to have the first job open by
  // default).
  defaultOpen?: boolean;
}

export function AccordionItem({ item, defaultOpen = false }: AccordionItemProps) {
  // isOpen: true while this specific entry is expanded, false while
  // it's collapsed. Starts at whatever `defaultOpen` says. Each
  // AccordionItem keeps track of its own open/closed state completely
  // independently from every other one.
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-divider py-6">
      {/*
        No useCallback here: the toggle handler is attached to a plain
        <button> (a native HTML element), not a memoized React component —
        native elements re-attach a new handler each render for free, so
        wrapping this would add complexity without any measurable benefit.
        useCallback only pays off when the *receiver* is a memoized
        component that does a props comparison.
      */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center justify-between gap-4 rounded-md text-left",
          FOCUS_RING_LIGHT,
        )}
      >
        <div>
          <div className="font-display text-2xl text-text-dark sm:text-3xl">{item.role}</div>
          <div className="mt-1 font-body text-sm text-text-dark/60">
            {item.company} — {item.period}
          </div>
        </div>
        {/* The little "+" icon that rotates 45° into an "×" shape when
            the entry is open, as a visual open/close indicator. */}
        <Plus
          size={22}
          className={cn(
            "shrink-0 text-text-dark/60 transition-transform duration-300 ease-editorial",
            isOpen && "rotate-45",
          )}
        />
      </button>

      {/* This is the expand/collapse animation itself. Rather than
          measuring the content's height in JavaScript, it uses a CSS
          trick: a grid row that's told to be "0fr" tall (collapsed) or
          "1fr" tall (fully open), and the browser smoothly animates
          between those two states on its own. The inner overflow-hidden
          div is what actually clips the content while it's collapsed. */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-editorial"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="max-w-2xl pt-4 font-body text-text-dark/80">
            <p>{item.description}</p>

            {item.skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-divider px-3 py-1 text-xs uppercase tracking-wide text-text-dark/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {item.wins.length > 0 && (
              <ul className="mt-4 space-y-2">
                {item.wins.map((win) => (
                  <li key={win} className="flex gap-2 text-sm text-text-dark/70">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-dark/40" />
                    {win}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
