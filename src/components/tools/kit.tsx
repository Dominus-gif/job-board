"use client";

/**
 * Small building blocks shared by the interactive tools, so every tool reads
 * as part of the same site: one card surface, one field style, one way of
 * showing a verdict.
 */
import { useId, type ReactNode } from "react";

export const fieldClass =
  "w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200";
export const selectBtnClass = "!w-full !rounded-md !px-3 !py-2 text-[15px] font-normal !text-ink-900";
export const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-md bg-ink-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:opacity-50";
export const ghostButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-md border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700 transition hover:bg-ink-50 hover:text-ink-900 disabled:opacity-50";

export type Tone = "critical" | "high" | "medium" | "ok" | "info" | "neutral";

export function ToolCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-6 ${className}`}>{children}</div>;
}

export function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: ReactNode;
  children: (id: string) => ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-ink-700">
        {label}
      </label>
      {children(id)}
      {hint && <p className="text-xs leading-relaxed text-ink-500">{hint}</p>}
    </div>
  );
}

export function NumberInput({
  id,
  value,
  onChange,
  min = 0,
  step = 1,
  suffix,
  ariaLabel,
}: {
  id?: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  step?: number;
  suffix?: string;
  ariaLabel?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        step={step}
        value={Number.isFinite(value) ? value : ""}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        className={`${fieldClass} ${suffix ? "pr-14" : ""} tabular-nums`}
      />
      {suffix && (
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-ink-500">{suffix}</span>
      )}
    </div>
  );
}

/** A compact segmented control (radio group) for 2–4 short options. */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
  size = "md",
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  ariaLabel: string;
  size?: "sm" | "md";
}) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="inline-flex w-fit max-w-full shrink-0 flex-wrap gap-1 rounded-lg bg-ink-50 p-1">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.value)}
            className={`whitespace-nowrap rounded-md font-medium transition ${size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"} ${
              on ? "bg-white text-ink-900 shadow-card ring-1 ring-inset ring-ink-200" : "text-ink-500 hover:text-ink-900"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Chip({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`tone-${tone} inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold`}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--tone)" }} />
      {children}
    </span>
  );
}

export function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="rounded-xl bg-ink-50 p-4">
      <p className="text-xs font-medium text-ink-500">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-ink-900">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink-500">{sub}</p>}
    </div>
  );
}

/** Horizontal 0–100 meter with a tone-coloured fill and a visible value. */
export function Meter({ value, tone, label }: { value: number; tone: Tone; label: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={`tone-${tone} rounded-xl p-4`}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold">{label}</span>
        <span className="font-display text-2xl font-bold tabular-nums">{Math.round(v)}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/70 dark:bg-black/30" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(v)} aria-label={label}>
        <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${v}%`, background: "var(--tone)" }} />
      </div>
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-dashed border-ink-200 p-5 text-center text-sm text-ink-500">{children}</p>;
}

/** Safe localStorage helpers; every call tolerates a blocked or missing store. */
export function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: the tool still works for this visit */
  }
}

export function downloadFile(name: string, content: string, type = "text/csv") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const newId = () => Math.random().toString(36).slice(2, 10);
