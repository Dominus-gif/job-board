import type { Metadata } from "next";
import Link from "next/link";
import { getSearchableJobs } from "@/lib/db";
import { abs } from "@/lib/site";
import { categoriesByCount, categoryHref, POPULAR_LOCATIONS, HUB_LINKS } from "@/lib/seo-hubs";
import { AnywhereVsRegional } from "@/components/AnywhereVsRegional";
import { SeoHubLinks } from "@/components/SeoHubLinks";
import { SearchIcon, ArrowUpRightIcon } from "@/components/icons";

export const revalidate = 1800;

const TITLE = "Find Remote Jobs You Can Do From Anywhere";
const DESCRIPTION =
  "Find remote jobs with no country, region, or timezone limits — plus remote roles based in your region. Search by keyword, category, or location. Pulled straight from company career pages.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | getremotejobsnow.com` },
  description: DESCRIPTION,
  alternates: { canonical: abs("/find-remote-jobs") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: abs("/find-remote-jobs"), type: "website" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export default async function FindRemoteJobsPage() {
  const jobs = await getSearchableJobs();
  const total = jobs.length;
  const cats = categoriesByCount(jobs);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    name: `${TITLE} | getremotejobsnow.com`,
    description: DESCRIPTION,
    url: abs("/find-remote-jobs"),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-ink-100 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <span className="eyebrow justify-center">Start your search</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink-900 md:text-4xl">{TITLE}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-ink-500">
            {total.toLocaleString("en-US")} remote jobs in one place — truly work-from-anywhere roles plus
            remote jobs based in your region. Search, or jump straight to a category or location.
          </p>

          <form action="/jobs" method="get" className="mx-auto mt-6 max-w-xl">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                name="q"
                placeholder="Search roles, skills, companies…"
                aria-label="Search remote jobs"
                className="w-full rounded-xl border border-ink-200 bg-white py-3.5 pl-12 pr-24 text-ink-900 shadow-card placeholder:text-ink-400 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200"
              />
              <button type="submit" className="btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2">
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12">
        {/* How it works — our differentiator. */}
        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-ink-900">How remote jobs here work</h2>
          <AnywhereVsRegional />
        </section>

        {/* Top categories */}
        <section>
          <div className="mb-4 flex items-end justify-between gap-4 border-b border-ink-100 pb-3">
            <h2 className="font-display text-xl font-bold text-ink-900">Browse by category</h2>
            <Link href="/remote-jobs-categories" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800">
              All categories <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {cats.map(({ category, jobs: list }) => (
              <Link
                key={category}
                href={categoryHref(category)}
                className="group flex items-center justify-between gap-2 rounded-xl border border-ink-100 bg-white px-4 py-3 transition hover:border-brand-300 hover:shadow-card"
              >
                <span className="font-medium text-ink-800 group-hover:text-brand-700">{category}</span>
                <span className="font-mono text-xs text-ink-400">{list.length}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Top locations */}
        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-ink-900">Browse by location</h2>
          <div className="flex flex-wrap gap-2">
            {POPULAR_LOCATIONS.map((l) => (
              <Link
                key={l.slug}
                href={`/${l.slug}`}
                className="rounded-full border border-ink-100 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                Remote jobs in {l.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Other hubs */}
        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-ink-900">More ways to search</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {HUB_LINKS.filter((h) => h.href !== "/find-remote-jobs").map((h) => (
              <Link
                key={h.href}
                href={h.href}
                className="group flex items-start justify-between gap-3 rounded-2xl border border-ink-100 bg-white p-5 transition hover:border-brand-300 hover:shadow-card"
              >
                <div>
                  <p className="font-display font-bold text-ink-900 group-hover:text-brand-700">{h.label}</p>
                  <p className="mt-1 text-sm text-ink-500">{h.desc}</p>
                </div>
                <ArrowUpRightIcon className="mt-1 h-4 w-4 flex-shrink-0 text-ink-400 transition group-hover:text-brand-600" />
              </Link>
            ))}
          </div>
        </section>

        <SeoHubLinks exclude="/find-remote-jobs" />
      </div>
    </div>
  );
}
