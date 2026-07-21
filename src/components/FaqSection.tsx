import Link from "next/link";
import type { FaqItem } from "@/lib/landing";
import { Faq } from "./Faq";

/** Beautiful two-column FAQ: intro + contact CTA on the left, accordion right. */
export function FaqSection({
  items,
  title = "Frequently asked questions",
  subtitle = "Everything you need to know about how truly location-independent jobs work here.",
}: {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-5 lg:gap-14">
      <div className="lg:col-span-2">
        <span className="eyebrow">FAQ</span>
        <h2 className="mt-2 font-display text-2xl font-extrabold text-ink-900 md:text-3xl">{title}</h2>
        <p className="mt-3 leading-relaxed text-ink-500">{subtitle}</p>
        <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
          <p className="font-display font-bold text-ink-900">Still have questions?</p>
          <p className="mt-1 text-sm text-ink-500">We usually reply within one business day.</p>
          <Link href="/contact" className="btn-primary mt-4">Contact us</Link>
        </div>
      </div>
      <div className="lg:col-span-3">
        <Faq items={items} />
      </div>
    </div>
  );
}
