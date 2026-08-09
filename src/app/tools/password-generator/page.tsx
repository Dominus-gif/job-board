import type { Metadata } from "next";
import Link from "next/link";
import { getTool } from "@/lib/tools";
import { abs } from "@/lib/site";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";

const tool = getTool("password-generator")!;

export const metadata: Metadata = {
  title: "Strong Password Generator (Free & Secure)",
  description: tool.description,
  keywords: tool.keywords,
  alternates: { canonical: "/tools/password-generator" },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web",
    url: abs("/tools/password-generator"),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: tool.description,
  };
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-ink-400">
        <Link href="/tools" className="hover:text-ink-900">Tools</Link>
        <span aria-hidden>/</span>
        <span className="text-ink-500">Password generator</span>
      </nav>
      <span className="eyebrow">Tool</span>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900">Strong password generator</h1>
      <p className="mt-2 max-w-2xl text-ink-500">
        Create strong, random passwords right in your browser. Pick the length and character types, check the strength,
        and copy — nothing is stored, logged, or sent anywhere.
      </p>
      <div className="mt-8">
        <PasswordGenerator />
      </div>
      <div className="prose-post mt-8">
        <h2>Tips for a strong password</h2>
        <ul>
          <li>Use at least <strong>16 characters</strong> — length matters more than complexity.</li>
          <li>Mix uppercase, lowercase, numbers, and symbols.</li>
          <li>Use a <strong>unique password for every account</strong>, and store them in a password manager.</li>
          <li>Never reuse a password an employer or job site asks you to set — and remember, a legitimate employer never needs your personal passwords.</li>
        </ul>
      </div>
    </div>
  );
}
