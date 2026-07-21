"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitJobAction, type ActionResult } from "@/app/actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}
      className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60">
      {pending ? "Submitting…" : "Submit job for review"}
    </button>
  );
}

const field = "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";

export function HiringForm() {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(submitJobAction, null);

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-6 text-brand-900">
        <p className="font-semibold">✅ Submitted</p>
        <p className="mt-1 text-sm">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink-800">Job title *</span>
          <input name="title" required className={field} placeholder="Senior Backend Engineer" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink-800">Company *</span>
          <input name="company_name" required className={field} placeholder="Acme Inc" />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium text-ink-800">Apply URL *</span>
        <input name="apply_url" required type="url" className={field} placeholder="https://acme.com/careers/123" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink-800">Contact email *</span>
        <input name="contact_email" required type="email" className={field} placeholder="hiring@acme.com" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink-800">Description</span>
        <textarea name="description" rows={6} className={field} placeholder="Role, responsibilities, salary range, benefits…" />
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" name="is_featured" className="h-4 w-4 rounded border-slate-300 text-brand-600" />
        <span className="text-sm text-ink-800">Feature this listing (paid placement, pinned to the top)</span>
      </label>

      <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
        Only truly global-remote roles are accepted. Listings that require a specific country, region, or timezone will
        be rejected in review.
      </p>

      {state && !state.ok && <p className="text-sm text-red-600" role="status">{state.message}</p>}
      <Submit />
    </form>
  );
}
