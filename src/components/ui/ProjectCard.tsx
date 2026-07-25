// ProjectCard.tsx: The full content shown inside one sticky-stacking
// project card in the Selected Projects section — tags, title,
// description, client/link info, and the project's images. The
// sticking/shrinking scroll behavior itself is handled by the parent
// StickyStackCard.tsx; this file is purely "what goes inside the card."
import { ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "../../types/portfolio";
import { Badge } from "./Badge";
import { FallbackImage } from "./FallbackImage";
import { ImageCarousel } from "../motion/ImageCarousel";
import { FOCUS_RING_DARK } from "../../lib/a11y";
import { cn } from "../../lib/cn";

interface ProjectCardProps {
  // One entry from portfolioData.ts's `projects` array — see the
  // ProjectItem type in src/types/portfolio.ts for the full field list.
  project: ProjectItem;
}

const EXTERNAL_LINK_CLASS = cn(
  "inline-flex items-center gap-1 rounded-md text-text-light underline decoration-divider underline-offset-4 transition-colors hover:text-cream",
  FOCUS_RING_DARK,
);

export function ProjectCard({ project }: ProjectCardProps) {
  // Prefer linking to the live site if one was provided; only fall back
  // to the case study link when there's no live URL. Computed once here
  // instead of duplicating the whole <a> block per case.
  const externalLink = project.liveUrl
    ? { href: project.liveUrl, label: "Visit live site" }
    : project.caseStudyUrl
      ? { href: project.caseStudyUrl, label: "Read case study" }
      : null;

  return (
    // overflow-y-auto is a safety net: on short viewports (e.g. a landscape
    // phone or a small laptop window) the fixed-height sticky card can be
    // shorter than this content — better to scroll internally than to
    // silently clip the carousel.
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-6 sm:p-10">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
        <div className="max-w-xl">
          {/* One small Badge pill per category tag, e.g. "Brand", "Web". */}
          <div className="flex flex-wrap gap-2">
            {project.categoryTags.map((tag) => (
              <Badge key={tag} className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="mt-4 font-display text-3xl text-text-light sm:text-5xl">
            {project.title}
          </h3>
          <p className="mt-3 font-body text-sm text-text-light/70 sm:text-base">
            {project.description}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-3 font-body text-sm text-text-light/60 sm:items-end sm:text-right">
          <div>{project.client}</div>
          {externalLink && (
            <a
              href={externalLink.href}
              target="_blank"
              rel="noreferrer"
              className={EXTERNAL_LINK_CLASS}
            >
              {externalLink.label}
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Mobile & tablet: one-image-at-a-time carousel */}
      <div className="lg:hidden">
        <ImageCarousel images={project.images} altBase={project.title} />
      </div>

      {/* Desktop: original multi-column grid */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-3">
        {project.images.map((image, i) => (
          <div
            key={image + i}
            className="group aspect-[4/3] overflow-hidden rounded-2xl bg-black/20"
          >
            <FallbackImage
              src={image}
              alt={`${project.title} — preview ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
