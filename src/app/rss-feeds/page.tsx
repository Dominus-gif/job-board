import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, categoryToSlug } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "RSS Feeds",
  description: "Real-time RSS feeds of truly location-independent jobs — all jobs plus one feed per category.",
  alternates: { canonical: "/rss-feeds" },
};

export default function RssFeedsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-ink-900">RSS Feeds</h1>
      <p className="mt-3 text-ink-700">
        Every feed updates in real time and includes the full job description, company, logo, location, and apply link.
        Drop any of these into your reader or automation.
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
