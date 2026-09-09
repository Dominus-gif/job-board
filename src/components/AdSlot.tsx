"use client";

import { useEffect } from "react";
import { ADSENSE } from "@/lib/site";
import { useNearViewport } from "./useNearViewport";

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
 * The unit is reserved in the layout immediately but only requests a creative
 * once it is near the viewport, so a below-the-fold ad never competes with the
 * LCP element for bandwidth. `minHeight` keeps the reserved box from collapsing
 * and then expanding when the ad fills, which would otherwise cost CLS.
 *
 * Labelled "Advertisement" per AdSense policy.
 */
export function AdSlot({
  slot,
  format = "auto",
  className = "",
  minHeight = 280,
}: {
  slot?: string;
  format?: string;
  className?: string;
  /** Reserved height so filling the unit doesn't shift the page (CLS). */
  minHeight?: number;
}) {
  const unit = slot || ADSENSE.defaultSlot;
  const { ref, near } = useNearViewport<HTMLElement>();

  useEffect(() => {
    if (!ADSENSE.enabled || !unit || !near) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not ready yet */
    }
  }, [unit, near]);

  if (!ADSENSE.enabled || !unit) return null;

  return (
    <aside ref={ref} className={`my-8 text-center ${className}`} aria-label="Advertisement" style={{ minHeight }}>
      <span className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-ink-300">Advertisement</span>
      {/* Mounted only when near the viewport: adsbygoogle fetches as soon as the
          <ins> exists, so deferring the element is what actually defers the load. */}
      {near && (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE.client}
          data-ad-slot={unit}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </aside>
  );
}
