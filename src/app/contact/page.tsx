import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { LegalShell } from "@/components/LegalShell";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE.owner}, who runs ${SITE.name}: report a listing or a scam, correct a guide, or ask about posting a job. Email ${SITE.email}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <LegalShell eyebrow="Contact" title="Get in touch">
      <p>
        {SITE.name} is run by {SITE.owner}. Write to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or use the form below. Both reach the same inbox, and replies
        usually go out within one business day.
      </p>

      <h2>What to write about</h2>
      <ul>
        <li>
          <strong>A listing that is wrong or closed.</strong> Send the link. Roles that have closed, that turn out to be
          office-based or hybrid, or that are restricted in a way the label does not show, get corrected or removed.
        </li>
        <li>
          <strong>A scam or a suspicious message.</strong> See below.
        </li>
        <li>
          <strong>A correction to a guide or a tool.</strong> If a figure, a date or a rule is wrong, tell us what it
          should be and where you found it, and the page gets fixed.
        </li>
        <li>
          <strong>Posting a job.</strong> Start at <Link href="/hiring">Post a job</Link>, or write to us if you would
          rather talk it through first.
        </li>
        <li>
          <strong>Privacy requests.</strong> To access or delete data we hold about you, write from the address you
          contacted us with. See the <Link href="/privacy">privacy policy</Link>.
        </li>
      </ul>

      <div className="mt-8">
        <ContactForm />
      </div>

      <h2>Report a job or a scam</h2>
      <p>
        Applying should always be free. No legitimate employer asks you to pay to apply, to buy equipment through them,
        or to deposit a cheque before you start. If a listing or a recruiter message does any of that, send us the link
        or a screenshot and it will be removed promptly. You can also run the message through our{" "}
        <Link href="/tools/fake-job-checker">fake job checker</Link> first.
      </p>
    </LegalShell>
  );
}
