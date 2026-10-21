import { describe, expect, it } from "vitest";
import { freelanceRate } from "@/components/tools/FreelanceRateCalculator";
import { TOOLS, LEGACY_TOOL_SLUGS } from "./tools";
import { TOOL_GUIDES } from "./tool-guides";
import { getAllPosts } from "./posts";

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
  it("every tool served by the shared route has a guide", () => {
    for (const t of TOOLS) {
      if (LEGACY_TOOL_SLUGS.has(t.slug)) continue;
      expect(TOOL_GUIDES[t.slug], `no guide for ${t.slug}`).toBeDefined();
    }
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
});
