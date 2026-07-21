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

  it("rejects a disqualified job mixed into the batch", () => {
    const bad: RawJob = {
      external_id: "bad",
      provider: "lever",
      company_name: "Nope Inc",
      title: "Engineer",
      description_html: "<p>US only. Must be authorized to work in the US.</p>",
      apply_url: "https://x",
      location_raw: "Remote (US)",
    };
    const report = runPipeline([bad, seed[0] as RawJob]);
    expect(report.accepted).toBe(1);
    expect(report.rejected).toBe(1);
  });
});
