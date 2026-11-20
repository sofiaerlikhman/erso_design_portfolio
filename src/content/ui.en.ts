// ui.en.ts: ENGLISH UI STRINGS — the words that belong to the interface
// rather than to your portfolio content.
//
// Your actual content (bio, projects, jobs) lives in src/content/en.ts.
// This file holds the surrounding furniture: button labels, the four
// small résumé headings, the page title and description search engines
// show, and the screen-reader labels on icon-only buttons (the
// hamburger, the carousel arrows) which are never visible on screen but
// are the only thing a blind visitor hears.
//
// PLACEHOLDERS: {name}, {n}, {total} and {title} are filled in at
// runtime. Keep the braces exactly as written — reword everything
// around them as you like, but a renamed placeholder shows up literally
// on the page. See src/i18n/fmt.ts.
import type { UiStrings } from "../types/portfolio";

export const uiEn: UiStrings = {
  // Applied to <title> and <meta name="description"> at runtime.
  // index.html carries the same English text as a fallback for crawlers
  // that don't run JavaScript.
  seo: {
    title: "Erso Design — Portfolio & CV",
    description:
      "Portfolio and CV of Sofia Erlikhman, graphic and web designer in Wiesbaden: selected work, experience, and contact.",
  },

  chrome: {
    backToTop: "Back to top",
    toggleMenu: "Toggle menu",
    siteLogo: "Site logo",
    rightsReserved: "All rights reserved.",
  },

  localeSwitcher: {
    groupLabel: "Language",
    switchTo: {
      en: "Switch to English",
      de: "Switch to German",
    },
  },

  hero: {
    contactCta: "Contact",
    portraitAlt: "Portrait of {name}",
  },

  resume: {
    education: "Education",
    exhibitions: "Exhibitions",
    softSkills: "Soft Skills",
    languages: "Languages",
  },

  contactCard: {
    resumeLabel: "Resume",
    resumeAction: "Download PDF",
    emailLabel: "Email",
    emailCopied: "Copied to clipboard",
  },

  project: {
    visitLiveSite: "Visit live site",
    readCaseStudy: "Read case study",
    previewAlt: "{title} — preview {n}",
  },

  carousel: {
    previousImage: "Previous image",
    nextImage: "Next image",
    goToImage: "Go to image {n}",
    slideAlt: "{title} — preview {n} of {total}",
  },
};
