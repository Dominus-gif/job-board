"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

/**
 * A count that animates to its value on first paint.
 *
 * NumberFlow animates when the value CHANGES, and these figures never change —
 * they are baked in at build time. So the component mounts holding zero and is
 * handed the real number on the next frame; the transition it plays in response
 * is the count-up.
 *
 * The server renders the final number, not zero: `suppressHydrationWarning` on
 * the wrapper lets the first client render differ, which means the correct
 * figure is in the HTML for anyone without JavaScript, and for Google.
 *
 * Under prefers-reduced-motion it simply renders the number.
 */
export function AnimatedNumber({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  const [shown, setShown] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimate(false);
      setShown(value);
      return;
    }
    // Next frame, so the mount at zero is committed and the change animates.
    const id = requestAnimationFrame(() => setShown(value));
    return () => cancelAnimationFrame(id);
  }, [value]);

  if (!animate) {
    return <span className={className}>{value.toLocaleString("en-US")}</span>;
  }

  return (
    <span className={className} suppressHydrationWarning>
      <NumberFlow value={shown} trend={1} locales="en-US" willChange />
    </span>
  );
}

export default AnimatedNumber;
