import Link from "next/link";
import { getAllJobs, getCompanies, getJobsByCategory, getSubscriberCount } from "@/lib/db";
import { categoryToSlug } from "@/lib/taxonomy";
import { CategoryBar } from "@/components/CategoryBar";
import { JobList } from "@/components/JobList";
import { JobBoard } from "@/components/JobBoard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Faq } from "@/components/Faq";
import { AdSlot } from "@/components/AdSlot";

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
  const previews = await Promise.all(
    PREVIEW_ORDER.map(async (category) => ({ category, list: (await getJobsByCategory(category)).slice(0, 4) }))
  );

  const stats = [
    [jobs.length.toString(), "open roles"],
    [companies.length.toString(), "hiring companies"],
    ["Earth", "your only limit"],
  ] as const;

  return (
    <div>
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
              Every job here is{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                truly location-independent
              </span>
              .
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-500 md:text-lg">
              Verified remote roles with no country, region, or timezone strings attached — pulled straight from
              company hiring systems and enriched with salary, skills, and benefits.
            </p>

            <div className="mx-auto mt-6 max-w-lg">
              <NewsletterForm buttonLabel="Get weekly jobs" />
              <p className="mt-2 text-xs text-ink-400">
                Join {subscribers.toLocaleString("en-US")} subscribers · one email a week · no spam
              </p>
            </div>

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
          <SectionHeader eyebrow="Live feed" title="All jobs" href="/page/1" linkLabel="Paginated view" />
          <JobBoard jobs={jobs} />
        </section>

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
                linkLabel={`All ${category}`}
              />
              <JobList jobs={list} />
            </section>
          );
        })}

        {/* FAQ */}
        <section className="py-16">
          <div className="mb-6">
            <span className="eyebrow">Questions</span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ink-900">Frequently asked</h2>
          </div>
          <Faq items={HOME_FAQ} />
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
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-1.5 font-display text-2xl font-extrabold text-ink-900">{title}</h2>
      </div>
      <Link href={href} className="whitespace-nowrap text-sm font-semibold text-brand-700 hover:text-brand-800">
        {linkLabel} →
      </Link>
    </div>
  );
}
