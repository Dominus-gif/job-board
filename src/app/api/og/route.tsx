import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

// Dynamic so it renders on request (never at build): @vercel/og's wasm loader
// trips over spaces in a local project path during static export. As a route
// handler it's not prerendered, so the build is unaffected and the image
// renders server-side on first request (then CDN-cached).
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #191919 0%, #202020 55%, #15497f 140%)",
          color: "#ffffff",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#2383e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            A
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>{SITE.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 960 }}>
            Remote jobs you can do from anywhere in the world.
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.72)", maxWidth: 900 }}>
            Verified work-from-anywhere &amp; region-based roles — with salary, skills, and benefits. Apply free.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "rgba(255,255,255,0.6)" }}>
          <span style={{ color: "#7fb2de" }}>●</span>
          <span>No country, region, or timezone strings attached</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
