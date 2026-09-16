"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Select } from "@/components/ui/Select";
import { Chip, Empty, Field, ToolCard, buttonClass, downloadFile, fieldClass, ghostButtonClass, loadJson, newId, saveJson, selectBtnClass, type Tone } from "./kit";

const KEY = "grjn:applications:v1";

export const STATUSES = ["Saved", "Applied", "Screening", "Interviewing", "Offer", "Closed"] as const;
type Status = (typeof STATUSES)[number];

const STATUS_TONE: Record<Status, Tone> = {
  Saved: "neutral",
  Applied: "info",
  Screening: "medium",
  Interviewing: "medium",
  Offer: "ok",
  Closed: "neutral",
};

export interface Application {
  id: string;
  company: string;
  role: string;
  link: string;
  applied: string;
  status: Status;
  nextAction: string;
  nextDate: string;
  salary: string;
  location: string;
  notes: string;
}

const COLUMNS: (keyof Application)[] = ["company", "role", "link", "applied", "status", "nextAction", "nextDate", "salary", "location", "notes"];

const blank = (): Application => ({
  id: "",
  company: "",
  role: "",
  link: "",
  applied: new Date().toISOString().slice(0, 10),
  status: "Applied",
  nextAction: "Follow up",
  nextDate: new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10),
  salary: "",
  location: "",
  notes: "",
});

const csvCell = (raw: string) => {
  // Neutralise spreadsheet formulas in exported text.
  const v = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
};

export function toCsv(apps: Application[]): string {
  return [COLUMNS.join(","), ...apps.map((a) => COLUMNS.map((c) => csvCell(String(a[c] ?? ""))).join(","))].join("\n");
}

/** Minimal RFC 4180 parser: quoted fields, escaped quotes, newlines inside quotes. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim()));
}

export function fromCsv(text: string): Application[] {
  const [head, ...rows] = parseCsv(text);
  if (!head) return [];
  const idx = COLUMNS.map((c) => head.findIndex((h) => h.trim().toLowerCase() === c.toLowerCase()));
  return rows.map((r) => {
    const a = blank();
    COLUMNS.forEach((c, i) => {
      if (idx[i] >= 0) (a as unknown as Record<string, string>)[c] = r[idx[i]] ?? "";
    });
    a.id = newId();
    if (!STATUSES.includes(a.status)) a.status = "Applied";
    return a;
  });
}

const today = () => new Date().toISOString().slice(0, 10);

export function ApplicationTracker() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState<Application | null>(null);
  const [filter, setFilter] = useState<Status | "all" | "due">("all");
  const [now, setNow] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setApps(loadJson<Application[]>(KEY, []));
    setNow(today());
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) saveJson(KEY, apps);
  }, [apps, loaded]);

  const counts = useMemo(() => Object.fromEntries(STATUSES.map((s) => [s, apps.filter((a) => a.status === s).length])) as Record<Status, number>, [apps]);
  const due = apps.filter((a) => a.status !== "Closed" && a.nextDate && now && a.nextDate <= now);
  const sent = apps.filter((a) => a.status !== "Saved").length;
  const responded = counts.Screening + counts.Interviewing + counts.Offer;

  const visible = useMemo(() => {
    const list = filter === "all" ? apps : filter === "due" ? due : apps.filter((a) => a.status === filter);
    return [...list].sort((a, b) => {
      const ca = a.status === "Closed" ? 1 : 0;
      const cb = b.status === "Closed" ? 1 : 0;
      return ca - cb || (a.nextDate || "9999").localeCompare(b.nextDate || "9999");
    });
  }, [apps, filter, due]);

  const save = () => {
    if (!editing || !editing.company.trim()) return;
    setApps((list) => (editing.id ? list.map((a) => (a.id === editing.id ? editing : a)) : [...list, { ...editing, id: newId() }]));
    setEditing(null);
  };

  const importFile = async (file: File) => {
    const rows = fromCsv(await file.text());
    if (rows.length) setApps((list) => [...list, ...rows]);
  };

  const maxCount = Math.max(1, ...STATUSES.map((s) => counts[s]));

  return (
    <div className="space-y-5">
      <ToolCard>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-base font-bold text-ink-900">Your pipeline</h2>
            <p className="text-sm text-ink-500">
              {apps.length} tracked · {sent ? `${Math.round((responded / sent) * 100)}% of sent applications got a response` : "nothing sent yet"}
              {due.length > 0 && <> · <strong className="text-ink-900">{due.length} follow-up{due.length === 1 ? "" : "s"} due</strong></>}
            </p>
          </div>
          <button type="button" className={buttonClass} onClick={() => setEditing(blank())}>
            Add application
          </button>
        </div>

        <div className="viz mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6" role="group" aria-label="Filter by status">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(filter === s ? "all" : s)}
              aria-pressed={filter === s}
              className={`rounded-lg p-2 text-left transition hover:bg-ink-50 ${filter === s ? "bg-ink-50 ring-1 ring-inset ring-ink-200" : ""}`}
            >
              <span className="block text-xs text-ink-500">{s}</span>
              <span className="block font-display text-xl font-bold tabular-nums text-ink-900">{counts[s]}</span>
              <span className="mt-1 block h-1.5 rounded-full" style={{ background: "var(--viz-surface)" }}>
                <span className="block h-full rounded-full" style={{ width: `${(counts[s] / maxCount) * 100}%`, background: filter === s ? "var(--viz-accent)" : "var(--viz-bar)" }} />
              </span>
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <button type="button" className={ghostButtonClass} onClick={() => setFilter(filter === "due" ? "all" : "due")} aria-pressed={filter === "due"}>
            {filter === "due" ? "Show all" : `Show due follow-ups (${due.length})`}
          </button>
          <button type="button" className={ghostButtonClass} onClick={() => downloadFile("applications.csv", toCsv(apps))} disabled={!apps.length}>
            Export CSV
          </button>
          <button type="button" className={ghostButtonClass} onClick={() => fileRef.current?.click()}>
            Import CSV
          </button>
          <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => e.target.files?.[0] && importFile(e.target.files[0])} />
        </div>
      </ToolCard>

      {editing && (
        <ToolCard>
          <h2 className="font-display text-base font-bold text-ink-900">{editing.id ? "Edit application" : "New application"}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {([
              ["company", "Company"],
              ["role", "Role title"],
              ["link", "Link to the employer's posting"],
              ["salary", "Salary (range or notes)"],
              ["location", "Location terms"],
              ["nextAction", "Next action"],
            ] as [keyof Application, string][]).map(([k, label]) => (
              <Field key={k} label={label}>
                {(id) => <input id={id} value={editing[k]} onChange={(e) => setEditing({ ...editing, [k]: e.target.value })} className={fieldClass} />}
              </Field>
            ))}
            <Field label="Date applied">{(id) => <input id={id} type="date" value={editing.applied} onChange={(e) => setEditing({ ...editing, applied: e.target.value })} className={fieldClass} />}</Field>
            <Field label="Next action date">{(id) => <input id={id} type="date" value={editing.nextDate} onChange={(e) => setEditing({ ...editing, nextDate: e.target.value })} className={fieldClass} />}</Field>
            <Field label="Status">
              {() => (
                <Select value={editing.status} onValueChange={(v) => setEditing({ ...editing, status: v as Status })} options={STATUSES.map((s) => ({ value: s, label: s }))} ariaLabel="Status" buttonClassName={selectBtnClass} />
              )}
            </Field>
            <Field label="Notes" className="sm:col-span-2">
              {(id) => <textarea id={id} rows={3} value={editing.notes} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} className={fieldClass} />}
            </Field>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className={buttonClass} onClick={save} disabled={!editing.company.trim()}>
              Save
            </button>
            <button type="button" className={ghostButtonClass} onClick={() => setEditing(null)}>
              Cancel
            </button>
            {editing.id && (
              <button
                type="button"
                className={`${ghostButtonClass} ml-auto`}
                onClick={() => {
                  if (confirm(`Delete ${editing.company}?`)) {
                    setApps((list) => list.filter((a) => a.id !== editing.id));
                    setEditing(null);
                  }
                }}
              >
                Delete
              </button>
            )}
          </div>
        </ToolCard>
      )}

      <ToolCard>
        {visible.length === 0 ? (
          <Empty>
            {apps.length ? "Nothing matches this filter." : "No applications yet. Add the first one, or import a CSV."}
          </Empty>
        ) : (
          <ul className="divide-y divide-ink-100">
            {visible.map((a) => {
              const overdue = a.status !== "Closed" && a.nextDate && now && a.nextDate < now;
              const dueToday = a.status !== "Closed" && a.nextDate === now;
              return (
                <li key={a.id}>
                  <button type="button" onClick={() => setEditing(a)} className="grid w-full gap-1 rounded-md px-2 py-3 text-left transition hover:bg-ink-50 sm:grid-cols-[1fr_auto] sm:items-center">
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-ink-900">{a.company}</span>
                        <Chip tone={STATUS_TONE[a.status]}>{a.status}</Chip>
                      </span>
                      <span className="block truncate text-sm text-ink-600">{a.role || "Role not set"}</span>
                    </span>
                    <span className="text-sm sm:text-right">
                      {a.status !== "Closed" && a.nextAction && (
                        <span className="block text-ink-700">{a.nextAction}</span>
                      )}
                      {a.status !== "Closed" && a.nextDate && (
                        <span className="block">
                          {overdue ? <Chip tone="critical">Overdue · {a.nextDate}</Chip> : dueToday ? <Chip tone="medium">Due today</Chip> : <span className="text-xs tabular-nums text-ink-500">{a.nextDate}</span>}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </ToolCard>
      <p className="text-xs text-ink-500">Everything is stored in this browser. Export a CSV now and then if you switch devices or clear your browsing data.</p>
    </div>
  );
}
