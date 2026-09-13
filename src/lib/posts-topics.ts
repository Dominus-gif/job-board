/**
 * Topic taxonomy for the guides index.
 *
 * The posts carry 60 tags between them and 44 of those are used exactly once,
 * so labelling on tags would be meaningless. This is a deliberate taxonomy
 * instead: five topics that describe what a reader is actually trying to do,
 * with each post assigned to one.
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
    blurb: "Getting a first remote job, and getting one without a technical background.",
    slugs: ["first-remote-job-2026-no-experience", "best-remote-jobs-without-tech-background-2026"],
  },
  {
    id: "pay-and-paperwork",
    title: "Pay and paperwork",
    blurb: "What remote roles pay, how to negotiate it, and what moving abroad does to your taxes.",
    slugs: ["remote-salaries-2026-negotiate-the-premium", "digital-nomad-visas-2026"],
  },
  {
    id: "by-place-and-company",
    title: "By place and company",
    blurb: "Country guides, and straight answers about hiring at specific employers.",
    slugs: [
      "how-to-find-remote-jobs-in-the-usa",
      "remote-jobs-in-europe-where-to-look",
      "does-spacex-have-remote-jobs",
      "safe-superintelligence-and-ai-lab-careers",
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
