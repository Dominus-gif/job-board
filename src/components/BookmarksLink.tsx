"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getBookmarks, subscribeBookmarks } from "@/lib/bookmarks";
import { BookmarkIcon } from "./icons";

/** Nav link to saved jobs, with a live count from localStorage. */
export function BookmarksLink({ className }: { className?: string }) {
  const [count, setCount] = useState(0);
  const path = usePathname();
  const active = path.startsWith("/bookmarks");

  useEffect(() => {
    const update = () => setCount(getBookmarks().length);
    update();
    return subscribeBookmarks(update);
  }, []);

  return (
    <Link
      href="/bookmarks"
      aria-current={active ? "page" : undefined}
      className={`inline-flex items-center gap-1.5 leading-none transition ${
        className ?? (active ? "font-semibold text-ink-900" : "text-ink-600 hover:text-ink-900")
      }`}
      aria-label={`Bookmarks${count ? ` (${count})` : ""}`}
    >
      <BookmarkIcon className="h-4 w-4" />
      Bookmarks
      {count > 0 && (
        <span className="inline-flex min-w-[1.15rem] items-center justify-center rounded-full bg-ink-100 px-1.5 text-[11px] font-semibold text-ink-600">
          {count}
        </span>
      )}
    </Link>
  );
}
