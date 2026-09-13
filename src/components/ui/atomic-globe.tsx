"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

/**
 * Slowly rotating globe with a marker per hiring city.
 *
 * NOT the Framer AtomicGlobe module. That one imports `three` (20MB unpacked)
 * AND Framer's own canvas runtime — `addPropertyControls`, `RenderTarget`,
 * `useIsStaticRenderer` — which only exist inside the Framer editor, so it
 * cannot run in a Next app at all. It is also served from a remote URL, which
 * a bundler cannot resolve and which would make framerusercontent.com a
 * runtime dependency of the homepage. This is the same effect built on `cobe`
 * (19KB), which is what globes of this kind generally are underneath.
 *
 * Deliberately careful about cost, because it is WebGL on a homepage:
 *   - nothing is created until the canvas is actually on screen
 *   - rendering stops when it scrolls away or the tab is hidden
 *   - devicePixelRatio is capped at 2; a phone's 3x would trebles the fill for
 *     no visible gain on a decorative background
 *   - prefers-reduced-motion stops the rotation and leaves the globe still
 */

export interface GlobeMarker {
  label: string;
  lat: number;
  lng: number;
}

/** Cities this board hires into most, west to east. */
export const DEFAULT_MARKERS: GlobeMarker[] = [
  { label: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { label: "Seattle", lat: 47.6062, lng: -122.3321 },
  { label: "Toronto", lat: 43.6532, lng: -79.3832 },
  { label: "New York", lat: 40.7128, lng: -74.006 },
  { label: "London", lat: 51.5074, lng: -0.1278 },
  { label: "Paris", lat: 48.8566, lng: 2.3522 },
  { label: "Zurich", lat: 47.3769, lng: 8.5417 },
  { label: "Berlin", lat: 52.52, lng: 13.405 },
];

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AtomicGlobe({
  markers = DEFAULT_MARKERS,
  className = "",
}: {
  markers?: GlobeMarker[];
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dark, setDark] = useState(false);
  const [visible, setVisible] = useState(false);

  // Follow the theme. The site toggles a class on <html>, so watch that rather
  // than prefers-color-scheme, which would ignore a manual choice.
  useEffect(() => {
    const read = () => setDark(document.documentElement.classList.contains("dark"));
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  // Only run while it is on screen.
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !visible) return;

    let phi = 4.2; // starts with the Atlantic facing the viewer
    let width = 0;
    let frame = 0;
    let stopped = false;
    const still = prefersReducedMotion();

    const onResize = () => {
      width = canvas.offsetWidth;
    };
    onResize();
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(2, window.devicePixelRatio || 1),
      width: width * 2,
      height: width * 2,
      phi,
      theta: 0.25,
      dark: dark ? 1 : 0,
      diffuse: dark ? 1.2 : 1.1,
      mapSamples: 12000,
      mapBrightness: dark ? 4 : 6,
      baseColor: dark ? [0.28, 0.28, 0.31] : [0.82, 0.82, 0.85],
      markerColor: [0.14, 0.51, 0.89],
      glowColor: dark ? [0.16, 0.16, 0.19] : [0.95, 0.95, 0.97],
      // Small. These are eight cities on a decorative background, not a
      // data visualisation — at 0.055 they read as blobs over the headline.
      markers: markers.map((m) => ({ location: [m.lat, m.lng] as [number, number], size: 0.028 })),
    });

    // cobe v2 drives itself through `update()` rather than an onRender hook, so
    // the rotation is our own loop. Stopped entirely when still or hidden —
    // there is no point holding a WebGL frame loop for a background decoration
    // nobody is looking at.
    const tick = () => {
      if (!stopped) {
        if (!still) phi += 0.0022;
        globe.update({ phi, width: width * 2, height: width * 2 });
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // Give up the GPU while the tab is in the background.
    const onVisibility = () => {
      stopped = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Fade in once the first frame has been drawn, so it never pops.
    const reveal = window.setTimeout(() => canvas.style.setProperty("opacity", "1"), 120);

    return () => {
      window.clearTimeout(reveal);
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      globe.destroy();
    };
  }, [dark, visible, markers]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`aspect-square w-full opacity-0 transition-opacity duration-700 ${className}`}
    />
  );
}

export default AtomicGlobe;
