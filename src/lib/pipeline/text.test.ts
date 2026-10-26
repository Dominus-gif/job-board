import { describe, expect, it } from "vitest";
import { sanitizeDescription } from "./text";

const levels = (html: string) => [...html.matchAll(/<h([1-6])>/g)].map((m) => Number(m[1]));

describe("sanitizeDescription headings", () => {
  // The description renders under the page's h1 (the job title) and its
  // "About this role" h2. Employer h1s used to give a job page up to four h1s.
  it("moves the employer's top heading level to h3 and keeps their order", () => {
    const html = sanitizeDescription("<h1>About us</h1><p>We build things.</p><h2>The role</h2><p>You will.</p><h1>Benefits</h1>");
    expect(levels(html)).toEqual([3, 4, 3]);
  });

  it("does not skip a level when the employer starts below h1", () => {
    expect(levels(sanitizeDescription("<h2>Role</h2><p>x</p><h3>Detail</h3><p>y</p>"))).toEqual([3, 4]);
    expect(levels(sanitizeDescription("<h4>Role</h4><p>x</p>"))).toEqual([3]);
  });

  // Goodstack's posts open on an h2 and reach h1 further down. Shifting by the
  // top level alone started them at h4, straight after the page's h2.
  it("starts at h3 even when the post opens below its own top level", () => {
    expect(levels(sanitizeDescription("<h2>Join us</h2><p>x</p><h1>About us</h1><p>y</p>"))).toEqual([3, 3]);
  });

  it("never skips a level, even where the employer does, and stops at h6", () => {
    expect(levels(sanitizeDescription("<h1>a</h1><h6>b</h6>"))).toEqual([3, 4]);
    expect(levels(sanitizeDescription("<h1>a</h1><h2>b</h2><h3>c</h3><h4>d</h4><h5>e</h5>"))).toEqual([3, 4, 5, 6, 6]);
  });

  it("leaves a description without headings alone", () => {
    expect(sanitizeDescription("<p>Plain text.</p>")).toBe("<p>Plain text.</p>");
  });
});
