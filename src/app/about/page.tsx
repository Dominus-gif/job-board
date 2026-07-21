import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "About",
  description: `What ${SITE.name} is, how it works, and why every listing is truly location-independent.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalShell eyebrow="About" title={`About ${SITE.name}`}>
      <p>
        {SITE.name} is a job board with a single, strict promise: <strong>every listing is truly
        location-independent</strong>. No “Remote (US only)”, no “must overlap EST”, no work-authorization gate — just
        roles you can genuinely do from anywhere on earth.
      </p>

      <h2>How it works</h2>
      <p>
        We continuously aggregate jobs from companies’ public applicant-tracking systems — including Greenhouse, Lever,
        Ashby, Workable, and SmartRecruiters — alongside vetted remote-job sources. Each listing runs through a strict
        “Work From Anywhere” filter that rejects anything tied to a country, region, or timezone. Roles that pass are
        enriched with salary, skills, benefits, and company details, then republished as clean, easy-to-scan pages.
      </p>

      <h2>Why the strict filter</h2>
      <p>
        Most “remote” jobs are quietly restricted to a region. Our whole reason for existing is to remove that friction
        for people who want real freedom of location, so we choose precision over volume — if a role isn’t genuinely
        global, it doesn’t make the cut.
      </p>

      <h2>Free for job seekers</h2>
      <p>
        Browsing and applying are free, forever. You apply directly on the employer’s own site, and you should never have
        to pay to apply.
      </p>

      <h2>Get in touch</h2>
      <p>
        Hiring globally and want to reach our audience? See <Link href="/hiring">Post a job</Link> or{" "}
        <Link href="/advertise">Advertise</Link>. For anything else,{" "}
        <Link href="/contact">contact us</Link>.
      </p>
    </LegalShell>
  );
}
