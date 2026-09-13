import type { Job } from "./types";
import { abs, SITE } from "./site";
import { applicantAreas } from "./seo/job-location";

/** Organization + WebSite JSON-LD for the site (brand/knowledge-panel signals). */
export function siteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${SITE.name} — Remote Jobs`,
      url: SITE.url,
      description: SITE.description,
    },
  ];
}

/** ItemList JSON-LD of job postings — helps Google crawl/rank the listings. */
export function jobListJsonLd(jobs: Job[], name = "Remote Jobs") {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: jobs.length,
    itemListElement: jobs.slice(0, 25).map((j, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/jobs/${j.slug}`),
      name: `${j.title} at ${j.company_name}`,
    })),
  };
}

/**
 * Our board's employment types mapped onto Google's closed, case-sensitive
 * list. `Contract` is the one that does not survive a naive uppercase — Google
 * calls it CONTRACTOR, and anything else is reported as an invalid value.
 */
const EMPLOYMENT_TYPE: Record<string, string> = {
  "Full-Time": "FULL_TIME",
  "Part-Time": "PART_TIME",
  Contract: "CONTRACTOR",
};

/** Plain text of an HTML description, for the length and sameness checks. */
function descriptionText(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Below this many characters the "description" is a pointer line rather than a
 * job description ("Roles hiring for: iOS engineer."). Google requires a
 * complete description, so those pages are better off carrying no JobPosting
 * block at all than carrying one it will reject.
 */
const MIN_DESCRIPTION_CHARS = 120;

/**
 * Rows that are a company-level pointer rather than one job: the curated
 * directory entries ("Literally everything." — "Roles hiring for: Ruby on
 * Rails, Elixir, QA…") and the imports we hold no description for at all.
 *
 * Google wants one JobPosting per open role, with the description readable on
 * the same page. Neither is true here, so these pages keep everything they
 * show a visitor and simply stop claiming to be job postings.
 */
function isDirectoryPointer(descriptionText: string): boolean {
  return (
    /roles hiring for\s*:/i.test(descriptionText) ||
    /see the full description and apply directly/i.test(descriptionText)
  );
}

/**
 * The job title as Google wants it: the role, without the employer's name or a
 * location tacked on the end, and without characters it calls excessive.
 *
 * Deliberately conservative. A company name is only removed where it trails the
 * real title behind a separator, so "Data Scientist - Quora (Remote)" loses the
 * suffix while "Software Engineer - PlanetScale Postgres" and "Research
 * Scientist, Cohere Labs" — where the name is part of what the role is — keep
 * it. Only this string changes; the page still shows the title as supplied.
 */
export function schemaJobTitle(title: string, companyName: string): string {
  let out = title.replace(/[!*]/g, " ").replace(/\s+/g, " ").trim();
  const company = (companyName || "").trim();
  if (company.length > 2) {
    // "<title> - <Company>" / ", <Company>" / " at <Company>", optionally
    // followed by a remote/location parenthetical and nothing else.
    const esc = company.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const tail = new RegExp(
      `\\s*(?:[-\\u2013\\u2014,|]|\\bat\\b)\\s*${esc}\\s*(?:\\((?:[^()]*)\\))?\\s*$`,
      "i"
    );
    const stripped = out.replace(tail, "").trim();
    if (stripped.length >= 3) out = stripped;
  }
  return out.replace(/[\s,\-–—|]+$/, "").trim();
}

/**
 * schema.org JobPosting JSON-LD, to Google's JobPosting requirements.
 *
 * Returns `null` when the record cannot be described honestly — no place an
 * applicant may be in, or no real description. Google treats a TELECOMMUTE
 * posting with neither a usable `applicantLocationRequirements` nor a
 * `jobLocation` as an error, and a page with no markup at all is a better
 * outcome than a page with markup that is reported as broken.
 */
export function jobPostingJsonLd(job: Job): Record<string, unknown> | null {
  const areas = applicantAreas(job.location, job.scope);
  if (areas.length === 0) return null;

  const description = job.description_html || "";
  const text = descriptionText(description);
  const title = schemaJobTitle(job.title, job.company_name);
  if (text.length < MIN_DESCRIPTION_CHARS) return null;
  if (!title || text.toLowerCase() === title.toLowerCase()) return null;
  if (isDirectoryPointer(text)) return null;

  // Optional properties are omitted rather than guessed at. The logo in
  // particular is a display fallback for most rows — a favicon fetched through
  // Google's own proxy is not the employer's logo asset, so it does not belong
  // in markup that claims it is.
  const logo = job.company_logo || "";
  const ownLogo = /^https?:\/\//.test(logo) && !/google\.com\/s2\/favicons/.test(logo) ? logo : undefined;

  const base: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title,
    description,
    datePosted: job.posted_at,
    validThrough: job.expires_at,
    employmentType: EMPLOYMENT_TYPE[job.employment_type] ?? "OTHER",
    hiringOrganization: {
      "@type": "Organization",
      name: job.company_name,
      ...(ownLogo ? { logo: ownLogo } : {}),
      ...(job.company_domain ? { sameAs: `https://${job.company_domain}` } : {}),
    },
    // Every listing here is fully remote, so TELECOMMUTE is accurate and
    // `jobLocation` is not required — the areas below are where an applicant
    // may live, which is the only geography these roles actually have.
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: areas.length === 1 ? areas[0] : areas,
    // The apply link goes to the employer's own posting, so the application is
    // not completed on this page.
    directApply: false,
    url: abs(`/jobs/${job.slug}`),
    identifier: {
      "@type": "PropertyValue",
      name: job.company_name || SITE.name,
      value: job.id,
    },
  };

  const { min, max, currency } = job.salary;
  if (min != null && max != null && min > 0 && max > 0 && max >= min && /^[A-Z]{3}$/.test(currency || "")) {
    base.baseSalary = {
      "@type": "MonetaryAmount",
      currency,
      value: {
        "@type": "QuantitativeValue",
        minValue: min,
        maxValue: max,
        unitText: "YEAR",
      },
    };
  }

  return base;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
