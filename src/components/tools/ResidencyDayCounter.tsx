"use client";

import { useEffect, useMemo, useState } from "react";
import { PRICE_LEVELS } from "@/lib/data/price-levels";
import { countDays, parseDay, tripDays, type Trip } from "@/lib/toolkit/residency";
import { Chip, Empty, Field, NumberInput, Segmented, ToolCard, buttonClass, downloadFile, fieldClass, ghostButtonClass, loadJson, newId, saveJson } from "./kit";

const KEY = "grjn:residency-trips:v1";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const COUNTRY_NAMES = PRICE_LEVELS.map((c) => c.name);

const EXAMPLE: Trip[] = [
  { id: "e1", country: "Portugal", from: "2026-01-10", to: "2026-04-30" },
  { id: "e2", country: "Spain", from: "2026-05-01", to: "2026-06-15" },
  { id: "e3", country: "Portugal", from: "2026-06-16", to: "2026-09-30" },
];

export function ResidencyDayCounter() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [countArrival, setCountArrival] = useState<"yes" | "no">("yes");
  const [countDeparture, setCountDeparture] = useState<"yes" | "no">("yes");
  const [threshold, setThreshold] = useState(183);
  const [draft, setDraft] = useState<Trip>({ id: "", country: "", from: "", to: "" });
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setTrips(loadJson<Trip[]>(KEY, []));
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) saveJson(KEY, trips);
  }, [trips, loaded]);

  const opts = { countArrival: countArrival === "yes", countDeparture: countDeparture === "yes", threshold };
  const totals = useMemo(() => countDays(trips, opts), [trips, countArrival, countDeparture, threshold]);

  const years = useMemo(() => [...new Set(totals.flatMap((t) => Object.keys(t.byYear).map(Number)))].sort(), [totals]);
  const shownYear = year && years.includes(year) ? year : years[years.length - 1] ?? new Date().getUTCFullYear();

  const monthGrid = useMemo(() => {
    const grid = new Map<string, number[]>();
    for (const t of trips) {
      const row = grid.get(t.country.trim()) ?? Array(12).fill(0);
      grid.set(t.country.trim(), row);
    }
    // Recount per month without double-counting overlapping trips.
    const seen = new Map<string, Set<number>>();
    for (const t of trips) {
      const name = t.country.trim();
      const set = seen.get(name) ?? new Set<number>();
      for (const d of tripDays(t, opts)) set.add(d);
      seen.set(name, set);
    }
    for (const [name, set] of seen) {
      const row = Array(12).fill(0);
      for (const d of set) {
        const date = new Date(d * 86_400_000);
        if (date.getUTCFullYear() === shownYear) row[date.getUTCMonth()]++;
      }
      grid.set(name, row);
    }
    return grid;
  }, [trips, shownYear, countArrival, countDeparture]);

  const draftError =
    draft.from && draft.to && (parseDay(draft.to) ?? 0) < (parseDay(draft.from) ?? 0) ? "The end date is before the start date." : "";
  const canAdd = draft.country.trim() && parseDay(draft.from) != null && parseDay(draft.to) != null && !draftError;

  const add = () => {
    if (!canAdd) return;
    setTrips((ts) => [...ts, { ...draft, id: newId(), country: draft.country.trim() }].sort((a, b) => a.from.localeCompare(b.from)));
    setDraft({ id: "", country: draft.country, from: "", to: "" });
  };

  const exportCsv = () => {
    const lines = ["country,from,to", ...trips.map((t) => `"${t.country.replace(/"/g, '""')}",${t.from},${t.to}`)];
    downloadFile("trips.csv", lines.join("\n"));
  };

  return (
    <div className="space-y-5">
      <ToolCard>
        <h2 className="font-display text-base font-bold text-ink-900">Add a stay</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-[1.3fr_1fr_1fr_auto] sm:items-end">
          <Field label="Country">
            {(id) => (
              <>
                <input id={id} list="residency-countries" value={draft.country} onChange={(e) => setDraft({ ...draft, country: e.target.value })} placeholder="e.g. Portugal" className={fieldClass} />
                <datalist id="residency-countries">
                  {COUNTRY_NAMES.map((n) => (
                    <option key={n} value={n} />
                  ))}
                </datalist>
              </>
            )}
          </Field>
          <Field label="Arrived">{(id) => <input id={id} type="date" value={draft.from} onChange={(e) => setDraft({ ...draft, from: e.target.value })} className={fieldClass} />}</Field>
          <Field label="Left">{(id) => <input id={id} type="date" value={draft.to} onChange={(e) => setDraft({ ...draft, to: e.target.value })} className={fieldClass} />}</Field>
          <button type="button" className={buttonClass} onClick={add} disabled={!canAdd}>
            Add
          </button>
        </div>
        {draftError && <p className="mt-2 text-sm font-medium tone-critical inline-block rounded px-2 py-0.5">{draftError}</p>}

        <div className="mt-5 flex flex-wrap items-end gap-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink-700">Count arrival day</span>
            <Segmented size="sm" ariaLabel="Count arrival day" value={countArrival} onChange={setCountArrival} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink-700">Count departure day</span>
            <Segmented size="sm" ariaLabel="Count departure day" value={countDeparture} onChange={setCountDeparture} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
          </div>
          <div className="w-32">
            <Field label="Warning at">{(id) => <NumberInput id={id} value={threshold} onChange={(n) => setThreshold(Math.max(1, n))} suffix="days" />}</Field>
          </div>
        </div>

        {trips.length > 0 ? (
          <ul className="mt-5 divide-y divide-ink-100 border-t border-ink-100">
            {trips.map((t) => {
              const n = tripDays(t, opts).length;
              return (
                <li key={t.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2.5 text-sm">
                  <span className="min-w-[8rem] font-medium text-ink-900">{t.country}</span>
                  <span className="tabular-nums text-ink-600">
                    {t.from} → {t.to}
                  </span>
                  <span className="tabular-nums text-ink-500">{n} {n === 1 ? "day" : "days"}</span>
                  <button type="button" className="ml-auto text-sm font-medium text-ink-500 hover:text-ink-900" onClick={() => setTrips((ts) => ts.filter((x) => x.id !== t.id))} aria-label={`Remove ${t.country} ${t.from}`}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-5">
            <Empty>
              No stays yet.{" "}
              <button type="button" className="font-semibold text-brand-600 hover:text-brand-700" onClick={() => setTrips(EXAMPLE)}>
                Load an example
              </button>
            </Empty>
          </div>
        )}
        {trips.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={ghostButtonClass} onClick={exportCsv}>Export CSV</button>
            <button type="button" className={ghostButtonClass} onClick={() => confirm("Remove all stays from this browser?") && setTrips([])}>Clear all</button>
          </div>
        )}
        <p className="mt-3 text-xs text-ink-500">Your stays are saved in this browser only. Nothing is uploaded.</p>
      </ToolCard>

      {totals.length > 0 && (
        <ToolCard>
          <div aria-live="polite" className="space-y-4">
            <h2 className="font-display text-base font-bold text-ink-900">Days by country</h2>
            <ul className="space-y-3">
              {totals.map((t) => {
                const maxYear = Math.max(0, ...Object.values(t.byYear));
                const worst = Math.max(maxYear, t.maxRolling);
                const tone = worst >= threshold ? "critical" : worst >= threshold * 0.8 ? "medium" : "ok";
                return (
                  <li key={t.country} className="rounded-xl bg-ink-50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-display text-base font-bold text-ink-900">{t.country}</span>
                      <Chip tone={tone}>
                        {worst >= threshold ? `Reaches ${threshold} days` : `${threshold - worst} days to go`}
                      </Chip>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white dark:bg-black/30">
                      <div className={`tone-${tone} h-full rounded-full`} style={{ width: `${Math.min(100, (worst / threshold) * 100)}%`, background: "var(--tone)" }} />
                    </div>
                    <p className="mt-2 text-sm text-ink-700">
                      Busiest 12 months: <strong className="text-ink-900">{t.maxRolling}</strong> days
                      {t.maxRollingFrom && <span className="text-ink-500"> (from {t.maxRollingFrom})</span>}.{" "}
                      {Object.entries(t.byYear)
                        .map(([y, n]) => `${y}: ${n} days`)
                        .join(" · ")}
                    </p>
                  </li>
                );
              })}
            </ul>

            {years.length > 0 && (
              <div className="viz">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-ink-900">Month by month</h3>
                  {years.length > 1 && (
                    <Segmented size="sm" ariaLabel="Year" value={String(shownYear)} onChange={(v) => setYear(Number(v))} options={years.map((y) => ({ value: String(y), label: String(y) }))} />
                  )}
                </div>
                <div className="relative mt-2 overflow-x-auto">
                  <table className="w-full min-w-[34rem] border-separate border-spacing-[2px] text-xs">
                    <caption className="sr-only">Days per month in {shownYear}</caption>
                    <thead>
                      <tr>
                        <th className="text-left font-medium text-ink-500">{shownYear}</th>
                        {MONTHS.map((m) => (
                          <th key={m} className="font-medium text-ink-500">{m}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[...monthGrid.entries()].map(([name, row]) => (
                        <tr key={name}>
                          <th scope="row" className="truncate pr-2 text-left font-medium text-ink-700">{name}</th>
                          {row.map((n, i) => (
                            <td key={i} className="relative h-8 rounded-[3px] text-center tabular-nums" style={{ background: "var(--viz-surface)" }}>
                              <span aria-hidden className="absolute inset-0 rounded-[3px]" style={{ background: "var(--viz-accent)", opacity: n ? 0.12 + (n / 31) * 0.43 : 0 }} />
                              <span className={`relative text-ink-900 ${n > 18 ? "font-semibold" : ""}`}>{n || ""}</span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <p className="text-xs text-ink-500">
              Day counts are arithmetic, not a residency decision. Countries use different tests (days, a home, family, where your income comes from) and different ways of counting travel days.
            </p>
          </div>
        </ToolCard>
      )}
    </div>
  );
}
