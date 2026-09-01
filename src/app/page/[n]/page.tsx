import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllJobs, paginate, PAGE_SIZE } from "@/lib/db";
import { abs } from "@/lib/site";
import { CategoryBar } from "@/components/CategoryBar";
import { JobList } from "@/components/JobList";

export const dynamicParams = true;
export const revalidate = 1800;

export async function generateStaticParams() {
  const total = Math.max(1, Math.ceil((await getAllJobs()).length / PAGE_SIZE));
  // Prebuild only the first pages; deeper pages render on demand (dynamicParams)
  // and stay indexable. Keeps the build bounded as the catalog grows.
  return Array.from({ length: Math.min(total, 40) }, (_, i) => ({ n: String(i + 1) }));
}

export function generateMetadata({ params }: { params: { n: string } }): Metadata {
  const page = Number(params.n) || 1;
  return {
    title: `All Remote Jobs — Page ${page}`,
    description: "Every truly location-independent job, paginated.",
    alternates: { canonical: abs(`/page/${page}`) },
    robots: page > 1 ? { index: false, follow: true } : undefined,
  };
}

export default async function PaginatedFeed({ params }: { params: { n: string } }) {
  const requested = Number(params.n);
  if (!Number.isInteger(requested) || requested < 1) notFound();

  const { items, page, totalPages, total } = paginate(await getAllJobs(), requested);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold text-ink-900">All jobs</h1>
      <p className="mt-2 text-ink-700">{total} truly location-independent jobs · page {page} of {totalPages}</p>

      <div className="mt-6">
        <CategoryBar />
      </div>

      <div className="mt-6">
        <JobList jobs={items} />
      </div>

      <nav className="mt-8 flex items-center justify-between">
        {page > 1 ? (
          <Link href={`/page/${page - 1}`} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:border-brand-300">
            ← Previous
          </Link>
        ) : <span />}
        <span className="text-sm text-ink-700">Page {page} / {totalPages}</span>
        {page < totalPages ? (
          <Link href={`/page/${page + 1}`} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:border-brand-300">
            Next →
          </Link>
        ) : <span />}
      </nav>
    </div>
  );
}
