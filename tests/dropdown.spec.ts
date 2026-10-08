import { expect, test } from "@playwright/test";

/**
 * The custom <Select> panel must never be clipped, covered or pushed off
 * screen, wherever it is used.
 *
 * It regressed once already: as an absolutely positioned child it was cut in
 * half by the hero section's `overflow: hidden`, which made the subscribe
 * form's category list unusable on the homepage. The panel is portalled to
 * <body> now, and these checks fail if anyone moves it back inside the
 * component's own box.
 *
 * Checked for every dropdown on the page, at desktop and phone width:
 *   1. it opens, with its options
 *   2. its box sits inside the viewport
 *   3. the browser agrees the panel is the topmost thing at its own corners,
 *      which is what catches both clipping and stacking order
 *   4. the last option can be clicked, and selecting it updates the button
 */
const PAGES = [
  ["homepage", "/"],
  ["job search", "/jobs"],
  ["companies", "/companies"],
  ["a tool", "/tools/salary-band-estimator"],
  // The guides index grew a sort control; it shares the Select component, so it
  // shares the clipping and stacking failure modes.
  ["guides", "/posts"],
];

const SIZES = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "phone", width: 390, height: 844 },
];

for (const [label, path] of PAGES) {
  for (const size of SIZES) {
    test(`${label} dropdowns are usable at ${size.name} width`, async ({ page }) => {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.goto(path, { waitUntil: "domcontentloaded" });
      // domcontentloaded fires before React hydrates, and hydration replaces
      // these buttons. Without this wait, `isVisible()` below can read the
      // pre-hydration node, return false, and skip every dropdown — a test that
      // passes while checking nothing.
      await page.waitForLoadState("load");

      const buttons = page.locator('button[role="combobox"]');
      const count = await buttons.count();
      expect(count, `${path} should have at least one dropdown to check`).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        if (!(await button.isVisible())) continue;
        await button.click();

        const panel = page.locator('ul[role="listbox"]');
        await expect(panel).toBeVisible();
        const options = panel.locator('li[role="option"]');
        expect(await options.count()).toBeGreaterThan(0);

        const report = await page.evaluate(() => {
          const list = document.querySelector('ul[role="listbox"]')!;
          const r = list.getBoundingClientRect();
          const inset = 6;
          // elementFromPoint answers both questions at once: a clipped panel is
          // not painted at these points, and a covered one loses to whatever is
          // on top.
          const corners = [
            [r.left + inset, r.top + inset],
            [r.right - inset, r.top + inset],
            [r.left + inset, r.bottom - inset],
            [r.right - inset, r.bottom - inset],
          ] as const;
          return {
            rect: { top: r.top, left: r.left, right: r.right, bottom: r.bottom, height: r.height },
            viewport: { width: window.innerWidth, height: window.innerHeight },
            topmostAtCorners: corners.map(([x, y]) => list.contains(document.elementFromPoint(x, y))),
            scrollable: list.scrollHeight > list.clientHeight + 1,
          };
        });

        const where = `${path} @ ${size.name}, dropdown ${i + 1}`;
        expect(report.rect.height, `${where}: panel has no height`).toBeGreaterThan(20);
        expect(report.rect.top, `${where}: panel starts above the viewport`).toBeGreaterThanOrEqual(-1);
        expect(report.rect.bottom, `${where}: panel runs past the bottom of the viewport`).toBeLessThanOrEqual(
          report.viewport.height + 1,
        );
        expect(report.rect.left, `${where}: panel starts left of the viewport`).toBeGreaterThanOrEqual(-1);
        expect(report.rect.right, `${where}: panel runs past the right of the viewport`).toBeLessThanOrEqual(
          report.viewport.width + 1,
        );
        expect(
          report.topmostAtCorners,
          `${where}: panel is clipped or covered at one of its corners (${JSON.stringify(report.topmostAtCorners)})`,
        ).toEqual([true, true, true, true]);

        // The whole list has to be reachable, not just the part that fits.
        const last = options.last();
        await last.scrollIntoViewIfNeeded();
        await expect(last).toBeVisible();
        const chosen = (await last.innerText()).trim();
        await last.click();
        await expect(panel).toBeHidden();
        await expect(button).toContainText(chosen.split("\n")[0]);
      }
    });
  }
}

test("the panel follows its button when the page scrolls", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("load");

  const button = page.locator('button[role="combobox"]').first();
  // click() scrolls the element into view and retries if hydration swaps the
  // node underneath it. An explicit scrollIntoViewIfNeeded() does neither, and
  // was the one call here that threw "Element is not attached to the DOM".
  await button.click();
  const panel = page.locator('ul[role="listbox"]');
  await expect(panel).toBeVisible();

  const gapBefore = await page.evaluate(() => {
    const b = document.querySelector('button[role="combobox"]')!.getBoundingClientRect();
    const l = document.querySelector('ul[role="listbox"]')!.getBoundingClientRect();
    return Math.round(Math.abs(l.top - b.bottom));
  });

  await page.mouse.wheel(0, 120);
  await page.waitForTimeout(150);

  const gapAfter = await page.evaluate(() => {
    const b = document.querySelector('button[role="combobox"]')!.getBoundingClientRect();
    const l = document.querySelector('ul[role="listbox"]')!.getBoundingClientRect();
    return Math.round(Math.abs(l.top - b.bottom));
  });

  expect(Math.abs(gapAfter - gapBefore), "panel drifted away from its button on scroll").toBeLessThanOrEqual(2);
});
