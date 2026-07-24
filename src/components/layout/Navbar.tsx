// Navbar.tsx: The floating pill-shaped navigation bar fixed to the top
// of every page. Shows the logo and nav links on desktop; collapses
// into a hamburger menu that drops open a small menu panel on mobile.
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "../ui/Logo";
import { FOCUS_RING_DARK, TAP_SCALE } from "../../lib/a11y";
import { cn } from "../../lib/cn";
import { portfolioData } from "../../data/portfolioData";

export function Navbar() {
  // The list of nav links ("Selected Work", "Experience", etc.) — read
  // from portfolioData.ts's meta.navLinks, so adding/renaming/removing a
  // nav link only requires editing that data file.
  const navLinks = portfolioData.meta.navLinks;

  // isOpen: whether the mobile dropdown menu is currently showing
  // (true) or hidden (false). Only relevant on small screens — the
  // hamburger button and dropdown are hidden entirely on desktop.
  const [isOpen, setIsOpen] = useState(false);

  // Whether the visitor prefers reduced motion — used below to shorten
  // the dropdown's open/close animation almost to nothing.
  const shouldReduceMotion = useReducedMotion();

  // Closes the mobile menu — called after tapping any link inside it,
  // so the menu doesn't stay open once you've navigated away.
  function handleLinkClick() {
    setIsOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-4">
      <div className="w-full max-w-3xl">
        {/*
          Solid-ish dark glass regardless of what section is scrolled
          underneath — this pill used to be bg-white/10, which read fine
          over the dark hero but became nearly impossible to read over the cream
          sections (light text on a near-white translucent pill).
        */}
        <div className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-bg-dark/75 px-5 py-3 shadow-lg shadow-black/20 backdrop-blur-md">
          <a
            href="#top"
            aria-label="Back to top"
            className={cn("rounded-full text-text-light", FOCUS_RING_DARK)}
          >
            <Logo className="h-6 w-auto sm:h-7" />
          </a>

          {/* The horizontal link row — hidden on small screens (hidden),
              shown as a flex row from the "md" breakpoint up (md:flex). */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md font-body text-sm text-text-light/80 transition-colors hover:text-text-light",
                  FOCUS_RING_DARK,
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* The hamburger/close button — only visible below the "md"
              breakpoint (md:hidden), i.e. the opposite of the nav above. */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full text-text-light md:hidden",
              FOCUS_RING_DARK,
              TAP_SCALE,
            )}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* AnimatePresence lets this dropdown panel play a fade/slide-out
            animation when it closes, instead of just vanishing instantly —
            it only renders anything at all while isOpen is true. */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top" }}
              className="mt-2 overflow-hidden rounded-3xl border border-white/15 bg-bg-dark/95 backdrop-blur-md md:hidden"
            >
              <div className="flex flex-col gap-1 p-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "min-h-11 rounded-2xl px-4 py-3 font-body text-sm text-text-light/80 transition-colors hover:bg-white/10 hover:text-text-light",
                      FOCUS_RING_DARK,
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
