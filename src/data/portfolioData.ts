// portfolioData.ts: KEPT AS A COMPATIBILITY SHIM.
//
// The site is now bilingual, so there is no single "the content" any
// more — there's English content and German content. They live in:
//
//   src/content/en.ts     ← English text (the default language)
//   src/content/de.ts     ← German text
//   src/content/ui.en.ts  ← English button labels, alt text, SEO
//   src/content/ui.de.ts  ← the German equivalents
//
// ** To edit the English site, edit src/content/en.ts. ** It is the same
// object this file used to hold, with the same comments, so everything
// you already know about editing it still applies.
//
// Components no longer import from here. They call useContent() from
// src/i18n/LocaleContext.tsx, which hands them whichever language the
// visitor is reading. This re-export stays so that any older import of
// `portfolioData` keeps working and keeps meaning English.
export { en as portfolioData } from "../content/en";
