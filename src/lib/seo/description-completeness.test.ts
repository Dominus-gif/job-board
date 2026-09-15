import { describe, it, expect } from "vitest";
import { describeCompleteness, isComplete, COMPLETE_MIN_CHARS } from "./description-completeness";

const long = (n = COMPLETE_MIN_CHARS + 200) =>
  "We are hiring a senior engineer to own our payments platform. ".repeat(Math.ceil(n / 60)).slice(0, n).trim() + ".";

describe("describeCompleteness", () => {
  it("passes a long description that ends on a sentence", () => {
    const v = describeCompleteness(`<p>${long()}</p>`);
    expect(v.complete).toBe(true);
    expect(v.reason).toBe("ok");
  });

  it("fails the excerpt that started all this", () => {
    // The Elation Health page: 601 characters ending mid-sentence on an ellipsis.
    const v = describeCompleteness("<p>Since inception, Elation has been focused on building… </p>");
    expect(v.complete).toBe(false);
    expect(v.reason).toBe("truncated");
  });

  it("fails text that just stops, with no ellipsis to give it away", () => {
    const v = describeCompleteness(`<p>${long()} and then it simply stops mid</p>`);
    expect(v.complete).toBe(false);
    expect(v.reason).toBe("unfinished");
  });

  it("fails a short description even when it ends cleanly", () => {
    const v = describeCompleteness("<p>A short but complete-looking sentence.</p>");
    expect(v.complete).toBe(false);
    expect(v.reason).toBe("too-short");
  });

  it("fails an empty one", () => {
    expect(describeCompleteness("").reason).toBe("empty");
    expect(describeCompleteness(null).reason).toBe("empty");
  });

  it("passes anything non-empty when the full posting is fetched at render", () => {
    // The stored text is only a fallback for these; the page shows the whole
    // posting, so judging the fallback would drop good pages.
    expect(isComplete("<p>Short stored excerpt…</p>", true)).toBe(true);
    expect(isComplete("", true)).toBe(false);
  });

  it("measures text, not markup", () => {
    const padded = `<div class="${"x".repeat(2000)}"><p>Too short.</p></div>`;
    expect(describeCompleteness(padded).reason).toBe("too-short");
  });
});
