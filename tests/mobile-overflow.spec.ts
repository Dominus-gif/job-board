import { test, expect, devices } from "@playwright/test";

/**
 * Regression guard: no page may scroll horizontally on a phone. Catches the
 * class of bug where a wide element (unshrinkable button, fixed-width block, a
 * long unbreakable word) pushes the layout past the viewport.
 *
 * Two widths, because they catch different things. 390px is the common phone.
 * 320px is the narrowest screen still in use, and it is where text breaks: the
 * About page's h1 overflowed there for want of an overflow-wrap rule, and this
 * file did not notice because it only tested 390px and did not list /about.
 *
 * Prose routes are in the list for the same reason — a heading or a long URL in
 * body copy is the usual cause at 320px, and those pages are nothing but prose.
 */
const ROUTES = [
  "/",
  "/jobs",
  "/jobs?category=Design&salary=100k",
  "/remote-regional-jobs",
  "/companies",
  "/tools/world-time-buddy",
  "/remote-jobs-in-the-bay-area",
  "/about",
  "/contact",
  "/how-it-works",
  "/faq",
  "/posts",
  "/posts/remote-product-manager-jobs",
];

const WIDTHS = [
  { label: "390px", width: 390, height: 844 },
  { label: "320px", width: 320, height: 720 },
];

test.use({ viewport: devices["iPhone 13"].viewport });

for (const { label, width, height } of WIDTHS) {
  for (const route of ROUTES) {
    test(`no horizontal overflow at ${label} — ${route}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto(route, { waitUntil: "networkidle" });

      const report = await page.evaluate(() => {
        const de = document.documentElement;
        // Name the culprit rather than only the symptom: body carries
        // overflow-x: clip, so a failure here is otherwise invisible to look at.
        const culprits: string[] = [];
        for (const el of document.querySelectorAll<HTMLElement>("body *")) {
          const r = el.getBoundingClientRect();
          if (r.width === 0) continue;
          const pastEdge = r.right > window.innerWidth + 1;
          const cannotFit = el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0;
          if (pastEdge || cannotFit) {
            const cls = String(el.className || "").split(" ").filter(Boolean).slice(0, 2).join(".");
            culprits.push(
              `<${el.tagName.toLowerCase()}${cls ? "." + cls : ""}> needs ${el.scrollWidth}px in ${el.clientWidth}px` +
                ` — "${(el.textContent || "").trim().slice(0, 40)}"`,
            );
          }
        }
        return { scrollW: de.scrollWidth, clientW: de.clientWidth, culprits: [...new Set(culprits)].slice(0, 3) };
      });

      // allow 1px for sub-pixel rounding
      expect(
        report.scrollW,
        `${route} at ${label} overflows: scrollWidth ${report.scrollW} > clientWidth ${report.clientW}` +
          (report.culprits.length ? `\n  likely cause:\n    ${report.culprits.join("\n    ")}` : ""),
      ).toBeLessThanOrEqual(report.clientW + 1);
    });
  }
}
