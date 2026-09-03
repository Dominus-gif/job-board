"use client";

import { useMemo, useState } from "react";
import { Select } from "@/components/ui/Select";

// Common remote hubs as UTC offsets (standard time; indicative).
const ZONES: { label: string; offset: number }[] = [
  { label: "Los Angeles (UTC−8)", offset: -8 },
  { label: "New York (UTC−5)", offset: -5 },
  { label: "London (UTC+0)", offset: 0 },
  { label: "Berlin / Paris (UTC+1)", offset: 1 },
  { label: "Lisbon (UTC+0)", offset: 0 },
  { label: "Dubai (UTC+4)", offset: 4 },
  { label: "Bengaluru (UTC+5.5)", offset: 5.5 },
  { label: "Singapore (UTC+8)", offset: 8 },
  { label: "Sydney (UTC+10)", offset: 10 },
];

const ZONE_OPTIONS = ZONES.map((z, i) => ({ value: String(i), label: z.label }));
const selectBtn = "!rounded-md !px-3 !py-2 text-sm font-normal !text-ink-900";

// Working hours 9:00–17:00 local.
const WORK_START = 9;
const WORK_END = 17;

export function TimezoneOverlap() {
  const [a, setA] = useState(1); // New York
  const [b, setB] = useState(3); // Berlin

  const result = useMemo(() => {
    const za = ZONES[a];
    const zb = ZONES[b];
    // Express B's working window in A's local hours, then intersect with A's window.
    const shift = zb.offset - za.offset; // hours B is ahead of A
    const bStartInA = WORK_START - shift;
    const bEndInA = WORK_END - shift;
    const start = Math.max(WORK_START, bStartInA);
    const end = Math.min(WORK_END, bEndInA);
    const hours = Math.max(0, end - start);
    const fmt = (h: number) => {
      const hh = ((Math.floor(h) % 24) + 24) % 24;
      return `${String(hh).padStart(2, "0")}:${h % 1 ? "30" : "00"}`;
    };
    return { hours, aWindow: hours > 0 ? `${fmt(start)}–${fmt(end)}` : null, za, zb, shift };
  }, [a, b]);

  return (
    <div className="rounded-xl border border-ink-100 bg-white p-6 shadow-card">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink-700">
          You are in
          <Select value={String(a)} onValueChange={(v) => setA(Number(v))} options={ZONE_OPTIONS} ariaLabel="Your timezone" buttonClassName={selectBtn} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink-700">
          Team / employer in
          <Select value={String(b)} onValueChange={(v) => setB(Number(v))} options={ZONE_OPTIONS} ariaLabel="Team / employer timezone" buttonClassName={selectBtn} />
        </label>
      </div>

      <div className="mt-6 rounded-lg bg-ink-50 p-5 text-center">
        {result.hours > 0 ? (
          <>
            <p className="font-display text-3xl font-bold text-ink-900">{result.hours} {result.hours === 1 ? "hour" : "hours"}</p>
            <p className="mt-1 text-sm text-ink-500">
              of overlapping 9–5 working time · around <strong className="font-semibold text-ink-700">{result.aWindow}</strong> your time
            </p>
          </>
        ) : (
          <p className="text-sm text-ink-500">
            No 9–5 overlap — a work-from-anywhere role with no timezone requirement is your best bet.
          </p>
        )}
      </div>
      <p className="mt-3 text-xs text-ink-400">Based on 9:00–17:00 local hours and standard-time offsets (ignores daylight saving).</p>
    </div>
  );
}
