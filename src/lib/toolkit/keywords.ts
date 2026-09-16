/**
 * Keyword coverage behind /tools/ats-keyword-checker.
 *
 * Pulls the terms a job description leans on (known skills, repeated words and
 * two-word phrases), then checks which of them a CV mentions. Plain frequency
 * counting, done in the browser: it approximates the keyword matching many
 * applicant-tracking searches rely on, without pretending to be any one vendor's
 * ranking.
 */
import { SKILL_DICTIONARY } from "../pipeline/dictionaries";
import { containsPhrase } from "../pipeline/phrase";

const STOPWORDS = new Set(
  `a about above across after again against all also am an and any are as at be because been before being below between both but by
can could did do does doing down during each either else ever every few for from further get gets getting give given go going had has
have having he her here hers him his how i if in into is it its itself just least less like likely made make makes many may me might
more most much must my need needs new no nor not now of off often on once one only or other our ours out over own per please rather
really same see seen shall she should since so some such than that the their them then there these they this those though through
to too under until up upon us use used using very via want was way we well were what when where whether which while who whom whose
why will with within without work works working would yet you your yours years year etc eg ie able across ability strong excellent
including include includes experience experienced role roles team teams company join help ensure across within based looking
responsibilities requirements required preferred plus bonus opportunity opportunities day days time week weeks candidate candidates
position job apply applicants environment support supporting related relevant level high great good best across key new`
    .split(/\s+/),
);

const ALIASES: [string, string][] = Object.entries(SKILL_DICTIONARY).flatMap(([canon, aliases]) =>
  aliases.filter((a) => a.length > 2 || canon.length <= 2).map((a) => [canon, a] as [string, string]),
);

export interface Keyword {
  term: string;
  /** How many times the job description uses it. */
  weight: number;
  kind: "skill" | "phrase" | "word";
  found: boolean;
}

export interface Coverage {
  keywords: Keyword[];
  score: number;
  matchedWeight: number;
  totalWeight: number;
}

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, " ")
    .replace(/[^a-z0-9+#./\s-]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[.\-/]+|[.\-/]+$/g, ""))
    .filter(Boolean);
}

function countPhrase(text: string, phrase: string): number {
  const esc = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (text.match(new RegExp(`(?<![a-z0-9])${esc}(?![a-z0-9])`, "gi")) || []).length;
}

export function extractKeywords(jd: string, limit = 30): Omit<Keyword, "found">[] {
  const lower = jd.toLowerCase();
  const out = new Map<string, Omit<Keyword, "found">>();

  for (const [canon, alias] of ALIASES) {
    const n = countPhrase(lower, alias);
    if (!n) continue;
    const prev = out.get(canon);
    out.set(canon, { term: canon, weight: (prev?.weight ?? 0) + n, kind: "skill" });
  }

  const toks = tokens(jd);
  const words = new Map<string, number>();
  const pairs = new Map<string, number>();
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    if (t.length < 3 || STOPWORDS.has(t) || /^\d+$/.test(t)) continue;
    words.set(t, (words.get(t) ?? 0) + 1);
    const n = toks[i + 1];
    if (n && n.length >= 3 && !STOPWORDS.has(n) && !/^\d+$/.test(n)) {
      const p = `${t} ${n}`;
      pairs.set(p, (pairs.get(p) ?? 0) + 1);
    }
  }

  const skillWords = new Set(ALIASES.map(([, a]) => a));
  for (const [p, n] of pairs) {
    if (n >= 2) out.set(p, { term: p, weight: n * 2, kind: "phrase" });
  }
  const inPhrase = new Set([...out.values()].filter((k) => k.kind === "phrase").flatMap((k) => k.term.split(" ")));
  for (const [w, n] of words) {
    if (n < 2 || skillWords.has(w) || out.has(w)) continue;
    // A word already carried by a repeated phrase only counts if it also stands alone.
    if (inPhrase.has(w) && n < 3) continue;
    out.set(w, { term: w, weight: n, kind: "word" });
  }

  const kindRank = { skill: 0, phrase: 1, word: 2 };
  return [...out.values()]
    .sort((a, b) => b.weight - a.weight || kindRank[a.kind] - kindRank[b.kind] || a.term.localeCompare(b.term))
    .slice(0, limit);
}

function resumeHas(resume: string, term: string, kind: Keyword["kind"]): boolean {
  if (kind === "skill") {
    const aliases = SKILL_DICTIONARY[term] ?? [term];
    return aliases.some((a) => containsPhrase(resume, a)) || containsPhrase(resume, term);
  }
  if (containsPhrase(resume, term)) return true;
  // Light stemming so "managed" covers "manage" and "APIs" covers "api".
  const stem = term.replace(/(?:ing|ed|es|s)$/, "");
  return stem.length >= 4 && new RegExp(`(?<![a-z0-9])${stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").test(resume);
}

export function coverage(jd: string, resume: string, limit = 30): Coverage {
  const keywords = extractKeywords(jd, limit).map((k) => ({ ...k, found: resumeHas(resume, k.term, k.kind) }));
  const totalWeight = keywords.reduce((n, k) => n + k.weight, 0);
  const matchedWeight = keywords.filter((k) => k.found).reduce((n, k) => n + k.weight, 0);
  return { keywords, totalWeight, matchedWeight, score: totalWeight ? Math.round((matchedWeight / totalWeight) * 100) : 0 };
}
