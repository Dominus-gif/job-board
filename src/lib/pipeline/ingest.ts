import type { AtsProvider, Company, EmploymentType, RawJob } from "../types";

/**
 * Stage A — Ingest & parse (spec section 3A).
 *
 * Each adapter hits a company's *public* ATS board API and lifts structured
 * fields into the common `RawJob` shape. Network calls use the global `fetch`
 * (Node 18+ / Next runtime). Adapters are resilient: a failing board logs and
 * yields [] rather than aborting the whole run.
 *
 * To add a new ATS: implement `fetchBoard` for it and register it in ADAPTERS.
 * See README "Adding an ATS source".
 */

export interface AtsAdapter {
  provider: AtsProvider;
  fetchBoard: (company: Company) => Promise<RawJob[]>;
}

const UA = { "User-Agent": "AnywhereJobs/0.1 (+https://anywherejobs.example)" };

async function getJson(url: string): Promise<any | null> {
  try {
    // Our own store-level TTL cache handles reuse; skip Next's fetch cache
    // (some boards exceed its 2MB per-entry limit and would warn).
    const res = await fetch(url, { headers: UA, cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function normalizeEmployment(raw?: string): EmploymentType | undefined {
  if (!raw) return undefined;
  const s = raw.toLowerCase();
  if (s.includes("part")) return "Part-Time";
  if (s.includes("contract") || s.includes("temporary") || s.includes("freelance")) return "Contract";
  if (s.includes("full")) return "Full-Time";
  return undefined;
}

/* ----------------------------- Greenhouse -------------------------------- */
// boards-api.greenhouse.io/v1/boards/{token}/jobs?content=true
const greenhouse: AtsAdapter = {
  provider: "greenhouse",
  async fetchBoard(company) {
    const token = company.board_token || company.slug;
    const data = await getJson(`https://boards-api.greenhouse.io/v1/boards/${token}/jobs?content=true`);
    if (!data?.jobs) return [];
    return data.jobs.map((j: any): RawJob => ({
      external_id: `greenhouse:${token}:${j.id}`,
      provider: "greenhouse",
      company_name: company.name,
      company_domain: company.domain,
      title: j.title,
      description_html: decodeHtml(j.content || ""),
      apply_url: j.absolute_url,
      location_raw: j.location?.name || "",
      posted_at: j.updated_at || j.created_at,
      employment_type: normalizeEmployment(
        (j.metadata || []).find((m: any) => /employment/i.test(m.name))?.value
      ),
    }));
  },
};

/* -------------------------------- Lever ---------------------------------- */
// api.lever.co/v0/postings/{token}?mode=json
const lever: AtsAdapter = {
  provider: "lever",
  async fetchBoard(company) {
    const token = company.board_token || company.slug;
    const data = await getJson(`https://api.lever.co/v0/postings/${token}?mode=json`);
    if (!Array.isArray(data)) return [];
    return data.map((j: any): RawJob => ({
      external_id: `lever:${token}:${j.id}`,
      provider: "lever",
      company_name: company.name,
      company_domain: company.domain,
      title: j.text,
      description_html: j.descriptionHtml || j.description || "",
      apply_url: j.hostedUrl || j.applyUrl,
      location_raw: j.categories?.location || "",
      posted_at: j.createdAt ? new Date(j.createdAt).toISOString() : undefined,
      employment_type: normalizeEmployment(j.categories?.commitment),
    }));
  },
};

/* -------------------------------- Ashby ---------------------------------- */
// api.ashbyhq.com/posting-api/job-board/{token}?includeCompensation=true
const ashby: AtsAdapter = {
  provider: "ashby",
  async fetchBoard(company) {
    const token = company.board_token || company.slug;
    const data = await getJson(
      `https://api.ashbyhq.com/posting-api/job-board/${token}?includeCompensation=true`
    );
    if (!data?.jobs) return [];
    return data.jobs.map((j: any): RawJob => ({
      external_id: `ashby:${token}:${j.id}`,
      provider: "ashby",
      company_name: company.name,
      company_domain: company.domain,
      title: j.title,
      description_html: j.descriptionHtml || "",
      apply_url: j.applyUrl || j.jobUrl,
      location_raw: j.location || (j.isRemote ? "Remote" : ""),
      posted_at: j.publishedAt,
      employment_type: normalizeEmployment(j.employmentType),
      salary_raw: j.compensation?.compensationTierSummary || undefined,
    }));
  },
};

/* ------------------------------- Workable -------------------------------- */
// {token}.workable.com/spi/v3/jobs  (public "spi" endpoint)
const workable: AtsAdapter = {
  provider: "workable",
  async fetchBoard(company) {
    const token = company.board_token || company.slug;
    const data = await getJson(`https://${token}.workable.com/spi/v3/jobs`);
    if (!data?.jobs) return [];
    return data.jobs.map((j: any): RawJob => ({
      external_id: `workable:${token}:${j.shortcode || j.id}`,
      provider: "workable",
      company_name: company.name,
      company_domain: company.domain,
      title: j.title,
      description_html: j.description || "",
      apply_url: j.application_url || j.url,
      location_raw: j.location?.location_str || (j.telecommuting ? "Remote" : ""),
      posted_at: j.published_on,
      employment_type: normalizeEmployment(j.employment_type),
    }));
  },
};

/* ---------------------------- SmartRecruiters ---------------------------- */
// api.smartrecruiters.com/v1/companies/{token}/postings  (public postings API)
const smartrecruiters: AtsAdapter = {
  provider: "smartrecruiters",
  async fetchBoard(company) {
    const token = company.board_token || company.slug;
    const data = await getJson(`https://api.smartrecruiters.com/v1/companies/${token}/postings?limit=100`);
    if (!data?.content) return [];
    return data.content.map((j: any): RawJob => {
      const loc = j.location || {};
      const locStr = loc.remote ? "Remote" : [loc.city, loc.region, loc.country].filter(Boolean).join(", ");
      return {
        external_id: `smartrecruiters:${token}:${j.id}`,
        provider: "smartrecruiters",
        company_name: company.name,
        company_domain: company.domain,
        title: j.name,
        description_html:
          [j.jobAd?.sections?.jobDescription?.text, j.jobAd?.sections?.qualifications?.text, j.jobAd?.sections?.additionalInformation?.text]
            .filter(Boolean)
            .join("") || "",
        apply_url: `https://jobs.smartrecruiters.com/${token}/${j.id}`,
        location_raw: locStr,
        posted_at: j.releasedDate,
        employment_type: normalizeEmployment(j.typeOfEmployment?.label),
      };
    });
  },
};

// Per-company board adapters. Aggregator feeds (remotive/remoteok/…) are not
// per-company and live in feeds.ts, so this map is partial over AtsProvider.
export const ADAPTERS: Partial<Record<AtsProvider, AtsAdapter>> = {
  greenhouse,
  lever,
  ashby,
  workable,
  smartrecruiters,
};

/** Poll every company on the allow-list and return all raw jobs. */
export async function ingestAll(companies: Company[]): Promise<RawJob[]> {
  const batches = await Promise.all(
    companies.map(async (company) => {
      const adapter = company.provider ? ADAPTERS[company.provider] : undefined;
      if (!adapter) return [];
      const jobs = await adapter.fetchBoard(company);
      return jobs;
    })
  );
  return batches.flat();
}

function decodeHtml(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
