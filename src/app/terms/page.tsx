import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of ${SITE.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalShell eyebrow="Legal" title="Terms of Service" updated="July 21, 2026">
      <p>
        These Terms govern your use of {SITE.name}. By accessing the site you agree to them. If you do not agree, please
        do not use the site.
      </p>

      <h2>About the service</h2>
      <p>
        {SITE.name} aggregates publicly available job listings from company hiring systems and remote-job sources,
        filters them for genuinely location-independent roles, and republishes them with added information. We do not
        employ candidates and are not a party to any hiring decision or employment relationship.
      </p>

      <h2>Listings &amp; accuracy</h2>
      <p>
        Listings originate from third parties and may change or be removed at any time. We take reasonable steps to keep
        them current and to verify that roles are active, but we make no guarantee about accuracy, availability, salary,
        or the legitimacy of any employer. Always apply on the employer’s official page and review their terms.
      </p>

      <h2>No fees to apply</h2>
      <p>
        Applying to jobs listed here is free. You should never have to pay to apply. Treat any request for payment or
        sensitive financial details as a red flag and report it to us.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not scrape, copy, or redistribute the site’s content at scale without permission.</li>
        <li>Do not submit false, misleading, or unlawful job postings.</li>
        <li>Do not attempt to disrupt or gain unauthorized access to the site.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        Original content, branding, and design are owned by {SITE.name}. Job descriptions and company marks remain the
        property of their respective owners.
      </p>

      <h2>Disclaimer &amp; liability</h2>
      <p>
        The site is provided “as is”, without warranties of any kind. To the fullest extent permitted by law, we are not
        liable for any loss arising from your use of the site or reliance on any listing.
      </p>

      <h2>Changes</h2>
      <p>We may update these Terms from time to time; continued use of the site means you accept the current version.</p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>
    </LegalShell>
  );
}
