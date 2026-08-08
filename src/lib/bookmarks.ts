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
