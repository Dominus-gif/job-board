"use client";

import { useEffect, useRef, type Ref } from "react";
import { useFormStatus } from "react-dom";
import { celebrate, stopConfetti } from "@/lib/confetti";

/**
 * The submit button for the subscribe forms, with the three-state label and the
 * confetti burst.
 *
 * Two things it deliberately does NOT do:
 *
 *  - It does not fire on click. The burst is triggered by `done`, which the
 *    parent sets from the server action's result, so a rejected email or a
 *    failed write never gets a celebration.
 *  - It does not restyle the button. The class stays `btn-primary`, so the
 *    resting control is pixel-identical to every other primary action on the
 *    site; the only visual additions are the squash on press and the burst,
 *    both of which the global prefers-reduced-motion rule already clamps.
 */
export function ConfettiSubmitButton({
  label,
  pendingLabel,
  doneLabel,
  done = false,
  className = "",
  ref,
}: {
  /** State one — the resting label, e.g. "Notify me". */
  label: string;
  /** State two — while the server action is in flight, e.g. "Saving…". */
  pendingLabel: string;
  /** State three — once it succeeded, e.g. "Subscribed". */
  doneLabel: string;
  /** Set by the parent when the action came back ok. Drives state three and the burst. */
  done?: boolean;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
}) {
  const { pending } = useFormStatus();
  const innerRef = useRef<HTMLButtonElement>(null);
  const celebrated = useRef(false);

  // Leave nothing running if the page navigates away mid-burst — but only if
  // this button is the one that fired. A page can hold two subscribe forms, and
  // unmounting the quiet one must not cut short the other one's burst.
  useEffect(
    () => () => {
      if (celebrated.current) stopConfetti();
    },
    []
  );

  useEffect(() => {
    if (!done || celebrated.current) return;
    celebrated.current = true;
    const el = innerRef.current;
    celebrate(el);
    // The halo is a one-shot animation; take the class off again afterwards so
    // the button is left in exactly the state it started in.
    if (!el) return;
    el.classList.add("btn-celebrate");
    // Name-checked: the press squash is also an animation on this element, and
    // its end must not cut the halo short.
    const off = (e: AnimationEvent) => {
      if (e.animationName !== "btn-celebrate") return;
      el.classList.remove("btn-celebrate");
      el.removeEventListener("animationend", off);
    };
    el.addEventListener("animationend", off);
    return () => el.removeEventListener("animationend", off);
  }, [done]);

  const setRef = (node: HTMLButtonElement | null) => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as { current: HTMLButtonElement | null }).current = node;
  };

  return (
    <button
      ref={setRef}
      type="submit"
      disabled={pending}
      // Restart the squash on every press, including rapid ones: removing the
      // class and reading offsetWidth forces the reflow that lets it replay.
      onClick={(e) => {
        const el = e.currentTarget;
        el.classList.remove("btn-pop");
        void el.offsetWidth;
        el.classList.add("btn-pop");
      }}
      className={`btn-primary shrink-0 disabled:opacity-60 ${className}`}
    >
      {pending ? pendingLabel : done ? doneLabel : label}
    </button>
  );
}
