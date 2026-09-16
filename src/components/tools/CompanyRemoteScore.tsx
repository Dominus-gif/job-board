"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CompanyScoreData, CompanyStat } from "@/lib/tool-data";
import { Chip, Segmented, ToolCard, fieldClass, type Tone } from "./kit";

export interface ScoreParts {
  freedom: number;
  reach: number;
  pay: number;
  activity: number;
  total: number;
}

/** Transparent 0–100 score. The explainer on the page documents every weight. */
export function scoreCompany(c: CompanyStat, regions: string[]): ScoreParts {
  const wwIndex = regions.indexOf("Worldwide");
  const regionHits = c.regionCounts.reduce((n, count, i) => n + (count > 0 ? (i === wwIndex ? 2 : 1) : 0), 0);
  const freedom = (c.worldwide / c.roles) * 50;
  const reach = Math.min(1, regionHits / 4) * 20;
  const pay = (c.withPay / c.roles) * 15;
  const activity = (c.last30 / c.roles) * 15;
  return { freedom, reach, pay, activity, total: Math.round(freedom + reach + pay + activity) };
}

const toneFor = (score: number): Tone => (score >= 60 ? "ok" : score >= 35 ? "medium" : "neutral");
type SortKey = "score" | "worldwide" | "roles";

export function CompanyRemoteScore({ data }: { data: CompanyScoreData }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("score");
  const [selected, setSelected] = useState<string | null>(null);

  const scored = useMemo(
    () => data.companies.map((c) => ({ c, s: scoreCompany(c, data.regions) })),
    [data],
  );

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q ? scored.filter((x) => x.c.name.toLowerCase().includes(q)) : scored;
    const key = (x: (typeof scored)[number]) => (sort === "score" ? x.s.total : sort === "worldwide" ? x.c.worldwide : x.c.roles);
    return [...filtered].sort((a, b) => key(b) - key(a) || b.c.roles - a.c.roles).slice(0, q ? 30 : 15);
  }, [scored, query, sort]);

  const current = scored.find((x) => x.c.slug === (selected ?? list[0]?.c.slug));
  const withWorldwide = data.companies.filter((c) => c.worldwide > 0).length;

  return (
    <div className="space-y-5">
      <ToolCard>
        <label htmlFor="company-q" className="text-sm font-medium text-ink-700">
          Find a company
        </label>
        <input
          id="company-q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a company name…"
          className={`${fieldClass} mt-1.5`}
          autoComplete="off"
        />
        <p className="mt-2 text-xs text-ink-500">
          Covers the {data.companies.length.toLocaleString("en-US")} employers with at least {data.minRoles} open roles on our board (out of {data.boardCompanies.toLocaleString("en-US")} in total). {withWorldwide} of them have at least one work-from-anywhere role right now.
        </p>
      </ToolCard>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <ToolCard>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-base font-bold text-ink-900">{query.trim() ? "Matches" : "Leaderboard"}</h2>
            <Segmented
              size="sm"
              ariaLabel="Sort companies"
              value={sort}
              onChange={setSort}
              options={[
                { value: "score", label: "Score" },
                { value: "worldwide", label: "Worldwide" },
                { value: "roles", label: "Roles" },
              ]}
            />
          </div>
          {list.length === 0 ? (
            <p className="mt-4 text-sm text-ink-500">No company with {data.minRoles}+ open roles matches that name.</p>
          ) : (
            <ol className="mt-3 divide-y divide-ink-100">
              {list.map(({ c, s }, i) => {
                const active = current?.c.slug === c.slug;
                return (
                  <li key={c.slug}>
                    <button
                      type="button"
                      onClick={() => setSelected(c.slug)}
                      aria-pressed={active}
                      className={`grid w-full grid-cols-[1.5rem_1fr_auto] items-center gap-3 rounded-md px-2 py-2 text-left transition hover:bg-ink-50 ${active ? "bg-ink-50" : ""}`}
                    >
                      <span className="text-xs tabular-nums text-ink-500">{i + 1}</span>
                      <span className="min-w-0">
                        <span className={`block truncate text-sm ${active ? "font-semibold text-ink-900" : "text-ink-800"}`}>{c.name}</span>
                        <span className="block text-xs text-ink-500">
                          {c.worldwide} of {c.roles} worldwide
                        </span>
                      </span>
                      <Chip tone={toneFor(s.total)}>{s.total}</Chip>
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
        </ToolCard>

        {current && (
          <ToolCard>
            <div aria-live="polite" className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold text-ink-900">{current.c.name}</h2>
                  <p className="text-sm text-ink-500">
                    {current.c.roles} open roles across {current.c.categories} {current.c.categories === 1 ? "category" : "categories"}
                  </p>
                </div>
                <div className={`tone-${toneFor(current.s.total)} rounded-xl px-3 py-2 text-center`}>
                  <p className="font-display text-3xl font-bold leading-none tabular-nums">{current.s.total}</p>
                  <p className="text-[11px] font-semibold">of 100</p>
                </div>
              </div>

              <ul className="viz space-y-2.5">
                {[
                  { label: "Location freedom", value: current.s.freedom, max: 50, note: `${Math.round((current.c.worldwide / current.c.roles) * 100)}% of roles open worldwide` },
                  { label: "Hiring reach", value: current.s.reach, max: 20, note: `${current.c.regionCounts.filter((n) => n > 0).length} regions` },
                  { label: "Pay transparency", value: current.s.pay, max: 15, note: `${Math.round((current.c.withPay / current.c.roles) * 100)}% of roles show pay` },
                  { label: "Hiring activity", value: current.s.activity, max: 15, note: `${current.c.last30} posted in the last 30 days` },
                ].map((p) => (
                  <li key={p.label} className="grid grid-cols-[7.5rem_1fr_3rem] items-center gap-3 text-sm">
                    <span className="text-ink-700">{p.label}</span>
                    <span className="relative h-2.5 rounded-full" style={{ background: "var(--viz-surface)" }}>
                      <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${(p.value / p.max) * 100}%`, background: "var(--viz-accent)" }} />
                    </span>
                    <span className="text-right text-xs tabular-nums text-ink-600">
                      {Math.round(p.value)}/{p.max}
                    </span>
                    <span className="col-span-3 -mt-1.5 text-xs text-ink-500">{p.note}</span>
                  </li>
                ))}
              </ul>

              <div>
                <h3 className="text-sm font-semibold text-ink-900">Where its roles are open</h3>
                <ul className="viz mt-2 space-y-1.5">
                  {data.regions
                    .map((r, i) => ({ r, n: current.c.regionCounts[i] }))
                    .filter((x) => x.n > 0)
                    .sort((a, b) => b.n - a.n)
                    .map((x) => (
                      <li key={x.r} className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3 text-sm">
                        <span className="text-ink-700">{x.r === "Worldwide" ? "Anywhere" : x.r}</span>
                        <span className="relative h-2.5">
                          <span
                            className="absolute inset-y-0 left-0 rounded-r-[4px]"
                            style={{ width: `${(x.n / current.c.roles) * 100}%`, background: x.r === "Worldwide" ? "var(--viz-accent)" : "var(--viz-bar)" }}
                          />
                        </span>
                        <span className="text-right text-xs tabular-nums text-ink-600">{x.n}</span>
                      </li>
                    ))}
                </ul>
                {current.c.regionCounts.every((n) => n === 0) && <p className="mt-1 text-xs text-ink-500">The locations on its listings don&apos;t name a region we recognise.</p>}
              </div>

              <p className="text-sm text-ink-600">
                The typical listing from this employer is {current.c.medianAge} days old, and {current.c.last7} {current.c.last7 === 1 ? "was" : "were"} posted in the last week.
              </p>
              <Link href={`/companies/${current.c.slug}`} className="inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700">
                See {current.c.name}&apos;s open roles →
              </Link>
            </div>
          </ToolCard>
        )}
      </div>
    </div>
  );
}
