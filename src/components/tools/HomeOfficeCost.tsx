"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";
import { formatMoney } from "@/lib/data/price-levels";
import { Field, NumberInput, Segmented, ToolCard, fieldClass, ghostButtonClass, newId, selectBtnClass } from "./kit";

type CountryId = "US" | "UK" | "DE" | "NL" | "IE" | "AU" | "CA" | "OTHER";

/**
 * Home-working tax treatment, as published by each tax authority and checked
 * in September 2026. `relief` returns the amount of income the rule lets you
 * deduct (or your employer pay tax-free) for the inputs given.
 */
const RULES: Record<CountryId, { name: string; currency: string; summary: string }> = {
  US: { name: "United States", currency: "USD", summary: "Employees can't deduct unreimbursed home-office costs (a suspension made permanent in 2025). Self-employed people can use the simplified home office deduction: $5 per square foot, up to 300 square feet." },
  UK: { name: "United Kingdom", currency: "GBP", summary: "Since April 2026 employees can't claim home-working relief from HMRC. Employers can still pay up to £6 a week tax-free where you have an arrangement to work from home." },
  DE: { name: "Germany", currency: "EUR", summary: "The home office allowance is €6 for each day worked mainly from home, up to €1,260 a year (210 days), deducted from taxable income." },
  NL: { name: "Netherlands", currency: "EUR", summary: "Employers can pay a tax-free home working allowance of up to €2.45 per day worked from home in 2026." },
  IE: { name: "Ireland", currency: "EUR", summary: "You can claim 30% of electricity, heating and broadband, in proportion to days worked from home, if your employer doesn't pay the €3.20-a-day tax-free allowance." },
  AU: { name: "Australia", currency: "AUD", summary: "Employees can claim a fixed rate of 70 cents for each hour worked from home, with a record of the hours." },
  CA: { name: "Canada", currency: "CAD", summary: "The temporary flat-rate method ended after 2022. Employees claim actual costs with a T2200 form signed by their employer, so this calculator doesn't estimate it." },
  OTHER: { name: "Somewhere else", currency: "USD", summary: "Rules vary widely. Check with your local tax authority; this calculator shows costs only." },
};

interface Item {
  id: string;
  name: string;
  cost: number;
  years: number;
}

const START_ITEMS: Item[] = [
  { id: "desk", name: "Desk", cost: 350, years: 8 },
  { id: "chair", name: "Ergonomic chair", cost: 400, years: 6 },
  { id: "monitor", name: "Monitor", cost: 250, years: 5 },
  { id: "kit", name: "Keyboard, mouse, headset, webcam", cost: 250, years: 3 },
  { id: "light", name: "Lighting and cables", cost: 80, years: 5 },
];

export function HomeOfficeCost() {
  const [country, setCountry] = useState<CountryId>("UK");
  const [items, setItems] = useState<Item[]>(START_ITEMS);
  const [broadband, setBroadband] = useState(40);
  const [broadbandShare, setBroadbandShare] = useState(50);
  const [energy, setEnergy] = useState(35);
  const [phone, setPhone] = useState(10);
  const [coworkDays, setCoworkDays] = useState(1);
  const [coworkPrice, setCoworkPrice] = useState(25);
  const [stipend, setStipend] = useState(0);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [weeks, setWeeks] = useState(46);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [taxRate, setTaxRate] = useState(20);
  const [selfEmployed, setSelfEmployed] = useState<"no" | "yes">("no");
  const [sqft, setSqft] = useState(100);
  const [employerPays, setEmployerPays] = useState<"no" | "yes">("no");
  const [utilities, setUtilities] = useState(180);

  const rule = RULES[country];
  const cur = rule.currency;
  const money = (n: number) => formatMoney(n, cur);

  const wfhDays = Math.round(daysPerWeek * weeks);
  const equipment = items.reduce((n, i) => n + (i.years > 0 ? i.cost / i.years : i.cost), 0);
  const running = 12 * ((broadband * broadbandShare) / 100 + energy + phone);
  const cowork = coworkDays * coworkPrice * 12;
  const gross = equipment + running + cowork;

  // What the country's rule is worth to you this year.
  let relief = 0;
  let reliefNote = "";
  switch (country) {
    case "US":
      if (selfEmployed === "yes") {
        const deduction = 5 * Math.min(300, sqft);
        relief = deduction * (taxRate / 100);
        reliefNote = `${money(deduction)} deduction at your ${taxRate}% rate`;
      } else reliefNote = "No federal deduction for employees";
      break;
    case "UK": {
      const allowance = employerPays === "yes" ? 6 * weeks : 0;
      relief = allowance; // paid to you tax-free, so it offsets cost directly
      reliefNote = employerPays === "yes" ? `${money(allowance)} tax-free from your employer (£6 × ${weeks} weeks)` : "No relief unless your employer pays the allowance";
      break;
    }
    case "DE": {
      const deduction = 6 * Math.min(210, wfhDays);
      relief = deduction * (taxRate / 100);
      reliefNote = `${money(deduction)} allowance (${Math.min(210, wfhDays)} days) at your ${taxRate}% rate`;
      break;
    }
    case "NL": {
      const allowance = employerPays === "yes" ? 2.45 * wfhDays : 0;
      relief = allowance;
      reliefNote = employerPays === "yes" ? `${money(allowance)} tax-free from your employer (€2.45 × ${wfhDays} days)` : "No relief unless your employer pays the allowance";
      break;
    }
    case "IE": {
      if (employerPays === "yes") {
        relief = 3.2 * wfhDays;
        reliefNote = `${money(relief)} tax-free from your employer (€3.20 × ${wfhDays} days)`;
      } else {
        const share = Math.min(1, wfhDays / 260);
        const claim = 12 * utilities * 0.3 * share;
        relief = claim * (taxRate / 100);
        reliefNote = `${money(claim)} claimable (30% of utilities × ${Math.round(share * 100)}% of working days) at your ${taxRate}% rate`;
      }
      break;
    }
    case "AU": {
      const deduction = 0.7 * wfhDays * hoursPerDay;
      relief = deduction * (taxRate / 100);
      reliefNote = `${money(deduction)} deduction (70c × ${wfhDays * hoursPerDay} hours) at your ${taxRate}% rate`;
      break;
    }
    default:
      reliefNote = "Not estimated";
  }

  const net = Math.max(0, gross - stipend - relief);
  const parts = [
    { label: "Equipment (spread over its life)", value: equipment },
    { label: "Broadband, energy and phone", value: running },
    { label: "Coworking", value: cowork },
  ];
  const max = Math.max(gross, 1);
  const needsRate = ["DE", "AU"].includes(country) || (country === "US" && selfEmployed === "yes") || (country === "IE" && employerPays === "no");
  const hasEmployerOption = ["UK", "NL", "IE"].includes(country);

  return (
    <div className="space-y-5">
      <ToolCard>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Where you work from">
            {() => (
              <Select
                value={country}
                onValueChange={(v) => setCountry(v as CountryId)}
                options={(Object.keys(RULES) as CountryId[]).map((k) => ({ value: k, label: RULES[k].name }))}
                ariaLabel="Country"
                buttonClassName={selectBtnClass}
              />
            )}
          </Field>
          <Field label={`Employer stipend per year (${cur})`}>{(id) => <NumberInput id={id} value={stipend} onChange={setStipend} step={50} />}</Field>
        </div>
        <p className="mt-3 rounded-xl bg-ink-50 p-3 text-sm leading-relaxed text-ink-700">{rule.summary}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-4">
          <Field label="Home days per week">{(id) => <NumberInput id={id} value={daysPerWeek} onChange={(n) => setDaysPerWeek(Math.min(7, n))} step={0.5} />}</Field>
          <Field label="Working weeks">{(id) => <NumberInput id={id} value={weeks} onChange={(n) => setWeeks(Math.min(52, n))} />}</Field>
          <Field label="Hours per day">{(id) => <NumberInput id={id} value={hoursPerDay} onChange={setHoursPerDay} step={0.5} />}</Field>
          {needsRate && <Field label="Your tax rate">{(id) => <NumberInput id={id} value={taxRate} onChange={setTaxRate} suffix="%" />}</Field>}
        </div>
        <div className="mt-4 flex flex-wrap gap-5">
          {country === "US" && (
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink-700">Self-employed?</span>
              <Segmented size="sm" ariaLabel="Self-employed" value={selfEmployed} onChange={setSelfEmployed} options={[{ value: "no", label: "No" }, { value: "yes", label: "Yes" }]} />
            </div>
          )}
          {country === "US" && selfEmployed === "yes" && (
            <div className="w-40">
              <Field label="Office size">{(id) => <NumberInput id={id} value={sqft} onChange={setSqft} suffix="sq ft" />}</Field>
            </div>
          )}
          {hasEmployerOption && (
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink-700">Employer pays the tax-free allowance?</span>
              <Segmented size="sm" ariaLabel="Employer pays allowance" value={employerPays} onChange={setEmployerPays} options={[{ value: "no", label: "No" }, { value: "yes", label: "Yes" }]} />
            </div>
          )}
          {country === "IE" && employerPays === "no" && (
            <div className="w-48">
              <Field label="Utilities per month">{(id) => <NumberInput id={id} value={utilities} onChange={setUtilities} suffix={cur} />}</Field>
            </div>
          )}
        </div>
      </ToolCard>

      <div className="grid gap-5 lg:grid-cols-2">
        <ToolCard>
          <h2 className="font-display text-base font-bold text-ink-900">Setup</h2>
          <ul className="mt-3 space-y-2">
            {items.map((it) => (
              <li key={it.id} className="grid grid-cols-[1fr_5.5rem_4.5rem_auto] items-center gap-2">
                <input value={it.name} onChange={(e) => setItems((l) => l.map((x) => (x.id === it.id ? { ...x, name: e.target.value } : x)))} aria-label="Item" className={fieldClass} />
                <NumberInput value={it.cost} onChange={(n) => setItems((l) => l.map((x) => (x.id === it.id ? { ...x, cost: n } : x)))} ariaLabel={`${it.name} cost`} step={10} />
                <NumberInput value={it.years} onChange={(n) => setItems((l) => l.map((x) => (x.id === it.id ? { ...x, years: n } : x)))} ariaLabel={`${it.name} lifespan in years`} suffix="yrs" />
                <button type="button" onClick={() => setItems((l) => l.filter((x) => x.id !== it.id))} className="px-1 text-sm text-ink-500 hover:text-ink-900" aria-label={`Remove ${it.name}`}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className={`${ghostButtonClass} mt-3`} onClick={() => setItems((l) => [...l, { id: newId(), name: "New item", cost: 0, years: 3 }])}>
            Add an item
          </button>
          <p className="mt-2 text-xs text-ink-500">Starting prices are round examples in {cur}. Replace them with your own.</p>
        </ToolCard>

        <ToolCard>
          <h2 className="font-display text-base font-bold text-ink-900">Running costs per month</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Field label="Broadband">{(id) => <NumberInput id={id} value={broadband} onChange={setBroadband} suffix={cur} />}</Field>
            <Field label="Share used for work">{(id) => <NumberInput id={id} value={broadbandShare} onChange={(n) => setBroadbandShare(Math.min(100, n))} suffix="%" />}</Field>
            <Field label="Extra energy">{(id) => <NumberInput id={id} value={energy} onChange={setEnergy} suffix={cur} />}</Field>
            <Field label="Phone / backup data">{(id) => <NumberInput id={id} value={phone} onChange={setPhone} suffix={cur} />}</Field>
            <Field label="Coworking days">{(id) => <NumberInput id={id} value={coworkDays} onChange={setCoworkDays} />}</Field>
            <Field label="Price per day">{(id) => <NumberInput id={id} value={coworkPrice} onChange={setCoworkPrice} suffix={cur} />}</Field>
          </div>
        </ToolCard>
      </div>

      <ToolCard>
        <div aria-live="polite" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm text-ink-500">Your home office costs about</p>
              <p className="font-display text-4xl font-bold tracking-tight text-ink-900">{money(gross)}<span className="text-base font-medium text-ink-500"> a year</span></p>
            </div>
            <div className="text-right">
              <p className="text-sm text-ink-500">After stipend and tax relief</p>
              <p className="font-display text-2xl font-bold text-ink-900">{money(net)}</p>
            </div>
          </div>
          <ul className="viz space-y-2">
            {[...parts, { label: "Stipend", value: -stipend }, { label: "Tax relief (estimate)", value: -relief }].map((p) => (
              <li key={p.label} className="grid grid-cols-[10rem_1fr_6rem] items-center gap-3 text-sm sm:grid-cols-[14rem_1fr_7rem]">
                <span className="text-ink-700">{p.label}</span>
                <span className="relative h-3">
                  <span
                    className="absolute inset-y-0 left-0 rounded-r-[4px]"
                    style={{ width: `${(Math.abs(p.value) / max) * 100}%`, background: p.value < 0 ? "var(--viz-accent)" : "var(--viz-bar)" }}
                  />
                </span>
                <span className="text-right tabular-nums text-ink-900">{p.value < 0 ? `−${money(-p.value)}` : money(p.value)}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-ink-600">Tax relief: {reliefNote}.</p>
          <p className="text-xs text-ink-500">
            Estimates only. Relief depends on your circumstances and the rules change often, so check your tax authority&apos;s current guidance.
            {stipend > 0 && " Some stipends are taxable income; ask how yours is paid."}
          </p>
        </div>
      </ToolCard>
    </div>
  );
}
