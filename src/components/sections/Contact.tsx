// Contact.tsx: The closing section — a big "let's build something
// together" statement on one side, and a small card with quick-contact
// options (résumé download, copy-to-clipboard email, the main CTA
// button, and optionally social links) on the other.
import { useEffect, useRef, useState } from "react";
import { Check, Copy, FileDown } from "lucide-react";
import { Badge } from "../ui/Badge";
import { MagneticButton } from "../ui/MagneticButton";
import { SocialIcon } from "../../lib/socialIcon";
import { withBase } from "../../lib/withBase";
import { FOCUS_RING_DARK, TAP_SCALE } from "../../lib/a11y";
import { cn } from "../../lib/cn";
import { portfolioData } from "../../data/portfolioData";

// Shared by the Resume and Email rows below — pulled out once so the two
// rows can't quietly drift out of sync with each other over future edits.
const CARD_ROW_CLASS =
  "group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:bg-white/10";

export function Contact() {
  // contact: the heading/subheading/button text for this section.
  // meta: general site info (email, résumé link, socials, availability).
  const { contact, meta } = portfolioData;

  // copied: true for a couple of seconds right after the visitor clicks
  // the email row, showing "Copied to clipboard" instead of the email
  // address, then automatically flips back to false.
  const [copied, setCopied] = useState(false);

  // Holds the pending "hide the confirmation again" timer so it can be
  // cancelled — both when the visitor copies again before the previous
  // one has expired, and when this section unmounts.
  const resetTimer = useRef<number | null>(null);

  // Cancel any timer still in flight if this component goes away, so it
  // can't fire against a component that no longer exists.
  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    };
  }, []);

  // Copies your email address to the visitor's clipboard when they
  // click the Email row, and briefly shows a confirmation message.
  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(meta.email);
      setCopied(true);
      // Clear the previous timer first. Without this, clicking twice in
      // quick succession leaves the first timer running, and it would
      // wipe the "Copied to clipboard" message early — well before the
      // two seconds the second click was supposed to get.
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — the email is
      // still visible on the button for the user to copy manually.
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-bg-dark px-6 py-28 sm:px-10 sm:py-36"
    >
      {/* Ambient backdrop, echoing the Hero's mesh so the page bookends itself */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 top-0 h-[50vh] w-[50vh] rounded-full bg-[radial-gradient(circle,_rgba(138,148,160,0.25)_0%,_transparent_70%)] blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[45vh] w-[45vh] rounded-full bg-[radial-gradient(circle,_rgba(226,236,243,0.15)_0%,_transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          {/* Left: the big statement + availability badge. */}
          <div>
            <Badge dot>{meta.availability}</Badge>
            <h2 className="mt-8 font-display text-4xl leading-[0.95] text-text-light sm:text-6xl lg:text-7xl">
              {contact.heading}
            </h2>
            <p className="mt-6 max-w-md font-body text-text-light/60">
              {contact.subheading}
            </p>
          </div>

          {/* Right: the glassmorphic card with quick-contact options. */}
          <div className="rounded-4xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md sm:p-10">
            <div className="flex flex-col gap-4">
              <a
                href={withBase(meta.resumeUrl)}
                target="_blank"
                rel="noreferrer"
                className={cn(CARD_ROW_CLASS, FOCUS_RING_DARK, TAP_SCALE)}
              >
                <div>
                  <div className="font-body text-xs uppercase tracking-wide text-text-light/40">
                    Resume
                  </div>
                  <div className="mt-1 font-body text-sm text-text-light">Download PDF</div>
                </div>
                <FileDown size={18} className="shrink-0 text-text-light/50 transition-colors group-hover:text-text-light" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className={cn(CARD_ROW_CLASS, "text-left", FOCUS_RING_DARK, TAP_SCALE)}
              >
                <div className="min-w-0">
                  <div className="font-body text-xs uppercase tracking-wide text-text-light/40">
                    Email
                  </div>
                  <div className="mt-1 truncate font-body text-sm text-text-light">
                    {copied ? "Copied to clipboard" : meta.email}
                  </div>
                </div>
                {/* Swaps to a checkmark icon for the couple of seconds
                    right after copying, then back to the copy icon. */}
                {copied ? (
                  <Check size={18} className="shrink-0 text-emerald-400" />
                ) : (
                  <Copy size={18} className="shrink-0 text-text-light/50 transition-colors group-hover:text-text-light" />
                )}
              </button>

              <MagneticButton
                href={`mailto:${meta.email}`}
                variant="primary"
                magnetStrength={0.5}
                fullWidth
              >
                {contact.ctaLabel}
              </MagneticButton>

              {/* Social icons row — only shown once meta.socialsVisible is
                  switched on in portfolioData.ts (currently off). */}
              {meta.socialsVisible && (
                <div className="flex items-center gap-3 pt-2">
                  {meta.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target={social.url.startsWith("http") ? "_blank" : undefined}
                      rel={social.url.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={social.label}
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-text-light/70 transition-colors hover:border-white/30 hover:text-text-light",
                        FOCUS_RING_DARK,
                        TAP_SCALE,
                      )}
                    >
                      <SocialIcon name={social.icon} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
