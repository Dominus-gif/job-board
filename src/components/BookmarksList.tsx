"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Job } from "@/lib/types";
import { getBookmarks, subscribeBookmarks } from "@/lib/bookmarks";
import { JobCard } from "./JobCard";
import { BookmarkIcon } from "./icons";

/** Renders the browser's saved jobs (localStorage), live-updating, and flags
 * any that have since been removed/stopped as inactive. */
export function BookmarksList() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [inactiveSlugs, setInactiveSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    const update = () => setJobs(getBookmarks());
    update();
    return subscribeBookmarks(update);
  }, []);

  // Check each saved job's liveness; mark removed/stopped ones inactive.
  useEffect(() => {
    if (!jobs || jobs.length === 0) return;
    let cancelled = false;
    (async () => {
      const results = await Promise.all(
        jobs.map(async (j) => {
          try {
            const r = await fetch(`/api/job-status?slug=${encodeURIComponent(j.slug)}`, { cache: "no-store" });
            const d = await r.json();
            return [j.slug, d.active === false] as const;
          } catch {
            return [j.slug, false] as const; // on error, assume still active
          }
        })
      );
      if (!cancelled) setInactiveSlugs(new Set(results.filter(([, inactive]) => inactive).map(([s]) => s)));
    })();
    return () => {
      cancelled = true;
    };
  }, [jobs]);

  // First client paint (before effect) — avoid a flash of the empty state.
  if (jobs === null) {
    return <div className="h-40 rounded-xl border border-dashed border-ink-200" aria-hidden />;
  }

  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-ink-200 bg-white p-12 text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-ink-50 text-ink-400">
          <BookmarkIcon className="h-5 w-5" />
        </span>
        <p className="mt-4 font-display text-lg font-semibold text-ink-900">No saved jobs yet</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-ink-500">
          Tap the bookmark icon on any listing to save it here. Bookmarks are stored in this browser — no account needed.
        </p>
        <Link href="/page/1" className="btn-primary mt-5">Browse all remote jobs</Link>
      </div>
    );
  }

  const inactiveCount = jobs.filter((j) => inactiveSlugs.has(j.slug)).length;

  return (
    <div>
      <p className="mb-4 text-sm text-ink-500">
        {jobs.length} saved {jobs.length === 1 ? "job" : "jobs"} · stored in this browser
        {inactiveCount > 0 ? ` · ${inactiveCount} no longer accepting applications` : ""}
      </p>
      <div className="space-y-3">
        {jobs.map((job) => (
          <JobCard key={job.slug} job={job} inactive={inactiveSlugs.has(job.slug)} />
        ))}
      </div>
    </div>
  );
}
