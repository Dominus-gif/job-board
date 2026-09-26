import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCompanies, getCompanyBySlug, getJobsByCompany } from "@/lib/db";
import { abs } from "@/lib/site";
import { JobList } from "@/components/JobList";
import { CompanyLogo } from "@/components/CompanyLogo";
import { CalendarIcon, UsersIcon, PinIcon, BriefcaseIcon, ArrowUpRightIcon, CheckIcon } from "@/components/icons";
import { companyIsIndexable, robotsFor } from "@/lib/seo/indexing";

export const dynamicParams = true;
export const revalidate = 1800;

export async function generateStaticParams() {
  // Pre-build companies with a few roles; the long tail renders on demand.
  return (await getCompanies())
    .filter((c) => c.jobCount >= 2)
    // Cap the prebuild so the build stays in Cloudflare's memory/time budget;
    // getCompanies() is sorted by jobCount, so this keeps the biggest boards.
    // The long tail renders on demand (dynamicParams) and is cached by ISR.
    .slice(0, 150)
    .map((c) => ({ company: c.slug }));
}

export async function generateMetadata(props: { params: Promise<{ company: string }> }): Promise<Metadata> {
  const params = await props.params;
  const company = await getCompanyBySlug(params.company);
  if (!company) return {};
  return {
    title: `${company.name} — Remote Jobs, Reviews & Company Profile`,
    description: `${company.name} company profile: details and their ${company.jobCount} open remote ${company.jobCount === 1 ? "role" : "roles"}${company.worldwideCount > 0 ? ` (${company.worldwideCount} work-from-anywhere)` : ""}.`,
    // Two thirds of these pages exist to show a single job. They stay on the
    // site and stay linked; they stop being offered as search destinations.
    robots: robotsFor(companyIsIndexable(company.jobCount)),
    alternates: { canonical: abs(`/companies/${company.slug}`) },
  };
}

export default async function CompanyPage(props: { params: Promise<{ company: string }> }) {
  const params = await props.params;
  const company = await getCompanyBySlug(params.company);
  if (!company) notFound();
  const jobs = await getJobsByCompany(company.slug);

  const worldwide = company.worldwideCount;
  const regional = company.jobCount - worldwide;
  const rolesValue = worldwide > 0 && regional > 0
    ? `${company.jobCount} (${worldwide} worldwide)`
    : `${company.jobCount} remote`;
  const facts = [
    company.founded ? { icon: <CalendarIcon className="h-5 w-5" />, label: "Founded", value: String(company.founded) } : null,
    company.employees ? { icon: <UsersIcon className="h-5 w-5" />, label: "Employees", value: company.employees } : null,
    company.headquarters ? { icon: <PinIcon className="h-5 w-5" />, label: "Base", value: company.headquarters } : null,
    { icon: <BriefcaseIcon className="h-5 w-5" />, label: "Open roles", value: rolesValue },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string }[];

  return (
    <div>
      {/* Header */}
      <section className="border-b border-ink-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <CompanyLogo src={company.logo} name={company.name} domain={company.domain} size={80}
              className="h-20 w-20 flex-shrink-0 rounded-2xl border border-ink-100 bg-white object-contain p-2" />
            <div className="min-w-0">
              {worldwide > 0 ? (
                <div className="mb-1.5 inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-inset ring-emerald-100">
                  <CheckIcon className="h-3.5 w-3.5" /> Hires worldwide
                </div>
              ) : (
                <div className="mb-1.5 inline-flex items-center gap-1 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-amber-800 ring-1 ring-inset ring-amber-200">
                  <PinIcon className="h-3.5 w-3.5" /> Hires remotely (region-based)
                </div>
              )}
              <h1 className="font-display text-3xl font-extrabold text-ink-900 md:text-4xl">{company.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-ink-500">
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

        {/* Jobs */}
        <section className="mt-12">
          <span className="eyebrow">Open roles</span>
          <h2 className="mb-2 mt-2 font-display text-xl font-extrabold text-ink-900">
            {company.jobCount} remote {company.jobCount === 1 ? "role" : "roles"} at {company.name}
          </h2>
          {worldwide > 0 && regional > 0 && (
            <p className="mb-5 text-sm text-ink-500">
              {worldwide} work-from-anywhere · {regional} region-based
            </p>
          )}
          <JobList jobs={jobs} />
        </section>
      </div>
    </div>
  );
}

/** Compose a 5–6 line company profile from structured fields (or use an override). */
function companyAbout(c: NonNullable<Awaited<ReturnType<typeof getCompanyBySlug>>>): string {
  if (c.about) return c.about;
  const allRemote = /all-remote/i.test(c.headquarters ?? "");
  const s: string[] = [];
  if (c.description) s.push(c.description);
  const facts: string[] = [];
  if (c.founded) facts.push(`was founded in ${c.founded}`);
  if (c.employees) facts.push(`employs roughly ${c.employees} people`);
  if (allRemote) facts.push("runs as a fully distributed, all-remote team");
  else if (c.headquarters) facts.push(`is based in ${c.headquarters}`);
  if (facts.length) {
    const list = facts.length === 1 ? facts[0] : `${facts.slice(0, -1).join(", ")} and ${facts[facts.length - 1]}`;
    s.push(`${c.name} ${list}.`);
  }
  s.push(
    c.worldwideCount > 0
      ? `They hire remotely${c.worldwideCount === c.jobCount ? " with no country restriction, so every role below is one you can do from anywhere in the world" : `, including ${c.worldwideCount} work-from-anywhere ${c.worldwideCount === 1 ? "role" : "roles"} open worldwide`}.`
      : `They hire remotely, though their current openings are tied to specific countries or regions (shown on each role below).`
  );
  s.push(
    c.jobCount === 1
      ? `Right now there is one open remote role you can apply to below.`
      : `Right now there are ${c.jobCount} open remote roles you can apply to below.`
  );
  return s.join(" ");
}
