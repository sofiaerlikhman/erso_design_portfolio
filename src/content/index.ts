// index.ts: THE LOCALE REGISTRY — the one place that knows which
// languages exist and where each one's text lives.
//
// Adding a third language (say French) is three steps:
//   1. Add "fr" to the Locale type in src/types/portfolio.ts
//   2. Copy en.ts → fr.ts and ui.en.ts → ui.fr.ts, then translate them
//   3. Add the two "fr:" lines to the maps below
// The EN | DE switcher reads LOCALES, so a third button appears on its
// own — no component needs editing.
import type { Locale, PortfolioData, UiStrings } from "../types/portfolio";
import { en } from "./en";
import { de } from "./de";
import { uiEn } from "./ui.en";
import { uiDe } from "./ui.de";

/** English is first on purpose — it is the default and the fallback. */
export const LOCALES: readonly Locale[] = ["en", "de"] as const;

/** The language a visitor gets when they've never chosen one. */
export const DEFAULT_LOCALE: Locale = "en";

/** What each language is called in its own language, for the switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  de: "DE",
};

/** Your portfolio content — bio, projects, jobs — per language. */
export const content: Record<Locale, PortfolioData> = { en, de };

/** Interface furniture — buttons, labels, alt text, SEO — per language. */
export const ui: Record<Locale, UiStrings> = { en: uiEn, de: uiDe };

/** True if some arbitrary string is one of the languages we actually have. */
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}
