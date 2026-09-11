import type { Metadata } from "next";
import { InactiveNotice } from "@/components/InactiveNotice";

/**
 * Without this the page inherited the root layout's default title, so a dead
 * listing announced itself as the homepage — in the tab, in shared links, and
 * to anything reading the title of a 404.
 */
export const metadata: Metadata = {
  title: "Job no longer available",
  description: "This role is no longer accepting applications. Browse current work-from-anywhere jobs instead.",
  robots: { index: false, follow: true },
};

// Rendered (with a real HTTP 404) when a job slug no longer resolves — a dead
// share link or a removed/expired listing. Styled fallback, not a soft-200.
export default function JobNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <InactiveNotice />
    </div>
  );
}
