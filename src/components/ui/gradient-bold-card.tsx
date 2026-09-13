import type { ReactNode } from "react";

/**
 * Gradient bold card — a panel with a band of colour travelling around its rim.
 *
 * Adapted from the 21st.dev component. The construction is the same — colour
 * underneath, a panel inset by 5px on top, content above that — but three
 * things differ, all for fit or for how it renders rather than for taste:
 *
 *  - It takes children instead of being a fixed 200x250 box centred in a
 *    full-screen flex container. That wrapper is demo scaffolding.
 *  - The colour is a scrolling gradient, not a blurred circle being moved.
 *    All that is ever visible of the original's blob is the 5px rim the panel
 *    does not cover, so what a reader sees is a band of colour going round the
 *    border — which a background-position animation reproduces without asking
 *    the compositor to carry a filtered, moving layer. On phones that layer
 *    flickered; see globals.css. Same three colours.
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

      {/* The panel. Its inset is the width of the visible gradient edge — 4px,
          reduced 20% from the original's 5px. */}
      <span
        aria-hidden
        className="absolute inset-[4px] z-10 rounded-xl bg-white/95 outline outline-2 outline-white dark:bg-black/70 dark:outline-gray-700"
      />

      <div className={`relative z-20 ${contentClassName}`}>{children}</div>
    </div>
  );
}

export default GradientBoldCard;
