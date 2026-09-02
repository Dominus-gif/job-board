import type { Metadata } from "next";
import type { Job } from "@/lib/types";
import Link from "next/link";
import { getSearchableJobs, paginate, PAGE_SIZE } from "@/lib/db";
import { SALARY_BANDS, salaryMidpointUsd } from "@/lib/salary";
import { jobRegions } from "@/lib/region";
import { CATEGORIES } from "@/lib/taxonomy";
import { abs } from "@/lib/site";
import { JobList } from "@/components/JobList";
import { SortSelect } from "@/components/SortSelect";
import { SearchIcon, CloseIcon, CheckIcon } from "@/components/icons";
import { jobListJsonLd } from "@/lib/jsonld";

export const revalidate = 1800;

type SP = Record<string, string | string[] | undefined>;
interface Filters { q: string; type: string; salary: string; region: string; category: string; scope: string; disc: boolean; sort: string; page: number; }

const PG = "inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-md border border-ink-200 bg-white px-3 text-sm font-medium text-ink-700 transition hover:bg-ink-50 hover:text-ink-900";
const PG_ACTIVE = "pill-on inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-md px-3 text-sm font-semibold";

/** Windowed page list: first, last, current ±1, with "…" gaps. */
function pageWindow(current: number, total: number): (number | "…")[] {
  const keep = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...keep].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push("…");
    out.push(p);
    prev = p;
  }
  return out;
}

const TYPES = ["Full-Time", "Part-Time", "Contract"];
const REGIONS = ["United States", "Europe", "UK", "Asia-Pacific", "Canada", "India", "Latin America", "Middle East", "Worldwide"];
const SORTS = ["newest", "salary"];

function parse(sp: SP): Filters {
  const g = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  return {
    q: g("q").trim(),
    type: TYPES.includes(g("type")) ? g("type") : "",
    salary: SALARY_BANDS.some((b) => b.id === g("salary")) ? g("salary") : "",
    region: REGIONS.includes(g("region")) ? g("region") : "",
    category: (CATEGORIES as readonly string[]).includes(g("category")) ? g("category") : "",
    scope: g("scope") === "worldwide" || g("scope") === "regional" ? g("scope") : "",
    disc: g("disc") === "1",
    sort: SORTS.includes(g("sort")) ? g("sort") : "",
    page: Math.max(1, Number(g("page")) || 1),
  };
}

/** Build a /jobs URL from the active filters plus overrides (resets page). */
function href(f: Filters, changes: Partial<Filters>, keepPage = false): string {
  const m = { ...f, ...changes };
  const sp = new URLSearchParams();
  if (m.q) sp.set("q", m.q);
  if (m.type) sp.set("type", m.type);
  if (m.salary) sp.set("salary", m.salary);
  if (m.region) sp.set("region", m.region);
  if (m.category) sp.set("category", m.category);
  if (m.scope) sp.set("scope", m.scope);
  if (m.disc) sp.set("disc", "1");
  if (m.sort) sp.set("sort", m.sort);
  if (keepPage && m.page > 1) sp.set("page", String(m.page));
  const s = sp.toString();
  return s ? `/jobs?${s}` : "/jobs";
}

/** Active params (minus sort/page) as a flat record — feeds the client SortSelect. */
function baseParams(f: Filters): Record<string, string> {
  const m: Record<string, string> = {};
  if (f.q) m.q = f.q;
  if (f.type) m.type = f.type;
  if (f.salary) m.salary = f.salary;
  if (f.region) m.region = f.region;
  if (f.category) m.category = f.category;
  if (f.scope) m.scope = f.scope;
  if (f.disc) m.disc = "1";
  return m;
}

function filterJobs(jobs: Job[], f: Filters): Job[] {
  const floor = SALARY_BANDS.find((b) => b.id === f.salary)?.min ?? 0;
  const q = f.q.toLowerCase();
  return jobs.filter((j) => {
    if (q && !`${j.title} ${j.company_name} ${j.category} ${j.skills.join(" ")}`.toLowerCase().includes(q)) return false;
    if (f.type && j.employment_type !== f.type) return false;
    if (f.scope && j.scope !== f.scope) return false;
    if (f.category && j.category !== f.category) return false;
    if (f.region && !jobRegions(j.location).includes(f.region)) return false;
    const mid = salaryMidpointUsd(j.salary);
    if (f.disc && mid == null) return false;
    if (floor > 0 && (mid == null || mid < floor)) return false;
    return true;
  });
}

/** Reorder filtered results. Relevance ("") keeps the store's ranked order. */
function sortJobs(jobs: Job[], sort: string): Job[] {
  if (sort === "newest") {
    return [...jobs].sort((a, b) => new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime());
  }
  if (sort === "salary") {
    return [...jobs].sort((a, b) => (salaryMidpointUsd(b.salary) ?? -1) - (salaryMidpointUsd(a.salary) ?? -1));
  }
  return jobs;
}

function label(f: Filters): string {
  const bits: string[] = [];
  if (f.q) bits.push(`"${f.q}"`);
  if (f.category) bits.push(f.category);
  if (f.type) bits.push(f.type);
  if (f.salary) bits.push(SALARY_BANDS.find((b) => b.id === f.salary)?.label ?? "");
  if (f.region) bits.push(`in ${f.region}`);
  return bits.filter(Boolean).join(" · ");
}

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const f = parse(searchParams);
  const active = label(f);
  const title = active ? `Remote Jobs — ${active}` : "Search Remote Jobs — Filter by Role, Salary & Region";
  const description = active
    ? `Remote jobs${active ? ` (${active})` : ""} you can do from anywhere. Filter by role, salary, type and region, and apply free.`
    : "Search thousands of remote jobs and filter by role, category, salary, employment type and region. Shareable, bookmarkable results — apply free.";
  // User free-text searches shouldn't be indexed (infinite thin pages); the
  // structured filter facets are indexable. Sort variants canonicalise to the
  // unsorted facet so we don't create duplicate ranked pages.
  const noindex = !!f.q;
  return {
    title,
    description,
    alternates: { canonical: abs(href({ ...f, page: 1, sort: "" }, {})) },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

export default async function JobsSearchPage({ searchParams }: { searchParams: SP }) {
  const f = parse(searchParams);
  const all = await getSearchableJobs();
  const filtered = sortJobs(filterJobs(all, f), f.sort);
  const { items, page, totalPages, total } = paginate(filtered, f.page, PAGE_SIZE);

  const jsonLd = jobListJsonLd(items, label(f) ? `Remote Jobs — ${label(f)}` : "Remote Jobs");

  const chip = (active: boolean) =>
    `rounded-md px-3 py-1.5 text-sm font-medium transition ${
      active ? "pill-on" : "bg-ink-50 text-ink-600 ring-1 ring-inset ring-ink-100 hover:text-ink-900 hover:ring-ink-200"
    }`;

  const seg = (active: boolean) =>
    `rounded-lg px-3.5 py-1.5 transition ${active ? "pill-on" : "text-ink-600 hover:text-ink-900"}`;

  const activeCount =
    (f.type ? 1 : 0) + (f.salary ? 1 : 0) + (f.region ? 1 : 0) + (f.category ? 1 : 0) + (f.scope ? 1 : 0) + (f.disc ? 1 : 0);
  const hasFilters = f.q || activeCount > 0;

  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);

  const filterPanel = (
    <div className="space-y-4">
      <FilterGroup label="Category">
        <Link href={href(f, { category: "" })} className={chip(!f.category)}>All</Link>
        {CATEGORIES.map((c) => (
          <Link key={c} href={href(f, { category: c })} className={chip(f.category === c)}>{c}</Link>
        ))}
      </FilterGroup>
      <FilterGroup label="Salary">
        {SALARY_BANDS.map((b) => (
          <Link key={b.id} href={href(f, { salary: b.id === "any" ? "" : b.id })} className={chip(f.salary === b.id || (b.id === "any" && !f.salary))}>
            {b.label}
          </Link>
        ))}
      </FilterGroup>
      {/* Salary disclosed toggle (link-styled checkbox — the page is server-rendered). */}
      <Link href={href(f, { disc: !f.disc })} className="flex w-fit items-center gap-2 text-sm text-ink-600 hover:text-ink-900">
        <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border ${f.disc ? "border-ink-900 bg-ink-900 text-white" : "border-ink-300 bg-white"}`}>
          {f.disc && <CheckIcon className="h-3 w-3" />}
        </span>
        Salary disclosed only
      </Link>
      <FilterGroup label="Type">
        <Link href={href(f, { type: "" })} className={chip(!f.type)}>All types</Link>
        {TYPES.map((t) => (
          <Link key={t} href={href(f, { type: t })} className={chip(f.type === t)}>{t}</Link>
        ))}
      </FilterGroup>
      <FilterGroup label="Region">
        <Link href={href(f, { region: "" })} className={chip(!f.region)}>All regions</Link>
        {REGIONS.filter((r) => r !== "Worldwide").map((r) => (
          <Link key={r} href={href(f, { region: r })} className={chip(f.region === r)}>{r}</Link>
        ))}
      </FilterGroup>
      {hasFilters && (
        <div className="pt-1">
          <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900">
            <CloseIcon className="h-3.5 w-3.5" /> Clear all filters
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <span className="eyebrow">Search</span>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900">
        {label(f) ? `Remote jobs — ${label(f)}` : "Search remote jobs"}
      </h1>
      <p className="mt-2 text-ink-500">
        {total.toLocaleString("en-US")} {total === 1 ? "role" : "roles"} match. Filter below — every result has its own shareable link.
      </p>

      {/* Search box (GET form keeps other filters). Icon-only submit on mobile so
          the placeholder never clips under the button at 390px. */}
      <form action="/jobs" method="get" className="mt-6">
        {f.type && <input type="hidden" name="type" value={f.type} />}
        {f.salary && <input type="hidden" name="salary" value={f.salary} />}
        {f.region && <input type="hidden" name="region" value={f.region} />}
        {f.category && <input type="hidden" name="category" value={f.category} />}
        {f.scope && <input type="hidden" name="scope" value={f.scope} />}
        {f.disc && <input type="hidden" name="disc" value="1" />}
        {f.sort && <input type="hidden" name="sort" value={f.sort} />}
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            name="q"
            defaultValue={f.q}
            placeholder="Search roles, companies…"
            aria-label="Search jobs"
            className="w-full rounded-xl border border-ink-200 bg-white py-3 pl-12 pr-14 text-ink-900 placeholder:text-ink-400 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200 sm:pr-28"
          />
          <button type="submit" aria-label="Search" className="btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-2">
            <SearchIcon className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </form>

      {/* Availability toggle: work-from-anywhere ↔ region-locked (scrolls on mobile). */}
      <div className="mt-5 -mx-1 overflow-x-auto px-1 pb-1">
        <div className="inline-flex whitespace-nowrap rounded-xl border border-ink-200 bg-white p-1 text-sm font-medium shadow-card">
          <Link href={href(f, { scope: "" })} className={seg(!f.scope)}>All roles</Link>
          <Link href={href(f, { scope: "worldwide" })} className={seg(f.scope === "worldwide")}>Work from anywhere</Link>
          <Link href={href(f, { scope: "regional" })} className={seg(f.scope === "regional")}>Remote in your region</Link>
        </div>
      </div>

      {/* Two-column layout: filter rail (≥lg) + results. */}
      <div className="mt-5 lg:grid lg:grid-cols-[248px_minmax(0,1fr)] lg:items-start lg:gap-8">
        {/* Mobile/tablet: collapsible filter panel (native <details>, no JS). */}
        <details className="mb-4 rounded-xl border border-ink-100 bg-white lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-ink-800">
            <span>Filters{activeCount > 0 ? ` (${activeCount})` : ""}</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
          </summary>
          <div className="border-t border-ink-100 p-4">{filterPanel}</div>
        </details>

        {/* Desktop: sticky sidebar. */}
        <aside className="hidden lg:sticky lg:top-20 lg:block">
          <div className="rounded-xl border border-ink-100 bg-white p-4">{filterPanel}</div>
        </aside>

        <div className="min-w-0">
          {/* Results header: count + sort. */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-ink-500">
              {total === 0 ? "No roles" : `Showing ${start.toLocaleString("en-US")}–${end.toLocaleString("en-US")} of ${total.toLocaleString("en-US")}`}
            </span>
            <label className="flex items-center gap-2 text-sm text-ink-500">
              <span className="hidden sm:inline">Sort</span>
              <SortSelect base={baseParams(f)} current={f.sort} />
            </label>
          </div>

          {/* Active free-text query chip (removable). */}
          {f.q && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-ink-500">Search:</span>
              <Link
                href={href(f, { q: "" })}
                className="pill-on inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-medium ring-2 ring-brand-400 transition hover:opacity-90"
                aria-label={`Remove search “${f.q}”`}
              >
                {f.q} <CloseIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}

          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-ink-200 bg-white p-12 text-center text-ink-500">
              No roles match these filters. <Link href="/jobs" className="font-medium text-brand-600 hover:text-brand-700">Clear filters</Link>.
            </div>
          ) : (
            <JobList jobs={items} highlightQuery={f.q} />
          )}

          {/* Pagination (real URLs): windowed numbered pages + prev/next. */}
          {totalPages > 1 && (
            <nav className="mt-8 flex flex-wrap items-center justify-center gap-1.5" aria-label="Pagination">
              {page > 1 && (
                <Link href={href(f, { page: page - 1 }, true)} rel="prev" aria-label="Previous page" className={PG}>←</Link>
              )}
              {pageWindow(page, totalPages).map((p, i) =>
                p === "…" ? (
                  <span key={`gap-${i}`} className="px-1.5 text-ink-400" aria-hidden>…</span>
                ) : (
                  <Link
                    key={p}
                    href={href(f, { page: p }, true)}
                    aria-label={`Page ${p}`}
                    aria-current={p === page ? "page" : undefined}
                    className={p === page ? PG_ACTIVE : PG}
                  >
                    {p}
                  </Link>
                )
              )}
              {page < totalPages && (
                <Link href={href(f, { page: page + 1 }, true)} rel="next" aria-label="Next page" className={PG}>→</Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
