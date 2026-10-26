import { describe, expect, it } from "vitest";
import { applyEnrichment } from "./apply-enrichment";
import { feedPosting, isOpen, MIN_FEED_CHARS } from "./snapshot-rules";

const body = (words: number) => `<p>${Array.from({ length: words }, (_, i) => `word${i}`).join(" ")}.</p>`;

describe("feedPosting", () => {
  const job = { provider: "greenhouse", apply_url: "https://job-boards.greenhouse.io/acme/jobs/123", description_html: body(120) };

  it("takes the feed's own text when the board returned the whole posting", () => {
    expect(feedPosting(job)).toBe(job.description_html);
    expect(feedPosting({ ...job, provider: "ashby", apply_url: "https://jobs.ashbyhq.com/acme/abc-def" })).not.toBeNull();
    expect(feedPosting({ ...job, provider: "lever", apply_url: "https://jobs.lever.co/acme/abc-def" })).not.toBeNull();
  });

  it("refuses what the job page could not render in full", () => {
    // SmartRecruiters' board endpoint returns no description at all.
    expect(feedPosting({ ...job, provider: "smartrecruiters", apply_url: "https://jobs.smartrecruiters.com/Acme/1", description_html: "" })).toBeNull();
    // A custom careers host: the page cannot fetch the posting to render it.
    expect(feedPosting({ ...job, apply_url: "https://careers.acme.com/jobs/123" })).toBeNull();
    // Aggregator feeds are excerpts, never the whole posting.
    expect(feedPosting({ ...job, provider: "remotive", apply_url: "https://remotive.com/remote-jobs/x" })).toBeNull();
    // Too short to be a posting rather than an error page.
    expect(feedPosting({ ...job, description_html: `<p>${"x".repeat(MIN_FEED_CHARS - 1)}</p>` })).toBeNull();
  });
});

describe("isOpen", () => {
  it("follows the 60-day expiry", () => {
    const now = Date.parse("2026-10-26T00:00:00Z");
    expect(isOpen({ expires_at: "2026-10-27T00:00:00Z" }, now)).toBe(true);
    expect(isOpen({ expires_at: "2026-10-04T00:00:00Z" }, now)).toBe(false);
  });
});

describe("applyEnrichment with the feed's own posting", () => {
  // Apply URLs no capture file holds, so only the feed can describe them.
  const fresh = () => ({
    apply_url: "https://job-boards.greenhouse.io/acme-test-only/jobs/1",
    company_name: "Acme Test Only",
    description_html: body(400),
    provider: "greenhouse",
  });

  it("describes a role nothing captured, and says it did", () => {
    const job: ReturnType<typeof fresh> & { has_full_description?: boolean } = fresh();
    const r = applyEnrichment([job], feedPosting);
    expect(r).toMatchObject({ enriched: 1, fromFeed: 1 });
    expect(job.has_full_description).toBe(true);
    expect(job.description_html.length).toBeLessThanOrEqual(520);
  });

  it("leaves it alone without the feed, which is how the curated build calls it", () => {
    const job: ReturnType<typeof fresh> & { has_full_description?: boolean } = fresh();
    const before = job.description_html;
    expect(applyEnrichment([job])).toMatchObject({ enriched: 0, fromFeed: 0 });
    expect(job.description_html).toBe(before);
    expect(job.has_full_description).toBeUndefined();
  });
});
