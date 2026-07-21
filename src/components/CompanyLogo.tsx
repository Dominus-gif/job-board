"use client";

import { useState } from "react";
import { placeholderLogo } from "@/lib/pipeline/logo";

/**
 * Company logo with graceful fallback: if the imported logo URL fails to load
 * (e.g. the logo provider has no record), it swaps to a generated initial-based
 * placeholder so no listing ever shows a broken image.
 */
export function CompanyLogo({
  src,
  name,
  size = 52,
  className = "",
}: {
  src: string;
  name: string;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const finalSrc = failed || !src ? placeholderLogo(name) : src;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={finalSrc}
      alt={`${name} logo`}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
