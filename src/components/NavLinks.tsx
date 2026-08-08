"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** True when the current path belongs to a nav destination. */
export function navIsActive(href: string, path: string): boolean {
  if (href.startsWith("/remote-")) {
    // "Browse jobs" owns the whole job-browsing surface.
    return path.startsWith("/remote-") || path.startsWith("/page") || path.startsWith("/jobs");
  }
  return path === href || path.startsWith(`${href}/`);
}

export function NavLinks({ items }: { items: [string, string][] }) {
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
            {label}
          </Link>
        );
      })}
    </>
  );
}
