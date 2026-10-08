import { test, expect, devices } from "@playwright/test";

/**
 * The Guides nav label carries stars and a sweeping underline, and the one thing
 * that has to hold is that they are drawn in the current theme's ink: near-black
 * on paper, white on the dark canvas. Getting that wrong does not break
 * anything, it just makes the decoration invisible, so it is checked here in a
 * real browser against the computed style rather than trusted from the
 * stylesheet.
 *
 * Also checks the thing a decoration overhanging its own box can break: the
 * stars sit a few pixels outside the label, and must stay inside the viewport.
 */
const EXPECTED = {
  light: { star: "rgb(20, 20, 20)", track: "rgba(20, 20, 20, 0.2)" },
  dark: { star: "rgb(255, 255, 255)", track: "rgba(255, 255, 255, 0.26)" },
};

async function setTheme(page: import("@playwright/test").Page, theme: "light" | "dark") {
  // Same key the ThemeToggle writes; set before navigation so the inline
  // themeInitScript picks it up before first paint.
  await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
}

for (const theme of ["light", "dark"] as const) {
  test(`Guides sparkle is drawn in the ${theme} theme's ink`, async ({ page }) => {
    await setTheme(page, theme);
    await page.goto("/posts", { waitUntil: "networkidle" });

    // The header nav is desktop-only; the default viewport is wide.
    const sparkle = page.locator("header .gsparkle").first();
    await expect(sparkle).toBeVisible();

    const star = sparkle.locator(".gsparkle-star").first();
    const line = sparkle.locator(".gsparkle-line");

    expect(await star.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(EXPECTED[theme].star);
    expect(await line.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(EXPECTED[theme].track);

    // The sweep highlight is a pseudo-element, so read the variable it resolves.
    const ink = await sparkle.evaluate((el) => getComputedStyle(el).getPropertyValue("--gsx").trim());
    expect(ink).toBe(theme === "dark" ? "#ffffff" : "#141414");

    // All seven stars present and none collapsed to nothing.
    const stars = sparkle.locator(".gsparkle-star");
    await expect(stars).toHaveCount(7);
    for (const box of await stars.all()) {
      const r = await box.boundingBox();
      expect(r!.width).toBeGreaterThan(2);
      expect(r!.height).toBeGreaterThan(2);
    }
  });
}

test("the label itself is still just the word Guides", async ({ page }) => {
  await page.goto("/posts", { waitUntil: "networkidle" });
  // /posts renders its own topic-pill nav, so find the link by the decoration
  // rather than by href. The stars and the line are aria-hidden, so neither the
  // text nor the accessible name may pick anything up from them.
  const link = page.locator('a[href="/posts"]').filter({ has: page.locator(".gsparkle") });
  await expect(link).toHaveCount(1);
  expect((await link.textContent())?.trim()).toBe("Guides");
  await expect(link).toHaveAccessibleName("Guides");
});

test("the overhanging stars do not push the mobile menu off screen", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/posts", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();

  // The desktop header nav is `hidden md:flex`, so its sparkle is still in the
  // DOM at 320px — scope to the visible one, which is the open menu's.
  const sparkle = page.locator("nav:visible .gsparkle").first();
  await expect(sparkle).toBeVisible();
  const stars = sparkle.locator(".gsparkle-star");
  await expect(stars).toHaveCount(7);
  for (const s of await stars.all()) {
    const r = await s.boundingBox();
    expect(r!.x, "a star is off the left edge").toBeGreaterThanOrEqual(0);
    expect(r!.x + r!.width, "a star is off the right edge").toBeLessThanOrEqual(320);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(321);
});

test.describe("on a phone", () => {
  test.use({ viewport: devices["iPhone 13"].viewport });
  test("the header nav stays hidden, so no stray stars in the top bar", async ({ page }) => {
    await page.goto("/posts", { waitUntil: "networkidle" });
    await expect(page.locator("header nav .gsparkle")).toBeHidden();
  });
});
