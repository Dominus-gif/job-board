"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";
import { CURRENCIES, FX_PER_USD, PRICE_LEVELS, countryByIso, formatMoney, priceLevel } from "@/lib/data/price-levels";
import { Chip, Field, NumberInput, Segmented, ToolCard, selectBtnClass } from "./kit";

interface Offer {
  name: string;
  salary: number;
  currency: string;
  bonusPct: number;
  benefits: number;
  stipend: number;
  type: "employee" | "contractor";
  contractorCostPct: number;
  leaveDays: number;
  holidays: number;
  hoursPerDay: number;
  country: string;
}

const COUNTRY_OPTIONS = PRICE_LEVELS.map((c) => ({ value: c.iso, label: c.name }));
const CURRENCY_OPTIONS = CURRENCIES.map((c) => ({ value: c, label: c }));

const START: [Offer, Offer] = [
  { name: "Offer A", salary: 95000, currency: "USD", bonusPct: 5, benefits: 6000, stipend: 1000, type: "employee", contractorCostPct: 20, leaveDays: 25, holidays: 10, hoursPerDay: 8, country: "PRT" },
  { name: "Offer B", salary: 110000, currency: "USD", bonusPct: 0, benefits: 0, stipend: 0, type: "contractor", contractorCostPct: 20, leaveDays: 25, holidays: 10, hoursPerDay: 8, country: "PRT" },
];

function evaluate(o: Offer) {
  const fx = FX_PER_USD[o.currency] ?? 1;
  const cash = o.salary * (1 + o.bonusPct / 100);
  const extras = o.benefits + o.stipend;
  const costs = o.type === "contractor" ? cash * (o.contractorCostPct / 100) : 0;
  const netLocalCurrency = cash + extras - costs;
  const usd = netLocalCurrency / fx;
  const country = countryByIso(o.country)!;
  const realUsd = usd / priceLevel(country); // what it buys, in US-price dollars
  const workedDays = Math.max(1, 260 - o.leaveDays - o.holidays);
  const hourly = usd / (workedDays * o.hoursPerDay);
  return { cash, extras, costs, usd, realUsd, workedDays, hourly, country };
}

function OfferForm({ offer, onChange }: { offer: Offer; onChange: (o: Offer) => void }) {
  const set = <K extends keyof Offer>(k: K, v: Offer[K]) => onChange({ ...offer, [k]: v });
  return (
    <ToolCard>
      <input
        value={offer.name}
        onChange={(e) => set("name", e.target.value)}
        aria-label="Offer name"
        className="w-full bg-transparent font-display text-lg font-bold text-ink-900 focus:outline-none"
      />
      <div className="mt-3 space-y-3">
        <Segmented
          ariaLabel={`${offer.name} contract type`}
          value={offer.type}
          onChange={(v) => set("type", v)}
          options={[
            { value: "employee", label: "Employee" },
            { value: "contractor", label: "Contractor" },
          ]}
        />
        <div className="grid grid-cols-[1fr_6.5rem] gap-2">
          <Field label={offer.type === "contractor" ? "Expected yearly billing" : "Base salary per year"}>
            {(id) => <NumberInput id={id} value={offer.salary} onChange={(n) => set("salary", n)} step={1000} />}
          </Field>
          <Field label="Currency">
            {() => <Select value={offer.currency} onValueChange={(v) => set("currency", v)} options={CURRENCY_OPTIONS} ariaLabel="Currency" buttonClassName={selectBtnClass} />}
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Bonus or commission">{(id) => <NumberInput id={id} value={offer.bonusPct} onChange={(n) => set("bonusPct", n)} suffix="%" />}</Field>
          <Field label="Benefits value / yr" hint="Health cover, pension match…">{(id) => <NumberInput id={id} value={offer.benefits} onChange={(n) => set("benefits", n)} step={500} />}</Field>
          <Field label="Stipends / yr" hint="Equipment, home office, learning">{(id) => <NumberInput id={id} value={offer.stipend} onChange={(n) => set("stipend", n)} step={100} />}</Field>
          {offer.type === "contractor" ? (
            <Field label="Costs you'd cover" hint="Tax contributions, insurance, pension, gaps">{(id) => <NumberInput id={id} value={offer.contractorCostPct} onChange={(n) => set("contractorCostPct", n)} suffix="%" />}</Field>
          ) : (
            <div />
          )}
          <Field label={offer.type === "contractor" ? "Days off (unpaid)" : "Paid leave days"}>{(id) => <NumberInput id={id} value={offer.leaveDays} onChange={(n) => set("leaveDays", n)} />}</Field>
          <Field label="Public holidays">{(id) => <NumberInput id={id} value={offer.holidays} onChange={(n) => set("holidays", n)} />}</Field>
          <Field label="Hours per day">{(id) => <NumberInput id={id} value={offer.hoursPerDay} onChange={(n) => set("hoursPerDay", n)} step={0.5} />}</Field>
        </div>
        <Field label="Where you'd live">
          {() => <Select value={offer.country} onValueChange={(v) => set("country", v)} options={COUNTRY_OPTIONS} ariaLabel="Country you'd live in" buttonClassName={selectBtnClass} />}
        </Field>
      </div>
    </ToolCard>
  );
}

export function OfferComparator() {
  const [offers, setOffers] = useState<[Offer, Offer]>(START);
  const r = offers.map(evaluate);
  const winner = r[0].realUsd === r[1].realUsd ? -1 : r[0].realUsd > r[1].realUsd ? 0 : 1;
  const gap = winner < 0 ? 0 : (Math.abs(r[0].realUsd - r[1].realUsd) / Math.min(r[0].realUsd, r[1].realUsd)) * 100;
  const max = Math.max(...r.map((x) => x.realUsd), 1);
  const usd = (n: number) => formatMoney(n, "USD");

  const rows: { label: string; values: string[]; hint?: string }[] = [
    { label: "Salary plus bonus", values: offers.map((o, i) => formatMoney(r[i].cash, o.currency)) },
    { label: "Benefits and stipends", values: offers.map((o, i) => formatMoney(r[i].extras, o.currency)) },
    { label: "Contractor costs", values: offers.map((o, i) => (o.type === "contractor" ? `−${formatMoney(r[i].costs, o.currency)}` : "—")) },
    { label: "Comparable total (USD)", values: r.map((x) => usd(x.usd)), hint: "At the exchange rate in our data" },
    { label: "Days worked per year", values: r.map((x) => String(x.workedDays)) },
    { label: "Effective hourly rate (USD)", values: r.map((x) => usd(x.hourly)) },
    { label: "Local prices vs US", values: r.map((x) => `${Math.round(priceLevel(x.country) * 100)}%`) },
    { label: "Real value (US prices)", values: r.map((x) => usd(x.realUsd)), hint: "What the total buys, adjusted for prices where you'd live" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        {offers.map((o, i) => (
          <OfferForm key={i} offer={o} onChange={(next) => setOffers((cur) => (i === 0 ? [next, cur[1]] : [cur[0], next]))} />
        ))}
      </div>

      <ToolCard>
        <div aria-live="polite" className="space-y-5">
          <div>
            <p className="font-display text-xl font-bold text-ink-900">
              {winner < 0 ? "The two offers come out level." : `${offers[winner as 0 | 1].name} is worth about ${Math.round(gap)}% more.`}
            </p>
            <p className="mt-1 text-sm text-ink-500">Compared on what each total buys where you'd live, after contractor costs.</p>
          </div>

          <div className="viz space-y-2.5">
            {offers.map((o, i) => (
              <div key={i} className="grid grid-cols-[6rem_1fr_6.5rem] items-center gap-3 text-sm">
                <span className="truncate font-medium text-ink-900">{o.name}</span>
                <span className="relative h-5 rounded-r-[4px]">
                  <span
                    className="absolute inset-y-0 left-0 rounded-r-[4px] transition-[width] duration-500"
                    style={{ width: `${(r[i].realUsd / max) * 100}%`, background: i === winner ? "var(--viz-accent)" : "var(--viz-bar)" }}
                  />
                </span>
                <span className="text-right font-semibold tabular-nums text-ink-900">{usd(r[i].realUsd)}</span>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[26rem] text-sm">
              <thead>
                <tr className="border-b border-ink-200 text-left text-ink-500">
                  <th className="py-2 pr-3 font-medium">Per year</th>
                  {offers.map((o, i) => (
                    <th key={i} className="py-2 pl-3 text-right font-medium">
                      {o.name} {i === winner && <Chip tone="ok">Better</Chip>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-ink-100">
                    <td className="py-2 pr-3 text-ink-700">
                      {row.label}
                      {row.hint && <span className="block text-xs text-ink-500">{row.hint}</span>}
                    </td>
                    {row.values.map((v, i) => (
                      <td key={i} className="py-2 pl-3 text-right tabular-nums text-ink-900">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ink-500">
            Income tax isn&apos;t included, because it depends on your personal situation. Exchange rates and price levels are World Bank annual figures, so treat small differences as a tie.
          </p>
        </div>
      </ToolCard>
    </div>
  );
}
