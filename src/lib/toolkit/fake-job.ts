/**
 * Scoring model behind /tools/fake-job-checker.
 *
 * A transparent checklist, not a classifier: every point added to the score
 * comes from a named rule the page explains, and every flag quotes the words
 * that triggered it. It runs entirely in the browser; nothing is sent anywhere.
 */

export type Severity = "critical" | "high" | "medium" | "low";
export type Answer = "yes" | "no" | "unknown";

export interface FakeJobInput {
  text: string;
  email: string;
  website: string;
  answers: Partial<Record<QuestionId, Answer>>;
}

export interface Flag {
  id: string;
  severity: Severity;
  points: number;
  title: string;
  detail: string;
  evidence?: string;
}

export interface FakeJobResult {
  score: number;
  level: "low" | "caution" | "high" | "very-high";
  flags: Flag[];
  reassurances: string[];
  checked: boolean;
}

export type QuestionId =
  | "askedToPay"
  | "chequeOrEquipment"
  | "moveMoney"
  | "idBeforeOffer"
  | "chatOnly"
  | "offerNoInterview"
  | "onCareersPage"
  | "newDomain";

export const QUESTIONS: { id: QuestionId; label: string; bad: Answer; severity: Severity; points: number; title: string; detail: string }[] = [
  { id: "askedToPay", label: "Have you been asked to pay for anything (training, equipment, software, a background check)?", bad: "yes", severity: "critical", points: 40, title: "You were asked to pay", detail: "Legitimate employers never charge candidates to get or start a job. This alone is enough to walk away." },
  { id: "chequeOrEquipment", label: "Did they send (or offer to send) a cheque or transfer to buy equipment from a supplier they chose?", bad: "yes", severity: "critical", points: 40, title: "Equipment cheque pattern", detail: "The classic overpayment scam: the incoming payment reverses after you have paid their 'vendor' with real money." },
  { id: "moveMoney", label: "Does the job involve receiving money or parcels and passing them on?", bad: "yes", severity: "critical", points: 40, title: "Money or parcel forwarding", detail: "Moving funds or goods for someone else is how mule and reshipping schemes work, and it can expose you to criminal liability." },
  { id: "idBeforeOffer", label: "Were you asked for bank details, a passport or an ID number before a written offer?", bad: "yes", severity: "high", points: 20, title: "Identity details requested early", detail: "Real onboarding asks for documents after a written offer, through a proper HR or payroll system." },
  { id: "chatOnly", label: "Did the 'interview' happen only by text chat (Telegram, WhatsApp, Signal)?", bad: "yes", severity: "high", points: 15, title: "Chat-only interview", detail: "Genuine employers almost always speak to you by video or phone, with a named interviewer." },
  { id: "offerNoInterview", label: "Did you get an offer without any real interview?", bad: "yes", severity: "high", points: 15, title: "Offer without an interview", detail: "Hiring is slow and involves several people. An instant offer is a pressure tactic." },
  { id: "onCareersPage", label: "Is this exact role listed on the company's own careers page?", bad: "no", severity: "high", points: 20, title: "Role missing from the company's own site", detail: "If a job exists, it is on the employer's careers page. Go to the site yourself rather than following a link." },
  { id: "newDomain", label: "Was the company's email or website domain registered in the last few months?", bad: "yes", severity: "high", points: 15, title: "Very new domain", detail: "A 'global company' on a domain registered weeks ago is not a global company. A public WHOIS lookup shows the date." },
];

const TEXT_RULES: { id: string; re: RegExp; severity: Severity; points: number; title: string; detail: string }[] = [
  { id: "pay-for-job", re: /\b(?:pay|purchase|buy)\b[^.\n]{0,40}\b(?:training|starter kit|kit|equipment|software|certificat\w*|background check|registration fee)\b/i, severity: "critical", points: 30, title: "Mentions paying for training, equipment or checks", detail: "Asking candidates to pay is the most reliable sign of a scam." },
  { id: "gift-cards", re: /\bgift ?cards?\b/i, severity: "critical", points: 30, title: "Mentions gift cards", detail: "No employer pays or collects money through gift cards." },
  { id: "crypto-task", re: /\b(?:usdt|crypto(?:currency)? wallet|top[- ]?up|recharge)\b|\b(?:optimi[sz]e|boost|rate)\b[^.\n]{0,20}\b(?:products|apps|reviews|ratings)\b/i, severity: "critical", points: 25, title: "Task-and-deposit language", detail: "Paid 'tasks' that later require a deposit to unlock are a fast-growing scam, usually run through crypto." },
  { id: "cheque", re: /\b(?:cheque|check)\b[^.\n]{0,40}\b(?:deposit|equipment|vendor|supplier)\b|\bmobile deposit\b/i, severity: "critical", points: 25, title: "Cheque for equipment or a supplier", detail: "The payment is fake and will reverse; the money you send the supplier is real." },
  { id: "mule", re: /\b(?:receive|process|transfer)\b[^.\n]{0,30}\b(?:payments?|funds)\b[^.\n]{0,40}\b(?:your (?:own |personal )?(?:bank )?account)\b|\bpayment processing (?:agent|assistant|clerk)\b/i, severity: "critical", points: 25, title: "Moving money through your account", detail: "Receiving and forwarding funds is money laundering, even if you were told it was a normal job." },
  { id: "reship", re: /\b(?:receive|reship|forward|inspect)\b[^.\n]{0,30}\b(?:packages|parcels|shipments)\b[^.\n]{0,30}\b(?:home|residence)\b|\bpackage (?:handler|inspector)\b/i, severity: "high", points: 20, title: "Parcel handling from home", detail: "Reshipping jobs use your address to disguise goods bought with stolen cards." },
  { id: "chat-apps", re: /\b(?:telegram|whatsapp|signal app|wickr|google hangouts)\b/i, severity: "high", points: 15, title: "Hiring through a messaging app", detail: "Scammers move candidates to chat apps where accounts are anonymous and easy to abandon." },
  { id: "id-request", re: /\b(?:ssn|social security number|passport (?:copy|scan)|bank (?:account|details|login)|routing number|national id|driver'?s licen[cs]e)\b/i, severity: "high", points: 15, title: "Asks for sensitive personal details", detail: "Identity and bank details belong in formal onboarding after an offer, never in an application or first message." },
  { id: "earn-per-week", re: /\bearn\b[^.\n]{0,15}\$\s?[\d,]{3,}\s*(?:\/|per|a|each)\s*(?:day|week)\b|\$\s?\d{2,3}\s*(?:\/|per)\s*(?:hr|hour)\b[^.\n]{0,40}\bno experience\b/i, severity: "high", points: 12, title: "Pay that sounds too good", detail: "Big weekly earnings for simple work is bait. Compare against what similar roles actually pay." },
  { id: "vague-tasks", re: /\b(?:simple|easy)\b[^.\n]{0,15}\btasks?\b|\blik(?:e|ing) (?:videos|posts)\b|\bwork just \d+ hours?\b/i, severity: "medium", points: 10, title: "Vague, easy tasks", detail: "Real job descriptions are specific because employers want to filter people out, not pull everyone in." },
  { id: "mlm", re: /\bbe your own boss\b|\bunlimited (?:earning|income)\b|\brecruit (?:others|friends|family)\b|\bdownline\b/i, severity: "medium", points: 10, title: "Recruitment-scheme language", detail: "Pay that depends on recruiting others is a sales scheme, not a salaried job." },
  { id: "urgency", re: /\burgent(?:ly)?\b|\bimmediate(?:ly)? start\b|\bact now\b|\blimited (?:slots|spots|positions)\b|\bwithin 24 hours\b|\brespond today\b/i, severity: "medium", points: 8, title: "Pressure to act fast", detail: "Deadlines measured in hours stop you checking the employer or asking someone else." },
  { id: "guaranteed", re: /\bguaranteed (?:income|job|pay|earnings)\b|\b100% guaranteed\b/i, severity: "medium", points: 8, title: "Guaranteed income", detail: "Employers don't guarantee earnings in a job ad." },
  { id: "no-experience", re: /\bno (?:experience|skills|qualifications) (?:needed|required|necessary)\b/i, severity: "low", points: 5, title: "No experience needed", detail: "Not a red flag on its own, but combined with high pay it is a common pattern." },
];

const FREE_MAIL = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "ymail.com", "outlook.com", "hotmail.com", "live.com", "msn.com",
  "aol.com", "icloud.com", "me.com", "proton.me", "protonmail.com", "gmx.com", "gmx.net", "mail.com", "yandex.com",
  "yandex.ru", "zoho.com", "tutanota.com", "rediffmail.com", "qq.com", "163.com",
]);

/** Registrable domain, good enough for comparing an email with a website. */
export function baseDomain(host: string): string {
  const parts = host.toLowerCase().replace(/^www\./, "").split(".").filter(Boolean);
  if (parts.length <= 2) return parts.join(".");
  const sld = parts[parts.length - 2];
  // co.uk, com.au, co.in and friends
  const twoPart = sld.length <= 3 && ["co", "com", "org", "net", "gov", "ac", "edu"].includes(sld);
  return parts.slice(twoPart ? -3 : -2).join(".");
}

export function hostOf(input: string): string {
  const s = input.trim();
  if (!s) return "";
  try {
    return new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function emailDomain(email: string): string {
  const m = email.trim().toLowerCase().match(/@([a-z0-9.-]+\.[a-z0-9-]{2,})$/);
  return m ? m[1] : "";
}

function quote(text: string, re: RegExp): string | undefined {
  const m = text.match(re);
  if (!m || m.index == null) return undefined;
  const from = Math.max(0, m.index - 40);
  const to = Math.min(text.length, m.index + m[0].length + 40);
  return `${from > 0 ? "…" : ""}${text.slice(from, to).replace(/\s+/g, " ").trim()}${to < text.length ? "…" : ""}`;
}

export function scoreFakeJob(input: FakeJobInput): FakeJobResult {
  const flags: Flag[] = [];
  const reassurances: string[] = [];
  const text = input.text || "";

  for (const r of TEXT_RULES) {
    if (r.re.test(text)) {
      flags.push({ id: r.id, severity: r.severity, points: r.points, title: r.title, detail: r.detail, evidence: quote(text, r.re) });
    }
  }

  // Email addresses: the one typed in, plus any inside the pasted text.
  const emails = new Set<string>();
  if (input.email.trim()) emails.add(input.email.trim().toLowerCase());
  for (const m of text.matchAll(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi)) emails.add(m[0].toLowerCase());

  const site = hostOf(input.website);
  const siteBase = site ? baseDomain(site) : "";
  for (const e of emails) {
    const d = emailDomain(e);
    if (!d) continue;
    const base = baseDomain(d);
    if (FREE_MAIL.has(base) || FREE_MAIL.has(d)) {
      flags.push({ id: `free-mail:${e}`, severity: "high", points: 15, title: "Recruiter uses a free email address", detail: "Recruiters at real companies write from the company's own domain.", evidence: e });
      continue;
    }
    if (d.startsWith("xn--") || d.includes(".xn--")) {
      flags.push({ id: `puny:${e}`, severity: "high", points: 12, title: "Disguised characters in the domain", detail: "Punycode domains can imitate a real brand with look-alike letters.", evidence: e });
    }
    if (/(?:^|[.-])(?:careers?|jobs|hiring|recruit(?:ment|ing)?|hr|talent|onboarding)(?:[.-]|$)/.test(base.split(".")[0]) && base.includes("-")) {
      flags.push({ id: `lookalike:${e}`, severity: "medium", points: 10, title: "Look-alike recruiting domain", detail: "A brand name with '-careers' or 'jobs-' bolted on is a common way to borrow a real company's name.", evidence: d });
    }
    if (siteBase) {
      if (base === siteBase) reassurances.push(`The email domain matches the company website (${siteBase}).`);
      else
        flags.push({ id: `mismatch:${e}`, severity: "medium", points: 10, title: "Email and website domains don't match", detail: `The message came from ${base}, but the company website is ${siteBase}.`, evidence: e });
    }
  }

  for (const q of QUESTIONS) {
    const a = input.answers[q.id];
    if (!a || a === "unknown") continue;
    if (a === q.bad) flags.push({ id: `q:${q.id}`, severity: q.severity, points: q.points, title: q.title, detail: q.detail });
    else if (q.id === "onCareersPage") reassurances.push("The role appears on the company's own careers page.");
    else if (q.id === "newDomain") reassurances.push("The company's domain isn't newly registered.");
  }

  let score = flags.reduce((n, f) => n + f.points, 0);
  if (reassurances.length && score > 0) score = Math.max(0, score - 5 * reassurances.length);
  score = Math.min(100, score);

  const critical = flags.some((f) => f.severity === "critical");
  let level: FakeJobResult["level"] = score >= 70 ? "very-high" : score >= 40 ? "high" : score >= 15 ? "caution" : "low";
  if (critical && (level === "low" || level === "caution")) level = "high";

  const rank: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 };
  flags.sort((a, b) => rank[a.severity] - rank[b.severity] || b.points - a.points);

  const checked = Boolean(text.trim() || input.email.trim() || Object.values(input.answers).some((a) => a && a !== "unknown"));
  return { score, level, flags, reassurances, checked };
}
