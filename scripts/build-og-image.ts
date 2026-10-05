/**
 * Generates public/og.png, the Open Graph / X card image.
 *
 *   npx tsx scripts/build-og-image.ts
 *
 * Run by hand, not in the build, and the result is committed. Two reasons.
 *
 * First, this image is site-level branding that changes approximately never, so
 * regenerating it on every deploy buys nothing.
 *
 * Second and more important, text rendered to a bitmap depends on the fonts
 * available to whatever does the rendering. A build box with a different font
 * set would silently ship a card in the wrong typeface, or with no text at all,
 * and nobody would notice until someone shared a link. Generating it once,
 * looking at it, and committing the bytes removes that whole class of failure.
 *
 * It is drawn by screenshotting a real page in Chromium rather than by
 * composing an SVG, because the card should look like the site and the site is
 * built out of web fonts, CSS masks and a 140KB inline SVG map. An SVG
 * rasteriser gets none of those right: the first version of this file used one
 * and produced a generic dark gradient in whatever grotesque the system had
 * lying around.
 *
 * The card deliberately reuses the site's own visual language: the dot-matrix
 * world map from the hero, the real wordmark, Notion-warm near-blacks, and the
 * single brand blue. Nothing here quotes a figure from the board — this file is
 * committed and the board changes nightly, so a number baked in today is a lie
 * by next week.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const W = 1200;
const H = 630;

const PUBLIC = join(process.cwd(), "public");
const dataUri = (file: string, mime: string) =>
  `data:${mime};base64,${readFileSync(join(PUBLIC, file)).toString("base64")}`;

/** The hero's dot-matrix map, recoloured for the card. */
function worldMap(): string {
  const svg = readFileSync(join(PUBLIC, "world-dots.svg"), "utf-8");
  // The source paints every dot #000000; the card wants the ink tone.
  return svg.replace(/fill="#000000"/g, 'fill="#2b2a26"').replace(/<svg /, '<svg preserveAspectRatio="xMidYMid slice" ');
}

/**
 * Pins on the map, in the SVG's own 99x54 coordinate space.
 * Placed on land, spread across continents — the point is "anywhere", so a
 * cluster in one hemisphere would say the opposite of the headline.
 */
const PINS: [number, number][] = [
  [20, 18], // North America
  [30, 36], // South America
  [47, 16], // Europe
  [53, 33], // Africa
  [68, 20], // South Asia
  [78, 14], // East Asia
  [85, 42], // Australia
];

function html(): string {
  const logo = dataUri("brand-logo.png", "image/png");
  const map = worldMap();
  const pins = PINS.map(
    ([x, y], i) =>
      `<span class="pin" style="left:${(x / 99) * 100}%; top:${(y / 54) * 100}%; animation-delay:${i * 0.18}s"></span>`,
  ).join("");

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=block" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${W}px; height: ${H}px; }
  body {
    font-family: Inter, system-ui, sans-serif;
    background: #ffffff;
    color: #2b2a26;
    position: relative;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* The map, full-bleed, faded at the edges exactly as the hero does it. */
  .map {
    position: absolute;
    inset: -4% -2% auto -2%;
    height: 118%;
    opacity: 0.16;
    -webkit-mask-image: radial-gradient(ellipse 78% 70% at 62% 46%, #000 48%, transparent 100%);
    mask-image: radial-gradient(ellipse 78% 70% at 62% 46%, #000 48%, transparent 100%);
  }
  .map svg { width: 100%; height: 100%; display: block; }

  /* Brand-blue markers, so the map reads as "places" rather than texture. */
  /* Same geometry as .map, but full strength: the map is at 16% opacity and
     anything inside it inherits that, which made the markers invisible. */
  .pins { position: absolute; inset: -4% -2% auto -2%; height: 118%; }
  .pin {
    position: absolute;
    width: 13px; height: 13px;
    margin: -6.5px 0 0 -6.5px;
    border-radius: 999px;
    background: #2383e2;
    box-shadow: 0 0 0 5px rgba(35, 131, 226, 0.16), 0 0 22px 6px rgba(35, 131, 226, 0.34);
  }

  /* A warm wash from the corner so the white never reads as empty. */
  .wash {
    position: absolute; inset: 0;
    background:
      radial-gradient(900px 520px at 108% 112%, rgba(35, 131, 226, 0.13), transparent 62%),
      radial-gradient(620px 420px at -8% -14%, rgba(127, 178, 222, 0.16), transparent 60%);
  }

  /* Bottom padding is deliberately deep: X paints the page title in a bar
     across the foot of the card, which swallowed the previous version's last
     line. Everything that has to be read stays above that band. */
  .frame { position: absolute; inset: 0; padding: 58px 70px 106px; display: flex; flex-direction: column; justify-content: space-between; }

  /* align-self, because the frame is a flex column and would otherwise stretch
     the wordmark to the full width and squash its three lines together. */
  .logo { height: 92px; width: auto; align-self: flex-start; display: block; }

  h1 {
    font-size: 72px;
    line-height: 1.04;
    letter-spacing: -0.035em;
    font-weight: 800;
    max-width: 15.5ch;
  }
  h1 em { font-style: normal; position: relative; white-space: nowrap; }
  /* The brand's own hand-drawn underline gesture, in its red. */
  h1 em::after {
    content: "";
    position: absolute; left: -2px; right: -2px; bottom: -7px; height: 9px;
    background: #ef4444;
    border-radius: 999px;
    opacity: 0.92;
    transform: rotate(-0.5deg);
  }

  .sub { margin-top: 22px; font-size: 27px; line-height: 1.42; color: #605e59; font-weight: 450; max-width: 30ch; }

  .row { display: flex; align-items: center; gap: 12px; }
  .chip {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 11px 19px;
    border-radius: 999px;
    background: #ffffff;
    border: 1px solid #e0dfdb;
    box-shadow: 0 1px 2px rgba(43, 42, 38, 0.05);
    font-size: 21px; font-weight: 600; color: #37352f;
    white-space: nowrap;
  }
  .dot { width: 9px; height: 9px; border-radius: 999px; background: #2383e2; }
  .dot.green { background: #22c55e; }
  .dot.amber { background: #f59e0b; }
</style>
</head>
<body>
  <div class="map">${map}</div>
  <div class="pins">${pins}</div>
  <div class="wash"></div>

  <div class="frame">
    <img class="logo" src="${logo}" alt="">

    <div>
      <h1>Remote jobs you can do from <em>anywhere</em>.</h1>
      <p class="sub">Every role labelled by where you can actually work from.</p>
    </div>

    <div class="row">
      <span class="chip"><span class="dot"></span>Work-from-anywhere, verified</span>
      <span class="chip"><span class="dot green"></span>Straight from company career pages</span>
      <span class="chip"><span class="dot amber"></span>Updated nightly</span>
    </div>
  </div>
</body>
</html>`;
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await page.setContent(html(), { waitUntil: "networkidle" });
  // Web fonts must be in before the shot or the headline renders in a fallback.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  const shot = await page.screenshot({ type: "png" });
  await browser.close();

  // Chromium's PNG writer is fast rather than small. Recompressing losslessly
  // costs nothing at generation time and every crawler fetch is smaller.
  const png = await sharp(shot).png({ compressionLevel: 9, effort: 10 }).toBuffer();

  const out = join(PUBLIC, "og.png");
  writeFileSync(out, png);

  if (png.length < 20_000) throw new Error(`image is only ${png.length} bytes — did the fonts or map load?`);
  console.log(`[og] wrote public/og.png — ${W}x${H}, ${(png.length / 1024).toFixed(1)} KB`);
}

main();
