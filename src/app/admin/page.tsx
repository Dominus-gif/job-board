import type { Metadata } from "next";
import { ingestAndProcess, runPipeline } from "@/lib/pipeline";
import { formatSalary } from "@/lib/pipeline";
import { getCompanyAllowList } from "@/lib/db";
import type { RawJob } from "@/lib/types";
import seed from "@/lib/seed/raw-jobs.json";

export const metadata: Metadata = {
  title: "Admin — Ingestion Review",
  robots: { index: false, follow: false },
};

export const revalidate = 1800;

const LIVE = process.env.ANYWHERE_LIVE !== "false";

/**
 * Operations dashboard (spec section 8). Read-only in this demo: it runs the
 * pipeline over the bundled seed and surfaces what would be published vs.
 * rejected, plus the enrichment output for eyeballing, and the ATS allow-list.
 *
 * In production, guard this route (auth) and wire the buttons to mutations:
 * approve / edit / feature / reject, override enrichment fields, and manage
 * the allow-list. See README "Admin / operations".
 */
export default async function AdminPage() {
  const companies = getCompanyAllowList();
  const report = LIVE ? await ingestAndProcess(companies) : runPipeline(seed as RawJob[]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-ink-900">Ingestion review</h1>
      <p className="mt-1 text-sm text-ink-700">
        Demo dry-run over seed data. In production this reflects the latest cron run against the ATS allow-list.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Fetched", report.fetched],
          ["Deduped", report.deduped],
          ["Accepted", report.accepted],
          ["Rejected", report.rejected],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
            <div className="text-2xl font-bold text-ink-900">{value as number}</div>
            <div className="text-xs uppercase tracking-wide text-ink-700">{label as string}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold text-ink-900">Accepted — enrichment output</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-ink-700">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Company</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Salary</th>
              <th className="px-3 py-2">Skills</th>
              <th className="px-3 py-2">Benefits</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {report.jobs.map((j) => (
              <tr key={j.id}>
                <td className="px-3 py-2 font-medium text-ink-900">{j.title}</td>
                <td className="px-3 py-2 text-ink-700">{j.company_name}</td>
                <td className="px-3 py-2"><span className="rounded bg-slate-100 px-2 py-0.5 text-xs">{j.category}</span></td>
                <td className="px-3 py-2 text-ink-700">{formatSalary(j.salary) || "—"}</td>
                <td className="px-3 py-2 text-xs text-ink-700">{j.skills.join(", ") || "—"}</td>
                <td className="px-3 py-2 text-xs text-ink-700">{j.benefits.map((b) => b.label).join(", ") || "—"}</td>
                <td className="px-3 py-2 text-xs">
                  <span className="text-slate-400">Approve · Edit · Feature · Reject</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {report.rejections.length > 0 && (
        <>
          <h2 className="mt-10 text-lg font-semibold text-ink-900">Rejected</h2>
          <ul className="mt-3 space-y-2">
            {report.rejections.slice(0, 40).map((r, i) => (
              <li key={i} className="rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-sm text-red-900">
                <strong>{r.title}</strong> @ {r.company} — {r.reason}
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 className="mt-10 text-lg font-semibold text-ink-900">ATS allow-list ({companies.length})</h2>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {companies.map((c) => (
          <div key={c.slug} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
            <div className="font-medium text-ink-900">{c.name}</div>
            <div className="text-xs text-ink-700">{c.provider} · {c.board_token}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
