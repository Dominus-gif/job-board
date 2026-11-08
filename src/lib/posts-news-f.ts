/**
 * News cluster F: tools, data and markets, autumn 2026. Written 8 November
 * 2026. Sources named in each article; vendor claims, projections and
 * secondary reports are labelled as such.
 */
import type { Post } from "./posts";

export const POSTS_NEWS_F: Post[] = [
  {
    slug: "github-octoverse-2026-ai-agents-pull-requests",
    title: "AI Agents Now Start 40% of GitHub Pull Requests. What It Means",
    description:
      "GitHub's Octoverse 2026 found agents started over 40% of pull requests in September, up from 17% in March. What changes for developers and hiring.",
    date: "2026-11-08T04:45:00.000Z",
    author: "Bhargav",
    tags: ["GitHub", "AI Coding", "Software Engineering", "Developer Jobs", "AI Agents"],
    readMinutes: 6,
    html: `
      <p>Every year, GitHub publishes Octoverse, a report on how the world's developers use its platform. The 2026 edition, released on 28 October and covering October 2025 to September 2026, contains one number that captures how quickly software work is changing: in September 2026, <strong>more than 40 percent of pull requests on GitHub were started by an AI agent</strong>, up from 17 percent in March. That was about 110 million agent-started pull requests in a single month.</p>
      <p>A pull request is a proposed change to a codebase, submitted for review before it is merged. For years, almost all of them were written by people. Now a large and growing share begin with an agent that reads the code, makes changes and opens the request for a human to review.</p>

      <h2>The scale of activity</h2>
      <p>The report shows activity on GitHub growing far faster than the number of developers:</p>
      <ul>
        <li><strong>17.9 billion pushes</strong> over the year, more than 2024 and 2025 combined.</li>
        <li><strong>34.3 billion commits</strong>, more than triple the 2024 level.</li>
        <li><strong>1.3 billion merged pull requests</strong>, about 3.5 million a day.</li>
        <li><strong>45.4 billion GitHub Actions jobs</strong>, the automated builds and tests that run on each change.</li>
      </ul>
      <p>GitHub now counts more than 225 million developers. The US (38.3 million) and India (32.0 million) are the largest communities and each added more than 10 million developers during the year. Brazil added 3.28 million, the third most. TypeScript remained the most used language by contributors, ahead of Python and JavaScript, and Rust usage doubled.</p>

      <h2>How developers use agents</h2>
      <p>GitHub reported that 55 percent of monthly active Copilot users now use its agentic features, up from 35 percent a year earlier. Developers are also mixing models: in September, 61 percent of users who chose their own model used more than one. Agent-started pull requests touched multiple files more often than others, and 90 percent of those opened in September were merged within two weeks, slightly above the comparison group.</p>
      <p>New repositories that included a configuration file for AI agents recorded eight times as many commits as those without one. That does not prove agents cause more activity, since teams that adopt agents may already be more active, but it shows where the energy is.</p>

      <h2>What changes for developers</h2>
      <p>The shift is from writing code to directing and reviewing it. When an agent can draft a change across many files, the valuable work becomes deciding what should change, describing it precisely, checking that the result is correct and safe, and maintaining tests good enough to catch mistakes. Research firm Gartner made the same point in its <a href="/posts/gartner-tech-trends-2027-careers">2027 technology trends</a>, naming a governed "AI coding agent harness" as a priority because unchecked agents erode the productivity they promise.</p>
      <p>Review becomes a bottleneck. If agents produce changes faster than people can read them, teams either slow down or approve changes they do not fully understand. Engineers who review well, spotting subtle bugs, security issues and design problems, become more valuable, not less. So do the people who build continuous integration, testing and security tooling.</p>

      <h2>What it means for hiring</h2>
      <ul>
        <li><strong>Junior roles are changing most.</strong> Routine tasks that once trained new engineers are now often done by agents. Our article on <a href="/posts/is-ai-killing-entry-level-jobs-2026-evidence">AI and entry-level jobs</a> looks at the evidence.</li>
        <li><strong>Interviews are shifting.</strong> More employers test code review, debugging and system design rather than writing algorithms from scratch.</li>
        <li><strong>Platform and DevOps work is growing.</strong> More automated changes mean more builds, tests and deployments to manage. Our guide to <a href="/posts/remote-devops-sre-jobs">remote DevOps and SRE jobs</a> covers that field.</li>
        <li><strong>Global talent is growing fastest.</strong> India and Brazil's growth means more competition for remote roles, and more companies willing to hire across borders.</li>
      </ul>
      <p>The Stack Overflow survey found that developers use AI heavily but trust it cautiously, a gap our article on <a href="/posts/stack-overflow-developer-survey-2026-ai-trust">the 2026 developer survey</a> explores. Octoverse shows the usage side of that story at enormous scale.</p>

      <h2>How to stay valuable</h2>
      <ul>
        <li><strong>Get good at specifying work.</strong> Clear issues and precise instructions produce better agent output.</li>
        <li><strong>Invest in testing.</strong> Teams that trust agents have strong automated tests.</li>
        <li><strong>Practise reviewing.</strong> Read others' code, including AI-generated code, critically.</li>
        <li><strong>Show it on your CV.</strong> Describe how you used agents to deliver outcomes, and how you kept quality high. Our <a href="/posts/remote-job-resume-tips">remote resume tips</a> cover how to frame results.</li>
      </ul>
      <p>Software engineering remains one of the most common remote job categories. You can browse current roles on <a href="/jobs">all remote jobs</a>, the rare fully global ones on <a href="/jobs?scope=worldwide">worldwide remote jobs</a>, or read our guide to <a href="/posts/remote-software-engineering-jobs">remote software engineering jobs</a>.</p>
    `,
    faq: [
      { q: "What share of GitHub pull requests are made by AI?", a: "GitHub's Octoverse 2026 report found that more than 40 percent of pull requests in September 2026 were started by an AI agent, up from 17 percent in March, about 110 million in that month." },
      { q: "How many developers are on GitHub?", a: "More than 225 million as of September 2026. The US has 38.3 million and India 32.0 million, and each added more than 10 million developers during the year." },
      { q: "What is the most popular programming language on GitHub?", a: "TypeScript ranked first by contributors in Octoverse 2026, ahead of Python and JavaScript. Rust usage doubled." },
      { q: "Will AI agents replace software developers?", a: "They are changing the work more than removing it. Developers increasingly specify, review and test changes that agents draft, which makes review, testing and system design skills more valuable." },
    ],
  },
  {
    slug: "jolts-september-2026-quits-job-openings",
    title: "Job Openings Rose and Quits Hit an 18-Month High in September",
    description:
      "US job openings rose to 7.5 million and quits reached their highest since March 2025, per the September JOLTS report. What it says about the job market.",
    date: "2026-11-08T04:45:30.000Z",
    author: "Bhargav",
    tags: ["JOLTS", "Job Market", "Quits", "Job Openings", "US Economy"],
    readMinutes: 5,
    html: `
      <p>The monthly payroll numbers have painted a gloomy picture of the US job market this year. The Job Openings and Labor Turnover Survey (JOLTS), released by the Bureau of Labor Statistics on 3 November 2026 for September, offered a more mixed and somewhat more encouraging view. Job openings rose, layoffs fell, and the number of people quitting their jobs reached its highest level in about a year and a half.</p>

      <h2>The numbers</h2>
      <ul>
        <li><strong>Job openings</strong> rose by about 333,000 to roughly 7.5 million, according to Reuters' reading of the BLS data. The openings rate rose to 4.5 percent from 4.3 percent in August. August's figure was revised up to about 7.2 million.</li>
        <li><strong>Quits</strong> rose to about 3.37 million from 3.04 million, lifting the quits rate to 2.1 percent from 1.9 percent. Reuters reported this as the highest level of resignations since March 2025.</li>
        <li><strong>Layoffs and discharges</strong> fell to about 1.64 million, a rate of 1.0 percent, which is low by historical standards.</li>
        <li><strong>Openings per unemployed person</strong> were about 1.06, meaning slightly more vacancies than jobseekers.</li>
      </ul>

      <h2>Why quits matter</h2>
      <p>The quits rate is one of the most useful indicators of how workers feel about the job market. People generally quit when they are confident they can find something better, so rising quits usually signal that workers see more opportunity. Through much of 2025 and 2026, quits were low, a pattern sometimes called "job hugging", in which workers stay put because they doubt they could find a new job easily.</p>
      <p>A jump from 1.9 to 2.1 percent is modest, and the BLS itself described the quits rate as little changed. One month does not make a trend. But it is the clearest sign in some time that workers are becoming more willing to move.</p>

      <h2>How this fits with weak payrolls</h2>
      <p>The JOLTS data seems to contradict the weak payroll growth reported for the same period, which our article on <a href="/posts/us-job-market-stalls-september-2026">the stalled US job market</a> covers. The two can both be true. Openings measure advertised vacancies, not hires, and companies sometimes post roles they are slow to fill. Our guide on <a href="/posts/ghost-jobs-how-to-tell-a-role-is-still-open">ghost jobs</a> explains why not every listing leads to a hire.</p>
      <p>The broader picture is a market that is slow but not collapsing: low layoffs, modest hiring, and roughly one opening per unemployed person. It is harder to find a job than in 2022, when there were about two openings per jobseeker, but much easier than in a recession.</p>

      <h2>What it means for job seekers</h2>
      <ul>
        <li><strong>Openings are there, but competition is real.</strong> With roughly one opening per unemployed person, a targeted search beats mass applications.</li>
        <li><strong>Rising quits create openings.</strong> When people leave jobs, their old roles open up. If quits keep rising, expect more backfill postings.</li>
        <li><strong>Low layoffs mean stability for the employed.</strong> If you have a job, the risk of losing it is relatively low by historical standards, which gives you room to search carefully rather than urgently.</li>
        <li><strong>Leverage may be improving.</strong> More quits often precede faster wage growth, as employers compete to keep staff. Our article on <a href="/posts/salary-increase-budgets-2027">2027 raise budgets</a> covers what employers plan to pay.</li>
      </ul>

      <h2>For remote job seekers</h2>
      <p>JOLTS does not separate remote and on-site openings, so it cannot tell us whether remote opportunities are growing. Our article on <a href="/posts/remote-job-postings-share-2026-data">the share of remote job postings</a> covers what data exists. Remote roles continue to attract many more applicants per opening than on-site ones, so the same principle applies more strongly: apply precisely to roles that match your skills and location, and move quickly on fresh postings. Our guide on <a href="/posts/the-date-posted-problem-why-freshness-matters">why freshness matters</a> explains why applying early improves your odds.</p>

      <h2>What to watch next</h2>
      <p>The economy faces conflicting pressures. Inflation is rising because of energy prices, and the Federal Reserve raised rates in September, which our article on <a href="/posts/fed-rate-hike-2026-inflation-tech-hiring">the Fed's rate hike</a> covers. Higher rates tend to slow hiring over time. Whether September's improvement in openings and quits continues, or fades as rates bite, will be clearer over the next few JOLTS reports.</p>
      <p>In the meantime, you can browse current openings on <a href="/jobs">all remote jobs</a>, filtered by role and region, or look at <a href="/remote-regional-jobs">remote regional jobs</a> if you are outside the US. Our <a href="/tools/application-tracker">application tracker</a> helps keep a steady search organised.</p>
    `,
    faq: [
      { q: "How many job openings were there in September 2026?", a: "About 7.5 million, up roughly 333,000 from August, according to the BLS JOLTS report released on 3 November 2026. The openings rate rose to 4.5 percent." },
      { q: "What is the quits rate?", a: "The share of workers who voluntarily leave their jobs in a month. It rose to 2.1 percent in September 2026 from 1.9 percent, with about 3.37 million quits, the highest since March 2025 according to Reuters." },
      { q: "Why do quits matter for job seekers?", a: "Rising quits usually mean workers feel confident about finding new jobs. They also create openings as employers replace people who leave, and they often come before faster wage growth." },
      { q: "How many job openings are there per unemployed person?", a: "About 1.06 in September 2026, meaning slightly more vacancies than jobseekers. In 2022 the figure was around two." },
    ],
  },
  {
    slug: "linkedin-hiring-assistant-ai-recruiters-2026",
    title: "AI Recruiters Are Now Searching for You. How to Get Found",
    description:
      "LinkedIn's Hiring Assistant and similar AI agents now source candidates for recruiters. How they search, what they miss, and how to get found.",
    date: "2026-11-08T04:46:00.000Z",
    author: "Bhargav",
    tags: ["LinkedIn", "AI Recruiting", "Job Search", "Recruiters", "Personal Branding"],
    readMinutes: 6,
    html: `
      <p>Recruiters have always searched for candidates, typing keywords into LinkedIn and scrolling through profiles. Increasingly, an AI agent does that search for them. LinkedIn's Hiring Assistant, first announced in October 2024 and expanded through 2025 and 2026, lets a recruiter describe a role in plain language and have the agent find, rank and contact candidates. Indeed offers a similar tool for employers called Talent Scout. For job seekers, this changes what it means to be visible.</p>

      <h2>How the tools work</h2>
      <p>According to Business Today's reporting in September 2026, a recruiter using Hiring Assistant can type a requirement conversationally or paste in a job description. The agent refines the requirement, identifies the qualifications that matter and starts sourcing candidates. The recruiter marks which suggestions they like or dislike, and the system learns their preferences. LinkedIn is building integrations with hundreds of applicant tracking systems, including Greenhouse and Workday, so the agent can draw on applicant and CV data as well as LinkedIn profiles.</p>
      <p>LinkedIn says customers using the tool see an 80 percent reduction in the number of profiles recruiters review before contacting someone, and a 66 percent increase in InMail acceptance rates. Those are company claims, but they indicate how much of the early screening is moving from people to software. Tata Consultancy Services, which took part in the pilot, said the tool can take over routine recruiter work, while noting it was only partway through adoption.</p>

      <h2>What this means for candidates</h2>
      <p>The most important point is simple: an AI recruiter can only evaluate what it can see. Business Today noted that candidates with little digital footprint may fall outside the agent's view entirely, and that someone changing careers may struggle because their profile reflects where they have been rather than where they are going.</p>
      <p>Older keyword search rewarded exact phrases. AI sourcing is better at understanding meaning, recognising that "customer success" and "account management" overlap, for example. But it still depends on clear, specific information. A vague profile gives the agent little to work with.</p>

      <h2>How to make your profile findable</h2>
      <ul>
        <li><strong>Write a specific headline.</strong> "Senior backend engineer, Go and Kubernetes, payments" tells an agent far more than "Passionate technologist".</li>
        <li><strong>Describe outcomes in your experience.</strong> Agents and recruiters both look for evidence. "Cut checkout errors by 40 percent" is more useful than a list of duties.</li>
        <li><strong>Name your skills and tools explicitly.</strong> Include the technologies, methods and domains you work in, using standard terms.</li>
        <li><strong>State your location and work preferences.</strong> For remote roles, say where you can legally work and which time zones suit you. Many remote roles are limited to specific countries, and our guide to <a href="/posts/remote-job-region-labels-explained">region labels</a> explains why.</li>
        <li><strong>Point to where you are heading.</strong> If you are changing careers, make the target role visible in your headline and summary, and include relevant projects, courses or volunteer work.</li>
        <li><strong>Keep it current.</strong> Agents favour recent, active profiles.</li>
      </ul>
      <p>The same principles apply to your CV, since tools like Hiring Assistant increasingly read applicant tracking data. Our <a href="/tools/ats-keyword-checker">ATS keyword checker</a> compares your CV with a job description, and our guide on <a href="/posts/what-recruiters-see-when-you-apply-remotely">what recruiters see when you apply</a> explains how applications are screened.</p>

      <h2>Responding to AI-drafted outreach</h2>
      <p>Many recruiter messages are now drafted with AI help. That does not make them less real, but it does mean some will be generic. Reply to the ones that match your goals with a short, specific message that confirms your interest, your location and your availability. If a message is vague about the company or role, ask for details before sharing personal information. Fake recruiters also use AI, and our guide on <a href="/posts/remote-job-scams-how-they-make-money">how remote job scams work</a> covers the warning signs.</p>

      <h2>Don't rely only on being found</h2>
      <p>Being discoverable helps, but most hires still come from applications and referrals. AI sourcing tools mostly serve companies with paid recruiter licences, typically larger employers. Many smaller and remote-first companies hire primarily through their own career pages. Our guide on <a href="/posts/apply-directly-on-company-career-pages">applying directly on company career pages</a> explains why that route often works better.</p>
      <p>Our job board lists roles from employers' own applicant tracking systems, so you can apply directly. Browse <a href="/jobs">all remote jobs</a> or the narrower set on <a href="/remote-regional-jobs">remote regional jobs</a>, and use our <a href="/posts/30-minute-remote-job-search-routine">30-minute search routine</a> to combine applying with keeping your profile visible.</p>
      <p>Hiring is becoming AI on both sides: candidates use AI to search and apply, and employers use AI to source and screen. Our companion article on <a href="/posts/indeed-career-scout-ai-job-search-agents-2026">AI job search agents for candidates</a> covers the other half.</p>
    `,
    faq: [
      { q: "What is LinkedIn Hiring Assistant?", a: "An AI agent for recruiters that takes a role described in plain language or a job description, identifies key qualifications, sources candidates and learns from the recruiter's feedback. LinkedIn is integrating it with applicant tracking systems such as Greenhouse and Workday." },
      { q: "Does AI decide who recruiters contact?", a: "Increasingly it shapes the shortlist. LinkedIn says customers using Hiring Assistant review about 80 percent fewer profiles before contacting someone, although recruiters still make the final choice." },
      { q: "How do I make my LinkedIn profile visible to AI recruiters?", a: "Use a specific headline, describe measurable outcomes, name your skills and tools in standard terms, state your location and work preferences, and keep the profile current. If you are changing careers, make the target role visible." },
      { q: "Are AI recruiter messages real?", a: "Many are, but scammers also use AI. Verify the company and role before sharing personal information, and never pay to apply or start a job." },
    ],
  },
  {
    slug: "indeed-career-scout-ai-job-search-agents-2026",
    title: "Should You Let AI Run Your Job Search? What the New Agents Do",
    description:
      "Indeed's Career Scout and other AI job search agents suggest careers, find roles and help you apply. What they do well, and where they fall short.",
    date: "2026-11-08T04:46:30.000Z",
    author: "Bhargav",
    tags: ["Indeed", "AI Job Search", "Career Change", "Job Applications", "AI Tools"],
    readMinutes: 6,
    html: `
      <p>Job searching has always involved a lot of repetitive work: scanning listings, tailoring CVs, filling out forms. AI is now offering to do much of it. Indeed's Career Scout, introduced in September 2025 and rolled out further in 2026, acts as an AI career coach that suggests career paths, finds relevant jobs and helps with applications. Other platforms and startups offer agents that promise to apply to jobs on your behalf. Should you use them?</p>

      <h2>What Indeed's Career Scout does</h2>
      <p>According to Workplace Journal's coverage of the July 2026 launch for career changers, Career Scout offers:</p>
      <ul>
        <li>Personalised career paths based on your skills and interests, with explanations of why each might suit you.</li>
        <li>Estimates of what you could earn in recommended careers.</li>
        <li>A chat interface for finding jobs that match your goals.</li>
        <li>Company research, application tracking, and interview and negotiation advice.</li>
      </ul>
      <p>Indeed's product page also says it can auto-fill applications. The company reports that in initial US testing, users found and applied to relevant jobs seven times faster and were 38 percent more likely to be hired. Those are Indeed's own figures, and the comparison group matters, so treat them as indicative rather than proven.</p>

      <h2>Why people want help</h2>
      <p>Indeed's own survey, cited in the same coverage, found that six in ten workers could see themselves changing career field but most did not know where to start. More than half said they had transferable skills but did not know where those skills would be most useful. About a quarter had already used AI in their job search; of those, nearly half felt more confident submitting applications, though some worried their applications sounded generic or that employers could detect AI use.</p>
      <p>That last concern is well founded. As AI makes applying easier, employers receive more applications, and generic ones are easy to spot.</p>

      <h2>Where AI job search helps</h2>
      <ul>
        <li><strong>Exploring options.</strong> AI is good at suggesting adjacent roles you might not have considered, based on your skills. Our <a href="/tools/job-title-finder">job title finder</a> and <a href="/tools/remote-field-explorer">remote field explorer</a> do something similar for remote roles.</li>
        <li><strong>Tailoring drafts.</strong> AI can produce a first draft of a CV summary or cover letter matched to a specific job, which you then edit. Our <a href="/tools/remote-cover-letter-builder">remote cover letter builder</a> is designed for this.</li>
        <li><strong>Interview practice.</strong> Mock interviews with AI help you rehearse answers and spot weak points.</li>
        <li><strong>Organisation.</strong> Tracking applications, deadlines and follow-ups is tedious, and tools help. Our <a href="/tools/application-tracker">application tracker</a> is free.</li>
      </ul>

      <h2>Where it falls short</h2>
      <ul>
        <li><strong>Mass applying backfires.</strong> Agents that fire off hundreds of applications produce low-quality, poorly matched submissions. Recruiters notice, and in a market with roughly one opening per jobseeker, quality beats volume.</li>
        <li><strong>Location rules are hard.</strong> Remote roles often have strict country or time zone requirements that AI tools misread. Applying to roles you cannot legally take wastes your time and the employer's. Our <a href="/tools/remote-job-location-checker">remote job location checker</a> reads a listing's location text and flags restrictions.</li>
        <li><strong>Accuracy.</strong> AI can invent details or overstate your experience. Anything it writes must be checked before you send it, because you are accountable for it in the interview.</li>
        <li><strong>Privacy.</strong> Job search agents need access to your CV, history and sometimes your accounts. Read what data a tool collects and how it is used.</li>
      </ul>

      <h2>A sensible way to use AI in your search</h2>
      <p>Use AI for the parts of the search that are slow and mechanical, and keep the judgement for yourself. Let it suggest roles and draft materials, then decide which roles fit and rewrite the drafts in your own voice with specific examples. Apply to fewer, better-matched roles. Our guide on <a href="/posts/how-to-write-a-remote-job-cover-letter">writing a remote job cover letter</a> explains what makes an application stand out, and our <a href="/posts/remote-job-resume-tips">resume tips</a> cover how to present outcomes.</p>
      <p>Remember that employers use AI too. Recruiters now use agents to source candidates, which our article on <a href="/posts/linkedin-hiring-assistant-ai-recruiters-2026">AI recruiters</a> covers, and many screen applications with AI before a person reads them. Some interviews are conducted by AI, as our article on <a href="/posts/ai-job-interviews-2026-what-candidates-should-know">AI job interviews</a> explains. The candidates who do best use AI to be more precise, not just faster.</p>

      <h2>Where to apply</h2>
      <p>Wherever you search, applying directly on employers' own career pages is often the most reliable route. Our board lists roles straight from employers' applicant tracking systems. Browse <a href="/jobs">all remote jobs</a>, look at <a href="/remote-regional-jobs">remote regional jobs</a> outside the US, or see the small set of <a href="/jobs?scope=worldwide">worldwide remote jobs</a>.</p>
    `,
    faq: [
      { q: "What is Indeed Career Scout?", a: "An AI career coach from Indeed that suggests career paths based on your skills, estimates earnings, finds matching jobs, helps with applications and offers interview and negotiation advice." },
      { q: "Do AI job search tools work?", a: "Indeed reports that Career Scout users in US testing applied seven times faster and were 38 percent more likely to be hired, but these are company figures. AI helps most with exploring options, drafting and organisation, and least when used to mass-apply." },
      { q: "Should I let AI apply to jobs for me?", a: "Use it with care. Agents that send many generic applications tend to produce poor matches and can misread location requirements. It is better to let AI draft and then review, tailor and choose where to apply yourself." },
      { q: "Can employers tell if I used AI?", a: "Generic, unedited AI text is often easy to spot. Using AI for drafts is common and accepted, but rewrite them with your own specific examples and check every claim." },
    ],
  },
  {
    slug: "shadow-ai-at-work-2026-surveys",
    title: "Half of Workers Use AI Their Employer Hasn't Approved",
    description:
      "Surveys in 2026 find roughly half of employees use unapproved AI tools at work, and senior staff most of all. The risks, and how to use AI safely at work.",
    date: "2026-11-08T04:47:00.000Z",
    author: "Bhargav",
    tags: ["Shadow AI", "Workplace AI", "Data Security", "AI Policy", "Remote Work"],
    readMinutes: 5,
    html: `
      <p>"Shadow IT" used to mean employees installing software their IT department did not know about. Its 2026 successor is shadow AI: workers using AI tools their employer has not approved, often by pasting work into a personal chatbot account. Several surveys this year suggest it is not a fringe behaviour but a normal one.</p>

      <h2>What the surveys found</h2>
      <ul>
        <li><strong>BlackFog</strong>, a data security company, surveyed 2,000 employees in the UK and US at companies with more than 500 staff in January 2026. It found 49 percent use AI tools not approved by their employer, and 21 percent believe their employer would turn a blind eye as long as the work gets done.</li>
        <li><strong>TrustedTech</strong>, with Censuswide, surveyed 2,001 UK and US employees in March 2026 and found 48 percent use unapproved AI tools. Senior staff were the heaviest users: 65 percent of decision-makers, against 31 percent of more junior staff.</li>
        <li><strong>PagerDuty</strong>, with Wakefield Research, surveyed 1,250 office professionals and reported that 66 percent had used AI tools they believed were not permitted under company policy, according to a summary of the study.</li>
        <li><strong>Deloitte's</strong> 2026 UK workforce survey found that 46 percent of generative AI users use free tools at work, and about one in six pay for their own.</li>
      </ul>
      <p>Two caveats apply. Several of these surveys come from companies that sell security products, which gives them a reason to highlight the problem. And they define shadow AI differently, so the figures are not directly comparable. But all point in the same direction: roughly half of workers use AI outside official channels.</p>

      <h2>Why people do it</h2>
      <p>The reasons are mostly practical. AI tools save time, and many employers have been slow to provide approved ones or have provided tools that are less capable than consumer versions. Microsoft's <a href="/posts/microsoft-work-trend-index-2026-agents">2026 Work Trend Index</a> found that workers are adopting AI faster than their organisations can adapt, with only 26 percent saying their leadership is clearly aligned on AI. When the official route is slow, people find their own.</p>
      <p>The finding that senior staff are the heaviest users is telling. It suggests shadow AI is less about rule-breaking juniors than about busy people under pressure, including the managers who set the rules.</p>

      <h2>The risks</h2>
      <ul>
        <li><strong>Data leakage.</strong> Pasting customer data, financial figures, source code or confidential plans into a consumer AI tool may expose them, depending on the tool's terms and settings.</li>
        <li><strong>Compliance breaches.</strong> In regulated industries, and under privacy laws such as the GDPR, sending personal data to an unapproved service can be a violation.</li>
        <li><strong>Accuracy.</strong> Work produced with AI that nobody else knows about cannot be checked properly.</li>
        <li><strong>Your job.</strong> Breaching a clear company policy can be grounds for discipline or dismissal, even if the work was good.</li>
      </ul>

      <h2>How to use AI safely at work</h2>
      <ul>
        <li><strong>Read your company's AI policy.</strong> If there is none, ask. A short question to your manager or IT team protects you.</li>
        <li><strong>Use approved tools for anything sensitive.</strong> If your employer provides an enterprise AI tool, it usually comes with data protections consumer versions lack.</li>
        <li><strong>Strip identifying details.</strong> If you use a general tool for help with writing or structure, remove names, figures and confidential specifics first.</li>
        <li><strong>Be open about how you use AI.</strong> Telling your team where AI helped makes review easier and builds trust.</li>
        <li><strong>Push for better tools.</strong> If approved tools are inadequate, say so. Your feedback is how policies improve.</li>
      </ul>

      <h2>Why it matters for remote workers</h2>
      <p>Remote workers often have more autonomy over their tools and less day-to-day oversight, which makes shadow AI easier and the responsibility more personal. Employers hiring remotely also care increasingly about security, and many ask about data handling in interviews. Being able to explain how you use AI responsibly is a selling point. Our checklist on <a href="/posts/before-you-accept-a-remote-job-offer">what to check before accepting a remote offer</a> includes questions about tools and policies.</p>
      <p>For employers, the lesson from the surveys is that banning AI rarely works. Providing good, approved tools with clear rules does. Our article on <a href="/posts/cybersecurity-skills-gap-2026-isc2-ai">the cybersecurity skills gap</a> covers the growing demand for people who can secure AI use, one of the fields where that demand is turning into jobs.</p>
      <p>You can browse employers hiring now on <a href="/jobs">all remote jobs</a> or across borders on <a href="/remote-regional-jobs">remote regional jobs</a>.</p>
    `,
    faq: [
      { q: "What is shadow AI?", a: "The use of AI tools at work that the employer has not approved, such as pasting work into a personal chatbot account. It is the AI-era version of shadow IT." },
      { q: "How many employees use unapproved AI?", a: "Surveys in 2026 put it at roughly half. BlackFog found 49 percent of 2,000 UK and US employees and TrustedTech found 48 percent, with senior staff the heaviest users. Definitions vary, so figures are not directly comparable." },
      { q: "Is it risky to use ChatGPT or other AI tools at work?", a: "It can be. Sharing confidential or personal data with an unapproved tool may breach company policy or privacy law. Use approved tools for sensitive work and remove identifying details otherwise." },
      { q: "Can I be fired for using AI at work?", a: "Breaching a clear company policy on AI or data handling can lead to discipline or dismissal. Check your employer's policy and ask if it is unclear." },
    ],
  },
  {
    slug: "uk-jobs-market-autumn-2026",
    title: "UK Jobs Market, Autumn 2026: Unemployment Falls, Vacancies Don't",
    description:
      "UK unemployment fell to 4.7% while vacancies hit a five-year low of 691,000, per October 2026 ONS data. What it means for job seekers, including graduates.",
    date: "2026-11-08T04:47:30.000Z",
    author: "Bhargav",
    tags: ["UK Jobs", "ONS", "Unemployment", "Graduate Jobs", "Remote Jobs UK"],
    readMinutes: 5,
    html: `
      <p>The UK job market sent mixed signals in its latest official figures. Data released by the Office for National Statistics on 20 October 2026 showed unemployment falling for the first time in months, while job vacancies dropped to their lowest level in five years. The ONS described the labour market as broadly flat in 2026.</p>

      <h2>The numbers</h2>
      <ul>
        <li><strong>Unemployment</strong> fell to 4.7 percent in the three months to August, from 4.9 percent in the three months to July, the lowest since mid-2025.</li>
        <li><strong>Vacancies</strong> fell by 21,000 to 691,000 in the three months to September, a five-year low.</li>
        <li><strong>Payrolled employees</strong> rose by a provisional 13,000 between August and September, after a long period of decline. Recruiter analysis has estimated cumulative payroll losses of around 220,000 since early 2024.</li>
        <li><strong>Regular pay growth</strong>, excluding bonuses, was 3.7 percent, about 0.8 percent above inflation.</li>
      </ul>
      <p>Economists quoted in the Irish News coverage saw tentative signs of stabilisation, with ING's James Smith noting that employment appears to be steadying. RSM UK's Thomas Pugh said a Bank of England interest rate rise in November looked exceedingly likely, which would add pressure on businesses.</p>

      <h2>Falling unemployment with falling vacancies</h2>
      <p>Unemployment and vacancies usually move in opposite directions. When both fall, it suggests the market is quiet rather than recovering: fewer people are losing jobs, but employers are not adding many new roles either. For job seekers, that means competition for each opening remains intense, even as the headline unemployment rate looks better.</p>
      <p>Employers have cited rising costs, including higher employer National Insurance contributions introduced in 2025 and increases in the minimum wage, as reasons to hold back on hiring. Interest rate increases would add to that caution.</p>

      <h2>Graduates and young people</h2>
      <p>Young people have been hit hardest. Recruitment consultancy PeopleScout reported that advertised graduate roles fell below 10,000 for the first time since 2016 in early 2026, and other reports in August put graduate job postings at their lowest since the pandemic. The cause is debated. The Bank of England found AI is reducing vacancies in exposed occupations, as our article on <a href="/posts/bank-of-england-ai-productivity-jobs-uk-2026">the Bank of England's AI findings</a> covers, while graduate careers body Prospects Luminate found little evidence of widespread replacement of entry-level jobs by AI so far. Employment costs and a cautious economy explain much of the decline.</p>
      <p>The UK pattern resembles the US, where recent graduates now face higher unemployment than the overall workforce. Our article on <a href="/posts/recent-graduate-unemployment-2026-ai-remote">graduate unemployment</a> looks at the explanations.</p>

      <h2>What it means for UK job seekers</h2>
      <ul>
        <li><strong>Be targeted.</strong> With fewer vacancies, each application needs to be well matched and tailored.</li>
        <li><strong>Look at remote roles from abroad.</strong> International companies hiring in the UK, including many US firms, often recruit through UK entities or employers of record. Our guide to <a href="/posts/remote-jobs-london">remote jobs in London</a> and <a href="/posts/remote-jobs-in-europe-where-to-look">remote jobs in Europe</a> cover where to look.</li>
        <li><strong>Mind the time zones.</strong> US employers often need afternoon overlap. Our article on <a href="/posts/daylight-saving-ends-2026-time-zone-overlap">this autumn's clock changes</a> explains how the gaps shifted.</li>
        <li><strong>Check salary transparency.</strong> Many international employers publish ranges. Our <a href="/tools/salary-band-estimator">salary band estimator</a> and <a href="/tools/remote-salary-converter">remote salary converter</a> help benchmark offers in pounds.</li>
      </ul>

      <h2>Which sectors are still hiring</h2>
      <p>Even in a flat market, some areas tend to keep recruiting. Health and social care has long had persistent vacancies, driven by an ageing population. Technology roles in security, data and cloud infrastructure remain in demand, although general software hiring has slowed. Energy, including grid upgrades and renewables, needs engineers and skilled trades, and data centre construction adds to that demand, echoing the pattern our article on <a href="/posts/electrician-shortage-data-centers-2026">the electrician shortage</a> describes in the US. The ONS does not break vacancies down this finely in its headline release, so check the sector tables or job boards in your field for current numbers.</p>
      <p>Retail and hospitality, which employ many young people, have been among the most cautious sectors, citing higher employment costs. That partly explains why younger workers have felt the slowdown most. For anyone early in their career, sectors with structured training, such as healthcare, apprenticeships in engineering and graduate schemes in professional services, offer more reliable entry points than general vacancies.</p>

      <h2>Finding remote roles open to the UK</h2>
      <p>On our board, roles open to UK candidates appear under UK, Europe and EMEA scopes, plus the small set of fully worldwide jobs. Browse <a href="/remote-regional-jobs">remote regional jobs</a> and filter for the UK, or see <a href="/jobs?scope=worldwide">worldwide remote jobs</a>. Always check that a role marked "Remote" is not limited to the US. Our <a href="/tools/remote-job-location-checker">remote job location checker</a> reads the location text and flags restrictions.</p>
      <p>The UK market is not in crisis, but it is slow, and that favours candidates who search steadily and apply carefully. Our <a href="/posts/30-minute-remote-job-search-routine">30-minute job search routine</a> is built for exactly this kind of market.</p>
    `,
    faq: [
      { q: "What is the UK unemployment rate?", a: "4.7 percent in the three months to August 2026, down from 4.9 percent, according to ONS figures released on 20 October 2026." },
      { q: "How many job vacancies are there in the UK?", a: "About 691,000 in the three months to September 2026, down 21,000 and the lowest in five years." },
      { q: "Why are there fewer graduate jobs in the UK?", a: "Advertised graduate roles fell below 10,000 in early 2026 for the first time since 2016. Rising employment costs and a cautious economy explain much of it, and AI may be reducing vacancies in exposed roles, though the evidence is mixed." },
      { q: "Can UK workers get remote jobs with US companies?", a: "Yes, many US companies hire in the UK through local entities or employers of record. Check each listing's location line, since many US remote roles are limited to the US." },
    ],
  },
  {
    slug: "gartner-tech-trends-2027-careers",
    title: "Gartner's Top Tech Trends for 2027, and the Jobs Behind Them",
    description:
      "Gartner's 2027 trends include AI agent identity, coding agent harnesses and sovereign tech. What each means for skills and careers, with Gartner's predictions.",
    date: "2026-11-08T04:48:00.000Z",
    author: "Bhargav",
    tags: ["Gartner", "Technology Trends", "AI Agents", "Tech Careers", "Skills"],
    readMinutes: 6,
    html: `
      <p>Every October, research firm Gartner names its top strategic technology trends for the coming year. Its list for 2027, presented on 20 October 2026 at its IT Symposium in Orlando, is heavily focused on AI, particularly on managing autonomous AI agents safely. Trend lists are predictions, not facts, and Gartner's forecasts are often ambitious. But they are widely read by the technology leaders who decide what to buy and whom to hire, so they are a useful guide to where demand for skills is heading.</p>
      <p>Gartner grouped the ten trends into three themes. Here they are, as reported by Network World, with what each means for careers.</p>

      <h2>Theme 1: Beyond text-based AI</h2>
      <ul>
        <li><strong>Large quantitative models.</strong> AI models built for numerical data, for forecasting and modelling complex systems. Gartner predicts that by 2030 they will replace large language models in 25 percent of strategic forecasting and operational modelling tasks. <em>Careers:</em> data scientists, quantitative analysts and domain experts in finance, energy and supply chains.</li>
        <li><strong>Speech reasoning models.</strong> Voice AI that reasons directly on audio rather than converting it to text. Gartner predicts more than 70 percent of enterprise voice interactions will be handled autonomously by 2030, up from under 10 percent in 2026. <em>Careers:</em> this is a direct pressure on phone-based customer service, as our article on <a href="/posts/philippines-bpo-ai-targets-cut-2026">the Philippine BPO industry</a> discusses, and a source of new roles designing and monitoring voice systems.</li>
        <li><strong>World models.</strong> AI that simulates how environments respond to actions, important for robotics. Gartner predicts 40 percent of robotics applications will use them by 2030. <em>Careers:</em> robotics, simulation and the factory roles our article on <a href="/posts/humanoid-robots-factories-2026-jobs">humanoid robots</a> covers.</li>
      </ul>

      <h2>Theme 2: Governing AI agents</h2>
      <ul>
        <li><strong>AI context platforms.</strong> Systems that organise company knowledge so agents make decisions aligned with the business. <em>Careers:</em> data engineers, knowledge managers and information architects.</li>
        <li><strong>AI coding agent harness.</strong> A governed system around coding agents, with verification and feedback loops. Gartner predicted that autonomous coding agents would generate 20 percent of public commits by late 2026. GitHub's data suggests agent activity is already large: our article on <a href="/posts/github-octoverse-2026-ai-agents-pull-requests">Octoverse 2026</a> reports agents starting over 40 percent of pull requests. <em>Careers:</em> platform engineers, DevOps and developer productivity teams.</li>
        <li><strong>AI agent identity.</strong> Frameworks that give agents verifiable identities and controlled access. Gartner predicts that by 2028, 25 percent of enterprise security breaches will trace back to AI agent abuse. <em>Careers:</em> identity and access management, a security specialism already in short supply.</li>
        <li><strong>Autonomous exposure remediation.</strong> AI that finds and fixes security vulnerabilities automatically. <em>Careers:</em> security engineers who build and oversee these systems, rather than patching by hand.</li>
      </ul>

      <h2>Theme 3: Durable agility</h2>
      <ul>
        <li><strong>Sovereign tech.</strong> Technology that reduces dependence on any single provider or country. Gartner predicts more than 75 percent of organisations outside the US will adopt digital sovereignty strategies by 2030. <em>Careers:</em> cloud architects and engineers in Europe and Asia, particularly those who can build on regional providers.</li>
        <li><strong>Disposable applications.</strong> Software built quickly for a specific purpose and retired when no longer needed, enabled by AI coding. Gartner predicts 80 percent of new applications will be disposable by 2030. <em>Careers:</em> product people and engineers who can build and ship quickly, and governance teams who keep track of what exists.</li>
        <li><strong>Wetware as a service.</strong> Cloud access to biological computing systems. This is the most speculative item on the list, and few careers depend on it yet.</li>
      </ul>

      <h2>The common thread: governance and security</h2>
      <p>Strip away the jargon and the list says something clear: organisations expect AI agents to do more, and they are worried about controlling them. Four of the ten trends concern governance, identity or security. That matches what we see in hiring. Security roles remain hard to fill, as our article on <a href="/posts/cybersecurity-skills-gap-2026-isc2-ai">the cybersecurity skills gap</a> shows, and demand is shifting toward people who understand how AI systems fail.</p>
      <p>The second thread is data. Several trends depend on organised, reliable data, which keeps data engineering among the most durable technical careers. Our guide to <a href="/posts/remote-data-and-machine-learning-jobs">remote data and machine learning jobs</a> covers that field.</p>

      <h2>How to use this list</h2>
      <p>Do not chase every trend. Pick the one closest to your current skills and go deeper. A security engineer can move toward agent identity. A data analyst can learn forecasting models. A DevOps engineer can build the guardrails around coding agents. Our <a href="/posts/upskilling-for-remote-work">upskilling guide</a> covers cost-effective ways to learn, and our article on <a href="/posts/ai-skills-required-tech-jobs-75-percent-2026">AI skills in tech jobs</a> shows what employers already ask for.</p>
      <p>You can browse current roles in security, data and platform engineering on <a href="/jobs">all remote jobs</a> or across borders on <a href="/remote-regional-jobs">remote regional jobs</a>.</p>
    `,
    faq: [
      { q: "What are Gartner's top technology trends for 2027?", a: "Large quantitative models, speech reasoning models, world models, AI context platforms, AI coding agent harnesses, AI agent identity, autonomous exposure remediation, sovereign tech, disposable applications and wetware as a service." },
      { q: "Which Gartner trends affect jobs most?", a: "Speech reasoning models put pressure on phone-based customer service, while agent identity, coding agent harnesses and exposure remediation create demand for security, identity and platform engineering skills." },
      { q: "Are Gartner's predictions reliable?", a: "They are forecasts, often ambitious, and should be treated as signals of where technology leaders are focusing rather than certainties. They are useful because those leaders influence hiring and spending." },
      { q: "What skills should I learn for 2027?", a: "Skills around governing and securing AI agents, identity and access management, data engineering and platform engineering are strongly represented. Choose the trend closest to your current skills and go deeper." },
    ],
  },
  {
    slug: "robotaxis-2026-waymo-driver-jobs",
    title: "Robotaxis Hit 500,000 Rides a Week. What It Means for Drivers",
    description:
      "Waymo doubled paid driverless rides to 500,000 a week and is adding cities. What robotaxis mean for ride-hail and delivery drivers, and the jobs they create.",
    date: "2026-11-08T04:48:30.000Z",
    author: "Bhargav",
    tags: ["Robotaxis", "Autonomous Vehicles", "Waymo", "Gig Economy", "Transport Jobs"],
    readMinutes: 6,
    html: `
      <p>Driverless taxis have moved from experiment to everyday service in a growing number of US cities. In March 2026, Waymo reported 500,000 paid driverless rides per week, double the roughly 250,000 it reported in April 2025, according to InsideEVs. The company told Bloomberg it aims for one million rides a week by the end of 2026. In October, it added nearly 250 square miles of driverless coverage across five cities. For the millions of people who earn a living or extra income from driving, the question is how fast this spreads.</p>

      <h2>Where robotaxis operate</h2>
      <p>At the start of 2025, Waymo ran commercial service in three metro areas: Phoenix, San Francisco and Los Angeles. By March 2026 it operated in ten, having added Dallas, Houston, San Antonio and Orlando, and later reports put it at around fifteen metro areas. Its website lists more than twenty "up next" cities, including New York, Chicago and London.</p>
      <p>Competitors are far behind on scale. Tesla's robotaxi service operates in Austin with a small fleet; an independent tracker counted 44 active vehicles at one point. Amazon's Zoox runs pilot services in Las Vegas and San Francisco. In China, several companies operate large robotaxi fleets in major cities.</p>

      <h2>The economics</h2>
      <p>The driver is the largest cost of a taxi or ride-hail trip. Removing the driver is the entire business case for robotaxis, which is why companies are investing billions despite the technical difficulty. As fleets grow and vehicle costs fall, driverless rides can become cheaper than human-driven ones in the areas they serve.</p>
      <p>That does not mean drivers disappear overnight. Robotaxis serve defined areas, mostly in sunny cities with well-mapped roads. Expanding to new cities, highways, airports, bad weather and dense urban centres takes years per market. Most rides in the US are still given by human drivers.</p>

      <h2>What it means for drivers</h2>
      <ul>
        <li><strong>The first effect is on earnings, not jobs.</strong> In cities with robotaxis, drivers may see fewer trips or lower fares in the zones robotaxis cover, especially for short urban trips.</li>
        <li><strong>The effect is local.</strong> A driver in Phoenix or San Francisco faces different prospects from one in a city with no robotaxi plans.</li>
        <li><strong>Gig work is most exposed.</strong> Ride-hail and food delivery drivers are independent contractors with no notice period or severance, so changes in demand hit their income directly.</li>
        <li><strong>Long-haul trucking is a separate, slower story.</strong> Autonomous trucks are being tested on some highway routes, but most trucking jobs involve loading, local delivery and judgement that will take much longer to automate.</li>
      </ul>

      <h2>The jobs robotaxis create</h2>
      <p>Driverless fleets still need people, though fewer and with different skills:</p>
      <ul>
        <li><strong>Fleet operations:</strong> cleaning, charging, maintaining and inspecting vehicles at depots.</li>
        <li><strong>Remote assistance:</strong> operators who help vehicles when they encounter situations they cannot handle, such as blocked roads or unusual instructions from police. These roles are often based in operations centres.</li>
        <li><strong>Field support:</strong> teams who respond to stuck vehicles or incidents.</li>
        <li><strong>Engineering and safety:</strong> software, mapping, simulation, safety analysis and regulatory roles, many of them well paid.</li>
        <li><strong>Customer support:</strong> riders still need help with lost items, billing and complaints.</li>
      </ul>
      <p>Many of the engineering, mapping and safety roles at autonomous vehicle companies can be done remotely or in hybrid arrangements, though fleet and field roles are on site by definition.</p>

      <h2>What drivers can do now</h2>
      <ul>
        <li><strong>Watch your local market.</strong> If a robotaxi service is launching or expanding in your city, plan for lower ride-hail earnings over the next few years.</li>
        <li><strong>Diversify income.</strong> Drivers who combine ride-hail with delivery, logistics or other work are less exposed to any one change.</li>
        <li><strong>Consider fleet and logistics roles.</strong> Experience with vehicles and cities transfers to fleet operations, dispatch and logistics coordination.</li>
        <li><strong>Build skills for remote work.</strong> Customer support and operations roles are common entry points into remote work. Our guide to <a href="/posts/best-remote-jobs-without-tech-background-2026">remote jobs without a tech background</a> lists options, and our <a href="/posts/remote-career-change-guide">career change guide</a> covers how to plan a switch.</li>
      </ul>
      <p>Robotaxis are part of a broader pattern of AI moving into the physical world, alongside <a href="/posts/humanoid-robots-factories-2026-jobs">humanoid robots in factories</a>. Both are advancing faster than many expected, and both are still far from replacing most human work in their fields.</p>
      <p>If you are looking for roles at autonomous vehicle and robotics companies, or in remote support and operations, you can browse <a href="/jobs">all remote jobs</a> or look at <a href="/remote-regional-jobs">remote regional jobs</a>.</p>
    `,
    faq: [
      { q: "How many rides do Waymo robotaxis give?", a: "Waymo reported 500,000 paid driverless rides per week in March 2026, double its April 2025 level, and told Bloomberg it aims for one million a week by the end of 2026." },
      { q: "Will robotaxis replace Uber and Lyft drivers?", a: "Over time, in the areas they serve. Robotaxis currently operate in defined zones in a limited number of cities, and expansion takes years per market. The first effect is likely to be lower earnings for drivers in those zones rather than mass job losses." },
      { q: "What jobs do robotaxi companies create?", a: "Fleet maintenance and charging, remote assistance operators, field support, customer support, and engineering, mapping, simulation and safety roles, some of which are remote or hybrid." },
      { q: "Which cities have driverless taxis?", a: "Waymo operates in cities including Phoenix, San Francisco, Los Angeles, Dallas, Houston, San Antonio and Orlando, among others, with more planned. Tesla runs a small service in Austin, and Zoox pilots in Las Vegas and San Francisco." },
    ],
  },
  {
    slug: "microsoft-work-trend-index-2026-agents",
    title: "Microsoft's 2026 Work Trend Index: Workers Outpace Their Employers",
    description:
      "Microsoft surveyed 20,000 AI users in 10 countries. Agents grew 15x, but only 26% say leaders are aligned on AI. What it means for your career.",
    date: "2026-11-08T04:49:00.000Z",
    author: "Bhargav",
    tags: ["Microsoft", "Work Trend Index", "AI Agents", "Future of Work", "Skills"],
    readMinutes: 6,
    html: `
      <p>Microsoft's annual Work Trend Index, produced with LinkedIn, is one of the largest regular studies of how people use AI at work. The 2026 edition, published on 5 May, surveyed 20,000 knowledge workers who use AI, 2,000 in each of ten countries including the US, UK, India, Brazil, Japan, Germany and Australia, and combined that with anonymised data from Microsoft 365. Its central finding is what Microsoft calls a transformation paradox: workers are adopting AI faster than their organisations can absorb the change.</p>
      <p>As with any vendor research, it is worth remembering that Microsoft sells AI tools. But the scale of the survey and the specificity of the findings make it useful.</p>

      <h2>The key findings</h2>
      <ul>
        <li><strong>Agents are spreading quickly.</strong> Active AI agents in Microsoft 365 grew 15 times year on year, and 18 times in large enterprises.</li>
        <li><strong>A minority are far ahead.</strong> Microsoft identifies 16 percent of AI users as "Frontier Professionals" who use agents for complex, multi-step work. Of these, 80 percent say they produce work they could not have produced a year ago, compared with 58 percent of all AI users.</li>
        <li><strong>Leadership is lagging.</strong> Only 26 percent say their leadership is clearly and consistently aligned on AI. Only 13 percent say they are rewarded for reinventing work with AI even if results fall short.</li>
        <li><strong>Fear is common.</strong> 65 percent fear falling behind if they do not adapt quickly, yet 45 percent say it feels safer to focus on current goals than to redesign how they work.</li>
        <li><strong>Organisations matter more than individuals.</strong> Organisational factors such as culture, manager support and talent practices were associated with 67 percent of reported AI impact, against 32 percent for individual mindset and behaviour. Microsoft notes this is an association, not proof of cause.</li>
      </ul>

      <h2>The skills that matter more</h2>
      <p>Asked which human skills matter more as AI takes on work, respondents ranked <strong>quality control of AI output</strong> first, at 50 percent, followed by <strong>critical thinking</strong> at 46 percent. And 86 percent said they treat AI output as a starting point rather than a final answer.</p>
      <p>The habits of the most advanced users are revealing. Frontier Professionals were more likely to do some work without AI to keep their skills sharp (43 percent against 30 percent), and more likely to decide deliberately whether a task belongs to AI or a person (53 against 33 percent). Using AI well, it turns out, includes knowing when not to use it.</p>

      <h2>Managers make the difference</h2>
      <p>A separate Microsoft study of 1,800 workers found that when managers openly modelled AI use, employees reported significantly higher value from AI, more critical thinking about it and more trust in agents. Frontier Professionals were much more likely to say their manager uses AI openly and sets quality standards for AI-assisted work. The implication for employers is that training individuals is not enough; managers have to lead by example.</p>

      <h2>What it means for jobs</h2>
      <p>The report cites LinkedIn data showing employers created at least 1.3 million AI-related job opportunities over the past two years, from data annotators to AI engineers and forward-deployed engineers who help customers adopt AI. That does not offset every effect of AI on other roles, but it shows the new demand is real.</p>
      <p>More broadly, the gap between workers and organisations is itself a career signal. Companies that have not worked out how to use AI are likely to look for people who can help them. Employees who can redesign a process with AI, show the result and explain how quality was maintained are valuable precisely because most organisations are still struggling to do that.</p>
      <p>The finding that workers run ahead of their employers also explains why so many use AI tools their company has not approved. Our article on <a href="/posts/shadow-ai-at-work-2026-surveys">shadow AI at work</a> covers that side.</p>

      <h2>How to apply this to your career</h2>
      <ul>
        <li><strong>Build quality control into your AI use.</strong> Check, verify and improve what AI produces. That is the skill employers say matters most.</li>
        <li><strong>Document what you change.</strong> A before-and-after example of a process you improved with AI is strong evidence in interviews.</li>
        <li><strong>Keep core skills sharp.</strong> Do some work without AI so you can still judge AI's output.</li>
        <li><strong>Choose employers carefully.</strong> In interviews, ask how the team uses AI and how leaders support it. A clear answer suggests an organisation where your skills will be used.</li>
      </ul>
      <p>For remote workers, these skills are especially visible because so much remote work is written and asynchronous. Our guide on <a href="/posts/upskilling-for-remote-work">upskilling for remote work</a> covers practical ways to build them, and our article on <a href="/posts/anthropic-economic-index-2026-ai-work-automation">how AI is used across occupations</a> adds another large data set.</p>
      <p>You can browse employers hiring now on <a href="/jobs">all remote jobs</a> or across borders on <a href="/remote-regional-jobs">remote regional jobs</a>.</p>
    `,
    faq: [
      { q: "What is the Microsoft Work Trend Index 2026?", a: "An annual study by Microsoft and LinkedIn. The 2026 edition, published on 5 May, surveyed 20,000 AI-using knowledge workers across ten countries and analysed Microsoft 365 usage data." },
      { q: "What did the 2026 Work Trend Index find?", a: "Active AI agents grew 15 times year on year, 16 percent of AI users are advanced Frontier Professionals, and only 26 percent of workers say their leadership is clearly aligned on AI, so workers are adopting AI faster than organisations can adapt." },
      { q: "Which skills matter most as AI spreads at work?", a: "Respondents ranked quality control of AI output first at 50 percent and critical thinking second at 46 percent. 86 percent treat AI output as a starting point rather than a final answer." },
      { q: "Is AI creating jobs?", a: "Some. The report cites LinkedIn data showing at least 1.3 million AI-related job opportunities created over two years, including data annotators, AI engineers and forward-deployed engineers." },
    ],
  },
  {
    slug: "germany-auto-industry-job-cuts-2026",
    title: "Germany's Car Industry Hits a 21-Year Jobs Low. What's Behind It",
    description:
      "German auto employment fell 42,300 in a year to 691,500, the lowest since 2005, with more cuts to come. What it means for engineers and remote workers.",
    date: "2026-11-08T04:49:30.000Z",
    author: "Bhargav",
    tags: ["Germany", "Automotive", "Layoffs", "Europe Jobs", "Electric Vehicles"],
    readMinutes: 6,
    html: `
      <p>Germany's car industry, long the backbone of Europe's largest economy, is shrinking faster than any other major German industrial sector. According to the Federal Statistical Office, Destatis, the industry employed about 691,500 people at the end of June 2026, its lowest level since 2005. That was 42,300 fewer than a year earlier, a fall of 5.8 percent, more than twice the 2.7 percent decline across German manufacturing as a whole, as reported by New Mobility.</p>
      <p>Destatis noted that the figure excludes tyre makers, so the real loss is larger. And many of the cuts companies have already announced have not yet shown up in the statistics.</p>

      <h2>Who is cutting</h2>
      <p>Announced reductions across the industry, as compiled by New Mobility, include:</p>
      <ul>
        <li><strong>Volkswagen Group:</strong> at least 50,000 positions across its German brands, including up to 7,500 mostly white-collar roles at Audi by 2029 and agreements covering about 8,900 jobs at Porsche.</li>
        <li><strong>Bosch:</strong> about 13,000 positions, mainly in its German mobility business, by 2030.</li>
        <li><strong>ZF:</strong> between 11,000 and 14,000 German jobs, from a domestic workforce of about 54,000.</li>
        <li><strong>BMW, Mercedes-Benz, Ford, Schaeffler and Continental</strong> have also announced cuts or voluntary departure programmes in Germany.</li>
      </ul>
      <p>Suppliers are cutting faster than carmakers: parts and accessories makers reduced their workforce by 7.6 percent over the year, against 6.1 percent for car and engine manufacturers. The industry association VDA estimates the sector could have 225,000 fewer jobs in 2035 than in 2019, with about 100,000 already gone.</p>

      <h2>Why it is happening</h2>
      <ul>
        <li><strong>The shift to electric vehicles.</strong> Electric cars have far fewer parts than combustion cars, especially in the engine and transmission, which is where German suppliers are strongest. Building them takes fewer workers.</li>
        <li><strong>Competition from China.</strong> Chinese manufacturers have taken market share in China, which was crucial for German brands, and are expanding in Europe with cheaper electric cars.</li>
        <li><strong>New jobs landing elsewhere.</strong> Germany has not created enough new jobs in batteries, software and electric vehicle assembly to replace the old ones. New Mobility notes that the EU has added about 460,000 vehicle manufacturing jobs since 2010, but almost all of that growth went to Czechia, Poland, Slovakia, Romania and Sweden.</li>
        <li><strong>High costs and trade barriers.</strong> Energy prices, labour costs and tariffs have added pressure on exports.</li>
      </ul>

      <h2>Engineers are affected too</h2>
      <p>Many of the cuts target white-collar roles: research and development, administration and engineering, not only factory work. Young engineers who joined the industry expecting long careers face a much smaller market. At the same time, the industry still needs software, battery and electronics expertise, and companies continue to hire for those skills even while cutting elsewhere.</p>

      <h2>What it means for workers</h2>
      <ul>
        <li><strong>Transferable skills are valuable.</strong> Automotive engineers bring systems engineering, quality, safety and embedded software experience that robotics, aerospace, energy, medical devices and semiconductors need. Our article on <a href="/posts/semiconductor-talent-shortage-2026-chip-jobs">the semiconductor talent shortage</a> covers one destination.</li>
        <li><strong>Software skills travel furthest.</strong> Embedded and automotive software engineers can move into broader software roles, many of them remote.</li>
        <li><strong>Remote work across borders is an option.</strong> German engineers can work remotely for companies across Europe and beyond, often through employers of record. Our guide to <a href="/posts/remote-jobs-in-europe-where-to-look">remote jobs in Europe</a> covers where to look, and <a href="/posts/contractor-employee-or-employer-of-record">our employment types guide</a> explains the contracts.</li>
        <li><strong>Severance and social plans matter.</strong> German job cuts are usually negotiated with works councils and often include voluntary departure packages, early retirement or retraining. Understand your options before accepting a package.</li>
      </ul>

      <h2>What employers elsewhere are doing</h2>
      <p>The engineers leaving the car industry have skills that other sectors want. Robotics, defence, aerospace, energy and semiconductor companies all need people with experience of complex manufacturing, safety-critical systems and large engineering programmes, and several of those sectors are growing in Europe while automotive shrinks. We have not seen reliable figures on how many former automotive staff have moved into them, so treat this as a direction to explore rather than a measured trend. For workers, the point is that options extend well beyond the car industry, especially for those willing to retrain in software or move between countries.</p>

      <h2>A wider European pattern</h2>
      <p>Germany's car industry shows how industrial change, global competition and new technology combine to reshape employment. It is not mainly an AI story, although automation and software play a role. But it matters for anyone tracking the European job market, because the auto industry supports a large network of suppliers and services, and its decline weighs on hiring across the economy.</p>
      <p>For workers in the region, the practical response is the same as in other shrinking sectors: identify transferable skills early, build software and data capabilities, and widen the search beyond one country. You can browse roles open to candidates in Germany and the rest of Europe on <a href="/remote-regional-jobs">remote regional jobs</a>, see <a href="/jobs?scope=worldwide">worldwide remote jobs</a>, or search everything on <a href="/jobs">all remote jobs</a>. Our <a href="/tools/remote-salary-converter">remote salary converter</a> helps compare offers in euros.</p>
    `,
    faq: [
      { q: "How many people work in Germany's car industry?", a: "About 691,500 at the end of June 2026, according to Destatis, the lowest since 2005 and 42,300 fewer than a year earlier. The figure excludes tyre makers." },
      { q: "Which German car companies are cutting jobs?", a: "Announced cuts include at least 50,000 positions across Volkswagen Group's German brands, about 13,000 at Bosch by 2030 and 11,000 to 14,000 at ZF, plus reductions at BMW, Mercedes-Benz, Ford, Schaeffler and Continental." },
      { q: "Why is the German auto industry losing jobs?", a: "The shift to electric vehicles needs fewer workers, Chinese competitors have taken market share, new battery and software jobs are landing in other countries, and high energy and labour costs add pressure." },
      { q: "What can German automotive engineers do?", a: "Their systems, safety, quality and embedded software skills transfer to robotics, aerospace, energy, medical devices and semiconductors. Many can also work remotely for companies elsewhere in Europe." },
    ],
  },
];
