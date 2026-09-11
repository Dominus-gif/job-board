import type { Metadata } from "next";
import { getCompanies } from "@/lib/db";
import { CompanyDirectory } from "@/components/CompanyDirectory";

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
        region-based. Search by name, or sort by how many roles they have.
      </p>

      {/* Search/sort/reveal are client-side over the full list, which is already
          serialised into the page — so filtering is instant and needs no request. */}
      <CompanyDirectory companies={companies} />
    </div>
  );
}
