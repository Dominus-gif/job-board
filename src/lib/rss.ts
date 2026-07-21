import type { Job } from "./types";
import { SITE, abs } from "./site";
import { formatSalary } from "./pipeline";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Build an RSS 2.0 feed document (spec section 4 — RSS hub + per-category). */
export function buildRss(opts: { title: string; description: string; path: string; jobs: Job[] }): string {
  const { title, description, path, jobs } = opts;
  const self = abs(path);
  const items = jobs
    .map((job) => {
      const link = abs(`/jobs/${job.slug}`);
      const salary = formatSalary(job.salary);
      const body = [
        `<p><strong>${esc(job.company_name)}</strong> — ${esc(job.location)}</p>`,
        salary ? `<p>Salary: ${esc(salary)}</p>` : "",
        job.description_html,
        `<p><a href="${esc(job.apply_url)}">Apply for this job</a></p>`,
      ].join("");
      return `    <item>
      <title>${esc(job.title)} at ${esc(job.company_name)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="true">${esc(link)}</guid>
      <dc:creator>${esc(job.company_name)}</dc:creator>
      <category>${esc(job.category)}</category>
      <pubDate>${new Date(job.posted_at).toUTCString()}</pubDate>
      <enclosure url="${esc(job.company_logo)}" type="image/png" />
      <description><![CDATA[${body}]]></description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(title)}</title>
    <link>${esc(SITE.url)}</link>
    <atom:link href="${esc(self)}" rel="self" type="application/rss+xml" />
    <description>${esc(description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;
}
