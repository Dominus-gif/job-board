import { describe, expect, it } from "vitest";
import { FAMILIES, baseTitle, familyOf, inFamily } from "./title-families";
import { searchTitles } from "@/components/tools/JobTitleFinder";

const fam = (key: string) => FAMILIES.find((f) => f.key === key)!;

/**
 * These rules decide every field size published in a guide and every number in
 * the remote field explorer. A rule that silently admits the wrong job moves a
 * published figure, so the edges that were found by reading the matched titles
 * by eye are pinned here.
 */
describe("job families", () => {
  it("keeps engineers who sell or support out of software engineering", () => {
    const swe = fam("swe");
    expect(inFamily(swe, "Senior Software Engineer, Billing")).toBe(true);
    expect(inFamily(swe, "Sales Engineer")).toBe(false);
    expect(inFamily(swe, "Solutions Engineer, EMEA")).toBe(false);
    expect(inFamily(swe, "Support Engineering Manager - Americas")).toBe(false);
    expect(inFamily(swe, "Data Engineering Manager")).toBe(false);
    expect(inFamily(swe, "Machine Learning Engineer")).toBe(false);
  });

  it("counts machine learning and AI engineering as data, not software", () => {
    expect(inFamily(fam("data"), "Machine Learning Engineer")).toBe(true);
    expect(inFamily(fam("data"), "Applied AI Engineer (LLM)")).toBe(true);
    expect(inFamily(fam("data"), "Data Entry Clerk")).toBe(false);
  });

  it("keeps engineers who build marketing systems out of marketing, but not developer marketing", () => {
    const m = fam("marketing");
    expect(inFamily(m, "Senior Fullstack Engineer, Marketing")).toBe(false);
    expect(inFamily(m, "Software Engineer, Pricing Lifecycle")).toBe(false);
    expect(inFamily(m, "Senior Marketing Data Scientist")).toBe(false);
    expect(inFamily(m, "Product Marketing Manager - Developer Marketing")).toBe(true);
    expect(inFamily(m, "Senior Demand Generation Manager")).toBe(true);
  });

  it("does not let product marketing count as product management", () => {
    expect(inFamily(fam("product"), "Head of Product Marketing")).toBe(false);
    expect(inFamily(fam("product"), "Senior Product Manager, Growth")).toBe(true);
  });

  it("assigns a title to the first family it fits, or none", () => {
    expect(familyOf("Account Executive, Enterprise")?.key).toBe("sales");
    expect(familyOf("Business Analyst")).toBeNull();
  });
});

describe("baseTitle", () => {
  it.each([
    ["Senior Software Engineer, Billing (Remote, US)", "software engineer"],
    ["Software Engineer II", "software engineer"],
    ["Director, Solution and Product Marketing", "solution and product marketing director"],
    ["Manager, Customer Success", "customer success manager"],
    ["Lead Designer", "designer"],
    ["Senior/Staff Product Designer", "product designer"],
    ["Design Lead", "design lead"],
    ["Engineering Manager, Agent Orchestration", "engineering manager"],
    ["💻 Software Engineer, Backend (Senior)", "software engineer"],
    ["Software Engineer - Data Infrastructure - Kafka", "software engineer"],
  ])("%s → %s", (raw, expected) => {
    expect(baseTitle(raw)).toBe(expected);
  });
});

describe("job title finder search", () => {
  const titles: [string, number, number][] = [
    ["software engineer", 250, 5],
    ["product designer", 33, 1],
    ["ux researcher", 3, 0],
    ["account executive", 141, 2],
  ];

  it("lists the most common titles when the query is empty", () => {
    expect(searchTitles(titles, "").mode).toBe("top");
  });

  it("matches every word when it can", () => {
    const r = searchTitles(titles, "product designer");
    expect(r.mode).toBe("all");
    expect(r.rows.map((x) => x[0])).toEqual(["product designer"]);
  });

  it("falls back to any word, and says so, when no title has them all", () => {
    const r = searchTitles(titles, "ux designer");
    expect(r.mode).toBe("any");
    expect(r.rows.map((x) => x[0]).sort()).toEqual(["product designer", "ux researcher"]);
  });

  it("ignores filler words like 'remote jobs'", () => {
    expect(searchTitles(titles, "remote account executive jobs").rows.map((x) => x[0])).toEqual(["account executive"]);
  });
});
