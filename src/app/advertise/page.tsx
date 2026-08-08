import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllJobs, getSubscriberCount } from "@/lib/db";
import { FEATURES } from "@/lib/site";
import { GlobeIcon, WalletIcon, BuildingIcon, SparkIcon, CheckIcon, ArrowUpRightIcon, BriefcaseIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Advertise & Sponsor — Reach Remote Workers Worldwide",
  description:
    "Advertise to an engaged, global audience of remote-first professionals, or sponsor AnywhereJobs. Featured job listings, weekly-newsletter placements, and monthly website sponsorships.",
  alternates: { canonical: "/advertise" },
  robots: FEATURES.advertise ? undefined : { index: false, follow: false },
};

const tiers = [
  {
    name: "Community",
    price: "$99",
    period: "/mo",
    highlight: false,
    perks: ["Logo in the site footer", "Supporter badge on your posts", "Our public thanks"],
  },
  {
    name: "Growth",
    price: "$499",
    period: "/mo",
    highlight: true,
    perks: ["Everything in Community", "Logo on the homepage", "Monthly newsletter mention", "1 featured job / month"],
  },
  {
    name: "Partner",
    price: "Custom",
    period: "",
    highlight: false,
    perks: ["Everything in Growth", "Site-wide branding", "Dedicated newsletter feature", "Unlimited featured jobs"],
  },
];

export default async function AdvertisePage() {
  if (!FEATURES.advertise) notFound();
  const subs = getSubscriberCount();
  const jobs = await getAllJobs();

  const stats = [
    [subs.toLocaleString("en-US"), "newsletter subscribers"],
    ["Worldwide", "every continent, every timezone"],
    [jobs.length.toString(), "active listings driving traffic"],
    ["Remote-first", "a hard-to-reach, high-intent audience"],
  ] as const;

  const reasons = [
    { icon: <GlobeIcon className="h-5 w-5" />, title: "A truly global audience", body: "Our readers work from 100+ countries. If your product serves remote workers, freelancers, or distributed teams, they're already here." },
    { icon: <SparkIcon className="h-5 w-5" />, title: "High intent, low noise", body: "People come to make a career move — one of the most valuable moments to reach them. We keep the site ad-light so yours stands out." },
    { icon: <BuildingIcon className="h-5 w-5" />, title: "Trusted, curated context", body: "Every listing is hand-filtered and verified. Your brand sits beside quality, not spam — and inherits that trust." },
    { icon: <WalletIcon className="h-5 w-5" />, title: "Measurable value", body: "Clear placements with real click-through, not vanity impressions. Featured roles are pinned and visually distinct." },
  ];

  const products = [
    {
      name: "Featured job listing",
      price: "from $149",
      highlight: false,
      body: "Pin your role to the top of the homepage and its category page for 30 days, visually distinguished with a gold accent.",
      perks: ["Top of feed + category page", "Gold “Featured” badge", "Included in the weekly digest", "Live for 30 days"],
    },
    {
      name: "Newsletter placement",
      price: "from $299",
      highlight: true,
      body: "A dedicated slot in the Tuesday digest that lands directly in every subscriber's inbox — the highest-engagement surface we have.",
      perks: [`Reaches ${subs.toLocaleString("en-US")} subscribers`, "Headline + copy + link", "One sponsor per issue", "Performance recap after send"],
    },
    {
      name: "Site sponsorship",
      price: "custom",
      highlight: false,
      body: "Persistent brand presence across the site plus recurring newsletter features. For companies that want to own the category.",
      perks: ["Logo across the site", "Recurring newsletter features", "Unlimited featured roles", "Dedicated partner support"],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-meridian opacity-50 [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 pt-14 pb-14 text-center">
          <span className="eyebrow justify-center">Advertise &amp; Sponsor</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-ink-900 md:text-5xl">
            Reach remote workers, <span className="text-brand-600">everywhere</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-500">
            AnywhereJobs is where location-independent professionals come to make their next move. Advertise a
            product, take a slot in our weekly newsletter, or sponsor the site — all in one place.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="mailto:ads@anywherejobs.example" className="btn-primary">Get the media kit</a>
            <a href="#sponsorship" className="btn-ghost">See sponsorship tiers</a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4">
        {/* Stats */}
        <section className="pt-10">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="card p-5 text-center">
                <div className="font-display text-2xl font-extrabold text-brand-700">{value}</div>
                <div className="mt-1 text-xs leading-snug text-ink-500">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why advertise */}
        <section className="pt-16">
          <div className="text-center">
            <span className="eyebrow justify-center">Why it works</span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ink-900 md:text-3xl">The advantage of a focused audience</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="card flex gap-4 p-6">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">{r.icon}</div>
                <div>
                  <h3 className="font-display font-bold text-ink-900">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="pt-16">
          <div className="text-center">
            <span className="eyebrow justify-center">Ways to advertise</span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ink-900 md:text-3xl">Pick the placement that fits</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.name} className={`relative flex flex-col rounded-2xl border p-6 ${p.highlight ? "border-brand-300 bg-brand-50/40 shadow-lift ring-1 ring-brand-200" : "card"}`}>
                {p.highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-brand-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-black">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-bold text-ink-900">{p.name}</h3>
                <p className="mt-1 font-display text-2xl font-extrabold text-brand-700">{p.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{p.body}</p>
                <ul className="mt-4 flex-1 space-y-2.5 text-sm text-ink-700">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" /> {perk}
                    </li>
                  ))}
                </ul>
                <a href="mailto:ads@anywherejobs.example" className={`mt-6 ${p.highlight ? "btn-primary" : "btn-ghost"} w-full`}>
                  {p.name === "Site sponsorship" ? "Talk to us" : "Book this"}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Sponsorship tiers */}
        <section id="sponsorship" className="scroll-mt-24 pt-16">
          <div className="text-center">
            <span className="eyebrow justify-center">Sponsor the site</span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ink-900 md:text-3xl">Ongoing sponsorship</h2>
            <p className="mx-auto mt-3 max-w-2xl text-ink-500">
              We keep every listing genuinely location-independent so people anywhere can find real remote work.
              Sponsors keep the lights on — and get their brand in front of a worldwide, remote-first audience every day.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {tiers.map((t) => (
              <div key={t.name} className={`relative flex flex-col rounded-2xl border p-6 ${t.highlight ? "border-brand-300 bg-brand-50/40 shadow-lift ring-1 ring-brand-200" : "card"}`}>
                {t.highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-brand-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-black">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-bold text-ink-900">{t.name}</h3>
                <p className="mt-1 font-display text-3xl font-extrabold text-brand-700">
                  {t.price}<span className="text-lg text-ink-400">{t.period}</span>
                </p>
                <ul className="mt-4 flex-1 space-y-2.5 text-sm text-ink-700">
                  {t.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" /> {perk}
                    </li>
                  ))}
                </ul>
                <a href="mailto:sponsor@anywherejobs.example" className={`mt-6 ${t.highlight ? "btn-primary" : "btn-ghost"} w-full`}>
                  Become a sponsor
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="pt-16">
          <div className="text-center">
            <span className="eyebrow justify-center">How it works</span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ink-900 md:text-3xl">Live in three steps</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              [<BriefcaseIcon className="h-5 w-5" key="1" />, "Tell us your goal", "Share your product and what a win looks like. We'll recommend the right placement."],
              [<SparkIcon className="h-5 w-5" key="2" />, "We set it up", "Send us your copy and creative. We handle placement and go live — usually within 48 hours."],
              [<WalletIcon className="h-5 w-5" key="3" />, "See the results", "Get a clear performance recap. Renew, adjust, or scale up whenever you like."],
            ].map(([icon, title, body], i) => (
              <div key={i} className="card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">{icon}</div>
                  <span className="font-display text-sm font-bold text-ink-400">Step {i + 1}</span>
                </div>
                <h3 className="mt-3 font-display font-bold text-ink-900">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-12 text-center text-white">
            <div className="pointer-events-none absolute inset-0 bg-meridian opacity-10 [background-size:40px_40px]" aria-hidden />
            <div className="relative mx-auto max-w-xl">
              <h2 className="font-display text-2xl font-extrabold md:text-3xl">Ready to reach remote workers worldwide?</h2>
              <p className="mt-2 text-ink-300">Tell us what you&apos;re building — we&apos;ll send pricing and availability within a day.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href="mailto:ads@anywherejobs.example" className="btn-primary">
                  Get the media kit <ArrowUpRightIcon className="h-4 w-4" />
                </a>
                <Link href="/hiring" className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                  Post a featured job
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
