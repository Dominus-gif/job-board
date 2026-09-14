/**
 * One badge, one shape. Featured and New share the exact same pill — radius,
 * padding, 11px bold uppercase type, 10px icon — and differ only by icon,
 * label and face, so the badge row reads as a consistent system and colour is
 * never the only signal.
 *
 * Featured wears a gold face with a shine that sweeps across it and four small
 * stars drifting above; the treatment is in `.badge-gold` in globals.css.
 * Featured is paid placement, so it is the one badge that gets to be loud, and
 * the only one: New keeps the plain neutral chip.
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

/** The pill itself: identical for every kind, so only the face ever changes. */
const SHAPE =
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide";

const MAP = {
  featured: { icon: <StarIcon />, label: "Featured" },
  new: { icon: <SparkIcon />, label: "New" },
} as const;

/** The four drifting stars above a featured badge. Decorative, never read out. */
function Sparkles() {
  return (
    <span className="badge-sparks" aria-hidden>
      {[1, 2, 3, 4].map((n) => (
        <svg key={n} className={`badge-spark badge-spark--${n}`} viewBox="0 0 24 24">
          <polygon points="12,2 15,8.5 22,9.3 17,14.3 18.3,21.5 12,17.8 5.7,21.5 7,14.3 2,9.3 9,8.5" />
        </svg>
      ))}
    </span>
  );
}

export function StatusBadge({ kind }: { kind: keyof typeof MAP }) {
  const { icon, label } = MAP[kind];

  if (kind === "featured") {
    return (
      <span className="badge-gold-wrap">
        <Sparkles />
        <span className={`${SHAPE} badge-gold`}>
          {icon} {label}
        </span>
      </span>
    );
  }

  return (
    <span className={`${SHAPE} bg-ink-100 text-ink-700 ring-1 ring-inset ring-ink-200`}>
      {icon} {label}
    </span>
  );
}
