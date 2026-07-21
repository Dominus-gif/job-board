import Link from "next/link";

/** Shown when the original ATS posting has been removed. No Apply button. */
export function InactiveNotice() {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-8 text-center shadow-card">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-ink-100 text-ink-500">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="m6 6 12 12" />
        </svg>
      </div>
      <h2 className="mt-4 font-display text-xl font-bold text-ink-900">This job posting is not active anymore</h2>
      <p className="mx-auto mt-2 max-w-md text-ink-500">
        The employer has closed or removed this listing, so it can no longer be applied to. Plenty of other
        work-from-anywhere roles are still open.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Browse active jobs</Link>
        <Link href="/newsletter" className="btn-ghost">Get weekly job alerts</Link>
      </div>
    </div>
  );
}
