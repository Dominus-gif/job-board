import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  buildsToCarry,
  carryStaticAssets,
  isSafeAssetPath,
  KEEP_DAYS,
  MANIFEST_NAME,
  MAX_BUILDS,
  parseManifest,
  type BuildRecord,
} from "./carry-static";

/**
 * Deploys lean on this to keep old tabs working, and it fails quietly: a
 * retention bug either drops the files a stale tab needs (it falls back to a
 * reload, nobody notices) or keeps everything forever (each release grows). The
 * manifest it reads is also what decides where files get written.
 */

const DAY = 86_400_000;
const NOW = Date.parse("2026-10-29T04:00:00Z");
const at = (daysAgo: number) => new Date(NOW - daysAgo * DAY).toISOString();
const rec = (id: string, daysAgo: number, files: string[] = []): BuildRecord => ({ id, deployedAt: at(daysAgo), files });

describe("isSafeAssetPath", () => {
  it("accepts Next's real file names, route folders included", () => {
    expect(isSafeAssetPath("chunks/app/[landing]/page-773880e865d9c162.js")).toBe(true);
    expect(isSafeAssetPath("chunks/app/(marketing)/about/page-1.js")).toBe(true);
    expect(isSafeAssetPath("css/a1b2.css")).toBe(true);
    expect(isSafeAssetPath("bVv0RYqhrxObZYsjWk6kZ/_buildManifest.js")).toBe(true);
  });

  it("rejects anything that could write outside /_next/static", () => {
    for (const p of ["../wrangler.jsonc", "chunks/../../x.js", "/etc/passwd", "chunks\\x.js", "", "a//b.js", "./a.js", 42, null]) {
      expect(isSafeAssetPath(p), String(p)).toBe(false);
    }
  });
});

describe("parseManifest", () => {
  it("keeps well-formed builds and drops the rest without throwing", () => {
    const parsed = parseManifest({
      version: 1,
      builds: [
        rec("good-1", 1, ["chunks/a.js", "../escape.js"]),
        { id: "bad id!", deployedAt: at(1), files: [] },
        { id: "no-date", deployedAt: "yesterday", files: [] },
        { id: "no-files", deployedAt: at(2) },
        null,
      ],
    });
    expect(parsed).toEqual([rec("good-1", 1, ["chunks/a.js"])]);
    expect(parseManifest(null)).toEqual([]);
    expect(parseManifest({ builds: "nope" })).toEqual([]);
  });
});

describe("buildsToCarry", () => {
  it("always keeps the build this deploy replaces, however old it is", () => {
    expect(buildsToCarry([rec("live", 30)], "new", NOW).map((b) => b.id)).toEqual(["live"]);
  });

  it(`keeps older builds while the release that replaced them is under ${KEEP_DAYS} days old`, () => {
    const live = [rec("b5", 1), rec("b4", 3), rec("b3", 6), rec("b2", 8), rec("b1", 12)];
    // b2 was replaced by b3 six days ago: kept. b1 was replaced by b2 eight days ago: gone.
    expect(buildsToCarry(live, "new", NOW).map((b) => b.id)).toEqual(["b5", "b4", "b3", "b2"]);
  });

  it("orders by deploy time, not by position in the file", () => {
    const live = [rec("b1", 12), rec("b3", 6), rec("b2", 8)];
    expect(buildsToCarry(live, "new", NOW).map((b) => b.id)).toEqual(["b3", "b2"]);
  });

  it("does not count a redeploy of the same build as its own predecessor", () => {
    const live = [rec("same", 2), rec("prev", 9), rec("older", 20)];
    // prev was replaced by `same` two days ago: kept. older was replaced nine days ago: gone.
    expect(buildsToCarry(live, "same", NOW).map((b) => b.id)).toEqual(["prev"]);
  });

  it(`stops at ${MAX_BUILDS} builds whatever the dates`, () => {
    const live = Array.from({ length: MAX_BUILDS + 10 }, (_, i) => rec(`b${i}`, i * 0.01));
    expect(buildsToCarry(live, "new", NOW)).toHaveLength(MAX_BUILDS);
  });
});

describe("carryStaticAssets", () => {
  const dirs: string[] = [];
  afterEach(() => {
    for (const d of dirs.splice(0)) rmSync(d, { recursive: true, force: true });
  });

  function setup(newFiles: string[]) {
    const root = mkdtempSync(join(tmpdir(), "carry-"));
    dirs.push(root);
    const buildDir = join(root, "build");
    const assetsDir = join(root, "assets");
    for (const f of newFiles) {
      for (const base of [buildDir, assetsDir]) {
        mkdirSync(dirname(join(base, f)), { recursive: true });
        writeFileSync(join(base, f), `new:${f}`);
      }
    }
    return { buildDir, assetsDir };
  }

  /** A stand-in for the live site: a manifest plus the files it serves; anything else is the 404 page. */
  function site(manifest: unknown, files: Record<string, string>) {
    const requested: string[] = [];
    const fetcher = (async (input: string | URL | Request) => {
      const url = new URL(String(input));
      requested.push(url.pathname);
      if (url.pathname === `/_next/static/${MANIFEST_NAME}`) {
        return manifest ? Response.json(manifest) : new Response("<html>404</html>", { status: 404, headers: { "content-type": "text/html" } });
      }
      const file = decodeURIComponent(url.pathname.replace("/_next/static/", ""));
      if (file in files) return new Response(files[file], { status: 200, headers: { "content-type": "text/javascript" } });
      return new Response("<html>404</html>", { status: 404, headers: { "content-type": "text/html" } });
    }) as typeof fetch;
    return { fetcher, requested };
  }

  const opts = (dirs: { buildDir: string; assetsDir: string }, fetcher: typeof fetch) => ({
    ...dirs,
    buildId: "NEW",
    site: "https://getremotejobsnow.com",
    now: NOW,
    fetch: fetcher,
    concurrency: 2,
  });

  it("starts the history when the live site has none yet", async () => {
    const d = setup(["NEW/_buildManifest.js", "chunks/shared-1.js"]);
    const { fetcher } = site(null, {});
    const result = await carryStaticAssets(opts(d, fetcher));
    expect(result.fetched).toBe(0);
    expect(result.note).toMatch(/nothing to carry/);
    const written = JSON.parse(readFileSync(join(d.assetsDir, MANIFEST_NAME), "utf8"));
    expect(written.builds).toEqual([{ id: "NEW", deployedAt: new Date(NOW).toISOString(), files: ["NEW/_buildManifest.js", "chunks/shared-1.js"] }]);
  });

  it("fetches only what the new build lacks, and records it for the next deploy", async () => {
    const d = setup(["NEW/_buildManifest.js", "chunks/shared-1.js"]);
    const old = rec("OLD", 1, ["OLD/_buildManifest.js", "chunks/shared-1.js", "chunks/app/[landing]/page-old.js", "chunks/gone.js"]);
    const { fetcher, requested } = site(
      { version: 1, builds: [old] },
      { "OLD/_buildManifest.js": "old manifest", "chunks/app/[landing]/page-old.js": "old landing", "chunks/shared-1.js": "never fetched" },
    );

    const result = await carryStaticAssets(opts(d, fetcher));

    expect(result.carriedBuilds).toEqual(["OLD"]);
    expect(result.fetched).toBe(2);
    expect(result.failed).toEqual(["chunks/gone.js"]);
    // The shared chunk is the new build's own copy, never re-downloaded.
    expect(requested).not.toContain("/_next/static/chunks/shared-1.js");
    expect(readFileSync(join(d.assetsDir, "chunks/shared-1.js"), "utf8")).toBe("new:chunks/shared-1.js");
    // Route folders are escaped in the URL and written back under their real name.
    expect(requested).toContain("/_next/static/chunks/app/%5Blanding%5D/page-old.js");
    expect(readFileSync(join(d.assetsDir, "chunks/app/[landing]/page-old.js"), "utf8")).toBe("old landing");
    // A 404 page is never stored as if it were the chunk.
    expect(existsSync(join(d.assetsDir, "chunks/gone.js"))).toBe(false);
    // The build directory itself is left alone.
    expect(existsSync(join(d.buildDir, "chunks/app/[landing]/page-old.js"))).toBe(false);

    const written = JSON.parse(readFileSync(join(d.assetsDir, MANIFEST_NAME), "utf8"));
    expect(written.builds.map((b: BuildRecord) => b.id)).toEqual(["NEW", "OLD"]);
    expect(written.builds[1].files).toEqual(["OLD/_buildManifest.js", "chunks/shared-1.js", "chunks/app/[landing]/page-old.js"]);
  });

  it("can be run twice on the same output without fetching again", async () => {
    const d = setup(["NEW/_buildManifest.js"]);
    const live = { version: 1, builds: [rec("OLD", 1, ["chunks/old.js"])] };
    await carryStaticAssets(opts(d, site(live, { "chunks/old.js": "x" }).fetcher));
    const again = site(live, { "chunks/old.js": "x" });
    const second = await carryStaticAssets(opts(d, again.fetcher));
    expect(second.fetched).toBe(0);
    expect(second.alreadyPresent).toBe(1);
    expect(again.requested).toEqual([`/_next/static/${MANIFEST_NAME}`]);
  });

  it("keeps a redeployed build's original date so its predecessors age out on time", async () => {
    const d = setup(["NEW/_buildManifest.js"]);
    const live = { version: 1, builds: [rec("NEW", 2, ["NEW/_buildManifest.js"]), rec("OLD", 5, [])] };
    const result = await carryStaticAssets(opts(d, site(live, {}).fetcher));
    expect(result.manifest.builds[0].deployedAt).toBe(at(2));
    expect(result.carriedBuilds).toEqual(["OLD"]);
  });
});
