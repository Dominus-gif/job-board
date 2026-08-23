import { test, expect, devices } from "@playwright/test";

/**
 * Regression guard: no page may scroll horizontally on a 390px phone. Catches
 * the class of bug where a wide element (unshrinkable button, fixed-width block)
 * pushes the layout past the viewport.
 */
const ROUTES = [
  "/",
  "/jobs",
  "/jobs?category=Design&salary=100k",
  "/remote-regional-jobs",
  "/companies",
  "/tools/world-time-buddy",
  "/remote-jobs-in-the-bay-area",
];

test.use({ viewport: devices["iPhone 13"].viewport });

for (const route of ROUTES) {
  test(`no horizontal overflow at 390px — ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route, { waitUntil: "networkidle" });
    const { scrollW, clientW } = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    // allow 1px for sub-pixel rounding
    expect(scrollW, `${route} overflows: scrollWidth ${scrollW} > clientWidth ${clientW}`).toBeLessThanOrEqual(clientW + 1);
  });
}
