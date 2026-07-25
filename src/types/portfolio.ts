// portfolio.ts: This file doesn't render anything on screen — it's the
// "shape" (a TypeScript type dictionary) that every piece of content in
// src/data/portfolioData.ts must match. Think of it as a form template:
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
// portfolioData.ts (src/data/portfolioData.ts) must match this exactly —
// every field listed here must exist there, with the matching type.
export interface PortfolioData {
  meta: SiteMeta;
  hero: HeroContent;
  marquee: MarqueeItem[];
  about: AboutContent;
  experience: ExperienceItem[];
  education: EducationItem[];
  softSkills: string[];
  languages: LanguageItem[];
  services: ServiceItem[];
  workIntro: SectionIntro;
  resumeIntro: SectionIntro;
  projects: ProjectItem[];
  contact: ContactContent;
}
