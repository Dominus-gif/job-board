import { getCompanyAllowList } from "@/lib/db";
import { ingestAndProcess } from "@/lib/pipeline";

/**
 * Scheduled ingestion endpoint (spec section 3 — hourly cron).
 *
 * Deploy as a Vercel Cron / scheduled worker hitting this route. It polls every
 * company on the allow-list, runs the filter + enrichment pipeline, and returns
 * a report. In this demo it does NOT persist — wire the returned `jobs` into
 * your Postgres upsert here (see README "Storage" / "Ingestion").
 *
 * Auth: Vercel Cron automatically sends `Authorization: Bearer $CRON_SECRET`.
 * We accept that, or an `INGEST_SECRET` via the same header or `?secret=`.
 * If neither env var is set the endpoint is open (fine for local/demo).
 */
export const dynamic = "force-dynamic";
export const maxDuration = 60;

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

  const companies = getCompanyAllowList();
  const report = await ingestAndProcess(companies);

  // TODO(persistence): upsert report.jobs into Postgres and unpublish expired.
  return Response.json({
    ok: true,
    ranAt: new Date().toISOString(),
    fetched: report.fetched,
    deduped: report.deduped,
    accepted: report.accepted,
    rejected: report.rejected,
    sampleRejections: report.rejections.slice(0, 10),
  });
}
