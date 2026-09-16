import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { abs, SITE } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { LEGACY_TOOL_SLUGS, TOOLS, getTool } from "@/lib/tools";
import { TOOL_GUIDES } from "@/lib/tool-guides";
import { CATEGORIES } from "@/lib/taxonomy";
import { companyScoreData, salaryBandData, searchCounts } from "@/lib/tool-data";
import { Faq } from "@/components/Faq";
import { ArrowUpRightIcon } from "@/components/icons";
import { FakeJobChecker } from "@/components/tools/FakeJobChecker";
import { RemoteJdAnalyzer } from "@/components/tools/RemoteJdAnalyzer";
import { SalaryBandEstimator } from "@/components/tools/SalaryBandEstimator";
import { PurchasingPower } from "@/components/tools/PurchasingPower";
import { OfferComparator } from "@/components/tools/OfferComparator";
import { HomeOfficeCost } from "@/components/tools/HomeOfficeCost";
import { TeamTimezoneMatrix } from "@/components/tools/TeamTimezoneMatrix";
import { NomadVisaChecker } from "@/components/tools/NomadVisaChecker";
import { ResidencyDayCounter } from "@/components/tools/ResidencyDayCounter";
import { CompanyRemoteScore } from "@/components/tools/CompanyRemoteScore";
import { ApplicationTracker } from "@/components/tools/ApplicationTracker";
import { AtsKeywordChecker } from "@/components/tools/AtsKeywordChecker";
import { SearchLinkBuilder } from "@/components/tools/SearchLinkBuilder";

// The data-backed tools read the board, which is rebuilt nightly.
export const revalidate = 21600;
export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLS.filter((t) => !LEGACY_TOOL_SLUGS.has(t.slug)).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const tool = getTool(slug);
  if (!tool) return {};
  const url = abs(`/tools/${slug}`);
  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: { type: "website", title: tool.title, description: tool.description, url },
    twitter: { card: "summary", title: tool.title, description: tool.description },
  };
}

async function Widget({ slug }: { slug: string }) {
  switch (slug) {
    case "fake-job-checker":
      return <FakeJobChecker />;
    case "jd-remote-analyzer":
      return <RemoteJdAnalyzer />;
    case "salary-band-estimator":
      return <SalaryBandEstimator data={await salaryBandData()} />;
    case "salary-purchasing-power":
      return <PurchasingPower />;
    case "offer-comparator":
      return <OfferComparator />;
    case "home-office-cost-calculator":
      return <HomeOfficeCost />;
    case "team-timezone-matrix":
      return <TeamTimezoneMatrix />;
    case "nomad-visa-checker":
      return <NomadVisaChecker />;
    case "tax-residency-day-counter":
      return <ResidencyDayCounter />;
    case "company-remote-score":
      return <CompanyRemoteScore data={await companyScoreData()} />;
    case "application-tracker":
      return <ApplicationTracker />;
    case "ats-keyword-checker":
      return <AtsKeywordChecker />;
    case "search-link-builder":
      return <SearchLinkBuilder counts={await searchCounts()} categories={[...CATEGORIES]} />;
    default:
      return null;
  }
}

export default async function ToolPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const tool = getTool(slug);
  const guide = TOOL_GUIDES[slug];
  if (!tool || !guide || LEGACY_TOOL_SLUGS.has(slug)) notFound();

  const url = abs(`/tools/${slug}`);
  const siblings = TOOLS.filter((t) => t.group === tool.group && t.slug !== slug);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.title,
      description: tool.description,
      url,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    },
    breadcrumbJsonLd([
      { name: "Tools", path: "/tools" },
      { name: tool.title, path: `/tools/${slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-ink-400">
        <Link href="/tools" className="hover:text-ink-900">
          Tools
        </Link>
        <span aria-hidden>/</span>
        <span className="truncate text-ink-500">{tool.short}</span>
      </nav>

      <span className="eyebrow">Free tool · {tool.group}</span>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 md:text-[2.4rem]">{guide.h1}</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-600">{guide.intro}</p>

      <div className="mt-8">
        <Widget slug={slug} />
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        <div className="prose-post" dangerouslySetInnerHTML={{ __html: guide.html }} />

        <section className="mt-12">
          <h2 className="mb-5 font-display text-2xl font-bold tracking-tight text-ink-900">Frequently asked questions</h2>
          <Faq items={guide.faq} />
        </section>

        <section className="mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-base font-bold text-ink-900">Related reading</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {guide.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="font-medium text-brand-600 hover:text-brand-700">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {siblings.length > 0 && (
            <div>
              <h2 className="font-display text-base font-bold text-ink-900">More {tool.group.toLowerCase()} tools</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {siblings.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/tools/${t.slug}`} className="group inline-flex items-center gap-1 font-medium text-ink-700 hover:text-ink-900">
                      {t.title}
                      <ArrowUpRightIcon className="h-3.5 w-3.5 text-ink-400 transition group-hover:text-ink-900" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
