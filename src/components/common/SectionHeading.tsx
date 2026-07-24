// SectionHeading.tsx: The "small label + big title + optional short
// description" block used at the top of both the Experience & Services
// and Selected Work sections. Built on top of SectionEyebrow.tsx.
import { SectionEyebrow } from "./SectionEyebrow";
import { cn } from "../../lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  description?: string;
  /** "light" for dark section backgrounds, "dark" for cream backgrounds — see SectionEyebrow. */
  theme?: "dark" | "light";
  /** Size/weight classes for the <h2> — kept per-usage since ServicesResume and SelectedProjects intentionally use different heading sizes. */
  headingClassName?: string;
  /** Extra classes for the description <p>, e.g. a max-width. */
  descriptionClassName?: string;
}

/**
 * The repeated "eyebrow label + big heading + optional short description"
 * block used at the top of ServicesResume and SelectedProjects. Pulling
 * this into one component means that structure (and the conditional
 * rendering of `description`) only has to be written once.
 */
export function SectionHeading({
  eyebrow,
  heading,
  description,
  theme = "light",
  headingClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <>
      <SectionEyebrow theme={theme}>{eyebrow}</SectionEyebrow>
      {/*
        `theme` owns the heading's text color too, same as it already does
        for the eyebrow and description below — previously the heading had
        no color class of its own, so ServicesResume's cream-section usage
        relied on inheriting text-text-dark from its ancestor <section>
        while SelectedProjects's dark-section usage had to spell out
        text-text-light explicitly in headingClassName. Same component, two
        different mechanisms for the same concern. cn()'s tailwind-merge
        dedupes cleanly if a call site's headingClassName repeats the color.
      */}
      <h2
        className={cn(
          "mt-4 font-display",
          theme === "dark" ? "text-text-dark" : "text-text-light",
          headingClassName,
        )}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 font-body text-sm",
            theme === "dark" ? "text-text-dark/60" : "text-text-light/60",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </>
  );
}
