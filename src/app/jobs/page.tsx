import type { Metadata } from "next";
import type { Job } from "@/lib/types";
import Link from "next/link";
import { getSearchableJobs, paginate, PAGE_SIZE } from "@/lib/db";
import { SALARY_BANDS, salaryMidpointUsd } from "@/lib/salary";
import { jobRegions } from "@/lib/region";
import { CATEGORIES } from "@/lib/taxonomy";
import { abs } from "@/lib/site";
import { JobList } from "@/components/JobList";
import { SearchIcon, CloseIcon } from "@/components/icons";
import { jobListJsonLd } from "@/lib/jsonld";

export const revalidate = 1800;

type SP = Record<string, string | string[] | undefined>;
interface Filters { q: string; type: string; salary: string; region: string; category: string; scope: string; page: number; }

const TYPES = ["Full-Time", "Part-Time", "Contract"];
const REGIONS = ["United States", "Europe", "UK", "Asia-Pacific", "Canada", "India", "Latin America", "Middle East", "Worldwide"];

function parse(sp: SP): Filters {
  const g = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  return {
    q: g("q").trim(),
    type: TYPES.includes(g("type")) ? g("type") : "",
    salary: SALARY_BANDS.some((b) => b.id === g("salary")) ? g("salary") : "",
    region: REGIONS.includes(g("region")) ? g("region") : "",
    category: (CATEGORIES as readonly string[]).includes(g("category")) ? g("category") : "",
    scope: g("scope") === "worldwide" || g("scope") === "regional" ? g("scope") : "",
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
  if (keepPage && m.page > 1) sp.set("page", String(m.page));
  const s = sp.toString();
  return s ? `/jobs?${s}` : "/jobs";
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
    if (floor > 0 && (mid == null || mid < floor)) return false;
    return true;
  });
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
  // structured filter facets are indexable.
  const noindex = !!f.q;
  return {
    title,
    description,
    alternates: { canonical: abs(href({ ...f, page: 1 }, {})) },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

export default async function JobsSearchPage({ searchParams }: { searchParams: SP }) {
  const f = parse(searchParams);
  const all = await getSearchableJobs();
  const filtered = filterJobs(all, f);
  const { items, page, totalPages, total } = paginate(filtered, f.page, PAGE_SIZE);

  const jsonLd = jobListJsonLd(items, label(f) ? `Remote Jobs — ${label(f)}` : "Remote Jobs");

  const chip = (active: boolean) =>
    `rounded-md px-3 py-1.5 text-sm font-medium transition ${
      active ? "pill-on" : "bg-ink-50 text-ink-600 ring-1 ring-inset ring-ink-100 hover:text-ink-900 hover:ring-ink-200"
    }`;

  const hasFilters = f.q || f.type || f.salary || f.region || f.category || f.scope;

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

      {/* Search box (GET form keeps other filters) */}
      <form action="/jobs" method="get" className="mt-6">
        {f.type && <input type="hidden" name="type" value={f.type} />}
        {f.salary && <input type="hidden" name="salary" value={f.salary} />}
        {f.region && <input type="hidden" name="region" value={f.region} />}
        {f.category && <input type="hidden" name="category" value={f.category} />}
        {f.scope && <input type="hidden" name="scope" value={f.scope} />}
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            name="q"
            defaultValue={f.q}
            placeholder="Search roles, companies, or skills…"
            aria-label="Search jobs"
            className="w-full rounded-xl border border-ink-200 bg-white py-3 pl-12 pr-28 text-ink-900 placeholder:text-ink-400 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200"
          />
          <button type="submit" className="btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 py-1.5">Search</button>
        </div>
      </form>

      {/* Filters */}
      <div className="mt-5 space-y-4 rounded-xl border border-ink-100 bg-white p-4">
        <FilterRow label="Category">
          <Link href={href(f, { category: "" })} className={chip(!f.category)}>All</Link>
          {CATEGORIES.map((c) => (
            <Link key={c} href={href(f, { category: c })} className={chip(f.category === c)}>{c}</Link>
          ))}
        </FilterRow>
        <FilterRow label="Salary">
          {SALARY_BANDS.map((b) => (
            <Link key={b.id} href={href(f, { salary: b.id === "any" ? "" : b.id })} className={chip(f.salary === b.id || (b.id === "any" && !f.salary))}>
              {b.label}
            </Link>
          ))}
        </FilterRow>
        <FilterRow label="Type">
          <Link href={href(f, { type: "" })} className={chip(!f.type)}>All types</Link>
          {TYPES.map((t) => (
            <Link key={t} href={href(f, { type: t })} className={chip(f.type === t)}>{t}</Link>
          ))}
        </FilterRow>
        <FilterRow label="Region">
          <Link href={href(f, { region: "", scope: "" })} className={chip(!f.region && !f.scope)}>Anywhere</Link>
          <Link href={href(f, { scope: "worldwide", region: "" })} className={chip(f.scope === "worldwide")}>Worldwide only</Link>
          {REGIONS.filter((r) => r !== "Worldwide").map((r) => (
            <Link key={r} href={href(f, { region: r, scope: "" })} className={chip(f.region === r)}>{r}</Link>
          ))}
        </FilterRow>
        {hasFilters && (
          <div className="pt-1">
            <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900">
              <CloseIcon className="h-3.5 w-3.5" /> Clear all filters
            </Link>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mt-6">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-ink-200 bg-white p-12 text-center text-ink-500">
            No roles match these filters. <Link href="/jobs" className="font-medium text-brand-600 hover:text-brand-700">Clear filters</Link>.
          </div>
        ) : (
          <JobList jobs={items} />
        )}
      </div>

      {/* Pagination (real URLs) */}
      {totalPages > 1 && (
        <nav className="mt-8 flex items-center justify-between gap-3" aria-label="Pagination">
          {page > 1 ? (
            <Link href={href(f, { page: page - 1 }, true)} rel="prev" className="btn-ghost">← Previous</Link>
          ) : <span />}
          <span className="text-sm text-ink-500">Page {page} of {totalPages.toLocaleString("en-US")}</span>
          {page < totalPages ? (
            <Link href={href(f, { page: page + 1 }, true)} rel="next" className="btn-ghost">Next →</Link>
          ) : <span />}
        </nav>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-16 flex-shrink-0 text-[11px] font-semibold uppercase tracking-wide text-ink-400">{label}</span>
      {children}
    </div>
  );
}
