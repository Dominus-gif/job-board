import type { Metadata } from "next";
import Link from "next/link";
import type { Category } from "@/lib/types";
import { getSearchableJobs } from "@/lib/db";
import { abs } from "@/lib/site";
import { categoryHref } from "@/lib/seo-hubs";
import { JobList } from "@/components/JobList";
import { AnywhereVsRegional } from "@/components/AnywhereVsRegional";
import { SeoHubLinks } from "@/components/SeoHubLinks";
import { ArrowUpRightIcon } from "@/components/icons";

export const revalidate = 1800;

const TITLE = "Remote Jobs in Programming, Customer Support, Design & More";
const DESCRIPTION =
  "Remote jobs across programming & engineering, customer support and design — grouped by category with live counts. Truly work-from-anywhere roles, pulled straight from company career pages.";

// Groups shown on this multi-category page. Each heading links to a real
// category page; the engineering group also lists its sub-categories.
const GROUPS: { label: string; blurb: string; cats: Category[]; primary: Category }[] = [
  {
    label: "Programming & Engineering",
    blurb: "Backend, frontend, full-stack and DevOps roles.",
    cats: ["Backend", "Frontend", "Fullstack", "DevOps"],
    primary: "Backend",
  },
  {
    label: "Customer Support",
    blurb: "Support, success and community roles.",
    cats: ["Customer Support"],
    primary: "Customer Support",
  },
  {
    label: "Design",
    blurb: "Product, UX, and visual design roles.",
    cats: ["Design"],
    primary: "Design",
  },
];

const MORE: Category[] = ["Product", "Sales & Marketing", "Management & Finance"];
const PER_GROUP = 8;

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | getremotejobsnow.com` },
  description: DESCRIPTION,
  alternates: { canonical: abs("/remote-jobs-programming-support-design") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: abs("/remote-jobs-programming-support-design"), type: "website" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export default async function MultiCategoryPage() {
  const jobs = await getSearchableJobs();
  const groups = GROUPS.map((g) => ({
    ...g,
    jobs: jobs.filter((j) => g.cats.includes(j.category)),
  }));
  const total = groups.reduce((n, g) => n + g.jobs.length, 0);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "CollectionPage",
    name: `${TITLE} | getremotejobsnow.com`,
    description: DESCRIPTION,
    url: abs("/remote-jobs-programming-support-design"),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-ink-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <span className="eyebrow">Multi-category roundup</span>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold text-ink-900 md:text-4xl">
            Remote Jobs in Programming, Customer Support, Design &amp; More
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-500">
            {total.toLocaleString("en-US")} remote jobs across programming &amp; engineering, customer support and
            design — grouped below with live counts. Every role is remote, worldwide or region-locked.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12">
        <AnywhereVsRegional />

        {groups.map((g) => (
          <section key={g.label}>
            <div className="mb-4 flex flex-col gap-1.5 border-b border-ink-100 pb-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                {/* Real H2, linked to the category page. */}
                <h2 className="font-display text-2xl font-extrabold text-ink-900">
                  <Link href={categoryHref(g.primary)} className="hover:text-brand-700">{g.label}</Link>
                  <span className="ml-2 align-middle font-mono text-sm font-semibold text-ink-400">{g.jobs.length}</span>
                </h2>
                <p className="mt-1 text-sm text-ink-500">{g.blurb}</p>
              </div>
              <Link
                href={categoryHref(g.primary)}
                className="inline-flex flex-shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                View all {g.primary} jobs <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Sub-category links for the combined engineering group. */}
            {g.cats.length > 1 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {g.cats.map((c) => (
                  <Link
                    key={c}
                    href={categoryHref(c)}
                    className="rounded-full border border-ink-100 bg-white px-3 py-1 text-xs font-medium text-ink-600 transition hover:border-brand-300 hover:text-brand-700"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            )}

            <JobList jobs={g.jobs.slice(0, PER_GROUP)} emptyLabel={`No ${g.label} roles open right now — check back soon.`} />
          </section>
        ))}

        <section>
          <h2 className="mb-3 font-display text-lg font-bold text-ink-900">And more categories</h2>
          <div className="flex flex-wrap gap-2">
            {MORE.map((c) => (
              <Link
                key={c}
                href={categoryHref(c)}
                className="rounded-full border border-ink-100 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                Remote {c} jobs
              </Link>
            ))}
          </div>
        </section>

        <SeoHubLinks exclude="/remote-jobs-programming-support-design" />
      </div>
    </div>
  );
}
