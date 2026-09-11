"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import type { CompanyListing } from "@/lib/db";
import { StarRating } from "./StarRating";
import { CompanyLogo } from "./CompanyLogo";
import { InFeedAd } from "./InFeedAd";
import { SearchIcon, CloseIcon } from "./icons";
import { Select } from "./ui/Select";

// Native ad every N cards (self-hides when ads are off — no empty grid cell).
const AD_EVERY = 9;
const PAGE = 60;

type SortId = "roles" | "name" | "worldwide" | "rated";

const SORTS: { value: SortId; label: string }[] = [
  { value: "roles", label: "Most open roles" },
  { value: "name", label: "Name (A–Z)" },
  { value: "worldwide", label: "Most worldwide roles" },
  { value: "rated", label: "Highest rated" },
];

/**
 * Searchable, sortable company directory.
 *
 * The grid previously rendered all ~2,200 employers at once with no way to find
 * one except scrolling, which is both unusable and a lot of DOM. Filtering and
 * sorting happen on the client over the full list (it is already in the page),
 * so results are instant and no request is needed; cards reveal a page at a time
 * to keep the initial render light.
 *
 * Every company keeps its own indexable /companies/<slug> page and all of them
 * are in the sitemap, so revealing progressively costs no crawl coverage.
 */
export function CompanyDirectory({ companies }: { companies: CompanyListing[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("roles");
  const [visible, setVisible] = useState(PAGE);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = q
      ? companies.filter((c) => c.name.toLowerCase().includes(q) || (c.description ?? "").toLowerCase().includes(q))
      : [...companies];

    out.sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "worldwide":
          return b.worldwideCount - a.worldwideCount || b.jobCount - a.jobCount || a.name.localeCompare(b.name);
        case "rated":
          // Unrated companies sink rather than tying at zero with genuinely poor ones.
          return (b.rating ?? -1) - (a.rating ?? -1) || (b.review_count ?? 0) - (a.review_count ?? 0) || a.name.localeCompare(b.name);
        default:
          return b.jobCount - a.jobCount || a.name.localeCompare(b.name);
      }
    });
    return out;
  }, [companies, query, sort]);

  const shown = results.slice(0, visible);

  function onQuery(v: string) {
    setQuery(v);
    setVisible(PAGE); // a new search starts from the top
  }

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <label htmlFor="company-search" className="sr-only">Search companies</label>
          <input
            id="company-search"
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search companies…"
            className="w-full rounded-xl border border-ink-200 bg-white py-2.5 pl-10 pr-10 text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-ink-400 transition hover:text-ink-700"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-ink-500">
          <span className="whitespace-nowrap">Sort by</span>
          <Select
            value={sort}
            onValueChange={(v) => { setSort(v as SortId); setVisible(PAGE); }}
            options={SORTS}
            ariaLabel="Sort companies"
            align="end"
            className="inline-block"
            buttonClassName="!w-auto !rounded-xl !px-3 !py-2.5 text-sm font-medium"
          />
        </div>
      </div>

      <p role="status" className="mt-3 text-sm text-ink-500">
        {results.length.toLocaleString("en-US")} {results.length === 1 ? "company" : "companies"}
        {query && <> matching &ldquo;{query}&rdquo;</>}
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-ink-200 bg-white p-10 text-center text-ink-500">
          No companies match that search. Try a shorter name.
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c, i) => (
            <Fragment key={c.slug}>
              <Link href={`/companies/${c.slug}`} className="card p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
                <div className="flex items-center gap-4">
                  <CompanyLogo src={c.logo} name={c.name} domain={c.domain} size={48}
                    className="h-12 w-12 flex-shrink-0 rounded-xl border border-ink-100 bg-white object-contain p-1" />
                  <div className="min-w-0">
                    <p className="truncate font-display font-bold text-ink-900">{c.name}</p>
                    <p className="text-sm text-ink-500">
                      {c.jobCount} open {c.jobCount === 1 ? "role" : "roles"}
                      {c.worldwideCount > 0 && c.worldwideCount < c.jobCount && (
                        <span className="text-emerald-600"> · {c.worldwideCount} worldwide</span>
                      )}
                    </p>
                  </div>
                </div>
                {c.rating != null && <div className="mt-3"><StarRating rating={c.rating} count={c.review_count} /></div>}
                {c.description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">{c.description}</p>}
              </Link>
              {(i + 1) % AD_EVERY === 0 && i < shown.length - 1 && <InFeedAd />}
            </Fragment>
          ))}
        </div>
      )}

      {visible < results.length && (
        <div className="mt-8 text-center">
          <button type="button" onClick={() => setVisible((v) => v + PAGE)} className="btn-ghost">
            Show more companies
          </button>
          <p className="mt-2 text-xs text-ink-400">
            Showing {shown.length.toLocaleString("en-US")} of {results.length.toLocaleString("en-US")}
          </p>
        </div>
      )}
    </>
  );
}
