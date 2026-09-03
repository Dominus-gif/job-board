"use client";

import { useFormState, useFormStatus } from "react-dom";
import { subscribeRoleAction, type ActionResult } from "@/app/actions";
import { CATEGORIES } from "@/lib/taxonomy";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary shrink-0 disabled:opacity-60">
      {pending ? "Saving…" : label}
    </button>
  );
}

/**
 * Compact role-targeted subscribe widget: pick a job category, enter an email,
 * submit. The category is required — the form can't submit until one is chosen
 * (native validation + a server-side guard) — and each submit is upserted into
 * Supabase, merging the new role while keeping the email's earlier selections.
 */
export function RoleSubscribeForm({ buttonLabel = "Notify me", className = "" }: { buttonLabel?: string; className?: string }) {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(subscribeRoleAction, null);
  const field =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";

  return (
    <form action={formAction} className={className}>
      <div className="flex flex-col gap-2 sm:flex-row">
        {/* Category — required. Empty placeholder is disabled so it can't be submitted. */}
        <select name="category" required defaultValue="" aria-label="Job category" className={`${field} sm:max-w-[13rem]`}>
          <option value="" disabled>
            Select job category
          </option>
          <option value="All categories">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="email"
          name="email"
          required
          placeholder="you@email.com"
          aria-label="Email address"
          className={`${field} flex-1 placeholder:text-ink-400`}
        />

        <SubmitButton label={buttonLabel} />
      </div>

      {state && (
        <p className={`mt-2 text-sm ${state.ok ? "text-brand-700" : "text-red-600"}`} role="status">
          {state.message}
        </p>
      )}
    </form>
  );
}
