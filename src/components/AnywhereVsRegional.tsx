import { GlobeIcon, PinIcon } from "./icons";

/**
 * The site's core differentiator, shown on every SEO hub page: the difference
 * between truly location-independent ("Anywhere") roles and region-locked
 * ("Regional") ones. Server-rendered, theme-aware (emerald/amber tints are
 * remapped for dark mode in globals.css).
 */
export function AnywhereVsRegional() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="flex gap-3 rounded-2xl bg-emerald-50 p-4 ring-1 ring-inset ring-emerald-100">
        <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/70 text-emerald-700">
          <GlobeIcon className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display font-bold text-emerald-800">Anywhere</p>
          <p className="mt-0.5 text-sm leading-relaxed text-emerald-800/90">
            Work from any country — no region, timezone, or work-authorization requirement. This is what makes
            us different from generic remote boards.
          </p>
        </div>
      </div>
      <div className="flex gap-3 rounded-2xl bg-amber-50 p-4 ring-1 ring-inset ring-amber-200">
        <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/70 text-amber-700">
          <PinIcon className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display font-bold text-amber-900">Regional</p>
          <p className="mt-0.5 text-sm leading-relaxed text-amber-900/90">
            Fully remote, but the employer can only hire in a specific country or region. Clearly labelled on
            every card so you never waste an application.
          </p>
        </div>
      </div>
    </div>
  );
}
