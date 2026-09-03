"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";

// Indicative FX rates relative to USD (update periodically; labelled as such).
const RATES: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79, CAD: 1.37, AUD: 1.52, INR: 83.2 };
const CURRENCIES = Object.keys(RATES);
const CURRENCY_OPTIONS = CURRENCIES.map((c) => ({ value: c, label: c }));
const field =
  "rounded-md border border-ink-200 bg-white px-3 py-2 text-ink-900 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200";
const selectBtn = "!rounded-md !px-3 !py-2 text-sm font-normal !text-ink-900";

export function SalaryConverter() {
  const [amount, setAmount] = useState(120000);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const inUsd = (Number(amount) || 0) / RATES[from];
  const converted = inUsd * RATES[to];
  const fmt = (n: number, c: string) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(n);

  return (
    <div className="rounded-xl border border-ink-100 bg-white p-6 shadow-card">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink-700">
          Annual salary
          <input
            type="number"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className={field}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink-700">
          From
          <Select value={from} onValueChange={setFrom} options={CURRENCY_OPTIONS} ariaLabel="Convert from currency" buttonClassName={selectBtn} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink-700">
          To
          <Select value={to} onValueChange={setTo} options={CURRENCY_OPTIONS} ariaLabel="Convert to currency" buttonClassName={selectBtn} />
        </label>
      </div>

      <div className="mt-6 rounded-lg bg-ink-50 p-5 text-center">
        <p className="text-sm text-ink-500">{fmt(Number(amount) || 0, from)} / year is about</p>
        <p className="mt-1 font-display text-3xl font-bold text-ink-900">{fmt(converted, to)}<span className="text-base font-medium text-ink-400"> / year</span></p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md bg-white p-3 ring-1 ring-inset ring-ink-100">
            <p className="text-ink-400">Per month</p>
            <p className="font-semibold text-ink-900">{fmt(converted / 12, to)}</p>
          </div>
          <div className="rounded-md bg-white p-3 ring-1 ring-inset ring-ink-100">
            <p className="text-ink-400">Per hour (40h/wk)</p>
            <p className="font-semibold text-ink-900">{fmt(converted / 2080, to)}</p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-ink-400">Rates are indicative and for guidance only — check a live FX source before negotiating.</p>
    </div>
  );
}
