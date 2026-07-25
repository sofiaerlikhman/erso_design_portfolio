// AnimatedGradient.tsx: A soft, slowly-drifting abstract gradient used
// as the Hero section's backdrop — three large blurred color blobs
// glide and breathe in an endless loop. It's deliberately calm and slow
// (20-30 second cycles) rather than flashy, so it reads as "alive"
// without ever pulling attention away from the headline text in front
// of it.
import { motion, useReducedMotion } from "framer-motion";

// One blob's resting position/size, its color (using the site's own
// design-system colors so the gradient stays on-brand), and how long
// one drift-and-return cycle takes. Kept as plain data — rather than
// three near-identical chunks of JSX — so adding or tweaking a blob
// means editing one line here instead of duplicating markup.
interface Blob {
  position: string;
  size: string;
  color: string;
  duration: number;
}

const BLOBS: Blob[] = [
  // Metallic gray-blue (matches the site's metallic gradient accent)
  { position: "-top-1/4 left-[12%]", size: "h-[55vh] w-[55vh]", color: "rgba(138,148,160,0.35)", duration: 22 },
  // Pale ice blue (the lighter end of that same metallic gradient)
  { position: "top-1/3 -right-[5%]", size: "h-[45vh] w-[45vh]", color: "rgba(226,236,243,0.22)", duration: 27 },
  // Warm cream/tan (the site's divider color), for a soft warm-cool contrast
  { position: "-bottom-1/4 left-1/3", size: "h-[50vh] w-[50vh]", color: "rgba(217,196,170,0.18)", duration: 32 },
];

/**
 * Fills its positioned parent with three blurred, slowly-drifting radial
 * gradients plus a dark wash on top (so text placed after this in the DOM
 * stays legible). Motion is skipped entirely when the visitor has "reduce
 * motion" turned on — the blobs just sit still in their resting position.
 */
export function AnimatedGradient() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {BLOBS.map((blob) => (
        <motion.div
          key={blob.position}
          className={`absolute rounded-full blur-3xl ${blob.position} ${blob.size}`}
          style={{ background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)` }}
          // Each blob drifts a little to one side, then the other, while
          // gently growing and shrinking — a loose, organic wander rather
          // than a mechanical back-and-forth.
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 40, -30, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }
          }
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-0 bg-bg-dark/40" />
    </div>
  );
}
