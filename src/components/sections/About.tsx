// About.tsx: The cream-colored bio section — the first paragraph fades
// in letter-by-letter as you scroll (see AnimatedText.tsx), any extra
// paragraphs appear as plain text underneath, and the three stat
// numbers are shown at the bottom.
import { AnimatedText } from "../motion/AnimatedText";
import { StatBlock } from "../ui/StatBlock";
import { SectionEyebrow } from "../common/SectionEyebrow";
import { portfolioData } from "../../data/portfolioData";

export function About() {
  // about: everything for this section, straight from portfolioData.ts.
  const { about } = portfolioData;

  // Splits the paragraphs array into the first paragraph (`lead`, which
  // gets the special animated letter-by-letter reveal) and every
  // paragraph after it (`rest`, shown as plain unanimated text).
  const [lead, ...rest] = about.paragraphs;

  return (
    <section
      id="about"
      className="relative -mt-10 rounded-t-4xl bg-cream px-6 pb-24 pt-20 text-text-dark sm:px-10 sm:pt-28"
    >
      <div className="mx-auto max-w-4xl">
        <SectionEyebrow theme="dark">{about.heading}</SectionEyebrow>

        {lead && (
          <AnimatedText
            text={lead}
            className="mt-6 font-display text-2xl leading-snug sm:text-4xl"
          />
        )}

        {rest.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-6 max-w-2xl font-body text-base text-text-dark/70 sm:text-lg"
          >
            {paragraph}
          </p>
        ))}

        {/* Spreading `{...stat}` passes that stat object's `label` and
            `value` fields straight through as StatBlock's props. */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {about.stats.map((stat) => (
            <StatBlock key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
