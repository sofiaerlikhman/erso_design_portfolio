// useDocumentMeta.ts: Keeps everything *outside* the visible page in
// step with the chosen language — the things browsers, search engines
// and screen readers look at rather than the visitor.
//
// Four jobs, re-done whenever the language changes:
//   1. <html lang> — tells screen readers which language to pronounce,
//      and browsers which dictionary to use for spell-check and
//      translation offers. Getting this wrong makes a screen reader read
//      German text with English pronunciation rules, which is close to
//      unintelligible.
//   2. <title> and the meta description — what a search result and a
//      shared link preview show.
//   3. <link rel="canonical"> — tells Google which address is the real
//      one for the page it's looking at.
//   4. <link rel="alternate" hreflang="..."> — tells Google that the
//      English and German pages are the same page in two languages, so
//      it shows German searchers the German one instead of treating them
//      as duplicates competing with each other.
//
// A NOTE ON THE LIMITS OF THIS: all of the above happens in the browser
// after the page loads. Google runs JavaScript and will see it, but a
// crawler that doesn't execute JS only ever sees what's written in
// index.html — which is the English version. If per-language HTML
// straight from the server ever matters, that needs a prerender step at
// build time; it is not something this hook can do.
import { useEffect } from "react";
import type { Locale } from "../types/portfolio";
import { LOCALES, DEFAULT_LOCALE } from "../content";
import { useLocale, useUi } from "./LocaleContext";

/** The "?lang=de" parameter name — must match LocaleContext.tsx. */
const QUERY_PARAM = "lang";

/**
 * Finds a <link>/<meta> tag in the document head and creates it if it
 * isn't there. index.html only ships a description tag, so canonical and
 * the hreflang links get added on the fly the first time this runs.
 */
function upsertHeadTag(
  tag: "link" | "meta",
  selector: string,
  attributes: Record<string, string>,
): void {
  let element = document.head.querySelector(`${tag}${selector}`);

  if (!element) {
    element = document.createElement(tag);
    document.head.appendChild(element);
  }

  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }
}

/** The full public address of the site in one particular language. */
function localeUrl(locale: Locale): string {
  const url = new URL(window.location.href);

  // Only the language matters for these links, so strip the "#about"
  // hash and any other query parameters — otherwise every anchor the
  // visitor clicks would produce a different "canonical" address for
  // what is really one page.
  url.hash = "";
  url.search = "";

  if (locale !== DEFAULT_LOCALE) {
    url.searchParams.set(QUERY_PARAM, locale);
  }

  return url.toString();
}

export function useDocumentMeta(): void {
  const { locale } = useLocale();
  const ui = useUi();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = ui.seo.title;

    upsertHeadTag("meta", '[name="description"]', {
      name: "description",
      content: ui.seo.description,
    });

    upsertHeadTag("link", '[rel="canonical"]', {
      rel: "canonical",
      href: localeUrl(locale),
    });

    // One alternate link per language, plus x-default — the one Google
    // falls back to for a visitor whose language we don't publish.
    for (const alternate of LOCALES) {
      upsertHeadTag("link", `[rel="alternate"][hreflang="${alternate}"]`, {
        rel: "alternate",
        hreflang: alternate,
        href: localeUrl(alternate),
      });
    }

    upsertHeadTag("link", '[rel="alternate"][hreflang="x-default"]', {
      rel: "alternate",
      hreflang: "x-default",
      href: localeUrl(DEFAULT_LOCALE),
    });
  }, [locale, ui]);
}
