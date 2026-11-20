// Footer.tsx: The small closing strip at the very bottom of the page —
// the logo (which doubles as a "back to top" link) and the copyright
// line.
//
// No language switcher here on purpose: the one in the navbar is fixed
// to the top of the screen and visible from anywhere on the page, so a
// second copy down here would be redundant.
import { useContent, useUi } from "../../i18n/LocaleContext";
import { Logo } from "../ui/Logo";
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

        <p className="font-body text-xs text-text-light/40">
          © {new Date().getFullYear()} {meta.name}. {ui.chrome.rightsReserved}
        </p>
      </div>
    </footer>
  );
}
