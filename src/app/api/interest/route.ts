import { getJobBySlug } from "@/lib/db";
import { addInterest } from "@/lib/interest";

/**
 * Register candidate interest in a listing. Enough interest promotes it to
 * "In demand" and floats it up the feed (organic counterpart to paid featuring).
 * In-memory in this demo — see README "Interest & demand-based featuring".
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const slug = new URL(req.url).searchParams.get("slug");
  if (!slug) return Response.json({ error: "missing slug" }, { status: 400 });

  const job = await getJobBySlug(slug);
  if (!job) return Response.json({ error: "not found" }, { status: 404 });

  addInterest(slug);
  const updated = await getJobBySlug(slug);
  return Response.json({ interest: updated?.interest ?? job.interest, in_demand: updated?.in_demand ?? false });
}

export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get("slug");
  if (!slug) return Response.json({ error: "missing slug" }, { status: 400 });
  const job = await getJobBySlug(slug);
  if (!job) return Response.json({ error: "not found" }, { status: 404 });
  return Response.json({ interest: job.interest, in_demand: job.in_demand });
}
