import { describe, expect, it } from "vitest";
import { cleanApplyUrl } from "./store";

/**
 * The apply link is the one thing on a listing that has to work. This function
 * rewrites every one of them, so it is worth being exact about what it may and
 * may not remove.
 *
 * The risk is not that it leaves a tracking parameter on — that is cosmetic.
 * The risk is that it strips a parameter the apply page needs and sends a
 * reader to a broken form. Greenhouse's embedded application is the live
 * example: it identifies the job entirely by query string.
 */
describe("cleanApplyUrl", () => {
  it("removes aggregator tracking parameters", () => {
    expect(cleanApplyUrl("https://jobs.ashbyhq.com/clera/abc?utm_id=16864145&utm_source=Remote+Jobs")).toBe(
      "https://jobs.ashbyhq.com/clera/abc",
    );
    expect(cleanApplyUrl("https://apply.workable.com/qodeworld/j/E476F3C8EB/apply?utm_source=Remote+Jobs")).toBe(
      "https://apply.workable.com/qodeworld/j/E476F3C8EB/apply",
    );
  });

  it("keeps the parameters an apply page actually needs", () => {
    // Greenhouse's embed identifies the posting by `for` and `token`; dropping
    // either of them lands the reader on an empty form.
    const gh = "https://job-boards.greenhouse.io/embed/job_app?for=axonius&token=8009643003&utm_source=Remote+Jobs";
    expect(cleanApplyUrl(gh)).toBe("https://job-boards.greenhouse.io/embed/job_app?for=axonius&token=8009643003");
  });

  it("strips the whole query when it was nothing but tracking", () => {
    expect(cleanApplyUrl("https://example.com/job/9?utm_source=x&utm_medium=y")).toBe("https://example.com/job/9");
  });

  it("leaves a clean URL untouched, including its identity", () => {
    const clean = "https://jobs.lever.co/destinationknot/74a628cf-1372-4f80-ae1d-5396c9edcf86/apply";
    expect(cleanApplyUrl(clean)).toBe(clean);
  });

  it("preserves the fragment, which some ATS forms anchor on", () => {
    expect(cleanApplyUrl("https://x.jobs.personio.com/job/2751746?utm_id=17542770#apply")).toBe(
      "https://x.jobs.personio.com/job/2751746#apply",
    );
  });

  it("never throws, whatever it is handed", () => {
    for (const input of ["", "not a url", "mailto:jobs@example.com", "/relative/path", "javascript:alert(1)"]) {
      expect(() => cleanApplyUrl(input)).not.toThrow();
      // Anything it cannot parse comes back exactly as it arrived.
      expect(cleanApplyUrl(input)).toBe(input);
    }
  });

  it("does not touch the host, path or scheme", () => {
    const u = "https://boards.greenhouse.io/acme/jobs/123?utm_campaign=z";
    const out = new URL(cleanApplyUrl(u));
    expect(out.protocol).toBe("https:");
    expect(out.host).toBe("boards.greenhouse.io");
    expect(out.pathname).toBe("/acme/jobs/123");
  });
});
