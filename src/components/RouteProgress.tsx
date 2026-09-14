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
 * The bar starts from the gesture, not from the route change: a route change is
 * the END of the wait, so starting there would only ever show the bar after the
 * slow part is over. Three gestures move this document, and all three are
 * covered:
 *
 *   - a click on a link            (capture-phase click listener)
 *   - a search box submit          (capture-phase submit listener)
 *   - back / forward               (popstate)
 *
 * plus `startRouteProgress()` for anything that navigates from code, such as
 * the sort dropdown's `router.push`.
 *
 * It finishes on whichever signal lands first —
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
/**
 * Back/forward is served from the router's own cache and is normally instant.
 * It also arrives with the address bar ALREADY moved, so signal 2 above is
 * gone and only the pathname can finish it — which a query-only step back
 * never changes. Hence a much tighter cap for those: worst case the bar sits
 * for a moment, rather than the twelve seconds the click path can afford.
 */
const POP_SAFETY_MS = 3_000;

/** Elements that handle their own click and navigate nothing. */
const INERT_CONTROLS =
  "button, [role='button'], [role='dialog'], [role='menu'], [role='listbox'], input, select, textarea, label";

export function RouteProgress() {
  const pathname = usePathname();
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);

  const running = useRef(false);
  const shown = useRef(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fade = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** The last address we know this document rendered, for the popstate guard. */
  const here = useRef("");

  const finish = useCallback(() => {
    if (!running.current) return;
    running.current = false;
    here.current = window.location.pathname + window.location.search;
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

  const begin = useCallback(
    (opts: { urlAlreadyMoved?: boolean } = {}) => {
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

      // Back/forward has already rewritten the address bar by the time we hear
      // about it, so the URL is no longer evidence that the navigation landed.
      const watchUrl = !opts.urlAlreadyMoved;
      const from = window.location.href;
      let elapsed = 0;

      tick.current = setInterval(() => {
        elapsed += TICK_MS;
        if (watchUrl && window.location.href !== from) {
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

      safety.current = setTimeout(finish, opts.urlAlreadyMoved ? POP_SAFETY_MS : SAFETY_MS);
    },
    [finish]
  );

  /** Listener-shaped wrapper: never let an Event object reach `begin`'s options. */
  const start = useCallback(() => begin(), [begin]);

  // Completion: the committed route changed.
  const seen = useRef(pathname);
  useEffect(() => {
    here.current = window.location.pathname + window.location.search;
    if (pathname === seen.current) return;
    seen.current = pathname;
    finish();
  }, [pathname, finish]);

  // Start: any gesture that will actually navigate this document.
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
      if (target.closest(INERT_CONTROLS)) return;

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

      begin();
    }

    /**
     * The search boxes on the homepage, /jobs, /find-remote-jobs and the 404
     * page are plain `<form action="/jobs" method="get">`. Submitting one is a
     * full document navigation with no link click anywhere in it, and the
     * submit button is deliberately ignored by the click listener above — so
     * without this, searching was the one gesture on the site that produced no
     * feedback at all.
     *
     * Narrow on purpose: a real URL action, same origin, and GET. That is the
     * shape of a form that moves the document. It excludes the server-action
     * subscribe forms (POST, no URL action) and the contact form (handled in
     * JS with preventDefault), neither of which navigates anywhere.
     */
    function onSubmit(e: Event) {
      const form = e.target;
      if (!(form instanceof HTMLFormElement)) return;
      if ((form.getAttribute("method") || "get").toLowerCase() !== "get") return;
      const formTarget = form.getAttribute("target");
      if (formTarget && formTarget !== "_self") return;

      const action = form.getAttribute("action");
      if (!action) return;
      let url: URL;
      try {
        url = new URL(action, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      begin();
    }

    /**
     * Back and forward. The address bar has already moved by the time this
     * fires, so `begin` is told not to treat a URL change as the finish line.
     * A step that only moves the hash loads nothing, and gets no bar.
     */
    function onPop() {
      const next = window.location.pathname + window.location.search;
      if (here.current && next === here.current) return;
      here.current = next;
      begin({ urlAlreadyMoved: true });
    }

    // Capture phase: next/link calls preventDefault() on every internal click
    // to take over the navigation, and React's own stopPropagation() in the
    // card buttons keeps those events from reaching document at all. Listening
    // during capture sidesteps both — we see the event first, and decide from
    // the element itself whether it is a navigation.
    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    window.addEventListener("popstate", onPop);
    window.addEventListener(START_EVENT, start);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener(START_EVENT, start);
    };
  }, [begin, start]);

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
