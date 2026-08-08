import type { Metadata } from "next";
import Link from "next/link";
import { getArchivedJobs } from "@/lib/db";
import { JobList } from "@/components/JobList";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Inactive & Archived Remote Jobs",
  description:
    "Remote job listings that have been closed, removed, or stopped accepting applications. Kept for reference.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/archived" },
};

export default async function ArchivedPage() {
  const all = await getArchivedJobs();
  const jobs = all.slice(0, 80);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="eyebrow">Archive</span>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900">Inactive &amp; archived listings</h1>
      <p className="mt-2 max-w-2xl text-ink-500">
        These roles were removed or stopped accepting applications. They&apos;re kept here for reference — you can no
        longer apply. Looking for open roles?{" "}
        <Link href="/page/1" className="font-medium text-brand-600 hover:text-brand-700">Browse all remote jobs</Link>.
      </p>

      <div className="mt-8">
        {jobs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-ink-200 bg-white p-12 text-center text-ink-500">
            Nothing archived right now — every known listing is still active.
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-ink-500">
              {all.length.toLocaleString("en-US")} archived {all.length === 1 ? "listing" : "listings"}
              {all.length > jobs.length ? ` · showing the ${jobs.length} most recent` : ""}
            </p>
            <JobList jobs={jobs} inactive />
          </>
        )}
      </div>
    </div>
  );
}
