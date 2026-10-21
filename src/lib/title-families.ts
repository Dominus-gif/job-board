/**
 * Job families, identified by TITLE.
 *
 * The site's category filter cannot size a field: it files anything it cannot
 * classify under "Product" (see scripts/report-pm.ts). Every field guide, the
 * remote field explorer and the job title finder therefore count by title,
 * using the rules below, so a number in an article and the same number in a
 * tool always agree.
 *
 * Families are tried in order and a listing belongs to the FIRST one it
 * matches, so no listing is counted twice. The "not" rules strip titles that
 * share a word with a family but are a different job ("sales engineer" is not
 * software engineering; "marketing data scientist" is not marketing).
 */

export interface Family {
  key: string;
  label: string;
  is: RegExp;
  not?: RegExp;
}

export const FAMILIES: Family[] = [
  {
    key: "data",
    label: "Data & machine learning",
    is: /\b(data (engineer|scientist|analyst|architect)|analytics engineer|machine learning|ml engineer|mlops|ai engineer|applied (ai|scientist)|research (scientist|engineer)|nlp|computer vision|deep learning|bi (analyst|developer|engineer)|business intelligence|quantitative (researcher|analyst)|statistician|decision scientist|llm)\b/i,
    not: /\b(data entry|data center|datacenter|sales|account executive|recruit|marketing analyst)\b/i,
  },
  {
    key: "swe",
    label: "Software engineering",
    is: /\b(software (engineer|developer|architect)|(back|front)[- ]?end (engineer|developer)|full[- ]?stack (engineer|developer)|web (engineer|developer)|(ios|android|mobile) (engineer|developer)|platform engineer|infrastructure engineer|devops engineer|site reliability|sre|engineering manager|(staff|principal|lead) engineer|forward deployed engineer|systems engineer|cloud engineer|security engineer|qa engineer|test engineer|sdet|product engineer|frontend|backend|full[- ]?stack|golang|rust engineer|python engineer|java engineer)\b/i,
    not: /\b(sales engineer|solutions? engineer|support engineer|customer (success )?engineer|field engineer|pre-?sales|developer advocate|developer relations|devrel|business develop|machine learning|ml engineer|mlops|data engineer|data scientist|ai engineer|research engineer|mechanical|electrical|civil|chemical|hardware|manufacturing|process engineer|quality engineer|construction|structural|recruit|data engineering|support engineering|analyst)\b/i,
  },
  {
    key: "solutions",
    label: "Solutions & sales engineering",
    is: /\b(sales engineer|solutions? (engineer|architect|consultant)|pre-?sales|customer engineer|field engineer)\b/i,
  },
  {
    key: "product",
    label: "Product management",
    is: /\b(product manager|product owner|product lead|head of product|director of product|vp,? (of )?product|chief product officer|group product manager|product management)\b/i,
    not: /\b(marketing|designer|engineer|analyst|support|specialist|operations)\b/i,
  },
  {
    key: "design",
    label: "Design",
    is: /\b(product designer|ux designer|ui designer|ux\/ui|ui\/ux|experience designer|interaction designer|visual designer|graphic designer|brand designer|design lead|design manager|head of design|design director|designer|ux researcher|design system)\b/i,
    not: /\b(design engineer|designated|design verification|chip design|hardware design|mechanical design|circuit design|cad|electrical engineer|firmware|pcb|rf engineer)\b/i,
  },
  {
    key: "marketing",
    label: "Marketing",
    is: /\b(marketing|marketer|growth (manager|lead|marketer)|demand gen(eration)?|content (strategist|writer|manager|lead|designer)|seo|sem|ppc|performance marketing|paid (media|social|search)|social media|community manager|brand manager|lifecycle|email marketing|copywriter|communications (manager|lead|specialist)|public relations|pr manager)\b/i,
    // Engineers who build marketing systems share the word, not the job.
    // ("Developer marketing" IS marketing, so "developer" is not excluded.)
    not: /\b(engineer|engineering|software|data scientist|sales development)\b/i,
  },
  {
    key: "sales",
    label: "Sales",
    is: /\b(account executive|sales|sdr|bdr|business development|account manager|account director|partnerships? manager|channel manager|enterprise ae)\b/i,
    not: /\b(engineer|engineering|marketing|operations|data)\b/i,
  },
  {
    key: "support",
    label: "Customer support & success",
    is: /\b(customer support|customer success|customer experience|support (engineer|specialist|agent|representative|manager|lead|analyst)|technical support|help ?desk|customer service|client services|it support)\b/i,
    not: /\bmarketing\b/i,
  },
  {
    key: "finance",
    label: "Finance & accounting",
    is: /\b(accountant|accounting|finance|financial|controller|fp&a|bookkeep\w*|payroll|treasury|tax|audit\w*|credit analyst)\b/i,
    not: /\b(engineer|software|developer|marketing|sales|product)\b/i,
  },
  {
    key: "people",
    label: "People, HR & recruiting",
    is: /\b(recruiter|recruiting|talent|people (operations|partner|ops|team|business partner|manager)|human resources|hr|hrbp|compensation|learning (and|&) development)\b/i,
    not: /\b(engineer|software|marketing)\b/i,
  },
  {
    key: "legal",
    label: "Legal & compliance",
    is: /\b(counsel|lawyer|attorney|legal|paralegal|compliance|privacy officer|regulatory|contracts manager)\b/i,
    not: /\b(engineer|software)\b/i,
  },
  {
    key: "project",
    label: "Project & program management",
    is: /\b(project manager|program manager|programme manager|scrum master|delivery manager|project coordinator|pmo)\b/i,
  },
  {
    key: "ops",
    label: "Operations & admin",
    is: /\b(operations|business operations|biz ?ops|executive assistant|administrative|admin assistant|office manager|chief of staff|virtual assistant|revops|revenue operations|sales operations)\b/i,
    not: /\b(engineer|software|devops|mlops)\b/i,
  },
];

/** The family a title belongs to, or null if none matches. */
export function familyOf(title: string): Family | null {
  for (const f of FAMILIES) {
    if (f.is.test(title) && !(f.not && f.not.test(title))) return f;
  }
  return null;
}

/** Matches a family on its own rules, ignoring the first-match ordering. */
export function inFamily(f: Family, title: string): boolean {
  return f.is.test(title) && !(f.not && f.not.test(title));
}

export const JUNIOR_TITLE = /\b(junior|jr\.?|associate|graduate|entry[- ]level|intern|internship|apprentice|trainee)\b/i;

const LEADING_LEVEL = /^(?:(?:senior|sr\.?|staff|principal|lead|junior|jr\.?|associate|mid[- ]level|entry[- ]level)(?:\s*\/\s*|\s+))+/i;
const TRAILING_GRADE = /\s+(?:i{1,3}|iv|v|\d)$/i;
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu;

/**
 * Role nouns that say nothing on their own. When a title opens with one of
 * these, the function comes AFTER the separator ("Director, Product
 * Marketing"), so it is kept and moved in front: "product marketing director".
 */
const GENERIC_HEAD = new Set([
  "director", "manager", "head", "lead", "vp", "vice president", "analyst", "engineer", "specialist",
  "associate", "coordinator", "consultant", "intern", "advisor", "architect", "scientist",
  "representative", "partner", "officer", "administrator", "executive", "strategist", "researcher",
  "designer", "writer", "editor", "recruiter", "owner", "developer",
]);

/**
 * A title reduced to the job it names, so "Senior Software Engineer, Billing
 * (Remote, US)" and "Software Engineer II" both read "software engineer".
 *
 * Only a LEADING level is stripped: "Lead Designer" becomes "designer", but
 * "Design Lead" keeps its meaning. Anything in brackets (usually a location)
 * is dropped. After a comma, dash or bar, the rest is a team name and is
 * dropped too, unless the part before it is a bare role noun, in which case
 * the rest IS the job and is kept.
 */
export function baseTitle(raw: string): string {
  const t = raw.replace(EMOJI, " ").replace(/\s*[([][^)\]]*[)\]]/g, " ").replace(/\s+/g, " ").trim();
  const parts = t.split(/\s[-–—|]\s|,\s*|\s\/\s|:\s/).map((p) => p.trim()).filter(Boolean);
  const core = (s: string) => s.replace(LEADING_LEVEL, "").replace(TRAILING_GRADE, "").trim().toLowerCase();
  const head = core(parts[0] ?? t);
  const out = GENERIC_HEAD.has(head) && parts[1] ? `${core(parts[1])} ${head}` : head;
  return out.replace(/\s+/g, " ").trim();
}
