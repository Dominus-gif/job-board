"use client";

import { useEffect, useMemo, useState } from "react";
import { Select } from "@/components/ui/Select";
import {
  CITIES,
  bestWindow,
  coverage,
  hhmm,
  localTime,
  overlap,
  utcWindow,
  zoneLabel,
  type Member,
} from "@/lib/toolkit/timezones";
import { Chip, Field, ToolCard, fieldClass, ghostButtonClass, newId, selectBtnClass } from "./kit";

const CITY_OPTIONS = CITIES.map((c) => ({ value: c.zone, label: c.label }));
const HOUR_OPTIONS = Array.from({ length: 48 }, (_, i) => ({ value: String(i * 30), label: hhmm(i * 30) }));
const MAX_MEMBERS = 8;

const START: Member[] = [
  { id: "a", name: "You", zone: "Europe/Lisbon", start: 540, end: 1020 },
  { id: "b", name: "Product lead", zone: "America/New_York", start: 540, end: 1020 },
  { id: "c", name: "Engineer", zone: "Asia/Kolkata", start: 600, end: 1080 },
];

const today = () => new Date().toISOString().slice(0, 10);
const hours = (mins: number) => {
  const h = mins / 60;
  const n = Number.isInteger(h) ? String(h) : h.toFixed(1);
  return `${n} ${h === 1 ? "hour" : "hours"}`;
};

export function TeamTimezoneMatrix() {
  const [members, setMembers] = useState<Member[]>(START);
  const [day, setDay] = useState("2026-01-15");
  const [viewPick, setViewZone] = useState(START[0].zone);
  // Pick today's date after hydration so server and client render the same markup first.
  useEffect(() => setDay(today()), []);

  const viewZone = members.some((m) => m.zone === viewPick) ? viewPick : members[0].zone;
  const cov = useMemo(() => coverage(members, day), [members, day]);
  const best = useMemo(() => bestWindow(cov), [cov]);
  const windows = useMemo(() => members.map((m) => utcWindow(m, day)), [members, day]);

  // Rotate the 48 UTC slots so the grid starts at 00:00 in the chosen view zone.
  const viewOffsetSlots = useMemo(() => {
    const t = localTime(0, viewZone, day); // what 00:00 UTC is in the view zone
    const mins = Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
    return ((48 - Math.round(mins / 30)) % 48 + 48) % 48;
  }, [viewZone, day]);
  const slotOrder = Array.from({ length: 48 }, (_, i) => (i + viewOffsetSlots) % 48);

  const update = (id: string, patch: Partial<Member>) => setMembers((ms) => ms.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  const everyone = members.length;

  return (
    <div className="space-y-5">
      <ToolCard>
        <div className="flex flex-wrap items-end gap-4">
          <Field label="Date" hint="Offsets follow daylight saving on this date.">
            {(id) => <input id={id} type="date" value={day} onChange={(e) => e.target.value && setDay(e.target.value)} className={fieldClass} />}
          </Field>
          <Field label="Show the grid in">
            {() => (
              <Select
                value={viewZone}
                onValueChange={setViewZone}
                options={members.map((m) => ({ value: m.zone, label: `${m.name} (${CITIES.find((c) => c.zone === m.zone)?.label ?? m.zone})` })).filter((o, i, a) => a.findIndex((x) => x.value === o.value) === i)}
                ariaLabel="Time zone for the grid"
                buttonClassName={selectBtnClass}
              />
            )}
          </Field>
        </div>

        <ul className="mt-5 space-y-3">
          {members.map((m) => (
            <li key={m.id} className="grid gap-2 rounded-xl bg-ink-50 p-3 sm:grid-cols-[1fr_1.3fr_6rem_6rem_auto] sm:items-end">
              <Field label="Name">{(id) => <input id={id} value={m.name} onChange={(e) => update(m.id, { name: e.target.value })} className={fieldClass} />}</Field>
              <Field label={`City (${zoneLabel(m.zone, day)})`}>
                {() => <Select value={m.zone} onValueChange={(v) => update(m.id, { zone: v })} options={CITY_OPTIONS} ariaLabel={`${m.name} city`} buttonClassName={selectBtnClass} />}
              </Field>
              <Field label="Starts">{() => <Select value={String(m.start)} onValueChange={(v) => update(m.id, { start: Number(v) })} options={HOUR_OPTIONS} ariaLabel={`${m.name} start time`} buttonClassName={selectBtnClass} />}</Field>
              <Field label="Ends">{() => <Select value={String(m.end)} onValueChange={(v) => update(m.id, { end: Number(v) })} options={HOUR_OPTIONS} ariaLabel={`${m.name} end time`} buttonClassName={selectBtnClass} />}</Field>
              <button
                type="button"
                disabled={members.length <= 2}
                onClick={() => setMembers((ms) => ms.filter((x) => x.id !== m.id))}
                className={`${ghostButtonClass} sm:mb-0.5`}
                aria-label={`Remove ${m.name}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`${ghostButtonClass} mt-3`}
          disabled={members.length >= MAX_MEMBERS}
          onClick={() => setMembers((ms) => [...ms, { id: newId(), name: `Teammate ${ms.length + 1}`, zone: "Asia/Singapore", start: 540, end: 1020 }])}
        >
          Add a teammate
        </button>
      </ToolCard>

      <ToolCard>
        <div aria-live="polite">
          {best ? (
            <div className={`tone-${best.count === everyone ? "ok" : "medium"} rounded-xl p-4`}>
              <p className="font-display text-lg font-bold">
                {best.count === everyone
                  ? `Everyone overlaps for ${hours(best.to - best.from)}`
                  : `No time works for all ${everyone}. Best case: ${best.count} people for ${hours(best.to - best.from)}`}
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                {members.map((m) => (
                  <li key={m.id}>
                    <span className="font-semibold">{m.name}:</span> {localTime(best.from, m.zone, day)}–{localTime(best.to, m.zone, day)}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="tone-critical rounded-xl p-4 text-sm font-semibold">Nobody is working at the same time. Shift someone&apos;s hours or plan a written handover.</p>
          )}
        </div>

        <div className="viz relative mt-5 overflow-x-auto">
          <table className="w-full min-w-[38rem] table-fixed border-separate border-spacing-0 text-xs">
            <caption className="sr-only">Working hours by person, in half-hour slots</caption>
            <thead>
              <tr>
                <th className="w-28 pb-1 pr-2 text-left font-medium text-ink-500">Time in {CITIES.find((c) => c.zone === viewZone)?.label}</th>
                {slotOrder.map((s, i) => (
                  <th key={s} className="pb-1 text-left font-normal tabular-nums text-ink-500" scope="col">
                    {i % 6 === 0 ? <span className="-ml-1">{hhmm(i * 30).slice(0, 2)}</span> : <span className="sr-only">{hhmm(i * 30)}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m, mi) => (
                <tr key={m.id}>
                  <th scope="row" className="truncate py-0.5 pr-2 text-left font-medium text-ink-700">{m.name}</th>
                  {slotOrder.map((s) => {
                    const on = cov[s][mi];
                    const all = cov[s].every(Boolean);
                    return (
                      <td key={s} className="px-[1px] py-0.5" title={`${m.name}: ${on ? "working" : "off"} at ${localTime(s * 30, m.zone, day)} their time`}>
                        <span className="block h-5 rounded-[3px]" style={{ background: on ? (all ? "var(--viz-accent)" : "var(--viz-bar)") : "var(--viz-surface)" }} />
                        <span className="sr-only">{on ? "working" : "off"}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <th scope="row" className="pt-2 pr-2 text-left font-medium text-ink-500">Available</th>
                {slotOrder.map((s) => {
                  const n = cov[s].filter(Boolean).length;
                  return (
                    <td key={s} className="pt-2 text-center tabular-nums text-[10px] text-ink-500">{n || ""}</td>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <p className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-500">
            <span className="inline-flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded-[3px]" style={{ background: "var(--viz-accent)" }} /> everyone working</span>
            <span className="inline-flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded-[3px]" style={{ background: "var(--viz-bar)" }} /> working</span>
          </p>
        </div>
      </ToolCard>

      <ToolCard>
        <h2 className="font-display text-base font-bold text-ink-900">Overlap between each pair</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[22rem] text-sm">
            <thead>
              <tr>
                <th />
                {members.map((m) => (
                  <th key={m.id} scope="col" className="px-2 pb-2 text-left text-xs font-medium text-ink-500">{m.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((a, i) => (
                <tr key={a.id} className="border-t border-ink-100">
                  <th scope="row" className="py-2 pr-2 text-left text-xs font-medium text-ink-700">{a.name}</th>
                  {members.map((b, j) => {
                    if (i === j) return <td key={b.id} className="px-2 py-2 text-ink-400">—</td>;
                    const h = overlap(windows[i], windows[j]) / 60;
                    const tone = h >= 4 ? "ok" : h >= 2 ? "medium" : h > 0 ? "high" : "critical";
                    return (
                      <td key={b.id} className="px-2 py-2">
                        <Chip tone={tone}>{h === 0 ? "none" : `${Number.isInteger(h) ? h : h.toFixed(1)}h`}</Chip>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink-500">Four hours or more is comfortable for most collaborative teams; under two means leaning on written handovers.</p>
      </ToolCard>
    </div>
  );
}
