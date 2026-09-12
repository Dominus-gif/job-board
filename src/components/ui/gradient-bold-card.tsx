import type { ReactNode } from "react";

/**
 * Gradient bold card — a glass panel over a drifting, blurred colour blob.
 *
 * Adapted from the 21st.dev component in three ways, all for fit rather than
 * taste:
 *
 *  - It takes children instead of being a fixed 200x250 box centred in a
 *    full-screen flex container. The original is a demo; what we need is the
 *    treatment wrapped around content that already exists.
 *  - The blob is sized in percentages of the card, not a fixed 150px, so the
 *    effect survives a wide short box on desktop and a narrower one on a phone.
 *    A fixed blob would have sat in one corner of a 448x92 panel.
 *  - The keyframes live in globals.css rather than an inline <style> element.
 *    Inlining them ships a duplicate <style> per instance and re-inserts it on
 *    every render; the animation is static, so it belongs in the stylesheet.
 *
 * No "use client": this is markup and CSS with no state or effects, so it
 * renders on the server and ships no JavaScript.
 */
export function GradientBoldCard({
  children,
  className = "",
  contentClassName = "",
}: {
  children: ReactNode;
  /** Applied to the outer card (sizing, margins). */
  className?: string;
  /** Applied to the content layer above the glass. */
  contentClassName?: string;
}) {
  return (
    <div
      className={`gradient-bold-card relative overflow-hidden rounded-2xl shadow-[12px_12px_40px_#bebebe,-12px_-12px_40px_#ffffff] dark:shadow-[12px_12px_40px_#111,-12px_-12px_40px_#222] ${className}`}
    >
      {/* The colour. Blurred and drifting behind everything else. */}
      <span
        aria-hidden
        className="gradient-bold-card__blob absolute left-1/2 top-1/2 z-0 h-[180%] w-[55%] rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 blur-[28px]"
      />

      {/* The glass. Inset by 5px so the blob reads as a live gradient edge
          around the panel rather than a flat border. */}
      <span
        aria-hidden
        className="absolute inset-[5px] z-10 rounded-xl bg-white/95 outline outline-2 outline-white backdrop-blur-[24px] dark:bg-black/70 dark:outline-gray-700"
      />

      <div className={`relative z-20 ${contentClassName}`}>{children}</div>
    </div>
  );
}

export default GradientBoldCard;
