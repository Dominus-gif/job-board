"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckIcon } from "@/components/icons";

export type SelectOption = { value: string; label: string; disabled?: boolean };

/**
 * Fully custom, theme-matched dropdown (replaces the native <select>, whose
 * popup can't be styled beyond colours). Renders a button + a listbox panel
 * built from the site's own surfaces, so it looks identical in light and dark.
 *
 * Accessible: role=listbox/option, aria-activedescendant, full keyboard support
 * (Up/Down/Home/End/Enter/Space/Esc + type-ahead), outside-click + Esc to close.
 * When `name` is set it also writes the value to a hidden input so it submits
 * inside a plain <form> (e.g. the server-action subscribe form).
 *
 * THE PANEL IS PORTALLED TO <body>, ON PURPOSE. As an absolutely positioned
 * child it was clipped by any ancestor with `overflow: hidden`, which is how
 * the subscribe band's category list ended up sliced in half by the hero
 * section's decorative background. A portalled, fixed-position panel cannot be
 * clipped or stacked under anything, wherever a <Select> is dropped in. It
 * follows the button on scroll and resize, and flips above the button when
 * there is more room there. tests/dropdown.spec.ts guards all of this.
 */
export function Select({
  value,
  onValueChange,
  options,
  placeholder = "Select…",
  ariaLabel,
  name,
  required,
  className = "",
  buttonClassName = "",
  align = "start",
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  ariaLabel?: string;
  name?: string;
  required?: boolean;
  className?: string;
  buttonClassName?: string;
  align?: "start" | "end";
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState<{ top: number; left: number; width: number; maxHeight: number; flip: boolean } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const typeahead = useRef<{ str: string; t: number }>({ str: "", t: 0 });
  const baseId = useId();

  const selected = options.find((o) => o.value === value);
  const enabledIndexes = options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0);

  // Open with the selected (or first enabled) option active.
  function openMenu() {
    const sel = options.findIndex((o) => o.value === value && !o.disabled);
    setActive(sel >= 0 ? sel : enabledIndexes[0] ?? 0);
    setOpen(true);
  }

  function commit(i: number) {
    const opt = options[i];
    if (!opt || opt.disabled) return;
    onValueChange(opt.value);
    setOpen(false);
    btnRef.current?.focus();
  }

  function moveActive(dir: 1 | -1) {
    if (!enabledIndexes.length) return;
    const pos = enabledIndexes.indexOf(active);
    const next = enabledIndexes[(pos + dir + enabledIndexes.length) % enabledIndexes.length];
    setActive(next);
  }

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      const inRoot = rootRef.current?.contains(t);
      const inPanel = listRef.current?.contains(t);
      if (!inRoot && !inPanel) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  /**
   * Where the panel goes. Measured from the button rather than inherited from a
   * positioned ancestor, so the panel is unaffected by whatever the button is
   * nested inside.
   */
  const place = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const GAP = 6;
    const EDGE = 8; // breathing room against the viewport edge
    const MAX = 288; // the old max-h-72, kept as the ceiling
    const below = window.innerHeight - r.bottom - GAP - EDGE;
    const above = r.top - GAP - EDGE;
    // Flip up only when below is genuinely cramped and above is roomier.
    const flip = below < 180 && above > below;
    setPos({
      top: flip ? r.top - GAP : r.bottom + GAP,
      left: align === "end" ? r.right : r.left,
      width: r.width,
      maxHeight: Math.max(120, Math.min(MAX, flip ? above : below)),
      flip,
    });
  }, [align]);

  useLayoutEffect(() => {
    if (!open) return;
    place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onMove = () => place();
    // Capture phase so the panel also follows a scrolling container, not just
    // the window.
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [open, place]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown": e.preventDefault(); moveActive(1); break;
      case "ArrowUp": e.preventDefault(); moveActive(-1); break;
      case "Home": e.preventDefault(); setActive(enabledIndexes[0] ?? 0); break;
      case "End": e.preventDefault(); setActive(enabledIndexes[enabledIndexes.length - 1] ?? 0); break;
      case "Enter": case " ": e.preventDefault(); commit(active); break;
      case "Escape": e.preventDefault(); setOpen(false); btnRef.current?.focus(); break;
      case "Tab": setOpen(false); break;
      default:
        if (e.key.length === 1) {
          const now = Date.now();
          typeahead.current.str = now - typeahead.current.t > 600 ? e.key : typeahead.current.str + e.key;
          typeahead.current.t = now;
          const q = typeahead.current.str.toLowerCase();
          const hit = options.findIndex((o) => !o.disabled && o.label.toLowerCase().startsWith(q));
          if (hit >= 0) setActive(hit);
        }
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/* Hidden input so the value posts inside a plain <form>. Note: `required`
          is intentionally NOT set here — browsers refuse to submit (and error)
          on a required control that isn't focusable; validation is enforced by
          the caller / server action instead. */}
      {name && <input type="hidden" name={name} value={value} />}
      <button
        ref={btnRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-required={required || undefined}
        aria-label={ariaLabel}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-left text-ink-900 transition hover:border-ink-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 ${buttonClassName}`}
      >
        <span className={`truncate ${selected ? "" : "text-ink-400"}`}>{selected ? selected.label : placeholder}</span>
        <ChevronIcon className={`h-4 w-4 flex-shrink-0 text-ink-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && pos && typeof document !== "undefined" &&
        createPortal(
        <ul
          ref={listRef}
          role="listbox"
          aria-label={ariaLabel}
          tabIndex={-1}
          onKeyDown={onKeyDown}
          data-select-panel=""
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            minWidth: pos.width,
            maxWidth: `calc(100vw - 16px)`,
            maxHeight: pos.maxHeight,
            transform: `translate(${align === "end" ? "-100%" : "0"}, ${pos.flip ? "-100%" : "0"})`,
          }}
          className="z-[60] overflow-auto rounded-xl border border-ink-100 bg-white p-1 shadow-lg focus:outline-none"
        >
          {options.map((o, i) => {
            const isSelected = o.value === value;
            const isActive = i === active;
            return (
              <li
                key={o.value || `opt-${i}`}
                id={`${baseId}-${i}`}
                data-idx={i}
                role="option"
                aria-selected={isSelected}
                aria-disabled={o.disabled || undefined}
                onMouseEnter={() => !o.disabled && setActive(i)}
                onClick={() => commit(i)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm ${
                  o.disabled
                    ? "cursor-default text-ink-400"
                    : isActive
                    ? "bg-ink-100 text-ink-900"
                    : "text-ink-700"
                } ${isSelected ? "font-semibold text-ink-900" : ""}`}
              >
                <span className="truncate">{o.label}</span>
                {isSelected && <CheckIcon className="h-4 w-4 flex-shrink-0 text-brand-600" />}
              </li>
            );
          })}
        </ul>,
        document.body,
      )}
    </div>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
