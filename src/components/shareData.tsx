import type { ReactNode } from "react";

const wrap = (children: ReactNode) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>{children}</svg>
);

export const XIcon = () => wrap(<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />);
export const LinkedInIcon = () => wrap(<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />);
export const FacebookIcon = () => wrap(<path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />);
export const WhatsAppIcon = () => wrap(<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.6h-.01a9.5 9.5 0 0 1-4.83-1.32l-.35-.21-3.59.94.96-3.5-.23-.36a9.48 9.48 0 0 1-1.45-5.05c0-5.24 4.27-9.5 9.52-9.5 2.54 0 4.93.99 6.73 2.79a9.44 9.44 0 0 1 2.78 6.72c0 5.24-4.27 9.5-9.51 9.5zM20.52 3.45A11.42 11.42 0 0 0 12.05.01C5.8.01.72 5.09.72 11.33c0 2 .52 3.95 1.52 5.67L.62 23.4l6.55-1.72a11.3 11.3 0 0 0 5.42 1.38h.01c6.24 0 11.33-5.08 11.33-11.32 0-3.03-1.18-5.87-3.32-8.01z" />);
export const RedditIcon = () => wrap(<path d="M24 11.78a2.34 2.34 0 0 0-2.34-2.33c-.62 0-1.19.24-1.61.64a11.6 11.6 0 0 0-6.28-1.98l1.07-5.03 3.5.74a1.67 1.67 0 1 0 .17-.83l-3.9-.83a.4.4 0 0 0-.47.31L12.98 8.1a11.65 11.65 0 0 0-6.36 1.98 2.33 2.33 0 1 0-2.58 3.82 4.6 4.6 0 0 0-.06.72c0 3.64 4.24 6.59 9.46 6.59s9.46-2.95 9.46-6.59c0-.24-.02-.48-.06-.71A2.33 2.33 0 0 0 24 11.78zM6.67 13.44a1.67 1.67 0 1 1 3.34 0 1.67 1.67 0 0 1-3.34 0zm9.34 4.42c-1.14 1.14-3.32 1.23-3.96 1.23-.64 0-2.82-.09-3.96-1.23a.43.43 0 0 1 .61-.61c.72.72 2.26.98 3.35.98 1.09 0 2.63-.26 3.35-.98a.43.43 0 1 1 .61.61zm-.29-2.75a1.67 1.67 0 1 1 0-3.34 1.67 1.67 0 0 1 0 3.34z" />);
export const TelegramIcon = () => wrap(<path d="M23.91 3.79 20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56l.38-5.56 10.12-9.14c.44-.39-.1-.61-.68-.22L6.24 13.4.83 11.7c-1.18-.37-1.2-1.18.24-1.75l21.1-8.13c.98-.36 1.84.22 1.53 1.72z" />);
export const MailIcon = () => wrap(<path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />);
export const LinkIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
  </svg>
);

export interface ShareNetwork {
  label: string;
  href: string;
  icon: ReactNode;
}

/** Truncate to `max` characters with an ellipsis, on a word boundary if easy. */
function clamp(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, Math.max(0, max - 1));
  const sp = cut.lastIndexOf(" ");
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).trimEnd() + "…";
}

/**
 * Build share-network links for a job URL. Each network gets a message tailored
 * to its character limit so nothing is ever truncated by the platform:
 *   - X/Twitter: whole post ≤ 250 chars (the link counts as ~23 via t.co).
 *   - Reddit: title ≤ 300 (the link is a separate field).
 *   - Facebook quote ≤ 280; Telegram/WhatsApp kept tidy; LinkedIn takes no text.
 * Social buttons share link + message; the Copy button (elsewhere) copies the
 * link only.
 */
export function buildShareNetworks(url: string, title: string, message?: string): ShareNetwork[] {
  const base = message ?? `${title} — a remote job you can do from anywhere. Via getremotejobsnow.com.`;
  const enc = encodeURIComponent;
  const u = enc(url);
  const t = enc(title);

  // X: budget = 250 total − 24 for the trailing space + t.co link.
  const xText = clamp(base, 250 - 24);
  const tgText = clamp(base, 700);
  const waText = `${clamp(base, 700)}\n\n${url}`;
  const fbQuote = clamp(base, 280);
  const redditTitle = clamp(base, 300);

  return [
    { label: "Share on X", href: `https://twitter.com/intent/tweet?text=${enc(xText)}&url=${u}`, icon: <XIcon /> },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: <LinkedInIcon /> },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}&quote=${enc(fbQuote)}`, icon: <FacebookIcon /> },
    { label: "Share on WhatsApp", href: `https://api.whatsapp.com/send?text=${enc(waText)}`, icon: <WhatsAppIcon /> },
    { label: "Share on Reddit", href: `https://www.reddit.com/submit?url=${u}&title=${enc(redditTitle)}`, icon: <RedditIcon /> },
    { label: "Share on Telegram", href: `https://t.me/share/url?url=${u}&text=${enc(tgText)}`, icon: <TelegramIcon /> },
    { label: "Share by email", href: `mailto:?subject=${t}&body=${enc(`${base}\n\n${url}`)}`, icon: <MailIcon /> },
  ];
}
