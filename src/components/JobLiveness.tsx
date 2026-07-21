"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ArrowUpRightIcon } from "./icons";
import { InactiveNotice } from "./InactiveNotice";

type Status = "checking" | "active" | "inactive";

const LivenessCtx = createContext<Status>("checking");

/**
 * Verifies the ATS posting is still open AFTER the page has painted, then
 * shares the result. Keeps the initial render fast (no blocking network call);
 * a transient failure is treated as "active" so a real job is never hidden.
 */
export function LivenessProvider({ slug, children }: { slug: string; children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let alive = true;
    fetch(`/api/job-status?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => alive && setStatus(d.active ? "active" : "inactive"))
      .catch(() => alive && setStatus("active"));
    return () => {
      alive = false;
    };
  }, [slug]);

  return <LivenessCtx.Provider value={status}>{children}</LivenessCtx.Provider>;
}

const useLiveness = () => useContext(LivenessCtx);

/** Apply CTA that removes itself once a posting is confirmed removed. */
export function ApplyButton({
  applyUrl,
  label = "Apply now",
  className = "btn-primary",
}: {
  applyUrl: string;
  label?: string;
  className?: string;
}) {
  const status = useLiveness();

  if (status === "inactive") {
    return (
      <span className={`${className} pointer-events-none cursor-not-allowed opacity-60`} aria-disabled>
        No longer accepting applications
      </span>
    );
  }

  return (
    <a href={applyUrl} target="_blank" rel="nofollow noopener noreferrer" className={className}>
      {label}
      <ArrowUpRightIcon className="h-4 w-4" />
    </a>
  );
}

/** Shows the inactive notice only once the posting is confirmed removed. */
export function InactiveBanner() {
  const status = useLiveness();
  if (status !== "inactive") return null;
  return (
    <div className="mb-8">
      <InactiveNotice />
    </div>
  );
}
