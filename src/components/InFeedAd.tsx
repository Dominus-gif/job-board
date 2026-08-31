"use client";

import { useEffect } from "react";
import { ADSENSE } from "@/lib/site";

/**
 * A native-style, in-feed AdSense unit sized to sit inline with job/company
 * cards so it reads as part of the list (not a banner). Renders nothing until a
 * publisher id + slot are configured, so the feed is unaffected in development
 * and before AdSense approval — no empty gap is left when disabled.
 *
 * Labelled "Sponsored" per AdSense policy for in-feed placements.
 */
export function InFeedAd({ slot, className = "" }: { slot?: string; className?: string }) {
  const unit = slot || ADSENSE.inFeedSlot || ADSENSE.defaultSlot;

  useEffect(() => {
    if (!ADSENSE.enabled || !unit) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      /* AdSense not ready yet */
    }
  }, [unit]);

  if (!ADSENSE.enabled || !unit) return null;

  return (
    <div
      className={`h-full overflow-hidden rounded-xl border border-dashed border-ink-200 bg-ink-50/50 p-5 ${className}`}
      aria-label="Sponsored"
    >
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-ink-400">Sponsored</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE.client}
        data-ad-slot={unit}
        data-ad-format="fluid"
        data-ad-layout="in-article"
        data-full-width-responsive="true"
      />
    </div>
  );
}
