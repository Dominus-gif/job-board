/**
 * Cluster F — Money, taxes and lifestyle.
 *
 * Statutory figures were checked against the relevant authorities' published
 * guidance in September 2026 (IRS 2026 inflation adjustments, HMRC, German and
 * Dutch allowances, Revenue Ireland, the ATO, the CRA, the EU telework
 * framework agreement and the OECD's November 2025 model update). They change
 * often; each article says so and tells readers to check current guidance.
 * Budgets are labelled illustrations, not measured prices.
 */
import type { Post } from "./posts";

const AUTHOR = "getremotejobsnow.com Editorial";

export const POSTS_CLUSTER_F: Post[] = [
  {
    slug: "cost-of-living-arbitrage-remote-salary",
    title: "Cost-of-Living Arbitrage on a Remote Salary: The Maths and the Traps",
    description:
      "Earning in dollars or euros while living somewhere cheaper: how to run the numbers, what doesn't get cheaper, and the currency and tax traps.",
    date: "2026-09-16T13:45:00.000Z",
    author: AUTHOR,
    tags: ["Cost of Living", "Geo Arbitrage", "Remote Salaries", "Moving Abroad"],
    readMinutes: 6,
    html: `
      <p>The idea is simple and appealing. Keep a salary set in dollars or euros, move somewhere with lower prices, and let the difference turn into savings. For some people it works as advertised. For others, a currency swing, a pay adjustment or a tax bill eats most of the gain within a year. The difference is usually in the planning.</p>
      <p>This guide covers the maths, the costs that don't fall when you move, and the traps worth checking before you sign a lease.</p>

      <h2>The basic maths</h2>
      <p>Arbitrage only counts if it shows up in what you save, so start there. Here's an illustration based on an <strong>$80,000</strong> salary. The figures are round numbers chosen to show the method, not measured prices for any city.</p>
      <table>
        <thead><tr><th>Per month</th><th>Staying put</th><th>After moving</th></tr></thead>
        <tbody>
          <tr><td>Net pay after tax</td><td>$4,900</td><td>$4,900</td></tr>
          <tr><td>Rent</td><td>$1,900</td><td>$800</td></tr>
          <tr><td>Other local costs (food, transport, services)</td><td>$1,500</td><td>$900</td></tr>
          <tr><td>Costs that don't fall (see below)</td><td>$400</td><td>$700</td></tr>
          <tr><td><strong>Left over</strong></td><td><strong>$1,100</strong></td><td><strong>$2,500</strong></td></tr>
        </tbody>
      </table>
      <p>On paper, the move more than doubles what you save. Notice two things, though. The net pay line assumes your tax bill stays the same, which is rarely true when you change country. And the line for costs that don't fall goes up, not down. Both deserve a closer look.</p>
      <p>For a general method of comparing cities, our guide to <a href="/posts/what-a-100k-remote-salary-really-buys">what a remote salary really buys</a> goes step by step. This article is about what changes when the move crosses a border.</p>

      <p>For a quick comparison across 70 countries, the <a href="/tools/salary-purchasing-power">salary purchasing-power calculator</a> uses World Bank price levels. National averages hide big differences between cities, so use it to shortlist places, then price the one you choose.</p>

      <h2>What gets cheaper, and what doesn't</h2>
      <p>Local prices are where the savings come from: rent, eating out, public transport, childcare, cleaning, repairs and most services. These can fall a long way.</p>
      <p>Globally priced things don't. Laptops, phones, software subscriptions and most online services cost roughly the same everywhere, and imported goods can cost more. Some costs only appear after you move:</p>
      <ul>
        <li><strong>Health insurance.</strong> If you leave your home system, private or international cover can become one of your biggest bills.</li>
        <li><strong>Flights home.</strong> Visiting family once or twice a year adds up quickly, especially with children.</li>
        <li><strong>Visa and residency costs.</strong> Application fees, translations, lawyers and renewals.</li>
        <li><strong>Professional advice.</strong> A cross-border tax return is much harder to do yourself.</li>
        <li><strong>Setting up twice.</strong> Deposits, furniture and a stretch of paying for two homes during the move.</li>
        <li><strong>A reliable connection.</strong> Remote work needs good internet and a backup, which costs more in some places.</li>
      </ul>
      <p>Then there's lifestyle drift. People often spend more than they planned in the first year somewhere new, because everything feels cheap.</p>

      <h2>Currency: the risk nobody budgets for</h2>
      <p>If you're paid in one currency and spend in another, the exchange rate is part of your salary, and it moves. In early January 2025, one euro cost about $1.03. By the start of July it cost about $1.18. For someone paid in dollars and living in the eurozone, the same salary bought roughly 13% fewer euros in six months, without anyone touching their pay.</p>
      <p>Two habits help. Budget at a rate somewhat worse than today's, so a swing doesn't break your plan. And keep a cash buffer in the currency you spend. The <a href="/tools/remote-salary-converter">remote salary converter</a> handles the conversion, and it's worth running your budget at a few different rates.</p>
      <blockquote>Arbitrage is a bet that three things stay put: your pay, the exchange rate and your tax bill. Check all three before you move.</blockquote>

      <h2>Your employer may adjust your pay</h2>
      <p>Many companies set pay by location. Move somewhere cheaper and your salary may drop to that location's band, sometimes at your next review. Other employers pay the same everywhere. You need to know which kind you work for before planning around the difference.</p>
      <p>Our own listings hint at how common location-based pay is. One global employer on our board publishes ranges as wide as <strong>$59,900 to $168,000</strong> for a single senior product manager role. A spread that wide usually means pay depends heavily on where the person lives. Ask HR in writing how a move would affect your salary, and whether you need permission to move at all. Many employers can't legally employ you in a country where they have no presence.</p>

      <h2>Tax: the rules have been tightening</h2>
      <p>Moving usually changes where you're tax resident, and with it how much of your salary you keep. Special regimes for newcomers still exist, but several have narrowed.</p>
      <ul>
        <li><strong>Portugal</strong> closed its well-known non-habitual resident regime to new applicants from 2024. Its replacement, often called NHR 2.0 or IFICI, offers a 20% rate on qualifying income, but only for certain research, innovation and highly skilled roles.</li>
        <li><strong>Spain</strong>'s special regime for incoming workers, often called the Beckham law, taxes qualifying employment income at 24% up to €600,000, for the year you arrive and the five years after. Since 2023, remote employees who hold Spain's digital nomad visa can apply.</li>
      </ul>
      <p>These regimes come with conditions and change often, so treat them as a starting point for professional advice, not a plan. We cover residency, the 183-day rule and social security in <a href="/posts/remote-work-taxes-living-abroad">what happens to your taxes when you work from abroad</a>, and visa routes in our guide to <a href="/posts/digital-nomad-visas-2026">digital nomad visas</a>.</p>

      <h2>A checklist before you move</h2>
      <ol>
        <li>Confirm in writing that your employer allows the move, and how your pay would change.</li>
        <li>Check which visa or residence permit lets you work remotely there.</li>
        <li>Get a view on tax residency and social security in both countries.</li>
        <li>Build a monthly budget from real local rents, not city averages.</li>
        <li>Price health insurance before you give up your current cover.</li>
        <li>Run your budget at an exchange rate 10% worse than today's.</li>
        <li>Keep a buffer of several months' costs in the local currency.</li>
      </ol>
      <p>If you still need a role that allows this kind of move, start with the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a>. Region-locked roles, like those on our <a href="/remote-jobs-in-europe">European remote board</a>, can work too if your move stays inside that region.</p>
    `,
    faq: [
      {
        q: "What is cost-of-living arbitrage?",
        a: "It means earning a salary set in a higher-cost economy, often in dollars or euros, while living somewhere with lower prices, so more of your pay becomes savings. The gain depends on your tax bill, the exchange rate and whether your employer adjusts your pay.",
      },
      {
        q: "Will my employer cut my salary if I move somewhere cheaper?",
        a: "Some will. Many companies set pay by location and may move you to a lower band after a relocation, while others pay the same everywhere. Ask in writing before you move, and check whether your employer can legally employ you in the new country.",
      },
      {
        q: "How does currency risk affect remote workers?",
        a: "If you are paid in one currency and spend in another, exchange rate moves change your real income. In the first half of 2025, for example, a dollar salary bought roughly 13 percent fewer euros within six months. Budgeting at a less favourable rate helps.",
      },
      {
        q: "Does moving abroad lower my taxes?",
        a: "Not automatically. Moving usually changes your tax residency, and the new country's rates may be higher or lower. Some countries offer special regimes for newcomers, but several have narrowed in recent years, so get professional advice before planning around one.",
      },
    ],
  },

  {
    slug: "remote-work-taxes-living-abroad",
    title: "Working Remotely From Abroad: What Happens to Your Taxes",
    description:
      "Tax residency, the 183-day rule, social security and your employer's risks: what changes when you move abroad but keep your remote job.",
    date: "2026-09-16T13:35:00.000Z",
    author: AUTHOR,
    tags: ["Remote Work Taxes", "Tax Residency", "183-Day Rule", "Employer of Record"],
    readMinutes: 6,
    html: `
      <div class="callout-warning"><p>This is general information, not tax or legal advice. The rules depend on your citizenship, where you live, where your employer is based and the treaties between those countries. Speak to a qualified adviser before you move.</p></div>
      <p>Plenty of people assume that if their employer and payroll stay the same, their taxes do too. Often they don't. Where you physically work can decide which country taxes your salary, which social security system you pay into, and whether your employer suddenly has obligations in your new home. None of that is a reason not to move. It's a reason to understand the rules first.</p>

      <h2>Tax residency comes first</h2>
      <p>Most countries tax their residents on their income, and each country decides who counts as resident under its own law. The details vary, but the usual tests look at:</p>
      <ul>
        <li><strong>Days present.</strong> Spending 183 days or more in a country in a year is a common trigger, though far from the only one.</li>
        <li><strong>A home.</strong> Having a permanent home available to you can make you resident even with fewer days.</li>
        <li><strong>Your centre of life.</strong> Where your family lives, where your economic ties are and where you're registered.</li>
      </ul>
      <p>Some countries use more detailed systems. The UK has a statutory residence test that combines day counts with ties to the country. The US substantial presence test counts days across three years with a weighting. You can even be resident in two countries at once under their own rules, which is where tax treaties come in.</p>

      <h2>Where your salary is taxed</h2>
      <p>Most tax treaties follow the OECD model, which says employment income is generally taxed where the work is physically done. There's a short-stay exception. Your home country keeps the right to tax you if you spend no more than 183 days in the other country in any twelve-month period, your employer isn't resident there, and your pay isn't borne by a business presence your employer has there.</p>
      <p>In practice, a few weeks of working from a holiday rental rarely changes anything. Moving for good usually does. Once you live and work in a new country, it will normally expect to tax your salary, and your old country will either give up its claim or credit the tax you pay abroad.</p>
      <p>The 183-day figure is repeated so often that people treat it as a safe harbour. It isn't one. Countries count days differently, and residency can start sooner if you set up a home. Our guide to <a href="/posts/digital-nomad-visas-2026">digital nomad visas</a> explains why so many people get caught out.</p>

      <p>An accurate count of your days is the simplest protection. The <a href="/tools/tax-residency-day-counter">tax residency day counter</a> tracks calendar-year and rolling 12-month totals for each country.</p>

      <h2>If you're a US citizen</h2>
      <p>The United States taxes its citizens on their worldwide income wherever they live, so moving abroad doesn't end your US filing obligations. Two main tools reduce double taxation. The foreign earned income exclusion lets qualifying people exclude up to <strong>$132,900</strong> of foreign earnings for tax year 2026, up from $130,000 for 2025. The foreign tax credit gives you credit for income tax paid to another country. Which one works better depends on the tax rates where you live.</p>

      <h2>Social security is a separate question</h2>
      <p>Income tax and social security contributions follow different rules, and the second is easy to forget.</p>
      <ul>
        <li><strong>Within the EU, the EEA and Switzerland</strong>, coordination rules mean you pay into one country's system at a time, and a certificate called an A1 shows which. Since 1 July 2023, a framework agreement signed by many of these countries lets cross-border teleworkers stay in their employer's system if they work less than 50% of their time from their country of residence.</li>
        <li><strong>The US</strong> has social security agreements, called totalization agreements, with about 30 countries. They're designed to stop people paying into two systems for the same work.</li>
        <li><strong>Elsewhere</strong>, you may owe contributions in your new country with no credit for what you pay at home.</li>
      </ul>

      <h2>Why your employer might say no</h2>
      <p>When you move, your employer's risk changes too. It may need to register as an employer in your new country, run payroll there and withhold local taxes. There's also a chance your home office creates a <strong>permanent establishment</strong>, meaning a taxable business presence, in your new country.</p>
      <p>Guidance the OECD published in November 2025 makes that risk easier to judge. It says a home office generally won't create a permanent establishment if you work from it for less than half your working time over any twelve-month period. Above that level, it depends on whether the business has a commercial reason to operate there, such as serving local customers. Countries still apply their own laws and treaties, so employers stay cautious, which is why many refuse a move or insist on a formal arrangement.</p>
      <blockquote>Your move is a tax event for your employer as well as for you. Expect questions, and ask before you go rather than after.</blockquote>

      <h2>The common arrangements</h2>
      <ul>
        <li><strong>Short stays on home payroll.</strong> Many employers allow a few weeks a year abroad under a policy with a day limit.</li>
        <li><strong>Local employment through an entity.</strong> If the company already operates in your new country, it can employ you there directly.</li>
        <li><strong>An employer of record.</strong> A provider employs you locally on your company's behalf and handles payroll, tax and statutory benefits. Our guide to <a href="/posts/remote-benefits-decoded-by-region">remote benefits by region</a> explains what that means for your package.</li>
        <li><strong>Contracting.</strong> You invoice the company and handle your own taxes. It's simpler for the employer, but you usually lose benefits, and if the relationship looks like employment there's a misclassification risk.</li>
      </ul>

      <h2>Before you move</h2>
      <ol>
        <li>Ask your employer, in writing, whether the move is allowed and under which arrangement.</li>
        <li>Work out when you'd become tax resident in the new country, and when you'd stop being resident in the old one.</li>
        <li>Check which social security system you'll belong to, and get any certificates you need.</li>
        <li>Read the tax treaty between the two countries, or have an adviser summarise it.</li>
        <li>Keep a record of the days you spend in each country.</li>
        <li>Budget for professional advice in both countries for the first year.</li>
      </ol>
      <p>For the money side, see <a href="/posts/cost-of-living-arbitrage-remote-salary">cost-of-living arbitrage on a remote salary</a>. If you need a job that stays open wherever you end up, start with the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a>, or for moves within Europe, the <a href="/remote-jobs-in-europe">European remote board</a>.</p>
    `,
    faq: [
      {
        q: "Does working abroad for a few weeks create tax obligations?",
        a: "Usually not for short stays, because most tax treaties leave your salary taxable at home if you spend no more than 183 days in the other country and your employer has no presence there. Rules vary, so check the relevant treaty and your employer's policy.",
      },
      {
        q: "What is the 183-day rule?",
        a: "It is a common threshold in tax treaties and domestic law for when working in a country starts to create tax obligations there. It is not a universal safe harbour, because countries count days differently and residency can also follow from having a home or family there.",
      },
      {
        q: "Do US citizens pay US tax when they live abroad?",
        a: "US citizens must file and may owe tax on their worldwide income wherever they live. The foreign earned income exclusion, up to 132,900 dollars for 2026, and the foreign tax credit are the main ways to reduce double taxation.",
      },
      {
        q: "What is a permanent establishment?",
        a: "It is a taxable business presence in a country. An employee working from home abroad can create one for their employer in some situations. OECD guidance from November 2025 says this is generally not the case if the person works from that home office for less than half their working time over twelve months.",
      },
    ],
  },

  {
    slug: "cost-of-working-from-home-by-country",
    title: "What Working From Home Really Costs, and What Tax Relief You Get",
    description:
      "A yearly budget for working from home, from desk to broadband, plus how the US, UK, Germany, the Netherlands, Ireland and Australia treat the costs.",
    date: "2026-09-16T13:25:00.000Z",
    author: AUTHOR,
    tags: ["Home Office", "Work From Home Costs", "Tax Relief", "Remote Benefits"],
    readMinutes: 5,
    html: `
      <p>Working from home saves the commute, but it isn't free. Somebody pays for the desk, the chair, the broadband and the heating that stays on all day. Sometimes that's your employer. More often it's you, and whether you get any of it back depends a lot on the country you live in.</p>
      <p>Here's how to build a realistic yearly budget, and how several countries treat home-working costs.</p>

      <h2>What goes into the budget</h2>
      <p>It helps to split costs into three groups.</p>
      <h3>One-off setup</h3>
      <ul>
        <li>A proper desk and an adjustable chair, the two things people most regret skimping on.</li>
        <li>A monitor, keyboard and mouse, if your employer doesn't supply them.</li>
        <li>A headset and a decent webcam for calls.</li>
        <li>Lighting, cable management and a surge protector.</li>
      </ul>
      <h3>Running costs</h3>
      <ul>
        <li>Broadband, possibly on a faster plan than you'd otherwise choose.</li>
        <li>Extra electricity, heating and cooling during working hours.</li>
        <li>A mobile data plan as a backup connection.</li>
        <li>Coffee, lunches and other small things an office would have covered.</li>
        <li>The odd coworking day when home isn't workable.</li>
      </ul>
      <h3>Easy to forget</h3>
      <ul>
        <li>Replacing equipment every few years.</li>
        <li>Insurance for work equipment kept at home.</li>
        <li>The space itself. A room used as an office has a cost, even if nobody bills you for it.</li>
      </ul>

      <h2>An illustrative yearly budget</h2>
      <p>The figures below are round numbers to show the structure, not measured prices. Yours will depend on your country and your choices.</p>
      <table>
        <thead><tr><th>Item</th><th>First year</th><th>Later years</th></tr></thead>
        <tbody>
          <tr><td>Desk and chair, spread over five years</td><td>$150</td><td>$150</td></tr>
          <tr><td>Monitor, keyboard, mouse, headset and webcam</td><td>$600</td><td>$150</td></tr>
          <tr><td>Share of broadband used for work</td><td>$400</td><td>$400</td></tr>
          <tr><td>Extra electricity and heating</td><td>$450</td><td>$450</td></tr>
          <tr><td>Backup mobile data</td><td>$120</td><td>$120</td></tr>
          <tr><td>Coworking, one day a month</td><td>$300</td><td>$300</td></tr>
          <tr><td><strong>Total</strong></td><td><strong>$2,020</strong></td><td><strong>$1,570</strong></td></tr>
        </tbody>
      </table>
      <p>Even as a rough sketch, that's a meaningful sum. It's why a home office stipend is worth asking about, and why the tax treatment matters.</p>

      <h2>How some countries treat home-working costs</h2>
      <p>These rules were correct at the time of writing. They change often, so check your tax authority's current guidance.</p>
      <ul>
        <li><strong>United States.</strong> Employees can't deduct unreimbursed work expenses on their federal return. That suspension started in 2018, and legislation in 2025 made it permanent. Self-employed people can still claim a home office deduction, including a simplified method worth $5 per square foot for up to 300 square feet.</li>
        <li><strong>United Kingdom.</strong> Since April 2026, employees can no longer claim tax relief from HMRC for extra household costs. Employers can still pay up to £6 a week tax-free when there's an arrangement for you to work from home.</li>
        <li><strong>Germany.</strong> The home office allowance is €6 for each day worked mainly from home, up to €1,260 a year, which covers 210 days.</li>
        <li><strong>Netherlands.</strong> Employers can pay a tax-free home working allowance of up to €2.45 a day in 2026.</li>
        <li><strong>Ireland.</strong> Remote workers can claim relief on 30% of their electricity, heating and broadband bills, in proportion to the days worked from home, where the employer doesn't cover them. Employers can instead pay up to €3.20 a day tax-free.</li>
        <li><strong>Australia.</strong> Employees can use a fixed rate of 70 cents for each hour worked from home, in place since 1 July 2024, provided they keep a record of those hours.</li>
        <li><strong>Canada.</strong> The simplified flat-rate method from the pandemic years ended after 2022. Employees now need a form signed by their employer and must claim actual costs.</li>
      </ul>
      <blockquote>In many countries, the most valuable home office support is the kind your employer pays, not the kind you claim yourself.</blockquote>

      <p>Our <a href="/tools/home-office-cost-calculator">home office cost calculator</a> applies these rules to your own costs and shows what's left after any stipend.</p>

      <h2>What employers offer</h2>
      <p>Home office support varies hugely between employers, and our own listings show how uneven it is. Among the worldwide roles on our board, 72 mention an equipment budget, but 69 of those come from a single employer. Coworking stipends show up in roles from only a handful of companies. So don't assume a remote job includes this kind of support. Look for it in the listing, and ask if it isn't there.</p>
      <p>You can browse <a href="/remote-jobs-with-equipment-budget">remote jobs with an equipment budget</a>, and <a href="/remote-jobs-with-learning-budget">jobs with a learning budget</a>, which is sometimes flexible enough to cover tools.</p>

      <h2>How to ask for a stipend</h2>
      <ol>
        <li><strong>Bring a list.</strong> A short, itemised setup cost is easier to approve than a general request.</li>
        <li><strong>Ask for equipment instead of cash if that's easier.</strong> Some companies can ship hardware more easily than they can pay allowances.</li>
        <li><strong>Clarify ownership.</strong> Find out whether the equipment is yours to keep or has to go back when you leave.</li>
        <li><strong>Point to tax-free options.</strong> Where an employer can pay a tax-free allowance, as in the UK, the Netherlands or Ireland, mention it.</li>
        <li><strong>Count it as pay.</strong> A recurring stipend is part of your package. Weigh it the way you'd weigh a salary difference.</li>
      </ol>
      <p>For the wider picture, see <a href="/posts/remote-benefits-decoded-by-region">remote benefits by region</a>. If you're comparing offers in different currencies, the <a href="/tools/remote-salary-converter">remote salary converter</a> puts stipends and salaries on the same footing. When you're ready to search, the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> lists roles open wherever your home office happens to be.</p>
    `,
    faq: [
      {
        q: "Can US employees deduct home office expenses?",
        a: "No. Unreimbursed employee expenses have not been deductible on federal returns since 2018, and 2025 legislation made that permanent. Self-employed people can still claim a home office deduction, including a simplified method of 5 dollars per square foot for up to 300 square feet.",
      },
      {
        q: "Can UK employees still claim the working from home allowance?",
        a: "Not directly from HMRC for the 2026 to 2027 tax year onwards, because that relief ended in April 2026. Employers can still pay up to 6 pounds a week tax-free where there is an arrangement for the employee to work from home.",
      },
      {
        q: "How much is Germany's home office allowance?",
        a: "It is 6 euros for each day worked mainly from home, up to 1,260 euros a year, which covers 210 days. These amounts have applied since 2023.",
      },
      {
        q: "Should I ask my employer for a home office stipend?",
        a: "Yes, especially if the listing does not mention one. An itemised list of setup costs is easier to approve, and in countries such as the UK, the Netherlands and Ireland employers can pay certain home working allowances tax-free.",
      },
    ],
  },
];
