"use client";

import { useEffect, useState } from "react";

/** The visitor's own clock. Blank on the server, which can't know their zone. */
export function LocalClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setTime(new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums text-[color:var(--lb-ink)]">{time ?? "--:--"}</span>;
}

/** The address that failed, read after mount because the 404 page is prerendered once for every path. */
export function RequestedPath() {
  const [path, setPath] = useState<string | null>(null);
  useEffect(() => {
    try {
      setPath(decodeURI(window.location.pathname));
    } catch {
      setPath(window.location.pathname);
    }
  }, []);
  return (
    <span title={path ?? undefined}>
      <span className="sr-only">Requested page: </span>
      {path ?? "The page you asked for"}
    </span>
  );
}

const ReloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
    <path d="M20 12a8 8 0 1 1-2.34-5.66" />
    <path d="M20 4v5h-5" />
  </svg>
);

/**
 * A full reload rather than a client re-render: the usual cause of a one-off
 * failure is a page cached from before a deploy, which only a fresh fetch fixes.
 */
export function ReloadButton({ label = "Reload page" }: { label?: string }) {
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      className="btn-primary lost-reload"
      aria-busy={busy}
      onClick={() => {
        setBusy(true);
        window.location.reload();
      }}
    >
      <span className={busy ? "lost-spin" : undefined}>
        <ReloadIcon />
      </span>
      {busy ? "Reloading…" : label}
    </button>
  );
}
