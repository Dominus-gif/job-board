import type { Metadata } from "next";
import { getSearchableJobs } from "@/lib/db";
import { abs } from "@/lib/site";
import { trendingJobs } from "@/lib/seo-hubs";
import { JobList } from "@/components/JobList";
import { AnywhereVsRegional } from "@/components/AnywhereVsRegional";
import { SeoHubLinks } from "@/components/SeoHubLinks";
import { SparkIcon } from "@/components/icons";
import { jobListJsonLd } from "@/lib/jsonld";

export const revalidate = 1800;

const TITLE = "Top Trending Remote Jobs — New This Week";
const DESCRIPTION =
  "The top trending remote jobs posted this week — freshly listed, work-from-anywhere roles ranked by recency and specificity. Updated daily, pulled straight from company career pages.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | getremotejobsnow.com` },
  description: DESCRIPTION,
  alternates: { canonical: abs("/trending-remote-jobs") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: abs("/trending-remote-jobs"), type: "website" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export default async function TrendingPage() {
  const all = await getSearchableJobs();
  const { jobs, freshCount } = trendingJobs(all, 7, 20);
  const updated = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const jsonLd = [
    {
      "@context": "https://schema.org/",
      "@type": "CollectionPage",
      name: `${TITLE} | getremotejobsnow.com`,
      description: DESCRIPTION,
      url: abs("/trending-remote-jobs"),
    },
    jobListJsonLd(jobs, TITLE),
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-ink-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <span className="eyebrow inline-flex items-center gap-1.5">
            <SparkIcon className="h-3.5 w-3.5" /> New this week
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold text-ink-900 md:text-4xl">
            Top Trending Remote Jobs
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-500">
            The {jobs.length} most in-demand remote jobs right now — ranked by how recently they were posted and
            how specific the role is.{" "}
            {freshCount > 0
              ? `${freshCount} were posted in the last 7 days.`
              : "Freshly ranked from the latest listings."}
          </p>
          <p className="mt-2 font-mono text-xs text-ink-400">Updated {updated}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12">
        <AnywhereVsRegional />

        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-ink-900">This week&apos;s top {jobs.length} roles</h2>
          <JobList jobs={jobs} emptyLabel="No trending roles right now — check back soon." />
        </section>

        <SeoHubLinks exclude="/trending-remote-jobs" />
      </div>
    </div>
  );
}
