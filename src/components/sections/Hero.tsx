// Hero.tsx: The very first thing a visitor sees — the full-height
// introduction screen with the big "DESIGN & DIRECTION" headline, a
// slowly-drifting abstract gradient, a portrait photo layered in front
// of everything else, the availability badge, and the two main
// call-to-action buttons.
import { Badge } from "../ui/Badge";
import { MagneticButton } from "../ui/MagneticButton";
import { FallbackImage } from "../ui/FallbackImage";
import { AnimatedGradient } from "../motion/AnimatedGradient";
import { SectionEyebrow } from "../common/SectionEyebrow";
import { portfolioData } from "../../data/portfolioData";
import { withBase } from "../../lib/withBase";

// Fades the bottom ~22% of the portrait to transparent, so it dissolves
// into the section instead of ending in a hard edge. Written once here
// (as both the standard and -webkit- prefixed forms Safari needs) rather
// than inline on the element, since both prefixes always need to change
// together.
const BOTTOM_FADE_MASK = "linear-gradient(to top, transparent 0%, black 22%)";

export function Hero() {
  // hero: the headline text/links for this section (see the
  // `hero:` block in portfolioData.ts). meta: general site info,
  // used here just for the availability status text.
  const { hero, meta } = portfolioData;

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-bg-dark px-6 pb-10 pt-32 sm:px-10 sm:pb-14"
    >
      <AnimatedGradient />

      {/* Portrait, layered in FRONT of the text (z-20 vs. the text
          block's z-10) — the face stays fully bright since nothing dims
          it, and the headline is allowed to sit partly behind it rather
          than being protected by a dark scrim. pointer-events-none keeps
          the photo from blocking clicks on the CTA buttons underneath
          wherever the two overlap. Centered on phones; from md: up
          (768px — real tablets, not just a wide phone) it moves to the
          right with some breathing room from the edge rather than
          sitting flush against it or dead-center — a rough "rule of
          thirds" placement instead of a mechanically centered one.
          object-contain (not object-cover) is what makes this work with
          a transparent cutout: cropping would slice off the transparent
          edges instead of showing the whole photo. Only the bottom edge
          fades out (via the mask below) so it dissolves into the
          section instead of ending in a hard line — the top (the face)
          is left completely untouched on purpose. */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center md:justify-end md:pr-[6%] lg:pr-[9%]">
        <FallbackImage
          src={hero.heroImage}
          alt={`Portrait of ${meta.name}`}
          loading="eager"
          className="h-[52%] w-auto object-contain object-bottom md:h-[40%] lg:h-[82%]"
          style={{ maskImage: BOTTOM_FADE_MASK, WebkitMaskImage: BOTTOM_FADE_MASK }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <SectionEyebrow>{hero.eyebrow}</SectionEyebrow>

        <h1 className="clamp-hero mt-6 font-display leading-[0.95] text-text-light">
          {/* Each line of the headline (e.g. "DESIGN &" and "DIRECTION")
              is its own array entry in portfolioData.ts, so it always
              breaks onto a new line exactly where intended. */}
          {hero.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          {/* The smaller italic accent phrase ("crafted with intent"),
              styled with the metallic gradient text effect. */}
          <span className="text-metallic block font-display text-[0.45em] italic">
            {hero.accentPhrase}
          </span>
        </h1>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Badge dot>{meta.availability}</Badge>
          <div className="flex flex-wrap gap-3">
            {/* withBase() makes sure this link to the résumé PDF still
                works correctly no matter where the site ends up hosted —
                see src/lib/withBase.ts for why that's necessary. */}
            <MagneticButton href={withBase(hero.ctaUrl)} target="_blank" rel="noreferrer" variant="primary">
              {hero.ctaLabel}
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Contact
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
