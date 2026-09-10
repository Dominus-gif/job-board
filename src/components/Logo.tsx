/**
 * GetRemoteJobsNow.com brand lockup — a three-line stacked wordmark:
 * "GET" on a green highlight, "REMOTE JOBS NOW." beneath it, red underline.
 *
 * Two variants are supplied rather than derived, so each is drawn correctly for
 * its surface instead of being filtered: the light-mode file has black type,
 * the dark-mode file white type, with the green and red accents identical in
 * both. Both are cropped from one shared bounding box, so the mark does not
 * shift by a pixel when the theme flips. Two cases:
 *  - Header: light surface normally, but it turns dark in dark mode
 *    (`.dark .bg-white/85`), so the mark swaps via `dark:` visibility.
 *  - Footer (`onDark`): always dark, regardless of theme → always the dark mark.
 */
import Image from "next/image";

// Intrinsic size of the trimmed lockup (public/brand-logo*.png).
const W = 1116;
const H = 512;
const ALT = "GetRemoteJobsNow.com — Work From Anywhere";
// Rendered at 48px tall ⇒ ~105px wide. The lockup stacks three lines, so it
// needs more height than the old single-line wordmark to stay legible; 48px
// keeps the header under the 76px offset the sticky toolbars are tuned to.
// Without `sizes`, next/image would ship a 1920px variant for a ~105px slot.
const SIZES = "112px";

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
        className={`h-[48px] w-auto ${className}`}
      />
    );
  }
  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* Colour mark on the light header; tonal dark mark once it goes dark. */}
      <Image src="/brand-logo.png" alt={ALT} width={W} height={H} sizes={SIZES} priority className="h-[48px] w-auto dark:hidden" />
      <Image src="/brand-logo-dark.png" alt="" aria-hidden width={W} height={H} sizes={SIZES} className="hidden h-[48px] w-auto dark:block" />
    </span>
  );
}
