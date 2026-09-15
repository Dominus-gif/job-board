/**
 * Where a posting lives, worked out from its apply URL.
 *
 * Five ATS platforms carry 70% of the board and every one of them publishes a
 * public JSON endpoint for a single posting. That is what makes it possible to
 * show the employer's complete description without storing it: the page asks
 * the source at render time and Next's cache holds the answer.
 *
 * Shared by the job page (src/lib/job-description.ts) and the verification
 * sweep (scripts/verify-and-enrich.ts) so the two can never disagree about
 * which posting a listing points at.
 */
export type AtsPlatform = "ashby" | "greenhouse" | "lever" | "smartrecruiters" | "workable";

export interface AtsAddress {
  platform: AtsPlatform;
  /** The employer's board slug on that platform. */
  org: string;
  /** The posting id within that board, as it appears in the apply URL. */
  id: string;
}

export function atsAddress(applyUrl: string | undefined | null): AtsAddress | null {
  if (!applyUrl) return null;
  let u: URL;
  try {
    u = new URL(applyUrl);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, "");
  const seg = u.pathname.split("/").filter(Boolean);

  if (host === "jobs.ashbyhq.com" && seg[1]) return { platform: "ashby", org: seg[0], id: seg[1] };
  if (host.endsWith("greenhouse.io") && seg[0]) {
    // /<board>/jobs/<id>, or an embed carrying ?gh_jid=
    const id = seg[2] ?? u.searchParams.get("gh_jid") ?? "";
    return id ? { platform: "greenhouse", org: seg[0], id } : null;
  }
  if (host === "jobs.lever.co" && seg[1]) return { platform: "lever", org: seg[0], id: seg[1] };
  if (host === "jobs.smartrecruiters.com" && seg[1]) return { platform: "smartrecruiters", org: seg[0], id: seg[1] };
  if (host === "apply.workable.com" && seg[2]) return { platform: "workable", org: seg[0], id: seg[2] };
  return null;
}

/** The single-posting endpoint for an address, or null where there isn't one. */
export function postingEndpoint(a: AtsAddress): string | null {
  const org = encodeURIComponent(a.org);
  const id = encodeURIComponent(a.id);
  switch (a.platform) {
    case "greenhouse":
      return `https://boards-api.greenhouse.io/v1/boards/${org}/jobs/${id}`;
    case "lever":
      return `https://api.lever.co/v0/postings/${org}/${id}`;
    case "smartrecruiters":
      return `https://api.smartrecruiters.com/v1/companies/${org}/postings/${id}`;
    case "ashby":
      // Ashby has no single-posting endpoint; the board carries every posting.
      return `https://api.ashbyhq.com/posting-api/job-board/${org}`;
    case "workable":
      return `https://apply.workable.com/api/v1/widget/accounts/${org}?details=true`;
  }
}
