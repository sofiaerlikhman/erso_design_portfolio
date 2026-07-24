// MagneticButton.tsx: The pill-shaped call-to-action button style used
// across the site (Hero's "Download Resume", Contact's "Start a
// Conversation"). It wraps Magnet.tsx (which handles the cursor-following
// movement) and adds the actual button look — background color, text,
// border-radius, and an optional icon.
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Magnet } from "../motion/Magnet";
import { cn } from "../../lib/cn";
import { FOCUS_RING_DARK } from "../../lib/a11y";

// Extending AnchorHTMLAttributes means this component also accepts any
// normal <a> tag prop (href, target, rel, etc.) — anything not listed
// below just gets passed straight through to the underlying link.
interface MagneticButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  // "primary" = solid cream pill (the main call-to-action look).
  // "ghost" = subtle outlined/translucent look (secondary action).
  variant?: "primary" | "ghost";
  icon?: ReactNode;
  className?: string;
  // How strongly this specific button follows the cursor — passed
  // straight through to Magnet's `strength` prop.
  magnetStrength?: number;
  /** Stretches to fill the available width instead of shrinking to content width. */
  fullWidth?: boolean;
}

// The background/text/hover color classes for each visual style, kept
// in one place so adding a new variant later only means adding one more
// line here.
const variantStyles = {
  primary: "bg-cream text-text-dark hover:bg-white",
  ghost: "border border-white/20 bg-white/5 text-text-light hover:bg-white/10",
} as const;

/**
 * Pill CTA that drifts toward the cursor on hover (via Magnet) — used for
 * resume/contact buttons across the site.
 */
export function MagneticButton({
  children,
  variant = "primary",
  icon,
  className,
  magnetStrength = 0.4,
  fullWidth = false,
  // Collects every other prop the caller passed in (href, target, rel,
  // onClick, etc.) into one object, so it can be spread onto the <a> tag
  // below without having to list each one by name.
  ...anchorProps
}: MagneticButtonProps) {
  return (
    <Magnet strength={magnetStrength} className={fullWidth ? "block w-full" : "inline-block"}>
      <a
        {...anchorProps}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 ease-editorial",
          fullWidth && "w-full justify-center",
          variantStyles[variant],
          FOCUS_RING_DARK,
          className,
        )}
      >
        {children}
        {icon}
      </a>
    </Magnet>
  );
}
