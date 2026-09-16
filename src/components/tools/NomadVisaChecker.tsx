"use client";

import { useMemo, useState } from "react";
import { Select } from "@/components/ui/Select";
import { NOMAD_VISAS, NOMAD_VISAS_CHECKED, type NomadVisa } from "@/lib/data/nomad-visas";
import { CURRENCIES, FX_PER_USD, formatMoney } from "@/lib/data/price-levels";
import { Chip, Field, NumberInput, Segmented, ToolCard, selectBtnClass, type Tone } from "./kit";

const CURRENCY_OPTIONS = CURRENCIES.map((c) => ({ value: c, label: c }));
type Period = "month" | "year";

/** Convert between currencies through the dollar. */
const convert = (amount: number, from: string, to: string) => (amount / (FX_PER_USD[from] ?? 1)) * (FX_PER_USD[to] ?? 1);

interface Row {
  visa: NomadVisa;
  status: "income" | "savings" | "short" | "savings-short";
  threshold: number | null; // in the user's currency, per month
  savingsThreshold: number | null; // in the user's currency
  ratio: number; // income / threshold (or savings / savings threshold)
}

const STATUS: Record<Row["status"], { tone: Tone; label: string }> = {
  income: { tone: "ok", label: "Income meets the bar" },
  savings: { tone: "ok", label: "Savings route may work" },
  short: { tone: "high", label: "Below the income bar" },
  "savings-short": { tone: "high", label: "Below the savings bar" },
};

export function NomadVisaChecker() {
  const [income, setIncome] = useState(4000);
  const [period, setPeriod] = useState<Period>("month");
  const [currency, setCurrency] = useState("USD");
  const [savingsInput, setSavings] = useState(Number.NaN);
  const [tech, setTech] = useState<"yes" | "no">("yes");
  const [region, setRegion] = useState("all");

  const savings = Number.isFinite(savingsInput) ? savingsInput : 0;
  const monthly = period === "month" ? income : income / 12;

  const rows = useMemo<Row[]>(() => {
    return NOMAD_VISAS.filter((v) => region === "all" || v.region === region)
      .map((visa) => {
        const bar = tech === "no" && visa.nonTechMonthlyIncome ? visa.nonTechMonthlyIncome : visa.monthlyIncome;
        const threshold = bar == null ? null : convert(bar, visa.currency, currency);
        const savingsThreshold = visa.savings == null ? null : convert(visa.savings, visa.currency, currency);
        let status: Row["status"];
        let ratio: number;
        if (threshold != null && monthly >= threshold) {
          status = "income";
          ratio = monthly / threshold;
        } else if (savingsThreshold != null && savings >= savingsThreshold) {
          status = "savings";
          ratio = savings / savingsThreshold;
        } else if (threshold != null) {
          status = "short";
          ratio = monthly / threshold;
        } else {
          status = "savings-short";
          ratio = savingsThreshold ? savings / savingsThreshold : 0;
        }
        return { visa, status, threshold, savingsThreshold, ratio };
      })
      .sort((a, b) => {
        const ok = (r: Row) => (r.status === "income" || r.status === "savings" ? 0 : 1);
        return ok(a) - ok(b) || b.ratio - a.ratio;
      });
  }, [monthly, currency, savings, tech, region]);

  const qualifying = rows.filter((r) => r.status === "income" || r.status === "savings").length;

  return (
    <div className="space-y-5">
      <ToolCard>
        <div className="grid gap-4 sm:grid-cols-[1fr_7rem_auto]">
          <Field label="Your income from outside the country" hint="Gross income, the way most programmes measure it.">
            {(id) => <NumberInput id={id} value={income} onChange={setIncome} step={period === "month" ? 100 : 1000} />}
          </Field>
          <Field label="Currency">
            {() => <Select value={currency} onValueChange={setCurrency} options={CURRENCY_OPTIONS} ariaLabel="Income currency" buttonClassName={selectBtnClass} />}
          </Field>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink-700">Per</span>
            <Segmented ariaLabel="Income period" value={period} onChange={setPeriod} options={[{ value: "month", label: "Month" }, { value: "year", label: "Year" }]} />
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Field label="Savings (optional)" hint="Some programmes accept savings instead.">
            {(id) => <NumberInput id={id} value={savingsInput} onChange={setSavings} step={1000} />}
          </Field>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink-700">Tech or digital role?</span>
            <Segmented ariaLabel="Tech or digital role" value={tech} onChange={setTech} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
          </div>
          <Field label="Region">
            {() => (
              <Select
                value={region}
                onValueChange={setRegion}
                options={[{ value: "all", label: "All regions" }, ...["Europe", "Americas", "Asia-Pacific", "Middle East"].map((r) => ({ value: r, label: r }))]}
                ariaLabel="Region"
                buttonClassName={selectBtnClass}
              />
            )}
          </Field>
        </div>
      </ToolCard>

      <div aria-live="polite" className="space-y-3">
        <p className="text-sm text-ink-600">
          On income alone, you meet the published bar for <strong className="text-ink-900">{qualifying}</strong> of {rows.length} programmes. Meeting the income test is only one condition; every programme has others.
        </p>
        <ul className="viz space-y-3">
          {rows.map(({ visa, status, threshold, savingsThreshold, ratio }) => (
            <li key={visa.id}>
              <ToolCard className="!p-4 sm:!p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-base font-bold text-ink-900">{visa.country}</h3>
                    <p className="text-sm text-ink-500">{visa.programme}</p>
                  </div>
                  <Chip tone={STATUS[status].tone}>{STATUS[status].label}</Chip>
                </div>

                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs text-ink-500">
                    <span>
                      {threshold != null
                        ? `Needs about ${formatMoney(threshold, currency)} a month`
                        : `Needs about ${formatMoney(savingsThreshold ?? 0, currency)} in savings`}
                      {visa.currency !== currency && threshold != null && ` (${formatMoney(tech === "no" && visa.nonTechMonthlyIncome ? visa.nonTechMonthlyIncome : visa.monthlyIncome ?? 0, visa.currency)})`}
                    </span>
                    <span className="tabular-nums">{Math.round(Math.min(ratio, 9.99) * 100)}%</span>
                  </div>
                  <div className="relative h-2 overflow-hidden rounded-full" style={{ background: "var(--viz-surface)" }}>
                    <div
                      className="h-full rounded-full transition-[width] duration-500"
                      style={{ width: `${Math.min(100, ratio * 100)}%`, background: status === "income" || status === "savings" ? "var(--viz-accent)" : "var(--viz-bar)" }}
                    />
                  </div>
                  {status === "short" && threshold != null && (
                    <p className="text-xs text-ink-600">Short by about {formatMoney(threshold - monthly, currency)} a month{savingsThreshold != null ? `, or ${formatMoney(Math.max(0, savingsThreshold - savings), currency)} more in savings` : ""}.</p>
                  )}
                </div>

                <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium text-ink-500">How the bar is set</dt>
                    <dd className="text-ink-700">{visa.basis}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-ink-500">How long</dt>
                    <dd className="text-ink-700">{visa.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-ink-500">Worth knowing</dt>
                    <dd className="text-ink-700">{visa.notes}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-ink-500">Confirm with</dt>
                    <dd className="text-ink-700">{visa.authority}</dd>
                  </div>
                </dl>
              </ToolCard>
            </li>
          ))}
        </ul>
        <p className="text-xs text-ink-500">
          Thresholds checked in {NOMAD_VISAS_CHECKED}. Currency conversion uses annual average exchange rates, so treat results near the line as uncertain. This isn&apos;t immigration advice.
        </p>
      </div>
    </div>
  );
}
