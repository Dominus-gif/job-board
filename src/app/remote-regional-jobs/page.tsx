import type { Metadata } from "next";
import Link from "next/link";
import { getRegionalJobs } from "@/lib/db";
import { JobBoard } from "@/components/JobBoard";
import { PinIcon, GlobeIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Remote — Regional Jobs (Country-Restricted Remote Roles)",
  description:
    "Fully remote jobs that are restricted to a specific country or region. For roles you can do from literally anywhere in the world, see our main board.",
  alternates: { canonical: "/remote-regional-jobs" },
};

export const revalidate = 1800;

export default async function RegionalJobsPage() {
  const jobs = await getRegionalJobs();

  return (
    <div>
      {/* Header band */}
      <section className="border-b border-amber-200 bg-amber-50/60">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <span className="eyebrow" style={{ color: "#a06d09" }}>
            <PinIcon className="h-3.5 w-3.5" /> Remote — Regional
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold text-ink-900 md:text-4xl">
            Remote jobs restricted to a country or region
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-600">
            These roles are <strong>fully remote</strong>, but the employer can only hire in a specific country or
            region (e.g. “Remote, US” or “Remote, EU”). They&apos;re kept separate so our main board stays 100%
            location-independent.
          </p>
          <div className="mt-5">
            <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800">
              <GlobeIcon className="h-4 w-4" /> See work-from-anywhere jobs instead
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <section className="pt-8">
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <PinIcon className="h-4 w-4 flex-shrink-0 text-amber-500" />
            Heads up: each role below lists the region you must be eligible to work in. Check the listing before applying.
          </div>
          {jobs.length > 0 ? (
            <JobBoard jobs={jobs} />
          ) : (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-10 text-center text-ink-500">
              No regional roles right now — check back soon.
            </div>
          )}
        </section>
        <div className="h-16" />
      </div>
    </div>
  );
}
