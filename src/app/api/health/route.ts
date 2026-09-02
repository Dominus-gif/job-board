import { NextResponse } from "next/server";

// Cheap liveness endpoint for uptime monitors and a post-deploy warmup ping
// (hit it in the deploy step to spin up a serverless instance before real
// traffic, avoiding the cold-start 500s users can otherwise catch right after a
// release). Always dynamic + no caching so each ping actually reaches a lambda.
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { status: "ok", time: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
