import type { Job } from "./types";

/**
 * Liveness verification.
 *
 * A published job can be pulled by the employer at any moment. Before we show
 * an "Apply" button we confirm the ORIGINAL ATS posting still exists, by
 * re-querying the provider's single-posting API (the reliable signal — a
 * removed posting returns 404, whereas the public apply URL only 301-redirects
 * to the board and would look "alive").
 *
 * Returns true = still open, false = removed/inactive.
 * Network errors are treated as "still live" so a transient blip never hides a
 * real job; only a definitive 404/410 marks a posting inactive.
 */
const UA = { "User-Agent": "AnywhereJobs/0.1 (+https://anywherejobs.example)" };

async function status(url: string): Promise<number | null> {
  try {
    const res = await fetch(url, {
      headers: UA,
      redirect: "manual",
      cache: "no-store",
      signal: AbortSignal.timeout(4000), // never hang the check
    });
    return res.status;
  } catch {
    return null; // network error / timeout -> unknown
  }
}

export async function verifyJobLive(job: Job): Promise<boolean> {
  // Seed/demo and manually-posted jobs aren't backed by a live ATS posting.
  if (job.source !== "ats" || job.id.startsWith("seed:")) return true;

  const token = job.board_token;
  const id = job.ats_job_id;
  if (!token || !id) return true; // can't verify -> don't hide

  let url: string | null = null;
  switch (job.provider) {
    case "greenhouse":
      url = `https://boards-api.greenhouse.io/v1/boards/${token}/jobs/${id}`;
      break;
    case "lever":
      url = `https://api.lever.co/v0/postings/${token}/${id}`;
      break;
    case "ashby":
    case "smartrecruiters":
      // No public single-posting endpoint; probe the apply page instead.
      url = job.apply_url;
      break;
    case "workable":
      url = `https://${token}.workable.com/spi/v3/jobs/${id}`;
      break;
    default:
      return true;
  }

  const code = await status(url);
  if (code === null) return true; // unknown -> keep it live
  // 404/410 = removed. Everything else (200, 301, 302…) = treat as live.
  return code !== 404 && code !== 410;
}
