/**
 * Deletes page-cache entries left behind by earlier deploys.
 *
 * OpenNext writes every prerendered page to the NEXT_INC_CACHE_KV namespace
 * under `incremental-cache/<BUILD_ID>/`, and a new build only ever reads its
 * own prefix. Nothing removed the old prefixes, so each nightly rebuild added
 * another full copy: by 2026-09-22 the namespace held 85 builds (184k keys),
 * of which one was in use, and storage was billed past the free 1 GB.
 *
 * Keeps the build just deployed and the one it replaced (so a dashboard
 * rollback still finds a warm cache). Everything else under the prefix goes.
 *
 * Usage (CI, after a successful deploy):
 *   NEW_BUILD_ID=$(cat .next/BUILD_ID) PREV_BUILD_ID=<live id> node scripts/prune-kv-cache.mjs
 *
 * Never fails the deploy: problems are reported as warnings and the script
 * exits 0, because a leftover cache costs cents while a red deploy hides a
 * site that is actually fine.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const PREFIX = "incremental-cache/";
const CHUNK = 5000;

function warn(msg) {
  console.log(`::warning::prune-kv-cache: ${msg}`);
}

function wrangler(args) {
  return execFileSync("npx", ["wrangler", ...args], {
    encoding: "utf8",
    maxBuffer: 512 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32",
  });
}

function namespaceId() {
  const cfg = readFileSync("wrangler.jsonc", "utf8");
  const m = /"binding"\s*:\s*"NEXT_INC_CACHE_KV"\s*,\s*"id"\s*:\s*"([0-9a-f]{32})"/.exec(cfg);
  return m?.[1] ?? null;
}

function main() {
  const newId = (process.env.NEW_BUILD_ID || "").trim();
  const prevId = (process.env.PREV_BUILD_ID || "").trim();
  const ns = namespaceId();
  if (!newId) return warn("NEW_BUILD_ID is empty; nothing pruned.");
  if (!ns) return warn("NEXT_INC_CACHE_KV namespace id not found in wrangler.jsonc; nothing pruned.");

  let keys;
  try {
    keys = JSON.parse(wrangler(["kv", "key", "list", "--namespace-id", ns, "--remote", "--prefix", PREFIX]));
  } catch (err) {
    return warn(`could not list keys: ${err instanceof Error ? err.message.split("\n")[0] : err}`);
  }

  const keep = new Set([newId, prevId].filter(Boolean));
  const buildOf = (name) => name.slice(PREFIX.length).split("/")[0];
  const fresh = keys.filter((k) => buildOf(k.name) === newId).length;
  // If the new build wrote nothing, the deploy's cache population failed and
  // the previous build may still be what serves pages. Leave everything alone.
  if (fresh === 0) return warn(`no keys found for the new build ${newId}; nothing pruned.`);

  const stale = keys.filter((k) => !keep.has(buildOf(k.name))).map((k) => k.name);
  console.log(`KV page cache: ${keys.length} keys, keeping builds ${[...keep].join(", ")} (${keys.length - stale.length}), deleting ${stale.length}.`);
  if (stale.length === 0) return;

  const dir = mkdtempSync(join(tmpdir(), "kv-prune-"));
  let failed = 0;
  for (let i = 0; i < stale.length; i += CHUNK) {
    const file = join(dir, `chunk-${i / CHUNK}.json`);
    writeFileSync(file, JSON.stringify(stale.slice(i, i + CHUNK)));
    let ok = false;
    // The bulk endpoint occasionally times out (HTTP 524) on large batches;
    // deletes are idempotent, so retrying the same chunk is safe.
    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      try {
        wrangler(["kv", "bulk", "delete", file, "--namespace-id", ns, "--remote", "--force"]);
        ok = true;
      } catch {
        if (attempt < 3) execFileSync(process.execPath, ["-e", "setTimeout(()=>{},5000)"]);
      }
    }
    if (!ok) failed += Math.min(CHUNK, stale.length - i);
  }
  if (failed) warn(`${failed} stale keys could not be deleted; the next deploy will retry.`);
  else console.log(`Deleted ${stale.length} stale keys.`);
}

main();
