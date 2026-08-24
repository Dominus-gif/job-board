/**
 * One badge, one shape. Featured and New share the exact same pill (shape,
 * border, background) and differ ONLY by icon + label — so the badge row reads
 * as a consistent system, and colour is never the only signal.
 *
 * "New" is backed by real recency (posted within a few days); we deliberately
 * dropped the old "Trending" badge, which appeared on ~every card and therefore
 * carried no signal.
 */
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5" aria-hidden>
      <path d="M12 2.5l2.9 6.06 6.6.86-4.85 4.54 1.24 6.54L12 17.9l-5.89 3.1 1.24-6.54L2.5 9.42l6.6-.86L12 2.5z" />
    </svg>
  );
}
function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5" aria-hidden>
      <path d="M12 2l1.7 5.6L19.5 9l-5.8 1.7L12 16l-1.7-5.3L4.5 9l5.8-1.4L12 2z" />
    </svg>
  );
}

const MAP = {
  featured: { icon: <StarIcon />, label: "Featured" },
  new: { icon: <SparkIcon />, label: "New" },
} as const;

export function StatusBadge({ kind }: { kind: keyof typeof MAP }) {
  const { icon, label } = MAP[kind];
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-ink-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-700 ring-1 ring-inset ring-ink-200">
      {icon} {label}
    </span>
  );
}
