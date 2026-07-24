// ServicesResume.tsx: The big "résumé" section — combines work
// history (expandable accordion), education, soft skills, languages,
// and the three numbered service offerings, all in one two-column
// layout (a sticky heading on the left, scrolling content on the
// right on desktop; stacked on mobile).
import { AccordionItem } from "../ui/AccordionItem";
import { EducationEntry } from "../ui/EducationEntry";
import { Badge } from "../ui/Badge";
import { SectionHeading } from "../common/SectionHeading";
import { SectionEyebrow } from "../common/SectionEyebrow";
import { portfolioData } from "../../data/portfolioData";

export function ServicesResume() {
  // Every piece of content this section needs, pulled straight out of
  // portfolioData.ts — see that file for what each array/object holds.
  const { experience, education, softSkills, languages, services, resumeIntro } = portfolioData;

  return (
    <section id="experience" className="bg-cream px-6 pb-24 text-text-dark sm:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[280px_1fr]">
        {/* Left column: on desktop (lg: and up) this "sticks" in place
            near the top of the screen while the right column scrolls
            past it; on mobile it just sits above the content normally. */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            eyebrow={resumeIntro.eyebrow}
            heading={resumeIntro.heading}
            description={resumeIntro.description}
            theme="dark"
            headingClassName="text-3xl leading-tight sm:text-4xl"
            descriptionClassName="max-w-xs"
          />
        </div>

        <div>
          {/* Work history — one expandable AccordionItem per job. The
              first item (i === 0) starts already expanded. */}
          <div>
            {experience.map((item, i) => (
              <AccordionItem key={item.id} item={item} defaultOpen={i === 0} />
            ))}
          </div>

          {/* Education list. */}
          <div className="mt-20">
            <SectionEyebrow theme="dark">Education</SectionEyebrow>
            <div className="mt-6">
              {education.map((item) => (
                <EducationEntry key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Soft skills (a row of tag pills) and languages (a simple
              name + fluency-level list) side by side on wider screens. */}
          <div className="mt-20 grid gap-10 sm:grid-cols-2">
            <div>
              <SectionEyebrow theme="dark">Soft Skills</SectionEyebrow>
              <div className="mt-6 flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <Badge
                    key={skill}
                    theme="dark"
                    className="cursor-default transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:bg-text-dark/10 hover:shadow-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <SectionEyebrow theme="dark">Languages</SectionEyebrow>
              {/* <dl>/<dt>/<dd> is the standard HTML pattern for a list of
                  "term + its value" pairs — here, each language name paired
                  with its fluency level. Wrapping each pair in its own div
                  (rather than using the term/value tags directly as
                  siblings) is what lets the whole row highlight together
                  on hover. */}
              <dl className="mt-4 flex flex-col">
                {languages.map((language) => (
                  <div
                    key={language.name}
                    className="flex items-center justify-between gap-4 rounded-lg px-2 py-2 transition-colors duration-300 hover:bg-text-dark/[0.05]"
                  >
                    <dt className="font-body text-sm text-text-dark">{language.name}</dt>
                    <dd className="font-body text-sm text-text-dark/50">{language.level}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* The three numbered service offerings ("01 Brand &
              Identity", etc). The "01"/"02"/"03" label is generated from
              each service's position in the list (see portfolioData.ts). */}
          <div className="mt-20 grid gap-10 sm:grid-cols-2">
            {services.map((service, i) => (
              <div key={service.id} className="border-t border-divider pt-6">
                <span className="font-display text-5xl text-text-dark/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl">{service.title}</h3>
                <p className="mt-3 font-body text-sm text-text-dark/70">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
