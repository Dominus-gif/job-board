import { describe, expect, it } from "vitest";
import { getAllPosts } from "./posts";
import { POST_TOPICS, topicOf } from "./posts-topics";
import {
  POST_SORTS,
  filterPostsByTopic,
  parsePostFilters,
  postsHref,
  sortPosts,
  type PostSort,
} from "./posts-sort";

/**
 * Ordering is the kind of thing that looks fine in a screenshot and is wrong in
 * the middle of the list, so it is asserted against the real library rather
 * than fixtures: these run over every published guide.
 */
const posts = getAllPosts();
const TOPICS = POST_TOPICS.map((t) => t.title);

const dates = (sort: PostSort) => sortPosts(posts, sort).map((p) => new Date(p.date).getTime());

describe("guide sorting", () => {
  it("has a library to sort", () => {
    expect(posts.length).toBeGreaterThan(10);
  });

  it("defaults to newest first", () => {
    const d = dates("");
    for (let i = 1; i < d.length; i++) expect(d[i]).toBeLessThanOrEqual(d[i - 1]);
  });

  it("reverses for oldest first", () => {
    const d = dates("oldest");
    for (let i = 1; i < d.length; i++) expect(d[i]).toBeGreaterThanOrEqual(d[i - 1]);
  });

  it("ranks by last change, falling back to the publish date", () => {
    const ordered = sortPosts(posts, "updated");
    const stamp = (p: (typeof posts)[number]) => new Date(p.updated ?? p.date).getTime();
    for (let i = 1; i < ordered.length; i++) {
      expect(stamp(ordered[i])).toBeLessThanOrEqual(stamp(ordered[i - 1]));
    }
    // A revised guide must outrank one published later but never touched.
    const revised = posts.find((p) => p.updated && new Date(p.updated) > new Date(p.date));
    if (revised) {
      const older = posts.find((p) => !p.updated && new Date(p.date) < new Date(revised.updated!));
      if (older) {
        expect(ordered.indexOf(revised)).toBeLessThan(ordered.indexOf(older));
      }
    }
  });

  it("sorts titles alphabetically", () => {
    const t = sortPosts(posts, "title").map((p) => p.title);
    expect(t).toEqual([...t].sort((a, b) => a.localeCompare(b, "en")));
  });

  it("sorts by reading time in both directions", () => {
    const short = sortPosts(posts, "shortest").map((p) => p.readMinutes);
    for (let i = 1; i < short.length; i++) expect(short[i]).toBeGreaterThanOrEqual(short[i - 1]);
    const long = sortPosts(posts, "longest").map((p) => p.readMinutes);
    for (let i = 1; i < long.length; i++) expect(long[i]).toBeLessThanOrEqual(long[i - 1]);
  });

  it("never drops or duplicates a guide, whatever the sort", () => {
    for (const { value } of POST_SORTS) {
      const slugs = sortPosts(posts, value).map((p) => p.slug);
      expect(slugs.length, `sort "${value}" changed the count`).toBe(posts.length);
      expect(new Set(slugs).size, `sort "${value}" duplicated a guide`).toBe(posts.length);
    }
  });

  it("does not mutate the array it is given", () => {
    const before = posts.map((p) => p.slug);
    sortPosts(posts, "title");
    expect(posts.map((p) => p.slug)).toEqual(before);
  });
});

describe("topic filtering", () => {
  it("returns everything when no topic is set", () => {
    expect(filterPostsByTopic(posts, "")).toHaveLength(posts.length);
  });

  it("returns only that topic's guides, and every topic has some", () => {
    const seen = new Set(posts.map((p) => topicOf(p.slug)));
    for (const title of TOPICS) {
      const got = filterPostsByTopic(posts, title);
      for (const p of got) expect(topicOf(p.slug)).toBe(title);
      // A topic listed in the nav with nothing behind it is a dead end.
      if (seen.has(title)) expect(got.length, `topic "${title}" is listed but empty`).toBeGreaterThan(0);
    }
  });

  it("lists every guide under a real topic, not the fallback", () => {
    // topicOf returns "Remote work" for anything missing from POST_TOPICS, which
    // reads fine in the table and is unreachable from the topic filter — three
    // new guides were stranded that way before this test existed.
    const listed = new Set(POST_TOPICS.flatMap((t) => t.slugs));
    const orphans = posts.filter((p) => !listed.has(p.slug)).map((p) => p.slug);
    expect(orphans, "add these to POST_TOPICS or they cannot be filtered to").toEqual([]);
  });

  it("does not list a slug that no longer exists", () => {
    const real = new Set(posts.map((p) => p.slug));
    const dead = POST_TOPICS.flatMap((t) => t.slugs).filter((sl) => !real.has(sl));
    expect(dead, "these slugs are in POST_TOPICS but have no guide").toEqual([]);
  });
});

describe("query parsing and links", () => {
  it("ignores values it does not recognise", () => {
    expect(parsePostFilters({ sort: "chaos", topic: "Nonsense" }, TOPICS)).toEqual({ sort: "", topic: "" });
    expect(parsePostFilters({}, TOPICS)).toEqual({ sort: "", topic: "" });
  });

  it("keeps the ones it does", () => {
    expect(parsePostFilters({ sort: "title", topic: TOPICS[0] }, TOPICS)).toEqual({ sort: "title", topic: TOPICS[0] });
  });

  it("leaves the default view on the bare URL", () => {
    expect(postsHref({ sort: "", topic: "" })).toBe("/posts");
  });

  it("round-trips a filtered URL", () => {
    const f = { sort: "longest" as PostSort, topic: TOPICS[0] };
    const href = postsHref(f);
    const sp = Object.fromEntries(new URLSearchParams(href.split("?")[1]));
    expect(parsePostFilters(sp, TOPICS)).toEqual(f);
  });

  it("drops a topic when it is toggled off", () => {
    expect(postsHref({ sort: "title", topic: TOPICS[0] }, { topic: "" })).toBe("/posts?sort=title");
  });
});
