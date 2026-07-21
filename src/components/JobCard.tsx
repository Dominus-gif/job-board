import Link from "next/link";
import type { Job } from "@/lib/types";
import { formatSalary, salaryTier } from "@/lib/salary";
import { timeAgo } from "@/lib/format";
import { CheckIcon } from "./icons";
import { CompanyLogo } from "./CompanyLogo";

export function JobCard({
  job,
  onSkillClick,
  activeSkills = [],
}: {
  job: Job;
  onSkillClick?: (skill: string) => void;
  activeSkills?: string[];
}) {
  const salary = formatSalary(job.salary);
  const tier = salaryTier(job.salary);
  const active = new Set(activeSkills.map((s) => s.toLowerCase()));

  return (
    <Link
      href={`/jobs/${job.slug}`}
      className={`group relative flex items-start gap-5 rounded-2xl border p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift ${
        job.is_featured
          ? "border-accent-200 bg-gradient-to-br from-accent-50/70 to-white ring-1 ring-inset ring-accent-100 hover:border-accent-300"
          : "border-ink-100 bg-white hover:border-brand-300 hover:ring-2 hover:ring-brand-100"
      }`}
    >
      <CompanyLogo
        src={job.company_logo}
        name={job.company_name}
        className="h-[52px] w-[52px] flex-shrink-0 rounded-xl border border-ink-100 bg-white object-contain p-1 transition group-hover:border-brand-200"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {job.is_featured && (
            <span className="rounded-md bg-accent-400 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink-900">
              Featured
            </span>
          )}
          {!job.is_featured && job.in_demand && (
            <span className="badge-trending inline-flex items-center gap-1 rounded-md bg-accent-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent-600 ring-1 ring-inset ring-accent-300">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500 [animation:trending-blink_1.1s_ease-in-out_infinite]" aria-hidden />
              Trending
            </span>
          )}
          <h3 className="truncate font-display text-[17px] font-bold leading-snug text-ink-900 group-hover:text-brand-700">
            {job.title}
          </h3>
        </div>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-500">
          {job.company_name}
          {job.verified && (
            <span className="inline-flex items-center text-brand-600" title="Verified — truly remote">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
          )}
        </p>

        <div className="mt-3.5 flex flex-wrap items-center gap-2">
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
                    ? "bg-brand-600 text-white ring-brand-600"
                    : "text-ink-500 hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200"
                }`}
              >
                {s}
              </button>
            ) : (
              <span key={s} className="chip lowercase text-ink-500">{s}</span>
            )
          )}
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
      </div>
    </Link>
  );
}
