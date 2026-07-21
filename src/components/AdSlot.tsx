"use client";

import { useEffect } from "react";
import { ADSENSE } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * A Google AdSense display unit. Renders nothing until a publisher id is set
 * (NEXT_PUBLIC_ADSENSE_CLIENT), so the layout is unaffected during development
 * and before AdSense approval. After approval, pass the ad-unit `slot` id.
 *
 * Labelled "Advertisement" per AdSense policy.
 */
export function AdSlot({
  slot,
  format = "auto",
  className = "",
}: {
  slot?: string;
  format?: string;
  className?: string;
}) {
  const unit = slot || ADSENSE.defaultSlot;

  useEffect(() => {
    if (!ADSENSE.enabled || !unit) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not ready yet */
    }
  }, [unit]);

  if (!ADSENSE.enabled || !unit) return null;

  return (
    <aside className={`my-8 text-center ${className}`} aria-label="Advertisement">
      <span className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-ink-300">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE.client}
        data-ad-slot={unit}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
