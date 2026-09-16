/**
 * Cluster B — Salary transparency.
 *
 * Board figures are measured from the live dataset at the time of writing:
 * 1,115 of 5,854 listings state a salary, 1,034 of them in US dollars. Legal and
 * statutory points are stated with their effective dates and should be checked
 * against current law before being relied on — rules in this area change often.
 * Worked examples are labelled as illustrations, not as measured prices.
 */
import type { Post } from "./posts";

const AUTHOR = "getremotejobsnow.com Editorial";

export const POSTS_CLUSTER_B: Post[] = [
  {
    slug: "what-a-100k-remote-salary-really-buys",
    title: "What a $100K Remote Salary Really Buys: How to Compare Cities",
    description:
      "A $100K remote salary means very different things in different cities. How to compare it properly, covering tax, rent and currency, with data from our board.",
    date: "2026-09-16T09:00:00.000Z",
    author: AUTHOR,
    tags: ["Remote Salaries", "Cost of Living", "Purchasing Power", "Salary Comparison"],
    readMinutes: 5,
    html: `
      <p>"$100,000" sounds like a fixed amount. It isn't. The same number on an offer letter can mean a comfortable life in one city and a tight budget in another, and the gap isn't only about rent. By the time tax, currency and everyday prices have taken their share, two people on identical salaries can end up years apart in what they can save.</p>
      <p>This guide doesn't hand you a table of made-up city scores. Price indices move constantly and depend heavily on how you live. Instead it shows you the four-step comparison that decides the answer, so you can run it for your own city with current numbers.</p>

      <h2>First, what remote roles on our board pay</h2>
      <p>Context helps. Of the <strong>5,854 listings</strong> on our board at the time of writing, <strong>1,115</strong> state a salary, and <strong>1,034</strong> of those are quoted in US dollars. Taking the midpoint of each range, the median is <strong>$193,500</strong>, with the middle half of roles between <strong>$147,900</strong> and <strong>$240,000</strong>.</p>
      <p>That's higher than many people expect, and it's worth knowing why. Our board leans heavily towards product, engineering, finance and sales roles, and employers who publish ranges skew towards larger, US-headquartered companies. By category, the median midpoint ranges from about <strong>$107,000</strong> for customer support to about <strong>$236,000</strong> for DevOps. So a $100K offer is well below our median for most technical roles, and right in line for others.</p>

      <h2>Step 1: Turn gross pay into money you keep</h2>
      <p>Tax is usually the largest single difference between two places, and it isn't just the headline rate. Where you're tax resident, your status as an employee or a contractor, and which social contributions apply all change the result.</p>
      <p>A $100K salary can leave you with very different take-home pay depending on your country's income tax brackets, mandatory social security or pension contributions, and any local or regional taxes. Use your country's official tax calculator, or a reputable payroll calculator, and work from net annual pay rather than gross. Every comparison that starts from gross is misleading from the first line.</p>
      <p>If you'd be working as a contractor rather than an employee, subtract the costs an employer would normally cover: social contributions, health insurance where it isn't public, and your own pension.</p>

      <h2>Step 2: Convert currency honestly</h2>
      <p>If you're paid in dollars but spend in another currency, the exchange rate is part of your salary. It moves, and it can move against you.</p>
      <p>Two practical points. Use the rate your bank or transfer service will give you after fees, not the mid-market rate you see in a search result. And think in ranges rather than a single number, because a currency that has moved 10% over the past year can do so again. Our <a href="/tools/remote-salary-converter">remote salary converter</a> handles the conversion step; the judgement about how much the rate might move is yours.</p>

      <h2>Step 3: Subtract the costs that don't scale</h2>
      <p>Rent is the obvious one and usually the biggest. But some costs barely change between cities, and those are the ones people underestimate.</p>
      <ul>
        <li><strong>Things priced globally:</strong> laptops, phones, software subscriptions, flights home. These cost roughly the same wherever you live, so they take a bigger bite in a lower-cost city.</li>
        <li><strong>Things priced locally:</strong> rent, food, transport, childcare, services. These are where cheaper cities do save money.</li>
        <li><strong>Things that depend on your status:</strong> private health insurance, visa fees, tax advice. A foreign resident can face costs a local doesn't.</li>
      </ul>
      <p>A useful habit is to build your real monthly budget in the target city, line by line, rather than trusting a single cost-of-living score.</p>

      <h2>Step 4: Compare what's left</h2>
      <p>Now subtract that budget from your net monthly pay. What's left over is the money you can save or spend freely, and it's the only fair basis for comparison.</p>
      <p>Here's an <em>illustration</em> of why this matters. The figures are round numbers chosen to show the method, not measured prices for any real city.</p>
      <ul>
        <li><strong>City A:</strong> net pay after tax of $5,800 a month, living costs of $4,600. Left over: <strong>$1,200</strong>.</li>
        <li><strong>City B:</strong> net pay after tax of $5,200 a month, living costs of $2,700. Left over: <strong>$2,500</strong>.</li>
      </ul>
      <p>City A pays more after tax, but City B leaves you with roughly twice as much to save. That's the result most salary comparisons hide.</p>
      <blockquote>Two people on the same salary can end up living very different lives. Compare what's left after tax, currency and rent, and the better offer often changes.</blockquote>

      <p>For a quick first pass across countries, the <a href="/tools/salary-purchasing-power">salary purchasing-power calculator</a> applies World Bank price levels to any salary. It works at national level, so treat it as a starting point for your own budget.</p>

      <h2>Where this goes wrong</h2>
      <ul>
        <li><strong>Assuming a remote employer won't care where you live.</strong> Many companies pay by location band, and moving can change your salary. Check before you plan around it.</li>
        <li><strong>Ignoring tax residency.</strong> Spending enough time in a country can make you tax resident there, whatever your employer's location. Our guide to <a href="/posts/digital-nomad-visas-2026">digital nomad visas</a> covers the basics.</li>
        <li><strong>Using averages.</strong> An average rent figure tells you little about the neighbourhood you'd choose.</li>
      </ul>

      <h2>Using this in a negotiation</h2>
      <p>Once you know what a salary is really worth to you, you can negotiate on that basis rather than on the headline number. We cover the tactics in <a href="/posts/remote-salaries-2026-negotiate-the-premium">how to negotiate a remote salary premium</a>. And if you're comparing roles by location, the <a href="/remote-jobs-in-europe">European</a> and <a href="/remote-jobs-in-usa">US remote boards</a> make it easy to see what employers in each market are offering.</p>
    `,
    faq: [
      {
        q: "What does the average remote job pay?",
        a: "On our board, among listings that state a salary in US dollars, the median midpoint is about 193,500 dollars, with the middle half between roughly 148,000 and 240,000. That skews high because the board leans towards product, engineering and finance roles, and customer support roles have a median closer to 107,000.",
      },
      {
        q: "How do I compare a salary between two cities?",
        a: "Convert gross pay to net pay after tax for each location, convert currency at the rate you will actually receive, build a realistic monthly budget for each city, and compare what is left over. The amount remaining after living costs is a fairer comparison than the salary itself.",
      },
      {
        q: "Will a remote employer pay me less if I move somewhere cheaper?",
        a: "Some will. Many companies use location-based pay bands, so moving can change your salary. Others pay the same rate everywhere. Check the company's policy before relocating on the assumption your pay will stay the same.",
      },
      {
        q: "Why is a cost-of-living index not enough?",
        a: "Indices are averages and they move over time. They cannot reflect your own rent, household, tax position or currency exposure, which usually decide whether a move actually leaves you better off.",
      },
    ],
  },

  {
    slug: "hourly-vs-annual-remote-pay-converting-offers",
    title: "Hourly vs Annual Remote Pay: How to Compare Offers Properly",
    description:
      "How to compare hourly, annual and monthly remote pay offers, including the hours, paid leave, extra salary payments and costs that change the maths.",
    date: "2026-09-16T08:30:00.000Z",
    author: AUTHOR,
    tags: ["Remote Salaries", "Hourly Pay", "Contractor Rates", "Salary Comparison"],
    readMinutes: 5,
    html: `
      <p>An hourly rate of $60 and a salary of $120,000 look like they describe the same job. Multiply $60 by forty hours a week and fifty-two weeks and you get $124,800, so the hourly rate seems slightly better. In most cases it isn't. The multiplication skipped almost everything that decides what you actually take home.</p>
      <p>Here's how to convert between hourly, monthly and annual offers without fooling yourself.</p>

      <h2>The standard conversion, and what it assumes</h2>
      <p>The common shortcut in the US is to treat a year as <strong>2,080 hours</strong>: forty hours a week for fifty-two weeks. Divide an annual salary by 2,080 to get an hourly equivalent, or multiply an hourly rate by 2,080 to get an annual one.</p>
      <p>That number assumes you're paid for every one of those weeks. Salaried employees usually are, because holidays and paid leave are built into the salary. Hourly workers and contractors usually aren't. Every week you don't work is a week you don't bill.</p>

      <h2>Count the hours you'll really be paid for</h2>
      <p>Start with 52 weeks and subtract the time you won't be working:</p>
      <ul>
        <li>Public holidays.</li>
        <li>Holiday or vacation time.</li>
        <li>Sick days.</li>
        <li>For contractors, the gaps between engagements and the time spent finding the next one.</li>
      </ul>
      <p>As an <em>illustration</em>: take away 10 public holidays, 20 days of holiday and 5 sick days, and you're down to about 45 working weeks. That's roughly <strong>1,800 paid hours</strong> rather than 2,080. At $60 an hour that's $108,000, not $124,800. The hourly offer is now noticeably behind the salaried one.</p>

      <h2>Add back what an employer would have paid</h2>
      <p>A salaried employee's cost to a company is more than the salary. Depending on the country, the employer typically also pays social contributions, part of a pension, and often health insurance. As a contractor, all of that becomes yours to cover.</p>
      <p>That's why contractor day rates are normally set well above the salaried equivalent. A contract rate that simply matches the salary divided by 2,080 usually leaves you worse off once you've paid for everything an employee gets for free. Before comparing, list what you'd need to buy yourself and cost it out.</p>
      <blockquote>A contractor's rate isn't comparable to a salary until you've subtracted everything the salary quietly included.</blockquote>

      <h2>Monthly salaries and the extra payments</h2>
      <p>In much of Europe, pay is quoted monthly rather than annually, and some countries add payments that a simple "multiply by twelve" misses.</p>
      <ul>
        <li><strong>Portugal</strong> requires holiday and Christmas subsidies by law, so employees normally receive fourteen payments a year.</li>
        <li><strong>Spain</strong> has two extra payments set by employment law, though they're frequently spread across twelve monthly payslips.</li>
        <li><strong>The Netherlands</strong> requires a holiday allowance of at least 8% of annual gross salary.</li>
        <li><strong>Austria</strong> commonly pays a thirteenth and fourteenth salary through collective agreements.</li>
      </ul>
      <p>So when a European offer quotes a monthly figure, ask directly how many payments there are in a year, and whether any extra payments are already included. Multiply by twelve when the answer is fourteen and you'll understate the offer by about 14%.</p>

      <h2>Watch the currency and the band</h2>
      <p>Two more things change the comparison.</p>
      <p><strong>Currency.</strong> An offer in a currency you don't spend carries exchange-rate risk. Convert at the rate you'd actually receive after fees, and consider how much that rate has moved recently. The <a href="/tools/remote-salary-converter">remote salary converter</a> handles the arithmetic.</p>
      <p><strong>Bands.</strong> Many postings quote a range rather than a figure. On our board, among US-dollar listings, the median range is about <strong>33% wide</strong> from bottom to top, and a quarter are at least <strong>two-thirds</strong> wide. A wide band tells you more about the employer's flexibility than about what you'll be offered, so plan around the lower half unless you have reason to expect otherwise.</p>

      <h2>A quick worked comparison</h2>
      <p>Suppose you're weighing a salaried role at $110,000 against a contract at $65 an hour.</p>
      <ol>
        <li>Paid hours on the contract: assume 1,800, not 2,080.</li>
        <li>Contract gross: 1,800 × $65 = $117,000.</li>
        <li>Subtract the costs the salary would have covered, such as insurance, pension and contributions. Suppose that's $15,000.</li>
        <li>Comparable contract value: about $102,000.</li>
      </ol>
      <p>On that illustration the salaried role is ahead, despite the contract's higher headline. Your own numbers will differ, but the method holds.</p>

      <p>To run this comparison with your own numbers, including benefits and contractor costs, use the <a href="/tools/offer-comparator">offer comparison calculator</a>.</p>

      <h2>Before you sign</h2>
      <p>Ask how many payments there are each year, whether leave is paid, who pays which contributions, and what currency you'll be paid in. Those four answers settle most comparisons. For the bigger picture on what's worth negotiating, see <a href="/posts/remote-benefits-decoded-by-region">remote benefits by region</a>, and browse <a href="/remote-management-finance-jobs">finance and operations roles</a> or <a href="/remote-sales-marketing-jobs">sales and marketing roles</a> to see how employers in those fields present pay. Sales offers need extra care, since base pay plus commission is a conversion puzzle of its own.</p>
    `,
    faq: [
      {
        q: "How many hours are in a working year?",
        a: "The common US convention is 2,080 hours, which is 40 hours a week for 52 weeks. It assumes every week is paid. Once public holidays, leave and sick days are removed, a more realistic figure for someone paid only for hours worked is often around 1,800.",
      },
      {
        q: "Why should a contractor rate be higher than a salary equivalent?",
        a: "Because contractors pay for things an employer normally covers, such as social contributions, pension, health insurance where it is not public, and unpaid time between contracts. A rate that only matches the salary divided by working hours usually leaves a contractor worse off.",
      },
      {
        q: "How many salary payments are there in a year in Europe?",
        a: "It depends on the country. Portugal normally has fourteen payments by law, Spain has two extra payments that are often spread across twelve payslips, Austria commonly pays fourteen through collective agreements, and the Netherlands requires a holiday allowance of at least 8 percent of annual salary. Always ask how many payments an offer includes.",
      },
      {
        q: "How should I treat a salary range in a job posting?",
        a: "Treat it as the employer's negotiating room rather than a promise. On our board the median US-dollar range is about a third wide from bottom to top, so it is safer to plan around the lower half unless your experience clearly places you higher.",
      },
    ],
  },

  {
    slug: "salary-transparency-laws-2026",
    title: "Salary Transparency Laws in 2026: Where Pay Ranges Are Required",
    description:
      "Which US states, Canadian provinces and EU rules require employers to show pay ranges in job postings, and what to do when a remote role hides its salary.",
    date: "2026-09-16T08:00:00.000Z",
    author: AUTHOR,
    tags: ["Pay Transparency", "Salary Laws", "Job Postings", "Remote Salaries"],
    readMinutes: 5,
    html: `
      <p>Only <strong>19%</strong> of the listings on our board state a salary: <strong>1,115</strong> out of <strong>5,854</strong>. Pay transparency laws do exist. The trouble is that they're patchy, they cover some employers and not others, and remote work makes it hard to tell which rules apply to which job.</p>
      <p>This is a practical guide to where disclosure is required and how to use those rules. Laws in this area change frequently, so treat the dates below as a starting point and check the current rules for any jurisdiction that matters to you. This isn't legal advice.</p>

      <h2>United States: a growing patchwork</h2>
      <p>There's no federal requirement to publish pay ranges. Instead, a growing number of states and cities have their own laws, usually requiring a good-faith range in job postings once an employer passes a size threshold. Some of the better-known ones, with the dates their posting requirements took effect:</p>
      <ul>
        <li><strong>Colorado</strong> was one of the first, in January 2021.</li>
        <li><strong>New York City</strong> followed in November 2022, and <strong>New York State</strong> in September 2023.</li>
        <li><strong>California</strong> and <strong>Washington</strong> started in January 2023.</li>
        <li><strong>Hawaii</strong> (January 2024), <strong>Washington, D.C.</strong> (June 2024) and <strong>Maryland</strong> (October 2024) came next.</li>
        <li><strong>Illinois</strong> and <strong>Minnesota</strong> joined in January 2025.</li>
        <li><strong>New Jersey</strong> (June 2025), <strong>Vermont</strong> (July 2025) and <strong>Massachusetts</strong> (October 2025) followed later that year.</li>
      </ul>
      <p>Thresholds, penalties and details vary. Some laws apply only above a certain number of employees; some require benefits information too.</p>

      <h2>The remote-work wrinkle</h2>
      <p>Here's where it gets interesting for remote roles. Several of these laws have been read to cover remote positions that <em>could</em> be filled by someone living in that state, even when the employer is based elsewhere. That's one reason many companies now publish ranges on remote postings open across the US: it's simpler than working out exactly which state a successful candidate might live in.</p>
      <p>It also explains a pattern you'll notice. On our board, <strong>19.2%</strong> of region-restricted listings state a salary, compared with <strong>16.3%</strong> of work-from-anywhere listings. Roles tied to a specific jurisdiction are a little more likely to be covered by a local rule.</p>

      <h2>Canada: provinces leading</h2>
      <ul>
        <li><strong>British Columbia</strong> has required pay ranges in publicly advertised job postings since November 2023, under its Pay Transparency Act.</li>
        <li><strong>Ontario</strong> brought in a requirement for publicly advertised postings from January 2026, for employers above a size threshold.</li>
      </ul>
      <p>Other provinces have been considering similar rules, so it's worth checking the one you're applying in.</p>

      <h2>Europe: the EU Pay Transparency Directive</h2>
      <p>The EU adopted its Pay Transparency Directive in 2023, with a deadline of <strong>7 June 2026</strong> for member states to write it into national law. Among other things, it gives candidates the right to receive information about starting pay or its range before an interview, and it restricts employers from asking about your pay history.</p>
      <p>Transposition hasn't moved at the same speed everywhere, so the practical rules depend on the country. If you're applying to an EU employer, it's worth checking how your country, or theirs, has implemented it.</p>

      <h2>United Kingdom</h2>
      <p>The UK doesn't have a general legal requirement to include salary ranges in job adverts. Larger employers do have to publish gender pay gap figures, which is related but different. Many UK employers publish ranges anyway, and the share is rising, but it isn't something you can rely on by law.</p>

      <h2>What to do when a remote role hides its pay</h2>
      <p>Most listings still won't show a range, so it helps to have a routine.</p>
      <ol>
        <li><strong>Check where the role is based or open to.</strong> If it's open to people in a state or province with a disclosure law, the employer may already be required to share a range, in some places only when you ask.</li>
        <li><strong>Ask early and directly.</strong> "Could you share the salary range for this role?" is a normal question, and asking before investing hours in interviews saves everyone's time.</li>
        <li><strong>Benchmark independently.</strong> Look at comparable roles that <em>do</em> publish ranges. Our listings show where each role's pay sits against comparable roles on the board, and where the employer publishes nothing, the typical range for similar roles instead.</li>
        <li><strong>Don't anchor first if you can avoid it.</strong> Where the law restricts questions about pay history, you're entitled not to answer them.</li>
      </ol>
      <blockquote>A hidden salary isn't always a bad sign. But it is always a question worth asking before the third interview.</blockquote>

      <p>To see what employers who do publish pay are offering in your field, try the <a href="/tools/salary-band-estimator">remote salary band estimator</a>, which is built from the listings on our board.</p>

      <h2>Where to look</h2>
      <p>If you'd rather start with roles that are more likely to show pay, the <a href="/remote-jobs-in-usa">US remote board</a> is a good place to begin, given how many states now require it, and the <a href="/remote-jobs-in-canada">Canadian remote board</a> covers the provinces with their own rules. For how to compare the numbers once you have them, see our guide to <a href="/posts/hourly-vs-annual-remote-pay-converting-offers">converting hourly and annual pay</a>, and use the <a href="/tools/remote-salary-converter">salary converter</a> when currencies differ.</p>
    `,
    faq: [
      {
        q: "Is there a federal pay transparency law in the United States?",
        a: "No. Pay range disclosure in the US is governed by individual states and cities. A growing number, including Colorado, California, Washington, New York, Illinois and others, require ranges in job postings once an employer passes a size threshold.",
      },
      {
        q: "Do pay transparency laws apply to remote jobs?",
        a: "Often they can. Several state laws have been interpreted to cover remote roles that could be filled by someone living in that state, even when the employer is based elsewhere. This is one reason many companies publish ranges on US-wide remote postings.",
      },
      {
        q: "When does the EU Pay Transparency Directive apply?",
        a: "The EU adopted the directive in 2023 and set 7 June 2026 as the deadline for member states to transpose it into national law. It gives candidates the right to pay information before an interview and restricts questions about pay history. How it applies in practice depends on each country's implementation.",
      },
      {
        q: "What should I do if a job posting has no salary?",
        a: "Ask for the range early and directly, check whether the role is open to a jurisdiction that requires disclosure, and benchmark against similar roles that do publish pay. Asking before investing in several interviews saves time on both sides.",
      },
    ],
  },

  {
    slug: "remote-benefits-decoded-by-region",
    title: "Remote Job Benefits by Region: Health, Pensions and Equipment",
    description:
      "What remote benefits are standard in the US, UK, Europe and Asia-Pacific, which ones are worth negotiating, and what changes if you're hired as a contractor.",
    date: "2026-09-16T07:30:00.000Z",
    author: AUTHOR,
    tags: ["Remote Benefits", "Health Insurance", "Equipment Stipend", "Pensions"],
    readMinutes: 5,
    html: `
      <p>Two remote offers with the same salary can be worth thousands apart once benefits are counted. The difficulty is that "benefits" means something different in almost every country. A package that looks thin next to an American one may be perfectly generous in Europe, simply because the state already provides what the American employer is paying for.</p>
      <p>Here's what's standard where, what's worth negotiating, and the one hiring arrangement that quietly removes most of it.</p>

      <h2>United States: the employer carries more</h2>
      <p>In the US, several things that are public elsewhere fall to the employer, which makes benefits a much bigger part of total pay.</p>
      <ul>
        <li><strong>Health insurance</strong> is the big one. Without a universal public system, employer-sponsored cover is how most working people get insured, and the difference between a good and a poor plan can be thousands of dollars a year in premiums and out-of-pocket costs.</li>
        <li><strong>Retirement plans</strong>, usually a 401(k), often come with an employer match. A match is effectively extra salary, so it's worth knowing the percentage.</li>
        <li><strong>Paid time off</strong> isn't guaranteed by federal law, so the number of days is set by the employer and varies widely.</li>
      </ul>
      <p>For US roles, it's worth comparing the health plan and the retirement match as carefully as the salary.</p>

      <h2>United Kingdom</h2>
      <ul>
        <li>The <strong>NHS</strong> provides healthcare, so private medical insurance is a perk rather than a necessity.</li>
        <li><strong>Workplace pensions</strong> are covered by auto-enrolment, with a legal minimum total contribution of 8% of qualifying earnings, of which the employer pays at least 3%. Many employers pay more.</li>
        <li>Workers are entitled to <strong>5.6 weeks of paid holiday</strong> a year, which for a full-time worker is 28 days and can include bank holidays.</li>
      </ul>

      <h2>European Union</h2>
      <p>Across the EU, public systems cover much of what US employers pay for.</p>
      <ul>
        <li><strong>Healthcare</strong> is largely public or statutory insurance-based, depending on the country.</li>
        <li><strong>Paid annual leave</strong> has an EU-wide floor of four weeks, and many countries set it higher.</li>
        <li><strong>Pensions</strong> are typically a mix of state contributions and occupational schemes.</li>
        <li>Some countries add <strong>extra salary payments</strong> that change the annual total. We cover those in our guide to <a href="/posts/hourly-vs-annual-remote-pay-converting-offers">comparing hourly and annual pay</a>.</li>
      </ul>

      <h2>Asia-Pacific</h2>
      <p>The region varies enormously, but a few systems come up often:</p>
      <ul>
        <li><strong>Australia</strong> requires employers to pay superannuation on top of salary. The guarantee rate rose to 12% from July 2025, so check whether an offer is quoted including or excluding it.</li>
        <li><strong>India</strong> has the Employees' Provident Fund, with contributions from both employer and employee, commonly 12% each of basic salary.</li>
        <li><strong>Singapore</strong> has the Central Provident Fund for citizens and permanent residents, with contributions from both sides.</li>
      </ul>
      <p>"Is super or provident fund included in this number?" is one of the most useful questions to ask on an APAC offer.</p>

      <h2>The benefits specific to remote work</h2>
      <p>Beyond the national systems, remote employers increasingly offer benefits that only make sense when you work from home.</p>
      <ul>
        <li><strong>Equipment budgets.</strong> Either a one-off allowance or a laptop and accessories shipped to you. Ask whether the equipment is yours to keep.</li>
        <li><strong>Home office stipends.</strong> Recurring money towards internet, electricity or furniture.</li>
        <li><strong>Coworking allowances.</strong> Useful if you'd rather not work from the kitchen table every day.</li>
        <li><strong>Learning budgets.</strong> Money for courses, books and conferences.</li>
      </ul>
      <p>You can browse roles that mention these directly: <a href="/remote-jobs-with-equipment-budget">jobs with an equipment budget</a>, <a href="/remote-jobs-with-learning-budget">jobs with a learning budget</a>, and <a href="/remote-jobs-with-health-insurance">jobs that mention health insurance</a>.</p>

      <h2>The arrangement that removes most of this</h2>
      <p>Many companies hiring internationally don't employ you directly. They either use an <strong>employer of record</strong>, which employs you locally on their behalf, or they engage you as a <strong>contractor</strong>.</p>
      <p>Those two are very different. An employer of record usually gives you a proper local employment contract, with the statutory benefits of your country. A contractor arrangement usually gives you none of them. There's no paid leave, no employer pension and no statutory health cover through work, and you become responsible for your own taxes and contributions.</p>
      <blockquote>Before you compare benefits, find out whether you're being employed or engaged. It changes the answer more than any perk on the list.</blockquote>

      <p>To put a number on what working from home costs you, and how much a stipend would cover, try the <a href="/tools/home-office-cost-calculator">home office cost calculator</a>.</p>

      <h2>What's worth negotiating</h2>
      <ol>
        <li><strong>Where the state doesn't provide it:</strong> health cover in the US, retirement matching, paid leave.</li>
        <li><strong>Equipment ownership</strong> and a home office stipend if you'll be working from home full time.</li>
        <li><strong>A learning budget</strong>, which is often easier for an employer to approve than a pay rise.</li>
        <li><strong>The contract type.</strong> If the alternative is a contractor agreement, an employer-of-record arrangement can be worth more than a raise.</li>
      </ol>
      <p>For what the salary itself should be, see <a href="/posts/what-a-100k-remote-salary-really-buys">what a remote salary really buys</a>. And when two offers are in different currencies, run both through the <a href="/tools/remote-salary-converter">remote salary converter</a> before you compare the benefits on top.</p>
    `,
    faq: [
      {
        q: "Why do US remote jobs emphasise health insurance so much?",
        a: "The United States has no universal public health system, so most working people are insured through their employer. That makes the quality of an employer's health plan a significant part of total pay, often worth thousands of dollars a year.",
      },
      {
        q: "What is the minimum pension contribution in the UK?",
        a: "Under auto-enrolment the legal minimum total contribution is 8 percent of qualifying earnings, of which the employer must pay at least 3 percent. Many employers contribute more than the minimum.",
      },
      {
        q: "Is Australian superannuation included in a salary offer?",
        a: "It depends on the offer, so always ask. The superannuation guarantee rate rose to 12 percent from July 2025, and offers may be quoted either including or excluding it, which changes the take-home value noticeably.",
      },
      {
        q: "What is the difference between an employer of record and a contractor?",
        a: "An employer of record employs you locally on a company's behalf, usually with a proper employment contract and the statutory benefits of your country. As a contractor you typically receive none of those benefits and handle your own taxes and contributions.",
      },
    ],
  },
];
