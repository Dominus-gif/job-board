"use client";

import { useEffect, useMemo, useState } from "react";
import { Select } from "@/components/ui/Select";
import { offsetMinutes } from "@/lib/toolkit/timezones";

/**
 * Common remote hubs, as IANA zones.
 *
 * These used to be fixed standard-time offsets, which put London and Sydney an
 * hour wrong for months of every year and could not represent the weeks when
 * Europe and the US change their clocks on different Sundays. Offsets now come
 * from the browser's time zone database on today's date.
 */
const ZONES: { city: string; zone: string }[] = [
  { city: "Los Angeles", zone: "America/Los_Angeles" },
  { city: "New York", zone: "America/New_York" },
  { city: "London", zone: "Europe/London" },
  { city: "Berlin / Paris", zone: "Europe/Berlin" },
  { city: "Lisbon", zone: "Europe/Lisbon" },
  { city: "Dubai", zone: "Asia/Dubai" },
  { city: "Bengaluru", zone: "Asia/Kolkata" },
  { city: "Singapore", zone: "Asia/Singapore" },
  { city: "Sydney", zone: "Australia/Sydney" },
];

const selectBtn = "!rounded-md !px-3 !py-2 text-sm font-normal !text-ink-900";

// Working hours 9:00–17:00 local, in minutes after midnight.
const WORK_START = 9 * 60;
const WORK_END = 17 * 60;

/**
 * The server has to render something before the browser knows today's date,
 * and it must match the browser's first render exactly. A fixed mid-January
 * instant does that; the real date replaces it once the page is running.
 */
const FIRST_RENDER = new Date("2026-01-15T12:00:00Z");

function utcLabel(offset: number): string {
  const sign = offset >= 0 ? "+" : "−";
  const h = Math.floor(Math.abs(offset) / 60);
  const m = Math.abs(offset) % 60;
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, "0")}` : ""}`;
}

const clock = (mins: number) => {
  const m = ((mins % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

/**
 * Shared 9-to-5 time for two offsets, and where it falls on A's clock.
 *
 * Windows are compared in UTC and tried a day either side, because a team
 * whose morning is your previous evening still overlaps with you: 3pm in Los
 * Angeles is 9am the next day in Sydney.
 */
export function workingOverlap(offA: number, offB: number): { minutes: number; from: number | null; to: number | null } {
  const a: [number, number] = [WORK_START - offA, WORK_END - offA];
  const b: [number, number] = [WORK_START - offB, WORK_END - offB];
  let best = { minutes: 0, from: null as number | null, to: null as number | null };
  for (const day of [-1440, 0, 1440]) {
    const lo = Math.max(a[0], b[0] + day);
    const hi = Math.min(a[1], b[1] + day);
    if (hi - lo > best.minutes) best = { minutes: hi - lo, from: lo + offA, to: hi + offA };
  }
  return best;
}

export function TimezoneOverlap() {
  const [a, setA] = useState(1); // New York
  const [b, setB] = useState(3); // Berlin
  const [at, setAt] = useState(FIRST_RENDER);
  useEffect(() => setAt(new Date()), []);

  const offsets = useMemo(() => ZONES.map((z) => offsetMinutes(z.zone, at)), [at]);
  const options = useMemo(
    () => ZONES.map((z, i) => ({ value: String(i), label: `${z.city} (${utcLabel(offsets[i])})` })),
    [offsets],
  );
  const result = useMemo(() => workingOverlap(offsets[a], offsets[b]), [offsets, a, b]);
  const hours = Math.round((result.minutes / 60) * 10) / 10;

  return (
    <div className="rounded-xl border border-ink-100 bg-white p-6 shadow-card">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink-700">
          You are in
          <Select value={String(a)} onValueChange={(v) => setA(Number(v))} options={options} ariaLabel="Your timezone" buttonClassName={selectBtn} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink-700">
          Team / employer in
          <Select value={String(b)} onValueChange={(v) => setB(Number(v))} options={options} ariaLabel="Team / employer timezone" buttonClassName={selectBtn} />
        </label>
      </div>

      <div className="mt-6 rounded-lg bg-ink-50 p-5 text-center">
        {result.minutes > 0 && result.from != null && result.to != null ? (
          <>
            <p className="font-display text-3xl font-bold text-ink-900">
              {hours} {hours === 1 ? "hour" : "hours"}
            </p>
            <p className="mt-1 text-sm text-ink-500">
              of overlapping 9–5 working time · around{" "}
              <strong className="font-semibold text-ink-700">
                {clock(result.from)}–{clock(result.to)}
              </strong>{" "}
              your time
            </p>
          </>
        ) : (
          <p className="text-sm text-ink-500">No 9–5 overlap — a work-from-anywhere role with no timezone requirement is your best bet.</p>
        )}
      </div>
      <p className="mt-3 text-xs text-ink-400">Based on 9:00–17:00 local hours, with daylight saving applied as it stands today.</p>
    </div>
  );
}
