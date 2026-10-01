import { describe, it, expect } from "vitest";
import { filterJob, locationRequiresOffice, descriptionRequiresOffice } from "./filter";
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

describe("office-based listings", () => {
  it("drops a location that names an office or a hybrid arrangement", () => {
    for (const loc of ["Hybrid", "Hybrid - London", "SF Office", "New York Office", "Hybrid in Bangalore, India", "On Site, Palo Alto, California", "Redwood City, CA (Hybrid)"]) {
      expect(locationRequiresOffice(loc)).toBe(true);
    }
  });

  it("keeps a location that offers a remote option beside the office one", () => {
    for (const loc of ["Montreal, QC (Remote/Hybrid)", "New York City, NY (Hybrid); United States (Remote)", "Remote/Hybrid", "Japan (Remote / Hybrid - Tokyo preferred)"]) {
      expect(locationRequiresOffice(loc)).toBe(false);
    }
  });

  it("keeps ordinary remote locations", () => {
    for (const loc of ["Anywhere in the World", "Remote - United States", "Europe", "London", ""]) {
      expect(locationRequiresOffice(loc)).toBe(false);
    }
  });

  it("reads an attendance requirement stated in the description", () => {
    expect(descriptionRequiresOffice("<p>This is a hybrid role based in our Seattle hub.</p>")).toBe(true);
    expect(descriptionRequiresOffice("<p>We expect 3 days a week in the office.</p>")).toBe(true);
    expect(descriptionRequiresOffice("<p>Candidates must be within commuting distance.</p>")).toBe(true);
  });

  it("ignores the word used about something other than attendance", () => {
    expect(descriptionRequiresOffice("<p>You will run our hybrid cloud estate across AWS and on-prem.</p>")).toBe(false);
    expect(descriptionRequiresOffice("<p>We take a hybrid approach to testing.</p>")).toBe(false);
    expect(descriptionRequiresOffice("<p>Fully remote, with an optional office in Berlin.</p>")).toBe(false);
  });
});
