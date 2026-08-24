import type { Job } from "@/lib/types";
import { JobCard } from "./JobCard";

export function JobList({
  jobs,
  emptyLabel = "No jobs found — check back soon.",
  inactive = false,
  highlightQuery,
}: {
  jobs: Job[];
  emptyLabel?: string;
  inactive?: boolean;
  highlightQuery?: string;
}) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-ink-200 bg-white p-10 text-center text-ink-500">
        {emptyLabel}
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <JobCard key={job.slug} job={job} inactive={inactive} highlightQuery={highlightQuery} />
      ))}
    </div>
  );
}
