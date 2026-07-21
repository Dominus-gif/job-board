import type { Benefit, Category } from "../types";

/**
 * Tunable dictionaries for the ingestion pipeline (spec section 3).
 *
 * These are intentionally data, not code — the README documents how to extend
 * them. Keep entries lowercase; all matching lowercases the haystack first.
 */

/* -------------------------------------------------------------------------- */
/* Stage B — the "Work From Anywhere" filter                                  */
/* -------------------------------------------------------------------------- */

/**
 * Phrases that PROVE a job is genuinely global-remote. Presence of one of
 * these (in the location OR the description) is a strong positive signal.
 */
export const ANYWHERE_SIGNALS: string[] = [
  "anywhere in the world",
  "work from anywhere",
  "fully remote worldwide",
  "remote worldwide",
  "worldwide remote",
  "remote, worldwide",
  "remote - worldwide",
  "global remote",
  "remote (global)",
  "globally remote",
  "no location restriction",
  "no location requirement",
  "location independent",
  "location-independent",
  "anywhere on earth",
  "from anywhere",
  "remote anywhere",
  "100% remote, anywhere",
];

/**
 * Phrases that DISQUALIFY a job. Any hit rejects it. Order-independent.
 * We match on word-ish boundaries where it matters (handled in filter.ts).
 *
 * Grouped only for readability; they are flattened when used.
 */
export const DISQUALIFYING_PHRASES: string[] = [
  // explicit single-country / region gating
  "us only",
  "u.s. only",
  "usa only",
  "us-only",
  "us based",
  "us-based",
  "based in the us",
  "located in the us",
  "eu only",
  "eu-based",
  "eu based",
  "based in the eu",
  "uk only",
  "uk-based",
  "uk based",
  "canada only",
  "us or canada",
  "north america only",
  "latam only",
  "apac only",
  "emea only",
  "india only",
  "philippines only",
  "australia only",
  "germany only",
  // authorization / residency
  "must be located in",
  "must reside in",
  "must be based in",
  "must live in",
  "must be a resident",
  "authorized to work in",
  "authorised to work in",
  "eligible to work in",
  "work authorization",
  "work authorisation",
  "right to work in",
  "legally authorized to work",
  "green card",
  "us citizen",
  "u.s. citizen",
  "citizenship required",
  "requires citizenship",
  "valid visa",
  "visa sponsorship is not",
  "we do not sponsor",
  "residents of",
  "residency in",
  "located within",
  "within commuting distance",
  "hybrid",
  "onsite",
  "on-site",
  "in-office",
  "relocation",
  // timezone-overlap gating
  "est hours",
  "pst hours",
  "cst hours",
  "gmt hours",
  "cet hours",
  "must overlap",
  "overlap with est",
  "overlap with pst",
  "overlap with pacific",
  "overlap with eastern",
  "timezone overlap",
  "time zone overlap",
  "overlap with our team",
  "core hours",
  "business hours in",
  "working hours aligned",
  "must be available during",
  "+/- 3 hours",
  "utc-",
  "utc+",
  "within 3 hours of",
];

/**
 * If the location field matches one of these, it's a clean accept for that
 * field (still subject to description disqualifiers).
 */
export const ANYWHERE_LOCATION_TOKENS: string[] = [
  "anywhere",
  "worldwide",
  "global",
  "remote, worldwide",
  "remote - anywhere",
  "remote (anywhere)",
  "fully remote",
  "🌍",
  "🌎",
  "🌏",
];

/* -------------------------------------------------------------------------- */
/* Stage C — skills                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Skill dictionary. Key = canonical tag; values = regex-ish aliases matched as
 * whole words (word boundaries applied in enrich.ts).
 */
export const SKILL_DICTIONARY: Record<string, string[]> = {
  javascript: ["javascript", "js", "es6"],
  typescript: ["typescript", "ts"],
  react: ["react", "react.js", "reactjs"],
  "next.js": ["next.js", "nextjs"],
  vue: ["vue", "vue.js", "vuejs"],
  angular: ["angular"],
  svelte: ["svelte", "sveltekit"],
  node: ["node", "node.js", "nodejs"],
  python: ["python", "django", "flask", "fastapi"],
  ruby: ["ruby", "rails", "ruby on rails"],
  go: ["golang", "go lang"],
  rust: ["rust"],
  java: ["java"],
  kotlin: ["kotlin"],
  php: ["php", "laravel"],
  "c#": ["c#", ".net", "dotnet"],
  elixir: ["elixir", "phoenix"],
  postgres: ["postgres", "postgresql", "psql"],
  mysql: ["mysql", "mariadb"],
  mongodb: ["mongodb", "mongo"],
  redis: ["redis"],
  graphql: ["graphql"],
  rest: ["rest api", "restful"],
  aws: ["aws", "amazon web services"],
  gcp: ["gcp", "google cloud"],
  azure: ["azure"],
  docker: ["docker"],
  kubernetes: ["kubernetes", "k8s"],
  terraform: ["terraform"],
  ci_cd: ["ci/cd", "github actions", "gitlab ci"],
  figma: ["figma"],
  sketch: ["sketch"],
  "ui/ux": ["ux", "ui/ux", "user experience", "user interface"],
  sql: ["sql"],
  kafka: ["kafka"],
  spark: ["spark"],
  tailwind: ["tailwind", "tailwindcss"],
  salesforce: ["salesforce"],
  hubspot: ["hubspot"],
  seo: ["seo", "search engine optimization"],
  zendesk: ["zendesk"],
  intercom: ["intercom"],
};

/* -------------------------------------------------------------------------- */
/* Stage C — categories                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Category classification keywords. The classifier scores title (weighted
 * heavily) + description and picks the top category (enrich.ts).
 */
export const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  Frontend: ["frontend", "front-end", "front end", "ui engineer", "react", "vue", "angular", "svelte", "css"],
  Backend: ["backend", "back-end", "back end", "api", "server", "microservice", "database engineer", "golang", "rust engineer"],
  Fullstack: ["fullstack", "full-stack", "full stack"],
  DevOps: ["devops", "sre", "site reliability", "platform engineer", "infrastructure", "kubernetes", "cloud engineer"],
  Design: ["designer", "design", "ux", "ui/ux", "product design", "graphic", "brand designer", "figma"],
  Product: ["product manager", "product management", "product owner", "pm ", "head of product"],
  "Customer Support": ["customer support", "customer success", "support engineer", "support specialist", "technical support", "help desk"],
  "Sales & Marketing": ["sales", "marketing", "growth", "seo", "content", "demand generation", "account executive", "sdr", "bdr"],
  "Management & Finance": ["manager", "director", "vp", "head of", "finance", "accountant", "controller", "operations", "chief"],
};

/* -------------------------------------------------------------------------- */
/* Stage C — benefits                                                         */
/* -------------------------------------------------------------------------- */

interface BenefitRule extends Benefit {
  keywords: string[];
}

export const BENEFIT_RULES: BenefitRule[] = [
  {
    slug: "equipment-budget",
    label: "Equipment Budget",
    emoji: "💻",
    keywords: ["home office budget", "home-office budget", "equipment budget", "equipment stipend", "hardware budget", "new laptop", "office setup"],
  },
  {
    slug: "learning-budget",
    label: "Learning Budget",
    emoji: "📚",
    keywords: ["learning budget", "learning stipend", "professional development", "courses", "certifications", "conference budget", "education stipend"],
  },
  {
    slug: "coworking-stipend",
    label: "Coworking Stipend",
    emoji: "🏢",
    keywords: ["co-working", "coworking", "coworking space", "co-working stipend", "wework"],
  },
  {
    slug: "retirement-plan",
    label: "Retirement Plan",
    emoji: "🏦",
    keywords: ["retirement", "pension", "401k", "401(k)", "rrsp", "superannuation"],
  },
  {
    slug: "health-insurance",
    label: "Health Insurance",
    emoji: "🏥",
    keywords: ["health insurance", "medical insurance", "healthcare", "medical coverage", "dental", "vision insurance"],
  },
  {
    slug: "unlimited-pto",
    label: "Unlimited PTO",
    emoji: "🌴",
    keywords: ["unlimited pto", "unlimited vacation", "unlimited time off", "flexible pto"],
  },
  {
    slug: "parental-leave",
    label: "Parental Leave",
    emoji: "👶",
    keywords: ["parental leave", "maternity leave", "paternity leave", "family leave"],
  },
  {
    slug: "stock-options",
    label: "Stock Options",
    emoji: "📈",
    keywords: ["stock options", "equity", "rsus", "esop"],
  },
];
