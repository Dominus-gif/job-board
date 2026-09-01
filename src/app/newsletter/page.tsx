import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSubscriberCount } from "@/lib/db";
import { FEATURES } from "@/lib/site";
import { NewsletterForm } from "@/components/NewsletterForm";
import { GlobeIcon, WalletIcon, BuildingIcon, CheckIcon, CalendarIcon, SparkIcon, LogoMark } from "@/components/icons";

export const metadata: Metadata = {
  title: "The Work-From-Anywhere Newsletter",
  description:
    "A free weekly email with the best new truly location-independent jobs — hand-filtered, salary-tagged, and delivered every Tuesday. No spam, unsubscribe anytime.",
  alternates: { canonical: "/newsletter" },
  robots: FEATURES.newsletter ? undefined : { index: false, follow: false },
};

const inside = [
  { icon: <GlobeIcon className="h-5 w-5" />, title: "Only worldwide roles", body: "Every job passes our strict filter — no country, region, or timezone gate. Never a “remote (US only)” in your inbox." },
  { icon: <WalletIcon className="h-5 w-5" />, title: "Salaries up front", body: "Ranges are parsed and shown where disclosed, so you can skip the guessing and the “competitive pay” filler." },
  { icon: <BuildingIcon className="h-5 w-5" />, title: "New companies first", body: "Fresh employers the moment they start hiring globally — you hear about them before the boards fill up." },
  { icon: <SparkIcon className="h-5 w-5" />, title: "Curated, not scraped-and-dumped", body: "A short, readable digest of the best roles of the week — not a wall of hundreds of listings." },
];

const promises = [
  "One email a week, every Tuesday",
  "100% free, forever",
  "One-click unsubscribe, no hard feelings",
  "We never sell or share your address",
];

export default function NewsletterPage() {
  if (!FEATURES.newsletter) notFound();
  const subscribers = getSubscriberCount();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-white">
        <div
          className="pointer-events-none absolute inset-0 bg-meridian opacity-50 [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-2xl px-4 pt-14 pb-14 text-center">
          <span className="eyebrow justify-center">The weekly digest</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-ink-900 md:text-5xl">
            Remote jobs worth reading, once a week
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-500">
            Every Tuesday we hand-pick the best new roles you can do from anywhere on earth — filtered, salary-tagged,
            and boiled down to a five-minute read. No noise, no spam.
          </p>
          <div className="mx-auto mt-7 max-w-lg">
            <NewsletterForm buttonLabel="Subscribe free" />
            <p className="mt-2.5 text-xs text-ink-400">
              Joined by <strong className="text-ink-600">{subscribers.toLocaleString("en-US")}</strong> remote workers · unsubscribe anytime
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4">
        {/* What's inside */}
        <section className="pt-14">
          <div className="text-center">
            <span className="eyebrow justify-center">What&apos;s inside</span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ink-900 md:text-3xl">Every issue, in five minutes</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {inside.map((f) => (
              <div key={f.title} className="card flex gap-4 p-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-ink-900">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sample preview + promises */}
        <section className="grid grid-cols-1 gap-8 pt-14 lg:grid-cols-2 lg:items-center">
          {/* Email digest preview (no OS window chrome). */}
          <div className="card overflow-hidden">
            <div className="bg-gradient-to-br from-brand-700 to-brand-500 px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-display text-sm font-bold">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/15 p-1"><LogoMark /></span>
                  getremotejobsnow.com Weekly
                </span>
                <span className="text-xs font-medium text-white/75">Tuesday · Issue #48</span>
              </div>
              <p className="mt-3 font-display text-lg font-extrabold leading-snug">12 new work-from-anywhere roles this week</p>
            </div>
            <div className="space-y-3 p-5">
              {[
                ["Senior Backend Engineer", "GitLab", "$120k–$193k"],
                ["Product Designer", "Doist", "€70k–€95k"],
                ["Customer Support Lead", "Hotjar", "€40k–€55k"],
              ].map(([role, co, pay]) => (
                <div key={role} className="flex items-center justify-between gap-3 rounded-xl border border-ink-100 px-4 py-3 transition hover:border-brand-200">
                  <div>
                    <p className="font-semibold text-ink-900">{role}</p>
                    <p className="text-sm text-ink-500">{co}</p>
                  </div>
                  <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-100">
                    {pay}
                  </span>
                </div>
              ))}
              <p className="pt-1 text-center text-xs text-ink-400">…and nine more, every Tuesday.</p>
            </div>
            <div className="border-t border-ink-100 bg-ink-50/60 px-5 py-3 text-center text-xs text-ink-400">
              You’re reading a sample of the getremotejobsnow.com weekly digest.
            </div>
          </div>

          <div>
            <span className="eyebrow">Our promise</span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ink-900 md:text-3xl">No spam. Ever.</h2>
            <p className="mt-3 text-ink-500">
              The digest exists to save you time, not fill your inbox. Here&apos;s exactly what you&apos;re signing up for:
            </p>
            <ul className="mt-5 space-y-3">
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-3 text-ink-800">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-12 text-center text-white">
            <div className="pointer-events-none absolute inset-0 bg-meridian opacity-10 [background-size:40px_40px]" aria-hidden />
            <div className="relative mx-auto max-w-lg">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <CalendarIcon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 font-display text-2xl font-extrabold md:text-3xl">Get the next issue</h2>
              <p className="mt-2 text-ink-300">Free every Tuesday. Join {subscribers.toLocaleString("en-US")} remote workers.</p>
              <div className="mt-6">
                <NewsletterForm buttonLabel="Subscribe free" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
