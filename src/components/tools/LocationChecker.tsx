"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Select } from "@/components/ui/Select";
import type { LocationCheckerData } from "@/lib/tool-data";
import { COUNTRIES, checkLocation, countryName, type Inclusion } from "@/lib/toolkit/location-check";
import { Chip, Field, Stat, ToolCard, fieldClass, selectBtnClass, type Tone } from "./kit";

const EXAMPLES = [
  "Remote - EMEA",
  "Remote, US or Canada",
  "LATAM",
  "Remote (DACH)",
  "Europe, CET ± 3 hours",
  "UTC-3 to UTC+3",
  "Anywhere in the world",
  "Remote",
];

/** UTC offsets in use today, half and quarter hours included. */
const OFFSETS = [
  -12, -11, -10, -9.5, -9, -8, -7, -6, -5, -4, -3.5, -3, -2, -1, 0, 1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 8, 8.75, 9, 9.5, 10, 10.5, 11, 12,
  12.75, 13, 14,
];

const offsetLabel = (h: number) => {
  const sign = h < 0 ? "−" : "+";
  const abs = Math.abs(h);
  const mins = Math.round((abs % 1) * 60);
  return `UTC${h === 0 ? "" : sign + Math.floor(abs)}${mins ? `:${String(mins).padStart(2, "0")}` : ""}`;
};

/** The /jobs region filter a country falls under, where the board has one. */
function boardRegion(code: string): string | null {
  if (code === "US") return "United States";
  if (code === "GB") return "UK";
  if (code === "CA") return "Canada";
  if (code === "IN") return "India";
  const europe = "AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS NO CH UA RS".split(" ");
  if (europe.includes(code)) return "Europe";
  if ("MX GT HN SV NI CR PA CU DO PR CO VE EC PE BO BR PY UY AR CL".split(" ").includes(code)) return "Latin America";
  if ("AU NZ JP KR CN HK TW SG MY ID TH VN PH".split(" ").includes(code)) return "Asia-Pacific";
  if ("AE SA QA KW BH OM JO LB IL".split(" ").includes(code)) return "Middle East";
  if ("NG KE GH ZA EG MA TN RW UG TZ ET SN".split(" ").includes(code)) return "Africa";
  return null;
}

const TONE: Record<"open" | "closed" | "unclear", Tone> = { open: "ok", closed: "critical", unclear: "medium" };
const LABEL: Record<"open" | "closed" | "unclear", string> = { open: "You can apply", closed: "Not open to you", unclear: "Unclear" };
const INCLUDES: Record<Inclusion, [Tone, string]> = { yes: ["ok", "includes you"], edge: ["medium", "may include you"], no: ["neutral", "does not include you"] };

export function LocationChecker({ data }: { data: LocationCheckerData }) {
  const [line, setLine] = useState("Remote - EMEA");
  const [country, setCountry] = useState("DE");
  const [offset, setOffset] = useState<string>("");

  // The visitor's own country and time zone, read after hydration so the
  // server-rendered page and the first client render agree.
  useEffect(() => {
    const region = (navigator.languages?.[0] ?? navigator.language ?? "").split("-")[1]?.toUpperCase();
    if (region && COUNTRIES.some((c) => c.code === region)) setCountry(region);
    const h = -new Date().getTimezoneOffset() / 60;
    if (OFFSETS.includes(h)) setOffset(String(h));
  }, []);

  const result = useMemo(() => checkLocation(line, country, offset === "" ? null : Number(offset)), [line, country, offset]);
  const regional = data.countries[country]?.[0] ?? 0;
  const employers = data.countries[country]?.[1] ?? [];
  const region = boardRegion(country);
  const notes = result.places.filter((p) => p.kind === "region" && p.note);

  return (
    <div className="space-y-5">
      <ToolCard>
        <Field label="The location line from the job ad" hint="Paste what the listing says under Location, or the sentence about where you can work.">
          {(id) => (
            <input id={id} value={line} onChange={(e) => setLine(e.target.value)} className={fieldClass} placeholder="e.g. Remote - EMEA" autoComplete="off" />
          )}
        </Field>
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setLine(ex)}
              className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-700 transition hover:bg-ink-50 hover:text-ink-900"
            >
              {ex}
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Where you live">
            {() => (
              <Select
                value={country}
                onValueChange={setCountry}
                options={COUNTRIES.map((c) => ({ value: c.code, label: c.name }))}
                ariaLabel="Where you live"
                buttonClassName={selectBtnClass}
              />
            )}
          </Field>
          <Field label="Your time zone" hint="Only needed when the line asks for hours. Read from your device; change it if you are planning a move.">
            {() => (
              <Select
                value={offset}
                onValueChange={setOffset}
                options={[{ value: "", label: "Not set" }, ...OFFSETS.map((h) => ({ value: String(h), label: offsetLabel(h) }))]}
                ariaLabel="Your time zone"
                buttonClassName={selectBtnClass}
              />
            )}
          </Field>
        </div>
      </ToolCard>

      <ToolCard>
        <div className="flex flex-wrap items-center gap-3">
          <Chip tone={TONE[result.verdict]}>{LABEL[result.verdict]}</Chip>
          <h2 className="font-display text-lg font-bold text-ink-900">{result.headline}</h2>
        </div>
        {result.reasons.length > 0 && (
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-ink-700">
            {result.reasons.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        )}
        {result.places.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">What the line names</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {result.places.map((p) => (
                <li key={p.label} className="inline-flex items-center gap-2 rounded-lg border border-ink-100 px-2.5 py-1.5 text-sm">
                  <span className="font-medium text-ink-900">{p.label}</span>
                  <Chip tone={INCLUDES[p.includes][0]}>{INCLUDES[p.includes][1]}</Chip>
                </li>
              ))}
            </ul>
          </div>
        )}
        {notes.length > 0 && (
          <dl className="mt-4 space-y-2 text-sm leading-relaxed">
            {notes.map((p) => (
              <div key={p.label}>
                <dt className="inline font-semibold text-ink-900">{p.label}: </dt>
                <dd className="inline text-ink-600">{p.note}</dd>
              </div>
            ))}
          </dl>
        )}
        {result.verdict === "unclear" && !result.places.length && (
          <p className="mt-4 text-sm text-ink-600">
            The full description usually settles it. The{" "}
            <Link href="/tools/jd-remote-analyzer" className="font-medium text-brand-600 hover:text-brand-700">
              remote job description analyzer
            </Link>{" "}
            marks every location, visa and time-zone clause in it.
          </p>
        )}
      </ToolCard>

      <ToolCard>
        <h2 className="font-display text-lg font-bold text-ink-900">Roles on our board open to people in {countryName(country)}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Stat label="Work from anywhere" value={data.worldwide.toLocaleString("en-US")} sub="no country or region named" />
          <Stat label={`Naming ${countryName(country)} or its region`} value={regional.toLocaleString("en-US")} sub="read with the rules above" />
          <Stat label="Together" value={(data.worldwide + regional).toLocaleString("en-US")} sub={`of ${data.total.toLocaleString("en-US")} listings`} />
        </div>
        {employers.length > 0 && (
          <p className="mt-4 text-sm text-ink-600">
            Most of those region-locked roles come from <span className="font-medium text-ink-900">{employers.join(", ")}</span>.
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <Link href="/jobs?scope=worldwide" className="text-brand-600 hover:text-brand-700">
            Browse work-from-anywhere roles →
          </Link>
          {region && (
            <Link href={`/jobs?scope=regional&region=${encodeURIComponent(region)}`} className="text-brand-600 hover:text-brand-700">
              Remote roles in {region} →
            </Link>
          )}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-500">
          Counted from {data.total.toLocaleString("en-US")} listings on {data.asOf}. A role counts for a country only when its location names that
          country or a region that clearly includes it, so a listing for &ldquo;North America&rdquo; is not counted for Mexico. Nothing you type
          here leaves your browser.
        </p>
      </ToolCard>
    </div>
  );
}
