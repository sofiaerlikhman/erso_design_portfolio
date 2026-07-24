// ImageCarousel.tsx: The swipeable "one image at a time" picture viewer
// used inside each project card on mobile/tablet (see ProjectCard.tsx —
// on desktop, a plain image grid is shown instead). Supports clicking
// the arrow buttons, clicking the little dots, or swiping/dragging with
// a finger or mouse.
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
  type Transition,
  type Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FallbackImage } from "../ui/FallbackImage";
import { FOCUS_RING_DARK, TAP_SCALE } from "../../lib/a11y";
import { cn } from "../../lib/cn";

interface ImageCarouselProps {
  images: string[];
  // Used to build a descriptive alt-text for each image, e.g.
  // "Aurora Systems — preview 2 of 3".
  altBase: string;
  className?: string;
}

// How many pixels you need to drag before it counts as a deliberate
// "next/previous" swipe rather than an accidental nudge.
const SWIPE_THRESHOLD = 50;
// How far (in pixels) a slide travels sideways while it's animating in
// or out.
const SLIDE_DISTANCE = 60;

// Direction-aware slide variants — must be functions (not plain objects) so
// that when a slide exits, AnimatePresence re-evaluates it using the
// *current* `custom` value rather than the value from the render where the
// exiting slide was last active (the classic stale-closure bug in
// direction-aware carousels).
//
// In plain terms: "enter" describes where a new slide starts (off to one
// side, at zero opacity) before animating to its resting spot; "center" is
// that resting spot (fully visible, no offset); "exit" describes where
// the old slide animates *to* as it leaves (off to the opposite side).
// Which side depends on whether we're moving forward or backward — that's
// the `direction` value (1 or -1) each function receives.
const variants: Variants = {
  enter: (direction: number) => ({ x: direction * SLIDE_DISTANCE, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction * -SLIDE_DISTANCE, opacity: 0 }),
};

// A simpler version used when the visitor prefers reduced motion — just
// fades between slides with no sideways movement.
const reducedVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

// Constant across every slide change, so these are declared once here
// instead of as new object literals inside the component (which would
// otherwise be recreated every time a slide changes). Typed explicitly
// against Framer Motion's own Transition type so the `ease` tuple is
// checked correctly without needing an `as const` workaround.
const SLIDE_TRANSITION: Transition = { duration: 0.35, ease: [0.16, 1, 0.3, 1] };
const DRAG_CONSTRAINTS = { left: 0, right: 0 };

/**
 * Shows one image at a time with prev/next controls, dot pagination, and
 * drag-to-swipe — used in place of a plain multi-column grid so each
 * project image gets full-width focus.
 */
export function ImageCarousel({ images, altBase, className }: ImageCarouselProps) {
  // A single state value holding two numbers at once: which image is
  // currently showing (`index`), and which way we just moved (`direction`:
  // 1 for forward/next, -1 for backward/previous). Keeping them together
  // like this means they always update at the same time, which matters
  // for the slide animation above to point the right way.
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const shouldReduceMotion = useReducedMotion();

  // If a project somehow has no images at all, there's nothing to show.
  if (images.length === 0) return null;

  // Moves to a new slide index, wrapping around at the ends (going
  // "next" from the last image loops back to the first one), and
  // records which direction we moved so the animation slides the right
  // way.
  function goTo(newIndex: number) {
    const wrapped = (newIndex + images.length) % images.length;
    setSlide([wrapped, newIndex > index ? 1 : -1]);
  }

  // Called when the visitor releases a drag/swipe gesture. If they
  // dragged far enough left or right (past SWIPE_THRESHOLD), treat it as
  // a request to go to the next/previous image; otherwise the slide just
  // springs back to where it was.
  function handleDragEnd(_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) goTo(index + 1);
    else if (info.offset.x > SWIPE_THRESHOLD) goTo(index - 1);
  }

  return (
    <div
      className={cn("relative", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${altBase} images`}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-black/20">
        {/* AnimatePresence lets the outgoing image play its "exit"
            animation at the same time the incoming image plays its
            "enter" animation, instead of one abruptly replacing the other. */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={shouldReduceMotion ? reducedVariants : variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={SLIDE_TRANSITION}
            // Dragging is only enabled when there's more than one image
            // to switch between.
            drag={images.length > 1 ? "x" : false}
            // Keeps the slide from being dragged away permanently — it
            // can only be nudged a little (see dragElastic) before
            // snapping back or triggering goTo() above.
            dragConstraints={DRAG_CONSTRAINTS}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
          >
            <FallbackImage
              src={images[index]}
              alt={`${altBase} — preview ${index + 1} of ${images.length}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Previous/Next arrow buttons — only shown when there's more
            than one image, since with just one there's nowhere to go. */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous image"
              className={cn(
                "absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg-dark/60 text-text-light backdrop-blur-sm transition-colors hover:bg-bg-dark/80",
                FOCUS_RING_DARK,
                TAP_SCALE,
              )}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next image"
              className={cn(
                "absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg-dark/60 text-text-light backdrop-blur-sm transition-colors hover:bg-bg-dark/80",
                FOCUS_RING_DARK,
                TAP_SCALE,
              )}
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* The row of small dots below the image — one per picture. The
          current picture's dot is drawn wider and brighter; clicking
          any dot jumps straight to that picture. */}
      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full",
                FOCUS_RING_DARK,
              )}
            >
              <span
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-text-light" : "w-1.5 bg-text-light/30",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
