import type { ReactNode } from "react";

/**
 * Decorates a nav label with twinkling stars and a sweeping underline.
 *
 * Two things make this different from the usual version of this effect:
 *
 * 1. It carries no colour of its own. Everything is drawn in `--gsx`, which
 *    `globals.css` sets to near-black on paper and white on the dark canvas, so
 *    the stars, the underline track and the sweep all invert together with the
 *    theme toggle.
 * 2. The stars animate opacity and transform only, with no `filter` glow. A
 *    filter would repaint each star every frame, and this sits in a sticky
 *    header on every page of the site.
 *
 * Positions are `em` vertically so they track the label's font size, and `%`
 * horizontally so they spread across whatever the label happens to be. The
 * stars deliberately overhang the text box by a few pixels on each side; the
 * widest overhang is 7px, which fits inside the header's gap and the mobile
 * menu's padding. `body { overflow-x: clip }` is the backstop.
 */
const STARS = [
  { top: "-0.62em", left: "8%", delay: "0s" },
  { top: "-0.5em", left: "40%", delay: "0.5s" },
  { top: "-0.66em", left: "70%", delay: "1.1s" },
  { top: "0.05em", left: "-13%", delay: "0.8s" },
  { top: "0em", left: "100%", delay: "1.5s" },
  { top: "0.66em", left: "14%", delay: "0.3s" },
  { top: "0.62em", left: "88%", delay: "1.8s" },
] as const;

export function GuideSparkle({ children }: { children: ReactNode }) {
  return (
    <span className="gsparkle">
      {children}
      {STARS.map((s) => (
        <i
          key={`${s.top}${s.left}`}
          aria-hidden
          className="gsparkle-star"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}
      <span aria-hidden className="gsparkle-line" />
    </span>
  );
}

/** The classes the component emits, asserted against globals.css in the test. */
export const GUIDE_SPARKLE_CLASSES = ["gsparkle", "gsparkle-star", "gsparkle-line"] as const;
export const GUIDE_SPARKLE_STARS = STARS;
