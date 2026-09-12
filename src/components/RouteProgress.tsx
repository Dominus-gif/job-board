"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Top-of-page navigation progress bar.
 *
 * Pages here are server-rendered and most live in KV rather than the browser,
 * so a click on a listing can spend a visible moment fetching before anything
 * on screen changes. With no indicator the click reads as ignored, and people
 * click again.
 *
 * The bar starts from the click, not from the route change: a route change is
 * the END of the wait, so starting there would only ever show the bar after the
 * slow part is over. It finishes on whichever signal lands first —
 *
 *   1. the pathname changing (the normal case, fires the instant React commits)
 *   2. the URL changing at all (covers query-only moves like the sort dropdown)
 *   3. a safety timeout, so a cancelled or failed navigation can never strand it
 *
 * Nothing global is monkey-patched; the URL is polled on the same timer that
 * advances the bar.
 */

/** Fired on `window` to start the bar for navigations that aren't link clicks. */
const START_EVENT = "routeprogress:start";

/** Start the bar by hand — for `router.push()` and friends. */
export function startRouteProgress() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(START_EVENT));
}

/** Under this, the navigation is effectively instant and a bar is just a flash. */
const SHOW_AFTER_MS = 120;
/** Poll/advance cadence. Doubles as how late a query-only finish can be. */
const TICK_MS = 120;
/** Time the finished bar stays at 100% before fading out. */
const FADE_MS = 280;
const SAFETY_MS = 12_000;

export function RouteProgress() {
  const pathname = usePathname();
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);

  const running = useRef(false);
  const shown = useRef(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fade = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = useCallback(() => {
    if (!running.current) return;
    running.current = false;
    if (tick.current) { clearInterval(tick.current); tick.current = null; }
    if (safety.current) { clearTimeout(safety.current); safety.current = null; }
    // Resolved before the bar ever appeared — drop it without a flash.
    if (!shown.current) return;
    setValue(100);
    fade.current = setTimeout(() => {
      shown.current = false;
      setVisible(false);
      setValue(0);
    }, FADE_MS);
  }, []);

  const start = useCallback(() => {
    if (running.current) return;
    running.current = true;

    // A new navigation during the previous one's fade-out: clear it first so
    // the bar restarts from the left instead of snapping back from 100%.
    if (fade.current) {
      clearTimeout(fade.current);
      fade.current = null;
      shown.current = false;
      setVisible(false);
      setValue(0);
    }

    const from = window.location.href;
    let elapsed = 0;

    tick.current = setInterval(() => {
      elapsed += TICK_MS;
      if (window.location.href !== from) {
        finish();
        return;
      }
      if (!shown.current) {
        if (elapsed < SHOW_AFTER_MS) return;
        shown.current = true;
        setVisible(true);
        setValue(10);
        return;
      }
      // Ease toward 90% and stall there. The bar must never claim to be done
      // before the page actually is.
      setValue((v) => (v >= 90 ? v : v + Math.max(0.5, (90 - v) * 0.08)));
    }, TICK_MS);

    safety.current = setTimeout(finish, SAFETY_MS);
  }, [finish]);

  // Completion: the committed route changed.
  const seen = useRef(pathname);
  useEffect(() => {
    if (pathname === seen.current) return;
    seen.current = pathname;
    finish();
  }, [pathname, finish]);

  // Start: any click that will actually navigate this document.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as Element | null;
      if (!target?.closest) return;
      // Controls and overlays that sit INSIDE a card link — bookmark, share,
      // the share sheet, the sort listbox. They handle their own click and
      // navigate nothing, but `closest("a")` would still find the card around
      // them. Checked structurally rather than via defaultPrevented because
      // this listener runs in the capture phase (see below), before any of
      // those handlers have had a chance to run.
      if (
        target.closest(
          "button, [role='button'], [role='dialog'], [role='menu'], [role='listbox'], input, select, textarea, label"
        )
      ) {
        return;
      }

      const a = target.closest("a");
      if (!(a instanceof HTMLAnchorElement) || a.hasAttribute("download")) return;
      if (a.target && a.target !== "_self") return;

      const href = a.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      // Off-site, mailto: and tel: all fail this; so does a link to where we
      // already are, which would otherwise leave the bar waiting on nothing.
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      start();
    }

    // Capture phase: next/link calls preventDefault() on every internal click
    // to take over the navigation, and React's own stopPropagation() in the
    // card buttons keeps those events from reaching document at all. Listening
    // during capture sidesteps both — we see the click first, and decide from
    // the element itself whether it is a navigation.
    document.addEventListener("click", onClick, true);
    window.addEventListener(START_EVENT, start);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(START_EVENT, start);
    };
  }, [start]);

  // Unmount (and Fast Refresh) must not leave timers running.
  useEffect(
    () => () => {
      if (tick.current) clearInterval(tick.current);
      if (safety.current) clearTimeout(safety.current);
      if (fade.current) clearTimeout(fade.current);
    },
    []
  );

  return (
    <>
      <div className="route-progress" data-visible={visible ? "true" : "false"} aria-hidden>
        <span className="route-progress__bar" style={{ width: `${value}%` }} />
      </div>
      {/* The bar is decorative; this is the same news for anyone not looking. */}
      <span role="status" aria-live="polite" className="sr-only">
        {visible ? "Loading page" : ""}
      </span>
    </>
  );
}
