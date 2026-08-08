import Link from "next/link";
import { SITE, FEATURES } from "@/lib/site";
import { LogoMark } from "./icons";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { BookmarksLink } from "./BookmarksLink";
import { NavLinks } from "./NavLinks";

const NAV: [string, string][] = [
  ["Browse jobs", "/remote-backend-jobs"],
  ["Companies", "/companies"],
  ...(FEATURES.newsletter ? ([["Newsletter", "/newsletter"]] as [string, string][]) : []),
  ...(FEATURES.advertise ? ([["Advertise", "/advertise"]] as [string, string][]) : []),
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 p-1.5 text-white">
            <LogoMark />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-ink-900">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          <NavLinks items={NAV} />
          <BookmarksLink />
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link href="/hiring" className="btn-primary hidden md:inline-flex">
            Post a job
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
