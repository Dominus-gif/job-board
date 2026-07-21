"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/landing";

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`overflow-hidden rounded-2xl border transition-colors ${
              isOpen ? "border-brand-200 bg-white shadow-card" : "border-ink-100 bg-white hover:border-brand-200"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display font-semibold text-ink-900">{item.q}</span>
              <span
                className={`grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border transition ${
                  isOpen ? "rotate-180 border-brand-300 bg-brand-50 text-brand-600" : "border-ink-200 text-ink-400"
                }`}
                aria-hidden
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
            <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 leading-relaxed text-ink-600">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
