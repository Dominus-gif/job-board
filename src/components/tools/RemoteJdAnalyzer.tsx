"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { analyzeRemote, type RemoteVerdict, type SignalKind } from "@/lib/toolkit/remote-analyzer";
import { findPhrase } from "@/lib/pipeline/phrase";
import { Chip, Empty, Field, ToolCard, fieldClass, ghostButtonClass, type Tone } from "./kit";

const SAMPLE = `Senior Product Designer (Remote)

We're a fully remote team building tools for finance teams. You'll own the design of our reporting product end to end.

What we offer: a home office budget, flexible hours and a learning stipend.

This role is hybrid, with two days a week in our London office. Candidates must be authorized to work in the UK, and we are unable to provide visa sponsorship. You should be available during core hours of 10:00–16:00 GMT.`;

const VERDICT: Record<RemoteVerdict, { tone: Tone; title: string; body: string }> = {
  worldwide: { tone: "ok", title: "Looks open to anyone, anywhere", body: "We found an explicit worldwide signal and no location, visa, office or timezone clause. This would pass our work-from-anywhere filter. Still check the employer's own posting for anything not in the text you pasted." },
  restricted: { tone: "medium", title: "Remote, but with limits", body: "The posting names a place, a work permit or a timezone requirement. It may still be a good remote job, but it isn't open to everyone. Check that you meet the conditions before applying." },
  onsite: { tone: "critical", title: "Not fully remote", body: "The text mentions hybrid, on-site or office work. Whatever the title says, expect to be in an office at least some of the time." },
  unclear: { tone: "neutral", title: "Remote, but location is unclear", body: "The posting says remote without saying where from. Our filter treats this as not proven worldwide. Ask the recruiter which countries they can hire in." },
  "not-remote": { tone: "neutral", title: "No remote signal found", body: "We couldn't find any mention of remote work. Paste the full description, including the location line, if you have it." },
};

const KIND: Record<SignalKind, { tone: Tone; label: string }> = {
  onsite: { tone: "critical", label: "Office or hybrid" },
  restriction: { tone: "high", label: "Location or work permit" },
  timezone: { tone: "medium", label: "Timezone or hours" },
  anywhere: { tone: "ok", label: "Worldwide signal" },
  remote: { tone: "info", label: "Remote signal" },
};

function Highlighted({ text, marks }: { text: string; marks: { start: number; end: number; kind: SignalKind }[] }) {
  const sorted = [...marks].sort((a, b) => a.start - b.start || b.end - a.end);
  const out: ReactNode[] = [];
  let at = 0;
  for (const m of sorted) {
    if (m.start < at) continue; // skip overlaps; the first (longest) match wins
    if (m.start > at) out.push(text.slice(at, m.start));
    out.push(
      <mark key={m.start} className={`tone-${KIND[m.kind].tone} rounded px-0.5`} title={KIND[m.kind].label}>
        {text.slice(m.start, m.end)}
      </mark>,
    );
    at = m.end;
  }
  out.push(text.slice(at));
  return <div className="max-h-80 overflow-auto whitespace-pre-wrap rounded-xl bg-ink-50 p-4 text-sm leading-relaxed text-ink-700">{out}</div>;
}

export function RemoteJdAnalyzer() {
  const [text, setText] = useState("");
  const [location, setLocation] = useState("");
  const result = useMemo(() => analyzeRemote(text, location), [text, location]);

  const marks = useMemo(() => {
    const list: { start: number; end: number; kind: SignalKind }[] = [];
    for (const s of result.signals) {
      const hits = findPhrase(text, s.phrase);
      const fallback = hits.length ? hits : [...text.matchAll(new RegExp(s.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"))].map((m) => [m.index ?? 0, (m.index ?? 0) + m[0].length] as [number, number]);
      for (const [start, end] of fallback) list.push({ start, end, kind: s.kind });
    }
    return list;
  }, [result, text]);

  const v = VERDICT[result.verdict];
  const counts = result.signals.reduce<Record<string, number>>((acc, s) => ((acc[s.kind] = (acc[s.kind] ?? 0) + s.count), acc), {});
  const hasText = text.trim().length > 0;

  return (
    <div className="space-y-5">
      <ToolCard>
        <div className="space-y-4">
          <Field label="Job description" hint="Paste the whole posting, including the benefits and the small print at the end. Nothing leaves your browser.">
            {(id) => (
              <textarea id={id} rows={9} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste the job description…" className={`${fieldClass} resize-y leading-relaxed`} />
            )}
          </Field>
          <Field label="Location line (optional)" hint='The location shown on the listing, such as "Remote, US" or "Anywhere".'>
            {(id) => <input id={id} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Remote — Europe" className={fieldClass} />}
          </Field>
          <button type="button" className={ghostButtonClass} onClick={() => { setText(SAMPLE); setLocation("Remote"); }}>
            Try an example posting
          </button>
        </div>
      </ToolCard>

      <ToolCard>
        <div aria-live="polite">
          {!hasText ? (
            <Empty>Paste a description to see the verdict.</Empty>
          ) : (
            <div className="space-y-5">
              <div className={`tone-${v.tone} rounded-xl p-4`}>
                <p className="font-display text-lg font-bold">{v.title}</p>
                <p className="mt-1 text-sm leading-relaxed">{v.body}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {(Object.keys(KIND) as SignalKind[]).map((k) => (
                  <Chip key={k} tone={counts[k] ? KIND[k].tone : "neutral"}>
                    {KIND[k].label}: {counts[k] ?? 0}
                  </Chip>
                ))}
              </div>

              {result.signals.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-ink-900">What we found</h3>
                  <ul className="mt-2 space-y-2">
                    {result.signals.map((s) => (
                      <li key={`${s.kind}:${s.phrase}`} className="rounded-xl bg-ink-50 p-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Chip tone={KIND[s.kind].tone}>{KIND[s.kind].label}</Chip>
                          <span className="text-sm font-semibold text-ink-900">&ldquo;{s.phrase}&rdquo;</span>
                          {s.count > 1 && <span className="text-xs text-ink-500">×{s.count}</span>}
                        </div>
                        <p className="mt-1.5 break-words text-xs italic text-ink-500">{s.snippet}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-ink-900">Your text, highlighted</h3>
                <div className="mt-2">
                  <Highlighted text={text} marks={marks} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolCard>
      <p className="text-sm text-ink-500">
        Want roles that already pass these checks?{" "}
        <Link href="/work-from-anywhere-jobs" className="font-medium text-brand-600 hover:text-brand-700">
          Browse the work-from-anywhere board
        </Link>
        .
      </p>
    </div>
  );
}
