import type { Metadata } from "next";
import Link from "next/link";
import { abs } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { topicOf } from "@/lib/posts-topics";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Remote Work Blog — Guides & Tips",
  description:
    "Guides and tips on finding remote jobs you can do from anywhere — how to search, apply, and stand out for work-from-anywhere roles in the US, Europe and beyond.",
  alternates: { canonical: "/posts" },
};

export default function PostsPage() {
  const posts = getAllPosts();
  const [lead, ...rest] = posts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "getremotejobsnow.com — Remote Work Blog",
    url: abs("/posts"),
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      ...(p.updated ? { dateModified: p.updated } : {}),
      author: { "@type": "Organization", name: p.author },
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
          {posts.length} guides · updated {formatDate(posts[0]?.date ?? new Date().toISOString())}
        </p>
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
        <div className="flex items-baseline justify-between gap-4 border-b border-ink-200 pb-3">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink-900">All guides</h2>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-400">Newest first</span>
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
