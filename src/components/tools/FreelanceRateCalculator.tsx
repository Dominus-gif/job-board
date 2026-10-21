"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Select } from "@/components/ui/Select";
import { CURRENCIES, formatMoney } from "@/lib/data/price-levels";
import { Field, NumberInput, Segmented, Stat, ToolCard, selectBtnClass } from "./kit";

const CURRENCY_OPTIONS = CURRENCIES.map((c) => ({ value: c, label: c }));

/** Weekdays in a year (52 × 5). Leave and holidays come off this. */
export const WEEKDAYS = 260;

export interface RateInputs {
  target: number; // the salary you want to match
  employerPct: number; // employer-side contributions you now pay yourself, % of target
  health: number; // health cover per year
  pensionPct: number; // retirement saving, % of target
  expenses: number; // business costs per year
  vacation: number;
  holidays: number;
  sick: number;
  utilisation: number; // % of available days you can bill
  hoursPerDay: number;
}

export interface RateResult {
  costs: { label: string; value: number }[];
  total: number;
  workingDays: number;
  billableDays: number;
  dayRate: number;
  hourRate: number;
  naiveDay: number;
  multiple: number;
}

/**
 * The rate that covers what an employer used to pay for, spread over the days
 * you can actually bill. Pure, so the explainer's worked example and the tests
 * use the same arithmetic as the widget.
 */
export function freelanceRate(i: RateInputs): RateResult | null {
  const pos = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
  const target = pos(i.target);
  const costs = [
    { label: "Salary you want to match", value: target },
    { label: "Employer contributions you now pay", value: (target * pos(i.employerPct)) / 100 },
    { label: "Health cover", value: pos(i.health) },
    { label: "Retirement saving", value: (target * pos(i.pensionPct)) / 100 },
    { label: "Business expenses", value: pos(i.expenses) },
  ];
  const total = costs.reduce((n, c) => n + c.value, 0);
  const workingDays = WEEKDAYS - pos(i.vacation) - pos(i.holidays) - pos(i.sick);
  const billableDays = (workingDays * Math.min(100, pos(i.utilisation))) / 100;
  if (target <= 0 || workingDays <= 0 || billableDays <= 0 || pos(i.hoursPerDay) <= 0) return null;
  const dayRate = total / billableDays;
  const naiveDay = target / WEEKDAYS;
  return {
    costs,
    total,
    workingDays,
    billableDays,
    dayRate,
    hourRate: dayRate / pos(i.hoursPerDay),
    naiveDay,
    multiple: dayRate / naiveDay,
  };
}

const START: RateInputs = {
  target: 90000,
  employerPct: 10,
  health: 6000,
  pensionPct: 5,
  expenses: 5000,
  vacation: 25,
  holidays: 10,
  sick: 5,
  utilisation: 70,
  hoursPerDay: 8,
};

type Stage = "55" | "70" | "85";
const STAGES: { value: Stage; label: string }[] = [
  { value: "55", label: "Starting out · 55%" },
  { value: "70", label: "Established · 70%" },
  { value: "85", label: "Long contract · 85%" },
];

export function FreelanceRateCalculator() {
  const [v, setV] = useState<RateInputs>(START);
  const [currency, setCurrency] = useState("USD");
  const set = <K extends keyof RateInputs>(k: K, n: RateInputs[K]) => setV((p) => ({ ...p, [k]: n }));
  const r = useMemo(() => freelanceRate(v), [v]);
  const money = (n: number) => formatMoney(Math.round(n), currency);
  const stage = (STAGES.find((s) => Number(s.value) === v.utilisation)?.value ?? "") as Stage;

  return (
    <div className="space-y-5">
      <ToolCard>
        <h2 className="font-display text-lg font-bold text-ink-900">What you want to earn</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Salary you want to match" hint="The yearly salary an employer would pay you for this work, before income tax.">
            {(id) => <NumberInput id={id} value={v.target} onChange={(n) => set("target", n)} step={1000} />}
          </Field>
          <Field label="Currency" hint="A label only. Nothing is converted.">
            {() => <Select value={currency} onValueChange={setCurrency} options={CURRENCY_OPTIONS} ariaLabel="Currency" buttonClassName={selectBtnClass} />}
          </Field>
        </div>

        <h2 className="mt-7 font-display text-lg font-bold text-ink-900">What an employer used to pay for</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Employer contributions" hint="Social security or national insurance an employer pays on top of salary. Roughly 7.65% in the US, 15% in the UK (above £5,000 a year, since April 2025), and often 20% or more elsewhere in Europe.">
            {(id) => <NumberInput id={id} value={v.employerPct} onChange={(n) => set("employerPct", n)} step={0.5} suffix="% of salary" />}
          </Field>
          <Field label="Health cover per year" hint="What you'd pay for insurance an employer used to provide. Zero if your country covers it.">
            {(id) => <NumberInput id={id} value={v.health} onChange={(n) => set("health", n)} step={500} />}
          </Field>
          <Field label="Retirement saving" hint="The pension or 401(k) contribution you want to keep making.">
            {(id) => <NumberInput id={id} value={v.pensionPct} onChange={(n) => set("pensionPct", n)} step={0.5} suffix="% of salary" />}
          </Field>
          <Field label="Business expenses per year" hint="Equipment, software, accountant, insurance, coworking.">
            {(id) => <NumberInput id={id} value={v.expenses} onChange={(n) => set("expenses", n)} step={500} />}
          </Field>
        </div>

        <h2 className="mt-7 font-display text-lg font-bold text-ink-900">The days you can actually bill</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Field label="Holiday days">{(id) => <NumberInput id={id} value={v.vacation} onChange={(n) => set("vacation", n)} />}</Field>
          <Field label="Public holidays">{(id) => <NumberInput id={id} value={v.holidays} onChange={(n) => set("holidays", n)} />}</Field>
          <Field label="Sick days">{(id) => <NumberInput id={id} value={v.sick} onChange={(n) => set("sick", n)} />}</Field>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-ink-700">Share of working days you bill</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-3">
            <Segmented value={stage} onChange={(s) => set("utilisation", Number(s))} options={STAGES} ariaLabel="Utilisation preset" size="sm" />
            <div className="w-36">
              <NumberInput value={v.utilisation} onChange={(n) => set("utilisation", Math.min(100, n))} suffix="%" ariaLabel="Share of working days you bill" />
            </div>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-ink-500">
            The rest goes on finding work, admin and the gaps between contracts. Few freelancers bill more than 80% of their days for long.
          </p>
        </div>
        <div className="mt-4 w-full sm:w-1/3">
          <Field label="Hours in a billable day">{(id) => <NumberInput id={id} value={v.hoursPerDay} onChange={(n) => set("hoursPerDay", n)} step={0.5} />}</Field>
        </div>
      </ToolCard>

      {r ? (
        <ToolCard>
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="Day rate" value={money(r.dayRate)} sub={`over ${Math.round(r.billableDays)} billable days`} />
            <Stat label="Hourly rate" value={money(r.hourRate)} sub={`at ${v.hoursPerDay} hours a day`} />
            <Stat label="Yearly billing needed" value={money(r.total)} sub="before your own income tax" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-700">
            That day rate is <strong>{r.multiple.toFixed(1)}×</strong> the {money(r.naiveDay)} you get by dividing the salary by {WEEKDAYS} weekdays.
            The gap is what an employer was paying for without you seeing it: contributions, benefits, equipment, and every day you weren&apos;t working but were still paid.
          </p>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-ink-900">What the rate has to cover</h3>
              <table className="mt-2 w-full text-sm">
                <tbody>
                  {r.costs.map((c) => (
                    <tr key={c.label} className="border-b border-ink-100">
                      <td className="py-1.5 pr-3 text-ink-600">{c.label}</td>
                      <td className="py-1.5 text-right tabular-nums text-ink-900">{money(c.value)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="pt-2 pr-3 font-semibold text-ink-900">Total per year</td>
                    <td className="pt-2 text-right font-semibold tabular-nums text-ink-900">{money(r.total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink-900">The days it is spread over</h3>
              <table className="mt-2 w-full text-sm">
                <tbody>
                  <tr className="border-b border-ink-100"><td className="py-1.5 pr-3 text-ink-600">Weekdays in a year</td><td className="py-1.5 text-right tabular-nums text-ink-900">{WEEKDAYS}</td></tr>
                  <tr className="border-b border-ink-100"><td className="py-1.5 pr-3 text-ink-600">Less holiday, public holidays and sick days</td><td className="py-1.5 text-right tabular-nums text-ink-900">−{v.vacation + v.holidays + v.sick}</td></tr>
                  <tr className="border-b border-ink-100"><td className="py-1.5 pr-3 text-ink-600">Working days</td><td className="py-1.5 text-right tabular-nums text-ink-900">{r.workingDays}</td></tr>
                  <tr><td className="pt-2 pr-3 font-semibold text-ink-900">Billable at {v.utilisation}%</td><td className="pt-2 text-right font-semibold tabular-nums text-ink-900">{Math.round(r.billableDays)}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-ink-500">
            Income tax is left out on purpose: it depends on where you live and how you set up, and it applies to an employee&apos;s salary too.
            To weigh a contract against a salaried offer, use the <Link href="/tools/offer-comparator" className="font-medium text-ink-700 underline underline-offset-2">offer comparator</Link>.
          </p>
        </ToolCard>
      ) : (
        <ToolCard>
          <p className="text-sm text-ink-600">Enter a salary above zero and leave yourself at least one billable day to see a rate.</p>
        </ToolCard>
      )}
    </div>
  );
}
