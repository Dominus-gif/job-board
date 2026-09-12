import Link from "next/link";
import { GlobeIcon, ArrowUpRightIcon } from "./icons";

/**
 * Cross-link from a location hub into the work-from-anywhere cluster.
 *
 * A city page answers "remote jobs in X", but a good share of that traffic
 * does not actually need X — they searched a place because that is how job
 * search works, not because the job requires one. This hands those visitors
 * the no-location-required board instead of letting them bounce, and it is
 * the internal link that tells Google the two hubs belong together.
 */
export function WfaCrossLinks() {
  return (
    <aside className="rounded-2xl border border-ink-100 bg-ink-50 p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <GlobeIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600" />
          <p className="text-[15px] leading-relaxed text-ink-600">
            Prefer no location requirement at all?{" "}
            <Link
              href="/work-from-anywhere-jobs"
              className="font-semibold text-brand-700 underline-offset-2 hover:underline"
            >
              Browse work from anywhere jobs
            </Link>{" "}
            — roles with no country, region or timezone gate, or see every{" "}
            <Link
              href="/fully-remote-jobs"
              className="font-semibold text-brand-700 underline-offset-2 hover:underline"
            >
              fully remote job
            </Link>{" "}
            on the board.
          </p>
        </div>
        <Link
          href="/work-from-anywhere-jobs"
          className="btn-primary inline-flex flex-shrink-0 items-center gap-1.5 self-start sm:self-auto"
        >
          Work from anywhere <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
