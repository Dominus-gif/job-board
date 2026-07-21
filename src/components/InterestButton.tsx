"use client";

import { useState } from "react";

/**
 * "I'm interested" — registers demand for a listing. When enough candidates
 * click, the job is promoted to "In demand" across the site.
 */
export function InterestButton({ slug, initialInterest }: { slug: string; initialInterest: number }) {
  const [count, setCount] = useState(initialInterest);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function register() {
    if (done || busy) return;
    setBusy(true);
    setCount((c) => c + 1); // optimistic
    setDone(true);
    try {
      const res = await fetch(`/api/interest?slug=${encodeURIComponent(slug)}`, { method: "POST" });
      const data = await res.json();
      if (typeof data.interest === "number") setCount(data.interest);
    } catch {
      /* keep optimistic value */
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-ink-50 px-3 py-2.5">
      <span className="text-sm text-ink-600">
        <strong className="text-ink-900">{count}</strong> {count === 1 ? "person is" : "people are"} interested
      </span>
      <button
        type="button"
        onClick={register}
        disabled={done}
        className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm font-semibold text-ink-800 transition hover:border-brand-300 hover:text-brand-700 disabled:opacity-60"
      >
        {done ? "Interested ✓" : "I'm interested"}
      </button>
    </div>
  );
}
