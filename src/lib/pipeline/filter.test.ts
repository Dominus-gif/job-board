import { describe, it, expect } from "vitest";
import { classifyJob, filterJob, locationRequiresOffice, descriptionRequiresOffice, titleNamesRegion } from "./filter";
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

  // Phrasings from employers' full postings that the original statement
  // missed. Until the check read the full text, it saw only a 500-character
  // excerpt and none of these was ever tested at all.
  it("reads the ways employers actually state attendance", () => {
    for (const text of [
      "Fin has a hybrid working policy. We believe working in person helps us stay connected.",
      "This is a full time role with hybrid working from our London office.",
      "Ability to work onsite in our Guatemala City (Zone 10) office, Monday–Friday.",
      "This is an in-person role. Our team comes together in the office Monday through Thursday.",
      "We ask that you're in our (dog-friendly) Shoreditch office 3 days a week.",
      "Our expectation is that this role will be hybrid, requiring 3 days a week in our San Francisco office.",
      "Must be willing and able to work onsite five days per week.",
      "Individuals are expected to work from the office 3+ days a week.",
      "Competitive equity package. #LI-Onsite",
    ]) {
      expect(descriptionRequiresOffice(`<p>${text}</p>`, "London"), text).toBe(true);
    }
  });

  it("does not mistake an offer of remote work, or a conditional, for a requirement", () => {
    for (const text of [
      // A remote option beside the hybrid one.
      "Fully remote or hybrid position. No visa sponsorship provided.",
      // "Hybrid role" meaning a job of two halves.
      "This is a genuinely hybrid role: you'll build detection systems while also owning corporate security.",
      // Boilerplate about other postings.
      "If the posting is specified as onsite, you are required to work from an office.",
      // A preference, in a "you won't like it here if" list.
      "You might not enjoy it here if you prefer an in-person role over remote.",
      "We meet in person at our annual retreat, and you're welcome to work from our Berlin office.",
    ]) {
      expect(descriptionRequiresOffice(`<p>${text}</p>`, "London"), text).toBe(false);
    }
  });

  it("lets a location that offers remote work win over the description", () => {
    const local = "<p>Employees local to NYC are expected to work Tuesdays through Thursdays from our HQ.</p>";
    expect(descriptionRequiresOffice(local, "Remote, US")).toBe(false);
    expect(descriptionRequiresOffice(local, "New York, NY / Remote")).toBe(false);
    expect(descriptionRequiresOffice(local, "New York, NY")).toBe(true);
  });

  it("trusts an onsite or hybrid workplace tag only when nothing says remote", () => {
    expect(descriptionRequiresOffice("<p>#LI-Hybrid</p>", "Dublin, Ireland")).toBe(true);
    expect(descriptionRequiresOffice("<p>#LI-Onsite</p>", "Remote, USA")).toBe(false);
    expect(descriptionRequiresOffice("<p>#LI-Hybrid #LI-Remote</p>", "Prague")).toBe(false);
  });
});

describe("titles that name a place", () => {
  it("catches the forms employers actually use", () => {
    const cases: [string, string][] = [
      ["Senior Sales Engineer - UK", "UK"],
      ["Account Executive (EMEA)", "EMEA"],
      ["IoT Solutions Architecture Manager (Americas only)", "Americas"],
      ["Payroll Specialist Lead - France", "France"],
      ["Forward Deployed Engineer - Software Engineer - Netherlands", "Netherlands"],
      ["Full Stack Product Engineer - Remote/Europe", "Europe"],
      ["Manager, Payroll Operations - Eastern Europe", "Eastern Europe"],
      ["Payroll Data Administrator - Benelux (12 Month FTC)", "Benelux"],
      ["Developer Relations Engineer (London, UK)", "UK"],
      ["Deployment Strategist Lead - India", "India"],
      ["Lifecycle Specialist, Contract Management - LATAM", "Latin America"],
    ];
    for (const [title, region] of cases) expect(titleNamesRegion(title), title).toBe(region);
  });

  it("leaves genuinely global titles alone", () => {
    for (const title of [
      "Senior Backend Engineer",
      "Customer Support Specialist",
      "Head of Global Partnerships",
      "Staff Engineer, Platform",
      "Technical Writer (Remote)",
      "Account Executive, Enterprise",
      "Director of Engineering",
    ]) {
      expect(titleNamesRegion(title), title).toBeNull();
    }
  });

  it("does not fire on ordinary words that contain a short form", () => {
    // "us" inside a sentence, "UK" inside a word, "Indiana" containing "India".
    for (const title of ["Join us as a Product Manager", "Senior Engineer, Ukulele Tech", "Field Rep, Indiana"]) {
      expect(titleNamesRegion(title), title).toBeNull();
    }
  });
});

describe("locations that name a place", () => {
  // Employers put "work from anywhere" in the company copy of every posting, so
  // the filter's global phrase turned up on roles the employer had located in
  // one region. 91 of the 255 roles it accepted on 26 October 2026 were these.
  const companyCopy = "<p>We are a distributed company and our people work from anywhere in the world.</p><p>You will own customer onboarding.</p>";

  it("keeps a role the employer located in one region off the worldwide board", () => {
    for (const location_raw of ["Remote, AMER", "North America", "Remote, APAC", "Spain", "Remote, San Francisco, CA", "Remote - US; Remote - Canada"]) {
      const c = classifyJob(raw({ location_raw, description_html: companyCopy }));
      expect(c.scope, location_raw).toBe("regional");
      expect(c.region, location_raw).toBeTruthy();
    }
  });

  it("still accepts a location that says nowhere in particular", () => {
    for (const location_raw of ["", "Remote", "Anywhere in the World", "Home based - Worldwide", "Remote - Global", "Fully Remote"]) {
      expect(classifyJob(raw({ location_raw, description_html: companyCopy })).scope, location_raw || "(empty)").toBe("worldwide");
    }
  });
});
