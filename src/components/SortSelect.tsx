"use client";

import { useRouter } from "next/navigation";

const OPTIONS: [string, string][] = [
  ["relevance", "Relevance"],
  ["newest", "Newest"],
  ["salary", "Salary: high → low"],
];

/** Themed sort <select> that navigates to /jobs with `&sort=` (SSR-friendly). */
export function SortSelect({ base, current }: { base: Record<string, string>; current: string }) {
  const router = useRouter();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const sp = new URLSearchParams(base);
    const v = e.target.value;
    if (v && v !== "relevance") sp.set("sort", v);
    else sp.delete("sort");
    const s = sp.toString();
    router.push(s ? `/jobs?${s}` : "/jobs");
  }

  return (
    <span className="relative inline-block">
      <select
        value={current || "relevance"}
        onChange={onChange}
        aria-label="Sort results"
        className="appearance-none rounded-md border border-ink-200 bg-white py-1.5 pl-3 pr-8 text-sm font-medium text-ink-800 transition hover:border-ink-300 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200"
      >
        {OPTIONS.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
  );
}
