// de.ts: DEUTSCHE WEBSITE-INHALTE.
//
// Das deutsche Gegenstück zu src/content/en.ts, mit exakt demselben
// Aufbau. Beide sind als `: PortfolioData` typisiert — fehlt hier ein
// Feld, schlägt `npm run lint` fehl und sagt, welches. Die beiden
// Sprachen können also nicht unbemerkt auseinanderlaufen.
//
// HERKUNFT DER TEXTE: Wo das Portfolio-PDF (Sofia-Erlikhman-Portfolio-DE)
// bereits eine deutsche Formulierung hat, steht sie hier wörtlich —
// Über-mich-Text, alle vier Leistungen, die Projekttexte zu Five Bays,
// Sonnenkindern und DOBROVA, die Ausstellung und der Kontaktabschnitt.
// Alles Übrige ist im selben Ton neu geschrieben.
//
// ANREDE: durchgehend „Sie". Berufsbezeichnungen durchgehend weiblich.
//
// Bilder, E-Mail-Adresse, URLs und Werkzeugnamen sind in jeder Sprache
// gleich und stehen deshalb wortgleich wie in en.ts.
import type { PortfolioData } from "../types/portfolio";
import { images } from "./images";

export const de: PortfolioData = {
  // Gelesen von: Navbar, Footer, Hero, Contact.
  meta: {
    name: "Sofia Erlikhman",
    role: "Grafik- & Webdesignerin",
    location: "Wiesbaden, Deutschland",
    availability: "Verfügbar ab Dezember 2026",
    email: "sofiaerlikhman@gmail.com",
    resumeUrl: "resume.pdf",
    socials: [
      { label: "E-Mail", icon: "Mail", url: "mailto:sofiaerlikhman@gmail.com" },
      { label: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com/#" },
      { label: "Instagram", icon: "Instagram", url: "https://instagram.com/#" },
      { label: "Facebook", icon: "Facebook", url: "https://instagram.com/#" },
      { label: "TikTok", icon: "TikTok", url: "https://instagram.com/#" },
    ],
    socialsVisible: false,
    // Kurz gehalten: die vier Labels müssen nebeneinander in die
    // Navigationsleiste passen, neben Logo und Sprachumschalter.
    navLinks: [
      { label: "Über mich", href: "#about" },
      { label: "Lebenslauf", href: "#experience" },
      { label: "Arbeiten", href: "#work" },
      { label: "Kontakt", href: "#contact" },
    ],
  },

  // Gelesen von: Hero.
  hero: {
    eyebrow: "Portfolio & Lebenslauf — 2026",
    titleLines: ["GRAFIK- &", "WEBDESIGN"],
    accentPhrase: "Sofia Erlikhman",
    ctaLabel: "Lebenslauf (PDF)",
    ctaUrl: "resume.pdf",
    heroImage: images.heroPortrait,
  },

  // Gelesen von: MarqueeStrip. Die Tags stehen in schmalen Karten und
  // werden sonst abgeschnitten — bitte kurz halten.
  marquee: [
    { id: "vscode", label: "VS Code", tag: "Frontend-Entwicklung", image: images.vscode },
    { id: "cinema4d", label: "Cinema 4D", tag: "3D & Motion Design", image: images.cinema4d },
    { id: "canva", label: "Canva", tag: "Content-Produktion", image: images.canva },
    { id: "figma", label: "Figma", tag: "UI/UX & Prototyping", image: images.figma },
    { id: "adobe", label: "Adobe Creative Cloud", tag: "Brand & Grafikdesign", image: images.adobe },
    { id: "higgsfield", label: "Higgsfield AI", tag: "KI-Video & Motion", image: images.higgsfield },
    { id: "topview", label: "TopView AI", tag: "KI-Videoschnitt", image: images.topview },
    { id: "wordpress", label: "WordPress", tag: "Webdesign & CMS", image: images.wordpress },
    { id: "wix", label: "Wix Studio", tag: "Webdesign & Layout", image: images.wix },
    { id: "fontlab", label: "FontLab", tag: "Typografie", image: images.fontlab },
    { id: "webflow", label: "Webflow", tag: "Web ohne Code", image: images.webflow },
    { id: "claude-code", label: "Claude Code", tag: "Entwicklung mit KI", image: images.claudeCode },
    { id: "capcut", label: "CapCut", tag: "Videoschnitt & Social", image: images.capcut },
  ],

  // Gelesen von: About. Absatz 1 und 2 stehen wörtlich so im PDF (S. 3).
  about: {
    heading: "Über mich",
    paragraphs: [
      "Ich bin Grafik- und Webdesignerin und arbeite in den Bereichen Markenidentität, UI/UX-Design, Print, Verpackung und KI-generierte Medien. Egal in welchem Medium: Eine Marke soll immer nach sich selbst aussehen, auf der Visitenkarte genauso wie auf der ganzen Website.",
      "Durch mein Studium der Künstlichen Intelligenz verbinde ich strukturelles Denken mit gestalterischem Gespür. So mache ich aus komplexen Ideen Websites, die funktionieren, greifbare Produkte und Inhalte, die man sich gern ansieht.",
      "Gut auszusehen ist die leichtere Hälfte. Der Rest ist ein System, das auch dann noch funktioniert, wenn jemand anderes damit arbeitet: Vorlagen, druckfertige Daten und Regeln, mit denen eine Marke ohne mich weiterkommt.",
    ],
    stats: [
      { label: "Jahre Erfahrung", value: "3+" },
      { label: "Kernbereiche", value: "4" },
      { label: "Kunden", value: "11" },
    ],
  },

  // Gelesen von: ServicesResume (die aufklappbare Liste).
  // Rollen, Firmen und Zeiträume stehen so im PDF (S. 12).
  experience: [
    {
      id: "exp-1",
      role: "Selbstständige Projekte",
      company: "Freiberuflich & pro bono",
      period: "2022 — heute",
      description:
        "Digitale Produkte und Printkampagnen für eigene Auftraggeber und gemeinnützige Organisationen, mit Schwerpunkt auf Webdesign, Editorial-Layouts und Social-Media-Produktion.",
      skills: [
        "Webdesign",
        "Digitale Kataloge",
        "Printdesign",
        "Social Content",
      ],
      wins: [
        "Websites und interaktive digitale Kataloge gebaut",
        "Markenidentitäten und Printkampagnen pro bono für gemeinnützige Projekte gestaltet",
        "Social-Media-Vorlagen und Content-Bibliotheken aufgesetzt, mit denen Kunden weiter posten",
      ],
    },
    {
      id: "exp-2",
      role: "Lead Designerin & visuelle Strategin",
      company: "Five Bays Resort",
      period: "2025 — 2026",
      description:
        "Für Marke und Inhalte eines Luxusresorts verantwortlich, vom Webdesign über KI-generierte Medien bis zum Eröffnungsevent und zur Geschenkverpackung.",
      skills: [
        "Markenidentität",
        "Webdesign",
        "KI-Content & Video",
        "Print & Verpackung",
        "Eventdesign",
      ],
      wins: [
        "KI-generierte Bilder und Promo-Videos für die digitalen Kampagnen produziert",
        "Die Unternehmenswebsite, die Werbebroschüren und die Geschenktüten gestaltet",
        "Das Eröffnungsevent gemeinsam mit dem Team organisiert und visuell geplant",
      ],
    },
    {
      id: "exp-3",
      role: "Lead Designerin",
      company: "DuTACS GmbH",
      period: "2023 — 2026",
      description:
        "Ein komplettes Rebranding: neue visuelle Identität, eine responsive Webplattform, Printkampagnen und digitale Inhalte in jedem Format.",
      skills: [
        "Rebranding",
        "Webdesign",
        "Printwerbung",
        "Content-Produktion",
        "Grafikdesign",
      ],
      wins: [
        "Die Marke über Print und Digital hinweg neu aufgestellt",
        "Eine responsive Unternehmenswebsite gestaltet und live gebracht",
        "Sämtliche Printwerbung und die digitalen Inhalte dazu produziert",
      ],
    },
    {
      id: "exp-4",
      role: "Designerin & Social-Media-Managerin (pro bono)",
      company: "Sonnenkinder, gemeinnützige Organisation, Charkiw",
      period: "2020 — 2022",
      description:
        "Visuelle Gestaltung und Social Media für eine Hilfsorganisation in Charkiw, die Kinder mit Down-Syndrom und ihre Familien unterstützt.",
      skills: [
        "Marken- & Bildsprache",
        "Social-Media-Strategie",
        "Content-Produktion",
        "Printmaterial",
        "Öffentlichkeitsarbeit",
      ],
      wins: [
        "Den Social-Media-Auftritt und Grafikvorlagen gestaltet, mit denen die Ehrenamtlichen weiterarbeiten konnten",
        "Aufklärungsmaterial, Broschüren und Spendenkampagnen für den Druck gestaltet",
        "Die Kanäle der Organisation betreut und die täglichen Posts gemacht",
      ],
    },
  ],

  // Gelesen von: ServicesResume („Ausbildung"). Neueste zuerst, wie im
  // Lebenslauf. Abschlussbezeichnungen stehen so im PDF (S. 12).
  education: [
    {
      id: "edu-1",
      degree: "Master of Arts",
      field: "Kommunikationsdesign – Crossmedia Spaces",
      institution: "Hochschule RheinMain",
      period: "2023 — 2025",
    },
    {
      id: "edu-2",
      degree: "Bachelor of Science",
      field: "Künstliche Intelligenz",
      institution: "Nationale Universität für Radioelektronik Charkiw",
      period: "2021 — 2024",
    },
    {
      id: "edu-3",
      degree: "Bachelor of Arts",
      field: "Grafikdesign",
      institution: "Staatliche Akademie für Design und Kunst Charkiw",
      period: "2019 — 2023",
    },
  ],

  // Gelesen von: ServicesResume („Ausstellungen"). Leeres Array — [] —
  // blendet den ganzen Block aus. Text wörtlich aus dem PDF (S. 12).
  exhibitions: [
    {
      id: "exh-1",
      kind: "Einzelausstellung",
      title: "Fäden der Erinnerung",
      venue: "Wiesbaden",
      year: "2025",
      description:
        "Ukrainische Wyschywanka-Ornamente, neu interpretiert als zeitgenössisches Design. Drei regionale Zeitungen berichteten darüber.",
    },
  ],

  // Gelesen von: ServicesResume („Soft Skills"). Wörtlich aus dem PDF.
  softSkills: [
    "Kommunikation",
    "Führung",
    "Teamarbeit",
    "Anpassungsfähigkeit",
    "Problemlösung",
    "Creative Direction",
  ],

  // Gelesen von: ServicesResume („Sprachen"). Wörtlich aus dem PDF.
  languages: [
    { name: "Ukrainisch", level: "Muttersprache" },
    { name: "Russisch", level: "Muttersprache" },
    { name: "Englisch", level: "Fließend" },
    { name: "Deutsch", level: "Fließend" },
    { name: "Französisch", level: "Fließend" },
  ],

  // Gelesen von: ServicesResume (die nummerierten Blöcke 01–04).
  // Titel und Texte stehen wörtlich so im PDF (S. 11).
  services: [
    {
      id: "svc-1",
      title: "Brand- & Corporate Design",
      description:
        "Logos, visuelle Identitäten und Markenstrategie, damit ein Unternehmen überall gleich auftritt, wo Menschen ihm begegnen.",
    },
    {
      id: "svc-2",
      title: "Produkt- & Webdesign",
      description:
        "Responsive Websites, digitale Kataloge und App-Interfaces, die gut aussehen und aus Besuchern Kunden machen.",
    },
    {
      id: "svc-3",
      title: "KI-Medien & Content",
      description:
        "KI-Bild-Workflows, kurze Promo-Videos und Social-Media-Inhalte in jedem Format, das eine Kampagne braucht.",
    },
    {
      id: "svc-4",
      title: "Print & Verpackung",
      description:
        "Verpackungen, Drucksachen und druckfertige Daten, die von der Visitenkarte bis zum Versandkarton funktionieren.",
    },
  ],

  // Gelesen von: ServicesResume (der kleine Kopfblock links).
  resumeIntro: {
    eyebrow: "Lebenslauf & Qualifikationen",
    heading: "Erfahrung, Ausbildung und Stärken.",
    description:
      "Ein Überblick über meine letzten Stationen, mein Studium, die Soft Skills und die Sprachen, die ich spreche.",
  },

  // Gelesen von: SelectedProjects (Überschrift über den Projektkarten).
  workIntro: {
    eyebrow: "Portfolio",
    heading: "Ausgewählte Arbeiten",
  },

  // Gelesen von: SelectedProjects. Jeder Eintrag wird zu einer Karte.
  projects: [
    {
      id: "five-bays-resort",
      title: "Five Bays Resort",
      client: "Five Bays Resort, Silifke / Mersin, Türkei",
      categoryTags: ["Markensystem", "Webdesign", "KI-Medien & Verpackung"],
      description:
        "Als Lead Designerin war ich für den gesamten visuellen Auftritt des Resorts verantwortlich: Website, Broschüren und Kataloge, Social Media, KI-generierte Fotos und Videos, Geschenkverpackungen und das Eröffnungsevent.",
      liveUrl: "https://fivebaysresort.com/",
      images: [images.fiveBaysCover, images.fiveBaysPrint, images.fiveBaysMedia],
    },
    {
      id: "children-of-the-sun",
      title: "Sonnenkinder",
      client: "Sonnenkinder, Charkiw",
      categoryTags: ["Markenidentität", "Print", "Geschenkverpackung"],
      description:
        "Pro bono entstanden: visuelle Identität und Event-Branding für eine Hilfsorganisation und ihren Benefizmarathon, mit eigener Schrift, Verpackung, Socken-Merchandise und Drucksachen.",
      images: [images.detiSolntsaPoster, images.detiSolntsaPackaging, images.detiSolntsaCertificate],
    },
    {
      id: "dobrova-brand",
      title: "DOBROVA Brand",
      client: "DOBROVA",
      categoryTags: ["Digitale Broschüre", "Editorial Webdesign", "UI/UX"],
      description:
        "Eine digitale Broschüre im Magazinstil für eine interaktive Art-Couture-Ausstellung, die Laufstegfotos, Stationen der Künstlerin und Galerien ihrer Kunst zu einer durchgehenden, responsiven Scroll-Strecke verbindet.",
      images: [images.dobrovaMultiDevice, images.dobrovaMobileMockup, images.dobrovaDesktopMockup],
    },
    {
      id: "dutacs",
      title: "DuTACS GmbH",
      client: "DuTACS GmbH",
      categoryTags: ["Rebranding", "Unternehmenswebsite", "Printwerbung"],
      description:
        "Ein komplettes Rebranding für einen IATA-zertifizierten deutschen Geschäftsreise-Dienstleister: eine neue visuelle Identität auf der Unternehmenswebsite, in den Printkampagnen und in den digitalen Inhalten.",
      images: [images.dutacsCover, images.dutacsWebsite, images.dutacsPrint],
    },
    {
      id: "mainkreativraum",
      title: "MainKreativRaum",
      client: "MainKreativRaum, Frankfurt",
      categoryTags: ["Webdesign", "E-Commerce", "UI/UX"],
      description:
        "Website und E-Commerce für ein Frankfurter Kreativstudio mit Mal-, Zeichen- und Keramikkursen: ein buchbarer Kurskatalog mit Preisen pro Workshop, Gutscheine und ein eigenes Anfrageformular für Firmenevents, private Feiern und saisonale Formate.",
      liveUrl: "https://mainkreativraum.de/",
      images: [images.mainKreativRaumCover, images.mainKreativRaumBooking, images.mainKreativRaumPages],
    },
    {
      id: "mate-champagner",
      title: "Mate & Champagner",
      client: "Stadt Wiesbaden",
      categoryTags: ["UX-Architektur", "Webplattform", "Designsystem"],
      description:
        "Informationsarchitektur, Sitemap und responsives Webdesign für eine Veranstaltungs- und Stadtplattform: Events filtern, ausgewählte Orte entdecken und Rabatte für Studierende.",
      images: [images.mateChampagnerLaptop, images.mateChampagnerMockup, images.mateChampagnerUserFlow],
    },
    {
      id: "zooniam-concept",
      title: "Zooniam",
      client: "Konzeptprojekt",
      categoryTags: ["Markenidentität", "Verpackungsdesign", "Social Media"],
      description:
        "Ein durchgängiges Markenkonzept für eine moderne Tiernahrungsmarke: eigene Schrift, geometrische Mehrzweckverpackung, Feed-Gestaltung für Social Media und Merchandise.",
      images: [images.zooniamSocial, images.zooniamPackaging, images.zooniamTotes],
    },
    {
      id: "ukraine-museum-app",
      title: "Ukrainisches Kunstmuseum",
      client: "Konzeptprojekt",
      categoryTags: ["Mobile App", "UI/UX-Architektur", "Produktdesign"],
      description:
        "Ein App-Konzept für die ukrainische Kunstgeschichte: Navigation durch das Museum, Audioguide, Werke nach Epochen entdecken und digitale Tickets verwalten.",
      images: [images.museumAppInHand, images.museumAppShowcase, images.museumWireframes],
    },
  ],

  // Gelesen von: Contact. Wörtlich aus dem PDF (S. 13).
  contact: {
    heading: "GESTALTEN WIR ETWAS ZUSAMMEN",
    subheading:
      "Sie haben ein Projekt im Kopf oder möchten sich einfach austauschen? Schreiben Sie mir jederzeit.",
    ctaLabel: "Nachricht schreiben",
  },
};
