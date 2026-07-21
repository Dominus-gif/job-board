"use server";

import { addSubscriber, addSubmission } from "@/lib/db";
import { sanitizeDescription } from "@/lib/pipeline/text";

export interface ActionResult {
  ok: boolean;
  message: string;
}

/** Newsletter signup (spec section 5 — store subscribers). */
export async function subscribeAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") || "");
  return addSubscriber(email);
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
