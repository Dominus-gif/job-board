# Deploying getremotejobsnow.com to Cloudflare

The site targets **Cloudflare Workers + Static Assets** via
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).

> **Why Workers and not Pages?** For Next.js, Cloudflare has put the Pages
> adapter (`next-on-pages`) into maintenance and now points everyone at
> OpenNext → Workers. It is the only path that keeps the **Node.js runtime**
> (we need it for `sanitize-html` and the bundled job data) *and* supports
> **ISR**, which 20+ pages rely on (`revalidate = 1800`). Workers Static Assets
> is the successor to Pages: same dashboard, same custom domains, same free TLS.

---

## 1. One-time setup

```bash
npm install
npx wrangler login
```

Set the app name / domain in `wrangler.jsonc` if it differs from
`getremotejobsnow`.

## 2. Environment variables

Public values (safe to commit) live in `vars` in `wrangler.jsonc`.
**Secrets must never go there** — push them with `wrangler secret put`:

```bash
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY   # role subscriptions
npx wrangler secret put INGEST_SECRET               # guards /api/ingest
```

Public (`vars` in `wrangler.jsonc`, or the dashboard):

| Variable | Purpose |
|---|---|
| `ANYWHERE_LIVE` | **must stay `false`** on Workers — see §5 |
| `NEXT_PUBLIC_SITE_URL` | canonical URLs, sitemap, RSS, JSON-LD |
| `NEXT_PUBLIC_SUPABASE_URL` | shows the newsletter/role subscribe widget |
| `NEXT_PUBLIC_GA_ID` | GA4 tag |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | contact form |
| `NEXT_PUBLIC_ADSENSE_*` | AdSense client / slots (blank = no ad code) |
| `NEXT_PUBLIC_LOGO_TOKEN` | optional logo.dev token |

`NEXT_PUBLIC_*` values are inlined **at build time**, so changing one requires a
redeploy, not just a variable edit.

## 3. Build & deploy

```bash
npm run cf:preview   # build + run the real Worker locally (workerd)
npm run cf:deploy    # build + deploy
```

In the Cloudflare dashboard (Workers → Build), use:

- **Build command:** `NODE_OPTIONS=--max-old-space-size=4096 npm run cf:build`
- **Deploy command:** `npx wrangler deploy`

The `NODE_OPTIONS` bump is **required**: the build prerenders ~675 pages and each
worker parses ~10k job records, which overflows Node's default heap.

## 4. Custom domain

Workers → your worker → **Settings → Domains & Routes → Add custom domain** →
`getremotejobsnow.com` (and `www`). Cloudflare issues the certificate. Only then
repoint the nameservers/DNS away from the old host.

## 5. Refreshing listings (important)

On Vercel the site could scrape ATS boards from a long-running Node process
(`src/lib/scheduler.ts`) plus a daily cron. **Workers have no long-running
process**: a request-scoped isolate can't hold a `setInterval`, and scraping per
cold isolate would add seconds of latency and hammer the ATS APIs.

So on Cloudflare the model is **build-time data**:

- `ANYWHERE_LIVE=false` → every request is served from the snapshot bundled with
  the deploy (`src/lib/generated/snapshot.json` + `curated-jobs.json`). Fast,
  deterministic, no per-request network.
- `npm run prebuild` (runs automatically before every build) re-scrapes the ATS
  boards and regenerates that snapshot.

**⇒ To refresh listings, rebuild.** Create a Deploy Hook
(Workers → Build → Deploy Hooks) and call it on a schedule — Cloudflare Cron
Trigger, a GitHub Action (`schedule:`), or any cron service. Daily matches the
old `vercel.json` cron.

`src/instrumentation.ts` detects workerd and no-ops, so the scheduler never runs
there.

## 6. Optional: persistent ISR cache

The default deploy needs **zero** extra Cloudflare resources. Prerendered pages
come from static assets; the long tail renders on demand. To make revalidated
pages persist across isolates:

```bash
npx wrangler kv namespace create NEXT_INC_CACHE_KV
```

Add the returned id to `wrangler.jsonc` under `kv_namespaces`, then uncomment the
`incrementalCache` lines in `open-next.config.ts` and redeploy.

> Free-tier KV allows 1,000 writes/day. With many pages revalidating every 30
> minutes you may exceed that — use R2 (`r2IncrementalCache`) if so.

## 7. Differences from the Vercel deploy

| Area | Change |
|---|---|
| Images | `images.unoptimized = true` — Workers don't run Next's optimizer |
| `sanitize-html` | now **bundled** (removed from `serverComponentsExternalPackages`; Workers have no `node_modules` at runtime) |
| Scheduler | disabled on workerd; refresh via rebuild (§5) |
| Prerender counts | jobs 800→300, companies capped at 150 — the rest render on demand and stay in the sitemap |
| `vercel.json` | now unused; the cron becomes a Deploy Hook (§5) |

## 8. Rollback

Vercel config is untouched (`vercel.json` still present), so you can point DNS
back at Vercel at any time. To fully revert the code changes:
`git revert <migration commit>`.
