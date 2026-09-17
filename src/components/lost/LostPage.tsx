import Link from "next/link";
import { SearchIcon } from "@/components/icons";
import { DepartureBoard, type BoardRow } from "./DepartureBoard";
import { ReloadButton } from "./LostClient";

export interface LostReason {
  title: string;
  body: React.ReactNode;
}

/**
 * Shared layout for the 404 and error pages: the explanation and the ways out
 * on the left, the departures board on the right. It has no data fetching of
 * its own, so the client-side error boundary can render it too.
 */
export function LostPage({
  eyebrow,
  title,
  lede,
  code,
  cancelledLabel,
  rows,
  reasons,
  footer,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  code: string;
  cancelledLabel: string;
  rows: BoardRow[];
  reasons: LostReason[];
  footer?: React.ReactNode;
}) {
  return (
    <div className="lost-page relative overflow-hidden">
      <div className="lost-grid" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-0 lg:py-24">
        {/* Three blocks so phones see the board straight after the actions. */}
        <div className="min-w-0">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 font-editorial text-[2.6rem] leading-[1.02] tracking-[-0.015em] text-ink-900 sm:text-[3.6rem]">
            {title}
          </h1>
          <div className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink-600">{lede}</div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <ReloadButton />
            <Link href="/" className="btn-ghost">
              Go to the homepage
            </Link>
          </div>
        </div>

        <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-10">
          <DepartureBoard code={code} cancelledLabel={cancelledLabel} rows={rows} />
          {footer}
        </div>

        <div className="min-w-0">
          <form action="/jobs" method="get" className="max-w-md lg:mt-8" role="search">
            <label htmlFor="lost-search" className="field-label">
              Or search open roles
            </label>
            <div className="relative mt-2">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                id="lost-search"
                type="search"
                name="q"
                placeholder="Designer, Python, customer support…"
                className="w-full rounded-lg border border-ink-200 bg-white py-2.5 pl-10 pr-24 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200"
              />
              <button type="submit" className="btn-dark absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1.5">
                Search
              </button>
            </div>
          </form>

          <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-ink-100 pt-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title}>
                <dt className="text-sm font-semibold text-ink-900">{r.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-500">{r.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
