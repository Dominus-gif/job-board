"use client";

import { useEffect } from "react";
import Link from "next/link";

/** App-wide error boundary — any unhandled render error gets a styled page. */
export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[unhandled]", JSON.stringify({ context: "app render", message: error.message, digest: error.digest }));
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <span className="eyebrow">Something went wrong</span>
      <h1 className="mt-3 font-display text-2xl font-extrabold text-ink-900">This page didn&apos;t load</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-500">A temporary error on our side. Try again, or head back to the board.</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary">Try again</button>
        <Link href="/" className="btn-ghost">Go home</Link>
      </div>
    </div>
  );
}
