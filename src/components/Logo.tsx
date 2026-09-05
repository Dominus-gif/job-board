/**
 * GetRemoteJobsNow.com brand lockup (globe-on-laptop mark + wordmark +
 * "Work From Anywhere" tagline), rendered from the supplied raster artwork.
 *
 * The artwork is a monochrome lockup, so it needs a light-on-dark variant
 * wherever it sits on a dark surface. `brand-logo-dark.png` is NOT a flat white
 * silhouette (that collapsed the globe, swoosh and laptop into one blob) — it's
 * a tonal remap: luminance inverted and compressed into a dark-friendly range,
 * so the internal structure survives. Two cases:
 *  - Header: light surface normally, but it turns dark in dark mode
 *    (`.dark .bg-white/85`), so the mark swaps via `dark:` visibility.
 *  - Footer (`onDark`): always dark, regardless of theme → always the dark mark.
 */
import Image from "next/image";

// Intrinsic size of the trimmed lockup (public/brand-logo*.png).
const W = 1322;
const H = 244;
const ALT = "GetRemoteJobsNow.com — Work From Anywhere";
// Rendered at 42px tall ⇒ ~228px wide. Without `sizes`, next/image picks a
// candidate off the 1322px intrinsic width and ships the 1920px variant for a
// 228px slot; this keeps it to a sensibly-sized (retina-safe) render.
const SIZES = "240px";

export function Logo({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  if (onDark) {
    return (
      <Image
        src="/brand-logo-dark.png"
        alt={ALT}
        width={W}
        height={H}
        sizes={SIZES}
        priority
        className={`h-[42px] w-auto ${className}`}
      />
    );
  }
  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* Colour mark on the light header; tonal dark mark once it goes dark. */}
      <Image src="/brand-logo.png" alt={ALT} width={W} height={H} sizes={SIZES} priority className="h-[42px] w-auto dark:hidden" />
      <Image src="/brand-logo-dark.png" alt="" aria-hidden width={W} height={H} sizes={SIZES} className="hidden h-[42px] w-auto dark:block" />
    </span>
  );
}
