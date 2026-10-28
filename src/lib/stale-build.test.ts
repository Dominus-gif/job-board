import { describe, expect, it } from "vitest";
import { claimStaleBuildReload, isStaleBuildError, RELOAD_KEY, RETRY_WINDOW_MS } from "./stale-build";

/**
 * The reload is only safe because of two narrow decisions: which errors count
 * as "this tab is from an older release", and the guard that stops a page that
 * is really broken from reloading forever. Both fail silently if they regress
 * (an error page where a reload would do, or a page that never settles).
 */

function chunkLoadError(message = "Loading chunk 7177 failed.\n(error: https://getremotejobsnow.com/_next/static/chunks/app/layout-1a2b3c.js)") {
  const err = new Error(message);
  err.name = "ChunkLoadError";
  return err;
}

function memory(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    data,
  };
}

describe("isStaleBuildError", () => {
  it("recognises webpack's chunk errors by name and by message", () => {
    expect(isStaleBuildError(chunkLoadError())).toBe(true);
    // The name can be lost when an error is re-wrapped; the message survives.
    expect(isStaleBuildError(new Error("Loading chunk 7177 failed.\n(error: /x.js)"))).toBe(true);
    expect(isStaleBuildError(new Error("Loading CSS chunk 4519 failed.\n(/_next/static/css/a.css)"))).toBe(true);
  });

  it("recognises every browser's wording for a failed dynamic import", () => {
    expect(isStaleBuildError(new TypeError("Failed to fetch dynamically imported module: https://x/_next/static/chunks/1.js"))).toBe(true);
    expect(isStaleBuildError(new TypeError("error loading dynamically imported module: https://x/a.js"))).toBe(true);
    expect(isStaleBuildError(new TypeError("Importing a module script failed."))).toBe(true);
  });

  it("recognises a Server Action the new release no longer has", () => {
    const err = new Error('Server Action "7f3a" was not found on the server.');
    err.name = "UnrecognizedActionError";
    expect(isStaleBuildError(err)).toBe(true);
  });

  it("leaves ordinary bugs and network failures to the error page", () => {
    expect(isStaleBuildError(new TypeError("Cannot read properties of undefined (reading 'map')"))).toBe(false);
    expect(isStaleBuildError(new TypeError("Failed to fetch"))).toBe(false);
    expect(isStaleBuildError(new Error("An error occurred in the Server Components render."))).toBe(false);
    expect(isStaleBuildError(null)).toBe(false);
    expect(isStaleBuildError("Loading chunk 1 failed")).toBe(false);
  });
});

describe("claimStaleBuildReload", () => {
  const href = "https://getremotejobsnow.com/jobs";
  const t0 = 1_800_000_000_000;

  it("allows the first reload and remembers it", () => {
    const store = memory();
    expect(claimStaleBuildReload(store, href, t0)).toBe(true);
    expect(JSON.parse(store.data.get(RELOAD_KEY)!)).toEqual({ href, at: t0 });
  });

  it("refuses a second reload of the same address inside the window, so a broken page can't loop", () => {
    const store = memory();
    expect(claimStaleBuildReload(store, href, t0)).toBe(true);
    expect(claimStaleBuildReload(store, href, t0 + 2_000)).toBe(false);
    expect(claimStaleBuildReload(store, href, t0 + RETRY_WINDOW_MS - 1)).toBe(false);
  });

  it("allows it again once the window has passed (a later release in the same tab)", () => {
    const store = memory();
    claimStaleBuildReload(store, href, t0);
    expect(claimStaleBuildReload(store, href, t0 + RETRY_WINDOW_MS)).toBe(true);
  });

  it("treats another address as a separate attempt", () => {
    const store = memory();
    claimStaleBuildReload(store, href, t0);
    expect(claimStaleBuildReload(store, "https://getremotejobsnow.com/posts", t0 + 1_000)).toBe(true);
  });

  it("declines without storage, and when storage throws, rather than risk a loop", () => {
    expect(claimStaleBuildReload(null, href, t0)).toBe(false);
    const throwing = {
      getItem: () => {
        throw new Error("SecurityError");
      },
      setItem: () => {},
    };
    expect(claimStaleBuildReload(throwing, href, t0)).toBe(false);
    const full = { getItem: () => null, setItem: () => { throw new Error("QuotaExceededError"); } };
    expect(claimStaleBuildReload(full, href, t0)).toBe(false);
  });

  it("ignores a corrupt or future-dated record instead of refusing forever", () => {
    expect(claimStaleBuildReload(memory({ [RELOAD_KEY]: "{not json" }), href, t0)).toBe(true);
    expect(claimStaleBuildReload(memory({ [RELOAD_KEY]: JSON.stringify({ href, at: t0 + 60_000 }) }), href, t0)).toBe(true);
  });
});
