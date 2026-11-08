/**
 * News cluster D: global labour markets, employers and the calendar,
 * autumn 2026. Written 8 November 2026. Sources named in each article;
 * estimates, projections and company claims are labelled as such.
 */
import type { Post } from "./posts";

export const POSTS_NEWS_D: Post[] = [
  {
    slug: "india-it-hiring-gcc-boom-2026",
    title: "India's IT Giants Shrank While Capability Centres Hired 200,000",
    description:
      "India's top IT services firms cut net headcount in FY26 while global capability centres added about 200,000 jobs. Where the hiring moved, and why.",
    date: "2026-11-08T04:30:00.000Z",
    author: "Bhargav",
    tags: ["India", "IT Services", "Global Capability Centres", "Tech Hiring", "AI Jobs"],
    readMinutes: 6,
    html: `
      <p>For two decades, India's large IT services companies were the country's most reliable mass employer of graduates. Every year they hired tens of thousands of freshers, trained them and placed them on client projects around the world. In the year to March 2026, that engine went into reverse. The five largest firms together ended the financial year with fewer people than they started with, while a different kind of employer, the global capability centre, kept hiring at pace.</p>
      <p>This article sets out what the figures show, where they disagree, and what the shift means for anyone in India looking for technology work, including remote work for overseas employers.</p>

      <h2>The services side: a net decline</h2>
      <p>Reports compiling the annual results of the top five Indian IT services firms put their combined net headcount change for FY26 at a decline of roughly 7,000 people. One widely cited tally gives 7,389, against a net addition of 12,718 the year before. The exact number varies slightly between sources depending on which companies are counted and when, but the direction is not in doubt.</p>
      <p>Tata Consultancy Services, the largest, reported a headcount of 584,519 at the end of March 2026, more than 23,400 fewer than a year earlier. Its plans for graduate hiring have also been reported inconsistently. Some reports put its FY27 fresher target at about 25,000, well below the 40,000 or more it hired in previous years, while its chief human resources officer was quoted as saying the company would hire around 40,000. Infosys has talked about roughly 20,000. Until the companies publish full-year numbers, treat any single fresher figure with caution.</p>
      <p>Underneath the totals, the mix is changing. One industry report found AI-related IT hiring up 16 percent year on year in June 2026 while overall IT hiring fell 3 percent. The firms are still hiring, but for fewer generalists and more people who can deliver AI, data and automation work for clients.</p>

      <h2>The capability centre side: steady growth</h2>
      <p>Global capability centres, or GCCs, are offices that multinational companies own and run in India to do their own technology, engineering, finance and operations work, rather than outsourcing it to a services firm. According to Nasscom and Zinnov, there were 2,117 of them in FY2026, employing about 2.36 million people.</p>
      <p>Staffing firm TeamLease Digital estimates that GCCs added around 200,000 net jobs in FY26, compared with roughly 110,000 for the IT services sector as a whole. Its projections for calendar 2026 put GCC hiring at about 510,000 roles, with roughly two-thirds requiring AI, data or automation skills. It also reports that flexible and contract staffing has risen to about 25 percent of GCC hiring, up from 22 percent. Those are projections from a staffing company, but they line up with what the services firms' own results suggest.</p>

      <h2>Why the work is moving</h2>
      <p>Three forces explain most of the shift. First, AI tools reduce the amount of routine coding, testing and support work that services contracts used to bill by the hour, so clients need fewer people on the same project. Second, large companies increasingly want to own their core technology and AI capability rather than rent it, and a captive centre in Bengaluru, Hyderabad or Pune is cheaper than building the same team in the US or Europe. Third, the work a GCC does is often closer to the product, which suits the higher-skill roles companies now want.</p>
      <p>For workers, the practical difference is significant. A GCC role is a job at the multinational itself, usually with its pay structure, tools and career ladders. It also tends to involve working directly with colleagues in other countries, which builds exactly the experience that remote employers look for.</p>

      <h2>What it means for job seekers in India</h2>
      <ul>
        <li><strong>Freshers face a narrower funnel.</strong> If services firms hire fewer graduates, competition for the remaining places rises. Projects, internships and demonstrable skills in data, cloud or AI matter more than they did.</li>
        <li><strong>GCCs hire laterally.</strong> Much GCC hiring is for people with two or more years of experience. A first job at a services firm still has value as a route into a GCC later.</li>
        <li><strong>Contract roles are growing.</strong> With a quarter of GCC hiring flexible, contract positions can be a way in. Read the terms carefully and see our guide on <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a>.</li>
        <li><strong>Remote work for overseas companies is a parallel path.</strong> Many employers on our board hire in India through employers of record, particularly for engineering and data roles. Filter by region on <a href="/remote-regional-jobs">remote regional jobs</a> and use <a href="/posts/remote-jobs-in-asia-pacific-timezone-filters">our Asia-Pacific time zone tips</a> to find roles whose hours work for you.</li>
      </ul>

      <h2>How to position yourself</h2>
      <p>The employers growing in India want people who can take a business problem, apply AI or data tools to it and explain the result to colleagues abroad. That favours candidates who can show finished work: a small data pipeline, an internal tool, an evaluation of a model on a real task. Communication matters as much as code, because GCC and remote roles both depend on working with people in other countries and time zones.</p>
      <p>If you are moving from services to a GCC or a remote role, describe your client work in terms of outcomes rather than technologies. "Reduced a client's reconciliation time from three days to four hours" travels further than a list of frameworks. Our <a href="/posts/remote-job-resume-tips">remote resume tips</a> cover how to frame that experience, and the <a href="/tools/ats-keyword-checker">ATS keyword checker</a> helps you match it to a specific posting.</p>
      <p>You can browse current roles open to candidates in India and across Asia on <a href="/jobs">all remote jobs</a>, or see the small set open everywhere on <a href="/jobs?scope=worldwide">worldwide remote jobs</a>.</p>
    `,
    faq: [
      { q: "Did India's IT companies really cut jobs in FY26?", a: "Yes. Compilations of annual results show the five largest IT services firms ended FY26 with roughly 7,000 fewer people combined than a year earlier, after adding about 12,700 the year before. TCS alone reported 584,519 staff in March 2026, down more than 23,400." },
      { q: "What is a global capability centre?", a: "A GCC is an office that a multinational owns and runs itself, usually in India, to do its own technology, engineering, finance or operations work rather than outsourcing it. Nasscom and Zinnov counted 2,117 GCCs employing about 2.36 million people in FY2026." },
      { q: "How many jobs did GCCs add?", a: "TeamLease Digital estimates GCCs added around 200,000 net jobs in FY26, against roughly 110,000 for the IT services sector, and projects about 510,000 GCC hires in 2026. These are staffing-firm estimates rather than official statistics." },
      { q: "Are TCS and Infosys still hiring freshers?", a: "Yes, but in smaller numbers in some reports. TCS's FY27 fresher target has been reported at about 25,000 in some coverage and about 40,000 by its CHRO, and Infosys has spoken of around 20,000. Treat single figures with caution until full-year results are published." },
      { q: "Can people in India get remote jobs with foreign companies?", a: "Yes. Many companies hire in India through employers of record or as contractors, especially for engineering, data and support roles. Check each listing's location line, since many remote roles are limited to specific countries." },
    ],
  },
  {
    slug: "philippines-bpo-ai-targets-cut-2026",
    title: "The Philippines' BPO Industry Cuts Its 2028 Targets Because of AI",
    description:
      "IBPAP lowered its 2028 goal from 2.5 million workers to as few as 1.85 million as AI reshapes call centres. What changes for Filipino support workers.",
    date: "2026-11-08T04:31:00.000Z",
    author: "Bhargav",
    tags: ["Philippines", "BPO", "Customer Support", "AI Automation", "Outsourcing"],
    readMinutes: 6,
    html: `
      <p>The Philippines built one of the world's largest outsourcing industries on a simple proposition: skilled, English-speaking workers who can answer customers' calls and messages for companies around the world, at a fraction of the cost of doing it at home. The industry, known locally as IT-BPM, employs close to two million people and is one of the country's largest sources of foreign income. In 2026, its trade body did something it has rarely done: it lowered its growth targets, and named AI as the reason.</p>

      <h2>What changed in the forecast</h2>
      <p>The IT and Business Process Association of the Philippines (IBPAP) had set a goal of 2.5 million workers and $59 billion in revenue by 2028. Its revised outlook replaces that with a range of scenarios. In the downside case, the industry reaches about $43.3 billion in revenue and 1.85 million workers by 2028, a figure IBPAP describes in terms of "AI-enabled jobs". Its more optimistic case is closer to $50.5 billion and 2.14 million workers.</p>
      <p>For 2026 itself, IBPAP projects revenue of about $42.3 billion and employment of about 1.96 million. Trade publication Nearshore Americas reported that as revenue growth of about 5.3 percent and employment growth of about 3.6 percent. Revenue growing faster than headcount is the signature of automation: each worker handles more, or higher-value, work.</p>
      <p>The industry still grew in 2025, adding more than 60,000 jobs. The change is not a collapse but a much flatter curve than the one the country had planned around.</p>

      <h2>What is happening inside the centres</h2>
      <p>The work most exposed is the most routine: answering simple account questions, resetting passwords, checking order status, and similar tasks that AI chatbots and voice agents now handle for many large companies. IBPAP and its members say that where AI has replaced entry-level tasks, affected staff have mostly been redeployed into other roles, such as handling escalations, quality assurance or supervising AI systems.</p>
      <p>Labour groups tell a less comfortable story. Unions and worker advocates have pointed to employees placed on "floating status", a Philippine arrangement where workers remain employed but without assignments or regular pay while the company looks for new work for them. The two accounts are not necessarily contradictory. Large employers can redeploy many people while smaller accounts and vendors shed staff, and the official numbers will not show the difference for some time.</p>
      <p>The industry is also investing in retraining. IBPAP has reported AI upskilling programmes covering about 34,000 workers, and secondary reports cite roughly $25 million a year committed to what it calls future-proofing the workforce.</p>

      <h2>Why this matters beyond the Philippines</h2>
      <p>The Philippines is a leading indicator for customer support work everywhere. The same tools that reduce simple call volume in Manila or Cebu reduce it in Texas, Dublin and Johannesburg. What the industry's revised targets suggest is that support work is not disappearing, but its shape is changing: fewer people answering routine questions, more people handling complex cases, managing relationships and keeping AI systems accurate.</p>
      <p>That pattern matches what we see from companies like <a href="/posts/salesforce-ai-agents-support-jobs-2026">Salesforce, which cut its support team sharply</a> after deploying AI agents, and from the broader evidence in our article on <a href="/posts/is-ai-killing-entry-level-jobs-2026-evidence">whether AI is killing entry-level jobs</a>.</p>

      <h2>What Filipino support workers can do</h2>
      <ul>
        <li><strong>Move up the complexity ladder.</strong> Technical support, escalations, billing disputes, healthcare and financial services accounts all involve judgement that AI handles poorly. Experience in those queues is more durable than general inbound work.</li>
        <li><strong>Learn the tools your employer is adopting.</strong> Workers who can configure, test and correct AI support systems become the trainers and quality leads every deployment needs.</li>
        <li><strong>Build product knowledge.</strong> Support roles at software companies often lead into customer success, implementation and operations, which pay more and are harder to automate.</li>
        <li><strong>Consider direct remote employment.</strong> Many companies hire support staff in the Philippines directly or through employers of record rather than via outsourcing firms. Our guide to <a href="/posts/remote-customer-support-careers">remote customer support careers</a> explains the paths.</li>
      </ul>

      <h2>Finding remote support roles</h2>
      <p>On our board, support and customer success roles open to the Philippines usually sit under Asia-Pacific or worldwide scopes. You can browse them on <a href="/jobs">all remote jobs</a> or narrow to <a href="/remote-regional-jobs">remote regional jobs</a> and check each listing's location line. The <a href="/tools/remote-job-location-checker">remote job location checker</a> reads a posting's location text and tells you whether it is likely to accept candidates where you live.</p>
      <p>Be cautious with offers that come through social media or messaging apps. Support roles are a favourite cover for scams, especially when an "employer" asks for a fee or equipment payment. Our guide on <a href="/posts/how-to-spot-fake-remote-job-postings">spotting fake remote job postings</a> lists the warning signs.</p>
      <p>The revised targets are a warning rather than a verdict. The Philippine industry is still projected to grow, still employs nearly two million people and still competes on skills that AI does not have. The workers who do best will be the ones who move toward the parts of the job where those skills matter most.</p>
    `,
    faq: [
      { q: "Why did the Philippine BPO industry lower its targets?", a: "IBPAP revised its 2028 goal of 2.5 million workers and $59 billion because AI is automating routine customer service tasks. Its downside scenario is now about 1.85 million workers and $43.3 billion, with a best case near 2.14 million and $50.5 billion." },
      { q: "Is the Philippine BPO industry still growing?", a: "Yes. It added more than 60,000 jobs in 2025, and IBPAP projects 2026 revenue of about $42.3 billion and employment of about 1.96 million, with revenue growing faster than headcount." },
      { q: "Are BPO workers losing jobs to AI?", a: "IBPAP says affected entry-level staff have mostly been redeployed. Unions point to workers on floating status without assignments. Both can be true at once, and official data will take time to show the full picture." },
      { q: "Which support jobs are safest from AI?", a: "Roles involving complex cases, technical troubleshooting, regulated industries, account management and supervising AI systems are less exposed than simple inbound queries such as password resets and order tracking." },
    ],
  },
  {
    slug: "latin-america-nearshore-developers-2026",
    title: "Nearshoring to Latin America in 2026: Where US Firms Hire Developers",
    description:
      "Brazil, Mexico, Argentina and Colombia supply most of Latin America's developers. How US companies hire there in 2026, and what candidates should know.",
    date: "2026-11-08T04:32:00.000Z",
    author: "Bhargav",
    tags: ["Latin America", "Nearshoring", "Software Engineering", "Remote Hiring", "Employer of Record"],
    readMinutes: 6,
    html: `
      <p>US companies looking to hire engineers outside the country have three broad options: hire far away in Asia or Eastern Europe, hire nearby in Latin America, or hire remotely wherever the best candidate happens to be. In 2026, with the <a href="/posts/h1b-100000-fee-2026-remote-hiring-abroad">$100,000 H-1B fee</a> making it harder to bring foreign engineers to the US, the nearby option has become more attractive. "Nearshoring" to Latin America is one of the clearest hiring trends of the year.</p>

      <h2>Where the developers are</h2>
      <p>Figures compiled by Statista and cited by Dice give a rough sense of scale for the four largest markets: about 500,000 software developers in Brazil, 220,000 in Mexico, 115,000 in Argentina and 62,000 in Colombia. Hiring platform Revelo puts the regional total at more than 1.7 million. Different counting methods produce different numbers, so treat these as orders of magnitude rather than precise totals.</p>
      <p>Each market has a different profile:</p>
      <ul>
        <li><strong>Brazil</strong> has the deepest talent pool and a large, mature tech industry, including major fintech and e-commerce companies. Most of its time zones are one to two hours ahead of US Eastern time during the northern winter.</li>
        <li><strong>Mexico</strong> shares time zones with the central and western US and has strong cultural and business ties to American companies. Guadalajara and Mexico City are established tech hubs.</li>
        <li><strong>Argentina</strong> is known for highly experienced senior engineers and is often described as the region's premium market. Economic volatility has made dollar-denominated remote work especially attractive there.</li>
        <li><strong>Colombia</strong> sits on US Eastern time for much of the year, and Medellín and Bogotá have grown quickly as hubs for both local startups and remote workers.</li>
      </ul>

      <h2>Why US companies choose Latin America</h2>
      <p>Time zone overlap is the main reason. A developer in Bogotá or Mexico City works the same hours as a team in New York or Chicago, which makes collaboration far easier than with a team twelve hours away. Our guide on <a href="/posts/timezone-overlap-how-much-you-need">how much time zone overlap you need</a> explains why a few shared hours matter so much for engineering teams.</p>
      <p>Cost is the second reason. Staffing vendors commonly claim that Latin American developer salaries run 30 to 50 percent below US rates for comparable experience, with senior engineers earning roughly $55,000 to $95,000. Those figures come from companies selling nearshore hiring, so they are marketing estimates, but they are consistent with the published ranges we see on listings open to the region.</p>
      <p>The third reason is skills. Latin American engineers increasingly work in the same modern stacks as their US peers, and many already have experience with US clients through agencies or earlier remote roles.</p>

      <h2>How the hiring actually works</h2>
      <p>Every country in the region has its own labour laws, social security systems and rules on termination, so most US companies do not hire Latin American developers as direct employees. Instead they use one of three routes: an employer of record that legally employs the worker on the company's behalf, an independent contractor agreement, or a staffing agency that places the developer and handles the paperwork. The route matters for the worker, because it determines benefits, job security and tax obligations. Our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a> sets out the differences, and <a href="/posts/remote-jobs-canada-latin-america">remote jobs in Canada and Latin America</a> covers where to look.</p>

      <h2>What candidates in Latin America should know</h2>
      <ul>
        <li><strong>English is the deciding skill.</strong> Technical ability gets you the interview, but confident spoken English decides many offers, because the job involves daily calls with US colleagues.</li>
        <li><strong>Agencies take a cut.</strong> If you are hired through an agency, the client may be paying significantly more than you receive. That is normal, but it is worth knowing when you negotiate, and direct contracts often pay more.</li>
        <li><strong>Contracts deserve scrutiny.</strong> Check the currency of payment, the notice period, who owns your work, and whether you are expected to handle your own taxes. Use our <a href="/tools/offer-comparator">offer comparator</a> to put two offers side by side.</li>
        <li><strong>Invoicing is a skill.</strong> Contractors need clean invoices in the right currency. The <a href="/tools/contractor-invoice-generator">contractor invoice generator</a> creates one, and our guide to <a href="/posts/how-to-invoice-international-clients">invoicing international clients</a> covers the details.</li>
      </ul>

      <h2>Where to find these roles</h2>
      <p>Many US employers list roles as "Remote, Americas" or "Remote, LATAM", or name specific countries. On our board, those appear under the Americas scope on <a href="/remote-regional-jobs">remote regional jobs</a>. A smaller number are open worldwide and appear on <a href="/jobs?scope=worldwide">worldwide remote jobs</a>. Always read the location line: a role marked "Remote" from a US company may still mean US only, and our <a href="/posts/remote-job-region-labels-explained">region labels guide</a> explains how to tell.</p>
      <p>The outlook for 2026 and beyond is favourable for experienced developers in the region. Visa costs have pushed US companies to look abroad, time zones favour Latin America over most alternatives, and the talent pool is large and maturing. The main risk is the same as everywhere: AI tools are reducing demand for junior engineering work, so the strongest opportunities go to developers who can own features end to end and communicate clearly with the teams they join.</p>
      <p>For salary benchmarks across regions, the <a href="/tools/remote-salary-converter">remote salary converter</a> and <a href="/tools/salary-purchasing-power">salary purchasing power tool</a> show what a US-denominated offer is worth where you live, which helps when deciding whether a nearshore offer is fair.</p>
    `,
    faq: [
      { q: "Which Latin American countries have the most developers?", a: "Statista figures cited by Dice put Brazil at about 500,000 developers, Mexico at 220,000, Argentina at 115,000 and Colombia at 62,000. Hiring platform Revelo estimates more than 1.7 million across the region." },
      { q: "Why do US companies hire developers in Latin America?", a: "Mainly for time zone overlap, since most of the region works the same or similar hours as the US. Lower salary costs and a growing pool of experienced engineers are the other main reasons." },
      { q: "How much do nearshore developers earn?", a: "Staffing vendors estimate salaries 30 to 50 percent below US rates, with senior developers earning roughly $55,000 to $95,000. These are vendor estimates and vary widely by country, skill and hiring route." },
      { q: "Are nearshore developers employees or contractors?", a: "Usually not direct employees. Most are hired through employers of record, as independent contractors or via staffing agencies, because each country has its own labour and tax rules." },
    ],
  },
  {
    slug: "salesforce-ai-agents-support-jobs-2026",
    title: "Salesforce Cut Support From 9,000 to 5,000. AI Agents Did the Rest",
    description:
      "Marc Benioff said AI agents let Salesforce cut support staff from about 9,000 to 5,000. The 2026 layoffs that followed, and what support workers should learn.",
    date: "2026-11-08T04:33:00.000Z",
    author: "Bhargav",
    tags: ["Salesforce", "AI Agents", "Customer Support", "Layoffs", "Future of Work"],
    readMinutes: 6,
    html: `
      <p>Salesforce has become the clearest example of a large company replacing customer support staff with AI agents and saying so openly. In 2025, chief executive Marc Benioff said the company had reduced its support organisation from about 9,000 people to about 5,000, because its own AI agents were now handling a large share of customer interactions. "I need less heads," he said on a podcast at the time. In 2026, the company kept cutting, including, in a twist widely noted, people on the teams building those agents.</p>

      <h2>The timeline</h2>
      <ul>
        <li><strong>2025:</strong> Benioff said AI agents, sold under the Agentforce brand, were handling roughly half of Salesforce's customer interactions, allowing the support team to shrink from about 9,000 to about 5,000.</li>
        <li><strong>February 2026:</strong> Reports said Salesforce cut about 1,000 roles across functions including marketing, product management and data analytics, and including some staff on the Agentforce team.</li>
        <li><strong>June 2026:</strong> Further cuts hit teams working on Agentforce and MuleSoft, including about 86 roles at the San Francisco headquarters according to state filings reported by The Register. The cuts came in the same period the company announced a $50 billion share buyback.</li>
      </ul>
      <p>Salesforce has not published a single total for 2026 job cuts, and the figures above come from reporting and regulatory filings rather than company announcements.</p>

      <h2>Why Salesforce matters as a case study</h2>
      <p>Many companies quietly use AI to slow hiring in support. Salesforce is unusual in three ways. It is very large, so its numbers are meaningful. It sells the same AI agents it uses, so it has a commercial reason to demonstrate results. And its chief executive has spoken publicly about headcount, which gives a rare first-hand account of how AI changes staffing decisions.</p>
      <p>The headline reduction, roughly 4,000 support roles, is large. But how it happened matters. Benioff described part of the reduction as redeploying support staff into other roles rather than letting everyone go, and part as not replacing people who left. That matches the pattern the Bank of England found across UK firms: AI shows up first as fewer vacancies rather than mass firings. Our article on <a href="/posts/bank-of-england-ai-productivity-jobs-uk-2026">the Bank of England's findings</a> covers that research.</p>

      <h2>What AI agents actually handle</h2>
      <p>AI support agents perform best on questions that are frequent, well documented and easy to verify: how to reset a setting, where to find an invoice, what a feature does, whether an outage is known. Those were once the bulk of a support team's volume. What remains for people tends to be harder: problems that span several systems, angry or high-value customers, unusual edge cases, and anything requiring judgement about refunds, exceptions or policy.</p>
      <p>That changes the support job in two directions. The remaining human work is more skilled and often more stressful, because every easy ticket is gone. And new roles appear around the agents themselves: writing and maintaining the knowledge base they draw on, reviewing their conversations for errors, designing when they hand off to a person and measuring whether customers are actually satisfied.</p>

      <h2>The irony of cutting the agent builders</h2>
      <p>The February and June cuts reached people working on Agentforce itself. That is less contradictory than it sounds. Companies reorganise product teams constantly, and a product moving from early development to scale often needs a different mix of skills. But it is a useful reminder that working on AI does not make a job immune from cuts. What protects a role is its connection to revenue and growth, not the technology it touches. Our article on <a href="/posts/ai-layoffs-october-2026-challenger-report">AI-linked layoffs in October 2026</a> shows how widely that pattern has spread.</p>

      <h2>What support workers should take from it</h2>
      <ul>
        <li><strong>Specialise.</strong> Technical support, enterprise accounts and regulated industries keep more human work than general inbound queues.</li>
        <li><strong>Own the AI layer.</strong> Volunteer to maintain help content, review bot conversations or design escalation rules. Those skills transfer to any company deploying agents.</li>
        <li><strong>Move toward customer success.</strong> Retaining and growing accounts depends on relationships and judgement, and it is tied to revenue, which makes it more resilient.</li>
        <li><strong>Measure your impact.</strong> Resolution rates, satisfaction scores and retained revenue make a stronger CV than ticket volume, which AI now inflates.</li>
      </ul>
      <p>Our guide to <a href="/posts/remote-customer-support-careers">remote customer support careers</a> covers how support roles lead into success, operations and product work, and <a href="/posts/remote-career-change-guide">our career change guide</a> covers bigger moves.</p>

      <h2>Support roles are still being posted</h2>
      <p>Despite the headlines, support remains one of the most common remote job categories on our board, particularly at software companies hiring for technical and enterprise support. You can browse current roles on <a href="/jobs">all remote jobs</a> or check the narrower set open across borders on <a href="/remote-regional-jobs">remote regional jobs</a>. When you apply, emphasise complex problem-solving and customer outcomes rather than speed, because speed is the part of the job companies are now handing to AI.</p>
      <p>The <a href="/tools/job-title-finder">job title finder</a> can also help you discover adjacent titles, such as support operations, implementation or solutions engineering, that use the same skills with less exposure to automation.</p>
    `,
    faq: [
      { q: "How many support jobs did Salesforce cut because of AI?", a: "Marc Benioff said in 2025 that Salesforce reduced its support organisation from about 9,000 people to about 5,000 because AI agents were handling roughly half of customer interactions. He described part of the reduction as redeployment and not backfilling roles." },
      { q: "Did Salesforce have layoffs in 2026?", a: "Yes. Reports describe about 1,000 cuts in February 2026 across marketing, product, analytics and the Agentforce team, and further cuts in June 2026 in Agentforce and MuleSoft, including about 86 roles at its San Francisco headquarters." },
      { q: "What is Agentforce?", a: "Agentforce is Salesforce's platform for AI agents that handle tasks such as answering customer questions, which it sells to other companies and uses internally." },
      { q: "Are customer support jobs disappearing?", a: "Simple, high-volume support work is shrinking, but complex support, enterprise accounts, customer success and roles managing AI systems are still in demand. Support remains a common remote job category." },
    ],
  },
  {
    slug: "oracle-layoffs-2026-data-centers",
    title: "Oracle's 2026 Layoffs: Cutting Jobs to Pay for AI Data Centres",
    description:
      "Oracle began cutting jobs in March 2026, with analysts estimating 20,000 to 30,000 roles, to fund AI data centres. What we know, what is unconfirmed, and why.",
    date: "2026-11-08T04:34:00.000Z",
    author: "Bhargav",
    tags: ["Oracle", "Layoffs", "Data Centers", "AI Infrastructure", "Tech Industry"],
    readMinutes: 6,
    html: `
      <p>Some of 2026's largest tech layoffs have come from a company that rarely makes headlines for them. Oracle, the database and cloud company, began cutting jobs at the end of March with early-morning emails to affected staff, and the cuts continued through the year. The reason, according to analysts who follow the company, is straightforward: Oracle is spending enormous sums building data centres for AI customers, and cutting staff frees cash to pay for them.</p>
      <p>Oracle has not confirmed the total number of jobs cut. What follows is what has been reported, with the source for each figure.</p>

      <h2>What has been reported</h2>
      <ul>
        <li><strong>31 March 2026:</strong> Employees began receiving termination emails early in the morning. CNBC reported that thousands of roles were affected across several divisions.</li>
        <li><strong>Analyst estimates:</strong> TD Cowen and Morningstar estimated the cuts at 20,000 to 30,000 roles, which would be roughly 18 percent of Oracle's workforce of about 162,000. TD Cowen estimated the cuts could free $8 billion to $10 billion a year in cash flow.</li>
        <li><strong>June 2026:</strong> Reporting based on Oracle's regulatory filings put the reduction at about 21,000 roles over the previous year, around 13 percent of headcount, with the filing referring to AI. The same period showed negative free cash flow of about $23.7 billion as data centre spending surged.</li>
        <li><strong>14 September 2026:</strong> Reports said another round of cuts had begun.</li>
      </ul>
      <p>The different estimates are not necessarily in conflict. Analyst figures from early in the year were projections of the full programme, while the June figure covered a specific twelve-month period. Until Oracle publishes a total, any single number should be treated as an estimate.</p>

      <h2>Why a profitable company is cutting</h2>
      <p>Oracle has signed very large contracts to provide computing capacity to AI companies, and it is building data centres to deliver them. Data centres cost tens of billions of dollars before they earn anything. That has pushed Oracle's free cash flow deeply negative and increased its borrowing. According to reports, some banks raised their lending costs or pulled back from financing Oracle's data centre projects, which adds pressure to find cash internally.</p>
      <p>Payroll is one of the few large costs a company can cut quickly. By reducing headcount in areas it considers less central, Oracle can redirect billions of dollars a year toward infrastructure. It is the same reallocation we describe in our article on <a href="/posts/big-tech-ai-capex-2026-jobs-data-centers">big tech's AI spending</a>: money moving from salaries in some functions to data centres and AI talent in others.</p>

      <h2>Who was affected</h2>
      <p>Oracle has not published a breakdown by team or country. Reports describe cuts spread across several divisions rather than confined to one business, and affected employees described receiving notice by email with little warning. Without official figures, it is hard to say which functions bore the most, but the pattern at other large companies in 2026 suggests that internal operations, sales support and roles furthest from the infrastructure build-out are the most exposed. If you work at Oracle or a company like it, the safest positions are those connected to the data centre and cloud capacity the company is betting on.</p>

      <h2>What it signals for the industry</h2>
      <p>Oracle is not an outlier. Amazon, Microsoft, Meta and Salesforce have all cut jobs in 2026 while raising AI spending. Our articles on <a href="/posts/amazon-corporate-layoffs-2026-what-it-signals">Amazon's corporate layoffs</a>, <a href="/posts/microsoft-layoffs-2026-xbox-ai">Microsoft's cuts</a> and <a href="/posts/meta-layoffs-2026-closed-open-roles-ai">Meta's hiring freeze</a> cover each. What distinguishes Oracle is the explicit link between the size of the cuts and the cash needed for data centres, and the financial strain visible in its numbers.</p>
      <p>That strain is worth watching. If AI demand keeps growing, the data centres will pay off and Oracle may hire again in the areas that support them. If demand disappoints, a company carrying heavy debt and negative cash flow may need further cuts. Either way, the jobs most at risk are those furthest from the infrastructure Oracle is betting on.</p>

      <h2>If you were affected</h2>
      <ul>
        <li><strong>Check your severance terms carefully</strong> before signing, including any non-compete or non-solicitation clauses, and confirm how stock awards are treated.</li>
        <li><strong>Lead with transferable skills.</strong> Oracle database, cloud infrastructure and enterprise software experience is in demand across the industry, including at companies hiring remotely.</li>
        <li><strong>Look at the infrastructure boom.</strong> Data centre operators, cloud providers and the companies that supply them are hiring for many of the skills Oracle staff have.</li>
        <li><strong>Vet employers' remote policies.</strong> Some companies hiring laid-off tech workers expect office attendance. The <a href="/tools/company-remote-score">company remote score</a> shows how many of an employer's current listings are genuinely remote.</li>
      </ul>

      <h2>Finding your next role</h2>
      <p>Cloud, database and infrastructure roles are among the more consistently remote categories on our board. You can browse <a href="/jobs">all remote jobs</a>, check our guide to <a href="/posts/remote-devops-sre-jobs">remote DevOps and SRE jobs</a>, or look at <a href="/remote-regional-jobs">remote regional jobs</a> if you are outside the US. Before accepting any offer, our checklist on <a href="/posts/before-you-accept-a-remote-job-offer">what to check before you accept</a> covers the questions that matter most after a layoff, from contract type to how stable the role's budget is.</p>
    `,
    faq: [
      { q: "How many jobs has Oracle cut in 2026?", a: "Oracle has not confirmed a total. TD Cowen and Morningstar estimated 20,000 to 30,000 roles, about 18 percent of its roughly 162,000 staff. Reporting based on filings in June 2026 put the reduction at about 21,000 over the prior year, around 13 percent of headcount." },
      { q: "Why is Oracle laying people off?", a: "Analysts link the cuts to Oracle's huge spending on AI data centres, which pushed free cash flow to about negative $23.7 billion. TD Cowen estimated the cuts could free $8 billion to $10 billion a year in cash." },
      { q: "When did the Oracle layoffs start?", a: "Employees began receiving termination emails on 31 March 2026, with further rounds reported later in the year, including one beginning around 14 September 2026." },
      { q: "Which Oracle teams were affected?", a: "Oracle has not published a breakdown. Reports describe cuts spread across several divisions, with notice delivered by email, rather than confined to a single business." },
    ],
  },
  {
    slug: "new-digital-nomad-visas-2026",
    title: "New Digital Nomad Visas in 2026: Sri Lanka, Moldova, Bulgaria and More",
    description:
      "Sri Lanka, Moldova, Bulgaria and Slovenia opened digital nomad visas, while Antigua closed one. What changed in 2025 and 2026, with income thresholds.",
    date: "2026-11-08T04:35:00.000Z",
    author: "Bhargav",
    tags: ["Digital Nomad Visa", "Remote Work Abroad", "Visas", "Work From Anywhere", "Travel"],
    readMinutes: 6,
    html: `
      <p>Digital nomad visas, which let foreign remote workers live in a country while working for employers or clients elsewhere, kept spreading through 2025 and 2026. Depending on how strictly you define them, there are now somewhere between about 50 and more than 70 such programmes worldwide. Counts vary because some countries offer dedicated nomad visas while others adapt existing residence permits. This article covers what is new, what has closed and what to check before you apply.</p>
      <p>Visa rules change often. Treat the details below as a starting point, and confirm current requirements with the official government source before making plans.</p>

      <h2>New in 2026</h2>
      <ul>
        <li><strong>Sri Lanka</strong> opened a digital nomad visa in February 2026, with a reported minimum income of about $2,000 a month. It adds a lower-cost South Asian option with good time-zone overlap for European and Asian clients.</li>
        <li><strong>Moldova</strong> offers a nomad permit of up to two years, with a reported income threshold of about $3,100 a month. Its low living costs make it attractive for remote workers paid in euros or dollars.</li>
        <li><strong>Italy</strong> finally rolled out its long-announced digital nomad visa after years of delay, though its requirements, including a high income threshold and qualifications, make it more selective than most.</li>
      </ul>

      <h2>Launched in late 2025</h2>
      <ul>
        <li><strong>Bulgaria and Slovenia</strong> added EU options in late 2025. Both give access to a European base, though a nomad visa does not grant the right to work for local employers or to live elsewhere in the EU.</li>
        <li><strong>The Philippines</strong> introduced a nomad visa with a reported income requirement of about $2,000 a month.</li>
        <li><strong>Taiwan</strong> and <strong>El Salvador</strong> also launched programmes in 2025.</li>
        <li><strong>Nepal</strong> has announced plans for a nomad visa, but details were not final at the time of writing.</li>
      </ul>

      <h2>Closed</h2>
      <p>Not every programme survives. <strong>Antigua and Barbuda</strong> stopped accepting new applications for its Nomad Digital Residence in November 2025. Closures like this are a reminder that a visa available when you plan may not be available when you apply, and that renewals are never guaranteed.</p>

      <h2>What these visas usually require</h2>
      <p>Most programmes share a common structure:</p>
      <ul>
        <li><strong>Proof of income</strong> above a monthly threshold, typically between $1,500 and $3,500, usually shown through bank statements, contracts or payslips.</li>
        <li><strong>Remote employment or self-employment</strong> with employers or clients outside the host country. Most forbid working for local companies.</li>
        <li><strong>Health insurance</strong> valid in the host country for the full stay.</li>
        <li><strong>A clean criminal record</strong> and a valid passport, often with several months of validity remaining.</li>
      </ul>
      <p>Our <a href="/tools/nomad-visa-checker">nomad visa checker</a> compares income thresholds and durations, and our full guide to <a href="/posts/digital-nomad-visas-2026">digital nomad visas in 2026</a> covers the established programmes in Europe, Latin America and Asia.</p>

      <h2>The part most people forget: tax</h2>
      <p>A nomad visa answers the question of whether you may live somewhere. It does not settle where you owe tax. Many countries treat anyone present for more than 183 days in a year as tax resident, and some nomad visas include tax exemptions while others do not. Your home country may also continue to tax you. Before moving, read our guide to <a href="/posts/remote-work-taxes-living-abroad">remote work taxes when living abroad</a>, and use the <a href="/tools/tax-residency-day-counter">tax residency day counter</a> to track your days in each country.</p>
      <p>Your employer's view matters too. Many companies restrict where employees may work for tax, payroll and legal reasons, even if you hold a valid visa. A job advertised as remote within your home country does not automatically allow you to work from Sri Lanka or Moldova. Our article on <a href="/posts/work-from-home-vs-work-from-anywhere">work from home versus work from anywhere</a> explains the difference.</p>

      <h2>Finding a job that allows it</h2>
      <p>If you want to live abroad on a nomad visa, the simplest setup is a role whose employer explicitly allows work from anywhere, or self-employment with international clients. Truly worldwide roles are a small share of remote jobs, and our <a href="/jobs?scope=worldwide">worldwide remote jobs</a> page lists only the ones that pass a strict check. Our guide on <a href="/posts/how-to-find-work-from-anywhere-jobs">how to find work-from-anywhere jobs</a> explains how to spot them, and <a href="/posts/cost-of-living-arbitrage-remote-salary">cost-of-living arbitrage</a> covers the financial side of choosing a base.</p>
      <p>Freelancers and contractors have more flexibility, since they choose their own clients. If that is your route, the <a href="/tools/freelance-rate-calculator">freelance rate calculator</a> helps set a rate that covers insurance, visa fees and the gaps between contracts.</p>
      <p>The growth in nomad visas is real, and the options in 2026 are wider than ever. But the visa is usually the easy part. The harder parts are a job that permits it, a clear tax position and health cover, and those deserve as much attention as choosing the destination.</p>
    `,
    faq: [
      { q: "Which countries launched digital nomad visas in 2026?", a: "Sri Lanka opened one in February 2026 with a reported income requirement of about $2,000 a month. Moldova offers a permit of up to two years at about $3,100 a month, and Italy finally rolled out its programme. Bulgaria and Slovenia launched theirs in late 2025." },
      { q: "How many digital nomad visas are there?", a: "Estimates range from about 50 to more than 70, depending on whether you count only dedicated nomad visas or also adapted residence permits for remote workers." },
      { q: "Has any country closed its nomad visa?", a: "Yes. Antigua and Barbuda stopped accepting new applications for its Nomad Digital Residence in November 2025. Programmes can close or change, so check official sources before applying." },
      { q: "Does a digital nomad visa mean I pay no tax?", a: "No. A nomad visa covers your right to stay, not your tax position. Many countries treat people present more than 183 days as tax resident, and your home country may also tax you. Some visas include exemptions and others do not." },
      { q: "Can I use a nomad visa with any remote job?", a: "Only if your employer allows you to work from that country. Many remote jobs are restricted to specific countries for payroll and tax reasons, so confirm with your employer before moving." },
    ],
  },
  {
    slug: "daylight-saving-ends-2026-time-zone-overlap",
    title: "The Clocks Changed: How Your Time Zone Overlap Shifts This Winter",
    description:
      "US clocks went back on 1 November 2026, Europe's on 25 October and Australia's forward on 4 October. How meeting overlaps changed for remote teams.",
    date: "2026-11-08T04:36:00.000Z",
    author: "Bhargav",
    tags: ["Time Zones", "Daylight Saving Time", "Remote Teams", "Scheduling", "Async Work"],
    readMinutes: 5,
    html: `
      <p>If your weekly meeting with a colleague abroad suddenly started an hour early or late in the past few weeks, the cause was not a calendar bug. Three different daylight saving changes happened within a month of each other this autumn, and every remote team that spans the northern and southern hemispheres felt at least one of them.</p>

      <h2>The three changes</h2>
      <ul>
        <li><strong>Sunday 4 October 2026:</strong> Australia's south-eastern states, including New South Wales and Victoria, moved their clocks <strong>forward</strong> an hour for their summer. Queensland, Western Australia and the Northern Territory do not observe daylight saving.</li>
        <li><strong>Sunday 25 October 2026:</strong> The UK and the European Union moved their clocks <strong>back</strong> an hour for winter.</li>
        <li><strong>Sunday 1 November 2026:</strong> Most of the United States and Canada moved their clocks <strong>back</strong> an hour. Arizona (outside the Navajo Nation) and Hawaii do not change.</li>
      </ul>
      <p>Many countries, including India, China, Japan, Singapore, the Philippines and most of Africa and South America, do not observe daylight saving at all. Their offset to Europe and North America changes when the other side's clocks move.</p>

      <h2>What changed for common team pairings</h2>
      <p>Here is how the gaps look now, compared with the summer:</p>
      <ul>
        <li><strong>New York and London:</strong> back to 5 hours. For the week between 25 October and 1 November, the gap was only 4 hours, because Europe changed first. That week is when many transatlantic meetings landed at the wrong time.</li>
        <li><strong>New York and Berlin:</strong> back to 6 hours, after a week at 5.</li>
        <li><strong>London and India:</strong> India is now 5.5 hours ahead of London, up from 4.5 in the summer. Shared afternoon hours with Indian colleagues shrank by an hour for UK teams.</li>
        <li><strong>New York and India:</strong> India is now 10.5 hours ahead of New York, up from 9.5.</li>
        <li><strong>London and Sydney:</strong> Sydney is now 11 hours ahead of London, compared with 9 hours in the northern summer. The gap widened by two hours in a month, because the clocks moved in opposite directions.</li>
        <li><strong>San Francisco and Sydney:</strong> Sydney is now 19 hours ahead, compared with 17 in the northern summer.</li>
        <li><strong>US and Latin America:</strong> Most of Latin America does not change, so many countries gained an hour relative to the US. Bogotá now matches New York, and São Paulo is 2 hours ahead of New York, compared with 1 in the summer.</li>
      </ul>

      <h2>Why it matters for remote work</h2>
      <p>For teams with a comfortable overlap, an hour makes little difference. For teams already at the edge, it can turn a workable meeting into an unreasonable one. A UK and Australia team that had a 7am and 4pm slot in September might now face a 6am or 9pm one. Teams that rely on a short handoff window between India and the US East Coast lose an hour of it.</p>
      <p>The problem is usually not the change itself but the fact that nobody notices until a meeting goes wrong. Calendars handle the conversion correctly, but people often plan in their heads using last month's gap.</p>

      <h2>What to do now</h2>
      <ul>
        <li><strong>Recheck recurring meetings.</strong> Look at every standing meeting that crosses hemispheres and ask whether its time is still fair to everyone. Rotating inconvenient slots is better than leaving one person with all of them.</li>
        <li><strong>Set meetings in one time zone.</strong> Anchoring a recurring meeting to a single zone avoids double shifts, but it means one side's local time moves twice a year. Agree which side that is.</li>
        <li><strong>Lean on async work in the narrow months.</strong> When overlaps shrink, move status updates and reviews to written formats. Our guide on <a href="/posts/working-across-timezones-without-burning-out">working across time zones without burning out</a> covers how.</li>
        <li><strong>Put both dates in your calendar for March.</strong> The changes reverse next spring, and once again the US moves before Europe, creating a few weeks of unusual gaps.</li>
      </ul>
      <p>Our <a href="/tools/timezone-overlap">time zone overlap calculator</a> shows the shared working hours between any two locations on any date, and the <a href="/tools/team-timezone-matrix">team time zone matrix</a> handles a whole team at once. The <a href="/tools/world-time-buddy">world time buddy</a> is the quickest way to check a single meeting.</p>

      <h2>For job seekers</h2>
      <p>If you are applying for remote roles in another region, check the overlap in both seasons, not just today. A role that requires four overlapping hours may be easy in the summer and hard in the winter, or the reverse. Our guide on <a href="/posts/timezone-overlap-how-much-you-need">how much overlap you really need</a> explains what employers usually expect, and you can filter listings by region on <a href="/remote-regional-jobs">remote regional jobs</a> or browse everything on <a href="/jobs">all remote jobs</a>.</p>
      <p>When an employer asks about your availability, give your working hours in their time zone and mention any seasonal shift. It shows you have thought about how the job will actually work, which is exactly what hiring managers for distributed teams want to see.</p>
    `,
    faq: [
      { q: "When did the clocks change in 2026?", a: "Australia's south-eastern states moved forward on Sunday 4 October 2026. The UK and EU moved back on Sunday 25 October 2026, and most of the US and Canada moved back on Sunday 1 November 2026." },
      { q: "Why was the US and UK time difference only four hours in late October?", a: "Europe ended daylight saving on 25 October and the US on 1 November. For that week, New York was 4 hours behind London instead of the usual 5." },
      { q: "What is the time difference between London and Sydney now?", a: "Sydney is 11 hours ahead of London during the northern winter, compared with 9 hours in the northern summer, because the two countries change clocks in opposite directions." },
      { q: "Does India observe daylight saving time?", a: "No. India stays on UTC+5:30 all year, so its gap to the UK and US grows by an hour when those countries move their clocks back for winter." },
    ],
  },
  {
    slug: "salary-increase-budgets-2027",
    title: "2027 Pay Raise Budgets Are In: About 3.5%, and Tech Leads at 3.8%",
    description:
      "Mercer, WTW, The Conference Board and Payscale all expect 2027 raises of about 3.2% to 3.5%, with tech merit budgets highest. What it means for your pay.",
    date: "2026-11-08T04:37:00.000Z",
    author: "Bhargav",
    tags: ["Salary", "Pay Raises", "Compensation", "Salary Negotiation", "2027"],
    readMinutes: 5,
    html: `
      <p>Every autumn, compensation consultancies survey employers about how much they plan to spend on pay increases the following year. The 2027 numbers are now in, and they tell a consistent story: raises will be modest, roughly in line with 2026, and technology companies will spend slightly more than most. Here is what the main surveys say, and how to use them when you ask for a raise or negotiate an offer.</p>

      <h2>What the surveys say</h2>
      <ul>
        <li><strong>Mercer</strong> (with Marsh), in its July 2026 QuickPulse survey of about 1,000 US employers, found planned 2027 merit increases of 3.2 percent and total increase budgets of 3.5 percent. It described this as the fourth consecutive year of broadly stable budgets. Around 87 percent of the responses were preliminary, so final figures may shift.</li>
        <li><strong>WTW</strong> projects US salary increase budgets of 3.4 percent for 2027, slightly below the 3.5 percent of 2026.</li>
        <li><strong>The Conference Board</strong>, in a September 2026 survey, reported a median planned increase of 3.5 percent.</li>
        <li><strong>Gallagher</strong> expects increases in the range of 3 to 3.5 percent.</li>
        <li><strong>Payscale</strong> found that 32 percent of organisations plan across-the-board raises for 2027, down from 36 percent for 2026, meaning more employers are tying raises to performance.</li>
        <li><strong>Mercer Canada</strong> reported planned merit increases of 3.0 percent and total budgets of 3.2 percent.</li>
      </ul>
      <p>The surveys measure slightly different things. A merit budget covers performance-based raises; a total budget adds promotions, market adjustments and other increases. Both are averages across a company, so individual raises vary widely.</p>

      <h2>Which industries lead</h2>
      <p>In Mercer's survey, high tech had the highest planned merit budget at 3.8 percent. Healthcare and retail were at the low end, at roughly 3.0 to 3.2 percent. That pattern reflects where competition for skills is strongest. Even after a year of layoffs, technology companies are competing hard for AI, data and infrastructure specialists, and their pay budgets reflect it.</p>

      <h2>How this compares with inflation</h2>
      <p>A raise only matters relative to prices. If inflation runs near 3 percent, a 3.5 percent raise is a small real increase. If it runs higher, a 3.5 percent raise is a pay cut in real terms. The stability of budgets for four years suggests employers expect inflation to stay roughly where it is, but the gap between pay and prices is worth checking for your own situation.</p>

      <h2>What averages hide</h2>
      <p>Two people at the same company can receive very different raises from the same budget. Companies increasingly concentrate their money on high performers and hard-to-replace skills, so a top performer might get 6 percent while an average performer gets 2 percent. Payscale's finding that fewer companies plan across-the-board raises points the same way. The budget sets the pool; your performance, your market value and your negotiation determine your share.</p>
      <p>Changing jobs usually beats staying. Workers who switch employers typically get larger increases than those who stay, because a new offer is priced against the market rather than against last year's salary. That gap narrows in slow hiring markets like 2026, but it rarely disappears.</p>

      <h2>How to use these numbers</h2>
      <ul>
        <li><strong>In a raise conversation,</strong> use the survey figures as a floor for a solid performer, not a ceiling. If you have taken on more responsibility, frame the request around your expanded role rather than the budget.</li>
        <li><strong>In an offer negotiation,</strong> focus on market rates for the role, not on your current pay plus a typical raise. Published salary ranges, which pay transparency laws now require in many places, are your best evidence. Our guide to <a href="/posts/salary-transparency-laws-2026">salary transparency laws in 2026</a> explains where to find them.</li>
        <li><strong>For remote roles,</strong> check whether the employer pays location-adjusted salaries. Our guide on <a href="/posts/remote-salaries-2026-negotiate-the-premium">remote salaries and negotiating the premium</a> covers how location affects pay.</li>
      </ul>
      <p>Several of our tools help. The <a href="/tools/salary-band-estimator">salary band estimator</a> shows published ranges on our board by field and level. The <a href="/tools/offer-comparator">offer comparator</a> compares total compensation between two offers, and the <a href="/tools/salary-purchasing-power">salary purchasing power tool</a> shows what a salary is worth in different places.</p>

      <h2>The bottom line</h2>
      <p>For 2027, plan on a typical raise of around 3 to 3.5 percent if you stay where you are and perform well, with more in technology and less in healthcare and retail. If that is not enough, the most reliable routes to a bigger increase are a promotion, a change in role or a new employer. You can see what companies are currently offering on <a href="/jobs">all remote jobs</a>, many of which publish salary ranges, or explore the narrower set of <a href="/jobs?scope=worldwide">worldwide remote jobs</a>.</p>
    `,
    faq: [
      { q: "What is the average pay raise for 2027?", a: "Major surveys point to about 3.2 to 3.5 percent. Mercer found planned merit increases of 3.2 percent and total budgets of 3.5 percent, WTW projects 3.4 percent, and The Conference Board reported a median of 3.5 percent." },
      { q: "Which industry has the highest 2027 raise budget?", a: "In Mercer's July 2026 survey, high tech had the highest planned merit budget at 3.8 percent. Healthcare and retail were lowest at roughly 3.0 to 3.2 percent." },
      { q: "Are across-the-board raises becoming less common?", a: "Yes. Payscale found 32 percent of organisations plan across-the-board raises for 2027, down from 36 percent for 2026, as more employers tie increases to performance." },
      { q: "Is it better to change jobs for a raise?", a: "Usually, because new offers are priced against the market rather than your current salary. The advantage is smaller in slow hiring markets, but switching employers still tends to bring larger increases than staying." },
    ],
  },
  {
    slug: "coding-bootcamps-closing-cs-enrollment-2026",
    title: "Coding Bootcamps Are Closing and CS Enrollment Is Falling. Why",
    description:
      "Computer science enrollment fell about 8% in 2025-26 and several bootcamps closed or shrank. What is behind the decline, and how people now learn to code.",
    date: "2026-11-08T04:38:00.000Z",
    author: "Bhargav",
    tags: ["Coding Bootcamps", "Computer Science", "Education", "Entry-Level Jobs", "AI"],
    readMinutes: 6,
    html: `
      <p>For a decade, learning to code was sold as the most reliable route into a well-paid career. Universities expanded computer science departments and coding bootcamps promised a new career in twelve weeks. In 2026, both routes are shrinking at the same time. Fewer students are choosing computer science degrees, and several well-known bootcamps have closed, paused or exited the market.</p>

      <h2>The university numbers</h2>
      <p>According to the National Student Clearinghouse Research Center, undergraduate computer science enrollment at four-year colleges fell about 8.1 percent in the 2025-26 academic year, the steepest decline of any major field. Fortune, reporting on spring 2026 data, gave a figure of 8.4 percent. The small difference reflects different periods and definitions, but the direction is clear.</p>
      <p>A survey by the Computing Research Association found that 62 percent of the 130 universities responding reported a decrease in computer science enrollment. The decline is uneven. Oregon State University reported losing about 1,000 computer science majors, while the University of Virginia reported no notable change. Elite programmes with strong employer links appear more resilient than others.</p>
      <p>At the same time, many universities are adding AI programmes. Northwestern, Purdue, Ohio State and Harvard are among those that have launched AI literacy initiatives or new AI-focused courses, often aimed at students in every field rather than only computer science majors.</p>

      <h2>The bootcamp numbers</h2>
      <p>Bootcamps have had a harder time. Education company 2U exited the bootcamp business after a reported 40 percent fall in enrollment. General Assembly, one of the best-known names in the sector, reportedly stopped new consumer enrollments on 28 April 2026, though we have found that claim in only one secondary source and it should be treated as unconfirmed. Nashville Software School, a non-profit bootcamp, has said publicly that it has seen three years of declining applications and declining junior hiring among its employer partners.</p>
      <p>Bootcamps are especially exposed because their model depends on graduates finding junior developer jobs quickly. When those jobs become scarce, placement rates fall, fewer people enrol and the economics stop working.</p>

      <h2>Why it is happening</h2>
      <p>Three causes come up again and again:</p>
      <ul>
        <li><strong>Fewer junior developer jobs.</strong> Tech companies cut hiring sharply after 2022, and the market for entry-level engineers has not recovered. Our article on <a href="/posts/is-ai-killing-entry-level-jobs-2026-evidence">the evidence on AI and entry-level jobs</a> looks at how much of that is AI and how much is the wider slowdown.</li>
        <li><strong>AI coding tools.</strong> Tools that write and review code reduce the amount of routine work junior engineers used to do. Students and career changers have noticed, and many now doubt that a coding career will pay off.</li>
        <li><strong>Layoff headlines.</strong> Large, visible tech layoffs have made software engineering look less secure than it did a few years ago, even though experienced engineers remain in demand.</li>
      </ul>

      <h2>Is learning to code still worth it?</h2>
      <p>For most people, yes, but the reason has changed. Coding is becoming a general skill that makes people in many jobs more effective, rather than a guaranteed ticket into a specific job. Analysts, marketers, operations staff and scientists who can write scripts, automate tasks and work with data have an advantage, especially as AI tools make simple coding faster to learn.</p>
      <p>For those aiming at software engineering itself, the bar has risen. Employers want to see that a candidate can build and ship real software, understand systems and use AI tools well, not just complete tutorials. Our article on <a href="/posts/ai-skills-required-tech-jobs-75-percent-2026">AI skills now required in tech jobs</a> covers what employers ask for.</p>

      <h2>How people are learning now</h2>
      <ul>
        <li><strong>Building in public.</strong> A portfolio of working projects, ideally used by real people, carries more weight than a certificate.</li>
        <li><strong>Adjacent entry points.</strong> Roles in support, QA, data analysis or technical operations often lead into engineering, and are easier to get first. Our guide to <a href="/posts/first-remote-job-2026-no-experience">getting a first remote job without experience</a> covers several.</li>
        <li><strong>Shorter, cheaper courses.</strong> Self-paced and employer-sponsored courses have largely replaced expensive bootcamps for people testing whether they like coding.</li>
        <li><strong>Learning with AI.</strong> AI assistants make it faster to learn by building, provided learners check and understand what the tools produce.</li>
      </ul>
      <p>Our guide on <a href="/posts/upskilling-for-remote-work">upskilling for remote work</a> covers cost-effective ways to build skills, and the <a href="/tools/remote-field-explorer">remote field explorer</a> shows which fields currently have the most remote openings.</p>

      <h2>What this means for the job market</h2>
      <p>A smaller pipeline of new computer science graduates will take years to show up in the job market, since today's first-year students graduate around 2030. If demand for engineers recovers by then, the shortfall could push up junior salaries again. That is speculation, but it is the pattern previous cycles followed: enrollment fell after the dot-com crash, and a shortage followed a few years later.</p>
      <p>For now, entry-level engineering remains highly competitive. If you are starting out, our guide to <a href="/posts/remote-software-engineering-jobs">remote software engineering jobs</a> explains what employers expect, and you can see current openings on <a href="/jobs">all remote jobs</a> or across borders on <a href="/remote-regional-jobs">remote regional jobs</a>.</p>
    `,
    faq: [
      { q: "Is computer science enrollment falling?", a: "Yes. The National Student Clearinghouse reported undergraduate computer science enrollment at four-year colleges fell about 8.1 percent in 2025-26, the steepest of any field. A Computing Research Association survey found 62 percent of 130 universities reported decreases." },
      { q: "Are coding bootcamps shutting down?", a: "Several have closed or shrunk. 2U exited the bootcamp business after a reported 40 percent enrollment drop, Nashville Software School reported three years of declining applications, and General Assembly reportedly stopped new consumer enrollments in April 2026, a claim found in only one secondary source." },
      { q: "Why are fewer people studying computer science?", a: "The main reasons are a weak market for junior developers since 2022, AI coding tools reducing routine junior work, and high-profile tech layoffs that make the field look less secure." },
      { q: "Is it still worth learning to code in 2026?", a: "For most people yes, as a general skill that helps in many jobs. For those targeting software engineering, the bar is higher: employers want evidence of real projects, systems understanding and effective use of AI tools." },
    ],
  },
  {
    slug: "holiday-seasonal-hiring-2026",
    title: "Holiday Hiring 2026: Lowest Retail Forecast Since 2008, Amazon Up 20%",
    description:
      "Challenger expects about 450,000 seasonal retail jobs, the fewest since 2008, while Amazon plans 300,000. Where the 2026 holiday jobs are, including remote.",
    date: "2026-11-08T04:39:00.000Z",
    author: "Bhargav",
    tags: ["Seasonal Jobs", "Holiday Hiring", "Retail", "Amazon", "Job Market"],
    readMinutes: 5,
    html: `
      <p>The holiday shopping season is the biggest temporary hiring event of the year in the US, and in 2026 the forecasts point in two directions at once. Traditional retailers expect to hire fewer seasonal workers than at any time since the 2008 financial crisis, while Amazon plans its largest seasonal hiring push in years. Here is what the forecasts say and where the jobs are, including the seasonal work that can be done remotely.</p>

      <h2>The forecasts</h2>
      <ul>
        <li><strong>Challenger, Gray &amp; Christmas</strong> expects about 450,000 seasonal retail jobs in the fourth quarter of 2026, down about 2.5 percent from last year and the lowest figure since 2008.</li>
        <li><strong>Amazon</strong> plans to hire more than 300,000 seasonal workers, about 20 percent more than last year, according to Bloomberg reporting on 20 October 2026.</li>
        <li><strong>UPS</strong> plans about 100,000 seasonal hires, down from about 125,000 last year.</li>
        <li><strong>Indeed</strong> data showed seasonal job postings up about 10 percent year on year as of 30 September 2026, suggesting employers were advertising earlier even if they planned fewer total hires.</li>
      </ul>
      <p>These figures measure different things. Challenger's forecast covers net retail employment changes, while company announcements state hiring targets, and Indeed counts postings rather than hires. They do not add up neatly, but together they describe a season that is shifting rather than simply shrinking.</p>

      <h2>Why traditional retail is hiring less</h2>
      <p>Retailers are relying more on the staff they already have, offering existing employees extra hours rather than recruiting temporary workers. They are also using more automation in warehouses and stores, from self-checkout to automated inventory systems, and drawing on gig workers through apps for short shifts. And with consumer spending forecasts cautious and the wider job market weak, many companies are simply planning conservatively. Our article on <a href="/posts/us-job-market-stalls-september-2026">the stalled US job market</a> covers the backdrop.</p>
      <p>Amazon's increase cuts the other way. Its online share of holiday spending keeps growing, and its fulfilment and delivery network needs people even as it adds robots. UPS's smaller target partly reflects its decision to handle less Amazon volume.</p>

      <h2>Seasonal work you can do remotely</h2>
      <p>Most seasonal jobs are in warehouses, stores and delivery, but a meaningful number are remote:</p>
      <ul>
        <li><strong>Customer service.</strong> Retailers, shipping companies and payment providers add remote support agents for the holiday surge, handling order questions, returns and delivery issues.</li>
        <li><strong>Tax season preparation.</strong> Tax software companies start hiring remote support and tax professionals in late autumn for the January to April season.</li>
        <li><strong>E-commerce operations.</strong> Online stores need temporary help with listings, order management, fraud review and marketing.</li>
        <li><strong>Fulfilment of digital services.</strong> Some companies hire temporary content moderators, data labellers and AI trainers to handle seasonal volume. Our article on <a href="/posts/ai-trainer-gig-economy-2026-pay">AI trainer gig work</a> covers that market.</li>
      </ul>
      <p>Seasonal remote roles are usually limited to applicants in specific countries, often the US, because of payroll and tax rules. Check the location line before applying, and use the <a href="/tools/remote-job-location-checker">remote job location checker</a> if the wording is unclear.</p>

      <h2>Watch for seasonal scams</h2>
      <p>The holiday season is peak time for job scams. Fake "package reshipping" jobs, which turn workers into unwitting handlers of stolen goods, and fake remote customer service roles that ask for payment for equipment or training, both spike in the autumn. Real employers do not ask you to pay to start work or to receive and forward packages to your home. Our guides on <a href="/posts/how-to-spot-fake-remote-job-postings">spotting fake remote job postings</a> and <a href="/posts/remote-job-scams-how-they-make-money">how remote job scams make money</a> explain the common schemes, and the <a href="/tools/fake-job-checker">fake job checker</a> scans a posting for red flags.</p>

      <h2>Can seasonal work turn permanent?</h2>
      <p>Sometimes. Large employers often keep a share of their best seasonal workers, especially in customer service and operations. If you take a seasonal role hoping to stay, ask at the start what share of seasonal hires were kept on last year, and treat the job as an extended interview: reliability and willingness to take difficult shifts are what managers remember.</p>
      <p>For permanent remote roles, the end of the year is a mixed time to search. Hiring slows over the holidays at many companies, but some teams rush to fill roles before budgets reset, and January brings a fresh wave of postings. Our <a href="/posts/30-minute-remote-job-search-routine">30-minute job search routine</a> helps keep a search moving through the slow weeks. You can browse current openings on <a href="/jobs">all remote jobs</a> or check roles open across borders on <a href="/remote-regional-jobs">remote regional jobs</a>.</p>
    `,
    faq: [
      { q: "How many seasonal retail jobs are expected in 2026?", a: "Challenger, Gray & Christmas forecasts about 450,000 seasonal retail jobs in the fourth quarter of 2026, down about 2.5 percent from last year and the lowest since 2008." },
      { q: "How many seasonal workers is Amazon hiring in 2026?", a: "Amazon plans to hire more than 300,000 seasonal workers, about 20 percent more than last year, according to Bloomberg reporting on 20 October 2026." },
      { q: "Is UPS hiring fewer seasonal workers?", a: "Yes. UPS plans about 100,000 seasonal hires in 2026, down from about 125,000 last year." },
      { q: "Are there remote seasonal jobs?", a: "Yes, mainly in customer service, tax season support, e-commerce operations and data work. Most are limited to applicants in specific countries, usually the US, so check the location requirements." },
      { q: "How do I avoid holiday job scams?", a: "Never pay to start a job, buy equipment through an employer's contact, or receive and reship packages from home. Verify the employer through its official careers page before sharing personal details." },
    ],
  },
];
