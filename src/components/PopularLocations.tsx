import Link from "next/link";
import { popularLocationAnchors } from "@/lib/seo/locations";

/**
 * Location links whose anchor text is the search phrase itself.
 *
 * A link reading "New York" tells Google the destination is about New York. A
 * link reading "Work From Home Jobs NYC" tells it the destination answers that
 * query — and the abbreviation, which the hub's own title never uses. Each hub
 * appears twice under different phrasings (see popularLocationAnchors), so the
 * page sends a family of variants to one canonical URL instead of the same
 * phrase repeatedly.
 */
export function PopularLocations({ heading = "Popular locations" }: { heading?: string }) {
  const anchors = popularLocationAnchors();
  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold text-ink-900">{heading}</h2>
      <p className="mb-4 text-sm text-ink-500">
        Every one of these is the same board, filtered — remote and work-from-home roles open to
        candidates in that place, plus the location-free roles anyone can take.
      </p>
      <div className="flex flex-wrap gap-2">
        {anchors.map((a, i) => (
          <Link
            key={`${a.href}-${i}`}
            href={a.href}
            className="rounded-full border border-ink-100 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
          >
            {a.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
