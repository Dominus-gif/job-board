import Link from "next/link";
import type { JobInsights as Insights } from "@/lib/insights";
import { compactMoney } from "@/lib/insights";
import { categoryToSlug } from "@/lib/taxonomy";
import { skillSlug } from "@/lib/landing";
import type { Category } from "@/lib/types";

/**
 * The market context for one listing — the part of a job page that is ours.
 *
 * Read as a block it answers the questions a description never does: is this
 * paid competitively, how much choice do I have if I pass on it, which of my
 * skills is actually carrying this search, and where do I have to live.
 *
 * Every figure is measured from the board's live corpus and the sample size is
 * printed alongside, so a reader can see how much weight to put on it. Where
 * the sample is too small to mean anything the field is absent rather than
 * hedged — see src/lib/insights.ts.
 */
export function JobInsightsPanel({ insights, category }: { insights: Insights; category: Category }) {
  const { salary, benchmark, comparable, skills, eligibility, age } = insights;

  // Nothing worth a section — a brand-new board with no comparable data.
  if (!salary && !benchmark && comparable < 3 && skills.length === 0) return null;

  const pct = salary?.percentile ?? 0;
  const band =
    pct >= 75 ? "top quartile" : pct >= 50 ? "above the median" : pct >= 25 ? "below the median" : "bottom quartile";

  return (
    <section className="mt-8 rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-base font-bold text-ink-900">How this role compares</h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">
          measured on this board
        </span>
      </div>
      <p className="mt-1.5 text-sm text-ink-500">
        Context you won&apos;t find on the employer&apos;s posting, calculated from every open{" "}
        {category} role we currently list.
      </p>

      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        {/* ── Pay ─────────────────────────────────────────────── */}
        {salary && (
          <div className="rounded-xl bg-ink-50 p-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500">Pay</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-ink-700">
              <strong className="font-semibold text-ink-900">{band}</strong> for {salary.category} — it sits at the{" "}
              <strong className="font-semibold text-ink-900">{salary.percentile}th percentile</strong> of the{" "}
              {salary.sample} comparable roles here, where the typical range is{" "}
              <span className="font-mono tabular-nums">
                {compactMoney(salary.typicalLow, salary.currency)}–{compactMoney(salary.typicalHigh, salary.currency)}
              </span>
              .
            </dd>
          </div>
        )}

        {benchmark && (
          <div className="rounded-xl bg-ink-50 p-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500">
              Pay — not stated by the employer
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-ink-700">
              Comparable {benchmark.category} roles on this board pay{" "}
              <span className="font-mono tabular-nums font-semibold text-ink-900">
                {compactMoney(benchmark.low, benchmark.currency)}–{compactMoney(benchmark.high, benchmark.currency)}
              </span>
              , median{" "}
              <span className="font-mono tabular-nums">{compactMoney(benchmark.median, benchmark.currency)}</span>.
              Worth knowing before the first call. Based on {benchmark.sample} listings that do state a range.
            </dd>
          </div>
        )}

        {/* ── Choice ──────────────────────────────────────────── */}
        {comparable >= 3 && (
          <div className="rounded-xl bg-ink-50 p-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500">Your alternatives</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-ink-700">
              <strong className="font-semibold text-ink-900">{comparable.toLocaleString()} other</strong>{" "}
              {eligibility.worldwide ? "work-from-anywhere" : "region-scoped"} {category}{" "}
              {comparable === 1 ? "role is" : "roles are"} open right now.{" "}
              <Link
                href={`/remote-${categoryToSlug(category)}-jobs`}
                className="font-semibold text-brand-700 underline-offset-2 hover:underline"
              >
                Compare them
              </Link>
              .
            </dd>
          </div>
        )}

        {/* ── Eligibility ─────────────────────────────────────── */}
        <div className="rounded-xl bg-ink-50 p-4 sm:col-span-2">
          <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500">Where you must live</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-ink-700">
            {eligibility.worldwide ? (
              <>
                <strong className="font-semibold text-ink-900">Anywhere.</strong> This role cleared our
                work-from-anywhere filter, which rejects any posting naming a country, a region, a timezone
                overlap or a right-to-work requirement.
              </>
            ) : eligibility.areas.length ? (
              <>
                <strong className="font-semibold text-ink-900">{eligibility.areas.join(", ")}.</strong> Remote,
                but the employer restricts applicants to that. Applying from outside it is usually wasted effort.
              </>
            ) : (
              <>
                The employer states a restriction we could not pin to a country. Read the posting before
                applying from abroad.
              </>
            )}
          </dd>
        </div>

        {/* ── Skill demand ────────────────────────────────────── */}
        {skills.length > 0 && (
          <div className="rounded-xl bg-ink-50 p-4 sm:col-span-2">
            <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500">
              What else these skills open up
            </dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {skills.map((s) => (
                <Link
                  key={s.skill}
                  href={`/${skillSlug(s.skill)}`}
                  className="inline-flex items-baseline gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-sm text-ink-700 ring-1 ring-inset ring-ink-100 transition hover:ring-ink-300"
                >
                  <span className="font-medium">{s.label}</span>
                  <span className="font-mono text-xs tabular-nums text-ink-500">{s.openings} more</span>
                </Link>
              ))}
            </dd>
          </div>
        )}
      </dl>

      <p className="mt-4 text-xs text-ink-400">
        Posted {age.days === 0 ? "today" : `${age.days} ${age.days === 1 ? "day" : "days"} ago`}
        {age.medianDays > 0 && (
          <>
            {" "}
            · the typical listing here is {age.medianDays} days old
            {age.days < age.medianDays ? ", so this one is fresher than most" : ""}
          </>
        )}
        . Figures recalculated on every rebuild.
      </p>
    </section>
  );
}
