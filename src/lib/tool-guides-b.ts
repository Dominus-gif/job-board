/**
 * Explainers for the time zone, moving and job-search tools.
 */
import type { ToolGuide } from "./tool-guides";

export const GUIDES_B: Record<string, ToolGuide> = {
  "team-timezone-matrix": {
    h1: "Team timezone overlap matrix",
    intro: "Add your teammates' cities and working hours to see who overlaps with whom, and the best time for everyone to meet.",
    html: `
      <h2>How it works</h2>
      <p>Each person's working hours are converted to UTC for the date you pick, using the time zone database built into your browser. That matters twice a year: the US, the UK and the EU change their clocks on different dates, and the southern hemisphere changes the other way, so the same meeting can move by an hour for part of the team. Pick a date in the week you're planning and the offsets follow the rules for that day.</p>
      <p>The grid splits the day into half-hour slots. A slot is filled when a person is working, and turns to the accent colour when everyone is working at once. The "Available" row counts how many people are online in each slot. You can show the grid in any teammate's local time with the menu at the top.</p>

      <h2>The best window</h2>
      <p>The tool looks for the longest run of slots with the largest number of people available. If everyone overlaps, that's your meeting window, shown in each person's local time. If no slot works for everyone, it shows the best partial window and how many people it covers. That's a signal to rotate meeting times or move more work into written updates.</p>

      <h2>The pairwise table</h2>
      <p>The table shows how many hours each pair of people share. It helps you spot who can pair or hand over work directly, and who relies on someone else to pass things on. As a rough guide, four hours or more is comfortable for a collaborative pair, two to four is workable with planning, and under two means most coordination should happen in writing. Our guide to <a href="/posts/timezone-overlap-how-much-you-need">how much overlap a team needs</a> explains where those numbers come from.</p>

      <h2>Tips for spread-out teams</h2>
      <ul>
        <li>Protect a short shared window rather than trying to overlap all day.</li>
        <li>Rotate recurring meetings so the same people don't always take the early or late slot.</li>
        <li>Use the grid for interviews and handovers as well as meetings.</li>
      </ul>
      <p>For a quick one-to-one check, the <a href="/tools/timezone-overlap">timezone overlap finder</a> is faster, and the <a href="/tools/world-time-buddy">world clock and meeting planner</a> lets you scrub through a day across several cities. Our guide to <a href="/posts/working-across-timezones-without-burning-out">working across time zones without burning out</a> covers the habits that make wide gaps sustainable.</p>
    `,
    faq: [
      { q: "How do I find a meeting time for a team in different time zones?", a: "Add each person's city and working hours, pick the date, and the tool finds the longest window when the most people are available, shown in everyone's local time." },
      { q: "Does it handle daylight saving time?", a: "Yes. Offsets come from your browser's time zone database for the date you choose, so clock changes in the US, Europe and elsewhere are applied correctly." },
      { q: "How much overlap does a remote team need?", a: "A common rule of thumb is about four hours for a collaborative team. Teams that work mostly in writing can manage with much less." },
      { q: "Is my team's information saved?", a: "No. The planner runs in your browser and nothing is stored or sent anywhere." },
    ],
    related: [
      { href: "/posts/timezone-overlap-how-much-you-need", label: "The 4-hour overlap rule" },
      { href: "/posts/working-across-timezones-without-burning-out", label: "Working across time zones without burning out" },
      { href: "/tools/world-time-buddy", label: "World clock and meeting planner" },
    ],
  },

  "nomad-visa-checker": {
    h1: "Digital nomad visa eligibility checker",
    intro: "Enter your income to see which of 16 digital nomad and remote-worker visas you may meet the financial requirement for, using 2026 thresholds.",
    html: `
      <div class="callout-warning"><p>This checker covers the income or savings test only. Every programme has other conditions, such as health insurance, a clean criminal record and proof of remote work, and thresholds change, often every year. Confirm the current rules with the authority named for each programme before you apply. This isn't immigration advice.</p></div>

      <h2>How the check works</h2>
      <p>Each programme sets its financial bar in its own currency, often as a multiple of a local wage. The checker converts your income into that currency using annual average exchange rates, compares it with the monthly threshold, and sorts the results so the programmes you meet come first. Programmes that accept savings instead of income, such as Brazil's and Croatia's, also check the savings you enter. Thailand's Destination Thailand Visa has no income test at all, only a savings requirement.</p>
      <p>Annual thresholds are divided by twelve so everything is compared per month. Where a programme sets different bars for different kinds of work, as Malaysia does for tech and non-tech roles, your answer to the tech question picks the right one.</p>

      <h2>The programmes covered</h2>
      <p>The list covers Spain, Portugal, Croatia, Estonia, Greece, Malta, Hungary, Italy and Cyprus in Europe; Costa Rica and Brazil in the Americas; the United Arab Emirates; and Indonesia, Japan, Thailand and Malaysia in Asia-Pacific. Figures were checked against published 2026 requirements in September 2026. Several are tied to local wages: Spain's bar is twice the national minimum wage, Portugal's four times, and Croatia's two and a half times the average net salary, so they rise when those wages do.</p>

      <h2>Reading the results</h2>
      <ul>
        <li><strong>Income meets the bar:</strong> your stated income is at or above the programme's published minimum.</li>
        <li><strong>Savings route may work:</strong> your income falls short, but your savings meet the alternative requirement.</li>
        <li><strong>Below the bar:</strong> the tool shows roughly how far short you are.</li>
      </ul>
      <p>Treat results close to the line as uncertain. Exchange rates move, some programmes want income averaged over several months, and some count gross income while others count net. Several also add a percentage for each family member.</p>

      <h2>Before you apply</h2>
      <ol>
        <li>Get your employer's agreement, in writing, to working from that country.</li>
        <li>Check the current requirements with the named authority.</li>
        <li>Think about tax. A visa lets you stay, but staying long enough can make you tax resident, and the <a href="/tools/tax-residency-day-counter">tax residency day counter</a> helps you keep track.</li>
      </ol>
      <p>Our guides to <a href="/posts/digital-nomad-visas-2026">digital nomad visas</a> and <a href="/posts/remote-work-taxes-living-abroad">taxes when you work from abroad</a> cover the wider picture.</p>
    `,
    faq: [
      { q: "Which digital nomad visa has the lowest income requirement?", a: "Among the programmes in this checker, Brazil's VITEM XIV asks for about 1,500 US dollars a month, and Thailand's Destination Thailand Visa has no income test, only a savings requirement of 500,000 baht." },
      { q: "Do digital nomad visas count gross or net income?", a: "It depends on the programme. Several, such as Estonia's, use gross income, while Cyprus sets its bar on net income. Check the rules for the programme you're interested in." },
      { q: "Can EU citizens use these visas?", a: "EU citizens generally don't need a visa to live in another EU country, and most European digital nomad visas are designed for people from outside the EU and EEA." },
      { q: "How often do these thresholds change?", a: "Often. Many are tied to a local minimum or average wage and update every year, so confirm the current figure with the official authority before applying." },
    ],
    related: [
      { href: "/posts/digital-nomad-visas-2026", label: "Digital nomad visas in 2026" },
      { href: "/posts/remote-work-taxes-living-abroad", label: "Working remotely from abroad: taxes" },
      { href: "/posts/cost-of-living-arbitrage-remote-salary", label: "Cost-of-living arbitrage" },
    ],
  },

  "tax-residency-day-counter": {
    h1: "Tax residency day counter",
    intro: "Log the dates you spend in each country and see your day counts per calendar year and over any rolling 12 months, with a warning before you reach 183 days.",
    html: `
      <h2>Why day counts matter</h2>
      <p>Spending a lot of time in one country can make you tax resident there, whatever your passport says and wherever your employer is based. The 183-day mark is the threshold people hear about most. It appears in many countries' residence rules and in the employment article of most tax treaties, which looks at 183 days in a twelve-month period. It's only one test among several, but it's the easiest one to cross without noticing.</p>

      <h2>How the counter works</h2>
      <p>Add each stay with the country and the first and last day. The counter lists every day you were there and removes duplicates, so overlapping entries don't inflate the total. It then works out two figures for each country:</p>
      <ul>
        <li><strong>Days per calendar year,</strong> which many countries use for their own residence rules.</li>
        <li><strong>The busiest 12 months,</strong> the highest number of days inside any 365-day window. Treaties often use a rolling period like this, so a stay that spans the new year can cross the line even if neither year does on its own.</li>
      </ul>
      <p>The progress bar turns amber at 80% of your warning threshold and red when you reach it. The month-by-month table shows where the days fall in each year.</p>

      <h2>Counting travel days</h2>
      <p>Countries count partial days differently. Some count any day you're present, including arrival and departure. Others count the days you're there at midnight, which in practice leaves out one of the two travel days. Use the arrival and departure switches to match the rule you're working with. If you're not sure, count both, which is the cautious choice.</p>
      <p>You can change the warning threshold as well. Some countries use a lower number of days, and some tests combine days with other ties, such as a home or family in the country.</p>

      <h2>Keeping your records</h2>
      <p>Your stays are saved in this browser, so they're still there when you come back on the same device. Export a CSV to keep a copy or to share with an adviser, and hold on to evidence such as boarding passes and passport stamps. Day counts are arithmetic, not a residency decision. Our guide to <a href="/posts/remote-work-taxes-living-abroad">working remotely from abroad</a> explains the other tests, and the <a href="/tools/nomad-visa-checker">nomad visa checker</a> covers the permission-to-stay side.</p>
    `,
    faq: [
      { q: "What is the 183-day rule?", a: "It's a common threshold for tax residency and for when a country can tax your employment income. Many countries and most tax treaties refer to 183 days, but the exact test and the way days are counted vary." },
      { q: "Do arrival and departure days count?", a: "It depends on the country. Some count any day you're present, while others count days you're present at midnight. The counter lets you include or exclude each travel day." },
      { q: "What's the difference between calendar-year and rolling counts?", a: "A calendar-year count resets on 1 January. A rolling count looks at any 365-day window, so a long stay across the new year can pass 183 days even when neither year does on its own." },
      { q: "Is my travel history stored online?", a: "No. It's saved only in your browser on this device. Export a CSV if you want a backup." },
    ],
    related: [
      { href: "/posts/remote-work-taxes-living-abroad", label: "What happens to your taxes when you work abroad" },
      { href: "/posts/digital-nomad-visas-2026", label: "Digital nomad visas in 2026" },
      { href: "/tools/nomad-visa-checker", label: "Digital nomad visa checker" },
    ],
  },

  "company-remote-score": {
    h1: "Company remote hiring score",
    intro: "Look up an employer to see how many of its roles are open worldwide, where it hires, whether it publishes pay and how actively it's posting.",
    html: `
      <h2>What the score measures</h2>
      <p>The score is built only from the listings on our board, so it measures how a company is hiring right now, not how it treats staff or what its policy documents say. It adds up four parts, out of 100:</p>
      <ul>
        <li><strong>Location freedom, up to 50 points:</strong> the share of the company's open roles that pass our work-from-anywhere filter.</li>
        <li><strong>Hiring reach, up to 20 points:</strong> how many regions its roles are open to. Worldwide roles count as two regions, and four or more earns the full 20.</li>
        <li><strong>Pay transparency, up to 15 points:</strong> the share of its listings that publish a salary.</li>
        <li><strong>Hiring activity, up to 15 points:</strong> the share of its listings posted in the last 30 days.</li>
      </ul>
      <p>Location freedom carries the most weight because it's the question people outside a company's home country care about most. Each part is shown separately, so you can ignore the ones that don't matter to you.</p>

      <h2>Who is included</h2>
      <p>Only companies with at least three open roles on our board are scored. With fewer, a single listing swings every figure, and the score would describe one job rather than the employer. Regions come from each listing's location text, including city names.</p>

      <h2>What it can't tell you</h2>
      <ul>
        <li><strong>Culture.</strong> A company can hire worldwide and still run on long meetings in one time zone. Our guide to <a href="/posts/how-to-tell-if-a-company-is-truly-distributed">telling whether a company is truly distributed</a> covers the signals worth checking.</li>
        <li><strong>The full picture.</strong> We only see the roles we list, and some employers advertise elsewhere too.</li>
        <li><strong>Stability.</strong> Scores change as roles open and close, often daily.</li>
      </ul>

      <h2>Using it</h2>
      <p>Start with the leaderboard to find employers that hire worldwide, then open a company to see where its roles are and how fresh they are. If most of a company's listings are more than a month old, check each role on its own careers page before you apply. Our article on the <a href="/posts/most-remote-friendly-companies-hiring-worldwide">most remote-friendly companies</a> looks at the top employers in more depth, and every company links to its page in our <a href="/companies">company directory</a>.</p>
    `,
    faq: [
      { q: "How is the company remote score calculated?", a: "It combines four parts from a company's current listings on our board: the share of roles open worldwide (up to 50 points), how many regions it hires in (up to 20), the share of listings that publish pay (up to 15) and the share posted in the last 30 days (up to 15)." },
      { q: "Why isn't a company listed?", a: "Only employers with at least three open roles on our board are scored, so the figures aren't driven by a single listing." },
      { q: "Does a high score mean a company is a good remote employer?", a: "It means the company is currently hiring widely across locations. It doesn't measure culture, pay levels or working hours, so research those separately." },
      { q: "How often does the score change?", a: "Whenever the board is rebuilt, which happens daily, so scores move as roles open and close." },
    ],
    related: [
      { href: "/posts/most-remote-friendly-companies-hiring-worldwide", label: "The most remote-friendly companies" },
      { href: "/posts/how-to-tell-if-a-company-is-truly-distributed", label: "Is a company truly distributed?" },
      { href: "/companies", label: "Company directory" },
    ],
  },

  "application-tracker": {
    h1: "Job application tracker",
    intro: "Keep every application, status and follow-up date in one place. It's private: everything stays in your browser, with no account.",
    html: `
      <h2>A tracker built for follow-through</h2>
      <p>Most job search spreadsheets fail because they record too much and prompt too little. This tracker keeps the few fields that change what you do next: the company, the role, where you are in the process, the next action and the date it's due. Everything else is optional.</p>
      <ul>
        <li><strong>Pipeline counts</strong> show how many applications sit at each stage. Select a stage to filter the list.</li>
        <li><strong>Due follow-ups</strong> come first and are flagged when they're overdue, so nothing slips.</li>
        <li><strong>Response rate</strong> shows what share of sent applications reached screening, interviews or an offer. If it stays low for a few weeks, the problem is usually your targeting or the first lines of your CV.</li>
      </ul>

      <h2>The status flow</h2>
      <p>Six statuses cover most searches: Saved, Applied, Screening, Interviewing, Offer and Closed. Move an application to Closed when it's rejected, withdrawn, or hasn't had a reply after your final follow-up. Closed applications drop to the bottom, which keeps the list focused on what's still live.</p>
      <p>A rhythm that works for most people is a short follow-up about a week after applying, a final note about a week later, and then Closed. New applications get a follow-up date a week out by default.</p>

      <h2>Your data stays with you</h2>
      <p>The tracker saves to your browser's local storage on this device. Nothing is uploaded, and we can't see it. That also means clearing your browsing data removes it, so use <strong>Export CSV</strong> now and then to keep a copy. The file opens in any spreadsheet app, and <strong>Import CSV</strong> brings it back on this device or another. On export, any cell that a spreadsheet might treat as a formula is made safe.</p>

      <h2>Getting more from it</h2>
      <p>Save a copy of each job description when you apply, because postings often disappear before the interview. Our <a href="/posts/remote-job-application-tracker-minimal-system">minimal tracker guide</a> explains the thinking behind each field, and the <a href="/posts/30-minute-remote-job-search-routine">30-minute daily routine</a> shows how to fit the tracker into a search you can sustain.</p>
    `,
    faq: [
      { q: "Is this job application tracker free?", a: "Yes. It's free, needs no account, and runs entirely in your browser." },
      { q: "Where is my application data stored?", a: "In your browser's local storage on this device. It isn't uploaded anywhere, so export a CSV regularly if you want a backup or plan to switch devices." },
      { q: "Can I import my existing spreadsheet?", a: "Yes, as a CSV file with column headings such as company, role, link, applied, status, nextAction and nextDate. Export once first to see the exact format." },
      { q: "When should I follow up on an application?", a: "A common rhythm is one short follow-up about a week after applying and a final note about a week later, then mark the application as closed." },
    ],
    related: [
      { href: "/posts/remote-job-application-tracker-minimal-system", label: "A simple application tracker system" },
      { href: "/posts/30-minute-remote-job-search-routine", label: "A 30-minute daily search routine" },
      { href: "/tools/ats-keyword-checker", label: "ATS keyword checker" },
    ],
  },

  "ats-keyword-checker": {
    h1: "ATS keyword checker",
    intro: "Compare your CV with a job description to see which skills and keywords the posting relies on, and which ones your CV is missing.",
    html: `
      <h2>Why keywords matter</h2>
      <p>Many employers use applicant-tracking systems, and recruiters often search them by keyword. Even when a person reads every application, the first scan is quick. If a posting asks for "stakeholder management" and your CV says "worked with partners", a recruiter searching for the posting's words may never find you. Using the same terms, for skills you really have, is one of the simplest improvements you can make.</p>

      <h2>How the checker works</h2>
      <ol>
        <li><strong>It finds the terms the posting leans on.</strong> Known skills and tools are matched first, including common aliases, so "k8s" counts as Kubernetes and "PostgreSQL" as Postgres. Then it counts the words and two-word phrases the posting repeats, ignoring filler words.</li>
        <li><strong>It weights them by frequency.</strong> A term that appears five times matters more to that employer than one that appears once, and repeated phrases get extra weight.</li>
        <li><strong>It checks your CV.</strong> Each term is marked as found or missing, with light matching so "managed" also covers "manage".</li>
      </ol>
      <p>The coverage score is the share of that weight your CV covers. The list shows every term with its weight as a bar and whether you have it. Filter to missing terms to see what to work on.</p>

      <h2>Using the results</h2>
      <ul>
        <li><strong>Add what's true.</strong> If you have a skill the posting names, use the posting's wording, ideally in your summary or in the bullet where you used it.</li>
        <li><strong>Don't stuff keywords.</strong> A list of terms with no context reads badly, and a person reads your CV in the end.</li>
        <li><strong>Ignore the noise.</strong> Some repeated words are just the company's name or product.</li>
        <li><strong>Aim for a strong match, not 100%.</strong> Good applications usually cover the main skills and most of the rest.</li>
      </ul>

      <h2>What it isn't</h2>
      <p>This is a transparent frequency check, not a copy of any vendor's ranking system, and applicant-tracking systems differ widely in how they search and filter. Use it to spot gaps. Your text never leaves your browser. For more on how applications are read, see <a href="/posts/what-recruiters-see-when-you-apply-remotely">what recruiters see when you apply</a>, and keep track of what you send with the <a href="/tools/application-tracker">application tracker</a>.</p>
    `,
    faq: [
      { q: "What is an ATS keyword checker?", a: "It compares a job description with your CV and shows which important terms from the posting your CV includes or misses, so you can tailor your application." },
      { q: "Is my CV uploaded anywhere?", a: "No. The comparison runs in your browser, and nothing you paste is sent to our servers or stored." },
      { q: "What is a good keyword match score?", a: "There's no fixed pass mark. Aim to cover the main skills and most repeated terms that genuinely apply to you, rather than chasing 100 percent." },
      { q: "Should I copy the job description's wording?", a: "Use the same words for skills and experience you really have. Don't add terms you couldn't back up in an interview." },
    ],
    related: [
      { href: "/posts/what-recruiters-see-when-you-apply-remotely", label: "What recruiters see when you apply" },
      { href: "/tools/application-tracker", label: "Job application tracker" },
      { href: "/posts/remote-career-change-guide", label: "Changing careers into remote work" },
    ],
  },

  "search-link-builder": {
    h1: "Remote job search link builder",
    intro: "Build a saved search for our job board, with your keywords, category, location, job type and pay floor, then open, bookmark or share it.",
    html: `
      <h2>What it does</h2>
      <p>Our <a href="/jobs">job search</a> keeps every filter in the page address. That means any search can be bookmarked, shared or pinned, and it shows the latest matching roles each time you open it. This builder puts all the filters on one screen, shows the link it creates, and lets you copy it or open it straight away.</p>

      <h2>The filters</h2>
      <ul>
        <li><strong>Keywords</strong> match job titles, company names, categories and skills.</li>
        <li><strong>Location</strong> chooses between roles open to anyone, anywhere, roles tied to a region, or both. When region-locked roles are included, you can narrow to one region.</li>
        <li><strong>Category and job type</strong> narrow by field and by full-time, part-time or contract work.</li>
        <li><strong>Minimum pay</strong> keeps roles whose published pay reaches the level you choose. Roles without published pay drop out when you set it, which is why the pay-shown switch turns on too.</li>
        <li><strong>Order</strong> sorts by newest first, best match, or highest published pay.</li>
      </ul>
      <p>Newest first is the default, because early applications tend to be read before a shortlist forms.</p>

      <h2>Ways to use your link</h2>
      <ol>
        <li><strong>Bookmark it</strong> and open it at the same time each day as part of your routine.</li>
        <li><strong>Keep a few:</strong> one wide search for everything in your field, and one narrow search for your ideal role.</li>
        <li><strong>Share it</strong> with a friend or a career coach, so they see exactly what you're seeing.</li>
      </ol>
      <p>If you'd rather not visit the site, our <a href="/rss-feeds">RSS feeds</a> send new roles in a category to your feed reader. For a routine built around a saved search, see <a href="/posts/30-minute-remote-job-search-routine">the 30-minute daily routine</a>, and for roles already filtered for location freedom, the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a>.</p>
    `,
    faq: [
      { q: "Can I save a search on this job board?", a: "Yes. Every filter is stored in the page address, so bookmarking the results page saves the search. This builder creates that link for you." },
      { q: "What does work from anywhere mean in the filter?", a: "It shows only roles that passed our worldwide filter, meaning we found no country, region, timezone or work-authorisation restriction in the listing." },
      { q: "Why do roles disappear when I set a minimum salary?", a: "The salary filter needs published pay to compare against, so listings without published pay are left out." },
      { q: "Can I follow new jobs without visiting the site?", a: "Yes. Our RSS feeds deliver new roles in a category to any feed reader." },
    ],
    related: [
      { href: "/posts/30-minute-remote-job-search-routine", label: "A 30-minute daily search routine" },
      { href: "/rss-feeds", label: "Remote job RSS feeds" },
      { href: "/tools/application-tracker", label: "Job application tracker" },
    ],
  },
};
