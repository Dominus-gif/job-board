"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FEATURES } from "@/lib/site";

const LINKS: [string, string][] = [
  ["Browse jobs", "/jobs"],
  ["Companies", "/companies"],
  ["Bookmarks", "/bookmarks"],
  ...(FEATURES.newsletter ? ([["Newsletter", "/newsletter"]] as [string, string][]) : []),
  ...(FEATURES.advertise ? ([["Advertise", "/advertise"]] as [string, string][]) : []),
  ["RSS feeds", "/rss-feeds"],
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-800 hover:bg-ink-50"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 top-[57px] z-40 bg-ink-900/30" onClick={() => setOpen(false)} aria-hidden />
          <nav className="fixed inset-x-0 top-[57px] z-50 border-b border-ink-100 bg-white p-4 shadow-lift">
            <ul className="flex flex-col gap-1">
              {LINKS.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-ink-800 hover:bg-ink-50"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link href="/hiring" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Post a job
                </Link>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
