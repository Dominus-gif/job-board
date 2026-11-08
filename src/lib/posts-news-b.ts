/**
 * News cluster B: regulation, hiring technology and workplace policy, autumn
 * 2026. Written 8 November 2026. Sources are named in each article; legal
 * items are general information and flag where status is contested.
 */
import type { Post } from "./posts";

export const POSTS_NEWS_B: Post[] = [
  {
    slug: "eu-ai-act-high-risk-delay-hiring-2027",
    title: "The EU Delayed Its AI Hiring Rules to 2027. What Still Applies",
    description:
      "EU lawmakers agreed to push the AI Act's high-risk rules, which cover AI used in hiring, from August 2026 to December 2027. What changed and what did not.",
    date: "2026-11-08T03:00:00.000Z",
    author: "Bhargav",
    tags: ["EU AI Act", "AI in Hiring", "AI Regulation", "Europe Jobs", "Employment Law"],
    readMinutes: 6,
    html: `
      <p>The European Union's AI Act treats artificial intelligence used to recruit, screen and evaluate workers as "high risk", which brings strict obligations for the companies that build and use it. Those obligations were due to apply from 2 August 2026. They will not. In May 2026, negotiators from the European Parliament and the Council reached a provisional agreement on a package of amendments, known as the Digital Omnibus on AI, that moves the deadline for most high-risk systems to <strong>2 December 2027</strong>.</p>
      <p>For job seekers in Europe, and for anyone applying to European employers, the change affects how quickly the rules on AI screening tools will bite. This is general information, not legal advice.</p>

      <h2>What changed</h2>
      <ul>
        <li><strong>Stand-alone high-risk systems</strong>, the category that includes AI used for recruitment, selection, promotion and termination decisions, move from 2 August 2026 to 2 December 2027, according to client alerts from law firms including Gibson Dunn and Hogan Lovells.</li>
        <li><strong>High-risk AI built into regulated products</strong>, such as machinery or medical devices, moves from 2 August 2027 to 2 August 2028.</li>
        <li><strong>The rulebook itself stays.</strong> Commentators stressed that the omnibus delays dates rather than removing obligations. One industry headline summarised it as Brussels delaying high-risk AI rules, not the rulebook.</li>
      </ul>
      <p>Law firm alerts in May expected formal adoption and publication in the EU's Official Journal before 2 August. Later commentary describes the delay as agreed, but readers who need certainty should confirm the final text on the EU's official legal database.</p>

      <h2>What did not change</h2>
      <p>Transparency obligations under Article 50 of the Act were not postponed and apply from 2 August 2026. These cover, among other things, telling people when they are interacting with an AI system and labelling some AI-generated content. The bans on prohibited practices, such as using AI to infer emotions in the workplace in most circumstances, have applied since February 2025.</p>
      <p>The General Data Protection Regulation also continues to apply in full. Its rules on solely automated decisions with significant effects, which include many hiring decisions, already give candidates the right to human involvement and an explanation in many cases.</p>

      <h2>What it means for candidates</h2>
      <p><strong>AI screening will keep spreading before the strictest rules apply.</strong> Employers and vendors now have another 16 months before the full set of high-risk obligations, such as risk management, data quality controls, human oversight and logging, become mandatory. Expect more AI in sourcing, screening and first-round interviews in the meantime.</p>
      <p><strong>You still have rights today.</strong> Under GDPR, you can ask an employer whether automated decision-making was used in your application and request human review of a solely automated decision. You can also make a data subject access request to see what was recorded about you.</p>
      <p><strong>Transparency is arriving now.</strong> From August 2026, you should increasingly be told when you are dealing with an AI system, for example an AI interviewer or chatbot recruiter.</p>

      <h2>Why the EU delayed</h2>
      <p>Companies and several member states argued that the technical standards needed to comply were not ready and that the original timetable would put European firms at a disadvantage. Critics, including digital rights groups quoted in policy press, argued that the delay lets high-risk systems operate without oversight for longer. Both points have some force: standards bodies were behind schedule, and AI hiring tools are already in wide use.</p>

      <h2>What it means for employers hiring in Europe</h2>
      <p>Companies hiring remotely across Europe should not read the delay as permission to ignore the rules. Procurement teams are already asking vendors how their tools will meet the high-risk requirements, and large customers are writing those requirements into contracts. A company that builds human review, record-keeping and bias testing into its process now will not need to rebuild it in 2027.</p>

      <h2>How this fits with rules elsewhere</h2>
      <p>The EU is not alone in slowing down. Colorado, the first US state to pass a broad AI law covering hiring, pushed its start date back again in 2026. Our coverage of <a href="/posts/colorado-ai-law-delay-hiring-rules-2027">Colorado's AI law delay</a> explains what changed there. Meanwhile courts are moving faster than legislators: a US federal judge allowed a major lawsuit over AI screening tools to proceed this year, covered in our article on <a href="/posts/workday-ai-hiring-lawsuit-mobley-2026">the Workday AI hiring case</a>.</p>
      <p>Applying to European roles? Our guide to <a href="/posts/remote-jobs-in-europe-where-to-look">remote jobs in Europe</a> covers where to look, and the <a href="/jobs">board</a> lets you filter to roles open in Europe.</p>
    `,
    faq: [
      {
        q: "When do the EU AI Act hiring rules apply?",
        a: "Under the Digital Omnibus agreed in May 2026, high-risk obligations for stand-alone AI systems, including AI used in recruitment and employment decisions, move from 2 August 2026 to 2 December 2027.",
      },
      {
        q: "Is AI used in hiring considered high risk under the EU AI Act?",
        a: "Yes. AI used to recruit, screen, evaluate, promote or dismiss workers is listed as high risk, which brings obligations such as risk management, human oversight, data quality and logging.",
      },
      {
        q: "What parts of the EU AI Act still apply in 2026?",
        a: "The bans on prohibited practices have applied since February 2025, and Article 50 transparency obligations, such as disclosing AI interaction, apply from 2 August 2026.",
      },
      {
        q: "Can I ask for a human to review an AI hiring decision in the EU?",
        a: "Often, yes. GDPR gives people rights around solely automated decisions with significant effects, including human involvement and an explanation, and you can request your data from the employer.",
      },
    ],
  },

  {
    slug: "eu-pay-transparency-directive-deadline-missed-2026",
    title: "Most EU Countries Missed the Pay Transparency Deadline. What Changes",
    description:
      "The EU Pay Transparency Directive was due on 7 June 2026, but only four of 27 countries were ready. Salary ranges in job ads, salary history bans and more.",
    date: "2026-11-08T03:05:00.000Z",
    author: "Bhargav",
    tags: ["Pay Transparency", "Salary Ranges", "EU Law", "Europe Jobs", "Salary Negotiation"],
    readMinutes: 6,
    html: `
      <p>From 7 June 2026, every EU country was supposed to have new pay transparency rules in place. Most did not. According to law firm tracking published around the deadline, only <strong>four of the 27 member states</strong> had fully transposed the EU Pay Transparency Directive on time; Remote Work Europe named them as Slovakia, Italy, Lithuania and Malta, though Lithuania's status was complicated by a decision to split its law in two.</p>
      <p>Even so, the directive is the biggest change to how salaries are advertised in Europe in a generation. This is general information, not legal advice; the rules that apply to you depend on your country's law.</p>

      <h2>What the directive requires</h2>
      <ul>
        <li><strong>Pay before the interview.</strong> Employers must tell candidates the starting salary or salary range for a role, either in the job advert or before the first interview.</li>
        <li><strong>No salary history questions.</strong> Employers may not ask candidates what they earned in previous jobs.</li>
        <li><strong>Gender-neutral job titles and adverts.</strong> Recruitment must be non-discriminatory.</li>
        <li><strong>A right to pay information.</strong> Employees can request the average pay, broken down by sex, of workers doing the same or equal work.</li>
        <li><strong>Gender pay gap reporting.</strong> Larger employers must report their gender pay gap, phased by size; according to HR guidance from Assessio, employers with 250 or more staff face their first annual report by 7 June 2027.</li>
      </ul>

      <h2>Where each country stands</h2>
      <p>Slovakia moved first: its Equal Pay Act was signed on 23 April 2026 and took effect on 8 May. Italy's draft goes further than the minimum, requiring specific pay or ranges in job adverts themselves. Ireland signalled it was unlikely to meet the deadline, and Austria had not legislated by June. The European Commission confirmed in December 2025 that the deadline would not move, despite pressure from member states.</p>
      <p>Legal commentators disagree on the effect of missing the deadline. Some argue that countries which have not transposed are in breach of EU law from 8 June and face infringement proceedings; others note that individuals may be able to rely on parts of the directive directly against public employers. In practice, most private employers in late-transposing countries will follow national law when it arrives, and many multinationals are applying the rules everywhere now to avoid running two systems.</p>

      <h2>What it means for job seekers</h2>
      <p><strong>Expect more salary ranges in European job ads.</strong> On our board, only about a third of listings publish a salary range, and most of those come from US employers where state laws require it. European listings have historically been far less likely to show pay. That should change through 2026 and 2027. Our guide to <a href="/posts/salary-transparency-laws-2026">salary transparency laws</a> covers the US rules for comparison.</p>
      <p><strong>Stop answering salary history questions.</strong> In countries where the directive applies, you can decline to share your previous salary. Answer with your expectations for the role instead.</p>
      <p><strong>Remote roles are a grey area.</strong> A company hiring remotely across Europe has to follow the law of the country where the employee works. If the listing covers "EMEA" or "Europe", the pay rules can differ by country, which is one reason some multinationals publish a single range everywhere.</p>

      <h2>How to use the new information</h2>
      <ol>
        <li><strong>Compare like with like.</strong> A published range is a starting point. Convert it to your currency and adjust for cost of living with the <a href="/tools/salary-purchasing-power">salary purchasing power calculator</a>.</li>
        <li><strong>Negotiate within the range.</strong> Knowing the range in advance makes it easier to ask for the upper half, and harder for an employer to anchor you low based on a previous salary.</li>
        <li><strong>Ask if the ad does not say.</strong> Where the rules apply, you are entitled to the range before the first interview.</li>
      </ol>

      <h2>Why it matters beyond the EU</h2>
      <p>Multinational employers rarely run one pay process for Europe and another for everywhere else. When a company has to publish ranges for its European roles, it often decides to publish them for all roles, including remote positions open to candidates in Asia, Africa or Latin America. US state laws pushed in the same direction from 2023 onward. The combined effect is a steady increase in the share of listings worldwide that show pay, which helps every candidate compare offers.</p>
      <p>Our guide to <a href="/posts/remote-salaries-2026-negotiate-the-premium">negotiating a remote salary</a> covers the rest, and the <a href="/tools/salary-band-estimator">salary band estimator</a> shows published ranges on our board by field and level.</p>
    `,
    faq: [
      {
        q: "What is the EU Pay Transparency Directive?",
        a: "An EU law requiring employers to give candidates the salary or range before the first interview, banning salary history questions, and introducing pay information rights and gender pay gap reporting.",
      },
      {
        q: "Which EU countries implemented pay transparency on time?",
        a: "Only four of 27 were reported as compliant by the 7 June 2026 deadline: Slovakia, Italy, Lithuania and Malta, with Lithuania's status complicated by splitting its law.",
      },
      {
        q: "Do employers have to put salary ranges in job ads in the EU?",
        a: "The directive requires the salary or range either in the advert or before the first interview. Some countries, such as Italy, go further and require it in the advert itself.",
      },
      {
        q: "Can an employer ask my previous salary in the EU?",
        a: "Under the directive, employers may not ask about salary history. Where your country has transposed it, you can decline and state your expectations for the role instead.",
      },
    ],
  },

  {
    slug: "colorado-ai-law-delay-hiring-rules-2027",
    title: "Colorado Delayed Its AI Hiring Law Again. What Candidates Should Know",
    description:
      "Colorado's first-in-the-nation AI law, covering hiring decisions, was amended in 2026 and delayed to January 2027. What changed and what rights you have now.",
    date: "2026-11-08T03:10:00.000Z",
    author: "Bhargav",
    tags: ["Colorado AI Act", "AI in Hiring", "AI Regulation", "US Jobs", "Employment Law"],
    readMinutes: 6,
    html: `
      <p>Colorado was the first US state to pass a broad law regulating AI used in important decisions about people, including hiring. It has now been delayed twice. The law was originally due to take effect on 1 February 2026. In August 2025, Governor Jared Polis signed amendments moving it to 30 June 2026. In 2026, the state amended it again: according to reporting by the payroll professionals' association PayrollOrg in July, a bill known as S.B. 189 narrowed the law and pushed its start date to <strong>1 January 2027</strong>.</p>
      <p>This is general information, not legal advice, and the final text should be checked with the Colorado legislature or a lawyer.</p>

      <h2>What the original law did</h2>
      <p>The 2024 Colorado AI Act required developers and users of "high-risk" AI systems, those that make or substantially influence consequential decisions about employment, housing, credit, healthcare and similar matters, to take reasonable care to avoid algorithmic discrimination. Employers using AI in hiring would have had to carry out impact assessments, notify candidates and offer ways to correct data or appeal.</p>

      <h2>What the 2026 amendment changed</h2>
      <p>A work group convened by the state proposed in March 2026 to replace the broad "high-risk AI" framework with narrower rules on "automated decision-making tools" used in consequential decisions, and to delay the start date. Law firm Proskauer described that proposal in April. The PayrollOrg report in July indicates the enacted amendment followed that direction and lowered the burden on employers. It reported one clear requirement: before using AI for certain decisions, employers must notify the employees or applicants affected.</p>

      <h2>What rights candidates have now</h2>
      <p>Until the Colorado law takes effect, candidates rely on existing rules, which already apply to AI:</p>
      <ul>
        <li><strong>Anti-discrimination law applies to AI.</strong> Federal and state laws against discrimination by race, sex, age and disability apply whether a decision is made by a person or a tool. A US federal court allowed a major case to proceed this year on exactly that theory; see our article on <a href="/posts/workday-ai-hiring-lawsuit-mobley-2026">the Workday AI hiring lawsuit</a>.</li>
        <li><strong>New York City requires bias audits.</strong> Since 2023, employers using automated employment decision tools for jobs in New York City must have them audited for bias, publish a summary and notify candidates.</li>
        <li><strong>Illinois regulates AI video interviews</strong> and requires consent before AI analyses an interview recording.</li>
        <li><strong>California</strong> adopted regulations under its fair employment law clarifying that automated decision systems used in employment are covered by its anti-discrimination rules.</li>
        <li><strong>Disability accommodations apply.</strong> If an AI assessment disadvantages you because of a disability, you can ask for an alternative.</li>
      </ul>

      <h2>What it means for remote job seekers</h2>
      <p>For remote roles, the law that applies is usually the law of the state where you live and work, not where the company is based. A Colorado resident applying to a California company for a remote role would generally fall under Colorado's rules once they take effect. Employers hiring remotely across many states increasingly apply the strictest set of rules everywhere rather than tracking each state.</p>
      <p>Practically, expect more notices that AI is being used in your application, more first-round AI interviews, and more employers offering a human alternative on request. Our coverage of <a href="/posts/ai-job-interviews-2026-what-candidates-should-know">AI job interviews</a> explains what to expect.</p>

      <h2>Why the delays keep happening</h2>
      <p>Colorado's law drew heavy lobbying from technology companies and employers, who argued that it was unclear and costly, and from consumer groups who argued it did not go far enough. The governor himself expressed reservations when he signed the original law. A narrower, delayed law is the compromise. Similar debates are under way in other states, and the EU has also pushed back its own rules on AI in hiring, as our article on <a href="/posts/eu-ai-act-high-risk-delay-hiring-2027">the EU AI Act delay</a> explains.</p>

      <h2>What to do now</h2>
      <ol>
        <li>Ask employers whether AI is used to screen or assess your application, and whether a human reviews the results.</li>
        <li>Keep copies of your applications and any assessment results.</li>
        <li>If you need an accommodation for an AI assessment, ask in writing.</li>
      </ol>
      <p>Browse remote roles open in the US on the <a href="/jobs">board</a>, filtered by where you live.</p>
      <p>For employers, the delay is a window rather than a reprieve. Companies that use AI in hiring will still need an inventory of the tools they use, a process for notifying candidates and a way to handle requests for human review when the law takes effect. Building those now is cheaper than retrofitting them in December 2026, and it already reduces risk under existing anti-discrimination law.</p>
    `,
    faq: [
      {
        q: "When does the Colorado AI Act take effect?",
        a: "According to July 2026 reporting by PayrollOrg, an amendment known as S.B. 189 delayed it to 1 January 2027, after an earlier delay from February to June 2026.",
      },
      {
        q: "Does the Colorado AI Act cover hiring?",
        a: "Yes. It covers AI used in consequential decisions, including employment. The 2026 amendment narrowed it to automated decision-making tools and requires notice to applicants before AI is used in certain decisions.",
      },
      {
        q: "Are there other US laws on AI in hiring?",
        a: "Yes. New York City requires bias audits of automated hiring tools, Illinois regulates AI analysis of video interviews, California covers automated decisions under its anti-discrimination rules, and federal discrimination laws apply to AI.",
      },
      {
        q: "Which state's AI hiring law applies to a remote job?",
        a: "Generally the law of the state where you live and work. Many employers apply the strictest applicable rules to all remote candidates to keep one process.",
      },
    ],
  },

  {
    slug: "workday-ai-hiring-lawsuit-mobley-2026",
    title: "The Workday AI Hiring Lawsuit Moves Forward. Why It Matters",
    description:
      "A federal judge in 2026 largely refused to dismiss Mobley v. Workday, a case claiming AI screening tools discriminated by age, race and disability.",
    date: "2026-11-08T03:15:00.000Z",
    author: "Bhargav",
    tags: ["AI Hiring Bias", "Workday Lawsuit", "Applicant Tracking Systems", "Employment Law", "Job Applications"],
    readMinutes: 6,
    html: `
      <p>One of the most closely watched cases about AI in hiring cleared another hurdle in 2026. In June, Judge Rita Lin of the federal district court in Northern California largely denied Workday's motion to dismiss parts of the latest complaint in <strong>Mobley v. Workday</strong>, a lawsuit claiming that AI tools provided by the HR software company screened out job applicants based on age, race and disability.</p>
      <p>The ruling is not a finding that Workday did anything wrong. It means the claims can proceed. But the legal theory the court accepted could change how every company that sells hiring software thinks about its responsibilities, and it matters to anyone who applies for jobs through online systems, which is nearly everyone.</p>

      <h2>What the case is about</h2>
      <p>The lawsuit was filed in 2023 by Derek Mobley, who said he applied for more than 100 jobs at companies using Workday's hiring software and was rejected each time, often quickly and at odd hours, which he argued pointed to automated screening. The complaint alleges that Workday's AI tools discriminated against older applicants, Black applicants and applicants with disabilities.</p>
      <p>Workday's defence has been that its customers, the employers, make the hiring decisions and control their own processes, so the software provider should not be liable.</p>

      <h2>What the court decided</h2>
      <ul>
        <li><strong>Vendors can be liable.</strong> Earlier rulings in the case accepted the theory that a software vendor performing screening functions on an employer's behalf can be treated as the employer's agent under anti-discrimination law. Reporting on a March 2026 decision said the court rejected Workday's argument that age discrimination law does not cover applicants screened by its tools.</li>
        <li><strong>California law claims continue.</strong> In June, Judge Lin said Workday's argument conflicted with a 2023 California Supreme Court ruling that allowed some claims against business agents of employers, and declined to dismiss most of the state law claims.</li>
        <li><strong>Collective action.</strong> The age discrimination claims have proceeded on behalf of a wider group of applicants, which raises the stakes considerably.</li>
      </ul>
      <p>Several reports also describe later discovery rulings over the summer, which we have not independently verified. Anyone relying on the details should check the court docket.</p>

      <h2>Why it matters for job seekers</h2>
      <p>Most large employers use applicant tracking systems, and a growing share use AI features to rank, filter or score candidates. A 2026 survey by hiring platform Greenhouse found that 81 percent of American job seekers had been rejected from at least one role in the past year without speaking to a human recruiter or an AI interviewer. If screening tools carry bias, the effect is invisible to the people it affects.</p>
      <p>The case does not tell you how to beat a screening tool, and claims of "ATS hacks" are mostly myths. What it does is establish that the companies building those tools may be accountable for their effects, which pushes the industry toward bias testing, documentation and human review.</p>

      <h2>What you can do</h2>
      <ol>
        <li><strong>Match the posting's words honestly.</strong> Screening tools, AI or not, look for evidence of the skills a role asks for. The <a href="/tools/ats-keyword-checker">ATS keyword checker</a> shows which terms in a posting your CV does not mention.</li>
        <li><strong>Apply directly where you can.</strong> Applications through company career pages reach the employer's own system. Our guide to <a href="/posts/apply-directly-on-company-career-pages">applying directly on career pages</a> explains why that helps.</li>
        <li><strong>Ask about accommodations.</strong> If an online assessment disadvantages you because of a disability, you can request an alternative.</li>
        <li><strong>Keep records.</strong> Note when you applied and when and how you were rejected. Patterns are what made this case possible.</li>
      </ol>

      <h2>The wider legal picture</h2>
      <p>Legislators are moving more slowly than courts. Colorado delayed its AI law to 2027 and the EU pushed its high-risk AI rules to December 2027; our articles on <a href="/posts/colorado-ai-law-delay-hiring-rules-2027">Colorado's delay</a> and <a href="/posts/eu-ai-act-high-risk-delay-hiring-2027">the EU AI Act</a> explain both. In the meantime, existing discrimination law, tested in cases like this one, is doing most of the work. Browse roles on the <a href="/jobs">board</a>, every one linking to the employer's own application page.</p>
      <p>For employers, the lesson is that buying a screening tool does not transfer the responsibility for its outcomes. Companies are increasingly asking vendors for bias audit results, documentation of how models were trained and tested, and the ability to switch automated rejection off. Candidates benefit when those questions are asked, because they push the whole market toward tools that can be explained and checked.</p>
    `,
    faq: [
      {
        q: "What is the Mobley v. Workday case?",
        a: "A lawsuit filed in 2023 alleging that AI hiring tools provided by Workday screened out job applicants based on age, race and disability. It is proceeding in federal court in Northern California.",
      },
      {
        q: "Did Workday lose the lawsuit?",
        a: "No ruling on the merits has been made. In June 2026 the judge largely denied Workday's motion to dismiss parts of the complaint, which allows the claims to proceed.",
      },
      {
        q: "Can AI hiring software companies be sued for discrimination?",
        a: "Rulings in this case accepted that a software vendor performing screening for employers can potentially be liable as the employer's agent under anti-discrimination law.",
      },
      {
        q: "How can I avoid being unfairly filtered by applicant tracking systems?",
        a: "Use the posting's own terms where they honestly describe your experience, apply directly through company career pages, ask for accommodations if an assessment disadvantages you, and keep records of your applications.",
      },
    ],
  },

  {
    slug: "ai-job-interviews-2026-what-candidates-should-know",
    title: "Most Job Seekers Have Now Faced an AI Interviewer. How to Handle One",
    description:
      "63% of job seekers have had an AI interview, up 13 points in six months, and most were not told in advance. What the 2026 research says and how to prepare.",
    date: "2026-11-08T03:20:00.000Z",
    author: "Bhargav",
    tags: ["AI Interviews", "Job Interviews", "Recruiting Technology", "Job Search Tips", "Remote Interviews"],
    readMinutes: 6,
    html: `
      <p>The first interview for a growing number of jobs is no longer with a person. A survey of 2,950 active job seekers published by hiring platform Greenhouse in May 2026 found that <strong>63 percent had been interviewed by an AI</strong>, up 13 percentage points in six months. Seventy percent of the US candidates surveyed said they had not been clearly told that AI was involved before the interview began.</p>
      <p>AI interviewers are here, mostly for high-volume and remote roles. Here is what the research says about them, and how to handle one well.</p>

      <h2>What an AI interview is</h2>
      <p>The term covers several formats: a chatbot that asks screening questions by text; a recorded video interview where you answer prompts on camera and software scores or summarises the answers; and, increasingly, a live voice agent that holds a spoken conversation and asks follow-up questions. Most are used as a first screen, before a human recruiter.</p>

      <h2>What the 2026 research says</h2>
      <ul>
        <li><strong>Candidates are wary but adapting.</strong> Gartner's candidate survey found 68 percent preferred human interactions, but among candidates who had experienced an AI interview, 48 percent felt comfortable with it and 27 percent preferred the AI to a human.</li>
        <li><strong>Fairness concerns are widespread.</strong> In a survey of 1,100 candidates reported by UK job board CV-Library, 63 percent said AI-led recruitment was less fair than human judgement.</li>
        <li><strong>Many are rejected without talking to anyone.</strong> Greenhouse's autumn report found 81 percent of American job seekers had been rejected from at least one role in the past year without speaking to a human recruiter or an AI interviewer.</li>
        <li><strong>Young candidates suspect scams.</strong> A November 2026 survey by ResumeCoach found 67 percent of 18 to 24 year olds worried an AI interview might mean a job was a scam, though that group was small.</li>
        <li><strong>Outcomes may be better than feared.</strong> A field experiment by economists Brian Jabarian and Luca Henkel, which randomly assigned 70,000 applicants to human or AI voice interviews, reportedly found those interviewed by AI were 12 percent more likely to receive offers, as reported by Black Enterprise.</li>
      </ul>

      <h2>How to handle an AI interview</h2>
      <ol>
        <li><strong>Ask whether AI is used and whether a person reviews the results.</strong> In New York City, Illinois and, from 2026, under EU transparency rules, employers have specific disclosure duties; elsewhere, asking is still reasonable.</li>
        <li><strong>Answer the question asked, with structure.</strong> AI scoring tends to reward complete, relevant answers. A short situation, what you did and the result works as well for software as for people. Our guide to <a href="/posts/remote-job-interview-questions">remote job interview questions</a> has examples.</li>
        <li><strong>Use the job's own language.</strong> Name the skills and tools the posting lists where they honestly apply.</li>
        <li><strong>Treat it as a real interview.</strong> Quiet room, good light, stable connection, notes nearby but not read aloud. Recorded answers are often watched later by a recruiter.</li>
        <li><strong>Ask for an alternative if you need one.</strong> If a disability, speech pattern or connection problem makes the format unfair, request a human interview or adjustment in writing.</li>
      </ol>

      <h2>How to tell a real AI interview from a scam</h2>
      <p>Scammers have adopted AI interviews too. A legitimate one is linked from the employer's own careers site or an application you submitted, uses a recognisable hiring platform, and never asks for payment, bank details or identity documents before an offer. If a "recruiter" invites you to an AI interview through a messaging app for a job you never applied to, treat it as a red flag. The <a href="/tools/fake-job-checker">fake job checker</a> reviews a message for common scam signs, and our guide to <a href="/posts/how-to-spot-fake-remote-job-postings">spotting fake remote job postings</a> covers the rest.</p>

      <h2>Why employers are using them</h2>
      <p>Volume is the main reason. Remote roles attract hundreds or thousands of applications, and an AI interviewer can screen candidates around the clock in every time zone. That has a hidden benefit for remote applicants abroad: an AI interview at 2 a.m. in the recruiter's time zone may be 10 a.m. in yours. The risks, bias and lack of transparency among them, are why regulators and courts are paying attention; see our coverage of <a href="/posts/workday-ai-hiring-lawsuit-mobley-2026">the Workday AI hiring case</a>.</p>
      <p>Find roles on the <a href="/jobs">board</a>, where every listing links to the employer's own application page.</p>
      <p>If you have a choice between an AI interview and waiting for a human slot, take the AI interview unless the format disadvantages you. It usually moves your application forward faster, and recruiters often review recordings or summaries before deciding.</p>
    `,
    faq: [
      {
        q: "How common are AI job interviews?",
        a: "A Greenhouse survey of 2,950 job seekers published in May 2026 found 63 percent had been interviewed by an AI, up 13 percentage points in six months.",
      },
      {
        q: "Do employers have to tell you if AI is interviewing you?",
        a: "In some places. New York City and Illinois have disclosure rules, and EU transparency obligations apply from August 2026. Elsewhere it varies, and 70 percent of US candidates in one survey said they were not clearly told.",
      },
      {
        q: "How do I pass an AI interview?",
        a: "Answer each question directly and completely with a clear structure, use the job's own terms where they apply, prepare as for a human interview, and ask whether a person reviews the results.",
      },
      {
        q: "Can an AI interview be a scam?",
        a: "Yes, scammers use them. A legitimate AI interview links from the employer's careers site or your application and never asks for payment or bank details before an offer.",
      },
    ],
  },

  {
    slug: "fake-job-candidates-deepfakes-remote-hiring-2026",
    title: "Deepfake Candidates Are Changing Hiring. How to Prove You're Real",
    description:
      "Deepfake interviews and fake remote workers have pushed employers to tighten identity checks. What happened, what companies now ask, and how to stand out.",
    date: "2026-11-08T03:25:00.000Z",
    author: "Bhargav",
    tags: ["Deepfakes", "Hiring Fraud", "Remote Hiring", "Identity Verification", "Job Search"],
    readMinutes: 6,
    html: `
      <p>Remote hiring has a fraud problem, and honest candidates are paying part of the cost. Security researchers, the FBI and the US Justice Department have documented schemes in which fake applicants, some using stolen identities and real-time deepfake video, get hired for remote technology jobs. The best known involve North Korean IT workers, but the techniques are spreading. Research firm Gartner has projected that by 2028, one in four job applicants globally could be fake.</p>
      <p>The result is that many employers are adding identity checks to remote hiring. Here is what is happening and how genuine candidates can make the process easy.</p>

      <h2>What the fraud looks like</h2>
      <ul>
        <li><strong>Stolen or synthetic identities.</strong> Applicants use real people's identities or invent new ones, with fabricated work histories and profiles.</li>
        <li><strong>Deepfake interviews.</strong> Researchers at Palo Alto Networks' Unit 42 showed that a researcher with no image manipulation experience could create a convincing synthetic identity for job interviews in about 70 minutes using an old computer.</li>
        <li><strong>Laptop farms.</strong> Once hired, the fake worker has company equipment shipped to a facilitator, who keeps it connected so the work appears to come from the right country.</li>
        <li><strong>The scale.</strong> The Justice Department has said more than 300 US companies were infiltrated by North Korean IT workers posing as Americans, with salaries funnelled to the North Korean government. In 2025 a federal grand jury indicted North Korean operatives directly for the first time, and facilitators have also been charged.</li>
      </ul>

      <h2>What employers now ask for</h2>
      <p>The FBI has advised employers to use live video interviews, cross-check CVs against online profiles, and watch for mismatches such as a shipping address for equipment that differs from the stated home address. In practice, candidates for remote roles increasingly see:</p>
      <ul>
        <li>a request to keep the camera on throughout interviews, sometimes with a request to move or turn;</li>
        <li>identity verification through a third-party service before or at the offer stage;</li>
        <li>reference checks that include a call with a former manager, not just an email;</li>
        <li>background checks and, for some roles, a requirement to collect equipment in person or receive it only at a verified address;</li>
        <li>questions about inconsistencies between your CV, your online profiles and your application.</li>
      </ul>

      <h2>How to prove you are real, quickly</h2>
      <ol>
        <li><strong>Make your history consistent.</strong> Your CV, professional profile and portfolio should tell the same story with the same dates and titles. Inconsistencies that were once harmless now raise flags.</li>
        <li><strong>Have a verifiable footprint.</strong> Public work, such as code, writing, talks or design case studies, and a profile with real connections and history are strong evidence of a real person.</li>
        <li><strong>Turn your camera on and keep it on.</strong> Good lighting and a stable connection help, especially if your connection is slow.</li>
        <li><strong>Offer references proactively.</strong> Two former managers who will take a call speed things up.</li>
        <li><strong>Be ready for verification.</strong> Have your identity documents available for the offer stage, but only share them through the employer's official process.</li>
      </ol>

      <h2>Do not get scammed in the other direction</h2>
      <p>Fraud runs both ways. Fake employers use the same tools to collect personal data and money from job seekers. Never send identity documents, bank details or payment before a verified offer, and check that a recruiter's email domain matches the company. The <a href="/tools/fake-job-checker">fake job checker</a> reviews a message for warning signs, and our guide to <a href="/posts/remote-job-scams-how-they-make-money">how remote job scams make money</a> explains the common schemes.</p>

      <h2>What it means for international candidates</h2>
      <p>Candidates outside the employer's home country may face more checks, because many fraud schemes involve workers claiming to be somewhere they are not. That is frustrating but manageable: be clear and consistent about where you live and work, apply only to roles open in your country, and expect verification. The <a href="/tools/remote-job-location-checker">location checker</a> tells you whether a listing is open where you live, which avoids awkward conversations later.</p>
      <p>Every listing on our <a href="/jobs">board</a> links to the employer's own application page, and our guide to <a href="/posts/how-we-source-and-verify-listings">how we source and verify listings</a> explains how we check them.</p>
      <p>Finally, expect some friction and do not take it personally. A request to verify your identity or to hold up a document on camera is not an accusation. It is the cost of a hiring channel that criminals have learned to exploit, and the candidates who handle it smoothly and transparently are the ones employers remember for the right reasons.</p>
    `,
    faq: [
      {
        q: "Are fake job candidates really a problem?",
        a: "Yes. The US Justice Department has said more than 300 companies were infiltrated by North Korean IT workers posing as Americans, and Gartner projects that by 2028 one in four applicants globally could be fake.",
      },
      {
        q: "How do deepfake job interviews work?",
        a: "Fraudsters use real-time face and voice manipulation to impersonate another person on video calls. Unit 42 researchers built a convincing synthetic identity for interviews in about 70 minutes.",
      },
      {
        q: "Why do remote employers ask for identity verification?",
        a: "To prevent fraud. The FBI advises live video interviews, cross-checking CVs with online profiles and verifying addresses, so candidates increasingly face ID checks and reference calls.",
      },
      {
        q: "Should I send my ID to a recruiter?",
        a: "Only through the employer's official process at a verified offer stage. Never send identity documents, bank details or payment to someone you cannot verify.",
      },
    ],
  },

  {
    slug: "return-to-office-mandates-2026-remote-jobs",
    title: "Return-to-Office Mandates in 2026: Who Ordered Five Days a Week",
    description:
      "Instagram, Fidelity, Truist, Kroger and Ontario's public service moved to five office days in 2026. How common full RTO is, and where remote jobs remain.",
    date: "2026-11-08T03:30:00.000Z",
    author: "Bhargav",
    tags: ["Return to Office", "RTO 2026", "Remote Work", "Hybrid Work", "Remote Jobs"],
    readMinutes: 6,
    html: `
      <p>Return-to-office orders did not stop in 2026. Several large employers and governments moved to five days a week in the office, and many more tightened hybrid rules quietly. At the same time, remote hiring continued, concentrated in particular companies and fields. Here is what changed this year and what it means for anyone looking for remote work.</p>

      <h2>Who moved to five days in 2026</h2>
      <ul>
        <li><strong>Instagram</strong> moved its roughly 20,000 US employees from three office days to five from 2 February 2026, according to HR Executive.</li>
        <li><strong>Fidelity Investments</strong> told staff at its Boston offices in April that they would be in five days a week from 1 September 2026.</li>
        <li><strong>Truist</strong> and <strong>Kroger</strong>, the latter affecting about 4,800 office staff, ended hybrid arrangements from January 2026.</li>
        <li><strong>Amazon</strong> has required five office days for corporate staff since January 2025.</li>
        <li><strong>Governments:</strong> Ontario's public service returned full time from 5 January 2026, the cities of Ottawa and Vancouver set five-day requirements from 1 January, and Canada's federal government told executives to be on site five days a week by May, with minimum days for other staff.</li>
      </ul>

      <h2>How common full return to office is</h2>
      <p>Less common than the headlines suggest. Research by WorkTime estimated that about 30 percent of companies now require five days on site, up from 28 percent in 2025. It also found that most tightening happens without a formal announcement: only 23 percent of employers made formal changes to their remote or hybrid policies in the past year. Some holdouts remain prominent; Apple, for example, has kept a three-day policy.</p>
      <p>Surveys disagree on the exact numbers because they define "required" differently and sample different employers, so treat any single percentage as approximate. The direction is clear, though: a gradual shift toward more office time at large, established employers, alongside continued remote hiring at smaller and distributed ones.</p>

      <h2>Where remote jobs remain</h2>
      <p>Remote work has not disappeared; it has concentrated. Companies that were remote-first before 2020 or built their operations around distributed teams have mostly stayed that way. Fields where work is already done in writing and across time zones, such as software, infrastructure, data, sales and customer support, continue to offer the most remote roles. Our analysis of <a href="/posts/is-remote-work-dying-2026-rto-data">whether remote work is dying</a> looks at the data in detail.</p>

      <h2>What RTO mandates mean for remote job seekers</h2>
      <p><strong>More competition for remote roles.</strong> Every five-day mandate pushes some employees to look for remote work elsewhere, adding experienced candidates to the remote applicant pool. Applying early and tailoring each application matter more.</p>
      <p><strong>Read "remote" carefully.</strong> Some listings advertised as remote turn out to be hybrid, or require living near an office. Our guide to <a href="/posts/how-to-spot-hybrid-bait-in-remote-job-descriptions">spotting hybrid bait</a> lists the phrases to watch for, and the <a href="/tools/jd-remote-analyzer">remote job description analyzer</a> flags them automatically.</p>
      <p><strong>Ask about the future.</strong> Policies change. In interviews, ask how long the company has been remote, whether leadership works remotely, and whether any return-to-office plans are under discussion. Get your remote status written into your contract; our <a href="/posts/before-you-accept-a-remote-job-offer">checklist before you accept a remote offer</a> covers the clause.</p>

      <h2>Why companies keep ordering people back</h2>
      <p>Employers cite collaboration, culture, mentoring of junior staff and, increasingly, the cost of office leases they still hold. Research findings are mixed: studies of fully remote work show productivity effects that range from slightly negative to positive depending on the job and how it is managed, while hybrid arrangements tend to show little productivity loss and lower attrition. Some analysts also note that mandates can function as a soft layoff, since some employees leave rather than comply, which reduces headcount without severance.</p>

      <h2>Finding companies that will stay remote</h2>
      <p>The strongest signal is history. A company that has been fully remote for years, has leadership spread across countries and publishes how it works is less likely to reverse course. Our list of the <a href="/posts/most-remote-friendly-companies-hiring-worldwide">most remote-friendly companies hiring worldwide</a> and the <a href="/tools/company-remote-score">company remote score</a> help identify them. Browse remote roles on the <a href="/jobs">board</a>.</p>
      <p>If your current employer announces a mandate you cannot meet, start your search before the deadline rather than after. Experienced candidates leaving because of a return-to-office order are common in 2026, and recruiters at remote-first companies understand the reason. Say plainly that you are looking for a remote role and why, and focus the conversation on what you will deliver.</p>
    `,
    faq: [
      {
        q: "Which companies required five days in the office in 2026?",
        a: "Examples include Instagram from February 2026, Fidelity in Boston from September 2026, Truist and Kroger from January 2026, and Amazon since January 2025, along with several Canadian governments.",
      },
      {
        q: "What percentage of companies require full-time office work?",
        a: "Estimates vary. WorkTime research put it at about 30 percent of companies in 2026, up from 28 percent in 2025, with most changes made without formal announcements.",
      },
      {
        q: "Is remote work disappearing?",
        a: "No. Remote work has concentrated in remote-first companies and in fields like software, data, sales and support, while large established employers have increased office time.",
      },
      {
        q: "How can I make sure a remote job stays remote?",
        a: "Choose companies with a long remote history and distributed leadership, ask about future plans in interviews, and get your remote status written into your employment contract.",
      },
    ],
  },

  {
    slug: "microsoft-layoffs-2026-xbox-ai",
    title: "Microsoft Cut 4,800 Jobs in 2026, Mostly in Xbox. What It Tells Us",
    description:
      "Microsoft cut about 4,800 jobs in July 2026, with Xbox losing 3,200 roles through fiscal 2027, after buyouts for about 9,000. What it signals about tech jobs.",
    date: "2026-11-08T03:35:00.000Z",
    author: "Bhargav",
    tags: ["Microsoft Layoffs", "Xbox", "Gaming Jobs", "Tech Layoffs", "AI and Jobs"],
    readMinutes: 5,
    html: `
      <p>Microsoft's biggest workforce reduction of 2026 came on 6 July, when the company said it would cut about <strong>4,800 jobs</strong>, roughly 2.1 percent of its global workforce, as it restructured its Xbox gaming business. According to Reuters reporting, Xbox accounts for most of the reductions: 3,200 roles are to go through fiscal 2027, including 1,600 on the day of the announcement, alongside the sale of several studios.</p>
      <p>The cuts followed an earlier offer of voluntary buyouts to about 7 percent of Microsoft's US workforce, around 9,000 people.</p>

      <h2>Is AI behind it?</h2>
      <p>Microsoft says not directly. Chief People Officer Amy Coleman said AI is changing how work gets done at the company, but that it was not directly replacing the employees affected by the layoffs. The Xbox restructuring reflects long-running pressure on the gaming business, including high development costs and slower console sales, as much as anything to do with AI.</p>
      <p>At the same time, Microsoft is among the largest spenders on AI infrastructure in the world, and like its peers it is holding overall headcount roughly flat while investing heavily in data centres. Outplacement firm Challenger, Gray &amp; Christmas has found that in 2026, companies more often cite cost-cutting and economic conditions than AI as the reason for cuts, even as their AI budgets grow.</p>

      <h2>What it tells us about gaming jobs</h2>
      <p>The games industry has been through repeated rounds of layoffs since 2023, as studios that expanded during the pandemic adjusted to lower growth and higher costs. Microsoft's cuts and studio sales are part of that wider correction. For people who work in games, remote opportunities have become more concentrated in smaller studios, outsourcing and co-development firms, and tool and engine companies, where distributed teams are common.</p>
      <p>Game developers also have transferable skills that are in demand elsewhere: real-time graphics, simulation, performance engineering and live-service operations all map onto roles in simulation, robotics, digital twins, streaming and consumer apps. Our guide to <a href="/posts/remote-career-change-guide">changing careers into remote work</a> covers how to reframe experience for a new field.</p>

      <h2>What it tells us about big tech jobs more broadly</h2>
      <p>The pattern at Microsoft matches what we see across the largest technology companies in 2026:</p>
      <ul>
        <li><strong>Targeted cuts rather than across-the-board layoffs.</strong> Microsoft focused on one division; Meta cut about 10 percent in April; Amazon has made repeated smaller rounds.</li>
        <li><strong>Buyouts before layoffs.</strong> Voluntary programmes reduce headcount with less disruption and are increasingly common at large employers.</li>
        <li><strong>Reallocation toward AI.</strong> Even where AI is not the stated reason, budgets are moving from some teams to AI infrastructure and talent.</li>
      </ul>
      <p>Our coverage of <a href="/posts/big-tech-ai-capex-2026-jobs-data-centers">Big Tech's $700 billion of AI spending</a> explains where that money goes and which jobs it creates.</p>

      <h2>If you are affected</h2>
      <ol>
        <li><strong>Read your package carefully.</strong> Understand severance, notice, benefits continuation and any restrictions before signing.</li>
        <li><strong>Move while your network is warm.</strong> Former colleagues who have already moved on are often the fastest route to the next role.</li>
        <li><strong>Search beyond the obvious.</strong> Remote roles at smaller companies, including many that hire across countries, are a large part of the market. The <a href="/tools/remote-field-explorer">remote field explorer</a> shows where demand is by field.</li>
        <li><strong>Update your title vocabulary.</strong> The <a href="/tools/job-title-finder">job title finder</a> shows the titles employers actually use for your kind of work.</li>
      </ol>

      <h2>What to watch next</h2>
      <p>Microsoft's fiscal year runs to June, and the Xbox cuts are spread through fiscal 2027, so further reductions in that division are expected under the announced plan. Beyond gaming, the signal to watch is whether AI revenue grows fast enough to justify the infrastructure spending. If it does, hiring for AI, cloud and infrastructure roles should continue. If it disappoints, analysts expect the adjustment to come first in hiring freezes.</p>
      <p>Browse current remote roles at more than 500 employers on the <a href="/jobs">board</a>, each labelled with the countries or regions it is open to.</p>
      <p>One wider point is worth noting. Microsoft's cuts were smaller as a share of its workforce than many in the industry, and they came with a buyout offer first. Companies that can afford it increasingly try voluntary routes before compulsory ones, which tends to mean longer notice and better packages for those who leave. If your employer offers a buyout, compare it carefully against the likely terms of any later layoff before deciding.</p>
    `,
    faq: [
      {
        q: "How many jobs did Microsoft cut in 2026?",
        a: "Microsoft announced about 4,800 job cuts on 6 July 2026, roughly 2.1 percent of its workforce, after offering voluntary buyouts to about 9,000 US employees.",
      },
      {
        q: "Why did Microsoft cut Xbox jobs?",
        a: "As part of a restructuring of its gaming business, including selling several studios. Xbox is to cut 3,200 roles through fiscal 2027, including 1,600 in July 2026.",
      },
      {
        q: "Did AI cause the Microsoft layoffs?",
        a: "Microsoft said AI is changing how work gets done but was not directly replacing the affected employees. The cuts were largely tied to the gaming restructuring.",
      },
      {
        q: "Are there remote jobs in the games industry?",
        a: "Yes, mainly at smaller studios, outsourcing and co-development firms, and tool and engine companies, where distributed teams are common.",
      },
    ],
  },

  {
    slug: "meta-layoffs-2026-closed-open-roles-ai",
    title: "Meta Cut 8,000 Jobs and Closed 6,000 Open Roles: The Hidden Freeze",
    description:
      "Meta's 2026 cut of about 10% of staff also closed around 6,000 open roles to fund AI spending. Why closed vacancies matter as much as layoffs.",
    date: "2026-11-08T03:40:00.000Z",
    author: "Bhargav",
    tags: ["Meta Layoffs", "Hiring Freeze", "Big Tech", "AI Spending", "Job Market 2026"],
    readMinutes: 5,
    html: `
      <p>When Meta announced in 2026 that it would cut about <strong>8,000 jobs</strong>, roughly 10 percent of its workforce, most coverage focused on the layoffs. A second number in the same memo matters just as much to job seekers: the company also closed around <strong>6,000 open roles</strong>. Those were jobs that people outside the company might have been hired into, and they disappeared without anyone being laid off.</p>

      <h2>What Meta announced</h2>
      <p>In a memo from Chief People Officer Janelle Gale, published by Bloomberg and confirmed by Meta to CNN, the company said the cuts would take effect on 20 May. Gale said Meta was acting "as part of our continued effort to run the company more efficiently and to allow us to offset the other investments we're making". The other investments are AI: at the time, Meta had committed to spending $115 billion to $135 billion on AI infrastructure in 2026, nearly double its 2025 spending, and in October it narrowed its full-year range to $135 billion to $145 billion.</p>
      <p>Reports said the cuts fell mainly on recruiting, marketing, corporate support, middle management and product work not connected to AI, while some staff were moved into AI infrastructure and engineering. Coverage differed on what comes next: one outlet reported that no further broad cuts were expected this year, while others described the spring round as a first phase.</p>

      <h2>Why closed vacancies matter</h2>
      <p>Layoffs affect people inside a company. Closed vacancies affect people outside it, and they are far less visible. When a large employer closes thousands of open roles at once, the effect ripples through the job market: fewer interviews for external candidates, fewer opportunities for people moving from smaller companies, and more competition for the roles that remain.</p>
      <p>It also helps explain a feature of the 2026 job market. Official US data shows few layoffs and very little hiring, with payrolls growing by only 29,000 in September. A company that freezes hiring rather than firing contributes to exactly that pattern. For job seekers, it means the bottleneck is openings, not job security.</p>

      <h2>The cost-swap pattern</h2>
      <p>Meta is the clearest example of a strategy many large technology companies are following: cutting operating costs in some functions to pay for AI infrastructure. The functions that go first are internal ones, such as recruiting, which shrinks when hiring slows, and layers of management. The functions that grow are AI research, AI infrastructure and the engineers who build products on top of them.</p>
      <p>Our coverage of <a href="/posts/big-tech-ai-capex-2026-jobs-data-centers">Big Tech's $700 billion of AI spending</a> explains where that money is going, and our article on <a href="/posts/ai-machine-learning-jobs-up-91-percent-2026">AI job postings up 91 percent</a> covers which roles are growing.</p>

      <h2>What it means for job seekers</h2>
      <ol>
        <li><strong>Watch hiring signals, not just layoff headlines.</strong> A company that has frozen hiring may still post roles, but fill few of them. Fresh postings and recent hires are better signals than a careers page full of old listings. Our guide to <a href="/posts/ghost-jobs-how-to-tell-a-role-is-still-open">ghost jobs</a> explains how to tell.</li>
        <li><strong>Recruiters are among the hardest hit.</strong> If you work in talent acquisition, the shrinking of in-house recruiting teams is a structural change. Skills in sourcing for technical and AI roles, and in recruiting operations and analytics, are more resilient.</li>
        <li><strong>Look beyond the largest employers.</strong> Smaller companies and remote-first firms account for a large share of remote hiring and often hire across more countries. Our list of <a href="/posts/most-remote-friendly-companies-hiring-worldwide">remote-friendly companies hiring worldwide</a> is a starting point.</li>
      </ol>

      <h2>What to watch</h2>
      <p>The key question for 2027 is whether the AI investments pay off. If they do, the same companies are likely to resume hiring, mainly for AI and infrastructure roles. If they do not, more cost cuts are likely. Either way, the companies investing most heavily are signalling that their future headcount will be smaller relative to their revenue than in the past, which makes efficiency and AI skills more valuable for anyone hoping to work there.</p>
      <p>Browse current remote roles from hundreds of employers on the <a href="/jobs">board</a>, each showing how long it has been open.</p>
      <p>For candidates already in a Meta hiring process when the freeze landed, the experience was abrupt: interviews cancelled and offers withdrawn. If you are interviewing at a company that has just announced cost cuts, it is reasonable to ask whether the role's budget is confirmed and when a decision will be made, and to keep other applications moving until you have a signed offer.</p>
    `,
    faq: [
      {
        q: "How many jobs did Meta cut in 2026?",
        a: "About 8,000, roughly 10 percent of its workforce, effective 20 May 2026. It also closed around 6,000 open roles at the same time.",
      },
      {
        q: "Why did Meta cut jobs in 2026?",
        a: "Its chief people officer said the cuts were to run more efficiently and offset other investments, chiefly AI infrastructure spending of well over $100 billion planned for 2026.",
      },
      {
        q: "Which teams were affected by the Meta layoffs?",
        a: "Reports said recruiting, marketing, corporate support, middle management and non-AI product work were most affected, with some staff moved into AI infrastructure and engineering.",
      },
      {
        q: "Why do closed job openings matter?",
        a: "Closed vacancies reduce opportunities for external candidates without anyone being laid off, contributing to the low-hiring job market seen in 2026.",
      },
    ],
  },

  {
    slug: "ai-skills-required-tech-jobs-75-percent-2026",
    title: "Three in Four Tech Job Postings Now Ask for AI Skills. Which Ones",
    description:
      "Dice data shows AI skills in 75% of US tech job postings by June 2026, up from 15% in January 2024. What employers mean by AI skills, and how to show them.",
    date: "2026-11-08T03:45:00.000Z",
    author: "Bhargav",
    tags: ["AI Skills", "Tech Jobs", "Job Requirements", "Upskilling", "Career Advice"],
    readMinutes: 6,
    html: `
      <p>Two years ago, asking for AI skills in a tech job posting was unusual. Now it is the norm. According to job board Dice, which analyses millions of US tech postings using data from labour-market analytics firm Lightcast, AI skills appeared in <strong>15 percent of tech job postings in January 2024</strong>. By May 2026 the figure was 73 percent, as reported by HR Dive, and by June it was <strong>75 percent</strong>, according to CIO's coverage of Dice's data.</p>
      <p>That does not mean three quarters of tech jobs are AI jobs. It means most employers now expect candidates to work with AI, whatever the role.</p>

      <h2>The numbers in context</h2>
      <ul>
        <li>AI skills: 15 percent of US tech postings in January 2024, 73 percent in May 2026, 75 percent in June 2026.</li>
        <li>Postings with "AI" in the job title rose 173 percent year on year in the first quarter of 2026, while software development postings dipped 22 percent.</li>
        <li>In Dice's September and October 2026 reports, AI and machine learning postings grew 88 and 91 percent year on year respectively, against 17 to 20 percent for tech postings overall.</li>
      </ul>

      <h2>What employers mean by "AI skills"</h2>
      <p>The phrase covers very different things depending on the role:</p>
      <h3>For most tech roles: using AI tools well</h3>
      <p>Software engineers are expected to use coding assistants and agents productively and review their output critically. Analysts use AI to explore data and draft reports. Support and operations staff use it to triage and summarise. Here, "AI skills" means fluency with the tools and judgement about when to trust them.</p>
      <h3>For product and engineering roles: building with AI</h3>
      <p>Many product teams now build features on top of large language models. That calls for practical skills: calling model APIs, designing prompts and evaluation tests, retrieving relevant data for a model, managing cost and latency, and handling failures safely.</p>
      <h3>For specialist roles: building AI itself</h3>
      <p>Machine learning engineers, MLOps engineers and data engineers train, deploy and monitor models. This is the fastest-growing group but still a minority of postings. Our article on <a href="/posts/ai-machine-learning-jobs-up-91-percent-2026">AI job postings up 91 percent</a> covers which of these roles are growing.</p>

      <h2>How to show AI skills in an application</h2>
      <ol>
        <li><strong>Describe outcomes, not tools.</strong> "Used an AI assistant to cut the time to triage support tickets from two days to four hours" is far stronger than "proficient in ChatGPT".</li>
        <li><strong>Show judgement.</strong> Employers worry about errors and data leaks as much as they value speed. An example of catching an AI mistake, or setting rules for how your team uses AI, signals maturity.</li>
        <li><strong>Build one small thing.</strong> For technical roles, a small project that calls a model API, evaluates the output and handles failures is worth more than a certificate.</li>
        <li><strong>Mirror the posting's language.</strong> If a posting asks for experience with specific tools or concepts, use those words where they honestly apply. The <a href="/tools/ats-keyword-checker">ATS keyword checker</a> shows which terms your CV is missing.</li>
      </ol>

      <h2>Why fundamentals still matter</h2>
      <p>Analysis of Dice's data by interview preparation site Interview Query made a useful point: AI skills dominate the postings, but fundamentals still win the interviews. Employers want people who can use AI to go faster without losing the ability to reason about the problem. A developer who cannot read code critically, or an analyst who cannot sanity-check a number, becomes a liability when AI makes producing plausible output cheap.</p>

      <h2>What this means for remote workers</h2>
      <p>Remote teams have adopted AI tools quickly, because much of their work is already written and digital. Remote candidates who can show they use AI to communicate clearly, document their work and save colleagues time are well placed. Our guide to <a href="/posts/upskilling-for-remote-work">upskilling for remote work</a> covers how to build skills that transfer, and our <a href="/posts/remote-job-resume-tips">resume guide</a> explains how to present them.</p>
      <p>Browse current tech roles on the <a href="/jobs">board</a>, or see which fields are hiring in the <a href="/tools/remote-field-explorer">remote field explorer</a>.</p>
      <p>A final note on credentials. Short AI courses and certificates can help you learn, but employers rarely hire on them alone. They are most useful as a structured way to build a project you can show. If you take one, pick a course that ends with something you built, and lead with the result rather than the certificate.</p>
    `,
    faq: [
      {
        q: "How many tech jobs require AI skills?",
        a: "According to Dice data, AI skills appeared in 75 percent of US tech job postings in June 2026, up from 73 percent in May and 15 percent in January 2024.",
      },
      {
        q: "What AI skills do employers want?",
        a: "For most roles, fluency with AI tools and judgement about their output; for product and engineering roles, building features on AI models; for specialist roles, training, deploying and monitoring models.",
      },
      {
        q: "How do I show AI skills on my CV?",
        a: "Describe measurable outcomes from using AI, give an example of good judgement such as catching an AI error, build a small project for technical roles, and use the posting's own terms honestly.",
      },
      {
        q: "Are AI jobs replacing software development jobs?",
        a: "Postings are shifting. Dice reported software development postings down 22 percent in early 2026 while AI-titled postings rose 173 percent, but most software roles now simply expect AI skills.",
      },
    ],
  },
];
