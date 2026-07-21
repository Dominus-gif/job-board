/**
 * Core data model (spec section 2).
 *
 * A `Job` is the canonical, published record after ingestion + filtering +
 * enrichment. A `RawJob` is what an ATS adapter emits before the pipeline runs.
 */

export type Category =
  | "Backend"
  | "Frontend"
  | "Fullstack"
  | "Design"
  | "DevOps"
  | "Product"
  | "Customer Support"
  | "Sales & Marketing"
  | "Management & Finance";

export type EmploymentType = "Full-Time" | "Part-Time" | "Contract";

export type AtsProvider =
  | "ashby"
  | "greenhouse"
  | "lever"
  | "workable"
  | "smartrecruiters"
  // Remote-job aggregator feeds (not per-company boards).
  | "remotive"
  | "remoteok"
  | "jobicy"
  | "arbeitnow";

export type JobSource = "ats" | "manual";

export type JobStatus = "published" | "pending" | "rejected" | "expired";

/** A benefit badge derived from the description (spec section 3C). */
export interface Benefit {
  slug: string; // e.g. "equipment-budget"
  label: string; // e.g. "Equipment Budget"
  emoji: string; // e.g. "💻"
}

/** Salary normalized from free-text (spec section 3C). */
export interface Salary {
  min: number | null;
  max: number | null;
  currency: string; // ISO 4217, e.g. "USD"
}

/** What an ATS adapter produces. Only fields the ATS can supply. */
export interface RawJob {
  external_id: string; // stable id within the source ATS
  provider: AtsProvider;
  company_name: string;
  company_domain?: string; // helps the logo service
  company_logo?: string; // supplied directly by aggregator feeds
  title: string;
  description_html: string;
  apply_url: string;
  location_raw: string; // the ATS location string, tested by the filter
  employment_type?: EmploymentType;
  posted_at?: string; // ISO date
  salary_raw?: string; // some ATSes expose structured comp; usually null
}

/** The published, enriched record. */
export interface Job {
  id: string;
  slug: string;
  title: string;
  company_name: string;
  company_slug: string;
  company_logo: string;
  company_domain?: string;
  description_html: string;
  apply_url: string;
  posted_at: string; // ISO
  expires_at: string; // ISO ("Apply before")
  location: "Anywhere in the World";
  employment_type: EmploymentType;
  salary: Salary;
  category: Category;
  skills: string[];
  benefits: Benefit[];
  is_featured: boolean;
  source: JobSource;
  provider?: AtsProvider;
  board_token?: string; // ATS board id, used to re-verify liveness
  ats_job_id?: string; // the posting's id within the ATS, for liveness checks
  status: JobStatus;
  is_active: boolean; // false once the original ATS posting is removed
  verified: boolean; // passed the worldwide filter + has the required details
  interest: number; // how many candidates have shown interest
  in_demand: boolean; // interest crossed the "trending" threshold
}

export interface Company {
  slug: string;
  name: string;
  domain?: string;
  logo: string;
  provider?: AtsProvider;
  board_token?: string; // identifier used against the ATS board API
  description?: string; // short "about" blurb (one line)
  about?: string; // optional longer hand-written profile paragraph
  rating?: number; // average review score, 0–5
  review_count?: number; // number of reviews behind the rating
  founded?: number; // year founded
  employees?: string; // headcount range, e.g. "1,000–5,000"
  headquarters?: string; // HQ / base, e.g. "All-remote" or "London, UK"
  reviews?: CompanyReview[]; // per-source ratings (Glassdoor, etc.)
}

export interface CompanyReview {
  source: string; // e.g. "Glassdoor", "Comparably"
  rating: number; // 0–5
  count: number; // number of reviews
  url?: string;
}

export interface Subscriber {
  email: string;
  created_at: string;
}

export interface JobSubmission {
  id: string;
  title: string;
  company_name: string;
  apply_url: string;
  description_html: string;
  contact_email: string;
  is_featured: boolean;
  created_at: string;
  status: "pending" | "approved" | "rejected";
}

/** Outcome of running the filter against one job (spec section 3B). */
export interface FilterResult {
  accepted: boolean;
  reason: string; // human-readable explanation, useful for the admin queue
  matched?: string; // the phrase that triggered the decision
}
