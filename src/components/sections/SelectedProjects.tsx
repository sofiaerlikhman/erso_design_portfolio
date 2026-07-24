// SelectedProjects.tsx: The dark "case studies" section — each project
// is shown as a card that sticks to the top of the screen and shrinks
// slightly as the next one scrolls up to replace it (see
// StickyStackCard.tsx for that stacking effect).
import { StickyStackCard } from "../motion/StickyStackCard";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionHeading } from "../common/SectionHeading";
import { portfolioData } from "../../data/portfolioData";

export function SelectedProjects() {
  // projects: the list of case studies to display. workIntro: the small
  // heading block shown above them. Both come from portfolioData.ts.
  const { projects, workIntro } = portfolioData;

  return (
    <section
      id="work"
      className="relative -mt-10 rounded-t-4xl bg-bg-dark px-6 pb-24 pt-20 sm:px-10 sm:pt-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={workIntro.eyebrow}
          heading={workIntro.heading}
          description={workIntro.description}
          theme="light"
          headingClassName="text-3xl sm:text-5xl"
          descriptionClassName="max-w-md"
        />

        {/* One StickyStackCard per project — `index` tells each card
            its position in the stack, which controls which card appears
            "on top of" the others while scrolling. */}
        <div className="mt-16">
          {projects.map((project, i) => (
            <StickyStackCard key={project.id} index={i}>
              <ProjectCard project={project} />
            </StickyStackCard>
          ))}
        </div>
      </div>
    </section>
  );
}
