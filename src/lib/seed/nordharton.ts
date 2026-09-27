/**
 * NordHarton — a featured partner company (spec: manual / paid placement).
 *
 * Its roles are not on an applicant-tracking system we can read, so
 * scripts/build-nordharton.ts reads https://nordharton.com/careers on every
 * build and writes src/lib/generated/nordharton.json. This module turns that
 * file into featured listings: each links to the role's own page on the
 * careers site, carries the date the careers page gives, and disappears when
 * the careers page stops listing it.
 *
 * Scope follows the role's stated location: "Remote · Global" goes on the
 * worldwide board, anything tied to time zones or regions goes on the regional
 * board, so the worldwide board's promise holds for featured roles too.
 */
import type { Category, Company, Job, RawJob } from "../types";
import { toPublishedJob } from "../pipeline";
import careers from "../generated/nordharton.json";

export const NORDHARTON_COMPANY: Company = {
  slug: "nordharton",
  name: "NordHarton",
  domain: "nordharton.com",
  logo: "https://logo.clearbit.com/nordharton.com",
  description:
    "Digital solutions company building custom web applications, business systems, mobile apps, cloud infrastructure and brand experiences.",
  about:
    "Nord Harton (NordHarton) builds custom web applications, business systems, mobile apps, cloud infrastructure and brand experiences for its clients. It describes itself as a small, senior, fully remote team, and it hires across engineering, platform, design, data, strategy and sales. Every role listed here comes from its own careers page, which is where you apply.",
  headquarters: "All-remote",
};

interface CareersSection {
  heading: string;
  paragraphs: string[];
  items: string[];
}

interface CareersRole {
  slug: string;
  url: string;
  title: string;
  team: string;
  postedAt: string;
  location: string;
  employment: string;
  level: string;
  salary: string;
  teamSize: string;
  lead: string;
  sections: CareersSection[];
}

/**
 * Listing ids that predate the careers-page refresh. Keeping them keeps those
 * roles' URLs (the slug is derived from the id) exactly as they were.
 */
const LEGACY_IDS: Record<string, string> = {
  "product-designer": "product-designer-enterprise-ux",
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function categoryOf(role: CareersRole): Category {
  const t = `${role.title} ${role.team}`.toLowerCase();
  if (/design/.test(t)) return "Design";
  if (/sales|account executive|revenue/.test(t)) return "Sales & Marketing";
  if (/business analyst|product manager|strategy/.test(t)) return "Product";
  if (/front[- ]?end|react/.test(t)) return "Frontend";
  if (/full[- ]?stack/.test(t)) return "Fullstack";
  if (/cloud|infrastructure|devops|platform|sre|reliability/.test(t)) return "DevOps";
  return "Backend";
}

function employmentOf(s: string): Job["employment_type"] {
  if (/part/i.test(s)) return "Part-Time";
  if (/contract|freelance/i.test(s)) return "Contract";
  return "Full-Time";
}

const isGlobal = (location: string) => /global|anywhere|worldwide/i.test(location);

function regionOf(location: string): string {
  const eu = /\b(eu|europe)/i.test(location);
  const am = /americas/i.test(location);
  if (eu && am) return "Europe & Americas";
  if (eu) return "Europe";
  if (am) return "Americas";
  return location.replace(/^remote\s*·\s*/i, "") || "Remote";
}

function descriptionOf(role: CareersRole): string {
  const where = isGlobal(role.location)
    ? "This is a fully remote role open worldwide, with no country, region or time zone requirement."
    : `This is a remote role for people working in ${regionOf(role.location).replace("&", "and")} time zones.`;
  const facts = [role.level && `Level: ${role.level}.`, role.teamSize && `Team: ${role.teamSize}.`].filter(Boolean).join(" ");
  const parts = [`<p>${esc(role.lead)}</p>`, `<p>${esc(where)}${facts ? ` ${esc(facts)}` : ""}</p>`];
  for (const s of role.sections) {
    parts.push(`<h3>${esc(s.heading)}</h3>`);
    for (const p of s.paragraphs) parts.push(`<p>${esc(p)}</p>`);
    if (s.items.length) parts.push(`<ul>${s.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`);
  }
  return parts.join("");
}

function toJob(role: CareersRole): Job {
  const scope: Job["scope"] = isGlobal(role.location) ? "worldwide" : "regional";
  const raw: RawJob = {
    external_id: `manual:nordharton:${LEGACY_IDS[role.slug] ?? role.slug}`,
    provider: "greenhouse", // placeholder for the pipeline; overridden to source "manual" below
    company_name: "NordHarton",
    company_domain: "nordharton.com",
    title: role.title,
    apply_url: role.url,
    location_raw: role.location,
    employment_type: employmentOf(role.employment),
    posted_at: role.postedAt,
    salary_raw: role.salary,
    description_html: descriptionOf(role),
  };
  return {
    ...toPublishedJob(raw, { scope, region: scope === "regional" ? regionOf(role.location) : undefined }),
    source: "manual",
    provider: undefined,
    board_token: undefined,
    ats_job_id: undefined,
    is_featured: true,
    // The careers page is the whole posting; there is no longer version to fetch.
    has_full_description: true,
    category: categoryOf(role),
  };
}

/** Featured NordHarton listings, as of the last careers-page refresh. */
export const NORDHARTON_JOBS: Job[] = (careers.roles as CareersRole[]).map(toJob);
