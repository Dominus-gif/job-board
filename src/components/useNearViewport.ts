"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the element has come within `rootMargin` of the viewport.
 *
 * Ad units call adsbygoogle.push() on mount, which pulls down the creative
 * immediately — including for units far below the fold, competing with the LCP
 * image for bandwidth. Gating the push on proximity keeps above-the-fold
 * rendering fast while still filling the unit before the reader reaches it.
 *
 * Falls back to eager (true) where IntersectionObserver is unavailable, so a
 * unit never silently fails to fill.
 */
export function useNearViewport<T extends HTMLElement>(rootMargin = "600px") {
  const ref = useRef<T | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (near) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near, rootMargin]);

  return { ref, near };
}
