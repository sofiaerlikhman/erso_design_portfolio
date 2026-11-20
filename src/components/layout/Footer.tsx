// Footer.tsx: The small closing strip at the very bottom of the page —
// the logo (which doubles as a "back to top" link), a second language
// switcher for visitors who have read all the way down, and the
// copyright line.
import { useContent, useUi } from "../../i18n/LocaleContext";
import { Logo } from "../ui/Logo";
import { LocaleSwitcher } from "../ui/LocaleSwitcher";
import { FOCUS_RING_DARK } from "../../lib/a11y";
import { cn } from "../../lib/cn";

export function Footer() {
  const { meta } = useContent();
  const ui = useUi();

  return (
    <footer className="border-t border-white/10 px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <a
          href="#top"
          aria-label={ui.chrome.backToTop}
          className={cn("rounded-full text-text-light/90", FOCUS_RING_DARK)}
        >
          <Logo className="h-8 w-auto" />
        </a>

        {/* Second language switcher. Someone who reaches the bottom of
            the page shouldn't have to scroll all the way back up to the
            navbar to change language. */}
        <LocaleSwitcher />

        <p className="font-body text-xs text-text-light/40">
          © {new Date().getFullYear()} {meta.name}. {ui.chrome.rightsReserved}
        </p>
      </div>
    </footer>
  );
}
