import { describe, expect, it } from "vitest";
import { freelanceRate } from "@/components/tools/FreelanceRateCalculator";
import { workingOverlap } from "@/components/tools/TimezoneOverlap";
import { TOOLS } from "./tools";
import { TOOL_GUIDES } from "./tool-guides";
import { getAllPosts } from "./posts";
import { offsetMinutes } from "./toolkit/timezones";

describe("freelance rate calculator", () => {
  const defaults = {
    target: 90000, employerPct: 10, health: 6000, pensionPct: 5, expenses: 5000,
    vacation: 25, holidays: 10, sick: 5, utilisation: 70, hoursPerDay: 8,
  };

  // The guide quotes these figures as a worked example. If the arithmetic
  // changes, this fails rather than leaving the article wrong.
  it("matches the worked example in its guide", () => {
    const r = freelanceRate(defaults)!;
    expect(r.total).toBe(114500);
    expect(r.workingDays).toBe(220);
    expect(r.billableDays).toBe(154);
    expect(Math.round(r.dayRate)).toBe(744);
    expect(Math.round(r.hourRate)).toBe(93);
    expect(Math.round(r.naiveDay)).toBe(346);
    expect(r.multiple.toFixed(1)).toBe("2.1");
    expect(Math.round(freelanceRate({ ...defaults, utilisation: 85 })!.dayRate)).toBe(612);
    expect(Math.round(freelanceRate({ ...defaults, utilisation: 55 })!.dayRate)).toBe(946);
    const guide = TOOL_GUIDES["freelance-rate-calculator"].html;
    for (const figure of ["$114,500", "154 billable days", "$744", "$93 an hour", "$346", "2.1 times", "$612", "$946"]) {
      expect(guide, `guide no longer quotes ${figure}`).toContain(figure);
    }
  });

  it("refuses inputs that leave nothing to bill rather than dividing by zero", () => {
    expect(freelanceRate({ ...defaults, target: 0 })).toBeNull();
    expect(freelanceRate({ ...defaults, vacation: 300 })).toBeNull();
    expect(freelanceRate({ ...defaults, utilisation: 0 })).toBeNull();
  });
});

describe("tool pages", () => {
  // /tools/[slug] calls notFound() when a tool has no guide, so a tool added
  // to the registry without one would ship as a silent 404.
  it("every tool has a guide", () => {
    for (const t of TOOLS) expect(TOOL_GUIDES[t.slug], `no guide for ${t.slug}`).toBeDefined();
  });

  it("every internal link in a tool guide points at a page that exists", () => {
    const posts = new Set(getAllPosts().map((p) => p.slug));
    const tools = new Set(TOOLS.map((t) => t.slug));
    for (const [slug, g] of Object.entries(TOOL_GUIDES)) {
      const hrefs = [...g.html.matchAll(/href="(\/[^"#?]+)"/g)].map((m) => m[1]).concat(g.related.map((r) => r.href));
      for (const href of hrefs) {
        if (href.startsWith("/posts/")) expect(posts.has(href.slice(7)), `${slug} links to missing ${href}`).toBe(true);
        if (href.startsWith("/tools/")) expect(tools.has(href.slice(7)), `${slug} links to missing ${href}`).toBe(true);
      }
    }
  });

  // The same guarantee for the articles. Links to company and landing pages
  // are not checked here: those exist only while the board holds roles for
  // them, which a static test cannot know.
  it("every link from an article to another article or a tool resolves", () => {
    const posts = new Set(getAllPosts().map((p) => p.slug));
    const tools = new Set(TOOLS.map((t) => t.slug));
    for (const p of getAllPosts()) {
      for (const [, href] of p.html.matchAll(/href="(\/(?:posts|tools)\/[^"#?]+)"/g)) {
        const known = href.startsWith("/posts/") ? posts.has(href.slice(7)) : tools.has(href.slice(7));
        expect(known, `${p.slug} links to missing ${href}`).toBe(true);
      }
    }
  });
});

describe("timezone overlap finder", () => {
  it("finds the shared 9-to-5 hours and where they fall on your clock", () => {
    // New York (UTC-5) and Berlin (UTC+1): 9:00 to 11:00 in New York.
    expect(workingOverlap(-300, 60)).toEqual({ minutes: 120, from: 540, to: 660 });
    expect(workingOverlap(60, 60).minutes).toBe(480);
  });

  // The old finder intersected the two days without wrapping and reported no
  // overlap at all for Los Angeles and Sydney.
  it("counts overlap that crosses midnight", () => {
    const r = workingOverlap(-480, 600); // Los Angeles and Sydney, standard time
    expect(r.minutes).toBe(120);
    expect([r.from, r.to]).toEqual([900, 1020]); // 15:00 to 17:00 in Los Angeles
  });

  it("follows the clocks for the date, including the weeks the US and Europe disagree", () => {
    const week = new Date("2026-10-28T12:00:00Z"); // Europe has moved back, the US has not
    const ny = offsetMinutes("America/New_York", week);
    const london = offsetMinutes("Europe/London", week);
    expect(london - ny).toBe(240);
    expect(workingOverlap(ny, london).minutes).toBe(240);
    const winter = new Date("2026-12-01T12:00:00Z");
    expect(workingOverlap(offsetMinutes("America/New_York", winter), offsetMinutes("Europe/London", winter)).minutes).toBe(180);
  });
});
