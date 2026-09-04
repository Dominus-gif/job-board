import Link from "next/link";
import { CATEGORIES } from "@/lib/taxonomy";
import { POPULAR_LOCATIONS, HUB_LINKS, categoryHref } from "@/lib/seo-hubs";

/**
 * Internal-linking block shared by every SEO hub page: category pages, location
 * pages, and the other hubs. Spreads ranking signal and gives crawlers a dense,
 * relevant link graph. `exclude` hides the current hub from the "Explore" list.
 */
export function SeoHubLinks({ exclude }: { exclude?: string }) {
  const col = "font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink-400";
  const link = "text-ink-700 transition hover:text-brand-700";
  return (
    <section aria-label="Browse more remote jobs" className="grid gap-8 border-t border-ink-100 pt-10 sm:grid-cols-3">
      <div>
        <h2 className={col}>Browse by category</h2>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-1">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <Link href={categoryHref(c)} className={link}>Remote {c} jobs</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className={col}>Browse by location</h2>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-1">
          {POPULAR_LOCATIONS.map((l) => (
            <li key={l.slug}>
              <Link href={`/${l.slug}`} className={link}>Remote jobs in {l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className={col}>Explore</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {HUB_LINKS.filter((h) => h.href !== exclude).map((h) => (
            <li key={h.href}>
              <Link href={h.href} className={link}>{h.label}</Link>
            </li>
          ))}
          <li><Link href="/jobs" className={link}>Search all remote jobs</Link></li>
          <li><Link href="/remote-regional-jobs" className={link}>Remote — regional jobs</Link></li>
        </ul>
      </div>
    </section>
  );
}
