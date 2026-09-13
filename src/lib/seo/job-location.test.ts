import { describe, it, expect } from "vitest";
import { applicantAreas } from "./job-location";

const names = (loc: string, scope: "worldwide" | "regional" = "regional") =>
  applicantAreas(loc, scope).map((a) => a.name);

describe("applicantAreas", () => {
  it("names a country for the plain cases", () => {
    expect(names("United States")).toEqual(["United States"]);
    expect(names("Germany")).toEqual(["Germany"]);
  });

  it("sees through the wrappers the feeds add", () => {
    for (const s of ["Remote - United States", "US Remote", "Remote U.S.", "United States (Remote)", "Remote-US"]) {
      expect(names(s), s).toEqual(["United States"]);
    }
  });

  it("resolves a bare city to its country", () => {
    expect(names("San Francisco")).toEqual(["United States"]);
    expect(names("London")).toEqual(["United Kingdom"]);
    expect(names("Amsterdam")).toEqual(["Netherlands"]);
  });

  it("folds accents and letters NFD leaves alone", () => {
    expect(names("São Paulo")).toEqual(["Brazil"]);
    expect(names("München")).toEqual(["Germany"]);
    expect(names("Wrocław")).toEqual(["Poland"]);
  });

  it("reads a two-letter code only where one can appear, and by case", () => {
    expect(names("Austin, TX")).toEqual(["United States"]); // city and state agree
    expect(names("München, de")).toEqual(["Germany"]); // lowercase ISO country
    expect(names("Ancarano (IT)")).toEqual(["Italy"]);
    expect(names("Toronto, ON")).toEqual(["Canada"]);
    // No comma, no bracket: these are English words, not Oregon and Indiana.
    expect(names("Remote OR hybrid")).toEqual([]);
    expect(names("Work IN progress")).toEqual([]);
  });

  it("does not read a continent as the United States", () => {
    expect(names("North America")).toEqual(["North America"]);
    expect(names("Latin America")).toEqual(["Latin America"]);
    expect(names("Home based - EMEA")).toEqual(["Europe"]);
  });

  it("lets an explicit country beat a colliding city", () => {
    expect(names("San José, Costa Rica")).toEqual(["Costa Rica"]);
    expect(names("Tokyo, Japan")).toEqual(["Japan"]);
  });

  it("keeps every country in a multi-region posting", () => {
    expect(names("Remote, Canada · Remote, United States").sort()).toEqual(["Canada", "United States"]);
  });

  it("returns nothing when the string names no place", () => {
    for (const s of ["Remote", "Hybrid", "CET (+/- 3 hours)", "Multiple Cities", ""]) {
      expect(names(s), s).toEqual([]);
    }
  });

  it("marks a worldwide role Worldwide whatever the string says", () => {
    expect(applicantAreas("Anywhere in the World", "worldwide")).toEqual([
      { "@type": "Country", name: "Worldwide" },
    ]);
  });
});
