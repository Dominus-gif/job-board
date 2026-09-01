import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allLandingSlugs, resolveLanding } from "@/lib/landing";
import { abs } from "@/lib/site";
import { CategoryBar } from "@/components/CategoryBar";
import { JobBoard } from "@/components/JobBoard";
import { FaqSection } from "@/components/FaqSection";
import { RssIcon } from "@/components/icons";
import { jobListJsonLd } from "@/lib/jsonld";

export const dynamicParams = true;
export const revalidate = 1800;

export async function generateStaticParams() {
  return (await allLandingSlugs()).map((landing) => ({ landing }));
}

export async function generateMetadata({ params }: { params: { landing: string } }): Promise<Metadata> {
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

export default async function LandingPage({ params }: { params: { landing: string } }) {
  const view = await resolveLanding(params.landing);
  if (!view) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org/",
      "@type": "CollectionPage",
      name: view.metaTitle,
      description: view.metaDescription,
      url: abs(`/${view.slug}`),
    },
    jobListJsonLd(view.jobs, view.title),
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-ink-100 bg-white">
        <header className="mx-auto max-w-6xl px-4 py-12">
          <span className="eyebrow">Curated collection</span>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold text-ink-900 md:text-4xl">{view.title}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-500">{view.intro}</p>
          <div className="mt-5">
            <Link
              href="/rss-feeds"
              className="group relative inline-flex items-center gap-1.5 pb-1.5 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
            >
              <RssIcon className="h-4 w-4" />
              Subscribe via RSS
              {/* Hand-drawn green pencil stroke underlining the link. */}
              <svg
                aria-hidden
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-0 left-0 -right-1 h-2 text-emerald-500"
              >
                <path d="M1.5 4 Q 100 2.3 198.5 4 Q 100 5.7 1.5 4 Z" fill="currentColor" />
              </svg>
            </Link>
          </div>
        </header>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <section className="pt-8">
          <CategoryBar active={view.slug} />
        </section>

        <section className="pt-8">
          {view.jobs.length > 0 ? (
            <JobBoard jobs={view.jobs} />
          ) : (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-10 text-center text-ink-500">
              No jobs match this collection right now — subscribe to be notified.
            </div>
          )}
        </section>

        <section className="py-16">
          <FaqSection items={view.faq} />
        </section>
      </div>
    </div>
  );
}
