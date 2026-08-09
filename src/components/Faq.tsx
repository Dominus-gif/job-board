import type { FaqItem } from "@/lib/landing";

/**
 * A direct, subtle FAQ: every question and answer shown plainly, separated by
 * hairline dividers — no accordion, no dropdown arrows, no coloured chrome.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-ink-100 border-t border-ink-100">
      {items.map((item, i) => (
        <div key={i} className="py-5 first:pt-0">
          <h3 className="font-display text-[15px] font-semibold text-ink-900">{item.q}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">{item.a}</p>
        </div>
      ))}
    </div>
  );
}
