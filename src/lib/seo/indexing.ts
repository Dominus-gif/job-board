/**
 * What belongs in Google's index, and what only belongs on the site.
 *
 * The AdSense review failed on "not enough unique content". The measurement
 * behind that: 12,797 indexed URLs, of which 9,971 were job listings carrying a
 * median of 33 words, 2,691 were company pages two thirds of which existed to
 * show a single job, and 16 were things we wrote. A crawler judging the site on
 * that sample is judging it on the thin 99%.
 *
 * The fix is not to hide the site. Every one of these pages stays reachable,
 * linked and useful to someone browsing — a visitor searching for a role should
 * still find it. What changes is that a page has to carry something of its own
 * before it is offered to a search engine as a destination.
 *
 * One module because the sitemap and the page's own robots tag MUST agree: a
 * URL submitted in the sitemap and then served with `noindex` is a contradiction
 * that reads worse than either choice alone. Both read these predicates.
 */
import type { Job } from "../types";

/**
 * A listing page needs this much of its own description before it is worth
 * offering as a search result. Below it, the page is the template plus a
 * sentence — and that sentence is usually the employer's "about us" line, which
 * every other role at the same company also carries.
 *
 * Set at 60 rather than higher because the aim is to exclude pages that are
 * only boilerplate, not to demand an essay: 60 words is roughly where an
 * excerpt stops being an introduction and starts describing the work.
 */
export const MIN_DESCRIPTION_WORDS = 60;

/**
 * A company page below this many live listings is a name, a logo and a list of
 * one. 1,777 of them shipped at 83-95 words apiece.
 */
export const MIN_COMPANY_LISTINGS = 3;

/** A filtered view below this many results is an empty room with a sign on it. */
export const MIN_LANDING_LISTINGS = 8;

/** Plain-text word count of a description, ignoring markup. */
export function descriptionWords(html: string | undefined | null): number {
  const text = String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text ? text.split(" ").length : 0;
}

/**
 * Directory rows: a company-level pointer rather than one job ("Roles hiring
 * for: Ruby, Go, QA"), and the stub we write when an import carried no
 * description at all. Neither is a job posting, so neither is a search result
 * for a job. These already carry no JobPosting markup for the same reason.
 */
export function isDirectoryPointer(html: string | undefined | null): boolean {
  const text = String(html || "");
  return /roles hiring for\s*:/i.test(text) || /see the full description and apply directly/i.test(text);
}

/**
 * An apply link that lands on a careers index rather than on this posting.
 *
 * 534 listings did this: the page names one role, the button drops you on the
 * employer's whole jobs page to find it yourself. It stays on the board — the
 * role is real and the link does reach the employer — but a page that cannot
 * deliver what its title promises is not one to put in front of a searcher.
 */
export function applyLinkIsSpecific(applyUrl: string | undefined | null): boolean {
  if (!applyUrl) return false;
  try {
    const u = new URL(applyUrl);
    if (u.search || u.hash) return true; // ?gh_jid=… identifies a posting
    return u.pathname.split("/").filter(Boolean).length > 1;
  } catch {
    return false;
  }
}

/** Should this listing be offered to search engines as a destination? */
export function jobIsIndexable(
  job: Pick<Job, "description_html" | "status" | "is_active" | "apply_url">
): boolean {
  if (job.status === "expired" || job.is_active === false) return false;
  if (isDirectoryPointer(job.description_html)) return false;
  if (!applyLinkIsSpecific(job.apply_url)) return false;
  return descriptionWords(job.description_html) >= MIN_DESCRIPTION_WORDS;
}

/** Should this company profile be offered to search engines? */
export function companyIsIndexable(liveListings: number): boolean {
  return liveListings >= MIN_COMPANY_LISTINGS;
}

/** Should this filtered landing page be offered to search engines? */
export function landingIsIndexable(results: number): boolean {
  return results >= MIN_LANDING_LISTINGS;
}

/**
 * Next's `robots` metadata for a page we are keeping out of the index.
 *
 * `follow` stays on deliberately: the page is a real part of the site and its
 * links to companies, categories and other roles are worth crawling even when
 * the page itself is not worth ranking.
 */
export const NOINDEX = { index: false, follow: true } as const;
export const INDEX = { index: true, follow: true } as const;

export function robotsFor(indexable: boolean) {
  return indexable ? INDEX : NOINDEX;
}
