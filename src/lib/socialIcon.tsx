// socialIcon.tsx: Turns a plain text name like "Instagram" (stored in
// portfolioData.ts next to each social link) into the actual little icon
// picture shown on the page. This is what lets you add a new social
// link in the data file just by typing an icon's name, instead of
// having to import and place an icon component by hand.
import type { ComponentType } from "react";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Link as LinkIcon,
} from "lucide-react";

// lucide-react ships no TikTok glyph (there is no `TikTok` or `Tiktok`
// export in the installed package), so it's hand-drawn here instead,
// following lucide's own conventions — a 24x24 viewBox, sized by the
// same `size` prop, and filled with currentColor so it picks up the
// surrounding text color exactly like every other icon does.
// `size` is typed as string | number (not just number) to line up exactly
// with lucide-react's own icon signature — the two have to be
// interchangeable to live in the same lookup table below.
function TikTok({ size = 18 }: { size?: string | number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06v-3.1a5.66 5.66 0 0 0-.77-.05A5.66 5.66 0 1 0 15.54 15.4V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.29 4.29 0 0 1-3.24-1.48Z" />
    </svg>
  );
}

// A name-to-icon lookup: the key is the exact text you'd type in
// portfolioData.ts (e.g. meta.socials[0].icon = "Instagram"), and the
// value is the matching icon component.
//
// IMPORTANT: every `icon` value used in portfolioData.ts must have a key
// here, otherwise that link silently renders a generic chain-link icon
// instead. "Facebook" and "TikTok" were both missing before and would
// have shipped as anonymous link icons the moment socialsVisible was
// switched on.
const ICONS: Record<string, ComponentType<{ size?: string | number }>> = {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  TikTok,
};

/** Resolves a social link's `icon` string (e.g. "Instagram") to its icon component. */
export function SocialIcon({ name, size = 18 }: { name: string; size?: number }) {
  // Look up the requested icon name above. If it's not found (e.g. a
  // typo in portfolioData.ts), fall back to a generic link icon instead
  // of crashing the page.
  const Icon = ICONS[name] ?? LinkIcon;
  return <Icon size={size} />;
}
