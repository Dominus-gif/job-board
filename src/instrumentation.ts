/**
 * Next.js instrumentation hook — runs once when the server boots. We use it to
 * start the background listing refresher so new jobs appear automatically with
 * no manual intervention. Skipped during the build phase and on the edge
 * runtime (the scheduler needs a long-running Node process).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.NEXT_PHASE !== "phase-production-build") {
    const { startScheduler } = await import("@/lib/scheduler");
    startScheduler();
  }
}
