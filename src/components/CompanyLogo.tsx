"use client";

import { useMemo, useState } from "react";
import { logoCandidates, placeholderLogo } from "@/lib/pipeline/logo";

/**
 * Company logo with a robust fallback chain. It tries, in order: a feed-supplied
 * logo → unavatar (aggregated brand logos) → Google favicon → a generated
 * initial badge. If one fails to load it advances to the next, so every listing
 * shows a recognizable mark for the hiring company and never a broken image.
 */
export function CompanyLogo({
  src,
  name,
  domain,
  size = 52,
  className = "",
}: {
  src?: string;
  name: string;
  domain?: string;
  size?: number;
  className?: string;
}) {
  const candidates = useMemo(
    () => logoCandidates({ domain, name, provided: src }),
    [domain, name, src]
  );
  const [i, setI] = useState(0);
  const finalSrc = i < candidates.length ? candidates[i] : placeholderLogo(name);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={finalSrc}
      src={finalSrc}
      alt={`${name} logo`}
      width={size}
      height={size}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setI((x) => x + 1)}
      className={className}
    />
  );
}
