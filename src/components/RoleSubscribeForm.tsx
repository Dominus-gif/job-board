"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { subscribeRoleAction, type ActionResult } from "@/app/actions";
import { CATEGORIES } from "@/lib/taxonomy";
import { Select, type SelectOption } from "@/components/ui/Select";

const CATEGORY_OPTIONS: SelectOption[] = [
  { value: "All categories", label: "All categories" },
  ...CATEGORIES.map((c) => ({ value: c, label: c })),
];

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
 * submit. The category is required — the server action rejects an empty
 * category with a message — and each submit is upserted into Supabase, merging
 * the new role while keeping the email's earlier selections. The category uses
 * the custom themed <Select> (matches the site in light/dark).
 */
export function RoleSubscribeForm({ buttonLabel = "Notify me", className = "" }: { buttonLabel?: string; className?: string }) {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(subscribeRoleAction, null);
  const [category, setCategory] = useState("");
  const field =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";

  return (
    <form action={formAction} className={className}>
      <div className="flex flex-col gap-2 sm:flex-row">
        {/* Category — required (enforced by the server action). */}
        <Select
          name="category"
          required
          value={category}
          onValueChange={setCategory}
          options={CATEGORY_OPTIONS}
          placeholder="Select job category"
          ariaLabel="Job category"
          className="w-full sm:max-w-[13rem]"
        />

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
