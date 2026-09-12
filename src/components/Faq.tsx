import Link from "next/link";
import type { FaqItem } from "@/lib/landing";

/**
 * A direct, subtle FAQ: every question and answer shown plainly, separated by
 * hairline dividers — no accordion, no dropdown arrows, no coloured chrome.
 *
 * An answer is plain text so it can be reused verbatim in FAQPage JSON-LD;
 * anything an answer wants to link to is listed under it instead.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-ink-100 border-t border-ink-100">
      {items.map((item, i) => (
        <div key={i} className="py-5 first:pt-0">
          <h3 className="font-display text-[15px] font-semibold text-ink-900">{item.q}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">{item.a}</p>
          {item.links && item.links.length > 0 && (
            <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              {item.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[14px] font-semibold text-brand-600 underline-offset-2 transition hover:text-brand-700 hover:underline"
                >
                  {l.label} →
                </Link>
              ))}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
