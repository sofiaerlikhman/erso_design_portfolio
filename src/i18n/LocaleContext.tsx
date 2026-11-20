// LocaleContext.tsx: Keeps track of which language the visitor is
// reading, and hands the right text to every component.
//
// HOW A LANGUAGE IS CHOSEN, in order:
//   1. The URL — "?lang=de" wins over everything, so a link you send
//      someone always opens in the language you meant.
//   2. What they picked last time (saved in the browser).
//   3. The language their browser asks for.
//   4. English.
//
// Why that order: an explicit choice has to outrank a guess. Somebody
// who clicks EN once on a German laptop keeps getting English on every
// later visit, because step 2 is checked before step 3.
//
// English lives at the plain URL with no "?lang=" on it at all. A
// visitor whose browser asks for German is sent to "?lang=de" on arrival
// (see the first-render effect in LocaleProvider), so the address bar
// always says which language is actually on screen.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale, PortfolioData, UiStrings } from "../types/portfolio";
import { DEFAULT_LOCALE, content, isLocale, ui } from "../content";

/** The "?lang=de" bit of the URL. */
const QUERY_PARAM = "lang";

/** Where the visitor's choice is remembered between visits. */
const STORAGE_KEY = "erso-design-locale";

/**
 * Reads the saved language choice. Wrapped in try/catch because
 * localStorage throws outright (rather than returning null) in a few
 * real situations — Safari private browsing, and browsers set to block
 * all site data. A visitor in that mode should still get a working site
 * in English, not a blank page.
 */
function readStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

function storeLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage unavailable or full — the language still works for this
    // visit, it just won't be remembered for the next one.
  }
}

/** Reads "?lang=xx" out of the current address, if it's a language we have. */
function readLocaleFromUrl(): Locale | null {
  const value = new URLSearchParams(window.location.search).get(QUERY_PARAM);
  return isLocale(value) ? value : null;
}

/**
 * The visitor's own language preference, as their browser reports it.
 *
 * navigator.languages is an ordered list, most-preferred first, so this
 * returns the first entry that matches a language the site actually
 * publishes: somebody whose list reads ["en-GB", "de"] gets English, not
 * German, because English comes first for them.
 *
 * Only the part before the hyphen is compared, so "de-AT" and "de-CH"
 * both count as German.
 *
 * A caveat worth knowing: this reflects the language the browser's own
 * interface is set to, which is not always the language someone wants to
 * read. Plenty of German speakers run an English system. That is why a
 * saved choice is checked first, and why one click on the switcher is
 * remembered from then on.
 */
function detectBrowserLocale(): Locale | null {
  // navigator.languages is missing on a few older browsers; the single
  // navigator.language is the long-standing fallback.
  const preferences = navigator.languages ?? [navigator.language];

  for (const tag of preferences) {
    const base = tag.split("-")[0]?.toLowerCase();
    if (isLocale(base)) return base;
  }

  return null;
}

function readInitialLocale(): Locale {
  return (
    readLocaleFromUrl() ??
    readStoredLocale() ??
    detectBrowserLocale() ??
    DEFAULT_LOCALE
  );
}

/**
 * Updates the address bar to match the chosen language, without
 * reloading the page.
 *
 * replaceState (rather than pushState) is the right call here: switching
 * language shouldn't stack up history entries, so the browser's Back
 * button still goes back to wherever the visitor came from instead of
 * stepping through every language toggle they tried.
 *
 * The "#about"-style hash is preserved untouched, so switching language
 * part-way down the page keeps you where you were.
 */
function syncUrl(locale: Locale): void {
  const url = new URL(window.location.href);

  if (locale === DEFAULT_LOCALE) {
    // English is the bare URL — drop the parameter rather than writing
    // "?lang=en", so the default address stays exactly as it is today.
    url.searchParams.delete(QUERY_PARAM);
  } else {
    url.searchParams.set(QUERY_PARAM, locale);
  }

  window.history.replaceState(window.history.state, "", url);
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Your portfolio content in the current language. */
  content: PortfolioData;
  /** Interface strings in the current language. */
  ui: UiStrings;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  // On first render, make the address bar agree with the language we
  // actually ended up showing. This matters when the language came from
  // the saved choice rather than the URL: a returning German visitor
  // opening the plain address gets German text, and the address becomes
  // "?lang=de" to match — so the page they then share says German too.
  useEffect(() => {
    syncUrl(locale);
    // Intentionally first-render only; every later change goes through
    // setLocale, which syncs the URL itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keeps the page in step with the browser's Back and Forward buttons.
  // Without this, going back to a "?lang=de" address would change the
  // URL but leave the text in English.
  useEffect(() => {
    function handlePopState() {
      const fromUrl = readLocaleFromUrl();
      setLocaleState(fromUrl ?? DEFAULT_LOCALE);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    storeLocale(next);
    syncUrl(next);
  }, []);

  // useMemo keeps this object identical between renders unless the
  // language actually changed, so components reading the context don't
  // re-render for no reason.
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      content: content[locale],
      ui: ui[locale],
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);

  if (!ctx) {
    // A clear error beats a confusing one: this fires the moment a
    // component tries to read text while sitting outside
    // <LocaleProvider> (see App.tsx), which would otherwise surface as
    // "cannot read property of null" somewhere unrelated.
    throw new Error("useLocale/useContent/useUi must be used inside <LocaleProvider>");
  }

  return ctx;
}

/** The current language plus the function that changes it. */
export function useLocale() {
  const { locale, setLocale } = useLocaleContext();
  return { locale, setLocale };
}

/**
 * Your portfolio content in the current language — the replacement for
 * `import { portfolioData }`. Use it exactly the same way:
 *
 *   const { about } = useContent();
 */
export function useContent(): PortfolioData {
  return useLocaleContext().content;
}

/** Interface strings (buttons, alt text, aria-labels) in the current language. */
export function useUi(): UiStrings {
  return useLocaleContext().ui;
}
