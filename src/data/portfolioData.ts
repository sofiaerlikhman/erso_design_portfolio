// portfolioData.ts: THIS is the file to edit if you want to change
// anything you can see on the website — your name, bio, projects, job
// history, stats, links, and so on. Every section component
// (src/components/sections/*.tsx) imports this file and displays
// whatever is written here; none of them have any text "hard-coded"
// inside them. So if you want to, say, add a new project, you only ever
// need to edit the `projects` array below — you never need to touch any
// .tsx file.
import type { PortfolioData } from "../types/portfolio";

// Project & marquee imagery. Vite resolves these to hashed URLs at build
// time. Replace any of these imports with your own files (drop them in
// src/assets/images/ and update the import path + the reference below) —
// nothing else in the codebase needs to change.
import auroraCover from "../assets/images/project-aurora-1.svg";
import auroraDetail from "../assets/images/project-aurora-2.svg";
import auroraGrid from "../assets/images/project-aurora-3.svg";
import meridianCover from "../assets/images/project-meridian-1.svg";
import meridianDetail from "../assets/images/project-meridian-2.svg";
import meridianFlow from "../assets/images/project-meridian-3.svg";
import northwindCover from "../assets/images/project-northwind-1.svg";
import northwindDetail from "../assets/images/project-northwind-2.svg";
import northwindGrid from "../assets/images/project-northwind-3.svg";
import marqueeLumen from "../assets/images/marquee-lumen.svg";
import marqueeFieldnote from "../assets/images/marquee-fieldnote.svg";
import marqueeAther from "../assets/images/marquee-ather.svg";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ─────────────────────────────────────────────────────────────────────────
 * Every string, link, stat, and image on the site is read from this object.
 * Edit values here to update the live site — no component files need to
 * change. See README.md for a walkthrough of common edits (add a project,
 * swap the bio, change the resume link, etc).
 */
export const portfolioData: PortfolioData = {
  // Read by: Navbar, Footer, Hero, Contact (your name/role/links show up
  // in all of these places).
  meta: {
    name: "Sofia Erlikhman",
    role: "Designer & Director",
    location: "Based in — set your city",
    availability: "Available for Q3/Q4 Projects",
    email: "hello@example.com",
    resumeUrl: "resume.pdf",
    socials: [
      { label: "Email", icon: "Mail", url: "mailto:hello@example.com" },
      { label: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com/in/your-handle" },
      { label: "Instagram", icon: "Instagram", url: "https://instagram.com/your-handle" },
      { label: "GitHub", icon: "Github", url: "https://github.com/your-handle" },
    ],
    // Off for now — flip to true whenever you're ready to show these.
    socialsVisible: false,
    navLinks: [
      { label: "Selected Work", href: "#work" },
      { label: "Experience", href: "#experience" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },

  // Read by: Hero (the big full-screen intro at the very top of the page).
  hero: {
    eyebrow: "Portfolio & CV — 2026",
    titleLines: ["DESIGN &", "DIRECTION"],
    accentPhrase: "crafted with intent",
    ctaLabel: "Download Resume",
    ctaUrl: "resume.pdf",
  },

  // Read by: MarqueeStrip (the row of small scrolling preview cards just
  // under the Hero).
  marquee: [
    { id: "aurora", label: "Aurora Systems", tag: "Brand & Product", image: auroraCover },
    { id: "lumen", label: "Lumen App", tag: "Product Design", image: marqueeLumen },
    { id: "meridian", label: "Meridian Studio", tag: "Web Platform", image: meridianCover },
    { id: "fieldnote", label: "Fieldnote", tag: "Editorial Site", image: marqueeFieldnote },
    { id: "northwind", label: "Northwind & Co.", tag: "Identity", image: northwindCover },
    { id: "ather", label: "Ather Studio", tag: "Brand Identity", image: marqueeAther },
  ],

  // Read by: About (the cream-colored bio section with the animated
  // typing-in paragraph and the three stat counters).
  about: {
    heading: "About",
    paragraphs: [
      "I'm a designer and director working across brand, product, and web — building visual systems that hold together at every scale, from a single icon to a full platform.",
      "My process starts with structure: clear hierarchies, honest typography, and motion that explains itself. Everything after that is refinement.",
      "Outside client work, I spend my time sketching type, studying editorial layout, and trying to make interfaces feel a little more considered than they need to.",
    ],
    stats: [
      { label: "Years of Experience", value: "8+" },
      { label: "Shipped Products", value: "24" },
      { label: "Client Partners", value: "16" },
    ],
  },

  // Read by: ServicesResume (rendered as the expandable job-history
  // accordion list).
  experience: [
    {
      id: "exp-1",
      role: "Design Director",
      company: "Studio Meridian",
      period: "2023 — Present",
      description:
        "Leading brand and product design for early-stage startups, from initial identity through to shipped interfaces.",
      skills: ["Figma", "Framer", "Design Systems", "Art Direction"],
      wins: [
        "Built a shared design system adopted across 6 product teams",
        "Directed rebrand that shipped alongside a $12M Series A",
      ],
    },
    {
      id: "exp-2",
      role: "Senior Product Designer",
      company: "Northwind & Co.",
      period: "2020 — 2023",
      description:
        "Owned end-to-end design for the core web app, partnering directly with engineering on implementation.",
      skills: ["React", "TypeScript", "User Research", "Prototyping"],
      wins: [
        "Redesigned onboarding, cutting drop-off by 34%",
        "Ran the first in-house usability lab for the product team",
      ],
    },
    {
      id: "exp-3",
      role: "Product Designer",
      company: "Aurora Systems",
      period: "2018 — 2020",
      description:
        "Designed core flows for a B2B SaaS platform and helped establish the company's first component library.",
      skills: ["Sketch", "HTML/CSS", "Illustration"],
      wins: [
        "Shipped the v1 component library still in use today",
        "Partnered with marketing on the product's first brand refresh",
      ],
    },
  ],

  // Read by: ServicesResume (the "Education" list).
  // Placeholder — replace with your real institutions/years.
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Arts",
      field: "Graphic Design",
      institution: "[Add institution name]",
      period: "20XX — 20XX",
    },
    {
      id: "edu-2",
      degree: "Bachelor of Science",
      field: "Artificial Intelligence",
      institution: "[Add institution name]",
      period: "20XX — 20XX",
    },
    {
      id: "edu-3",
      degree: "Master of Arts",
      field: "Communication Design",
      institution: "[Add institution name]",
      period: "20XX — 20XX",
    },
  ],

  // Read by: ServicesResume (the "Soft Skills" tag list). Just a plain
  // list of words — add, remove, or reword freely.
  softSkills: [
    "Communication",
    "Leadership",
    "Collaboration",
    "Adaptability",
    "Problem Solving",
    "Creative Direction",
  ],

  // Read by: ServicesResume (the "Languages" list).
  // Placeholder — replace with your actual languages (you mentioned 5).
  languages: [
    { name: "Language 1", level: "Native" },
    { name: "Language 2", level: "Fluent" },
    { name: "Language 3", level: "Fluent" },
    { name: "Language 4", level: "Conversational" },
    { name: "Language 5", level: "Conversational" },
  ],

  // Read by: ServicesResume (the "01 / 02 / 03" numbered service blocks
  // near the bottom of that section — the number itself is generated
  // automatically from each entry's position in this list, so you don't
  // need to keep a "number" field in sync by hand when reordering).
  services: [
    {
      id: "svc-1",
      title: "Brand & Identity",
      description:
        "Naming, visual identity, and the systems that keep a brand consistent from a business card to a billboard.",
    },
    {
      id: "svc-2",
      title: "Product & Web Design",
      description:
        "End-to-end interface design — research, wireframes, high-fidelity UI, and the design system that ties it together.",
    },
    {
      id: "svc-3",
      title: "Art Direction",
      description:
        "Creative direction for campaigns, photography, and motion — keeping every touchpoint on-brand and intentional.",
    },
  ],

  // Read by: ServicesResume (the small heading block in the sticky left
  // column of that section).
  resumeIntro: {
    eyebrow: "Experience & Services",
    heading: "Where I've worked, and how I can help.",
    description:
      "An expandable look at recent roles, followed by education, skills, and the core services I offer on client engagements.",
  },

  // Read by: SelectedProjects (the heading above the project cards).
  workIntro: {
    eyebrow: "Selected Work",
    heading: "Selected Projects",
  },

  // Read by: SelectedProjects (the sticky-stacking project cards
  // section). Each entry here becomes one card — see the ProjectItem
  // type in src/types/portfolio.ts for what every field does.
  projects: [
    {
      id: "aurora-systems",
      title: "Aurora Systems",
      client: "Aurora Systems, Inc.",
      year: "2025",
      categoryTags: ["Brand", "Product Design", "Design System"],
      description:
        "A full brand and product refresh for a B2B analytics platform — new identity, component library, and marketing site, shipped in a single quarter.",
      liveUrl: "https://example.com/aurora",
      caseStudyUrl: "https://example.com/aurora/case-study",
      images: [auroraCover, auroraDetail, auroraGrid],
    },
    {
      id: "meridian-studio",
      title: "Meridian Studio",
      client: "Meridian Studio",
      year: "2024",
      categoryTags: ["Web Platform", "UI/UX", "Mobile"],
      description:
        "A booking platform redesign spanning web and mobile, focused on simplifying a multi-step flow into three clear steps.",
      liveUrl: "https://example.com/meridian",
      caseStudyUrl: "https://example.com/meridian/case-study",
      images: [meridianCover, meridianDetail, meridianFlow],
    },
    {
      id: "northwind-co",
      title: "Northwind & Co.",
      client: "Northwind & Co.",
      year: "2023",
      categoryTags: ["Identity", "Packaging", "Editorial"],
      description:
        "Identity and packaging system for a specialty goods retailer, extended into an editorial-style catalog and web presence.",
      caseStudyUrl: "https://example.com/northwind/case-study",
      images: [northwindCover, northwindDetail, northwindGrid],
    },
  ],

  // Read by: Contact (the closing full-bleed call-to-action section).
  contact: {
    heading: "LET'S BUILD SOMETHING TOGETHER",
    subheading:
      "Have a project in mind, or just want to talk shop? My inbox is always open.",
    ctaLabel: "Start a Conversation",
  },
};
