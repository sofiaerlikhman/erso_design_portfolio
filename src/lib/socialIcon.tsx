// socialIcon.tsx: Turns a plain text name like "Github" (stored in
// portfolioData.ts next to each social link) into the actual little icon
// picture shown on the page. This is what lets you add a new social
// link in the data file just by typing an icon's name, instead of
// having to import and place an icon component by hand.
import { Github, Instagram, Linkedin, Mail, Link as LinkIcon, type LucideIcon } from "lucide-react";

// A name-to-icon lookup: the key is the exact text you'd type in
// portfolioData.ts (e.g. meta.socials[0].icon = "Github"), and the value
// is the matching icon component from the lucide-react icon library.
const ICONS: Record<string, LucideIcon> = {
  Github,
  Instagram,
  Linkedin,
  Mail,
};

/** Resolves a social link's `icon` string (e.g. "Github") to its lucide-react component. */
export function SocialIcon({ name, size = 18 }: { name: string; size?: number }) {
  // Look up the requested icon name above. If it's not found (e.g. a
  // typo in portfolioData.ts), fall back to a generic link icon instead
  // of crashing the page.
  const Icon = ICONS[name] ?? LinkIcon;
  return <Icon size={size} />;
}
