import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import { ArrowUpRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Free Remote Work Tools",
  description:
    "Free tools for remote job seekers — a remote salary converter and a timezone-overlap finder to help you compare offers and plan work across the US and Europe.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="eyebrow">Tools</span>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900">Free remote work tools</h1>
      <p className="mt-2 max-w-2xl text-ink-500">
        Simple, free tools to help you compare remote offers and plan work across timezones — no sign-up needed.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TOOLS.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="group rounded-xl border border-ink-100 bg-white p-5 transition-colors hover:border-ink-200 hover:bg-ink-50"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink-900">{t.title}</h2>
              <ArrowUpRightIcon className="h-4 w-4 text-ink-400 transition group-hover:text-ink-900" />
            </div>
            <p className="mt-1.5 text-sm text-ink-500">{t.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
