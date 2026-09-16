import { describe, expect, it } from "vitest";
import { analyzeRemote } from "./remote-analyzer";
import { baseDomain, scoreFakeJob } from "./fake-job";
import { coverage, extractKeywords } from "./keywords";
import { countDays, tripDays } from "./residency";
import { bestWindow, coverage as tzCoverage, offsetMinutes, overlap, utcWindow, type Member } from "./timezones";
import { binValues, percentileRank, quantile } from "../stats";
import { countryByIso, equivalent, priceLevel } from "../data/price-levels";
import { seniorityOf } from "../tool-data";

describe("analyzeRemote", () => {
  it("accepts an explicit worldwide posting with no restrictions", () => {
    const r = analyzeRemote("We are a distributed team and you can work from anywhere in the world.");
    expect(r.verdict).toBe("worldwide");
    expect(r.score).toBe(100);
  });

  it("flags hybrid roles as not fully remote, even when they say remote", () => {
    const r = analyzeRemote("Remote-friendly role. This position is hybrid with two days in the office.");
    expect(r.verdict).toBe("onsite");
    expect(r.signals.some((s) => s.kind === "onsite" && s.phrase === "hybrid")).toBe(true);
  });

  it("treats work authorisation and timezone clauses as restrictions", () => {
    const r = analyzeRemote("Fully remote. Candidates must be authorized to work in the UK and available 9am–5pm GMT.");
    expect(r.verdict).toBe("restricted");
    expect(r.signals.some((s) => s.kind === "restriction")).toBe(true);
    expect(r.signals.some((s) => s.kind === "timezone" && s.phrase === "gmt")).toBe(true);
  });

  it("calls a bare 'remote' posting unclear, like the board's filter", () => {
    expect(analyzeRemote("This is a remote role on our platform team.").verdict).toBe("unclear");
    expect(analyzeRemote("Join our platform team.").verdict).toBe("not-remote");
  });
});

describe("scoreFakeJob", () => {
  const scam =
    "No experience needed, work just 2 hours a day and earn $900 per week. Interview on Telegram. We will send a cheque to buy equipment from our vendor. Send your bank details today.";

  it("rates a classic scam message as very likely a scam", () => {
    const r = scoreFakeJob({ text: scam, email: "hr.team@gmail.com", website: "", answers: {} });
    expect(r.level).toBe("very-high");
    expect(r.flags.map((f) => f.id)).toEqual(expect.arrayContaining(["cheque", "chat-apps", "id-request"]));
    expect(r.flags[0].severity).toBe("critical");
  });

  it("stays low for an ordinary recruiter note from the company domain", () => {
    const r = scoreFakeJob({
      text: "Thanks for applying to the Senior Designer role. Could we schedule a 30-minute video call next week?",
      email: "jane@acme.com",
      website: "https://www.acme.com",
      answers: { onCareersPage: "yes" },
    });
    expect(r.level).toBe("low");
    expect(r.reassurances.length).toBeGreaterThan(0);
  });

  it("escalates any critical answer to at least 'high'", () => {
    const r = scoreFakeJob({ text: "", email: "", website: "", answers: { askedToPay: "yes" } });
    expect(["high", "very-high"]).toContain(r.level);
  });

  it("notices a mismatch between email and website domains", () => {
    const r = scoreFakeJob({ text: "", email: "talent@acme-careers.net", website: "acme.com", answers: {} });
    expect(r.flags.some((f) => f.id.startsWith("mismatch:"))).toBe(true);
    expect(r.flags.some((f) => f.id.startsWith("lookalike:"))).toBe(true);
  });

  it("compares registrable domains, including two-part suffixes", () => {
    expect(baseDomain("careers.example.co.uk")).toBe("example.co.uk");
    expect(baseDomain("www.example.com")).toBe("example.com");
  });
});

describe("keyword coverage", () => {
  const jd =
    "We need a backend engineer with Kubernetes and PostgreSQL. You will own data pipelines and data pipelines monitoring. Experience with k8s is essential, and Terraform helps. You will mentor engineers.";

  it("folds skill aliases into one canonical term", () => {
    const k8s = extractKeywords(jd).find((k) => k.term === "kubernetes");
    expect(k8s?.weight).toBe(2);
    expect(extractKeywords(jd).some((k) => k.term === "data pipelines" && k.kind === "phrase")).toBe(true);
  });

  it("scores what the CV covers, weighted by use", () => {
    const r = coverage(jd, "Backend engineer. Ran Postgres and k8s clusters, built data pipelines.");
    expect(r.keywords.find((k) => k.term === "kubernetes")?.found).toBe(true);
    expect(r.keywords.find((k) => k.term === "terraform")?.found).toBe(false);
    expect(r.score).toBeGreaterThan(0);
    expect(r.score).toBeLessThan(100);
  });
});

describe("residency day counting", () => {
  const opts = { countArrival: true, countDeparture: true, threshold: 183 };

  it("counts inclusive days and respects the travel-day switches", () => {
    const trip = { id: "a", country: "Spain", from: "2026-03-01", to: "2026-03-03" };
    expect(tripDays(trip, opts)).toHaveLength(3);
    expect(tripDays(trip, { countArrival: false, countDeparture: true })).toHaveLength(2);
    expect(tripDays(trip, { countArrival: false, countDeparture: false })).toHaveLength(1);
  });

  it("doesn't double-count overlapping stays", () => {
    const [spain] = countDays(
      [
        { id: "a", country: "Spain", from: "2026-01-01", to: "2026-01-10" },
        { id: "b", country: "Spain", from: "2026-01-05", to: "2026-01-12" },
      ],
      opts,
    );
    expect(spain.total).toBe(12);
  });

  it("finds a rolling window that crosses the new year", () => {
    const [pt] = countDays([{ id: "a", country: "Portugal", from: "2025-09-01", to: "2026-03-31" }], opts);
    expect(pt.byYear[2025]).toBe(122);
    expect(pt.byYear[2026]).toBe(90);
    expect(pt.maxRolling).toBe(212);
    expect(pt.overThreshold).toBe(true);
  });
});

describe("timezone overlap", () => {
  it("applies daylight saving for the chosen date", () => {
    expect(offsetMinutes("America/New_York", new Date("2026-01-15T12:00:00Z"))).toBe(-300);
    expect(offsetMinutes("America/New_York", new Date("2026-07-15T12:00:00Z"))).toBe(-240);
    expect(offsetMinutes("Asia/Kolkata", new Date("2026-07-15T12:00:00Z"))).toBe(330);
  });

  it("gives New York and London three shared hours on a winter nine-to-five", () => {
    const ny: Member = { id: "a", name: "NY", zone: "America/New_York", start: 540, end: 1020 };
    const ldn: Member = { id: "b", name: "LDN", zone: "Europe/London", start: 540, end: 1020 };
    const day = "2026-01-15";
    expect(overlap(utcWindow(ny, day), utcWindow(ldn, day))).toBe(180);
    const best = bestWindow(tzCoverage([ny, ldn], day));
    expect(best).toEqual({ from: 840, to: 1020, count: 2 });
  });

  it("finds no overlap between Sydney and Berlin nine-to-fives", () => {
    const syd: Member = { id: "a", name: "SYD", zone: "Australia/Sydney", start: 540, end: 1020 };
    const ber: Member = { id: "b", name: "BER", zone: "Europe/Berlin", start: 540, end: 1020 };
    expect(overlap(utcWindow(syd, "2026-01-15"), utcWindow(ber, "2026-01-15"))).toBe(0);
  });
});

describe("stats helpers", () => {
  it("bins every value and interpolates quantiles", () => {
    const values = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const bins = binValues(values, 5, 0, 100);
    expect(bins.reduce((n, b) => n + b.count, 0)).toBe(values.length);
    expect(quantile(values, 0.5)).toBe(55);
    expect(percentileRank(values, 55)).toBe(50);
  });
});

describe("price levels", () => {
  it("returns the same amount when comparing a country with itself", () => {
    const pt = countryByIso("PRT")!;
    const r = equivalent(50000, "EUR", pt, pt);
    expect(r.ratio).toBe(1);
    expect(Math.round(r.eqLocal)).toBe(50000);
  });

  it("puts the United States at exactly 1", () => {
    expect(priceLevel(countryByIso("USA")!)).toBe(1);
  });
});

describe("seniorityOf", () => {
  it("reads levels from common titles", () => {
    expect(seniorityOf("Junior Support Specialist")).toBe(0);
    expect(seniorityOf("Backend Engineer")).toBe(1);
    expect(seniorityOf("Senior Product Designer")).toBe(2);
    expect(seniorityOf("Staff Engineer")).toBe(3);
    expect(seniorityOf("Engineering Manager")).toBe(4);
    expect(seniorityOf("Customer Success Manager")).toBe(1);
    expect(seniorityOf("Director of Finance")).toBe(5);
  });
});
