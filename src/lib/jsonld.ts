import type { Job } from "./types";
import { abs, SITE } from "./site";

/** schema.org JobPosting JSON-LD (spec section 6 — critical for SEO). */
export function jobPostingJsonLd(job: Job) {
  const base: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: job.description_html,
    datePosted: job.posted_at,
    validThrough: job.expires_at,
    employmentType: job.employment_type.toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company_name,
      logo: job.company_logo.startsWith("http") ? job.company_logo : undefined,
      sameAs: job.company_domain ? `https://${job.company_domain}` : undefined,
    },
    // Remote; worldwide roles accept applicants anywhere, regional ones are
    // restricted to a specific country/region.
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "AdministrativeArea",
      name: job.scope === "regional" ? job.location : "Anywhere in the World",
    },
    directApply: false,
    url: abs(`/jobs/${job.slug}`),
    identifier: {
      "@type": "PropertyValue",
      name: SITE.name,
      value: job.id,
    },
  };

  if (job.salary.min != null && job.salary.max != null) {
    base.baseSalary = {
      "@type": "MonetaryAmount",
      currency: job.salary.currency,
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salary.min,
        maxValue: job.salary.max,
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
