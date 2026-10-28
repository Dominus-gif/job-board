/**
 * The logic behind scripts/carry-static-assets.ts: which earlier builds' files
 * a new release keeps serving, and how they are fetched into it.
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

/** A tab opened just before a release can still be running it this long after it was replaced. */
export const KEEP_DAYS = 7;
/** Upper bound whatever the dates say, so a burst of deploys can't grow a release without limit. */
export const MAX_BUILDS = 30;
/** Where the list of carried builds is published, relative to /_next/static. */
export const MANIFEST_NAME = "builds.json";

const DAY_MS = 86_400_000;

export interface BuildRecord {
  id: string;
  /** When this build went live (ISO 8601). */
  deployedAt: string;
  /** Paths relative to /_next/static, with forward slashes. */
  files: string[];
}

export interface Manifest {
  version: 1;
  builds: BuildRecord[];
}

/**
 * A path from the manifest is only used if it stays inside /_next/static: no
 * empty, "." or ".." segments, no backslashes, nothing absolute. The manifest
 * comes from our own site, but it decides where files are written.
 */
export function isSafeAssetPath(p: unknown): p is string {
  if (typeof p !== "string" || p.length === 0 || p.length > 512) return false;
  if (p.includes("\\") || p.includes("\0") || p.startsWith("/")) return false;
  return p.split("/").every((seg) => seg !== "" && seg !== "." && seg !== "..");
}

/** Reads a published manifest, dropping anything malformed rather than failing on it. */
export function parseManifest(raw: unknown): BuildRecord[] {
  const builds = (raw as { builds?: unknown } | null)?.builds;
  if (!Array.isArray(builds)) return [];
  const out: BuildRecord[] = [];
  for (const b of builds) {
    const { id, deployedAt, files } = (b ?? {}) as Record<string, unknown>;
    if (typeof id !== "string" || !/^[\w-]{1,64}$/.test(id)) continue;
    if (typeof deployedAt !== "string" || Number.isNaN(Date.parse(deployedAt))) continue;
    if (!Array.isArray(files)) continue;
    out.push({ id, deployedAt, files: files.filter(isSafeAssetPath) });
  }
  return out;
}

/**
 * The earlier builds the new release should keep serving, newest first.
 *
 * A build stays while the release that replaced it is younger than KEEP_DAYS,
 * because that is how long a tab opened just before the replacement may still
 * be running it. The build that is live right now is being replaced by this
 * deploy, so it always qualifies. A redeploy of the same build keeps its
 * original record and is not counted as a predecessor of itself.
 */
export function buildsToCarry(live: BuildRecord[], newId: string, now: number): BuildRecord[] {
  const sorted = [...live].sort((a, b) => Date.parse(b.deployedAt) - Date.parse(a.deployedAt));
  const kept: BuildRecord[] = [];
  const seen = new Set<string>([newId]);
  let replacedAt = now;
  for (const b of sorted) {
    if (b.id === newId) {
      replacedAt = Date.parse(b.deployedAt);
      continue;
    }
    if (seen.has(b.id)) continue;
    if (now - replacedAt > KEEP_DAYS * DAY_MS || kept.length >= MAX_BUILDS) break;
    seen.add(b.id);
    kept.push(b);
    replacedAt = Date.parse(b.deployedAt);
  }
  return kept;
}

/** Every file under `dir`, as forward-slash paths relative to it. */
export function listFiles(dir: string): string[] {
  const out: string[] = [];
  const walk = (d: string) => {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const full = join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile()) out.push(relative(dir, full).split(sep).join("/"));
    }
  };
  walk(dir);
  return out.sort();
}

/** The URL of a file under /_next/static. Route folders like [landing] and (group) must be escaped. */
export function assetUrl(site: string, file: string): string {
  return `${site.replace(/\/$/, "")}/_next/static/${file.split("/").map(encodeURIComponent).join("/")}`;
}

export interface CarryOptions {
  /** The build's own output, e.g. .next/static. Never modified. */
  buildDir: string;
  /** What gets uploaded, e.g. .open-next/assets/_next/static. Carried files are written here. */
  assetsDir: string;
  buildId: string;
  /** Origin the previous releases are served from. */
  site: string;
  now: number;
  fetch: typeof fetch;
  concurrency?: number;
}

export interface CarryResult {
  manifest: Manifest;
  carriedBuilds: string[];
  fetched: number;
  alreadyPresent: number;
  failed: string[];
  note?: string;
}

async function getJson(fetcher: typeof fetch, url: string): Promise<unknown | null> {
  const res = await fetcher(url, { headers: { accept: "application/json" }, signal: AbortSignal.timeout(15_000) });
  if (!res.ok) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function download(fetcher: typeof fetch, url: string, dest: string): Promise<boolean> {
  const res = await fetcher(url, { signal: AbortSignal.timeout(30_000) });
  // A missing file comes back as the site's 404 page; never store that as a chunk.
  if (!res.ok || (res.headers.get("content-type") || "").includes("text/html")) return false;
  const body = Buffer.from(await res.arrayBuffer());
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, body);
  return true;
}

/**
 * Copies the files of recent builds, as served by the live site, into the new
 * release's assets, and writes the manifest the next deploy will read.
 */
export async function carryStaticAssets(opts: CarryOptions): Promise<CarryResult> {
  const own = listFiles(opts.buildDir);
  const ownSet = new Set(own);
  const assetsRoot = resolve(opts.assetsDir);
  const newRecord: BuildRecord = { id: opts.buildId, deployedAt: new Date(opts.now).toISOString(), files: own };

  const live = parseManifest(await getJson(opts.fetch, `${assetUrl(opts.site, MANIFEST_NAME)}?t=${opts.now}`).catch(() => null));
  const sameBuild = live.find((b) => b.id === opts.buildId);
  if (sameBuild) newRecord.deployedAt = sameBuild.deployedAt;
  const carried = buildsToCarry(live, opts.buildId, opts.now);

  const wanted = new Set<string>();
  for (const b of carried) for (const f of b.files) if (!ownSet.has(f)) wanted.add(f);

  const available = new Set(own);
  const failed: string[] = [];
  let fetched = 0;
  let alreadyPresent = 0;
  const queue = [...wanted].sort();
  const worker = async () => {
    for (let f = queue.shift(); f !== undefined; f = queue.shift()) {
      const dest = resolve(assetsRoot, ...f.split("/"));
      if (!dest.startsWith(assetsRoot + sep)) continue;
      if (existsSync(dest)) {
        alreadyPresent++;
        available.add(f);
        continue;
      }
      const ok = await download(opts.fetch, assetUrl(opts.site, f), dest).catch(() => false);
      if (ok) {
        fetched++;
        available.add(f);
      } else failed.push(f);
    }
  };
  await Promise.all(Array.from({ length: opts.concurrency ?? 8 }, worker));

  const manifest: Manifest = {
    version: 1,
    builds: [newRecord, ...carried.map((b) => ({ ...b, files: b.files.filter((f) => available.has(f)) }))],
  };
  writeFileSync(join(assetsRoot, MANIFEST_NAME), JSON.stringify(manifest));

  return {
    manifest,
    carriedBuilds: carried.map((b) => b.id),
    fetched,
    alreadyPresent,
    failed: failed.sort(),
    note: live.length === 0 ? `no ${MANIFEST_NAME} on ${opts.site}; nothing to carry this time` : undefined,
  };
}
