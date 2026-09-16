"use client";

import { useMemo, useState } from "react";
import { Select } from "@/components/ui/Select";
import {
  CURRENCIES,
  PRICE_LEVELS,
  countryByIso,
  equivalent,
  formatMoney,
  priceLevel,
} from "@/lib/data/price-levels";
import { Field, NumberInput, Segmented, ToolCard, fieldClass, selectBtnClass } from "./kit";

const COUNTRY_OPTIONS = PRICE_LEVELS.map((c) => ({ value: c.iso, label: c.name }));
const CURRENCY_OPTIONS = CURRENCIES.map((c) => ({ value: c, label: c }));

export function PurchasingPower() {
  const [amount, setAmount] = useState(80000);
  const [currency, setCurrency] = useState("USD");
  const [live, setLive] = useState("PRT");
  const [compare, setCompare] = useState("USA");
  const [sort, setSort] = useState<"cheap" | "expensive" | "name">("cheap");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const liveIn = countryByIso(live)!;
  const compareTo = countryByIso(compare)!;
  const eq = equivalent(amount || 0, currency, liveIn, compareTo);
  const liveLevel = priceLevel(liveIn);
  const localAmount = eq.usd * liveIn.fx;

  const rows = useMemo(() => {
    const base = priceLevel(liveIn);
    let list = PRICE_LEVELS.map((c) => ({ c, level: priceLevel(c), need: (eq.usd * priceLevel(c)) / base }));
    if (query.trim()) list = list.filter((r) => r.c.name.toLowerCase().includes(query.trim().toLowerCase()));
    list.sort((a, b) => (sort === "name" ? a.c.name.localeCompare(b.c.name) : sort === "cheap" ? a.level - b.level : b.level - a.level));
    return list;
  }, [liveIn, eq.usd, query, sort]);

  const maxLevel = Math.max(...PRICE_LEVELS.map(priceLevel));
  const visible = showAll || query.trim() ? rows : rows.slice(0, 15);
  const further = eq.ratio >= 1 ? "further" : "less far";

  return (
    <div className="space-y-5">
      <ToolCard>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Salary (per year)">
            {(id) => <NumberInput id={id} value={amount} onChange={setAmount} step={1000} />}
          </Field>
          <Field label="Paid in">
            {() => <Select value={currency} onValueChange={setCurrency} options={CURRENCY_OPTIONS} ariaLabel="Salary currency" buttonClassName={selectBtnClass} />}
          </Field>
          <Field label="You live and spend it in">
            {() => <Select value={live} onValueChange={setLive} options={COUNTRY_OPTIONS} ariaLabel="Country you live in" buttonClassName={selectBtnClass} />}
          </Field>
          <Field label="Compare with">
            {() => <Select value={compare} onValueChange={setCompare} options={COUNTRY_OPTIONS} ariaLabel="Country to compare with" buttonClassName={selectBtnClass} />}
          </Field>
        </div>
      </ToolCard>

      <ToolCard>
        <div aria-live="polite" className="space-y-4">
          <p className="text-sm text-ink-500">
            {formatMoney(amount || 0, currency)} a year, spent in {liveIn.name}
            {currency !== liveIn.currency && <> (about {formatMoney(localAmount, liveIn.currency)})</>}, buys roughly what
          </p>
          <p className="font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            {formatMoney(eq.eqLocal, compareTo.currency)}
          </p>
          <p className="text-sm text-ink-500">
            buys in {compareTo.name}
            {compareTo.currency !== "USD" && <> (about {formatMoney(eq.eqUsd, "USD")})</>}.
          </p>
          {live !== compare && (
            <p className="rounded-xl bg-ink-50 p-4 text-sm leading-relaxed text-ink-700">
              Everyday prices in {liveIn.name} are about <strong className="text-ink-900">{Math.round(liveLevel * 100)}%</strong> of US prices, and in{" "}
              {compareTo.name} about <strong className="text-ink-900">{Math.round(priceLevel(compareTo) * 100)}%</strong>. So the same money goes{" "}
              <strong className="text-ink-900">
                {eq.ratio >= 1 ? eq.ratio.toFixed(2) : (1 / eq.ratio).toFixed(2)}× {further}
              </strong>{" "}
              in {liveIn.name} than in {compareTo.name}.
            </p>
          )}
          <p className="text-xs text-ink-500">
            Price levels from the World Bank ({liveIn.name} {liveIn.year}, {compareTo.name} {compareTo.year}). National averages: big cities usually cost more, and rent varies most of all.
          </p>
        </div>
      </ToolCard>

      <ToolCard>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-base font-bold text-ink-900">The same lifestyle, country by country</h2>
            <p className="mt-1 text-sm text-ink-500">Income needed to match your {liveIn.name} spending power. US prices = 100.</p>
          </div>
          <Segmented
            size="sm"
            ariaLabel="Sort countries"
            value={sort}
            onChange={setSort}
            options={[
              { value: "cheap", label: "Cheapest" },
              { value: "expensive", label: "Priciest" },
              { value: "name", label: "A–Z" },
            ]}
          />
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a country…"
          aria-label="Find a country"
          className={`${fieldClass} mt-4`}
        />
        <ul className="viz mt-4 space-y-1.5">
          {visible.map(({ c, level, need }) => {
            const selected = c.iso === live || c.iso === compare;
            return (
              <li key={c.iso} className={`grid grid-cols-[7.5rem_1fr_auto] items-center gap-3 rounded-md px-1 py-0.5 text-sm sm:grid-cols-[10rem_1fr_7.5rem] ${selected ? "bg-ink-50" : ""}`}>
                <span className={`truncate ${selected ? "font-semibold text-ink-900" : "text-ink-700"}`}>{c.name}</span>
                <span className="relative h-3">
                  <span
                    className="absolute inset-y-0 left-0 rounded-r-[4px]"
                    style={{ width: `${(level / maxLevel) * 82}%`, background: selected ? "var(--viz-accent)" : "var(--viz-bar)" }}
                  />
                  <span className="absolute left-[calc(var(--x)+6px)] top-1/2 -translate-y-1/2 text-[11px] tabular-nums text-ink-500" style={{ ["--x" as string]: `${(level / maxLevel) * 82}%` }}>
                    {Math.round(level * 100)}
                  </span>
                </span>
                <span className="text-right tabular-nums text-ink-700" title={formatMoney(need, "USD")}>
                  {formatMoney(need * c.fx, c.currency, true)}
                </span>
              </li>
            );
          })}
        </ul>
        {!query.trim() && rows.length > 15 && (
          <button type="button" onClick={() => setShowAll((s) => !s)} className="mt-3 text-sm font-semibold text-brand-600 hover:text-brand-700">
            {showAll ? "Show fewer" : `Show all ${rows.length} countries`}
          </button>
        )}
      </ToolCard>
    </div>
  );
}
