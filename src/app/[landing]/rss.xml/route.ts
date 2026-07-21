import { allLandingSlugs, resolveLanding } from "@/lib/landing";
import { buildRss } from "@/lib/rss";
import { SITE } from "@/lib/site";

export const dynamicParams = true;
export const revalidate = 1800;

export async function generateStaticParams() {
  return (await allLandingSlugs()).map((landing) => ({ landing }));
}

export async function GET(_req: Request, { params }: { params: { landing: string } }) {
  const view = await resolveLanding(params.landing);
  if (!view) return new Response("Not found", { status: 404 });

  const xml = buildRss({
    title: `${view.metaTitle} — ${SITE.name}`,
    description: view.metaDescription,
    path: view.rss,
    jobs: view.jobs,
  });

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
