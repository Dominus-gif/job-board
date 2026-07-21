"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/landing";

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-ink-50/50"
              aria-expanded={isOpen}
            >
              <span className="font-display font-semibold text-ink-900">{item.q}</span>
              <span
                className={`grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition ${isOpen ? "rotate-45" : ""}`}
                aria-hidden
              >
                +
              </span>
            </button>
            {isOpen && <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
