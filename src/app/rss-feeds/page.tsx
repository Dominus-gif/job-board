import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, categoryToSlug } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "RSS Feeds",
  description: "RSS feeds of work-from-anywhere remote jobs: one feed for the whole board plus one per category, refreshed daily.",
  alternates: { canonical: "/rss-feeds" },
  // A list of feed URLs: useful to link, too slight to offer as a search result.
  robots: { index: false, follow: true },
};

export default function RssFeedsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-ink-900">RSS Feeds</h1>
      <p className="mt-3 text-ink-700">
        Each feed refreshes when the board is rebuilt every night, and includes the role, company, logo, location and
        apply link. Add any of them to your feed reader or automation.
      </p>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white">
        <FeedRow label="All jobs" href="/rss.xml" />
        {CATEGORIES.map((c) => (
          <FeedRow key={c} label={`${c} jobs`} href={`/remote-${categoryToSlug(c)}-jobs/rss.xml`} />
        ))}
      </div>
    </div>
  );
}

function FeedRow({ label, href }: { label: string; href: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 last:border-0">
      <span className="font-medium text-ink-900">{label}</span>
      <Link href={href} className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-brand-700 hover:bg-slate-200">
        {href}
      </Link>
    </div>
  );
}
