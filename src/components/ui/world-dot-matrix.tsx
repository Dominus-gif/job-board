import pinData from "@/lib/generated/world-pins.json";

/**
 * Dot-matrix world map with a marker on each hiring city.
 *
 * Entirely static — no canvas, no WebGL, no animation, no JavaScript. It
 * replaces the rotating globe, which was the heaviest thing on the page and
 * the only remaining candidate for the rendering trouble on phones.
 *
 * The dots come from a generated SVG used as a CSS mask rather than an image,
 * which is what lets one 6KB asset serve both themes: the mask supplies the
 * shape and the colour comes from CSS. The city markers are separate elements
 * positioned from the same generator's output, because a mask carries a single
 * colour and the markers need to read brighter than the land behind them.
 *
 * Regenerate with `npx tsx scripts/build-world-map.ts`.
 */
export function WorldDotMatrix({ className = "" }: { className?: string }) {
  const { width, height, pins } = pinData;
  return (
    <div className={`relative ${className}`} aria-hidden>
      <div className="world-dots" style={{ aspectRatio: `${width} / ${height}` }} />
      {pins.map((p) => (
        <span
          key={p.label}
          className="world-dots__pin"
          style={{ left: `${(p.x / width) * 100}%`, top: `${(p.y / height) * 100}%` }}
        />
      ))}
    </div>
  );
}

export default WorldDotMatrix;
