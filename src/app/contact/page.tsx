import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${SITE.name} team.`,
  alternates: { canonical: "/contact" },
};

const channels = [
  { label: "General & support", value: SITE.contactEmail, href: `mailto:${SITE.contactEmail}` },
  { label: "Advertising", value: "ads@anywherejobs.example", href: "mailto:ads@anywherejobs.example" },
  { label: "Post a job", value: "Use our submission form", href: "/hiring" },
];

export default function ContactPage() {
  return (
    <LegalShell eyebrow="Contact" title="Get in touch">
      <p>
        We’d love to hear from you — whether you’ve found a bug, want to report a listing, have a partnership idea, or
        just have a question. We usually reply within one business day.
      </p>

      <div className="not-prose mt-8 space-y-3">
        {channels.map((c) => (
          <a key={c.label} href={c.href} className="card flex items-center justify-between gap-4 p-5 transition hover:border-brand-300 hover:shadow-lift">
            <span className="font-semibold text-ink-900">{c.label}</span>
            <span className="text-sm font-medium text-brand-700">{c.value}</span>
          </a>
        ))}
      </div>

      <h2>Report a job or a scam</h2>
      <p>
        Applying should always be free. If a listing asks you to pay or looks fraudulent, email{" "}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> with the link and we’ll remove it promptly.
      </p>

      <h2>Follow us</h2>
      <p>
        Find us on{" "}
        <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>,{" "}
        <a href={SITE.social.twitter} target="_blank" rel="noopener noreferrer">X</a>, and{" "}
        <a href={SITE.social.discord} target="_blank" rel="noopener noreferrer">Discord</a>.
      </p>
    </LegalShell>
  );
}
