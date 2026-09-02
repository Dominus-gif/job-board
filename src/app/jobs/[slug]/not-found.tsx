import { InactiveNotice } from "@/components/InactiveNotice";

// Rendered (with a real HTTP 404) when a job slug no longer resolves — a dead
// share link or a removed/expired listing. Styled fallback, not a soft-200.
export default function JobNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <InactiveNotice />
    </div>
  );
}
