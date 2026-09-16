/**
 * The truly-remote analyzer behind /tools/jd-remote-analyzer.
 *
 * It reads a job description with the same phrase lists our ingest filter
 * uses (src/lib/pipeline/dictionaries.ts), so a visitor gets the same verdict
 * the board would reach, plus the evidence behind it.
 */
import { ANYWHERE_SIGNALS, DISQUALIFYING_PHRASES, ONSITE_PHRASES, REMOTE_SIGNALS } from "../pipeline/dictionaries";
import { findPhrase } from "../pipeline/phrase";

export type RemoteVerdict = "worldwide" | "restricted" | "onsite" | "unclear" | "not-remote";

export type SignalKind = "onsite" | "restriction" | "timezone" | "anywhere" | "remote";

export interface Signal {
  kind: SignalKind;
  phrase: string;
  /** Text around the first occurrence, for quoting back to the reader. */
  snippet: string;
  count: number;
}

export interface RemoteAnalysis {
  verdict: RemoteVerdict;
  signals: Signal[];
  /** 0 = certainly not location-free, 100 = explicit worldwide with no restriction. */
  score: number;
  words: number;
}

const TIMEZONE_PHRASES = new Set([
  "est hours", "pst hours", "cst hours", "gmt hours", "cet hours", "must overlap", "overlap with est",
  "overlap with pst", "overlap with pacific", "overlap with eastern", "timezone overlap", "time zone overlap",
  "overlap with our team", "core hours", "business hours in", "working hours aligned", "must be available during",
  "+/- 3 hours", "utc-", "utc+", "within 3 hours of",
]);

// Timezone mentions the dictionary doesn't list as phrases.
const TZ_PATTERN =
  /\b(?:(?:utc|gmt)\s?[+\-−]\s?\d{1,2}(?::?\d{2})?|(?:pacific|eastern|central|mountain) time|(?:pst|pdt|est|edt|cst|cdt|mst|cet|cest|bst|ist|aest|aedt|sgt|jst|gmt|utc)\b)/gi;

function snippetAt(text: string, start: number, end: number): string {
  const from = Math.max(0, start - 60);
  const to = Math.min(text.length, end + 60);
  return `${from > 0 ? "…" : ""}${text.slice(from, to).replace(/\s+/g, " ").trim()}${to < text.length ? "…" : ""}`;
}

function collect(text: string, list: string[], kind: SignalKind, into: Map<string, Signal>) {
  for (const phrase of list) {
    const hits = findPhrase(text, phrase);
    if (!hits.length) continue;
    const key = `${kind}:${phrase}`;
    if (into.has(key)) continue;
    into.set(key, { kind, phrase, snippet: snippetAt(text, hits[0][0], hits[0][1]), count: hits.length });
  }
}

export function analyzeRemote(description: string, location = ""): RemoteAnalysis {
  const text = `${location}\n${description}`.replace(/<[^>]+>/g, " ");
  const found = new Map<string, Signal>();

  collect(text, ONSITE_PHRASES, "onsite", found);
  const onsiteWords = new Set(ONSITE_PHRASES);
  collect(
    text,
    DISQUALIFYING_PHRASES.filter((p) => !onsiteWords.has(p) && !TIMEZONE_PHRASES.has(p)),
    "restriction",
    found,
  );
  collect(text, [...TIMEZONE_PHRASES], "timezone", found);
  for (const m of text.matchAll(TZ_PATTERN)) {
    const phrase = m[0].toLowerCase();
    const key = `timezone:${phrase}`;
    const existing = found.get(key);
    if (existing) existing.count++;
    else found.set(key, { kind: "timezone", phrase, snippet: snippetAt(text, m.index ?? 0, (m.index ?? 0) + m[0].length), count: 1 });
  }
  collect(text, ANYWHERE_SIGNALS, "anywhere", found);
  collect(text, REMOTE_SIGNALS, "remote", found);

  const signals = [...found.values()];
  const has = (k: SignalKind) => signals.some((s) => s.kind === k);

  // Same order as the ingest filter: any restriction beats any positive signal.
  let verdict: RemoteVerdict;
  if (has("onsite")) verdict = "onsite";
  else if (has("restriction") || has("timezone")) verdict = "restricted";
  else if (has("anywhere")) verdict = "worldwide";
  else if (has("remote")) verdict = "unclear";
  else verdict = "not-remote";

  const score =
    verdict === "worldwide" ? 100 : verdict === "unclear" ? (has("remote") ? 45 : 25) : verdict === "restricted" ? 20 : verdict === "onsite" ? 0 : 10;

  const order: SignalKind[] = ["onsite", "restriction", "timezone", "anywhere", "remote"];
  signals.sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind));

  return { verdict, signals, score, words: description.trim() ? description.trim().split(/\s+/).length : 0 };
}
