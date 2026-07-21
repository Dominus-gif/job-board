import { describe, it, expect } from "vitest";
import { filterJob } from "./filter";
import type { RawJob } from "../types";

function raw(partial: Partial<RawJob>): RawJob {
  return {
    external_id: "t",
    provider: "greenhouse",
    company_name: "Acme",
    title: "Engineer",
    description_html: "<p>Build things.</p>",
    apply_url: "https://x",
    location_raw: "",
    ...partial,
  };
}

describe("Stage B — Work From Anywhere filter", () => {
  it("accepts explicit worldwide location", () => {
    expect(filterJob(raw({ location_raw: "Remote, Worldwide" })).accepted).toBe(true);
    expect(filterJob(raw({ location_raw: "Anywhere in the World" })).accepted).toBe(true);
    expect(filterJob(raw({ location_raw: "Remote (Global)" })).accepted).toBe(true);
  });

  it("accepts worldwide signal found only in the description", () => {
    const r = raw({ location_raw: "Remote", description_html: "<p>You can work from anywhere in the world.</p>" });
    expect(filterJob(r).accepted).toBe(true);
  });

  it("rejects US-only roles", () => {
    expect(filterJob(raw({ location_raw: "Remote (US only)" })).accepted).toBe(false);
    expect(filterJob(raw({ location_raw: "Remote", description_html: "<p>US based candidates only.</p>" })).accepted).toBe(false);
  });

  it("rejects work-authorization requirements", () => {
    const r = raw({ location_raw: "Remote", description_html: "<p>Must be eligible to work in the United States.</p>" });
    expect(filterJob(r).accepted).toBe(false);
  });

  it("rejects timezone-overlap requirements even with a worldwide-ish location", () => {
    const r = raw({
      location_raw: "Remote",
      description_html: "<p>Fully remote, but you must overlap with EST hours.</p>",
    });
    expect(filterJob(r).accepted).toBe(false);
  });

  it("rejects EU-based restriction", () => {
    expect(filterJob(raw({ location_raw: "Remote (EU-based)" })).accepted).toBe(false);
  });

  it("rejects ambiguous bare 'Remote' (precision over recall)", () => {
    expect(filterJob(raw({ location_raw: "Remote" })).accepted).toBe(false);
  });

  it("rejects hybrid/onsite", () => {
    expect(filterJob(raw({ location_raw: "Hybrid - Berlin" })).accepted).toBe(false);
  });
});
