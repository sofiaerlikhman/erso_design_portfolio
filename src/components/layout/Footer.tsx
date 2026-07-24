// Footer.tsx: The very bottom of the page — just the logo and a
// copyright line. Kept intentionally simple (see the note below).
import { portfolioData } from "../../data/portfolioData";
import { Logo } from "../ui/Logo";
import { FOCUS_RING_DARK } from "../../lib/a11y";
import { cn } from "../../lib/cn";

/**
 * Deliberately minimal — email/resume/socials live in the Contact section's
 * card now, so there's nothing here that can go visually lopsided on
 * mobile. Always centered, on every breakpoint (no sm: override).
 */
export function Footer() {
  // Only `meta` (your name) is needed here — see portfolioData.ts.
  const { meta } = portfolioData;

  return (
    <footer className="border-t border-white/10 px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <a
          href="#top"
          aria-label="Back to top"
          className={cn("rounded-full text-text-light/90", FOCUS_RING_DARK)}
        >
          <Logo className="h-8 w-auto" />
        </a>
        <p className="font-body text-xs text-text-light/40">
          © {new Date().getFullYear()} {meta.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
