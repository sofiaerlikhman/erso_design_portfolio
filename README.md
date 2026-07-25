# Erso Design — Portfolio & CV

A personal portfolio/CV site built with React, TypeScript, Vite, Tailwind
CSS, and Framer Motion. All content — projects, bio, experience, links,
images — lives in one file, [`src/data/portfolioData.ts`](src/data/portfolioData.ts),
so you can update the live site without touching any component code.

## Stack

- [Vite](https://vitejs.dev/) + React 18 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for scroll-driven motion (magnetic buttons, character-reveal text, sticky-stacking cards, scroll-scrubbed marquee)
- [lucide-react](https://lucide.dev/) for icons
- `clsx` + `tailwind-merge` for class merging (see `src/lib/cn.ts`)

## Getting started

Requires [Node.js](https://nodejs.org/) 20+.

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. Other scripts:

```bash
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build locally
```

## Editing content — `src/data/portfolioData.ts`

This is the only file you need to touch for day-to-day updates. It's fully
typed (see [`src/types/portfolio.ts`](src/types/portfolio.ts)), so your
editor will flag anything missing.

**Add a project** — append an object to the `projects` array:

```ts
{
  id: "your-project-slug",
  title: "Project Name",
  client: "Client Name",
  categoryTags: ["Brand", "Web"],
  description: "One or two sentences about the project.",
  liveUrl: "https://example.com",       // optional
  caseStudyUrl: "https://example.com",  // optional
  images: [image1, image2, image3],     // see "Adding images" below
}
```

Reorder or delete array entries to reorder/remove projects on the site — no
other file needs to change. The same applies to `experience` (work history),
`education`, `softSkills` (a plain string array), `languages`, `services`
(numbered service blocks), and `marquee` (the scrolling ribbon under the
hero).

`education`, `softSkills`, and `languages` currently hold placeholder
values (institution names, and 5 generic "Language 1"–"Language 5" slots) —
replace those with your real details in `portfolioData.ts`; nothing else
needs to change.

**Adding images** — drop files into `src/assets/images/`, import them at
the top of `portfolioData.ts` (Vite turns the import into a hashed URL
automatically):

```ts
import myProjectCover from "../assets/images/my-project-cover.jpg";
```

then reference `myProjectCover` in that project's `images` array.

**Update your bio, stats, availability, resume link, or socials** — edit
the `about`, `meta`, and `hero` objects in the same file.

**Social icons** are hidden by default (`meta.socialsVisible: false` in
`portfolioData.ts`) — the links themselves are still defined in
`meta.socials`, just not rendered in the Contact section. Flip that flag to
`true` whenever you're ready to show them; no component changes needed.

**Swap the resume PDF** — replace `public/resume.pdf` with your own file
(same filename), or change `meta.resumeUrl` / `hero.ctaUrl` if you rename
it. Don't add a leading slash — the site resolves these through
`src/lib/withBase.ts` so the link works whether it's deployed at a domain
root or a GitHub Pages subpath.

## Using your own fonts

The design system calls for **Abygaer** (display/headline) and **Times New
Roman** (body/metadata). Times New Roman is a system font, so it needs no
setup. Abygaer isn't a font this project can bundle for you — until you add
it, headlines render in **Playfair Display** (loaded from Google Fonts in
`index.html`) as a close, free stand-in, so the site looks right out of the
box.

To use the real font: add your licensed `.woff2` file at
`public/fonts/Abygaer/Abygaer-Regular.woff2` — see
[`public/fonts/Abygaer/README.md`](public/fonts/Abygaer/README.md). It's
picked up automatically by the `@font-face` rule already in
`src/index.css`. No other files need to change.

## Updating the logo

The site logotype lives in [`src/components/ui/Logo.tsx`](src/components/ui/Logo.tsx)
as inline SVG paths (not an image file), using `fill="currentColor"` so it
automatically matches whatever text color it's placed in — that's why it
reads correctly on both the navbar and footer's dark backgrounds without
any extra configuration. It's rendered in `Navbar.tsx` and `Footer.tsx`.

To swap in a different logo: replace the `<path>` elements in `Logo.tsx`
with your new SVG's paths (update the `viewBox` to match), making sure
every `fill` is `currentColor` rather than a hardcoded color — otherwise it
won't adapt to dark surfaces the way the current one does.

## Project structure

```
src/
  components/
    motion/      Reusable Framer Motion primitives (Magnet, AnimatedText,
                  StickyStackCard, ScrollMarquee) — the "how it moves"
    ui/           Presentational building blocks (Badge, MagneticButton,
                  ProjectCard, AccordionItem, EducationEntry, StatBlock,
                  FallbackImage, Logo)
    layout/       Navbar and Footer (persistent across the whole page)
    sections/     The six page sections, assembled in App.tsx
  data/
    portfolioData.ts   ← all site content lives here
  types/
    portfolio.ts        TypeScript shape of portfolioData.ts
  lib/                   cn(), withBase(), a11y focus-ring/tap constants,
                          social icon lookup
  assets/images/         Placeholder project imagery (SVG) — swap freely
```

Sections read exclusively from `portfolioData.ts` — there's no copy
hardcoded in JSX, so translating, rebranding, or restructuring the content
never requires touching a component.

## Deploying to GitHub Pages

This repo is preconfigured for GitHub Pages via GitHub Actions
(`.github/workflows/deploy.yml`), matching the existing
`sofiaerlikhman.github.io/erso_design_portfolio` site.

1. **Push this project to the `erso_design_portfolio` GitHub repo:**

   ```bash
   git init
   git add .
   git commit -m "Rebuild portfolio site"
   git branch -M main
   git remote add origin https://github.com/sofiaerlikhman/erso_design_portfolio.git
   git push -u origin main --force
   ```

   Use `--force` only if you're intentionally replacing the current
   contents of that repo with this project (it will overwrite the existing
   site's source). Skip `--force` if you'd rather merge histories manually.

2. **Enable Pages via Actions** (one-time): in the repo on GitHub, go to
   **Settings → Pages**, and under **Build and deployment → Source**,
   choose **GitHub Actions**.

3. **Push to `main`** — the workflow builds the site and deploys it
   automatically. Check the **Actions** tab for progress; once it succeeds,
   the site is live at the same URL as before.

`vite.config.ts` uses `base: "./"` (relative asset paths), so the build
works correctly at that subpath without any extra configuration.

### Manual alternative (`gh-pages`)

A `deploy` script is also included as a fallback, using the `gh-pages`
package to push the built `dist/` folder to a `gh-pages` branch:

```bash
npm run deploy
```

This is a **separate, mutually exclusive** mechanism from the Actions
workflow above — only use it if your repo's Pages source is set to "Deploy
from a branch" instead of "GitHub Actions." Most users should stick with
the Actions workflow.
