import Link from "next/link";
import { SITE } from "@/lib/site";
import { CATEGORIES, categoryToSlug } from "@/lib/taxonomy";
import { LogoMark } from "./icons";

const social = [
  ["Discord", SITE.social.discord],
  ["LinkedIn", SITE.social.linkedin],
  ["Reddit", SITE.social.reddit],
  ["X", SITE.social.twitter],
  ["Facebook", SITE.social.facebook],
];

export function Footer() {
  return (
    <footer className="mt-20 bg-ink-900 text-ink-200">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 py-14 md:grid-cols-4">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 p-1.5 text-white">
              <LogoMark />
            </span>
            <span className="font-display text-lg font-extrabold text-white">{SITE.name}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-300">{SITE.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {social.map(([label, href]) => (
              <a key={label} href={href} className="text-ink-300 transition hover:text-white">{label}</a>
            ))}
          </div>
        </div>

        <FooterCol title="Categories">
          {CATEGORIES.slice(0, 6).map((c) => (
            <FooterLink key={c} href={`/remote-${categoryToSlug(c)}-jobs`}>{c}</FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Company">
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/hiring">Post a job</FooterLink>
          <FooterLink href="/advertise">Advertise</FooterLink>
          <FooterLink href="/newsletter">Newsletter</FooterLink>
          <FooterLink href="/rss-feeds">RSS feeds</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterCol>
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
