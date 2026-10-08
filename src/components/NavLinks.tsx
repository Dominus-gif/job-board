"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GuideSparkle } from "./GuideSparkle";

/** True when the current path belongs to a nav destination. */
export function navIsActive(href: string, path: string): boolean {
  if (href === "/jobs") {
    // "Browse jobs" owns the whole job-browsing surface.
    return path.startsWith("/jobs") || path.startsWith("/remote-") || path.startsWith("/page");
  }
  return path === href || path.startsWith(`${href}/`);
}

/**
 * `sparkle` names the one href whose label gets the star treatment. Passed in
 * rather than matched here, so this component still knows nothing about which
 * route is special.
 */
export function NavLinks({ items, sparkle }: { items: [string, string][]; sparkle?: string }) {
  const path = usePathname();
  return (
    <>
      {items.map(([label, href]) => {
        const active = navIsActive(href, path);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex items-center leading-none transition ${active ? "font-semibold text-ink-900" : "text-ink-600 hover:text-ink-900"}`}
          >
            {href === sparkle ? <GuideSparkle>{label}</GuideSparkle> : label}
          </Link>
        );
      })}
    </>
  );
}
