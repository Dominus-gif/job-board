/**
 * Explainers for the freelance rate calculator, the job title finder and the
 * remote field explorer (2026-10-20). The worked example in the rate guide is
 * asserted in tool-guides-c.test.ts against the calculator's own function, so
 * the article cannot drift from what the widget computes.
 */
import type { ToolGuide } from "./tool-guides";

export const GUIDES_C: Record<string, ToolGuide> = {
  "freelance-rate-calculator": {
    h1: "Freelance day rate calculator",
    intro:
      "Enter the salary you want to match and what an employer used to cover for you. The calculator spreads it over the days you can actually bill and gives you the day and hourly rate to charge.",
    html: `
      <h2>Why a freelance rate is not salary divided by working hours</h2>
      <p>The most common mistake in pricing freelance work is to divide a salary by the hours in a year. It feels fair and it undercharges badly, because a salary was never the whole cost of employing you. Your employer also paid contributions on top of it, provided benefits, bought your equipment, and paid you on days you did not work at all: holidays, public holidays, sick days, and the slow weeks between projects.</p>
      <p>As a freelancer you pay for all of that yourself, and you only earn on the days a client is billed. The calculator adds those costs back and divides by billable days rather than calendar days.</p>

      <h2>How the rate is worked out</h2>
      <ol>
        <li><strong>The amount to cover</strong> is the salary you want to match, plus the employer contributions you now pay yourself, health cover, retirement saving and business expenses.</li>
        <li><strong>Working days</strong> start from 260 weekdays a year, less your holiday, public holidays and sick days.</li>
        <li><strong>Billable days</strong> are the share of working days a client actually pays for. The rest goes on finding work, admin and the gaps between contracts.</li>
        <li><strong>Day rate</strong> is the amount to cover divided by billable days. The hourly rate divides that by the hours in a billable day.</li>
      </ol>

      <h2>A worked example</h2>
      <p>With the calculator's starting values (a $90,000 salary, 10% employer contributions, $6,000 of health cover, 5% retirement saving, $5,000 of expenses, 40 days off and 70% of the remaining days billed) the amount to cover is $114,500. That is spread over 154 billable days, which gives a day rate of about <strong>$744</strong>, or <strong>$93 an hour</strong>.</p>
      <p>Dividing the salary by 260 weekdays would have suggested $346 a day. The real figure is about 2.1 times that, which is why the shortcut leaves new freelancers short.</p>

      <h2>The number that matters most: how many days you bill</h2>
      <p>Utilisation moves the rate more than anything else. In the example above, billing 85% of working days brings the day rate down to about $612; billing 55%, which is common in a first year while you build a client list, pushes it up to about $946. Be honest with yourself here. Most freelancers bill well under 100% of their days, and planning as if you will fill every one is the usual way a rate turns out too low.</p>

      <h2>What the calculator leaves out</h2>
      <ul>
        <li><strong>Income tax.</strong> It depends on your country and how you are set up, and it applies to an employee's salary too, so it is left out of both sides of the comparison.</li>
        <li><strong>Currency conversion.</strong> The currency is a label. Enter amounts in the currency you will invoice in.</li>
        <li><strong>The market rate.</strong> This tells you the minimum that covers your costs, not what clients in your field will pay. If the market rate is far above it, charge the market rate; if it is below, the gap is worth knowing before you go freelance.</li>
      </ul>
      <p>To compare a contract against a salaried offer side by side, use the <a href="/tools/offer-comparator">offer comparator</a>. Our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a> explains the arrangements behind the numbers.</p>
    `,
    faq: [
      {
        q: "How do I calculate my freelance day rate?",
        a: "Add up what you need to cover in a year (the salary you want, plus the contributions, benefits and expenses an employer used to pay), then divide by the days you can realistically bill, not by all the weekdays in the year. Divide the day rate by your billable hours per day for an hourly rate.",
      },
      {
        q: "Why should a freelance rate be higher than a salary?",
        a: "Because an employer paid for more than your salary: contributions on top of it, benefits, equipment, and every day off. A freelancer covers all of that and only earns on billed days, so the day rate usually needs to be about twice the salary divided by 260, sometimes more.",
      },
      {
        q: "What utilisation rate should I assume as a freelancer?",
        a: "Most freelancers bill well under 100% of their working days. Around 55% is common while building a client list, around 70% once established, and 85% or more is realistic only on a long single contract. Planning on full utilisation is the usual cause of undercharging.",
      },
      {
        q: "Does the calculator include income tax?",
        a: "No. Income tax depends on where you live and how you set up, and it applies to an employee's salary as well, so it is left out of both sides. The result is the amount to bill before your own income tax.",
      },
    ],
    related: [
      { href: "/tools/offer-comparator", label: "Remote job offer comparison calculator" },
      { href: "/posts/contractor-employee-or-employer-of-record", label: "Contractor, employee or employer of record?" },
      { href: "/posts/hourly-vs-annual-remote-pay-converting-offers", label: "Hourly vs annual remote pay" },
    ],
  },

  "job-title-finder": {
    h1: "Remote job title finder",
    intro:
      "Type the job you do in your own words. The finder shows the titles employers on our board actually use for that work, with live counts, so you search for, and write your CV around, the words that match.",
    html: `
      <h2>Why the title you search for matters</h2>
      <p>Job boards, recruiters' searches and applicant tracking systems all match on words. If you search for a title employers have stopped using, you see a fraction of the openings; if your CV and profile use it, recruiters searching for the current title do not find you. The work is often the same. The words are not.</p>
      <p>The clearest example on our board is design. Type "UX designer" above and compare it with "product designer": the UX work is still being hired for, almost entirely under the product designer title. The same pattern shows up for programmers (software engineer), salespeople (account executive) and customer service (customer success and support). Our guide to <a href="/posts/linkedin-for-remote-jobs">LinkedIn for remote jobs</a> covers how to use this on your profile.</p>

      <h2>How titles are grouped</h2>
      <p>The finder reads every title on the board and reduces it to the job it names, so that variations count together:</p>
      <ul>
        <li><strong>Levels at the start are set aside.</strong> "Senior Software Engineer" and "Software Engineer" count as one title. "Design Lead" keeps its meaning, because the level is part of the name there.</li>
        <li><strong>Team names are set aside.</strong> "Software Engineer, Billing" counts as Software Engineer.</li>
        <li><strong>A role named after a comma is kept.</strong> "Director, Product Marketing" counts as Product Marketing Director, not just Director.</li>
        <li><strong>Locations in brackets are dropped</strong>, so "(Remote, US)" does not split a title in two.</li>
      </ul>
      <p>Each result links to a search of the live board for that title. The count beside it is the number of listings, and "anywhere" is how many of them carry no country, region or time-zone condition.</p>

      <h2>How to use what you find</h2>
      <ol>
        <li><strong>Search under every title that fits.</strong> If two titles describe your work, run both searches. They often turn up different employers.</li>
        <li><strong>Mirror the employer's title in your headline,</strong> where searches look, and keep your own framing for the summary, where a person reads.</li>
        <li><strong>Check the words in each posting too.</strong> A title gets you found; the description tells you what the employer means by it. The <a href="/tools/ats-keyword-checker">ATS keyword checker</a> compares your CV with a specific posting.</li>
      </ol>

      <h2>What it cannot tell you</h2>
      <p>The counts are a snapshot of one board, rebuilt nightly, so they show which titles are common here today rather than across the whole market. A rare title is not necessarily a rare job: some employers use unusual titles for ordinary work. And the suggestions for a search are a starting point, with live counts attached so you can see when one has nothing behind it.</p>
    `,
    faq: [
      {
        q: "Why do employers use different job titles for the same work?",
        a: "Titles drift as fields mature and as companies copy each other. UX work, for example, is now mostly advertised under the product designer title. The work is similar, but a search or CV built around the older title misses most of the openings.",
      },
      {
        q: "Should my CV use the employer's job title or my own?",
        a: "Put the title employers use in your headline, where recruiters' searches look, and only if it honestly describes your work. Keep your own framing for the summary and the detail, where a person reads it.",
      },
      {
        q: "How is the job title data collected?",
        a: "From every current listing on our board. Each title is reduced to the job it names, setting aside levels such as Senior and team names after a comma, and counted. The data refreshes whenever the board is rebuilt.",
      },
      {
        q: "What does 'anywhere' mean next to a title?",
        a: "It is the number of listings with that title that carry no country, region or time-zone condition, so they can be done from anywhere in the world. Most remote roles are tied to a named country.",
      },
    ],
    related: [
      { href: "/posts/linkedin-for-remote-jobs", label: "LinkedIn for remote jobs" },
      { href: "/tools/ats-keyword-checker", label: "ATS keyword checker" },
      { href: "/tools/search-link-builder", label: "Remote job search link builder" },
    ],
  },

  "remote-field-explorer": {
    h1: "Remote field explorer",
    intro:
      "Compare the fields on our board side by side: how many remote roles each has, how many are open worldwide, how many have junior titles and how many publish pay. Select a field to see where it hires and who hires most.",
    html: `
      <h2>What the explorer shows</h2>
      <p>Most remote job advice treats "remote work" as one market. It is several, and they behave very differently. Some fields have hundreds of roles and almost none for beginners; some publish pay as a matter of course and others almost never do; and the share of roles that can be done from anywhere varies from field to field. The explorer puts those numbers next to each other so you can see which market you are actually searching in.</p>

      <h2>How to read the columns</h2>
      <ul>
        <li><strong>Roles</strong> is the number of current listings in the field.</li>
        <li><strong>Open worldwide</strong> is the share with no country, region or time-zone condition. Across the whole board this is small, and it is the number to watch if you want to work from anywhere.</li>
        <li><strong>Junior titles</strong> is the share whose title says junior, graduate, associate, intern, apprentice, trainee or entry-level. Compare it with the board-wide figure shown above the table to see how open a field is to people starting out.</li>
        <li><strong>Publish pay</strong> is the share of listings that state a salary range. It is mostly driven by pay transparency laws in US states, so fields that hire heavily in the US tend to score higher.</li>
      </ul>
      <p>Select a field for its median published pay, the countries it hires in, its most common titles and the employers with the most open roles.</p>

      <h2>How fields are counted</h2>
      <p>Fields are identified by <strong>job title</strong>, not by the category a listing was filed under. Categories are assigned by a keyword classifier that puts anything it cannot place into a catch-all, so they cannot be used to measure the size of a field. Title rules can. They are the same rules our field guides use, so a figure here matches the same figure in an article on the same day.</p>
      <p>Each field is matched on its own rules, so a title that fits two fields (an engineering manager in machine learning, say) counts in both. Some titles fit none, such as "Business Analyst" or a bare "Director", which is why the rows do not add up to the whole board; the note under the table gives the share.</p>
      <p>A median salary is shown only when at least 15 listings in the field publish a range. Below that, a median says more about which few employers happen to publish than about the field, so the explorer says there are too few instead. For pay by region and level, use the <a href="/tools/salary-band-estimator">salary band estimator</a>.</p>

      <h2>What it cannot tell you</h2>
      <p>This is one board, rebuilt nightly. A field with few roles here may be larger elsewhere, and a field's mix of countries reflects the employers we carry. Use it to compare fields with each other and to set expectations, not as a census of the job market. The guides linked from each field go into more detail, starting with <a href="/posts/remote-software-engineering-jobs">remote software engineering jobs</a>, the largest field on the board.</p>
    `,
    faq: [
      {
        q: "Which remote job field has the most openings?",
        a: "On our board, software engineering is the largest field by a wide margin, followed by sales. The explorer shows the current counts, which change with every nightly rebuild.",
      },
      {
        q: "Which remote fields are best for beginners?",
        a: "Sort the explorer by 'Most junior titles' and compare each field with the board-wide figure above the table. Fields such as marketing and legal tend to carry a higher share of junior titles than software engineering, which has very few.",
      },
      {
        q: "Why don't the fields add up to the whole board?",
        a: "Some titles fit none of the fields, such as 'Business Analyst' or a bare 'Director', and a few fit two and count in both. The note under the table shows how many titles are outside every field.",
      },
      {
        q: "Why is no median salary shown for some fields?",
        a: "The explorer shows a median only when at least 15 listings in a field publish a salary range. With fewer, a median reflects which handful of employers chose to publish rather than the field as a whole.",
      },
    ],
    related: [
      { href: "/posts/remote-software-engineering-jobs", label: "Remote software engineering jobs" },
      { href: "/tools/salary-band-estimator", label: "Remote salary band estimator" },
      { href: "/posts/remote-job-tier-list-2026", label: "The remote job tier list" },
    ],
  },
};
