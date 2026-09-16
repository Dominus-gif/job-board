"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Select } from "@/components/ui/Select";
import type { SalaryBandData } from "@/lib/tool-data";
import { Histogram } from "@/components/viz/Histogram";
import { binValues, percentileRank, quantile } from "@/lib/stats";
import { Empty, Field, NumberInput, Stat, ToolCard, selectBtnClass } from "./kit";

const MIN_SAMPLE = 8;
const money = (n: number) => (n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${Math.round(n)}`);

export function SalaryBandEstimator({ data }: { data: SalaryBandData }) {
  const [cat, setCat] = useState("all");
  const [region, setRegion] = useState("all");
  const [level, setLevel] = useState("all");
  const [mine, setMine] = useState(Number.NaN);

  const catOpts = [{ value: "all", label: "All categories" }, ...data.categories.map((c, i) => ({ value: String(i), label: c }))];
  const regOpts = [{ value: "all", label: "Any region" }, ...data.regions.map((r, i) => ({ value: String(i), label: r === "Worldwide" ? "Work from anywhere" : r }))];
  const lvlOpts = [{ value: "all", label: "Any level" }, ...data.levels.map((l, i) => ({ value: String(i), label: l }))];

  const match = (row: SalaryBandData["rows"][number], ignoreLevel = false) =>
    (cat === "all" || row[0] === Number(cat)) &&
    (region === "all" || (row[1] & (1 << Number(region))) !== 0) &&
    (ignoreLevel || level === "all" || row[2] === Number(level));

  const values = useMemo(() => data.rows.filter((r) => match(r)).map((r) => r[3]).sort((a, b) => a - b), [data, cat, region, level]);

  const byLevel = useMemo(() => {
    return data.levels.map((label, i) => {
      const v = data.rows.filter((r) => match(r, true) && r[2] === i).map((r) => r[3]).sort((a, b) => a - b);
      return { label, i, n: v.length, median: v.length >= MIN_SAMPLE ? quantile(v, 0.5) : null, p25: v.length >= MIN_SAMPLE ? quantile(v, 0.25) : null, p75: v.length >= MIN_SAMPLE ? quantile(v, 0.75) : null };
    });
  }, [data, cat, region]);

  const enough = values.length >= MIN_SAMPLE;
  const p25 = quantile(values, 0.25);
  const med = quantile(values, 0.5);
  const p75 = quantile(values, 0.75);
  const bins = enough ? binValues(values, 14, undefined, undefined, 10_000) : [];
  const scaleMax = Math.max(1, ...byLevel.map((l) => l.p75 ?? 0));
  const catLabel = cat === "all" ? "remote" : data.categories[Number(cat)];
  const pct = mine > 0 && enough ? percentileRank(values, mine) : null;

  return (
    <div className="space-y-5">
      <ToolCard>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Field">{() => <Select value={cat} onValueChange={setCat} options={catOpts} ariaLabel="Job category" buttonClassName={selectBtnClass} />}</Field>
          <Field label="Where the role is open">{() => <Select value={region} onValueChange={setRegion} options={regOpts} ariaLabel="Region" buttonClassName={selectBtnClass} />}</Field>
          <Field label="Seniority">{() => <Select value={level} onValueChange={setLevel} options={lvlOpts} ariaLabel="Seniority" buttonClassName={selectBtnClass} />}</Field>
        </div>
        <div className="mt-4 max-w-xs">
          <Field label="Your current or target salary (optional, USD)" hint="See where it sits in this range.">
            {(id) => <NumberInput id={id} value={mine} onChange={setMine} step={5000} />}
          </Field>
        </div>
      </ToolCard>

      <ToolCard>
        <div aria-live="polite">
          {!enough ? (
            <Empty>
              Only {values.length} {values.length === 1 ? "listing" : "listings"} with published pay match these filters, too few for a fair range. Try a wider region or &ldquo;Any level&rdquo;.
            </Empty>
          ) : (
            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <Stat label="Lower quarter" value={money(p25)} sub="25% of listings pay less" />
                <Stat label="Median" value={money(med)} sub="the middle listing" />
                <Stat label="Upper quarter" value={money(p75)} sub="25% of listings pay more" />
              </div>
              <p className="text-sm text-ink-600">
                Based on <strong className="text-ink-900">{values.length.toLocaleString("en-US")}</strong> {catLabel} listings that publish a salary in US dollars (midpoint of each range).
                {pct != null && (
                  <>
                    {" "}
                    Your figure of <strong className="text-ink-900">{money(mine)}</strong> is higher than <strong className="text-ink-900">{pct}%</strong> of them.
                  </>
                )}
              </p>
              <Histogram
                bins={bins}
                format={money}
                unit={["listing", "listings"]}
                highlight={mine > 0 ? mine : med}
                markers={mine > 0 ? [{ value: mine, label: `Your figure: ${money(mine)}` }] : [{ value: med, label: `Median: ${money(med)}` }]}
                ariaLabel={`Distribution of published ${catLabel} salaries`}
                tableCaption="Number of listings in each salary range"
              />
            </div>
          )}
        </div>
      </ToolCard>

      <ToolCard>
        <h2 className="font-display text-base font-bold text-ink-900">How pay changes with seniority</h2>
        <p className="mt-1 text-sm text-ink-500">Middle half of published pay at each level, for the field and region you picked. Levels are read from job titles.</p>
        <ul className="viz mt-4 space-y-3">
          {byLevel.map((l) => (
            <li key={l.label}>
              <button
                type="button"
                onClick={() => setLevel(level === String(l.i) ? "all" : String(l.i))}
                className={`grid w-full grid-cols-[6.5rem_1fr_4.5rem] items-center gap-3 rounded-md px-1 py-1 text-left text-sm transition hover:bg-ink-50 ${level === String(l.i) ? "bg-ink-50" : ""}`}
                aria-pressed={level === String(l.i)}
              >
                <span className={level === String(l.i) ? "font-semibold text-ink-900" : "text-ink-700"}>{l.label}</span>
                <span className="relative h-3">
                  {l.median != null ? (
                    <>
                      <span
                        className="absolute inset-y-0 rounded-[4px]"
                        style={{
                          left: `${((l.p25 ?? 0) / scaleMax) * 100}%`,
                          width: `${Math.max(1, (((l.p75 ?? 0) - (l.p25 ?? 0)) / scaleMax) * 100)}%`,
                          background: level === String(l.i) ? "var(--viz-accent)" : "var(--viz-bar)",
                        }}
                      />
                      <span className="absolute -top-0.5 h-4 w-[2px]" style={{ left: `${(l.median / scaleMax) * 100}%`, background: "var(--viz-ink)" }} aria-hidden />
                    </>
                  ) : (
                    <span className="text-xs text-ink-400">not enough data</span>
                  )}
                </span>
                <span className="text-right text-xs tabular-nums text-ink-600">
                  {l.median != null ? money(l.median) : "—"}
                  <span className="block text-[10px] text-ink-400">n={l.n}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-500">Bar = lower to upper quarter, line = median. Select a level to filter the chart above.</p>
      </ToolCard>

      <p className="text-sm text-ink-500">
        Out of {data.totalListings.toLocaleString("en-US")} listings on the board, {data.rows.length.toLocaleString("en-US")} publish a usable US-dollar salary. Most of those are US-based roles, because US pay transparency laws are the main reason ranges get published. See{" "}
        <Link href="/posts/what-work-from-anywhere-jobs-pay" className="font-medium text-brand-600 hover:text-brand-700">
          what work-from-anywhere jobs pay
        </Link>{" "}
        for why that matters.
      </p>
    </div>
  );
}
