"use client";

import { useState } from "react";
import { buildShareNetworks, LinkIcon } from "./shareData";

/**
 * Share a job to major networks. Each network's message is tailored to its
 * character limit (X ≤ 250 incl. link, etc.) in `buildShareNetworks`. The Copy
 * button copies the job link only — no message.
 */
export function ShareButtons({ url, title, message }: { url: string; title: string; message?: string }) {
  const [copied, setCopied] = useState(false);
  const networks = buildShareNetworks(url, title, message);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url); // link only
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {networks.map((n) => (
        <a
          key={n.label}
          href={n.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={n.label}
          title={n.label}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-100 bg-white text-ink-500 transition hover:border-ink-300 hover:text-ink-800"
        >
          {n.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        title="Copy job link"
        className="flex h-9 items-center gap-1.5 rounded-lg border border-ink-100 bg-white px-3 text-sm font-medium text-ink-600 transition hover:border-ink-300 hover:text-ink-900"
      >
        <LinkIcon /> {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
