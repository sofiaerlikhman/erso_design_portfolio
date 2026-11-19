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
// Hero portrait — a transparent-background cutout shown behind the
// headline (see Hero.tsx). To swap it for a different photo later, use
// the same background-removed approach and drop the file in
// src/assets/images/, then point this import at it.
import heroPortrait from "../assets/images/heroPortrait.webp";

// 1. Children of the Sun
import detiSolntsaPackaging from "../assets/images/detiSolntsaPackaging.webp";
import detiSolntsaPoster from "../assets/images/detiSolntsaPoster.webp";
import detiSolntsaCertificate from "../assets/images/detiSolntsaCertificate.webp";

// 2. Zooniam
import zooniamPackaging from "../assets/images/zooniamPackaging.webp";
import zooniamSocial from "../assets/images/zooniamSocial.webp";
import zooniamTotes from "../assets/images/zooniamTotes.webp";

// 3. DOBROVA Brand
import dobrovaMobileMockup from "../assets/images/dobrovaMobileMockup.webp";
import dobrovaDesktopMockup from "../assets/images/dobrovaDesktopMockup.webp";
import dobrovaMultiDevice from "../assets/images/dobrovaMultiDevice.webp";

// 4. Mate & Champagner
import mateChampagnerMockup from "../assets/images/mateChampagnerMockup.webp";
import mateChampagnerUserFlow from "../assets/images/mateChampagnerUserFlow.webp";
import mateChampagnerLaptop from "../assets/images/mateChampagnerLaptop.webp";

// 5. Ukrainian Art Museum App
import museumAppShowcase from "../assets/images/museumAppShowcase.webp";
import museumWireframes from "../assets/images/museumWireframes.webp";
import museumAppInHand from "../assets/images/museumAppInHand.webp";

// 6. Five Bays Resort — PLACEHOLDER artwork. Drop the real images into
// src/assets/images/ and point these three imports at them.
import fiveBaysCover from "../assets/images/project-fivebays-1.svg";
import fiveBaysPrint from "../assets/images/project-fivebays-2.svg";
import fiveBaysMedia from "../assets/images/project-fivebays-3.svg";

// 7. DuTACS GmbH — PLACEHOLDER artwork, same as above.
import dutacsCover from "../assets/images/project-dutacs-1.svg";
import dutacsWebsite from "../assets/images/project-dutacs-2.svg";
import dutacsPrint from "../assets/images/project-dutacs-3.svg";

// 8. MainKreativRaum — PLACEHOLDER artwork, same as above.
import mainKreativRaumCover from "../assets/images/project-mainkreativraum-1.svg";
import mainKreativRaumBooking from "../assets/images/project-mainkreativraum-2.svg";
import mainKreativRaumPages from "../assets/images/project-mainkreativraum-3.svg";

// 9. Hard Skills
import figma from "../assets/images/figma.webp";
import adobe from "../assets/images/adobe.webp";
import higgsfield from "../assets/images/higgsfield.webp";
import topview from "../assets/images/topview.webp";
import wordpress from "../assets/images/wordpress.webp";
import wix from "../assets/images/wix.webp";
import vscode from "../assets/images/vscode.webp";
import cinema4d from "../assets/images/cinema4d.webp";
import canva from "../assets/images/canva.webp";
import fontlab from "../assets/images/fontlab.webp";
// PLACEHOLDER logo tiles — swap for the real marks when you have them.
import webflow from "../assets/images/marquee-webflow.svg";
import claudeCode from "../assets/images/marquee-claude-code.svg";
import capcut from "../assets/images/marquee-capcut.svg";

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
    role: "Graphic & Web Designer",
    location: "Based in Wiesbaden, Germany",
    availability: "Available from December 2026",
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
    heroImage: heroPortrait,
  },

  // Read by: MarqueeStrip (the row of small scrolling preview cards just
  // under the Hero).
  marquee: [
  { id: "vscode", label: "VS Code", tag: "Front-End Development", image: vscode },
  { id: "cinema4d", label: "Cinema 4D", tag: "3D & Motion Graphics", image: cinema4d },
  { id: "canva", label: "Canva", tag: "Rapid Content Creation", image: canva },
  { id: "figma", label: "Figma", tag: "UI/UX & Prototyping", image: figma },
  { id: "adobe", label: "Adobe Creative Cloud", tag: "Brand & Graphic Design", image: adobe },
  { id: "higgsfield", label: "Higgsfield AI", tag: "AI Video & Motion Generation", image: higgsfield },
  { id: "topview", label: "TopView AI", tag: "AI Video Editing & Content", image: topview },
  { id: "wordpress", label: "WordPress", tag: "Web Design & CMS", image: wordpress },
  { id: "wix", label: "Wix Studio", tag: "Web Design & Layout", image: wix },
  { id: "fontlab", label: "FontLab", tag: "Typography", image: fontlab },
  { id: "webflow", label: "Webflow", tag: "Visual Web Development", image: webflow },
  { id: "claude-code", label: "Claude Code", tag: "AI-Assisted Development", image: claudeCode },
  { id: "capcut", label: "CapCut", tag: "Video Editing & Social Cuts", image: capcut },
  ],

  // Read by: About (the cream-colored bio section with the animated
  // typing-in paragraph and the three stat counters).
  about: {
    heading: "About",
    paragraphs: [
      "I am a graphic and web designer working across brand identity, user interfaces, print, packaging, and AI-generated media. Whatever the medium, I make sure a brand still looks like itself, on a business card as much as on a full website.",
      "My background in machine learning and AI lets me combine structural logic with design intuition. That helps me turn complex ideas into websites that work, physical products and visual content people actually look at.",
      "Design is more than just making things look good. It is about how smart systems, quality content, and visual craft come together to create meaningful experiences.",
    ],
      stats: [
      { label: "Years of Experience", value: "3+" },
       { label: "Core Disciplines", value: "4" },
      { label: "Clients", value: "11" },
     ],
  },

  // Read by: ServicesResume (rendered as the expandable job-history
  // accordion list).
  experience: [
    {
      id: "exp-1",
      role: "Independent Projects",
      company: "Freelance & Pro Bono Work",
      period: "2022 — Present",
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
        "Developed cohesive social media templates and visual content libraries for diverse audiences",
      ],
    },
    {
      id: "exp-2",
      role: "Lead Designer & Visual Strategist",
      company: "Five Bays Resort",
      period: "2025 — 2026",
      description:
        "Directed brand development and content production for a luxury resort venture, overseeing everything from website design and AI-generated media to launch event planning and custom packaging.",
      skills: [
        "Brand Identity",
        "Web Design",
        "AI Content & Video",
        "Print & Packaging",
        "Event Design",
      ],
      wins: [
        "Produced AI-driven promo videos and visual assets for digital marketing campaigns",
        "Designed the corporate website, promotional brochures, and physical gift bags",
        "Co-organized and executed the visual design strategy for the resort launch event",
      ],
    },
    {
      id: "exp-3",
      role: "Lead Designer",
      company: "DuTACS GmbH",
      period: "2023 — 2026",
      description:
        "Spearheaded a complete brand overhaul, designing a responsive web platform, managing print marketing campaigns, and producing multi-format digital content.",
      skills: [
        "Rebranding",
        "Web Design",
        "Print Advertising",
        "Content Creation",
        "Graphic Design",
      ],
      wins: [
        "Executed a comprehensive company rebranding across digital and physical mediums",
        "Designed and launched a modern, responsive corporate website",
        "Produced all print advertising collateral and multimedia content pipelines",
      ],
    },
    {
      id: "exp-4",
      role: "Designer & SMM Specialist (Pro Bono)",
      company: "Children of the Sun, charitable organisation, Kharkiv",
      period: "2020 — 2022",
      description:
        "Delivered pro bono visual design and social media management for a regional non-profit supporting children with chromosomal conditions and their families in Kharkiv.",
      skills: [
        "Brand & Visual Design",
        "Social Media Strategy",
        "Content Creation",
        "Print Collateral",
        "Community Outreach",
      ],
      wins: [
        "Developed cohesive social media visual identity and graphic templates to increase community awareness",
        "Created print educational materials, brochures, and campaign assets for fundraising initiatives",
        "Managed social channels to grow digital engagement and strengthen family support networks",
      ],
    },
  ],

  // Read by: ServicesResume (the "Education" list).
  // Listed newest first, matching the CV.
  education: [
    {
      id: "edu-1",
      degree: "Master of Arts",
      field: "Communication Design – Crossmedia Spaces",
      institution: "Hochschule RheinMain",
      period: "2023 — 2025",
    },
    {
      id: "edu-2",
      degree: "Bachelor of Science",
      field: "Artificial Intelligence",
      institution: "Kharkiv National University of Radio Electronics",
      period: "2021 — 2024",
    },
    {
      id: "edu-3",
      degree: "Bachelor of Arts",
      field: "Graphic Design",
      institution: "State Academy of Design and Arts, Kharkiv",
      period: "2019 — 2023",
    },
  ],

  // Read by: ServicesResume (the "Exhibitions" list, shown between
  // Education and Soft Skills). Leave this as an empty array — [] — and
  // the whole block disappears from the page.
  exhibitions: [
    {
      id: "exh-1",
      kind: "Solo Exhibition",
      title: "Fäden der Erinnerung (Threads of Memory)",
      venue: "Wiesbaden",
      year: "2025",
      description:
        "Ukrainian vyshyvanka ornaments reinterpreted as contemporary design. Covered by three regional newspapers.",
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

  // Read by: ServicesResume (the "01 / 02 / 03 / 04" numbered service
  // blocks near the bottom of that section — the number itself is
  // generated automatically from each entry's position in this list, so
  // you don't need to keep a "number" field in sync by hand when
  // reordering).
  services: [
    {
      id: "svc-1",
      title: "Brand & Corporate Design",
      description:
        "Logos, visual identity systems and brand strategy, so a company looks the same wherever people meet it.",
    },
    {
      id: "svc-2",
      title: "Product & Web Design",
      description:
        "Responsive websites, digital catalogues and user interfaces that look good and turn visitors into customers.",
    },
    {
      id: "svc-3",
      title: "AI Media & Content",
      description:
        "AI image workflows, short promo videos and social media content in every format a campaign needs.",
    },
    {
      id: "svc-4",
      title: "Print & Packaging",
      description:
        "Physical packaging, print collateral and production-ready files that hold up from a business card to a shipping box.",
    },
  ],

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
      id: "five-bays-resort",
      title: "Five Bays Resort",
      client: "Five Bays Resort, Silifke / Mersin, Türkiye",
      categoryTags: ["Brand System", "Web Design", "AI Media & Packaging"],
      description:
        "The entire visual presence for a 180-suite luxury resort spread across five natural bays on the Turkish coast — corporate website, brochures and catalogues, a social media concept, AI-generated photography and video, gift packaging, and the launch event, all delivered in Turkish, English, and German.",
      liveUrl: "https://fivebaysresort.com/",
      images: [fiveBaysCover, fiveBaysPrint, fiveBaysMedia],
    },
    {
      id: "children-of-the-sun",
      title: "Children of the Sun",
      client: "Children of the Sun, Kharkiv",
      categoryTags: ["Brand Identity", "Print", "Gift Packaging"],
      description:
        "Complete pro bono visual identity and event branding for a charity marathon and non-profit featuring custom typography, gift packaging, participant certificates, and promotional print media.",
      images: [detiSolntsaPoster, detiSolntsaPackaging, detiSolntsaCertificate],
    },
    {
      id: "dobrova-brand",
      title: "DOBROVA Brand",
      client: "DOBROVA",
      categoryTags: ["Digital Brochure", "Editorial Web Design", "UI/UX"],
      description:
        "An editorial digital brochure designed for an interactive art couture exhibition, blending high-fashion runway photography, artist milestones, and fine art galleries into a responsive digital experience.",
      images: [dobrovaMultiDevice, dobrovaMobileMockup, dobrovaDesktopMockup],
    },
    {
      id: "dutacs",
      title: "DuTACS GmbH",
      client: "DuTACS GmbH",
      categoryTags: ["Rebranding", "Corporate Website", "Print Advertising"],
      description:
        "A full brand overhaul for an IATA-certified German corporate travel management company — a new visual identity carried across a responsive corporate website, print advertising campaigns, and multi-format digital content. The version of dutacs.de online today is a later redesign by another team.",
      images: [dutacsCover, dutacsWebsite, dutacsPrint],
    },
    {
      id: "mainkreativraum",
      title: "MainKreativRaum",
      client: "MainKreativRaum, Frankfurt",
      categoryTags: ["Web Design", "E-Commerce", "UI/UX"],
      description:
        "Website and e-commerce design for a Frankfurt creative studio running painting, drawing, and ceramics workshops — a bookable course catalogue with per-workshop pricing, gift vouchers, and a separate enquiry flow for team events, private celebrations, and seasonal formats.",
      liveUrl: "https://mainkreativraum.de/",
      images: [mainKreativRaumCover, mainKreativRaumBooking, mainKreativRaumPages],
    },
    {
      id: "mate-champagner",
      title: "Mate & Champagner",
      client: "City of Wiesbaden",
      categoryTags: ["UX Architecture", "Web Platform", "Design System"],
      description:
        "Information architecture, site mapping, and responsive web design for a local event and city guide platform featuring event filtering, curated spot recommendations, and student discounts.",
      images: [mateChampagnerLaptop, mateChampagnerMockup, mateChampagnerUserFlow],
    },
    {
      id: "zooniam-concept",
      title: "Zooniam",
      client: "Concept Project",
      categoryTags: ["Brand Identity", "Packaging Design", "Social Media"],
      description:
        "An end-to-end brand identity concept for a modern pet food line featuring custom typography, geometric product multi-purpose packaging, social media grid design, and merchandise.",
      images: [zooniamSocial, zooniamPackaging, zooniamTotes],
    },
    {
      id: "ukraine-museum-app",
      title: "Ukrainian Art Museum",
      client: "Concept Project",
      categoryTags: ["Mobile App", "UI/UX Architecture", "Product Design"],
      description:
        "An end-to-end mobile app concept for exploring Ukrainian art history featuring interactive indoor museum navigation, audio guide playback, artwork discovery across movements, and digital ticket management.",
      images: [museumAppInHand, museumAppShowcase, museumWireframes],
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
