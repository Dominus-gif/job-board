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

/**
 * A listing description of roughly `n` words that reads like prose — sentences
 * with real endings. The completeness rule now checks that a stored
 * description finishes on a sentence rather than stopping mid-thought, so a
 * fixture of bare tokens is not a valid stand-in for one.
 */
const words = (n: number) => {
  const sentence = "We are hiring an engineer to own this part of the platform end to end. ";
  const per = sentence.trim().split(" ").length;
  return "<p>" + sentence.repeat(Math.max(1, Math.ceil(n / per))).trim() + "</p>";
};
const job = (over: Record<string, unknown> = {}) =>
  ({
    description_html: words(200),
    status: "published",
    is_active: true,
    apply_url: "https://boards.greenhouse.io/acme/jobs/123",
    is_featured: false,
    scope: "worldwide",
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

  it("holds back a description that stops mid-thought", () => {
    // The Elation Health page: long enough by word count, but cut off. Judging
    // on length alone would have indexed it.
    expect(jobIsIndexable(job({ description_html: "<p>" + words(200).slice(3, -4) + " Serve as…</p>" }))).toBe(false);
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

  it("does not let the apply-link heuristic de-index paid placement", () => {
    const careersRoot = { apply_url: "https://acme.com/careers" };
    expect(jobIsIndexable(job(careersRoot))).toBe(false);
    expect(jobIsIndexable(job({ ...careersRoot, is_featured: true }))).toBe(true);
  });

  it("still holds a featured listing to the description rule", () => {
    expect(jobIsIndexable(job({ is_featured: true, description_html: words(33) }))).toBe(false);
  });

  it("indexes on the fetched posting, not the stored fallback", () => {
    // has_full_description means the page renders the employer's whole posting,
    // so the short stored text is a fallback and a bad thing to judge on.
    expect(jobIsIndexable(job({ description_html: words(20), has_full_description: true }))).toBe(true);
  });

  it("never indexes an expired or inactive listing", () => {
    expect(jobIsIndexable(job({ status: "expired" }))).toBe(false);
    expect(jobIsIndexable(job({ scope: "regional" }))).toBe(false);
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
    expect(companyIsIndexable(9)).toBe(false);
    expect(companyIsIndexable(10)).toBe(true);
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
