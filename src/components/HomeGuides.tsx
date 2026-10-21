import Link from "next/link";
import { getAllPosts, getPost } from "@/lib/posts";
import { POST_TOPICS } from "@/lib/posts-topics";
import { postsHref } from "@/lib/posts-sort";

/**
 * The guides, shown as a library by topic rather than a handful of links.
 *
 * Everything in the job feed is the employers' own words. These are ours,
 * written from the board's data, and they are most of what the site adds, so
 * the homepage shows their full range near the top instead of four of them
 * below the listings.
 */
export function HomeGuides() {
  const total = getAllPosts().length;
  const topics = POST_TOPICS.map((t) => ({
    ...t,
    posts: t.slugs.map((s) => getPost(s)).filter((p): p is NonNullable<typeof p> => !!p),
  })).filter((t) => t.posts.length >= 2);
  if (!topics.length) return null;

  return (
    <section className="pt-14" aria-labelledby="home-guides-title">
      <span className="eyebrow">Guides</span>
      <h2 id="home-guides-title" className="mt-2 font-display text-xl font-semibold tracking-tight text-ink-900 md:text-2xl">
        {total} guides to finding, getting and doing remote work
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-ink-500">
        Written by us, with every figure counted from the listings on this board and dated, so you can see what it is based on.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => (
          <li key={t.id} className="flex flex-col rounded-xl border border-ink-100 bg-white p-4">
            <Link href={postsHref({ sort: "", topic: t.title })} className="group inline-flex items-baseline justify-between gap-2">
              <span className="font-display text-[15px] font-semibold text-ink-900 group-hover:text-brand-600">{t.title}</span>
              <span className="shrink-0 text-xs text-ink-500">{t.posts.length} guides</span>
            </Link>
            <p className="mt-1 text-sm leading-relaxed text-ink-500">{t.blurb}</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {t.posts.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link href={`/posts/${p.slug}`} className="text-ink-800 underline-offset-2 hover:text-brand-600 hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm">
        <Link href="/posts" className="font-medium text-brand-600 hover:text-brand-700">
          Browse all {total} guides →
        </Link>
      </p>
    </section>
  );
}
