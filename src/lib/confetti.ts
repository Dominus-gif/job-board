/**
 * A small canvas confetti burst, for the moment a subscribe actually succeeds.
 *
 * Flat rectangular bars blow out in a full 360°, tumble under gravity and fade
 * as they reach a death line just below the button, so the celebration stays
 * local to the control instead of raining down the page.
 *
 * The canvas sits above the page, which is why the aurora halo of the original
 * design is NOT drawn here: painting a glow at this level dims the button and
 * the copy around it. That half lives in `.btn-celebrate` in globals.css, as a
 * box-shadow, which paints behind the button and costs no layout.
 *
 * No dependencies, and nothing is rendered on the server. The canvas is created
 * on the first burst and removed again the moment the last particle dies, so an
 * idle page carries no extra element.
 */

/**
 * Notion-soft rather than neon: the board's brand blue and its lighter tint,
 * the emerald it already uses for success text, plus a warm amber and coral so
 * the burst still reads as confetti. All five hold up on the light and the dark
 * surface.
 */
export const CONFETTI_COLORS = ["#2383e2", "#aacce8", "#10b981", "#f5b544", "#ef6461"];

const BURST_COUNT = 120; // particles per celebration
const DEATH_OFFSET_PX = 24; // fade completes this far below the button's bottom edge
const GRAVITY = 900; // px/s²
const DRAG_PER_FRAME = 0.995; // mild air resistance, expressed per 60fps frame
const SPREAD = 0.8; // blast velocity multiplier
const FADE_ZONE = 48; // px above the death line where alpha ramps 1 → 0

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number; // tumble, rad/s
  len: number; // bar length, px
  thick: number; // bar thickness, px (~1:6–1:8 of len)
  color: string;
  age: number;
  life: number; // seconds — a safety cap so nothing can linger
  deathY: number;
}


let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let rafId = 0;
let lastT = 0;
const particles: Particle[] = [];

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function sizeCanvas() {
  if (!canvas || !ctx) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function ensureCanvas(): boolean {
  if (canvas && ctx) return true;
  if (typeof document === "undefined") return false;
  canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  // Above everything, and completely inert: the burst must never intercept a
  // click meant for the form underneath it.
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    canvas = null;
    return false;
  }
  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);
  return true;
}

function teardown() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
  if (canvas) {
    window.removeEventListener("resize", sizeCanvas);
    canvas.remove();
  }
  canvas = null;
  ctx = null;
}

/** Drop every particle and remove the canvas. Safe to call at any time. */
export function stopConfetti() {
  particles.length = 0;
  teardown();
}

/**
 * Fire a burst centred on `anchor`, the element being celebrated.
 *
 * A no-op when the element is missing, when the viewport cannot paint, or when
 * the reader asked for reduced motion — in which case the caller's label change
 * carries the whole message on its own.
 */
export function celebrate(anchor: HTMLElement | null | undefined) {
  if (!anchor || prefersReducedMotion() || !ensureCanvas()) return;

  const rect = anchor.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return;
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const deathY = rect.bottom + DEATH_OFFSET_PX;

  for (let i = 0; i < BURST_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2; // full 360°
    const speed = (250 + Math.random() * 400) * SPREAD;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 16,
      len: 12 + Math.random() * 9,
      thick: 2 + Math.random() * 1.5,
      color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
      age: 0,
      life: 1.4 + Math.random() * 0.8,
      deathY,
    });
  }

  if (!rafId) {
    lastT = performance.now();
    rafId = requestAnimationFrame(tick);
  }
}


function tick(now: number) {
  const c = ctx;
  if (!c) {
    rafId = 0;
    return;
  }
  const dt = Math.min((now - lastT) / 1000, 32 / 1000); // clamp so a backgrounded tab cannot jump
  lastT = now;

  c.clearRect(0, 0, window.innerWidth, window.innerHeight);


  const drag = Math.pow(DRAG_PER_FRAME, dt * 60);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.age += dt;
    p.vy += GRAVITY * dt;
    p.vx *= drag;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rot += p.vr * dt;

    // Fade over the last stretch before the death line, and again over the tail
    // of the particle's own lifetime, so nothing ever vanishes mid-flight.
    let alpha = 1;
    const distLeft = p.deathY - p.y;
    if (distLeft < FADE_ZONE) alpha *= Math.max(distLeft / FADE_ZONE, 0);
    const lifeFrac = p.age / p.life;
    if (lifeFrac > 2 / 3) alpha *= Math.max((1 - lifeFrac) * 3, 0);

    if (p.y >= p.deathY + 2 || p.age >= p.life || alpha <= 0.01) {
      particles.splice(i, 1);
      continue;
    }

    c.save();
    c.translate(p.x, p.y);
    c.rotate(p.rot);
    c.globalAlpha = alpha;
    c.fillStyle = p.color;
    c.fillRect(-p.len / 2, -p.thick / 2, p.len, p.thick);
    c.restore();
  }

  if (particles.length > 0) {
    rafId = requestAnimationFrame(tick);
  } else {
    // Idle: take the canvas back out of the document entirely.
    rafId = 0;
    teardown();
  }
}
