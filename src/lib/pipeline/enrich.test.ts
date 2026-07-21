import { describe, it, expect } from "vitest";
import { classifyCategory, extractBenefits, extractSkills, formatSalary, parseSalary } from "./enrich";

describe("Stage C — enrichment", () => {
  it("extracts skills from title + description", () => {
    const skills = extractSkills("Senior Backend Engineer", "we use ruby on rails, postgresql and redis on aws with kubernetes");
    expect(skills).toEqual(expect.arrayContaining(["ruby", "postgres", "redis", "aws", "kubernetes"]));
  });

  it("classifies category, weighting the title", () => {
    expect(classifyCategory("Frontend Engineer", "build react interfaces")).toBe("Frontend");
    expect(classifyCategory("DevOps Engineer", "kubernetes terraform aws")).toBe("DevOps");
    expect(classifyCategory("Product Designer", "figma ux")).toBe("Design");
    expect(classifyCategory("Customer Support Specialist", "help customers")).toBe("Customer Support");
  });

  it("maps benefit phrases to badges", () => {
    const b = extractBenefits("home office budget, learning budget, 401k, health insurance, coworking space");
    const slugs = b.map((x) => x.slug);
    expect(slugs).toEqual(
      expect.arrayContaining(["equipment-budget", "learning-budget", "retirement-plan", "health-insurance", "coworking-stipend"])
    );
  });

  it("parses a salary range and normalizes it", () => {
    const s = parseSalary("the base salary range for this role is $119,900.00 to $193,200.00 usd.");
    expect(s).toEqual({ min: 119900, max: 193200, currency: "USD" });
    expect(formatSalary(s)).toBe("$119,900 - $193,200 USD");
  });

  it("parses k-notation and euro", () => {
    expect(parseSalary("€70k – €95k")).toEqual({ min: 70000, max: 95000, currency: "EUR" });
  });

  it("does not treat year ranges as salary", () => {
    expect(parseSalary("founded 2019-2024")).toEqual({ min: null, max: null, currency: "USD" });
  });
});
