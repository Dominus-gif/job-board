import Link from "next/link";
import { getAllJobs, getCompanies, getJobsByCategory, getRegionalCount, getSubscriberCount } from "@/lib/db";
import { FEATURES } from "@/lib/site";
import { categoryToSlug } from "@/lib/taxonomy";
import { CategoryBar } from "@/components/CategoryBar";
import { JobList } from "@/components/JobList";
import { JobBoard } from "@/components/JobBoard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { FaqSection } from "@/components/FaqSection";
import { AdSlot } from "@/components/AdSlot";
import { PinIcon, ArrowUpRightIcon } from "@/components/icons";
import { siteJsonLd, jobListJsonLd } from "@/lib/jsonld";

const HOME_FAQ = [
  {
    q: "What makes a job 'truly location-independent'?",
    a: "It can be done from anywhere in the world with no country, region, or timezone restriction. We reject anything that says 'US only', 'EU-based', 'must overlap EST', or requires local work authorization.",
  },
  {
    q: "Where do these jobs come from?",
    a: "We aggregate them hourly from companies' public applicant tracking systems (Ashby, Greenhouse, Lever, Workable), then filter ruthlessly for global-remote roles and enrich them with skills, salary, and benefits.",
  },
  {
    q: "Is it free to apply?",
    a: "Always. You apply directly on the company's own site. You should never have to pay to apply.",
  },
  {
    q: "How often are new jobs added?",
    a: "Continuously. Our ingestion pipeline polls company boards on a schedule, and new global-remote roles appear as soon as they pass the filter.",
  },
];

// Category preview sections in the order the spec lists them.
const PREVIEW_ORDER = ["Backend", "Frontend", "Design", "Customer Support", "Sales & Marketing", "Management & Finance"] as const;

// Refresh live data periodically (ISR), matching the store's cache TTL.
export const revalidate = 1800;

export default async function HomePage() {
  const jobs = await getAllJobs();
  const subscribers = getSubscriberCount();
  const companies = await getCompanies();
  const regionalCount = await getRegionalCount();
  const previews = await Promise.all(
    PREVIEW_ORDER.map(async (category) => ({ category, list: (await getJobsByCategory(category)).slice(0, 4) }))
  );

  const totalRoles = jobs.length + regionalCount;
  const stats = [
    [totalRoles.toLocaleString("en-US"), "open remote roles"],
    [jobs.length.toLocaleString("en-US"), "work-from-anywhere"],
    [regionalCount.toLocaleString("en-US"), "region-based"],
  ] as const;

  const jsonLd = [...siteJsonLd(), jobListJsonLd(jobs, "Remote Jobs You Can Do From Anywhere")];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-white">
        <div
          className="pointer-events-none absolute inset-0 bg-meridian opacity-60 [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 pt-11 pb-12 md:pt-14 md:pb-14">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Work from anywhere · any timezone</span>
            <h1 className="mt-4 font-display text-[2.15rem] font-extrabold leading-[1.06] text-ink-900 sm:text-4xl md:text-5xl">
              Remote jobs you can do from{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                anywhere in the world
              </span>
              .
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-500 md:text-lg">
              Verified remote roles with no country, region, or timezone strings attached — pulled straight from
              company hiring systems and enriched with salary, skills, and benefits.
            </p>

            {FEATURES.newsletter ? (
              <div className="mx-auto mt-6 max-w-lg">
                <NewsletterForm buttonLabel="Get weekly jobs" />
                <p className="mt-2 text-xs text-ink-400">
                  Join {subscribers.toLocaleString("en-US")} subscribers · one email a week · no spam
                </p>
              </div>
            ) : (
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/page/1" className="btn-primary">Browse all jobs</Link>
                <Link href="/hiring" className="btn-ghost">Post a job</Link>
              </div>
            )}

            <dl className="mx-auto mt-8 grid max-w-md grid-cols-3 divide-x divide-ink-100 rounded-2xl border border-ink-100 bg-white shadow-card">
              {stats.map(([value, label]) => (
                <div key={label} className="px-2 py-3.5">
                  <dt className="font-display text-xl font-extrabold text-ink-900 md:text-2xl">{value}</dt>
                  <dd className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-ink-400">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* Category filter bar */}
        <section className="pt-10">
          <CategoryBar />
        </section>

        {/* All Jobs feed with salary / type filters */}
        <section className="pt-8">
          <SectionHeader eyebrow="Live feed" title="All remote jobs" href="/page/1" linkLabel="Browse all remote jobs" />
          <JobBoard jobs={jobs} />
        </section>

        {regionalCount > 0 && (
          <Link
            href="/remote-regional-jobs"
            className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 transition hover:border-amber-300 hover:shadow-card sm:flex-row sm:items-center"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <PinIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-bold text-ink-900">Open to region-locked remote roles?</p>
                <p className="mt-0.5 text-sm text-ink-600">
                  {regionalCount.toLocaleString("en-US")} more remote jobs are restricted to a specific country or region.
                </p>
              </div>
            </div>
            <span className="inline-flex flex-shrink-0 items-center gap-1 text-sm font-semibold text-amber-800">
              Browse regional jobs <ArrowUpRightIcon className="h-4 w-4" />
            </span>
          </Link>
        )}

        <AdSlot />


        {/* Category previews */}
        {previews.map(({ category, list }) => {
          if (list.length === 0) return null;
          return (
            <section key={category} className="pt-12">
              <SectionHeader
                eyebrow="Category"
                title={category}
                href={`/remote-${categoryToSlug(category)}-jobs`}
                linkLabel={`All remote ${category} jobs`}
              />
              <JobList jobs={list} />
            </section>
          );
        })}

        {/* FAQ */}
        <section className="py-16">
          <FaqSection items={HOME_FAQ} />
        </section>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-ink-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <div className="mt-4 flex items-center gap-3">
          <span className="h-7 w-1.5 rounded-full bg-gradient-to-b from-brand-500 to-brand-300" aria-hidden />
          <h2 className="font-display text-[1.6rem] font-extrabold leading-none tracking-tight text-ink-900 md:text-[1.85rem]">
            {title}
          </h2>
        </div>
      </div>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 self-start rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 shadow-sm transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 hover:shadow-md sm:self-auto"
      >
        {linkLabel}
        <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
}
