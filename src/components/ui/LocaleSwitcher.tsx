// LocaleSwitcher.tsx: The EN | DE control that switches the site's
// language. It lives in the Navbar only — and there, outside the
// hamburger menu, so that nobody has to open a menu in a language they
// don't read in order to find their own. The navbar is fixed to the top
// of the screen, so the control stays reachable from anywhere on the
// page.
//
// It builds its own buttons from the LOCALES list in
// src/content/index.ts, so adding a third language there makes a third
// button appear here with no edit to this file.
import { LOCALES, LOCALE_LABELS } from "../../content";
import { useLocale, useUi } from "../../i18n/LocaleContext";
import { FOCUS_RING_DARK, TAP_SCALE } from "../../lib/a11y";
import { cn } from "../../lib/cn";

interface LocaleSwitcherProps {
  className?: string;
}

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const { locale, setLocale } = useLocale();
  const ui = useUi();

  return (
    // role="group" + aria-label is what tells a screen reader that these
    // two buttons belong together and what they're for, instead of
    // announcing two stray buttons called "EN" and "DE".
    <div
      role="group"
      aria-label={ui.localeSwitcher.groupLabel}
      // No padding and no border on this wrapper on purpose: either one
      // would make the control taller than the buttons inside it, and
      // the navbar pill sizes itself to its tallest child — so the pill
      // would grow a few pixels compared to how the site looks today.
      // The grouped look comes from the background alone.
      className={cn("flex shrink-0 items-center rounded-full bg-white/5", className)}
    >
      {LOCALES.map((option) => {
        const isActive = option === locale;

        return (
          <button
            key={option}
            type="button"
            onClick={() => setLocale(option)}
            // aria-pressed is the correct pattern for a toggle button
            // that stays "on": a screen reader announces the current
            // language as pressed, so a blind visitor can tell which one
            // they're reading without hunting for the visual highlight.
            aria-pressed={isActive}
            // "EN" and "DE" are far too terse to be announced usefully
            // on their own, so each button carries a full sentence
            // ("Switch to German") for screen readers while showing just
            // the two letters on screen.
            aria-label={ui.localeSwitcher.switchTo[option]}
            // lang= on the button itself, so a screen reader pronounces
            // the label with that language's own pronunciation rules.
            lang={option}
            className={cn(
              // Heights are chosen to match whatever sits next to the
              // switcher, so the navbar pill stays exactly as tall as it
              // is today: h-11 (44px) matches the hamburger button up to
              // the md breakpoint and keeps a comfortable touch target
              // on phones; from md: up the hamburger is gone and h-7
              // (28px) matches the logo.
              "flex h-11 min-w-11 items-center justify-center rounded-full px-2 font-body text-xs uppercase tracking-wider transition-colors md:h-7 md:min-w-0 md:px-2.5",
              isActive
                ? "bg-white/10 text-text-light"
                : "text-text-light/50 hover:text-text-light/80",
              FOCUS_RING_DARK,
              TAP_SCALE,
            )}
          >
            {LOCALE_LABELS[option]}
          </button>
        );
      })}
    </div>
  );
}
