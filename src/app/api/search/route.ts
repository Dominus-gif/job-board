import { getSearchableJobs } from "@/lib/db";
import { CATEGORIES } from "@/lib/taxonomy";
import { SALARY_BANDS } from "@/lib/salary";
import { REGIONS, TYPES, filterJobs, parseFilters, searchUrl, sortJobs } from "@/lib/job-search";
import { abs } from "@/lib/site";

/**
 * Read-only JSON search over the board. Same query parameters as /jobs, same
 * predicate (see @/lib/job-search), so an answer from here can never contradict
 * the page.
 *
 * It exists for the WebMCP tools in src/components/AgentTools.tsx: an assistant
 * driving the site needs the board's own answer to "what Python jobs are open
 * worldwide", and the alternative was letting it scrape a paginated HTML page
 * twenty rows at a time.
 *
 * Nothing here reads or writes anything about the caller: no body is accepted,
 * no cookie is read, no row is modified. Every result carries the URL of the
 * human page it came from, so a cited answer can be checked.
 */
export const revalidate = 1800;

/** How many listings one call may return. */
const MAX_LIMIT = 50;
const DEFAULT_LIMIT = 10;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sp = Object.fromEntries(url.searchParams);
  const f = parseFilters(sp);

  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(sp.limit) || DEFAULT_LIMIT));
  const all = await getSearchableJobs();
  const matched = sortJobs(filterJobs(all, f), f.sort || "newest");

  const body = {
    // What the board understood the question to be. An agent that passed an
    // unknown category or region can see that it was dropped rather than
    // silently believing it was applied.
    query: {
      q: f.q || null,
      category: f.category || null,
      region: f.region || null,
      employment_type: f.type || null,
      scope: f.scope || null,
      min_salary_band: f.salary || null,
      salary_disclosed_only: f.disc,
      sort: f.sort || "newest",
      limit,
    },
    total_matched: matched.length,
    returned: Math.min(limit, matched.length),
    /** The human page for this same search, for citing and for handing back. */
    page_url: abs(searchUrl(f)),
    results: matched.slice(0, limit).map((j) => ({
      title: j.title,
      company: j.company_name,
      category: j.category,
      employment_type: j.employment_type,
      /** "worldwide" means no country, region or timezone requirement at all. */
      scope: j.scope,
      location: j.location,
      salary:
        j.salary && (j.salary.min != null || j.salary.max != null)
          ? { min: j.salary.min, max: j.salary.max, currency: j.salary.currency }
          : null,
      posted_at: j.posted_at,
      skills: j.skills.slice(0, 8),
      url: abs(`/jobs/${j.slug}`),
    })),
    /** So a caller can correct a rejected filter without guessing. */
    accepted_values: {
      category: CATEGORIES,
      region: REGIONS,
      employment_type: TYPES,
      scope: ["worldwide", "regional"],
      min_salary_band: SALARY_BANDS.map((b) => b.id),
      sort: ["newest", "salary"],
    },
    source: {
      board: abs("/"),
      method: abs("/posts/how-we-source-and-verify-listings"),
      note: "Listings are rebuilt nightly from employers' own hiring systems. Counts change daily; cite the date you fetched this.",
    },
  };

  return Response.json(body, {
    headers: {
      // Cheap for us and for the caller: the board only changes nightly.
      "cache-control": "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400",
      // A JSON answer about public listings, usable from a page or a notebook.
      "access-control-allow-origin": "*",
    },
  });
}
