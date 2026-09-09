"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { templateOf } from "@/lib/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Tags every pageview with the template that rendered it, so RPM can be
 * compared per template type rather than only in aggregate.
 *
 * The expectation worth testing: job detail pages should out-earn listing
 * pages, because they carry an in-article unit against long-form content while
 * listings mostly serve scanning traffic. Without this split, a single blended
 * RPM hides which template is actually paying and placement budget gets spent
 * in the wrong place.
 *
 * Derived from the pathname so no page needs to opt in — a new route is
 * classified automatically, and misclassification shows up as "other" rather
 * than silently landing in the wrong bucket.
 *
 * Sent as its own `template_view` event, not a second `page_view`: GA4 already
 * fires page_view automatically, and duplicating it would inflate sessions.
 */
export function TemplateAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || typeof window.gtag !== "function") return;
    window.gtag("event", "template_view", {
      page_template: templateOf(pathname),
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
