"use client";

import { useEffect, useState } from "react";
import { Select } from "@/components/ui/Select";
import { CURRENCIES, TERMS, dueDate, money, nextNumber, totals, type LineItem, type TaxMode } from "@/lib/toolkit/invoice";
import { Field, NumberInput, ToolCard, buttonClass, fieldClass, ghostButtonClass, loadJson, newId, saveJson, selectBtnClass } from "./kit";

const KEY = "grjn:invoice:v1";

interface Draft {
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  fromTaxId: string;
  toName: string;
  toAddress: string;
  toTaxId: string;
  number: string;
  issued: string;
  terms: string;
  currency: string;
  items: LineItem[];
  taxMode: TaxMode;
  taxLabel: string;
  taxRate: number;
  payment: string;
  notes: string;
}

const blankItem = (): LineItem => ({ id: newId(), description: "", quantity: 1, unitPrice: 0 });

const START: Draft = {
  fromName: "",
  fromEmail: "",
  fromAddress: "",
  fromTaxId: "",
  toName: "",
  toAddress: "",
  toTaxId: "",
  number: "INV-001",
  issued: "",
  terms: "14",
  currency: "USD",
  items: [{ id: "first", description: "Product design, October 2026", quantity: 80, unitPrice: 65 }],
  taxMode: "none",
  taxLabel: "VAT",
  taxRate: 20,
  payment: "",
  notes: "",
};

const TAX_MODES: { value: TaxMode; label: string }[] = [
  { value: "none", label: "No tax line" },
  { value: "rate", label: "Add tax at a rate" },
  { value: "reverse", label: "Reverse charge (EU business client)" },
];

const textareaClass = `${fieldClass} min-h-[76px] resize-y`;

const fmtDate = (iso: string) => {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
};

export function ContractorInvoice() {
  const [d, setD] = useState<Draft>(START);
  const [loaded, setLoaded] = useState(false);

  // Today's date and any saved draft, read after hydration so the server
  // render and the first client render agree.
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const saved = loadJson<Partial<Draft>>(KEY, {});
    setD({ ...START, ...saved, issued: saved.issued || today });
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) saveJson(KEY, d);
  }, [d, loaded]);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((p) => ({ ...p, [k]: v }));
  const setItem = (id: string, patch: Partial<LineItem>) => set("items", d.items.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const t = totals(d.items, d.taxMode, d.taxRate, d.currency);
  const term = TERMS.find((x) => x.value === d.terms) ?? TERMS[2];
  const due = dueDate(d.issued, term.days);

  function startNext() {
    setD((p) => ({ ...p, number: nextNumber(p.number), issued: new Date().toISOString().slice(0, 10), items: [blankItem()], notes: "" }));
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <style>{`@media print {
        body * { visibility: hidden !important; }
        #invoice-sheet, #invoice-sheet * { visibility: visible !important; }
        #invoice-sheet { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none !important; border: 0 !important; }
        @page { margin: 16mm; }
      }`}</style>

      <ToolCard className="space-y-4 print:hidden">
        <h2 className="font-display text-base font-bold text-ink-900">From you</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name or business">{(id) => <input id={id} value={d.fromName} onChange={(e) => set("fromName", e.target.value)} className={fieldClass} />}</Field>
          <Field label="Email">{(id) => <input id={id} type="email" value={d.fromEmail} onChange={(e) => set("fromEmail", e.target.value)} className={fieldClass} />}</Field>
        </div>
        <Field label="Address">{(id) => <textarea id={id} value={d.fromAddress} onChange={(e) => set("fromAddress", e.target.value)} className={textareaClass} />}</Field>
        <Field label="Your tax or VAT number" hint="If you have one. Some countries require it on every invoice.">
          {(id) => <input id={id} value={d.fromTaxId} onChange={(e) => set("fromTaxId", e.target.value)} className={fieldClass} />}
        </Field>

        <h2 className="pt-2 font-display text-base font-bold text-ink-900">To your client</h2>
        <Field label="Company">{(id) => <input id={id} value={d.toName} onChange={(e) => set("toName", e.target.value)} className={fieldClass} />}</Field>
        <Field label="Address">{(id) => <textarea id={id} value={d.toAddress} onChange={(e) => set("toAddress", e.target.value)} className={textareaClass} />}</Field>
        <Field label="Client's VAT or tax number" hint="Needed on a reverse-charge invoice to an EU business.">
          {(id) => <input id={id} value={d.toTaxId} onChange={(e) => set("toTaxId", e.target.value)} className={fieldClass} />}
        </Field>

        <h2 className="pt-2 font-display text-base font-bold text-ink-900">The invoice</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Invoice number">{(id) => <input id={id} value={d.number} onChange={(e) => set("number", e.target.value)} className={fieldClass} />}</Field>
          <Field label="Issue date">{(id) => <input id={id} type="date" value={d.issued} onChange={(e) => set("issued", e.target.value)} className={fieldClass} />}</Field>
          <Field label="Payment terms">
            {() => <Select value={d.terms} onValueChange={(v) => set("terms", v)} options={TERMS.map(({ value, label }) => ({ value, label }))} ariaLabel="Payment terms" buttonClassName={selectBtnClass} />}
          </Field>
          <Field label="Currency">
            {() => <Select value={d.currency} onValueChange={(v) => set("currency", v)} options={CURRENCIES.map((c) => ({ value: c, label: c }))} ariaLabel="Currency" buttonClassName={selectBtnClass} />}
          </Field>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-ink-700">Work and amounts</legend>
          {d.items.map((item, i) => (
            <div key={item.id} className="rounded-xl border border-ink-100 p-3">
              <input
                aria-label={`Item ${i + 1} description`}
                value={item.description}
                onChange={(e) => setItem(item.id, { description: e.target.value })}
                className={fieldClass}
                placeholder="What you did, and for which period"
              />
              <div className="mt-2 grid grid-cols-[1fr_1fr_auto] items-end gap-2">
                <NumberInput ariaLabel={`Item ${i + 1} quantity`} value={item.quantity} onChange={(n) => setItem(item.id, { quantity: n })} step={0.5} suffix="qty" />
                <NumberInput ariaLabel={`Item ${i + 1} unit price`} value={item.unitPrice} onChange={(n) => setItem(item.id, { unitPrice: n })} step={1} suffix={d.currency} />
                <button
                  type="button"
                  onClick={() => set("items", d.items.length > 1 ? d.items.filter((x) => x.id !== item.id) : [blankItem()])}
                  className="px-2 py-2 text-xs font-medium text-ink-500 hover:text-ink-900"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => set("items", [...d.items, blankItem()])} className={ghostButtonClass}>
            Add a line
          </button>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tax">
            {() => <Select value={d.taxMode} onValueChange={(v) => set("taxMode", v as TaxMode)} options={TAX_MODES} ariaLabel="Tax" buttonClassName={selectBtnClass} />}
          </Field>
          {d.taxMode === "rate" && (
            <div className="grid grid-cols-2 gap-2">
              <Field label="Name">{(id) => <input id={id} value={d.taxLabel} onChange={(e) => set("taxLabel", e.target.value)} className={fieldClass} />}</Field>
              <Field label="Rate">{(id) => <NumberInput id={id} value={d.taxRate} onChange={(n) => set("taxRate", Math.max(0, n))} step={0.5} suffix="%" />}</Field>
            </div>
          )}
        </div>
        <Field label="How to pay you" hint="Bank name, account or IBAN, SWIFT/BIC, or a payment link.">
          {(id) => <textarea id={id} value={d.payment} onChange={(e) => set("payment", e.target.value)} className={textareaClass} />}
        </Field>
        <Field label="Notes">{(id) => <textarea id={id} value={d.notes} onChange={(e) => set("notes", e.target.value)} className={textareaClass} placeholder="Purchase order number, contract reference, thanks." />}</Field>
      </ToolCard>

      <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-wrap gap-2 print:hidden">
          <button type="button" onClick={() => window.print()} className={buttonClass}>
            Print or save as PDF
          </button>
          <button type="button" onClick={startNext} className={ghostButtonClass}>
            Start the next invoice
          </button>
          <button type="button" onClick={() => setD({ ...START, issued: new Date().toISOString().slice(0, 10) })} className={ghostButtonClass}>
            Clear everything
          </button>
        </div>

        <div id="invoice-sheet" className="rounded-2xl border border-ink-100 bg-[#ffffff] p-6 text-[13px] leading-relaxed text-[#2b2a26] shadow-card sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-2xl font-bold tracking-tight">Invoice</p>
              <p className="mt-1 text-[#605e59]">{d.number}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{d.fromName || "Your name"}</p>
              {d.fromEmail && <p>{d.fromEmail}</p>}
              {d.fromAddress && <p className="whitespace-pre-line">{d.fromAddress}</p>}
              {d.fromTaxId && <p>Tax ID: {d.fromTaxId}</p>}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#605e59]">Bill to</p>
              <p className="mt-1 font-semibold">{d.toName || "Client"}</p>
              {d.toAddress && <p className="whitespace-pre-line">{d.toAddress}</p>}
              {d.toTaxId && <p>VAT / tax ID: {d.toTaxId}</p>}
            </div>
            <div className="sm:text-right">
              <p>
                <span className="text-[#605e59]">Issued </span>
                {fmtDate(d.issued)}
              </p>
              <p>
                <span className="text-[#605e59]">Due </span>
                {term.days === 0 ? "on receipt" : fmtDate(due)}
              </p>
            </div>
          </div>

          <table className="mt-6 w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#e9e9e7] text-[11px] uppercase tracking-wide text-[#605e59]">
                <th className="py-2 pr-2 font-semibold">Description</th>
                <th className="py-2 pr-2 text-right font-semibold">Qty</th>
                <th className="py-2 pr-2 text-right font-semibold">Rate</th>
                <th className="py-2 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {d.items.map((item, i) => (
                <tr key={item.id} className="border-b border-[#f0efec] align-top">
                  <td className="py-2 pr-2">{item.description}</td>
                  <td className="py-2 pr-2 text-right tabular-nums">{item.quantity}</td>
                  <td className="py-2 pr-2 text-right tabular-nums">{money(item.unitPrice, d.currency)}</td>
                  <td className="py-2 text-right tabular-nums">{money(t.lines[i], d.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 ml-auto w-full max-w-[260px] space-y-1 tabular-nums">
            <div className="flex justify-between">
              <span className="text-[#605e59]">Subtotal</span>
              <span>{money(t.subtotal, d.currency)}</span>
            </div>
            {d.taxMode === "rate" && (
              <div className="flex justify-between">
                <span className="text-[#605e59]">
                  {d.taxLabel || "Tax"} ({d.taxRate}%)
                </span>
                <span>{money(t.tax, d.currency)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-[#e9e9e7] pt-1 text-[15px] font-bold">
              <span>Total due</span>
              <span>{money(t.total, d.currency)}</span>
            </div>
          </div>

          {d.taxMode === "reverse" && <p className="mt-4 font-semibold">Reverse charge: the customer accounts for the VAT on this supply.</p>}
          {d.payment && (
            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#605e59]">Payment details</p>
              <p className="mt-1 whitespace-pre-line">{d.payment}</p>
            </div>
          )}
          {d.notes && <p className="mt-4 whitespace-pre-line text-[#605e59]">{d.notes}</p>}
        </div>

        <p className="text-xs leading-relaxed text-ink-500 print:hidden">
          Everything stays in this browser: nothing is sent to us, and the draft is saved on this device so the next invoice starts where you left off. On a shared
          computer, use Clear everything when you finish. This is a layout tool, not tax advice; what an invoice must show depends on where you and your client are.
        </p>
      </div>
    </div>
  );
}
