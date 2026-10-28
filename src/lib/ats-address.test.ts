import { describe, expect, it } from "vitest";
import { atsAddress } from "./ats-address";

describe("atsAddress", () => {
  it("reads Greenhouse's own hosts", () => {
    expect(atsAddress("https://job-boards.greenhouse.io/mozilla/jobs/8324476")).toEqual({ platform: "greenhouse", org: "mozilla", id: "8324476" });
  });

  it("finds the board behind an employer's own careers site from the allow-list", () => {
    expect(atsAddress("https://stripe.com/jobs/search?gh_jid=8172508")).toEqual({ platform: "greenhouse", org: "stripe", id: "8172508" });
    expect(atsAddress("https://careers.datadoghq.com/detail/8257324/?gh_jid=8257324")).toEqual({ platform: "greenhouse", org: "datadog", id: "8257324" });
    expect(atsAddress("https://www.coinbase.com/careers/positions/8175363?gh_jid=8175363")?.org).toBe("coinbase");
    expect(atsAddress("https://platform.sh/company/careers/job?gh_jid=8687823002")?.org).toBe("platformsh");
  });

  it("leaves a gh_jid on a domain it cannot place alone", () => {
    expect(atsAddress("https://example.org/careers?gh_jid=123")).toBeNull();
    expect(atsAddress("https://stripe.com/jobs/search?gh_jid=abc")).toBeNull();
  });
});
