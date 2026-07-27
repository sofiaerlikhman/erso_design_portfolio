import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#0C0C0C",
        cream: "#F6E4CF",
        divider: "#D9C4AA",
        "text-dark": "#321C04",
        "text-light": "#D7E2EA",
      },
      fontFamily: {
        display: ["Abygaer", "Playfair Display", "serif"],
        body: ["Times New Roman", "Times", "serif"],
      },
      borderRadius: {
        "4xl": "40px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  // Makes every hover: / group-hover: utility apply only on inputs that
  // can actually hover (a mouse/trackpad), instead of a plain CSS
  // :hover — without this, tapping a touchscreen "hovers" an element and
  // it stays visually stuck in its hover state (scaled up, recolored,
  // nudged) until the visitor taps somewhere else, which reads as the
  // whole site glitching on every touch.
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
} satisfies Config;
