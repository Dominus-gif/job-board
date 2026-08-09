"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "../icons";

interface Zone { city: string; tz: string; }

const CATALOG: Zone[] = [
  { city: "Los Angeles", tz: "America/Los_Angeles" },
  { city: "Denver", tz: "America/Denver" },
  { city: "Chicago", tz: "America/Chicago" },
  { city: "New York", tz: "America/New_York" },
  { city: "Toronto", tz: "America/Toronto" },
  { city: "Mexico City", tz: "America/Mexico_City" },
  { city: "São Paulo", tz: "America/Sao_Paulo" },
  { city: "London", tz: "Europe/London" },
  { city: "Lisbon", tz: "Europe/Lisbon" },
  { city: "Dublin", tz: "Europe/Dublin" },
  { city: "Berlin", tz: "Europe/Berlin" },
  { city: "Paris", tz: "Europe/Paris" },
  { city: "Madrid", tz: "Europe/Madrid" },
  { city: "Amsterdam", tz: "Europe/Amsterdam" },
  { city: "Warsaw", tz: "Europe/Warsaw" },
  { city: "Stockholm", tz: "Europe/Stockholm" },
  { city: "Athens", tz: "Europe/Athens" },
  { city: "Istanbul", tz: "Europe/Istanbul" },
  { city: "Dubai", tz: "Asia/Dubai" },
  { city: "Karachi", tz: "Asia/Karachi" },
  { city: "Bengaluru", tz: "Asia/Kolkata" },
  { city: "Singapore", tz: "Asia/Singapore" },
  { city: "Hong Kong", tz: "Asia/Hong_Kong" },
  { city: "Shanghai", tz: "Asia/Shanghai" },
  { city: "Tokyo", tz: "Asia/Tokyo" },
  { city: "Seoul", tz: "Asia/Seoul" },
  { city: "Sydney", tz: "Australia/Sydney" },
  { city: "Auckland", tz: "Pacific/Auckland" },
];

const DEFAULT: Zone[] = [
  { city: "New York", tz: "America/New_York" },
  { city: "London", tz: "Europe/London" },
  { city: "Berlin", tz: "Europe/Berlin" },
  { city: "Bengaluru", tz: "Asia/Kolkata" },
  { city: "Singapore", tz: "Asia/Singapore" },
];

const mod = (n: number, m: number) => ((n % m) + m) % m;
const pad = (n: number) => String(n).padStart(2, "0");

function offsetHours(tz: string, at: Date): number {
  const s = new Date(at.toLocaleString("en-US", { timeZone: tz })).getTime();
  const u = new Date(at.toLocaleString("en-US", { timeZone: "UTC" })).getTime();
  return Math.round(((s - u) / 3600000) * 4) / 4;
}

function nowMinutesIn(tz: string, at: Date): number {
  const p = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour12: false, hour: "2-digit", minute: "2-digit" }).formatToParts(at);
  const hh = Number(p.find((x) => x.type === "hour")?.value) % 24;
  const mm = Number(p.find((x) => x.type === "minute")?.value);
  return hh * 60 + mm;
}

function gmtLabel(off: number): string {
  const sign = off >= 0 ? "+" : "−";
  const h = Math.floor(Math.abs(off));
  const m = Math.round((Math.abs(off) - h) * 60);
  return `GMT${sign}${h}${m ? ":" + pad(m) : ""}`;
}

// Day/night colour band for a given local hour.
function bandClass(hr: number): string {
  if (hr >= 9 && hr <= 17) return "bg-brand-50"; // working day
  if ((hr >= 6 && hr <= 8) || (hr >= 18 && hr <= 20)) return "bg-ink-50"; // shoulder
  return "bg-ink-100"; // night
}

/* ------------------------------ city picker ------------------------------ */
function CityPicker({ available, onAdd }: { available: Zone[]; onAdd: (tz: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const filtered = available.filter((c) => c.city.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700 transition hover:bg-ink-50 hover:text-ink-900"
      >
        <span className="text-base leading-none">+</span> Add city
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-ink-100 bg-white shadow-lift">
          <div className="flex items-center gap-2 border-b border-ink-100 px-3 py-2.5">
            <SearchIcon className="h-4 w-4 text-ink-400" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search cities…"
              className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
            />
          </div>
          <div className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-4 text-center text-sm text-ink-400">No cities found</p>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.tz}
                  type="button"
                  onClick={() => { onAdd(c.tz); setOpen(false); setQ(""); }}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-ink-700 transition hover:bg-ink-50 hover:text-ink-900"
                >
                  {c.city}
                  <span className="text-xs text-ink-400">{c.tz.split("/")[0]}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ main widget ------------------------------ */
export function WorldTimeBuddy() {
  const [zones, setZones] = useState<Zone[]>(DEFAULT);
  const [now, setNow] = useState<Date>(() => new Date());
  const [selMin, setSelMin] = useState<number | null>(null); // null = follow "now"

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && !DEFAULT.some((z) => z.tz === tz)) {
        const city = tz.split("/").pop()?.replace(/_/g, " ") ?? tz;
        setZones([{ city, tz }, ...DEFAULT]);
      }
    } catch { /* keep default */ }
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const home = zones[0];
  const homeOff = useMemo(() => (home ? offsetHours(home.tz, now) : 0), [home, now]);
  const nowHomeMin = useMemo(() => (home ? nowMinutesIn(home.tz, now) : 0), [home, now]);
  const refMin = selMin ?? nowHomeMin; // the reference time in home-zone minutes
  const scrubbed = selMin !== null && Math.abs(selMin - nowHomeMin) > 2;

  const available = CATALOG.filter((c) => !zones.some((z) => z.tz === c.tz));
  const RULER = [0, 3, 6, 9, 12, 15, 18, 21, 24];

  function remove(tz: string) { setZones((zs) => (zs.length > 1 ? zs.filter((z) => z.tz !== tz) : zs)); }
  function addCity(tz: string) { const z = CATALOG.find((c) => c.tz === tz); if (z) setZones((zs) => [...zs, z]); }

  if (!home) return null;

  // Time in a zone at the reference minute (relative to home).
  const zoneAt = (tz: string) => {
    const off = offsetHours(tz, now);
    const total = refMin + (off - homeOff) * 60;
    const dd = Math.floor(total / 1440);
    const min = mod(total, 1440);
    return { off, label: `${pad(Math.floor(min / 60))}:${pad(min % 60)}`, dd };
  };

  const selPct = (refMin / 1440) * 100;
  const nowPct = (nowHomeMin / 1440) * 100;
  const homeRef = zoneAt(home.tz);

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 px-5 py-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
            {scrubbed ? "Selected time" : "Right now"} · {home.city}
          </div>
          <div className="mt-0.5 font-display text-2xl font-bold tabular-nums text-ink-900">
            {homeRef.label}
            {scrubbed && <span className="ml-2 align-middle text-xs font-medium text-ink-400">drag to explore</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {scrubbed && (
            <button
              type="button"
              onClick={() => setSelMin(null)}
              className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700 transition hover:bg-ink-50 hover:text-ink-900"
            >
              Now
            </button>
          )}
          <CityPicker available={available} onAdd={addCity} />
        </div>
      </div>

      <div className="overflow-x-auto px-5 py-5">
        <div className="min-w-[680px]">
          {/* Ruler + slider */}
          <div className="flex items-end gap-4 pb-3">
            <div className="w-48 flex-shrink-0" />
            <div className="flex-1">
              <div className="relative flex justify-between text-[10px] font-medium tabular-nums text-ink-400">
                {RULER.map((h) => <span key={h}>{pad(h % 24)}</span>)}
              </div>
              <input
                type="range"
                min={0}
                max={1439}
                step={15}
                value={refMin}
                onChange={(e) => setSelMin(Number(e.target.value))}
                aria-label="Select a time"
                className="wtb-range mt-2"
              />
            </div>
            <div className="w-6 flex-shrink-0" />
          </div>

          {/* City rows */}
          <div className="divide-y divide-ink-100 border-t border-ink-100">
            {zones.map((zone, zi) => {
              const info = zoneAt(zone.tz);
              const diff = info.off - homeOff;
              return (
                <div key={zone.tz} className="group flex items-center gap-4 py-3">
                  <div className="w-48 flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate font-medium text-ink-900">{zone.city}</span>
                      {zi === 0 && <span className="rounded bg-ink-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-500">You</span>}
                    </div>
                    <div className="mt-0.5 flex items-baseline gap-2">
                      <span className="font-display text-lg font-semibold tabular-nums text-ink-900">{info.label}</span>
                      <span className="text-xs text-ink-400">
                        {gmtLabel(info.off)}{info.dd !== 0 ? ` · ${info.dd > 0 ? "+" : "−"}1d` : ""}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex-1">
                    <div className="flex h-11 overflow-hidden rounded-lg ring-1 ring-inset ring-ink-100">
                      {Array.from({ length: 24 }, (_, c) => {
                        const hr = mod(Math.floor(c + (info.off - homeOff)), 24);
                        return <div key={c} className={`flex-1 ${bandClass(hr)}`} />;
                      })}
                    </div>
                    {/* current-time marker (subtle) */}
                    <div className="pointer-events-none absolute inset-y-0 w-px bg-ink-300" style={{ left: `${nowPct}%` }} />
                    {/* selection line + handle */}
                    <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-ink-900 dark:bg-[#f6f6f4]" style={{ left: `${selPct}%` }}>
                      <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-ink-900 ring-2 ring-white dark:bg-[#f6f6f4] dark:ring-[#202020]" />
                    </div>
                  </div>

                  <div className="w-6 flex-shrink-0">
                    {zi > 0 && (
                      <button
                        type="button"
                        onClick={() => remove(zone.tz)}
                        aria-label={`Remove ${zone.city}`}
                        className="flex h-7 w-6 items-center justify-center rounded text-ink-300 opacity-0 transition hover:bg-ink-50 hover:text-ink-700 group-hover:opacity-100"
                      >
                        <CloseIcon className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-ink-500">
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-brand-50 ring-1 ring-inset ring-ink-100" /> Working hours</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-ink-50 ring-1 ring-inset ring-ink-100" /> Morning / evening</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-ink-100" /> Night</span>
          </div>
        </div>
      </div>
    </div>
  );
}
