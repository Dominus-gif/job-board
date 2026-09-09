import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "How It Works — Where Our Listings Come From",
  description: `How ${SITE.name} sources, filters, verifies and enriches every remote job listing — and what we deliberately leave off the board.`,
  alternates: { canonical: "/how-it-works" },
};

/**
 * Editorial explainer for the pipeline.
 *
 * This page exists for two audiences: job seekers deciding whether to trust the
 * board, and reviewers checking that an aggregator adds something of its own.
 * It documents the parts that are genuinely ours — the worldwide filter, the
 * enrichment layer, the employer-verification guard and the collapse guard —
 * rather than describing scraping in the abstract.
 */
export default function HowItWorksPage() {
  return (
    <LegalShell eyebrow="How it works" title="How our remote job board works">
      <p>
        Most job boards tag anything without an office as &quot;remote.&quot; We don&apos;t. Every listing on the main
        board has passed a filter for genuine location independence, and the ones that don&apos;t pass aren&apos;t
        deleted — they&apos;re moved somewhere clearly labelled. Here is the whole pipeline, start to finish.
      </p>

      <h2>1. Where listings come from</h2>
      <p>
        We read directly from company applicant-tracking systems — Ashby, Greenhouse, Lever, Workable and
        SmartRecruiters — plus a set of established remote job feeds. Reading the ATS matters: it&apos;s the same
        source the employer publishes to, so listings appear without a middleman rewriting them, and the
        &quot;Apply&quot; button goes to the employer&apos;s own page rather than through us.
      </p>

      <h2>2. The work-from-anywhere filter</h2>
      <p>
        This is the part that defines the board. Every role is classified into one of three buckets:
      </p>
      <ul>
        <li>
          <strong>Worldwide</strong> — no country, no region, no timezone-overlap requirement and no local
          work-authorization gate. These are the only roles on the <Link href="/page/1">main board</Link>.
        </li>
        <li>
          <strong>Regional</strong> — genuinely remote, but you must live somewhere specific (&quot;Remote, US
          only&quot;). These go to a separate, clearly-labelled{" "}
          <Link href="/remote-regional-jobs">regional board</Link>.
        </li>
        <li><strong>Rejected</strong> — on-site or hybrid roles wearing the word &quot;remote.&quot;</li>
      </ul>
      <p>
        We deliberately do not relax this filter to make the numbers look bigger. A &quot;remote&quot; job you turn
        out to be ineligible for wastes more of your time than it saves ours.
      </p>

      <h2>3. Employer verification</h2>
      <p>
        Aggregated data frequently attaches a recognisable company name to a job that belongs to someone else. We
        check the employer against the applicant-tracking board the application actually resolves to, and when the
        two disagree the listing is dropped rather than published under a guess. Applying this check removed over a
        thousand listings from our own dataset — including roles attributed to well-known companies that turned out
        to belong to entirely different employers.
      </p>
      <p>
        We would rather show you a smaller board you can trust than a bigger one you can&apos;t.
      </p>

      <h2>4. Enrichment</h2>
      <p>Raw postings are inconsistent, so each listing is normalised before it reaches you:</p>
      <ul>
        <li><strong>Category</strong> — assigned from the role&apos;s content, so filters behave predictably.</li>
        <li><strong>Skills</strong> — extracted and made clickable so you can pivot sideways from any listing.</li>
        <li><strong>Salary</strong> — parsed into a comparable range where the employer disclosed one, and left
          honestly blank where they didn&apos;t. We never invent a number.</li>
        <li><strong>Benefits and employment type</strong> — pulled out of the description into structured fields.</li>
        <li><strong>Duplicates</strong> — the same role posted once per location is collapsed to a single entry.</li>
      </ul>

      <h2>5. Keeping the board honest</h2>
      <ul>
        <li>
          <strong>Dead listings 404.</strong> A role that is removed or expired returns a real 404 rather than a
          stale page, so a shared link never quietly misleads you.
        </li>
        <li>
          <strong>A collapse guard.</strong> If a data refresh comes back suspiciously small, we keep the previous
          good set instead of publishing a near-empty board.
        </li>
        <li>
          <strong>No fake urgency.</strong> Badges reflect the actual posting date. Nothing is marked
          &quot;trending&quot; to manufacture pressure.
        </li>
      </ul>

      <h2>What we never do</h2>
      <ul>
        <li>Charge you to apply, or put listings behind a paywall.</li>
        <li>Ask for payment for equipment, training or background checks — no legitimate employer does either.</li>
        <li>Sell your applications. The apply link goes to the employer, not through us.</li>
      </ul>

      <p>
        Questions this doesn&apos;t answer? Read the <Link href="/faq">FAQ</Link>, see{" "}
        <Link href="/about">what the site is for</Link>, or <Link href="/contact">get in touch</Link>.
      </p>
    </LegalShell>
  );
}
