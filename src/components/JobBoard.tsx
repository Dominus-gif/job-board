"use client";

import { Fragment, useMemo, useState } from "react";
import type { Job } from "@/lib/types";
import { SALARY_BANDS, salaryMidpointUsd } from "@/lib/salary";
import { availableRegions, jobRegions } from "@/lib/region";
import { JobCard } from "./JobCard";
import { InFeedAd } from "./InFeedAd";
import { SearchIcon, CloseIcon } from "./icons";

// Drop a native in-feed ad after every N listings (self-hides when ads are off).
const AD_EVERY = 8;

type EmpFilter = "all" | Job["employment_type"];
const EMP_OPTIONS: { id: EmpFilter; label: string }[] = [
  { id: "all", label: "All types" },
  { id: "Full-Time", label: "Full-time" },
  { id: "Part-Time", label: "Part-time" },
  { id: "Contract", label: "Contract" },
];

/**
 * Client-side job feed: full-text search, clickable skill tags (also selectable
 * from any job card), trending searches, and salary/type filters. Filtering is
 * instant; results reveal incrementally via "Show more".
 */
const PER_PAGE_OPTIONS = [50, 100, 200];

export function JobBoard({
  jobs,
  regionalJobs,
  pageSize = 50,
  showSearch = true,
}: {
  jobs: Job[];
  regionalJobs?: Job[];
  pageSize?: number;
  showSearch?: boolean;
}) {
  const [scope, setScope] = useState<"worldwide" | "regional">("worldwide");
  const [query, setQuery] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [category, setCategory] = useState("all");
  const [band, setBand] = useState("any");
  const [emp, setEmp] = useState<EmpFilter>("all");
  const [region, setRegion] = useState("any");
  const [salaryOnly, setSalaryOnly] = useState(false);
  const [perPage, setPerPage] = useState(pageSize);
  const [visible, setVisible] = useState(pageSize);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Optional worldwide ↔ region-locked toggle (only when regional jobs are given).
  const hasRegional = !!regionalJobs && regionalJobs.length > 0;
  const activeJobs = scope === "regional" && regionalJobs ? regionalJobs : jobs;

  function switchScope(next: "worldwide" | "regional") {
    setScope(next);
    setRegion("any");
    setCategory("all");
    setSkills([]);
    setVisible(perPage);
  }

  // Region filter only appears when the feed actually spans regions (i.e. the
  // region-locked set); the worldwide set is all "Anywhere" → one region → hidden.
  const regions = useMemo(() => availableRegions(activeJobs), [activeJobs]);
  const showRegions = regions.length > 1;
  // Category rail: only when the feed spans more than one category.
  const categories = useMemo(() => Array.from(new Set(activeJobs.map((j) => j.category))).sort(), [activeJobs]);
  const showCategories = categories.length > 1;

  const selected = new Set(skills.map((s) => s.toLowerCase()));

  function toggleSkill(skill: string) {
    const key = skill.toLowerCase();
    setSkills((prev) => (prev.map((s) => s.toLowerCase()).includes(key) ? prev.filter((s) => s.toLowerCase() !== key) : [...prev, skill]));
    setVisible(perPage);
  }

  const filtered = useMemo(() => {
    const floor = SALARY_BANDS.find((b) => b.id === band)?.min ?? 0;
    const q = query.trim().toLowerCase();
    return activeJobs.filter((j) => {
      if (q) {
        const hay = `${j.title} ${j.company_name} ${j.category} ${j.skills.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (selected.size) {
        const jobSkills = new Set(j.skills.map((s) => s.toLowerCase()));
        for (const s of selected) if (!jobSkills.has(s)) return false;
      }
      if (category !== "all" && j.category !== category) return false;
      if (emp !== "all" && j.employment_type !== emp) return false;
      if (region !== "any" && !jobRegions(j.location).includes(region)) return false;
      const mid = salaryMidpointUsd(j.salary);
      if (salaryOnly && mid == null) return false;
      if (floor > 0 && (mid == null || mid < floor)) return false;
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeJobs, query, skills, category, band, emp, region, salaryOnly]);

  const shown = filtered.slice(0, visible);
  const reset = () => setVisible(perPage);
  const activeCount =
    (category !== "all" ? 1 : 0) + (band !== "any" ? 1 : 0) + (emp !== "all" ? 1 : 0) + (region !== "any" ? 1 : 0) + (salaryOnly ? 1 : 0) + skills.length;

  const filterControls = (
    <div className="flex flex-col gap-4">
      {showCategories && (
        <FilterGroup label="Category">
          <FilterChip active={category === "all"} onClick={() => { setCategory("all"); reset(); }}>All roles</FilterChip>
          {categories.map((c) => (
            <FilterChip key={c} active={category === c} onClick={() => { setCategory(c); reset(); }}>{c}</FilterChip>
          ))}
        </FilterGroup>
      )}
      {showRegions && (
        <FilterGroup label="Region">
          <FilterChip active={region === "any"} onClick={() => { setRegion("any"); reset(); }}>All regions</FilterChip>
          {regions.map((r) => (
            <FilterChip key={r} active={region === r} onClick={() => { setRegion(r); reset(); }}>{r}</FilterChip>
          ))}
        </FilterGroup>
      )}
      <FilterGroup label="Salary">
        {SALARY_BANDS.map((b) => (
          <FilterChip key={b.id} active={band === b.id} onClick={() => { setBand(b.id); reset(); }}>{b.label}</FilterChip>
        ))}
      </FilterGroup>
      {/* Kept next to Salary so it stays visible without scrolling the rail. */}
      <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-600">
        <input
          type="checkbox"
          checked={salaryOnly}
          onChange={(e) => { setSalaryOnly(e.target.checked); reset(); }}
          className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
        />
        Salary listed only
      </label>
      <FilterGroup label="Type">
        {EMP_OPTIONS.map((o) => (
          <FilterChip key={o.id} active={emp === o.id} onClick={() => { setEmp(o.id); reset(); }}>{o.label}</FilterChip>
        ))}
      </FilterGroup>
      <p className="border-t border-ink-100 pt-3 text-[11px] leading-relaxed text-ink-400">
        Pay rating: <span className="font-semibold">$</span> entry · <span className="font-semibold">$$</span> mid ·{" "}
        <span className="font-semibold">$$$</span> high — by salary range.
      </p>
    </div>
  );

  return (
    <div>
      {/* Worldwide ↔ region-locked toggle. */}
      {hasRegional && (
        <div className="mb-4 inline-flex rounded-xl border border-ink-200 bg-white p-1 text-sm font-medium shadow-card">
          <button
            type="button"
            onClick={() => switchScope("worldwide")}
            aria-pressed={scope === "worldwide"}
            className={`rounded-lg px-3.5 py-1.5 transition ${scope === "worldwide" ? "pill-on" : "text-ink-600 hover:text-ink-900"}`}
          >
            Work from anywhere
          </button>
          <button
            type="button"
            onClick={() => switchScope("regional")}
            aria-pressed={scope === "regional"}
            className={`rounded-lg px-3.5 py-1.5 transition ${scope === "regional" ? "pill-on" : "text-ink-600 hover:text-ink-900"}`}
          >
            Remote in your region
          </button>
        </div>
      )}

      {/* Search (hidden when a page-level search already exists, e.g. the home hero). */}
      {showSearch && (
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); reset(); }}
            placeholder="Search roles, companies, or skills…"
            aria-label="Search jobs"
            className="w-full rounded-xl border border-ink-200 bg-white py-3.5 pl-12 pr-4 text-ink-900 shadow-card placeholder:text-ink-400 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200"
          />
        </div>
      )}

      {/* Selected skills */}
      {skills.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-ink-500">Filtering by:</span>
          {skills.map((s) => (
            <button key={s} type="button" onClick={() => toggleSkill(s)} className="pill-on inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-medium transition hover:opacity-90">
              {s} <CloseIcon className="h-3.5 w-3.5" />
            </button>
          ))}
          <button type="button" onClick={() => { setSkills([]); reset(); }} className="text-sm font-medium text-ink-500 underline-offset-2 hover:text-ink-900 hover:underline">Clear all</button>
        </div>
      )}

      {/* Mobile: collapsible filter panel so the feed starts immediately. */}
      <div className="mt-4 lg:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          aria-expanded={filtersOpen}
          className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-800 transition hover:bg-ink-50"
        >
          <FilterIcon />
          Filters
          {activeCount > 0 && (
            <span className="inline-flex min-w-[1.15rem] items-center justify-center rounded-full bg-ink-900 px-1.5 text-[11px] font-semibold text-white">{activeCount}</span>
          )}
          <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 text-ink-400 transition-transform ${filtersOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
        </button>
        {filtersOpen && (
          <div className="mt-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-card">{filterControls}</div>
        )}
      </div>

      {/* Desktop: filter sidebar + results so the first card is above the fold. */}
      <div className="mt-5 lg:grid lg:grid-cols-[248px_minmax(0,1fr)] lg:items-start lg:gap-8">
        {/* Sticky rail; scrolls internally when the filters are taller than the
            viewport so the lower filters stay reachable. */}
        <aside className="hidden lg:sticky lg:top-20 lg:block lg:max-h-[calc(100vh_-_6rem)] lg:overflow-y-auto lg:overscroll-contain">
          <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-card">{filterControls}</div>
        </aside>

        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              {filtered.length.toLocaleString("en-US")} {filtered.length === 1 ? "role" : "roles"}
            </span>
            <label className="flex items-center gap-2 text-xs font-medium text-ink-500">
              Show
              <span className="relative">
                <select
                  value={perPage}
                  onChange={(e) => { const n = Number(e.target.value); setPerPage(n); setVisible(n); }}
                  aria-label="Listings per page"
                  className="appearance-none rounded-md border border-ink-200 bg-white py-1.5 pl-3 pr-8 text-sm font-medium text-ink-800 transition hover:border-ink-300 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200"
                >
                  {PER_PAGE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
                <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
              </span>
              per page
            </label>
          </div>

          {shown.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-10 text-center text-ink-500">
              No roles match your search. Try removing a filter or a skill.
            </div>
          ) : (
            <div className="space-y-3">
              {shown.map((job, i) => (
                <Fragment key={job.slug}>
                  <JobCard job={job} onSkillClick={toggleSkill} activeSkills={skills} />
                  {/* Native ad between listings (self-hides when ads are off). */}
                  {(i + 1) % AD_EVERY === 0 && i < shown.length - 1 && <InFeedAd />}
                </Fragment>
              ))}
            </div>
          )}

          {visible < filtered.length && (
            <div className="mt-6 text-center">
              <button type="button" onClick={() => setVisible((v) => v + perPage)} className="btn-ghost">Show more roles</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 5h18M6 12h12M10 19h4" />
    </svg>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">{label}</span>
      {children}
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-sm font-medium transition ${
        active ? "pill-on" : "bg-ink-50 text-ink-600 ring-1 ring-ink-100 hover:text-ink-900 hover:ring-ink-200"
      }`}
    >
      {children}
    </button>
  );
}
