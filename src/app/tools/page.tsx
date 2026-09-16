import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS, TOOL_GROUPS } from "@/lib/tools";
import { abs } from "@/lib/site";
import { ArrowUpRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Free Remote Work Tools",
  description:
    "17 free tools for remote job seekers: check a posting for scams or hidden office rules, compare salaries and offers across countries, plan across time zones and track applications.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free remote work tools",
    itemListElement: TOOLS.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.title, url: abs(`/tools/${t.slug}`) })),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <span className="eyebrow">Tools</span>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">Free remote work tools</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">
        {TOOLS.length} free tools for finding, checking and comparing remote work. They run in your browser, need no sign-up, and the ones built on our
        own listings update every time the board does.
      </p>

      <div className="mt-10 space-y-12">
        {TOOL_GROUPS.map(({ group, blurb }) => {
          const tools = TOOLS.filter((t) => t.group === group);
          return (
            <section key={group} aria-labelledby={`group-${group}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink-100 pb-3">
                <h2 id={`group-${group}`} className="font-display text-xl font-bold tracking-tight text-ink-900">
                  {group}
                </h2>
                <p className="text-sm text-ink-500">{blurb}</p>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {tools.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tools/${t.slug}`}
                    className="group rounded-xl border border-ink-100 bg-white p-5 transition-colors hover:border-ink-200 hover:bg-ink-50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold text-ink-900">{t.title}</h3>
                      <ArrowUpRightIcon className="h-4 w-4 flex-shrink-0 text-ink-400 transition group-hover:text-ink-900" />
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{t.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
