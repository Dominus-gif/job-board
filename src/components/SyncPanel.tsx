"use client";

import { useState } from "react";
import { getBookmarks, getSyncCode, mergeBookmarks, setSyncCode } from "@/lib/bookmarks";
import { syncPullAction, syncPushAction } from "@/app/actions";
import type { Job } from "@/lib/types";

type Status = { kind: "idle" | "busy" | "ok" | "err"; message?: string };

/**
 * Cross-device sync for saved jobs — deliberately NOT an account.
 *
 * Bookmarks live in localStorage, so they've been stuck on one browser. This
 * copies them into a bucket addressed by a random code you carry to the other
 * device. No password, no email, no session: the code is the whole mechanism,
 * which is why it only ever holds job slugs, never anything sensitive.
 */
export function SyncPanel() {
  const [code, setCode] = useState<string>("");
  const [entry, setEntry] = useState("");
  const [push, setPush] = useState<Status>({ kind: "idle" });
  const [pull, setPull] = useState<Status>({ kind: "idle" });

  async function handlePush() {
    setPush({ kind: "busy" });
    const c = getSyncCode();
    const jobs = getBookmarks();
    const res = await syncPushAction(c, { v: 1, bookmarks: jobs.slice(0, 200) });
    if (res.ok) {
      setCode(c);
      setPush({ kind: "ok", message: `${jobs.length} saved ${jobs.length === 1 ? "job" : "jobs"} backed up.` });
    } else {
      setPush({ kind: "err", message: res.message });
    }
  }

  async function handlePull(e: React.FormEvent) {
    e.preventDefault();
    setPull({ kind: "busy" });
    const res = await syncPullAction(entry);
    if (!res.ok) {
      setPull({ kind: "err", message: res.message });
      return;
    }
    const payload = res.payload as { bookmarks?: Job[] } | null;
    const added = mergeBookmarks(payload?.bookmarks ?? []);
    // Adopt the code so both devices now push to the same bucket.
    setSyncCode(entry);
    setPull({
      kind: "ok",
      message: added > 0 ? `Added ${added} saved ${added === 1 ? "job" : "jobs"} from your other device.` : "Already up to date.",
    });
  }

  return (
    <section className="mt-10 rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
      <h2 className="font-display text-base font-bold text-ink-900">Use your saved jobs on another device</h2>
      <p className="mt-1 text-sm text-ink-500">
        Saved jobs normally live only in this browser. Back them up to get a code, then enter that code on your phone or
        laptop to bring them across. No account required.
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {/* Push */}
        <div>
          <h3 className="field-label">On this device</h3>
          <button type="button" onClick={handlePush} disabled={push.kind === "busy"} className="btn-primary mt-2 disabled:opacity-60">
            {push.kind === "busy" ? "Backing up…" : "Back up my saved jobs"}
          </button>
          {code && (
            <div className="mt-3">
              <p className="text-xs text-ink-500">Your sync code — keep it private:</p>
              <code className="mt-1 inline-block select-all rounded-lg bg-ink-50 px-3 py-2 font-mono text-base font-semibold tracking-[0.2em] text-ink-900 ring-1 ring-inset ring-ink-100">
                {code}
              </code>
            </div>
          )}
          {push.message && (
            <p role="status" className={`mt-2 text-sm ${push.kind === "ok" ? "text-emerald-700" : "text-red-600"}`}>{push.message}</p>
          )}
        </div>

        {/* Pull */}
        <div>
          <h3 className="field-label">On your other device</h3>
          <form onSubmit={handlePull} className="mt-2 flex flex-col gap-2 sm:flex-row">
            <label htmlFor="sync-code" className="sr-only">Sync code</label>
            <input
              id="sync-code"
              value={entry}
              onChange={(e) => setEntry(e.target.value.toUpperCase())}
              placeholder="Enter code"
              maxLength={12}
              className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 font-mono tracking-widest text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            <button type="submit" disabled={pull.kind === "busy" || !entry} className="btn-ghost shrink-0 disabled:opacity-60">
              {pull.kind === "busy" ? "Restoring…" : "Restore"}
            </button>
          </form>
          {pull.message && (
            <p role="status" className={`mt-2 text-sm ${pull.kind === "ok" ? "text-emerald-700" : "text-red-600"}`}>{pull.message}</p>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs text-ink-400">
        Anyone with your code can see the jobs you saved, so treat it like a password. Codes expire after 180 days of disuse.
      </p>
    </section>
  );
}
