"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { TitleFinderData } from "@/lib/tool-data";
import { Empty, ToolCard, fieldClass } from "./kit";

/**
 * Searches people commonly type, mapped to the titles employers tend to use
 * for the same work. The counts beside each suggestion are always read live
 * from the board data, so a suggestion with nothing behind it shows zero
 * rather than being asserted.
 */
export const INTENTS: { triggers: string[]; suggest: string[] }[] = [
  { triggers: ["ux designer", "ui designer", "ux/ui", "ui/ux", "web designer", "ux"], suggest: ["product designer", "designer", "ux researcher"] },
  { triggers: ["programmer", "coder", "developer", "web developer", "software developer"], suggest: ["software engineer", "full stack engineer", "frontend engineer", "backend engineer"] },
  { triggers: ["salesperson", "sales rep", "sales representative", "seller", "sales"], suggest: ["account executive", "business development representative", "account manager"] },
  { triggers: ["customer service", "call center", "call centre", "support"], suggest: ["customer success manager", "customer support", "support engineer"] },
  { triggers: ["data analyst", "analyst"], suggest: ["data analyst", "data scientist", "analytics engineer", "business analyst"] },
  { triggers: ["devops", "sysadmin", "system administrator", "systems administrator"], suggest: ["site reliability engineer", "platform engineer", "devops engineer", "infrastructure engineer"] },
  { triggers: ["virtual assistant", "personal assistant", "admin", "assistant"], suggest: ["executive assistant", "operations"] },
  { triggers: ["writer", "copywriter", "content writer"], suggest: ["technical writer", "copywriter", "content"] },
  { triggers: ["hr", "human resources", "recruiter"], suggest: ["recruiter", "people", "talent"] },
  { triggers: ["project manager", "pm"], suggest: ["program manager", "project manager", "product manager"] },
  { triggers: ["ai", "machine learning", "ml"], suggest: ["machine learning engineer", "ai engineer", "research engineer", "applied scientist"] },
];

const EXAMPLES = ["UX designer", "programmer", "salesperson", "customer service", "data analyst", "devops", "virtual assistant", "writer"];
const STOP = new Set(["the", "of", "a", "an", "and", "for", "remote", "job", "jobs", "role", "roles", "work"]);
const UPPER = new Set(["ux", "ui", "qa", "sre", "ai", "ml", "sdr", "bdr", "hr", "it", "vp", "cto", "ceo", "cfo", "coo", "cx", "bi", "llm", "ios", "api", "gtm", "abm", "seo", "ppc", "b2b", "b2c", "saas", "erp", "crm", "pr", "fp&a"]);

export function displayTitle(t: string): string {
  return t
    .split(" ")
    .map((w) => (UPPER.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

const tokens = (q: string) =>
  q
    .toLowerCase()
    .split(/[^a-z0-9&+#/]+/)
    .filter((w) => w.length > 1 && !STOP.has(w));

export function searchTitles(titles: TitleFinderData["titles"], query: string) {
  const q = query.trim().toLowerCase();
  const words = tokens(q);
  if (!words.length) return { mode: "top" as const, rows: titles.slice(0, 20) };
  const all = titles.filter(([t]) => words.every((w) => t.includes(w)));
  if (all.length) return { mode: "all" as const, rows: all.slice(0, 30) };
  const any = titles.filter(([t]) => words.some((w) => t.split(" ").includes(w)));
  return { mode: "any" as const, rows: any.slice(0, 30) };
}

export function JobTitleFinder({ data }: { data: TitleFinderData }) {
  const [query, setQuery] = useState("");
  const result = useMemo(() => searchTitles(data.titles, query), [data, query]);
  const q = query.trim().toLowerCase();

  // Listings whose title contains the phrase, summed across base titles.
  const countFor = useMemo(() => {
    const cache = new Map<string, number>();
    return (phrase: string) => {
      if (!cache.has(phrase)) cache.set(phrase, data.titles.reduce((n, [t, c]) => (t.includes(phrase) ? n + c : n), 0));
      return cache.get(phrase)!;
    };
  }, [data]);

  const intent = q ? INTENTS.find((i) => i.triggers.some((t) => q === t || (t.length > 3 && q.includes(t)))) : undefined;
  const typed = q ? countFor(q) : 0;
  const totalRoles = result.rows.reduce((n, r) => n + r[1], 0);
  const totalWw = result.rows.reduce((n, r) => n + r[2], 0);

  return (
    <div className="space-y-5">
      <ToolCard>
        <label htmlFor="title-q" className="text-sm font-medium text-ink-700">
          A job title, or the kind of work you do
        </label>
        <input
          id="title-q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. UX designer, programmer, customer service"
          className={`${fieldClass} mt-1.5`}
          autoComplete="off"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setQuery(ex)}
              className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-700 transition hover:bg-ink-50 hover:text-ink-900"
            >
              {ex}
            </button>
          ))}
        </div>
      </ToolCard>

      {intent && (
        <ToolCard>
          <h2 className="font-display text-lg font-bold text-ink-900">Employers tend to use different words for this</h2>
          <p className="mt-1 text-sm text-ink-600">
            {typed > 0 ? (
              <>
                &ldquo;{query.trim()}&rdquo; appears in <strong>{typed}</strong> {typed === 1 ? "title" : "titles"} on the board. The titles below cover the same kind of work, and each count includes every variant, such as Senior or Lead:
              </>
            ) : (
              <>No title on the board contains &ldquo;{query.trim()}&rdquo;. The titles below cover the same kind of work, and each count includes every variant, such as Senior or Lead:</>
            )}
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {intent.suggest.map((s) => {
              const n = countFor(s);
              return (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => setQuery(s)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg border border-ink-100 px-3 py-2 text-left text-sm transition hover:bg-ink-50"
                  >
                    <span className="font-medium text-ink-900">{displayTitle(s)}</span>
                    <span className="shrink-0 tabular-nums text-ink-500">{n} {n === 1 ? "role" : "roles"}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </ToolCard>
      )}

      <ToolCard>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-lg font-bold text-ink-900">
            {result.mode === "top" ? "The most common titles on the board" : "Titles employers use"}
          </h2>
          {result.mode !== "top" && result.rows.length > 0 && (
            <p className="text-xs text-ink-500">
              {totalRoles} {totalRoles === 1 ? "role" : "roles"} shown · {totalWw} open worldwide
            </p>
          )}
        </div>
        {result.mode === "any" && result.rows.length > 0 && (
          <p className="mt-1 text-xs text-ink-500">No title contains every word you typed, so these contain at least one of them.</p>
        )}
        {result.rows.length === 0 ? (
          <div className="mt-3">
            <Empty>No title on the board matches that. Try a broader word, or one of the examples above.</Empty>
          </div>
        ) : (
          <ul className="mt-3 divide-y divide-ink-100">
            {result.rows.map(([t, n, w]) => (
              <li key={t} className="flex items-center justify-between gap-3 py-2">
                <Link href={`/jobs?q=${encodeURIComponent(t)}`} className="min-w-0 break-words font-medium text-ink-900 underline-offset-2 hover:underline">
                  {displayTitle(t)}
                </Link>
                <span className="shrink-0 text-right text-sm tabular-nums text-ink-600">
                  {n} {n === 1 ? "role" : "roles"}
                  {w > 0 && <span className="ml-2 text-xs text-ink-500">({w} anywhere)</span>}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-xs leading-relaxed text-ink-500">
          From {data.total.toLocaleString("en-US")} listings on {data.asOf}. Titles are grouped by the job they name: levels such as
          &ldquo;Senior&rdquo; and team names after a comma are set aside, so &ldquo;Senior Software Engineer, Billing&rdquo; counts as
          Software Engineer.
        </p>
      </ToolCard>
    </div>
  );
}
