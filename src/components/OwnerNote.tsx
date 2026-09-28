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
      particleCount={34}
      minSizePx={4}
      maxSizePx={8}
      minRiseSeconds={6}
      maxRiseSeconds={10}
      secondsPerColor={3}
      paddingYPx={56}
      paddingXPx={28}
      paddingXMdPx={64}
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
