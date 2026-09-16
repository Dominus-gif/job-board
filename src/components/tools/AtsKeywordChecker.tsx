"use client";

import { useMemo, useState } from "react";
import { coverage } from "@/lib/toolkit/keywords";
import { skillLabel } from "@/lib/skill-labels";
import { Chip, Empty, Field, Meter, Segmented, ToolCard, fieldClass, type Tone } from "./kit";

const KIND_LABEL = { skill: "Skill", phrase: "Phrase", word: "Keyword" } as const;

export function AtsKeywordChecker() {
  const [jd, setJd] = useState("");
  const [cv, setCv] = useState("");
  const [show, setShow] = useState<"all" | "missing" | "found">("all");

  const result = useMemo(() => coverage(jd, cv), [jd, cv]);
  const ready = jd.trim().split(/\s+/).length >= 30 && cv.trim().length > 0;
  const tone: Tone = result.score >= 75 ? "ok" : result.score >= 50 ? "medium" : "high";
  const list = result.keywords.filter((k) => show === "all" || (show === "missing" ? !k.found : k.found));
  const maxWeight = Math.max(1, ...result.keywords.map((k) => k.weight));
  const missing = result.keywords.filter((k) => !k.found);

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <ToolCard>
          <Field label="Job description" hint="Paste the full posting.">
            {(id) => <textarea id={id} rows={12} value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste the job description…" className={`${fieldClass} resize-y`} />}
          </Field>
        </ToolCard>
        <ToolCard>
          <Field label="Your CV" hint="Paste it as plain text. It stays in your browser.">
            {(id) => <textarea id={id} rows={12} value={cv} onChange={(e) => setCv(e.target.value)} placeholder="Paste your CV…" className={`${fieldClass} resize-y`} />}
          </Field>
        </ToolCard>
      </div>

      <ToolCard>
        <div aria-live="polite">
          {!ready ? (
            <Empty>Paste a job description (at least a paragraph) and your CV to see the match.</Empty>
          ) : result.keywords.length === 0 ? (
            <Empty>We couldn&apos;t find repeated keywords in that description. Try pasting the full posting.</Empty>
          ) : (
            <div className="space-y-5">
              <Meter value={result.score} tone={tone} label="Keyword coverage, weighted by how often the posting uses each term" />
              {missing.length > 0 && (
                <p className="text-sm leading-relaxed text-ink-700">
                  The posting leans on{" "}
                  {missing
                    .slice(0, 5)
                    .map((k) => (k.kind === "skill" ? skillLabel(k.term) : k.term))
                    .join(", ")}
                  {missing.length > 5 ? " and more" : ""}, which your CV doesn&apos;t mention. Add the ones you genuinely have, in the same words the posting uses.
                </p>
              )}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-ink-900">{result.keywords.length} keywords from the posting</h3>
                <Segmented
                  size="sm"
                  ariaLabel="Filter keywords"
                  value={show}
                  onChange={setShow}
                  options={[
                    { value: "all", label: "All" },
                    { value: "missing", label: `Missing (${missing.length})` },
                    { value: "found", label: `Found (${result.keywords.length - missing.length})` },
                  ]}
                />
              </div>
              <ul className="viz space-y-1.5">
                {list.map((k) => (
                  <li key={k.term} className="grid grid-cols-[minmax(0,10rem)_1fr_auto] items-center gap-3 text-sm sm:grid-cols-[14rem_1fr_auto]">
                    <span className="truncate text-ink-800" title={k.term}>
                      {k.kind === "skill" ? skillLabel(k.term) : k.term}
                      <span className="ml-1.5 text-[11px] text-ink-500">{KIND_LABEL[k.kind]}</span>
                    </span>
                    <span className="relative h-2.5" title={`Used ${k.weight} times`}>
                      <span
                        className="absolute inset-y-0 left-0 rounded-r-[4px]"
                        style={{ width: `${(k.weight / maxWeight) * 100}%`, background: k.found ? "var(--viz-accent)" : "var(--viz-bar)" }}
                      />
                    </span>
                    <Chip tone={k.found ? "ok" : "high"}>{k.found ? "Found" : "Missing"}</Chip>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-ink-500">
                Bars show how often the posting uses each term. This is a simple frequency check, not a copy of any employer&apos;s screening software, so use it to spot gaps rather than to chase a perfect score.
              </p>
            </div>
          )}
        </div>
      </ToolCard>
    </div>
  );
}
