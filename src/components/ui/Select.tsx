"use client";

import { useEffect, useId, useRef, useState } from "react";
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
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

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

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-label={ariaLabel}
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className={`absolute z-50 mt-1.5 max-h-72 min-w-full overflow-auto rounded-xl border border-ink-100 bg-white p-1 shadow-lg focus:outline-none ${
            align === "end" ? "right-0" : "left-0"
          }`}
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
        </ul>
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
