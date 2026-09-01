import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { getCompanies } from "@/lib/db";
import { StarRating } from "@/components/StarRating";
import { CompanyLogo } from "@/components/CompanyLogo";
import { InFeedAd } from "@/components/InFeedAd";

// Native ad every N cards (self-hides when ads are off — no empty grid cell).
const AD_EVERY = 9;

export const metadata: Metadata = {
  title: "Companies Hiring Remotely",
  description: "Every company with active remote roles on getremotejobsnow.com — work-from-anywhere and region-based — with ratings and reviews.",
  alternates: { canonical: "/companies" },
};

export const revalidate = 1800;

export default async function CompaniesPage() {
  const companies = await getCompanies();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <span className="eyebrow">Employers</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink-900 md:text-4xl">Companies hiring remotely</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-500">
        {companies.length.toLocaleString("en-US")} companies with open remote roles — work-from-anywhere and
        region-based. Each card shows how many roles they have.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((c, i) => (
          <Fragment key={c.slug}>
            <Link href={`/companies/${c.slug}`}
              className="card p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
              <div className="flex items-center gap-4">
                <CompanyLogo src={c.logo} name={c.name} domain={c.domain} size={48}
                  className="h-12 w-12 flex-shrink-0 rounded-xl border border-ink-100 bg-white object-contain p-1" />
                <div className="min-w-0">
                  <p className="truncate font-display font-bold text-ink-900">{c.name}</p>
                  <p className="text-sm text-ink-500">
                    {c.jobCount} open {c.jobCount === 1 ? "role" : "roles"}
                    {c.worldwideCount > 0 && c.worldwideCount < c.jobCount && (
                      <span className="text-emerald-600"> · {c.worldwideCount} worldwide</span>
                    )}
                  </p>
                </div>
              </div>
              {c.rating != null && <div className="mt-3"><StarRating rating={c.rating} count={c.review_count} /></div>}
              {c.description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">{c.description}</p>}
            </Link>
            {/* Native ad card in the grid flow (self-hides when ads are off). */}
            {(i + 1) % AD_EVERY === 0 && i < companies.length - 1 && <InFeedAd />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
