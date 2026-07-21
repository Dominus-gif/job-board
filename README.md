# AnywhereJobs 🌍

**The only job board where every job is truly location-independent.**

A Next.js job board that aggregates roles from company ATS boards, filters
*ruthlessly* for jobs that can be done from anywhere in the world (no country,
region, or timezone restriction), enriches them, and republishes them as clean,
SEO-optimized pages.

This single strict filter is the entire product. A role like "Remote (US only)"
or "must overlap EST" is **rejected** — precision over recall, because the brand
promise depends on it.

---

## Quick start

```bash
npm install
cp .env.example .env.local      # optional; sensible defaults work out of the box
npm run dev                     # http://localhost:3000
```

Other commands:

```bash
npm run build        # production build (all job/landing pages are SSG)
npm run test         # run the pipeline unit tests (vitest)
npm run ingest       # offline dry-run of the pipeline over seed data
npm run ingest -- --live   # actually poll the ATS allow-list
```

Requires Node 18+ (developed on Node 24).

---

## Deploy to Vercel

The app is a standard Next.js App Router project and deploys to Vercel with no
extra configuration:

1. Push the repo to GitHub/GitLab and **Import Project** in Vercel (it
   auto-detects Next.js; `vercel.json` sets the framework and a daily ingest
   cron).
2. Set environment variables in **Project → Settings → Environment Variables**.
   All are optional — sensible defaults apply — but for production you'll want:

   | Variable | Purpose |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | Your final domain (e.g. `https://anywherejobs.com`). If omitted, the Vercel URL is auto-detected for canonical links, sitemap, RSS, and JSON-LD. |
   | `ANYWHERE_LIVE` | `true` (default) pulls live jobs at build/runtime; `false` builds from bundled seed for a fast, deterministic build. |
   | `CRON_SECRET` | Secret Vercel Cron sends to `/api/ingest`; the route also accepts `INGEST_SECRET`. |
   | `NEXT_PUBLIC_ADSENSE_CLIENT` / `NEXT_PUBLIC_ADSENSE_SLOT` | Turn on AdSense (see "Google AdSense"). |

3. Click **Deploy**. The build runs the live ingestion and statically generates
   all job/company/landing pages; pages refresh via ISR (`revalidate = 1800`).

**Cron & plan note.** `vercel.json` schedules `/api/ingest` once daily so it
deploys on any plan (Hobby crons are daily-only). On Pro you can raise the
frequency (e.g. `0 * * * *` hourly).

**Persistence note.** Newsletter sign-ups, job submissions, and interest counts
use an in-memory store, which does **not** persist across serverless instances
on Vercel — they work but reset. For production, wire the `db.ts` seam to
Postgres (e.g. Vercel Postgres / Neon); see "Storage".

---

## Architecture

```
src/
  lib/
    types.ts            # Core data model (RawJob, Job, Company, …)
    taxonomy.ts         # Categories + slug helpers
    slug.ts             # job-title-company-<rand> slugs
    db.ts               # Data-access layer (the seam to swap for Postgres)
    landing.ts          # Resolver for every /[landing] SEO/category/skill page
    rss.ts              # RSS 2.0 feed builder
    jsonld.ts           # schema.org JobPosting + Breadcrumb JSON-LD
    site.ts / format.ts # Config + display helpers
    pipeline/           # THE INGESTION PIPELINE (see below)
    seed/               # Curated company allow-list + sample raw jobs
  components/           # UI (JobCard, Faq, forms, header/footer, …)
  app/                  # Next.js App Router routes
scripts/run-ingest.ts   # CLI runner for the pipeline
```

### Live data & liveness

The site pulls **live** jobs by default. `src/lib/store.ts` polls the ATS
allow-list, runs the pipeline, and caches accepted jobs for a short TTL
(`ANYWHERE_CACHE_TTL_MS`, 30 min) — so **apply links are real** and the board
stays current. Pages use ISR (`revalidate = 1800`) to refresh. Set
`ANYWHERE_LIVE=false` to run fully offline on the bundled seed.

Two things keep dead listings from misleading applicants:

1. **Auto-unpublish** — a posting removed upstream simply stops appearing on the
   next refresh (spec section 8).
2. **Liveness verification** (`src/lib/liveness.ts`) — on a job page we
   re-query the provider's single-posting API. If it 404s (or the slug isn't in
   the live feed at all), the page renders **"This job posting is not active
   anymore"** and the **Apply button is removed**. Network blips are treated as
   "still live" so a transient error never hides a real job.

### Salary tiers & filtering

`src/lib/salary.ts` classifies each parsed salary into **Good / Medium / High**
by USD-equivalent midpoint (EUR/GBP normalized), used to color-code salaries on
cards and the job page. `JobBoard` (`components/JobBoard.tsx`) is a client feed
with **salary-range**, **job-type**, and **"salary listed only"** filters plus
incremental reveal — used on the homepage and every landing page.

### Interest & demand-based featuring

Beyond paid `is_featured` placements, listings can be promoted organically:
`src/lib/interest.ts` tracks candidate interest (a deterministic baseline + live
clicks via the "I'm interested" button → `POST /api/interest`). Once interest
crosses `IN_DEMAND_THRESHOLD`, the job is flagged **In demand** and floated up the
ranking. Interest is in-memory in this demo — swap `interest.ts` for a persisted
counter (e.g. a Postgres `job_interest` table) in production.

### Company reviews & verification

`seed/companies.json` carries a `rating`, `review_count`, and `description` per
company, surfaced as star ratings on the job page, company cards, and company
pages. These are curated seed values, **not** scraped from review sites (doing so
would violate most review platforms' terms) — wire in a licensed reviews API to
make them live. Every accepted job also carries `verified: true` (it cleared the
worldwide filter) and is liveness-checked, shown as a **Verified remote** badge.

### Google AdSense

The site is AdSense-ready. To turn ads on, set your publisher id and (optionally)
a default ad-unit id, then rebuild:

```
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT=1234567890   # optional; used by <AdSlot> placements
```

When set, the app automatically emits: the `adsbygoogle.js` loader
(`src/app/layout.tsx`), the `google-adsense-account` verification meta tag,
`/ads.txt` (`src/app/ads.txt/route.ts`), and live `<AdSlot>` units. When unset,
**no ad code is emitted at all** — handy for development and before approval.

AdSense approval also needs real content and clear policies, which are in place:
`/privacy` (a full policy covering cookies + Google AdSense), `/terms`,
`/about`, `/contact`, footer navigation to all of them, `sitemap.xml`,
`robots.txt`, and lots of original, crawlable content. Add `<AdSlot slot="…" />`
wherever you want an ad after approval (two placements ship on the homepage and
job pages).

### Storage

`src/lib/db.ts` is the async data-access layer over the store. Every page and
route handler goes through its query functions and never touches the store
directly — so `db.ts` is the **single seam** to swap for Postgres (keep the
async signatures, replace the bodies with SQL).

To go to Postgres, keep the function signatures and replace the bodies with SQL
against these tables (mirrors `types.ts`):

- `jobs` (id, slug, title, company_slug, description_html, apply_url, posted_at,
  expires_at, employment_type, salary_min, salary_max, currency, category,
  skills[], benefits jsonb, is_featured, source, provider, status)
- `companies` (slug, name, domain, logo, provider, board_token)
- `subscribers` (email, created_at)
- `submissions` (id, title, company_name, apply_url, description_html,
  contact_email, is_featured, created_at, status)

---

## The ingestion pipeline (`src/lib/pipeline/`)

Three stages, mirroring the spec. Each stage is a pure, unit-tested module.

### Stage A — Ingest & parse (`ingest.ts` + `feeds.ts`)
Two kinds of source, both mapped to the common `RawJob` shape and isolated so a
dead source yields `[]` rather than aborting the run:

- **Per-company ATS boards** (`ingest.ts`): **Ashby, Greenhouse, Lever, Workable,
  SmartRecruiters**. The allow-list in `seed/companies.json` spans ~25 known
  global-remote employers (GitLab, Automattic, PostHog, Supabase, Canonical…).
- **Remote-job aggregator feeds** (`feeds.ts`): **Remotive, RemoteOK, Jobicy,
  Arbeitnow** — single global feeds that index thousands of postings across many
  boards.

A live run pulls ~1,500 raw postings and, after the strict worldwide filter,
yields **~270 genuinely location-independent roles**.

> **On raw volume.** The vast majority of "remote" jobs are region- or
> timezone-restricted, and the product's entire promise is to reject those. So
> the ceiling for *truly* location-independent roles from public sources is in
> the low hundreds, not thousands — chasing a 2,000+ count would mean diluting
> the filter and breaking the brand. Add more all-remote companies to
> `companies.json` or more feeds to `feeds.ts` to push the honest number higher.

### Stage B — The "Work From Anywhere" filter (`filter.ts`)
The product gate. Decision order:

1. Any **disqualifying phrase** in the location *or* description → **reject**
   (`us only`, `eu-based`, `must be located in`, `eligible to work in`,
   `must overlap`, `est hours`, `hybrid`, …).
2. An explicit **worldwide signal** → **accept** (`work from anywhere`,
   `fully remote worldwide`, `no location restriction`, …).
3. A clean **anywhere location token** with no disqualifiers → **accept**.
4. Otherwise (ambiguous) → **reject**. Bare "Remote" is rejected on purpose.

### Stage C — Enrich (`enrich.ts`)
Derives fields by keyword-matching the **description text** (not the ATS):
- **skills** → tag list, from `SKILL_DICTIONARY`
- **category** → title-weighted classification, from `CATEGORY_KEYWORDS`
- **benefits** → emoji badges, from `BENEFIT_RULES`
- **salary** → regex-parsed range, normalized to `min / max / currency`
  (e.g. `"$119,900.00 to $193,200.00"` → `$119,900 - $193,200 USD`)

Then `dedupe.ts` drops duplicates (same normalized company + title) across
sources, and `index.ts` (`runPipeline` / `ingestAndProcess`) ties it together
into a `PipelineReport`.

---

## Adding a new ATS source

1. Open `src/lib/pipeline/ingest.ts`.
2. Implement an `AtsAdapter` with a `fetchBoard(company)` that calls the
   provider's public board API and maps each posting to a `RawJob`. Copy one of
   the existing adapters — they show the exact field mapping.
3. Register it in the `ADAPTERS` map and add the provider name to `AtsProvider`
   in `src/lib/types.ts`.
4. Add companies using it to `src/lib/seed/companies.json` with
   `"provider": "<yourprovider>"` and the correct `board_token`.

## Tuning the filter & enrichment

All matching logic is **data**, in `src/lib/pipeline/dictionaries.ts`:

- Filter too loose? Add phrases to `DISQUALIFYING_PHRASES`.
- Filter too strict? Add accepted phrasings to `ANYWHERE_SIGNALS`.
- Missing a skill/benefit/category? Extend `SKILL_DICTIONARY`,
  `BENEFIT_RULES`, or `CATEGORY_KEYWORDS`.

Every change is covered by `*.test.ts` in the same folder — run `npm run test`
after editing. Add a test case for each new rule.

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage: hero, newsletter, All Jobs feed, category previews, FAQ |
| `/jobs/[slug]` | Job detail + `JobPosting` JSON-LD, sidebar, apply, scam notice, similar jobs |
| `/remote-[category]-jobs` | One feed per category (Backend, Frontend, …) |
| `/remote-[skill]-jobs` | Per-skill landing (e.g. `/remote-postgres-jobs`) |
| `/work-from-home-jobs`, `/remote-part-time-jobs`, `/fully-remote-no-experience-jobs`, `/remote-jobs-no-talking`, `/remote-jobs-with-{health-insurance,retirement-plan,equipment-budget,learning-budget}` | SEO landing pages, each with unique copy + FAQ |
| `/companies`, `/companies/[company]` | Company directory + per-company jobs |
| `/hiring` | Paid/featured job submission form (skips the ATS pipeline) |
| `/advertise`, `/sponsor`, `/newsletter` | Monetization + newsletter |
| `/page/[n]` | Main-feed pagination |
| `/rss-feeds`, `/rss.xml`, `/remote-[category]-jobs/rss.xml` | RSS hub + all-jobs + per-category feeds |
| `/admin` | Ops view: pipeline review, rejections, allow-list (noindex) |
| `/api/ingest` | Cron endpoint (Stage A→B→C), guarded by `INGEST_SECRET` |
| `/sitemap.xml`, `/robots.txt` | Auto-generated SEO |

All category/skill/SEO landing pages are served by the single dynamic
`app/[landing]/page.tsx` route via the `resolveLanding()` slug resolver.

---

## SEO

- `JobPosting` JSON-LD on every job page with `jobLocationType: TELECOMMUTE`,
  `applicantLocationRequirements: Anywhere in the World`, `baseSalary`,
  `hiringOrganization`, `datePosted`, `validThrough`.
- Per-page canonical URLs, unique meta titles/descriptions, Open Graph +
  Twitter cards, `BreadcrumbList` / `CollectionPage` JSON-LD.
- Auto-generated `sitemap.xml` + `robots.txt`.
- Every landing page targets a long-tail query and ships its own FAQ.
- Job and landing pages are statically generated (SSG); re-run ingestion +
  rebuild (or add ISR `revalidate`) to refresh.

Set `NEXT_PUBLIC_SITE_URL` in the environment so canonical URLs, sitemap, RSS,
and JSON-LD use your real domain.

---

## Scheduling ingestion

`vercel.json` registers an hourly cron hitting `/api/ingest`. On other hosts,
point any scheduler at that URL (send the `INGEST_SECRET` via `?secret=` or an
`Authorization: Bearer` header). The endpoint runs the full pipeline and returns
a report; **wire `report.jobs` into your Postgres upsert** where the
`TODO(persistence)` comment is in `src/app/api/ingest/route.ts`, and unpublish
rows past `expires_at`.

---

## Admin / operations (`/admin`)

Read-only in this demo — it shows the pipeline's accepted/rejected output and
enrichment fields for eyeballing, plus the ATS allow-list. In production, add
auth and wire the row actions to mutations: approve / edit / feature / reject,
override enrichment fields (inference is imperfect), and manage the allow-list.
Expiry is handled at load in `db.ts` (jobs past `expires_at` are dropped).

---

## Deliverables checklist

- ✅ Next.js app with all routes above
- ✅ ATS ingestion + filter + enrichment pipeline (documented, unit-tested)
- ✅ Seed data (curated company list + sample jobs)
- ✅ schema.org markup, sitemap, robots, RSS (verified)
- ✅ This README
