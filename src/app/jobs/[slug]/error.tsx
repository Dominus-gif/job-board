"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route error boundary for /jobs/[slug].
 *
 * A slug that doesn't resolve calls notFound() and renders not-found.tsx. This
 * catches the other case — an unexpected throw while rendering a job — so the
 * visitor gets a styled page instead of a raw Next.js 500.
 */
export default function JobError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Mirrors src/lib/report.ts so client-side failures share the alert filter.
    console.error("[unhandled]", JSON.stringify({ context: "jobs/[slug] render", message: error.message, digest: error.digest }));
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <span className="eyebrow">Something went wrong</span>
      <h1 className="mt-3 font-display text-2xl font-extrabold text-ink-900">We couldn&apos;t load this job</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-500">
        This is on us, not you — the listing may still be live. Try again, or browse the board for similar roles.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary">Try again</button>
        <Link href="/page/1" className="btn-ghost">Browse all remote jobs</Link>
      </div>
    </div>
  );
}
