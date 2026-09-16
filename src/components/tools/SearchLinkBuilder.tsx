"use client";

import { useState } from "react";
import Link from "next/link";
import { Select } from "@/components/ui/Select";
import type { SearchCounts } from "@/lib/tool-data";
import { Field, Segmented, ToolCard, buttonClass, fieldClass, ghostButtonClass, selectBtnClass } from "./kit";

// Mirrors the parameters /jobs accepts (src/app/jobs/page.tsx).
const TYPES = ["Full-Time", "Part-Time", "Contract"];
const REGIONS = ["United States", "Europe", "UK", "Asia-Pacific", "Canada", "India", "Latin America", "Middle East"];
const SALARY = [
  { id: "", label: "Any salary" },
  { id: "50k", label: "$50k+" },
  { id: "80k", label: "$80k+" },
  { id: "100k", label: "$100k+" },
  { id: "150k", label: "$150k+" },
  { id: "200k", label: "$200k+" },
];

export function SearchLinkBuilder({ counts, categories }: { counts: SearchCounts; categories: string[] }) {
  const [q, setQ] = useState("");
  const [scope, setScope] = useState<"" | "worldwide" | "regional">("worldwide");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState("");
  const [disc, setDisc] = useState<"no" | "yes">("no");
  const [sort, setSort] = useState<"newest" | "" | "salary">("newest");
  const [copied, setCopied] = useState(false);

  const sp = new URLSearchParams();
  if (q.trim()) sp.set("q", q.trim());
  if (type) sp.set("type", type);
  if (salary) sp.set("salary", salary);
  if (scope !== "worldwide" && region) sp.set("region", region);
  if (category) sp.set("category", category);
  if (scope) sp.set("scope", scope);
  if (disc === "yes" || salary) sp.set("disc", "1");
  if (sort) sp.set("sort", sort);
  const path = `/jobs${sp.toString() ? `?${sp}` : ""}`;
  const full = `https://getremotejobsnow.com${path}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const summary = [
    q.trim() && `“${q.trim()}”`,
    category || "all categories",
    scope === "worldwide" ? "open worldwide" : scope === "regional" ? `restricted to ${region || "a region"}` : region ? `open in ${region}` : "any location",
    type,
    salary && SALARY.find((s) => s.id === salary)?.label,
    disc === "yes" && !salary && "salary shown",
    sort === "newest" ? "newest first" : sort === "salary" ? "highest pay first" : "best match first",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="space-y-5">
      <ToolCard>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Keywords" hint="Matches titles, companies and skills.">
            {(id) => <input id={id} value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. customer success, python" className={fieldClass} />}
          </Field>
          <Field label="Category">
            {() => (
              <Select
                value={category}
                onValueChange={setCategory}
                options={[{ value: "", label: "All categories" }, ...categories.map((c) => ({ value: c, label: `${c} (${(counts.byCategory[c] ?? 0).toLocaleString("en-US")})` }))]}
                ariaLabel="Category"
                buttonClassName={selectBtnClass}
              />
            )}
          </Field>
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink-700">Location</span>
          <Segmented
            ariaLabel="Location scope"
            value={scope}
            onChange={setScope}
            options={[
              { value: "worldwide", label: "Work from anywhere" },
              { value: "regional", label: "Region-locked" },
              { value: "", label: "Both" },
            ]}
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {scope !== "worldwide" && (
            <Field label="Region">
              {() => (
                <Select value={region} onValueChange={setRegion} options={[{ value: "", label: "Any region" }, ...REGIONS.map((r) => ({ value: r, label: r }))]} ariaLabel="Region" buttonClassName={selectBtnClass} />
              )}
            </Field>
          )}
          <Field label="Job type">
            {() => <Select value={type} onValueChange={setType} options={[{ value: "", label: "Any type" }, ...TYPES.map((t) => ({ value: t, label: t }))]} ariaLabel="Job type" buttonClassName={selectBtnClass} />}
          </Field>
          <Field label="Minimum pay">
            {() => <Select value={salary} onValueChange={setSalary} options={SALARY.map((s) => ({ value: s.id, label: s.label }))} ariaLabel="Minimum pay" buttonClassName={selectBtnClass} />}
          </Field>
        </div>

        <div className="mt-4 flex flex-wrap gap-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink-700">Only roles that show pay</span>
            <Segmented size="sm" ariaLabel="Only roles that show pay" value={salary ? "yes" : disc} onChange={setDisc} options={[{ value: "no", label: "No" }, { value: "yes", label: "Yes" }]} />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink-700">Order</span>
            <Segmented
              size="sm"
              ariaLabel="Sort order"
              value={sort}
              onChange={setSort}
              options={[
                { value: "newest", label: "Newest" },
                { value: "", label: "Best match" },
                { value: "salary", label: "Highest pay" },
              ]}
            />
          </div>
        </div>
      </ToolCard>

      <ToolCard>
        <div aria-live="polite" className="space-y-3">
          <p className="text-sm text-ink-500">Your search</p>
          <p className="font-display text-lg font-bold text-ink-900">{summary}</p>
          <code className="block break-all rounded-lg bg-ink-50 p-3 text-sm text-ink-800">{full}</code>
          <div className="flex flex-wrap gap-2">
            <Link href={path} className={buttonClass}>
              Open this search
            </Link>
            <button type="button" className={ghostButtonClass} onClick={copy}>
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
          <p className="text-xs text-ink-500">
            Bookmark the opened page to come back to the same filters. Right now the board has {counts.total.toLocaleString("en-US")} listings, {counts.worldwide.toLocaleString("en-US")} open worldwide and {counts.newThisWeek.toLocaleString("en-US")} posted in the last week.
          </p>
        </div>
      </ToolCard>

      <p className="text-sm text-ink-500">
        Prefer updates without visiting?{" "}
        <Link href="/rss-feeds" className="font-medium text-brand-600 hover:text-brand-700">
          Follow a category by RSS
        </Link>
        .
      </p>
    </div>
  );
}
