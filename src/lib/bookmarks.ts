"use client";

/**
 * Client-side bookmarks — no login, no DB. Saved jobs live in localStorage so
 * they persist per-browser. We store the whole (lean) Job record for each
 * bookmark so the /bookmarks page can render full cards offline, without a
 * server lookup by slug.
 *
 * Components subscribe via `subscribeBookmarks` (a window event) so the nav
 * count and every bookmark button stay in sync across the page and tabs.
 */
import type { Job } from "./types";

const KEY = "anywherejobs:bookmarks:v1";
const EVENT = "anywherejobs:bookmarks-changed";

function read(): Job[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Job[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(jobs: Job[]): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(jobs));
    window.dispatchEvent(new CustomEvent(EVENT));
  } catch {
    /* quota or disabled storage — ignore */
  }
}

export function getBookmarks(): Job[] {
  return read();
}

export function isBookmarked(slug: string): boolean {
  return read().some((j) => j.slug === slug);
}

/** Toggle a job's bookmark; returns the new state (true = now saved). */
export function toggleBookmark(job: Job): boolean {
  const list = read();
  const idx = list.findIndex((j) => j.slug === job.slug);
  if (idx >= 0) {
    list.splice(idx, 1);
    write(list);
    return false;
  }
  // Trim the heavy description before saving to keep localStorage small.
  const lean: Job = { ...job, description_html: "" };
  write([lean, ...list]);
  return true;
}

export function removeBookmark(slug: string): void {
  write(read().filter((j) => j.slug !== slug));
}

/** Subscribe to changes (same-tab custom event + cross-tab storage event). */
export function subscribeBookmarks(cb: () => void): () => void {
  const onEvent = () => cb();
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener(EVENT, onEvent);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onEvent);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * Merge bookmarks pulled from another device. Existing entries win on slug, so
 * restoring is additive and never silently drops what's already on this device.
 * Returns how many new jobs were added.
 */
export function mergeBookmarks(incoming: Job[]): number {
  if (!Array.isArray(incoming)) return 0;
  const list = read();
  const seen = new Set(list.map((j) => j.slug));
  const added = incoming.filter((j) => j && typeof j.slug === "string" && !seen.has(j.slug));
  if (added.length) write([...list, ...added]);
  return added.length;
}

const CODE_KEY = "anywherejobs:sync-code:v1";

/** The sync code this browser pushes to. Created on first use, then reused. */
export function getSyncCode(): string {
  try {
    const existing = window.localStorage.getItem(CODE_KEY);
    if (existing && /^[A-Z0-9]{8,12}$/.test(existing)) return existing;
  } catch {
    /* ignore */
  }
  // Ambiguous characters (0/O, 1/I) omitted — this gets typed by hand.
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint32Array(10);
  crypto.getRandomValues(bytes);
  const code = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  try {
    window.localStorage.setItem(CODE_KEY, code);
  } catch {
    /* ignore */
  }
  return code;
}

/** Adopt a code pulled from another device so future pushes share one bucket. */
export function setSyncCode(code: string): void {
  try {
    window.localStorage.setItem(CODE_KEY, code.trim().toUpperCase());
  } catch {
    /* ignore */
  }
}
