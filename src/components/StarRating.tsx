/** Compact 5-star rating with an optional review count. */
export function StarRating({ rating, count, className = "" }: { rating: number; count?: number; className?: string }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.75;
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = i < full ? 1 : i === full && half ? 0.5 : 0;
          return <Star key={i} fill={fill} />;
        })}
      </div>
      <span className="font-mono text-xs font-semibold text-ink-700">{rating.toFixed(1)}</span>
      {count != null && <span className="font-mono text-xs text-ink-400">({count.toLocaleString("en-US")})</span>}
    </div>
  );
}

function Star({ fill }: { fill: number }) {
  const id = `sg-${Math.random().toString(36).slice(2)}`;
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="#e3a81f" />
          <stop offset={`${fill * 100}%`} stopColor="#e2e8f0" />
        </linearGradient>
      </defs>
      <path
        d="M10 1.6l2.47 5 5.53.8-4 3.9.94 5.5L10 14.2l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.6z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}
