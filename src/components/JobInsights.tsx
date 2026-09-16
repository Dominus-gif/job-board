"use client";

/**
 * The market context for one listing — the part of a job page that is ours.
 *
 * It answers the questions a description never does: is this paid
 * competitively, how much choice do I have if I pass on it, how fresh is it,
 * which of my skills is carrying this search, and where do I have to live.
 *
 * Every figure is measured from the board's live corpus (src/lib/insights.ts)
 * and the sample size sits next to it. The panel is interactive — tabs, a
 * chart with tooltips, a slider to place your own pay — but every panel is
 * rendered on the server too, so the text is there without JavaScript.
 */
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import type { JobInsights as Insights } from "@/lib/insights";
import type { Category } from "@/lib/types";
import { compactMoney } from "@/lib/stats";
import { Histogram } from "@/components/viz/Histogram";

type TabId = "pay" | "competition" | "freshness" | "skills";

const bandFor = (pct: number) =>
  pct >= 75 ? "top quartile" : pct >= 50 ? "above the median" : pct >= 25 ? "below the median" : "bottom quartile";

function rankIn(quantiles: number[], value: number): number {
  let i = 0;
  while (i < quantiles.length - 1 && quantiles[i + 1] <= value) i++;
  return value < quantiles[0] ? 0 : i;
}

function Tile({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="rounded-xl bg-ink-50 p-3.5">
      <p className="text-xs text-ink-500">{label}</p>
      <p className="mt-0.5 font-display text-2xl font-bold text-ink-900">{value}</p>
      {sub && <p className="text-xs text-ink-500">{sub}</p>}
    </div>
  );
}

function BarRow({ label, value, max, accent, right, href }: { label: ReactNode; value: number; max: number; accent?: boolean; right: ReactNode; href?: string }) {
  const body = (
    <>
      <span className={`truncate ${accent ? "font-semibold text-ink-900" : "text-ink-700"}`}>{label}</span>
      <span className="relative h-2.5">
        <span
          className="absolute inset-y-0 left-0 rounded-r-[4px] transition-[width] duration-500"
          style={{ width: `${max ? Math.max(2, (value / max) * 100) : 0}%`, background: accent ? "var(--viz-accent)" : "var(--viz-bar)" }}
        />
      </span>
      <span className="text-right text-xs tabular-nums text-ink-600">{right}</span>
    </>
  );
  const cls = "grid grid-cols-[minmax(0,9rem)_1fr_4.5rem] items-center gap-3 rounded-md px-1.5 py-1 text-sm sm:grid-cols-[11rem_1fr_5rem]";
  return href ? (
    <Link href={href} className={`${cls} transition hover:bg-ink-50`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export function JobInsightsPanel({ insights, category }: { insights: Insights; category: Category }) {
  const { salary, benchmark, pay, comparable, otherScope, newThisWeek, topCompanies, skills, eligibility, age } = insights;
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs: { id: TabId; label: string }[] = [
    { id: "pay", label: "Pay" },
    { id: "competition", label: "Competition" },
    { id: "freshness", label: "Freshness" },
    ...(skills.length ? [{ id: "skills" as TabId, label: "Skills" }] : []),
  ];
  const [tab, setTab] = useState<TabId>("pay");
  const reference = salary?.value ?? benchmark?.median ?? pay?.median ?? 0;
  const [mine, setMine] = useState<number>(reference);

  // Nothing worth a section — a brand-new board with no comparable data.
  if (!salary && !benchmark && comparable < 3 && skills.length === 0) return null;

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = tabs.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  const scopeWord = eligibility.worldwide ? "work-from-anywhere" : "region-locked";
  const otherWord = eligibility.worldwide ? "region-locked" : "work-from-anywhere";
  const maxCompany = Math.max(1, ...topCompanies.map((c) => c.count));
  const maxBucket = Math.max(1, ...age.buckets.map((b) => b.count));
  const maxSkill = Math.max(1, ...skills.map((s) => s.openings));
  const minePct = pay ? rankIn(pay.quantiles, mine) : 0;
  const sliderMin = pay ? Math.floor(pay.quantiles[2] / 5000) * 5000 : 0;
  const sliderMax = pay ? Math.ceil(pay.quantiles[98] / 5000) * 5000 : 0;

  return (
    <section className="viz mt-8 rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-6" aria-labelledby={`${baseId}-h`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id={`${baseId}-h`} className="font-display text-base font-bold text-ink-900">
          How this role compares
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500">measured on this board</span>
      </div>
      <p className="mt-1.5 text-sm text-ink-500">
        Context you won&apos;t find on the employer&apos;s posting, calculated from all {insights.categoryTotal.toLocaleString("en-US")} open {category} roles we list.
      </p>

      {/* Eligibility stays visible: it's the question that decides whether the rest matters. */}
      <div className={`mt-4 rounded-xl p-3.5 text-sm leading-relaxed ${eligibility.worldwide ? "tone-ok" : "tone-info"}`}>
        <span className="font-semibold">Where you must live: </span>
        {eligibility.worldwide ? (
          <>Anywhere. This role cleared our work-from-anywhere filter, which rejects any posting naming a country, a region, a timezone overlap or a right-to-work requirement.</>
        ) : eligibility.areas.length ? (
          <>
            {eligibility.areas.join(", ")}. Remote, but the employer restricts applicants to that, so applying from elsewhere is usually wasted effort.
          </>
        ) : (
          <>The employer states a restriction we couldn&apos;t pin to a country. Read the posting before applying from abroad.</>
        )}
      </div>

      <div role="tablist" aria-label="Comparison views" className="mt-5 flex gap-1 overflow-x-auto border-b border-ink-100">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${baseId}-tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`${baseId}-panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={`-mb-px whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition ${
              tab === t.id ? "border-ink-900 text-ink-900 dark:border-white" : "border-transparent text-ink-500 hover:text-ink-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Pay ─────────────────────────────────────────────── */}
      <div role="tabpanel" id={`${baseId}-panel-pay`} aria-labelledby={`${baseId}-tab-pay`} hidden={tab !== "pay"} className="pt-5">
        {pay ? (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-ink-700">
              {salary ? (
                <>
                  <strong className="font-semibold text-ink-900">{bandFor(salary.percentile).replace(/^./, (c) => c.toUpperCase())}</strong> for {category}. This role&apos;s midpoint of{" "}
                  <strong className="font-semibold text-ink-900">{compactMoney(salary.value)}</strong> is higher than {salary.percentile}% of the {salary.sample} comparable listings, where the typical range is{" "}
                  <span className="tabular-nums">
                    {compactMoney(salary.typicalLow)}–{compactMoney(salary.typicalHigh)}
                  </span>
                  .
                </>
              ) : (
                <>
                  The employer doesn&apos;t state pay. Comparable {category} roles on this board pay{" "}
                  <strong className="font-semibold text-ink-900 tabular-nums">
                    {compactMoney(pay.p25)}–{compactMoney(pay.p75)}
                  </strong>
                  , with a median of <span className="tabular-nums">{compactMoney(pay.median)}</span>. Worth knowing before the first call.
                </>
              )}
            </p>
            <Histogram
              bins={pay.bins}
              format={(n) => compactMoney(n)}
              unit={["listing", "listings"]}
              highlight={salary ? salary.value : mine}
              markers={[
                salary ? { value: salary.value, label: `This role: ${compactMoney(salary.value)}` } : { value: pay.median, label: `Median: ${compactMoney(pay.median)}` },
                ...(mine !== reference ? [{ value: mine, label: `Your figure: ${compactMoney(mine)}` }] : []),
              ]}
              ariaLabel={`Published pay for ${category} roles on this board`}
              tableCaption={`Number of ${category} listings in each pay range`}
            />
            <div className="rounded-xl bg-ink-50 p-3.5">
              <label htmlFor={`${baseId}-mine`} className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="font-medium text-ink-700">Place your own figure</span>
                <span className="tabular-nums text-ink-900">
                  <strong>{compactMoney(mine)}</strong> <span className="text-ink-500">· higher than {minePct}% of listings</span>
                </span>
              </label>
              <input
                id={`${baseId}-mine`}
                type="range"
                min={sliderMin}
                max={sliderMax}
                step={5000}
                value={Math.min(sliderMax, Math.max(sliderMin, mine))}
                onChange={(e) => setMine(Number(e.target.value))}
                className="tool-range mt-3"
              />
            </div>
            <p className="text-xs text-ink-500">
              Based on {pay.sample} {category} listings with a published US-dollar range (midpoints). {pay.publishedShare}% of {category} listings here publish pay at all.{" "}
              <Link href="/tools/salary-band-estimator" className="font-medium text-brand-600 hover:text-brand-700">
                Filter by level and region
              </Link>
              .
            </p>
          </div>
        ) : (
          <p className="text-sm text-ink-600">
            Too few {category} listings publish pay for a fair comparison yet. The{" "}
            <Link href="/tools/salary-band-estimator" className="font-medium text-brand-600 hover:text-brand-700">
              salary band estimator
            </Link>{" "}
            can compare across categories instead.
          </p>
        )}
      </div>

      {/* ── Competition ─────────────────────────────────────── */}
      <div role="tabpanel" id={`${baseId}-panel-competition`} aria-labelledby={`${baseId}-tab-competition`} hidden={tab !== "competition"} className="pt-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <Tile label={`Other ${scopeWord} ${category} roles`} value={comparable.toLocaleString("en-US")} sub="open right now" />
          <Tile label={`${category} roles that are ${otherWord}`} value={otherScope.toLocaleString("en-US")} sub={eligibility.worldwide ? "if you can meet a location rule" : "open to anyone, anywhere"} />
          <Tile label={`New ${category} roles`} value={newThisWeek.toLocaleString("en-US")} sub="posted in the last 7 days" />
        </div>
        {topCompanies.length > 1 && (
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-ink-900">Who&apos;s hiring most for {scopeWord} {category} roles</h3>
            <div className="mt-2 space-y-0.5">
              {topCompanies.map((c) => (
                <BarRow
                  key={c.slug}
                  label={
                    <>
                      {c.name}
                      {c.isThis && <span className="ml-1.5 text-[11px] font-normal text-ink-500">this employer</span>}
                    </>
                  }
                  value={c.count}
                  max={maxCompany}
                  accent={c.isThis}
                  right={`${c.count} ${c.count === 1 ? "role" : "roles"}`}
                  href={`/companies/${c.slug}`}
                />
              ))}
            </div>
          </div>
        )}
        <p className="mt-4 text-sm">
          <Link href={insights.categoryHref} className="font-semibold text-brand-600 hover:text-brand-700">
            Compare all {category} roles →
          </Link>
        </p>
      </div>

      {/* ── Freshness ───────────────────────────────────────── */}
      <div role="tabpanel" id={`${baseId}-panel-freshness`} aria-labelledby={`${baseId}-tab-freshness`} hidden={tab !== "freshness"} className="pt-5">
        <p className="text-sm leading-relaxed text-ink-700">
          Posted <strong className="font-semibold text-ink-900">{age.days === 0 ? "today" : `${age.days} ${age.days === 1 ? "day" : "days"} ago`}</strong>. The typical listing on this board is {age.medianDays} days old, and this one is fresher than{" "}
          <strong className="font-semibold text-ink-900">{age.fresherThan}%</strong> of them.
          {age.days > 30 && " Roles this old are more often filled, so check it's still open on the employer's own site before you invest time."}
        </p>
        <div className="mt-4 space-y-0.5">
          {age.buckets.map((b) => {
            const here = age.days >= b.from && age.days < (b.label.startsWith("Over") ? Infinity : b.to);
            return (
              <BarRow
                key={b.label}
                label={
                  <>
                    {b.label}
                    {here && <span className="ml-1.5 text-[11px] font-normal text-ink-500">this role</span>}
                  </>
                }
                value={b.count}
                max={maxBucket}
                accent={here}
                right={b.count.toLocaleString("en-US")}
              />
            );
          })}
        </div>
        <p className="mt-3 text-xs text-ink-500">
          Listings on the whole board by age. Early applications are usually read before a shortlist forms.{" "}
          <Link href="/posts/the-date-posted-problem-why-freshness-matters" className="font-medium text-brand-600 hover:text-brand-700">
            Why freshness matters
          </Link>
          .
        </p>
      </div>

      {/* ── Skills ──────────────────────────────────────────── */}
      {skills.length > 0 && (
        <div role="tabpanel" id={`${baseId}-panel-skills`} aria-labelledby={`${baseId}-tab-skills`} hidden={tab !== "skills"} className="pt-5">
          <p className="text-sm text-ink-700">How many other open roles ask for each skill this listing names, and how common it is in {category} roles.</p>
          <div className="mt-3 space-y-0.5">
            {skills.map((s, i) => (
              <BarRow
                key={s.skill}
                label={s.label}
                value={s.openings}
                max={maxSkill}
                accent={i === 0}
                right={`${s.openings.toLocaleString("en-US")} · ${s.share}%`}
                href={s.href}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-500">Second figure: share of {category} listings that mention the skill. Select a skill to see those roles.</p>
        </div>
      )}
    </section>
  );
}
