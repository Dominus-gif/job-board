/**
 * The employer's complete description, fetched from their own board.
 *
 * WHY NOT STORE IT. The dataset is inlined into the Cloudflare Worker three
 * times over — measured at 2.75 MB gzipped per copy — against a 10 MB script
 * ceiling. 4,943 listings at a median 6,079 characters is roughly 30 MB of
 * text. It cannot live in the bundle at any cap, which is why the stored
 * excerpt kept getting cut: at 800 characters a Canonical listing ended
 * mid-word, 90 words into a 832-word posting.
 *
 * So the page asks the source instead. Five platforms carry 70% of the board
 * and all of them publish the posting as JSON. The fetch is cached by Next for
 * a day and the rendered page is itself cached by ISR in Workers KV, so a given
 * listing hits the employer's API about once a day however often it is read.
 *
 * Three things this buys beyond length: the text is always the CURRENT one
 * rather than a snapshot taken whenever we last imported; a posting the
 * employer has taken down answers 404, which the page can act on; and nothing
 * about it grows the bundle.
 *
 * Failure is always soft. Any error, any timeout, any platform we cannot
 * address returns null and the caller falls back to the stored excerpt — a
 * short description is a worse page, an error is not a page at all.
 */
import { atsAddress, postingEndpoint, type AtsAddress } from "./ats-address";
import { sanitizeDescription } from "./pipeline/text";

/** How long a fetched description is considered current. */
const REVALIDATE_SECONDS = 60 * 60 * 24;
const TIMEOUT_MS = 6000;

const UA = "getremotejobsnow/1.0 (+https://getremotejobsnow.com)";

/** Below this we assume we hit an error page rather than a posting. */
const MIN_USABLE_CHARS = 400;

function decodeEntities(input: string): string {
  return String(input || "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&rsquo;|&apos;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

const textLength = (html: string) =>
  decodeEntities(decodeEntities(html)).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;

async function getJson(url: string): Promise<unknown> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "application/json" },
      signal: ctrl.signal,
      // Cached by Next, so the employer's API sees roughly one request per
      // listing per day no matter how often the page is read.
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Pull the description out of whatever shape the platform returns. */
function extract(platform: AtsAddress["platform"], id: string, data: unknown): string | null {
  if (!data) return null;
  const obj = data as Record<string, unknown>;

  if (platform === "greenhouse") return String(obj.content ?? "") || null;

  if (platform === "lever") {
    const lists = Array.isArray(obj.lists) ? (obj.lists as Record<string, unknown>[]) : [];
    const body =
      String(obj.description ?? "") +
      lists.map((l) => `<h3>${String(l.text ?? "")}</h3>${String(l.content ?? "")}`).join("") +
      String(obj.additional ?? "");
    return body || null;
  }

  if (platform === "smartrecruiters") {
    const sections = (obj.jobAd as Record<string, unknown>)?.sections as
      | Record<string, { title?: string; text?: string }>
      | undefined;
    if (!sections) return null;
    return (
      Object.values(sections)
        .map((s) => (s?.title ? `<h3>${s.title}</h3>` : "") + String(s?.text ?? ""))
        .join("") || null
    );
  }

  if (platform === "ashby") {
    const jobs = Array.isArray(obj.jobs) ? (obj.jobs as Record<string, unknown>[]) : [];
    const hit = jobs.find((j) => String(j.id ?? "") === id);
    return hit ? String(hit.descriptionHtml ?? hit.descriptionPlain ?? "") || null : null;
  }

  // workable
  const jobs = Array.isArray(obj.jobs) ? (obj.jobs as Record<string, unknown>[]) : [];
  const hit = jobs.find((j) => String(j.shortcode ?? "") === id);
  if (!hit) return null;
  return [hit.description, hit.requirements, hit.benefits].map((v) => String(v ?? "")).join("") || null;
}

/**
 * JobPosting JSON-LD embedded in the employer's own page.
 *
 * Job sites publish this so Google for Jobs can read them, which makes it both
 * authoritative and complete wherever it exists — and it is the only general
 * route into the 1,565 hosts that are not one of the five ATS platforms.
 * Reaches roughly a third of them; the rest render their description from an
 * internal XHR and cannot be read without a browser.
 */
async function viaJsonLd(url: string): Promise<string | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml" },
      signal: ctrl.signal,
      redirect: "follow",
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const html = await res.text();
    for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
      let parsed: unknown;
      try {
        parsed = JSON.parse(m[1].trim());
      } catch {
        continue;
      }
      const nodes: unknown[] = Array.isArray(parsed)
        ? parsed
        : ((parsed as { "@graph"?: unknown[] })?.["@graph"] ?? [parsed]);
      for (const n of nodes) {
        const x = n as Record<string, unknown>;
        if (x?.["@type"] !== "JobPosting") continue;
        const desc = String(x.description ?? "");
        if (desc) return desc;
      }
    }
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * The full description for a listing, sanitised and ready to render, or null
 * when it cannot be had — in which case render what is stored.
 *
 * Only called for listings the build confirmed it could capture
 * (`has_full_description`). That gate matters: without it every one of the
 * ~2,000 listings whose description is unreachable would spend the timeout on
 * every cache miss, to fail.
 */
export async function fullDescription(job: {
  apply_url: string;
  has_full_description?: boolean;
}): Promise<string | null> {
  if (job.has_full_description === false) return null;

  let raw: string | null = null;
  const addr = atsAddress(job.apply_url);
  if (addr) {
    const endpoint = postingEndpoint(addr);
    if (endpoint) raw = extract(addr.platform, addr.id, await getJson(endpoint));
  }
  // Not on an ATS board, or the board did not answer: try the page itself.
  if (!raw) raw = await viaJsonLd(job.apply_url);
  if (!raw) return null;

  // Greenhouse escapes its HTML; decoding twice covers feeds that double-escape.
  const html = sanitizeDescription(decodeEntities(decodeEntities(raw)));
  if (textLength(html) < MIN_USABLE_CHARS) return null;
  return html;
}
