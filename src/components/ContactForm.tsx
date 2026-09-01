"use client";

import { useState } from "react";
import { CheckIcon } from "./icons";

/**
 * Contact form wired for Web3Forms (https://web3forms.com). Drop your access key
 * into NEXT_PUBLIC_WEB3FORMS_KEY (or replace the fallback below) to go live — the
 * form posts JSON to their API and shows an inline success/error state. No data
 * is sent anywhere until a visitor submits.
 */
const ACCESS_KEY = (process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "1fc4f7b9-f01e-4cea-ba0e-560f07467f89").trim();
const ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "sending" | "sent" | "error";

const fieldBase =
  "w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-ink-900 placeholder:text-ink-400 focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-200";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(json.message || "Something went wrong — please try again in a moment.");
      }
    } catch {
      setStatus("error");
      setError("Couldn't reach the server — please check your connection and try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="not-prose flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
          <CheckIcon className="h-4 w-4" />
        </span>
        <div>
          <p className="font-semibold">Thanks — your message is on its way.</p>
          <p className="mt-0.5 text-sm text-emerald-700">We usually reply within one business day.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="not-prose space-y-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
      {/* Web3Forms config + light spam honeypot */}
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value="New getremotejobsnow.com contact message" />
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-700">Name</span>
          <input name="name" type="text" required autoComplete="name" placeholder="Your name" className={fieldBase} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-700">Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={fieldBase} />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-700">
          Link <span className="font-normal text-ink-400">(job posting or reference — optional)</span>
        </span>
        <input name="link" type="url" inputMode="url" placeholder="https://…" className={fieldBase} />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-700">Message</span>
        <textarea name="message" required rows={5} placeholder="How can we help?" className={`${fieldBase} resize-y`} />
      </label>

      {status === "error" && (
        <p className="text-sm font-medium text-red-600" role="alert">{error}</p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full sm:w-auto disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
