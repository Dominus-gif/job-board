import Link from "next/link";
import { SITE, FEATURES } from "@/lib/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { BookmarksLink } from "./BookmarksLink";
import { NavLinks } from "./NavLinks";

const NAV: [string, string][] = [
  ["Browse jobs", "/jobs"],
  ["Find jobs", "/find-remote-jobs"],
  ["Companies", "/companies"],
  ...(FEATURES.newsletter ? ([["Newsletter", "/newsletter"]] as [string, string][]) : []),
  ...(FEATURES.advertise ? ([["Advertise", "/advertise"]] as [string, string][]) : []),
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label={`${SITE.name} home`}>
          <Logo />
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
