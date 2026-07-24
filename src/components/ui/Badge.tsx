// Badge.tsx: A small rounded pill label — used for project category tags
// ("Brand", "Product Design"), the "Available for Q3/Q4 Projects"
// status indicator, and soft-skill tags. One component, recolored for
// whichever surface it sits on, reused everywhere a little pill-shaped
// label is needed.
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface BadgeProps {
  // The text (or icon + text) shown inside the pill.
  children: ReactNode;
  className?: string;
  /** Adds a small pulsing dot before the label — for live status indicators. */
  dot?: boolean;
  /**
   * "light" (default) is tuned for dark surfaces (Hero, Contact,
   * ProjectCard). Use "dark" on cream/light surfaces (e.g. the
   * About/Services sections) — a light-on-light badge there would be as
   * unreadable as the navbar bug. Same convention as SectionEyebrow.
   */
  theme?: "dark" | "light";
}

export function Badge({ children, className, dot, theme = "light" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-wide",
        theme === "light"
          ? "border border-white/15 bg-white/5 text-text-light"
          : "border border-text-dark/20 bg-text-dark/5 text-text-dark",
        className,
      )}
    >
      {/* The little green pulsing dot shown on the availability badge —
          only rendered when the `dot` prop is turned on. */}
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
      )}
      {children}
    </span>
  );
}
