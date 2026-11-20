// ui.de.ts: DEUTSCHE OBERFLÄCHENTEXTE.
//
// Das Gegenstück zu src/content/ui.en.ts: Schaltflächen, die vier
// kleinen Überschriften im Lebenslauf-Abschnitt, Seitentitel und
// Suchmaschinen-Beschreibung sowie die Vorlesetexte für Schaltflächen,
// die nur aus einem Symbol bestehen (Menü, Pfeile im Bildkarussell).
// Die eigentlichen Inhalte stehen in src/content/de.ts.
//
// PLATZHALTER: {name}, {n}, {total} und {title} werden zur Laufzeit
// ersetzt. Die geschweiften Klammern bitte genau so stehen lassen — der
// Text drumherum darf frei umformuliert werden, ein umbenannter
// Platzhalter erscheint aber wörtlich auf der Seite.
//
// LÄNGE: Deutsch ist meist länger als Englisch. Die Texte hier sind so
// gewählt, dass sie in Schaltflächen und Navigationsleiste passen, ohne
// das Layout zu verändern.
import type { UiStrings } from "../types/portfolio";

export const uiDe: UiStrings = {
  seo: {
    title: "Erso Design — Portfolio & Lebenslauf",
    description:
      "Portfolio und Lebenslauf von Sofia Erlikhman, Grafik- und Webdesignerin in Wiesbaden: ausgewählte Arbeiten, Erfahrung und Kontakt.",
  },

  chrome: {
    backToTop: "Nach oben",
    toggleMenu: "Menü öffnen und schließen",
    siteLogo: "Logo",
    rightsReserved: "Alle Rechte vorbehalten.",
  },

  localeSwitcher: {
    groupLabel: "Sprache",
    switchTo: {
      en: "Zu Englisch wechseln",
      de: "Zu Deutsch wechseln",
    },
  },

  hero: {
    contactCta: "Kontakt",
    portraitAlt: "Porträt von {name}",
  },

  resume: {
    education: "Ausbildung",
    exhibitions: "Ausstellungen",
    softSkills: "Soft Skills",
    languages: "Sprachen",
  },

  contactCard: {
    resumeLabel: "Lebenslauf",
    resumeAction: "PDF öffnen",
    emailLabel: "E-Mail",
    // Kurz gehalten: Dieser Text ersetzt für zwei Sekunden die
    // E-Mail-Adresse in derselben schmalen Zeile. „In die
    // Zwischenablage kopiert" würde dort abgeschnitten.
    emailCopied: "Kopiert",
  },

  project: {
    visitLiveSite: "Website ansehen",
    readCaseStudy: "Fallstudie lesen",
    previewAlt: "{title} — Vorschau {n}",
  },

  carousel: {
    previousImage: "Vorheriges Bild",
    nextImage: "Nächstes Bild",
    goToImage: "Zu Bild {n}",
    slideAlt: "{title} — Vorschau {n} von {total}",
  },
};
