/**
 * News cluster E: money, law and the professions, autumn 2026. Written
 * 8 November 2026. Sources named in each article; estimates, projections
 * and secondary reports are labelled as such.
 */
import type { Post } from "./posts";

export const POSTS_NEWS_E: Post[] = [
  {
    slug: "anthropic-ipo-filing-2026-ai-jobs",
    title: "Anthropic's IPO Filing: What 5,300 Employees and $16B Reveal",
    description:
      "Anthropic's S-1 shows $16.3 billion in first-half revenue from about 5,300 staff. What the filing says about AI companies, hiring and revenue per worker.",
    date: "2026-11-08T04:40:00.000Z",
    author: "Bhargav",
    tags: ["Anthropic", "IPO", "AI Industry", "Tech Hiring", "OpenAI"],
    readMinutes: 6,
    html: `
      <p>On 26 October 2026, Anthropic, the company behind the Claude AI models, publicly filed its registration statement with the US Securities and Exchange Commission, the first formal step toward listing its shares. The filing, known as an S-1, plans a Nasdaq listing under the ticker ANT, with Goldman Sachs and Morgan Stanley leading the offering. It is one of the most anticipated technology listings in years, and the document itself offers the most detailed public look yet at the economics of a frontier AI company.</p>
      <p>This article focuses on what the filing reveals about jobs and the AI industry, rather than on whether the shares are a good investment. We do not give investment advice.</p>

      <h2>The headline numbers</h2>
      <p>According to the filing, as reported by Yahoo Finance and others:</p>
      <ul>
        <li><strong>Revenue</strong> was about $16.3 billion in the first six months of 2026, compared with $4.6 billion for the whole of 2025. Second-quarter revenue alone was about $11.6 billion, up from $4.7 billion in the first quarter.</li>
        <li><strong>Net loss</strong> was about $80.7 billion for the first half. Reporting on the filing attributes most of that to accounting changes in the fair value of bonds convertible into shares, rather than to day-to-day operations. The company reported operating income of about $974 million in the second quarter, after an operating loss in the first.</li>
        <li><strong>Employees</strong> numbered about 5,300 as of 30 September 2026, a figure that nearly tripled in a year.</li>
        <li><strong>Compute commitments</strong> are enormous, including agreements to spend up to $120.5 billion on computing capacity over terms extending into 2029.</li>
      </ul>
      <p>The figures come from secondary coverage of the S-1. Anyone relying on them for a decision should check the filing itself on the SEC's EDGAR system.</p>

      <h2>Revenue per employee: the number that stands out</h2>
      <p>Coverage of the filing highlighted trailing revenue per employee of more than $6.6 million, up from about $1.4 million a year earlier. For comparison, large established software companies typically generate well under $1 million per employee. Even allowing for the fact that much of an AI company's cost goes to computing rather than salaries, the ratio is extraordinary.</p>
      <p>That figure captures something important about the AI industry's effect on jobs. The companies building frontier models generate very large revenue with relatively small workforces, because most of their spending goes to chips, data centres and electricity rather than people. Their growth creates jobs, but the jobs are concentrated in a small number of highly specialised roles, and in the far larger workforce that builds and powers the data centres. Our article on <a href="/posts/big-tech-ai-capex-2026-jobs-data-centers">big tech's AI spending</a> covers that second group.</p>

      <h2>Who AI companies hire</h2>
      <p>Nearly tripling headcount in a year means hiring across the board, not only researchers. Frontier AI companies need engineers for infrastructure, product and security; people in sales, partnerships and customer success to serve business customers; and policy, legal, finance and recruiting teams to run a company of that size. Many of those roles look like jobs at any fast-growing software company, which is why AI firms compete for the same experienced candidates as the rest of the industry.</p>
      <p>Most of those roles are tied to specific offices or countries. AI labs have tended to favour in-person or hybrid work for research and core engineering, though business roles are more varied. If you are interested in working at an AI company, check each listing's location requirements carefully, and see our guide to <a href="/posts/remote-data-and-machine-learning-jobs">remote data and machine learning jobs</a> for the parts of the field that hire remotely most often.</p>

      <h2>The risks the filing names</h2>
      <p>S-1 filings must list the risks a company faces, and Anthropic's goes further than most. According to coverage, it states that AI models might pose catastrophic or existential risks, that insurers may not be able to cover the company's potential liability from a catastrophic incident, and that the business operates in an evolving and uncertain regulatory and political environment. It also describes competition, chiefly from OpenAI and other large developers.</p>
      <p>For workers in the wider economy, the regulatory section is worth noting. AI laws in Europe, California, New York and elsewhere are still taking shape, and the federal government has tried to override state rules. Our article on <a href="/posts/federal-vs-state-ai-laws-preemption-2026">federal versus state AI laws</a> explains where that fight stands.</p>

      <h2>What about OpenAI?</h2>
      <p>OpenAI announced in June 2026 that it had confidentially submitted a draft registration statement to the SEC. A confidential draft does not have to be made public until shortly before a listing. Its chief financial officer, Sarah Friar, reportedly told employees in August that the company would be public in 2027 or sooner, and coverage of Anthropic's filing described OpenAI as delaying its own listing until early 2027. Until it files publicly, its detailed numbers are not available.</p>
      <p>Together with the planned <a href="/posts/spacex-ipo-2026-space-industry-jobs">SpaceX listing</a>, these offerings would put the three most valuable private technology companies on public markets within a short period, at a time when investors are already <a href="/posts/ai-stock-selloff-october-2026-bubble-jobs">nervous about AI valuations</a>.</p>

      <h2>What it means for job seekers</h2>
      <ul>
        <li><strong>AI companies hire beyond research.</strong> Sales, operations, security and support roles at AI firms value domain knowledge and customer experience as much as machine learning expertise.</li>
        <li><strong>Equity is a large part of pay.</strong> At any company approaching a listing, understand how stock awards vest and when they can be sold. Our <a href="/tools/offer-comparator">offer comparator</a> helps weigh equity against salary.</li>
        <li><strong>The largest job effects are elsewhere.</strong> How companies use AI tools matters more for most workers than how many people AI labs employ. The <a href="/posts/anthropic-economic-index-2026-ai-work-automation">Anthropic Economic Index</a> article looks at how AI is used across occupations.</li>
      </ul>
      <p>You can browse current openings across the industry on <a href="/jobs">all remote jobs</a>, or look at <a href="/remote-regional-jobs">remote regional jobs</a> if you are outside the US.</p>
    `,
    faq: [
      { q: "When did Anthropic file for its IPO?", a: "Anthropic publicly filed its S-1 registration statement with the SEC on 26 October 2026, planning a Nasdaq listing under the ticker ANT." },
      { q: "How much revenue does Anthropic make?", a: "According to coverage of the filing, about $16.3 billion in the first half of 2026, compared with $4.6 billion for all of 2025." },
      { q: "How many people work at Anthropic?", a: "About 5,300 as of 30 September 2026, nearly triple the figure a year earlier, according to the filing as reported by Yahoo Finance." },
      { q: "Is OpenAI going public too?", a: "OpenAI confidentially submitted a draft registration statement in June 2026. Its CFO reportedly told staff it would be public in 2027 or sooner, and it has not filed publicly yet." },
    ],
  },
  {
    slug: "ai-stock-selloff-october-2026-bubble-jobs",
    title: "AI Stocks Fell Hard in October. What a Bubble Would Mean for Jobs",
    description:
      "The Nasdaq had its sharpest fall since June as investors questioned AI spending. What the selloff signals, and how an AI bust could affect jobs.",
    date: "2026-11-08T04:40:30.000Z",
    author: "Bhargav",
    tags: ["AI Bubble", "Stock Market", "Tech Industry", "Job Market", "Economy"],
    readMinutes: 6,
    html: `
      <p>For most of the past three years, every warning that AI stocks were in a bubble has been followed by new record highs. October 2026 was different enough to make people pay attention. On 22 October, the Nasdaq Composite fell 2.6 percent, its steepest one-day drop since early June, leaving it nearly 6 percent below the record set two weeks earlier, according to Al Jazeera's market report. Meta fell almost 7 percent after raising its 2026 capital spending forecast to between $135 billion and $145 billion, and the selling spread to Amazon, Nvidia, Intel, AMD and other AI-linked companies.</p>
      <p>This article looks at why investors are worried, what analysts disagree about, and what an AI bust could mean for jobs, the question that matters most to our readers.</p>

      <h2>What triggered the selling</h2>
      <p>The immediate trigger was spending. Investors have long accepted huge AI budgets because they expected the spending to pay off. When Meta raised its forecast again while reporting profit below expectations, the market reacted to the gap between what companies are spending and what they are earning from it. Jay Goldberg of Seaport Research Partners told Al Jazeera the moves were driven more by sentiment than fundamentals, saying investors had simply decided to be afraid that week, while acknowledging legitimate concerns about the AI trade.</p>
      <p>The backdrop made investors more sensitive. Oil prices have been above $100 a barrel since early October, inflation has risen, and the Federal Reserve raised interest rates in September for the first time in more than three years. Higher rates make borrowed money more expensive, and the AI build-out increasingly depends on borrowing. Our article on <a href="/posts/fed-rate-hike-2026-inflation-tech-hiring">the Fed's rate hike</a> covers that side.</p>

      <h2>The case that it is a bubble</h2>
      <ul>
        <li><strong>The revenue gap.</strong> Research firm Gartner estimated in October that AI data centre owners would need about $8.5 trillion in cumulative revenue through 2030 to cover their spending, financing costs and a reasonable return, while the AI revenue flowing to data centres would reach about $3.6 trillion at most. It estimated more than $4 trillion in assets could face write-downs through 2032.</li>
        <li><strong>The capital cycle.</strong> A Bank of America note in mid-October described the AI boom as a classic capital cycle, which historically ends in disappointment even when the technology works, as competition drives prices down. It noted that business AI spending had started to dip as falling prices per unit of AI output offset rising volumes.</li>
        <li><strong>Debt.</strong> Fortune reported that CoreWeave, a heavily indebted provider of AI computing, saw its share price fall and the cost of insuring its debt against default rise sharply.</li>
        <li><strong>Concentration.</strong> NPR's Planet Money cited a J.P. Morgan analysis finding that 42 AI-related companies accounted for about two-thirds of S&amp;P 500 gains since early 2024.</li>
      </ul>

      <h2>The case against</h2>
      <p>Others point out that the largest AI companies are highly profitable, that demand for AI chips remains strong according to suppliers such as Taiwan Semiconductor, and that previous selloffs have been bought quickly. Many analysts describe October's moves as a correction rather than a crash. Nobody can time a bubble reliably, and anyone claiming certainty either way is guessing.</p>

      <h2>What a bust would mean for jobs</h2>
      <p>This is where the story gets uncomfortable. Writing for NPR's Planet Money, Greg Rosalsky described a possible "double whammy": an AI bust triggers a recession, and the recession accelerates the replacement of workers by AI. The idea rests on research by economists Nir Jaimovich and Henry Siu, who found that from 1990 to 2017, 88 percent of the decline in the share of Americans employed in routine, automatable jobs happened during recessions or the months around them. Companies tend to automate when they are forced to cut costs, not when times are good.</p>
      <p>There is an irony in that scenario. Price competition between AI providers could leave them unprofitable while making AI cheaper for every other business to adopt. Investors would lose money, and workers in exposed jobs could lose work, at the same time.</p>
      <p>A bust would also hit tech jobs directly. AI companies, chipmakers and data centre builders have been among the few strong hiring areas of 2026. A sharp pullback would slow hiring in infrastructure, sales and engineering, much as the dot-com crash did in 2001. The roles least exposed would be those tied to products customers keep paying for regardless of market mood.</p>

      <h2>How to prepare without panicking</h2>
      <ul>
        <li><strong>Keep your skills portable.</strong> Experience that transfers across industries is the best insurance against a sector downturn.</li>
        <li><strong>Watch your employer's finances.</strong> Companies with heavy debt and no profits are most exposed if funding tightens.</li>
        <li><strong>Build a cushion.</strong> Downturns lengthen job searches. Several months of savings buys time to find the right role rather than the first one.</li>
        <li><strong>Keep a routine.</strong> Searching steadily before you need to is easier than starting from zero. Our <a href="/posts/30-minute-remote-job-search-routine">30-minute job search routine</a> is designed for exactly that.</li>
      </ul>
      <p>Markets will keep swinging, and the AI debate will not be settled by one bad week. You can see which companies are still hiring on <a href="/jobs">all remote jobs</a>, and the narrower set open across borders on <a href="/jobs?scope=worldwide">worldwide remote jobs</a>.</p>
    `,
    faq: [
      { q: "Why did AI stocks fall in October 2026?", a: "On 22 October the Nasdaq fell 2.6 percent after Meta raised its 2026 capital spending forecast to $135 billion to $145 billion while missing profit expectations. Rising oil prices, inflation and higher interest rates added to concerns about AI spending." },
      { q: "Is AI a bubble?", a: "Analysts disagree. Gartner estimates AI data centre owners need about $8.5 trillion in revenue through 2030 against at most $3.6 trillion flowing to them, and Bank of America describes a classic capital cycle. Others point to strong profits and chip demand. Nobody can time a bubble reliably." },
      { q: "Would an AI crash cause job losses?", a: "It could, in two ways. Tech hiring in AI and data centres would slow, and research by Jaimovich and Siu found that 88 percent of the decline in routine jobs from 1990 to 2017 happened around recessions, suggesting a downturn could speed up automation." },
      { q: "How can I protect my career from a tech downturn?", a: "Keep skills portable across industries, watch your employer's finances, build savings to cover a longer job search, and keep a steady search routine before you need one." },
    ],
  },
  {
    slug: "fed-rate-hike-2026-inflation-tech-hiring",
    title: "The Fed Is Raising Rates Again. What It Means for Tech Hiring",
    description:
      "The Federal Reserve raised rates in September 2026 as inflation hit 3.7%, then held in October with two dissents. How higher rates affect tech jobs.",
    date: "2026-11-08T04:41:00.000Z",
    author: "Bhargav",
    tags: ["Federal Reserve", "Interest Rates", "Inflation", "Tech Hiring", "Economy"],
    readMinutes: 6,
    html: `
      <p>For most of 2024 and 2025, the question was when the Federal Reserve would cut interest rates. In 2026, it has turned around. On 16 September, the Fed raised its benchmark rate by a quarter point to a range of 3.75 to 4 percent, its first increase in more than three years. At its next meeting, on 28 October, it held rates steady, but two officials, Governor Lisa Cook and Cleveland Fed President Beth Hammack, dissented in favour of another hike.</p>
      <p>Interest rates rarely feature in career advice, but they have shaped the tech job market more than almost anything else in the past five years. Here is what is happening and why it matters for anyone looking for work.</p>

      <h2>Why rates are going up</h2>
      <p>The cause is inflation, driven largely by energy. The US-Iran war has pushed oil prices above $100 a barrel since early October, according to Fortune. Annual consumer price inflation rose to 3.7 percent in September, up from 3.4 percent in July and August, with gasoline prices up about 34 percent from a year earlier, according to the Bureau of Labor Statistics data cited in that report. The Fed's target is 2 percent.</p>
      <p>Fed chair Kevin Warsh acknowledged the role of oil after the October meeting, saying he was not going to be the person who claims oil prices have not gone up. A hotter-than-expected inflation report in mid-October raised expectations of another increase, though some reporting suggests the Fed may wait.</p>

      <h2>How interest rates reach the job market</h2>
      <p>The link between the Fed and your job search runs through company finances:</p>
      <ul>
        <li><strong>Startups and venture funding.</strong> When rates rise, investors can earn more from safe assets, so they demand more from risky ones. Venture funding tightens, and startups that depend on it slow hiring or cut staff. This was the main driver of the 2022 and 2023 tech layoffs.</li>
        <li><strong>Growth companies.</strong> Companies valued on future profits are hit hardest when rates rise, because those future profits are worth less today. They respond by cutting costs, and payroll is the largest cost.</li>
        <li><strong>Borrowing for AI.</strong> The AI build-out increasingly relies on debt. Higher borrowing costs make data centres more expensive and put pressure on heavily indebted companies, as our article on <a href="/posts/ai-stock-selloff-october-2026-bubble-jobs">the October AI selloff</a> explains.</li>
        <li><strong>Consumer demand.</strong> Higher rates make mortgages, car loans and credit card debt more expensive, which cools spending and, eventually, hiring across the economy.</li>
      </ul>

      <h2>Where the job market stands</h2>
      <p>The labour market is cooling but not collapsing. Unemployment has hovered around 4.2 to 4.3 percent for much of the past year, and job growth has been weak and concentrated in a few sectors. Our article on <a href="/posts/us-job-market-stalls-september-2026">the stalled US job market</a> covers the most recent official data. That combination, rising prices with weak hiring, is uncomfortable for the Fed: raising rates fights inflation but risks pushing unemployment higher.</p>

      <h2>What it means for tech job seekers</h2>
      <p>A quarter-point increase on its own will not change the market overnight. But the direction matters. If rates keep rising, expect:</p>
      <ul>
        <li><strong>Slower startup hiring,</strong> especially at companies that have not reached profitability and depend on new funding rounds.</li>
        <li><strong>More scrutiny of every role.</strong> Companies will approve fewer new positions and take longer to fill them. Our guide on <a href="/posts/ghost-jobs-how-to-tell-a-role-is-still-open">ghost jobs</a> helps you spot listings that are not really being filled.</li>
        <li><strong>A premium on profitability.</strong> Profitable companies can keep hiring when money is expensive. Their stability becomes more valuable than a startup's equity promise.</li>
        <li><strong>Pressure on real pay.</strong> With inflation at 3.7 percent and 2027 raise budgets around 3.5 percent, many workers face a small real pay cut. Our article on <a href="/posts/salary-increase-budgets-2027">2027 pay raise budgets</a> covers the numbers.</li>
      </ul>

      <h2>Practical steps</h2>
      <ul>
        <li><strong>Ask about funding and runway</strong> when interviewing at startups. It is a normal question, and a clear answer is a good sign.</li>
        <li><strong>Negotiate with inflation in mind.</strong> A raise or offer below inflation reduces your purchasing power. Use the <a href="/tools/salary-purchasing-power">salary purchasing power tool</a> to see what an offer is really worth.</li>
        <li><strong>Prefer roles close to revenue.</strong> Sales, customer success and engineering on core products tend to survive cost cuts better than internal projects.</li>
        <li><strong>Widen your search geographically.</strong> Remote roles open across regions give you more options when your local market slows. See <a href="/remote-regional-jobs">remote regional jobs</a> for roles that accept candidates beyond one country.</li>
      </ul>
      <p>For those outside the US, the Fed still matters. Its decisions affect global borrowing costs, currency values and the hiring plans of US companies that employ remote staff worldwide. A stronger dollar makes dollar-denominated remote salaries worth more in local terms, which our <a href="/tools/remote-salary-converter">remote salary converter</a> can show.</p>
      <p>You can browse current openings on <a href="/jobs">all remote jobs</a>, filtered by role and region, and keep an eye on which employers are still growing.</p>
    `,
    faq: [
      { q: "Did the Fed raise interest rates in 2026?", a: "Yes. On 16 September 2026 the Federal Reserve raised its benchmark rate by a quarter point to 3.75 to 4 percent, its first increase in more than three years. It held rates steady on 28 October, with two officials dissenting in favour of another hike." },
      { q: "Why is inflation rising in 2026?", a: "Mainly because of energy prices. The US-Iran war pushed oil above $100 a barrel from early October, and annual inflation rose to 3.7 percent in September, with gasoline up about 34 percent from a year earlier." },
      { q: "How do interest rates affect tech jobs?", a: "Higher rates tighten venture funding, reduce the value of growth companies and raise borrowing costs, which leads companies, especially unprofitable startups, to slow hiring or cut staff." },
      { q: "Should I avoid startups when rates are rising?", a: "Not necessarily, but ask about funding, runway and profitability. Startups with strong revenue or recent funding are much safer than those that need to raise money soon." },
    ],
  },
  {
    slug: "electrician-shortage-data-centers-2026",
    title: "AI's Biggest Bottleneck Isn't Chips. It's Electricians",
    description:
      "Microsoft says electrician shortages are the top constraint on its US data centre build-out. Why AI needs so many electricians, and what they earn.",
    date: "2026-11-08T04:41:30.000Z",
    author: "Bhargav",
    tags: ["Electricians", "Skilled Trades", "Data Centers", "AI Infrastructure", "Apprenticeships"],
    readMinutes: 6,
    html: `
      <p>The AI boom is usually described in terms of chips, models and billions of dollars of spending. But in March 2026, Microsoft president Brad Smith named a different constraint as the number one problem slowing the company's US data centre expansion: a shortage of electricians. Fortune reported that some electricians were commuting up to 75 miles to reach data centre sites. The bottleneck for the most advanced technology of the decade turns out to be one of the oldest skilled trades.</p>

      <h2>Why data centres need so many electricians</h2>
      <p>Data centres are, at their core, enormous electrical installations. According to the International Brotherhood of Electrical Workers (IBEW), electrical work accounts for 45 to 70 percent of the construction cost of a data centre. A single large site can need up to 1,500 workers at the peak of construction. Every rack of AI chips needs power distribution, backup systems, cooling and monitoring, and every new site needs a connection to the grid, which in turn needs new substations and transmission lines.</p>
      <p>Multiply that by the hundreds of data centres being built and the scale becomes clear. Estimates of the shortfall vary widely depending on what is counted:</p>
      <ul>
        <li>The IBEW projects that more than 300,000 new electricians will be needed over the next decade for AI-driven demand.</li>
        <li>McKinsey estimates the US needs about 130,000 additional trained electricians between 2023 and 2030 just for AI infrastructure.</li>
        <li>The Bureau of Labor Statistics projects around 81,000 electrician openings a year over the coming decade, across all types of work.</li>
      </ul>
      <p>At the same time, the workforce is ageing. The IBEW expects about 20,000 electricians to retire each year, and nearly 30 percent of union electricians are between 50 and 70.</p>

      <h2>What electricians earn</h2>
      <p>Shortages push pay up, and data centre work pays a premium. The BLS reported a median electrician wage of $62,350 in May 2024, but data centre work in tight markets pays far more. Fortune reported that at IBEW Local 26 in northern Virginia, the world's largest data centre market, apprentices start at around $26 an hour and journeymen earn about $59.50 an hour, more than $120,000 a year, with overtime and foreman roles approaching $200,000. Local 26's membership has more than doubled since 2018.</p>
      <p>Those figures are for one of the hottest markets in the country, so they are not typical everywhere. But wage growth has been strong across the trade, according to Indeed data cited in industry reporting.</p>

      <h2>The path in: apprenticeships</h2>
      <p>Becoming a licensed electrician usually takes an apprenticeship of four to five years, combining paid on-the-job training with classroom study. Apprentices earn from the first day and typically finish with little or no student debt, which has made the route increasingly attractive to young people facing a difficult white-collar job market. The National Electrical Contractors Association told Fortune that commercial apprenticeship applications rose from about 70,000 in 2022 to 120,000 in 2024, more than the available places.</p>
      <p>Employers and technology companies are investing in training. Google pledged $15 million to the Electrical Training Alliance, and community colleges and technical schools report sharp enrolment increases in electrical programmes.</p>

      <h2>The risks</h2>
      <p>Construction booms end. An IBEW local leader compared the data centre wave to "eating an elephant", warning that work drops sharply once construction is finished. During the 2008 recession, nearly one in four IBEW construction members were out of work. If AI spending slows, as some analysts fear after <a href="/posts/ai-stock-selloff-october-2026-bubble-jobs">October's market selloff</a>, data centre construction would be among the first things cut.</p>
      <p>The skills, however, are durable. Electricians who learn data centre power systems also work on factories, hospitals, renewable energy, electric vehicle charging and grid upgrades, all of which need electrical work regardless of what happens to AI.</p>

      <h2>The remote angle</h2>
      <p>Electrical work itself is not remote. But the boom creates remote and hybrid jobs around it: electrical engineers and designers who plan installations, project managers and estimators, energy analysts, grid planners, procurement and supply chain specialists, and the software engineers who build power monitoring and building management systems. If you have an engineering or construction background, our article on <a href="/posts/big-tech-ai-capex-2026-jobs-data-centers">big tech's AI spending</a> covers where those roles are, and our guide to <a href="/posts/best-remote-jobs-without-tech-background-2026">remote jobs without a tech background</a> covers adjacent operational roles.</p>

      <h2>What it says about AI and work</h2>
      <p>The electrician shortage is a useful corrective to the idea that AI only destroys jobs. Building and running AI creates enormous demand for physical, skilled work that cannot be automated any time soon. Some of the strongest job prospects of the AI era belong to people who wire, cool and power the machines, not just those who program them.</p>
      <p>For those weighing a career change, our <a href="/posts/remote-career-change-guide">career change guide</a> covers how to evaluate a new field. And if you are looking for office-based or remote roles connected to infrastructure, you can browse <a href="/jobs">all remote jobs</a> or check <a href="/remote-regional-jobs">remote regional jobs</a> outside the US.</p>
    `,
    faq: [
      { q: "Is there an electrician shortage because of AI?", a: "Yes. Microsoft president Brad Smith said in March 2026 that a shortage of electrical talent was the top constraint on its US data centre expansion. The IBEW projects more than 300,000 new electricians are needed over the next decade for AI-driven demand." },
      { q: "How much do data centre electricians earn?", a: "It varies by market. The BLS median for electricians was $62,350 in May 2024, but in northern Virginia, IBEW Local 26 journeymen earn about $59.50 an hour, over $120,000 a year, with overtime and foreman roles approaching $200,000." },
      { q: "How long does it take to become an electrician?", a: "Usually four to five years through an apprenticeship that combines paid work with classroom training. Apprentices earn from the start and typically finish with little or no student debt." },
      { q: "Will the data centre boom last?", a: "Nobody knows. Construction work drops after projects finish, and an AI spending slowdown would hit data centre building. But electrical skills transfer to factories, hospitals, renewables, EV charging and grid work." },
    ],
  },
  {
    slug: "wall-street-banks-ai-job-cuts-2026",
    title: "Wall Street Banks Say AI Means Fewer Jobs. What the Data Shows",
    description:
      "Bank CEOs now say openly that AI will reduce headcount, and the six largest US banks cut about 15,000 jobs in Q1 2026. Who is affected, and who is still hired.",
    date: "2026-11-08T04:42:00.000Z",
    author: "Bhargav",
    tags: ["Banking", "Finance Jobs", "AI Automation", "Layoffs", "Wall Street"],
    readMinutes: 6,
    html: `
      <p>For several years, bank chief executives described AI in careful terms: a tool to help employees, not replace them. In 2026, that language changed. Wells Fargo's Charlie Scharf said that anyone claiming AI will not reduce headcount is either uninformed or not being honest. JPMorgan's Jamie Dimon said AI will eliminate jobs and that people should stop pretending otherwise, while describing the shift as a large redeployment of staff. Bank of America's Brian Moynihan credited AI with saving the work of about 2,000 engineering roles.</p>
      <p>Here is what the numbers show about AI and banking jobs, and where the hiring is still happening.</p>

      <h2>The first-quarter numbers</h2>
      <p>According to an analysis by The Next Web of first-quarter 2026 results and disclosures, the six largest US banks had about 15,000 fewer employees combined while posting about $47 billion in profit, up 18 percent from a year earlier. The article did not break down the cuts by bank, and its figures come from earnings calls and company disclosures rather than a single official source.</p>
      <ul>
        <li><strong>JPMorgan Chase</strong> held overall headcount roughly steady at about 318,500, but the mix shifted: operations roles fell about 4 percent and support roles about 2 percent, while client-facing and revenue roles grew about 4 percent. Its 2026 technology budget is about $19.8 billion.</li>
        <li><strong>Citigroup</strong> is in the middle of a plan to cut about 20,000 roles by the end of 2026, and chief executive Jane Fraser has said AI and automation will let the bank run middle-office and operations functions with fewer people.</li>
        <li><strong>Wells Fargo</strong> has shrunk from about 275,000 employees in 2019 to just over 210,000 by late 2025, and its 2026 budgets assume a smaller workforce.</li>
        <li><strong>Goldman Sachs</strong> chief executive David Solomon has predicted the firm will eventually have more employees, not fewer, though it has also planned near-term staffing cuts.</li>
      </ul>

      <h2>Juniors, not seniors</h2>
      <p>Data from Revelio Labs, published in October 2026, adds an important detail. Junior headcount at US banks has fallen since ChatGPT launched in November 2022 and is now 4.7 percent below its October 2022 level, while senior headcount has kept growing. The drop came from hiring, not departures: junior hiring fell from about 10.5 percent of junior headcount before ChatGPT to about 8.5 percent in 2024 and 2025, before recovering somewhat in 2026.</p>
      <p>Revelio's authors are careful about the cause. They found that the most and least AI-exposed junior roles shrank at similar rates, which suggests generative AI is not the whole story. They describe the decline as more consistent with a long-running shift to digital banking, plus the effect of higher interest rates from 2022, than with AI directly replacing junior bankers. Banks, they conclude, appear to be restructuring around AI rather than being automated by it.</p>
      <p>That matches the pattern in other industries. Our article on <a href="/posts/is-ai-killing-entry-level-jobs-2026-evidence">the evidence on AI and entry-level jobs</a> finds the same difficulty in separating AI from other forces.</p>

      <h2>Which banking jobs are most exposed</h2>
      <p>The roles shrinking fastest are operations, back-office processing, reconciliation, compliance checks, internal support and routine software development. These involve large volumes of structured, rules-based work, which AI and automation handle well. Branch roles have been shrinking for years as customers move to apps.</p>
      <p>The roles growing are client-facing: relationship managers, advisers, bankers covering corporate clients, and specialists in technology, data and risk. Dimon's own framing is telling: if back-office jobs disappear, banks need more front-office people to serve more clients.</p>

      <h2>What it means for finance careers</h2>
      <ul>
        <li><strong>Move toward clients and judgement.</strong> Roles combining financial knowledge with client relationships or complex decisions are more resilient than processing roles.</li>
        <li><strong>Learn the tools.</strong> Banks report high internal AI adoption, and employees who use AI to do more are the ones being redeployed rather than released.</li>
        <li><strong>Consider fintech and software.</strong> Financial technology companies hire people with banking experience for product, compliance, risk and operations roles, and many hire remotely.</li>
        <li><strong>Look at technology roles inside banks.</strong> Technology's share of bank labour costs has grown steadily. Revelio found it rose from 12 to 17.4 percent in commercial and retail banking between 2015 and 2025.</li>
      </ul>
      <p>Large banks are mostly office-based, with return-to-office policies stricter than in technology. Our article on <a href="/posts/return-to-office-mandates-2026-remote-jobs">return-to-office mandates</a> covers which employers expect five days. Remote finance work is more common at fintechs, software companies and smaller firms.</p>

      <h2>Finding finance roles that are remote</h2>
      <p>On our board, finance, accounting, risk and compliance roles appear at software and fintech companies across regions. You can browse <a href="/jobs">all remote jobs</a> or narrow to <a href="/remote-regional-jobs">remote regional jobs</a>. The <a href="/tools/job-title-finder">job title finder</a> helps translate banking titles into the language software companies use, and the <a href="/tools/company-remote-score">company remote score</a> shows whether an employer's listings are genuinely remote.</p>
      <p>The honest summary is that banks are no longer pretending AI will leave headcount untouched. But the change is gradual, concentrated in specific functions and partly offset by growth elsewhere. For people in exposed roles, the time to move toward clients, judgement or technology is before the next round of cuts, not after.</p>
    `,
    faq: [
      { q: "Are banks cutting jobs because of AI?", a: "Partly. Bank CEOs including Jamie Dimon and Charlie Scharf now say openly that AI will reduce headcount, and the six largest US banks had about 15,000 fewer employees in Q1 2026 according to The Next Web. Other factors, such as the long shift to digital banking, also play a role." },
      { q: "Which banking jobs are most at risk from AI?", a: "Operations, back-office processing, reconciliation, routine compliance checks, internal support and routine coding. Client-facing roles, advisers, risk and technology specialists are growing." },
      { q: "Are junior bankers being replaced by AI?", a: "Revelio Labs found junior bank headcount 4.7 percent below October 2022 levels while senior headcount grew, but it found similar declines in more and less AI-exposed roles, suggesting digital banking and interest rates also explain the drop." },
      { q: "Can I work remotely in finance?", a: "Large banks are mostly office-based, but fintechs, software companies and smaller firms hire remotely for finance, accounting, risk, compliance and operations roles." },
    ],
  },
  {
    slug: "big-law-first-year-hiring-ai-2026",
    title: "Big Law Is Hiring Fewer New Lawyers. AI Is Part of the Reason",
    description:
      "The largest US law firms hired 7.5% fewer graduates in 2025, and two-thirds expect smaller first-year classes by 2028. What AI means for junior lawyers.",
    date: "2026-11-08T04:42:30.000Z",
    author: "Bhargav",
    tags: ["Law", "Legal Careers", "AI in Law", "Entry-Level Jobs", "Harvey"],
    readMinutes: 6,
    html: `
      <p>For generations, large law firms have run on a pyramid. A small number of partners sit at the top, supported by a much larger base of junior associates who do the research, document review and first drafts that train them to become senior lawyers. AI tools are now very good at exactly that kind of work, and the base of the pyramid is starting to narrow.</p>

      <h2>What the hiring data shows</h2>
      <p>According to data from the National Association for Law Placement (NALP), released in August 2026 and analysed by Bloomberg Law columnist Roy Strom, firms with more than 500 lawyers hired 6,588 new law graduates in 2025. That was 538 fewer than in 2024, a fall of 7.5 percent from the peak.</p>
      <p>Strom noted that in past cycles, incoming classes at the largest firms bottomed out about three years after each hiring peak, and that on average the share of graduates hired by Big Law fell about 23 percent by the second year of a decline and 30 percent by the third. Applying that pattern would mean roughly 2,000 fewer new lawyers in 2026 than in 2024. Summer associate classes, the main pipeline into first-year jobs, fell in 2024 and 2025 to their lowest levels since 2020.</p>
      <p>A summer 2026 survey of 57 large firms by Citi, cited in the same column, found that two-thirds expect to have fewer first-year associates in 2028 than in 2025, and nearly 60 percent expect fewer second-years. Nineteen percent said they did not know how many first-years they would hire in 2028.</p>

      <h2>Why this cycle is different</h2>
      <p>Previous declines in law firm hiring followed recessions in 1990, 2001 and 2008. This one is not driven by a weak economy. Demand for lawyers' time is still rising. What has changed is firms' expectations about how much junior work AI will do. That uncertainty, more than any current drop in business, explains why firms are cautious about committing to large classes years in advance.</p>
      <p>The tools are now part of daily practice. A Law360 Pulse survey of 2026 summer associates found AI use ranging from 83 percent at firms with fewer than 100 lawyers to 99 percent at firms with 1,000 or more. A&amp;O Shearman has announced agentic AI tools built with legal AI company Harvey for complex legal workflows, and other large firms have embedded similar tools in drafting and document analysis.</p>

      <h2>The training problem</h2>
      <p>The biggest worry is not the number of jobs but how lawyers will learn. Junior associates have traditionally built their skills by doing large volumes of routine work under supervision. If AI does that work, firms need new ways to train people to the judgement partners have. Several firms are experimenting with more structured training, simulated matters and earlier client exposure, but there is no settled answer yet.</p>
      <p>The same problem appears in many professions, from accounting to software engineering. Our article on <a href="/posts/coding-bootcamps-closing-cs-enrollment-2026">falling computer science enrollment</a> looks at how it affects people starting technology careers.</p>

      <h2>Where legal jobs are growing</h2>
      <ul>
        <li><strong>Legal technology.</strong> Companies building legal AI tools hire lawyers for product, training data, quality review and customer success. Harvey and its competitors have grown rapidly.</li>
        <li><strong>In-house legal teams.</strong> Companies are using AI to handle more legal work internally, and in-house teams need lawyers who can manage both the tools and outside counsel.</li>
        <li><strong>Legal operations.</strong> Roles that manage contracts, budgets, technology and processes inside legal departments are expanding and often remote.</li>
        <li><strong>AI governance and compliance.</strong> New laws on AI, privacy and data create work for lawyers who understand both the technology and the regulation. Our article on <a href="/posts/eu-ai-act-high-risk-delay-hiring-2027">the EU AI Act</a> covers one source of that demand.</li>
      </ul>
      <p>Some of these roles, particularly at legal technology companies and in legal operations, are remote. Expert legal knowledge is also in demand for AI training work, which our article on <a href="/posts/ai-trainer-gig-economy-2026-pay">AI trainer gig work</a> covers, with hourly rates for lawyers among the highest on those platforms.</p>

      <h2>What law students and junior lawyers can do</h2>
      <ul>
        <li><strong>Get fluent with legal AI tools</strong> and learn their failure modes. Knowing when an AI tool's answer is wrong is the skill firms most need.</li>
        <li><strong>Develop judgement early.</strong> Seek work that involves clients, negotiation and strategy, not just research.</li>
        <li><strong>Specialise.</strong> Regulatory areas, including AI, privacy and financial regulation, are growing.</li>
        <li><strong>Keep options open.</strong> In-house, legal tech and government roles are viable starting points, not only fallbacks.</li>
      </ul>
      <p>If you are exploring legal roles outside traditional firms, you can browse <a href="/jobs">all remote jobs</a> and filter by legal and compliance roles, or look at <a href="/remote-regional-jobs">remote regional jobs</a> for roles open beyond one country. Our guide to <a href="/posts/remote-career-change-guide">changing careers remotely</a> covers how to move into an adjacent field.</p>
    `,
    faq: [
      { q: "Are law firms hiring fewer junior lawyers?", a: "Yes. NALP data shows firms with more than 500 lawyers hired 6,588 new graduates in 2025, down 7.5 percent from 2024, and a Citi survey found two-thirds of 57 large firms expect fewer first-year associates in 2028 than in 2025." },
      { q: "Is AI replacing junior lawyers?", a: "Not directly yet, but firms' expectations about AI are a major reason they are hiring cautiously. AI tools now handle much of the research, review and drafting that junior lawyers traditionally did." },
      { q: "How widely do law firms use AI?", a: "Very widely. A Law360 Pulse survey of 2026 summer associates found AI use from 83 percent at small firms to 99 percent at firms with 1,000 or more lawyers." },
      { q: "Where are legal jobs growing?", a: "In legal technology companies, in-house legal teams, legal operations and AI governance and compliance. Some of these roles are remote." },
    ],
  },
  {
    slug: "ai-scribes-healthcare-2026-jobs",
    title: "AI Scribes Are Now Standard in Medicine. What Changes for Jobs",
    description:
      "70% of UCSF physicians now use AI scribes daily. What studies show about time saved, burnout and errors, and what it means for medical coders and scribes.",
    date: "2026-11-08T04:43:00.000Z",
    author: "Bhargav",
    tags: ["Healthcare", "AI Scribes", "Medical Coding", "Healthcare Jobs", "Workplace AI"],
    readMinutes: 6,
    html: `
      <p>One of the fastest workplace AI adoptions of the past two years has happened in doctors' offices. "Ambient" AI scribes listen to a conversation between a clinician and a patient, with consent, and draft the clinical note automatically. In March 2026, Medical Economics reported that 70 percent of physicians in the UCSF health system were using AI scribes in daily practice. Epic, the largest electronic health record vendor, announced its own AI charting tool in February 2026, putting the technology in front of a large share of US doctors.</p>
      <p>This article looks at what the research shows and what the change means for healthcare jobs, especially the administrative and documentation roles most affected.</p>

      <h2>What the studies show</h2>
      <p>The evidence is more mixed than the marketing.</p>
      <ul>
        <li><strong>Time saved is real but modest.</strong> A randomised trial at UCLA published in NEJM AI in November 2025, covering 238 physicians and about 72,000 encounters, found that users of one tool cut average note-writing time from 4 minutes 30 seconds to 3 minutes 49 seconds, roughly 10 percent. The reduction for a second tool was smaller and not statistically significant.</li>
        <li><strong>Burnout may fall.</strong> A study at Mass General Brigham published in JAMA Network Open in August 2025 found self-reported burnout fell from 52.6 to 30.7 percent over 84 days among participating physicians. The UCLA trial found only modest improvements.</li>
        <li><strong>Doctors see slightly more patients.</strong> A UCSF study published in January 2026, covering 1,565 physicians and more than 1.2 million encounters, found adopters saw about one more patient a week, generating roughly enough extra revenue to cover the tool's cost.</li>
        <li><strong>Errors are common.</strong> A January 2025 JMIR study of two commercial tools found an average of about three errors per note, with errors in 70 percent of notes. Omissions were the most common and the hardest to catch.</li>
      </ul>
      <p>The overall picture is a technology that helps, especially with the mental load of documentation, but that requires clinicians to review every note carefully.</p>

      <h2>Which jobs change</h2>
      <p><strong>Medical transcriptionists</strong> are most directly affected. Their work, turning dictation into text, was already declining before AI scribes and is now being replaced by real-time drafting. <strong>Human medical scribes</strong>, who accompany physicians and write notes, face the same pressure, though some health systems are retraining them as AI note reviewers or clinical support staff.</p>
      <p><strong>Medical coders</strong>, who translate clinical notes into billing codes, face a more complicated shift. AI scribes capture more of what is discussed in an appointment, which can lead to more diagnoses being documented and coded. Industry analysts have warned that this could slide into upcoding, billing for more complex care than was actually provided, and insurers are responding with more audits and denials. That creates demand for coders who can audit AI-generated documentation, check it against payer rules and handle disputes. Some vendors are pushing AI into code assignment itself, which will change entry-level coding work further.</p>
      <p><strong>Clinical documentation integrity specialists</strong>, who review records for accuracy and completeness, are likely to be in more demand, not less, as the volume of AI-generated documentation grows.</p>

      <h2>Why it matters beyond healthcare</h2>
      <p>AI scribes are a clear example of a pattern seen across industries: AI takes over the first draft, and people shift to reviewing, correcting and taking responsibility for the result. Doctors still sign the note. Coders still answer for the claim. The work does not disappear, but it changes from producing to checking, and the skills that matter shift with it. Our article on <a href="/posts/anthropic-economic-index-2026-ai-work-automation">how AI is used across occupations</a> describes the same split between automation and augmentation.</p>

      <h2>Remote healthcare administration jobs</h2>
      <p>Medical coding, billing, documentation review, prior authorisation and revenue cycle work are among the most common remote healthcare roles. Most require certification, such as those from AAPC or AHIMA in the US, and most are limited to candidates in the country where the provider operates, because of patient privacy rules and licensing.</p>
      <ul>
        <li><strong>Add auditing skills.</strong> Coders who can review AI-generated documentation and spot errors and overcoding will be in demand.</li>
        <li><strong>Learn payer rules deeply.</strong> Denial management and appeals are growing as insurers push back.</li>
        <li><strong>Consider documentation integrity roles,</strong> which build on coding and clinical knowledge.</li>
        <li><strong>Look at health technology companies.</strong> Firms building AI scribes and coding tools hire clinicians and coders for product, training data and quality roles.</li>
      </ul>
      <p>Our guide to <a href="/posts/best-remote-jobs-without-tech-background-2026">remote jobs without a tech background</a> includes healthcare administration paths, and our <a href="/posts/upskilling-for-remote-work">upskilling guide</a> covers affordable certifications. You can browse current healthcare and health technology roles on <a href="/jobs">all remote jobs</a> or check <a href="/remote-regional-jobs">remote regional jobs</a>.</p>
      <p>As with any healthcare-adjacent remote job, be cautious with postings that promise high pay for little experience. Our guide on <a href="/posts/how-to-spot-fake-remote-job-postings">spotting fake remote job postings</a> lists warning signs.</p>
    `,
    faq: [
      { q: "What is an AI scribe?", a: "An ambient AI scribe listens to a clinician's conversation with a patient, with consent, and drafts the clinical note automatically. The clinician reviews and signs the note." },
      { q: "How widely are AI scribes used?", a: "Adoption has been rapid. Medical Economics reported in March 2026 that 70 percent of UCSF physicians used AI scribes daily, and Epic announced its own AI charting tool in February 2026." },
      { q: "Do AI scribes save doctors time?", a: "Modestly. A UCLA randomised trial found one tool cut note-writing time by about 10 percent. Some studies show reduced burnout, and a UCSF study found adopters saw about one more patient a week." },
      { q: "Will AI replace medical coders?", a: "It is changing the job rather than eliminating it. AI scribes produce more detailed documentation, raising upcoding concerns and insurer audits, which increases demand for coders who can audit records and manage denials." },
    ],
  },
  {
    slug: "unions-ai-contract-protections-2026",
    title: "Unions Are Writing AI Rules Into Contracts. Here's What They Won",
    description:
      "New York nurses won AI safeguards after a 41-day strike, and unions are bargaining over AI layoffs and surveillance. What the contracts say, and their limits.",
    date: "2026-11-08T04:43:30.000Z",
    author: "Bhargav",
    tags: ["Unions", "AI Regulation", "Workers' Rights", "Healthcare", "Future of Work"],
    readMinutes: 6,
    html: `
      <p>With little federal law governing how employers use AI at work, unions have become one of the main places where rules are actually being written. In 2026, AI moved from a side issue in contract talks to a central one, from hospital wards in New York to newsrooms and film sets. As Randi Weingarten, president of the American Federation of Teachers, put it in Bloomberg Law's coverage, without legislation it happens contract by contract and court by court.</p>

      <h2>The New York nurses' strike</h2>
      <p>The most prominent example came in January and February 2026, when about 15,000 nurses represented by the New York State Nurses Association struck at Mount Sinai, Montefiore and NewYork-Presbyterian. The strike lasted 41 days at its longest, the longest nurses' strike in the city's history. The resulting three-year contracts included pay increases of more than 12 percent, staffing improvements and, for the first time in those contracts, language on AI.</p>
      <p>According to Fortune's reporting, the AI provisions ensure that a nurse's clinical judgement can override advice from an AI system, and that nurses can raise concerns about AI and other technology without fear of retaliation. The union presented this as a first-of-its-kind win. Critics, including some nurses, argued the language is weak: it protects judgement and the right to object, but it does not stop hospitals from introducing AI or guarantee jobs.</p>

      <h2>What unions are bargaining for</h2>
      <p>Labour observers quoted by Bloomberg Law said unions in 2026 negotiations are prioritising two areas: language that prevents AI-related mass layoffs, and limits on broad workplace surveillance. Common provisions include:</p>
      <ul>
        <li><strong>Notice and bargaining before deployment.</strong> Employers must tell the union before introducing AI that affects jobs and negotiate over its effects.</li>
        <li><strong>No displacement without negotiation.</strong> Workers cannot be laid off because of AI without the union first bargaining over alternatives such as retraining or redeployment.</li>
        <li><strong>Human judgement.</strong> AI recommendations cannot override professional decisions, as in the nurses' contracts.</li>
        <li><strong>Surveillance limits.</strong> Restrictions on using AI to monitor productivity, keystrokes or behaviour, and on using that data for discipline.</li>
        <li><strong>Consent and pay for digital likeness.</strong> In entertainment, SAG-AFTRA's agreements require informed consent and disclosure before AI replicas of performers are used.</li>
      </ul>
      <p>An AFL-CIO poll reported that 78 percent of workers consider AI-related protections extremely important, though that figure comes from secondary reporting on a union-commissioned survey.</p>

      <h2>The limits of the contract route</h2>
      <p>Union contracts cover a minority of workers. In the US, about one in ten workers belongs to a union, and far fewer in the private technology sector. Contract language also varies in strength, and enforcement depends on grievances and arbitration, which take time. In Canada, an arbitration board rejected one Ontario public sector union's proposed AI language, showing that employers do not always agree.</p>
      <p>For most workers, especially remote workers at non-union companies, the protections come from law instead, and in the US that law is unsettled. Some states have passed rules on AI in hiring, but the federal government is trying to override them. Our article on <a href="/posts/federal-vs-state-ai-laws-preemption-2026">federal versus state AI laws</a> explains that conflict, and our article on the <a href="/posts/colorado-ai-law-delay-hiring-rules-2027">Colorado AI law delay</a> covers one of the most important state rules.</p>

      <h2>What non-union workers can learn</h2>
      <p>Even without a union, the issues unions are raising give every worker a useful checklist when an employer introduces AI:</p>
      <ul>
        <li><strong>Ask how the tool will be used.</strong> Is it assisting your work, measuring it or replacing parts of it?</li>
        <li><strong>Ask what data it collects</strong> and whether that data can be used in performance reviews.</li>
        <li><strong>Ask who is responsible</strong> when the AI gets something wrong.</li>
        <li><strong>Check your contract and local law.</strong> In the EU, the AI Act and data protection law give workers rights around automated decisions and monitoring. Our article on <a href="/posts/eu-ai-act-high-risk-delay-hiring-2027">the EU AI Act</a> covers the timeline.</li>
      </ul>
      <p>When you evaluate job offers, these questions also help you judge an employer's culture. A company that explains its AI use openly is usually easier to work for than one that introduces monitoring quietly. Our checklist on <a href="/posts/before-you-accept-a-remote-job-offer">what to check before accepting a remote job offer</a> includes questions on monitoring and tools.</p>

      <h2>Where this goes next</h2>
      <p>Expect AI clauses to spread to more contracts, particularly in healthcare, education, media and the public sector, and to become more specific as unions learn from early agreements. The first real tests will come when a union files a grievance claiming AI was used in breach of a contract, and arbitrators decide what the language means.</p>
      <p>Whether you are unionised or not, the principle at stake is the same: workers want a say in how AI changes their jobs. You can browse employers hiring now on <a href="/jobs">all remote jobs</a> and research their policies before you apply, or look at <a href="/remote-regional-jobs">remote regional jobs</a> for roles in countries with stronger worker protections.</p>
    `,
    faq: [
      { q: "What AI protections did New York nurses win?", a: "After a strike by about 15,000 NYSNA nurses in early 2026, new contracts ensure a nurse's clinical judgement can override AI advice and that nurses can raise concerns about AI without retaliation. Critics say the language does not stop AI being introduced or guarantee jobs." },
      { q: "What AI clauses are unions negotiating?", a: "Common provisions include notice and bargaining before AI is deployed, no layoffs due to AI without negotiation, protection of human judgement, limits on AI surveillance, and consent requirements for digital likenesses." },
      { q: "Do non-union workers have AI protections?", a: "Some, depending on location. EU workers have rights under data protection law and the AI Act, and some US states have rules on AI in hiring, though federal efforts to override state AI laws make the US picture uncertain." },
      { q: "How many workers are covered by union AI protections?", a: "Relatively few. About one in ten US workers belongs to a union, and far fewer in private technology companies, so most workers rely on law and employer policy instead." },
    ],
  },
  {
    slug: "federal-vs-state-ai-laws-preemption-2026",
    title: "Washington vs the States on AI Laws: Where the Fight Stands",
    description:
      "A December 2025 executive order set up a DOJ task force to challenge state AI laws. Where Colorado, California and New York stand, and what it means at work.",
    date: "2026-11-08T04:44:00.000Z",
    author: "Bhargav",
    tags: ["AI Regulation", "State Laws", "AI in Hiring", "Employment Law", "Policy"],
    readMinutes: 6,
    html: `
      <p>Who gets to regulate AI in the United States is one of the biggest unresolved policy fights of 2026. States have passed dozens of AI laws, covering everything from hiring tools to the most powerful AI models. The federal government, through an executive order signed in December 2025, is trying to stop many of them. For workers and job seekers, the outcome determines whether you have any legal right to know when AI is used to screen you, and whether you can challenge its decisions.</p>
      <p>This article summarises where things stand as of early November 2026. It is not legal advice, and the situation is changing quickly.</p>

      <h2>The executive order</h2>
      <p>On 11 December 2025, President Trump signed an executive order titled "Ensuring a National Policy Framework for Artificial Intelligence." According to summaries by law firms including Jenner &amp; Block and Greenberg Traurig, it:</p>
      <ul>
        <li>Directed the Attorney General to create an <strong>AI Litigation Task Force</strong> to challenge state AI laws in court, on grounds such as interference with interstate commerce.</li>
        <li>Asked the Commerce Secretary to publish, within 90 days, an evaluation identifying "onerous" state AI laws.</li>
        <li>Tied some federal funding, including certain broadband programme funds, to whether states have such laws.</li>
        <li>Called for a recommendation to Congress on a single federal framework that would preempt state rules.</li>
        <li>Exempted state laws aimed at protecting children.</li>
      </ul>
      <p>Congress had twice voted down a similar federal moratorium on state AI laws in 2025, which is part of why the administration turned to an executive order.</p>

      <h2>What has happened since</h2>
      <p>The Justice Department established the task force in January 2026. The Commerce Department's list of onerous laws was due in March, but according to legal commentators tracking it, it had not been publicly released as of late October. We have not found reports of a federal lawsuit by the task force against a state AI law so far, though private challenges exist: secondary reports say xAI sued Colorado in April 2026 to block its AI Act.</p>
      <p>Legal experts broadly agree that an executive order cannot by itself override state law. Preemption normally requires an act of Congress. Until courts rule otherwise, state AI laws remain enforceable.</p>

      <h2>The state laws that matter most for work</h2>
      <ul>
        <li><strong>Colorado's AI Act</strong> requires employers using high-risk AI in decisions such as hiring to take steps to prevent algorithmic discrimination and to notify people. It was named in the executive order and has been delayed. Our article on <a href="/posts/colorado-ai-law-delay-hiring-rules-2027">the Colorado AI law delay</a> covers the timeline.</li>
        <li><strong>California's SB 53</strong>, which took effect on 1 January 2026, requires developers of the most powerful AI models to publish safety frameworks and report serious incidents, and it protects employees of those developers who raise safety concerns.</li>
        <li><strong>New York's RAISE Act</strong>, amended in March 2026 to align more closely with California, takes effect on 1 January 2027 and adds faster incident reporting and a dedicated oversight office.</li>
        <li><strong>Local hiring rules,</strong> such as New York City's law requiring bias audits of automated hiring tools, also remain in force.</li>
      </ul>

      <h2>Why it matters for job seekers</h2>
      <p>AI is now common in hiring, from resume screening to <a href="/posts/ai-job-interviews-2026-what-candidates-should-know">AI-led interviews</a>. State laws are the main source of rights for US candidates: the right to be told AI is being used, to request human review, and to have tools audited for bias. If those laws are weakened, candidates would rely mainly on existing anti-discrimination law, which courts are still applying to AI. The <a href="/posts/workday-ai-hiring-lawsuit-mobley-2026">Workday lawsuit</a> is the leading test of how far that law reaches.</p>
      <p>For employers, the uncertainty is costly. Companies hiring across many states must decide whether to comply with the strictest state rules or wait for courts to settle the question. Many large employers are choosing to comply anyway, because the rules may survive and because the same practices reduce discrimination risk under federal law.</p>

      <h2>What candidates can do now</h2>
      <ul>
        <li><strong>Ask whether AI is used</strong> in screening or interviews. In some places, employers must tell you.</li>
        <li><strong>Request human review</strong> where the law or the employer allows it.</li>
        <li><strong>Make your application readable by machines and people.</strong> Our <a href="/tools/ats-keyword-checker">ATS keyword checker</a> helps match your CV to a posting without keyword stuffing.</li>
        <li><strong>Know your local rules.</strong> If you are in the EU, the AI Act will add rights for candidates screened by AI; our article on <a href="/posts/eu-ai-act-high-risk-delay-hiring-2027">the EU AI Act delay</a> covers the timing.</li>
      </ul>
      <p>Expect more developments in the coming months: the Commerce list, possible lawsuits, and further attempts in Congress to pass a federal framework. In the meantime, you can browse employers hiring now on <a href="/jobs">all remote jobs</a> or across borders on <a href="/remote-regional-jobs">remote regional jobs</a>.</p>
    `,
    faq: [
      { q: "Can the federal government override state AI laws?", a: "An executive order alone generally cannot preempt state law; that normally requires Congress. The December 2025 order directs a DOJ task force to challenge state laws in court, but until courts rule, state AI laws remain enforceable." },
      { q: "What does Trump's AI executive order do?", a: "Signed on 11 December 2025, it created an AI Litigation Task Force to challenge state AI laws, asked Commerce to list onerous state laws, tied some federal funding to state AI policy and called for a federal framework to preempt state rules, with exemptions for child protection laws." },
      { q: "Which state AI laws affect hiring?", a: "Colorado's AI Act covers high-risk AI in employment decisions and has been delayed. New York City requires bias audits of automated hiring tools. California's SB 53 and New York's RAISE Act focus on developers of the most powerful AI models." },
      { q: "When do California's and New York's AI safety laws take effect?", a: "California's SB 53 took effect on 1 January 2026. New York's RAISE Act, amended in March 2026, takes effect on 1 January 2027." },
    ],
  },
  {
    slug: "recent-graduate-unemployment-2026-ai-remote",
    title: "Why New Graduates Face Higher Unemployment Than Everyone Else",
    description:
      "Recent US graduates have higher unemployment than the overall workforce, about 5.6% in early 2026. Three explanations, from AI to remote work, and what helps.",
    date: "2026-11-08T04:44:30.000Z",
    author: "Bhargav",
    tags: ["Recent Graduates", "Entry-Level Jobs", "Unemployment", "AI", "Remote Work"],
    readMinutes: 6,
    html: `
      <p>For most of modern US history, a college degree was a reliable shield against unemployment, especially at the start of a career. That is no longer true. According to the Federal Reserve Bank of New York, the unemployment rate for recent college graduates, people aged 22 to 27 with at least a bachelor's degree, was about 5.6 percent in March 2026, according to Bloomberg Law's report on the data. Reports citing the New York Fed's dashboard give about 5.7 percent for the first quarter, against an overall rate of about 4.3 percent. Recent graduates are now more likely to be unemployed than the workforce as a whole.</p>

      <h2>How unusual this is</h2>
      <p>Economist Timothy Taylor, reviewing the New York Fed data in July 2026, noted that in the 1990s and early 2000s, recent graduates typically had lower unemployment than the overall workforce. Before the pandemic, the two rates were roughly equal. Since the pandemic, recent graduates have been worse off. Their rate is still below that of all young people aged 22 to 27, so a degree still helps, but the advantage is shrinking. And the gap between recent graduates and older graduates is widening.</p>
      <p>Underemployment, graduates working in jobs that do not require a degree, is also high, at around 41.5 percent according to reports on the same dashboard. Taylor was careful to say this is not a "job apocalypse", but it is a real and persistent change.</p>

      <h2>Three explanations</h2>
      <p>Economists offer three main explanations, and Taylor suggests all three may be partly true.</p>
      <p><strong>1. AI tools.</strong> AI may now do some of the work recent graduates used to do: research, drafting, basic analysis and routine coding. A July 2026 policy brief from the Stanford Institute for Economic Policy Research, by Neale Mahoney, Erika McEntarfer and Karsen Wahal, found that after ChatGPT's launch, employment in customer service and software development fell for workers under 30, while older workers' employment held steady or rose. Our article on <a href="/posts/is-ai-killing-entry-level-jobs-2026-evidence">the evidence on AI and entry-level jobs</a> examines this and the studies that disagree.</p>
      <p><strong>2. Remote work.</strong> This one matters for our readers. Some economists argue that the shift to remote and hybrid work made firms less confident they could train and supervise inexperienced staff. Learning by watching colleagues is harder over video calls, and managers may prefer to hire people who can work independently from day one. If that is right, remote work has helped experienced workers while making the first job harder to get.</p>
      <p><strong>3. Pandemic-era education.</strong> Graduates who spent their final years of school or university learning remotely during the pandemic may have developed fewer practical and social skills than earlier cohorts, which could affect how employers see them.</p>
      <p>Other factors, including the post-2022 slowdown in tech hiring and higher interest rates, also play a part. Our article on <a href="/posts/fed-rate-hike-2026-inflation-tech-hiring">the Fed's 2026 rate hike</a> explains how rates affect hiring.</p>

      <h2>What helps</h2>
      <p>If you are a recent graduate, the explanations suggest practical responses:</p>
      <ul>
        <li><strong>Show you can work independently.</strong> If employers worry about supervising new hires remotely, evidence that you can manage your own projects, communicate in writing and deliver without hand-holding directly addresses that concern.</li>
        <li><strong>Use AI to raise your output, not replace your thinking.</strong> Employers want new hires who can do more with AI tools, and who can explain and check the results.</li>
        <li><strong>Consider hybrid or in-person first jobs.</strong> It may be easier to get hired and learn faster in a role with some office time, then move to fully remote work with experience. Our guide on <a href="/posts/work-from-home-vs-work-from-anywhere">work from home versus work from anywhere</a> explains the options.</li>
        <li><strong>Target roles with structured training.</strong> Graduate programmes, apprenticeships and support or operations roles at software companies often include training and lead to other jobs.</li>
        <li><strong>Look beyond the obvious fields.</strong> Skilled trades, healthcare and infrastructure are hiring strongly, as our article on <a href="/posts/electrician-shortage-data-centers-2026">the electrician shortage</a> shows.</li>
      </ul>

      <h2>Getting a first remote job</h2>
      <p>Fully remote entry-level roles exist, but they are competitive. The candidates who get them usually have something concrete to show: a portfolio, an internship, open source contributions, freelance work or a project with real users. Our guide to <a href="/posts/first-remote-job-2026-no-experience">getting a first remote job with no experience</a> walks through the routes, and <a href="/posts/how-to-write-a-remote-job-cover-letter">our cover letter guide</a> explains how to show independence and communication skills in writing. The <a href="/tools/remote-cover-letter-builder">remote cover letter builder</a> helps structure one.</p>
      <p>You can browse current openings, including entry-level roles, on <a href="/jobs">all remote jobs</a>, or look at <a href="/remote-regional-jobs">remote regional jobs</a> if you are outside the US. The market is harder for graduates than it was, but it is not closed, and the candidates who adapt to what employers are worried about have a real advantage.</p>
    `,
    faq: [
      { q: "What is the unemployment rate for recent college graduates?", a: "According to New York Fed data, about 5.6 percent in March 2026 for graduates aged 22 to 27, with reports giving about 5.7 percent for the first quarter, above the overall rate of about 4.3 percent." },
      { q: "Why is it harder for new graduates to find jobs?", a: "Economists point to three possible causes: AI doing tasks graduates used to do, remote work making firms less confident about training new hires, and weaker skills from pandemic-era education. Slower tech hiring and higher interest rates also contribute." },
      { q: "Is AI taking entry-level jobs?", a: "There is some evidence. A July 2026 Stanford SIEPR brief found employment in customer service and software development fell for workers under 30 after ChatGPT launched, while older workers held steady. Other studies find smaller effects." },
      { q: "Should new graduates look for remote jobs?", a: "They can, but fully remote entry-level roles are competitive. Some graduates find it easier to start in hybrid or in-person roles with training, then move to remote work with experience." },
    ],
  },
];
