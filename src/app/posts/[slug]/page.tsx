import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { abs, SITE } from "@/lib/site";
import { getAllPosts, getPost } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = abs(`/posts/${post.slug}`);
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const url = abs(`/posts/${post.slug}`);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: { "@type": "Organization", name: post.author },
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
      mainEntityOfPage: url,
      url,
      keywords: post.tags.join(", "),
    },
    breadcrumbJsonLd([
      { name: "Posts", path: "/posts" },
      { name: post.title, path: `/posts/${post.slug}` },
    ]),
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-ink-400">
        <Link href="/posts" className="hover:text-ink-900">Posts</Link>
        <span aria-hidden>/</span>
        <span className="truncate text-ink-500">{post.title}</span>
      </nav>

      <div className="flex flex-wrap items-center gap-2 text-xs text-ink-400">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden>·</span>
        <span>{post.readMinutes} min read</span>
        <span aria-hidden>·</span>
        <span>{post.author}</span>
      </div>
      <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.4rem]">
        {post.title}
      </h1>

      <div className="prose-post mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />

      <div className="mt-10 rounded-xl border border-ink-100 bg-ink-50 p-6 text-center">
        <p className="font-display text-lg font-semibold text-ink-900">Ready to find your remote job?</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-ink-500">
          Every role on the main board is one you can do from anywhere in the world.
        </p>
        <Link href="/page/1" className="btn-primary mt-4">Browse all remote jobs</Link>
      </div>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <span key={t} className="rounded-md bg-ink-50 px-2 py-0.5 text-xs font-medium text-ink-500 ring-1 ring-inset ring-ink-100">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
