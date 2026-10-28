"use client";

import { isStaleBuildError, useStaleBuildReload } from "@/lib/stale-build";

const BODY_STYLE = { margin: 0, fontFamily: "system-ui, sans-serif", background: "#faf9f7", color: "#2b2a26" };

/**
 * Last-resort boundary. Catches failures in the root layout itself, where
 * error.tsx can't render — so it must ship its own <html>/<body>.
 *
 * A tab left open across a deploy lands here when the root layout's own chunk
 * is gone, so that case reloads once instead (see lib/stale-build).
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const reloading = useStaleBuildReload(error);

  if (reloading) {
    return (
      <html lang="en">
        <body style={BODY_STYLE} />
      </html>
    );
  }

  return (
    <html lang="en">
      <body style={BODY_STYLE}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 16px", textAlign: "center" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Something went wrong</h1>
          <p style={{ color: "#4a4842", marginTop: 12 }}>
            A temporary error on our side. Please try again.
          </p>
          <button
            type="button"
            // Re-rendering can't bring back a file the server no longer has; only a fresh load can.
            onClick={isStaleBuildError(error) ? () => window.location.reload() : reset}
            style={{ marginTop: 24, padding: "10px 18px", borderRadius: 8, border: 0, background: "#2b2a26", color: "#fff", fontWeight: 600, cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
        {/* digest is the only safe identifier to surface to the visitor */}
        {error.digest ? <p style={{ textAlign: "center", color: "#9b9a97", fontSize: 12 }}>Reference: {error.digest}</p> : null}
      </body>
    </html>
  );
}
