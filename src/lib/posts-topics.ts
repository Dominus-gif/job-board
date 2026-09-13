import { getAllPosts } from "./posts";
import type { Post } from "./posts";

/**
 * Editorial sections for the guides index.
 *
 * The posts carry 60 tags between them and 44 of those are used exactly once,
 * so grouping on tags would produce 44 sections of one. This is a deliberate
 * taxonomy instead: five sections that describe what a reader is actually
 * trying to do, with each post assigned to one.
 *
 * A post that is not listed here still appears — it falls into the last
 * section rather than vanishing from the index, so publishing never silently
 * drops an article.
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

export interface IndexedPost {
  post: Post;
  /** Running position down the whole index, 1-based. */
  index: number;
}

export interface PostSection {
  id: string;
  title: string;
  blurb: string;
  posts: IndexedPost[];
}

/**
 * The index as it is rendered: sections in editorial order, posts newest first
 * within each, and a single running number down the page. The number counts
 * rendered order rather than date, so it reads as a catalogue rather than as a
 * date rank that jumps around inside each section.
 */
export function getPostSections(): { sections: PostSection[]; total: number } {
  const all = getAllPosts();
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  const claimed = new Set<string>();

  const sections: PostSection[] = POST_TOPICS.map((t) => {
    const posts = t.slugs
      .map((slug) => bySlug.get(slug))
      .filter((p): p is Post => {
        if (!p) return false;
        claimed.add(p.slug);
        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return { id: t.id, title: t.title, blurb: t.blurb, posts: posts.map((post) => ({ post, index: 0 })) };
  }).filter((s) => s.posts.length > 0);

  const rest = all.filter((p) => !claimed.has(p.slug));
  if (rest.length > 0) {
    sections.push({
      id: "more",
      title: "More guides",
      blurb: "Everything else we have published.",
      posts: rest.map((post) => ({ post, index: 0 })),
    });
  }

  let n = 0;
  for (const s of sections) for (const p of s.posts) p.index = ++n;

  return { sections, total: n };
}
