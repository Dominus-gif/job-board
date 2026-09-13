import type { Metadata } from "next";
import Link from "next/link";
import { getAllJobs, getCompanies, getJobsByCategory, getRegionalCount, getSubscriberCount } from "@/lib/db";
import { FEATURES, SUPABASE } from "@/lib/site";
import { categoryToSlug } from "@/lib/taxonomy";
import { JobList } from "@/components/JobList";
import { JobBoard } from "@/components/JobBoard";
import { PopularLocations } from "@/components/PopularLocations";
import { GradientBoldCard } from "@/components/ui/gradient-bold-card";
import { WorldDotMatrix } from "@/components/ui/world-dot-matrix";
import { AnimatedNumber } from "@/components/ui/number-flow";
import { NewsletterForm } from "@/components/NewsletterForm";
import { RoleSubscribeForm } from "@/components/RoleSubscribeForm";
import { FaqSection } from "@/components/FaqSection";
import { AdSlot } from "@/components/AdSlot";
import { PinIcon, ArrowUpRightIcon, SearchIcon } from "@/components/icons";
import { siteJsonLd, jobListJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const HOME_FAQ = [
  {
    q: 'What does "truly location-independent" actually mean?',
    a: "You can work from a beach in Bali, a coffee shop in Berlin, or your couch in Ohio. No \u201cUS only\u201d fine print, no required time zone overlaps, and no local work visa hassles. If a listing restricts where you physically sit, it doesn\u2019t make our cut.",
  },
  {
    q: "Where do you find these listings?",
    a: "We pull directly from the source. Every hour, our system scans hiring platforms like Ashby, Greenhouse, Lever, and Workable. We then strip out the geo-restricted noise and tag each role with actual salary data, required skills, and perks so you don\u2019t have to hunt for the details.",
  },
  {
    q: "Does it cost anything to apply?",
    a: "Zero. We link you straight to the employer\u2019s official job board so you can apply directly. If a job site ever asks you for money to submit a resume, run.",
  },
  {
    q: "How frequently do you update the board?",
    a: "In real time or as soon as a company posts a qualifying global role and it passes our filter, it goes live on the site. No waiting for a weekly newsletter blast. However, sometime due to operations challenges listings can stay online while recruiters close the job profiles from there end.",
  },
];

// Category preview sections in the order the spec lists them.
const PREVIEW_ORDER = ["Backend", "Frontend", "Design", "Customer Support", "Sales & Marketing", "Management & Finance"] as const;

// Refresh live data periodically (ISR), matching the store's cache TTL.
export const revalidate = 1800;

// Cap on how many worldwide jobs hydrate the home browse feed — the home is a
// preview (full search + pagination live on /jobs), so keep the payload light.
const FEED_LIMIT = 120;

export default async function HomePage() {
  const jobs = await getAllJobs();
  const subscribers = getSubscriberCount();
  const companies = await getCompanies();
  const regionalCount = await getRegionalCount();
  const previews = await Promise.all(
    PREVIEW_ORDER.map(async (category) => ({ category, list: (await getJobsByCategory(category)).slice(0, 4) }))
  );

  const totalRoles = jobs.length + regionalCount;
  const stats = [
    [totalRoles, "Open roles", "Total remote roles listed right now."],
    [jobs.length, "Anywhere", "Fully location-independent — work from any country, no region or timezone limits."],
    [regionalCount, "Regional", "Remote, but limited to a specific country or region."],
  ] as const;

  const jsonLd = [...siteJsonLd(), jobListJsonLd(jobs, "Remote Jobs You Can Do From Anywhere")];

  // The home feed is a browse widget (renders ≤200 cards, deep search lives on
  // /jobs). Passing every worldwide job to the client <JobBoard> serialized the
  // full set — with unused description_html — into the RSC payload. Cap it and
  // drop description_html (JobCard never reads it) to keep the payload small.
  const feedJobs = jobs.slice(0, FEED_LIMIT).map((j) => ({ ...j, description_html: "" }));

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-white">
        <div
          className="pointer-events-none absolute inset-0 bg-meridian opacity-60 [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
          aria-hidden
        />
        {/* Dot-matrix world map, behind the hero column. Decorative and
            non-interactive; it sits under the content rather than beside it so
            the hero's centred layout is untouched at every width. Held at 52%,
            and masked at the edges so it fades into the page rather than
            ending on a hard rectangle. */}
        <div
          className="pointer-events-none absolute left-1/2 top-[62%] z-0 w-[min(1180px,168vw)] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_88%)]"
          style={{ opacity: 0.52 }}
          aria-hidden
        >
          <WorldDotMatrix />
        </div>
        {/* Scrim between the map and the words.
            Individual dots landing inside glyphs are what does the damage, and
            no opacity setting fixes that — at 40% the legend line under the
            stats still measured 2.9:1 against the dots behind it. So the page
            colour is laid back over the CENTRE COLUMN, where every piece of
            hero text lives, and released towards the edges. That is the right
            shape for this map: the text is in a narrow centred column and the
            continents are out at the sides, so the map keeps the part of
            itself worth seeing and gives up only the part nobody can read
            through. */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_44%_74%_at_50%_46%,#ffffff_0%,#ffffff_58%,rgba(255,255,255,0.6)_78%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(ellipse_44%_74%_at_50%_46%,#202020_0%,#202020_58%,rgba(32,32,32,0.6)_78%,rgba(32,32,32,0)_100%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-11 pb-12 md:pt-14 md:pb-14">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display font-bold leading-[1.08] tracking-[-0.02em] text-ink-900 text-[clamp(1.7rem,6.2vw,3rem)] text-balance">
              Remote Jobs You Can Do From Anywhere in the World
            </h1>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-500 text-[clamp(0.95rem,3.4vw,1.125rem)]">
              Truly remote jobs with no country, region, or timezone limits — plus remote roles based in your
              region. Pulled straight from company career pages.
            </p>

            {FEATURES.newsletter && (
              <div className="mx-auto mt-6 max-w-lg">
                <NewsletterForm buttonLabel="Get weekly jobs" />
                <p className="mt-2 text-xs text-ink-400">
                  Join {subscribers.toLocaleString("en-US")} subscribers · one email a week · no spam
                </p>
              </div>
            )}

            <GradientBoldCard className="mx-auto mt-8 max-w-md">
              <dl className="grid grid-cols-3 divide-x divide-ink-100 max-[360px]:gap-y-2 max-[360px]:divide-x-0">
                {stats.map(([value, label, hint]) => (
                  <div key={label} title={hint} className="min-w-0 cursor-help px-1.5 py-3.5 sm:px-2">
                    <dt className="font-display text-lg font-extrabold tabular-nums text-ink-900 sm:text-xl md:text-2xl">
                      <AnimatedNumber value={value} />
                    </dt>
                    <dd className="mt-0.5 flex min-h-[2em] items-center justify-center text-[10px] font-medium uppercase tracking-wide text-ink-400 sm:text-[11px] sm:tracking-wider">{label}</dd>
                  </div>
                ))}
              </dl>
            </GradientBoldCard>
            <p className="mx-auto mt-2.5 max-w-md text-[11px] leading-relaxed text-ink-400">
              <span className="font-semibold text-ink-500">Anywhere</span> = work from any country, no region or timezone limits ·{" "}
              <span className="font-semibold text-ink-500">Regional</span> = remote but region-locked.
            </p>

            {/* Role-targeted subscribe: choose a category + email, stored in
                Supabase. Sits below the stats panel; shown once a Supabase URL is set. */}
            {SUPABASE.enabled && (
              <div className="mx-auto mt-8 max-w-xl">
                <p className="mb-2.5 text-center text-sm font-semibold text-ink-700">Subscribe to our weekly newsletter</p>
                <div className="text-left">
                  <RoleSubscribeForm buttonLabel="Notify me" />
                </div>
                <p className="mt-2 text-center text-xs text-ink-400">
                  Pick a category — we&apos;ll email you when matching remote jobs go live.
                </p>
              </div>
            )}

            {/* Primary hero action: search (goes to the indexable /jobs page).
                Width matches the stats card above for a clean centered stack. */}
            <form action="/jobs" method="get" className="mx-auto mt-6 max-w-md">
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
                <input
                  type="search"
                  name="q"
                  placeholder="Search roles, companies…"
                  aria-label="Search remote jobs"
                  className="w-full rounded-xl border border-ink-200 bg-white py-3.5 pl-12 pr-14 text-ink-900 shadow-card placeholder:text-ink-400 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200 sm:pr-24"
                />
                <button type="submit" aria-label="Search" className="btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-2">
                  <SearchIcon className="h-4 w-4 sm:hidden" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* All Jobs feed — category / salary / type filters live in the rail.
            Search is omitted here: the hero already owns the search action. */}
        <section className="pt-10">
          <SectionHeader eyebrow="Latest roles" title="All remote jobs" href="/jobs" linkLabel="Browse all remote jobs" />
          <JobBoard jobs={feedJobs} showSearch={false} totalAvailable={jobs.length} pageSize={24} />
        </section>

        {regionalCount > 0 && (
          <Link
            href="/remote-regional-jobs"
            className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 transition hover:border-amber-300 hover:shadow-card sm:flex-row sm:items-center"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <PinIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-bold text-ink-900">Open to region-locked remote roles?</p>
                <p className="mt-0.5 text-sm text-ink-600">
                  {regionalCount.toLocaleString("en-US")} more remote jobs are restricted to a specific country or region.
                </p>
              </div>
            </div>
            <span className="inline-flex flex-shrink-0 items-center gap-1 text-sm font-semibold text-amber-800">
              Browse regional jobs <ArrowUpRightIcon className="h-4 w-4" />
            </span>
          </Link>
        )}

        <AdSlot />


        {/* Category previews */}
        {previews.map(({ category, list }) => {
          if (list.length === 0) return null;
          return (
            <section key={category} className="pt-12">
              <SectionHeader
                eyebrow="Category"
                title={category}
                href={`/remote-${categoryToSlug(category)}-jobs`}
                linkLabel={`All remote ${category} jobs`}
              />
              <JobList jobs={list} />
            </section>
          );
        })}

        {/* Location hubs, linked by the phrase people actually search. */}
        <section className="pt-16">
          <PopularLocations />
        </section>

        {/* FAQ */}
        <section className="py-16">
          <FaqSection items={HOME_FAQ} />
        </section>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    // Sticky so each section keeps its heading in view while scrolling its cards,
    // giving the long feed structure at depth. Offset by the site header height;
    // full-bleed background (-mx-4 px-4) so cards scroll cleanly underneath.
    <div className="sticky top-[72px] z-10 -mx-4 mb-5 flex flex-col items-start gap-1.5 border-b border-ink-100 bg-white/85 px-4 pb-3 pt-3 backdrop-blur sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink-900 md:text-2xl">{title}</h2>
      </div>
      <Link
        href={href}
        className="group inline-flex flex-shrink-0 items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        {linkLabel}
        <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
