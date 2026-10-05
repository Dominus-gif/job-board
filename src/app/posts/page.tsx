import type { Metadata } from "next";
import Link from "next/link";
import { abs } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { POST_TOPICS, topicOf } from "@/lib/posts-topics";
import { formatDate } from "@/lib/format";
import { PostSortSelect } from "@/components/PostSortSelect";
import {
  filterPostsByTopic,
  parsePostFilters,
  postsHref,
  sortPosts,
  type PostFilters,
} from "@/lib/posts-sort";

type SP = Record<string, string | string[] | undefined>;

/** Topic titles, in the order the topic list defines them. */
const TOPIC_TITLES = POST_TOPICS.map((t) => t.title);

export async function generateMetadata(props: { searchParams: Promise<SP> }): Promise<Metadata> {
  const f = parsePostFilters(await props.searchParams, TOPIC_TITLES);
  const scoped = f.topic ? `${f.topic} — Remote Work Guides` : "Remote Work Blog — Guides & Tips";
  return {
    title: scoped,
    description:
      "Guides and tips on finding remote jobs you can do from anywhere — how to search, apply, and stand out for work-from-anywhere roles in the US, Europe and beyond.",
    // Every sorted or filtered view is the same library in a different order,
    // so they all canonicalise to the plain index rather than competing with it.
    alternates: { canonical: "/posts" },
    ...(f.sort || f.topic ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function PostsPage(props: { searchParams: Promise<SP> }) {
  const all = getAllPosts();
  const f: PostFilters = parsePostFilters(await props.searchParams, TOPIC_TITLES);
  const posts = sortPosts(filterPostsByTopic(all, f.topic), f.sort);
  const isDefaultView = !f.sort && !f.topic;
  // The lead slot is the newest guide, and only makes sense on the unfiltered
  // index. Under a sort or a topic it would either repeat the first row or
  // contradict the order the reader just chose.
  const [lead, ...rest] = isDefaultView ? posts : [];
  // Topic counts come from the whole library, so a topic never looks empty
  // just because another topic is currently selected.
  const topicCounts = new Map<string, number>();
  for (const p of all) topicCounts.set(topicOf(p.slug), (topicCounts.get(topicOf(p.slug)) ?? 0) + 1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "getremotejobsnow.com — Remote Work Blog",
    url: abs("/posts"),
    blogPost: all.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      ...(p.updated ? { dateModified: p.updated } : {}),
      author: { "@type": "Person", name: p.author },
      url: abs(`/posts/${p.slug}`),
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Masthead */}
      <header className="border-b border-ink-100 pb-10">
        <span className="eyebrow">Guides</span>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">
          Remote work guides &amp; tips
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">
          Practical guides on finding and landing remote jobs you can do from anywhere — for job seekers in the US,
          Europe, and worldwide.
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-ink-400">
          {f.topic ? `${posts.length} of ${all.length} guides` : `${all.length} guides`} · updated{" "}
          {formatDate(all[0]?.date ?? new Date().toISOString())}
        </p>

        {/* Topic filter. Plain links rather than a control, so each topic is
            crawlable, works without JavaScript, and can be shared. */}
        <nav aria-label="Filter guides by topic" className="mt-6 flex flex-wrap gap-2">
          <Link
            href={postsHref(f, { topic: "" })}
            aria-current={f.topic ? undefined : "page"}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              f.topic
                ? "bg-ink-50 text-ink-600 ring-1 ring-inset ring-ink-100 hover:text-ink-900 hover:ring-ink-200"
                : "pill-on"
            }`}
          >
            All guides
          </Link>
          {POST_TOPICS.map((t) => {
            const n = topicCounts.get(t.title) ?? 0;
            if (!n) return null;
            const active = f.topic === t.title;
            return (
              <Link
                key={t.id}
                href={postsHref(f, { topic: active ? "" : t.title })}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "pill-on"
                    : "bg-ink-50 text-ink-600 ring-1 ring-inset ring-ink-100 hover:text-ink-900 hover:ring-ink-200"
                }`}
              >
                {t.title} <span className="tabular-nums opacity-60">{n}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Lead article — the newest piece, given the room it deserves. */}
      {lead && (
        <article className="group relative mt-10 overflow-hidden rounded-2xl border border-ink-100 bg-ink-50 p-6 transition hover:border-ink-200 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
            <span className="rounded-md bg-ink-900 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white">
              Latest
            </span>
            <span className="font-medium text-ink-600">{topicOf(lead.slug)}</span>
            <span aria-hidden>·</span>
            <time dateTime={lead.date}>{formatDate(lead.date)}</time>
            <span aria-hidden>·</span>
            <span>{lead.readMinutes} min read</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-ink-900 md:text-3xl">
            <Link href={`/posts/${lead.slug}`} className="transition group-hover:text-brand-600">
              <span className="absolute inset-0" aria-hidden />
              {lead.title}
            </Link>
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">{lead.description}</p>
        </article>
      )}

      {/* The index.
          One continuous numbered list rather than a page cut into topic
          sections. Each row still says which topic it belongs to, in its own
          column, so the categorisation survives without the reader having to
          jump between blocks to see what exists. The columns line up down the
          page, which is what makes a long list scannable. */}
      <section className="mt-14">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-ink-200 pb-3">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink-900">
            {f.topic || "All guides"}
          </h2>
          <div className="flex items-center gap-2">
            <span className="hidden font-mono text-xs uppercase tracking-[0.14em] text-ink-400 sm:inline">
              {posts.length} {posts.length === 1 ? "guide" : "guides"}
            </span>
            <PostSortSelect sort={f.sort} topic={f.topic} />
          </div>
        </div>

        {/* Column headers, on wide screens only — they name what the right-hand
            columns are without adding noise to a phone. */}
        <div className="hidden border-b border-ink-100 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400 md:grid md:grid-cols-[3rem_minmax(0,1fr)_11rem_7rem_5rem] md:gap-x-6">
          <span>№</span>
          <span>Guide</span>
          <span>Topic</span>
          <span>Published</span>
          <span className="text-right">Read</span>
        </div>

        <ol className="divide-y divide-ink-100">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <article className="group relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 py-5 md:grid-cols-[3rem_minmax(0,1fr)_11rem_7rem_5rem] md:gap-x-6">
                <span
                  aria-hidden
                  className="font-mono text-base font-semibold tabular-nums text-ink-300 transition group-hover:text-brand-500 md:text-lg"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold leading-snug text-ink-900 md:text-lg">
                    <Link href={`/posts/${post.slug}`} className="transition group-hover:text-brand-600">
                      <span className="absolute inset-0" aria-hidden />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-600">{post.description}</p>
                  {/* On a phone the right-hand columns collapse into this line,
                      so nothing is lost when the grid drops to two columns. */}
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-500 md:hidden">
                    <span className="font-medium text-ink-600">{topicOf(post.slug)}</span>
                    <span aria-hidden>·</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden>·</span>
                    <span>{post.readMinutes} min</span>
                  </p>
                </div>

                <span className="hidden text-sm text-ink-600 md:block">{topicOf(post.slug)}</span>
                <time dateTime={post.date} className="hidden text-sm tabular-nums text-ink-500 md:block">
                  {formatDate(post.date)}
                </time>
                <span className="hidden text-right text-sm tabular-nums text-ink-500 md:block">
                  {post.readMinutes} min
                </span>
              </article>
            </li>
          ))}
        </ol>
      </section>

      {posts.length === 0 && (
        <p className="mt-8 rounded-xl border border-ink-100 bg-ink-50 p-6 text-sm text-ink-600">
          No guides under this topic yet.{" "}
          <Link href="/posts" className="font-semibold text-brand-700 underline-offset-2 hover:underline">
            Show every guide
          </Link>
          .
        </p>
      )}

      <p className="mt-8 text-sm text-ink-500">
        Looking for roles rather than reading?{" "}
        <Link href="/work-from-anywhere-jobs" className="font-semibold text-brand-700 underline-offset-2 hover:underline">
          Browse no-location-required jobs
        </Link>
        .
      </p>
      <span className="sr-only">{rest.length} further guides listed above.</span>
    </div>
  );
}
