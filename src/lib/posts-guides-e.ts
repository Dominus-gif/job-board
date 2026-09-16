/**
 * Cluster E — Non-tech fields.
 *
 * Board figures are measured from the live dataset at the time of writing
 * (5,838 listings, 337 work-from-anywhere). Role families are matched on job
 * titles, which is approximate, and every pay figure states its sample size so
 * a median built on a handful of listings is never presented as a market rate.
 */
import type { Post } from "./posts";

const AUTHOR = "getremotejobsnow.com Editorial";

export const POSTS_CLUSTER_E: Post[] = [
  {
    slug: "remote-customer-support-careers",
    title: "Remote Customer Support Jobs in 2026: Pay, Career Paths and Openings",
    description:
      "What remote customer support jobs pay, how the career ladder works and where the openings are, using listing data from our own remote job board.",
    date: "2026-09-16T14:25:00.000Z",
    author: AUTHOR,
    tags: ["Customer Support Jobs", "Remote Careers", "Non-Tech Remote Jobs", "Salary Data"],
    readMinutes: 5,
    html: `
      <p>Customer support is often the first remote job people think of, and for good reason. The work happens in writing or over calls, it rarely needs an office, and almost every software company needs it. But the picture on job boards is more mixed than the "easy remote job" reputation suggests. Some support roles pay well and lead somewhere. Others are shift work with close monitoring and little room to grow.</p>
      <p>This guide uses what we see on our own board to show where support jobs are, what they pay, and how people move up.</p>

      <h2>How many support jobs are out there</h2>
      <p>At the time of writing, our board lists <strong>188</strong> roles in the customer support category, out of <strong>5,838</strong> in total. That's about 3%, a smaller share than sales, product or engineering. Only <strong>11</strong> of those support roles pass our work-from-anywhere filter. The rest are remote but tied to a country or region.</p>
      <p>That tie usually has a practical reason. Support teams are built around the hours and languages of the customers they serve, so a company hiring for "EMEA support" wants someone awake during European business hours and fluent in the right languages. When we checked, one open-source database company on our board was hiring separate weekend support engineers for Europe and for the Americas. For roles like that, the shift matters more than the address.</p>

      <h2>What remote support jobs pay</h2>
      <p>Pay data is thin, because only about 13% of support listings on our board publish a salary. Among the 25 that do in US dollars, the median midpoint is <strong>$107,000</strong>, with the middle half between <strong>$62,500</strong> and <strong>$132,000</strong>. The lowest published range starts under $25,000 and the highest reaches the $170,000s.</p>
      <p>Two things explain that spread. Most listings that publish pay are for US-based roles, where state transparency laws require a range, and US pay is high by international standards. And "support" covers very different jobs. A frontline agent answering billing questions and a support engineer debugging database clusters share a department name and not much else.</p>
      <blockquote>The fastest way to raise your pay in support is usually to become more technical, not more senior on the same queue.</blockquote>

      <h2>The career ladder</h2>
      <p>Most support organisations have some version of these levels:</p>
      <ol>
        <li><strong>Frontline or tier 1.</strong> Common questions, account issues, first replies. This is the work most exposed to automation and chatbots.</li>
        <li><strong>Tier 2 or technical support.</strong> Harder problems, reproducing bugs, reading logs and working with engineers.</li>
        <li><strong>Specialist roles.</strong> Enterprise support, escalations, or support for one product area.</li>
        <li><strong>Support operations.</strong> Tooling, workflows, reporting, quality assurance and the knowledge base.</li>
        <li><strong>Leadership.</strong> Team lead, support manager, head of support.</li>
      </ol>
      <p>People also move sideways, and those moves are often where pay jumps happen: into customer success, onboarding and implementation, solutions engineering, or product roles that value a deep knowledge of customer problems. On our board, customer success manager is the most common title in that neighbouring family, and the 18 customer success roles that publish US-dollar pay have a median of <strong>$133,500</strong>.</p>
      <p>We looked at why frontline work is under pressure in <a href="/posts/ai-is-killing-these-remote-jobs-what-to-do-instead">our piece on remote jobs AI is replacing</a>. In short, the routine part of tier 1 is shrinking, while the technical and relationship-heavy parts are holding up.</p>

      <h2>What hiring managers look for</h2>
      <ul>
        <li><strong>Clear writing.</strong> Remote support happens mostly in text. Your application is your first writing sample, so treat it like one.</li>
        <li><strong>Tool familiarity.</strong> Help desk platforms such as Zendesk come up often in listings, along with CRM systems such as Salesforce. Browse <a href="/remote-zendesk-jobs">roles that mention Zendesk</a> to see how employers describe the skill.</li>
        <li><strong>Technical curiosity.</strong> Basic SQL, reading API responses or logs, and a working knowledge of how websites fail set candidates apart, even for roles that aren't labelled technical.</li>
        <li><strong>Comfort with metrics.</strong> First response time, resolution time and satisfaction scores are how support work gets measured. Bring your numbers to the interview.</li>
        <li><strong>Calm under pressure.</strong> Angry customers and outages come with the job. Prepare an example of each and how you handled it.</li>
      </ul>

      <h2>Warning signs in support listings</h2>
      <p>Support is one of the categories where "remote" needs the closest reading.</p>
      <ul>
        <li><strong>Call centre roles limited to certain states or cities.</strong> Some are remote only in the sense that you take calls from home, with strict location rules for tax or licensing reasons.</li>
        <li><strong>Heavy monitoring.</strong> Screenshots, keystroke tracking or webcam rules are sometimes mentioned in passing. Ask about them before you accept.</li>
        <li><strong>Rotating or split shifts.</strong> Fine for some people and exhausting for others. Find out what "flexible hours" means in practice.</li>
        <li><strong>Pay per ticket or per minute.</strong> Work out what piece-rate pay means per hour before you agree to it.</li>
        <li><strong>Requests to buy equipment or pay for training.</strong> A legitimate employer won't ask. Our <a href="/posts/remote-job-scams-how-they-make-money">guide to remote job scams</a> explains why this one keeps working.</li>
      </ul>

      <h2>Where to look</h2>
      <p>Start with our <a href="/remote-customer-support-jobs">remote customer support jobs</a>, which you can narrow by region. If you'd rather work mostly in writing, the <a href="/remote-jobs-no-talking">written, low-call roles</a> page collects listings that say so. For shift planning, the <a href="/tools/world-time-buddy">world time planner</a> shows what a given shift means where you live, and our guide to <a href="/posts/working-across-timezones-without-burning-out">working across time zones</a> covers how to keep unusual hours sustainable.</p>
    `,
    faq: [
      {
        q: "How much do remote customer support jobs pay?",
        a: "On our board, support roles that publish pay in US dollars have a median midpoint of about 107,000 dollars, with the middle half between roughly 62,500 and 132,000. Most of those listings are US-based, and technical support roles pay considerably more than frontline ones.",
      },
      {
        q: "Can I get a remote support job without experience?",
        a: "Frontline roles are the usual entry point, but competition for them is strong. Clear writing, familiarity with help desk tools and some basic technical knowledge, such as SQL or reading logs, make an application stand out.",
      },
      {
        q: "What is the difference between customer support and customer success?",
        a: "Support resolves problems when customers ask for help. Customer success works proactively with accounts to help them get value and renew. Success roles often pay more and are a common next step for experienced support staff.",
      },
      {
        q: "Are remote support jobs open to people anywhere in the world?",
        a: "Some are, but most are tied to a region because support teams are organised around their customers' hours and languages. On our board, 11 of 188 support roles pass our work-from-anywhere filter.",
      },
    ],
  },

  {
    slug: "remote-finance-accounting-jobs",
    title: "Remote Finance and Accounting Jobs Without a Tech Background",
    description:
      "Which remote finance and accounting jobs hire across borders, why many stay tied to one country, and what they pay, based on our own job listings.",
    date: "2026-09-16T14:15:00.000Z",
    author: AUTHOR,
    tags: ["Remote Accounting Jobs", "Finance Careers", "Payroll", "Non-Tech Remote Jobs"],
    readMinutes: 5,
    html: `
      <p>Finance and accounting skills travel well. Every company needs its books closed, its people paid and its cash managed, and very little of that work requires an office. You don't need to write code to do it well, either. Yet remote finance roles are tied to a single country more often than most people expect, and the reasons are worth understanding before you apply.</p>

      <h2>What our board shows</h2>
      <p>We matched finance and accounting job titles across our listings: accountants, controllers, payroll, accounts payable and receivable, FP&amp;A, tax, treasury, audit and billing. At the time of writing that gives <strong>201</strong> roles. <strong>27</strong> of them, about 13%, pass our work-from-anywhere filter. That's more than double the rate for the board as a whole, which is under 6%.</p>
      <p>That surprised us at first. Looking closer, most of the location-free finance roles are in payroll, and most of those come from one employer: a global employment platform that runs payroll for customers in many countries. It makes sense once you see it. A company paying people in dozens of countries needs specialists who know each country's payroll rules, and it can hire them wherever they live.</p>

      <h2>Why most finance roles stay tied to a country</h2>
      <p>The other 87% are remote but restricted, usually to the country whose books the role looks after. Several things drive that:</p>
      <ul>
        <li><strong>Accounting standards.</strong> US companies report under US GAAP, and most others under IFRS or a local standard. Experience with the right framework matters.</li>
        <li><strong>Tax and payroll law.</strong> Filings, deadlines and employment taxes are national, and mistakes are expensive.</li>
        <li><strong>Licensing.</strong> In the US, CPA licences are issued by individual states. Elsewhere, qualifications such as ACCA, CIMA or ACA carry weight, and some sign-off responsibilities need a local qualification.</li>
        <li><strong>Controls and access.</strong> Finance staff often hold bank access and approval rights, and some companies limit where that access can be used from.</li>
        <li><strong>Legal presence.</strong> To employ you directly, a company usually needs an entity where you live, or it has to use an employer of record.</li>
      </ul>

      <h2>Roles, from entry points to senior</h2>
      <ul>
        <li><strong>Accounts payable and receivable.</strong> Common entry points, and also the work most affected by automation. Pair it with process or systems skills.</li>
        <li><strong>Payroll.</strong> Country expertise is valuable, and global payroll is one of the few finance areas that hires across borders in numbers.</li>
        <li><strong>Staff and senior accountant.</strong> Month-end close, reconciliations and reporting, the core of most finance teams.</li>
        <li><strong>Revenue accounting.</strong> Subscription businesses need people who understand revenue recognition rules, ASC 606 in the US and IFRS 15 elsewhere.</li>
        <li><strong>FP&amp;A.</strong> Budgeting, forecasting and modelling. Spreadsheet skill matters more here than anywhere else in finance.</li>
        <li><strong>Tax.</strong> International tax roles appear regularly, often at companies with staff in many countries.</li>
        <li><strong>Controller and finance manager.</strong> Senior roles that own the close and lead the team.</li>
      </ul>

      <h2>What they pay</h2>
      <p>About 20% of the finance roles we matched publish a salary. The 40 US-dollar ranges have a median midpoint of <strong>$124,925</strong>, with the middle half between <strong>$89,425</strong> and <strong>$180,000</strong>. The 13 location-free roles with US-dollar pay have a much lower median of <strong>$74,825</strong>.</p>
      <p>That gap has a simple explanation. The region-locked roles that publish pay are mostly American, where senior finance salaries are high and many states require a range in the posting. The location-free ones are mostly payroll roles with wide global pay bands. So the gap doesn't mean worldwide finance work pays less. It means the two samples contain different jobs. If you're comparing an offer in another currency, the <a href="/tools/remote-salary-converter">remote salary converter</a> handles the arithmetic, and our guide to <a href="/posts/salary-transparency-laws-2026">salary transparency laws</a> explains which listings have to show pay.</p>
      <blockquote>In remote finance, knowing a country's rules is often worth more than knowing the newest tool.</blockquote>

      <h2>Getting in without a tech background</h2>
      <p>Finance software changes often. The underlying knowledge changes slowly, which is good news if you're coming from a traditional finance job.</p>
      <ol>
        <li><strong>Name your frameworks and countries.</strong> "Month-end close under US GAAP" or "UK payroll including pension auto-enrolment" tells a hiring manager exactly where you fit.</li>
        <li><strong>List the systems you've used.</strong> Accounting and ERP systems such as NetSuite, SAP, Xero or QuickBooks are frequent requirements. Learning a second one is usually quick if you know the first well.</li>
        <li><strong>Show remote habits.</strong> Finance teams run on checklists, documentation and deadlines. Process notes you've written are good evidence.</li>
        <li><strong>Look at payroll and global employment companies.</strong> On our board, they're the most consistent employers of location-free finance staff.</li>
        <li><strong>Keep your qualification visible.</strong> A CPA, ACCA, CIMA or local equivalent belongs near the top of your CV.</li>
      </ol>
      <p>Our broader guide to <a href="/posts/best-remote-jobs-without-tech-background-2026">remote jobs without a tech background</a> covers other fields worth a look.</p>

      <h2>Where to look</h2>
      <p>Browse <a href="/remote-management-finance-jobs">remote finance and management jobs</a> for the full set, or go straight to the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> if you need a role without location limits. For region-specific searches, the <a href="/remote-jobs-in-europe">European</a> and <a href="/remote-jobs-in-uk">UK</a> boards are good starting points.</p>
    `,
    faq: [
      {
        q: "Can accountants work remotely from anywhere?",
        a: "Some can, but most remote accounting roles are tied to the country whose books, taxes or payroll they cover. On our board, about 13 percent of finance and accounting roles pass our work-from-anywhere filter, and most of those are in global payroll.",
      },
      {
        q: "Which finance jobs are most often open worldwide?",
        a: "On our board, payroll roles at companies that pay employees in many countries are the most common. Some international tax and planning roles are also location-free, while controller and staff accountant roles are usually tied to one country.",
      },
      {
        q: "Do I need a CPA to work in remote accounting?",
        a: "Not for every role, but a recognised qualification such as a CPA, ACCA, CIMA or local equivalent helps, and some senior or sign-off roles require one. In the US, CPA licences are issued by individual states.",
      },
      {
        q: "What do remote finance jobs pay?",
        a: "Finance and accounting roles on our board that publish US-dollar pay have a median midpoint of about 125,000 dollars. Location-free roles in our sample have a lower median, mainly because they are payroll roles with wide global pay bands.",
      },
    ],
  },

  {
    slug: "remote-sales-jobs-sdr-vs-field-sales",
    title: "Remote Sales Jobs: SaaS SDR Roles vs Field Sales in Disguise",
    description:
      "How to tell a truly remote sales job from field sales with travel, how base pay and OTE work, and which sales roles on our board hire across borders.",
    date: "2026-09-16T14:05:00.000Z",
    author: AUTHOR,
    tags: ["Remote Sales Jobs", "SDR", "Sales Compensation", "OTE"],
    readMinutes: 5,
    html: `
      <p>Sales has become one of the biggest remote job categories. On our board, account executive is the most common job title family of all, with <strong>447</strong> listings at the time of writing. Sales is also where the word "remote" gets stretched the furthest. A role can be advertised as remote and still expect you to cover a territory, visit customers every week and live near a particular city.</p>
      <p>This guide shows how to tell the two kinds of job apart, how sales pay works, and which sales roles are most likely to be open across borders.</p>

      <h2>Inside sales vs field sales</h2>
      <p>Most software sales today is <strong>inside sales</strong>: prospecting, demos and negotiation happen over video calls and email. That's the work that moved online and stayed there. <strong>Field sales</strong> means meeting customers in person, usually across a defined territory. It's common in hardware, healthcare, construction and large enterprise deals.</p>
      <p>Field roles can be great jobs. They just aren't remote in the way most people mean it, and the trouble starts when one is labelled "remote" simply because the person doesn't report to an office.</p>

      <h2>Signs a "remote" sales job is field sales in disguise</h2>
      <ul>
        <li>A named <strong>territory</strong> or metro area, such as "Greater Chicago" or "Pacific Northwest".</li>
        <li>A <strong>travel percentage</strong>, such as "up to 50% travel".</li>
        <li>A requirement to <strong>live within</strong> a set distance of a city or major airport.</li>
        <li>A <strong>car allowance</strong>, mileage rate or company vehicle.</li>
        <li>Duties such as <strong>on-site demos</strong>, trade shows or "in-person customer meetings".</li>
        <li>Titles such as territory sales manager, outside sales or regional sales manager.</li>
      </ul>
      <p>Our title matching found only <strong>24</strong> listings with an explicit field or territory title, which tells you most field roles don't announce themselves up front. The detail usually sits in the description, so read it to the end. Our <a href="/posts/how-to-spot-hybrid-bait-in-remote-job-descriptions">guide to hybrid bait</a> covers the same habit for office requirements.</p>

      <h2>Which sales roles hire across borders</h2>
      <p>Sales jobs are usually tied to the market they sell into, and our data shows it.</p>
      <ul>
        <li><strong>Account executives:</strong> 447 listings, and only <strong>10</strong> of them, about 2%, pass our work-from-anywhere filter.</li>
        <li><strong>Sales and business development representatives (SDRs and BDRs):</strong> 120 listings, with <strong>13</strong> location-free, about 11%.</li>
        <li><strong>Sales and solutions engineers:</strong> 182 listings, with <strong>21</strong> location-free, about 12%.</li>
        <li><strong>Account managers:</strong> 85 listings, with <strong>5</strong> location-free.</li>
      </ul>
      <p>Read the titles of the location-free SDR roles and a pattern appears. Many are hired for a market, such as "DACH", "France" or "Australia and New Zealand". The employer doesn't mind where you live, but your languages and working hours need to match the customers. A location-free sales job is rarely a job without fixed hours.</p>
      <blockquote>In sales, the territory follows you even when the office doesn't.</blockquote>

      <h2>How sales pay works</h2>
      <p>Sales pay has its own vocabulary, and it helps to know it well before you negotiate.</p>
      <ul>
        <li><strong>Base salary</strong> is the fixed part, paid whatever your results.</li>
        <li><strong>Variable pay</strong> is the commission or bonus you earn by hitting targets.</li>
        <li><strong>OTE</strong>, or on-target earnings, is base plus variable pay if you reach 100% of your quota.</li>
        <li><strong>The split</strong> is the ratio of base to variable. Around 50/50 is common for account executives, while SDRs and account managers often get a larger fixed share, such as 60/40 or 70/30.</li>
        <li><strong>Quota</strong> is the target your variable pay depends on.</li>
        <li><strong>Ramp</strong> is the lower quota, or guaranteed commission, you get in your first months.</li>
        <li><strong>Accelerators</strong> raise your commission rate once you pass quota, and <strong>caps</strong> limit it.</li>
        <li><strong>Clawbacks</strong> take commission back if a customer cancels or doesn't pay within an agreed period.</li>
      </ul>
      <p>The most useful question in any sales interview is how much of the team hit quota last year. An OTE only means something if people reach it.</p>

      <h2>What the published numbers show</h2>
      <p>Published sales pay needs careful reading, because many postings show OTE rather than base without saying so clearly. With that caveat, the account executive roles on our board with US-dollar ranges have a median midpoint of <strong>$210,000</strong> across 71 listings. Sales and solutions engineers sit close behind at <strong>$204,500</strong> across 35. Only nine SDR listings publish pay, with a median of <strong>$95,000</strong>, which is too small a sample to lean on.</p>
      <p>Most of those figures come from US listings, where pay transparency laws apply. We compared remote account executive pay with engineering in <a href="/posts/account-executives-beat-software-engineers-remote">why sales overtook engineering as a remote category</a>. If an offer is quoted monthly or hourly, our guide to <a href="/posts/hourly-vs-annual-remote-pay-converting-offers">comparing pay offers</a> shows how to convert it.</p>

      <h2>Questions to ask before you accept</h2>
      <ol>
        <li>Is the published range base salary or OTE?</li>
        <li>What's the split, and which quota does the variable part depend on?</li>
        <li>How much of the team hit quota last year?</li>
        <li>Is commission paid when a deal is signed, or when the customer pays?</li>
        <li>What currency is commission paid in, and how often?</li>
        <li>How much travel is expected, and who pays for it?</li>
        <li>Which time zones will your customers be in?</li>
      </ol>
      <p>For that last question, the <a href="/tools/timezone-overlap">timezone overlap finder</a> shows how a territory's business hours line up with your own day.</p>

      <h2>Where to look</h2>
      <p>Our <a href="/remote-sales-marketing-jobs">remote sales and marketing jobs</a> page covers the whole category. If you already know the main CRM tools, <a href="/remote-salesforce-jobs">roles that mention Salesforce</a> and <a href="/remote-hubspot-jobs">roles that mention HubSpot</a> are useful shortcuts. Salesforce is the skill we see most often across sales and marketing listings.</p>
    `,
    faq: [
      {
        q: "What does OTE mean in a sales job?",
        a: "OTE stands for on-target earnings: your base salary plus the variable pay you would earn by reaching 100 percent of your quota. It is only a realistic figure if a good share of the team actually hits quota.",
      },
      {
        q: "Can sales development representatives work from anywhere?",
        a: "Some can. On our board, about 11 percent of SDR and BDR roles pass our work-from-anywhere filter, but many are hired to cover a specific market, so your languages and working hours still need to match the customers.",
      },
      {
        q: "How can I tell if a remote sales job involves travel?",
        a: "Look for a named territory, a travel percentage, a requirement to live near a city or airport, a car allowance, or duties such as on-site demos and in-person meetings. These usually appear in the description rather than the title.",
      },
      {
        q: "Is a 50/50 split between base and commission good?",
        a: "It is a common split for account executives, but whether it is good depends on the quota and how many people reach it. Ask what share of the team hit quota last year before judging the offer.",
      },
    ],
  },

  {
    slug: "remote-operations-hr-admin-jobs",
    title: "Remote HR, Operations and Admin Jobs: Who Hires and What They Pay",
    description:
      "Remote roles in HR, recruiting, operations, admin and IT support: how many our board lists, how often they're open worldwide, and what they pay.",
    date: "2026-09-16T13:55:00.000Z",
    author: AUTHOR,
    tags: ["Remote HR Jobs", "Operations Jobs", "Executive Assistant", "Non-Tech Remote Jobs"],
    readMinutes: 5,
    html: `
      <p>Most talk about remote work focuses on engineers, designers and salespeople. The people who hire them, pay them, organise their work and keep their laptops running get far less attention. Their roles are fewer, but they're real, they're remote more often than you might expect, and they suit people whose strengths are organisation and judgement rather than code.</p>

      <h2>How many roles we see</h2>
      <p>We matched job titles across our <strong>5,838</strong> listings. Here's what that shows at the time of writing:</p>
      <table>
        <thead><tr><th>Area</th><th>Listings</th><th>Work from anywhere</th><th>Median published pay (USD)</th></tr></thead>
        <tbody>
          <tr><td>Operations, programmes and chief of staff</td><td>291</td><td>18</td><td>$154,700 (59 listings)</td></tr>
          <tr><td>HR, people and recruiting</td><td>115</td><td>8</td><td>$150,000 (33 listings)</td></tr>
          <tr><td>Admin and executive assistants</td><td>74</td><td>2</td><td>$60,000 (15 listings)</td></tr>
          <tr><td>IT support and workplace technology</td><td>17</td><td>0</td><td>Too few to say</td></tr>
        </tbody>
      </table>
      <p>Title matching is imperfect, so treat these counts as approximate. The pattern is still clear. Operations and HR are well represented, admin roles are fewer and pay less, and IT support is almost never location-free.</p>

      <h2>Operations: the widest door</h2>
      <p>Operations covers a lot of ground: business operations, revenue operations, programme and project management, and the chief of staff role, which is the most common operations title on our board. What these jobs share is coordination. You make sure work moves between teams, decisions get written down and deadlines hold.</p>
      <p>That makes operations one of the best fits for remote work. A distributed company runs on written process, and operations people are usually the ones who write it. If you've run projects, rotas or teams in another field, you already have much of the evidence a hiring manager wants.</p>

      <h2>HR and recruiting: country rules shape the work</h2>
      <p>Recruiters are the most common HR title we see, especially technical and go-to-market recruiters. Recruiting travels well, since sourcing and interviewing happen online anyway.</p>
      <p>The rest of HR is more tied to place, because employment law is national. Contracts, leave, dismissals and employee relations all follow local rules. That's why the location-free HR roles on our board cluster at one global employment platform, which hires HR specialists to cover regions such as Europe or Asia-Pacific, wherever those specialists live. If you know one country's employment rules well, that knowledge is portable.</p>
      <p>Qualifications help. SHRM certifications are widely recognised in the US, and CIPD membership plays a similar role in the UK. Experience with HR systems such as Workday, BambooHR or HiBob comes up often too.</p>
      <blockquote>Operations and HR reward the habits remote companies depend on most: writing things down, following through and keeping people informed.</blockquote>

      <h2>Admin and executive assistants: fewer roles, more competition</h2>
      <p>Executive assistant is the most common admin title on our board, and most of the admin roles we see are tied to the United States. Published pay is lower than in the other areas, with a median of <strong>$60,000</strong> across 15 listings, although experienced assistants to senior leaders can earn a good deal more.</p>
      <p>Remote assistants spend a lot of time scheduling across time zones, so being quick and accurate at it is a real skill. A tool like our <a href="/tools/world-time-buddy">world time planner</a> is the kind of thing you'd use every day.</p>
      <p>One caution: scammers love titles such as "virtual assistant" and "administrative assistant, no experience needed". Run any offer past our <a href="/posts/how-to-spot-fake-remote-job-postings">red-flag checklist</a> before you share personal details, and never pay to start a job.</p>

      <h2>IT support: mostly tied to a place</h2>
      <p>None of the 17 IT support roles we matched passes our work-from-anywhere filter. That's not surprising. Someone has to ship laptops, set up offices and sometimes fix hardware in person, so even remote IT roles usually come with a region. If a location-free IT role does come along, it's most likely to be one where the work is entirely in software, such as identity or systems administration at a fully distributed company.</p>

      <h2>How to position yourself</h2>
      <ol>
        <li><strong>Lead with process.</strong> Describe systems you set up or improved, not just the tasks you did.</li>
        <li><strong>Show written work.</strong> A short, anonymised process document or project plan is strong evidence.</li>
        <li><strong>Be specific about countries.</strong> For HR and payroll, say whose employment rules you know.</li>
        <li><strong>Name your tools.</strong> Project management, HR and scheduling tools are part of the job in these fields.</li>
        <li><strong>Check the hours.</strong> Assistants and coordinators usually need close overlap with the people they support.</li>
      </ol>

      <h2>Where to look</h2>
      <p>Most of these roles sit in our <a href="/remote-management-finance-jobs">operations, management and finance jobs</a>. If you want reduced hours, check <a href="/remote-part-time-jobs">part-time remote jobs</a>, and for location-free roles in any field, the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a>.</p>
    `,
    faq: [
      {
        q: "Are remote HR jobs open to people in any country?",
        a: "Recruiting roles travel well, but most HR roles are tied to a country because employment law is national. On our board, the location-free HR roles mostly come from one global employment platform that hires specialists to cover particular regions.",
      },
      {
        q: "What does a remote executive assistant earn?",
        a: "Among the admin and executive assistant roles on our board that publish US-dollar pay, the median midpoint is about 60,000 dollars across 15 listings. Assistants who support senior leaders can earn considerably more.",
      },
      {
        q: "Is IT support ever fully remote?",
        a: "Rarely. None of the 17 IT support roles we matched passes our work-from-anywhere filter, because someone usually needs to handle hardware or offices. Software-only work such as identity or systems administration is the likeliest exception.",
      },
      {
        q: "What does a chief of staff do in a remote company?",
        a: "A chief of staff works closely with a senior leader to coordinate priorities, run planning and follow up on decisions. It is the most common operations title on our board and depends heavily on written communication.",
      },
    ],
  },
];
