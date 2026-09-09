import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "FAQ — Remote Jobs, Answered",
  description: `Common questions about ${SITE.name}: what work-from-anywhere means, whether applying is free, how often listings update, and how we verify employers.`,
  alternates: { canonical: "/faq" },
};

/** Q&A pairs — also emitted as FAQPage JSON-LD so the answers can earn rich results. */
const FAQS: { q: string; a: string }[] = [
  {
    q: "Is it free to apply for jobs?",
    a: "Yes, always. Every listing links straight to the employer's own application page and we never charge to apply or hide listings behind a paywall. No legitimate employer will ask you to pay for equipment, training or a background check in order to be hired — treat any such request as a scam.",
  },
  {
    q: "What does 'work from anywhere' actually mean here?",
    a: "It means a role with no geographic requirement at all: no country you must live in, no region, no timezone you must overlap and no local work-authorization gate. That is stricter than 'remote', which usually still names a country. Only about 5% of remote listings meet this bar, and they are the only ones on our main board.",
  },
  {
    q: "Why are some jobs on a separate 'regional' board?",
    a: "Because they are genuinely remote but region-locked — 'Remote, US only' or 'Remote, EU'. They are real jobs worth seeing, but mixing them into the main board would break the promise that everything there is location-independent, so they live on a clearly-labelled separate board instead.",
  },
  {
    q: "How often are listings updated?",
    a: "The board is rebuilt daily, which re-reads every source. Listings that have been removed or have expired return a real 404 rather than a stale page, so a link you saved will never quietly show you a job that no longer exists.",
  },
  {
    q: "Do you verify that the employer is real?",
    a: "We check each listing's employer against the applicant-tracking board its application actually resolves to. Where the two disagree, the listing is dropped rather than published under a guess. This is a real problem in aggregated job data, and applying the check removed over a thousand listings from our own dataset.",
  },
  {
    q: "Where do the jobs come from?",
    a: "Directly from company applicant-tracking systems — Ashby, Greenhouse, Lever, Workable and SmartRecruiters — plus established remote job feeds. Reading the source the employer publishes to means the apply link goes to them, not through us.",
  },
  {
    q: "Do I need an account?",
    a: "No. Browsing, filtering and applying all work without signing up. Bookmarks are saved in your browser, and you can move them to another device with a sync code if you want to, without creating an account.",
  },
  {
    q: "Can I get emailed when new jobs match my search?",
    a: "Yes. Run a search with the filters you care about, then use the alert form at the bottom of the results to save that specific search — not just a broad category.",
  },
  {
    q: "Why do some listings not show a salary?",
    a: "Because the employer did not publish one. Only about 15% of remote listings disclose a range. Where a range exists we parse it into a comparable figure; where it does not, we leave it blank rather than estimating, since a made-up number is worse than no number.",
  },
  {
    q: "How do I post a job?",
    a: "Use the Post a job page. Paid listings skip the automated pipeline and are reviewed before they appear.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <LegalShell eyebrow="FAQ" title="Frequently asked questions">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {FAQS.map((f) => (
        <div key={f.q}>
          <h2>{f.q}</h2>
          <p>{f.a}</p>
        </div>
      ))}

      <h2>Still stuck?</h2>
      <p>
        Read <Link href="/how-it-works">how the board works</Link>, see{" "}
        <Link href="/about">what the site is for</Link>, or <Link href="/contact">send us a message</Link>.
      </p>
    </LegalShell>
  );
}
