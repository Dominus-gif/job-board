"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ShareIcon } from "./icons";
import { buildShareNetworks, LinkIcon } from "./shareData";

/**
 * A share icon button that opens a "Share this job" popover.
 *
 * The panel is rendered through a PORTAL to <body>, and that is the whole
 * point of this component's shape. It lives inside a job card, and the card is
 * `overflow-hidden rounded-xl` — so the panel used to be broken in two
 * different ways at once:
 *
 *   desktop  the panel was `position: absolute`, which the card's overflow
 *            clipped. What survived the clip was then painted over by the
 *            card's own salary rail, so it read as appearing *behind* the
 *            listing.
 *   phone    the panel was `position: fixed`, which escapes the clip but is
 *            positioned against the viewport — so it opened pinned to the
 *            bottom of the screen, under whatever listing happened to be
 *            there, instead of near the button that opened it.
 *
 * A portal takes the panel out of the card entirely, so no ancestor can clip
 * it or paint above it. On a wide screen it is then placed against the
 * button's own position; on a narrow one it stays a bottom sheet, which is the
 * right pattern there. Scrolling closes it rather than dragging it around,
 * since the button it belongs to is itself moving up the page.
 */

const PANEL_W = 256;
const GAP = 8;
const MOBILE_MAX = 640;

export function SharePopover({ slug, title }: { slug: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");
  const [mounted, setMounted] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setOrigin(window.location.origin);
  }, []);

  const url = `${origin}/jobs/${slug}`;

  const place = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const isNarrow = window.innerWidth < MOBILE_MAX;
    setNarrow(isNarrow);
    if (isNarrow) return;
    const r = btn.getBoundingClientRect();
    // Right-aligned to the button, and kept inside the viewport on both axes.
    const left = Math.min(Math.max(GAP, r.right - PANEL_W), window.innerWidth - PANEL_W - GAP);
    const below = r.bottom + GAP;
    const panelH = panelRef.current?.offsetHeight ?? 224;
    const top = below + panelH > window.innerHeight - GAP ? Math.max(GAP, r.top - GAP - panelH) : below;
    setPos({ top, left });
  }, []);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    // The button scrolls with the list, so following it would mean tracking
    // every frame. Closing is both cheaper and what people expect.
    const onScroll = () => setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", place);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll, { capture: true } as never);
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

  const networks = buildShareNetworks(url, title);

  async function copy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url); // link only
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  const panel = (
    <>
      {/* Backdrop. On a narrow screen it dims; on a wide one it is an
          invisible catcher so a click anywhere dismisses the panel. */}
      <div
        className={`fixed inset-0 z-[90] ${narrow ? "bg-black/40" : ""}`}
        aria-hidden
        onClick={() => setOpen(false)}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Share this job"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="fixed z-[91] rounded-xl border border-ink-100 bg-white p-4 shadow-lift"
        style={
          narrow
            ? { left: 16, right: 16, bottom: 16 }
            : { top: pos?.top ?? -9999, left: pos?.left ?? -9999, width: PANEL_W }
        }
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
    </>
  );

  return (
    <>
      <button
        ref={btnRef}
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
        className="flex h-11 w-11 items-center justify-center rounded-md border border-ink-300 bg-white text-ink-500 transition hover:border-ink-400 hover:bg-ink-50 hover:text-ink-900"
      >
        <ShareIcon />
      </button>
      {mounted && open ? createPortal(panel, document.body) : null}
    </>
  );
}
