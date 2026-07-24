// SectionEyebrow.tsx: The tiny uppercase label that sits above a
// section's big heading (things like "ABOUT" or "SELECTED WORK"). A
// small, reusable "common" component — see src/components/common/ for
// other shared pieces like this one.
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface SectionEyebrowProps {
  children: ReactNode;
  /** "light" for dark section backgrounds (Hero, SelectedProjects), "dark" for cream backgrounds (About, ServicesResume). */
  theme?: "dark" | "light";
  className?: string;
}

/**
 * The small uppercase tracked label above a section's main heading (e.g.
 * "SELECTED WORK", "ABOUT"). This exact style previously appeared as a
 * hand-copied <p> tag in Hero, About, ServicesResume (x4), and
 * SelectedProjects — extracted here so it only needs to be right once.
 */
export function SectionEyebrow({ children, theme = "light", className }: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "font-body text-sm uppercase tracking-[0.3em]",
        theme === "dark" ? "text-text-dark/50" : "text-text-light/50",
        className,
      )}
    >
      {children}
    </p>
  );
}
