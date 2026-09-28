import { SITE } from "@/lib/site";
import RainbowPixelContainer from "./RainbowPixelContainer";

/**
 * Who runs the site, in his own words, on the pages where a visitor is most
 * likely to wonder: the homepage and the contact page. One component so the
 * wording and the address stay identical in both places.
 *
 * The panel's look is tuned here, not inside RainbowPixelContainer: pixel size,
 * count, speed, palette and padding are all props, so this is the file to edit
 * when the effect should change.
 */
export function OwnerNote({ className = "" }: { className?: string }) {
  return (
    <RainbowPixelContainer
      className={className}
      // Density +10% (34 -> 37).
      particleCount={37}
      minSizePx={4}
      maxSizePx={8}
      // Speed +20%: the same rise covered in 1/1.2 of the time.
      minRiseSeconds={5}
      maxRiseSeconds={8.3}
      secondsPerColor={3}
      // Glow +10% on both the bottom edge (26 -> 29) and each pixel (45 -> 50).
      glowPercent={29}
      pixelGlowPercent={50}
      // Panel trimmed ~30%: less padding, slightly smaller text and gap.
      paddingYPx={30}
      paddingXPx={20}
      paddingXMdPx={44}
      fontSizePx={15}
      paragraphGapPx={10}
    >
      <p>
        I’m {SITE.owner}, a web developer, and I built GetRemoteJobsNow with one simple mission: to make finding remote
        work a little easier.
      </p>
      <p>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </RainbowPixelContainer>
  );
}
