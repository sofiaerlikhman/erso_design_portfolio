// en.ts: ENGLISH SITE CONTENT — the default language.
//
// THIS is the file to edit if you want to change anything you can see on
// the English website — your name, bio, projects, job history, stats,
// links, and so on. Every section component reads it through the
// useContent() hook, so none of them have any text hard-coded inside.
// To add a new project you only ever edit the `projects` array below;
// you never need to touch a .tsx file.
//
// Its German twin is src/content/de.ts, which has exactly the same
// shape. Both are typed `: PortfolioData`, so if you add a field here
// and forget it there, `npm run lint` fails and tells you — the two
// languages cannot silently drift apart.
//
// Images come from src/content/images.ts and are shared by both
// languages. Email addresses, URLs and tool names are the same in every
// language too, so they're simply repeated verbatim in de.ts.
import type { PortfolioData } from "../types/portfolio";
import { images } from "./images";

export const en: PortfolioData = {
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
    heroImage: images.heroPortrait,
  },

  // Read by: MarqueeStrip (the row of small scrolling preview cards just
  // under the Hero).
  marquee: [
    { id: "vscode", label: "VS Code", tag: "Front-End Development", image: images.vscode },
    { id: "cinema4d", label: "Cinema 4D", tag: "3D & Motion Graphics", image: images.cinema4d },
    { id: "canva", label: "Canva", tag: "Rapid Content Creation", image: images.canva },
    { id: "figma", label: "Figma", tag: "UI/UX & Prototyping", image: images.figma },
    { id: "adobe", label: "Adobe Creative Cloud", tag: "Brand & Graphic Design", image: images.adobe },
    { id: "higgsfield", label: "Higgsfield AI", tag: "AI Video & Motion Generation", image: images.higgsfield },
    { id: "topview", label: "TopView AI", tag: "AI Video Editing & Content", image: images.topview },
    { id: "wordpress", label: "WordPress", tag: "Web Design & CMS", image: images.wordpress },
    { id: "wix", label: "Wix Studio", tag: "Web Design & Layout", image: images.wix },
    { id: "fontlab", label: "FontLab", tag: "Typography", image: images.fontlab },
    { id: "webflow", label: "Webflow", tag: "Visual Web Development", image: images.webflow },
    { id: "claude-code", label: "Claude Code", tag: "AI-Assisted Development", image: images.claudeCode },
    { id: "capcut", label: "CapCut", tag: "Video Editing & Social Cuts", image: images.capcut },
  ],

  // Read by: About (the cream-colored bio section with the animated
  // typing-in paragraph and the three stat counters).
  about: {
    heading: "About",
    paragraphs: [
      "I am a graphic and web designer working across brand identity, user interfaces, print, packaging, and AI-generated media. Whatever the medium, I make sure a brand still looks like itself, on a business card as much as on a full website.",
      "My background in machine learning and AI lets me combine structural logic with design intuition. That helps me turn complex ideas into websites that work, physical products and visual content people actually look at.",
      "Looking good is the easy half. The rest is a system that still works once someone else picks it up: templates, production files, and rules a brand can keep using without me.",
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
        "Built custom websites and interactive digital catalogues",
        "Made brand identities and print campaigns pro bono for community projects",
        "Set up social media templates and content libraries clients keep posting with",
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
        "Produced AI-generated promo videos and visuals for the marketing campaigns",
        "Designed the corporate website, promotional brochures, and physical gift bags",
        "Co-organized the resort launch event and designed how it looked",
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
        "Rebranded the company across print and digital",
        "Designed and launched a responsive corporate website",
        "Produced every piece of print advertising and the digital content around it",
      ],
    },
    {
      id: "exp-4",
      role: "Designer & SMM Specialist (Pro Bono)",
      company: "Children of the Sun, charitable organisation, Kharkiv",
      period: "2020 — 2022",
      description:
        "Pro bono visual design and social media for a Kharkiv non-profit that supports children with chromosomal conditions and their families.",
      skills: [
        "Brand & Visual Design",
        "Social Media Strategy",
        "Content Creation",
        "Print Collateral",
        "Community Outreach",
      ],
      wins: [
        "Gave the charity a social media look and templates its volunteers could reuse",
        "Made print education materials, brochures, and fundraising campaign assets",
        "Ran the charity's social channels and its day-to-day posts",
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
        "Ukrainian vyshyvanka ornaments reinterpreted as contemporary design. Three regional newspapers covered the show.",
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
        "As lead designer, I was responsible for the resort's entire visual presence: website, brochures and catalogues, social media, AI-generated photo and video, gift packaging and the launch event.",
      liveUrl: "https://fivebaysresort.com/",
      images: [images.fiveBaysCover, images.fiveBaysPrint, images.fiveBaysMedia],
    },
    {
      id: "children-of-the-sun",
      title: "Children of the Sun",
      client: "Children of the Sun, Kharkiv",
      categoryTags: ["Brand Identity", "Print", "Gift Packaging"],
      description:
        "Complete pro bono visual identity and event branding for a charity marathon and non-profit featuring custom typography, packaging, socks merchandise, and promotional print media.",
      images: [images.detiSolntsaPoster, images.detiSolntsaPackaging, images.detiSolntsaCertificate],
    },
    {
      id: "dobrova-brand",
      title: "DOBROVA Brand",
      client: "DOBROVA",
      categoryTags: ["Digital Brochure", "Editorial Web Design", "UI/UX"],
      description:
        "An editorial digital brochure designed for an interactive art couture exhibition, blending high-fashion runway photography, artist milestones, and fine art galleries into a responsive digital experience.",
      images: [images.dobrovaMultiDevice, images.dobrovaMobileMockup, images.dobrovaDesktopMockup],
    },
    {
      id: "dutacs",
      title: "DuTACS GmbH",
      client: "DuTACS GmbH",
      categoryTags: ["Rebranding", "Corporate Website", "Print Advertising"],
      description:
        "A full brand overhaul for an IATA-certified German corporate travel management company — a new visual identity carried across a responsive corporate website, print advertising campaigns, and multi-format digital content.",
      images: [images.dutacsCover, images.dutacsWebsite, images.dutacsPrint],
    },
    {
      id: "mainkreativraum",
      title: "MainKreativRaum",
      client: "MainKreativRaum, Frankfurt",
      categoryTags: ["Web Design", "E-Commerce", "UI/UX"],
      description:
        "Website and e-commerce design for a Frankfurt creative studio running painting, drawing, and ceramics workshops — a bookable course catalogue with per-workshop pricing, gift vouchers, and a separate enquiry flow for team events, private celebrations, and seasonal formats.",
      liveUrl: "https://mainkreativraum.de/",
      images: [images.mainKreativRaumCover, images.mainKreativRaumBooking, images.mainKreativRaumPages],
    },
    {
      id: "mate-champagner",
      title: "Mate & Champagner",
      client: "City of Wiesbaden",
      categoryTags: ["UX Architecture", "Web Platform", "Design System"],
      description:
        "Information architecture, site mapping, and responsive web design for a local event and city guide platform featuring event filtering, curated spot recommendations, and student discounts.",
      images: [images.mateChampagnerLaptop, images.mateChampagnerMockup, images.mateChampagnerUserFlow],
    },
    {
      id: "zooniam-concept",
      title: "Zooniam",
      client: "Concept Project",
      categoryTags: ["Brand Identity", "Packaging Design", "Social Media"],
      description:
        "An end-to-end brand identity concept for a modern pet food line featuring custom typography, geometric product multi-purpose packaging, social media grid design, and merchandise.",
      images: [images.zooniamSocial, images.zooniamPackaging, images.zooniamTotes],
    },
    {
      id: "ukraine-museum-app",
      title: "Ukrainian Art Museum",
      client: "Concept Project",
      categoryTags: ["Mobile App", "UI/UX Architecture", "Product Design"],
      description:
        "An end-to-end mobile app concept for exploring Ukrainian art history featuring interactive indoor museum navigation, audio guide playback, artwork discovery across movements, and digital ticket management.",
      images: [images.museumAppInHand, images.museumAppShowcase, images.museumWireframes],
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
