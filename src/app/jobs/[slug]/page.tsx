import type { Metadata } from "next";
import Link from "next/link";
import { getAllJobs, getCompanyBySlug, getJobBySlug, getJobsByCompany, getSimilarJobs } from "@/lib/db";
import { formatSalary, salaryTier } from "@/lib/salary";
import { formatDate, daysUntil } from "@/lib/format";
import { abs } from "@/lib/site";
import { jobPostingJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { categoryToSlug } from "@/lib/taxonomy";
import { JobList } from "@/components/JobList";
import { ScamNotice, ReferralNudge } from "@/components/ScamNotice";
import { InactiveNotice } from "@/components/InactiveNotice";
import { LivenessProvider, ApplyButton, InactiveBanner } from "@/components/JobLiveness";
import { InterestButton } from "@/components/InterestButton";
import { StarRating } from "@/components/StarRating";
import { ShareButtons } from "@/components/ShareButtons";
import { AdSlot } from "@/components/AdSlot";
import {
  GlobeIcon, BriefcaseIcon, CalendarIcon, WalletIcon, TagIcon, CheckIcon, BuildingIcon, ArrowUpRightIcon,
} from "@/components/icons";

// Render live-added slugs on demand, and revalidate so removed jobs flip to
// the "not active" state without a redeploy.
export const dynamicParams = true;
export const revalidate = 1800;

export async function generateStaticParams() {
  return (await getAllJobs()).map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = await getJobBySlug(params.slug);
  if (!job) {
    return { title: "Job no longer active", robots: { index: false, follow: true } };
  }
  const title = `${job.title} at ${job.company_name} — Remote Worldwide`;
  const description = `${job.title} at ${job.company_name}. Work from anywhere in the world — ${job.employment_type}${
    formatSalary(job.salary) ? `, ${formatSalary(job.salary)}` : ""
  }. Apply free.`;
  const url = abs(`/jobs/${job.slug}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", images: [job.company_logo] },
    twitter: { card: "summary", title, description },
  };
}

export default async function JobPage({ params }: { params: { slug: string } }) {
  const job = await getJobBySlug(params.slug);

  // Removed from the live feed entirely → inactive (no network needed).
  if (!job) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <InactiveNotice />
      </div>
    );
  }

  const salary = formatSalary(job.salary);
  const tier = salaryTier(job.salary);
  const daysLeft = daysUntil(job.expires_at);
  const [similar, companyJobs, company] = await Promise.all([
    getSimilarJobs(job),
    getJobsByCompany(job.company_slug),
    getCompanyBySlug(job.company_slug),
  ]);
  const otherRoles = companyJobs.length;
  const jsonLd = jobPostingJsonLd(job);
  const crumbs = breadcrumbJsonLd([
    { name: "Jobs", path: "/" },
    { name: job.category, path: `/remote-${categoryToSlug(job.category)}-jobs` },
    { name: job.title, path: `/jobs/${job.slug}` },
  ]);

  return (
    <LivenessProvider slug={job.slug}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      {/* ── Header band ─────────────────────────────────────────── */}
      <section className="border-b border-ink-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-ink-400">
            <Link href="/" className="hover:text-brand-700">Jobs</Link>
            <span className="text-ink-300">/</span>
            <Link href={`/remote-${categoryToSlug(job.category)}-jobs`} className="hover:text-brand-700">{job.category}</Link>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={job.company_logo} alt={`${job.company_name} logo`} width={64} height={64}
                className="h-16 w-16 flex-shrink-0 rounded-2xl border border-ink-100 bg-white object-contain p-1.5" />
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {job.is_featured && (
                    <span className="rounded-md bg-accent-400 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-ink-900">
                      Featured
                    </span>
                  )}
                  {!job.is_featured && job.in_demand && (
                    <span className="badge-trending inline-flex items-center gap-1.5 rounded-md bg-accent-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accent-600 ring-1 ring-inset ring-accent-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-500 [animation:trending-blink_1.1s_ease-in-out_infinite]" aria-hidden />
                      Trending
                    </span>
                  )}
                  {job.verified && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-inset ring-emerald-100">
                      <CheckIcon className="h-3.5 w-3.5" /> Verified remote
                    </span>
                  )}
                </div>
                <h1 className="font-display text-2xl font-extrabold leading-tight text-ink-900 md:text-3xl">{job.title}</h1>
                <p className="mt-1.5 text-ink-500">
                  <Link href={`/companies/${job.company_slug}`} className="font-semibold text-ink-800 hover:text-brand-700">
                    {job.company_name}
                  </Link>
                  <span className="text-ink-300"> · </span>
                  Posted {formatDate(job.posted_at)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="chip"><BriefcaseIcon className="h-3.5 w-3.5" /> {job.employment_type}</span>
                  <span className="chip"><TagIcon className="h-3.5 w-3.5" /> {job.category}</span>
                  {salary && tier && (
                    <span className={`chip ring-1 ring-inset ${tier.chip}`}>
                      <WalletIcon className="h-3.5 w-3.5" /> {salary}
                      <span className="ml-0.5 font-semibold uppercase">· {tier.label}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-shrink-0 flex-col items-stretch gap-2 md:w-56">
              <ApplyButton applyUrl={job.apply_url} label="Apply now" className="btn-primary w-full py-3 text-base" />
              <p className="text-center font-mono text-xs tracking-wide text-ink-400">Free · applies on {job.company_name}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <InactiveBanner />
            <h2 className="font-display text-lg font-bold text-ink-900">About this role</h2>
            <div className="prose-job mt-3 max-w-none" dangerouslySetInnerHTML={{ __html: job.description_html }} />
            <AdSlot />
            <div className="mt-8 space-y-4">
              <ReferralNudge />
              <ScamNotice />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-5">
              <h2 className="font-display text-base font-bold text-ink-900">Job overview</h2>

              {/* Highlighted salary block, color-coded by bracket */}
              {salary && tier ? (
                <div className={`mt-4 rounded-xl p-4 ring-1 ring-inset ${tier.chip}`}>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider">
                      <WalletIcon className="h-4 w-4" /> Salary
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider">
                      <span className={`h-1.5 w-1.5 rounded-full ${tier.dot}`} aria-hidden /> {tier.label}
                    </span>
                  </div>
                  <p className={`mt-1 font-display text-2xl font-extrabold ${tier.text}`}>{salary}</p>
                </div>
              ) : (
                <div className="mt-4 rounded-xl bg-ink-50 p-4 text-sm text-ink-500 ring-1 ring-inset ring-ink-100">
                  <span className="field-label">Salary</span>
                  <p className="mt-1">Not disclosed by the employer</p>
                </div>
              )}

              {/* Highlighted application deadline */}
              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-amber-50 px-4 py-3 ring-1 ring-inset ring-amber-200">
                <span className="flex items-center gap-2 text-sm font-medium text-amber-900">
                  <CalendarIcon className="h-4 w-4 text-amber-500" /> Apply before
                </span>
                <span className="text-right">
                  <span className="block text-sm font-semibold text-amber-900">{formatDate(job.expires_at)}</span>
                  {daysLeft > 0 && (
                    <span className="font-mono text-[11px] text-amber-700">{daysLeft} days left</span>
                  )}
                </span>
              </div>

              <dl className="mt-4 space-y-3.5 text-sm">
                <OverviewRow icon={<CalendarIcon />} label="Posted">{formatDate(job.posted_at)}</OverviewRow>
                <OverviewRow icon={<BriefcaseIcon />} label="Job type">{job.employment_type}</OverviewRow>
                <OverviewRow icon={<GlobeIcon />} label="Location">{job.location}</OverviewRow>
                <OverviewRow icon={<TagIcon />} label="Category">{job.category}</OverviewRow>
              </dl>

              {job.skills.length > 0 && (
                <div className="mt-5 border-t border-ink-100 pt-5">
                  <h3 className="field-label">Skills</h3>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {job.skills.map((s) => (
                      <Link key={s} href={`/remote-${s.replace(/[.]/g, "-")}-jobs`}
                        className="chip font-mono lowercase hover:text-brand-700 hover:ring-brand-200">
                        {s}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {job.benefits.length > 0 && (
                <div className="mt-5 border-t border-ink-100 pt-5">
                  <h3 className="field-label">Benefits</h3>
                  <ul className="mt-2.5 space-y-2 text-[15px] text-ink-700">
                    {job.benefits.map((b) => (
                      <li key={b.slug} className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 flex-shrink-0 text-brand-500" /> {b.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ApplyButton applyUrl={job.apply_url} label="Apply now" className="btn-primary mt-6 w-full" />
              <div className="mt-3">
                <InterestButton slug={job.slug} initialInterest={job.interest} />
              </div>
            </div>

            {/* Company card */}
            <div className="card p-5">
              <h2 className="font-display text-base font-bold text-ink-900">About the company</h2>
              <div className="mt-4 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={job.company_logo} alt="" width={44} height={44} className="h-11 w-11 rounded-xl border border-ink-100 bg-white object-contain p-1" />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink-900">{job.company_name}</p>
                  {job.company_domain && (
                    <a href={`https://${job.company_domain}`} target="_blank" rel="noopener noreferrer"
                      className="truncate font-mono text-sm text-brand-700 hover:text-brand-800">
                      {job.company_domain}
                    </a>
                  )}
                </div>
              </div>

              {company?.rating != null && (
                <div className="mt-4 flex items-center justify-between gap-2 rounded-xl bg-ink-50 px-3 py-2.5">
                  <StarRating rating={company.rating} count={company.review_count} />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Reviews</span>
                </div>
              )}

              {company?.description && (
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{company.description}</p>
              )}

              <div className="mt-4 flex items-center gap-2 rounded-xl bg-ink-50 px-3 py-2.5 text-sm text-ink-600">
                <BuildingIcon className="h-4 w-4 text-ink-400" />
                {otherRoles} active {otherRoles === 1 ? "role" : "roles"} · all location-independent
              </div>
              <Link href={`/companies/${job.company_slug}`}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800">
                View all jobs at {job.company_name} <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>

            {/* Share */}
            <div className="card p-5">
              <h2 className="font-display text-base font-bold text-ink-900">Share this job</h2>
              <p className="mt-1 text-sm text-ink-500">Know someone who works from anywhere? Send it their way.</p>
              <div className="mt-4">
                <ShareButtons
                  url={abs(`/jobs/${job.slug}`)}
                  title={`${job.title} at ${job.company_name} — Remote Worldwide`}
                  message={`${job.title} at ${job.company_name}${salary ? ` (${salary})` : ""} — work from anywhere in the world 🌍 via AnywhereJobs, the only job board where every job is truly location-independent.`}
                />
              </div>
            </div>
          </aside>
        </div>

        {/* Similar jobs */}
        {similar.length > 0 && (
          <section className="mt-16">
            <span className="eyebrow">Keep looking</span>
            <h2 className="mb-5 mt-2 font-display text-2xl font-extrabold text-ink-900">Similar roles</h2>
            <JobList jobs={similar} />
          </section>
        )}
      </div>

      {/* Sticky apply bar (mobile) */}
      <div className="sticky bottom-0 z-20 border-t border-ink-100 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-1">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-900">{job.title}</p>
            <p className="truncate font-mono text-xs text-ink-400">{salary || job.company_name}</p>
          </div>
          <ApplyButton applyUrl={job.apply_url} label="Apply" className="btn-primary flex-shrink-0" />
        </div>
      </div>
    </LivenessProvider>
  );
}

function OverviewRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="flex items-center gap-2 text-ink-500">
        <span className="text-ink-400">{icon}</span>
        {label}
      </dt>
      <dd className="text-right font-medium text-ink-900">{children}</dd>
    </div>
  );
}
