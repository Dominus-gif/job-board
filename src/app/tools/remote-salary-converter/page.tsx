import type { Metadata } from "next";
import Link from "next/link";
import { getTool } from "@/lib/tools";
import { abs } from "@/lib/site";
import { SalaryConverter } from "@/components/tools/SalaryConverter";

const tool = getTool("remote-salary-converter")!;

export const metadata: Metadata = {
  title: "Remote Salary Converter (USD, EUR, GBP)",
  description: tool.description,
  keywords: tool.keywords,
  alternates: { canonical: "/tools/remote-salary-converter" },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: abs("/tools/remote-salary-converter"),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: tool.description,
  };
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-ink-400">
        <Link href="/tools" className="hover:text-ink-900">Tools</Link>
        <span aria-hidden>/</span>
        <span className="text-ink-500">Salary converter</span>
      </nav>
      <span className="eyebrow">Tool</span>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900">Remote salary converter</h1>
      <p className="mt-2 text-ink-500">
        Convert a remote salary between USD, EUR, GBP, CAD, AUD and INR, with monthly and hourly equivalents. Handy for
        comparing offers from US and European employers.
      </p>
      <div className="mt-8">
        <SalaryConverter />
      </div>
      <p className="mt-6 text-sm text-ink-500">
        Looking for roles? <Link href="/remote-jobs-in-usa" className="font-medium text-brand-600 hover:text-brand-700">Remote jobs in the USA</Link> ·{" "}
        <Link href="/remote-jobs-in-europe" className="font-medium text-brand-600 hover:text-brand-700">Remote jobs in Europe</Link>.
      </p>
    </div>
  );
}
