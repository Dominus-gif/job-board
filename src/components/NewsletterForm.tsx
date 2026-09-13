"use client";

import { useActionState, useEffect, useState } from "react";
import { subscribeAction, type ActionResult } from "@/app/actions";
import { ConfettiSubmitButton } from "@/components/ui/ConfettiSubmitButton";

export function NewsletterForm({ compact = false, buttonLabel = "Subscribe" }: { compact?: boolean; buttonLabel?: string }) {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(subscribeAction, null);
  // The celebration belongs to a subscription that actually landed, so it is
  // driven by the server action's result rather than by the click.
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    if (state?.ok) setSubscribed(true);
  }, [state]);

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
      <ConfettiSubmitButton
        label={buttonLabel}
        pendingLabel="Subscribing…"
        doneLabel="Subscribed"
        done={subscribed}
      />
      {state && (
        <p className={`text-sm sm:self-center ${state.ok ? "text-brand-700" : "text-red-600"}`} role="status">
          {state.message}
        </p>
      )}
    </form>
  );
}
