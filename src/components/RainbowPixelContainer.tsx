/* ============================================================
   RainbowPixelContainer — a panel whose pixels rise from the
   bottom and dissolve before the top, while the whole field
   cycles through a palette.

   Every visual quality is a prop, and each one is passed down as
   a CSS custom property rather than baked into the stylesheet, so
   two instances on a page can differ and a tweak is a one-liner:

     <RainbowPixelContainer particleCount={60} minSizePx={2} maxSizePx={4} />
     <RainbowPixelContainer colors={["#2383e2", "#7fb2de"]} secondsPerColor={6} />
     <RainbowPixelContainer background="#fff" textColor="#111" glowPercent={12} />

   Notes:
   - No hooks, no browser APIs: it renders on the server and ships
     no JavaScript. It can still be imported by client components.
   - Particles come from a seeded PRNG, so the server and client
     markup match. Change `seed` for a different arrangement.
   - Animation is compositor-only (transform/opacity).
   - prefers-reduced-motion gets a still field, no cycling.
   - The stylesheet and the palette keyframes are hoisted and
     de-duplicated by React, so repeat instances cost nothing.
   ============================================================ */

export type RainbowPixelContainerProps = {
  children?: React.ReactNode;
  /** Extra classes on the panel (width, margins, radius overrides…). */
  className?: string;
  /** Inline styles merged after the generated custom properties. */
  style?: React.CSSProperties;

  /* ---- the pixel field ---- */
  /** How many rising pixels. Default 28. */
  particleCount?: number;
  /** Smallest / largest pixel edge, in px. Defaults 4.6 and 9.1. */
  minSizePx?: number;
  maxSizePx?: number;
  /** Fastest / slowest full rise, in seconds. Defaults 5.5 and 9.1. */
  minRiseSeconds?: number;
  maxRiseSeconds?: number;
  /** Horizontal wander over a rise, ± this many px. Default 13. */
  driftPx?: number;
  /** Opacity range at the brightest point of a rise. Defaults 0.55 and 0.9. */
  minOpacity?: number;
  maxOpacity?: number;
  /** Keep pixels this far (in % of width) from the side walls. Default 4. */
  edgeInsetPct?: number;
  /** Change for a different but still deterministic arrangement. */
  seed?: number;

  /* ---- colour ---- */
  /** Colours the field cycles through, in order. Any length ≥ 1. */
  colors?: string[];
  /** Seconds each colour holds before blending to the next. Default 3. */
  secondsPerColor?: number;

  /* ---- surface ---- */
  /** Panel background. Default near-black. */
  background?: string;
  /** Colour of the content inside. Default near-white. */
  textColor?: string;
  /** Corner radius in px. Default 16. */
  radiusPx?: number;
  /** Panel border. Default a hairline white at 10%. */
  border?: string;
  /** Padding in px: vertical, horizontal, and horizontal from 768px up. */
  paddingYPx?: number;
  paddingXPx?: number;
  paddingXMdPx?: number;
  /** Strength of the glow along the bottom edge, in %. Default 26. 0 removes it. */
  glowPercent?: number;
  /** Strength of each pixel's halo, in %. Default 45. 0 removes it. */
  pixelGlowPercent?: number;
  /** Corner radius of a single pixel, in px. Default 1 (a square). */
  pixelRadiusPx?: number;
  /** Drop shadow under the panel. Pass "none" to remove. */
  boxShadow?: string;
};

type Particle = {
  leftPct: number;
  sizePx: number;
  durationS: number;
  delayS: number;
  peakOpacity: number;
  driftPx: number;
};

/** Apple-ish spectrum: the default seven stops. */
export const RAINBOW_COLORS = ["#ff453a", "#ff9500", "#ffd60a", "#25d652", "#0a84ff", "#514ef4", "#c34dff"];

/* Deterministic PRNG so server and client render identical particles. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeParticles(o: {
  count: number;
  seed: number;
  minSize: number;
  maxSize: number;
  minRise: number;
  maxRise: number;
  drift: number;
  minOpacity: number;
  maxOpacity: number;
  edgeInset: number;
}): Particle[] {
  const rand = mulberry32(o.seed);
  const span = Math.max(0, 100 - o.edgeInset * 2);
  return Array.from({ length: o.count }, () => ({
    leftPct: o.edgeInset + rand() * span,
    sizePx: Math.round((o.minSize + rand() * (o.maxSize - o.minSize)) * 10) / 10,
    durationS: Math.round((o.minRise + rand() * (o.maxRise - o.minRise)) * 100) / 100,
    // Negative delay: the field is already in flight on the first paint.
    delayS: -(rand() * 10),
    peakOpacity: Math.round((o.minOpacity + rand() * (o.maxOpacity - o.minOpacity)) * 100) / 100,
    driftPx: Math.round((rand() - 0.5) * 2 * o.drift),
  }));
}

/**
 * The colour cycle, as keyframes.
 *
 * Each colour holds for a third of its slot and blends across the rest, so the
 * palette can be any length and `--rpx-cycle` scales the whole thing.
 */
function paletteKeyframes(name: string, colors: string[]): string {
  const slot = 100 / colors.length;
  const at = (n: number) => `${Math.round(n * 10000) / 10000}%`;
  const frames = colors.flatMap((c, i) => [
    `${at(i * slot)} { color: ${c}; animation-timing-function: linear; }`,
    `${at(i * slot + slot / 3)} { color: ${c}; animation-timing-function: ease-in-out; }`,
  ]);
  return `@keyframes ${name} {\n  ${frames.join("\n  ")}\n  100% { color: ${colors[0]}; }\n}`;
}

/** Short stable id for a palette, so identical palettes share one keyframes rule. */
function paletteId(colors: string[]): string {
  let h = 0x811c9dc5;
  for (const ch of colors.join("|")) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36);
}

/**
 * Everything positional lives here; everything tunable is a var with a default,
 * so an instance only overrides what it changes.
 */
const BASE_CSS = `
.rainbow-pixel {
  --rpx-cycle: 21s;
  --rpx-bg: #0a0a0a;
  --rpx-fg: #faf9f9;
  --rpx-radius: 16px;
  --rpx-border: 1px solid rgba(255, 255, 255, 0.1);
  --rpx-pad-y: 64px;
  --rpx-pad-x: 32px;
  --rpx-pad-x-md: 64px;
  --rpx-edge-glow: color-mix(in srgb, currentColor 26%, transparent);
  --rpx-pixel-glow: color-mix(in srgb, currentColor 45%, transparent);
  --rpx-pixel-radius: 1px;
  --rpx-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background-color: var(--rpx-bg);
  color: var(--rpx-first-color, #ff453a);
  animation: var(--rpx-anim, none) var(--rpx-cycle) linear infinite;
  border-radius: var(--rpx-radius);
  border: var(--rpx-border);
  padding: var(--rpx-pad-y) var(--rpx-pad-x);
  text-align: center;
  box-shadow: var(--rpx-shadow);
}

@media (min-width: 768px) {
  .rainbow-pixel { padding: var(--rpx-pad-y) var(--rpx-pad-x-md); }
}

/* Soft emission glow along the bottom edge — the "source" line. */
.rainbow-pixel::before {
  content: "";
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 14%;
  pointer-events: none;
  background: linear-gradient(to top, var(--rpx-edge-glow), transparent);
}

.rainbow-pixel__particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Full-height track: translateY(-100%) of a full-height element is the whole
   container, so the ride is compositor-only and resolution-independent. */
.rainbow-pixel__track {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--x);
  width: var(--size);
  opacity: 0;
  animation: rpx-rise var(--dur) linear infinite;
  animation-delay: var(--delay);
  will-change: transform, opacity;
}

.rainbow-pixel__dot {
  position: absolute;
  bottom: -8px; /* starts just below the floor */
  width: 100%;
  height: var(--size);
  border-radius: var(--rpx-pixel-radius);
  background-color: currentColor;
  box-shadow: 0 0 10px 2px var(--rpx-pixel-glow);
}

/* Fade in quickly at the base, dissolve well before reaching the top. */
@keyframes rpx-rise {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; }
  12%  { opacity: var(--peak); }
  55%  { opacity: calc(var(--peak) * 0.75); }
  82%  { transform: translate3d(calc(var(--drift) * 0.6), -82%, 0); opacity: 0; }
  100% { transform: translate3d(var(--drift), -100%, 0); opacity: 0; }
}

/* Content sits above the pixels and the glow. The doubled class beats any
   prose styling of the page it is dropped into. */
.rainbow-pixel .rainbow-pixel__content {
  position: relative;
  z-index: 10;
  color: var(--rpx-fg);
}

.rainbow-pixel .rainbow-pixel__content h2,
.rainbow-pixel .rainbow-pixel__content h3 {
  margin: 0;
  color: var(--rpx-fg);
  font-size: 1.875rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-weight: 600;
}

.rainbow-pixel .rainbow-pixel__content p {
  margin: 16px auto 0;
  max-width: 52ch;
  color: var(--rpx-fg);
  line-height: 1.65;
}

.rainbow-pixel .rainbow-pixel__content p:first-child { margin-top: 0; }

.rainbow-pixel .rainbow-pixel__content a {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, currentColor 45%, transparent);
  text-underline-offset: 3px;
}

.rainbow-pixel .rainbow-pixel__content a:hover {
  text-decoration-color: currentColor;
}

.rainbow-pixel .rainbow-pixel__content a:focus-visible {
  outline: 2px solid var(--rpx-fg);
  outline-offset: 3px;
  border-radius: 3px;
}

@media (min-width: 768px) {
  .rainbow-pixel .rainbow-pixel__content h2,
  .rainbow-pixel .rainbow-pixel__content h3 { font-size: 2.6rem; }
}

@media (prefers-reduced-motion: reduce) {
  .rainbow-pixel,
  .rainbow-pixel__track {
    animation: none !important;
  }
  /* Still fallback: a calm field of faint pixels scattered by x-position. */
  .rainbow-pixel__track {
    opacity: calc(var(--peak) * 0.35);
    transform: translateY(calc(-1 * var(--x)));
  }
}
`;

export default function RainbowPixelContainer({
  children,
  className = "",
  style,
  particleCount = 28,
  minSizePx = 4.6,
  maxSizePx = 9.1,
  minRiseSeconds = 5.5,
  maxRiseSeconds = 9.1,
  driftPx = 13,
  minOpacity = 0.55,
  maxOpacity = 0.9,
  edgeInsetPct = 4,
  seed = 0x5eed,
  colors = RAINBOW_COLORS,
  secondsPerColor = 3,
  background,
  textColor,
  radiusPx,
  border,
  paddingYPx,
  paddingXPx,
  paddingXMdPx,
  glowPercent,
  pixelGlowPercent,
  pixelRadiusPx,
  boxShadow,
}: RainbowPixelContainerProps) {
  const palette = colors.length ? colors : RAINBOW_COLORS;
  const particles = makeParticles({
    count: Math.max(0, particleCount),
    seed,
    minSize: minSizePx,
    maxSize: Math.max(minSizePx, maxSizePx),
    minRise: minRiseSeconds,
    maxRise: Math.max(minRiseSeconds, maxRiseSeconds),
    drift: driftPx,
    minOpacity,
    maxOpacity: Math.max(minOpacity, maxOpacity),
    edgeInset: edgeInsetPct,
  });

  // A single colour needs no animation, and no keyframes rule.
  const animated = palette.length > 1;
  const animName = `rpx-cycle-${paletteId(palette)}`;

  const vars: Record<string, string> = {
    "--rpx-cycle": `${palette.length * secondsPerColor}s`,
    "--rpx-first-color": palette[0],
  };
  if (animated) vars["--rpx-anim"] = animName;
  if (background) vars["--rpx-bg"] = background;
  if (textColor) vars["--rpx-fg"] = textColor;
  if (radiusPx != null) vars["--rpx-radius"] = `${radiusPx}px`;
  if (border) vars["--rpx-border"] = border;
  if (paddingYPx != null) vars["--rpx-pad-y"] = `${paddingYPx}px`;
  if (paddingXPx != null) {
    vars["--rpx-pad-x"] = `${paddingXPx}px`;
    vars["--rpx-pad-x-md"] = `${paddingXMdPx ?? paddingXPx}px`;
  }
  if (paddingXMdPx != null) vars["--rpx-pad-x-md"] = `${paddingXMdPx}px`;
  if (glowPercent != null) vars["--rpx-edge-glow"] = `color-mix(in srgb, currentColor ${glowPercent}%, transparent)`;
  if (pixelGlowPercent != null) vars["--rpx-pixel-glow"] = `color-mix(in srgb, currentColor ${pixelGlowPercent}%, transparent)`;
  if (pixelRadiusPx != null) vars["--rpx-pixel-radius"] = `${pixelRadiusPx}px`;
  if (boxShadow) vars["--rpx-shadow"] = boxShadow;

  return (
    <section className={`rainbow-pixel ${className}`.trim()} style={{ ...vars, ...style } as React.CSSProperties}>
      {/* Hoisted and de-duplicated by React: one copy per page however many
          instances render, and one keyframes rule per distinct palette. */}
      <style href="rainbow-pixel-base" precedence="default">
        {BASE_CSS}
      </style>
      {animated && (
        <style href={`rainbow-pixel-${animName}`} precedence="default">
          {paletteKeyframes(animName, palette)}
        </style>
      )}

      <div className="rainbow-pixel__particles" aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className="rainbow-pixel__track"
            style={
              {
                "--x": `${p.leftPct.toFixed(2)}%`,
                "--size": `${p.sizePx}px`,
                "--dur": `${p.durationS}s`,
                "--delay": `${p.delayS.toFixed(2)}s`,
                "--peak": p.peakOpacity,
                "--drift": `${p.driftPx}px`,
              } as React.CSSProperties
            }
          >
            <span className="rainbow-pixel__dot" />
          </span>
        ))}
      </div>

      <div className="rainbow-pixel__content">{children}</div>
    </section>
  );
}
