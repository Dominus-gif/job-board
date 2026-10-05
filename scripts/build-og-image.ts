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
 * Second and more important, rendering text to a bitmap depends on the fonts
 * installed on whatever machine does the rendering. A build box with a different
 * font set would silently ship a card with the wrong typeface, or no text at
 * all, and nobody would notice until someone shared a link. Generating it once,
 * looking at it, and committing the bytes removes that whole class of failure.
 *
 * It replaces an /api/og route that rendered the same picture on demand. That
 * route cost about 700ms of worker time on every single crawler fetch and never
 * entered Cloudflare's CDN cache, because a Worker response does not. It also
 * lived under /api/, which is disallowed in robots.txt — which is exactly how
 * link previews broke in the first place. A file in public/ is served by the
 * asset layer in milliseconds and cannot be caught by that rule again.
 */
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const W = 1200;
const H = 630;
const PAD = 72;

/** Escape text for inclusion in SVG. */
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * The card, as SVG.
 *
 * Lines are placed by hand rather than wrapped, because SVG has no text
 * wrapping and guessing at line breaks from a width is how you end up with a
 * word alone on the last line.
 */
function svg(): string {
  const titleLines = ["Remote jobs you can do from", "anywhere in the world."];
  const sub = "Verified work-from-anywhere and region-based roles — with salary, skills and benefits.";

  const titleTop = 300;
  const titleLeading = 78;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#191919"/>
      <stop offset="55%" stop-color="#202020"/>
      <stop offset="100%" stop-color="#15497f"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- wordmark row -->
  <rect x="${PAD}" y="${PAD}" width="64" height="64" rx="16" fill="#2383e2"/>
  <text x="${PAD + 32}" y="${PAD + 45}" font-family="DejaVu Sans, Helvetica, Arial, sans-serif" font-size="36"
        font-weight="700" fill="#ffffff" text-anchor="middle">G</text>
  <text x="${PAD + 84}" y="${PAD + 44}" font-family="DejaVu Sans, Helvetica, Arial, sans-serif" font-size="34"
        font-weight="700" fill="#ffffff">getremotejobsnow.com</text>

  <!-- headline -->
${titleLines
  .map(
    (line, i) =>
      `  <text x="${PAD}" y="${titleTop + i * titleLeading}" font-family="DejaVu Sans, Helvetica, Arial, sans-serif" ` +
      `font-size="64" font-weight="700" fill="#ffffff">${esc(line)}</text>`,
  )
  .join("\n")}

  <!-- subtitle -->
  <text x="${PAD}" y="${titleTop + titleLines.length * titleLeading + 26}"
        font-family="DejaVu Sans, Helvetica, Arial, sans-serif" font-size="27" fill="#b9c4d1">${esc(sub)}</text>

  <!-- footer line -->
  <circle cx="${PAD + 8}" cy="${H - PAD - 8}" r="8" fill="#7fb2de"/>
  <text x="${PAD + 30}" y="${H - PAD}" font-family="DejaVu Sans, Helvetica, Arial, sans-serif" font-size="24"
        fill="#9aa6b2">No country, region or timezone strings attached</text>
</svg>`;
}

async function main() {
  const out = join(process.cwd(), "public", "og.png");
  const png = await sharp(Buffer.from(svg())).png({ compressionLevel: 9 }).toBuffer();
  await writeFile(out, png);

  const meta = await sharp(png).metadata();
  console.log(`[og] wrote public/og.png — ${meta.width}x${meta.height}, ${(png.length / 1024).toFixed(1)} KB`);
  if (meta.width !== W || meta.height !== H) throw new Error(`expected ${W}x${H}, got ${meta.width}x${meta.height}`);
  if (png.length < 5_000) throw new Error("image is suspiciously small — did the text render?");
  if (!existsSync(out)) throw new Error("file was not written");
}

main();
