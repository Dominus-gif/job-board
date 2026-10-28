import { describe, expect, it } from "vitest";
import { COUNTRIES, checkLocation, openCountries, parseTimezone, placesIn } from "./location-check";
import { applicantAreas } from "../seo/job-location";

describe("remote job location checker", () => {
  it("expands region labels to the countries in them", () => {
    expect(checkLocation("Remote - EMEA", "NG", null).verdict).toBe("open");
    expect(checkLocation("Remote - EMEA", "BR", null).verdict).toBe("closed");
    expect(checkLocation("Remote (DACH)", "AT", null).verdict).toBe("open");
    expect(checkLocation("Remote (DACH)", "NL", null).verdict).toBe("closed");
    expect(checkLocation("LATAM", "CO", null).verdict).toBe("open");
    expect(checkLocation("Remote, APAC", "PH", null).verdict).toBe("open");
  });

  it("keeps the EU, the EEA and Europe apart", () => {
    expect(checkLocation("Remote, EU", "GB", null).verdict).toBe("closed");
    expect(checkLocation("Remote, EEA", "NO", null).verdict).toBe("open");
    expect(checkLocation("Remote, Europe", "GB", null).verdict).toBe("open");
    expect(placesIn("European Union only", "FR").map((p) => p.label)).toEqual(["EU"]);
  });

  it("calls the contested edges of a region unclear instead of guessing", () => {
    expect(checkLocation("Remote - Europe", "TR", null).verdict).toBe("unclear");
    expect(checkLocation("North America", "MX", null).verdict).toBe("unclear");
    expect(checkLocation("North America", "CA", null).verdict).toBe("open");
  });

  it("does not read South Africa as the whole continent", () => {
    expect(checkLocation("Remote - South Africa", "NG", null).verdict).toBe("closed");
    expect(checkLocation("Remote - South Africa", "ZA", null).verdict).toBe("open");
    expect(checkLocation("Sub-Saharan Africa", "EG", null).verdict).toBe("closed");
    expect(checkLocation("Sub-Saharan Africa", "KE", null).verdict).toBe("open");
  });

  it("lets a named place beat the word anywhere, as the board does", () => {
    const r = checkLocation("Anywhere in the US", "IN", null);
    expect(r.verdict).toBe("closed");
    expect(checkLocation("Anywhere in the world", "IN", null).verdict).toBe("open");
  });

  it("calls a bare Remote unclear, because it names nowhere", () => {
    expect(checkLocation("Remote", "DE", null).verdict).toBe("unclear");
  });

  it("reads time-zone windows in the forms employers write them", () => {
    expect(parseTimezone("Remote, UTC-3 to UTC+3")).toMatchObject({ lo: -3, hi: 3 });
    expect(parseTimezone("CET ± 3 hours")).toMatchObject({ lo: -2, hi: 4 });
    expect(parseTimezone("UTC+1 +/- 2")).toMatchObject({ lo: -1, hi: 3 });
    expect(parseTimezone("within 4 hours of EST")).toMatchObject({ lo: -9, hi: -1 });
    expect(parseTimezone("Remote (US time zones)")).toMatchObject({ lo: -10, hi: -4 });
    expect(parseTimezone("Remote - Germany")).toBeNull();
  });

  it("closes a role whose window you are outside, and opens a place-less one you fit", () => {
    expect(checkLocation("Remote, UTC-3 to UTC+3", "IN", 5.5).verdict).toBe("closed");
    expect(checkLocation("Remote, UTC-3 to UTC+3", "NG", 1).verdict).toBe("open");
    expect(checkLocation("Remote, UTC-3 to UTC+3", "NG", null).verdict).toBe("unclear");
    expect(checkLocation("Remote - EMEA, CET ± 2", "AE", 4).verdict).toBe("closed");
  });

  it("flags work authorisation even when the place fits", () => {
    const r = checkLocation("Remote, US. Must be authorized to work in the US", "US", null);
    expect(r.verdict).toBe("open");
    expect(r.authorisation).toMatch(/authorized to work in/i);
  });

  it("uses country names the job-page matcher emits, so a named country maps back", () => {
    // A bare "Georgia" is the US state on job pages, on purpose: that is how it
    // appears in US listings. "Tbilisi, Georgia" still reads as the country.
    for (const c of COUNTRIES.filter((x) => x.name !== "Georgia")) {
      const areas = applicantAreas(`Remote, ${c.name}`, "regional").filter((a) => a["@type"] === "Country");
      if (areas.length) expect(areas.map((a) => a.name)).toContain(c.name);
    }
  });

  it("counts board listings only for countries they clearly include", () => {
    expect(openCountries("Remote - DACH").sort()).toEqual(["AT", "CH", "DE"]);
    expect(openCountries("North America")).not.toContain("MX");
    expect(openCountries("Remote")).toEqual([]);
  });
});
