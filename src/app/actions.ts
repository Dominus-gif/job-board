"use server";

import { addSubscriber, addSubmission } from "@/lib/db";
import { sanitizeDescription } from "@/lib/pipeline/text";
import { SUPABASE } from "@/lib/site";
import { CATEGORIES } from "@/lib/taxonomy";

export interface ActionResult {
  ok: boolean;
  message: string;
}

/** Newsletter signup (spec section 5 — store subscribers). */
export async function subscribeAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") || "");
  return addSubscriber(email);
}

/** Categories a visitor may subscribe to (all real categories + an "everything" option). */
const SUBSCRIBABLE = new Set<string>([...CATEGORIES, "All categories"]);

/**
 * Role-targeted subscription: email + a chosen job category, persisted to
 * Supabase. One row per email; re-submitting with a new category merges it into
 * the subscription while keeping the full history (see supabase/schema.sql).
 */
export async function subscribeRoleAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const category = String(formData.get("category") || "").trim();

  // Category first — the widget must not submit without a selection.
  if (!category) return { ok: false, message: "Please select a job category first." };
  if (!SUBSCRIBABLE.has(category)) return { ok: false, message: "Please choose a valid job category." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, message: "Enter a valid email address." };

  if (!SUBSCRIBABLE.size || !SUPABASE.ready) {
    // Widget is shown when the project URL is set, but writes also need the
    // service-role key. Fail loudly in logs, softly to the visitor.
    console.error("[subscribeRole] Supabase not fully configured (need NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY).");
    return { ok: false, message: "Subscriptions are temporarily unavailable. Please try again later." };
  }

  try {
    const res = await fetch(`${SUPABASE.url}/rest/v1/rpc/subscribe_category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE.serviceKey,
        Authorization: `Bearer ${SUPABASE.serviceKey}`,
      },
      body: JSON.stringify({ p_email: email, p_category: category }),
      cache: "no-store",
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[subscribeRole] RPC failed", res.status, detail);
      return { ok: false, message: "Something went wrong saving your subscription. Please try again." };
    }
  } catch (err) {
    console.error("[subscribeRole] RPC error", (err as Error)?.message);
    return { ok: false, message: "Something went wrong saving your subscription. Please try again." };
  }

  const label = category === "All categories" ? "all new remote jobs" : `new remote ${category} jobs`;
  return { ok: true, message: `You're subscribed to ${label}. We'll email you when they're posted.` };
}

/** Paid/featured job submission that skips the ATS pipeline (spec /hiring). */
export async function submitJobAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const title = String(formData.get("title") || "").trim();
  const company_name = String(formData.get("company_name") || "").trim();
  const apply_url = String(formData.get("apply_url") || "").trim();
  const contact_email = String(formData.get("contact_email") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const is_featured = formData.get("is_featured") === "on";

  if (!title || !company_name || !apply_url || !contact_email) {
    return { ok: false, message: "Please fill in the title, company, apply URL, and contact email." };
  }
  if (!/^https?:\/\//.test(apply_url)) {
    return { ok: false, message: "The apply URL must start with http:// or https://." };
  }

  addSubmission({
    title,
    company_name,
    apply_url,
    contact_email,
    description_html: sanitizeDescription(description.replace(/\n/g, "<br/>")),
    is_featured,
  });

  return {
    ok: true,
    message: "Thanks! Your submission is in the review queue. We'll email you once it's approved and live.",
  };
}

// ---------------------------------------------------------------------------
// Retention: saved-search alerts + cross-device sync
// ---------------------------------------------------------------------------

/** Shared PostgREST RPC caller. Returns parsed JSON, or null on any failure. */
async function rpc<T>(fn: string, body: Record<string, unknown>): Promise<T | null> {
  if (!SUPABASE.ready) {
    console.error(`[${fn}] Supabase not configured (need NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY).`);
    return null;
  }
  try {
    const res = await fetch(`${SUPABASE.url}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE.serviceKey,
        Authorization: `Bearer ${SUPABASE.serviceKey}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`[${fn}] RPC failed`, res.status, await res.text().catch(() => ""));
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[${fn}] RPC error`, (err as Error)?.message);
    return null;
  }
}

/** Filter keys a saved search may carry. Anything else is dropped. */
const SEARCH_KEYS = ["q", "category", "region", "salary", "type", "scope", "disc"] as const;

/** Stable fingerprint so re-saving the same search updates instead of duplicating. */
function fingerprintParams(params: Record<string, string>): string {
  const canonical = SEARCH_KEYS.map((k) => `${k}=${params[k] ?? ""}`).join("&");
  // Small non-cryptographic hash — this only needs to be stable and collision-
  // resistant enough to dedupe one person's own searches.
  let h = 5381;
  for (let i = 0; i < canonical.length; i++) h = ((h << 5) + h + canonical.charCodeAt(i)) >>> 0;
  return `s${h.toString(36)}`;
}

/**
 * Subscribe to a SPECIFIC search rather than a broad category — "senior backend,
 * Europe, worldwide only" instead of just "Backend". Upserts on (email, params)
 * so saving the same search twice updates it.
 */
export async function subscribeSearchAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, message: "Enter a valid email address." };

  const params: Record<string, string> = {};
  for (const k of SEARCH_KEYS) {
    const v = String(formData.get(k) || "").trim();
    if (v) params[k] = v.slice(0, 120);
  }
  if (Object.keys(params).length === 0) {
    return { ok: false, message: "Add at least one filter before saving this search." };
  }

  const label = String(formData.get("label") || "").trim().slice(0, 200) || "Saved search";
  const out = await rpc("subscribe_search", {
    p_email: email,
    p_label: label,
    p_params: params,
    p_fingerprint: fingerprintParams(params),
  });
  if (!out) return { ok: false, message: "Something went wrong saving your alert. Please try again." };

  return { ok: true, message: `Saved. We'll email you when new roles match "${label}".` };
}

/** Push bookmarks + saved searches into a sync bucket, returning the code. */
export async function syncPushAction(code: string, payload: unknown): Promise<{ ok: boolean; code?: string; message: string }> {
  const clean = /^[A-Z0-9]{8,12}$/.test(code) ? code : "";
  if (!clean) return { ok: false, message: "Invalid sync code." };

  const out = await rpc<{ code: string }>("sync_push", { p_code: clean, p_payload: payload });
  if (!out) return { ok: false, message: "Couldn't save your data right now. Please try again." };
  return { ok: true, code: clean, message: "Synced." };
}

/** Pull a sync bucket's payload by code. */
export async function syncPullAction(code: string): Promise<{ ok: boolean; payload?: unknown; message: string }> {
  const clean = String(code || "").trim().toUpperCase();
  if (!/^[A-Z0-9]{8,12}$/.test(clean)) return { ok: false, message: "That code doesn't look right." };

  const payload = await rpc<unknown>("sync_pull", { p_code: clean });
  if (payload === null || payload === undefined) {
    return { ok: false, message: "No data found for that code — check it and try again." };
  }
  return { ok: true, payload, message: "Restored." };
}
