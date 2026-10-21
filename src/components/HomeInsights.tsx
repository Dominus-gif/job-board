import Link from "next/link";
import { homeInsights } from "@/lib/tool-data";
import { ArrowUpRightIcon } from "./icons";

/**
 * Four figures counted from the live board, each linking to the guide or tool
 * that explains it. This is the site's own data rather than anyone's listing,
 * and it is recomputed on every rebuild, so the homepage never repeats a
 * number that has since moved.
 */
export async function HomeInsights() {
  const d = await homeInsights();
  if (!d.total) return null;
  const pct = (n: number) => `${((n / d.total) * 100).toFixed(1)}%`;
  const date = new Date(`${d.asOf}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

  const cards = [
    {
      figure: pct(d.worldwide),
      text: "of the remote roles here can be done from anywhere in the world. The rest name a country or region.",
      href: "/posts/how-to-find-work-from-anywhere-jobs",
      link: "How to find them",
    },
    {
      figure: `${d.sweJunior} of ${d.swe.toLocaleString("en-US")}`,
      text: "software engineering roles have a junior title, in the largest field on the board.",
      href: "/posts/remote-software-engineering-jobs",
      link: "What that means for you",
    },
    {
      figure: pct(d.withPay),
      text: "of listings publish a salary range, mostly where US state law requires it.",
      href: "/tools/salary-band-estimator",
      link: "See the published ranges",
    },
    {
      figure: `${d.productDesigner} vs ${d.uxDesigner}`,
      text: "roles titled product designer against UX designer. The words employers use decide what you find.",
      href: "/tools/job-title-finder",
      link: "Find the titles for your work",
    },
  ];

  return (
    <section className="pt-12" aria-labelledby="home-insights-title">
      <span className="eyebrow">From our data</span>
      <h2 id="home-insights-title" className="mt-2 font-display text-xl font-semibold tracking-tight text-ink-900 md:text-2xl">
        What the board shows today
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-ink-500">
        Counted from {d.total.toLocaleString("en-US")} live listings on {date}. The board is rebuilt every night, and so are these numbers.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="group flex h-full flex-col rounded-xl border border-ink-100 bg-white p-4 transition hover:border-ink-200 hover:bg-ink-50"
            >
              <span className="font-display text-2xl font-bold tabular-nums text-ink-900">{c.figure}</span>
              <span className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-600">{c.text}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 group-hover:text-brand-700">
                {c.link} <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm">
        <Link href="/tools/remote-field-explorer" className="font-medium text-brand-600 hover:text-brand-700">
          Compare every field in the remote field explorer →
        </Link>
      </p>
    </section>
  );
}
