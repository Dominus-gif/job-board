import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { GUIDE_SPARKLE_CLASSES, GUIDE_SPARKLE_STARS } from "./GuideSparkle";

/**
 * This effect fails quietly in two ways, and neither throws.
 *
 * Rename a class in the component and the markup still renders — just
 * undecorated. Lose the `:root.dark` block and the stars stay near-black on the
 * dark canvas, which is invisible rather than broken. Both are the sort of thing
 * that survives a refactor and is noticed weeks later, so they are asserted
 * against the stylesheet here.
 */
const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

describe("Guides nav sparkle", () => {
  it("has a rule for every class the component emits", () => {
    for (const cls of GUIDE_SPARKLE_CLASSES) {
      expect(css, `.${cls} has no rule in globals.css`).toContain(`.${cls} {`);
    }
  });

  it("defines the ink colour for light mode and overrides it for dark", () => {
    const light = css.match(/\.gsparkle \{[^}]*\}/s)?.[0] ?? "";
    const dark = css.match(/:root\.dark \.gsparkle \{[^}]*\}/s)?.[0] ?? "";
    expect(light).toMatch(/--gsx:\s*#141414/);
    expect(light).toMatch(/--gsx-track:\s*rgba\(20, 20, 20/);
    expect(dark).toMatch(/--gsx:\s*#ffffff/);
    expect(dark).toMatch(/--gsx-track:\s*rgba\(255, 255, 255/);
  });

  it("draws the stars and the sweep from that one variable, never a fixed colour", () => {
    const star = css.match(/\.gsparkle-star \{[^}]*\}/s)?.[0] ?? "";
    const sweep = css.match(/\.gsparkle-line::after \{[^}]*\}/s)?.[0] ?? "";
    expect(star).toContain("background: var(--gsx)");
    expect(sweep).toContain("var(--gsx)");
    // A hard-coded white highlight is the usual version of this effect and it
    // would be invisible on paper.
    expect(sweep).not.toMatch(/#fff\b|#ffffff|\bwhite\b/);
  });

  it("animates only compositable properties, with no filter", () => {
    const twinkle = css.match(/@keyframes gsx-twinkle \{[^}]*\}[^}]*\}/s)?.[0] ?? "";
    expect(twinkle).not.toBe("");
    // A var() inside keyframes cannot be composited, and a filter repaints every
    // frame. Seven stars sit in a sticky header on every page.
    expect(twinkle).not.toContain("var(");
    expect(css.match(/\.gsparkle-star \{[^}]*\}/s)?.[0]).not.toContain("filter");
  });

  it("parks the animation deliberately under reduced motion", () => {
    // The global rule only clamps animation-duration, which would freeze a star
    // on an arbitrary frame — including the 25% opacity trough.
    const block = css.slice(css.lastIndexOf("@media (prefers-reduced-motion: reduce)"));
    expect(block).toContain(".gsparkle-star");
    expect(block).toMatch(/animation: none/);
  });

  it("keeps the stars within a few pixels of the label on both sides", () => {
    // Each star is 0.5em wide, so the rightmost reaches left + 50% of the font
    // size. Anything much past this and the header's gap stops containing it.
    for (const s of GUIDE_SPARKLE_STARS) {
      const left = parseFloat(s.left);
      expect(left, `star at left:${s.left} is too far out`).toBeGreaterThanOrEqual(-20);
      expect(left, `star at left:${s.left} is too far out`).toBeLessThanOrEqual(100);
    }
  });

  it("gives each star its own delay so they do not pulse in unison", () => {
    const delays = new Set(GUIDE_SPARKLE_STARS.map((s) => s.delay));
    expect(delays.size).toBe(GUIDE_SPARKLE_STARS.length);
  });
});
