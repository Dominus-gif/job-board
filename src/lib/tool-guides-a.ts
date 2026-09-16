/**
 * Explainers for the safety and pay tools. Each one documents how the tool
 * calculates its answer and where it stops, so the page is useful to read even
 * before anyone types into the widget.
 */
import type { ToolGuide } from "./tool-guides";

export const GUIDES_A: Record<string, ToolGuide> = {
  "fake-job-checker": {
    h1: "Fake job posting checker",
    intro: "Paste a job ad or a recruiter's message and see which scam warning signs it contains, with the exact words that triggered each one.",
    html: `
      <h2>How the checker works</h2>
      <p>The checker runs a fixed list of rules against what you paste and what you tell it. Each rule looks for a pattern that turns up again and again in fake remote job offers: requests for money, parcels or bank details, interviews held only in chat apps, pay that doesn't match the work, and pressure to act fast. When a rule matches, it adds points to the score and quotes the words that matched, so you can judge the evidence yourself.</p>
      <p>It also looks at email addresses. A recruiter writing from a free webmail account, a domain that doesn't match the company's website, or a look-alike domain with "careers" or "jobs" bolted onto a brand name all add points. The questions about what has happened so far carry the most weight, because the strongest warning signs usually happen outside the job ad itself.</p>

      <h2>How the score is built</h2>
      <p>Every rule has a fixed weight:</p>
      <ul>
        <li><strong>Critical, 25 to 40 points:</strong> being asked to pay, to buy equipment through a supplier the company chooses, or to move money or parcels. Any one of these puts the result at "likely a scam" or higher.</li>
        <li><strong>High, 12 to 20 points:</strong> identity or bank details requested before an offer, chat-only interviews, an offer without an interview, a free email address, a role missing from the company's own careers page, or a very new domain.</li>
        <li><strong>Medium, 8 to 10 points:</strong> pressure tactics, vague easy tasks, recruitment-scheme language, guaranteed income, or email and website domains that don't match.</li>
        <li><strong>Low, 5 points:</strong> "no experience needed", which is common in genuine entry-level roles but also in scams.</li>
      </ul>
      <p>Good signs, such as the role appearing on the employer's own site, take a few points off. A score under 15 shows as few warning signs, 15 to 39 as some warning signs, 40 to 69 as likely a scam, and 70 or more as very likely a scam.</p>

      <h2>What it can't check</h2>
      <p>The checker only sees what you give it. It doesn't open links, look up domain registration dates or contact the company, so it can't confirm that an employer is real. A polished scam that avoids every pattern here will score low, and an unusual but genuine message can trip a rule. Treat the result as a prompt for your own checks:</p>
      <ol>
        <li>Go to the company's website yourself and find the role on its careers page.</li>
        <li>Check that the recruiter writes from the company's own domain.</li>
        <li>Look up when the domain was registered with any public WHOIS service.</li>
        <li>Never send money, gift cards, identity documents or bank details before a written offer from an employer you've verified.</li>
      </ol>
      <p>Everything you paste stays in your browser. Nothing is sent to our servers or stored.</p>

      <h2>If you think it's a scam</h2>
      <p>Stop replying, keep copies of the messages, and report the posting to the site where you found it. If you've already sent money or personal details, contact your bank straight away and report it to your national fraud reporting service. Our guides to <a href="/posts/how-to-spot-fake-remote-job-postings">spotting fake remote job postings</a> and <a href="/posts/remote-job-scams-how-they-make-money">how remote job scams make money</a> explain the patterns in more depth.</p>
    `,
    faq: [
      { q: "Is this fake job checker free and private?", a: "Yes. It runs entirely in your browser, needs no account, and nothing you paste is sent to our servers or saved." },
      { q: "Can the checker tell me for certain that a job is fake?", a: "No. It highlights patterns that are common in scams and quotes the evidence. Only independent checks, such as finding the role on the employer's own careers page, can confirm that a job is real." },
      { q: "Why does being asked to pay count so heavily?", a: "Legitimate employers don't charge candidates for training, equipment, software or background checks. A request for money is the most reliable single sign of a job scam." },
      { q: "What should I do if the result says likely a scam?", a: "Stop engaging, don't send money or documents, keep copies of the messages and report the posting. If you've already shared bank details, contact your bank immediately." },
    ],
    related: [
      { href: "/posts/how-to-spot-fake-remote-job-postings", label: "Red-flag checklist for fake remote postings" },
      { href: "/posts/remote-job-scams-how-they-make-money", label: "7 remote job scams and how they make money" },
      { href: "/posts/apply-directly-on-company-career-pages", label: "Why applying on career pages is safest" },
    ],
  },

  "jd-remote-analyzer": {
    h1: "Truly-remote job description analyzer",
    intro: "Paste a job description to see whether it's open to anyone, anywhere, or hides an office, location, visa or timezone requirement.",
    html: `
      <h2>The same rules as our job filter</h2>
      <p>Every listing on our <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> passes an automatic filter before it's published. This tool runs the same phrase lists on the text you paste, so you get the verdict our board would reach and the evidence behind it. At the time of writing, the lists hold 10 phrases that signal office attendance, 75 that signal a location, work-permit or timezone restriction, and 18 that signal a role open worldwide.</p>

      <h2>How the verdict is decided</h2>
      <p>The order matters, and restrictions always win:</p>
      <ol>
        <li><strong>Not fully remote.</strong> Any mention of hybrid work, on-site days or being office-based means the role isn't fully remote.</li>
        <li><strong>Remote, but with limits.</strong> A named country or region, a right-to-work requirement, a visa clause or a required timezone overlap means the role is remote for some people only.</li>
        <li><strong>Open to anyone, anywhere.</strong> A role only counts as location-free when there are no restrictions and the text says so explicitly, for example "work from anywhere in the world".</li>
        <li><strong>Location unclear.</strong> "Remote" on its own doesn't tell you where the employer can hire. Our board treats these roles as unproven and keeps them off the worldwide list.</li>
      </ol>
      <p>The tool also picks up time zone abbreviations and UTC offsets, such as "EST" or "UTC+2", because a required overlap works like a location filter in practice.</p>

      <h2>Reading the results</h2>
      <p>Each finding shows the phrase, how often it appears and the sentence around it, and your text comes back with every match highlighted. Check the context before you decide. "Our Berlin office is optional" and "you'll work from our Berlin office" both mention an office, and only one is a requirement. Restrictions often sit near the end of a posting, next to the benefits and legal notices, so paste the whole thing.</p>

      <h2>Limits worth knowing</h2>
      <ul>
        <li>The tool reads phrases, not meaning. Unusual wording can slip past it, and a harmless mention can raise a flag.</li>
        <li>Some restrictions only appear in the application form, such as a country drop-down. If the text says nothing about location, ask the recruiter which countries they can hire in.</li>
        <li>A location-free role can still expect you online at certain hours. Look for a stated overlap and use the <a href="/tools/timezone-overlap">timezone overlap finder</a> to see what it means for your day.</li>
      </ul>
      <p>For a phrase-by-phrase walkthrough, read <a href="/posts/how-to-spot-hybrid-bait-in-remote-job-descriptions">how to spot hybrid bait</a>.</p>
    `,
    faq: [
      { q: "How can I tell if a remote job is really remote?", a: "Read the whole description for hybrid or office days, named countries or regions, work authorisation or visa clauses, and required time zones. This tool finds those phrases and highlights them for you." },
      { q: "Why does a job that says remote show as unclear?", a: "Remote with no location detail doesn't tell you where the employer can legally hire. Our filter only treats a role as worldwide when the posting says so explicitly and names no restriction." },
      { q: "Does a required timezone count as a restriction?", a: "Yes. Requiring overlap with one time zone, such as US Eastern hours, rules out much of the world in practice, even when no country is named." },
      { q: "Is the text I paste stored?", a: "No. The analysis runs in your browser and nothing is sent to our servers." },
    ],
    related: [
      { href: "/posts/how-to-spot-hybrid-bait-in-remote-job-descriptions", label: "How to spot hybrid bait" },
      { href: "/posts/how-we-source-and-verify-listings", label: "How we source and verify listings" },
      { href: "/work-from-anywhere-jobs", label: "Work-from-anywhere jobs" },
    ],
  },

  "salary-band-estimator": {
    h1: "Remote salary band estimator",
    intro: "Pick a field, a region and a seniority level to see the pay range remote employers publish, built from the listings on our board.",
    html: `
      <h2>Where the numbers come from</h2>
      <p>The estimator uses every current listing on our board that publishes a salary in US dollars. For each one we take the midpoint of the advertised range, or the single figure if only one is given, and leave out hourly or obviously broken figures. The data refreshes whenever the board is rebuilt, and the page shows how many listings sit behind every range, so you can see how much weight to give it.</p>
      <p>Region comes from each listing's location, including city names, so a role based in San Francisco counts as United States even when the country isn't written out. Work-from-anywhere roles have their own region. Seniority is read from the job title: words such as junior or associate point to entry level, senior to senior, staff, principal or lead to the level above, and manager, director or head to people-management levels. Titles with none of those count as mid-level.</p>

      <h2>How to read a range</h2>
      <ul>
        <li><strong>Lower quarter:</strong> a quarter of matching listings advertise less than this.</li>
        <li><strong>Median:</strong> the middle listing.</li>
        <li><strong>Upper quarter:</strong> a quarter advertise more.</li>
      </ul>
      <p>The chart shows how listings spread across pay bands. Hover over or tab to a bar to see how many listings it holds, or open the table view. Add your own figure to see where it sits: the tool tells you what share of matching listings advertise less.</p>
      <p>When fewer than eight listings match, the tool won't show a range, because a median built on a handful of jobs is closer to an anecdote than a benchmark. Widen the region or choose "Any level" instead.</p>

      <h2>Why the numbers lean high, and American</h2>
      <p>Most employers publish pay only where the law requires it, and the widest requirements apply in a growing number of US states. So most salaried listings on our board are American roles in engineering, product and sales, where pay is high. Treat the ranges as a guide to what employers who publish pay are offering, not as a global average. Our analysis of <a href="/posts/what-work-from-anywhere-jobs-pay">what work-from-anywhere jobs pay</a> explains why the worldwide sample looks so different, and the <a href="/posts/salary-transparency-laws-2026">salary transparency laws guide</a> covers where disclosure is required.</p>

      <h2>Using it in a negotiation</h2>
      <ol>
        <li>Match the field and level as closely as you can, then note the median and the upper quarter.</li>
        <li>Check the seniority chart. If the next level up pays much more, make sure your title reflects your responsibilities.</li>
        <li>Before you name a number, see what it's worth where you live with the <a href="/tools/salary-purchasing-power">purchasing-power calculator</a>.</li>
      </ol>
    `,
    faq: [
      { q: "How is this salary data collected?", a: "From current listings on our board that publish a salary in US dollars. We use the midpoint of each advertised range and show the number of listings behind every figure." },
      { q: "Why can't I see a range for some combinations?", a: "The estimator needs at least eight matching listings. Below that, a median is too unreliable, so it asks you to widen the filters instead." },
      { q: "Are these figures base pay or total pay?", a: "They're whatever the employer published. Most listings give base salary, but some sales roles quote on-target earnings, which include commission." },
      { q: "Why are the remote salaries here higher than I expected?", a: "Pay is published most often for US roles, because of state pay transparency laws, and US pay in tech, product and sales is among the highest anywhere." },
    ],
    related: [
      { href: "/posts/what-work-from-anywhere-jobs-pay", label: "What work-from-anywhere jobs pay" },
      { href: "/posts/salary-transparency-laws-2026", label: "Salary transparency laws in 2026" },
      { href: "/posts/remote-salaries-2026-negotiate-the-premium", label: "How to negotiate a remote salary" },
    ],
  },

  "salary-purchasing-power": {
    h1: "Salary purchasing-power calculator",
    intro: "See what a salary is worth where you'd spend it, and what you'd need to earn elsewhere to live the same way, across 70 countries.",
    html: `
      <h2>What purchasing power means here</h2>
      <p>Exchange rates tell you how much of one currency you get for another. They don't tell you what that money buys. A salary converted at the market rate can go much further in one country than in another, because everyday prices differ. This calculator adjusts for that difference using price levels published by the World Bank.</p>

      <h2>The method</h2>
      <p>For each country we use two World Bank figures from the same year:</p>
      <ul>
        <li>the <strong>PPP conversion factor for private consumption</strong>, which says how many units of local currency buy what one dollar buys in the United States, and</li>
        <li>the <strong>official exchange rate</strong>, the average number of local units per US dollar that year.</li>
      </ul>
      <p>Dividing the first by the second gives a price level. The United States is 1.0, shown as 100. A country at 50 is roughly half as expensive for a typical household. To compare two places, the calculator converts your salary to dollars, then scales it by the ratio of the two price levels. The country list runs the same sum for every country, so you can see where your income stretches furthest.</p>
      <p>Most figures are 2025 estimates, which the World Bank extrapolates from its International Comparison Program. Where a country's latest matching pair is older, the year appears next to the result.</p>

      <h2>What it doesn't capture</h2>
      <ul>
        <li><strong>Cities differ from national averages.</strong> Capitals and tech hubs usually cost more than the country as a whole, and rent varies more than anything else.</li>
        <li><strong>Your spending isn't average.</strong> Imported goods, international schools, private health cover and flights home cost much the same everywhere.</li>
        <li><strong>Tax isn't included.</strong> Moving can change your tax bill more than prices change your costs. Our guide to <a href="/posts/remote-work-taxes-living-abroad">working remotely from abroad</a> explains why.</li>
        <li><strong>Exchange rates move.</strong> The calculator uses annual averages, and a currency that moves 10% changes the answer by about the same amount.</li>
      </ul>

      <h2>Putting it to use</h2>
      <p>Use the result as a first filter, then build a real budget for the place you have in mind. Our guides to <a href="/posts/what-a-100k-remote-salary-really-buys">what a remote salary really buys</a> and <a href="/posts/cost-of-living-arbitrage-remote-salary">cost-of-living arbitrage</a> walk through the rest of the sums. If you're weighing two offers, the <a href="/tools/offer-comparator">offer comparison calculator</a> applies the same price levels to both.</p>
    `,
    faq: [
      { q: "What is purchasing power parity?", a: "It's a way of comparing incomes by what they buy rather than by exchange rates. A PPP conversion factor says how much local currency buys the same basket of goods and services that one US dollar buys in the United States." },
      { q: "Where does the price data come from?", a: "From the World Bank's World Development Indicators: the PPP conversion factor for private consumption and the official exchange rate, both from the same year for each country." },
      { q: "Does this account for rent in my city?", a: "No. The figures are national averages, and big cities usually cost more, especially for housing. Use the result as a starting point and check local rents." },
      { q: "Why is my country missing?", a: "The tool covers countries remote workers commonly live in, and only where the World Bank publishes both figures for the same recent year." },
    ],
    related: [
      { href: "/posts/cost-of-living-arbitrage-remote-salary", label: "Cost-of-living arbitrage on a remote salary" },
      { href: "/posts/what-a-100k-remote-salary-really-buys", label: "What a $100K remote salary really buys" },
      { href: "/tools/remote-salary-converter", label: "Remote salary converter" },
    ],
  },

  "offer-comparator": {
    h1: "Remote job offer comparison calculator",
    intro: "Put two remote offers side by side and see which is worth more once bonuses, benefits, contractor costs, time off and local prices are counted.",
    html: `
      <h2>What it compares</h2>
      <p>Headline salaries hide most of what separates two offers. The calculator adds up each offer's cash (salary plus bonus or commission), adds the yearly value of benefits and stipends, subtracts the costs you'd carry as a contractor, and converts the result to US dollars. It then adjusts for prices where you'd live, using World Bank price levels, so an offer spent in Lisbon can be compared fairly with one spent in London.</p>

      <h2>Filling in the inputs</h2>
      <ul>
        <li><strong>Employee or contractor.</strong> Employees usually get paid leave, employer pension contributions and, in many countries, social insurance paid on their behalf. Contractors don't.</li>
        <li><strong>Costs you'd cover.</strong> For contractor offers, this is the share of your billing that goes on things an employer would otherwise pay: social contributions, pension, insurance, accounting and gaps between contracts. It varies a lot by country, and the default of 20% is only a starting point.</li>
        <li><strong>Benefits value.</strong> Put a yearly figure on health cover, pension matching and anything else you'd otherwise buy yourself. Leave out perks you wouldn't pay for.</li>
        <li><strong>Days off.</strong> For employees, paid leave doesn't reduce pay but does reduce the days you work, which raises your effective hourly rate. For contractors, days off are unpaid, so enter your expected billing after them.</li>
      </ul>

      <h2>The results</h2>
      <p>The headline tells you which offer is worth more, and by how much, on the price-adjusted figure. The table shows every step, including the effective hourly rate: the total divided by the hours you'd actually work. Change any input and the comparison updates straight away.</p>
      <p>The starting example shows why this matters. A contract billing $110,000 looks about 16% better than a $95,000 salary, but once the salary's bonus and benefits are added and the contractor's own costs are taken off, the salaried offer comes out ahead.</p>

      <h2>What it leaves out</h2>
      <ul>
        <li><strong>Income tax.</strong> Tax depends on your country, your status and your other income, so it isn't estimated. If the offers would be taxed differently, for example as an employee in one country and a contractor in another, get advice before you decide.</li>
        <li><strong>Equity.</strong> Stock options and grants are too uncertain to value in a simple calculator, so weigh them separately.</li>
        <li><strong>Currency risk.</strong> Exchange rates are annual averages, and an offer paid in a currency you don't spend carries extra risk.</li>
      </ul>
      <p>For the reasoning behind the numbers, see our guides to <a href="/posts/hourly-vs-annual-remote-pay-converting-offers">comparing hourly and annual pay</a> and <a href="/posts/remote-benefits-decoded-by-region">remote benefits by region</a>.</p>
    `,
    faq: [
      { q: "How do I compare a contractor rate with a salary?", a: "Subtract the costs an employer would normally cover, such as social contributions, pension, insurance and unpaid time off, then compare what's left. The calculator does this with a percentage you can adjust." },
      { q: "What does real value mean in the results?", a: "It's the offer's total after contractor costs, converted to US dollars and adjusted for price levels where you'd live, so offers spent in different countries can be compared." },
      { q: "Does the calculator include tax?", a: "No. Tax depends heavily on your personal situation, so the comparison is before income tax. Check the tax treatment separately if the offers differ in country or contract type." },
      { q: "How should I value benefits?", a: "Use what you'd pay yourself for the same cover, such as health insurance or pension contributions. Leave out perks you wouldn't buy." },
    ],
    related: [
      { href: "/posts/hourly-vs-annual-remote-pay-converting-offers", label: "Hourly vs annual remote pay" },
      { href: "/posts/remote-benefits-decoded-by-region", label: "Remote benefits by region" },
      { href: "/tools/salary-purchasing-power", label: "Salary purchasing-power calculator" },
    ],
  },

  "home-office-cost-calculator": {
    h1: "Home office cost and stipend calculator",
    intro: "Add up what working from home really costs each year, then see how much an employer stipend and your country's tax rules give back.",
    html: `
      <h2>What goes into the total</h2>
      <p>The calculator splits the cost of a home office into three parts:</p>
      <ul>
        <li><strong>Equipment,</strong> spread over how long each item lasts. A €400 chair that lasts six years costs about €67 a year.</li>
        <li><strong>Running costs,</strong> such as the share of your broadband used for work, the extra energy used during working hours, and a phone or backup data plan.</li>
        <li><strong>Coworking,</strong> for the days you work somewhere else.</li>
      </ul>
      <p>The starting prices are round examples, not measured prices. Replace them with your own, add items, or remove the ones you already own.</p>

      <h2>Tax relief, country by country</h2>
      <p>These rules were checked against each tax authority's published guidance in September 2026.</p>
      <ul>
        <li><strong>United States:</strong> employees can't deduct unreimbursed home-office costs on their federal return. Self-employed people can use the simplified method of $5 per square foot, up to 300 square feet.</li>
        <li><strong>United Kingdom:</strong> from April 2026, employees can no longer claim relief from HMRC. Employers can pay up to £6 a week tax-free where there's an arrangement to work from home.</li>
        <li><strong>Germany:</strong> €6 for each day worked mainly from home, up to €1,260 a year.</li>
        <li><strong>Netherlands:</strong> employers can pay up to €2.45 per home-working day tax-free in 2026.</li>
        <li><strong>Ireland:</strong> 30% of electricity, heating and broadband, in proportion to days worked from home, unless the employer pays up to €3.20 a day tax-free.</li>
        <li><strong>Australia:</strong> a fixed rate of 70 cents for each hour worked from home, with a record of the hours.</li>
        <li><strong>Canada:</strong> employees claim actual costs with a form signed by their employer, so the calculator doesn't estimate it.</li>
      </ul>
      <p>Where a rule reduces your taxable income, the calculator estimates the saving using the tax rate you enter. Where an employer pays a tax-free allowance, the allowance itself is counted. Both are estimates: conditions apply, and the rules change.</p>

      <h2>Making the case for a stipend</h2>
      <p>If the net cost surprises you, raise it with your employer. An itemised yearly figure is easier to approve than a vague request, and in the UK, the Netherlands and Ireland employers can pay a set amount without tax. Some employers prefer to send equipment rather than cash. Our listings show this kind of support is uneven, so check each offer. Browse <a href="/remote-jobs-with-equipment-budget">remote jobs with an equipment budget</a>, or read <a href="/posts/cost-of-working-from-home-by-country">what working from home really costs</a> for the full picture.</p>
    `,
    faq: [
      { q: "How much does a home office cost per year?", a: "It depends on your setup and on prices where you live. Spreading equipment over its useful life and adding a share of broadband, energy and occasional coworking usually adds up to a meaningful yearly sum, which this calculator works out from your own figures." },
      { q: "Can I still claim the UK working from home allowance?", a: "Not directly from HMRC for the 2026 to 2027 tax year onwards. Your employer can still pay up to 6 pounds a week tax-free if you have an arrangement to work from home." },
      { q: "How is the tax relief estimated?", a: "For deductions, the calculator multiplies the deductible amount by the tax rate you enter. For tax-free employer allowances, it counts the allowance itself. Both are estimates." },
      { q: "Should I ask my employer for a home office stipend?", a: "Yes, especially if the listing doesn't mention one. Bring an itemised yearly figure, and point out any tax-free allowance your country allows." },
    ],
    related: [
      { href: "/posts/cost-of-working-from-home-by-country", label: "What working from home really costs" },
      { href: "/posts/remote-benefits-decoded-by-region", label: "Remote benefits by region" },
      { href: "/remote-jobs-with-equipment-budget", label: "Remote jobs with an equipment budget" },
    ],
  },
};
