"use client";

import { useEffect, useMemo, useState } from "react";
import { Select } from "@/components/ui/Select";
import { buildLetter, checkLetter, type Authorisation, type LetterInput } from "@/lib/toolkit/cover-letter";
import { CITIES, offsetMinutes } from "@/lib/toolkit/timezones";
import { workingOverlap } from "./TimezoneOverlap";
import { Chip, Field, NumberInput, ToolCard, buttonClass, downloadFile, fieldClass, ghostButtonClass, loadJson, saveJson, selectBtnClass } from "./kit";

const KEY = "grjn:cover-letter:v1";

interface Draft extends Omit<LetterInput, "overlapHours" | "teamPlace"> {
  myCity: string;
  teamCity: string;
}

const START: Draft = {
  name: "",
  role: "",
  company: "",
  greeting: "Hello",
  why: "",
  wins: ["", "", ""],
  remoteYears: 0,
  asyncExample: "",
  where: "",
  myCity: "",
  teamCity: "",
  flexible: true,
  authorisation: "omit",
  roleCountry: "",
};

const AUTH: { value: Authorisation; label: string }[] = [
  { value: "omit", label: "Leave it out" },
  { value: "local", label: "I have the right to work where the role is based" },
  { value: "contractor", label: "I can work as a contractor" },
  { value: "eor", label: "I can be hired through an employer of record" },
];

const textareaClass = `${fieldClass} min-h-[84px] resize-y`;

export function RemoteCoverLetter() {
  const [d, setD] = useState<Draft>(START);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setD({ ...START, ...loadJson<Partial<Draft>>(KEY, {}) });
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) saveJson(KEY, d);
  }, [d, loaded]);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((p) => ({ ...p, [k]: v }));

  // Overlap of two standard 9:00 to 17:00 days, on today's clocks.
  const overlapHours = useMemo(() => {
    const a = CITIES.find((c) => c.label === d.myCity);
    const b = CITIES.find((c) => c.label === d.teamCity);
    if (!a || !b) return null;
    const now = new Date();
    const r = workingOverlap(offsetMinutes(a.zone, now), offsetMinutes(b.zone, now));
    return Math.round((r.minutes / 60) * 2) / 2;
  }, [d.myCity, d.teamCity]);

  const input: LetterInput = { ...d, overlapHours, teamPlace: d.teamCity };
  const letter = buildLetter(input);
  const checks = checkLetter(input, letter);
  const cityOptions = [{ value: "", label: "Choose a city" }, ...CITIES.map((c) => ({ value: c.label, label: c.label }))];

  async function copy() {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked: the letter is still selectable on the page */
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <ToolCard className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="The role">{(id) => <input id={id} value={d.role} onChange={(e) => set("role", e.target.value)} className={fieldClass} placeholder="Senior Product Designer" />}</Field>
          <Field label="The company">{(id) => <input id={id} value={d.company} onChange={(e) => set("company", e.target.value)} className={fieldClass} placeholder="Acme" />}</Field>
        </div>
        <Field label="Greeting" hint="The hiring manager's name if the posting gives it, or the team.">
          {(id) => <input id={id} value={d.greeting} onChange={(e) => set("greeting", e.target.value)} className={fieldClass} placeholder="Dear Priya" />}
        </Field>
        <Field label="Why this company, in a sentence or two" hint="Something specific: their product, a post they wrote, a problem they are solving. Name the company.">
          {(id) => <textarea id={id} value={d.why} onChange={(e) => set("why", e.target.value)} className={textareaClass} placeholder="I've used Acme's API to ship two client projects, and the way your docs explain rate limits is the standard I hold my own writing to." />}
        </Field>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-ink-700">Up to three results, each with a number</legend>
          {d.wins.map((w, i) => (
            <input
              key={i}
              aria-label={`Result ${i + 1}`}
              value={w}
              onChange={(e) => set("wins", d.wins.map((x, j) => (j === i ? e.target.value : x)))}
              className={fieldClass}
              placeholder={["Cut checkout drop-off by 18% by redesigning the payment step", "Ran research with 40 customers across 6 countries", "Wrote the design system docs used by 3 product teams"][i]}
            />
          ))}
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Years working remotely">{(id) => <NumberInput id={id} value={d.remoteYears} onChange={(n) => set("remoteYears", Math.max(0, Math.round(n)))} />}</Field>
          <Field label="Where you live">{(id) => <input id={id} value={d.where} onChange={(e) => set("where", e.target.value)} className={fieldClass} placeholder="Lisbon, Portugal" />}</Field>
        </div>
        <Field label="One example of working in writing" hint="A document, handover or decision you drove without a meeting. This is the remote skill employers screen for.">
          {(id) => <textarea id={id} value={d.asyncExample} onChange={(e) => set("asyncExample", e.target.value)} className={textareaClass} placeholder="At my last job I replaced our weekly status meeting with a written update that the US and India teams read on their own time." />}
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nearest city to you">
            {() => <Select value={d.myCity} onValueChange={(v) => set("myCity", v)} options={cityOptions} ariaLabel="Nearest city to you" buttonClassName={selectBtnClass} />}
          </Field>
          <Field label="Where the team works">
            {() => <Select value={d.teamCity} onValueChange={(v) => set("teamCity", v)} options={cityOptions} ariaLabel="Where the team works" buttonClassName={selectBtnClass} />}
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" checked={d.flexible} onChange={(e) => set("flexible", e.target.checked)} className="h-4 w-4" />
          Offer to shift my hours to cover theirs
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="How you can be hired" hint="Only include what is true and what the posting raises.">
            {() => <Select value={d.authorisation} onValueChange={(v) => set("authorisation", v as Authorisation)} options={AUTH} ariaLabel="How you can be hired" buttonClassName={selectBtnClass} />}
          </Field>
          {d.authorisation === "local" && (
            <Field label="Country the role is in">{(id) => <input id={id} value={d.roleCountry} onChange={(e) => set("roleCountry", e.target.value)} className={fieldClass} placeholder="the United Kingdom" />}</Field>
          )}
        </div>
        <Field label="Your name">{(id) => <input id={id} value={d.name} onChange={(e) => set("name", e.target.value)} className={fieldClass} />}</Field>
      </ToolCard>

      <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <ToolCard>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-lg font-bold text-ink-900">Your letter</h2>
            <div className="flex gap-2">
              <button type="button" onClick={copy} className={buttonClass}>
                {copied ? "Copied" : "Copy"}
              </button>
              <button type="button" onClick={() => downloadFile(`cover-letter${d.company ? `-${d.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : ""}.txt`, letter, "text/plain")} className={ghostButtonClass}>
                Download
              </button>
            </div>
          </div>
          <div className="mt-4 whitespace-pre-wrap rounded-xl bg-ink-50 p-4 text-[15px] leading-relaxed text-ink-800">{letter}</div>
          {overlapHours != null && (
            <p className="mt-3 text-xs text-ink-500">
              Overlap counts two 9:00 to 17:00 days on today&rsquo;s clocks: {overlapHours} {overlapHours === 1 ? "hour" : "hours"} between {d.myCity} and {d.teamCity}.
            </p>
          )}
        </ToolCard>
        <ToolCard>
          <h2 className="font-display text-base font-bold text-ink-900">What a remote hiring manager looks for</h2>
          <ul className="mt-3 space-y-2">
            {checks.map((c) => (
              <li key={c.label} className="flex items-start gap-2 text-sm text-ink-700">
                <Chip tone={c.ok ? "ok" : "neutral"}>{c.ok ? "Done" : "Missing"}</Chip>
                <span>{c.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xs text-ink-500">Your answers are saved in this browser only.</p>
            <button type="button" onClick={() => setD(START)} className="text-xs font-medium text-ink-600 underline-offset-2 hover:underline">
              Clear
            </button>
          </div>
        </ToolCard>
      </div>
    </div>
  );
}
