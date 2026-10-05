/**
 * Sorting and topic filtering for the guides index.
 *
 * Kept out of the page component so the ordering rules can be tested without a
 * browser, and so the page and any future surface (a topic hub, an RSS variant)
 * cannot drift apart on what "newest" means.
 *
 * Everything travels in the query string rather than in client state, matching
 * the jobs search: a sorted or filtered view is then shareable, bookmarkable and
 * works with JavaScript off. The cost is that /posts renders on demand, which
 * the edge cache absorbs after the first request per variant.
 */
import type { Post } from "./posts";
import { topicOf } from "./posts-topics";

export type PostSort = "" | "oldest" | "updated" | "title" | "shortest" | "longest";

export const POST_SORTS: { value: PostSort; label: string; heading: string }[] = [
  { value: "", label: "Newest first", heading: "Newest first" },
  { value: "oldest", label: "Oldest first", heading: "Oldest first" },
  { value: "updated", label: "Recently updated", heading: "Recently updated" },
  { value: "title", label: "Title A–Z", heading: "A to Z" },
  { value: "shortest", label: "Quickest read", heading: "Quickest read first" },
  { value: "longest", label: "Longest read", heading: "Longest read first" },
];

const VALID = new Set(POST_SORTS.map((s) => s.value));

export interface PostFilters {
  sort: PostSort;
  /** A topic title as `topicOf` returns it, or "" for all. */
  topic: string;
}

export type PostSearchParams = Record<string, string | string[] | undefined>;

export function parsePostFilters(sp: PostSearchParams, topics: string[]): PostFilters {
  const g = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  const sort = g("sort") as PostSort;
  const topic = g("topic");
  return {
    sort: VALID.has(sort) ? sort : "",
    topic: topics.includes(topic) ? topic : "",
  };
}

/** The date a post should be ranked by when sorting on recency of change. */
const changedAt = (p: Post) => new Date(p.updated ?? p.date).getTime();
const publishedAt = (p: Post) => new Date(p.date).getTime();

export function sortPosts(posts: Post[], sort: PostSort): Post[] {
  const out = [...posts];
  switch (sort) {
    case "oldest":
      return out.sort((a, b) => publishedAt(a) - publishedAt(b));
    case "updated":
      // Posts that have never been revised fall back to their publish date, so
      // this is "most recently touched" rather than "revised at some point".
      return out.sort((a, b) => changedAt(b) - changedAt(a));
    case "title":
      return out.sort((a, b) => a.title.localeCompare(b.title, "en"));
    case "shortest":
      return out.sort((a, b) => a.readMinutes - b.readMinutes || publishedAt(b) - publishedAt(a));
    case "longest":
      return out.sort((a, b) => b.readMinutes - a.readMinutes || publishedAt(b) - publishedAt(a));
    default:
      return out.sort((a, b) => publishedAt(b) - publishedAt(a));
  }
}

export function filterPostsByTopic(posts: Post[], topic: string): Post[] {
  return topic ? posts.filter((p) => topicOf(p.slug) === topic) : posts;
}

/** Build a /posts URL from the active filters plus overrides. */
export function postsHref(f: PostFilters, changes: Partial<PostFilters> = {}): string {
  const m = { ...f, ...changes };
  const sp = new URLSearchParams();
  if (m.topic) sp.set("topic", m.topic);
  if (m.sort) sp.set("sort", m.sort);
  const s = sp.toString();
  return s ? `/posts?${s}` : "/posts";
}

export const sortHeading = (sort: PostSort): string =>
  POST_SORTS.find((s) => s.value === sort)?.heading ?? "Newest first";
