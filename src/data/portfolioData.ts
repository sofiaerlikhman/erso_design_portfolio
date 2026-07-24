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
    role: "Web & Graphik Designer",
    location: "Based in Germany",
    availability: "Available for Q3/Q4 Projects",
    email: "sofiaerlikhman@gmail.com",
    resumeUrl: "resume.pdf",
    socials: [
      { label: "Email", icon: "Mail", url: "mailto:sofiaerlikhman@gmail.com" },
      { label: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com/#" },
      { label: "Instagram", icon: "Instagram", url: "https://instagram.com/#" },
      { label: "Facebook", icon: "Facebook", url: "https://instagram.com/#" },
      { label: "TikTok", icon: "TikTok", url: "https://instagram.com/#" },
    ],
    // Off for now — flip to true whenever you're ready to show these.
    socialsVisible: false,
    navLinks: [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Selected Work", href: "#work" },
      { label: "Contact", href: "#contact" },
    ],
  },

  // Read by: Hero (the big full-screen intro at the very top of the page).
  hero: {
    eyebrow: "Portfolio & CV — 2026",
    titleLines: ["GRAPHIC &", "WEB DESIGN"],
    accentPhrase: "Sofia Erlikhman",
    ctaLabel: "Download Resume",
    ctaUrl: "resume.pdf",
  },

  // Read by: MarqueeStrip (the row of small scrolling preview cards just
  // under the Hero).
  marquee: [
    { id: "figma", label: "figma",  image: auroraCover },
    { id: "adobe", label: "Lumen App", image: marqueeLumen },
    { id: "wordpress", label: "Meridian Studio", image: meridianCover },
    { id: "wix", tag: "Editorial Site", image: marqueeFieldnote },
    { id: "vscode", tag: "Editorial Site", image: marqueeFieldnote },
    { id: "cinema4d", tag: "Editorial Site", image: marqueeFieldnote },
    { id: "topview", image: marqueeFieldnote },
    { id: "canva", image: northwindCover },
    { id: "higgsfield", label: "Ather Studio", tag: "Brand Identity", image: marqueeAther },
  ],

  // Read by: About (the cream-colored bio section with the animated
  // typing-in paragraph and the three stat counters).
  about: {
    heading: "About",
    paragraphs: [
      "I am a graphic and web designer working across brand identity, print, and AI design. I build cohesive visual systems that hold together at every scale, from physical packaging to full digital platforms.",
      "My background in machine learning and AI allows me to combine structural logic with design intuition. I turn complex ideas into functional websites, physical products, and engaging visual content.",
      "Design is more than just making things look good. It is about how smart systems, quality content, and visual craft come together to create meaningful experiences.",
    ],
  //    stats: [
  //    { label: "Years of Experience", value: "3+" },
  //     { label: "Shipped Products", value: "24" },
  //    { label: "Client Partners", value: "16" },
  //   ],
  },

  // Read by: ServicesResume (rendered as the expandable job-history
  // accordion list).
  experience: [
    {
      id: "exp-1",
      role: "Lead Designer & Visual Strategist",
      company: "Five Bays Resort",
      period: "2025 — Present",
      description:
      "Directing ongoing brand development and content production for a luxury resort venture, overseeing everything from website design and AI-generated media to launch event planning and custom packaging.",
  skills: [
    "Brand Identity",
    "Web Design",
    "AI Content & Video",
    "Print & Packaging",
    "Event Design"
  ],
  wins: [
    "Produced AI-driven promo videos and visual assets for digital marketing campaigns",
    "Designed the corporate website, promotional brochures, and physical gift bags",
    "Co-organized and executed the visual design strategy for the resort launch event"
  ],
    },
    {
      id: "exp-2",
      role: "Lead Designer",
      company: "DuTACS GmbH",
      period: "2023 — Present",
      description:
      "Spearheaded a complete brand overhaul, designing a responsive web platform, managing print marketing campaigns, and producing multi-format digital content.",
    skills: [
      "Rebranding",
      "Web Design",
      "Print Advertising",
      "Content Creation",
      "Graphic Design"
    ],
    wins: [
      "Executed a comprehensive company rebranding across digital and physical mediums",
      "Designed and launched a modern, responsive corporate website",
      "Produced all print advertising collateral and multimedia content pipelines"
      ],
    },
    {
      id: "exp-3",
      role: "Independent Projects",
company: "Freelance & Pro Bono Work",
  period: "2023 — Present",
  description:
    "Designing digital products and print campaigns for independent clients and non-profits, specializing in web design, editorial layouts, and social media production.",
     skills: [
    "Web Design",
    "Digital Catalogues",
    "Print Design",
    "Social Content",
     ],
      wins: [
        "Designed custom websites and interactive digital catalogues tailored to specific client goals",
        "Delivered pro bono brand identities and print campaigns for community-driven initiatives",
        "Developed cohesive social media templates and visual content libraries for diverse audiences"
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
    { name: "Ukrainian", level: "Native" },
    { name: "Russian", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "German", level: "Fluent" },
    { name: "French", level: "Fluent" },
  ],

  // Read by: ServicesResume (the "01 / 02 / 03" numbered service blocks
  // near the bottom of that section — the number itself is generated
  // automatically from each entry's position in this list, so you don't
  // need to keep a "number" field in sync by hand when reordering).
  //   services: [
  //     {
  //       id: "svc-1",
  //       title: "Brand & Identity",
  //       description:
  //         "Naming, visual identity, and the systems that keep a brand consistent from a business card to a billboard.",
  //     },
  //     {
  //       id: "svc-2",
  //       title: "Product & Web Design",
  //       description:
  //         "End-to-end interface design — research, wireframes, high-fidelity UI, and the design system that ties it together.",
  //     },
  //     {
  //       id: "svc-3",
  //       title: "Art Direction",
  //       description:
  //         "Creative direction for campaigns, photography, and motion — keeping every touchpoint on-brand and intentional.",
  //     },
  //   ],

  // Read by: ServicesResume (the small heading block in the sticky left
  // column of that section).
  resumeIntro: {
    eyebrow: "Resume & Credentials",
    heading: "Experience, education, and core strengths.",
    description:
      "A summary of my recent roles, academic foundation, interpersonal skills, and spoken languages.",
  },

  // Read by: SelectedProjects (the heading above the project cards).
  workIntro: {
    eyebrow: "Portfolio",
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
     //  liveUrl: "https://example.com/aurora",
     //  caseStudyUrl: "https://example.com/aurora/case-study",
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
      // liveUrl: "https://example.com/meridian",
      caseStudyUrl: "https://example.com/meridian/case-study",
      // images: [meridianCover, meridianDetail, meridianFlow],
    },
    {
      id: "northwind-co",
      title: "Northwind & Co.",
      client: "Northwind & Co.",
      year: "2023",
      categoryTags: ["Identity", "Packaging", "Editorial"],
      description:
        "Identity and packaging system for a specialty goods retailer, extended into an editorial-style catalog and web presence.",
      // caseStudyUrl: "https://example.com/northwind/case-study",
      // images: [northwindCover, northwindDetail, northwindGrid],
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
