"use client";

import { useEffect, useRef, useState } from "react";
import { ShareIcon } from "./icons";
import { buildShareNetworks, shareCopyText, LinkIcon } from "./shareData";

/**
 * A share icon button that opens a small "Share this job" popover with all the
 * social networks + copy — mirroring the panel on the job detail page.
 */
export function SharePopover({ slug, title }: { slug: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => setOrigin(window.location.origin), []);
  const url = `${origin}/jobs/${slug}`;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const networks = buildShareNetworks(url, title);

  async function copy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(shareCopyText(url, title));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Share job"
        title="Share"
        className="flex h-8 w-8 items-center justify-center rounded-md border border-ink-100 bg-white text-ink-400 transition hover:border-ink-200 hover:text-ink-700"
      >
        <ShareIcon />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Share this job"
          onClick={(e) => e.preventDefault()}
          className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-ink-100 bg-white p-4 shadow-lift"
        >
          <p className="font-display text-sm font-semibold text-ink-900">Share this job</p>
          <p className="mt-0.5 text-xs text-ink-500">Know someone who works from anywhere? Send it their way.</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {networks.map((n) => (
              <a
                key={n.label}
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={n.label}
                title={n.label}
                onClick={(e) => e.stopPropagation()}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-100 bg-white text-ink-500 transition hover:border-ink-300 hover:text-ink-800"
              >
                {n.icon}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={copy}
            className="mt-2.5 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-ink-100 bg-white text-sm font-medium text-ink-600 transition hover:border-ink-300 hover:text-ink-900"
          >
            <LinkIcon /> {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      )}
    </div>
  );
}
