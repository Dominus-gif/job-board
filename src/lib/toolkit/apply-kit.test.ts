import { describe, expect, it } from "vitest";
import { buildLetter, checkLetter, type LetterInput } from "./cover-letter";
import { dueDate, money, nextNumber, totals } from "./invoice";

const base: LetterInput = {
  name: "Ana Silva",
  role: "Product Designer",
  company: "Acme",
  greeting: "Hello",
  why: "Acme's API docs are the standard I hold my own writing to.",
  wins: ["cut checkout drop-off by 18%", "", ""],
  remoteYears: 3,
  asyncExample: "",
  where: "Lisbon, Portugal",
  overlapHours: 3,
  teamPlace: "New York",
  flexible: true,
  authorisation: "contractor",
  roleCountry: "",
};

describe("remote cover letter builder", () => {
  it("builds every sentence from the reader's own answers", () => {
    const letter = buildLetter(base);
    expect(letter).toContain("I'm applying for the Product Designer role at Acme.");
    expect(letter).toContain("I cut checkout drop-off by 18%.");
    expect(letter).toContain("3 hours of overlap with New York");
    expect(letter).toContain("invoice you directly");
    expect(letter).toMatch(/Best regards,\nAna Silva$/);
  });

  it("drops a sentence when its field is empty instead of leaving a placeholder", () => {
    const letter = buildLetter({ ...base, where: "", authorisation: "omit", why: "" });
    expect(letter).not.toMatch(/based in|\[|undefined/);
  });

  it("marks what a hiring manager would find missing", () => {
    const checks = checkLetter(base, buildLetter(base));
    expect(checks.find((c) => c.label.startsWith("At least one result"))?.ok).toBe(true);
    expect(checks.find((c) => c.label.startsWith("Gives one example"))?.ok).toBe(false);
  });
});

describe("contractor invoice generator", () => {
  it("adds up in cents, so lines never drift", () => {
    const t = totals([{ id: "a", description: "", quantity: 3, unitPrice: 0.1 }, { id: "b", description: "", quantity: 1, unitPrice: 0.2 }], "rate", 20, "USD");
    expect(t.subtotal).toBe(0.5);
    expect(t.tax).toBe(0.1);
    expect(t.total).toBe(0.6);
  });

  it("charges no tax under the reverse charge", () => {
    expect(totals([{ id: "a", description: "", quantity: 80, unitPrice: 65 }], "reverse", 20, "EUR").total).toBe(5200);
  });

  it("formats currencies with and without minor units", () => {
    expect(money(5200, "USD")).toBe("$5,200.00");
    expect(money(5200, "JPY")).toBe("¥5,200");
  });

  it("works out due dates and the next number", () => {
    expect(dueDate("2026-10-28", 30)).toBe("2026-11-27");
    expect(dueDate("2026-12-20", 14)).toBe("2027-01-03");
    expect(nextNumber("INV-009")).toBe("INV-010");
    expect(nextNumber("2026-17")).toBe("2026-18");
  });
});

describe("cover letter with fields left empty", () => {
  it("never writes 'the this role role'", () => {
    const letter = buildLetter({ ...base, role: "", company: "" });
    expect(letter).toContain("I'm applying for the open role on your team.");
    expect(buildLetter({ ...base, role: "" })).toContain("I'm applying for the open role at Acme.");
  });
});
