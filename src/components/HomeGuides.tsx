import Link from "next/link";
import { getPost } from "@/lib/posts";
import { TOOLS } from "@/lib/tools";
import { ArrowUpRightIcon } from "./icons";

/**
 * The site's own work, surfaced on the homepage. Everything else above the fold
 * is listings, which are the employers' words; these are ours, so a visitor (or
 * a reviewer) sees what the site adds before reaching the footer.
 */
const GUIDE_SLUGS = [
  "how-to-spot-fake-remote-job-postings",
  "what-work-from-anywhere-jobs-pay",
  "how-to-tell-if-a-company-is-truly-distributed",
  "remote-work-taxes-living-abroad",
];

export function HomeGuides() {
  const guides = GUIDE_SLUGS.map((s) => getPost(s)).filter((p): p is NonNullable<typeof p> => !!p);
  const tools = TOOLS.filter((t) => t.featured).slice(0, 4);
  if (!guides.length && !tools.length) return null;

  return (
    <section className="pt-14" aria-labelledby="home-guides-title">
      <span className="eyebrow">Guides and tools</span>
      <h2 id="home-guides-title" className="mt-2 font-display text-xl font-semibold tracking-tight text-ink-900 md:text-2xl">
        Before you apply
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-ink-500">
        Written and built by us from the listings on this board: what remote roles pay, how to spot scams and hybrid
        roles dressed up as remote, and tools that do the checking for you.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <ul className="grid gap-3 self-start sm:grid-cols-2">
          {guides.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/posts/${p.slug}`}
                className="group flex h-full flex-col rounded-xl border border-ink-100 bg-white p-4 transition hover:border-ink-200 hover:bg-ink-50"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">Guide · {p.readMinutes} min read</span>
                <span className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-ink-900 group-hover:text-brand-600">
                  {p.title}
                </span>
                <span className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-500">{p.description}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div>
          <ul className="divide-y divide-ink-100 rounded-xl border border-ink-100 bg-white">
            {tools.map((t) => (
              <li key={t.slug}>
                <Link href={`/tools/${t.slug}`} className="group flex items-start justify-between gap-3 p-4 transition hover:bg-ink-50">
                  <span className="min-w-0">
                    <span className="block font-display text-[15px] font-semibold text-ink-900 group-hover:text-brand-600">{t.title}</span>
                    <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-ink-500">{t.description}</span>
                  </span>
                  <ArrowUpRightIcon className="mt-1 h-4 w-4 flex-shrink-0 text-ink-400 transition group-hover:text-brand-600" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium">
            <Link href="/posts" className="text-brand-600 hover:text-brand-700">All guides →</Link>
            <Link href="/tools" className="text-brand-600 hover:text-brand-700">All free tools →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
