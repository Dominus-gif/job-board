import { CATEGORIES } from "@/lib/taxonomy";
import { SALARY_BANDS } from "@/lib/salary";
import { REGIONS, TYPES } from "@/lib/job-search";

/**
 * WebMCP tools, so an AI assistant browsing this site can ask the board a
 * question instead of scraping a paginated page twenty rows at a time.
 *
 * WebMCP (W3C Web Machine Learning CG draft, checked 2026-10-02) lets a page
 * register named tools that an in-browser agent calls directly. Chrome and Edge
 * expose it behind an origin trial or flag, ChatGPT's desktop browser calls
 * imperative tools by default, and Safari has filed an `oppose` position. So
 * this is a progressive enhancement and nothing here is load-bearing: in every
 * browser that has never heard of it, the first line of the script reads one
 * undefined property and stops.
 *
 * Three rules this file follows, from the spec's own safety guidance:
 *
 *  1. Every tool is read-only and hits the same endpoint the UI hits. There is
 *     no privileged path and no tool an agent can use to do something a visitor
 *     could not. Nothing registered here writes a row, reads a cookie, or takes
 *     an email address — the subscribe and contact forms are deliberately NOT
 *     exposed, because an agent should never be the thing that hands over
 *     somebody's address.
 *  2. Anything returning employer-written text is marked
 *     `untrustedContentHint`. Job titles and descriptions come from third
 *     parties and could contain text aimed at the agent reading them.
 *  3. Every parameter carries a name, a title and a description. Lighthouse's
 *     `webmcp-schema-validity` audit scores a warning as 0.5, which counts as a
 *     failure, and a parameter missing a description is a warning.
 *
 * Performance: this renders as one inline script at the very end of <body>, so
 * it is parsed after everything visible and pulls nothing into the client
 * bundle. Registration is not deferred to idle — Lighthouse collects the tool
 * list once the page goes quiet, and an idle callback that lands after the
 * gatherer would read as "no tools".
 */

/** Enum values come from the real taxonomy, so a tool can never offer a filter the board would drop. */
const SALARY_BAND_IDS = SALARY_BANDS.filter((b) => b.id).map((b) => b.id);

type ToolSpec = {
  name: string;
  title: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, { type: string; title: string; description: string; enum?: readonly string[]; minimum?: number; maximum?: number }>;
    required?: string[];
  };
  annotations: Record<string, boolean>;
  /** Which handler in the script below runs this tool. */
  handler: "search" | "status" | "scope";
};

export const AGENT_TOOLS: ToolSpec[] = [
  {
    name: "search_remote_jobs",
    title: "Search remote jobs",
    description:
      "Search the live remote job board. Returns matching listings with company, location, work-from-anywhere scope, published salary when there is one, and a link to each job page. Use scope='worldwide' for roles with no country, region or timezone requirement at all.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          title: "Keywords",
          description: "Free-text keywords matched against job title, company, field and skills. For example 'python', 'customer support' or 'figma'.",
        },
        category: {
          type: "string",
          title: "Field",
          description: "Restrict results to one field of work. Omit to search every field.",
          enum: CATEGORIES,
        },
        region: {
          type: "string",
          title: "Region",
          description: "Restrict results to roles open to people in this region. 'Worldwide' means open everywhere. Omit to search every region.",
          enum: REGIONS,
        },
        scope: {
          type: "string",
          title: "Location scope",
          description: "'worldwide' returns only roles with no location requirement of any kind; 'regional' returns remote roles tied to a named country or region. Omit for both.",
          enum: ["worldwide", "regional"],
        },
        employment_type: {
          type: "string",
          title: "Employment type",
          description: "Restrict results to full-time, part-time or contract roles. Omit for all three.",
          enum: TYPES,
        },
        min_salary_band: {
          type: "string",
          title: "Minimum salary band",
          description: "Return only roles whose published pay reaches this band. Bands are USD-equivalent identifiers from the board's own filter. Omit for no pay floor.",
          enum: SALARY_BAND_IDS,
        },
        salary_disclosed_only: {
          type: "boolean",
          title: "Only listings that publish pay",
          description: "True returns only roles that publish a salary range, which is a minority of listings. Defaults to false.",
        },
        sort: {
          type: "string",
          title: "Sort order",
          description: "'newest' sorts by posting date, 'salary' by published pay. Defaults to newest.",
          enum: ["newest", "salary"],
        },
        limit: {
          type: "number",
          title: "Number of results",
          description: "How many listings to return, from 1 to 50. Defaults to 10.",
          minimum: 1,
          maximum: 50,
        },
      },
    },
    // Reads public listings only. The text it returns was written by employers.
    annotations: { readOnlyHint: true, untrustedContentHint: true },
    handler: "search",
  },
  {
    name: "check_remote_job_still_open",
    title: "Check whether a job is still open",
    description:
      "Check whether one listing is still on the board. A sweep re-checks every listing's apply link against the employer's site on a schedule and retires the ones that 404, so a role missing here has been withdrawn or filled. This does not re-query the employer at call time, so treat a positive answer as 'not known to be gone' rather than as a guarantee the role is open.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          title: "Job slug",
          description: "The job's identifier, the last path segment of its page URL. For example 'senior-backend-engineer-acme' from /jobs/senior-backend-engineer-acme.",
        },
      },
      required: ["slug"],
    },
    annotations: { readOnlyHint: true },
    handler: "status",
  },
  {
    name: "explain_remote_location_scopes",
    title: "Explain how this board labels remote locations",
    description:
      "Explain what this board means by work-from-anywhere versus regional remote, and what it excludes. Read this before summarising counts from the board, because the distinction is stricter than the word 'remote' usually implies.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
    handler: "scope",
  },
];

/**
 * The answer `explain_remote_location_scopes` returns. Kept here rather than
 * fetched: it is the one thing an agent most often gets wrong about this board,
 * and it is the same explanation /how-it-works gives a person.
 */
const SCOPE_EXPLANATION = [
  "This board sorts every remote job by where you can actually work from.",
  "",
  "work-from-anywhere (scope='worldwide'): the employer names no country, no region, no timezone window and no local work-authorisation requirement. This is a small minority of remote jobs.",
  "regional (scope='regional'): genuinely remote, but limited to a named country or region, which is shown on every listing.",
  "",
  "Excluded from both: anything asking for office days, a hybrid schedule or commuting distance. A role whose title names a place ('Account Executive, EMEA') is treated as regional whatever its location field says.",
  "",
  "Counts change nightly, because the board is rebuilt from employers' own hiring systems each night. Cite the date you fetched a number.",
  "Full method: https://getremotejobsnow.com/posts/how-we-source-and-verify-listings",
].join("\n");

/**
 * The registration script.
 *
 * Written as plain ES5-compatible JS with no template literals in the output, so
 * it is safe to inline and cheap to parse. The specs are injected as JSON; only
 * the handlers live here.
 */
function script(): string {
  return `(function(){
var mc = document.modelContext || navigator.modelContext;
if (!mc || typeof mc.registerTool !== "function") return;
var SPECS = ${JSON.stringify(AGENT_TOOLS)};
var SCOPE_TEXT = ${JSON.stringify(SCOPE_EXPLANATION)};
function text(value){
  return { content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value) }] };
}
async function getJson(path){
  var r = await fetch(path, { headers: { accept: "application/json" } });
  if (!r.ok) throw new Error("Request failed with status " + r.status);
  return r.json();
}
var H = {
  search: async function(input){
    var i = input || {};
    var p = new URLSearchParams();
    if (i.query) p.set("q", String(i.query));
    if (i.category) p.set("category", String(i.category));
    if (i.region) p.set("region", String(i.region));
    if (i.scope) p.set("scope", String(i.scope));
    if (i.employment_type) p.set("type", String(i.employment_type));
    if (i.min_salary_band) p.set("salary", String(i.min_salary_band));
    if (i.salary_disclosed_only) p.set("disc", "1");
    if (i.sort) p.set("sort", String(i.sort));
    if (i.limit) p.set("limit", String(i.limit));
    return text(await getJson("/api/search?" + p.toString()));
  },
  status: async function(input){
    var slug = input && input.slug ? String(input.slug).trim().replace(/^.*\\//, "") : "";
    if (!slug) return text({ error: "A job slug is required." });
    var d = await getJson("/api/job-status?slug=" + encodeURIComponent(slug));
    return text({
      slug: slug,
      still_open: !!d.active,
      checked_at: new Date().toISOString(),
      note: d.active
        ? "The employer's hiring system still lists this role."
        : "The employer's hiring system no longer lists this role, so it is filled, closed or withdrawn."
    });
  },
  scope: async function(){ return text(SCOPE_TEXT); }
};
for (var n = 0; n < SPECS.length; n++) {
  (function(spec){
    var run = H[spec.handler];
    try {
      mc.registerTool({
        name: spec.name,
        title: spec.title,
        description: spec.description,
        inputSchema: spec.inputSchema,
        annotations: spec.annotations,
        execute: async function(input){
          try { return await run(input); }
          catch (e) { return text({ error: String((e && e.message) || e) }); }
        }
      });
    } catch (e) { /* an engine with a different draft shape must not break the page */ }
  })(SPECS[n]);
}
})();`;
}

export function AgentTools() {
  return <script id="webmcp-tools" dangerouslySetInnerHTML={{ __html: script() }} />;
}
