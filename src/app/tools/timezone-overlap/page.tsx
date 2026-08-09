import type { Metadata } from "next";
import Link from "next/link";
import { getTool } from "@/lib/tools";
import { abs } from "@/lib/site";
import { TimezoneOverlap } from "@/components/tools/TimezoneOverlap";

const tool = getTool("timezone-overlap")!;

export const metadata: Metadata = {
  title: "Timezone Overlap Finder for Remote Work",
  description: tool.description,
  keywords: tool.keywords,
  alternates: { canonical: "/tools/timezone-overlap" },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: abs("/tools/timezone-overlap"),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: tool.description,
  };
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-ink-400">
        <Link href="/tools" className="hover:text-ink-900">Tools</Link>
        <span aria-hidden>/</span>
        <span className="text-ink-500">Timezone overlap</span>
      </nav>
      <span className="eyebrow">Tool</span>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900">Timezone overlap finder</h1>
      <p className="mt-2 text-ink-500">
        Pick where you are and where the team is, and see how many 9-to-5 hours you'd share. Great for deciding whether a
        role needs a work-from-anywhere schedule.
      </p>
      <div className="mt-8">
        <TimezoneOverlap />
      </div>
      <p className="mt-6 text-sm text-ink-500">
        Prefer no timezone rules at all?{" "}
        <Link href="/page/1" className="font-medium text-brand-600 hover:text-brand-700">Browse work-from-anywhere jobs</Link>.
      </p>
    </div>
  );
}
