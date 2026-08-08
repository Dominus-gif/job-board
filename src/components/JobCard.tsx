import Link from "next/link";
import type { Job } from "@/lib/types";
import { formatSalary, salaryTier } from "@/lib/salary";
import { timeAgo } from "@/lib/format";
import { CheckIcon, PinIcon } from "./icons";
import { CompanyLogo } from "./CompanyLogo";
import { JobCardActions } from "./JobCardActions";

/** Small filled star for the Featured badge. */
function StarBadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.5l2.9 6.06 6.6.86-4.85 4.54 1.24 6.54L12 17.9l-5.89 3.1 1.24-6.54L2.5 9.42l6.6-.86L12 2.5z" />
    </svg>
  );
}

export function JobCard({
  job,
  onSkillClick,
  activeSkills = [],
  inactive = false,
}: {
  job: Job;
  onSkillClick?: (skill: string) => void;
  activeSkills?: string[];
  inactive?: boolean;
}) {
  const salary = formatSalary(job.salary);
  const tier = salaryTier(job.salary);
  const active = new Set(activeSkills.map((s) => s.toLowerCase()));

  return (
    <Link
      href={`/jobs/${job.slug}`}
      className={`group relative flex items-start gap-4 rounded-xl border p-5 transition-colors duration-150 ${
        inactive
          ? "border-ink-100 bg-ink-50/60 opacity-75"
          : job.is_featured
            ? "border-ink-200 bg-ink-50 hover:bg-ink-100"
            : "border-ink-100 bg-white hover:border-ink-200 hover:bg-ink-50"
      }`}
    >
      <CompanyLogo
        src={job.company_logo}
        name={job.company_name}
        domain={job.company_domain}
        className="h-11 w-11 flex-shrink-0 rounded-lg border border-ink-100 bg-white object-contain p-1"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {inactive && (
            <span className="inline-flex items-center gap-1 rounded-md bg-ink-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-500 ring-1 ring-inset ring-ink-200">
              Closed
            </span>
          )}
          {!inactive && job.is_featured && (
            <span className="badge-featured">
              <StarBadgeIcon className="h-2.5 w-2.5" /> Featured
            </span>
          )}
          {!inactive && !job.is_featured && job.in_demand && (
            <span className="inline-flex items-center gap-1 rounded-md bg-ink-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-500 ring-1 ring-inset ring-ink-100">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
              Trending
            </span>
          )}
          <h3 className="truncate font-display text-[15px] font-semibold leading-snug text-ink-900 group-hover:text-brand-600">
            {job.title}
          </h3>
        </div>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-500">
          {job.company_name}
          {!inactive && job.verified && (
            <span className="inline-flex items-center text-brand-600" title="Verified — truly remote">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
          )}
        </p>

        {inactive && (
          <p className="mt-2 text-sm font-medium text-ink-500">
            This job listing is no longer accepting applications.
          </p>
        )}

        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          {job.scope === "regional" && (
            <span className="chip bg-amber-50 text-amber-800 ring-amber-200">
              <PinIcon className="h-3.5 w-3.5" /> {job.location}
            </span>
          )}
          <span className="chip">{job.employment_type}</span>
          <span className="chip">{job.category}</span>
          {/* Salary is shown in the right rail on ≥sm; surface it here on mobile. */}
          {salary && tier && (
            <span className={`chip font-semibold ring-1 ring-inset sm:hidden ${tier.chip}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${tier.dot}`} aria-hidden /> {salary}
            </span>
          )}
          {job.skills.slice(0, 4).map((s) =>
            onSkillClick ? (
              <button
                key={s}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSkillClick(s);
                }}
                className={`chip lowercase transition ${
                  active.has(s.toLowerCase())
                    ? "pill-on ring-0"
                    : "text-ink-500 hover:bg-ink-100 hover:text-ink-900"
                }`}
              >
                {s}
              </button>
            ) : (
              <span key={s} className="chip lowercase text-ink-500">{s}</span>
            )
          )}
        </div>

        {/* Mobile: bookmark + share (the right rail is hidden below sm). */}
        <div className="mt-4 flex sm:hidden">
          <JobCardActions job={job} />
        </div>
      </div>

      <div className="hidden flex-shrink-0 flex-col items-end gap-1.5 sm:flex">
        {salary && tier ? (
          <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${tier.chip}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${tier.dot}`} aria-hidden />
            {salary}
          </span>
        ) : (
          <span className="rounded-md bg-ink-50 px-2.5 py-1 text-xs text-ink-400 ring-1 ring-inset ring-ink-100">
            Salary undisclosed
          </span>
        )}
        {tier && <span className="text-[11px] font-medium uppercase tracking-wide text-ink-400">{tier.label} pay</span>}
        <time className="text-xs text-ink-400" dateTime={job.posted_at}>{timeAgo(job.posted_at)}</time>
        <div className="mt-1"><JobCardActions job={job} /></div>
      </div>
    </Link>
  );
}
