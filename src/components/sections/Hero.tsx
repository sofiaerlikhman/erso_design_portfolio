// Hero.tsx: The very first thing a visitor sees — a minimal, full-height
// introduction screen with the big "DESIGN & DIRECTION" headline, a
// slowly-drifting abstract gradient background, the availability badge,
// and the two main call-to-action buttons.
import { Badge } from "../ui/Badge";
import { MagneticButton } from "../ui/MagneticButton";
import { AnimatedGradient } from "../motion/AnimatedGradient";
import { SectionEyebrow } from "../common/SectionEyebrow";
import { portfolioData } from "../../data/portfolioData";
import { withBase } from "../../lib/withBase";

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
