/**
 * News cluster C: technology sectors and what they mean for jobs, autumn
 * 2026. Written 8 November 2026. Sources named in each article; projections
 * and company claims are labelled as such.
 */
import type { Post } from "./posts";

export const POSTS_NEWS_C: Post[] = [
  {
    slug: "google-gemini-enterprise-agent-own-email-2026",
    title: "Google's New AI Agent Gets Its Own Work Email. What Changes for Teams",
    description:
      "Google launched a Gemini agent for businesses with its own Workspace account, email address and task inbox. What an AI colleague means for remote teams.",
    date: "2026-11-08T04:00:00.000Z",
    author: "Bhargav",
    tags: ["Google Gemini", "AI Agents", "Future of Work", "Remote Teams", "Workplace AI"],
    readMinutes: 6,
    html: `
      <p>On 8 October 2026, at a Google Cloud event, Google launched a unified Gemini agent for businesses that can plan and carry out tasks on a user's behalf. The detail that drew the most attention was how it fits into a company: according to TechCrunch's report, the agent gets its <strong>own Google Workspace account and email address</strong>, and a task inbox shows what it is working on. It can connect to Google Workspace, Microsoft 365, Slack and other enterprise tools, and to third-party AI models, starting with Anthropic's Claude.</p>
      <p>Chief executive Sundar Pichai said at the event that Gemini has more than a billion monthly active users. Google is starting with businesses before rolling the agent out to consumers.</p>

      <h2>Why an email address matters</h2>
      <p>Giving an AI agent its own account is a small technical choice with large practical consequences. An agent with an identity can be added to email threads and shared documents, assigned tasks, given permissions like any employee, and audited. Its actions are logged under its own name rather than blending into a person's account. That makes it easier to manage, and easier for a team to treat it as a participant in the work rather than a tool one person uses.</p>
      <p>It arrived the same autumn that OpenAI launched always-on agents called Dots that run on their own computers and take tasks from Slack and Microsoft Teams. Our article on <a href="/posts/openai-devday-2026-dots-agents-jobs">OpenAI's Dots agents</a> covers that launch. Two of the largest AI companies converging on the same model, an agent with its own seat at the virtual table, suggests where workplace software is heading.</p>

      <h2>What it changes for remote and distributed teams</h2>
      <p>Remote teams are, in some ways, the natural home for this kind of agent. Their work already happens in shared documents, chat channels and ticket queues, where an agent can see the context and contribute. A few likely shifts:</p>
      <ul>
        <li><strong>Handoffs across time zones.</strong> Work that waits overnight for a colleague in another region can be picked up by an agent that is always available, such as gathering data, drafting a summary or preparing a first pass for review.</li>
        <li><strong>More writing, not less.</strong> Agents work from instructions. Teams that brief clearly and document decisions get more from them, which rewards the written habits remote work already depends on.</li>
        <li><strong>New review duties.</strong> Someone has to check an agent's output before it reaches a customer or a decision. That responsibility often lands on the most experienced person on a team.</li>
        <li><strong>Permissions become a team decision.</strong> Deciding what an agent may read, send or change is now part of setting up a project.</li>
      </ul>

      <h2>Which roles feel it first</h2>
      <p>Tasks that are repetitive, digital and spread across several systems are the obvious candidates: compiling reports, triaging requests, updating records, scheduling and routine research. Coordinators, junior analysts and operations staff do many of those tasks today. In practice, early evidence suggests AI tends to reshape such roles rather than remove them outright. Anthropic's research on how its models are used found that, across conversations on its consumer product, people used AI to augment their work slightly more often than to automate it. Our article on <a href="/posts/anthropic-economic-index-2026-ai-work-automation">Anthropic's Economic Index</a> explains those findings.</p>

      <h2>How to work well alongside an agent</h2>
      <ol>
        <li><strong>Write tasks like briefs.</strong> State the goal, the context, the constraints and what "done" looks like. The skill is identical to briefing a colleague in another time zone.</li>
        <li><strong>Check, then trust.</strong> Spot-check an agent's early work thoroughly, then adjust how closely you review as you learn where it is reliable.</li>
        <li><strong>Keep ownership.</strong> When an agent drafts something, the person who sends it is accountable for it.</li>
        <li><strong>Learn the governance.</strong> Understanding permissions, data access and logging is becoming a useful skill in its own right, especially in operations and IT roles.</li>
      </ol>

      <h2>What to watch</h2>
      <p>The open questions are cost, reliability and security. Agents that act across systems can make mistakes at scale or be manipulated by malicious content they read. Expect companies to start with narrow, well-defined tasks and expand from there. Expect job postings to mention experience working with AI agents more often; job board Dice reported that AI skills appeared in 75 percent of US tech postings by June 2026, as our article on <a href="/posts/ai-skills-required-tech-jobs-75-percent-2026">AI skills in tech job postings</a> describes.</p>
      <p>Browse remote roles in operations, IT and engineering on the <a href="/jobs">board</a>.</p>
    `,
    faq: [
      {
        q: "What is Google's new Gemini agent?",
        a: "A unified Gemini agent for businesses, launched on 8 October 2026, that plans and carries out tasks. It gets its own Workspace account, email address and task inbox, and connects to Workspace, Microsoft 365, Slack and other tools.",
      },
      {
        q: "Why does an AI agent need its own email address?",
        a: "An identity lets it be added to threads and documents, given its own permissions and audited, so its actions are logged separately from any person's account.",
      },
      {
        q: "Will AI agents replace office jobs?",
        a: "Early evidence suggests they mostly reshape roles by taking over repetitive digital tasks, while people brief, review and stay accountable for the work.",
      },
      {
        q: "How should remote teams prepare for AI agents?",
        a: "Write clear task briefs, document decisions, decide carefully what agents can access, and set up review steps before agent output reaches customers or decisions.",
      },
    ],
  },

  {
    slug: "cybersecurity-skills-gap-2026-isc2-ai",
    title: "Cybersecurity's Problem Is Now Skills, Not Headcount",
    description:
      "ISC2's latest workforce research shows security teams short on skills rather than people, with AI shifting work toward validation and judgement.",
    date: "2026-11-08T04:03:00.000Z",
    author: "Bhargav",
    tags: ["Cybersecurity Jobs", "ISC2", "Security Careers", "AI in Security", "Remote Security Jobs"],
    readMinutes: 6,
    html: `
      <p>For years the headline number in cybersecurity was a workforce gap measured in millions of missing people. That framing has changed. ISC2, the security professionals' association, said in its most recent Cybersecurity Workforce Study, published in December 2025, that <strong>skills shortages have overtaken headcount</strong> as the main concern for security teams. It also chose not to publish a new global workforce-gap estimate; the last one, in 2024, was 4.8 million.</p>
      <p>In 2026, ISC2 followed up with research on how AI is reshaping security work. Together they describe a field that still hires, but hires differently.</p>

      <h2>What the research found</h2>
      <ul>
        <li><strong>Almost everyone has a skills need.</strong> In the workforce study, 95 percent of respondents reported at least one skill need on their team.</li>
        <li><strong>Budget is the constraint on headcount.</strong> About a third said their organisations did not have enough staff, with budget limits cited as a major cause.</li>
        <li><strong>No sign of accelerating cuts.</strong> ISC2's chief operating officer said there was no indication that budget cuts or layoffs would accelerate significantly in 2026.</li>
        <li><strong>AI is changing the work.</strong> In the 2025 study, 73 percent expected AI to create more specialised security skills and 72 percent expected it to require a more strategic mindset. ISC2's July 2026 AI pulse survey of 856 security professionals who use AI found the work shifting toward validating findings and applying human judgement.</li>
        <li><strong>Training is shifting too.</strong> ISC2's 2026 training trends research put AI knowledge as the top training priority, cited by 47 percent of respondents internationally, according to a summary of the study.</li>
      </ul>

      <h2>What "skills over headcount" means in practice</h2>
      <p>Security teams increasingly use AI to do first-pass work: triaging alerts, summarising logs, drafting reports and suggesting fixes. That reduces the need for large numbers of people doing repetitive monitoring, and increases the need for people who can tell whether the AI is right, investigate what it flags and make decisions under uncertainty. The entry-level alert-watching job that was once the classic way into the field is shrinking; the experienced analyst who can validate and act is in more demand.</p>
      <p>At the same time, AI creates new attack surfaces. Companies deploying AI agents need people who understand how models can be manipulated, how data leaks through them and how to govern their access. Our article on <a href="/posts/fake-job-candidates-deepfakes-remote-hiring-2026">deepfake job candidates</a> describes one consequence that has landed on security teams' desks.</p>

      <h2>The skills employers want</h2>
      <ol>
        <li><strong>Cloud security.</strong> Most infrastructure now runs in the cloud, and misconfiguration remains one of the most common causes of breaches.</li>
        <li><strong>Detection engineering and incident response.</strong> Writing detections, investigating incidents and leading response, increasingly with AI assistance.</li>
        <li><strong>Identity and access management.</strong> Identity is the new perimeter, and every AI agent adds identities to manage.</li>
        <li><strong>AI security and governance.</strong> Securing AI systems, assessing vendors and setting policies for AI use.</li>
        <li><strong>Communication.</strong> Explaining risk to people who are not security specialists remains rare and valuable.</li>
      </ol>

      <h2>Is cybersecurity good for remote work?</h2>
      <p>Much of it is. Security operations, detection engineering, cloud security and governance work are often done remotely, and some security vendors run fully distributed teams that monitor around the clock across time zones. Roles involving physical security, some government work and clearances are typically on site or limited to citizens of one country. Our analysis of <a href="/posts/remote-devops-sre-jobs">remote DevOps and SRE jobs</a> found infrastructure-heavy fields are more likely than average to be open across regions, and security engineering shares much of that profile.</p>

      <h2>How to get in or move up</h2>
      <ul>
        <li><strong>From IT or operations:</strong> system administrators, network engineers and cloud engineers move into security most often. Build on what you already know.</li>
        <li><strong>Show hands-on work:</strong> home labs, published write-ups of practice challenges and detection rules you wrote are more persuasive than certificates alone, though respected certifications still help with screening.</li>
        <li><strong>Learn the AI side:</strong> experience using AI tools in investigations, and an understanding of AI-specific risks, is becoming a differentiator.</li>
      </ul>
      <p>Search the <a href="/jobs">board</a> for security roles, and use the <a href="/tools/job-title-finder">job title finder</a> to see which security titles employers use most.</p>
      <p>One more trend is worth knowing if you are job hunting in security. Many organisations now prefer to train existing IT staff into security roles rather than hire externally, because internal candidates already understand the systems. If you work in IT operations at a company with a security team, an internal move is often the fastest route in, and a strong reason to volunteer for security-related projects in your current role.</p>
    `,
    faq: [
      {
        q: "Is there still a cybersecurity skills shortage?",
        a: "Yes, but ISC2's latest research says skills shortages now matter more than raw headcount, with 95 percent of respondents reporting at least one skill need on their team.",
      },
      {
        q: "How is AI changing cybersecurity jobs?",
        a: "AI handles more first-pass work such as alert triage and log summaries, shifting human work toward validating findings, investigating and applying judgement, according to ISC2's 2026 research.",
      },
      {
        q: "Which cybersecurity skills are most in demand?",
        a: "Cloud security, detection engineering and incident response, identity and access management, AI security and governance, and the ability to explain risk to non-specialists.",
      },
      {
        q: "Can cybersecurity jobs be done remotely?",
        a: "Many can, including security operations, detection engineering, cloud security and governance. Roles needing clearances or physical presence are usually on site or limited to one country.",
      },
    ],
  },

  {
    slug: "spacex-ipo-2026-space-industry-jobs",
    title: "SpaceX's Record IPO: What It Means for Space Industry Jobs",
    description:
      "SpaceX listed on Nasdaq in June 2026 in the largest IPO on record, raising about $75 billion. What the listing means for jobs across the space industry.",
    date: "2026-11-08T04:06:00.000Z",
    author: "Bhargav",
    tags: ["SpaceX IPO", "Space Industry", "Aerospace Jobs", "Tech Jobs", "Engineering Careers"],
    readMinutes: 6,
    html: `
      <p>On 12 June 2026, SpaceX began trading on Nasdaq under the ticker SPCX in what was widely reported as the largest initial public offering on record. Shares were priced at $135, and the company raised about <strong>$75 billion</strong>, nearly three times the previous record set by Saudi Aramco's $25.6 billion listing in 2019. Valuation estimates at pricing were around $1.75 trillion, though not everyone agreed it was justified: research firm Morningstar put SpaceX's fair value at about $780 billion.</p>
      <p>Days later, SpaceX agreed to buy Anysphere, maker of the Cursor coding tool, for about $60 billion in stock, a sign of how much of its story now rests on AI as well as rockets. Our article on <a href="/posts/spacex-cursor-acquisition-developers">the Cursor deal</a> covers that side.</p>

      <h2>What the listing means for SpaceX employees</h2>
      <p>Coverage around the IPO projected that about 4,000 employees could become millionaires on paper, and that several hundred could see their holdings exceed $100 million. Those are projections, not confirmed payouts, and lock-up periods usually restrict selling for months after a listing. But a liquidity event of that size reshapes a local job market. Experienced engineers with newly liquid stock often leave to start companies or join smaller ones, which tends to seed a wave of start-ups.</p>

      <h2>What it means for the wider space industry</h2>
      <p><strong>Capital follows a successful listing.</strong> Investors who watched the SpaceX debut have more appetite for other space companies, from launch providers to satellite operators and component makers. More funding usually means more hiring, especially for engineers with launch, propulsion, avionics and satellite experience.</p>
      <p><strong>Talent competition intensifies.</strong> SpaceX's public currency, its stock, makes it easier to recruit and acquire. Smaller space companies compete with equity of their own and, often, with more flexible working arrangements.</p>
      <p><strong>AI and space are converging.</strong> SpaceX's plans now include AI computing alongside launch and satellite internet. Ground software, data processing, satellite operations and AI infrastructure create roles that look like software jobs as much as aerospace ones.</p>

      <h2>Are space jobs remote?</h2>
      <p>Mostly not, at least the hardware side. Building and testing rockets and satellites happens at specific sites, and many roles require security clearances or citizenship because of export controls. US space and defence work commonly falls under ITAR, the International Traffic in Arms Regulations, which restricts which people can access certain technical data. That makes much of the industry closed to remote candidates abroad by law, not by preference.</p>
      <p>The software side is different. Ground systems, mission planning software, satellite data analytics, internal tools and some AI work can be remote or hybrid, though export rules can still limit eligibility to particular nationalities. Read every listing's location and eligibility lines carefully; our <a href="/tools/remote-job-location-checker">location checker</a> reads the location line, and the <a href="/tools/jd-remote-analyzer">remote job description analyzer</a> flags citizenship and clearance requirements in the full text.</p>

      <h2>How to break into the space industry</h2>
      <ol>
        <li><strong>Transfer adjacent skills.</strong> Embedded systems, real-time software, RF engineering, manufacturing engineering, data engineering and reliability engineering all map directly onto space work.</li>
        <li><strong>Check eligibility first.</strong> If you are not a citizen or permanent resident of the company's country, filter for roles that do not require it before investing time.</li>
        <li><strong>Look beyond the famous names.</strong> Hundreds of suppliers, satellite operators and data companies hire for space-related work, often with more flexibility than the largest players.</li>
        <li><strong>Consider downstream data roles.</strong> Satellite imagery and communications data feed agriculture, insurance, climate and logistics companies, many of which hire remotely.</li>
      </ol>

      <h2>The caution</h2>
      <p>Record listings come at moments of high optimism. SpaceX's valuation assumes rapid growth in satellite internet and AI computing, and some analysts consider it stretched. If investor enthusiasm cools, funding for smaller space companies can tighten quickly, as it did after the 2021 wave of space company listings. Join start-ups with your eyes open: ask about runway, revenue and what happens if the next funding round is delayed. Our <a href="/posts/before-you-accept-a-remote-job-offer">checklist before you accept an offer</a> covers equity questions too.</p>
      <p>Search for engineering roles on the <a href="/jobs">board</a>, each labelled with where it is open.</p>
      <p>For candidates outside the US, the realistic routes into space work are national and regional programmes and companies in their own countries, such as those supporting European, Indian and Japanese launch and satellite efforts, and the growing number of commercial satellite data firms that hire across borders. The skills transfer even where the legal barriers make US roles unavailable.</p>
    `,
    faq: [
      {
        q: "When did SpaceX go public?",
        a: "SpaceX began trading on Nasdaq under the ticker SPCX on 12 June 2026, pricing shares at $135 and raising about $75 billion in the largest IPO on record.",
      },
      {
        q: "How much is SpaceX worth after its IPO?",
        a: "Estimates at pricing were around $1.75 trillion, though analysts disagree; Morningstar put its fair value at about $780 billion.",
      },
      {
        q: "Are space industry jobs remote?",
        a: "Hardware roles are mostly on site and often require citizenship or clearances under export rules such as ITAR. Software, data and ground systems roles are more often remote or hybrid.",
      },
      {
        q: "How can I get a job in the space industry?",
        a: "Transfer adjacent skills such as embedded software, RF, manufacturing, data or reliability engineering, check citizenship requirements first, and look at suppliers and satellite data companies as well as famous names.",
      },
    ],
  },

  {
    slug: "stack-overflow-developer-survey-2026-ai-trust",
    title: "Developers Use AI Agents but Don't Trust Them With Big Decisions",
    description:
      "The 2026 Stack Overflow survey: 65.9% use coding assistants or agents, but only 6.6% would trust AI with important decisions. What it means for developer jobs.",
    date: "2026-11-08T04:09:00.000Z",
    author: "Bhargav",
    tags: ["Stack Overflow Survey", "Software Developers", "AI Coding Tools", "Developer Jobs", "AI Trust"],
    readMinutes: 6,
    html: `
      <p>Software developers have adopted AI faster than almost any other profession, and they are also among its sharpest sceptics. The 2026 Stack Overflow Developer Survey, as reported by technology news site IT Brief, shows both at once: <strong>65.9 percent of respondents use AI coding assistants or agents</strong>, but only <strong>6.6 percent</strong> said they would trust AI output for important decisions.</p>

      <h2>What the survey found</h2>
      <ul>
        <li><strong>Usage is widespread.</strong> 65.9 percent use coding assistants or agents and 62.5 percent use general-purpose chat tools. 26.2 percent use automated agent workflows, and 17.2 percent said they do not use AI tools at all.</li>
        <li><strong>Trust is conditional.</strong> Nearly half trust AI output when they can verify it easily. Only 6.6 percent would trust it for important decisions.</li>
        <li><strong>Attribution matters.</strong> 78.7 percent said it was important or very important to know where AI-generated code or answers came from.</li>
        <li><strong>Search still comes first.</strong> When solving a problem, 83 percent start with online search and 70 percent turn to an AI agent.</li>
        <li><strong>Employers lag.</strong> Only 24 percent said their employer had published approved tools or formal AI guidance; about three in ten said AI use was optional and left to the individual.</li>
      </ul>
      <p>Stack Overflow's chief executive, Prashanth Chandrasekar, framed developers' scepticism as a critical safeguard as agents become more autonomous. The trend is consistent with earlier years: in 2025, only 33 percent of developers said they trusted the accuracy of AI tools, down from 43 percent in 2024.</p>

      <h2>Why developers use tools they do not fully trust</h2>
      <p>Because verification is cheap for many coding tasks. If an AI writes a function, a developer can read it, run the tests and see whether it works. The tool saves time even when it is sometimes wrong, as long as the mistakes are caught. Trust breaks down where verification is hard: architecture decisions, security-sensitive code, subtle performance problems and anything where a mistake surfaces months later.</p>
      <p>That pattern defines what the developer job is becoming. Generating code is getting cheaper. Knowing what to build, specifying it clearly, judging whether the output is correct and owning the consequences is becoming the core of the role.</p>

      <h2>The governance gap is an opportunity</h2>
      <p>With fewer than a quarter of employers providing formal AI guidance, most teams are improvising. That creates demand for people who can set sensible rules: which tools are approved, what code and data can be shared with them, how AI-generated changes are reviewed and how licensing and attribution are handled. Senior engineers, engineering managers and platform teams who take this on are making themselves more valuable, and it is a strong story to tell in interviews.</p>

      <h2>What it means for developer jobs</h2>
      <p>The job market for developers in 2026 is split. Job board Dice reported software development postings down 22 percent in the first quarter while postings with AI in the title rose 173 percent. Junior hiring has weakened most; our analysis of <a href="/posts/is-ai-killing-entry-level-jobs-2026-evidence">the evidence on entry-level jobs</a> explains why AI is one cause among several. Experienced developers who use AI well and review it rigorously remain in demand. Our guide to <a href="/posts/remote-software-engineering-jobs">remote software engineering jobs</a> covers pay, location and seniority on our board.</p>

      <h2>How to make the survey's lessons work for you</h2>
      <ol>
        <li><strong>Get fast at verification.</strong> Strong testing habits, good code reading and debugging skill are what make AI tools productive rather than risky.</li>
        <li><strong>Be explicit about how you use AI.</strong> In interviews, describe where you use it, where you do not and how you check its work. Employers want judgement, not enthusiasm.</li>
        <li><strong>Mind attribution and licensing.</strong> Know your employer's rules on sharing code with AI tools and on the provenance of generated code.</li>
        <li><strong>Stay tool-flexible.</strong> The tools are consolidating and changing ownership, as SpaceX's purchase of Cursor shows. Skills outlast any single editor.</li>
      </ol>

      <h2>Remote developers and AI</h2>
      <p>Remote developers already work in the asynchronous, text-heavy way that AI tools fit best: written tickets, pull requests and design documents. Clear specifications help agents as much as they help distributed colleagues. Developers who can write a precise issue description, review a large change efficiently and document their reasoning are well placed whatever the tools look like next year.</p>
      <p>Browse remote engineering roles on the <a href="/jobs">board</a>, and check how your CV matches a posting with the <a href="/tools/ats-keyword-checker">ATS keyword checker</a>.</p>
    `,
    faq: [
      {
        q: "How many developers use AI tools in 2026?",
        a: "According to reporting on the 2026 Stack Overflow Developer Survey, 65.9 percent use coding assistants or agents, 62.5 percent use chat tools and 17.2 percent use no AI tools.",
      },
      {
        q: "Do developers trust AI-generated code?",
        a: "Conditionally. Nearly half trust AI output when they can verify it easily, but only 6.6 percent would trust it for important decisions.",
      },
      {
        q: "Do employers have AI policies for developers?",
        a: "Most do not yet. Only 24 percent of respondents said their employer had published approved tools or formal AI guidance.",
      },
      {
        q: "How is AI changing software developer jobs?",
        a: "Writing code is getting cheaper, so specifying work clearly, verifying AI output and owning decisions are becoming central. Junior hiring has weakened while experienced developers remain in demand.",
      },
    ],
  },

  {
    slug: "humanoid-robots-factories-2026-jobs",
    title: "Humanoid Robots Are Entering Factories. How Many, and What Jobs Change",
    description:
      "Figure's robots ran shifts at BMW while Tesla's Optimus remains largely unproven. How far humanoid robots have really got in 2026, and the jobs around them.",
    date: "2026-11-08T04:12:00.000Z",
    author: "Bhargav",
    tags: ["Humanoid Robots", "Robotics Jobs", "Automation", "Manufacturing", "Future of Work"],
    readMinutes: 6,
    html: `
      <p>Humanoid robots were one of the most hyped technologies of 2026. The reality on factory floors is more modest, and more interesting for anyone thinking about robotics careers. By most counts, fewer than a few thousand humanoid robots are working in factories worldwide, almost all under close human supervision. But the deployments that exist are real, and they are creating jobs as well as changing them.</p>

      <h2>Where humanoid robots actually are</h2>
      <p><strong>Figure at BMW.</strong> The best-documented deployment is Figure's at BMW's plant in Spartanburg, South Carolina. According to reporting on the deployment, Figure 02 robots worked roughly 11 months there on 10-hour shifts, accumulating more than 1,250 hours of runtime. Figure has also claimed its robots contributed to the assembly of over 30,000 vehicles, a figure that comes from the company's own data. Figure says it is building manufacturing capacity for up to 12,000 humanoid robots a year.</p>
      <p><strong>Tesla's Optimus.</strong> Tesla has made ambitious claims, but evidence of large-scale use is thin. Elon Musk said on Tesla's fourth-quarter 2025 earnings call that Optimus was not yet in use in the company's factories "in a material way", and a mid-2026 review of public evidence found no confirmed production count. Treat headline numbers about Optimus with caution until Tesla publishes verifiable figures.</p>
      <p><strong>Others.</strong> Agility Robotics, Apptronik and several Chinese manufacturers have pilots in logistics and manufacturing, and price competition among Chinese makers is pushing costs down.</p>

      <h2>Why humanoids, and why so slowly</h2>
      <p>The appeal of the humanoid shape is that factories and warehouses are designed for human bodies, so a robot with arms, legs and hands can in principle use existing stations without rebuilding the line. The challenges are reliability, speed, safety around people and cost. A robot that works 95 percent of the time still needs someone nearby for the other 5 percent, and in a factory a 5 percent failure rate is enormous.</p>
      <p>That is why every serious deployment so far is supervised. As one industry analysis put it, humanoid deployment is not a plan to reduce headcount to zero: people supervise the robots, handle exceptions and take over in unfamiliar situations.</p>

      <h2>The jobs humanoid robots create</h2>
      <ul>
        <li><strong>Robot operators and technicians</strong> who supervise fleets, handle exceptions, perform maintenance and swap batteries. These are on-site roles, often filled by experienced production workers who are retrained.</li>
        <li><strong>Robotics engineers</strong> in mechanical, electrical and controls engineering, mostly at the robot makers.</li>
        <li><strong>AI and software engineers</strong> working on perception, motion planning and the models that teach robots new tasks. Much of this can be done remotely or in a hybrid way, though testing requires hardware access.</li>
        <li><strong>Data and teleoperation roles</strong> in which people demonstrate tasks, sometimes remotely through teleoperation rigs, to generate training data.</li>
        <li><strong>Integration and deployment specialists</strong> who fit robots into existing production lines and safety processes.</li>
      </ul>

      <h2>The jobs that change</h2>
      <p>The first tasks given to humanoids are repetitive, physically demanding and often unpleasant: moving parts between stations, loading and unloading, simple assembly steps. Workers in those roles are the most exposed in the long run. In the short run, deployments are small enough that the effect on overall factory employment is negligible, and many manufacturers face labour shortages that make them want automation for roles they cannot fill.</p>

      <h2>Robotics careers for remote workers</h2>
      <p>Robotics is mostly an on-site industry, but software-heavy roles are increasingly distributed. Simulation engineers, machine learning engineers working on robot learning, fleet management software developers and data engineers can often work remotely, coming on site periodically for testing. If you work in software and want to move toward robotics, simulation and ML are the most common entry points. Our article on <a href="/posts/ai-machine-learning-jobs-up-91-percent-2026">AI and machine learning job growth</a> covers the broader demand.</p>

      <h2>What to watch</h2>
      <p>Three things will tell you whether humanoids are scaling: published deployment counts from manufacturers rather than robot makers, uptime and productivity data from independent sources, and falling unit prices. Until all three appear, expect robotics hiring to grow steadily at robot makers and integrators, and factory jobs to change gradually rather than suddenly. Search for engineering and operations roles on the <a href="/jobs">board</a>, and use the <a href="/tools/job-title-finder">job title finder</a> to see which robotics titles employers use.</p>
      <p>If you are already in manufacturing, the most valuable step is to get involved in any automation project at your plant. Workers who understand both the production process and the robots become the operators, trainers and leads that every deployment needs, and those roles typically pay more than the line work they replace.</p>
    `,
    faq: [
      {
        q: "How many humanoid robots are working in factories in 2026?",
        a: "Relatively few, by most counts in the low thousands worldwide, almost all supervised by people. Figure's deployment at BMW is the best documented.",
      },
      {
        q: "Is Tesla's Optimus robot working in factories?",
        a: "Evidence is thin. Elon Musk said on Tesla's fourth-quarter 2025 call that Optimus was not yet in material use in its factories, and Tesla has not published a verified production count.",
      },
      {
        q: "Will humanoid robots replace factory workers?",
        a: "In the long run they may take over repetitive, physical tasks, but current deployments are small and supervised, and they create operator, technician and engineering jobs.",
      },
      {
        q: "Can robotics jobs be remote?",
        a: "Hardware and operations roles are on site, but simulation, machine learning, fleet software and data roles are increasingly remote or hybrid with periodic on-site testing.",
      },
    ],
  },

  {
    slug: "upwork-fiverr-q3-2026-freelance-market-ai",
    title: "Upwork and Fiverr Shrink as AI Eats Simple Gigs. Where Freelancers Win",
    description:
      "Upwork's revenue fell 8% and Fiverr's 15.8% in Q3 2026 as AI automated low-complexity freelance work, while AI-related projects grew. What it means.",
    date: "2026-11-08T04:15:00.000Z",
    author: "Bhargav",
    tags: ["Freelancing", "Upwork", "Fiverr", "AI and Jobs", "Contract Work"],
    readMinutes: 6,
    html: `
      <p>The two best-known freelance marketplaces reported their third-quarter 2026 results within a week of each other, and they told the same story. <strong>Upwork's revenue fell 8 percent</strong> year on year to $185.6 million, with gross services volume, the total value of work done through the platform, down 10.1 percent to $914.1 million. <strong>Fiverr's revenue fell 15.8 percent</strong> to $90.9 million. Both companies pointed to the same cause: AI is automating the simplest freelance tasks faster than expected, while demand for complex and AI-related work grows.</p>

      <h2>What the companies reported</h2>
      <ul>
        <li><strong>Upwork</strong> (reported 2 November) beat its own guidance despite the decline, and its shares rose. Chief executive Hayden Brown emphasised a shift toward higher-value, more complex work and larger clients, and pointed to a notable expansion of AI projects on the platform. Company materials acknowledged that low-complexity assignments were being automated faster than Upwork had expected. Staffing Industry Analysts reported that Upwork also acquired WorkMotion, an employer-of-record provider, extending its reach into full-time international hiring.</li>
        <li><strong>Fiverr</strong> (reported 29 October) saw the decline concentrated in its core marketplace. In the previous quarter, it had tied a 10 percent revenue drop to AI adoption eroding demand for low-value, transactional gigs.</li>
      </ul>

      <h2>Which freelance work is shrinking</h2>
      <p>The work disappearing fastest is the kind AI tools now do in seconds: short blog posts and product descriptions, simple logo variations, basic translations, transcription, data entry, simple scripts and templated designs. Clients who once paid a freelancer $50 for a quick job now do it themselves with an AI tool, or skip it.</p>

      <h2>Which freelance work is growing</h2>
      <ul>
        <li><strong>AI-related projects:</strong> building AI features, integrating models into products, automating workflows and evaluating AI output. Upwork's AI category has been one of its fastest-growing.</li>
        <li><strong>AI training and evaluation:</strong> specialist work grading and writing training data for AI companies, which can pay well for scarce expertise. Our article on <a href="/posts/ai-trainer-gig-economy-2026-pay">the AI trainer gig economy</a> covers rates and risks.</li>
        <li><strong>Complex, accountable work:</strong> projects where a client needs judgement, domain expertise and someone responsible for the result, such as strategy, specialist engineering, regulated content and long-term retainer relationships.</li>
      </ul>

      <h2>What it means for freelancers</h2>
      <ol>
        <li><strong>Move up the complexity curve.</strong> If your main offer is something AI can now produce adequately, repackage it as a higher-value service that includes judgement, strategy or accountability.</li>
        <li><strong>Use AI to deliver faster, and price on value.</strong> Clients care about outcomes. If AI lets you deliver in half the time, price the result, not the hours.</li>
        <li><strong>Build direct relationships.</strong> Marketplaces take a cut and face shrinking volume. Repeat clients and referrals are more resilient. When you invoice clients abroad directly, our guide to <a href="/posts/how-to-invoice-international-clients">invoicing international clients</a> and the free <a href="/tools/contractor-invoice-generator">invoice generator</a> help.</li>
        <li><strong>Price properly.</strong> Freelancers often undercharge relative to the salary they could earn. The <a href="/tools/freelance-rate-calculator">freelance rate calculator</a> shows the day rate that matches a target salary once unbillable time and costs are included.</li>
      </ol>

      <h2>Freelancing versus remote employment</h2>
      <p>Upwork's move into employer-of-record services is telling. Companies that once hired freelancers for one-off tasks increasingly want ongoing, accountable contributors, and some are converting freelance relationships into remote employment through employers of record. For many freelancers, a full-time remote role with a company that hires internationally now offers more stability than marketplace gigs. Our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a> compares the arrangements.</p>

      <h2>The bigger picture</h2>
      <p>The freelance platforms are an early, visible signal of how AI changes work: the simplest, most transactional tasks are automated first, and value moves toward complexity, expertise and trust. The same pattern is playing out more slowly inside companies. Our coverage of <a href="/posts/ai-layoffs-october-2026-challenger-report">AI-attributed layoffs</a> shows how gradual that process has been in employment data.</p>
      <p>Looking for something steadier? Browse remote roles, including contract and part-time positions, on the <a href="/jobs">board</a>, each linking to the employer's own application page.</p>
      <p>A practical test for any freelance offer: ask whether a client could get an acceptable version from an AI tool in ten minutes. If the answer is yes, that service will keep getting cheaper. If the answer is no, because the work needs context, judgement, original research, accountability or a relationship, it is the part of your offer to build around and to raise prices on. Most freelancers find they already do some of that work and simply do not charge for it separately.</p>
    `,
    faq: [
      {
        q: "Is freelancing declining because of AI?",
        a: "Simple freelance work is. Upwork's third-quarter 2026 revenue fell 8 percent and Fiverr's 15.8 percent, with both pointing to AI automating low-complexity tasks, while AI-related and complex work grew.",
      },
      {
        q: "What freelance work is growing in 2026?",
        a: "AI-related projects such as building features and automating workflows, AI training and evaluation by specialists, and complex work that needs judgement, expertise and accountability.",
      },
      {
        q: "How can freelancers compete with AI?",
        a: "Move toward higher-complexity services, use AI to deliver faster while pricing on value, build direct client relationships and price properly using a realistic rate calculation.",
      },
      {
        q: "Did Upwork buy an employer of record?",
        a: "Yes. Staffing Industry Analysts reported that Upwork acquired WorkMotion, an employer-of-record provider, extending into full-time international hiring.",
      },
    ],
  },

  {
    slug: "semiconductor-talent-shortage-2026-chip-jobs",
    title: "America's Chip Factories Need 157,000 More Workers. Who Gets the Jobs",
    description:
      "Industry research projects a US shortage of up to 157,000 semiconductor workers by 2030 as fabs rise in Arizona and Ohio. The jobs, the training and the catch.",
    date: "2026-11-08T04:18:00.000Z",
    author: "Bhargav",
    tags: ["Semiconductor Jobs", "Chip Industry", "Manufacturing Jobs", "Engineering Careers", "Skills Gap"],
    readMinutes: 6,
    html: `
      <p>The United States is building chip factories faster than it is training people to run them. A report from consultancy McKinsey and the SEMI Foundation, the education arm of the semiconductor industry association, estimates a shortage of as many as <strong>157,000 semiconductor workers by 2030</strong>. Bloomberg reported that TSMC's planned investment of roughly $265 billion across its Arizona plants is among the projects exposed to the gap.</p>

      <h2>Where the shortage bites</h2>
      <ul>
        <li><strong>Arizona:</strong> The Arizona Technology Council projected a shortfall of 1,200 to 1,500 qualified technicians and engineers in the Phoenix area by the end of 2026. A July 2026 report with the Arizona Board of Regents projected a much larger statewide gap over the coming years.</li>
        <li><strong>TSMC</strong> is recruiting for roughly 6,000 positions across its first three Arizona fabs, and has reportedly brought forward its most advanced fab there to 2027.</li>
        <li><strong>Intel's</strong> Ocotillo campus in Chandler employs more than 12,000 people, and local reporting describes an arms race for talent between the two companies.</li>
      </ul>
      <p>Estimates vary considerably by source and method; one outlet put the gap at 67,000 unfilled jobs out of 115,000 new positions by 2030. The direction is consistent, even if the exact number is not.</p>

      <h2>The jobs chip factories need</h2>
      <p><strong>Technicians</strong> are the largest group: equipment technicians, process technicians and maintenance technicians who keep the machines running around the clock. Many of these roles need a two-year degree or a short certificate rather than a bachelor's degree, and pay well above typical manufacturing wages.</p>
      <p><strong>Engineers</strong> in process, equipment, yield, quality and facilities engineering, typically with degrees in electrical, chemical, materials or mechanical engineering.</p>
      <p><strong>Construction and facilities trades</strong>, from electricians to pipefitters, to build the fabs and keep the ultra-clean environments running.</p>
      <p><strong>Software and data roles</strong>, including manufacturing execution systems, yield analytics, automation and the AI models increasingly used to spot defects and optimise processes.</p>

      <h2>The training response</h2>
      <p>Community colleges are expanding programmes quickly. Rio Salado College in Arizona opened a free 12-week semiconductor programme to the public after consulting with TSMC and Intel, and Intel has committed $50 million to scholarships in Ohio, where it is building fabs. Many programmes are designed to move people from other fields, such as military technicians, automotive mechanics and general manufacturing workers, into fab roles within months.</p>
      <p>The industry also has a demographic problem. Data from labour-market analytics firm Lightcast, cited in early 2026, indicated that nearly 80 percent of workers who left manufacturing since 2021 were over 55. Experienced people are retiring faster than new ones are arriving.</p>

      <h2>Are chip jobs remote?</h2>
      <p>The core jobs are not. Technicians, process engineers and facilities staff work in the fab, often on shift patterns. Some engineering and most software and data roles can be hybrid, and chip design, as opposed to manufacturing, has a long history of distributed teams. Export controls and security rules can limit eligibility for some roles to particular nationalities, so check the requirements in each listing; the <a href="/tools/jd-remote-analyzer">remote job description analyzer</a> flags citizenship and location clauses.</p>

      <h2>Should you consider a chip career?</h2>
      <p>For people willing to relocate to Arizona, Ohio, Texas, New York or Oregon, semiconductor manufacturing offers something rare in 2026: strong demand for technicians without a four-year degree, structured training paid for by employers, and pay that rises with experience. For software and data professionals, yield analytics and manufacturing AI are growing niches that combine technical work with physical-world impact.</p>
      <p>The caution is that the industry is cyclical. Chip demand has boom and bust cycles, and subsidy-driven factory plans can be delayed when markets soften. Ask about training commitments, shift patterns and what happens if a fab's start date slips.</p>
      <p>For remote alternatives in engineering and data, browse the <a href="/jobs">board</a>, or compare fields in the <a href="/tools/remote-field-explorer">remote field explorer</a>. Our article on <a href="/posts/big-tech-ai-capex-2026-jobs-data-centers">AI infrastructure spending</a> covers the related boom in data centre jobs, which draws on many of the same trades and technician skills.</p>
      <p>For people outside the US, the shortage is global. Taiwan, South Korea, Japan, Germany and Singapore all report difficulty hiring fab technicians and engineers, and several run their own training and relocation programmes. If you have relevant experience and are open to moving, semiconductor manufacturing is one of the industries most willing to sponsor international hires for hands-on roles.</p>
    `,
    faq: [
      {
        q: "Is there a shortage of semiconductor workers?",
        a: "Yes. A McKinsey and SEMI Foundation report estimates a US shortage of as many as 157,000 semiconductor workers by 2030 as new fabs are built.",
      },
      {
        q: "What jobs do chip factories need most?",
        a: "Equipment, process and maintenance technicians are the largest group, followed by process, yield and facilities engineers, construction trades, and software and data specialists.",
      },
      {
        q: "Do you need a degree to work in a chip factory?",
        a: "Not always. Many technician roles need a two-year degree or a short certificate, and community colleges offer programmes such as Rio Salado College's free 12-week course in Arizona.",
      },
      {
        q: "Are semiconductor jobs remote?",
        a: "Manufacturing roles are on site, often in shifts. Some engineering roles are hybrid, chip design and software roles can be more flexible, and export rules can limit eligibility.",
      },
    ],
  },

  {
    slug: "ai-trainer-gig-economy-2026-pay",
    title: "Experts Are Training AI for Up to $400 an Hour. Is It Worth It?",
    description:
      "AI companies pay experts to write and grade training data, with Mercor averaging about $110 an hour. The pay, the lawsuits and how to judge the work.",
    date: "2026-11-08T04:21:00.000Z",
    author: "Bhargav",
    tags: ["AI Trainer", "Gig Economy", "Remote Contract Work", "AI Jobs", "Freelancing"],
    readMinutes: 6,
    html: `
      <p>One of the fastest-growing kinds of remote work in 2026 involves teaching AI models. Companies such as Mercor, Surge AI, Scale AI and Handshake pay contractors to write questions and answers, grade model responses and judge which output is better, so that models get better at law, medicine, coding and hundreds of other subjects. Bloomberg reported in October 2026 that average pay at Mercor had reached about <strong>$110 an hour</strong>, and that recruiters were seeking civil rights attorneys at $400 an hour and condensed matter physicists at $170.</p>
      <p>Those headline rates are real for some people. They are not typical for everyone, and the work comes with risks worth understanding before you sign up.</p>

      <h2>How the work pays</h2>
      <ul>
        <li><strong>Specialist experts</strong> with verifiable credentials, such as lawyers, physicians, PhD scientists and senior engineers, command the highest rates, from around $100 to several hundred dollars an hour for scarce expertise.</li>
        <li><strong>Skilled generalists</strong> such as strong writers, coders and people with professional experience in a field earn mid-range rates.</li>
        <li><strong>Entry-level data work</strong> pays much less. Mercor's own guide puts the national average for freelance AI trainers at about $31 an hour and entry-level data work at $12 to $25.</li>
      </ul>
      <p>Bloomberg noted that Mercor did not have data on what share of tasks pay its average rate, which matters: an average can be pulled up by a small number of very high-paid specialists.</p>

      <h2>How big the market is</h2>
      <p>Reports put Mercor's payouts to contractors at more than $2 million a day in 2026, up from about $1.5 million a day in October 2025. Surge AI was reported to have reached a run rate of about $1.4 billion in late 2025 with roughly 50,000 expert contractors and a staff of around 110. Job board Dice listed AI trainers among the fastest-growing tech titles in October 2026, as our article on <a href="/posts/ai-machine-learning-jobs-up-91-percent-2026">AI job growth</a> notes.</p>

      <h2>The risks</h2>
      <ul>
        <li><strong>Instability.</strong> Projects can end without warning when an AI company's needs change, and hours fluctuate. This is gig work, not a job.</li>
        <li><strong>Pay cuts.</strong> Business Insider reported that workers on one labelling project had their pay cut from $21 to $16 an hour in late 2025, a 24 percent reduction.</li>
        <li><strong>Legal disputes.</strong> According to the New York Times, contractors have sued Handshake, Scale AI, Surge AI and other data-training firms over alleged misclassification as contractors and underpayment.</li>
        <li><strong>Working yourself out of a job.</strong> Some contractors train models on the very tasks that make up their profession. Coverage this year asked plainly whether the work helps AI replace the people doing it.</li>
        <li><strong>Scams.</strong> Fake "AI training" offers that ask for fees or personal data are common. Legitimate platforms do not charge you to work. The <a href="/tools/fake-job-checker">fake job checker</a> reviews an offer for warning signs.</li>
      </ul>

      <h2>How to judge an AI training opportunity</h2>
      <ol>
        <li><strong>Check the effective hourly rate.</strong> Some tasks pay per item; time a few to see what you really earn, including unpaid onboarding and assessments.</li>
        <li><strong>Read the contract.</strong> Note payment terms, how quality disputes are handled, confidentiality obligations and whether you can work for competing platforms.</li>
        <li><strong>Treat it as a supplement.</strong> For most people it works best as part-time income alongside a stable role, not as a replacement for one.</li>
        <li><strong>Mind your taxes.</strong> As a contractor you are responsible for your own taxes and, abroad, possibly for invoicing. Our guide to <a href="/posts/how-to-invoice-international-clients">invoicing international clients</a> covers the paperwork.</li>
      </ol>

      <h2>Who should consider it</h2>
      <p>The work suits professionals with deep expertise who want flexible, remote income, people between jobs who can bring real skill to tasks, and those curious about how AI models are built, which is useful background for AI careers. It suits less well anyone who needs predictable income or benefits. For steadier remote work, our guide to <a href="/posts/best-remote-jobs-without-tech-background-2026">remote jobs without a tech background</a> covers full-time options, and the <a href="/jobs">board</a> lists remote roles open now, with each one labelled by the countries it is open to.</p>
      <p>One more consideration is confidentiality. AI training projects often involve unreleased models and strict non-disclosure agreements, which can limit what you can put on a CV or talk about in interviews. Before you start, check what you will be allowed to say about the work, so that the experience can still count toward your career even if the project details cannot be shared.</p>
    `,
    faq: [
      {
        q: "How much do AI trainers get paid?",
        a: "It varies widely. Bloomberg reported Mercor's average at about $110 an hour in October 2026, with specialists such as attorneys sought at up to $400, while Mercor's own guide puts the general average near $31 an hour.",
      },
      {
        q: "Is AI training work legitimate?",
        a: "On established platforms, yes, but it is contract gig work with unstable hours, and some firms face lawsuits over contractor classification. Never pay fees to get AI training work.",
      },
      {
        q: "Who can become an AI trainer?",
        a: "Anyone with relevant expertise can apply, but the best-paid work goes to people with verifiable credentials such as lawyers, physicians, scientists and senior engineers.",
      },
      {
        q: "Is AI trainer work a good full-time job?",
        a: "For most people it works better as supplementary income, because projects can end abruptly, pay can change and contractors usually receive no benefits.",
      },
    ],
  },

  {
    slug: "remote-job-postings-share-2026-data",
    title: "Remote Jobs Are 9% of Postings but Draw 37% of Applications",
    description:
      "LinkedIn data shows remote roles are about 9% of US paid postings but attract 37% of applications. What the 2026 remote job data says and how to compete.",
    date: "2026-11-08T04:24:00.000Z",
    author: "Bhargav",
    tags: ["Remote Job Statistics", "Remote Work Data", "Job Search", "LinkedIn", "Indeed"],
    readMinutes: 6,
    html: `
      <p>If remote job hunting feels unusually competitive, the data explains why. According to LinkedIn's Economic Graph research for March 2026, <strong>remote roles made up about 9 percent of US paid job postings but drew 37 percent of applications</strong>. Hybrid roles made up another 11 percent. Supply of remote work is limited; demand for it is enormous.</p>

      <h2>What the 2026 data shows</h2>
      <ul>
        <li><strong>LinkedIn:</strong> about 20 percent of US paid postings offered remote (9 percent) or hybrid (11 percent) work in March 2026, roughly flat on a year earlier. A month earlier the combined share was 22 percent.</li>
        <li><strong>Indeed:</strong> its Hiring Lab series, which counts postings mentioning remote or hybrid work, put the US share at about 8.4 percent at the end of August 2026, according to a summary of the data, up slightly from 8.2 percent a year earlier and below the peak of 10.5 percent in February 2022. Searches for remote or hybrid work rose to 7.9 percent of searches, from 6.8 percent.</li>
        <li><strong>Fully remote only:</strong> analyses based on Robert Half data put fully remote roles at around 3 to 4 percent of postings in the first half of 2026.</li>
      </ul>
      <p>The sources measure different things, which is why the numbers differ. LinkedIn counts paid postings on its own platform; Indeed counts ads that mention remote or hybrid terms; other analyses count only fully remote roles. They also disagree on the trend, with some showing a dip and others a rise during 2026. What they agree on is the imbalance: remote work is a small share of jobs and a large share of what people want.</p>

      <h2>Why remote roles are so competitive</h2>
      <p>A remote role open across a whole country draws applicants from every region, not one city. A role open worldwide draws them from everywhere. On our own board, only about 2 percent of remote listings can be done from anywhere in the world; the rest name a country or region. Each worldwide listing therefore attracts a global applicant pool. Return-to-office mandates add to the pressure by pushing experienced workers into the remote market; our article on <a href="/posts/return-to-office-mandates-2026-remote-jobs">2026 return-to-office mandates</a> covers who ordered staff back.</p>

      <h2>How to compete for remote roles</h2>
      <ol>
        <li><strong>Apply where you are eligible.</strong> Many applications to remote roles are wasted on listings closed to the applicant's country. The <a href="/tools/remote-job-location-checker">location checker</a> tells you whether a listing is open where you live, and our guide to <a href="/posts/remote-job-region-labels-explained">region labels like EMEA and LATAM</a> explains the common ones.</li>
        <li><strong>Apply early.</strong> With so many applicants, early applications are more likely to be read. Our guide to <a href="/posts/the-date-posted-problem-why-freshness-matters">why freshness matters</a> explains the effect.</li>
        <li><strong>Tailor, do not spray.</strong> A tailored application that shows remote experience, clear writing and a direct match to the role stands out in a pile of generic ones. Our <a href="/posts/remote-job-resume-tips">resume guide</a> and <a href="/posts/how-to-write-a-remote-job-cover-letter">cover letter guide</a> cover what to change.</li>
        <li><strong>Consider hybrid.</strong> Hybrid roles are more plentiful and less contested. If you live near an employer's office, a hybrid role can be a good bridge.</li>
        <li><strong>Target remote-first employers.</strong> Companies that have been distributed for years hire remotely as a matter of course; the <a href="/tools/company-remote-score">company remote score</a> shows how many of an employer's current listings are truly remote.</li>
      </ol>

      <h2>Which fields have the most remote roles</h2>
      <p>Software engineering, data, sales, customer support and success, and marketing account for most remote listings on our board, with infrastructure roles such as DevOps and site reliability engineering unusually likely to be open across regions. The <a href="/tools/remote-field-explorer">remote field explorer</a> shows the current split by field, region and seniority, recounted every night.</p>

      <h2>The outlook</h2>
      <p>Remote work settled into a stable minority of jobs after the pandemic and has stayed there through 2026, despite headline mandates. Demand continues to outstrip supply, so competition is unlikely to ease soon. The candidates who do best are those who apply narrowly to roles they qualify for and can legally take, early, with applications tailored to show they can work well without being in the room. Browse the <a href="/jobs">full board</a> or the <a href="/jobs?scope=worldwide">work-from-anywhere roles</a>.</p>
      <p>One last point: remote applications are not only more numerous, they are often less tailored, because applying to remote roles feels low-cost. That is good news for careful candidates. Recruiters screening hundreds of generic applications notice the few that clearly match the role, explain why the candidate fits and confirm they can work from the required location. Precision is a competitive advantage precisely because so few applicants use it.</p>
    `,
    faq: [
      {
        q: "What percentage of jobs are remote in 2026?",
        a: "It depends on the source. LinkedIn put remote at about 9 percent and hybrid at 11 percent of US paid postings in March 2026; Indeed's measure of postings mentioning remote or hybrid was about 8.4 percent in August.",
      },
      {
        q: "Why are remote jobs so competitive?",
        a: "Because demand far exceeds supply. LinkedIn found remote roles were about 9 percent of postings but drew 37 percent of applications, and each remote role attracts applicants from a wide area.",
      },
      {
        q: "Are remote jobs declining in 2026?",
        a: "Sources disagree on the direction, but most show remote and hybrid work holding as a stable minority of postings, below the 2022 peak.",
      },
      {
        q: "How can I improve my chances of getting a remote job?",
        a: "Apply only where you are eligible, apply early, tailor each application, consider hybrid roles near you and target employers with a long remote history.",
      },
    ],
  },

  {
    slug: "anthropic-economic-index-2026-ai-work-automation",
    title: "How People Really Use AI at Work: Augment More Than Automate, for Now",
    description:
      "Anthropic's Economic Index found people used AI to augment their work in 53% of conversations, while automated business uses like sales outreach doubled.",
    date: "2026-11-08T04:27:00.000Z",
    author: "Bhargav",
    tags: ["AI and Work", "Automation", "Anthropic", "Future of Work", "AI Research"],
    readMinutes: 6,
    html: `
      <p>Most debate about AI and jobs relies on predictions. Anthropic, the company behind the Claude models, publishes something rarer: data on how people actually use AI, mapped to the tasks in the US government's occupational database. Its <strong>Anthropic Economic Index</strong> reports from 2026 suggest that, on its consumer product, people still use AI more to <em>augment</em> their work than to <em>automate</em> it, but that fully automated business uses are growing fast in particular areas.</p>

      <h2>What the reports found</h2>
      <ul>
        <li><strong>Augmentation edges ahead.</strong> In the report published on 24 March 2026, covering February data, augmentation, where a person works with the AI iteratively, made up 53 percent of conversations on Claude.ai, up from 52 percent in November 2025. In the January report, augmentation had returned to being more common than automation after automation briefly led.</li>
        <li><strong>Use is spreading across more tasks.</strong> The ten most common tasks fell from 24 percent of conversations to 19 percent, meaning people are using AI for a wider range of work.</li>
        <li><strong>Businesses automate more.</strong> On the developer API, which companies use to build AI into their own products, automation is more common. Two workflow categories at least doubled their share: sales and outreach automation, and automated trading operations.</li>
        <li><strong>Longer tasks are harder.</strong> The January report found Claude's success rate falls as the time a human would need for a task increases. Short, well-defined tasks are where AI is most reliable.</li>
        <li><strong>Some occupations are heavily covered.</strong> For a few occupations, such as data entry keyers and database architects, the January report found Claude showed proficiency across large parts of the job.</li>
      </ul>

      <h2>Why the distinction matters for jobs</h2>
      <p>Augmentation and automation affect workers very differently. When AI augments, a person stays in the loop, working faster or better, and the job changes rather than disappears. When AI automates, a task happens without a person, and if enough of a role's tasks are automated, the role itself shrinks. The March report linked the growth in API automation, such as sales outreach, to occupations where a human is largely absent from individual interactions, which it associated with more imminent exposure in the labour market.</p>
      <p>That points to where change is likely to come first: high-volume, repetitive interactions such as outbound sales emails, first-line support responses, routine data processing and simple trading operations. It also explains why employment data has so far shown modest effects. Anthropic's labour market research found no systematic increase in unemployment for workers in highly AI-exposed occupations since late 2022, a finding consistent with other studies we have covered, including <a href="/posts/bank-of-england-ai-productivity-jobs-uk-2026">the Bank of England's research</a>.</p>

      <h2>Limits of the data</h2>
      <p>The index covers one company's products, so it reflects how Claude users work, which may differ from users of other tools. Conversation data shows what people ask AI to do, not whether the result was used or replaced any work. And it is published by a company with an interest in how AI's effects are perceived. It is still among the most detailed public evidence on real AI use at work, and it is consistent with outside research showing gradual, uneven effects.</p>

      <h2>What it means for your career</h2>
      <ol>
        <li><strong>Find the augmentation in your job.</strong> Tasks where you and an AI iterate together, such as drafting, analysing and reviewing, make you more productive. Get good at them.</li>
        <li><strong>Watch the automatable edges.</strong> If much of your role is short, repetitive, well-defined digital tasks, like templated outreach or data entry, expect those tasks to shrink, and build skills in the parts that need judgement and relationships.</li>
        <li><strong>Take on longer, messier work.</strong> AI struggles more as tasks lengthen and become ambiguous. Owning complex, multi-step outcomes is relatively protected.</li>
        <li><strong>Show it.</strong> Employers increasingly ask how candidates use AI. A clear example of augmenting your own work is a strong answer; our article on <a href="/posts/ai-skills-required-tech-jobs-75-percent-2026">AI skills in job postings</a> covers how to present it.</li>
      </ol>
      <p>Explore which fields are hiring remotely in the <a href="/tools/remote-field-explorer">remote field explorer</a>, or browse roles on the <a href="/jobs">board</a>.</p>
      <p>Employers can use the same lens. When deciding where to deploy AI, the tasks that suit full automation are narrow, repetitive and easy to check, while the larger gains often come from augmenting skilled staff on complex work. Companies that approach AI as a way to make their people more capable, rather than only to remove tasks, are also the ones most likely to keep hiring for the roles that remain.</p>
    `,
    faq: [
      {
        q: "What is the Anthropic Economic Index?",
        a: "A series of reports from Anthropic analysing how people use its Claude models, mapped to tasks in the US occupational database, to track AI's effects on work.",
      },
      {
        q: "Do people use AI to automate or augment their work?",
        a: "On Claude.ai, augmentation was slightly more common, at 53 percent of conversations in February 2026. Automation is more common in business API use, especially sales outreach and trading operations.",
      },
      {
        q: "Which jobs are most exposed to AI automation?",
        a: "Roles built on short, repetitive digital tasks with little human interaction, such as data entry, templated sales outreach and routine processing, according to the index's findings.",
      },
      {
        q: "Has AI increased unemployment in exposed occupations?",
        a: "Anthropic's labour market research found no systematic increase in unemployment for workers in highly AI-exposed occupations since late 2022.",
      },
    ],
  },
];
