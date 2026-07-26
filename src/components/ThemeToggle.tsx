"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

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
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
      className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-600 transition hover:bg-ink-50 hover:text-ink-900"
    >
      {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  );
}

/** Inline script string that sets the theme class before first paint. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();`;
