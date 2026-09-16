/**
 * Cluster H, part 2 — Boards and search strategy (articles 32 to 35).
 *
 * The salary analysis reports its own sample problems (one employer supplies
 * 44 of the 53 US-dollar ranges) rather than presenting the raw median as a
 * market rate. Geography uses city-aware matching of listing locations, which
 * is why the US share of region-locked roles is higher here than the simpler
 * country-name mapping suggests. Figures are a September 2026 snapshot.
 */
import type { Post } from "./posts";

const AUTHOR = "getremotejobsnow.com Editorial";

export const POSTS_CLUSTER_H2: Post[] = [
  {
    slug: "what-work-from-anywhere-jobs-pay",
    title: "What Work-From-Anywhere Jobs Pay: Our Salary Data, Analysed",
    description:
      "What location-independent remote jobs pay according to our listings, why they look lower than region-locked roles, and how to read the numbers.",
    date: "2026-09-16T11:55:00.000Z",
    author: AUTHOR,
    tags: ["Remote Salaries", "Work From Anywhere", "Salary Data", "Location-Based Pay"],
    readMinutes: 5,
    html: `
      <p>"Work from anywhere" sounds like the best deal in remote work: live where you like, on a salary that doesn't care. So what do these roles actually pay? We looked at every location-free listing on our board that publishes a salary. The headline number is surprising, and the explanation matters more than the number.</p>

      <h2>The headline numbers</h2>
      <p>At the time of writing, <strong>337</strong> of our listings pass our work-from-anywhere filter. Only <strong>55</strong> of them, about 16%, publish a salary, and <strong>53</strong> of those are in US dollars.</p>
      <table>
        <thead><tr><th>Listings</th><th>With US-dollar pay</th><th>Median midpoint</th><th>Middle half</th></tr></thead>
        <tbody>
          <tr><td>Work from anywhere</td><td>53</td><td>$82,125</td><td>$67,600 to $126,350</td></tr>
          <tr><td>Remote, tied to a region</td><td>977</td><td>$197,500</td><td>$154,800 to $244,700</td></tr>
        </tbody>
      </table>
      <p>Taken at face value, location-free roles pay less than half as much. That conclusion would be wrong, or at least badly overstated, for three reasons.</p>

      <h2>Reason 1: one employer dominates the sample</h2>
      <p><strong>44</strong> of the 53 US-dollar ranges come from a single company, a global HR and payroll platform that publishes pay on most of its listings. Its ranges are wide. One senior product manager role is advertised at <strong>$59,900 to $168,000</strong>, and a payroll coordinator role covering Europe at <strong>$19,650 to $44,200</strong>. Bands that wide usually mean pay depends on where the person lives, with the bottom of the band meant for lower-cost locations.</p>
      <p>So the median mostly describes one company's global pay bands, not the location-free market as a whole.</p>

      <h2>Reason 2: the job mix is different</h2>
      <p><strong>40</strong> of the 53 ranges belong to roles in our management and finance category, such as payroll, HR, employee relations and operations. Their median is <strong>$75,575</strong>. Engineering, product and sales roles, which tend to pay more, barely appear in the location-free sample, because so few of the employers hiring for them worldwide publish pay.</p>
      <p>The other nine US-dollar ranges, mostly engineering, product and sales roles at other employers, all have midpoints of <strong>$125,000</strong> or more. That's a very different picture, but nine listings are far too few to build a conclusion on.</p>

      <h2>Reason 3: the region-locked sample is mostly American</h2>
      <p>Pay transparency laws, which now cover a growing number of US states, are the main reason listings publish salaries at all. Of the 977 region-locked listings with US-dollar pay, <strong>830</strong> are tied to the United States, and their median is <strong>$200,500</strong>. US pay in tech and business roles is among the highest anywhere. So the table compares mostly American roles with a global sample shaped by one employer. We cover those laws in <a href="/posts/salary-transparency-laws-2026">our guide to salary transparency laws</a>.</p>
      <blockquote>With a small, uneven salary sample, ask whose numbers you're looking at before you trust the median.</blockquote>

      <h2>What we can say with confidence</h2>
      <ul>
        <li><strong>Few location-free roles publish pay.</strong> About 16%, slightly below the 19% across our whole board.</li>
        <li><strong>Location-based pay is common in global hiring.</strong> Several employers hiring worldwide publish very wide bands, which suggests pay often depends on where you live even when the job doesn't.</li>
        <li><strong>Published location-free pay is almost always in US dollars.</strong> 53 of the 55 ranges are.</li>
        <li><strong>The role matters more than the location freedom.</strong> Engineering, product and sales roles pay more than operations and payroll roles, location-free or not.</li>
      </ul>

      <h2>How to use this when you apply</h2>
      <ol>
        <li><strong>Ask how pay is set.</strong> "Is pay the same wherever I live, or does it depend on location?" is a normal question for a global role.</li>
        <li><strong>Ask where you'd sit in the band.</strong> With bands this wide, the range alone tells you little.</li>
        <li><strong>Compare in your own currency.</strong> The <a href="/tools/remote-salary-converter">remote salary converter</a> shows what a dollar range means where you live.</li>
        <li><strong>Benchmark against the role, not the label.</strong> Compare a location-free engineering offer with engineering pay, not with a location-free average.</li>
      </ol>
      <p>Our guide to <a href="/posts/what-a-100k-remote-salary-really-buys">what a remote salary really buys</a> shows how to judge a number once you have it, and our ranking of the <a href="/posts/most-remote-friendly-companies-hiring-worldwide">most remote-friendly companies</a> shows who is behind these listings.</p>

      <h2>How we calculated this</h2>
      <p>We took every current listing with a published salary, used the midpoint of each range, or the single figure where only one was given, and kept US-dollar figures only, so no exchange rates were involved. Listings without pay are left out, which is the biggest limitation of any salary analysis built on job ads. The figures are a snapshot from September 2026. The <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> always shows the current roles, and our page of <a href="/real-work-from-anywhere-jobs">verified work-from-anywhere roles</a> lists only those taken straight from employers' own systems.</p>
    `,
    faq: [
      {
        q: "Do work-from-anywhere jobs pay less?",
        a: "Not necessarily. On our board, location-free roles with published US-dollar pay have a lower median than region-locked roles, but the sample is small, dominated by one employer's wide global bands, and weighted towards operations and payroll roles.",
      },
      {
        q: "Why do so few worldwide jobs show a salary?",
        a: "Most salary disclosure is driven by pay transparency laws tied to specific places, especially US states. Roles open worldwide often fall outside those rules, and only about 16 percent of the location-free listings on our board publish pay.",
      },
      {
        q: "What is location-based pay?",
        a: "It means an employer sets your salary partly by where you live, usually paying less in lower-cost locations. A very wide published band for a single role often signals this approach, so ask how pay is set before you negotiate.",
      },
      {
        q: "How were these salary figures calculated?",
        a: "We used the midpoint of each published range on current listings, kept US-dollar figures only and excluded listings without pay. The figures are a snapshot from September 2026.",
      },
    ],
  },

  {
    slug: "remote-job-interviews-across-time-zones",
    title: "Remote Job Interviews Across Time Zones: How to Prepare and Schedule",
    description:
      "How to schedule and prepare for remote job interviews across time zones: confirming times, handling late-night slots, tech setup and follow-up.",
    date: "2026-09-16T11:45:00.000Z",
    author: AUTHOR,
    tags: ["Remote Interviews", "Time Zones", "Video Interviews", "Interview Preparation"],
    readMinutes: 5,
    html: `
      <p>A remote job interview has all the usual pressure, plus a few problems of its own. The interviewer may be eight hours ahead. The only slot on offer might be at 22:00 your time. The invite might say "3pm" without a time zone. And a shaky connection can make a strong answer sound hesitant. None of these is hard to handle, but each is easier with a plan.</p>

      <h2>Get the time right, in writing</h2>
      <p>Most scheduling mistakes come from ambiguity. Three habits prevent them:</p>
      <ol>
        <li><strong>Confirm the time in both time zones.</strong> "Tuesday 9 June, 15:00 London time, which is 10:00 in New York" leaves no room for doubt.</li>
        <li><strong>Ask for a calendar invite.</strong> Calendar apps convert time zones for you, as long as your device's time zone is set correctly.</li>
        <li><strong>Watch for clock changes.</strong> The US and Europe change their clocks on different dates, so for a few weeks each spring and autumn the usual gap shifts by an hour. <a href="/posts/timezone-overlap-how-much-you-need">Our guide to time zone overlap</a> gives the dates.</li>
      </ol>
      <p>When you propose times, offer windows in the interviewer's time zone rather than yours. Our <a href="/tools/world-time-buddy">world time planner</a> lines up several cities at once, which helps when a panel spans more than one office.</p>

      <h2>When the only slot is at an awkward hour</h2>
      <p>If a company's hours fall late in your evening or early in your morning, you still have options.</p>
      <ul>
        <li><strong>Ask for another slot.</strong> Many interviewers will move an hour or two if you explain the time difference politely.</li>
        <li><strong>Ask about asynchronous stages.</strong> Some companies use recorded answers or written exercises for early rounds.</li>
        <li><strong>If you accept, prepare your body as well as your answers.</strong> Rest beforehand, eat properly, and use bright light and a short walk to wake yourself up.</li>
        <li><strong>Treat it as information.</strong> If every call lands at midnight for you, ask what the working hours will be once you're hired.</li>
      </ul>
      <blockquote>How a company schedules your interview is often a preview of how it will schedule your job.</blockquote>

      <h2>Set up your connection and space</h2>
      <ul>
        <li><strong>Test the platform the day before.</strong> Install any app you need and check your microphone and camera.</li>
        <li><strong>Use a wired connection</strong> if you can, or sit close to your router, and close anything else using bandwidth.</li>
        <li><strong>Have a backup.</strong> Keep your phone charged with its hotspot ready, and keep the interviewer's email address to hand in case the call drops.</li>
        <li><strong>Wear headphones</strong> to avoid echo.</li>
        <li><strong>Light your face from the front</strong>, and raise the camera to eye level.</li>
        <li><strong>Choose a quiet, plain background.</strong> A blurred background is fine if your real one is distracting.</li>
      </ul>

      <h2>Handling lag and interruptions</h2>
      <p>Long-distance calls often carry a slight delay, which makes people talk over each other. Pause for a beat before you answer, and keep your answers structured so an interruption doesn't throw you. If the picture freezes, say so plainly: "Sorry, you froze for a moment. Could you repeat the last part?" Interviewers at remote companies deal with this all the time.</p>

      <h2>What remote interviewers want to hear</h2>
      <p>Beyond the skills for the role, remote interviewers are usually checking how you'll work without an office around you. Prepare short examples of:</p>
      <ul>
        <li>A time you moved work forward without waiting for a meeting.</li>
        <li>How you keep colleagues updated in writing.</li>
        <li>How you manage your time and priorities on your own.</li>
        <li>How you've worked with people in other time zones.</li>
      </ul>
      <p>Be ready to state your working hours and overlap clearly, because it's often one of the first practical questions. The <a href="/tools/timezone-overlap">timezone overlap finder</a> helps you work out the numbers before the call.</p>

      <h2>Take-home tasks and panel days</h2>
      <p>For take-home exercises, confirm the deadline in the company's time zone and in yours, since "Friday end of day" can mean very different things. For a day of back-to-back interviews, ask whether it can be split across two days if the full block would run late for you. Most companies would rather adjust than meet you exhausted in the final round.</p>

      <h2>After the interview</h2>
      <p>Send a short thank-you note, timed to arrive during the interviewer's working hours. Most email tools let you schedule a send. If you haven't heard back by the date they gave, a polite follow-up is fine. Our guide to <a href="/posts/what-recruiters-see-when-you-apply-remotely">what recruiters see when you apply</a> explains why replies can take a while.</p>
      <p>If you're still looking for roles in time zones that suit you, the remote boards for <a href="/remote-jobs-in-europe">Europe</a>, <a href="/remote-jobs-in-usa">the US</a> and <a href="/remote-jobs-in-india">India</a> are good places to start.</p>
    `,
    faq: [
      {
        q: "How do I confirm an interview time in another time zone?",
        a: "Write the time in both time zones when you confirm, for example 15:00 London time and 10:00 New York time, and ask for a calendar invite. Double-check in spring and autumn, when the US and Europe change their clocks on different dates.",
      },
      {
        q: "What if the only interview slot is late at night for me?",
        a: "Politely ask for another slot or an asynchronous stage first. If you accept, rest beforehand and prepare your energy as well as your answers, and use the experience to ask what the working hours would be.",
      },
      {
        q: "How can I reduce lag on a video interview?",
        a: "Use a wired connection or sit near your router, close other apps using the internet, and keep a phone hotspot ready as a backup. Pausing briefly before you answer also helps on calls with a delay.",
      },
      {
        q: "When should I send a thank-you email after a remote interview?",
        a: "Send it soon after the interview, but schedule it to arrive during the interviewer's working hours. A short, specific note works better than a long one.",
      },
    ],
  },

  {
    slug: "psychology-of-remote-job-hunting",
    title: "The Psychology of Remote Job Hunting: Why It Feels So Hard",
    description:
      "Why a remote job search can feel lonelier and more discouraging than a local one, what our listing data says about it, and habits that make it easier.",
    date: "2026-09-16T11:35:00.000Z",
    author: AUTHOR,
    tags: ["Job Search Stress", "Remote Job Search", "Wellbeing", "Ghosting"],
    readMinutes: 5,
    html: `
      <p>If your remote job search feels heavier than any search you've done before, you're not imagining it, and it doesn't mean you're doing it wrong. Remote job hunting combines a large, invisible field of competitors with very little feedback, and it all happens alone at a screen. That mix is hard on anyone. Understanding why it feels this way makes it easier to manage.</p>
      <p>This is practical guidance, not medical advice. If low mood or anxiety is affecting your daily life, please talk to a doctor or a mental health professional.</p>

      <h2>Why it can feel worse than a local search</h2>
      <h3>You can't see the competition</h3>
      <p>A local job draws applicants from one area. A location-free role can draw them from anywhere. You never see those other candidates, so rejection arrives without context, and it's easy to assume the problem is you.</p>
      <h3>The signals are thin</h3>
      <p>In a local search you might visit an office, meet people or get a feel for the team. Remote hiring strips most of that away and leaves you with a text box and an automated email.</p>
      <h3>Many listings are already dead</h3>
      <p>Some of the silence has nothing to do with you. When we checked our listings against employers' own job boards, about <strong>27%</strong> of the ones we could check had already been removed at the source. On any board that doesn't check, applications to roles like those go nowhere. Our guide to <a href="/posts/ghost-jobs-how-to-tell-a-role-is-still-open">ghost jobs</a> shows how to spot them.</p>
      <h3>The most flexible roles are scarce</h3>
      <p>Fully location-free roles are a small slice of remote work. On our board, only <strong>337</strong> of <strong>5,838</strong> listings, under 6%, pass our work-from-anywhere filter. If those are the only roles you apply for, a slow search is normal.</p>
      <h3>It never switches off</h3>
      <p>New listings appear around the clock, and your laptop is always there. Without an office or a commute to mark the end of the day, the search can creep into every evening.</p>
      <blockquote>A quiet inbox is information about hiring, not a verdict on you.</blockquote>

      <h2>Habits that make it lighter</h2>
      <h3>Set process goals, not outcome goals</h3>
      <p>You can't control whether you get an interview this week. You can control whether you send three good applications and follow up on two. Judge yourself on what you control.</p>
      <h3>Put the search in a box</h3>
      <p>A fixed daily window, such as the <a href="/posts/30-minute-remote-job-search-routine">30-minute routine</a> we suggest, stops the search spilling into your whole day. Close the tabs when the time is up.</p>
      <h3>Track progress outside your head</h3>
      <p>A simple tracker turns a vague sense of failure into a list of things you've actually done. It also shows patterns, such as which kinds of roles reply. Our <a href="/posts/remote-job-application-tracker-minimal-system">minimal tracker guide</a> shows how to set one up.</p>
      <h3>Check less often</h3>
      <p>Refreshing your inbox every few minutes feeds anxiety without speeding anything up. Check email at set times, and switch off notifications outside your search window.</p>
      <h3>Keep some structure in your day</h3>
      <p>Regular sleep, time outdoors and some movement sound basic, but they make a long wait easier to bear. So does doing something each day that has nothing to do with work.</p>
      <h3>Talk to people</h3>
      <p>A search done alone is harder than one that's shared. Talk to friends, former colleagues or other people who are searching. For many people, simply saying "this is hard" out loud helps.</p>

      <h2>Dealing with being ghosted</h2>
      <p>Being ignored after an application is common. Being ghosted after an interview hurts more. Either way, send one polite follow-up after the date you were given, then mark the application as closed in your tracker and let it go. Companies go silent for reasons that have nothing to do with you: budgets freeze, roles get filled internally, recruiters leave. Our guide to <a href="/posts/what-recruiters-see-when-you-apply-remotely">what recruiters see when you apply</a> explains the most common ones.</p>

      <h2>Stay alert when you're tired</h2>
      <p>Scammers know that long searches wear people down. Offers that arrive quickly, skip the interview or promise easy money are most tempting when you're discouraged. Keep one simple rule: never pay, buy or move money to get a job. Our <a href="/posts/remote-job-scams-how-they-make-money">guide to remote job scams</a> explains the common tricks.</p>

      <h2>When to get more help</h2>
      <p>Feeling frustrated or low during a long search is normal. If those feelings last for weeks, affect your sleep or appetite, or make it hard to get through the day, reach out to a doctor or a mental health professional. If you ever feel unsafe, contact local emergency services or a crisis line straight away.</p>

      <h2>Where to spend your energy</h2>
      <p>Focus on listings that are recent and checked. The <a href="/trending-remote-jobs">trending roles page</a> highlights roles posted in the past week, and the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> only lists roles that pass our location checks. A smaller number of well-chosen applications will do more for your search, and your mood, than a flood of hopeful ones.</p>
    `,
    faq: [
      {
        q: "Why is remote job searching so stressful?",
        a: "Remote roles can draw applicants from anywhere, feedback is scarce, many listings online are already closed, and the search happens alone with no natural end to the day. Together those make rejection feel more personal than it is.",
      },
      {
        q: "How should I deal with being ghosted by an employer?",
        a: "Send one polite follow-up after the date you were given, then mark the application as closed and move on. Silence often reflects frozen budgets, internal hires or staff changes rather than anything about you.",
      },
      {
        q: "How many hours a day should I spend job hunting?",
        a: "A focused, fixed window, such as 30 minutes a day plus a longer weekly session, works better for most people than open-ended searching. It protects your energy and stops the search taking over your day.",
      },
      {
        q: "When should I get help for job search stress?",
        a: "If low mood or anxiety lasts for weeks, affects your sleep or appetite, or makes daily life hard, talk to a doctor or a mental health professional. If you ever feel unsafe, contact emergency services or a crisis line immediately.",
      },
    ],
  },

  {
    slug: "getting-hired-remotely-from-outside-the-us",
    title: "How to Get Hired Remotely From Outside the US: The 2026 Guide",
    description:
      "How candidates outside the US get hired for remote jobs: which roles are open to you, employer of record vs contractor, pay, currency, tax and visas.",
    date: "2026-09-16T14:35:00.000Z",
    author: AUTHOR,
    tags: ["International Remote Jobs", "Employer of Record", "Remote Jobs Outside US", "Global Hiring"],
    readMinutes: 6,
    html: `
      <p>Most remote job advice is written with American candidates in mind. If you live in Lagos, Lisbon, Manila or Mumbai, much of it doesn't apply, and plenty of "remote" jobs turn out not to be open to you. This guide brings together what candidates outside the US need to know: where the open roles are, how companies can hire you, and what to check on pay, tax and time zones.</p>

      <h2>The market, in numbers</h2>
      <p>At the time of writing, our board lists <strong>5,838</strong> remote roles. For someone outside the US, they break down like this:</p>
      <ul>
        <li><strong>337</strong>, under 6%, pass our work-from-anywhere filter.</li>
        <li>Of the <strong>5,501</strong> region-locked roles, more than half, about <strong>55%</strong>, are tied to the United States.</li>
        <li>About <strong>1,933</strong> region-locked roles are tied to places outside the US.</li>
      </ul>
      <p>Together, that means roughly <strong>39%</strong> of our listings are clearly open to people outside the US. For about 9% of region-locked roles, the location isn't stated clearly enough for us to tell. Here's where the non-US roles are:</p>
      <table>
        <thead><tr><th>Region</th><th>Region-locked roles</th><th>Share of region-locked roles</th></tr></thead>
        <tbody>
          <tr><td>Europe</td><td>883</td><td>16%</td></tr>
          <tr><td>United Kingdom</td><td>442</td><td>8%</td></tr>
          <tr><td>Asia-Pacific</td><td>289</td><td>5%</td></tr>
          <tr><td>Canada</td><td>264</td><td>5%</td></tr>
          <tr><td>India</td><td>178</td><td>3%</td></tr>
          <tr><td>Latin America</td><td>91</td><td>2%</td></tr>
          <tr><td>Middle East</td><td>51</td><td>1%</td></tr>
          <tr><td>Africa</td><td>6</td><td>0.1%</td></tr>
        </tbody>
      </table>
      <p>A role can be open to more than one region, so the rows overlap. The message is still clear. If you live in Europe or the UK, region-locked roles are your biggest pool. Elsewhere, location-free roles and companies with a local presence matter more.</p>

      <h2>How a company can hire you</h2>
      <p>A company can only employ you legally if it has a way to do so in your country. There are three common routes.</p>
      <h3>Its own local entity</h3>
      <p>If the company has an office or legal entity where you live, it can employ you like any local employer, with a local contract, payroll and benefits.</p>
      <h3>An employer of record</h3>
      <p>An employer of record is a provider that employs you locally on the company's behalf. You get a local employment contract, payroll in your country and the statutory benefits you'd expect, while your day-to-day work is for the company. Many distributed companies hire this way in countries where they have no entity. Our guide to <a href="/posts/remote-benefits-decoded-by-region">remote benefits by region</a> explains what that means for your package.</p>
      <h3>A contractor agreement</h3>
      <p>You work as an independent contractor and invoice the company. It's quick to set up, but you usually give up paid leave, pension contributions and other employee benefits, and you handle your own tax. If you contract for a US company, expect to be asked for a form W-8BEN, which confirms you're not a US person for tax purposes.</p>
      <blockquote>The hiring route shapes your pay, benefits and tax, so ask about it early.</blockquote>

      <h2>Pay and currency</h2>
      <ul>
        <li><strong>Ask how pay is set.</strong> Many global employers adjust pay by location, and some publish very wide bands as a result. Our <a href="/posts/what-work-from-anywhere-jobs-pay">analysis of work-from-anywhere salaries</a> shows just how wide.</li>
        <li><strong>Ask which currency you'd be paid in.</strong> Pay in US dollars protects you if your local currency weakens, and costs you if it strengthens.</li>
        <li><strong>Check transfer costs.</strong> For contractors especially, fees and exchange margins on international payments can take a noticeable slice.</li>
        <li><strong>Compare offers in your own terms.</strong> The <a href="/tools/remote-salary-converter">remote salary converter</a> shows what an offer means in your currency.</li>
      </ul>

      <h2>Tax</h2>
      <p>As a rule, you're taxed where you live and work, not where your employer is based. If you're not a US citizen or resident and you do all your work outside the US, working for a US company usually doesn't make your pay subject to US income tax, but your own country will expect you to declare it. Contractors often need to register as self-employed and pay their own social contributions. Our guide to <a href="/posts/remote-work-taxes-living-abroad">working remotely from abroad</a> covers residency and treaties in more depth. This is general information, so check your country's rules or speak to an adviser.</p>

      <h2>Visas, if you plan to move</h2>
      <p>If you stay in your own country, you usually don't need a visa to work remotely for a foreign company. If you want to move while you work remotely, look at the digital nomad and remote-worker visas that many countries now offer. Our guide to <a href="/posts/digital-nomad-visas-2026">digital nomad visas</a> compares the main ones.</p>

      <h2>Time zones</h2>
      <p>Working hours are often the real filter. A role that's open worldwide may still require overlap with a US or European team. Work out your overlap before you apply with the <a href="/tools/timezone-overlap">timezone overlap finder</a>, and read our piece on <a href="/posts/remote-jobs-in-asia-pacific-timezone-filters">how "US hours" filters shut out Asia-Pacific candidates</a> for ways to turn a time difference into an advantage.</p>

      <h2>How to apply without getting filtered out</h2>
      <ol>
        <li><strong>Put your location and hours at the top of your CV.</strong> "Based in Nairobi, available 08:00 to 12:00 US Eastern" answers a recruiter's first question.</li>
        <li><strong>Answer screening questions accurately.</strong> A wrong answer about work authorisation wastes everyone's time and can end the process later.</li>
        <li><strong>Target the right roles.</strong> Skip listings that say "US only" or require US work authorisation, unless you have it.</li>
        <li><strong>Look for companies that say where they hire.</strong> Many distributed employers list the countries they can employ in.</li>
        <li><strong>Say which hiring routes work for you.</strong> If you're open to contracting or an employer of record, saying so can remove a blocker.</li>
      </ol>

      <h2>Where to search</h2>
      <p>Start with the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a>, then add the boards for your region:</p>
      <ul>
        <li><strong>Europe:</strong> <a href="/remote-jobs-in-europe">all of Europe</a>, <a href="/remote-jobs-in-germany">Germany</a>, <a href="/remote-jobs-in-uk">the UK</a>, and cities including <a href="/remote-jobs-in-berlin">Berlin</a>, <a href="/remote-jobs-in-amsterdam">Amsterdam</a>, <a href="/remote-jobs-in-dublin">Dublin</a>, <a href="/remote-jobs-in-madrid">Madrid</a>, <a href="/remote-jobs-in-paris">Paris</a> and <a href="/remote-jobs-in-london">London</a>.</li>
        <li><strong>Asia-Pacific:</strong> <a href="/remote-jobs-in-india">India</a>, <a href="/remote-jobs-in-bengaluru">Bengaluru</a>, <a href="/remote-jobs-in-singapore">Singapore</a>, <a href="/remote-jobs-in-australia">Australia</a> and <a href="/remote-jobs-in-japan">Japan</a>.</li>
        <li><strong>Canada:</strong> <a href="/remote-jobs-in-canada">all of Canada</a>, <a href="/remote-jobs-in-toronto">Toronto</a> and <a href="/remote-jobs-in-vancouver">Vancouver</a>.</li>
      </ul>
      <p>You can also filter the <a href="/jobs">full job search</a> by region, and find employers that hire across borders in our <a href="/companies">company directory</a>.</p>
    `,
    faq: [
      {
        q: "Can I work for a US company from outside the US?",
        a: "Yes, if the company has a way to engage you: a local entity in your country, an employer of record, or a contractor agreement. Many US companies hire internationally this way, but some roles are limited to US residents.",
      },
      {
        q: "What is an employer of record?",
        a: "It is a provider that legally employs you in your country on another company's behalf, handling your contract, payroll, tax and statutory benefits, while you work day to day for that company.",
      },
      {
        q: "Do I pay US tax if I work remotely for a US company from abroad?",
        a: "Usually not, if you are not a US citizen or resident and you do all your work outside the US. Your own country will normally tax that income, and contractors are typically asked to complete a form W-8BEN. Check your local rules or ask an adviser.",
      },
      {
        q: "How many remote jobs are open to people outside the US?",
        a: "On our board at the time of writing, about 39 percent of listings were clearly open to candidates outside the US, counting both work-from-anywhere roles and roles tied to regions such as Europe, the UK, Canada, Asia-Pacific and India.",
      },
    ],
  },
];
