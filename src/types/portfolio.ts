// portfolio.ts: This file doesn't render anything on screen — it's the
// "shape" (a TypeScript type dictionary) that every piece of content in
// src/content/en.ts and src/content/de.ts must match. Think of it as a
// form template:
// it defines which fields (name, title, description, etc.) are required
// or optional for each kind of content block on the site, so that if
// someone edits portfolioData.ts and forgets a field or misspells one,
// the code editor immediately flags it instead of the mistake only
// showing up as a blank spot on the live website.

// A single social media / contact link (e.g. one row in the footer's
// social icon row, once that's turned back on).
export interface SocialLink {
  label: string;
  /** lucide-react icon name, e.g. "Github", "Linkedin", "Instagram", "Mail" */
  icon: string;
  url: string;
}

// One link in the floating navigation bar at the top of the page.
export interface NavLink {
  label: string;
  /** In-page anchor, e.g. "#work" — must match a section's id. */
  href: string;
}

// General site-wide info: your name, role, contact details, and the
// links used in the navbar/footer. Nearly every section of the site
// reads at least one field from this.
export interface SiteMeta {
  name: string;
  role: string;
  location: string;
  availability: string;
  email: string;
  resumeUrl: string;
  socials: SocialLink[];
  /** Set true to show the social icons in Contact — kept off for now. */
  socialsVisible: boolean;
  navLinks: NavLink[];
}

// A small reusable "heading block" shape — a short label above a title
// (the "eyebrow"), the title itself, and an optional short paragraph
// underneath. Used by the Selected Work and Experience & Services
// section intros (see workIntro / resumeIntro below).
export interface SectionIntro {
  eyebrow: string;
  heading: string;
  description?: string;
}

// The big headline content at the very top of the page (the Hero
// section) — the giant "DESIGN & DIRECTION" text and its CTA button.
export interface HeroContent {
  eyebrow: string;
  titleLines: string[];
  accentPhrase: string;
  ctaLabel: string;
  ctaUrl: string;
  /** Portrait shown in the hero background. Expected to be a photo with
   *  the background removed (a transparent PNG/WebP cutout) — the hero
   *  displays it uncropped (object-contain) and fades its bottom edge
   *  into the section, so a photo with a solid background would show up
   *  as an ugly rectangle instead of blending into the scene. */
  heroImage: string;
}

// One small preview card in the horizontally-scrolling marquee ribbon
// under the Hero.
export interface MarqueeItem {
  id: string;
  label: string;
  tag: string;
  image: string;
}

// One number in the "Years of Experience / Shipped Products / Client
// Partners" row in the About section.
export interface AboutStat {
  label: string;
  value: string;
}

// The whole About section's text content: the intro paragraphs and the
// three stat numbers above.
export interface AboutContent {
  heading: string;
  paragraphs: string[];
  stats: AboutStat[];
}

// One job in the work-history timeline (rendered as an expandable
// accordion row).
export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  wins: string[];
}

// One of the three numbered service offerings ("01 Brand & Identity",
// etc.) near the bottom of the Experience & Services section.
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

// One degree in the Education list.
export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  period: string;
}

// One show in the Exhibitions list, under Education in the resume
// section. `kind` is the small label above the title ("Solo Exhibition",
// "Group Show", …) and `description` is the one-line note underneath.
export interface ExhibitionItem {
  id: string;
  title: string;
  kind: string;
  venue: string;
  year: string;
  description: string;
}

// One row in the Languages list (e.g. "English — Native").
export interface LanguageItem {
  name: string;
  level: string;
}

// One case study card in the Selected Projects section.
export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  categoryTags: string[];
  description: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  images: string[];
}

// The heading, subheading, and button label shown in the Contact section.
export interface ContactContent {
  heading: string;
  subheading: string;
  ctaLabel: string;
}

// The master shape of the *entire* website's content. The one object in
// the content files (src/content/en.ts, src/content/de.ts) must match
// this exactly —
// every field listed here must exist there, with the matching type.
export interface PortfolioData {
  meta: SiteMeta;
  hero: HeroContent;
  marquee: MarqueeItem[];
  about: AboutContent;
  experience: ExperienceItem[];
  education: EducationItem[];
  /** Shown between Education and Soft Skills. An empty array hides the
   *  whole block, so it's safe to leave as [] if there's nothing to list. */
  exhibitions: ExhibitionItem[];
  softSkills: string[];
  languages: LanguageItem[];
  services: ServiceItem[];
  workIntro: SectionIntro;
  resumeIntro: SectionIntro;
  projects: ProjectItem[];
  contact: ContactContent;
}

/* ───────────────────────────────────────────────────────────────────────
 * Localisation (i18n)
 * ───────────────────────────────────────────────────────────────────────
 * The site ships in English ("en", the default) and German ("de").
 * See src/content/ for the two content files and src/i18n/ for the
 * provider that picks between them.
 */

/** Every language the site is available in. English is always the default. */
export type Locale = "en" | "de";

/**
 * The page <title> and <meta name="description"> for one locale. Applied
 * at runtime by src/i18n/useDocumentMeta.ts — index.html keeps the
 * English version as the fallback for crawlers that don't run JavaScript.
 */
export interface SeoMeta {
  title: string;
  description: string;
}

/**
 * "UI chrome" strings — the words that belong to the interface rather
 * than to your portfolio content: button labels, the screen-reader
 * labels on icon-only buttons, image alt text, and the SEO meta above.
 *
 * Anything written as {name}, {n}, {total} or {title} is a placeholder
 * that gets filled in at runtime (see src/i18n/fmt.ts). Keep those
 * braces exactly as they are when translating — the text around them can
 * change freely, but a renamed or deleted placeholder will show up
 * literally on the page.
 */
export interface UiStrings {
  seo: SeoMeta;

  /** Navbar, footer, and logo — mostly invisible screen-reader labels. */
  chrome: {
    backToTop: string;
    toggleMenu: string;
    siteLogo: string;
    /** Footer copyright line, after the year and name. */
    rightsReserved: string;
  };

  /** The EN | DE switcher. All of these are screen-reader only. */
  localeSwitcher: {
    /** Labels the control as a whole, e.g. "Language". */
    groupLabel: string;
    /** Per-language button label, e.g. "Switch to German". */
    switchTo: Record<Locale, string>;
  };

  hero: {
    /** The second, outline button next to the résumé download. */
    contactCta: string;
    /** Alt text for the portrait. Placeholder: {name}. */
    portraitAlt: string;
  };

  /** The four small headings in the résumé section. */
  resume: {
    education: string;
    exhibitions: string;
    softSkills: string;
    languages: string;
  };

  /** The quick-contact card in the closing section. */
  contactCard: {
    resumeLabel: string;
    resumeAction: string;
    emailLabel: string;
    /** Shown for two seconds after the visitor copies the address. */
    emailCopied: string;
  };

  project: {
    visitLiveSite: string;
    readCaseStudy: string;
    /** Desktop grid image alt. Placeholders: {title}, {n}. */
    previewAlt: string;
  };

  /** The mobile/tablet image carousel inside a project card. */
  carousel: {
    previousImage: string;
    nextImage: string;
    /** Dot button label. Placeholder: {n}. */
    goToImage: string;
    /** Carousel image alt. Placeholders: {title}, {n}, {total}. */
    slideAlt: string;
  };
}
