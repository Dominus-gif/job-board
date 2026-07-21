import { getAllJobs } from "@/lib/db";
import { buildRss } from "@/lib/rss";
import { SITE } from "@/lib/site";

export const revalidate = 1800;

export async function GET() {
  const xml = buildRss({
    title: `${SITE.name} — All Remote Jobs (Worldwide)`,
    description: SITE.description,
    path: "/rss.xml",
    jobs: await getAllJobs(),
  });
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
