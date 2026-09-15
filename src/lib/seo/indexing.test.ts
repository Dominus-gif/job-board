import { describe, it, expect } from "vitest";
import {
  applyLinkIsSpecific,
  companyIsIndexable,
  descriptionWords,
  isDirectoryPointer,
  jobIsIndexable,
  landingIsIndexable,
  robotsFor,
} from "./indexing";

/** A listing with enough of its own description to be worth indexing. */
const words = (n: number) => "<p>" + Array.from({ length: n }, (_, i) => `word${i}`).join(" ") + "</p>";
const job = (over: Record<string, unknown> = {}) =>
  ({
    description_html: words(120),
    status: "published",
    is_active: true,
    apply_url: "https://boards.greenhouse.io/acme/jobs/123",
    ...over,
  }) as Parameters<typeof jobIsIndexable>[0];

describe("descriptionWords", () => {
  it("counts the text, not the markup", () => {
    expect(descriptionWords("<p>one <strong>two</strong> three</p>")).toBe(3);
    expect(descriptionWords("")).toBe(0);
    expect(descriptionWords(null)).toBe(0);
  });
});

describe("jobIsIndexable", () => {
  it("indexes a listing that carries a real description", () => {
    expect(jobIsIndexable(job())).toBe(true);
  });

  it("holds back a listing that is mostly template", () => {
    // The board's median listing was 33 words — this is the case the whole
    // policy exists for.
    expect(jobIsIndexable(job({ description_html: words(33) }))).toBe(false);
  });

  it("holds back the company directory pointers", () => {
    expect(jobIsIndexable(job({ description_html: "<p>Roles hiring for: Ruby, Go, QA.</p>" + words(120) }))).toBe(false);
    expect(
      jobIsIndexable(job({ description_html: "<p>See the full description and apply directly on the company's job page.</p>" }))
    ).toBe(false);
  });

  it("holds back a listing whose apply link cannot reach the posting", () => {
    expect(jobIsIndexable(job({ apply_url: "https://acme.com/careers" }))).toBe(false);
    expect(jobIsIndexable(job({ apply_url: "https://acme.com/" }))).toBe(false);
  });

  it("never indexes an expired or inactive listing", () => {
    expect(jobIsIndexable(job({ status: "expired" }))).toBe(false);
    expect(jobIsIndexable(job({ is_active: false }))).toBe(false);
  });
});

describe("applyLinkIsSpecific", () => {
  it("accepts a link that identifies one posting", () => {
    expect(applyLinkIsSpecific("https://boards.greenhouse.io/acme/jobs/123")).toBe(true);
    expect(applyLinkIsSpecific("https://acme.com/careers?gh_jid=99")).toBe(true);
  });

  it("rejects a careers index and anything unparseable", () => {
    expect(applyLinkIsSpecific("https://acme.com/careers")).toBe(false);
    expect(applyLinkIsSpecific("not a url")).toBe(false);
    expect(applyLinkIsSpecific(undefined)).toBe(false);
  });
});

describe("thresholds", () => {
  it("a company page needs more than a list of one", () => {
    expect(companyIsIndexable(1)).toBe(false);
    expect(companyIsIndexable(2)).toBe(false);
    expect(companyIsIndexable(3)).toBe(true);
  });

  it("a filtered view needs results to be a page about", () => {
    expect(landingIsIndexable(1)).toBe(false);
    expect(landingIsIndexable(7)).toBe(false);
    expect(landingIsIndexable(8)).toBe(true);
  });
});

describe("robotsFor", () => {
  it("keeps following links on pages it does not index", () => {
    // The page is still part of the site; its links are still worth crawling.
    expect(robotsFor(false)).toEqual({ index: false, follow: true });
    expect(robotsFor(true)).toEqual({ index: true, follow: true });
  });
});

describe("isDirectoryPointer", () => {
  it("only fires on the two markers the importer writes", () => {
    expect(isDirectoryPointer("<p>Roles hiring for: Go</p>")).toBe(true);
    expect(isDirectoryPointer("<p>A normal job description about roles.</p>")).toBe(false);
  });
});
