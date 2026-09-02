import type { Metadata } from "next";
import { HiringForm } from "@/components/HiringForm";

export const metadata: Metadata = {
  title: "Post a Remote Job",
  description: "Hire from a global talent pool. Post a truly location-independent job — featured placements skip the queue.",
  alternates: { canonical: "/hiring" },
};

export default function HiringPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-ink-900">Post a job</h1>
      <p className="mt-3 text-ink-700">
        Reach candidates who work from anywhere in the world. Submissions are reviewed by our team, then published —
        featured listings are pinned to the top of the feed and every category page.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
        {[
          ["Global reach", "Seen by candidates on every continent"],
          ["Fast review", "Most jobs approved within 24 hours"],
          ["Featured option", "Pin your role to the top of every page"],
        ].map(([title, body]) => (
          <div key={title} className="card p-4">
            <div className="font-display font-bold text-ink-900">{title}</div>
            <div className="mt-1 text-xs leading-relaxed text-ink-500">{body}</div>
          </div>
        ))}
      </div>

      {/* Clear pricing so the CTA isn't a dead end. */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <div className="flex items-baseline justify-between">
            <span className="font-display font-bold text-ink-900">Standard</span>
            <span className="font-display text-lg font-extrabold text-ink-900">Free</span>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-600">
            <li>Listed on the main board &amp; category pages</li>
            <li>Reviewed &amp; published, usually within 24h</li>
            <li>Direct “Apply” link to your own site</li>
          </ul>
        </div>
        <div className="card border-brand-200 p-5 ring-1 ring-inset ring-brand-100">
          <div className="flex items-baseline justify-between">
            <span className="font-display font-bold text-ink-900">Featured</span>
            <span className="font-display text-lg font-extrabold text-brand-700">Paid upgrade</span>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-600">
            <li>Everything in Standard</li>
            <li>Pinned to the top of the feed &amp; every category page</li>
            <li>Highlighted card with a “Featured” badge for 30 days</li>
          </ul>
          <p className="mt-3 text-xs text-ink-500">
            Tick “Feature this listing” below — we’ll confirm pricing and arrange payment when we review your
            submission.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <HiringForm />
      </div>
    </div>
  );
}
