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
