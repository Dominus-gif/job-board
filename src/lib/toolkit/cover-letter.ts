/**
 * The remote cover letter builder at /tools/remote-cover-letter-builder.
 *
 * It assembles a letter from the reader's own answers. Nothing is invented:
 * every sentence that states a fact about the applicant is built from a field
 * they filled in, and a field left empty drops its sentence rather than
 * leaving a placeholder. What the builder adds is the structure remote hiring
 * managers look for: a reason for this company, results with numbers, and a
 * paragraph that answers the three questions a remote application raises
 * before anyone asks them (where you are, which hours you overlap, and on what
 * basis you can be paid).
 */

export type Authorisation = "local" | "contractor" | "eor" | "omit";

export interface LetterInput {
  name: string;
  role: string;
  company: string;
  greeting: string;
  why: string;
  wins: string[];
  remoteYears: number;
  asyncExample: string;
  where: string;
  /** Hours of a standard 9:00 to 17:00 day shared with the team, or null when not worked out. */
  overlapHours: number | null;
  teamPlace: string;
  flexible: boolean;
  authorisation: Authorisation;
  roleCountry: string;
}

const clean = (s: string) => s.trim().replace(/\s+/g, " ");
const sentence = (s: string) => {
  const t = clean(s);
  if (!t) return "";
  const capped = t.charAt(0).toUpperCase() + t.slice(1);
  return /[.!?]$/.test(capped) ? capped : `${capped}.`;
};
/** "Led the migration…" reads as "I led the migration…" inside a paragraph. */
const asClause = (s: string) => {
  const t = clean(s).replace(/[.!?]+$/, "");
  if (!t) return "";
  return /^i\b/i.test(t) ? t.replace(/^i\b/i, "I") : `I ${t.charAt(0).toLowerCase()}${t.slice(1)}`;
};

export function buildLetter(i: LetterInput): string {
  const company = clean(i.company);
  const role = clean(i.role);
  const paras: string[] = [];

  const opener = role
    ? `I'm applying for the ${role} role ${company ? `at ${company}` : "on your team"}.`
    : `I'm applying for the open role ${company ? `at ${company}` : "on your team"}.`;
  paras.push([opener, sentence(i.why)].filter(Boolean).join(" "));

  const wins = i.wins.map(asClause).filter(Boolean);
  if (wins.length === 1) paras.push(`${wins[0]}.`);
  else if (wins.length === 2) paras.push(`${wins[0]}. ${wins[1].replace(/^I /, "I also ")}.`);
  else if (wins.length >= 3) paras.push(`${wins[0]}. ${wins[1].replace(/^I /, "I also ")}. And ${wins[2].replace(/^I /, "I ")}.`);

  const remote: string[] = [];
  if (i.remoteYears > 0) remote.push(`I've worked remotely for ${i.remoteYears === 1 ? "a year" : `${i.remoteYears} years`}, so writing things down is how I work by default.`);
  else remote.push("This would be my first fully remote role, and I already work in a way that suits one.");
  if (clean(i.asyncExample)) remote.push(sentence(i.asyncExample));
  const where = clean(i.where);
  if (where) {
    let tz = `I'm based in ${where}`;
    if (i.overlapHours != null && clean(i.teamPlace)) {
      const h = i.overlapHours;
      tz += h >= 8 ? `, in the same working hours as ${clean(i.teamPlace)}` : h > 0 ? `, and a normal working day gives me ${h === 1 ? "an hour" : `${h} hours`} of overlap with ${clean(i.teamPlace)}` : `, which is outside ${clean(i.teamPlace)}'s working day`;
      if (i.flexible && h < 8) tz += ". I'm happy to shift my hours to cover your core hours";
    }
    remote.push(`${tz}.`);
  }
  const country = clean(i.roleCountry);
  if (i.authorisation === "local") remote.push(country ? `I have the right to work in ${country}.` : "I have the right to work where this role is based.");
  if (i.authorisation === "contractor") remote.push("I can work as an independent contractor and invoice you directly.");
  if (i.authorisation === "eor") remote.push("I can be employed through an employer of record if you don't have an entity where I live.");
  paras.push(remote.join(" "));

  paras.push(`I'd welcome the chance to talk about how I could help ${company || "your team"}. Thank you for reading.`);

  const greeting = clean(i.greeting) || "Hello";
  const sign = clean(i.name);
  return [`${greeting},`, ...paras, sign ? `Best regards,\n${sign}` : "Best regards,"].join("\n\n");
}

export interface LetterCheck {
  ok: boolean;
  label: string;
}

export const wordCount = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

/** The things a remote hiring manager scans for, checked against the reader's own answers. */
export function checkLetter(i: LetterInput, letter: string): LetterCheck[] {
  const words = wordCount(letter);
  return [
    { ok: words >= 150 && words <= 400, label: `Length: ${words} words (aim for 150 to 400)` },
    { ok: clean(i.company).length > 0 && clean(i.why).toLowerCase().includes(clean(i.company).toLowerCase().split(" ")[0]), label: "Says why this company, by name" },
    { ok: i.wins.some((w) => /\d/.test(w)), label: "At least one result with a number" },
    { ok: clean(i.where).length > 0, label: "States where you are based" },
    { ok: i.overlapHours != null && clean(i.teamPlace).length > 0, label: "Says which hours you share with the team" },
    { ok: clean(i.asyncExample).length > 0, label: "Gives one example of working in writing" },
    { ok: !/to whom it may concern/i.test(letter), label: "Opens with a name or a team, not \"To whom it may concern\"" },
  ];
}
