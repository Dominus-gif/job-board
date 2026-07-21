"use client";

import { useFormState, useFormStatus } from "react-dom";
import { subscribeAction, type ActionResult } from "@/app/actions";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary shrink-0 disabled:opacity-60"
    >
      {pending ? "Subscribing…" : label}
    </button>
  );
}

export function NewsletterForm({ compact = false, buttonLabel = "Subscribe" }: { compact?: boolean; buttonLabel?: string }) {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(subscribeAction, null);
  return (
    <form action={formAction} className={compact ? "flex flex-col gap-2 sm:flex-row" : "flex flex-col gap-3 sm:flex-row"}>
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        aria-label="Email address"
        className="w-full flex-1 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-ink-900 placeholder:text-ink-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
      <SubmitButton label={buttonLabel} />
      {state && (
        <p className={`text-sm sm:self-center ${state.ok ? "text-brand-700" : "text-red-600"}`} role="status">
          {state.message}
        </p>
      )}
    </form>
  );
}
