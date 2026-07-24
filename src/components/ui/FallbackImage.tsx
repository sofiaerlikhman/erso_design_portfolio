// FallbackImage.tsx: A drop-in replacement for a plain <img> tag that
// shows a neat placeholder tile instead of the browser's ugly
// "broken image" icon if the picture fails to load — e.g. if someone
// edits portfolioData.ts and points at an image file that doesn't
// actually exist. Used everywhere a project or marquee image is shown.
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "../../lib/cn";

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

/**
 * <img> that degrades to a dark placeholder tile instead of a broken-image
 * icon if the source 404s (e.g. a project image path in portfolioData.ts
 * points at a file that was renamed or deleted).
 */
export function FallbackImage({ src, alt, className, loading = "lazy" }: FallbackImageProps) {
  // Starts as false (assume the image will load fine). Gets flipped to
  // true only if the browser reports the image failed to load — see
  // the onError handler on the <img> tag below.
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-white/10 to-white/0 text-text-light/30",
          className,
        )}
      >
        <ImageOff size={20} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      // "async" tells the browser it can decode the image off the main
      // thread whenever it's ready, instead of blocking a paint to decode
      // it synchronously the instant it finishes downloading.
      decoding="async"
      onError={() => setErrored(true)}
      className={className}
    />
  );
}
