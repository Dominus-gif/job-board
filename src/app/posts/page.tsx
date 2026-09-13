import type { Metadata } from "next";
import Link from "next/link";
import { abs } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { getPostSections } from "@/lib/posts-topics";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Remote Work Blog — Guides & Tips",
  description:
    "Guides and tips on finding remote jobs you can do from anywhere — how to search, apply, and stand out for work-from-anywhere roles in the US, Europe and beyond.",
  alternates: { canonical: "/posts" },
};

export default function PostsPage() {
  const posts = getAllPosts();
  const { sections, total } = getPostSections();
  const lead = posts[0];

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
          {total} guides · {sections.length} sections
        </p>
      </header>

      {/* Contents. A real index needs a way in from the top; on a page this
          long, jump links are the difference between a catalogue and a wall. */}
      <nav aria-label="Sections" className="mt-8 flex flex-wrap gap-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-ink-100 bg-white px-3.5 py-1.5 text-sm font-medium text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
          >
            {s.title}
            <span className="ml-1.5 font-mono text-xs text-ink-400">{s.posts.length}</span>
          </a>
        ))}
      </nav>

      {/* Lead article — the newest piece, given the room it deserves. */}
      {lead && (
        <section className="mt-10">
          <article className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-ink-50 p-6 transition hover:border-ink-200 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
              <span className="rounded-md bg-ink-900 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-white">
                Latest
              </span>
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
        </section>
      )}

      {/* The numbered index. */}
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="mt-14 scroll-mt-24">
          <div className="border-b border-ink-200 pb-3">
            <h2 className="font-display text-xl font-bold tracking-tight text-ink-900">{section.title}</h2>
            <p className="mt-1 text-sm text-ink-500">{section.blurb}</p>
          </div>

          <ol className="divide-y divide-ink-100">
            {section.posts.map(({ post, index }) => (
              <li key={post.slug}>
                <article className="group relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-6">
                  {/* The number. Tabular and muted — it is a position in a
                      catalogue, not a ranking, so it should read as furniture
                      rather than compete with the headline. */}
                  <span
                    aria-hidden
                    className="font-mono text-lg font-semibold tabular-nums text-ink-300 transition group-hover:text-brand-500 sm:text-2xl"
                  >
                    {String(index).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
                      {/* The newest piece also has the lead card above. Saying
                          so makes the repeat read as a cross-reference rather
                          than as the same article listed twice by mistake. */}
                      {post.slug === lead?.slug && (
                        <span className="rounded-md bg-ink-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-ink-600">
                          Latest
                        </span>
                      )}
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span aria-hidden>·</span>
                      <span>{post.readMinutes} min read</span>
                    </div>
                    <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-ink-900 sm:text-xl">
                      <Link href={`/posts/${post.slug}`} className="transition group-hover:text-brand-600">
                        <span className="absolute inset-0" aria-hidden />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 leading-relaxed text-ink-600">{post.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-ink-50 px-2 py-0.5 text-xs font-medium text-ink-500 ring-1 ring-inset ring-ink-100"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
