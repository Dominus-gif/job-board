/**
 * GetRemoteJobsNow.com brand logo, rebuilt as theme-aware SVG + text so the
 * navy wordmark ("Get"/"Now") flips to white in dark mode while the blue/green
 * brand colours stay constant. `LogoIcon` is the standalone globe-on-laptop mark
 * (also used for the favicon); `Logo` is the full horizontal lockup for the nav.
 *
 * `onDark` forces the light-on-dark treatment (used in the always-dark footer,
 * where the page theme class can't be relied on).
 */

export function LogoIcon({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="GetRemoteJobsNow.com" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grjn-globe" x1="18" y1="12" x2="52" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2f80ed" />
          <stop offset="0.55" stopColor="#22a3c9" />
          <stop offset="1" stopColor="#25c08a" />
        </linearGradient>
        <linearGradient id="grjn-swoosh" x1="24" y1="10" x2="52" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#25c08a" />
          <stop offset="1" stopColor="#2f80ed" />
        </linearGradient>
      </defs>

      {/* Laptop (navy in light, light-blue in dark so it stays visible). */}
      <path
        className={onDark ? "fill-[#6aa8e6]" : "fill-[#123a63] dark:fill-[#6aa8e6]"}
        d="M12.5 44.5h24.7l7.2 9.4a1.6 1.6 0 0 1-1.3 2.6H6.2a1.6 1.6 0 0 1-1.3-2.6l7.6-9.4Z"
      />

      {/* Globe */}
      <circle cx="34" cy="28" r="16.5" fill="url(#grjn-globe)" />
      {/* Grid lines */}
      <g fill="none" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round">
        <path d="M18.4 24.5h31.2" />
        <path d="M19.5 33.5h29" />
        <ellipse cx="34" cy="28" rx="7.2" ry="16.3" />
        <path d="M34 11.5v33" />
      </g>
      {/* Highlight */}
      <path d="M24 18.5a16.5 16.5 0 0 1 12-4.7" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2.2" strokeLinecap="round" />

      {/* Swoosh + person leaping over the globe */}
      <path d="M22.5 41c14 3 22-3 24.5-17" fill="none" stroke="url(#grjn-swoosh)" strokeWidth="4.2" strokeLinecap="round" />
      <circle cx="47.8" cy="16.5" r="4" fill="#2f80ed" />
    </svg>
  );
}

export function Logo({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  const flip = onDark ? "text-white" : "text-ink-900 dark:text-white";
  const dotcom = onDark ? "text-white/55" : "text-ink-400";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoIcon onDark={onDark} className="h-8 w-8 flex-shrink-0" />
      <span className="font-display text-[19px] font-extrabold leading-none tracking-tight">
        {/* Explicit hex (not text-brand-*) so the dark-mode "brand text → white"
            override doesn't strip the logo's blue/green. */}
        <span className={flip}>Get</span>
        <span className="text-[#2f80ed]">Remote</span>
        <span className="text-[#1fb083]">Jobs</span>
        <span className={flip}>Now</span>
        <span className={dotcom}>.com</span>
      </span>
    </span>
  );
}
