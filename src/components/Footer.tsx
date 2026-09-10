import Link from "next/link";
import { SITE, FEATURES } from "@/lib/site";
import { CATEGORIES, categoryToSlug } from "@/lib/taxonomy";
import { TOOLS } from "@/lib/tools";
import { getAllPosts } from "@/lib/posts";
import { Logo } from "./Logo";

/** Remote jobs by location — high-intent geo searches (countries + key cities). */
const LOCATION_LINKS: { href: string; label: string }[] = [
  { href: "/remote-jobs-in-usa", label: "USA" },
  { href: "/remote-jobs-in-europe", label: "Europe" },
  { href: "/remote-jobs-in-uk", label: "UK" },
  { href: "/remote-jobs-in-canada", label: "Canada" },
  { href: "/remote-jobs-in-india", label: "India" },
  { href: "/remote-jobs-in-the-bay-area", label: "Bay Area / San Francisco" },
  { href: "/remote-jobs-in-new-york", label: "New York" },
  { href: "/remote-jobs-in-seattle", label: "Seattle" },
  { href: "/remote-jobs-in-austin", label: "Austin" },
  { href: "/remote-jobs-in-toronto", label: "Toronto" },
  { href: "/remote-jobs-in-london", label: "London" },
  { href: "/remote-jobs-in-berlin", label: "Berlin" },
];

/**
 * Keyword-rich internal links surfaced on every page (site-wide footer). Real,
 * relevant pages with descriptive anchor text — this is legitimate internal
 * linking that spreads ranking signal, not keyword stuffing.
 */
const POPULAR_SEARCHES: { href: string; label: string }[] = [
  { href: "/find-remote-jobs", label: "Find Remote Jobs" },
  { href: "/remote-jobs-categories", label: "Remote Jobs by Category" },
  { href: "/trending-remote-jobs", label: "Trending Remote Jobs" },
  { href: "/remote-jobs-programming-support-design", label: "Programming, Support & Design Jobs" },
  { href: "/work-from-home-jobs", label: "Work From Home Jobs" },
  { href: "/remote-jobs-in-usa", label: "Remote Jobs USA" },
  { href: "/remote-jobs-in-europe", label: "Remote Jobs Europe" },
  { href: "/remote-jobs-in-the-bay-area", label: "Remote Jobs Bay Area" },
  { href: "/remote-jobs-in-london", label: "Remote Jobs London" },
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

/** Browse-by-type links appended to the Categories column so it fills its height. */
const BY_TYPE_LINKS: { href: string; label: string }[] = [
  { href: "/work-from-home-jobs", label: "Work from home" },
  { href: "/remote-part-time-jobs", label: "Part-time" },
  { href: "/fully-remote-no-experience-jobs", label: "Entry-level" },
];

export function Footer() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <footer className="site-footer mt-20 bg-ink-900 text-ink-200">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,3.2fr)]">
          <div>
            <Logo onDark />
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

            {/* Company links live in the brand column so it fills the row height
                instead of leaving dead space below the tall link columns. */}
            <div className="mt-8">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">Company</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/how-it-works">How it works</FooterLink>
                <FooterLink href="/faq">FAQ</FooterLink>
                <FooterLink href="/hiring">Post a job</FooterLink>
                {FEATURES.advertise && <FooterLink href="/advertise">Advertise</FooterLink>}
                {FEATURES.newsletter && <FooterLink href="/newsletter">Newsletter</FooterLink>}
                <FooterLink href="/rss-feeds">RSS feeds</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </ul>
            </div>
          </div>

          {/* Three roughly equal-height columns so no column ends in a big band
              of empty dark space: a full location list, Categories+By type, and
              Tools+Posts. */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterCol title="By location">
              {LOCATION_LINKS.map((l) => (
                <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>
              ))}
            </FooterCol>

            <FooterCol title="Browse">
              {CATEGORIES.map((c) => (
                <FooterLink key={c} href={`/remote-${categoryToSlug(c)}-jobs`}>{c}</FooterLink>
              ))}
              <FooterLink href="/remote-regional-jobs">Remote — regional</FooterLink>
              {BY_TYPE_LINKS.map((l) => (
                <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>
              ))}
            </FooterCol>

            {/* Tools + Posts stack so this column matches the taller single lists. */}
            <div className="space-y-8">
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
            </div>
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

      {/* Editorial close.
          Serif statement against monospace body, split by a dashed rule, with an
          oversized closing line — the contrast between the two faces is what
          carries it, so both are real families rather than the UI sans (see
          src/app/layout.tsx). Kept on the dark surface the rest of the footer
          already uses, so the block reads as one footer rather than two. */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
          {/* — Section one: why this exists — */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16">
            <h2 className="font-editorial text-[1.9rem] leading-[1.12] tracking-tight text-white sm:text-[2.15rem]">
              Built for one,
              <br />
              opened to everyone
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
              <p className="font-editorial-mono text-[13px] leading-[1.9] text-ink-300">
                This project began as a personal tool — one place to keep all my job listings organized. But I noticed
                many people struggling to find a single platform where everything is listed and remote work comes first.
              </p>
              <p className="font-editorial-mono text-[13px] leading-[1.9] text-ink-300">
                So I took the project further: redesigned it, rebuilt it, and opened it up for everyone. My hope is
                simple — that you&apos;ll find the right opportunity here and get the flexibility to work from anywhere.
              </p>
            </div>
          </div>

          {/* Dashed rule, as in the reference — a seam, not a hard divider. */}
          <hr className="my-14 border-0 border-t border-dashed border-white/25 lg:my-16" />

          {/* — Section two: the closing line, then the legal row — */}
          <p className="font-editorial text-[clamp(2.6rem,10vw,7.5rem)] leading-[0.92] tracking-[-0.02em] text-white">
            Work from <em className="italic">anywhere</em>
          </p>

          <div className="mt-14 flex flex-col gap-4 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} {SITE.name} · Filtered for true global-remote.</span>
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="/about" className="transition hover:text-white">About</Link>
              <Link href="/how-it-works" className="transition hover:text-white">How it works</Link>
              <Link href="/faq" className="transition hover:text-white">FAQ</Link>
              <Link href="/contact" className="transition hover:text-white">Contact</Link>
              <Link href="/privacy" className="transition hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="transition hover:text-white">Terms of Service</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, span2 = false }: { title: string; children: React.ReactNode; span2?: boolean }) {
  return (
    <div className={span2 ? "lg:col-span-2" : ""}>
      <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">{title}</h4>
      <ul
        className={`mt-4 space-y-2.5 text-sm ${
          span2 ? "sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2.5 sm:space-y-0" : ""
        }`}
      >
        {children}
      </ul>
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
