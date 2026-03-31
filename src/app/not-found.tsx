import Link from "next/link";
import { CATEGORIES, categoryToSlug } from "@/lib/taxonomy";
import { SearchIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="font-mono text-5xl font-bold tracking-tight text-brand-600">404</p>
      <h1 className="mt-4 font-display text-3xl font-extrabold text-ink-900">Page not found</h1>
      <p className="mt-3 text-ink-500">
        That page doesn’t exist or has moved — but plenty of work-from-anywhere jobs do. Try a search:
      </p>

      {/* Search straight into the indexable /jobs results. */}
      <form action="/jobs" method="get" className="mx-auto mt-6 max-w-md">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            name="q"
            placeholder="Search roles, companies…"
            aria-label="Search jobs"
            className="w-full rounded-xl border border-ink-200 bg-white py-3 pl-12 pr-14 text-ink-900 placeholder:text-ink-400 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200 sm:pr-24"
          />
          <button type="submit" aria-label="Search" className="btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-2">
            <SearchIcon className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </form>

      <div className="mt-8">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">Popular categories</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/remote-${categoryToSlug(c)}-jobs`}
              className="rounded-md bg-ink-50 px-3 py-1.5 text-sm font-medium text-ink-600 ring-1 ring-inset ring-ink-100 transition hover:text-ink-900 hover:ring-ink-200"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/jobs" className="btn-ghost">Browse all jobs</Link>
      </div>
    </div>
  );
}
