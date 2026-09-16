/**
 * Topic taxonomy for the guides index.
 *
 * The posts carry 60 tags between them and 44 of those are used exactly once,
 * so labelling on tags would be meaningless. This is a deliberate taxonomy
 * instead: a handful of topics that describe what a reader is actually trying
 * to do, with each post assigned to one.
 *
 * A post missing from this table still appears on the index and simply gets a
 * neutral label, so publishing never depends on remembering to edit this file.
 */

export interface PostTopic {
  id: string;
  title: string;
  blurb: string;
  slugs: string[];
}

export const POST_TOPICS: PostTopic[] = [
  {
    id: "start-here",
    title: "Start here",
    blurb: "What the words mean, and how to tell a real work-from-anywhere role from a remote one.",
    slugs: [
      "work-from-anywhere-meaning",
      "work-from-home-vs-work-from-anywhere",
      "how-to-find-work-from-anywhere-jobs",
    ],
  },
  {
    id: "staying-safe",
    title: "Staying safe",
    blurb: "Spotting fake postings, scams and ghost jobs, and how we check the roles we list.",
    slugs: [
      "how-to-spot-fake-remote-job-postings",
      "ghost-jobs-how-to-tell-a-role-is-still-open",
      "remote-job-scams-how-they-make-money",
      "how-we-source-and-verify-listings",
      "apply-directly-on-company-career-pages",
    ],
  },
  {
    id: "market",
    title: "The remote job market",
    blurb: "Where demand actually is, which roles are growing, and which are quietly disappearing.",
    slugs: [
      "is-remote-work-dying-2026-rto-data",
      "remote-job-tier-list-2026",
      "account-executives-beat-software-engineers-remote",
      "ai-is-killing-these-remote-jobs-what-to-do-instead",
      "async-first-companies-hiring-2026",
    ],
  },
  {
    id: "breaking-in",
    title: "Breaking in",
    blurb: "Getting a first remote job, changing fields, and finding work that fits your circumstances.",
    slugs: [
      "first-remote-job-2026-no-experience",
      "best-remote-jobs-without-tech-background-2026",
      "remote-career-change-guide",
      "remote-jobs-for-people-with-disabilities",
    ],
  },
  {
    id: "non-tech-careers",
    title: "Non-tech careers",
    blurb: "Support, finance, sales, HR and operations: what these remote roles pay and where they hire.",
    slugs: [
      "remote-customer-support-careers",
      "remote-finance-accounting-jobs",
      "remote-sales-jobs-sdr-vs-field-sales",
      "remote-operations-hr-admin-jobs",
    ],
  },
  {
    id: "searching-smarter",
    title: "Searching smarter",
    blurb: "Reading listings closely, choosing boards, building a routine, and keeping your energy up.",
    slugs: [
      "how-to-spot-hybrid-bait-in-remote-job-descriptions",
      "the-date-posted-problem-why-freshness-matters",
      "remote-job-application-tracker-minimal-system",
      "what-recruiters-see-when-you-apply-remotely",
      "job-posting-lifecycle-after-you-apply",
      "free-vs-paid-remote-job-boards",
      "why-career-page-job-boards-are-more-reliable",
      "30-minute-remote-job-search-routine",
      "remote-job-interviews-across-time-zones",
      "psychology-of-remote-job-hunting",
    ],
  },
  {
    id: "time-zones",
    title: "Time zones",
    blurb: "How much overlap a team needs, schedules you can sustain, and hours rules that shut people out.",
    slugs: [
      "timezone-overlap-how-much-you-need",
      "working-across-timezones-without-burning-out",
      "remote-jobs-in-asia-pacific-timezone-filters",
    ],
  },
  {
    id: "pay-and-paperwork",
    title: "Pay and paperwork",
    blurb: "What remote roles pay, how to compare offers and benefits, and what moving abroad does to your taxes.",
    slugs: [
      "remote-salaries-2026-negotiate-the-premium",
      "digital-nomad-visas-2026",
      "what-a-100k-remote-salary-really-buys",
      "hourly-vs-annual-remote-pay-converting-offers",
      "salary-transparency-laws-2026",
      "remote-benefits-decoded-by-region",
      "what-work-from-anywhere-jobs-pay",
      "cost-of-living-arbitrage-remote-salary",
      "remote-work-taxes-living-abroad",
      "cost-of-working-from-home-by-country",
    ],
  },
  {
    id: "by-place-and-company",
    title: "By place and company",
    blurb: "Country guides, which employers hire worldwide, and straight answers about specific companies.",
    slugs: [
      "how-to-find-remote-jobs-in-the-usa",
      "remote-jobs-in-europe-where-to-look",
      "does-spacex-have-remote-jobs",
      "safe-superintelligence-and-ai-lab-careers",
      "getting-hired-remotely-from-outside-the-us",
      "how-to-tell-if-a-company-is-truly-distributed",
      "most-remote-friendly-companies-hiring-worldwide",
    ],
  },
];

const TOPIC_BY_SLUG = new Map<string, string>(
  POST_TOPICS.flatMap((t) => t.slugs.map((slug) => [slug, t.title] as const))
);

/**
 * The topic label for a post, for the column on the index.
 *
 * The index is a single list rather than five blocks, so the taxonomy is
 * carried per row instead of as section headings — the categorisation still
 * reaches the reader, but without cutting the page up. A post missing from the
 * table above falls back to a neutral label rather than an empty cell.
 */
export function topicOf(slug: string): string {
  return TOPIC_BY_SLUG.get(slug) ?? "Remote work";
}
