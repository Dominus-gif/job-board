/**
 * Cluster A — Trust & scam defence.
 *
 * Every figure attributed to "our board" or "our data" is measured from the
 * live dataset at the time of writing (5,854 published listings, 337 of them
 * work-from-anywhere) or from the verification sweep described in the sourcing
 * article. Nothing here is estimated and presented as measured.
 */
import type { Post } from "./posts";

const AUTHOR = "getremotejobsnow.com Editorial";

export const POSTS_CLUSTER_A: Post[] = [
  {
    slug: "how-to-spot-fake-remote-job-postings",
    title: "How to Spot a Fake Remote Job Posting in 2026: Red-Flag Checklist",
    description:
      "A practical checklist for spotting fake remote job postings: the contact, domain, pay and pressure signals that give scams away before you share anything.",
    date: "2026-09-16T11:30:00.000Z",
    author: AUTHOR,
    tags: ["Remote Job Scams", "Fake Job Postings", "Job Search Safety", "Remote Work"],
    readMinutes: 6,
    html: `
      <p>Most fake remote job postings are not clever. They survive because the people reading them are tired, hopeful, and three hundred applications into a search that has produced nothing. A scam doesn't need to fool a careful reader. It needs to catch someone on the one evening they stopped being careful.</p>
      <p>So this checklist is built to be run quickly, the same way every time, before you send a CV or answer a message. None of the checks takes more than a minute. Together they catch the overwhelming majority of what gets posted.</p>

      <h2>Start with the thing scammers can't easily fake: a verifiable employer</h2>
      <p>A real company leaves a trail. It has a website that existed before last month, people who say they work there, and a careers page that lists the role you're looking at. A fake one has a logo and a sense of urgency.</p>
      <ol>
        <li><strong>Find the role on the company's own site.</strong> Don't use a link from the posting. Go to the company's domain yourself and look for a careers or jobs page. If the role isn't there, treat that as a serious warning, not a detail.</li>
        <li><strong>Check who else says they work there.</strong> A company with forty employees should have more than one person on a professional network claiming it, and those people should have histories longer than a few weeks.</li>
        <li><strong>Look for an address and a way to reach a human.</strong> A registered office, a phone number, a support address on the company domain. "Contact us via the form" and nothing else is thin.</li>
      </ol>
      <p>This is why every listing on our board links to the employer's own posting rather than to an application form we host. We explain the mechanics in <a href="/posts/how-we-source-and-verify-listings">how we source and verify listings</a>, but the short version is that a role we can't trace back to the employer doesn't get published.</p>

      <h2>The domain tells you more than the logo</h2>
      <p>Scammers borrow brands constantly, and the easiest place to catch them is the email address. Recruiters at real companies write from the company domain. Watch for:</p>
      <ul>
        <li>Free mail providers presented as corporate addresses.</li>
        <li>Lookalike domains: an extra hyphen, a swapped letter, or <em>careers-</em> and <em>-jobs</em> bolted onto a real brand name.</li>
        <li>A domain that was registered very recently. A public WHOIS lookup takes seconds, and a "global company" whose domain is six weeks old is not a global company.</li>
      </ul>
      <p>None of these proves fraud on its own. Small companies do use odd addresses. But a brand-new domain combined with a household-name logo is a pattern worth walking away from.</p>

      <h2>Money should only ever flow towards you</h2>
      <p>This is the rule with no exceptions. A legitimate employer does not ask you to pay for anything to get or start a job. Not training, not a background check, not software, not equipment.</p>
      <p>The equipment version is the most convincing, because remote jobs genuinely do involve equipment. The scam sends you a cheque to buy a laptop from a "preferred vendor", the cheque bounces a week later, and the money you sent the vendor is gone. Real employers either ship you the hardware or reimburse you after you've bought it. They don't route your purchase through a supplier they choose and you pay.</p>
      <blockquote>If a job requires you to send money, buy gift cards, move funds through your own account, or receive a payment and forward part of it on, it is not a job.</blockquote>

      <h2>Pay that doesn't match the work</h2>
      <p>Compare the offer against what similar roles actually pay. On our board, 1,115 of 5,854 listings state a salary, and among the ones quoted in US dollars the median midpoint is <strong>$193,500</strong>. That skews high because the board leans towards product, engineering and finance roles, but it gives you a sense of scale. A data-entry posting promising a senior engineer's pay for a few hours a week is not generous. It's bait.</p>
      <p>The opposite signal matters too. A posting that won't discuss pay at all, then pressures you to accept quickly, is hoping you won't compare.</p>

      <h2>Pressure is a tactic, not a hiring process</h2>
      <p>Real hiring is slow. It involves several people, several days, and usually more than one conversation. Scams compress all of that because time is their enemy. Every day you wait is a day you might mention it to someone who recognises the pattern.</p>
      <p>Be wary of:</p>
      <ul>
        <li>An offer made after a single chat, especially a text-only chat on a messaging app.</li>
        <li>"Interviews" conducted entirely by instant message, with no video and no named interviewer.</li>
        <li>Requests for your bank details, a copy of your passport, or your national ID number before a written offer exists.</li>
        <li>Deadlines measured in hours.</li>
      </ul>

      <h2>Read the posting itself</h2>
      <p>Fake postings are often written to appeal to as many people as possible, which makes them oddly shapeless. The duties are vague ("assist with various tasks"), the requirements are almost nothing ("no experience needed, must have a phone"), and the benefits are enormous. Real job descriptions are specific because the employer is trying to filter candidates out, not pull everyone in.</p>
      <p>Grammar alone isn't a reliable test, because plenty of legitimate postings are written in a hurry and plenty of scams are now polished. Specificity is a better test than spelling.</p>

      <h2>A one-minute routine</h2>
      <p>Before you apply, run these five questions:</p>
      <ol>
        <li>Is this exact role on the company's own careers page?</li>
        <li>Is the recruiter writing from the company's domain?</li>
        <li>Is anyone asking me to pay, buy, or move money?</li>
        <li>Does the pay make sense for the work?</li>
        <li>Is anyone rushing me?</li>
      </ol>
      <p>If any answer worries you, stop and verify before sharing anything. Starting from a board that only lists roles traced back to an employer, like our <a href="/work-from-anywhere-jobs">work-from-anywhere jobs</a> or the wider <a href="/remote-regional-jobs">regional remote board</a>, removes much of this work before you begin. It doesn't remove the need to stay alert once someone contacts you.</p>
      <p>One last habit worth building: use a unique, strong password for every job board and hiring-platform account you create. Scammers who harvest one login often try it everywhere else. Our <a href="/tools/password-generator">password generator</a> makes that painless.</p>
    `,
    faq: [
      {
        q: "Can a remote job ask me to buy my own equipment?",
        a: "Some legitimate employers reimburse equipment you buy yourself, but none will ask you to buy it from a vendor they choose using money they sent you. That pattern is a common cheque scam: the payment bounces after you have already sent real money to the vendor.",
      },
      {
        q: "Is a job interview over text message always a scam?",
        a: "Not always, but it is a strong warning sign. Real employers almost always hold at least one video or phone interview with a named person before making an offer. An offer made entirely through a messaging app should be verified independently before you share personal or banking details.",
      },
      {
        q: "How can I check whether a company is real?",
        a: "Go to the company's website yourself rather than following links in the posting, confirm the role appears on its careers page, check that recruiters write from the company domain, and look up when that domain was registered. A well-known brand on a domain registered weeks ago is a red flag.",
      },
      {
        q: "What should I do if I think I found a fake posting?",
        a: "Stop engaging, do not send money or identity documents, and report the posting to the site that hosted it. If you have already shared financial details, contact your bank immediately and report the fraud to your national consumer protection or fraud reporting agency.",
      },
    ],
  },

  {
    slug: "ghost-jobs-how-to-tell-a-role-is-still-open",
    title: "Ghost Jobs: How to Tell If a Remote Job Is Still Open",
    description:
      "Why so many remote listings are already filled or gone, with numbers from our own verification sweep, and how to check a role is still open before you apply.",
    date: "2026-09-16T11:00:00.000Z",
    author: AUTHOR,
    tags: ["Ghost Jobs", "Stale Job Listings", "Job Search", "Remote Work"],
    readMinutes: 5,
    html: `
      <p>You've probably done this. Found a role that fits, spent an evening tailoring your application, submitted it, and heard nothing. Not a rejection. Nothing. Weeks later you look again and the posting has vanished, or worse, it's still there, collecting applications for a job that no longer exists.</p>
      <p>These are ghost jobs, and they are not a conspiracy. Most of them are an accident of plumbing. But understanding the plumbing is the fastest way to stop wasting evenings on them.</p>

      <h2>We measured it on our own board</h2>
      <p>We don't take this on trust. We ran a verification pass that went back to each employer's own applicant-tracking board and asked a simple question about every listing: is this posting still there?</p>
      <p>Across <strong>6,805 listings</strong> we could check that way, <strong>1,822 were already gone</strong> from the employer's own board. That's about <strong>27%</strong>. Another 23 pointed at a different role than the one our listing described. Every one of those was removed.</p>
      <p>That figure is the honest cost of running a job board. More than a quarter of what looked like open roles had already closed at the source, and a board that doesn't check is showing you those as live.</p>

      <h2>Why listings outlive the jobs</h2>
      <p>A role usually starts life on an employer's careers page, powered by an applicant-tracking system. From there it spreads: aggregators copy it, job boards scrape it, feeds republish it. Each copy is a snapshot.</p>
      <p>When the employer fills the role and removes it, nothing tells the copies. The original disappears; the snapshots carry on. That's the single most common source of ghost jobs, and it's why the same posting can feel alive on one site and be gone on another.</p>
      <p>There are less innocent reasons too:</p>
      <ul>
        <li><strong>Evergreen postings.</strong> Some roles are left open permanently to collect a pool of candidates, whether or not anyone is being hired right now.</li>
        <li><strong>Reposting.</strong> Automated systems can refresh a posting's date so it looks new, even when the role has been open for months.</li>
        <li><strong>Pipeline building.</strong> A team may advertise a role it expects to open next quarter, not one it can fill today.</li>
      </ul>
      <p>None of these is necessarily dishonest from the employer's side. All of them waste your time.</p>

      <h2>How to check a role is still open</h2>
      <p>The most reliable test takes under a minute:</p>
      <ol>
        <li><strong>Open the employer's own careers page</strong> (not a board or an aggregator) and search for the role.</li>
        <li><strong>Compare the title.</strong> If the employer's page lists a different title, the listing you found may be out of date or describe something else entirely.</li>
        <li><strong>Check whether you can actually apply.</strong> An application form that errors, redirects to the homepage, or says the role is closed tells you what you need to know.</li>
      </ol>
      <p>That third check matters more than it sounds. Some platforms don't return a clean "not found" when a posting is removed. They send you to the main jobs page instead. A naive check sees a working page and concludes the role is live. Our own verification treats a redirect back to the board as a sign the posting is gone, because that's usually what it means.</p>

      <h2>Posting age is a signal, not a verdict</h2>
      <p>Age helps, but read it carefully. On our board the median listing is <strong>22 days old</strong>. About <strong>16%</strong> are under a week, and roughly <strong>31%</strong> are more than a month old.</p>
      <p>A month-old role isn't automatically dead, since senior and specialist searches can run for a long time. But the odds shift. Early applicants to a new posting are read by someone who hasn't yet seen a hundred CVs. Later applicants are competing with a shortlist that may already exist. We explain why we show the age on every listing card in <a href="/posts/the-date-posted-problem-why-freshness-matters">our piece on freshness</a>.</p>
      <blockquote>A fresh date tells you the posting is new. It doesn't tell you the job is. Only the employer's own page can tell you that.</blockquote>

      <h2>Warning signs a listing may be a ghost</h2>
      <ul>
        <li>The same role has been visible for months with no change.</li>
        <li>The description mentions events, products or team names that are clearly out of date.</li>
        <li>You can't find the role on the employer's site at all.</li>
        <li>The salary range looks noticeably stale for the market.</li>
        <li>You've applied before, heard nothing, and it's still up.</li>
      </ul>

      <h2>Spend your effort where it counts</h2>
      <p>You can't eliminate ghost jobs, but you can stop them eating your week. Prioritise recently posted roles, confirm each one on the employer's site before investing real time, and keep your tailored applications for roles you've verified.</p>
      <p>That's also why we re-check our listings on a schedule rather than trusting a feed. It won't catch everything the moment it closes, but it catches most of it, and it's a large part of why the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> and the <a href="/trending-remote-jobs">trending roles page</a> stay closer to what's really open.</p>
    `,
    faq: [
      {
        q: "What is a ghost job?",
        a: "A ghost job is a listing for a role that is no longer open, or was never actively being filled. Most are copies of a posting that the employer has since removed from its own careers page, while other sites that copied it keep showing it.",
      },
      {
        q: "How common are ghost jobs?",
        a: "In our own verification sweep, about 27 percent of the listings we could check against the employer's own board were already gone. The figure varies by source, but stale listings are a routine part of how job postings spread across sites.",
      },
      {
        q: "Is an old job posting always filled?",
        a: "No. Senior and specialist roles can stay open for a long time. Age changes the odds rather than settling the question. The reliable test is whether the role still appears, with the same title, on the employer's own careers page.",
      },
      {
        q: "Why do some removed jobs still show a working page?",
        a: "Some hiring platforms redirect a removed posting to their main jobs page instead of showing an error. The page loads, so it looks live, but the specific role is gone. Always check that the page you land on is the exact role you were looking for.",
      },
    ],
  },

  {
    slug: "remote-job-scams-how-they-make-money",
    title: "7 Remote Job Scams That Still Work in 2026, and How Each Makes Money",
    description:
      "Seven remote job scams that keep working in 2026, explained by how each one extracts money, so you can recognise the mechanism and not just the script.",
    date: "2026-09-16T10:30:00.000Z",
    author: AUTHOR,
    tags: ["Remote Job Scams", "Fraud", "Job Search Safety", "Work From Home"],
    readMinutes: 5,
    html: `
      <p>Most scam warnings are lists of phrases to watch for. The trouble is that scripts change every few months and phrases go stale. What doesn't change is how the money moves. Once you understand the mechanism behind a scam, you'll recognise it however it's dressed up.</p>
      <p>Here are seven that keep working, ordered roughly by how often they reach people looking for remote work.</p>

      <h2>1. The equipment cheque</h2>
      <p><strong>How it makes money:</strong> you receive a cheque or transfer, you're told to buy equipment from a specific supplier, and the incoming payment reverses days later. The supplier was the scammer. The money you sent was real; the money you received never was.</p>
      <p>It works because plenty of remote jobs do come with equipment, and because banks often make funds available before a cheque has fully cleared. Seeing the balance feels like proof. It isn't.</p>

      <h2>2. The task-and-deposit scheme</h2>
      <p><strong>How it makes money:</strong> you're paid small amounts for simple online tasks such as rating products, boosting apps or "optimising" listings. Then a task appears that requires you to deposit your own money before you can complete it, with a promise of a larger payout. The deposits grow; the payout never arrives.</p>
      <p>The early real payments are the hook. They build exactly enough trust to make the first deposit feel reasonable. Many of these run on cryptocurrency, which makes the money hard to trace or recover.</p>

      <h2>3. The overpayment refund</h2>
      <p><strong>How it makes money:</strong> an "employer" or "client" sends more than agreed, apologises, and asks you to return the difference. The original payment is fraudulent and reverses. Your refund was real.</p>
      <p>Any request to send back part of a payment you've just received should stop you cold, whoever it comes from.</p>

      <h2>4. The reshipping job</h2>
      <p><strong>How it makes money:</strong> you're hired to receive parcels at home and forward them elsewhere. The goods were bought with stolen card details, and you're the step that disguises where they went. Payment for your "work" often never arrives, and you may be left explaining your part to the police.</p>
      <p>It feels like a real job because it involves real boxes and real effort. That's the point.</p>

      <h2>5. The money mule</h2>
      <p><strong>How it makes money:</strong> you're offered a "payments processing" or "finance assistant" role that involves receiving funds into your own account and transferring them on, keeping a small cut. The funds are proceeds of other fraud, and you are laundering them.</p>
      <p>This is the one with the most serious consequences for the victim, because moving money for someone else can be treated as a crime in its own right even when you didn't know where it came from.</p>

      <h2>6. The pay-to-train or pay-to-certify job</h2>
      <p><strong>How it makes money:</strong> you're "hired" conditional on completing paid training, a certification, or a background check through a provider the employer names. The fee is the product. The job doesn't exist.</p>
      <p>Legitimate employers pay for the training and checks they require. They don't make your start date depend on buying something from a partner.</p>

      <h2>7. The identity harvest</h2>
      <p><strong>How it makes money:</strong> no money changes hands at first. The "application" asks for your passport, national ID, bank details and tax number, sometimes framed as onboarding paperwork before you've even interviewed. Those details are then used to open accounts, take out credit, or sold on.</p>
      <p>This one is the hardest to spot because it asks for nothing up front. It just asks for everything.</p>
      <blockquote>Every one of these scams depends on you moving money or data before you've verified the employer. Reverse that order and nearly all of them fail.</blockquote>

      <h2>The pattern underneath all seven</h2>
      <p>Look at the list again and a few things repeat:</p>
      <ul>
        <li>Money flows <em>from</em> you, or <em>through</em> you, at some point.</li>
        <li>Something is urgent.</li>
        <li>The employer is hard to verify independently.</li>
        <li>Identity or banking details are requested before a real offer exists.</li>
      </ul>
      <p>Genuine remote employment has none of those features. Pay flows to you on a schedule. Hiring takes days or weeks. The employer is easy to find. Your documents are requested after an offer, through a proper onboarding process.</p>

      <h2>What to do if you're caught</h2>
      <p>Speed matters. Contact your bank immediately to try to stop or recall payments. Report the fraud to the relevant authority in your country and to the site where you found the posting. Keep every message and receipt. And don't let embarrassment slow you down. These schemes are run by people who do nothing else, and they catch careful people too.</p>
      <p>It also helps to keep your job search separate from the rest of your online life. Use a dedicated email address and a different strong password for each job site; our <a href="/tools/password-generator">password generator</a> can create those for you. Then a scammer who gets hold of one login gets nothing else.</p>
      <p>For a quick pre-application routine, see our <a href="/posts/how-to-spot-fake-remote-job-postings">red-flag checklist for fake remote postings</a>. When you want to start from roles already traced back to a real employer, the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> and <a href="/jobs">full job search</a> are good places to begin.</p>
    `,
    faq: [
      {
        q: "What is the most common remote job scam?",
        a: "Schemes built around equipment purchases and overpayments are among the most common, because remote jobs genuinely involve equipment and incoming payments can appear in your account before they fully clear. In both, the money you send is real and the money you received later reverses.",
      },
      {
        q: "Can I get in trouble for a job that involved moving money?",
        a: "Potentially, yes. Receiving funds and transferring them on for someone else can be treated as money laundering even if you did not know the source. If a role asks you to process payments through your own account, stop and seek advice before continuing.",
      },
      {
        q: "Do real employers ever charge for training?",
        a: "Legitimate employers pay for the training, certifications and background checks they require. A job that only starts once you have bought something from a provider the employer names is a strong sign that the fee is the real product.",
      },
      {
        q: "What should I do if I sent money to a job scammer?",
        a: "Contact your bank immediately to try to stop or recall the payment, report the fraud to your national fraud reporting authority, report the posting to the site that hosted it, and keep every message and receipt as evidence.",
      },
    ],
  },

  {
    slug: "how-we-source-and-verify-listings",
    title: "How We Source and Verify Listings on GetRemoteJobsNow.com",
    description:
      "Exactly where our remote job listings come from, how we check they're still open, how we decide what counts as work-from-anywhere, and what we remove.",
    date: "2026-09-16T10:00:00.000Z",
    author: AUTHOR,
    tags: ["About Us", "How It Works", "Job Verification", "Transparency"],
    readMinutes: 5,
    html: `
      <p>Every job board makes the same promise: these are real jobs. Very few explain how they know. This is our explanation, in enough detail that you can judge it for yourself, including the parts that cost us listings.</p>

      <h2>Where the listings come from</h2>
      <p>Most of our listings originate on employers' own applicant-tracking systems, the software companies use to publish roles and collect applications. A large share of employers use a handful of well-known platforms, and those platforms publish each company's open roles in a structured, machine-readable form.</p>
      <p>That matters because it means we're reading the employer's own record of the job, not a copy of a copy. When you click <em>Apply</em> on a listing here, you go to the employer's posting. We don't host application forms and we never ask you to apply through us.</p>
      <p>The rest come from company career pages that publish structured job data, and from a small number of other sources. Where we can't trace a listing back to an employer, we don't publish it.</p>

      <h2>We check that each role still exists</h2>
      <p>A job board that only ever adds listings slowly fills with dead ones. So we go back to the source on a schedule.</p>
      <p>For listings hosted on an applicant-tracking platform, we ask that employer's board directly whether the posting is still there. When we ran this across <strong>6,805 listings</strong>, <strong>1,822</strong> of them (about 27%) were already gone from the employer's own board, and <strong>23</strong> pointed at a different role than the one we described. All of them were removed.</p>
      <p>We're careful about what counts as "gone". A timeout, a rate limit or a server error is us failing to reach the employer, not the job ending, so none of those removes a listing. We only act on a definite answer. And because a check that can't reach the internet would "discover" that every job had vanished, a run where too few employers answer writes nothing at all.</p>

      <h2>We check that each role is the one we say it is</h2>
      <p>Early on, some of our imported data paired roles with the wrong company: a real job, filed under someone else's name. That's worse than a missing listing, because it misrepresents both the job and the employer.</p>
      <p>We now verify the pairing against the address of the employer's own job board. If a listing claims to belong to one company but its application link lives on another company's board, we don't publish it. That single check removed well over a thousand listings. We'd rather show fewer jobs than show the wrong employer.</p>

      <h2>We show the complete description, or nothing</h2>
      <p>For a long time many of our listings carried only a short excerpt. It was the first couple of hundred characters, which usually meant the employer's "about us" paragraph rather than anything about the role. That made pages thin and made different roles at the same company look identical.</p>
      <p>We fixed it at the source. Where we can, the listing page now fetches the employer's complete, current description directly from their board, so what you read is what they published. We also remove the boilerplate that an employer repeats across every posting, so each listing leads with the part that's actually about the role.</p>
      <p>Where we can't get the full description (usually because the employer's careers site only loads it inside the browser), we don't publish the listing. That decision removed thousands of listings from the board. It was the right one: a job page that stops mid-sentence is worse than no page.</p>

      <h2>How we decide what "work from anywhere" means</h2>
      <p>"Remote" is one of the most abused words in hiring. We keep two boards for that reason.</p>
      <ul>
        <li>The <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> only includes roles with no country, region, timezone or work-authorisation restriction that we can find in the listing.</li>
        <li>The <a href="/remote-regional-jobs">regional remote board</a> holds fully remote roles that <em>are</em> limited to somewhere, such as "remote, US only" or "remote within the EU".</li>
      </ul>
      <p>Our filter is deliberately strict, and it errs towards excluding a role rather than including it wrongly. The result is a small worldwide board: at the time of writing, <strong>337 of our 5,854 listings</strong> qualify, which is under 6%. We could make that number look much bigger by loosening the rules. We don't, because a "work from anywhere" label is only useful if it's true.</p>

      <h2>What we don't do</h2>
      <ul>
        <li>We don't write or invent job details. Descriptions are the employer's own words.</li>
        <li>We don't charge candidates for anything.</li>
        <li>We don't collect your application. It goes straight to the employer.</li>
        <li>We don't keep a listing up because it makes the numbers look bigger.</li>
      </ul>

      <h2>What we add</h2>
      <p>Where the employer's text ends, ours begins. Each listing carries context computed from our own data: where the pay sits against comparable roles on the board, how many similar roles are open, which of its skills are most in demand elsewhere, and exactly where an applicant needs to live. None of that is on the employer's posting. It's the part of the page we're responsible for.</p>

      <h2>Where we fall short</h2>
      <p>No automated check is perfect. A role can close between our checks, a description can change after we last read it, and our worldwide filter can occasionally misread an unusual posting. If you spot something wrong, <a href="/contact">tell us</a>. Reports feed directly into how we tune these checks. You can read more about the overall approach on <a href="/how-it-works">how it works</a>.</p>
    `,
    faq: [
      {
        q: "Where do your job listings come from?",
        a: "Most originate on employers' own applicant-tracking systems, which publish each company's open roles in structured form. The rest come from company career pages that publish structured job data. We only publish listings we can trace back to the employer.",
      },
      {
        q: "Do you check whether jobs are still open?",
        a: "Yes. We re-check listings against the employer's own job board on a schedule and remove roles that are no longer there. In one full pass, about 27 percent of the listings we could check had already been removed by the employer.",
      },
      {
        q: "Do I apply through your site?",
        a: "No. Every Apply button takes you to the employer's own posting. We do not host application forms and never ask candidates to apply or pay through us.",
      },
      {
        q: "Why are there fewer jobs on your worldwide board?",
        a: "Because the filter is strict. A role only qualifies if it has no country, region, timezone or work-authorisation restriction we can find. Under 6 percent of our listings meet that bar, and we would rather show fewer genuine work-from-anywhere roles than label restricted ones as worldwide.",
      },
    ],
  },

  {
    slug: "apply-directly-on-company-career-pages",
    title: "Why Applying on Company Career Pages Is the Safest Route",
    description:
      "Why applying on an employer's own careers page beats applying through a board, and how to find the official careers page for any company in a few minutes.",
    date: "2026-09-16T09:30:00.000Z",
    author: AUTHOR,
    tags: ["Job Applications", "Career Pages", "Job Search Safety", "Applicant Tracking Systems"],
    readMinutes: 5,
    html: `
      <p>Ask experienced job seekers where to apply and you'll hear the same advice again and again: find the role on a board, then apply on the company's own site. It sounds like superstition. It isn't. There are concrete reasons it works better, and they come down to where your application actually ends up.</p>

      <h2>Your application goes into one system either way</h2>
      <p>Most companies of any size run hiring through an applicant-tracking system. Every application, wherever it started, ends up as a record in that system, where a recruiter filters, sorts and reads it.</p>
      <p>The question is how it gets there. When you apply on the employer's page, it arrives directly, complete, and exactly as you submitted it. When you apply through an intermediary, it may be reformatted, stripped of attachments, delayed, or routed into a separate queue that gets less attention. Sometimes it arrives fine. You just can't be sure.</p>

      <h2>Board links go stale; career pages don't lie</h2>
      <p>A board holds a snapshot of a job. The employer's careers page holds the job itself. When a role closes, the careers page updates immediately. Copies elsewhere often don't.</p>
      <p>We measured this on our own listings. Going back to each employer's own board, we found that about <strong>27%</strong> of the listings we could check were already gone at the source. Applying through a stale copy of any of those would have sent your application nowhere useful. Checking the careers page first would have told you in seconds.</p>

      <h2>It's the best defence against fake postings</h2>
      <p>If a role exists, it's on the employer's site. If it isn't there, that's the single strongest warning sign you can get. Scammers can copy a brand's logo and write a convincing description, but they can't add a job to the real company's careers page.</p>
      <p>Applying on the official page closes the gap entirely. You're dealing with the employer's own system, on the employer's own domain, and nothing you submit passes through anyone else. We cover the wider pattern in our <a href="/posts/how-to-spot-fake-remote-job-postings">guide to spotting fake remote job postings</a>.</p>

      <h2>How to find the official careers page for any company</h2>
      <p>This is quicker than it sounds.</p>
      <ol>
        <li><strong>Go to the company's main website yourself.</strong> Type the address or search for the company name. Don't use a link from the posting.</li>
        <li><strong>Look in the footer or top navigation</strong> for Careers, Jobs, Join us, or Work with us.</li>
        <li><strong>Check where the careers page sends you.</strong> Many companies host their jobs on a hiring platform, so the address may change to a platform domain. That's normal. What matters is that you got there from the company's own site.</li>
        <li><strong>Search the listings for the exact role.</strong> Match the title and, if you can, the location or team.</li>
      </ol>
      <p>Our <a href="/companies">company directory</a> is a quick lookup layer too. Each company page lists the roles we currently carry for that employer, and every listing's apply link points to the employer's own posting.</p>

      <h2>When applying through a board is fine</h2>
      <p>None of this means avoiding boards. What matters is where the final click goes. A good board is excellent for finding roles, filtering them and comparing them. On our board, the apply button always takes you straight to the employer's posting, so you're already applying at the source.</p>
      <p>Where it matters is with boards or recruiters that collect applications themselves and pass them on. Those can work well, but you give up visibility into what happens next.</p>

      <h2>A few habits that help</h2>
      <ul>
        <li><strong>Apply once.</strong> Submitting the same application through several routes can look disorganised and may create duplicate records.</li>
        <li><strong>Keep the posting.</strong> Save a copy or screenshot of the description before you apply. Postings change and disappear, and you'll want it before an interview.</li>
        <li><strong>Note the platform.</strong> Knowing which hiring system a company uses helps you understand the follow-up emails you'll get.</li>
        <li><strong>Apply early.</strong> On our board the median listing is 22 days old. Earlier applicants are read before a shortlist forms.</li>
      </ul>

      <h2>The short version</h2>
      <p>Use boards to find and filter. Use the employer's own careers page to confirm and apply. It's one extra minute per application, and it protects you from stale roles, lost applications and most scams at once. When you're ready to search, start with the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> or browse by region on the <a href="/remote-regional-jobs">regional remote board</a>.</p>
    `,
    faq: [
      {
        q: "Is it better to apply on the company website or on a job board?",
        a: "Applying on the company's own careers page is generally safer and more reliable. Your application goes straight into the employer's hiring system, the role is confirmed to still exist, and nothing passes through an intermediary. Boards remain useful for finding and filtering roles.",
      },
      {
        q: "Why does the careers page address change to another website?",
        a: "Many companies host their job listings on a hiring platform, so clicking Careers can take you to a platform domain. That is normal. What matters is that you reached it from the company's own website rather than from a link in a message or posting.",
      },
      {
        q: "Does applying twice through different sites help?",
        a: "Usually not. Most applications end up in the same hiring system, so duplicates can look disorganised or create confusing records. Apply once, through the employer's own page.",
      },
      {
        q: "How do I know a job on a board is still open?",
        a: "Look for the exact role on the employer's own careers page. If it is no longer listed there, the board is likely showing an out-of-date copy.",
      },
    ],
  },
];
