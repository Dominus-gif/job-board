import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { LegalShell } from "@/components/LegalShell";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${SITE.name} team.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <LegalShell eyebrow="Contact" title="Get in touch">
      <p>
        We’d love to hear from you — whether you’ve found a bug, want to report a listing, have a partnership idea, or
        just have a question. Fill in the form below and we usually reply within one business day.
      </p>

      <div className="mt-8">
        <ContactForm />
      </div>

      <h2>Report a job or a scam</h2>
      <p>
        Applying should always be free. If a listing asks you to pay or looks fraudulent, send us the link using the
        form above and we’ll remove it promptly.
      </p>
    </LegalShell>
  );
}
