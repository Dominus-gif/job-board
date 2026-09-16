/**
 * Working-hours overlap for /tools/team-timezone-matrix.
 *
 * Offsets come from the runtime's IANA time zone database via Intl, evaluated
 * on the date the user picks, so daylight saving is applied the way it will be
 * on that day. All arithmetic is in UTC minutes.
 */

export const CITIES: { label: string; zone: string }[] = [
  { label: "San Francisco", zone: "America/Los_Angeles" },
  { label: "Vancouver", zone: "America/Vancouver" },
  { label: "Denver", zone: "America/Denver" },
  { label: "Chicago", zone: "America/Chicago" },
  { label: "Mexico City", zone: "America/Mexico_City" },
  { label: "New York", zone: "America/New_York" },
  { label: "Toronto", zone: "America/Toronto" },
  { label: "Bogotá", zone: "America/Bogota" },
  { label: "Buenos Aires", zone: "America/Argentina/Buenos_Aires" },
  { label: "São Paulo", zone: "America/Sao_Paulo" },
  { label: "London", zone: "Europe/London" },
  { label: "Dublin", zone: "Europe/Dublin" },
  { label: "Lisbon", zone: "Europe/Lisbon" },
  { label: "Madrid", zone: "Europe/Madrid" },
  { label: "Paris", zone: "Europe/Paris" },
  { label: "Berlin", zone: "Europe/Berlin" },
  { label: "Amsterdam", zone: "Europe/Amsterdam" },
  { label: "Stockholm", zone: "Europe/Stockholm" },
  { label: "Warsaw", zone: "Europe/Warsaw" },
  { label: "Athens", zone: "Europe/Athens" },
  { label: "Kyiv", zone: "Europe/Kyiv" },
  { label: "Istanbul", zone: "Europe/Istanbul" },
  { label: "Cape Town", zone: "Africa/Johannesburg" },
  { label: "Lagos", zone: "Africa/Lagos" },
  { label: "Nairobi", zone: "Africa/Nairobi" },
  { label: "Cairo", zone: "Africa/Cairo" },
  { label: "Tel Aviv", zone: "Asia/Jerusalem" },
  { label: "Dubai", zone: "Asia/Dubai" },
  { label: "Karachi", zone: "Asia/Karachi" },
  { label: "Bengaluru", zone: "Asia/Kolkata" },
  { label: "Kathmandu", zone: "Asia/Kathmandu" },
  { label: "Dhaka", zone: "Asia/Dhaka" },
  { label: "Bangkok", zone: "Asia/Bangkok" },
  { label: "Ho Chi Minh City", zone: "Asia/Ho_Chi_Minh" },
  { label: "Jakarta", zone: "Asia/Jakarta" },
  { label: "Singapore", zone: "Asia/Singapore" },
  { label: "Manila", zone: "Asia/Manila" },
  { label: "Hong Kong", zone: "Asia/Hong_Kong" },
  { label: "Seoul", zone: "Asia/Seoul" },
  { label: "Tokyo", zone: "Asia/Tokyo" },
  { label: "Brisbane", zone: "Australia/Brisbane" },
  { label: "Sydney", zone: "Australia/Sydney" },
  { label: "Auckland", zone: "Pacific/Auckland" },
];

export interface Member {
  id: string;
  name: string;
  zone: string;
  /** Local working hours, in minutes after midnight. */
  start: number;
  end: number;
}

/** Minutes the zone is ahead of UTC at the given instant. */
export function offsetMinutes(zone: string, at: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(at);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return Math.round((asUtc - Math.floor(at.getTime() / 60000) * 60000) / 60000);
}

/** A member's working window in UTC minutes relative to 00:00 UTC on `day`. */
export function utcWindow(m: Member, day: string): [number, number] {
  const noon = new Date(`${day}T12:00:00Z`);
  const off = offsetMinutes(m.zone, noon);
  const len = ((m.end - m.start + 1440) % 1440) || 1440;
  const start = m.start - off;
  return [start, start + len];
}

/** Overlap in minutes between two windows, checking the ±1 day wraps. */
export function overlap(a: [number, number], b: [number, number]): number {
  let best = 0;
  for (const shift of [-1440, 0, 1440]) {
    const lo = Math.max(a[0], b[0] + shift);
    const hi = Math.min(a[1], b[1] + shift);
    best = Math.max(best, hi - lo);
  }
  return Math.max(0, best);
}

/** For each 30-minute slot of the UTC day, which members are working. */
export function coverage(members: Member[], day: string): boolean[][] {
  const windows = members.map((m) => utcWindow(m, day));
  return Array.from({ length: 48 }, (_, slot) => {
    const t = slot * 30 + 15; // slot midpoint
    return windows.map(([s, e]) => [t, t + 1440, t - 1440].some((x) => x >= s && x < e));
  });
}

/** Longest run of slots where the most people are available. */
export function bestWindow(cov: boolean[][]): { from: number; to: number; count: number } | null {
  if (!cov.length || !cov[0].length) return null;
  const counts = cov.map((row) => row.filter(Boolean).length);
  const top = Math.max(...counts);
  if (top === 0) return null;
  // Treat the day as circular so a window over midnight UTC is found whole.
  let best = { from: 0, len: 0 };
  for (let i = 0; i < 48; i++) {
    if (counts[i] !== top || counts[(i + 47) % 48] === top) continue;
    let len = 0;
    while (len < 48 && counts[(i + len) % 48] === top) len++;
    if (len > best.len) best = { from: i, len };
  }
  if (best.len === 0) best = { from: 0, len: 48 }; // everyone, all day
  return { from: best.from * 30, to: (best.from + best.len) * 30, count: top };
}

/** "09:30" for a UTC minute value shown in `zone` on `day`. */
export function localTime(utcMinutes: number, zone: string, day: string): string {
  const base = Date.parse(`${day}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", { timeZone: zone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(
    new Date(base + utcMinutes * 60000),
  );
}

export function zoneLabel(zone: string, day: string): string {
  const off = offsetMinutes(zone, new Date(`${day}T12:00:00Z`));
  const sign = off >= 0 ? "+" : "−";
  const h = Math.floor(Math.abs(off) / 60);
  const m = Math.abs(off) % 60;
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, "0")}` : ""}`;
}

export const hhmm = (mins: number) => `${String(Math.floor(mins / 60) % 24).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
