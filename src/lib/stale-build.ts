import { useEffect, useState } from "react";

/**
 * Recovery for tabs that outlive a release.
 *
 * Every deploy replaces the hashed files under /_next/static, and the site
 * deploys on each push to main and nightly at 04:00 UTC. A tab opened before a
 * deploy keeps running the old build's JavaScript, so when it later needs a
 * file that build had not loaded yet (the chunk for the next page, a lazily
 * imported component) the request can 404. The error boundary then showed
 * "Something went wrong" for what is only an out-of-date tab, which a full
 * load of the same address fixes. So the boundaries do that load themselves,
 * once, instead of showing the error.
 *
 * Both boundaries render inside Next's router, below the component that writes
 * the address bar, so by the time they mount the URL is already the page the
 * visitor was going to. A reload lands them there, not back where they were.
 *
 * Deploys also carry the previous builds' files forward (see
 * scripts/carry-static-assets.ts), so this is the fallback for whatever that
 * misses, not the main defence.
 */

/** What browsers and webpack say when a script or stylesheet of the page's own build can't be fetched. */
const STALE_BUILD_MESSAGE =
  /Loading (?:CSS )?chunk \S+ failed|Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed/i;

/**
 * True for errors a fresh copy of the page fixes: a missing chunk, a failed
 * dynamic import, or a Server Action the new release no longer has.
 */
export function isStaleBuildError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const { name, message } = error as { name?: unknown; message?: unknown };
  if (name === "ChunkLoadError" || name === "UnrecognizedActionError") return true;
  return typeof message === "string" && STALE_BUILD_MESSAGE.test(message);
}

export const RELOAD_KEY = "grjn:stale-build-reload";

/**
 * A second failure on the same address within this window means the reload
 * did not help, so the error page is shown instead of reloading again. Long
 * enough to cover a slow reload, short enough that a later release in the
 * same tab still gets its own recovery.
 */
export const RETRY_WINDOW_MS = 5 * 60_000;

type ReloadMemory = Pick<Storage, "getItem" | "setItem">;

function lastReload(raw: string | null): { href: string; at: number } | null {
  try {
    const v = JSON.parse(raw ?? "null") as { href?: unknown; at?: unknown } | null;
    return v && typeof v.href === "string" && typeof v.at === "number" ? { href: v.href, at: v.at } : null;
  } catch {
    return null;
  }
}

/**
 * Records a reload of `href` and returns true, unless that address was already
 * reloaded for this reason within RETRY_WINDOW_MS. Without working storage
 * there is no way to stop a loop, so it declines.
 */
export function claimStaleBuildReload(storage: ReloadMemory | null, href: string, now: number): boolean {
  if (!storage) return false;
  try {
    const last = lastReload(storage.getItem(RELOAD_KEY));
    if (last && last.href === href && now - last.at >= 0 && now - last.at < RETRY_WINDOW_MS) return false;
    storage.setItem(RELOAD_KEY, JSON.stringify({ href, at: now }));
    return true;
  } catch {
    return false;
  }
}

let reloadStarted = false;

/** Starts a full reload when `error` comes from a replaced release and one is allowed. True while it is under way. */
export function reloadIfStaleBuild(error: unknown): boolean {
  if (reloadStarted) return true;
  if (typeof window === "undefined" || !isStaleBuildError(error)) return false;
  let storage: Storage | null = null;
  try {
    storage = window.sessionStorage;
  } catch {
    /* blocked storage: no loop guard, so no automatic reload */
  }
  if (!claimStaleBuildReload(storage, window.location.href, Date.now())) return false;
  reloadStarted = true;
  console.warn("[stale build] reloading", JSON.stringify({ message: error instanceof Error ? error.message : String(error) }));
  window.location.reload();
  return true;
}

/**
 * For error boundaries: true while the page is reloading because of `error`,
 * so the boundary can render nothing instead of flashing the error page.
 * Turns false (and the boundary shows its page) when no reload is allowed.
 */
export function useStaleBuildReload(error: unknown): boolean {
  const [settled, setSettled] = useState<unknown>(null);
  useEffect(() => {
    if (!reloadIfStaleBuild(error)) setSettled(error);
  }, [error]);
  return isStaleBuildError(error) && settled !== error;
}
