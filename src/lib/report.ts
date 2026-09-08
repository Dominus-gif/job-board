/**
 * Structured error reporting for unhandled exceptions.
 *
 * Cloudflare Workers observability is enabled in wrangler.jsonc, so anything
 * written here lands in Workers Logs. Every line is prefixed with a single
 * stable token so it can be alerted on with one query:
 *
 *   Workers → getremotejobsnow → Logs → filter: "[unhandled]"
 *
 * (Logpush or a Workers alert on that filter turns this into real paging.)
 * Reporting must never itself throw — a failure in the reporter would defeat
 * the boundary that called it.
 */
export function reportError(context: string, err: unknown, extra?: Record<string, string | number | undefined>) {
  try {
    const e = err as { message?: string; stack?: string; digest?: string } | undefined;
    console.error(
      "[unhandled]",
      JSON.stringify({
        context,
        message: e?.message ?? String(err),
        digest: e?.digest,
        ...extra,
        at: new Date().toISOString(),
      }),
      e?.stack ?? "",
    );
  } catch {
    /* never let reporting break the request */
  }
}
