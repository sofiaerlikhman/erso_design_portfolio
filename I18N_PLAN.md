# I18N Plan — Adding German (`de`) alongside English (`en`)

**Status:** Proposal, awaiting approval. **No website files have been changed.**
Date: 2026-11-19 · Branch: `copy-rewrite-humanized`

---

## 0. What I found in the codebase

| Thing | Finding |
| --- | --- |
| Stack | React 18 + TypeScript + Vite 5 + Tailwind 3, `framer-motion`, `lucide-react` |
| Router | **None.** Single page, in-page anchors (`#about`, `#experience`, `#work`, `#contact`) |
| i18n library | **None installed.** No `i18next`, `react-intl`, `react-i18next`, `lingui` |
| Content architecture | **Already centralised.** `src/data/portfolioData.ts` (438 lines) is a single typed object (`PortfolioData` in `src/types/portfolio.ts`) that every section imports. ~95% of all visible copy already lives in exactly one file. |
| Deploy | Static GitHub Pages (`.github/workflows/deploy.yml`), `vite.config.ts` → `base: "./"` (relative), `withBase()` helper for asset links |
| Display font | `Abygaer-Regular.ttf` — **I verified its glyph table: ä ö ü Ä Ö Ü ß „ “ – — are all present.** No font blocker for German. |

**This is the single most important finding:** the site is already built the way an i18n
refactor would want it. There are no page components to duplicate. Adding German is
mostly "produce a second content object of the same shape", plus ~15 stray UI strings
in components.

---

## 1. Recommended architecture

### 1.1 Translation files: typed TS modules, not `.json`

You asked for `en.json` / `de.json`. I recommend **`en.ts` / `de.ts`** instead, for two
concrete technical reasons:

1. **JSON cannot hold the images.** `portfolioData.ts` statically imports ~40 images
   (`import heroPortrait from "../assets/images/heroPortrait.webp"`). Vite resolves those
   to hashed, cache-busted URLs at build time. A `.json` file can't contain an import, so
   going JSON would mean a parallel image-lookup map and a merge step at runtime — more
   moving parts, and you'd lose the "missing image = build error" safety you have now.
2. **TypeScript catches a missing German key at build time.** If both files are declared
   `: PortfolioData`, then `npm run lint` (`tsc -b --noEmit`) **fails** if `de.ts` is
   missing a field, has a typo, or has the wrong number of stats. With JSON dictionaries
   you'd only find out when a visitor sees `undefined` on the live site.

Same number of files, same "two dictionaries side by side" mental model, strictly more
safety. If you'd still rather have `.json`, say so and I'll do that instead — the plan
below works either way.

### 1.2 File layout

```
src/
  content/
    images.ts        NEW — all image imports, shared by both locales (no duplication)
    en.ts            NEW — English content (moved verbatim from portfolioData.ts)
    de.ts            NEW — German content, same shape
    ui.en.ts         NEW — UI chrome strings: buttons, aria-labels, SEO meta
    ui.de.ts         NEW
    index.ts         NEW — locale registry: { en: {...}, de: {...} }
  i18n/
    LocaleContext.tsx NEW — provider, useLocale(), useContent(), useUi()
    useDocumentMeta.ts NEW — syncs <html lang>, <title>, meta description, hreflang
  data/
    portfolioData.ts KEEP as a thin re-export of the English content, so nothing that
                     imports it breaks and your README stays accurate.
  types/
    portfolio.ts     EXTEND — add `UiStrings` and `SeoMeta` interfaces
```

`portfolioData.ts` staying as a re-export means **the English site cannot break**: if
anything about the German layer goes wrong, English still renders from the same data it
renders from today.

### 1.3 Locale state and URL

Constraint: static GitHub Pages, no server, no router, `base: "./"` relative paths.

**Recommended: `?lang=de` query parameter + React context + `localStorage`.**

- `sofiaerlikhman.github.io/erso_design_portfolio/` → English (default, bare URL, unchanged)
- `…/?lang=de` → German
- Existing anchors keep working and compose cleanly: `…/?lang=de#work`
- Choice persisted in `localStorage` so a returning visitor keeps their language
- First visit with no stored choice: **English** (per your rule). Optionally we can
  check `navigator.language` for a German browser — your call, it's one line. Default
  in this plan is **no auto-detect**, so EN is genuinely the default.
- Switching writes the URL with `history.replaceState` — no page reload, no scroll jump,
  animations don't re-trigger.

**Why not `/de/` path routing:** on GitHub Pages a `/de/` path needs either a second
Vite build with a different `base`, or the SPA-404-redirect hack. Both are real
complexity added to a working deploy, and `base: "./"` relative asset paths break from a
subdirectory. Path routing is slightly better for SEO; it is the one thing I'd call a
genuine trade-off here. If you want `/de/` later it's a contained follow-up — the
locale layer below doesn't change, only how the locale is read.

**Why not `#de`:** it would collide with your `#about` / `#work` anchor navigation.

### 1.4 How components consume it

One hook replaces one import. Example — `About.tsx`:

```diff
- import { portfolioData } from "../../data/portfolioData";
+ import { useContent } from "../../i18n/LocaleContext";

  export function About() {
-   const { about } = portfolioData;
+   const { about } = useContent();
```

No JSX changes, no `className` changes, no logic changes. For the ~15 chrome strings,
`const ui = useUi()` then `aria-label={ui.backToTop}`.

`App.tsx` gets wrapped once:

```diff
+ <LocaleProvider>
     <Navbar /> <main>…</main> <Footer />
+ </LocaleProvider>
```

### 1.5 SEO

`index.html` is static, so a runtime effect (`useDocumentMeta`) will set, on mount and on
every locale change:

- `document.documentElement.lang` → `"en"` / `"de"`
- `<title>` and `<meta name="description">`
- `<link rel="canonical">` and `<link rel="alternate" hreflang="en|de|x-default">`

Static `index.html` keeps the English title/description as the crawler fallback.

**Honest limitation:** this is client-side. Google renders JS and will index both, but a
crawler that doesn't execute JS sees only English. True per-locale static HTML needs
prerendering (e.g. `vite-plugin-prerender`) — **out of scope here**; flag it if you want
it and it becomes its own task.

---

## 2. The `EN | DE` language switcher

### 2.1 Placement

**Primary: inside the existing navbar pill**, between the nav links and the hamburger —
so it is reachable on mobile **without** opening the menu.

```
┌──────────────────────────────────────────────────────────────┐
│  [Logo]   Über mich  Lebenslauf  Arbeiten  Kontakt  [EN|DE] │   ≥768px
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────┐
│  [Logo]                  [EN|DE] [☰]│   <768px
└──────────────────────────────────────┘
```

**Secondary: in the `Footer`**, next to the copyright — for visitors who have scrolled
to the bottom.

### 2.2 Design and behaviour

A compact segmented control that reuses the existing visual language (`rounded-full`,
`border-white/10`, `bg-white/5`, `FOCUS_RING_DARK`, `TAP_SCALE` from `src/lib/a11y.ts`) —
nothing new in the design system:

- Two `<button>`s, `EN` and `DE`, with a thin divider between them
- Active locale: `text-text-light` + subtle `bg-white/10`; inactive: `text-text-light/50`
- `aria-pressed` on each, wrapped in a `<div role="group" aria-label="…">`
- Full control ≈ 72×36px on desktop, 76×44px on mobile (meets the 44px tap target)
- `lang="en"` / `lang="de"` on the respective buttons so screen readers pronounce them right
- Respects `useReducedMotion()` like the rest of the site

**Space check:** the navbar pill is `max-w-3xl` (768px) with `gap-7`. German nav labels
are chosen *shorter* than the current English ones (§3.3), so the switcher fits with room
to spare. I will verify in the browser at 375 / 768 / 1280px before calling it done.

---

## 3. Brand voice, glossary, and tone rules

### 3.1 Tone of voice — from the PDF

**Formal `Sie`. Confirmed, not assumed.** Page 13 of your portfolio:

> „Sie haben ein Projekt im Kopf oder möchten sich einfach austauschen?
> Schreiben Sie mir jederzeit."

So: **`Sie` throughout, capitalised.** No `du`, no `ihr`, nowhere.

Other voice rules I read out of the German PDF:

1. **Feminine job titles consistently** — `Grafik- & Webdesignerin`, `Lead Designerin &
   visuelle Strategin`, `Designerin & Social-Media-Managerin`. Never the masculine form.
2. **Short declarative sentences.** The German copy avoids nested subordinate clauses and
   nominalisation. "So mache ich aus komplexen Ideen Websites, die funktionieren" — verb
   forward, plain words.
3. **Concrete over abstract.** "von der Visitenkarte bis zum Versandkarton" rather than
   "across all touchpoints". Keep the specific nouns.
4. **Understatement, no superlatives.** No "innovativ", "einzigartig", "maßgeschneidert",
   "ganzheitlich", "Synergien", "Mehrwert", "State of the Art". The PDF has none of these
   and the German copy must not acquire them.
5. **English design terms stay English** where the German industry uses them (UI/UX,
   Branding, Content, Social Media, Creative Direction, Editorial, Mobile App, Lead
   Designerin). Do **not** translate these into German — doing so would read amateurish
   to a German design client.
6. **Hyphenated German compounds** rather than long run-together coinages:
   `Social-Media-Vorlagen`, `KI-Medien`, `Brand- & Corporate Design`.
7. **German typographic quotes** `„ "` (U+201E / U+201C) — the font supports them.
   En dash `–` in date ranges with spaces: `2023 – 2026`.

### 3.2 Glossary — brand & domain terms

Taken from the PDF wherever it has the term; marked **[new]** where the PDF has no
equivalent and I propose one.

| English (current site) | German (locked) | Source |
| --- | --- | --- |
| Graphic & Web Designer | Grafik- & Webdesignerin | PDF p.1 |
| Portfolio & CV | Portfolio & Lebenslauf | PDF p.1 |
| Based in Wiesbaden, Germany | Wiesbaden, Deutschland | PDF p.1, p.13 |
| Available from December 2026 | Verfügbar ab Dezember 2026 | PDF p.13 |
| AI Media / AI-generated | KI-Medien / KI-generiert | PDF p.1, p.3 |
| Brand & Corporate Design | Brand- & Corporate Design | PDF p.11 |
| Product & Web Design | Produkt- & Webdesign | PDF p.11 |
| AI Media & Content | KI-Medien & Content | PDF p.11 |
| Print & Packaging | Print & Verpackung | PDF p.11 |
| Brand identity | Markenidentität | PDF p.4 |
| Packaging / Gift packaging | Verpackung / Geschenkverpackung | PDF p.4, p.8 |
| Digital brochure | Digitale Broschüre | PDF p.4 |
| Editorial web design | Editorial Webdesign | PDF p.4 |
| Corporate website | Unternehmenswebsite | PDF p.4 |
| Print advertising | Printwerbung | PDF p.4 |
| Rebranding | Rebranding | PDF p.4 |
| UX architecture | UX-Architektur | PDF p.4 |
| Web platform | Webplattform | PDF p.4 |
| Design system | Designsystem | PDF p.4 |
| Mobile app | Mobile App | PDF p.4 |
| Product design | Produktdesign | PDF p.4 |
| Experience (section) | Berufserfahrung | PDF p.12 |
| Education | Ausbildung | PDF p.12 |
| Exhibitions | Ausstellungen | PDF p.12 |
| Soft Skills | Soft Skills | PDF p.12 |
| Languages | Sprachen | PDF p.12 |
| Services / What I do | Leistungen / Was ich mache | PDF p.11 |
| Selected Work / Projects | Ausgewählte Arbeiten | PDF p.4 |
| About | Über mich | PDF p.3 |
| Contact | Kontakt | PDF p.13 |
| Years of Experience | Jahre Erfahrung | PDF p.3 |
| Core Disciplines | Kernbereiche | PDF p.3 |
| Clients | Kunden | PDF p.3 |
| Freelance & Pro Bono Work | Freiberuflich & pro bono | PDF p.12 |
| Independent Projects | Selbstständige Projekte | PDF p.12 |
| Lead Designer & Visual Strategist | Lead Designerin & visuelle Strategin | PDF p.5 |
| Designer & SMM Specialist (pro bono) | Designerin & Social-Media-Managerin (pro bono) | PDF p.8 |
| Native / Fluent | Muttersprache / fließend | PDF p.12 |
| Solo Exhibition | Einzelausstellung | PDF p.12 |

**Proper nouns — the ones that change:**

| English | German | Source |
| --- | --- | --- |
| Children of the Sun | **Sonnenkinder** | PDF p.4, p.8 |
| Kharkiv | **Charkiw** | PDF p.8, p.12 |
| Ukrainian Art Museum | **Ukrainisches Kunstmuseum** | PDF p.4 |
| Türkiye | **Türkei** | PDF p.5 |
| City of Wiesbaden | **Stadt Wiesbaden** | [new] |
| Concept Project | **Konzeptprojekt** | [new] |
| Threads of Memory | **„Fäden der Erinnerung"** | PDF p.12 |
| Kharkiv National University of Radio Electronics | Nationale Universität für Radioelektronik Charkiw | PDF p.12 |
| State Academy of Design and Arts, Kharkiv | Staatliche Akademie für Design und Kunst Charkiw | PDF p.12 |
| Communication Design – Crossmedia Spaces | Kommunikationsdesign – Crossmedia Spaces | PDF p.12 |
| Artificial Intelligence | Künstliche Intelligenz | PDF p.12 |
| Graphic Design (degree) | Grafikdesign | PDF p.12 |

**Unchanged across locales:** Erso Design, Sofia Erlikhman, Five Bays Resort, DOBROVA,
DuTACS GmbH, MainKreativRaum, Mate & Champagner, Zooniam, Hochschule RheinMain, and all
tool names (Figma, Adobe Creative Cloud, WordPress, Webflow, Higgsfield AI, Cinema 4D,
Claude Code, Canva, FontLab, Wix Studio, TopView AI, CapCut, VS Code).

### 3.3 UI labels — with length budget

German runs ~20–30% longer, so these are chosen to **fit, not to translate literally**.

| Where | English | German | Note |
| --- | --- | --- | --- |
| Nav 1 | About | Über mich | +4 |
| Nav 2 | Experience | Lebenslauf | +0 |
| Nav 3 | Selected Work | **Arbeiten** | **−5** (not "Ausgewählte Arbeiten", 21 chars — too wide for the pill) |
| Nav 4 | Contact | Kontakt | +0 |
| Hero CTA | Download Resume | **Lebenslauf (PDF)** | +2, fits the button |
| Hero ghost CTA | Contact | Kontakt | +0 |
| Contact CTA | Start a Conversation | **Nachricht schreiben** | ±0 |
| Contact card | Resume / Download PDF | Lebenslauf / PDF öffnen | fits |
| Contact card | Email / Copied to clipboard | E-Mail / In die Ablage kopiert | fits the row |
| Project card | Visit live site | Website ansehen | ±0 |
| Project card | Read case study | Fallstudie lesen | −1 |
| Footer | All rights reserved. | Alle Rechte vorbehalten. | fine, centred |
| Hero eyebrow | Portfolio & CV — 2026 | Portfolio & Lebenslauf — 2026 | PDF p.1 |
| Hero title | GRAPHIC & / WEB DESIGN | **GRAFIK- & / WEBDESIGN** | PDF p.1 cover; `clamp-hero` scales it |
| Stat | Years of Experience | Jahre Erfahrung | −3 |
| Stat | Core Disciplines | Kernbereiche | −4 |
| Stat | Clients | Kunden | −1 |

**aria-labels** (invisible, no length constraint): Back to top → `Nach oben`; Toggle menu
→ `Menü öffnen/schließen`; Previous/Next image → `Vorheriges/Nächstes Bild`;
Go to image {n} → `Zu Bild {n}` (**placeholder `{n}` preserved exactly**); Site logo →
`Logo`; Portrait of {name} → `Porträt von {name}` (**`{name}` preserved**).

### 3.4 Long-form copy — sourced verbatim from the PDF

These are **already written in your voice** and will be used as-is rather than translated:

- **About, all three paragraphs** — PDF p.3 (`Ich bin Grafik- und Webdesignerin und
  arbeite in den Bereichen Markenidentität…`). Note the PDF has 2 paragraphs where the
  site has 3; the third ("Looking good is the easy half…") has no German original, so I
  will write it in the PDF's register and flag it for your review.
- **All four service descriptions** — PDF p.11, verbatim.
- **Five Bays Resort** project description — PDF p.5, verbatim.
- **Sonnenkinder** project description — PDF p.8, verbatim.
- **DOBROVA** project description — PDF p.10, verbatim.
- **Exhibition description** — PDF p.12, verbatim.
- **Contact heading + subheading** — PDF p.13, verbatim (`Gestalten wir etwas zusammen.` /
  `Sie haben ein Projekt im Kopf oder möchten sich einfach austauschen? Schreiben Sie mir
  jederzeit.`)
- **DuTACS, MainKreativRaum, Mate & Champagner, Zooniam, Ukrainisches Kunstmuseum**
  descriptions and the `wins` bullets in `experience` have **no German original** in the
  PDF. I'll write these in the established register and mark each one in my hand-off
  summary so you can check them.

### 3.5 ⚠️ One thing I need you to confirm

Your PDF's **display-font headings extract with letters missing** — e.g. page 3 reads
`Design ms mr können als gut asen.` This is a font-encoding quirk in the PDF (the
Abygaer glyphs aren't mapped to Unicode in those headlines), **not** a mistake in your
document. Here is my reconstruction of each affected headline — **please confirm or
correct before I use them:**

| PDF extracts as | My reconstruction |
| --- | --- |
| `Design ms mr können als gut asen.` | Design muss mehr können als gut aussehen. |
| `Vi Beiche, ein einheitlich Stil.` | Vier Bereiche, ein einheitlicher Stil. |
| `Gestalten wir etw zammen.` | Gestalten wir etwas zusammen. |
| `Ein kplexes Angot, d nach ruhig Lux asen sollte` | Ein komplexes Angebot, das nach ruhigem Luxus aussehen sollte |
| `Bufsfahrung` / `Abildung` / `Astellungen` / `Tls` | Berufserfahrung / Ausbildung / Ausstellungen / Tools |
| `Sonnenkind` (p.4 card) | Sonnenkinder |
| `Dieses Ptfolio` | Dieses Portfolio |
| `Zniam` / `Ukrainisches Kunstmeum` | Zooniam / Ukrainisches Kunstmuseum |

Of these, only **"Gestalten wir etwas zusammen."** (the Contact heading) and
**"Vier Bereiche, ein einheitlicher Stil."** are candidates for the website itself; the
rest are PDF-only page furniture.

---

## 4. Step-by-step implementation checklist

### Phase A — scaffolding (no visible change)
1. `src/types/portfolio.ts` — add `Locale = "en" | "de"`, `UiStrings`, `SeoMeta` interfaces.
2. `src/content/images.ts` — move all ~40 image imports here, export as a named map.
3. `src/content/en.ts` — current `portfolioData` object, **content identical, verbatim**, typed `: PortfolioData`.
4. `src/content/ui.en.ts` — the ~15 chrome strings + SEO title/description.
5. `src/data/portfolioData.ts` — reduce to `export { enContent as portfolioData } from "../content/en";` (keeps the old import path alive).
6. `src/i18n/LocaleContext.tsx` — provider + `useLocale()` / `useContent()` / `useUi()`.
7. `src/i18n/useDocumentMeta.ts` — `<html lang>`, title, description, canonical, hreflang.
8. `npm run lint` + browser check → **English site must be pixel-identical at this point.**

### Phase B — switcher
9. `src/components/ui/LocaleSwitcher.tsx` — new segmented `EN | DE` control.
10. `src/App.tsx` — wrap in `<LocaleProvider>`, call `useDocumentMeta()`.
11. `src/components/layout/Navbar.tsx` — mount the switcher; swap 2 aria-labels to `useUi()`.
12. `src/components/layout/Footer.tsx` — mount the switcher; `useUi()` for "Back to top" + "All rights reserved."

### Phase C — string extraction (files, in order)
13. `src/components/sections/Hero.tsx` — `useContent()`; extract `"Contact"` ghost-button label and the `Portrait of {name}` alt.
14. `src/components/sections/About.tsx` — `useContent()`.
15. `src/components/sections/MarqueeStrip.tsx` — `useContent()` (tool `tag` strings).
16. `src/components/sections/ServicesResume.tsx` — `useContent()`; extract 4 section eyebrows (`Education`, `Exhibitions`, `Soft Skills`, `Languages`).
17. `src/components/sections/SelectedProjects.tsx` — `useContent()`.
18. `src/components/sections/Contact.tsx` — `useContent()`; extract `Resume`, `Download PDF`, `Email`, `Copied to clipboard`.
19. `src/components/ui/ProjectCard.tsx` — `useUi()` for `Visit live site` / `Read case study`.
20. `src/components/ui/Logo.tsx` — `useUi()` for `Site logo`.
21. `src/components/motion/ImageCarousel.tsx` — `useUi()` for `Previous image`, `Next image`, `Go to image {n}` (**`{n}` interpolation preserved**).
22. `index.html` — keep `lang="en"` + English title/description as crawler fallback; no structural change.
23. `npm run lint` + browser check → **English still pixel-identical, zero German yet.**

### Phase D — German content
24. `src/content/de.ts` — full German content object, PDF wording wherever it exists (§3.4).
25. `src/content/ui.de.ts` — German UI strings per §3.3.
26. `src/content/index.ts` — register both locales.
27. `npm run lint` → TypeScript proves `de.ts` has no missing or misnamed keys.

### Phase E — layout verification (German is longer)
28. Browser pass at **375px**, **768px**, **1280px** in both locales, checking:
    navbar pill (no wrap, no overflow, switcher fits) · hero headline + both CTA buttons ·
    availability badge · the 3 stat blocks · accordion rows · project category pills ·
    contact card rows · footer. Screenshots for you.
29. Fix any overflow **by shortening German copy**, never by touching CSS classes or layout.

### Phase F — humanizer pass
30. Run the `humanizer` skill across **all of `de.ts` and `ui.de.ts`**, checking for
    literal-translation artefacts, stiff nominalisation, AI register, and `Sie`
    consistency — while keeping the PDF's tone and every term locked in §3.2.
31. Re-run `npm run lint`, re-verify layout, final screenshots.

### Phase G — hand-off
32. Update `README.md` with "how to edit German copy" + "how to add a third language".
33. Summary listing every German string that has **no PDF original** so you can review them.

---

## 5. Guardrails I will hold to

- **English is never overwritten.** `en.ts` receives today's strings verbatim; `portfolioData.ts` keeps working as an import path. Phases A–C must leave the English site pixel-identical, verified in the browser before any German is added.
- **No component duplication.** No `HeroDE.tsx`. One component tree, two content objects.
- **No CSS, class, layout, or logic changes.** Overflow is solved with shorter German words.
- **Placeholders untouched** — `{name}`, `{n}`, and any `{{…}}` pass through verbatim.
- **No new runtime dependencies.** Context + `localStorage` only; nothing added to `package.json`.
- **Images, URLs, emails, and tool names are locale-independent** — defined once, shared.
- **`Sie` throughout**, feminine job titles throughout.

## 6. Open questions

1. **`.ts` or `.json`** for the dictionaries? (I recommend `.ts` — §1.1.)
2. **`?lang=de` or `/de/` paths?** (I recommend `?lang=de` — §1.3. `/de/` is a clean follow-up if you want it.)
3. **Auto-detect German browsers** on first visit, or always start in English? (Plan currently: always English.)
4. **Confirm the reconstructed PDF headlines** in §3.5 — mainly `Gestalten wir etwas zusammen.`
5. **Nav label `Arbeiten`** instead of the PDF's longer `Ausgewählte Arbeiten` — fine, or prefer `Projekte`?

---

**Nothing has been modified yet.** On your approval I'll run Phases A–G in order, with
the English-unchanged checkpoints at steps 8 and 23.
