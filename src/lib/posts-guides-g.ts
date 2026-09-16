/**
 * Cluster G — Companies and the ecosystem.
 *
 * Company figures are a snapshot of the live dataset in September 2026: 1,076
 * employers, 30 with at least one work-from-anywhere role. The ranking counts
 * current worldwide listings per company and breaks ties on total listings.
 * Lifecycle details describe our own pipeline as implemented (the six-hourly
 * liveness sweep in scripts/check-liveness.ts, the nightly rebuild and the
 * 60-day expiry) rather than industry averages.
 */
import type { Post } from "./posts";

const AUTHOR = "getremotejobsnow.com Editorial";

export const POSTS_CLUSTER_G: Post[] = [
  {
    slug: "how-to-tell-if-a-company-is-truly-distributed",
    title: "How to Tell If a Company Is Truly Distributed or Remote in Name Only",
    description:
      "The signals that separate distributed companies from employers that are remote in name only, with evidence from how 1,076 companies hire on our board.",
    date: "2026-09-16T13:15:00.000Z",
    author: AUTHOR,
    tags: ["Distributed Companies", "Remote-First", "Company Research", "Remote Culture"],
    readMinutes: 5,
    html: `
      <p>"Remote" on a job listing can mean almost anything. It can describe a company with no offices and colleagues on six continents, or a company with a headquarters, a hybrid policy and a few people allowed to work from home. Both use the same word. If you're choosing where to spend the next few years, it helps to know which kind you're dealing with.</p>
      <p>These are the signals we find most useful, starting with the one our own data can measure.</p>

      <h2>1. How many of its roles are open without location limits</h2>
      <p>A truly distributed company hires where the talent is, so a meaningful share of its openings should be open across countries, or at least across wide regions. That's easy to check and hard to fake.</p>
      <p>Our board shows how rare it is. At the time of writing, we list roles from <strong>1,076</strong> companies, and only <strong>30</strong> of them have even one role that passes our work-from-anywhere filter. Among the <strong>425</strong> companies with five or more open roles, <strong>22</strong> have at least one location-free opening, and just one has nothing but location-free roles.</p>
      <p>A few employers stand out. Of the 73 roles we list for Remote, the global HR and payroll platform, 69 are open worldwide. So are 43 of Supabase's 57 and 101 of Canonical's 151. We keep a <a href="/posts/most-remote-friendly-companies-hiring-worldwide">ranking of the most remote-friendly employers on our board</a>, built from the same data.</p>
      <p>You can run this check yourself. Open a company's page in our <a href="/companies">company directory</a> and look at its mix of worldwide and regional roles, or scan its careers page for location labels.</p>

      <h2>2. Whether remote applies to every team</h2>
      <p>Some companies let engineers work from anywhere while keeping sales, finance and leadership in an office. That's a remote engineering team inside a co-located company. It can still be a good job, but your career may stall if the decisions get made in a building you never visit.</p>
      <p>So look at the non-engineering listings. If support, operations, marketing and management roles are remote too, the company is more likely to run on distributed habits throughout.</p>

      <h2>3. How it talks about time</h2>
      <p>Distributed companies are specific about working hours because they have to be. Look for phrases such as "a few hours of overlap with Europe" or "core hours of 14:00 to 17:00 UTC". A vague "must be available during business hours" usually means one head office's business hours.</p>
      <p>Some companies describe themselves as async-first: decisions in writing, few recurring meetings, recorded updates. We looked at what that means in practice in <a href="/posts/async-first-companies-hiring-2026">our piece on async-first companies</a>. A good test of the claim is to ask how a recent decision was made and where it was written down.</p>

      <h2>4. What its offices are for</h2>
      <p>An all-remote company has no offices. A remote-first company may keep hubs, but they're optional and nobody's career depends on turning up. A hybrid company expects people in on some days. Listings don't always say which, so ask:</p>
      <ul>
        <li>How many people work from an office regularly?</li>
        <li>Where does the leadership team live?</li>
        <li>Has anyone been promoted into a senior role while working remotely?</li>
      </ul>
      <p>A common complaint from remote staff in office-centred companies is that the important conversations happen in the corridor. The answers to these questions tell you how likely that is.</p>

      <h2>5. How much it writes down</h2>
      <p>Written culture is the backbone of distributed work. Signs of it include a public handbook, detailed job descriptions, an interview plan sent in advance, and people at the company who write publicly about how it works. If the hiring process runs on scattered calls with nothing in writing, the job probably will too.</p>
      <blockquote>The best sign of a distributed company is that you can learn how it works without ever being in the room.</blockquote>

      <h2>6. How it sets pay</h2>
      <p>Companies that hire in many countries have to decide whether pay depends on location. Either approach can be fair, but a distributed employer should have a clear answer. Few publish pay at all: across our board, <strong>77.5%</strong> of companies show a salary on none of their listings. A company that explains its pay approach in writing is showing the kind of openness distributed teams depend on.</p>

      <h2>7. Where it can employ you</h2>
      <p>To employ you directly, a company needs a legal presence in your country or an employer-of-record arrangement. Distributed companies often say how many countries they hire in, or name the ones they can't. If a listing doesn't say, ask early. It's a practical question, and the answer shows how established the company's remote hiring really is.</p>

      <h2>A quick scorecard</h2>
      <ol>
        <li>Is a good share of its roles open across countries or wide regions?</li>
        <li>Are non-engineering roles remote too?</li>
        <li>Are working hours described clearly, in a named time zone?</li>
        <li>Are offices optional?</li>
        <li>Is there a public handbook or other written material on how the company works?</li>
        <li>Does it explain how it sets pay?</li>
        <li>Does it say where it can employ people?</li>
      </ol>
      <p>Five or more yes answers is a strong sign. Two or fewer suggests remote in name only. For roles already filtered for location freedom, start with the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a>, and compare them with our <a href="/remote-regional-jobs">regional remote roles</a> to see the difference in practice. When a listing names working hours, the <a href="/tools/timezone-overlap">timezone overlap finder</a> shows what they'd mean for your day.</p>
    `,
    faq: [
      {
        q: "What is the difference between remote-first and all-remote?",
        a: "An all-remote company has no offices. A remote-first company may keep offices or hubs, but work is designed around remote staff and nobody needs to attend. A hybrid company expects people in an office on some days.",
      },
      {
        q: "How can I check if a company is truly remote?",
        a: "Look at how many of its roles are open without location limits, whether non-engineering teams are remote too, how clearly it describes working hours, whether offices are optional, and how much it documents in writing.",
      },
      {
        q: "How many companies hire from anywhere?",
        a: "Very few, on our data. Of the 1,076 companies with roles on our board at the time of writing, only 30 had at least one role that passes our work-from-anywhere filter.",
      },
      {
        q: "Can a company with offices still be fully distributed?",
        a: "It can, if offices are optional, leadership and promotions are not tied to a location, and work is organised in writing. Ask where the leadership team lives and whether remote staff have been promoted into senior roles.",
      },
    ],
  },

  {
    slug: "most-remote-friendly-companies-hiring-worldwide",
    title: "The Most Remote-Friendly Companies Hiring Worldwide, From Our Data",
    description:
      "Which employers list the most work-from-anywhere roles on our board, how often they post, and how many publish salaries. Data as of September 2026.",
    date: "2026-09-16T13:05:00.000Z",
    author: AUTHOR,
    tags: ["Remote Companies", "Work From Anywhere", "Hiring Data", "Remote-Friendly Employers"],
    readMinutes: 5,
    html: `
      <p>Most "best remote companies" lists are built on reputation. This one is built on openings. It ranks employers by how many roles they currently list on our board that pass our work-from-anywhere filter, meaning we found no country, region, timezone or work-authorisation restriction in the listing.</p>
      <p>The figures are a snapshot from September 2026. Our board changes every day, so read this as a picture of who is hiring worldwide right now, not a permanent league table.</p>

      <h2>The ranking</h2>
      <table>
        <thead><tr><th>#</th><th>Company</th><th>Worldwide roles</th><th>All roles we list</th><th>Share worldwide</th><th>Posted in last 30 days</th><th>Listings showing pay</th></tr></thead>
        <tbody>
          <tr><td>1</td><td><a href="/companies/canonical">Canonical</a></td><td>101</td><td>151</td><td>67%</td><td>14</td><td>0%</td></tr>
          <tr><td>2</td><td><a href="/companies/remote">Remote</a></td><td>69</td><td>73</td><td>95%</td><td>73</td><td>64%</td></tr>
          <tr><td>3</td><td><a href="/companies/supabase">Supabase</a></td><td>43</td><td>57</td><td>75%</td><td>37</td><td>2%</td></tr>
          <tr><td>4</td><td><a href="/companies/elevenlabs">ElevenLabs</a></td><td>42</td><td>93</td><td>45%</td><td>40</td><td>0%</td></tr>
          <tr><td>5</td><td><a href="/companies/camunda">Camunda</a></td><td>17</td><td>24</td><td>71%</td><td>24</td><td>0%</td></tr>
          <tr><td>6</td><td><a href="/companies/goodstack">Goodstack</a></td><td>8</td><td>8</td><td>100%</td><td>6</td><td>0%</td></tr>
          <tr><td>7</td><td><a href="/companies/metabase">Metabase</a></td><td>6</td><td>12</td><td>50%</td><td>12</td><td>0%</td></tr>
          <tr><td>8</td><td><a href="/companies/inbeat-agency">InBeat Agency</a></td><td>6</td><td>9</td><td>67%</td><td>9</td><td>0%</td></tr>
          <tr><td>9</td><td><a href="/companies/linear">Linear</a></td><td>4</td><td>16</td><td>25%</td><td>3</td><td>0%</td></tr>
          <tr><td>10</td><td><a href="/companies/brave">Brave</a></td><td>4</td><td>13</td><td>31%</td><td>8</td><td>15%</td></tr>
        </tbody>
      </table>
      <p>Ties are broken by the total number of roles we list for each company. "Posted in last 30 days" counts listings whose posting date falls within the past month. "Listings showing pay" is the share of all the company's listings on our board that publish a salary.</p>

      <h2>What stands out</h2>
      <h3>Worldwide hiring is concentrated</h3>
      <p>The top five employers account for <strong>272</strong> of the <strong>337</strong> work-from-anywhere roles on our board, about 81%. Only <strong>30</strong> of the <strong>1,076</strong> companies we list have any worldwide role at all. If you want a location-free job, getting to know these few employers is one of the most useful things you can do.</p>
      <h3>Some employers hire in waves, others keep roles open</h3>
      <p>Canonical has the most worldwide roles, but only 14 of its 151 listings were posted in the last 30 days, so most have been up for more than a month. That fits a company that hires steadily and keeps roles open while it searches. Remote, by contrast, posted every one of its listed roles within the past month. Neither pattern is better, but they call for different tactics. With long-running postings, confirm the role is still active on the company's own site before you invest time. With fast-moving ones, apply early. Our guide to <a href="/posts/the-date-posted-problem-why-freshness-matters">why posting dates matter</a> explains the trade-off.</p>
      <h3>Pay transparency is rare, even here</h3>
      <p>Only two of the ten publish pay on any of their listings. Remote is the clear exception, showing a range on 64% of its roles, and its ranges are wide, which suggests pay set by location. That matches the wider board, where most companies publish no salaries at all. We look at what worldwide roles pay in <a href="/posts/what-work-from-anywhere-jobs-pay">our analysis of work-from-anywhere salaries</a>.</p>
      <blockquote>For location-free work, a short list of employers matters more than a long list of job boards.</blockquote>

      <h2>Beyond the top ten</h2>
      <p>Twenty more companies had at least one worldwide role when we took this snapshot, and most had only one or two. Those one-off openings are easy to miss because they come from employers that don't usually hire this way. They're also a reminder that a company that usually hires within set regions will sometimes open a single role to anyone, anywhere.</p>
      <p>Among the 425 companies with five or more roles on our board, only one, Goodstack, lists nothing but worldwide roles. Everywhere else, location-free openings sit alongside region-locked ones, so read each listing rather than assuming a company's reputation applies to every role.</p>

      <h2>How to read this list</h2>
      <ul>
        <li><strong>It measures openings, not culture.</strong> A company can be an excellent distributed employer and have few roles open this month. Our guide to <a href="/posts/how-to-tell-if-a-company-is-truly-distributed">telling whether a company is truly distributed</a> covers the signals beyond job counts.</li>
        <li><strong>It reflects our filter.</strong> We only mark a role as worldwide when we find no restriction, and the filter is deliberately strict. It can still misread an unusual posting, so read each listing.</li>
        <li><strong>Location-free doesn't mean hours-free.</strong> Some roles are hired to cover a region, such as Europe or Asia-Pacific, and come with matching working hours even though you can live anywhere.</li>
        <li><strong>One name needs explaining.</strong> Remote, second on the list, is a company that provides global HR and payroll services. Its name describes its business as well as its hiring.</li>
      </ul>

      <h2>How to use it</h2>
      <ol>
        <li>Pick the three or four companies whose work interests you most.</li>
        <li>Follow their careers pages, as well as their pages in our <a href="/companies">company directory</a>.</li>
        <li>Read a few of their listings in full to see how they describe hours and locations.</li>
        <li>Apply on the company's own site. Our guide to <a href="/posts/apply-directly-on-company-career-pages">applying directly</a> explains why.</li>
      </ol>
      <p>The full set of location-free openings is always on the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a>, and <a href="/posts/how-we-source-and-verify-listings">how we source and verify listings</a> explains how we decide what counts.</p>
    `,
    faq: [
      {
        q: "Which companies hire remote workers from anywhere?",
        a: "On our board in September 2026, the employers with the most work-from-anywhere roles were Canonical, Remote, Supabase, ElevenLabs and Camunda. Together they accounted for about 81 percent of the worldwide roles we listed.",
      },
      {
        q: "How is this ranking calculated?",
        a: "We count each company's current listings that pass our work-from-anywhere filter, meaning no country, region, timezone or work-authorisation restriction we can find. Ties are broken by the total number of roles we list for that company.",
      },
      {
        q: "Why do so few of these companies publish salaries?",
        a: "Most employers publish pay only where the law or their own policy requires it. Many pay transparency laws are tied to specific jurisdictions, so companies hiring worldwide are not always covered and often discuss pay during the hiring process instead.",
      },
      {
        q: "How often does this list change?",
        a: "Our listings update daily, so the numbers move constantly. The table is a snapshot from September 2026, and the work-from-anywhere board always shows the current openings.",
      },
    ],
  },

  {
    slug: "job-posting-lifecycle-after-you-apply",
    title: "The Lifecycle of a Remote Job Posting, From Launch to Removal",
    description:
      "How a remote job posting is published, copied, updated and finally removed, and what that means for the dates and listings you see on job boards.",
    date: "2026-09-16T12:55:00.000Z",
    author: AUTHOR,
    tags: ["Job Postings", "Hiring Process", "Ghost Jobs", "How It Works"],
    readMinutes: 6,
    html: `
      <p>A job posting looks simple: a page with a title, a description and an apply button. Behind it is a process that starts before the posting goes live and carries on after it disappears. Understanding that process explains a lot of what frustrates job seekers, from "posted 3 weeks ago" labels to listings that vanish the day after you apply.</p>

      <h2>Stage 1: The role is approved</h2>
      <p>Most postings start as an internal request. A hiring manager asks for headcount, someone signs off the budget, and a recruiter writes or adapts a job description. By the time you see the listing, the team may already have spoken to internal candidates or referrals. That doesn't make the posting fake, but it does mean some roles come with a head start you can't see.</p>

      <h2>Stage 2: The posting goes live</h2>
      <p>The recruiter publishes the role in the company's applicant-tracking system, and it appears on the careers page. Many of these systems also publish roles in a structured format that search engines and job boards can read.</p>
      <p>From there it spreads. Job boards and aggregators pick it up, sometimes within hours and sometimes days later, and each copy is a snapshot. Our board reads roles from employers' own systems and career pages, then checks and filters them before they appear. <a href="/posts/how-we-source-and-verify-listings">How we source and verify listings</a> explains the details.</p>

      <h2>Stage 3: Applications arrive</h2>
      <p>The first days bring the most applications. Recruiters often start screening straight away, and some teams start interviewing as soon as they have a few strong candidates. We describe what your application looks like inside those systems in <a href="/posts/what-recruiters-see-when-you-apply-remotely">what recruiters see when you apply</a>.</p>
      <p>While the role is open, the posting can change. Titles get adjusted, requirements rewritten, locations added or removed. Some systems refresh the posting date when a role is edited or reposted, which is one reason a date isn't a perfect guide to a role's age.</p>

      <h2>Stage 4: What "posted 3 weeks ago" really means</h2>
      <p>The age shown on a listing depends on where the date came from. On our board, it's the posting date the employer's system reports. At the time of writing, the median listing on our board is <strong>22 days</strong> old, and the median work-from-anywhere listing is <strong>28 days</strong> old. About <strong>14%</strong> of all listings are less than a week old, and about <strong>33%</strong> are more than a month old.</p>
      <p>A three-week-old role isn't necessarily closed, but the odds that a shortlist already exists are higher. <a href="/posts/the-date-posted-problem-why-freshness-matters">The date-posted problem</a> covers how to use age in your search.</p>
      <blockquote>A posting's age tells you how long it has been visible. Only the employer's own page tells you whether it's still open.</blockquote>

      <h2>Stage 5: The role closes</h2>
      <p>Roles close because they're filled, cancelled, paused or merged into another opening. The employer takes the posting down, and it disappears from the careers page. Copies elsewhere don't know that yet.</p>
      <p>How a removed posting behaves depends on the system. Some return a clear "not found" error. Others send you back to the main jobs page, or show a normal-looking page with a small error flag in the address. A quick check can mistake those for live roles, which is how ghost jobs survive on boards that don't look closely. Our guide to <a href="/posts/ghost-jobs-how-to-tell-a-role-is-still-open">ghost jobs</a> shows how to spot them.</p>

      <h2>Stage 6: How we catch closures</h2>
      <p>Because copies go stale, we check our listings against the source on a schedule:</p>
      <ul>
        <li>Every six hours, an automated sweep checks up to 1,500 listings, starting with the ones checked longest ago, so every listing comes round again regularly.</li>
        <li>A definite "not found" or "gone" response retires a listing straight away.</li>
        <li>A redirect back to the employer's jobs page is treated as a likely closure, but it has to be seen twice before we act on it.</li>
        <li>Timeouts, rate limits and server errors never retire a listing. They mean our check failed, not that the job ended.</li>
        <li>If fewer than 40% of the checks in a run come back healthy, the run saves nothing, because that pattern usually means we're being blocked.</li>
        <li>The board is rebuilt every night, which is when the results are published.</li>
      </ul>
      <p>Separately, listings expire 60 days after their posting date, however healthy they look. Once a listing is retired, its page tells visitors the role is no longer active and returns a "not found" status to search engines, so the dead page drops out of search results.</p>

      <h2>Stage 7: After the posting is gone</h2>
      <p>Your application doesn't vanish with the posting. It stays in the employer's system, usually attached to your candidate profile. Some recruiters come back to earlier applicants when a similar role opens, which is one reason a thoughtful application is rarely wasted.</p>
      <p>How long your data is kept depends on the employer's policy and the law where you live. In the EU and the UK, data protection rules give you the right to ask what is held about you and, in many cases, to have it deleted.</p>

      <h2>What this means for you</h2>
      <ol>
        <li><strong>Apply early</strong> to roles that fit, rather than waiting until your application is perfect.</li>
        <li><strong>Check the employer's own page</strong> before investing time in an older listing.</li>
        <li><strong>Save the description</strong> when you apply, because it may be gone by the interview.</li>
        <li><strong>Don't take silence personally.</strong> The role may have closed for reasons that have nothing to do with you.</li>
      </ol>
      <p>To see the newest roles first, sort the <a href="/jobs">full job search</a> by newest, or check the <a href="/trending-remote-jobs">trending roles page</a> and the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a>.</p>
    `,
    faq: [
      {
        q: "Why do job postings disappear?",
        a: "Postings are removed when a role is filled, cancelled, paused or merged with another opening. Copies on other sites can stay up after the employer removes the original, which is why checking the employer's own careers page matters.",
      },
      {
        q: "Why does a job posting's date sometimes change?",
        a: "Some hiring systems refresh the posting date when a role is edited or reposted, so an older role can look new. The date is a useful guide, but only the employer's own page confirms whether the role is still open.",
      },
      {
        q: "How long do remote job postings stay up?",
        a: "It varies by employer. On our board the median listing is about 22 days old, and we retire any listing 60 days after its posting date, or sooner if our checks find it has been removed at the source.",
      },
      {
        q: "What happens to my application after a job is removed?",
        a: "It usually stays in the employer's hiring system, often linked to your candidate profile, and recruiters sometimes return to earlier applicants for similar roles. In the EU and the UK you can ask what data is held about you and, in many cases, request its deletion.",
      },
    ],
  },
];
