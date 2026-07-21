import { forceRefresh } from "./store";

/**
 * Background listing refresher.
 *
 * On a long-running server (`next start`, self-hosted, Docker) this re-scrapes
 * every ATS board + feed on a fixed interval — no traffic and no manual action
 * required. Combined with ISR (pages revalidate on traffic) and the Vercel cron,
 * listings stay current automatically. Default cadence: hourly.
 *
 * (On Vercel's serverless functions a timer can't persist between invocations,
 * so there the cron + ISR do the refreshing — see /api/ingest.)
 */
let started = false;

export function startScheduler(): void {
  if (started) return;
  started = true;

  const intervalMs = Number(process.env.ANYWHERE_REFRESH_MS ?? 60 * 60 * 1000); // hourly

  const run = async () => {
    try {
      const jobs = await forceRefresh();
      console.log(`[scheduler] listings refreshed: ${jobs.length} jobs @ ${new Date().toISOString()}`);
    } catch (err) {
      console.warn("[scheduler] refresh failed:", (err as Error)?.message);
    }
  };

  // Warm once on boot, then on the interval.
  void run();
  const timer = setInterval(() => void run(), intervalMs);
  if (typeof timer.unref === "function") timer.unref(); // don't hold the process open

  console.log(`[scheduler] auto-refreshing listings every ${Math.round(intervalMs / 60000)} min.`);
}
