import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allLandingSlugs, resolveLanding } from "@/lib/landing";
import { abs } from "@/lib/site";
import { CategoryBar } from "@/components/CategoryBar";
import { JobBoard } from "@/components/JobBoard";
import { AnywhereVsRegional } from "@/components/AnywhereVsRegional";
import { FaqSection } from "@/components/FaqSection";
import { WfaCrossLinks } from "@/components/WfaCrossLinks";
import { jobListJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const dynamicParams = true;
export const revalidate = 1800;

export async function generateStaticParams() {
  return (await allLandingSlugs()).map((landing) => ({ landing }));
}

export async function generateMetadata(props: { params: Promise<{ landing: string }> }): Promise<Metadata> {
  const params = await props.params;
  const view = await resolveLanding(params.landing);
  if (!view) return {};
  const url = abs(`/${view.slug}`);
  return {
    // metaTitle already carries "| getremotejobsnow.com"; use absolute to skip the template.
    title: { absolute: view.metaTitle },
    description: view.metaDescription,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": abs(view.rss) },
    },
    openGraph: { title: view.metaTitle, description: view.metaDescription, url },
    twitter: { card: "summary", title: view.metaTitle, description: view.metaDescription },
  };
}

export default async function LandingPage(props: { params: Promise<{ landing: string }> }) {
  const params = await props.params;
  const view = await resolveLanding(params.landing);
  if (!view) notFound();
  // Don't ship thin counted-location pages: a location with too few real jobs
  // returns 404 instead of a near-empty page (Google programmatic-pages policy).
  if (view.showScopeExplainer && view.jobs.length < 5) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org/",
      "@type": "CollectionPage",
      name: view.metaTitle,
      description: view.metaDescription,
      url: abs(`/${view.slug}`),
    },
    jobListJsonLd(view.jobs, view.title),
    // The cluster hubs also carry FAQPage (the answers are visible on the page
    // right below the listings) and a breadcrumb trail. Both are gated on the
    // view rather than emitted for every landing page, so the existing geo and
    // category pages keep the structured data they were indexed with.
    ...(view.emitRichSchema
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: view.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Remote jobs", path: "/jobs" },
            { name: view.title, path: `/${view.slug}` },
          ]),
        ]
      : []),
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-ink-100 bg-white">
        <header className="mx-auto max-w-6xl px-4 py-12">
          <span className="eyebrow">Curated collection</span>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold text-ink-900 md:text-4xl">{view.title}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-500">{view.intro}</p>
        </header>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <section className="pt-8">
          <CategoryBar active={view.slug} />
        </section>

        {/* Anywhere-vs-Regional differentiator on counted location pages. */}
        {view.showScopeExplainer && (
          <section className="pt-8">
            <AnywhereVsRegional />
          </section>
        )}

        {/* Route location-hub traffic that doesn't actually need a location
            into the work-from-anywhere cluster. */}
        {view.showScopeExplainer && (
          <section className="pt-6">
            <WfaCrossLinks />
          </section>
        )}

        <section className="pt-8">
          {view.jobs.length > 0 ? (
            <JobBoard jobs={view.jobs} />
          ) : (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-10 text-center text-ink-500">
              No jobs match this collection right now — subscribe to be notified.
            </div>
          )}
        </section>

        {view.showScopeExplainer && (
          <section className="pt-10">
            <WfaCrossLinks />
          </section>
        )}

        <section className="py-16">
          <FaqSection items={view.faq} />
        </section>
      </div>
    </div>
  );
}
