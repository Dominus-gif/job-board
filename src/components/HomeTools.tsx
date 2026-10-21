import Link from "next/link";
import { TOOLS, TOOL_GROUPS } from "@/lib/tools";

/**
 * The free tools, grouped the way the tools index groups them. Each one runs in
 * the browser or on the board's own data; none needs an account.
 */
export function HomeTools() {
  const groups = TOOL_GROUPS.map((g) => ({ ...g, tools: TOOLS.filter((t) => t.group === g.group) })).filter((g) => g.tools.length);
  if (!groups.length) return null;

  return (
    <section className="pt-14" aria-labelledby="home-tools-title">
      <span className="eyebrow">Free tools</span>
      <h2 id="home-tools-title" className="mt-2 font-display text-xl font-semibold tracking-tight text-ink-900 md:text-2xl">
        {TOOLS.length} tools that do the checking and the maths
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-ink-500">
        No account and nothing to install. The data tools read the live board; the rest run in your browser.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <li key={g.group} className="flex flex-col rounded-xl border border-ink-100 bg-white p-4">
            <span className="font-display text-[15px] font-semibold text-ink-900">{g.group}</span>
            <p className="mt-1 text-sm leading-relaxed text-ink-500">{g.blurb}</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {g.tools.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tools/${t.slug}`} className="text-ink-800 underline-offset-2 hover:text-brand-600 hover:underline">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm">
        <Link href="/tools" className="font-medium text-brand-600 hover:text-brand-700">
          All free tools →
        </Link>
      </p>
    </section>
  );
}
