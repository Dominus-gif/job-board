/**
 * Editorial posts (the "Posts" section). Content is authored HTML — supports
 * full formatting (headings, lists, bold, links, quotes) rendered with the
 * `.prose-post` styles. Each post is its own SEO-optimised, indexable page with
 * Article JSON-LD. Kept as data (no CMS/DB) to match the rest of the app.
 */
export interface Post {
  slug: string;
  title: string;
  description: string; // meta description (<160 chars)
  date: string; // ISO published date
  updated?: string; // ISO last-updated
  author: string;
  tags: string[];
  readMinutes: number;
  html: string; // authored body (rendered with .prose-post)
}

export const POSTS: Post[] = [
  {
    slug: "how-to-find-remote-jobs-in-the-usa",
    title: "How to Find Remote Jobs in the USA (2026 Guide)",
    description:
      "A practical 2026 guide to finding remote jobs in the USA — where to look, how to filter out fake 'remote' roles, and how to apply and stand out.",
    date: "2026-07-28T09:00:00.000Z",
    author: "getremotejobsnow.com Editorial",
    tags: ["Remote Jobs USA", "Job Search", "Work From Home"],
    readMinutes: 6,
    html: `
      <p>Remote work in the United States is no longer a perk — it's a category. But "remote" on a job board can still mean anything from <strong>work-from-anywhere</strong> to "remote, but you must live within 50 miles of our Austin office." This guide shows you how to find genuinely remote jobs in the USA in 2026, and how to apply so you actually hear back.</p>

      <h2>Where to look for remote jobs in the USA</h2>
      <p>Start with sources that let you filter for truly remote roles rather than hybrid ones:</p>
      <ul>
        <li><strong>Curated remote boards</strong> — sites like <a href="/remote-jobs-in-usa">getremotejobsnow.com' USA board</a> pre-filter for location-independent roles, so you skip the "remote (US-only, EST hours)" noise.</li>
        <li><strong>Company career pages</strong> — all-remote companies (GitLab, Zapier, Automattic and many more) publish roles you can do from any US state.</li>
        <li><strong>Category pages</strong> — narrow by function: <a href="/remote-backend-jobs">backend</a>, <a href="/remote-design-jobs">design</a>, <a href="/remote-customer-support-jobs">customer support</a>, and more.</li>
      </ul>

      <h2>How to spot a genuinely remote role</h2>
      <p>Before you apply, read the location line carefully. Red flags that a role is <em>not</em> fully remote:</p>
      <ul>
        <li>"Remote (US only)" or a required state/city.</li>
        <li>"Must overlap with EST/PST" or fixed core hours in a single timezone.</li>
        <li>"Hybrid," "occasional office days," or "relocation required."</li>
      </ul>
      <blockquote>A truly location-independent role has no country, region, timezone, or work-authorization gate. If it names one, it's a regional remote job — still valid, just not work-from-anywhere.</blockquote>

      <h2>How to apply and stand out</h2>
      <ol>
        <li><strong>Lead with async proof.</strong> Remote teams value clear writing. Make your application concise and skimmable.</li>
        <li><strong>Show remote experience.</strong> Mention distributed tools (Slack, Notion, Linear) and any prior remote work.</li>
        <li><strong>Apply early.</strong> Remote roles get a lot of applicants — the first 48 hours matter.</li>
      </ol>

      <h2>Is it free to apply?</h2>
      <p>Always. A legitimate US employer will never ask you to pay to apply or to buy your own equipment upfront. Treat any such request as a scam.</p>

      <p>Ready to start? <a href="/remote-jobs-in-usa">Browse remote jobs in the USA</a> — every worldwide role is one you can do from anywhere in the country.</p>
    `,
  },
  {
    slug: "remote-jobs-in-europe-where-to-look",
    title: "Remote Jobs in Europe: Where to Look and How to Apply",
    description:
      "Where to find remote jobs in Europe in 2026 — English-speaking roles, the most remote-friendly countries, and how to apply from anywhere in the EU.",
    date: "2026-07-20T09:00:00.000Z",
    author: "getremotejobsnow.com Editorial",
    tags: ["Remote Jobs Europe", "EU", "Work From Home"],
    readMinutes: 5,
    html: `
      <p>Europe's remote job market has grown fast: employers across the EU, UK, and the Nordics now hire for fully remote roles, many of them English-speaking. Here's where to look and how to apply from anywhere on the continent.</p>

      <h2>The most remote-friendly countries in Europe</h2>
      <p>Germany, the Netherlands, Portugal, Spain, Ireland, Estonia, and the Nordics lead on remote-friendly hiring and digital-nomad pathways. But the best part of a <strong>work-from-anywhere</strong> role is that the employer's country doesn't matter — only that you can do the work.</p>

      <h2>Where to find remote jobs in Europe</h2>
      <ul>
        <li><a href="/remote-jobs-in-europe">getremotejobsnow.com' Europe board</a> — worldwide roles you can do from any EU country, plus roles hiring specifically across Europe.</li>
        <li><a href="/remote-jobs-in-germany">Remote jobs in Germany</a> — including English-speaking, 100% home-office roles.</li>
        <li><a href="/remote-jobs-in-uk">Remote jobs in the UK</a> — for candidates across Britain.</li>
      </ul>

      <h2>English-speaking remote roles</h2>
      <p>Many remote European employers operate in English, so you don't need to be fluent in the local language. Filter by function — <a href="/remote-sales-marketing-jobs">marketing</a>, <a href="/remote-frontend-jobs">frontend</a>, <a href="/remote-management-finance-jobs">finance</a> — and check each listing's language requirement.</p>

      <h2>Applying from the EU</h2>
      <ol>
        <li><strong>Confirm the role is timezone-flexible.</strong> "CET core hours" narrows your options; work-from-anywhere roles don't.</li>
        <li><strong>Highlight async communication.</strong> Distributed European teams run on written updates.</li>
        <li><strong>Apply free.</strong> No legitimate employer charges you to apply.</li>
      </ol>

      <p><a href="/remote-jobs-in-europe">Browse remote jobs in Europe →</a></p>
    `,
  },
  {
    slug: "work-from-home-vs-work-from-anywhere",
    title: "Work From Home vs Work From Anywhere: What's the Difference?",
    description:
      "Work from home and work from anywhere sound the same but aren't. Here's the difference, why it matters for your job search, and how to filter for each.",
    date: "2026-07-12T09:00:00.000Z",
    author: "getremotejobsnow.com Editorial",
    tags: ["Work From Home", "Remote Work", "Guide"],
    readMinutes: 4,
    html: `
      <p>"Work from home" and "work from anywhere" get used interchangeably, but for your job search they mean very different things. Getting the distinction right saves you from applying to roles you can't actually take.</p>

      <h2>Work from home (WFH)</h2>
      <p><strong>Work from home</strong> usually means you skip the commute — but you're still tied to a country, and often a region or timezone. A "remote" US role that requires EST hours is really a work-from-home role for people already in the eastern US.</p>

      <h2>Work from anywhere</h2>
      <p><strong>Work from anywhere</strong> (location-independent) means exactly that: no required country, region, city, timezone, or local work authorization. You can do the job from your home, a cabin, or another continent.</p>

      <blockquote>Every job on getremotejobsnow.com' main board is work-from-anywhere. Region-locked remote roles live on a separate, clearly-labelled board so the promise stays honest.</blockquote>

      <h2>Why the difference matters</h2>
      <ul>
        <li><strong>Eligibility.</strong> A work-from-anywhere role is open to far more people than a country-locked one.</li>
        <li><strong>Flexibility.</strong> No timezone gate means you set your hours around your life.</li>
        <li><strong>Filtering.</strong> Knowing the difference lets you skip listings that say "remote" but mean "remote in one country."</li>
      </ul>

      <h2>How to filter for each</h2>
      <p>Use dedicated boards: <a href="/work-from-home-jobs">work-from-home jobs</a> for flexible roles, and the <a href="/page/1">main board</a> for truly location-independent ones. For region-specific searches, try <a href="/remote-jobs-in-usa">the USA</a> or <a href="/remote-jobs-in-europe">Europe</a>.</p>

      <p>The bottom line: read the location line, not just the word "remote."</p>
    `,
  },
];

export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
