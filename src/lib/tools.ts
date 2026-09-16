/** Free tools — utility pages that help remote job seekers and pull in remote-work searches. */
export type ToolGroup = "Stay safe" | "Pay and money" | "Time zones and moving" | "Search and apply";

export interface ToolMeta {
  slug: string;
  title: string;
  short: string; // footer/nav label
  description: string;
  keywords: string[];
  group: ToolGroup;
  /** Shown in the site footer. The rest are reachable from /tools. */
  featured?: boolean;
}

export const TOOL_GROUPS: { group: ToolGroup; blurb: string }[] = [
  { group: "Stay safe", blurb: "Check a posting before you share anything." },
  { group: "Pay and money", blurb: "Compare salaries, offers and what they're worth where you live." },
  { group: "Time zones and moving", blurb: "Plan hours across a team, and track where you spend your days." },
  { group: "Search and apply", blurb: "Find better matches and keep your applications in order." },
];

export const TOOLS: ToolMeta[] = [
  {
    slug: "fake-job-checker",
    title: "Fake Job Posting Checker",
    short: "Fake job checker",
    group: "Stay safe",
    featured: true,
    description:
      "Paste a job ad or recruiter message and get a red-flag report: pay-to-work requests, free email domains, chat-app interviews and more. Runs in your browser.",
    keywords: ["fake job checker", "is this job a scam", "job scam checker", "remote job scam red flags"],
  },
  {
    slug: "jd-remote-analyzer",
    title: "Truly-Remote Job Description Analyzer",
    short: "Remote JD analyzer",
    group: "Stay safe",
    featured: true,
    description:
      "Paste a job description to see whether it's really remote. Highlights hybrid, office, location, visa and timezone clauses using the same rules as our job filter.",
    keywords: ["is this job really remote", "hybrid job checker", "remote job description analyzer", "work from anywhere checker"],
  },
  {
    slug: "password-generator",
    title: "Strong Password Generator",
    short: "Password generator",
    group: "Stay safe",
    description:
      "Generate strong, random, secure passwords in your browser. Choose length and character types, see the strength, and copy — nothing is stored or sent.",
    keywords: ["strong password generator", "random password generator", "secure password", "password creator"],
  },
  {
    slug: "salary-band-estimator",
    title: "Remote Salary Band Estimator",
    short: "Salary band estimator",
    group: "Pay and money",
    featured: true,
    description:
      "See the salary range remote employers publish for your field, level and region, built from the listings on our board, with the sample size shown.",
    keywords: ["remote salary estimator", "remote salary range", "what do remote jobs pay", "salary band calculator"],
  },
  {
    slug: "salary-purchasing-power",
    title: "Salary Purchasing-Power Calculator",
    short: "Purchasing power",
    group: "Pay and money",
    description:
      "Compare what a remote salary is worth in 70 countries, using World Bank price-level data. See the equivalent pay needed to live the same way elsewhere.",
    keywords: ["salary purchasing power calculator", "ppp salary converter", "cost of living salary comparison", "remote salary by country"],
  },
  {
    slug: "offer-comparator",
    title: "Remote Job Offer Comparison Calculator",
    short: "Offer comparator",
    group: "Pay and money",
    description:
      "Compare two remote job offers side by side: salary, bonus, benefits, contractor costs, leave and local prices, converted to what each is really worth.",
    keywords: ["job offer comparison calculator", "compare two job offers", "remote offer calculator", "contractor vs employee calculator"],
  },
  {
    slug: "remote-salary-converter",
    title: "Remote Salary Converter",
    short: "Salary converter",
    group: "Pay and money",
    description:
      "Convert a remote salary between USD, EUR, GBP, CAD and more — with monthly and hourly equivalents. Compare offers across US and European currencies.",
    keywords: ["remote salary converter", "usd to eur salary", "salary calculator remote", "remote pay converter"],
  },
  {
    slug: "home-office-cost-calculator",
    title: "Home Office Cost and Stipend Calculator",
    short: "Home office costs",
    group: "Pay and money",
    description:
      "Work out what your home office really costs each year, how far a stipend goes, and the tax relief available in the US, UK, Germany, Ireland, Australia and more.",
    keywords: ["home office cost calculator", "work from home allowance calculator", "home office stipend", "work from home tax relief"],
  },
  {
    slug: "timezone-overlap",
    title: "Timezone Overlap Finder",
    short: "Timezone overlap",
    group: "Time zones and moving",
    featured: true,
    description:
      "See how many 9-to-5 working hours you'd share with a remote team in another timezone — US, Europe, Asia and beyond. Plan async remote work.",
    keywords: ["timezone overlap tool", "working hours overlap", "remote timezone calculator", "time zone overlap"],
  },
  {
    slug: "team-timezone-matrix",
    title: "Team Timezone Overlap Matrix",
    short: "Team timezone matrix",
    group: "Time zones and moving",
    description:
      "Add up to eight teammates' cities and working hours to see every pairwise overlap and the best shared meeting window, with daylight saving handled.",
    keywords: ["team time zone planner", "meeting time across time zones", "timezone overlap matrix", "distributed team meeting planner"],
  },
  {
    slug: "world-time-buddy",
    title: "World Clock & Meeting Planner",
    short: "World clock",
    group: "Time zones and moving",
    description:
      "Compare times across cities and timezones at a glance. Add any city, drag the timeline, and instantly see everyone's local time — perfect for planning remote meetings.",
    keywords: ["world clock", "meeting planner", "time zone converter", "compare time zones", "world time buddy"],
  },
  {
    slug: "nomad-visa-checker",
    title: "Digital Nomad Visa Eligibility Checker",
    short: "Nomad visa checker",
    group: "Time zones and moving",
    featured: true,
    description:
      "Enter your income to see which of 16 digital nomad and remote-worker visas you may qualify for, with 2026 thresholds, durations and the authority to confirm with.",
    keywords: ["digital nomad visa checker", "digital nomad visa income requirements", "remote work visa eligibility", "nomad visa calculator"],
  },
  {
    slug: "tax-residency-day-counter",
    title: "Tax Residency Day Counter (183-Day Tracker)",
    short: "183-day counter",
    group: "Time zones and moving",
    description:
      "Log your trips and see how many days you've spent in each country per calendar year and in any 12-month window, with a warning before you reach 183 days.",
    keywords: ["183 day rule calculator", "tax residency day counter", "days in country tracker", "digital nomad day counter"],
  },
  {
    slug: "company-remote-score",
    title: "Company Remote Hiring Score",
    short: "Company remote score",
    group: "Search and apply",
    description:
      "Look up any employer on our board to see how many roles are open worldwide, where it hires, how often it posts and whether it publishes pay.",
    keywords: ["remote friendly companies", "company remote policy", "which companies hire remotely", "remote company score"],
  },
  {
    slug: "application-tracker",
    title: "Job Application Tracker",
    short: "Application tracker",
    group: "Search and apply",
    description:
      "A private job application tracker that lives in your browser: statuses, follow-up dates, notes and CSV export. No account, nothing uploaded.",
    keywords: ["job application tracker", "free job search tracker", "application tracking spreadsheet", "job hunt organizer"],
  },
  {
    slug: "ats-keyword-checker",
    title: "ATS Keyword Checker",
    short: "ATS keyword checker",
    group: "Search and apply",
    description:
      "Compare your CV with a job description: see which keywords and skills the posting leans on, which you already cover, and which are missing.",
    keywords: ["ats keyword checker", "resume keyword scanner", "cv job description match", "resume match checker"],
  },
  {
    slug: "search-link-builder",
    title: "Remote Job Search Link Builder",
    short: "Search link builder",
    group: "Search and apply",
    description:
      "Build a saved search for our job board, with keywords, category, region, pay floor and newest-first sorting, then bookmark or share the link.",
    keywords: ["remote job search filter", "work from anywhere job search", "remote job alert link", "saved job search"],
  },
];

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

/** Slugs served by the shared /tools/[slug] route (the rest have their own folders). */
export const LEGACY_TOOL_SLUGS = new Set(["remote-salary-converter", "timezone-overlap", "world-time-buddy", "password-generator"]);
