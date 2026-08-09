"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckIcon } from "../icons";

const SETS = {
  lower: "abcdefghijkmnopqrstuvwxyz",
  upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  number: "23456789",
  symbol: "!@#$%^&*()-_=+[]{}?.,:;",
};
const AMBIGUOUS = { lower: "l", upper: "IO", number: "01", symbol: "" };

interface Opts {
  length: number;
  upper: boolean;
  lower: boolean;
  number: boolean;
  symbol: boolean;
  ambiguous: boolean; // include ambiguous chars (l, I, O, 0, 1)
}

/** Cryptographically-secure random password from a character pool. */
function generate(o: Opts): string {
  let pool = "";
  (["lower", "upper", "number", "symbol"] as const).forEach((k) => {
    if (o[k]) pool += SETS[k] + (o.ambiguous ? AMBIGUOUS[k] : "");
  });
  if (!pool) return "";
  const out: string[] = [];
  const rnd = new Uint32Array(o.length);
  crypto.getRandomValues(rnd);
  for (let i = 0; i < o.length; i++) out.push(pool[rnd[i] % pool.length]);
  return out.join("");
}

function strength(pw: string, poolSize: number) {
  const bits = pw.length * Math.log2(Math.max(poolSize, 1));
  if (bits < 45) return { label: "Weak", pct: 25, cls: "bg-red-400" };
  if (bits < 70) return { label: "Fair", pct: 55, cls: "bg-amber-400" };
  if (bits < 100) return { label: "Strong", pct: 80, cls: "bg-emerald-500" };
  return { label: "Very strong", pct: 100, cls: "bg-emerald-500" };
}

const check =
  "h-4 w-4 rounded border-ink-300 text-ink-900 focus:ring-ink-300";

export function PasswordGenerator() {
  const [opts, setOpts] = useState<Opts>({ length: 20, upper: true, lower: true, number: true, symbol: true, ambiguous: false });
  const [pw, setPw] = useState("");
  const [copied, setCopied] = useState(false);

  const regen = useCallback(() => setPw(generate(opts)), [opts]);
  useEffect(() => { regen(); }, [regen]);

  const poolSize =
    (opts.lower ? SETS.lower.length + (opts.ambiguous ? 1 : 0) : 0) +
    (opts.upper ? SETS.upper.length + (opts.ambiguous ? 2 : 0) : 0) +
    (opts.number ? SETS.number.length + (opts.ambiguous ? 2 : 0) : 0) +
    (opts.symbol ? SETS.symbol.length : 0);
  const s = strength(pw, poolSize);

  function set<K extends keyof Opts>(k: K, v: Opts[K]) {
    setOpts((o) => {
      const next = { ...o, [k]: v };
      const anyType = next.upper || next.lower || next.number || next.symbol;
      return anyType ? next : o; // keep at least one character type on
    });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(pw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* ignore */ }
  }

  return (
    <div className="rounded-xl border border-ink-100 bg-white p-6 shadow-card">
      {/* Password display */}
      <div className="flex items-stretch gap-2">
        <output className="flex min-h-[3rem] flex-1 items-center overflow-x-auto rounded-lg border border-ink-200 bg-ink-50 px-4 font-mono text-lg tracking-wide text-ink-900">
          {pw || "—"}
        </output>
        <button type="button" onClick={regen} aria-label="Regenerate" title="Regenerate"
          className="flex w-11 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-600 transition hover:bg-ink-50 hover:text-ink-900">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" />
          </svg>
        </button>
        <button type="button" onClick={copy}
          className="btn-primary w-24">
          {copied ? <><CheckIcon className="h-4 w-4" /> Copied</> : "Copy"}
        </button>
      </div>

      {/* Strength */}
      <div className="mt-4 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
          <div className={`h-full rounded-full transition-all ${s.cls}`} style={{ width: `${s.pct}%` }} />
        </div>
        <span className="w-24 text-right text-sm font-medium text-ink-600">{s.label}</span>
      </div>

      {/* Length */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-ink-700">
          <span>Length</span>
          <span className="tabular-nums text-ink-900">{opts.length}</span>
        </div>
        <input
          type="range" min={6} max={64} value={opts.length}
          onChange={(e) => set("length", Number(e.target.value))}
          className="w-full accent-ink-500"
        />
      </div>

      {/* Options */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {([
          ["upper", "Uppercase (A-Z)"],
          ["lower", "Lowercase (a-z)"],
          ["number", "Numbers (0-9)"],
          ["symbol", "Symbols (!@#)"],
          ["ambiguous", "Include l I O 0 1"],
        ] as [keyof Opts, string][]).map(([k, label]) => (
          <label key={k} className="flex cursor-pointer items-center gap-2 text-sm text-ink-700">
            <input type="checkbox" checked={opts[k] as boolean} onChange={(e) => set(k, e.target.checked as never)} className={check} />
            {label}
          </label>
        ))}
      </div>

      <p className="mt-5 text-xs text-ink-400">
        Passwords are generated in your browser with a cryptographically-secure random source — nothing is stored, logged, or sent anywhere.
      </p>
    </div>
  );
}
