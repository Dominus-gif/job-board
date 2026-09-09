"use client";

/**
 * Shared GA4 helpers.
 *
 * Everything here is best-effort: analytics must never break a render, and gtag
 * is absent whenever GA is unset or a blocker is active, so every call guards.
 */

/**
 * Classify a pathname into the template that rendered it.
 *
 * Pairing this with ad-slot impressions is what makes per-template RPM
 * answerable — a blended figure hides which template actually pays, and
 * placement effort then goes to the wrong one.
 */
export function templateOf(path: string): string {
  if (path === "/") return "home";
  if (path.startsWith("/jobs/")) return "job_detail";
  if (path === "/jobs") return "job_search";
  if (path.startsWith("/posts/")) return "post_detail";
  if (path === "/posts") return "post_index";
  if (path.startsWith("/companies/")) return "company_detail";
  if (path === "/companies") return "company_index";
  if (path.startsWith("/page/")) return "listing_paged";
  if (path.startsWith("/tools/")) return "tool";
  if (["/about", "/faq", "/how-it-works", "/privacy", "/terms", "/contact"].includes(path)) return "static";
  // Category and location hubs are the large generated surface.
  if (/^\/(remote|work-from|find-remote|fully-remote|trending-remote)/.test(path)) return "listing_hub";
  return "other";
}

/** Ad placements we want to compare revenue across. */
export type AdSlotType = "in_article" | "in_feed" | "sidebar";

/**
 * Record that an ad slot entered view, tagged with its placement and the
 * template it appeared on.
 *
 * AdSense reports revenue per unit but not per template; GA knows the template
 * but not the revenue. This event is the join key between them — count
 * ad_slot_view by (slot_type, page_template), divide AdSense earnings by it,
 * and you get RPM per placement per template rather than one blended number.
 *
 * Fired on the same near-viewport signal that triggers the ad request, so the
 * count tracks units actually requested rather than units merely present in the
 * DOM far below the fold.
 */
export function trackAdSlotView(slotType: AdSlotType): void {
  if (typeof window === "undefined") return;
  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", "ad_slot_view", {
      slot_type: slotType,
      page_template: templateOf(window.location.pathname),
    });
  } catch {
    /* analytics must never break a render */
  }
}
