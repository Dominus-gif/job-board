/**
 * Keeps recent releases' JavaScript and CSS reachable after a deploy.
 *
 * Cloudflare serves each Worker version with only the static files uploaded
 * alongside it, and every build renames its hashed files under /_next/static.
 * A tab opened before a deploy keeps running the build it loaded, and the
 * moment it needs a file it had not fetched yet (the chunk for the next page,
 * a lazily imported component) that file 404s. On 2026-10-28 that surfaced as
 * `ChunkLoadError: Loading chunk 7177 failed` and the "Something went wrong"
 * page, for a visitor whose tab had simply stayed open across a deploy. The
 * site deploys on every push to main and nightly at 04:00 UTC, so every open
 * tab met this on its next navigation.
 *
 * So each release also serves the files of the releases it replaced within the
 * last KEEP_DAYS (scripts/lib/carry-static.ts). Before deploying, this:
 *  1. reads /_next/static/builds.json from the live site: which builds it
 *     serves and which files each one has;
 *  2. downloads from the live site the files of the builds still in the window
 *     that the new build lacks, into .open-next/assets/_next/static;
 *  3. writes a new builds.json, the new build first, for the next deploy.
 *
 * Hashed names mean an old file can never shadow a new one, Cloudflare stores
 * assets by content so a carried file is not uploaded twice, and most chunks
 * are byte-identical from one nightly build to the next, so a deploy usually
 * fetches only a handful of files.
 *
 * Old pages asking the new server for data are handled by Next itself (it
 * compares build ids and falls back to a full page load). What this covers is
 * the JavaScript an old page already had a reference to. Anything it still
 * misses is caught in the browser by src/lib/stale-build.ts, which reloads
 * the page once.
 *
 * Runs as the first half of `npm run cf:deploy`, so a manual deploy behaves
 * like CI. Run it after `cf:build`. Never fails the deploy: a file that could
 * not be carried costs a stale tab one reload, while a red deploy blocks the
 * nightly listings refresh.
 *
 * CARRY_FROM overrides the origin to read from (default: the production site).
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { carryStaticAssets, KEEP_DAYS, MANIFEST_NAME } from "./lib/carry-static";

const SITE = process.env.CARRY_FROM || "https://getremotejobsnow.com";
const BUILD_DIR = join(".next", "static");
const ASSETS_DIR = join(".open-next", "assets", "_next", "static");

function warn(msg: string) {
  console.log(`::warning::carry-static-assets: ${msg}`);
}

async function main() {
  const buildId = existsSync(join(".next", "BUILD_ID")) ? readFileSync(join(".next", "BUILD_ID"), "utf8").trim() : "";
  if (!buildId) return warn("no .next/BUILD_ID; run `npm run cf:build` first. Nothing carried.");
  // The OpenNext output must be this build, or the manifest would describe files the upload doesn't have.
  if (!existsSync(join(ASSETS_DIR, buildId))) {
    return warn(`${ASSETS_DIR} is not build ${buildId}; run \`npm run cf:build\` again. Nothing carried.`);
  }

  const result = await carryStaticAssets({
    buildDir: BUILD_DIR,
    assetsDir: ASSETS_DIR,
    buildId,
    site: SITE,
    now: Date.now(),
    fetch,
  });

  if (result.note) console.log(`[carry] ${result.note}`);
  const extra = result.manifest.builds.slice(1).reduce((n, b) => n + b.files.length, 0);
  console.log(
    `[carry] build ${buildId}: keeping ${result.carriedBuilds.length} earlier build(s) from the last ${KEEP_DAYS} days` +
      (result.carriedBuilds.length ? ` (${result.carriedBuilds.join(", ")})` : "") +
      `; fetched ${result.fetched} file(s), ${result.alreadyPresent} already present, ${extra} listed in ${MANIFEST_NAME}.`,
  );
  if (result.failed.length) {
    warn(`${result.failed.length} file(s) could not be fetched from ${SITE} and are not carried: ${result.failed.slice(0, 10).join(", ")}`);
  }
}

main().catch((err) => warn(`failed, deploying without carried files: ${err instanceof Error ? err.message : String(err)}`));
