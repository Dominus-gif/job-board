import type { Metadata } from "next";
import { BookmarksList } from "@/components/BookmarksList";

export const metadata: Metadata = {
  title: "Your Saved Remote Jobs (Bookmarks)",
  description: "Jobs you've bookmarked on getremotejobsnow.com — saved in your browser, no account needed.",
  // Personal, per-browser page — keep it out of the index.
  robots: { index: false, follow: true },
};

export default function BookmarksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="eyebrow">Saved</span>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900">Your bookmarks</h1>
      <p className="mt-2 max-w-2xl text-ink-500">
        Remote jobs you've saved. They live in this browser only — clearing your site data will remove them.
      </p>
      <div className="mt-8">
        <BookmarksList />
      </div>
    </div>
  );
}
