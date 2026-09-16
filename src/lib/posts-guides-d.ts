/**
 * Cluster D — Search mechanics.
 *
 * Board figures are measured from the live dataset at the time of writing. The
 * phrase counts in the hybrid-bait article are taken from the filter
 * dictionaries in src/lib/pipeline/dictionaries.ts. Where an article reasons
 * about something we have not measured — how recruiters prioritise, for
 * instance — it says so rather than presenting the reasoning as data.
 */
import type { Post } from "./posts";

const AUTHOR = "getremotejobsnow.com Editorial";

export const POSTS_CLUSTER_D: Post[] = [
  {
    slug: "how-to-spot-hybrid-bait-in-remote-job-descriptions",
    title: "Hybrid Bait: How to Spot 'Remote' Jobs That Aren't Really Remote",
    description:
      "How to spot 'remote' job descriptions that are really hybrid, office-based or country-restricted, phrase by phrase, using the same signals our filter checks.",
    date: "2026-09-16T05:30:00.000Z",
    author: AUTHOR,
    tags: ["Hybrid Jobs", "Remote Job Search", "Job Descriptions", "Work From Anywhere"],
    readMinutes: 5,
    html: `
      <p>Few things in a job search are as deflating as reading a "remote" posting all the way to the bottom and finding the sentence that undoes it. <em>This role is hybrid, with two days a week in our London office.</em> The title said remote. The filter said remote. The job wasn't.</p>
      <p>Hybrid bait isn't always deliberate. Sometimes a posting is copied from an older template, or "remote" means something different to the person who wrote it. But the effect on you is the same. Here's how to read a description quickly and catch it, using the same kinds of signals our own filter checks.</p>

      <h2>Why the title can't be trusted</h2>
      <p>Job titles and location fields are often filled in once and never revisited. The description is where the real terms live. So the first rule is simple: <strong>never judge a remote role by its title or location tag alone</strong>. Read the body, all the way through, because the restrictions are often in the last paragraph next to the benefits.</p>

      <h2>The three kinds of hidden restriction</h2>
      <p>When we built our filter, we found that almost every misleading "remote" posting falls into one of three groups. Our work-from-anywhere check currently looks for <strong>10</strong> phrases that signal office attendance, <strong>75</strong> that signal a location or work-authorisation restriction, and <strong>18</strong> that signal a role open worldwide.</p>

      <h3>1. Office attendance</h3>
      <p>These say you'll need to be physically present, at least sometimes:</p>
      <ul>
        <li>"Hybrid", the most common one, and not always in the title.</li>
        <li>"On-site" or "in-office" days.</li>
        <li>"Office-based" with "flexible working".</li>
        <li>"Within commuting distance of" a named office.</li>
      </ul>
      <p>"Within commuting distance" deserves a special mention. It's often phrased gently, as a convenience, but it means the employer expects you near an office, which rules out working from anywhere else.</p>

      <h3>2. Location restrictions</h3>
      <p>These say the role is remote, but only for people in certain places:</p>
      <ul>
        <li>"US only", "EU-based", "UK only", "North America only".</li>
        <li>"Must be located in", "must reside in", "must be based in".</li>
        <li>"Remote within" a named country or region.</li>
      </ul>
      <p>A location-restricted remote job is still a real remote job; it just isn't open to everyone. That's why we keep these roles on a separate <a href="/remote-regional-jobs">regional remote board</a> instead of throwing them away.</p>

      <h3>3. Work authorisation</h3>
      <p>These are the quietest restriction, because they don't mention a place at all:</p>
      <ul>
        <li>"Authorised to work in" or "eligible to work in" a named country.</li>
        <li>"Must have the right to work in" a country.</li>
        <li>References to specific citizenship or residency status.</li>
        <li>"We are unable to sponsor visas."</li>
      </ul>
      <p>If a role needs you to be legally able to work in a specific country, it's effectively restricted to people who already live there or hold that status, however "remote" the rest of the posting sounds.</p>
      <blockquote>A location-independent posting doesn't mention a country, a region, a timezone, an office or a work permit. The moment it names one, it's telling you who it's really for.</blockquote>

      <h2>The timezone clause</h2>
      <p>There's a fourth signal that isn't strictly a location but works like one: a required overlap with a single timezone. "Must work US Eastern hours" doesn't exclude anyone by nationality, but in practice it rules out most of the world. We explore this in <a href="/posts/remote-jobs-in-asia-pacific-timezone-filters">why timezone filters exclude Asia-Pacific candidates</a>. When a posting names an overlap, the <a href="/tools/timezone-overlap">timezone overlap finder</a> shows what it would mean for your own day.</p>

      <h2>What genuine signals look like</h2>
      <p>On the positive side, the strongest signs a role is truly open are explicit ones:</p>
      <ul>
        <li>"Work from anywhere in the world."</li>
        <li>"Fully remote, worldwide."</li>
        <li>"No location requirement."</li>
        <li>"Location-independent."</li>
      </ul>
      <p>Even these deserve a second look, because a posting can say "work from anywhere" in the opening line and "must be authorised to work in the US" in the closing one. When positive and negative signals conflict, the restriction usually wins.</p>

      <h2>A quick reading routine</h2>
      <ol>
        <li><strong>Search the page</strong> for "hybrid", "office", "on-site", "only", "based in", "located", "authorised", "authorized", "eligible" and "visa".</li>
        <li><strong>Read the last three paragraphs carefully.</strong> Restrictions cluster near benefits and legal notices.</li>
        <li><strong>Check for a timezone</strong> by searching for "hours", "overlap", "EST", "PST" and "CET".</li>
        <li><strong>If it's still unclear, ask</strong> before you apply. "Is this role open to candidates based in my country?" is a perfectly reasonable question.</li>
      </ol>

      <p>To run these checks on a posting you found elsewhere, paste it into the <a href="/tools/jd-remote-analyzer">truly-remote job description analyzer</a>. It uses the same phrase lists as our filter and highlights every match.</p>

      <h2>Let a strict filter do the first pass</h2>
      <p>Checking every posting by hand is tiring, which is why hybrid bait works. Our <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> runs these checks before a role is shown, and is strict enough that fewer than 6% of our listings qualify. It isn't infallible, and an unusual posting can slip through, but it removes most of the noise before you start reading. If you want to understand exactly how the checks work, see <a href="/posts/how-we-source-and-verify-listings">how we source and verify listings</a>.</p>
    `,
    faq: [
      {
        q: "What does hybrid bait mean?",
        a: "Hybrid bait describes a job advertised as remote whose description later requires office attendance, a specific location or a particular work authorisation. The title or location tag says remote, but the terms in the description do not.",
      },
      {
        q: "How can I tell if a remote job is really remote?",
        a: "Read the full description, not just the title. Search it for words such as hybrid, office, on-site, only, based in, located, authorised, eligible and visa, check for a required timezone, and read the final paragraphs carefully, where restrictions often appear.",
      },
      {
        q: "Is a location-restricted remote job still remote?",
        a: "Yes. A role that is remote but limited to one country or region is a genuine remote job, just not one open to everyone. It is different from a work-from-anywhere role, which has no location, timezone or work-authorisation restriction.",
      },
      {
        q: "What does 'must be authorised to work in' mean for remote applicants?",
        a: "It means the employer needs you to already have the legal right to work in a named country. Even if the role is otherwise remote, it effectively limits applicants to people who live there or hold the right status, especially when the employer does not sponsor visas.",
      },
    ],
  },

  {
    slug: "the-date-posted-problem-why-freshness-matters",
    title: "The Date-Posted Problem: Why Fresh Remote Job Listings Win",
    description:
      "What our listing-age data shows about how quickly remote roles go stale, why we show the posting age on every card, and how to build freshness into your search.",
    date: "2026-09-16T05:00:00.000Z",
    author: AUTHOR,
    tags: ["Job Search Strategy", "Job Posting Age", "Remote Jobs", "Ghost Jobs"],
    readMinutes: 5,
    html: `
      <p>Ask anyone who has searched for a remote job for a few months and you'll hear some version of the same complaint: <em>I don't want to see jobs from last month.</em> Most people who say it aren't being impatient. They've noticed that older listings rarely lead anywhere, and after enough silence they've learned to skip them.</p>
      <p>The instinct is mostly right. Here's what our own data says about listing age, and how to use freshness without ignoring good roles.</p>

      <h2>How old are listings, really?</h2>
      <p>At the time of writing, across the <strong>5,854</strong> listings on our board:</p>
      <ul>
        <li>The median listing is <strong>22 days</strong> old.</li>
        <li>About <strong>16%</strong> are under a week old.</li>
        <li>Another <strong>18%</strong> are one to two weeks old.</li>
        <li>About <strong>36%</strong> are two to four weeks old.</li>
        <li>Roughly <strong>31%</strong> are more than a month old.</li>
      </ul>
      <p>We also retire listings once they pass sixty days, which is why almost nothing on the board is older than that. That's a deliberate choice rather than a technical limit: past a couple of months, the chance a role is still actively hiring drops enough that showing it does more harm than good.</p>

      <h2>Age predicts whether a job still exists</h2>
      <p>Posting age matters for another reason besides competition: it's a rough signal that a role may already be gone.</p>
      <p>When we went back to employers' own job boards to check our listings, about <strong>27%</strong> of the ones we could check had already been removed at the source. A posting doesn't have to be old to be closed, but the longer it's been visible, the more time the employer has had to fill it. We cover how to confirm a role is live in our guide to <a href="/posts/ghost-jobs-how-to-tell-a-role-is-still-open">ghost jobs and stale listings</a>.</p>

      <h2>Why early applications get more attention</h2>
      <p>This part is reasoning rather than something we can measure directly, but it follows from how hiring usually works.</p>
      <p>When a role opens, the first applications are read by someone with time and attention to spare. As the pile grows, recruiters start filtering faster and harder. Some teams begin interviewing as soon as they have a handful of promising candidates, and a shortlist can form within days. An excellent application submitted after that point is competing against people who are already in the process.</p>
      <p>That's why applying within the first few days of a posting tends to matter more than polishing an application for an extra week.</p>
      <blockquote>A strong application a week late often loses to a good one on day two. Timing is part of the application.</blockquote>

      <h2>What "posted" actually means</h2>
      <p>The date on a listing isn't always the day the job opened. Depending on where it came from, it can mean the day the employer first published it, the day it was last edited, or the day a board copied it. Some hiring systems also refresh a posting's date when it's reposted, so a role that has been open for months can look new.</p>
      <p>That's why a recent date is a good reason to look closer rather than proof of anything. A role that says "posted today" but carries an old reference number, or describes a product the company retired last year, is worth a second check on the employer's site.</p>
      <p>The reverse happens too. A carefully maintained posting may keep its original date for weeks while the employer is still actively interviewing. Treat the date as the start of your judgement, not the end of it.</p>

      <h2>Why we show the age on every card</h2>
      <p>Some boards hide posting dates, or refresh them automatically so everything looks new. We don't, because the age is useful information and you're better placed to judge it than we are. Every listing card shows how long ago the role was posted, so you can decide quickly where to spend your time.</p>
      <p>Recent listings are easy to spot, too. Roles posted in the last five days carry a <em>New</em> badge, unless they're already marked as featured.</p>

      <h2>When an older listing is still worth it</h2>
      <p>Freshness is a strong default, not an absolute rule. Older postings are often still worth pursuing when:</p>
      <ul>
        <li>The role is <strong>senior or specialist</strong>, where searches genuinely take longer.</li>
        <li>The <strong>fit is unusually strong</strong> and you match the requirements closely.</li>
        <li>You've <strong>confirmed it's still open</strong> on the employer's own careers page.</li>
        <li>The company <strong>hires continuously</strong> for that type of role.</li>
      </ul>

      <h2>Building freshness into your routine</h2>
      <ol>
        <li><strong>Check new roles daily or every other day</strong>, so you see them while they're fresh.</li>
        <li><strong>Apply to strong matches within a few days</strong>, even if the application isn't perfect.</li>
        <li><strong>Verify older roles first</strong> on the employer's site before investing time.</li>
        <li><strong>Use feeds</strong> so new roles come to you. Our <a href="/rss-feeds">RSS feeds</a> let you follow a category without visiting the site.</li>
      </ol>
      <p>The <a href="/trending-remote-jobs">trending roles page</a> and the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> are good daily starting points.</p>
    `,
    faq: [
      {
        q: "How old is a typical remote job listing?",
        a: "On our board the median listing is about 22 days old. Around 16 percent are under a week old and roughly 31 percent are more than a month old. We retire listings once they pass sixty days.",
      },
      {
        q: "Should I apply to jobs posted more than a month ago?",
        a: "Sometimes. Older postings can still be worth it for senior or specialist roles, strong matches, or companies that hire continuously. Confirm the role still appears on the employer's own careers page before investing time in an application.",
      },
      {
        q: "Why does applying early help?",
        a: "Early applications are usually read before a large pile builds up and before a shortlist forms. Many teams start interviewing as soon as they have a few promising candidates, so a good application submitted early can beat a better one submitted later.",
      },
      {
        q: "How can I see new remote jobs quickly?",
        a: "Check new listings daily or every other day, and use RSS feeds to follow the categories you care about so new roles reach you without having to search.",
      },
    ],
  },

  {
    slug: "remote-job-application-tracker-minimal-system",
    title: "A Simple Remote Job Application Tracker That Won't Burn You Out",
    description:
      "A simple spreadsheet for tracking remote job applications: the columns worth keeping, a clear status flow, and a follow-up routine that stays manageable.",
    date: "2026-09-16T04:30:00.000Z",
    author: AUTHOR,
    tags: ["Job Application Tracker", "Job Search Organisation", "Remote Job Search", "Productivity"],
    readMinutes: 5,
    html: `
      <p>Somewhere around the fortieth application, most people lose track. Which company was the one with the take-home task? Did you ever hear back from that fintech? Was the Tuesday call a first interview or a second? A job search at volume produces a lot of small facts, and trying to hold them in your head is exhausting.</p>
      <p>You don't need special software to fix it. A plain spreadsheet with the right columns does the job, and the trick is keeping it small enough that you actually maintain it.</p>

      <h2>Why most trackers get abandoned</h2>
      <p>People build elaborate trackers with twenty columns, colour coding and formulas, then stop updating them after a week. The tracker becomes another job. The system below is deliberately minimal: if a column doesn't change what you do next, it doesn't earn a place.</p>

      <h2>The columns worth keeping</h2>
      <ol>
        <li><strong>Company</strong></li>
        <li><strong>Role title</strong>, exactly as posted, so you can find it again.</li>
        <li><strong>Link</strong> to the employer's own posting, not a board.</li>
        <li><strong>Date applied</strong></li>
        <li><strong>Status</strong>, using one value from the list below.</li>
        <li><strong>Next action</strong>: a short phrase such as "follow up" or "prep interview".</li>
        <li><strong>Next action date</strong>. This is the column that keeps the whole thing moving.</li>
        <li><strong>Salary</strong>: the range if one was stated, or whatever you've learned since.</li>
        <li><strong>Location terms</strong>: worldwide, country-restricted, or a timezone requirement.</li>
        <li><strong>Notes</strong> on names, what was discussed, and anything odd.</li>
      </ol>
      <p>That's it. Sort by <em>Next action date</em> every morning and the tracker tells you what to do today.</p>

      <h2>What a single row looks like</h2>
      <p>Here's one filled-in entry, so you can see how the columns work together. The company is made up.</p>
      <ul>
        <li><strong>Company:</strong> Acme Analytics</li>
        <li><strong>Role:</strong> Senior Customer Success Manager</li>
        <li><strong>Applied:</strong> 3 March</li>
        <li><strong>Status:</strong> Screening</li>
        <li><strong>Next action:</strong> Prepare for the recruiter call and read their pricing page</li>
        <li><strong>Next action date:</strong> 10 March</li>
        <li><strong>Salary:</strong> €70k to €85k, stated in the posting</li>
        <li><strong>Location terms:</strong> Remote, Europe only, overlap until 15:00 UTC</li>
        <li><strong>Notes:</strong> Recruiter is Sam. The team is expanding into Germany.</li>
      </ul>
      <p>Everything you need before that call is in one line, and the date tells you when it matters.</p>

      <h2>A status flow you can stick to</h2>
      <p>Keep statuses few and unambiguous:</p>
      <ul>
        <li><strong>Saved</strong>: worth applying to, not done yet.</li>
        <li><strong>Applied</strong></li>
        <li><strong>Screening</strong>: a first call or recruiter contact.</li>
        <li><strong>Interviewing</strong></li>
        <li><strong>Offer</strong></li>
        <li><strong>Closed</strong>: rejected, withdrawn, or no response after your final follow-up.</li>
      </ul>
      <p>"Closed" does a lot of quiet work. Moving silent applications into it after a set time stops them cluttering your view and stops you wondering about them.</p>

      <h2>Save the posting before you apply</h2>
      <p>Postings change and disappear. When we checked our own listings against employers' job boards, about <strong>27%</strong> of the ones we could check had already been removed. If you're invited to interview three weeks after applying, the original description may be gone.</p>
      <p>Copy the description into your notes, or save it as a document, when you apply. It's the single most useful habit in this whole system.</p>

      <h2>A follow-up routine that doesn't become a chore</h2>
      <p>Following up helps, but it's easy to overdo. A simple rhythm many people find workable:</p>
      <ul>
        <li><strong>About a week after applying</strong>, send one short, polite follow-up if you have a contact.</li>
        <li><strong>About a week after that</strong>, one final note.</li>
        <li><strong>After that</strong>, move it to Closed and let it go.</li>
      </ul>
      <p>Set the <em>Next action date</em> whenever you apply, so the follow-up happens without you having to remember it.</p>
      <blockquote>A tracker earns its place by telling you what to do today. Anything that doesn't help with that can go.</blockquote>

      <h2>Keep volume sustainable</h2>
      <p>Applying in volume works for many people, but only if the applications are still decent. A few habits help:</p>
      <ul>
        <li><strong>Batch your work.</strong> Do all your applying in one or two focused sessions a week rather than scattering it.</li>
        <li><strong>Prioritise fresh roles.</strong> On our board the median listing is 22 days old; the newest ones are where early applications count most. See <a href="/posts/the-date-posted-problem-why-freshness-matters">why freshness matters</a>.</li>
        <li><strong>Reuse, then tailor.</strong> Keep a strong base CV and adjust the top third for each role.</li>
        <li><strong>Review weekly.</strong> Ten minutes looking at your statuses tells you whether your applications are getting responses, and whether something needs to change.</li>
      </ul>

      <h2>What to track about the market, not just yourself</h2>
      <p>After a few weeks your tracker becomes useful data. Which roles lead to replies? Which salary ranges show up most? Are country-restricted roles responding better than worldwide ones? Those patterns are worth more than any single application.</p>

      <p>If you'd rather not build the spreadsheet yourself, our free <a href="/tools/application-tracker">job application tracker</a> uses the same statuses and follow-up dates. It runs in your browser and exports to CSV.</p>

      <h2>Start small</h2>
      <p>Open a spreadsheet, add the ten columns, and add your next five applications. That's enough to begin. For finding roles to fill it with, try the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> or the <a href="/jobs">full remote job search</a>, and check each posting's real availability first with our guide to <a href="/posts/apply-directly-on-company-career-pages">applying on company career pages</a>.</p>
    `,
    faq: [
      {
        q: "What should a job application tracker include?",
        a: "Keep it minimal: company, role title, link to the employer's posting, date applied, status, next action, next action date, salary, location terms and notes. Sorting by next action date each day tells you what to do next.",
      },
      {
        q: "When should I follow up on a job application?",
        a: "A common, workable rhythm is one short follow-up about a week after applying and one final note about a week later. After that, mark the application as closed and move on.",
      },
      {
        q: "Why should I save a copy of the job description?",
        a: "Postings often change or disappear before an interview. In our own checks, about 27 percent of listings had already been removed from the employer's board, so saving the description when you apply means you still have it if you are invited to interview later.",
      },
      {
        q: "How many job applications should I send each week?",
        a: "There is no single right number. Volume helps only if applications stay reasonably tailored, so batch your applying into focused sessions, prioritise recently posted roles, and review your response rate weekly to adjust.",
      },
    ],
  },

  {
    slug: "what-recruiters-see-when-you-apply-remotely",
    title: "What Recruiters See When You Apply for a Remote Job",
    description:
      "How remote applications move through hiring systems, why so many seem to vanish, and what our data shows about how different companies hire for remote roles.",
    date: "2026-09-16T04:00:00.000Z",
    author: AUTHOR,
    tags: ["Applicant Tracking Systems", "Recruiting", "Remote Job Applications", "Hiring Process"],
    readMinutes: 5,
    html: `
      <p>You submit an application and it disappears. No confirmation beyond an automated email, no rejection, nothing. It's easy to imagine it vanishing into a void. In reality it usually went somewhere quite specific, and knowing where helps explain the silence.</p>

      <h2>Your application becomes a record</h2>
      <p>Most companies of any size use an applicant-tracking system. When you apply, your details, CV and answers become a record in that system, attached to a specific job. A recruiter or hiring manager then views a list of those records for the role.</p>
      <p>What they see first is rarely your full CV. It's usually a compact summary: your name, current title, location, answers to any screening questions, and sometimes tags or scores the system has added. Your CV is one click deeper. Whether they make that click depends a lot on what the summary shows.</p>

      <h2>Screening questions do more work than you'd think</h2>
      <p>Many applications include short questions. Are you legally able to work in this country? What are your salary expectations? How many years of experience do you have? Some of these are simply informative. Others work as <strong>knockout questions</strong>: a particular answer can move an application aside before anyone reads further.</p>
      <p>For remote roles, the most important ones are about location and work authorisation. If a role is limited to one country and your answers show you're elsewhere, that can decide the outcome before anyone reads a line of your CV. It's one reason restrictions buried in a description matter so much, and we cover how to spot them in <a href="/posts/how-to-spot-hybrid-bait-in-remote-job-descriptions">our guide to hybrid bait</a>.</p>
      <p>Answer these questions honestly and precisely. A vague answer to "where are you based?" helps nobody.</p>

      <h2>Why applications seem to vanish</h2>
      <p>There are several ordinary reasons you might never hear back, and most aren't about you:</p>
      <ul>
        <li><strong>Volume.</strong> Remote roles can attract far more applicants than local ones, and not every application gets a personal reply.</li>
        <li><strong>The role closed.</strong> When we checked our own listings against employers' job boards, about <strong>27%</strong> of the ones we could check had already been removed at the source. Applications to a filled role often just go quiet.</li>
        <li><strong>A shortlist formed early.</strong> Once a team has enough promising candidates, later applications may not be reviewed in depth.</li>
        <li><strong>An eligibility filter.</strong> Location or authorisation answers can move an application aside automatically.</li>
        <li><strong>Silence by policy.</strong> Some companies don't send rejections at all.</li>
      </ul>
      <blockquote>Silence usually says more about the pipeline than about your application. The fix is sending better-targeted applications earlier, not taking the silence personally.</blockquote>

      <h2>Different companies hire very differently</h2>
      <p>Our own data shows how uneven remote hiring is. At the time of writing, our board carries roles from <strong>1,080</strong> companies. About <strong>39%</strong> of them have exactly <strong>one</strong> open role with us, while a small number hire at scale. Seven employers list more than fifty roles each, and the three busiest list over a hundred.</p>
      <p>Location-independent hiring is even more concentrated. Only <strong>30</strong> of those companies, under <strong>3%</strong>, currently have at least one role that passes our work-from-anywhere filter.</p>
      <p>That affects what applying feels like, although we haven't measured response rates directly. A company with a single opening is filling one specific need, often quickly. A company hiring continuously has established processes and a steady flow of candidates, which can mean a more predictable experience but also more competition for each role. Knowing which kind of company you're applying to helps you set expectations.</p>

      <h2>What helps your record stand out</h2>
      <ol>
        <li><strong>Put your location and time availability up front.</strong> For remote roles, "based in Lisbon, can overlap 14:00–18:00 UTC" answers the recruiter's first question immediately. The <a href="/tools/timezone-overlap">timezone overlap finder</a> helps you work out that window.</li>
        <li><strong>Mirror the role's language.</strong> Where you have the skills and tools a posting asks for, describe them in the same words it uses.</li>
        <li><strong>Make the top of your CV do the work.</strong> The first few lines are often all that's read at first pass.</li>
        <li><strong>Show you can work remotely.</strong> Written communication, prior distributed work and the tools you've used matter more for remote roles.</li>
        <li><strong>Apply early and on the employer's own page.</strong> See <a href="/posts/apply-directly-on-company-career-pages">why applying directly is safest</a>.</li>
      </ol>

      <p>To check how closely your CV matches a posting's wording, paste both into the <a href="/tools/ats-keyword-checker">ATS keyword checker</a>.</p>

      <h2>Researching a company before you apply</h2>
      <p>Our <a href="/companies">company directory</a> shows the roles we currently list for each employer, which gives you a quick sense of whether a company is hiring broadly or filling one position. For roles open regardless of location, start with the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a>, and for everything else, the <a href="/remote-regional-jobs">regional remote board</a>.</p>
    `,
    faq: [
      {
        q: "What does a recruiter see when I apply?",
        a: "Usually a compact summary first: your name, current title, location, answers to screening questions and sometimes system-added tags. The full CV is typically one click deeper, so the summary often decides whether it gets opened.",
      },
      {
        q: "What are knockout questions?",
        a: "Knockout questions are screening questions where a particular answer can move an application aside before a person reads it. For remote roles they commonly concern location and legal authorisation to work in a specific country.",
      },
      {
        q: "Why did I never hear back from a remote job application?",
        a: "Common reasons include very high application volumes, the role being filled or removed, a shortlist forming before your application was reviewed, an eligibility filter on location or work authorisation, or a company policy of not sending rejections.",
      },
      {
        q: "How do I make my remote application stand out?",
        a: "State your location and the hours you can overlap near the top, use the same terms as the posting for skills you genuinely have, make the first lines of your CV count, show evidence of remote work, and apply early on the employer's own careers page.",
      },
    ],
  },
];
