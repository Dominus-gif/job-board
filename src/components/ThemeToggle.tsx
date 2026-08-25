"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

/** The one place that decides the theme: saved choice wins, else system pref. */
function desiredDark(): boolean {
  try {
    const t = localStorage.getItem("theme");
    if (t === "dark") return true;
    if (t === "light") return false;
  } catch {
    /* ignore */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

/**
 * Keeps <html class="dark"> in sync with the single source of truth
 * (localStorage → system preference) for the whole session. The inline
 * `themeInitScript` sets the class before first paint; this re-asserts it if a
 * later render/hydration ever clobbers it, and reacts to OS + cross-tab changes.
 * Mount it once in the root layout.
 */
export function ThemeGuard() {
  useEffect(() => {
    const sync = () => applyTheme(desiredDark());
    sync();

    // Re-assert if anything strips/flips the class after the fact.
    const mo = new MutationObserver(() => {
      if (document.documentElement.classList.contains("dark") !== desiredDark()) sync();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onMedia = () => {
      // Only follow the OS when the user hasn't pinned a choice.
      try { if (localStorage.getItem("theme")) return; } catch { /* ignore */ }
      sync();
    };
    mql.addEventListener("change", onMedia);
    const onStorage = (e: StorageEvent) => { if (e.key === "theme") sync(); };
    window.addEventListener("storage", onStorage);

    return () => { mo.disconnect(); mql.removeEventListener("change", onMedia); window.removeEventListener("storage", onStorage); };
  }, []);

  return null;
}

/**
 * Light/dark theme toggle. The initial theme is applied by a blocking script in
 * the layout (see `themeInitScript`) to avoid a flash; this just flips it and
 * persists the choice to localStorage.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    // Write the source of truth first so the ThemeGuard observer stays consistent.
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    applyTheme(next);
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-600 transition hover:bg-ink-50 hover:text-ink-900"
    >
      {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  );
}

/** Inline script string that sets the theme class before first paint. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();`;
