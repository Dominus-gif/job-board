import { revalidatePath } from "next/cache";
import { forceRefresh } from "@/lib/store";

/**
 * Scheduled ingestion endpoint (the automatic updater on serverless hosts).
 *
 * Vercel Cron hits this route on a schedule. It re-scrapes every ATS board +
 * feed (via forceRefresh), then revalidates the key pages so the live site
 * shows the fresh listings — no manual action required.
 *
 * Auth: Vercel Cron automatically sends `Authorization: Bearer $CRON_SECRET`.
 * We accept that, or an `INGEST_SECRET` via the same header or `?secret=`.
 * If neither env var is set the endpoint is open (fine for local/demo).
 */
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const REVALIDATE = ["/", "/companies", "/page/1"];

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET || process.env.INGEST_SECRET;
  if (secret) {
    const provided =
      new URL(req.url).searchParams.get("secret") ||
      req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (provided !== secret) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const jobs = await forceRefresh();
  for (const path of REVALIDATE) {
    try {
      revalidatePath(path);
    } catch {
      /* revalidation is best-effort */
    }
  }

  return Response.json({ ok: true, ranAt: new Date().toISOString(), jobs: jobs.length });
}
