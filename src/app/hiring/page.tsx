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

      <div className="mt-10">
        <HiringForm />
      </div>
    </div>
  );
}
