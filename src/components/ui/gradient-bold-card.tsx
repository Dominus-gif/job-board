import type { ReactNode } from "react";

/**
 * Gradient bold card — a panel with a band of colour travelling around its rim.
 *
 * Adapted from the 21st.dev component. The construction is the same — colour
 * underneath, a panel inset on top, content above that — but three things
 * differ, all for fit or for how it renders rather than for taste:
 *
 *  - It takes children instead of being a fixed 200x250 box centred in a
 *    full-screen flex container. That wrapper is demo scaffolding.
 *  - The colour is a tiled gradient translated across the card, not a blurred
 *    circle drifting behind it. All that is ever visible of the original's blob
 *    is the rim the panel does not cover, so what a reader sees is a band of
 *    colour going round the border — which a tiled gradient gives directly,
 *    with no filter to compute on a moving layer.
 *  - No backdrop-blur on the panel. At 95% opacity a twentieth of the backdrop
 *    shows through, so blurring it is invisible — but it is a backdrop-filter
 *    over an animating element, which is expensive on every frame.
 *
 * No "use client": no state, no effects, so it renders on the server and ships
 * no JavaScript.
 */
export function GradientBoldCard({
  children,
  className = "",
  contentClassName = "",
}: {
  children: ReactNode;
  /** Applied to the outer card (sizing, margins). */
  className?: string;
  /** Applied to the content layer above the panel. */
  contentClassName?: string;
}) {
  return (
    <div
      className={`gradient-bold-card relative overflow-hidden rounded-2xl shadow-[12px_12px_40px_#bebebe,-12px_-12px_40px_#ffffff] dark:shadow-[12px_12px_40px_#111,-12px_-12px_40px_#222] ${className}`}
    >
      {/* The colour. Position, size and gradient all live in globals.css so the
          animation and the paint it animates stay in one place. */}
      <span aria-hidden className="gradient-bold-card__blob" />

      {/* The panel. Its inset IS the visible gradient edge: 3px.
          The original's 2px outline is dropped. An outline draws OUTWARD from
          the element, so against a 5px inset it left 3px of gradient showing —
          but against 3px it left 1px, and the rim all but disappeared. With the
          rim this thin the gradient has to be the border, not share it. */}
      <span
        aria-hidden
        className="absolute inset-[3px] z-10 rounded-xl bg-white/95 dark:bg-black/70"
      />

      <div className={`relative z-20 ${contentClassName}`}>{children}</div>
    </div>
  );
}

export default GradientBoldCard;
