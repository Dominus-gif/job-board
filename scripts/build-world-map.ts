/**
 * Generate the dot-matrix world map used behind the homepage hero.
 *
 * Run by hand (`npx tsx scripts/build-world-map.ts`), not by the build: the
 * world does not change, so the output is committed and `dotted-map` stays a
 * devDependency. Nothing about it ships at runtime.
 *
 * Two outputs, because the map and its city pins need different colours and a
 * CSS mask can only carry one:
 *
 *   public/world-dots.svg          the land dots, solid black. Used as a mask,
 *                                  so the colour comes from CSS and the map can
 *                                  follow the theme. 160KB of <circle>, which
 *                                  is far too much to inline in the HTML on
 *                                  every page load but nothing as a cached,
 *                                  gzipped static asset.
 *   src/lib/generated/world-pins.json
 *                                  where each city landed once snapped to the
 *                                  dot grid, in the SVG's own coordinate space,
 *                                  so the markers can be positioned as elements
 *                                  and styled independently.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import DottedMap from "dotted-map";

const CITIES = [
  { label: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { label: "Seattle", lat: 47.6062, lng: -122.3321 },
  { label: "Toronto", lat: 43.6532, lng: -79.3832 },
  { label: "New York", lat: 40.7128, lng: -74.006 },
  { label: "London", lat: 51.5074, lng: -0.1278 },
  { label: "Paris", lat: 48.8566, lng: 2.3522 },
  { label: "Zurich", lat: 47.3769, lng: 8.5417 },
  { label: "Berlin", lat: 52.52, lng: 13.405 },
];

// Antarctica is a wide band of dots that adds nothing and drags the map's
// centre of mass down, so the region stops short of it.
const SETTINGS = {
  height: 54,
  grid: "diagonal" as const,
  region: { lat: { min: -56, max: 78 }, lng: { min: -180, max: 180 } },
};

const mapForSvg = new DottedMap(SETTINGS);
const svg = mapForSvg.getSVG({
  radius: 0.22,
  color: "#000000",
  shape: "circle",
  backgroundColor: "transparent",
});

const mapForPins = new DottedMap(SETTINGS);
const pins = CITIES.map((c) => {
  const p = mapForPins.addPin({ lat: c.lat, lng: c.lng });
  return { label: c.label, x: p.x, y: p.y };
});

const viewBox = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
if (!viewBox) throw new Error("could not read the generated viewBox");
const width = Number(viewBox[1]);
const height = Number(viewBox[2]);

const root = process.cwd();
const svgPath = join(root, "public", "world-dots.svg");
writeFileSync(svgPath, svg);

const jsonPath = join(root, "src", "lib", "generated", "world-pins.json");
mkdirSync(dirname(jsonPath), { recursive: true });
writeFileSync(jsonPath, JSON.stringify({ width, height, pins }, null, 1));

console.log(`[world-map] ${svg.length} bytes -> public/world-dots.svg (viewBox ${width}x${height})`);
console.log(`[world-map] ${pins.length} pins -> src/lib/generated/world-pins.json`);
pins.forEach((p) => console.log(`  ${p.label.padEnd(15)} x=${p.x.toFixed(1)} y=${p.y.toFixed(1)}`));
