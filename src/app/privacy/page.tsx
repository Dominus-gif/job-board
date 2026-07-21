import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses, and protects your data, including cookies and third-party advertising such as Google AdSense.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell eyebrow="Legal" title="Privacy Policy" updated="July 21, 2026">
      <p>
        This Privacy Policy explains how {SITE.name} (“we”, “us”) collects, uses, and safeguards information when you
        visit our website. By using the site you agree to the practices described here.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Information you give us:</strong> your email address when you subscribe to our newsletter, and any details you submit when posting a job or contacting us.</li>
        <li><strong>Automatic information:</strong> standard log data such as your browser type, device, referring pages, and general location, collected via cookies and similar technologies to keep the site secure and understand how it is used.</li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>To operate the site and deliver the jobs, newsletter, and features you request.</li>
        <li>To improve performance, content, and user experience.</li>
        <li>To communicate with you about your subscription or submissions.</li>
        <li>To display relevant advertising (see below).</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We use cookies to remember preferences, measure traffic, and serve advertising. You can disable cookies in your
        browser settings, though some features may not work as intended.
      </p>

      <h2>Advertising &amp; Google AdSense</h2>
      <p>
        We use third-party advertising, including <strong>Google AdSense</strong>, to display ads on this site.
        Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other
        websites.
      </p>
      <ul>
        <li>
          Google’s use of advertising cookies enables it and its partners to serve ads based on your visits to this and
          other sites. You can opt out of personalized advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer nofollow">Google Ads Settings</a>.
        </li>
        <li>
          You can also opt out of some third-party vendors’ use of cookies at{" "}
          <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer nofollow">aboutads.info/choices</a>.
        </li>
        <li>
          Learn more about how Google uses data when you use our partners’ sites or apps at{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer nofollow">policies.google.com/technologies/partner-sites</a>.
        </li>
      </ul>

      <h2>Third-party links</h2>
      <p>
        Job listings link to employers’ own application pages. We are not responsible for the privacy practices of those
        third-party sites; please review their policies separately.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on your location (including under the GDPR and CCPA), you may have the right to access, correct, or
        delete your personal data, or to object to certain processing. To exercise these rights, contact us using the
        details below. You can unsubscribe from our newsletter at any time via the link in every email.
      </p>

      <h2>Data retention &amp; security</h2>
      <p>
        We keep personal data only as long as needed for the purposes described here, and use reasonable technical and
        organizational measures to protect it.
      </p>

      <h2>Children</h2>
      <p>This site is not directed to children under 16, and we do not knowingly collect their personal data.</p>

      <h2>Changes</h2>
      <p>We may update this policy from time to time. Material changes will be reflected by the “last updated” date above.</p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email us at{" "}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>
    </LegalShell>
  );
}
