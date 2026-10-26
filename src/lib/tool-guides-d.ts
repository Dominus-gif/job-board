/**
 * Explainers for the four original tools: the salary converter, the timezone
 * overlap finder, the world clock and the password generator.
 *
 * They were the site's first tools and shipped as a widget and two lines of
 * text, which made them the thinnest pages in the sitemap (66 to 134 words).
 * Moving them onto the shared /tools/[slug] page gives them the same explainer,
 * FAQ and related reading as every other tool.
 *
 * Figures quoted here come from the widgets themselves (the converter's 2,080
 * hours, the password meter's thresholds), and the clock-change dates were
 * checked for 2026 and 2027 on 26 October 2026.
 */
import type { ToolGuide } from "./tool-guides";

export const GUIDES_D: Record<string, ToolGuide> = {
  "remote-salary-converter": {
    h1: "Remote salary converter",
    metaTitle: "Remote Salary Converter (USD, EUR, GBP)",
    intro:
      "Convert an annual salary between US dollars, euros, pounds, Canadian and Australian dollars and Indian rupees, with the monthly and hourly figures alongside, so two offers can be read on the same terms.",
    html: `
      <h2>How the conversion works</h2>
      <p>Every amount goes through US dollars. The converter divides your figure by the rate for the currency you start in and multiplies by the rate for the one you want, using the World Bank's 2025 annual average exchange rates, the same table our other pay tools use. Annual averages are deliberate. A salary is paid over a year, so the rate that matters is the typical one across that year rather than whatever the market did this morning. Before you quote a figure in a negotiation, check the day's rate as well, because a currency can move several percent in a few months.</p>
      <p>The monthly figure is the annual one divided by twelve. The hourly figure divides by 2,080, the common US convention of 40 hours a week for 52 weeks. On those rules, $120,000 a year, the converter's starting figure, comes to $10,000 a month and about $58 an hour.</p>

      <h2>What a converted salary does not tell you</h2>
      <p>A converted number answers one question: what this salary is worth in another currency today. It leaves out four things that often matter more when you compare remote offers.</p>
      <ul>
        <li><strong>What the money buys.</strong> The same dollar amount goes much further in some countries than others. The <a href="/tools/salary-purchasing-power">salary purchasing power calculator</a> adjusts for price levels, which a currency conversion cannot.</li>
        <li><strong>How many payments there are.</strong> Several European countries pay salaries in fourteen instalments or add a legally required holiday allowance, so an annual figure and a monthly one do not always divide by twelve. Our guide to <a href="/posts/hourly-vs-annual-remote-pay-converting-offers">converting hourly and annual pay</a> covers the countries where this applies.</li>
        <li><strong>What comes out before you see it.</strong> Tax and social contributions differ a great deal between countries and between employees and contractors. Two offers that convert to the same gross figure can leave you with very different take-home pay.</li>
        <li><strong>Who carries the currency risk.</strong> If you are paid in dollars and spend in euros, every move in the exchange rate changes your real pay. As an illustration, a 10% fall in the dollar against the euro cuts the euro value of a dollar salary by about 10%, with no change to your contract.</li>
      </ul>

      <h2>Using it on a real offer</h2>
      <ol>
        <li>Convert the offer into the currency you spend, at the annual average and at today's rate. If the two differ by more than a few percent, you are looking at currency risk you should discuss.</li>
        <li>Ask which currency you will be paid in and how often. A salary quoted in dollars but paid in your local currency at a fixed rate behaves differently from one paid in dollars.</li>
        <li>Put both offers into the <a href="/tools/offer-comparator">remote offer comparator</a>, which adds benefits and costs to the comparison.</li>
      </ol>
      <p>If the offer is a contract rather than a job, the hourly figure here is a starting point and no more: a contractor pays for things an employer would normally cover, which our <a href="/tools/freelance-rate-calculator">freelance rate calculator</a> works through.</p>
    `,
    faq: [
      { q: "Which exchange rates does the salary converter use?", a: "The World Bank's 2025 annual average rates, converted through US dollars. Annual averages suit salaries because pay is spread over a year, but check the current rate before quoting a number in a negotiation." },
      { q: "How is the hourly rate calculated?", a: "The annual salary is divided by 2,080, which is 40 hours a week for 52 weeks. That convention assumes every week is paid, so for work paid only by the hour a realistic working year is shorter." },
      { q: "Does converting a salary show what it is worth in another country?", a: "No. It shows the value in another currency, not what the money buys there. Price levels, taxes and the number of salary payments a year all change what an offer is worth to you." },
      { q: "Should I ask to be paid in US dollars?", a: "Only if your own costs are in dollars or you are comfortable with exchange-rate risk. Being paid in a currency you do not spend means your real pay moves whenever the rate does." },
    ],
    related: [
      { href: "/posts/hourly-vs-annual-remote-pay-converting-offers", label: "Hourly vs annual remote pay" },
      { href: "/posts/what-a-100k-remote-salary-really-buys", label: "What a $100k remote salary really buys" },
      { href: "/tools/salary-purchasing-power", label: "Salary purchasing power calculator" },
    ],
  },

  "timezone-overlap": {
    h1: "Timezone overlap finder",
    metaTitle: "Timezone Overlap Finder for Remote Work",
    intro:
      "Pick where you are and where the team is to see how many 9-to-5 hours you share, and when they fall on your clock, with daylight saving applied for today.",
    html: `
      <h2>How it works</h2>
      <p>The finder takes a 9:00 to 17:00 working day in each place and works out how much of it the two have in common, then shows that window in your local time. Offsets come from the time zone database in your browser, evaluated on today's date, so the answer reflects the clocks as they are this week rather than a fixed table.</p>
      <p>It also checks a day either side, because a team whose morning falls on your previous evening still overlaps with you. Los Angeles and Sydney are the classic case: 3pm in Los Angeles is 9am the next day in Sydney, so the two share about two working hours even though they sit most of a day apart.</p>

      <h2>Why the date matters</h2>
      <p>Clocks do not all change on the same day, and that moves the overlap for part of the year.</p>
      <ul>
        <li><strong>Europe and the US change a week or more apart.</strong> In 2026 Europe went back an hour on 25 October and the US follows on 1 November, so for that week New York is four hours behind London instead of five. In spring 2027 the US moves forward on 14 March and Europe on 28 March, which opens the same four-hour gap for two weeks.</li>
        <li><strong>The southern hemisphere changes the other way.</strong> Sydney is ten hours ahead of UTC from April to October and eleven from October to April, while London moves between UTC and one hour ahead. Depending on the time of year, Sydney is nine, ten or eleven hours ahead of London.</li>
        <li><strong>Some places never change.</strong> India, Singapore and Dubai keep the same offset all year, so their gap with Europe or the US shifts by an hour whenever the other side's clocks move.</li>
      </ul>
      <p>If you are planning something that recurs, check the overlap again after each clock change, or use the <a href="/tools/team-timezone-matrix">team timezone matrix</a>, which lets you pick the date.</p>

      <h2>What the number means for a job</h2>
      <p>As a rough guide, four or more shared hours is comfortable for a team that works closely together, two to four is workable with some planning, and under two means most of the coordination has to happen in writing. Our guide to <a href="/posts/timezone-overlap-how-much-you-need">how much overlap a remote team needs</a> explains where those thresholds come from and how teams get by with less.</p>
      <p>Use the finder before you apply as well as after an offer. A listing that asks for "four hours of overlap with Eastern time" is a time zone requirement in all but name, and the <a href="/tools/jd-remote-analyzer">remote job description analyzer</a> picks those clauses out of a posting. If the overlap you would have is uncomfortable, say so early; it is a much easier conversation at the first interview than in the first month.</p>
    `,
    faq: [
      { q: "Does the timezone overlap finder handle daylight saving time?", a: "Yes. It reads offsets from your browser's time zone database for today's date, so clock changes in Europe, North America and Australia are applied as they stand this week." },
      { q: "How many hours of overlap does a remote job need?", a: "Four or more shared hours is comfortable for a closely collaborating team, two to four is workable with planning, and under two means most coordination happens in writing." },
      { q: "Why is the gap between New York and London sometimes four hours?", a: "Because Europe and the US change their clocks on different dates. In 2026 Europe moved back on 25 October and the US on 1 November, so for that week the gap is four hours instead of five." },
      { q: "Can two cities almost a day apart still overlap?", a: "Yes, when one city's morning falls on the other's previous afternoon. Los Angeles and Sydney share about two working hours: 3pm to 5pm in Los Angeles is 9am to 11am the next day in Sydney." },
    ],
    related: [
      { href: "/posts/timezone-overlap-how-much-you-need", label: "How much timezone overlap you need" },
      { href: "/posts/remote-job-interviews-across-time-zones", label: "Remote job interviews across time zones" },
      { href: "/tools/team-timezone-matrix", label: "Team timezone matrix" },
    ],
  },

  "world-time-buddy": {
    h1: "World clock and meeting planner",
    metaTitle: "World Clock & Meeting Planner — Compare Time Zones",
    intro:
      "See the time in several cities side by side, slide to any time of day to see it everywhere at once, and find a slot that lands inside everyone's working day.",
    html: `
      <h2>How it works</h2>
      <p>The planner opens with five cities across North America, Europe and Asia. If your own time zone, detected from your device, is not one of them, it is added at the top and marked as yours, and every other row shows its difference from you. Each row runs through a full day in that city with the usual 9-to-5 working hours shaded, so you can see at a glance where the working days line up. Drag the slider to any time, in 15-minute steps, and every row shows the matching local time; a button brings you back to now. Add cities from a list of 28 or remove the ones you do not need.</p>
      <p>Offsets come from your browser's time zone database for the current date, so daylight saving is applied the way it is right now. Nothing you add is stored or sent anywhere; the planner runs entirely on your device and starts fresh each visit.</p>

      <h2>Planning a meeting across time zones</h2>
      <ol>
        <li>Add every city with someone in the meeting, including your own.</li>
        <li>Look for the hours that are shaded in every row. Those are the slots inside everyone's working day.</li>
        <li>If there are none, choose the slot that pushes the fewest people outside their day, and rotate it for recurring meetings so the same people do not always take the early or late end.</li>
        <li>Send the invitation from a calendar that attaches the time zone, so each person sees it in their own time.</li>
      </ol>
      <p>For three or more people with different working hours, the <a href="/tools/team-timezone-matrix">team timezone matrix</a> does the search for you and lets you pick a future date, which helps around clock changes.</p>

      <h2>Three things that catch people out</h2>
      <ul>
        <li><strong>The date as well as the hour.</strong> A Monday-morning meeting in New York is Monday evening in Singapore and Tuesday in Auckland. When you slide to a time, read the day as well as the hour in each row.</li>
        <li><strong>Half-hour offsets.</strong> India is five and a half hours ahead of UTC, and the hour boundaries there fall on the half hour against most of the world. A meeting "on the hour" in London starts at half past in Bengaluru.</li>
        <li><strong>Clock-change weeks.</strong> Europe and the US change their clocks on different Sundays: in 2026, Europe on 25 October and the US on 1 November. For that week every transatlantic meeting moves by an hour for one side. Our guide to <a href="/posts/working-across-timezones-without-burning-out">working across time zones without burning out</a> has more on keeping recurring meetings sane.</li>
      </ul>
      <p>If you are weighing a job in another time zone rather than a single meeting, the <a href="/tools/timezone-overlap">timezone overlap finder</a> gives the shared working hours as one number.</p>
    `,
    faq: [
      { q: "How do I find a meeting time across several time zones?", a: "Add each person's city, then look for the hours shaded as working time in every row. If none exist, pick the slot that puts the fewest people outside their working day and rotate it for recurring meetings." },
      { q: "Does the world clock account for daylight saving time?", a: "Yes. It uses your browser's time zone database for the current date, so each city shows its local time with any daylight saving in effect today." },
      { q: "Why does one city show a different day?", a: "Cities far enough apart can be on different calendar days. Monday morning in New York is already Tuesday in Auckland, so check the day as well as the hour when you choose a time." },
      { q: "Is the list of cities I add saved?", a: "No. The planner runs in your browser, stores nothing and sends nothing, so it starts with the default cities each time you open it." },
    ],
    related: [
      { href: "/posts/working-across-timezones-without-burning-out", label: "Working across time zones without burning out" },
      { href: "/posts/remote-job-interviews-across-time-zones", label: "Interviewing across time zones" },
      { href: "/tools/team-timezone-matrix", label: "Team timezone matrix" },
    ],
  },

  "password-generator": {
    h1: "Strong password generator",
    metaTitle: "Strong Password Generator (Free & Secure)",
    intro:
      "Create a random password in your browser with the length and character types you choose. Nothing is stored, logged or sent anywhere.",
    html: `
      <h2>Why a job site has a password tool</h2>
      <p>Applying for jobs means creating a lot of accounts. Many employers make you register on their own hiring system before you can apply, so an active search can leave you with dozens of logins on sites you will never visit again. Each one holds your CV, your contact details and often your work history. Reusing a password across them means one breach exposes all of them, and recruitment scams are well aware that job seekers are busy, hopeful and logging in everywhere. A unique, random password for each account, kept in a password manager, limits the damage any single breach can do.</p>

      <h2>How the generator works</h2>
      <p>Characters are drawn with your browser's cryptographic random number generator, the same source browsers use for encryption keys, and every character in the pool is equally likely. By default it leaves out characters that are easy to confuse when you have to read or type a password: a lower-case l, the capital letters I and O, and the digits 0 and 1. You can put them back with the look-alike option.</p>
      <p>The strength meter estimates entropy, the number of guesses an attacker would need expressed in bits. It multiplies the length by the bits each character adds, which depends on how many characters are in the pool. With all four character types on, the pool has 80 characters and each one adds about 6.3 bits. So:</p>
      <ul>
        <li>8 characters is about 51 bits, which the meter rates <strong>Fair</strong>.</li>
        <li>12 characters is about 76 bits, rated <strong>Strong</strong>.</li>
        <li>16 characters, the default, is about 101 bits, rated <strong>Very strong</strong>.</li>
      </ul>
      <p>The meter calls anything under 45 bits weak, 45 to 70 fair, 70 to 100 strong and 100 or more very strong. Those figures only hold for a password generated at random. A password a person chooses, even a long one, is far easier to guess than its length suggests, because people choose words, names and patterns.</p>

      <h2>Length matters more than symbols</h2>
      <p>Each extra character multiplies the number of possible passwords by the size of the pool, which is why length does more for strength than any mix of character types. The US standards body NIST says the same in the 2025 revision of its digital identity guidelines: it sets 15 characters as the minimum for a password that is the only thing protecting an account, tells services not to demand particular mixes of letters, numbers and symbols, and advises against forcing people to change passwords on a schedule. If a site rejects symbols, switch them off and add a few characters instead.</p>

      <h2>Good habits for a job search</h2>
      <ul>
        <li>Use a password manager, so every account can have its own random password without you remembering any of them.</li>
        <li>Turn on two-step sign-in for your email first. It is the account that can reset every other one.</li>
        <li>Never give a recruiter a password or a sign-in code. No genuine employer needs access to your personal accounts, and a request for one is a strong sign of a scam. Our guide to <a href="/posts/how-to-spot-fake-remote-job-postings">spotting fake remote job postings</a> covers the other warning signs, and the <a href="/tools/fake-job-checker">fake job checker</a> scores a suspicious offer.</li>
      </ul>
    `,
    faq: [
      { q: "How long should a strong password be?", a: "At least 15 to 16 characters for a password that protects an account on its own. NIST's 2025 guidelines set 15 characters as the minimum in that case, and this generator defaults to 16." },
      { q: "Is it safe to generate a password on a website?", a: "This generator runs entirely in your browser using its cryptographic random number generator. The password is never stored, logged or sent anywhere, and it disappears when you leave the page." },
      { q: "Do I need symbols in my password?", a: "They help a little, but length helps more. If a site rejects symbols, turn them off and add a few characters; 16 random letters and numbers is still a very strong password." },
      { q: "What does the strength meter measure?", a: "Entropy, in bits: the length multiplied by the bits each character adds, which depends on how many characters you allow. It is accurate for random passwords like these, not for ones a person makes up." },
    ],
    related: [
      { href: "/posts/how-to-spot-fake-remote-job-postings", label: "How to spot fake remote job postings" },
      { href: "/posts/remote-job-scams-how-they-make-money", label: "How remote job scams make money" },
      { href: "/tools/fake-job-checker", label: "Fake job checker" },
    ],
  },
};
