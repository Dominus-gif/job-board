import type { Metadata } from "next";
import Link from "next/link";
import { getSearchableJobs } from "@/lib/db";
import { abs } from "@/lib/site";
import { categoriesByCount, categoryHref } from "@/lib/seo-hubs";
import { AnywhereVsRegional } from "@/components/AnywhereVsRegional";
import { SeoHubLinks } from "@/components/SeoHubLinks";
import { ArrowUpRightIcon } from "@/components/icons";

export const revalidate = 1800;

const TITLE = "Remote Jobs in Today's Popular Categories";
const DESCRIPTION =
  "Browse remote jobs by category — ranked by how many roles are open right now. Backend, frontend, design, DevOps, customer support and more, all truly work-from-anywhere. Updated daily.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | getremotejobsnow.com` },
  description: DESCRIPTION,
  alternates: { canonical: abs("/remote-jobs-categories") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: abs("/remote-jobs-categories"), type: "website" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export default async function CategoriesHubPage() {
  const jobs = await getSearchableJobs();
  const cats = categoriesByCount(jobs); // sorted by live count → page reorders as inventory shifts
  const total = jobs.length;

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "CollectionPage",
    name: `${TITLE} | getremotejobsnow.com`,
    description: DESCRIPTION,
    url: abs("/remote-jobs-categories"),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-ink-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <span className="eyebrow">Popular categories</span>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold text-ink-900 md:text-4xl">{TITLE}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-500">
            {total.toLocaleString("en-US")} remote jobs across {cats.length} categories, ranked by how many roles
            are open right now. Every role is remote — worldwide or region-locked, always clearly labelled.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12">
        <AnywhereVsRegional />

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map(({ category, jobs: list }) => {
            const examples = list.slice(0, 3);
            return (
              <Link
                key={category}
                href={categoryHref(category)}
                className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-5 transition hover:border-brand-300 hover:shadow-card"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="font-display text-lg font-bold text-ink-900 group-hover:text-brand-700">{category}</h2>
                  <span className="font-mono text-xs font-semibold text-ink-400">
                    {list.length} {list.length === 1 ? "job" : "jobs"}
                  </span>
                </div>
                <ul className="mt-3 flex-1 space-y-1.5 text-sm text-ink-600">
                  {examples.map((j) => (
                    <li key={j.slug} className="truncate">· {j.title}</li>
                  ))}
                </ul>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:text-brand-800">
                  View all {category} jobs <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </section>

        <SeoHubLinks exclude="/remote-jobs-categories" />
      </div>
    </div>
  );
}
