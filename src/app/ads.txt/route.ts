import { ADSENSE } from "@/lib/site";

/**
 * ads.txt — declares getremotejobsnow.com as an authorized seller of its ad inventory
 * (required by Google AdSense). Populated automatically from the configured
 * publisher id; returns an explanatory placeholder until one is set.
 */
export function GET() {
  const body = ADSENSE.enabled
    ? `google.com, ${ADSENSE.pub}, DIRECT, f08c47fec0942fa0\n`
    : "# Set NEXT_PUBLIC_ADSENSE_CLIENT to your ca-pub-… id to publish ads.txt.\n";
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
