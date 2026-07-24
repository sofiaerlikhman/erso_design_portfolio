// AnimatedText.tsx: Powers the "letters fade in as you scroll past them"
// effect on the About section's lead paragraph. It doesn't draw anything
// fancy itself — it works out *when* each letter should fade in, and
// hands that off to lots of small AnimatedChar.tsx instances, one per
// letter.
import { Fragment, useMemo, useRef } from "react";
import { useReducedMotion, useScroll } from "framer-motion";
import { AnimatedChar } from "./AnimatedChar";

interface AnimatedTextProps {
  // The full sentence/paragraph to animate in.
  text: string;
  className?: string;
  // Optional extra styling applied to every individual letter <span>.
  charClassName?: string;
}

// One letter, plus the slice of the page's scroll progress (0 to 1)
// during which that specific letter should fade from dim to fully
// visible.
interface WordToken {
  char: string;
  range: [number, number];
}

/**
 * Splits `text` into characters (grouped by word so line-wrapping stays
 * natural) and fades each one in as the paragraph scrolls through the
 * viewport. A single useScroll call here drives every AnimatedChar child.
 */
export function AnimatedText({ text, className, charClassName }: AnimatedTextProps) {
  // A reference to the actual <p> element on the page, so Framer Motion
  // can watch exactly when *this* paragraph enters/exits the visible
  // part of the screen as the visitor scrolls.
  const containerRef = useRef<HTMLParagraphElement>(null);

  // True if the visitor has "reduce motion" turned on in their system
  // settings — if so, we skip the animated reveal further down.
  const shouldReduceMotion = useReducedMotion();

  // scrollYProgress is a live-updating number from 0 to 1 representing
  // how far the paragraph has scrolled through the tracked window.
  // offset ["start 0.9", "start 0.35"] means: progress is 0 when the
  // paragraph's top edge is 90% of the way down the screen (i.e. just
  // barely coming into view near the bottom), and progress is 1 once
  // that same top edge has scrolled up to 35% of the way down the
  // screen. In other words, the reveal plays out over that stretch of
  // scrolling, not over the whole page.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.35"],
  });

  // Splits the paragraph into words (so a word never breaks awkwardly
  // across two lines) and then into individual letters, calculating
  // each letter's own little slice of the overall 0–1 scroll range.
  // useMemo means this calculation only re-runs if `text` itself
  // changes, not on every re-render — it's a plain JavaScript loop, not
  // a hook, so it's safe to skip re-running it most of the time.
  const words = useMemo(() => {
    // How many non-space characters are in the whole paragraph — used
    // to work out what fraction of the scroll range belongs to each
    // individual letter.
    const totalChars = text.replace(/\s/g, "").length || 1;
    let seen = 0;
    return text.split(" ").map((word) =>
      word.split("").map((char): WordToken => {
        const start = seen / totalChars;
        seen += 1;
        const end = seen / totalChars;
        return { char, range: [start, end] };
      }),
    );
  }, [text]);

  // Skip the scroll-driven reveal entirely — show the paragraph plainly.
  if (shouldReduceMotion) {
    return (
      <p ref={containerRef} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={containerRef} className={className}>
      {words.map((tokens, wordIdx) => (
        // Each word is wrapped in its own inline-block span with
        // whitespace-nowrap, so the individual animated letters inside
        // it can never be split across two lines by the browser — only
        // whole words wrap, exactly like normal text. The space that
        // separates words is kept OUTSIDE this span, as a plain sibling
        // character: browsers silently collapse a space to zero width
        // when it sits at the very end of an inline-block's content, so
        // putting it inside the span (as this used to do) made every
        // space in the paragraph invisible even though it was still in
        // the HTML.
        <Fragment key={wordIdx}>
          <span className="inline-block whitespace-nowrap">
            {tokens.map((token, charIdx) => (
              <AnimatedChar
                key={charIdx}
                char={token.char}
                progress={scrollYProgress}
                range={token.range}
                className={charClassName}
              />
            ))}
          </span>
          {wordIdx < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </p>
  );
}
