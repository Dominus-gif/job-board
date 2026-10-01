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

// Intrinsic size of the files we actually ship. The masters are 1116x512, but
// images.unoptimized is on for Cloudflare (see CLOUDFLARE.md), so next/image
// hands the browser whatever file it is given: a 57KB PNG for a ~105px slot.
// These are the same lockup resized to twice the rendered height and saved as
// WebP, which costs about 6KB instead.
const W = 209;
const H = 96;
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
        src="/brand-logo-dark-96.webp"
        alt={ALT}
        width={W}
        height={H}
        sizes={SIZES}
        /* The footer mark is below the fold on every page; `priority` here was
           making it compete for bandwidth with the element that decides LCP. */
        loading="lazy"
        className={`h-[48px] w-auto ${className}`}
      />
    );
  }
  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* Colour mark on the light header; tonal dark mark once it goes dark. */}
      <Image src="/brand-logo-96.webp" alt={ALT} width={W} height={H} sizes={SIZES} priority className="h-[48px] w-auto dark:hidden" />
      <Image src="/brand-logo-dark-96.webp" alt="" aria-hidden width={W} height={H} sizes={SIZES} className="hidden h-[48px] w-auto dark:block" />
    </span>
  );
}
