"use client";

import { useMemo, useState } from "react";
import { QUESTIONS, scoreFakeJob, type Answer, type QuestionId, type Severity } from "@/lib/toolkit/fake-job";
import { Chip, Empty, Field, Meter, Segmented, ToolCard, fieldClass, ghostButtonClass, type Tone } from "./kit";

const SAMPLE = `Hi! Your profile was selected for a Remote Data Entry Assistant role. No experience needed, work just 2 hours a day and earn $900 per week. The interview will be on Telegram. After onboarding we will mail you a cheque to buy your equipment from our approved vendor. Please send your bank details and a copy of your passport today, positions are limited. Contact hr.recruitment.team@gmail.com`;

const SEV_TONE: Record<Severity, Tone> = { critical: "critical", high: "high", medium: "medium", low: "neutral" };
const SEV_LABEL: Record<Severity, string> = { critical: "Critical", high: "High", medium: "Medium", low: "Low" };

const LEVEL: Record<string, { tone: Tone; label: string; advice: string }> = {
  low: { tone: "ok", label: "Few warning signs found", advice: "Nothing here matches common scam patterns. Still confirm the role on the employer's own careers page before sharing personal details." },
  caution: { tone: "medium", label: "Some warning signs", advice: "Verify the employer independently before you go further: find the role on their site and check who is contacting you." },
  high: { tone: "high", label: "Likely a scam", advice: "Stop and verify before sharing anything. Don't send money, documents or bank details." },
  "very-high": { tone: "critical", label: "Very likely a scam", advice: "Stop engaging. Don't send money, documents or bank details, and report the posting to the site that showed it to you." },
};

export function FakeJobChecker() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [answers, setAnswers] = useState<Partial<Record<QuestionId, Answer>>>({});

  const result = useMemo(() => scoreFakeJob({ text, email, website, answers }), [text, email, website, answers]);
  const lvl = LEVEL[result.level];

  return (
    <div className="space-y-5">
      <ToolCard>
        <div className="space-y-4">
          <Field label="Job ad or recruiter message" hint="Paste the posting, an email or a chat message. Everything is checked in your browser and never sent anywhere.">
            {(id) => (
              <textarea
                id={id}
                rows={7}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the text here…"
                className={`${fieldClass} resize-y leading-relaxed`}
              />
            )}
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Recruiter's email address (optional)">
              {(id) => <input id={id} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className={fieldClass} />}
            </Field>
            <Field label="Company website (optional)" hint="Type it yourself, don't copy it from the message.">
              {(id) => <input id={id} type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="company.com" className={fieldClass} />}
            </Field>
          </div>
          <button type="button" className={ghostButtonClass} onClick={() => setText(SAMPLE)}>
            Try an example scam message
          </button>
        </div>
      </ToolCard>

      <ToolCard>
        <h2 className="font-display text-base font-bold text-ink-900">What happened so far?</h2>
        <p className="mt-1 text-sm text-ink-500">Answer what you know. Leave the rest as &ldquo;Not sure&rdquo;.</p>
        <ul className="mt-4 divide-y divide-ink-100">
          {QUESTIONS.map((q) => (
            <li key={q.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <span className="min-w-0 text-sm leading-relaxed text-ink-700">{q.label}</span>
              <Segmented
                size="sm"
                ariaLabel={q.label}
                value={answers[q.id] ?? "unknown"}
                onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "unknown", label: "Not sure" },
                ]}
              />
            </li>
          ))}
        </ul>
      </ToolCard>

      <ToolCard>
        <div aria-live="polite">
          {!result.checked ? (
            <Empty>Paste a message or answer a question to see the report.</Empty>
          ) : (
            <div className="space-y-4">
              <Meter value={result.score} tone={lvl.tone} label={`Risk score: ${lvl.label}`} />
              <p className="text-sm leading-relaxed text-ink-700">{lvl.advice}</p>

              {result.flags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-ink-900">
                    {result.flags.length} red {result.flags.length === 1 ? "flag" : "flags"}
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {result.flags.map((f) => (
                      <li key={f.id} className="rounded-xl bg-ink-50 p-3.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <Chip tone={SEV_TONE[f.severity]}>{SEV_LABEL[f.severity]}</Chip>
                          <span className="text-sm font-semibold text-ink-900">{f.title}</span>
                          <span className="ml-auto text-xs tabular-nums text-ink-500">+{f.points}</span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{f.detail}</p>
                        {f.evidence && (
                          <p className="mt-1.5 break-words border-l-2 border-ink-200 pl-3 text-xs italic text-ink-500">&ldquo;{f.evidence}&rdquo;</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.reassurances.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-ink-900">Good signs</h3>
                  <ul className="mt-2 space-y-1.5">
                    {result.reassurances.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-ink-700">
                        <Chip tone="ok">OK</Chip>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </ToolCard>
    </div>
  );
}
