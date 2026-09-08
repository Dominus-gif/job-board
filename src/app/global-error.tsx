"use client";

/**
 * Last-resort boundary. Catches failures in the root layout itself, where
 * error.tsx can't render — so it must ship its own <html>/<body>.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#faf9f7", color: "#2b2a26" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 16px", textAlign: "center" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Something went wrong</h1>
          <p style={{ color: "#4a4842", marginTop: 12 }}>
            A temporary error on our side. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
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
