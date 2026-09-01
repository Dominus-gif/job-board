import type { Metadata } from "next";
import Link from "next/link";
import { abs } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Remote Work Blog — Guides & Tips",
  description:
    "Guides and tips on finding remote jobs you can do from anywhere — how to search, apply, and stand out for work-from-anywhere roles in the US, Europe and beyond.",
  alternates: { canonical: "/posts" },
};

export default function PostsPage() {
  const posts = getAllPosts();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "getremotejobsnow.com — Remote Work Blog",
    url: abs("/posts"),
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      datePublished: p.date,
      url: abs(`/posts/${p.slug}`),
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <span className="eyebrow">Posts</span>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900">Remote work guides &amp; tips</h1>
      <p className="mt-2 max-w-2xl text-ink-500">
        Practical guides on finding and landing remote jobs you can do from anywhere — for job seekers in the US, Europe,
        and worldwide.
      </p>

      <div className="mt-8 divide-y divide-ink-100 border-t border-ink-100">
        {posts.map((p) => (
          <article key={p.slug} className="py-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-ink-400">
              <time dateTime={p.date}>{formatDate(p.date)}</time>
              <span aria-hidden>·</span>
              <span>{p.readMinutes} min read</span>
            </div>
            <h2 className="mt-1.5 font-display text-xl font-semibold text-ink-900">
              <Link href={`/posts/${p.slug}`} className="transition hover:text-brand-600">{p.title}</Link>
            </h2>
            <p className="mt-1.5 text-ink-600">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="rounded-md bg-ink-50 px-2 py-0.5 text-xs font-medium text-ink-500 ring-1 ring-inset ring-ink-100">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
