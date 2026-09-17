import Link from "next/link";
import { LocalClock, RequestedPath } from "./LostClient";

export interface BoardRow {
  /** What the visitor is heading to. */
  destination: string;
  href: string;
  /** A true, current fact about the destination ("5,485 open"). */
  status: string;
}

/** Characters each split-flap tile shows on the way to its final glyph. */
const FLAP_TRAIL = ["7", "2", "9", "1", "5", "8", "3"];

function FlapTile({ char, index }: { char: string; index: number }) {
  // Each tile starts from a different point in the trail so they don't flip in lockstep.
  const trail = [...FLAP_TRAIL.slice(index * 2), ...FLAP_TRAIL.slice(0, index * 2)].slice(0, 5 + index);
  const strip = [...trail, char];
  return (
    <span className="lost-tile" aria-hidden>
      <span
        className="lost-strip"
        style={
          {
            "--steps": strip.length - 1,
            "--to": `${(-(strip.length - 1) / strip.length) * 100}%`,
            "--delay": `${120 + index * 140}ms`,
          } as React.CSSProperties
        }
      >
        {strip.map((c, i) => (
          <span key={i} className="lost-glyph">
            {c}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * An airport departures board: the address the visitor asked for is the one
 * cancelled departure, and every other row is a real place on the site. Pure
 * markup and CSS, so it renders on the server and reads without JavaScript.
 */
export function DepartureBoard({
  code,
  cancelledLabel,
  rows,
}: {
  /** Shown on the split-flap tiles, e.g. "404". */
  code: string;
  /** Status on the cancelled row, e.g. "Not found". */
  cancelledLabel: string;
  rows: BoardRow[];
}) {
  return (
    <section className="lost-board" aria-labelledby="lost-board-title">
      <div className="flex items-center justify-between gap-4 border-b border-[color:var(--lb-rule)] px-5 py-3.5 sm:px-6">
        <h2 id="lost-board-title" className="font-editorial-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--lb-muted)]">
          Departures
        </h2>
        <p className="font-editorial-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--lb-muted)]">
          Local time <LocalClock />
        </p>
      </div>

      <div className="px-5 pb-2 pt-6 sm:px-6">
        <p className="flex gap-1.5 sm:gap-2" role="img" aria-label={`Error code ${code.split("").join(" ")}`}>
          {code.split("").map((c, i) => (
            <FlapTile key={i} char={c} index={i} />
          ))}
        </p>
      </div>

      <table className="mt-4 w-full table-fixed border-collapse text-left">
        <caption className="sr-only">Where you can go from here</caption>
        <colgroup>
          <col />
          <col className="w-[38%] sm:w-[36%]" />
        </colgroup>
        <thead>
          <tr className="font-editorial-mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--lb-muted)]">
            <th scope="col" className="px-5 pb-2 font-normal sm:px-6">Destination</th>
            <th scope="col" className="px-5 pb-2 text-right font-normal sm:px-6">Status</th>
          </tr>
        </thead>
        <tbody className="font-editorial-mono text-[13px] sm:text-sm">
          <tr className="border-t border-[color:var(--lb-rule)]">
            <th scope="row" className="px-5 py-3 font-normal sm:px-6">
              <span className="block truncate text-[color:var(--lb-ink)]">
                <RequestedPath />
              </span>
            </th>
            <td className="px-5 py-3 text-right sm:px-6">
              <span className="lost-cancelled">
                <span className="lost-blink" aria-hidden />
                {cancelledLabel}
              </span>
            </td>
          </tr>
          {rows.map((r) => (
            <tr key={r.href} className="lost-row border-t border-[color:var(--lb-rule)]">
              <th scope="row" className="p-0 font-normal">
                <Link href={r.href} className="lost-link flex items-center gap-2 px-5 py-3 sm:px-6">
                  <span className="truncate text-[color:var(--lb-ink)]">{r.destination}</span>
                  <span className="lost-arrow" aria-hidden>→</span>
                </Link>
              </th>
              <td className="px-5 py-3 text-right text-[color:var(--lb-status)] sm:px-6">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-3" />
    </section>
  );
}
