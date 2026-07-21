"use client";

import { usePathname } from "next/navigation";

/**
 * Renders its children (the newsletter band) on every page EXCEPT the homepage
 * and the newsletter page, which already have their own subscribe fields.
 */
const HIDDEN = new Set(["/", "/newsletter"]);

export function NewsletterCtaGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (HIDDEN.has(pathname)) return null;
  return <>{children}</>;
}
