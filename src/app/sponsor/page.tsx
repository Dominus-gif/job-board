import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor",
  description: "Sponsor AnywhereJobs and support the mission of surfacing truly location-independent work.",
  alternates: { canonical: "/sponsor" },
};

const tiers = [
  { name: "Community", price: "$99/mo", perks: ["Logo in the footer", "Shout-out in our Discord", "Supporter badge"] },
  { name: "Growth", price: "$499/mo", perks: ["Everything in Community", "Logo on the homepage", "Monthly newsletter mention", "1 featured job / month"] },
  { name: "Partner", price: "Custom", perks: ["Everything in Growth", "Site-wide branding", "Dedicated newsletter feature", "Unlimited featured jobs"] },
];

export default function SponsorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-ink-900">Sponsor AnywhereJobs</h1>
      <p className="mt-3 max-w-2xl text-ink-700">
        We keep every listing genuinely location-independent so people anywhere can find real remote work. Sponsors keep
        the lights on — and get their brand in front of a worldwide, remote-first audience.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {tiers.map((t, i) => (
          <div key={t.name} className={`rounded-2xl border p-6 ${i === 1 ? "border-brand-300 bg-brand-50/60 ring-1 ring-brand-200" : "border-slate-200 bg-white"}`}>
            <h2 className="text-lg font-bold text-ink-900">{t.name}</h2>
            <p className="mt-1 text-2xl font-extrabold text-brand-700">{t.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-800">
              {t.perks.map((p) => (
                <li key={p} className="flex gap-2"><span className="text-brand-600">✓</span>{p}</li>
              ))}
            </ul>
            <a href="mailto:sponsor@anywherejobs.example"
              className="mt-6 block rounded-lg bg-brand-600 px-4 py-2.5 text-center font-semibold text-white hover:bg-brand-700">
              Become a sponsor
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
