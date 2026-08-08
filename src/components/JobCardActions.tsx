"use client";

import { useEffect, useState } from "react";
import type { Job } from "@/lib/types";
import { isBookmarked, toggleBookmark, subscribeBookmarks } from "@/lib/bookmarks";
import { BookmarkIcon } from "./icons";
import { SharePopover } from "./SharePopover";

/** Bookmark + share (popover) buttons, safe to render inside the card's <Link>. */
export function JobCardActions({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isBookmarked(job.slug));
    return subscribeBookmarks(() => setSaved(isBookmarked(job.slug)));
  }, [job.slug]);

  function onBookmark(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setSaved(toggleBookmark(job));
  }

  const base =
    "flex h-8 w-8 items-center justify-center rounded-md border border-ink-100 bg-white text-ink-400 transition hover:border-ink-200 hover:text-ink-700";

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={onBookmark}
        aria-pressed={saved}
        aria-label={saved ? "Remove bookmark" : "Save job"}
        title={saved ? "Saved — click to remove" : "Save"}
        className={`${base} ${saved ? "!border-ink-300 !bg-ink-100 !text-ink-800" : ""}`}
      >
        <BookmarkIcon filled={saved} className="h-4 w-4" />
      </button>
      <SharePopover slug={job.slug} title={job.title} />
    </div>
  );
}
