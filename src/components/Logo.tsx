/**
 * GetRemoteJobsNow.com brand lockup (globe-on-laptop mark + wordmark +
 * "Work From Anywhere" tagline), rendered from the supplied raster artwork.
 *
 * The artwork is a dark, mostly-monochrome lockup, so it needs a light-on-dark
 * variant wherever it sits on a dark surface. Two cases:
 *  - Header: white in light mode, but the header itself turns dark in dark mode
 *    (`.dark .bg-white/85`), so the colour mark is swapped for the white mark
 *    via `dark:` visibility.
 *  - Footer (`onDark`): always dark, regardless of theme → always the white mark.
 */
import Image from "next/image";

// Intrinsic size of the trimmed lockup (public/brand-logo*.png).
const W = 1322;
const H = 244;
const ALT = "GetRemoteJobsNow.com — Work From Anywhere";

export function Logo({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  if (onDark) {
    return (
      <Image
        src="/brand-logo-white.png"
        alt={ALT}
        width={W}
        height={H}
        priority
        className={`h-8 w-auto ${className}`}
      />
    );
  }
  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* Colour mark for the light header; white mark once the header goes dark. */}
      <Image src="/brand-logo.png" alt={ALT} width={W} height={H} priority className="h-8 w-auto dark:hidden" />
      <Image src="/brand-logo-white.png" alt="" aria-hidden width={W} height={H} className="hidden h-8 w-auto dark:block" />
    </span>
  );
}
