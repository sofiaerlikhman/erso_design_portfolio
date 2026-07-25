// AnimatedGradient.tsx: A soft, slowly-drifting abstract gradient used
// as the Hero section's backdrop — three large blurred color blobs
// glide and breathe in an endless loop. The blobs themselves are kept
// faint on purpose — it's the MOVEMENT that should read as "alive",
// not the color patches sitting still. Compare against a fixed point
// on screen for a few seconds and the drift/pulse should be clearly
// noticeable, even though no single frame looks especially colorful.
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
  { position: "-top-1/4 left-[12%]", size: "h-[60vh] w-[60vh]", color: "rgba(138,148,160,0.45)", duration: 13 },
  // Pale ice blue (the lighter end of that same metallic gradient)
  { position: "top-1/4 -right-[5%]", size: "h-[55vh] w-[55vh]", color: "rgba(226,236,243,0.4)", duration: 16 },
  // Warm cream/tan (the site's divider color), for a soft warm-cool contrast
  { position: "-bottom-1/4 left-1/4", size: "h-[55vh] w-[55vh]", color: "rgba(217,196,170,0.35)", duration: 19 },
];

/**
 * Fills its positioned parent with three blurred, faintly-glowing radial
 * gradients, blended with `mix-blend-mode: screen` so they glow against
 * the section's near-black background instead of just sitting on top of
 * it as a translucent layer. Opacity is kept low so the *color* stays
 * subtle, while a wide drift/pulse range and a fairly short cycle
 * (13-19s, versus a much slower 20-30s for a calmer feel) makes the
 * *motion* the clearly noticeable part instead. Motion is skipped
 * entirely when the visitor has "reduce motion" turned on — the blobs
 * just sit still in their resting position.
 */
export function AnimatedGradient() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {BLOBS.map((blob) => (
        <motion.div
          key={blob.position}
          className={`absolute rounded-full blur-3xl mix-blend-screen ${blob.position} ${blob.size}`}
          style={{ background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)` }}
          // A wide wander (well over 100px in each direction) plus a big
          // grow/shrink pulse — large enough relative to the blob's own
          // size that the drift is obvious, not just a faint wobble.
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 130, -100, 0], y: [0, -100, 80, 0], scale: [1, 1.3, 0.8, 1] }
          }
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
