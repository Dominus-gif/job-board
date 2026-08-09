import Link from "next/link";
import { SITE, FEATURES } from "@/lib/site";
import { CATEGORIES, categoryToSlug } from "@/lib/taxonomy";
import { TOOLS } from "@/lib/tools";
import { getAllPosts } from "@/lib/posts";
import { LogoMark } from "./icons";

/** Remote jobs by location — high-intent geo searches (US & European markets). */
const LOCATION_LINKS: { href: string; label: string }[] = [
  { href: "/remote-jobs-in-usa", label: "Remote Jobs in the USA" },
  { href: "/remote-jobs-in-europe", label: "Remote Jobs in Europe" },
  { href: "/remote-jobs-in-uk", label: "Remote Jobs in the UK" },
  { href: "/remote-jobs-in-germany", label: "Remote Jobs in Germany" },
  { href: "/remote-jobs-in-canada", label: "Remote Jobs in Canada" },
];

/**
 * Keyword-rich internal links surfaced on every page (site-wide footer). Real,
 * relevant pages with descriptive anchor text — this is legitimate internal
 * linking that spreads ranking signal, not keyword stuffing.
 */
const POPULAR_SEARCHES: { href: string; label: string }[] = [
  { href: "/work-from-home-jobs", label: "Work From Home Jobs" },
  { href: "/remote-jobs-in-usa", label: "Remote Jobs USA" },
  { href: "/remote-jobs-in-europe", label: "Remote Jobs Europe" },
  { href: "/remote-backend-jobs", label: "Remote Developer Jobs" },
  { href: "/remote-frontend-jobs", label: "Remote Frontend Jobs" },
  { href: "/remote-fullstack-jobs", label: "Remote Full-Stack Jobs" },
  { href: "/remote-devops-jobs", label: "Remote DevOps & Cloud Jobs" },
  { href: "/remote-design-jobs", label: "Remote Design Jobs" },
  { href: "/remote-product-jobs", label: "Remote Product Manager Jobs" },
  { href: "/remote-sales-marketing-jobs", label: "Remote Marketing Jobs" },
  { href: "/remote-customer-support-jobs", label: "Remote Customer Support Jobs" },
  { href: "/remote-management-finance-jobs", label: "Remote Finance Jobs" },
  { href: "/remote-part-time-jobs", label: "Part-Time Remote Jobs" },
  { href: "/fully-remote-no-experience-jobs", label: "Entry-Level Remote Jobs" },
  { href: "/remote-jobs-with-health-insurance", label: "Remote Jobs With Health Insurance" },
];

export function Footer() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <footer className="mt-20 bg-ink-900 text-ink-200">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,3.2fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 p-1.5 text-white">
                <LogoMark />
              </span>
              <span className="font-display text-lg font-extrabold text-white">{SITE.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-300">{SITE.tagline}</p>
            <Link
              href="/page/1"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Browse all remote jobs
            </Link>
            <div className="mt-4">
              <Link
                href="/archived"
                className="text-sm text-ink-300 underline-offset-2 transition hover:text-white hover:underline"
              >
                Inactive / Archived listings
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            <FooterCol title="By location">
              {LOCATION_LINKS.map((l) => (
                <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>
              ))}
            </FooterCol>

            <FooterCol title="Categories">
              {CATEGORIES.slice(0, 5).map((c) => (
                <FooterLink key={c} href={`/remote-${categoryToSlug(c)}-jobs`}>{c}</FooterLink>
              ))}
              <FooterLink href="/remote-regional-jobs">Remote — regional</FooterLink>
            </FooterCol>

            <FooterCol title="Tools">
              {TOOLS.map((t) => (
                <FooterLink key={t.slug} href={`/tools/${t.slug}`}>{t.short}</FooterLink>
              ))}
              <FooterLink href="/tools">All tools</FooterLink>
            </FooterCol>

            <FooterCol title="Posts">
              {posts.map((p) => (
                <FooterLink key={p.slug} href={`/posts/${p.slug}`}>{p.title}</FooterLink>
              ))}
              <FooterLink href="/posts">All posts</FooterLink>
            </FooterCol>

            <FooterCol title="Company">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/hiring">Post a job</FooterLink>
              {FEATURES.advertise && <FooterLink href="/advertise">Advertise</FooterLink>}
              {FEATURES.newsletter && <FooterLink href="/newsletter">Newsletter</FooterLink>}
              <FooterLink href="/rss-feeds">RSS feeds</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterCol>
          </div>
        </div>
      </div>

      {/* Popular searches — keyword-rich internal links on every page. */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">Popular remote job searches</h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-ink-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-ink-400 sm:flex-row">
          <span>© {new Date().getFullYear()} {SITE.name} · Filtered for true global-remote.</span>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/about" className="transition hover:text-white">About</Link>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
            <Link href="/privacy" className="transition hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition hover:text-white">Terms of Service</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-ink-300 transition hover:text-white">{children}</Link>
    </li>
  );
}
