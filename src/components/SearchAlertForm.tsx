"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribeSearchAction, type ActionResult } from "@/app/actions";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary shrink-0 disabled:opacity-60">
      {pending ? "Saving…" : label}
    </button>
  );
}

/**
 * Alert signup for the CURRENT search rather than a broad category.
 *
 * The active filters are passed through as hidden fields, so "senior backend,
 * Europe, worldwide only" is stored as its own alert instead of collapsing to
 * "Backend" like the category widget does.
 */
export function SearchAlertForm({ params, summary }: { params: Record<string, string>; summary: string }) {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(subscribeSearchAction, null);

  return (
    <section className="mt-10 rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
      <h2 className="font-display text-base font-bold text-ink-900">Get alerted when new roles match this search</h2>
      <p className="mt-1 text-sm text-ink-500">
        We&apos;ll email you when a new role matches{" "}
        <strong className="font-semibold text-ink-700">{summary || "your current filters"}</strong> — not just the broad category.
      </p>

      <form action={formAction} className="mt-4 flex flex-col gap-2 sm:flex-row">
        {/* The live filter set travels with the submission. */}
        {Object.entries(params).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}
        <input type="hidden" name="label" value={summary} />

        <label htmlFor="alert-email" className="sr-only">Email address</label>
        <input
          id="alert-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <Submit label="Alert me" />
      </form>

      {state && (
        <p
          role="status"
          className={`mt-2.5 text-sm ${state.ok ? "text-emerald-700" : "text-red-600"}`}
        >
          {state.message}
        </p>
      )}
      <p className="mt-2 text-xs text-ink-400">Free, no account needed. Unsubscribe any time.</p>
    </section>
  );
}
