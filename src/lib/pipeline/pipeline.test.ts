import { describe, it, expect } from "vitest";
import { runPipeline } from "./index";
import type { RawJob } from "../types";
import seed from "../seed/raw-jobs.json";

describe("pipeline end-to-end", () => {
  it("accepts all curated seed jobs and enriches them", () => {
    const report = runPipeline(seed as RawJob[]);
    expect(report.accepted).toBe(seed.length);
    expect(report.rejected).toBe(0);
    for (const job of report.jobs) {
      expect(job.location).toBe("Anywhere in the World");
      expect(job.slug).toMatch(/-[a-z0-9]+-\d+$/);
      expect(job.company_logo).toBeTruthy();
    }
    const gitlab = report.jobs.find((j) => j.company_name === "GitLab")!;
    expect(gitlab.category).toBe("Backend");
    expect(gitlab.salary).toEqual({ min: 119900, max: 193200, currency: "USD" });
    expect(gitlab.benefits.map((b) => b.slug)).toEqual(
      expect.arrayContaining(["equipment-budget", "learning-budget", "health-insurance", "retirement-plan"])
    );
  });

  it("dedupes identical company+title across sources", () => {
    const dup: RawJob = { ...(seed[0] as RawJob), external_id: "dup" };
    const report = runPipeline([seed[0] as RawJob, dup]);
    expect(report.deduped).toBe(1);
  });

  it("routes a US-only remote job to the regional board (not worldwide, not rejected)", () => {
    const regional: RawJob = {
      external_id: "regional",
      provider: "lever",
      company_name: "Nope Inc",
      title: "Engineer",
      description_html: "<p>US only. Must be authorized to work in the US.</p>",
      apply_url: "https://x",
      location_raw: "Remote (US)",
    };
    const report = runPipeline([regional, seed[0] as RawJob]);
    expect(report.accepted).toBe(1); // worldwide (the seed job)
    expect(report.regionalCount).toBe(1); // the US-only remote job
    expect(report.regional[0].scope).toBe("regional");
    expect(report.regional[0].location).toContain("US");
  });

  it("rejects a truly on-site job entirely", () => {
    const onsite: RawJob = {
      external_id: "onsite",
      provider: "lever",
      company_name: "Office Co",
      title: "Engineer",
      description_html: "<p>Hybrid role, 3 days in-office in Berlin.</p>",
      apply_url: "https://x",
      location_raw: "Berlin, Germany",
    };
    const report = runPipeline([onsite]);
    expect(report.accepted).toBe(0);
    expect(report.regionalCount).toBe(0);
    expect(report.rejected).toBe(1);
  });
});
