import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCompanies, getCompanyBySlug, getJobsByCompany } from "@/lib/db";
import { abs } from "@/lib/site";
import { JobList } from "@/components/JobList";
import { StarRating } from "@/components/StarRating";
import { CalendarIcon, UsersIcon, PinIcon, BriefcaseIcon, ArrowUpRightIcon, CheckIcon } from "@/components/icons";

export const dynamicParams = true;
export const revalidate = 1800;

export async function generateStaticParams() {
  return (await getCompanies()).map((c) => ({ company: c.slug }));
}

export async function generateMetadata({ params }: { params: { company: string } }): Promise<Metadata> {
  const company = await getCompanyBySlug(params.company);
  if (!company) return {};
  return {
    title: `${company.name} — Remote Jobs, Reviews & Company Profile`,
    description: `${company.name} hires globally with no location restriction. See company details, ratings from Glassdoor and more, plus their ${company.jobCount} open work-from-anywhere roles.`,
    alternates: { canonical: abs(`/companies/${company.slug}`) },
  };
}

export default async function CompanyPage({ params }: { params: { company: string } }) {
  const company = await getCompanyBySlug(params.company);
  if (!company) notFound();
  const jobs = await getJobsByCompany(company.slug);

  const facts = [
    company.founded ? { icon: <CalendarIcon className="h-5 w-5" />, label: "Founded", value: String(company.founded) } : null,
    company.employees ? { icon: <UsersIcon className="h-5 w-5" />, label: "Employees", value: company.employees } : null,
    company.headquarters ? { icon: <PinIcon className="h-5 w-5" />, label: "Base", value: company.headquarters } : null,
    { icon: <BriefcaseIcon className="h-5 w-5" />, label: "Open roles", value: `${company.jobCount} remote` },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string }[];

  return (
    <div>
      {/* Header */}
      <section className="border-b border-ink-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={company.logo} alt={`${company.name} logo`} width={80} height={80}
              className="h-20 w-20 flex-shrink-0 rounded-2xl border border-ink-100 bg-white object-contain p-2" />
            <div className="min-w-0">
              <div className="mb-1.5 inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-inset ring-emerald-100">
                <CheckIcon className="h-3.5 w-3.5" /> Hires worldwide
              </div>
              <h1 className="font-display text-3xl font-extrabold text-ink-900 md:text-4xl">{company.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-ink-500">
                {company.rating != null && <StarRating rating={company.rating} count={company.review_count} />}
                {company.domain && (
                  <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800">
                    {company.domain} <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Facts */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="card p-4">
              <div className="flex items-center gap-2 text-ink-400">{f.icon}<span className="field-label">{f.label}</span></div>
              <p className="mt-2 font-display font-bold text-ink-900">{f.value}</p>
            </div>
          ))}
        </section>

        {/* About */}
        <section className="mt-10">
          <span className="eyebrow">About</span>
          <h2 className="mb-3 mt-2 font-display text-xl font-extrabold text-ink-900">About {company.name}</h2>
          <p className="max-w-3xl text-lg leading-relaxed text-ink-600">{companyAbout(company)}</p>
        </section>

        {/* Reviews */}
        {company.reviews && company.reviews.length > 0 && (
          <section className="mt-10">
            <span className="eyebrow">Reviews</span>
            <h2 className="mb-4 mt-2 font-display text-xl font-extrabold text-ink-900">What employees say</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {company.reviews.map((r) => (
                <a
                  key={r.source}
                  href={r.url || reviewUrl(r.source, company)}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="card group p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-display font-bold text-ink-900">{r.source}</p>
                    <ArrowUpRightIcon className="h-4 w-4 text-ink-300 transition group-hover:text-brand-600" />
                  </div>
                  <div className="mt-2"><StarRating rating={r.rating} count={r.count} /></div>
                  <p className="mt-2 text-xs font-medium text-brand-700">Read reviews on {r.source} →</p>
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-400">
              Ratings aggregated from public employer-review sources. Figures are indicative — open each site for the latest.
            </p>
          </section>
        )}

        {/* Jobs */}
        <section className="mt-12">
          <span className="eyebrow">Open roles</span>
          <h2 className="mb-5 mt-2 font-display text-xl font-extrabold text-ink-900">
            {company.jobCount} location-independent {company.jobCount === 1 ? "role" : "roles"} at {company.name}
          </h2>
          <JobList jobs={jobs} />
        </section>
      </div>
    </div>
  );
}

/** Build a working link to a company's page on a given review site. */
function reviewUrl(source: string, c: NonNullable<Awaited<ReturnType<typeof getCompanyBySlug>>>): string {
  const q = encodeURIComponent(c.name);
  const s = source.toLowerCase();
  if (s.includes("glassdoor")) return `https://www.glassdoor.com/Search/results.htm?keyword=${q}`;
  if (s.includes("comparably")) return `https://www.comparably.com/companies/${c.slug}`;
  if (s.includes("indeed")) return `https://www.indeed.com/cmp/${encodeURIComponent(c.name.replace(/\s+/g, "-"))}`;
  if (s.includes("ambition")) return `https://www.ambitionbox.com/reviews/${c.slug}-reviews`;
  return `https://www.google.com/search?q=${q}+${encodeURIComponent(source)}+reviews`;
}

/** Compose a 5–6 line company profile from structured fields (or use an override). */
function companyAbout(c: NonNullable<Awaited<ReturnType<typeof getCompanyBySlug>>>): string {
  if (c.about) return c.about;
  const remote = /all-remote/i.test(c.headquarters ?? "")
    ? "runs as a fully distributed, all-remote team"
    : "operates with a remote-friendly culture";
  const s: string[] = [];
  s.push(c.description ?? `${c.name} is a remote-first company.`);
  s.push(
    c.founded
      ? `Founded in ${c.founded}, ${c.name} ${remote}${c.employees ? ` and employs roughly ${c.employees} people` : ""}${c.headquarters ? ` (${c.headquarters})` : ""}.`
      : `${c.name} ${remote}.`
  );
  s.push(
    `They hire globally with no country, region, or timezone restriction, so every role listed here is one you can genuinely do from anywhere in the world.`
  );
  if (c.rating != null) {
    s.push(
      `Current and former employees rate ${c.name} ${c.rating.toFixed(1)} out of 5${c.review_count ? ` across ${c.review_count.toLocaleString("en-US")}+ reviews` : ""} on sites like Glassdoor and Comparably.`
    );
  }
  s.push(
    c.jobCount === 1
      ? `Right now there is one open remote role you can apply to below.`
      : `Right now there are ${c.jobCount} open remote roles you can apply to below.`
  );
  return s.join(" ");
}
