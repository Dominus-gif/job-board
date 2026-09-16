"use client";

/**
 * A single-series histogram built from HTML, so it stays crisp and responsive
 * without a charting library.
 *
 * Emphasis form: bars are a recessive grey, the bin that holds the value being
 * discussed is the accent. Each bar is a focusable hit target with a tooltip,
 * markers are labelled in text, and a table view carries every value for
 * readers who can't use the chart.
 */
import { useState } from "react";
import type { Bin } from "@/lib/stats";

export interface Marker {
  value: number;
  label: string;
}

export function Histogram({
  bins,
  format,
  unit,
  highlight,
  markers = [],
  height = 132,
  ariaLabel,
  tableCaption,
}: {
  bins: Bin[];
  format: (n: number) => string;
  /** Singular/plural noun for counts, e.g. ["role", "roles"]. */
  unit: [string, string];
  /** Value whose bin is drawn in the accent colour. */
  highlight?: number;
  markers?: Marker[];
  height?: number;
  ariaLabel: string;
  tableCaption: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  if (!bins.length) return null;
  const max = Math.max(1, ...bins.map((b) => b.count));
  const lo = bins[0].from;
  const hi = bins[bins.length - 1].to;
  const pos = (v: number) => Math.max(0, Math.min(100, ((v - lo) / (hi - lo || 1)) * 100));
  const hiBin = highlight == null ? -1 : bins.findIndex((b, i) => highlight >= b.from && (highlight < b.to || i === bins.length - 1));
  const noun = (n: number) => `${n.toLocaleString("en-US")} ${n === 1 ? unit[0] : unit[1]}`;
  const mid = Math.floor(bins.length / 2);

  return (
    <figure className="viz" aria-label={ariaLabel}>
      {/* headroom so the tooltip never covers the text above the chart */}
      <div className="relative mt-10" style={{ height }}>
        {/* hairline baseline + two recessive gridlines */}
        {[0.5, 1].map((f) => (
          <div key={f} aria-hidden className="absolute inset-x-0 border-t" style={{ bottom: `${f * 100}%`, borderColor: "var(--viz-grid)" }} />
        ))}
        <div aria-hidden className="absolute inset-x-0 bottom-0 border-t" style={{ borderColor: "var(--viz-axis)", opacity: 0.4 }} />

        <div className="absolute inset-0 flex items-end gap-[2px]">
          {bins.map((b, i) => {
            const accent = i === hiBin;
            const h = b.count ? Math.max(3, (b.count / max) * 100) : 0;
            return (
              <button
                key={i}
                type="button"
                className="group relative flex h-full flex-1 items-end justify-center focus:outline-none"
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover((c) => (c === i ? null : c))}
                onFocus={() => setHover(i)}
                onBlur={() => setHover((c) => (c === i ? null : c))}
                aria-label={`${format(b.from)} to ${format(b.to)}: ${noun(b.count)}${accent ? " (this one)" : ""}`}
              >
                <span
                  className="block w-full max-w-[24px] rounded-t-[4px] transition-colors group-focus-visible:ring-2 group-focus-visible:ring-offset-1"
                  style={{
                    height: `${h}%`,
                    background: accent ? "var(--viz-accent)" : hover === i ? "var(--viz-bar-hover)" : "var(--viz-bar)",
                    // ring colour for keyboard focus
                    ["--tw-ring-color" as string]: "var(--viz-accent)",
                  }}
                />
              </button>
            );
          })}
        </div>

        {markers.map((m, i) => (
          <div
            key={i}
            aria-hidden
            className="pointer-events-none absolute bottom-0 top-0 w-0 border-l-2"
            style={{ left: `${pos(m.value)}%`, borderColor: "var(--viz-accent)" }}
          >
            <span className="absolute -top-1 h-2 w-2 -translate-x-[5px] rounded-full ring-2 ring-white dark:ring-[#202020]" style={{ background: "var(--viz-accent)" }} />
          </div>
        ))}

        {hover != null && (
          <div
            role="status"
            className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-ink-100 bg-white px-2.5 py-1.5 text-xs shadow-lift"
            style={{ left: `${((hover + 0.5) / bins.length) * 100}%` }}
          >
            <span className="font-semibold text-ink-900">{noun(bins[hover].count)}</span>
            <span className="text-ink-500">
              {" "}
              · {format(bins[hover].from)}–{format(bins[hover].to)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-ink-500">
        <span>{format(lo)}</span>
        <span>{format(bins[mid].from)}</span>
        <span>{format(hi)}</span>
      </div>

      {markers.length > 0 && (
        <figcaption className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-600">
          {markers.map((m, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <span aria-hidden className="inline-block h-3 w-0 border-l-2" style={{ borderColor: "var(--viz-accent)" }} />
              {m.label}
            </span>
          ))}
        </figcaption>
      )}

      <details className="mt-2 text-xs text-ink-500">
        <summary className="cursor-pointer select-none font-medium hover:text-ink-900">Show as a table</summary>
        <table className="mt-2 w-full text-left tabular-nums">
          <caption className="sr-only">{tableCaption}</caption>
          <thead>
            <tr className="text-ink-500">
              <th className="py-1 font-medium">Range</th>
              <th className="py-1 text-right font-medium">Count</th>
            </tr>
          </thead>
          <tbody>
            {bins.map((b, i) => (
              <tr key={i} className={`border-t border-ink-100 ${i === hiBin ? "font-semibold text-ink-900" : "text-ink-600"}`}>
                <td className="py-1">
                  {format(b.from)}–{format(b.to)}
                  {i === hiBin ? " (this one)" : ""}
                </td>
                <td className="py-1 text-right">{b.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
