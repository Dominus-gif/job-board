import type { Metadata } from "next";
import Link from "next/link";
import { getTool } from "@/lib/tools";
import { abs } from "@/lib/site";
import { WorldTimeBuddy } from "@/components/tools/WorldTimeBuddy";

const tool = getTool("world-time-buddy")!;

export const metadata: Metadata = {
  title: "World Clock & Meeting Planner — Compare Time Zones",
  description: tool.description,
  keywords: tool.keywords,
  alternates: { canonical: "/tools/world-time-buddy" },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: abs("/tools/world-time-buddy"),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: tool.description,
  };
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-ink-400">
        <Link href="/tools" className="hover:text-ink-900">Tools</Link>
        <span aria-hidden>/</span>
        <span className="text-ink-500">World clock</span>
      </nav>
      <span className="eyebrow">Tool</span>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900">World Clock &amp; Meeting Planner</h1>
      <p className="mt-2 max-w-2xl text-ink-500">
        Compare times across cities and timezones at a glance. Add any city, click an hour to line up a meeting, and see
        everyone&apos;s local time instantly — ideal for planning remote work across the US, Europe and beyond.
      </p>
      <div className="mt-8">
        <WorldTimeBuddy />
      </div>
      <p className="mt-6 text-sm text-ink-500">
        Just need overlap hours? Try the <Link href="/tools/timezone-overlap" className="font-medium text-brand-600 hover:text-brand-700">timezone overlap finder</Link>, or{" "}
        <Link href="/page/1" className="font-medium text-brand-600 hover:text-brand-700">browse work-from-anywhere jobs</Link>.
      </p>
    </div>
  );
}
