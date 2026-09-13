import { describe, it, expect } from "vitest";
import { jobPostingJsonLd, schemaJobTitle } from "./jsonld";
import type { Job } from "./types";

/** A published record with everything Google requires, for tests to vary. */
const job = (over: Partial<Job> = {}): Job =>
  ({
    id: "greenhouse:acme:1",
    slug: "senior-backend-engineer-acme-1",
    title: "Senior Backend Engineer",
    company_name: "Acme",
    company_slug: "acme",
    company_logo: "https://www.google.com/s2/favicons?domain=acme.com&sz=256",
    company_domain: "acme.com",
    description_html:
      "<p>Acme is hiring a senior backend engineer to own our payments platform.</p>" +
      "<ul><li>Design and ship Go services.</li><li>Five years of experience.</li></ul>",
    apply_url: "https://boards.greenhouse.io/acme/jobs/1",
    posted_at: "2026-09-01T00:00:00.000Z",
    expires_at: "2026-10-31T00:00:00.000Z",
    location: "United States",
    scope: "regional",
    employment_type: "Full-Time",
    salary: { min: 120000, max: 180000, currency: "USD" },
    ...over,
  }) as Job;

describe("jobPostingJsonLd", () => {
  it("names a real country instead of the board's own location string", () => {
    const d = jobPostingJsonLd(job())!;
    expect(d.applicantLocationRequirements).toEqual({ "@type": "Country", name: "United States" });
    expect(d.jobLocationType).toBe("TELECOMMUTE");
  });

  it("uses Google's spelling of every employment type", () => {
    expect(jobPostingJsonLd(job({ employment_type: "Full-Time" }))!.employmentType).toBe("FULL_TIME");
    expect(jobPostingJsonLd(job({ employment_type: "Part-Time" }))!.employmentType).toBe("PART_TIME");
    // The one a plain uppercase gets wrong: Google has no CONTRACT.
    expect(jobPostingJsonLd(job({ employment_type: "Contract" }))!.employmentType).toBe("CONTRACTOR");
  });

  it("omits the whole block when no applicant location can be named", () => {
    expect(jobPostingJsonLd(job({ location: "Remote" }))).toBeNull();
    expect(jobPostingJsonLd(job({ location: "CET (+/- 3 hours)" }))).toBeNull();
  });

  it("omits the block for pointers rather than postings", () => {
    expect(jobPostingJsonLd(job({ description_html: "<p>Roles hiring for: Ruby, Go, QA.</p>" }))).toBeNull();
    expect(
      jobPostingJsonLd(
        job({
          description_html:
            "<p>Senior Backend Engineer at Acme. See the full description and apply directly on the company's job page.</p>",
        })
      )
    ).toBeNull();
  });

  it("does not pass off a favicon proxy as the employer's logo", () => {
    const proxied = jobPostingJsonLd(job())!.hiringOrganization as Record<string, unknown>;
    expect(proxied.logo).toBeUndefined();
    expect(proxied.sameAs).toBe("https://acme.com");

    const real = jobPostingJsonLd(job({ company_logo: "https://acme.com/logo.png" }))!
      .hiringOrganization as Record<string, unknown>;
    expect(real.logo).toBe("https://acme.com/logo.png");
  });

  it("only publishes a salary that is actually a range", () => {
    expect(jobPostingJsonLd(job())!.baseSalary).toBeTruthy();
    expect(jobPostingJsonLd(job({ salary: { min: 0, max: 180000, currency: "USD" } }))!.baseSalary).toBeUndefined();
    expect(jobPostingJsonLd(job({ salary: { min: 180000, max: 120000, currency: "USD" } }))!.baseSalary).toBeUndefined();
    expect(jobPostingJsonLd(job({ salary: { min: 1, max: 2, currency: "" } }))!.baseSalary).toBeUndefined();
  });
});

describe("schemaJobTitle", () => {
  it("drops an employer name tacked onto the end", () => {
    expect(schemaJobTitle("Data Scientist - Quora (Remote)", "Quora")).toBe("Data Scientist");
    expect(schemaJobTitle("Senior Engineer at Vanta", "Vanta")).toBe("Senior Engineer");
  });

  it("keeps a name that is part of what the role is", () => {
    expect(schemaJobTitle("Software Engineer - PlanetScale Postgres", "PlanetScale")).toBe(
      "Software Engineer - PlanetScale Postgres"
    );
    expect(schemaJobTitle("Research Scientist, Cohere Labs", "Cohere")).toBe("Research Scientist, Cohere Labs");
  });

  it("removes the characters Google calls excessive", () => {
    expect(schemaJobTitle("Growth Marketer!!", "Acme")).toBe("Growth Marketer");
  });
});
