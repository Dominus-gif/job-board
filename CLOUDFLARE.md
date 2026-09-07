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

## 3b. Plan requirement (measured)

`npx wrangler deploy --dry-run` reports:

```
Total Upload: 41959.93 KiB / gzip: 5550.32 KiB   (~5.42 MB gzipped)
```

| Workers plan | Bundle limit | CPU / request | Fits? |
|---|---|---|---|
| Free | 3 MiB gzip | 10 ms | ❌ over by ~2.4 MB |
| Paid ($5/mo) | 10 MiB gzip | 30 s | ✅ comfortable headroom |

**This app needs Workers Paid.** Two independent reasons:

1. **Bundle** — the job dataset gets inlined **3×** by the bundler (~3.3 MB of
   the 5.4 MB). Externalising it to KV/R2 could get under 3 MiB, but…
2. **CPU** — the free plan allows 10 ms CPU per request. Parsing ~10k job
   records and server-rendering a filtered board exceeds that regardless of
   where the data is stored. This is the harder limit.

If you want to stay on Free, the app would need a real datastore (D1) queried
per request instead of an in-bundle snapshot — a much larger change, and
`src/lib/db.ts` is the seam designed for it.

## 4. Custom domain (Namecheap → Cloudflare)

**Current state (verified 2026-09-07):** registrar/DNS = **Namecheap**
(`dns1.registrar-servers.com`, `dns2.registrar-servers.com`), apex →
`216.198.79.1` (Vercel), `www` → `…vercel-dns-017.com`.

Workers custom domains require the zone to be **on Cloudflare DNS**, so the
nameservers must move. Do it in this order for **zero downtime**.

### ⚠️ Before you touch nameservers: email will break

The domain has active MX records on Namecheap's free email forwarding
(`eforward1–5.registrar-servers.com`). That service only works while the domain
uses Namecheap's DNS — moving nameservers to Cloudflare **silently stops mail
forwarding**.

Replace it with **Cloudflare Email Routing** (free, in the dashboard under
Email → Email Routing). Set it up right after the zone goes active; it creates
its own MX records. Write down every address you currently forward *before* you
migrate.

### Step 1 — Add the zone (site keeps running on Vercel)

1. Cloudflare dashboard → **Add a site** → `getremotejobsnow.com` → **Free** plan.
   (The zone plan is separate from the Workers Paid subscription in §3b.)
2. Cloudflare scans and imports the existing records. **Verify** the apex A
   record, the `www` CNAME, all 5 MX records and both TXT records came across.
   Add anything missing by hand — an incomplete import is what causes outages.
3. Leave the Vercel records exactly as they are for now.

### Step 2 — Point Namecheap at Cloudflare

Namecheap → **Domain List** → *Manage* → **Nameservers** → **Custom DNS** →
paste the two `*.ns.cloudflare.com` servers Cloudflare gave you → save (✓).

Propagation is usually minutes, up to 24h. Cloudflare emails you when the zone
is **Active**. Throughout this step the site still serves from Vercel, because
Cloudflare is answering with the Vercel records you imported.

### Step 3 — Deploy the Worker and test it in isolation

```bash
npm run cf:deploy
```

Test the generated `*.workers.dev` URL thoroughly *before* touching the domain.

### Step 4 — Cut over

Workers → your worker → **Settings → Domains & Routes → Add → Custom Domain**:
add `getremotejobsnow.com`, then `www.getremotejobsnow.com`.

Cloudflare replaces the Vercel DNS records and issues the certificate
automatically (~1 min). This is the actual cutover.

### Step 5 — Verify, then decommission

```bash
curl -I https://getremotejobsnow.com
curl -s https://getremotejobsnow.com/sitemap.xml | head
```

Check the homepage, a job page, a category page, `/api/health` and that email
forwarding still works. Only then disable the Vercel project.

### Rollback

Fastest: Cloudflare DNS → delete the Worker custom-domain records and re-add
apex `A → 216.198.79.1` and `www CNAME → 52208c103971be3e.vercel-dns-017.com`
(proxy OFF / grey cloud). Traffic returns to Vercel within a minute or two —
no nameserver change needed, which is exactly why Step 1 is done first.

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
| Next.js | upgraded 14.2.5 → 15.x (+ React 19). Required: the adapter supports Next >= 15.5.24, and 14.x is past Next’s 2-year support window (unpatched CVEs). `params`/`searchParams` are now awaited; `useFormState` → `useActionState`. |

## 8. Rollback

Vercel config is untouched (`vercel.json` still present), so you can point DNS
back at Vercel at any time. To fully revert the code changes:
`git revert <migration commit>`.
