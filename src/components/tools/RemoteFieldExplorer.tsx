"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { FieldExplorerData, FieldStat } from "@/lib/tool-data";
import { Segmented, Stat, ToolCard } from "./kit";
import { displayTitle } from "./JobTitleFinder";

/** The guide that covers each family, where one exists. */
const GUIDES: Record<string, { href: string; label: string }> = {
  swe: { href: "/posts/remote-software-engineering-jobs", label: "Remote software engineering jobs" },
  data: { href: "/posts/remote-data-and-machine-learning-jobs", label: "Remote data and machine learning jobs" },
  marketing: { href: "/posts/remote-marketing-jobs", label: "Remote marketing jobs" },
  design: { href: "/posts/remote-design-jobs", label: "Remote design jobs" },
  product: { href: "/posts/remote-product-manager-jobs", label: "Remote product manager jobs" },
  sales: { href: "/posts/remote-sales-jobs-sdr-vs-field-sales", label: "Remote sales jobs" },
  support: { href: "/posts/remote-customer-support-careers", label: "Remote customer support careers" },
  finance: { href: "/posts/remote-finance-accounting-jobs", label: "Remote finance and accounting jobs" },
  people: { href: "/posts/remote-operations-hr-admin-jobs", label: "Remote HR, operations and admin jobs" },
  ops: { href: "/posts/remote-operations-hr-admin-jobs", label: "Remote HR, operations and admin jobs" },
};

type SortKey = "roles" | "worldwide" | "junior" | "pay";
const SORTS: { value: SortKey; label: string }[] = [
  { value: "roles", label: "Most roles" },
  { value: "worldwide", label: "Most open worldwide" },
  { value: "junior", label: "Most junior titles" },
  { value: "pay", label: "Most publish pay" },
];

const pct = (n: number, d: number) => (d === 0 ? 0 : (n / d) * 100);
const fmtPct = (n: number, d: number) => `${pct(n, d).toFixed(1)}%`;
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function sortValue(f: FieldStat, k: SortKey): number {
  if (k === "roles") return f.roles;
  if (k === "worldwide") return pct(f.worldwide, f.roles);
  if (k === "junior") return pct(f.junior, f.roles);
  return pct(f.withPay, f.roles);
}

function Bars({ rows, of }: { rows: [string, number][]; of: number }) {
  const max = Math.max(1, ...rows.map((r) => r[1]));
  return (
    <ul className="viz mt-2 space-y-1.5">
      {rows.map(([label, n]) => (
        <li key={label} className="grid grid-cols-[minmax(0,8.5rem)_1fr_3.25rem] items-center gap-2 text-sm">
          <span className="truncate text-ink-700" title={label}>{label}</span>
          <span className="h-2 rounded-full" style={{ width: `${Math.max(4, (n / max) * 100)}%`, background: "var(--viz-bar)" }} aria-hidden />
          <span className="text-right tabular-nums text-ink-600">{fmtPct(n, of)}</span>
        </li>
      ))}
    </ul>
  );
}

export function RemoteFieldExplorer({ data }: { data: FieldExplorerData }) {
  const [sort, setSort] = useState<SortKey>("roles");
  // Open on the largest field, which is the top row under the default sort.
  const [selected, setSelected] = useState<string>(() => [...data.fields].sort((a, b) => b.roles - a.roles)[0]?.key ?? "");

  const rows = useMemo(
    () => [...data.fields].sort((a, b) => sortValue(b, sort) - sortValue(a, sort) || b.roles - a.roles),
    [data, sort],
  );
  const f = data.fields.find((x) => x.key === selected) ?? rows[0];
  const guide = f ? GUIDES[f.key] : undefined;

  return (
    <div className="space-y-5">
      <ToolCard>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-bold text-ink-900">Compare fields</h2>
          <Segmented value={sort} onChange={setSort} options={SORTS} ariaLabel="Sort fields by" size="sm" />
        </div>
        <p className="mt-2 text-xs text-ink-500">
          Whole board: {data.total.toLocaleString("en-US")} listings · {fmtPct(data.worldwide, data.total)} open worldwide ·{" "}
          {fmtPct(data.junior, data.total)} junior titles · {fmtPct(data.withPay, data.total)} publish pay. Select a field for detail.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[30rem] text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs text-ink-500">
                <th className="py-2 pr-3 font-medium">Field</th>
                <th className="py-2 pr-3 text-right font-medium">Roles</th>
                <th className="py-2 pr-3 text-right font-medium">Open worldwide</th>
                <th className="py-2 pr-3 text-right font-medium">Junior titles</th>
                <th className="py-2 text-right font-medium">Publish pay</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const on = r.key === f?.key;
                return (
                  <tr key={r.key} className={`border-b border-ink-100 ${on ? "bg-ink-50" : ""}`}>
                    <td className="py-2 pr-3">
                      <button
                        type="button"
                        onClick={() => setSelected(r.key)}
                        aria-pressed={on}
                        className={`text-left underline-offset-2 hover:underline ${on ? "font-semibold text-ink-900" : "text-ink-800"}`}
                      >
                        {r.label}
                      </button>
                    </td>
                    <td className="py-2 pr-3 text-right tabular-nums text-ink-900">{r.roles}</td>
                    <td className="py-2 pr-3 text-right tabular-nums text-ink-700">{fmtPct(r.worldwide, r.roles)}</td>
                    <td className="py-2 pr-3 text-right tabular-nums text-ink-700">{fmtPct(r.junior, r.roles)}</td>
                    <td className="py-2 text-right tabular-nums text-ink-700">{fmtPct(r.withPay, r.roles)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ToolCard>

      {f && (
        <ToolCard>
          <h2 className="font-display text-lg font-bold text-ink-900">{f.label}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Open roles" value={f.roles} sub={`${fmtPct(f.roles, data.total)} of the board`} />
            <Stat label="Open worldwide" value={f.worldwide} sub={`${fmtPct(f.worldwide, f.roles)} of the field`} />
            <Stat label="Junior titles" value={f.junior} sub={`${fmtPct(f.junior, f.roles)} (board ${fmtPct(data.junior, data.total)})`} />
            <Stat
              label="Median published pay"
              value={f.medianPay != null ? usd(f.medianPay) : "Too few"}
              sub={f.medianPay != null ? `from ${f.withPay} published ranges` : `only ${f.withPay} published ranges`}
            />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-ink-900">Where the roles are</h3>
              <Bars rows={f.countries} of={f.roles} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink-900">Most common titles</h3>
              <ul className="mt-2 space-y-1.5 text-sm">
                {f.titles.map(([t, n]) => (
                  <li key={t} className="flex justify-between gap-3">
                    <Link href={`/jobs?q=${encodeURIComponent(t)}`} className="min-w-0 truncate text-ink-800 underline-offset-2 hover:underline">
                      {displayTitle(t)}
                    </Link>
                    <span className="shrink-0 tabular-nums text-ink-500">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink-900">Hiring the most</h3>
              <ul className="mt-2 space-y-1.5 text-sm">
                {f.employers.map(([c, n]) => (
                  <li key={c} className="flex justify-between gap-3">
                    <span className="min-w-0 truncate text-ink-800">{c}</span>
                    <span className="shrink-0 tabular-nums text-ink-500">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-5 text-sm text-ink-600">
            {f.fresh7} of the {f.roles} roles were posted in the last 7 days.
            {guide && (
              <>
                {" "}Our guide to <Link href={guide.href} className="font-medium text-ink-900 underline underline-offset-2">{guide.label.toLowerCase()}</Link> goes deeper into this field.
              </>
            )}
          </p>
        </ToolCard>
      )}

      <p className="text-xs leading-relaxed text-ink-500">
        Counted on {data.asOf} by job title, not by the site&apos;s category filter. A median is shown only when at least 15 listings publish a
        range. {data.unassigned.toLocaleString("en-US")} titles ({fmtPct(data.unassigned, data.total)}) fit none of these fields, such as
        &ldquo;Business Analyst&rdquo; or a bare &ldquo;Director&rdquo;, and a few titles fit two fields and count in both, so the rows do not
        add up to the whole board.
      </p>
    </div>
  );
}
