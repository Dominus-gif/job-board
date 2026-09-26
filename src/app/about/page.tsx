import type { Metadata } from "next";
import Link from "next/link";
import { SITE, FEATURES } from "@/lib/site";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "About",
  description: `What ${SITE.name} is, where its listings come from, how roles are checked for location limits, and what we publish ourselves.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalShell eyebrow="About" title={`About ${SITE.name}`}>
      <p>
        {SITE.name} is a remote job board built around one question most job sites leave unanswered: <strong>where do
        you have to live to take this job?</strong> A listing marked “remote” can mean anywhere in the world, or it can
        mean one country, one time zone or a short list of US states. We sort every role we list so you can see which is
        which before you apply.
      </p>

      <h2>Two boards, clearly labelled</h2>
      <ul>
        <li>
          <strong>The main board</strong> lists only <Link href="/work-from-anywhere-jobs">work-from-anywhere roles</Link>:
          jobs that name no required country, region, time zone or local work permit. These are a small share of all
          remote jobs, and they are what the site was started for.
        </li>
        <li>
          <strong>The <Link href="/remote-regional-jobs">regional board</Link></strong> lists remote roles that are tied
          to a named country or region, such as “Remote, United States” or “Remote, EMEA”. Each one says where it is
          open on the card and at the top of the page.
        </li>
      </ul>

      <h2>Where the listings come from</h2>
      <p>
        Most roles come from employers’ own hiring systems, such as Greenhouse, Lever, Ashby and Workable, with a smaller
        number from other remote job sources. The board is rebuilt every night: new roles are added, closed ones are
        removed, and each role is checked against our location rules. Every listing links to the employer’s own page,
        which is where you apply. We never charge job seekers, and we never ask for payment to apply.
      </p>
      <p>
        Job descriptions belong to the employers who wrote them. What we add is the sorting, the location check, the
        salary and skills tags where a posting states them, and comparisons with similar roles on the board.{" "}
        <Link href="/how-it-works">How the board works</Link> explains the location rules in detail.
      </p>

      <h2>What we write and build ourselves</h2>
      <p>
        Alongside the listings we publish <Link href="/posts">guides for remote job seekers</Link>, covering pay, taxes,
        time zones, scams and interviews, written from the listings on our own board and from named public sources. We
        also build <Link href="/tools">free tools</Link>, such as a fake job checker, a salary band estimator and a tax
        residency day counter. They run in your browser, and what you type into them stays on your device.
      </p>

      <h2>Corrections and reports</h2>
      <p>
        Filters make mistakes. If you find a listing that is closed, office-based, restricted in a way its label does not
        show, or that looks like a scam, please <Link href="/contact">tell us</Link> and we will fix or remove it. The
        same goes for any error in a guide or tool.
      </p>

      <h2>How the site is funded</h2>
      <p>
        The site is free to use and is supported by advertising. Ads are labelled as advertisements, and if an employer
        ever pays to promote a listing, that listing is marked “Featured”. No employer or advertiser pays to change what
        a guide says. See the{" "}
        <Link href="/privacy">privacy policy</Link> for how advertising and analytics use cookies.
      </p>

      <h2>Get in touch</h2>
      <p>
        Hiring and want to list a role? See <Link href="/hiring">Post a job</Link>
        {FEATURES.advertise && <> or <Link href="/advertise">Advertise</Link></>}. For anything else,{" "}
        <Link href="/contact">contact us</Link>.
      </p>
    </LegalShell>
  );
}
