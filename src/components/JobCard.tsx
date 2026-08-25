import Link from "next/link";
import type { Job } from "@/lib/types";
import { formatSalary, salaryTier } from "@/lib/salary";
import { timeAgo } from "@/lib/format";
import { CheckIcon, PinIcon } from "./icons";
import { CompanyLogo } from "./CompanyLogo";
import { JobCardActions } from "./JobCardActions";
import { StatusBadge } from "./StatusBadge";

const NEW_MS = 5 * 24 * 60 * 60 * 1000;

/** Wrap every case-insensitive occurrence of `q` in <mark> (search highlight). */
function highlight(text: string, q?: string): React.ReactNode {
  const needle = q?.trim().toLowerCase();
  if (!needle) return text;
  const lower = text.toLowerCase();
  const parts: React.ReactNode[] = [];
  let i = 0;
  let k = 0;
  while (i < text.length) {
    const idx = lower.indexOf(needle, i);
    if (idx < 0) {
      parts.push(text.slice(i));
      break;
    }
    if (idx > i) parts.push(text.slice(i, idx));
    parts.push(<mark key={k++} className="hl">{text.slice(idx, idx + needle.length)}</mark>);
    i = idx + needle.length;
  }
  return <>{parts}</>;
}

/** Small 3-segment pay meter (shape, not colour, carries the signal). */
function PayMeter({ segments, className = "" }: { segments: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-hidden>
      {[1, 2, 3].map((n) => (
        <span key={n} className={`h-2.5 w-1 rounded-sm ${n <= segments ? "bg-current" : "bg-current opacity-25"}`} />
      ))}
    </span>
  );
}

export function JobCard({
  job,
  onSkillClick,
  activeSkills = [],
  inactive = false,
  highlightQuery,
}: {
  job: Job;
  onSkillClick?: (skill: string) => void;
  activeSkills?: string[];
  inactive?: boolean;
  highlightQuery?: string;
}) {
  const salary = formatSalary(job.salary);
  const tier = salaryTier(job.salary);
  const active = new Set(activeSkills.map((s) => s.toLowerCase()));
  const isNew = !job.is_featured && Date.now() - new Date(job.posted_at).getTime() < NEW_MS;
  // A skill tag matching the search query is why many cards surface — surface it.
  const needle = highlightQuery?.trim().toLowerCase();
  const skillMatches = (s: string) => !!needle && s.toLowerCase().includes(needle);

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
          {!inactive && job.is_featured && <StatusBadge kind="featured" />}
          {!inactive && isNew && <StatusBadge kind="new" />}
          <h3 className="truncate font-display text-[15px] font-semibold leading-snug text-ink-900 group-hover:text-brand-600">
            {highlight(job.title, highlightQuery)}
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
            <span title={tier.hint} className={`chip font-semibold ring-1 ring-inset sm:hidden ${tier.chip}`}>
              <PayMeter segments={tier.segments} /> {salary}
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
              <span key={s} className={`chip lowercase ${skillMatches(s) ? "chip-match" : "text-ink-500"}`}>
                {s}
              </span>
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
          <span title={tier.hint} className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${tier.chip}`}>
            <PayMeter segments={tier.segments} />
            {salary}
          </span>
        ) : (
          <span className="rounded-md bg-ink-50 px-2.5 py-1 text-xs text-ink-500 ring-1 ring-inset ring-ink-100">
            Salary undisclosed
          </span>
        )}
        {tier && (
          <span title={tier.hint} className="inline-flex cursor-help items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-ink-500">
            <span className={tier.text}>{tier.glyph}</span> {tier.label} pay
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-ink-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" strokeLinecap="round" /></svg>
          </span>
        )}
        <time className="text-xs text-ink-400" dateTime={job.posted_at}>{timeAgo(job.posted_at)}</time>
        <div className="mt-1"><JobCardActions job={job} /></div>
      </div>
    </Link>
  );
}
