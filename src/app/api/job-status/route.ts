import { getJobBySlug } from "@/lib/db";
import { verifyJobLive } from "@/lib/liveness";

/**
 * Liveness check for a single job, called from the client AFTER the page paints
 * so the ATS round-trip never blocks the initial render (keeps job pages fast).
 * Returns { active } — the apply UI reacts to it.
 */
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get("slug");
  if (!slug) return Response.json({ active: false, reason: "missing slug" }, { status: 400 });

  const job = await getJobBySlug(slug);
  if (!job) return Response.json({ active: false }); // dropped from feed => removed

  const active = await verifyJobLive(job);
  return Response.json({ active });
}
