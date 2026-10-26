/**
 * Cluster J: the offer and the job post. What a candidate should get in
 * writing before accepting, how employers should write a remote post, and how
 * time off works across countries. Written 26 October 2026.
 *
 * Board figures come from scripts/report-job-posts.ts, run on 26 October 2026
 * against the committed snapshot (2,565 listings from 602 employers), with the
 * employers' own text from the capture files for 2,549 of them. Statutory
 * figures were checked on the same day; every one is phrased as a minimum or
 * a starting point because leave and contract law changes.
 */
import type { Post } from "./posts";

export const POSTS_CLUSTER_J: Post[] = [
  {
    slug: "before-you-accept-a-remote-job-offer",
    title: "Before You Accept a Remote Job Offer: 12 Things to Get in Writing",
    description:
      "Twelve things to settle before you sign a remote offer: who employs you, where you may work, pay currency, hours, leave, equipment, travel and notice.",
    date: "2026-10-26T08:00:00.000Z",
    author: "Bhargav",
    tags: ["Job Offers", "Remote Contracts", "Negotiation", "Employer of Record", "Remote Work"],
    readMinutes: 7,
    html: `
      <p>A remote job offer usually arrives as a salary, a start date and a link to sign. The details that decide whether the job works from your home are often missing, because most offer templates were written for people who would turn up at an office. Where you are allowed to work, which currency you are paid in, who provides the laptop and how much travel is expected are rarely in the first draft.</p>
      <p>The time to settle them is between the offer and your signature. After that, every question becomes a request. Here are twelve things to get in writing first, grouped by what they protect. This is practical guidance rather than legal advice: employment law differs by country, and for anything with real money attached it is worth asking someone qualified where you live.</p>

      <h2>Who employs you</h2>
      <h3>1. The legal employer and the type of contract</h3>
      <p>There are three common arrangements. You can be an employee of the company itself or of a local subsidiary; an employee of an employer of record, a firm that employs you in your country on the company's behalf; or an independent contractor who invoices the company. They differ in who pays social contributions, whether you get statutory leave and sick pay, and how easily the arrangement can end. Our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a> sets out what each costs you. If the offer is a contract, ask whether employment was an option. A contractor rate has to be noticeably higher than the equivalent salary to leave you as well off, and the <a href="/tools/freelance-rate-calculator">freelance rate calculator</a> shows by how much.</p>

      <h3>2. Which country's law governs the contract</h3>
      <p>The contract should name it. For an employee this is normally the country you work in, and in the EU, choosing another country's law in the contract cannot take away the mandatory protections of the country where you habitually work. For a contractor it can be anywhere, often the company's home state or country, which matters if there is ever a dispute about payment.</p>

      <h2>Where you can work</h2>
      <h3>3. The location clause</h3>
      <p>"Remote" in an offer almost always means remote within somewhere. On our board, only a few percent of remote listings are open to someone anywhere in the world; the rest name a country or region. Ask for the country, state or region you may work from to be written into the contract. The restriction is usually about the employer's obligations rather than your preferences: someone working from a country where the company is not set up can create payroll and tax registration duties for it there.</p>

      <h3>4. Working from abroad for a while</h3>
      <p>Ask whether you can work from another country for a few weeks, and what approval it needs. Some employers write an allowance into their benefits: postings we have read from employers in London offer four to six weeks a year, and others offer about 30 days. If you plan to spend longer away, check the tax side too, because staying long enough in a country can make you tax resident there. The <a href="/tools/tax-residency-day-counter">tax residency day counter</a> helps you keep count, and our guide to <a href="/posts/remote-work-taxes-living-abroad">taxes when you work from abroad</a> covers the rest.</p>

      <h3>5. Moving later</h3>
      <p>Ask what happens if you move after you start, within the country and to another one. Some companies adjust pay to where you live, so a move can change your salary in either direction; others pay one rate for a role wherever you are. A move abroad can mean changing employing entity, or leaving.</p>

      <h2>Money</h2>
      <h3>6. Currency, payment dates and the number of payments</h3>
      <p>Ask which currency you will be paid in, how often, and how many payments make up the annual figure. In several European countries salaries are paid in fourteen instalments or include a legally required holiday allowance, which changes what a monthly figure means. If you are paid in a currency you do not spend, every move in the exchange rate changes your real pay. The <a href="/tools/remote-salary-converter">remote salary converter</a> puts both sides into one currency, and our guide to <a href="/posts/hourly-vs-annual-remote-pay-converting-offers">converting hourly and annual pay</a> explains the payment conventions.</p>

      <h3>7. What the number includes</h3>
      <p>Get the base salary, any bonus or commission, and any equity written down separately, with how each variable part is earned. For equity, ask for the vesting schedule and how long you would have to buy your options if you left. Two offers with the same headline figure can be far apart once these are separated, and the <a href="/tools/offer-comparator">remote offer comparator</a> lines them up side by side.</p>

      <h2>Time</h2>
      <h3>8. Working hours and time zone</h3>
      <p>Most job posts never say which hours they expect. Of the 2,549 listings on our board whose full text we hold, only <strong>76 (3.0%)</strong> state a time zone or working-hours condition at all (measured on 26 October 2026). There usually is an expectation; you simply find out about it after you start. Ask for the core hours, the time zone they are set in and any on-call duties, then check the overlap with the <a href="/tools/timezone-overlap">timezone overlap finder</a>. Our guide to <a href="/posts/timezone-overlap-how-much-you-need">how much overlap a team needs</a> helps you judge whether the answer is workable.</p>

      <h3>9. Leave and public holidays</h3>
      <p>Ask how many days of paid leave you get, whose public holidays apply, and what an "unlimited" policy means in practice. Unlimited or flexible leave appears in the postings of 148 of the 597 employers whose full text we hold, while only 53 state a number of days. Our guide to <a href="/posts/remote-work-time-off-and-public-holidays">time off in remote jobs</a> sets out the legal minimums by country and the questions that turn "unlimited" into a number.</p>

      <h2>Costs that should not land on you</h2>
      <h3>10. Equipment and expenses</h3>
      <p>Ask who provides the laptop and other equipment, whether there is a home office or coworking allowance, and whether internet or phone costs are reimbursed. Only 41 of those 597 employers (6.9%) mention any equipment or home-office support in a posting, so a job ad that says nothing tells you nothing. The <a href="/tools/home-office-cost-calculator">home office cost calculator</a> shows what a reasonable allowance has to cover.</p>

      <h3>11. Travel the job requires</h3>
      <p>Many remote companies meet in person: 81 of the 597 employers (13.6%) mention offsites, retreats, team meetups or a share of travel in at least one posting. Ask how often, for how long, where, who pays and whether you would need a visa to get there. A week-long offsite twice a year is easy to agree to and hard to fit around childcare if nobody mentioned it before you signed.</p>

      <h2>The exit and the small print</h2>
      <h3>12. Probation, notice and what you can do on the side</h3>
      <p>Ask for the probation period, the notice each side must give during and after it, and any restrictions that apply once you leave. Read the clauses on intellectual property and outside work closely. An invention assignment clause written broadly can claim things you build in your own time, and some places limit how far it reaches: California's labour code, for example, protects inventions made entirely on your own time without the employer's equipment or confidential information, unless they relate to the employer's business or come out of work you did for it. If you freelance, have a side project or plan to start one, say so and get the answer in writing.</p>

      <h2>How to ask without souring the offer</h2>
      <p>None of these questions is unusual, and an employer that hires remotely has answered all of them before. Ask once, in a single message after the verbal offer: "Before I sign, could you confirm the following in the offer letter or by email?", followed by your list. It helps to know that much of this is already expected in writing in many places. In the EU, employers must give new staff their core terms in writing from the first working day and no later than the seventh calendar day, and in the UK a written statement of particulars has been a day-one right since April 2020.</p>
      <p>If the answers are vague, treat that as information. An employer that cannot say where you are allowed to work, or which currency you will be paid in, may never have hired anyone where you live. That can be worked through together, as long as you find out before you resign from your current job.</p>

      <h2>The checklist</h2>
      <ol>
        <li>Your legal employer, and whether you are an employee or a contractor.</li>
        <li>The country whose law governs the contract.</li>
        <li>Where you may work from.</li>
        <li>Whether you can work from abroad for a while, and how to get approval.</li>
        <li>What happens to the job and the pay if you move.</li>
        <li>Currency, payment dates and the number of payments a year.</li>
        <li>Base, bonus, commission and equity, written separately.</li>
        <li>Core hours, their time zone and any on-call duties.</li>
        <li>Paid leave, and whose public holidays apply.</li>
        <li>Equipment, allowances and reimbursed costs.</li>
        <li>Required travel, and who pays for it.</li>
        <li>Probation, notice, and the intellectual property and outside-work clauses.</li>
      </ol>
      <p>If you are still looking rather than deciding, the <a href="/jobs">remote job search</a> shows every role on the board with its location condition, and <a href="/work-from-anywhere-jobs">work-from-anywhere jobs</a> lists only the ones with none.</p>
    `,
    faq: [
      {
        q: "What should I ask before accepting a remote job offer?",
        a: "Get the legal employer and contract type, where you may work from, the pay currency and number of payments, the core hours and their time zone, leave and public holidays, equipment and expenses, required travel, and the probation, notice and intellectual property terms confirmed in writing before you sign.",
      },
      {
        q: "Is it normal to ask questions about a remote job offer before signing?",
        a: "Yes. Questions about location, pay currency, hours and equipment are routine for employers that hire remotely. Send them together in one message after the verbal offer and ask for the answers in the offer letter or by email.",
      },
      {
        q: "Does a remote job offer have to be in writing?",
        a: "In many places the core terms must be. EU rules require employers to give essential terms in writing from the first working day and no later than the seventh calendar day for most of them, and in the UK a written statement has been a day-one right since April 2020. Most US employment is at will and fewer terms must be written down, which makes asking more important.",
      },
      {
        q: "What is the difference between an employee offer and a contractor offer?",
        a: "An employee, hired directly or through an employer of record, normally gets statutory leave, sick pay and employer social contributions. A contractor invoices for work and pays their own taxes and contributions, so a contract rate has to be noticeably higher than the salary equivalent to leave you as well off.",
      },
    ],
  },

  {
    slug: "how-to-write-a-remote-job-post",
    title: "How to Write a Remote Job Post Candidates Trust",
    description:
      "What 2,549 remote job posts on our board say and leave out: pay, the location line, hours, equipment, travel and the hiring process. A guide for employers.",
    date: "2026-10-26T08:10:00.000Z",
    author: "Bhargav",
    tags: ["Remote Hiring", "Job Descriptions", "Pay Transparency", "For Employers", "Hiring"],
    readMinutes: 7,
    html: `
      <p>We read every remote job post that reaches our board to decide one thing: who is allowed to apply. Some posts answer that in the first line. Many leave it to a sentence near the end, or never say. Reading thousands of them side by side shows what makes a remote post easy to trust, and how rarely posts manage it.</p>
      <p>The figures below come from getremotejobsnow.com on <strong>26 October 2026</strong>: <strong>2,565 listings from 602 employers</strong>, and the full text of <strong>2,549</strong> of them, from 597 employers, as published on the employers' own hiring systems. When one employer posts dozens of near-identical ads, a share of listings mostly measures that one employer, so most figures here are counted by employer as well.</p>

      <h2>1. Say who can apply, in the location line</h2>
      <p>The location line is where a remote candidate looks first, and where job search filters read. 140 of the region-locked listings on our board give their location as just "Remote", and in 120 of those our analyzer finds no location or hours condition anywhere else in the post either. A candidate in Lisbon or Lagos cannot tell whether to apply. Neither can a job board: ours files a post like that as region-locked, because nothing in it says the role is open everywhere.</p>
      <p>Put the place in the line itself: "Remote, United States", "Remote, any EU country", "Remote, UTC−3 to UTC+3", or "Remote, anywhere" if you mean it. If you can hire in some countries through an employer of record, list them. If the role needs work authorisation in a particular country, say so in the location line rather than in a legal paragraph at the bottom.</p>

      <h2>2. Publish the pay range</h2>
      <p>Only <strong>521 of the 2,565 listings (20.3%)</strong> state a salary range. Counted by employer it is starker: <strong>468 of 602 employers</strong> publish pay on none of their listings, 85 publish it on all of them and 49 on some. Disclosure follows the law more than preference. Listings open to the United States state a range 29.3% of the time, against 8.0% for listings that are not, because a growing list of US states require a range in job ads.</p>
      <p>The rest of the world is moving the same way. The EU's pay transparency directive gives job applicants the right to know the starting pay or its range before the interview, and bars employers from asking about their pay history. Member states had until 7 June 2026 to bring it into national law. Only a handful met that date and most are still legislating, but the direction is settled. Our guide to <a href="/posts/salary-transparency-laws-2026">salary transparency laws</a> covers where ranges are already required.</p>
      <p>A range only helps if it means something. Across the 479 US-dollar ranges on our board with a top and a bottom, the median top is <strong>1.38 times</strong> the bottom, and the middle half sit between 1.21 and 1.67 times. A range of $120,000 to $165,000 reads as a real band. One of $90,000 to $250,000 spans almost three times and reads as a refusal to say; 42 ranges on our board at least double from bottom to top.</p>

      <h2>3. State the hours you need</h2>
      <p>A remote team with core hours has a time zone requirement, whatever its location line says. Yet only <strong>76 of the 2,549 posts (3.0%)</strong>, from 47 employers, state any time zone or working-hours condition. Candidates find out in the second interview, or in the first week.</p>
      <p>Say it plainly and specifically. "At least four hours of overlap with 9:00 to 17:00 UK time" tells a candidate in Singapore exactly what the job asks of them, and lets the ones who cannot do it stop before they apply. Our guide to <a href="/posts/timezone-overlap-how-much-you-need">how much overlap a team needs</a> can help you decide what to ask for, and the <a href="/tools/team-timezone-matrix">team timezone matrix</a> shows what your current team already shares.</p>

      <h2>4. Describe how the team works</h2>
      <p>The parts of a remote job that decide whether someone will do well in it rarely make it into the ad. Counted across the same 597 employers:</p>
      <ul>
        <li><strong>How you communicate.</strong> 19 employers (3.2%) describe their team as working asynchronously in any posting. If your team runs on written updates and recorded decisions, say so. It is one of the most attractive things a remote employer can offer, and one of the hardest for a candidate to find out.</li>
        <li><strong>When people meet.</strong> 81 employers (13.6%) mention offsites, retreats, meetups or a share of travel. Candidates with children or caring duties need to know how often and for how long before they apply, not after.</li>
        <li><strong>Equipment.</strong> 41 employers (6.9%) mention a laptop, an equipment budget, or a home-office or coworking allowance. If you provide one, it belongs in the post.</li>
        <li><strong>Time off.</strong> 148 employers (24.8%) promise unlimited or flexible leave somewhere, while 53 (8.9%) state a number of days. A number, or a minimum the team is expected to take, is more believable than "unlimited". Our guide to <a href="/posts/remote-work-time-off-and-public-holidays">time off in remote jobs</a> explains why candidates ask.</li>
      </ul>

      <h2>5. Explain the hiring process</h2>
      <p>Only 13 of the 597 employers (2.2%) set out their interview stages in a posting, and 8 mention a take-home task or a work trial. Remote candidates often run several processes at once across time zones. A short list of the stages, roughly how long each takes and whether there is an assignment lets them plan, and shows you have thought about their time. Say whether interviews are on video, in which hours, and whether you pay for any task that takes more than a couple of hours.</p>

      <h2>6. Leave out what a remote candidate reads as a warning</h2>
      <ul>
        <li><strong>Remote in the title, an office in the text.</strong> A post that opens with "remote" and mentions "three days a week in our London office" halfway down loses the candidate's trust in everything else it says. Our board removes listings whose own text requires office attendance, and the phrases it looks for are the same ones candidates spot; our guide to <a href="/posts/how-to-spot-hybrid-bait-in-remote-job-descriptions">hybrid bait in remote job descriptions</a> lists them.</li>
        <li><strong>Anything that looks like a scam.</strong> Interviews over chat apps, equipment bought through a "vendor" and requests for bank details before an offer are the marks of remote job scams, and careful candidates walk away from them. Our guide to <a href="/posts/how-to-spot-fake-remote-job-postings">spotting fake remote job postings</a> shows what candidates are told to check.</li>
        <li><strong>Requirements that are really preferences.</strong> A list of fifteen must-haves filters out careful applicants and keeps confident ones. Separate what the job needs on the first day from what would be nice.</li>
      </ul>

      <h2>A template</h2>
      <p>Put together, a remote post candidates can act on has eight parts:</p>
      <ol>
        <li><strong>Title:</strong> the job, with no location in it unless the location is the point.</li>
        <li><strong>Location line:</strong> where the person may live, as countries, regions or a range of UTC offsets, or "anywhere".</li>
        <li><strong>Pay:</strong> the range you would pay, in the currency you pay in.</li>
        <li><strong>Hours:</strong> core hours with their time zone, or "no fixed hours" if that is true.</li>
        <li><strong>How we work:</strong> written or meeting-heavy, how often people meet in person, and what equipment you provide.</li>
        <li><strong>The work:</strong> what the person will do in their first six months.</li>
        <li><strong>Requirements:</strong> the few things needed on day one, then the nice-to-haves, labelled as such.</li>
        <li><strong>Process:</strong> the stages, roughly how long each takes, and any paid task.</li>
      </ol>
      <p>A typical post we hold runs to about 750 words, so this fits in the space most employers already use. Before you publish, paste the draft into our <a href="/tools/jd-remote-analyzer">remote job description analyzer</a>. It reads a post with the rules our board uses and shows every location, time zone and office condition it finds, which is what a careful candidate will see too. If you are hiring, the <a href="/hiring">hiring page</a> explains how listings reach the board, and our guides to <a href="/posts/assessing-remote-fit-when-hiring">assessing remote fit</a> and <a href="/posts/setting-expectations-distributed-teams">setting expectations in distributed teams</a> cover what comes after the post.</p>
    `,
    faq: [
      {
        q: "Should a remote job post include a salary range?",
        a: "Yes. A growing number of US states require one, the EU's pay transparency directive gives applicants the right to the starting pay or its range before the interview, and candidates use it to decide whether to apply. On getremotejobsnow.com on 26 October 2026, only 20.3% of 2,565 remote listings stated a range.",
      },
      {
        q: "What should the location line of a remote job post say?",
        a: "Where the person may live, as specific countries, regions or a range of UTC offsets, or 'anywhere' if there is no limit. A bare 'Remote' leaves candidates and job board filters guessing; 140 region-locked listings on our board said only that.",
      },
      {
        q: "How do I say a remote role needs time zone overlap?",
        a: "State the hours and the zone, for example at least four hours of overlap with 9:00 to 17:00 UK time. That lets candidates check the fit for themselves. Only 3.0% of the 2,549 posts we measured stated any time zone or hours condition.",
      },
      {
        q: "How wide should a salary range in a job post be?",
        a: "Wide enough to cover the levels you would really hire at, and no wider. On our board the median published US-dollar range has a top about 1.38 times its bottom. A range that doubles from bottom to top is unlikely to be read as a real band.",
      },
    ],
  },

  {
    slug: "remote-work-time-off-and-public-holidays",
    title: "Time Off in Remote Jobs: Leave Laws, Holidays and Global Teams",
    description:
      "Whose rules set your leave when you work remotely, the legal minimums from the US to Japan, how global teams handle public holidays, and unlimited PTO.",
    date: "2026-10-26T08:20:00.000Z",
    author: "Bhargav",
    tags: ["Annual Leave", "Public Holidays", "Unlimited PTO", "Remote Benefits", "Global Teams"],
    readMinutes: 6,
    html: `
      <p>Time off in an office job comes with the building: the company's calendar, the country's public holidays and a leave policy everyone shares. In a remote job across borders, three questions that never came up start to matter. Whose rules decide your minimum leave? Whose public holidays do you get? And what does "unlimited" mean when nobody can see who is at their desk?</p>
      <p>This guide covers the legal minimums in the places remote workers ask about most, how distributed teams handle holidays, and what to ask before you accept an offer. Leave law changes and has many exceptions, so treat the figures as a starting point and check the current rules for your situation. This is not legal advice.</p>

      <h2>Your leave follows your contract and where you work</h2>
      <p>If you are an employee, hired directly or through an employer of record, the leave you are owed is set by the law of the country where you work, plus anything better your contract adds. That generally holds even when the contract names another country's law: in the EU, choosing a different law cannot take away the mandatory protections of the country where you habitually work, and paid annual leave is one of them. Employing you locally so that local minimums apply is a large part of what an employer of record is for.</p>
      <p>If you are an independent contractor, there is usually no statutory paid leave at all. You are paid for work delivered, so time off is unpaid unless you price it into your rate. The <a href="/tools/freelance-rate-calculator">freelance rate calculator</a> builds holidays, public holidays and sick days into a day rate for exactly that reason, and our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a> compares the three arrangements.</p>

      <h2>The legal minimums</h2>
      <p>Statutory paid annual leave for a full-time employee, in the countries our readers ask about most:</p>
      <table>
        <thead><tr><th>Where you work</th><th>Minimum paid annual leave</th><th>Worth knowing</th></tr></thead>
        <tbody>
          <tr><td>United States</td><td>None under federal law</td><td>Set by the employer. Some states and cities require paid sick leave, which is separate.</td></tr>
          <tr><td>Canada (federally regulated employers)</td><td>2 weeks after a year, 3 after 5 years, 4 after 10</td><td>The provinces set their own minimums for most other employers.</td></tr>
          <tr><td>Mexico</td><td>12 days after the first year</td><td>Since 2023, rising with length of service.</td></tr>
          <tr><td>Brazil</td><td>30 calendar days after 12 months</td><td>Paid with an extra third of the normal salary on top.</td></tr>
          <tr><td>United Kingdom</td><td>5.6 weeks (28 days on a five-day week)</td><td>Employers may count bank holidays towards it.</td></tr>
          <tr><td>European Union</td><td>At least 4 weeks</td><td>The floor in EU law. Many member states set more.</td></tr>
          <tr><td>Germany</td><td>20 days on a five-day week</td><td>Contracts often give 25 to 30.</td></tr>
          <tr><td>France</td><td>5 weeks</td><td>Earned at two and a half working days a month.</td></tr>
          <tr><td>Spain</td><td>30 calendar days</td><td>Set by the Workers' Statute.</td></tr>
          <tr><td>Japan</td><td>10 days after 6 months</td><td>Needs 80% attendance and rises with service. Employers must make sure people with 10 or more days take at least 5.</td></tr>
          <tr><td>Australia</td><td>4 weeks</td><td>For employees other than casuals.</td></tr>
        </tbody>
      </table>
      <p>Two things stand out. The United States is the outlier: it is the only country in the table with no statutory minimum, which is why leave varies so much between US offers and why it is worth negotiating there. And the range is wide. An employee in Brazil or France starts with about a month off by law, while one in Mexico or Japan starts with about two weeks.</p>

      <h2>Public holidays: whose calendar?</h2>
      <p>Countries differ in how many days the whole country stops, as well as in leave. The United States has 11 federal holidays, though private employers do not have to give any of them. England and Wales have 8 bank holidays, Germany 9 nationwide plus more that vary by state, and Japan 16 national holidays.</p>
      <p>Most distributed employers solve this the same way: each person takes the public holidays of the country they live in. The postings on our board show the pattern in their benefits sections, with lines such as a number of weeks of paid vacation "plus local statutory holidays". It is fair, and it has side effects worth planning for:</p>
      <ul>
        <li><strong>Colleagues are off when you are not.</strong> Thanksgiving empties a US-heavy team in late November while Europe works on. Golden Week takes much of Japan offline from late April into early May, and Lunar New Year, Diwali and Eid move every year. Expect slower replies and plan handovers around them.</li>
        <li><strong>Some teams add shared days.</strong> A few company-wide days off, when nobody is online, give everyone a real break without a full inbox waiting.</li>
        <li><strong>Some let you swap.</strong> If you do not observe a local holiday, ask whether you can work it and take another day instead.</li>
      </ul>

      <h2>"Unlimited" leave: read the policy, not the label</h2>
      <p>Unlimited or flexible time off is common in remote job ads. Of the 597 employers whose full postings we hold, <strong>148 (24.8%)</strong> promise it somewhere, against <strong>53 (8.9%)</strong> that state a number of days (measured on 26 October 2026). The label sounds generous. Whether it is depends on things the label leaves out.</p>
      <p>What follows is reasoning rather than measurement. Without a balance to use up, people tend to take what they see others take, and on a remote team you rarely see anyone take anything. With no accrual there is nothing to pay out when you leave, which matters in places where earned vacation counts as wages: in California, for example, vested vacation has to be paid out at the end of employment. And in a country with a statutory minimum, unlimited leave still has to deliver at least that minimum.</p>
      <p>So ask three questions. How many days did people on the team take last year? Is there a minimum you are expected to take? How far ahead does leave need approving? A team that answers quickly usually means what its policy says.</p>

      <h2>Working from somewhere else during time off</h2>
      <p>Many remote employees want to stretch a trip by working from abroad for part of it. Some employers put this in writing: postings we have read from employers in London offer four to six weeks a year, and others about 30 days. Others never mention it, and the default may be no, because an employee working from another country can create tax and employment obligations for the employer there. Ask before you book, and keep count of your days. The <a href="/tools/tax-residency-day-counter">tax residency day counter</a> helps, and our guides to <a href="/posts/remote-work-taxes-living-abroad">taxes when you work from abroad</a> and <a href="/posts/digital-nomad-visas-2026">digital nomad visas</a> cover the rules.</p>

      <h2>What to ask before you accept</h2>
      <ol>
        <li>How many paid days off do I get, and does that include public holidays?</li>
        <li>Whose public holidays apply: my country's or the company's?</li>
        <li>If leave is unlimited, how much did the team take last year, and is there an expected minimum?</li>
        <li>How are sick leave and parental leave handled where I live?</li>
        <li>Can I work from abroad for part of the year, and for how long?</li>
      </ol>
      <p>These sit alongside the other questions in our guide to <a href="/posts/before-you-accept-a-remote-job-offer">what to get in writing before you accept a remote offer</a>. If you are still searching, every role on the <a href="/jobs">remote job search</a> shows where it can be done from, which is the first thing that decides whose leave rules you will get.</p>
    `,
    faq: [
      {
        q: "How many vacation days do remote workers get?",
        a: "It depends on the country you work in and on your contract. Employees get at least the legal minimum where they work: four weeks across the EU, 5.6 weeks in the UK, 30 calendar days in Brazil, and nothing under US federal law, where the employer decides. Independent contractors get no statutory paid leave.",
      },
      {
        q: "Do remote employees get their own country's public holidays?",
        a: "Usually, when they are employed in that country directly or through an employer of record. Many distributed companies give each person the public holidays of where they live, sometimes with a few company-wide days on top. Policies differ, so ask before you accept.",
      },
      {
        q: "Is unlimited PTO a good deal?",
        a: "It can be, if people on the team really take time off. Ask how many days colleagues took last year and whether there is an expected minimum. Unlimited policies also leave no balance to pay out when you leave, and where a legal minimum exists the employer still has to provide it.",
      },
      {
        q: "Do contractors get paid time off?",
        a: "No statutory paid leave applies to independent contractors. Time off is unpaid unless the rate covers it, which is why a contractor's day rate should build in holidays, public holidays and sick days.",
      },
    ],
  },
];
