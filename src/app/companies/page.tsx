import type { Metadata } from "next";
import Link from "next/link";
import { getCompanies } from "@/lib/db";
import { StarRating } from "@/components/StarRating";

export const metadata: Metadata = {
  title: "Companies Hiring Worldwide",
  description: "Companies that hire truly location-independent talent — browse every employer with active global-remote roles, with ratings and reviews.",
  alternates: { canonical: "/companies" },
};

export const revalidate = 1800;

export default async function CompaniesPage() {
  const companies = await getCompanies();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <span className="eyebrow">Verified employers</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink-900 md:text-4xl">Companies hiring worldwide</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-500">
        These companies hire people anywhere in the world — no country, region, or timezone restriction on any of the
        roles below. Ratings reflect aggregated employee reviews.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((c) => (
          <Link key={c.slug} href={`/companies/${c.slug}`}
            className="card p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.logo} alt={`${c.name} logo`} width={48} height={48}
                className="h-12 w-12 flex-shrink-0 rounded-xl border border-ink-100 bg-white object-contain p-1" />
              <div className="min-w-0">
                <p className="truncate font-display font-bold text-ink-900">{c.name}</p>
                <p className="text-sm text-ink-500">{c.jobCount} open {c.jobCount === 1 ? "role" : "roles"}</p>
              </div>
            </div>
            {c.rating != null && <div className="mt-3"><StarRating rating={c.rating} count={c.review_count} /></div>}
            {c.description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">{c.description}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
