/**
 * News cluster A: AI and the jobs market, autumn 2026. Written 8 November
 * 2026 from reporting published in September to early November 2026.
 *
 * Each article names its sources in the text (no outbound links, as with the
 * rest of the guides) and dates its figures. Where sources disagreed, the
 * article says so rather than picking one. Claims found only on aggregator
 * sites were left out.
 */
import type { Post } from "./posts";

export const POSTS_NEWS_A: Post[] = [
  {
    slug: "ai-layoffs-october-2026-challenger-report",
    title: "AI Was Blamed for the Fewest Job Cuts of 2026 in October",
    description:
      "Challenger's October 2026 report: AI was cited for 1,265 cuts, the lowest month of the year, after a record 38,579 in May. What changed and what it means.",
    date: "2026-11-08T02:00:00.000Z",
    author: "Bhargav",
    tags: ["AI Layoffs", "Challenger Report", "Job Cuts 2026", "Tech Layoffs", "Jobs News"],
    readMinutes: 5,
    html: `
      <p>For most of 2026, artificial intelligence was the headline reason companies gave when they announced job cuts. In October it almost disappeared from the list. According to the monthly report from outplacement firm Challenger, Gray &amp; Christmas, US employers cited AI for just <strong>1,265 announced cuts in October</strong>, under 3 percent of the month's total and the lowest monthly figure of the year.</p>
      <p>That is a sharp turn from May, when AI was cited for a record 38,579 cuts. It does not mean the AI story is over, but it does change what job seekers should read into the next round of layoff headlines.</p>

      <h2>The October numbers</h2>
      <ul>
        <li><strong>Total announced cuts:</strong> 43,994 in October, up about 2 percent from 43,281 in September and down roughly 71 percent from the 153,074 announced in October 2025.</li>
        <li><strong>AI-cited cuts:</strong> 1,265 in October, against a 2026 peak of 38,579 in May.</li>
        <li><strong>Year to date:</strong> 121,401 cuts attributed to AI through October, more than double the 54,836 for all of 2025.</li>
        <li><strong>The new top reason:</strong> "market and economic conditions", with 16,407 cuts in October and 130,531 for the year, overtaking AI as the most cited reason of 2026.</li>
        <li><strong>Technology:</strong> 5,576 cuts in October, the sector's lowest month of the year, although tech still leads all industries with 171,501 for 2026.</li>
      </ul>
      <p>Two cautions apply to all of these. Challenger counts <em>announced</em> plans, not completed layoffs, and the reason is the one the employer gives. A company that would have cut jobs anyway may find "AI" a better story for investors than "demand is weak".</p>

      <h2>Why the AI number fell</h2>
      <p>The report itself does not explain motive, but the change in labels is telling. As the economy cooled through the late summer, with US payrolls growing by only 29,000 in September according to the Bureau of Labor Statistics, employers had a plainer reason to give. Analysts quoted by HR trade press in early November made the same point: when cuts are about costs and slower sales, companies say so, and fewer of them reach for AI as the explanation.</p>
      <p>A separate piece of evidence points the same way. Research from the Bank of England and a survey of nearly 6,000 executives in the US, UK, Germany and Australia, published this year, found that around 70 percent of firms use AI but more than 80 percent report no measurable effect on headcount yet. AI is changing jobs, but slowly and unevenly, not in the sudden waves the spring headlines implied.</p>

      <h2>What it means if you are job hunting</h2>
      <p><strong>Read the reason, but watch the sector.</strong> Technology has announced more cuts than any other industry this year, and it is also where hiring for AI work is growing fastest. Job board Dice reported AI and machine learning postings up 91 percent year on year in October. The same companies can be cutting in one team and hiring in another.</p>
      <p><strong>Expect fewer, more targeted rounds.</strong> Amazon's early-October cuts, under 1,000 roles in its retail division after roughly 30,000 corporate cuts since late 2025, are typical of the pattern: smaller, repeated trims rather than one large event. Our guide to <a href="/posts/is-remote-work-dying-2026-rto-data">whether remote work is shrinking</a> covers how these rounds have affected remote roles in particular.</p>
      <p><strong>Remote roles are not immune, but they are spread differently.</strong> Remote hiring is concentrated in fields where companies already work in a distributed way: software, data, sales and support. You can see how open roles split by field today in the <a href="/tools/remote-field-explorer">remote field explorer</a>, which recounts the board every night.</p>

      <h2>How to read the next layoff headline</h2>
      <p>Layoff announcements will keep arriving, and each one will be framed somehow. A few questions cut through the framing. First, is the company cutting overall headcount, or moving it? A firm that cuts 500 roles in one division while hiring for AI and infrastructure elsewhere is reshaping, not shrinking. Second, which functions are affected? In 2026, cuts have fallen most heavily on internal operations, recruiting, customer support and middle management, and least on teams building or selling products that are growing. Third, is the reason the company gives consistent with its spending? A company raising its AI budget while citing "economic conditions" is telling you where its money is going.</p>
      <p>For remote workers there is one more question: does the company still hire remotely? Some employers have used cuts to consolidate around offices. Others have kept remote hiring and simply hired less. The <a href="/tools/company-remote-score">company remote score</a> reads an employer's current listings and shows how many are genuinely remote, which is a better guide than its press release.</p>

      <h2>The bigger picture</h2>
      <p>Total announced cuts for 2026 are running about 44 percent below 2025, according to Challenger's year-to-date figures. The job market is weak, but it is weak in the way slow growth is weak: few layoffs, few hires, and long searches. For a remote job seeker, that means applications count more than ever, and so does targeting. Start with the <a href="/jobs">full board</a>, filter to the places you can actually work from, and spend your effort on the roles that fit.</p>
    `,
    faq: [
      {
        q: "How many job cuts were blamed on AI in October 2026?",
        a: "Challenger, Gray & Christmas counted 1,265 announced US job cuts attributed to AI in October 2026, under 3 percent of the month's 43,994 cuts and the lowest monthly AI figure of the year.",
      },
      {
        q: "Is AI still the top reason for layoffs in 2026?",
        a: "Not any more. Through October, market and economic conditions were cited for 130,531 cuts, passing AI's 121,401 as the most common reason employers gave in 2026.",
      },
      {
        q: "Which industry has the most layoffs in 2026?",
        a: "Technology. Challenger's figures show 171,501 announced tech cuts through October 2026, the most of any sector, even though October itself was tech's lowest month of the year at 5,576.",
      },
      {
        q: "Does a falling AI layoff count mean AI is not affecting jobs?",
        a: "No. It mostly reflects the reasons employers choose to give. Research this year suggests AI's effect on headcount is real but gradual, and many firms report no measurable impact yet.",
      },
    ],
  },

  {
    slug: "ai-machine-learning-jobs-up-91-percent-2026",
    title: "AI Job Postings Are Up 91%: The Roles Behind the Jump",
    description:
      "Dice's October 2026 data shows AI and ML postings up 91% year on year against 20% for tech overall. The roles behind the jump, and how to get into them.",
    date: "2026-11-08T02:05:00.000Z",
    author: "Bhargav",
    tags: ["AI Jobs", "Machine Learning Jobs", "Tech Hiring 2026", "MLOps", "Remote AI Jobs"],
    readMinutes: 5,
    html: `
      <p>Tech hiring is recovering slowly. AI hiring is not slow at all. According to job board Dice's October 2026 report, which uses posting data from labour-market analytics firm Lightcast, <strong>AI and machine learning job postings were up 91 percent year on year</strong>, more than four times the 20 percent growth in tech postings overall.</p>
      <p>The headline number hides a more useful story: which AI jobs are growing, and which of them are open to people who are not research scientists.</p>

      <h2>The October figures</h2>
      <ul>
        <li>Tech job postings rose 4 percent from September and 20 percent from October 2025, after a 9 percent month-on-month rise in September.</li>
        <li>AI and machine learning postings grew 91 percent year on year.</li>
        <li>Titles growing more than 150 percent month on month included <strong>AI trainers</strong>, <strong>machine learning data engineers</strong> and <strong>MLOps engineers</strong>.</li>
        <li>Senior titles such as lead, staff and distinguished engineer also rose.</li>
      </ul>
      <p>Dice notes that its data was pulled in early October and that earlier months can be revised, so treat the month-to-month swings with some caution. The year-on-year direction has been consistent all year: Dice reported postings with AI in the title up 173 percent in the first quarter.</p>

      <h2>The roles behind the jump</h2>
      <h3>AI trainers</h3>
      <p>AI trainers write, review and grade the examples that models learn from: coding problems, legal questions, customer conversations. Much of this work is remote and contract-based, and domain expertise often matters more than a computer science degree. A nurse, accountant or translator can be exactly what a model developer needs. The catch is stability: projects can end abruptly, and pay ranges widely.</p>
      <h3>Machine learning data engineers</h3>
      <p>These engineers build the pipelines that collect, clean and serve training data. The role sits close to traditional data engineering, so it is the most realistic step into AI work for someone who already writes SQL and Python and has run production data pipelines.</p>
      <h3>MLOps engineers</h3>
      <p>MLOps engineers deploy models, monitor them and keep the cost of running them under control. The skill set overlaps heavily with DevOps and platform engineering. Our guide to <a href="/posts/remote-devops-sre-jobs">remote DevOps and SRE jobs</a> found those fields are unusually likely to be open worldwide, and MLOps is inheriting that pattern.</p>

      <h2>Why the growth is concentrated here</h2>
      <p>The spending explains it. The four largest cloud providers have guided to roughly $700 billion or more of capital spending for 2026 between them, according to their autumn earnings disclosures, much of it on data centres and chips for AI. Every model those data centres run needs data, deployment and evaluation, and those are exactly the titles growing fastest. Research roles, by contrast, remain a small, highly competitive pool.</p>

      <h2>What these roles pay, and where they are open</h2>
      <p>Pay varies widely with seniority and location. Most published salary ranges for AI engineering roles come from US employers, where state pay-transparency laws require them, and they sit well above the average for software roles. Contract AI trainer work is paid hourly and ranges from modest rates for general tasks to high rates for scarce expertise such as medicine, law or advanced mathematics. The <a href="/tools/salary-band-estimator">salary band estimator</a> shows the published ranges on our board by field and level.</p>
      <p>Where the roles are open matters as much as what they pay. AI hiring is concentrated in the US, the UK, Canada and a few European hubs, and most postings name a country. Fully worldwide AI roles exist but are rare, and each attracts a global applicant pool. Infrastructure-heavy roles such as MLOps and platform work are the exception: like DevOps, they are more often open across regions, because the work is already run across time zones. If you are outside the main hiring countries, those are the AI roles to watch first.</p>

      <h2>How to get into AI work from another field</h2>
      <ol>
        <li><strong>Start from your current stack.</strong> Data engineers move to ML data engineering, DevOps engineers to MLOps, analysts to evaluation and analytics roles. A sideways step lands far more often than a leap.</li>
        <li><strong>Use the titles employers use.</strong> "AI engineer", "applied scientist" and "machine learning engineer" overlap but are not interchangeable. The <a href="/tools/job-title-finder">job title finder</a> shows which titles appear on our board and how often.</li>
        <li><strong>Show one shipped project.</strong> A deployed model with monitoring, or a data pipeline feeding a model, beats a list of courses.</li>
        <li><strong>Read the location line.</strong> AI postings are as likely as any other to be limited to one country. The <a href="/tools/remote-job-location-checker">location checker</a> tells you whether a role is open where you live.</li>
      </ol>
      <p>Our <a href="/posts/remote-data-and-machine-learning-jobs">guide to remote data and machine learning jobs</a> breaks down what the field pays and where it hires, and the <a href="/jobs?scope=worldwide">work-from-anywhere board</a> shows the AI roles open in every country today.</p>
    `,
    faq: [
      {
        q: "Are AI jobs growing in 2026?",
        a: "Yes. Dice reported AI and machine learning job postings up 91 percent year on year in October 2026, against 20 percent growth for tech postings overall.",
      },
      {
        q: "Which AI jobs are growing fastest?",
        a: "In Dice's October 2026 data, AI trainers, machine learning data engineers and MLOps engineers each grew more than 150 percent month on month, alongside senior engineering titles.",
      },
      {
        q: "Can I get an AI job without a computer science degree?",
        a: "Often, yes. AI trainer roles value domain expertise such as medicine, law or languages, and ML data engineering and MLOps are usually reached from data engineering or DevOps experience rather than a research degree.",
      },
      {
        q: "Are AI jobs remote?",
        a: "Many are, but most remote AI roles are still limited to a country or region. Check the location line of each posting before applying, and filter for work-from-anywhere roles if you are outside the main hiring countries.",
      },
    ],
  },

  {
    slug: "us-job-market-stalls-september-2026",
    title: "The US Job Market Has Stalled: What It Means for Remote Job Seekers",
    description:
      "US payrolls grew by 29,000 in September 2026 with unemployment at 4.2%. Low hiring, low firing: what a frozen job market means for remote job searches.",
    date: "2026-11-08T02:10:00.000Z",
    author: "Bhargav",
    tags: ["Jobs Report", "US Economy", "Job Market 2026", "Unemployment", "Job Search"],
    readMinutes: 5,
    html: `
      <p>The US labour market spent most of 2026 in an odd state: very few layoffs and very little hiring. The September jobs report from the Bureau of Labor Statistics captured it in one number. Employers added just <strong>29,000 jobs</strong>, and the unemployment rate stayed at <strong>4.2 percent</strong>. The two months before were revised down by a combined 60,000.</p>
      <p>The October report was scheduled for 6 November; forecasters surveyed beforehand expected only modest growth, somewhere around 45,000 to 65,000 jobs, with unemployment unchanged. Whatever the final figure, the pattern is clear, and it shapes how a job search plays out.</p>

      <h2>A low-hire, low-fire market</h2>
      <p>Over the summer, payrolls were first reported at minus 23,000 for July, plus 162,000 for August and plus 29,000 for September. Labour force participation edged up to 61.8 percent. Meanwhile announced layoffs fell: outplacement firm Challenger, Gray &amp; Christmas counted 617,189 announced cuts through October, about 44 percent fewer than the same period of 2025.</p>
      <p>Put together, that is a market where people who have jobs mostly keep them, and people who need jobs wait longer to find one. Economists call it low churn. For job seekers it means fewer openings per applicant, longer processes and more competition for each role.</p>

      <h2>What it means for remote job searches</h2>
      <p><strong>Competition for remote roles is wider than for local ones.</strong> A remote role open across a whole country draws applicants from every state; one open worldwide draws them from everywhere. In a slow market that effect is magnified. On our board, only about 2 percent of remote listings can be done from anywhere in the world, and each of those attracts a global field.</p>
      <p><strong>Volume applying works worse, not better.</strong> When there are fewer openings, recruiters can afford to be picky, and generic applications sink. Our <a href="/posts/30-minute-remote-job-search-routine">30-minute daily search routine</a> is built around a small number of tailored applications a week, which is what tends to get responses when the market is tight.</p>
      <p><strong>Freshness matters more.</strong> In a slow market, a posting that has been open for two months has usually either been filled quietly or attracted hundreds of applicants. Our guide to <a href="/posts/the-date-posted-problem-why-freshness-matters">why freshness matters</a> explains how to read a posting's age, and every listing on our board shows it.</p>

      <h2>Where hiring is still growing</h2>
      <p>Not every field is frozen. Job board Dice reported tech postings up 20 percent year on year in October 2026, and AI and machine learning postings up 91 percent. Healthcare has carried much of US job growth in recent years. Within remote work, software engineering, data, sales and customer success remain the largest pools; the <a href="/tools/remote-field-explorer">remote field explorer</a> shows the current split and how many roles in each field are open worldwide.</p>

      <h2>Why the official data has been hard to read</h2>
      <p>Part of what makes 2026 confusing is that the numbers keep moving after they are published. Monthly payroll figures are revised twice, and this year the revisions have mostly been downward, which means each first estimate has looked better than the reality turned out to be. September's report alone took 60,000 jobs off the previous two months. The July figure, first reported as a small loss, was a reminder that a single month can swing either way.</p>
      <p>For a job seeker, the lesson is to watch the trend rather than any single report. Three readings have pointed the same way all year: payroll growth well below the pace of previous years, unemployment edging up slowly from about 4.1 to 4.2 percent, and announced layoffs falling. That combination describes a market that is cooling without collapsing. It rewards patience and precision more than speed, and it tends to favour candidates who can show they will be productive quickly, which is why the advice below leans on targeting rather than volume.</p>

      <h2>How to adjust your search</h2>
      <ol>
        <li><strong>Widen the titles, not the locations you cannot work from.</strong> Search for every title your work goes by; the <a href="/tools/job-title-finder">job title finder</a> lists the ones employers use.</li>
        <li><strong>Apply early.</strong> Set up a routine that catches new listings within days of posting.</li>
        <li><strong>Prepare for longer processes.</strong> More interview rounds and slower decisions are common when companies hire cautiously. Keep several applications moving at once, and track them; the <a href="/tools/application-tracker">application tracker</a> keeps that simple.</li>
        <li><strong>Check the location line first.</strong> In a tight market, applying to roles you cannot legally take wastes the effort you most need.</li>
      </ol>
      <p>A stalled market is frustrating, but it is not a closed one. Companies are still hiring. They are just hiring fewer people, more carefully, and they reward applicants who make the fit obvious. Start with the <a href="/jobs">full board</a> and narrow from there.</p>
    `,
    faq: [
      {
        q: "How many jobs did the US add in September 2026?",
        a: "The Bureau of Labor Statistics reported 29,000 jobs added in September 2026, with the unemployment rate at 4.2 percent and a combined 60,000 downward revision to the two previous months.",
      },
      {
        q: "What is a low-hire, low-fire job market?",
        a: "A market where layoffs are low but so is hiring. People with jobs mostly keep them, while job seekers face fewer openings and longer searches, which is the pattern the US labour market showed through 2026.",
      },
      {
        q: "Is it harder to find a remote job in a slow economy?",
        a: "Usually, because each remote opening attracts applicants from a wider area. Tailored applications, applying early and targeting roles open where you live help more than sending more applications.",
      },
      {
        q: "Which fields are still hiring in late 2026?",
        a: "Dice reported tech postings up 20 percent and AI and machine learning postings up 91 percent year on year in October 2026. Healthcare has also continued to add jobs.",
      },
    ],
  },

  {
    slug: "is-ai-killing-entry-level-jobs-2026-evidence",
    title: "Is AI Really Killing Entry-Level Jobs? What the 2026 Evidence Says",
    description:
      "Entry-level postings are down and senior ones up, but is AI the cause? The 2026 studies from Stanford, Indeed, LSE and NACE, and what new graduates can do.",
    date: "2026-11-08T02:15:00.000Z",
    author: "Bhargav",
    tags: ["Entry Level Jobs", "New Graduates", "AI and Jobs", "First Job", "Career Advice"],
    readMinutes: 6,
    html: `
      <p>"AI is taking the first rung off the career ladder" has become one of the most repeated lines of 2026. There is real evidence behind it. There is also real evidence that the story is more complicated. If you are a new graduate or career changer, the difference matters, because it changes what you should do.</p>

      <h2>The evidence that entry-level hiring has weakened</h2>
      <ul>
        <li><strong>Postings:</strong> Indeed's Hiring Lab reported US entry-level job postings down 7.5 percent year on year, while senior postings rose 14.7 percent.</li>
        <li><strong>Hires:</strong> LinkedIn data showed entry-level hires down 6 percent and mid-level hires down 10 percent.</li>
        <li><strong>AI-exposed jobs:</strong> A widely cited Stanford study, known as "Canaries in the Coal Mine", reported a relative employment drop of around 13 percent since late 2022 for workers aged 22 to 25 in the most AI-exposed occupations, with early-career software developers among the hardest hit.</li>
        <li><strong>Employer intentions:</strong> In a February 2026 survey of 933 US business leaders by Resume.org, 21 percent said their company had frozen entry-level hiring because of AI.</li>
      </ul>

      <h2>The evidence that AI is not the only cause</h2>
      <ul>
        <li><strong>Remote work:</strong> A study from the London School of Economics published in May 2026 reportedly found remote work was a better predictor of the fall in entry-level hiring than AI exposure. The logic is simple: junior staff learn by sitting near experienced ones, and distributed companies find that harder to provide.</li>
        <li><strong>The economy:</strong> Overall hiring was weak through 2026. When companies hire less, they tend to cut junior openings first and keep the experienced hires who can be productive immediately.</li>
        <li><strong>Mixed graduate data:</strong> The National Association of Colleges and Employers projected a 5.6 percent rise in hiring for the class of 2026, at odds with the gloomiest readings.</li>
        <li><strong>Economists' caution:</strong> Reporting by NPR in August 2026 found many economists unconvinced that AI explains most of the change, pointing to interest rates and post-pandemic over-hiring as well.</li>
      </ul>
      <p>The most careful summary, from an analysis published in September 2026, is that entry-level hiring has weakened and AI is one of several causes, mixed up with the economy and remote work. Employers are shifting toward experienced hires more than eliminating junior roles outright.</p>

      <h2>What this means for remote entry-level jobs</h2>
      <p>The remote-work finding should worry remote job seekers most. Fully remote junior roles were already scarce; on our board, junior titles are a small minority in every field, and in software engineering they are a handful out of hundreds. Our guide to <a href="/posts/remote-software-engineering-jobs">remote software engineering jobs</a> counts them.</p>

      <h2>Why the studies disagree</h2>
      <p>The studies measure different things, which explains much of the disagreement. Posting data counts advertised vacancies, which can fall because companies advertise less even when they hire through referrals. Hiring data counts people who started jobs, but often only on one platform. Employment studies, like the Stanford work, compare groups of workers over time but cannot easily separate AI from the many other changes since 2022, from interest rates to the end of pandemic over-hiring.</p>
      <p>There is also a timing problem. AI tools improved quickly through 2024 and 2025, but large companies adopt slowly, and entry-level hiring plans are set a year or more ahead for graduate programmes. Some of what we see in 2026 may reflect decisions made before current tools existed. The honest conclusion is that we will understand this period better in two or three years than we do now, and that anyone claiming certainty in either direction is ahead of the evidence.</p>

      <h2>What new graduates can do</h2>
      <ol>
        <li><strong>Consider a hybrid or local first job.</strong> If the strongest evidence is that juniors learn best near seniors, a first role with some in-person time can pay off. Our guide to <a href="/posts/first-remote-job-2026-no-experience">getting a first remote job</a> covers when going fully remote early makes sense.</li>
        <li><strong>Aim at entry points that still hire.</strong> Customer support, sales development and operations roles still hire juniors remotely; our guide to <a href="/posts/best-remote-jobs-without-tech-background-2026">remote jobs without a tech background</a> lists them.</li>
        <li><strong>Show you can work with AI tools, not just about them.</strong> Employers increasingly ask. One staffing firm's research found the share of students asked about their AI skills by potential employers rose from 11.6 percent in 2024 to 42.6 percent in 2026.</li>
        <li><strong>Demonstrate written, independent work.</strong> Remote employers hire juniors who show they can work without constant supervision. A public project with clear documentation is the best proof.</li>
      </ol>
      <p>The first rung is harder to reach in 2026. It has not been removed. Search the <a href="/jobs">full board</a> for junior and associate titles, and use the <a href="/tools/job-title-finder">job title finder</a> to find the words employers use for them.</p>
    `,
    faq: [
      {
        q: "Is AI reducing entry-level jobs?",
        a: "It appears to be one factor. Entry-level postings fell 7.5 percent year on year in Indeed data while senior postings rose, but studies also point to remote work and the weak economy as major causes.",
      },
      {
        q: "Which entry-level jobs are most affected by AI?",
        a: "Studies point to the most AI-exposed occupations, including early-career software development, where Stanford researchers reported a relative employment drop among workers aged 22 to 25.",
      },
      {
        q: "Should new graduates look for remote jobs?",
        a: "They can, but fully remote junior roles are scarce and research suggests juniors learn faster near experienced colleagues. A hybrid first role is often a stronger start.",
      },
      {
        q: "Do employers ask graduates about AI skills?",
        a: "Increasingly. One staffing firm's research found the share of students asked about AI skills by potential employers rose from 11.6 percent in 2024 to 42.6 percent in 2026.",
      },
    ],
  },

  {
    slug: "bank-of-england-ai-productivity-jobs-uk-2026",
    title: "Bank of England: AI Makes UK Firms More Productive, With Fewer Jobs",
    description:
      "Bank of England research in 2026 links AI to higher productivity and fewer jobs at UK firms, with vacancies in AI-exposed roles down 15%. What it means.",
    date: "2026-11-08T02:20:00.000Z",
    author: "Bhargav",
    tags: ["UK Jobs", "Bank of England", "AI and Productivity", "UK Remote Jobs", "AI and Jobs"],
    readMinutes: 5,
    html: `
      <p>Some of the clearest evidence on how AI is changing work in 2026 has come from the Bank of England. Its analysis, reported by Bloomberg in August, found that British firms developing and using AI are becoming more productive, but that the gains are coming at the expense of jobs. A Bank blog post put a number on it: <strong>vacancies in the occupations most exposed to AI have fallen about 15 percent over three years</strong>.</p>

      <h2>What the research found</h2>
      <p>The Bank's work comes in two parts. The first is its analysis of UK firms, which links AI adoption to higher output per worker alongside slower hiring. The second is a large survey that Bank staff co-authored with economists in the US and elsewhere, covering nearly 6,000 executives in the US, UK, Germany and Australia between November 2025 and January 2026.</p>
      <ul>
        <li>About <strong>70 percent of firms</strong> said they had adopted AI in some form.</li>
        <li>More than <strong>80 percent</strong> reported no measurable effect yet on either employment or productivity.</li>
        <li>Looking three years ahead, firms expected AI to raise productivity by about <strong>1.4 percent</strong>, raise output by about 0.8 percent and reduce employment by about <strong>0.7 percent</strong>.</li>
      </ul>
      <p>The survey paper has not been peer reviewed, and expectations are not outcomes. But the shape is consistent: AI is widespread, its effect so far is small for most firms, and where it is large it tends to mean the same output with fewer hires.</p>

      <h2>The UK looks harder hit than its peers</h2>
      <p>Other research points the same way for Britain specifically. Morgan Stanley reported that UK firms recorded an 8 percent net job loss linked to AI over the past year, the worst among the major economies it studied. A Lloyds survey offered a counterweight: 54 percent of UK businesses said AI had created new jobs. Both can be true at once, as roles disappear in one part of a company and appear in another.</p>

      <h2>Which jobs feel it first</h2>
      <p>The occupations most exposed to AI are mostly office-based: administrative and clerical work, some customer service, junior analysis, translation and content production. That overlaps heavily with roles that are commonly remote. In practice the effect shows up as fewer openings rather than mass layoffs. Companies replace leavers less often and hire fewer juniors.</p>

      <h2>Why fewer vacancies, not mass layoffs</h2>
      <p>The Bank's finding that vacancies, rather than existing jobs, are falling fits how firms actually adopt new technology. Few companies fire people the week a tool arrives. Instead they let natural turnover do the work: when someone leaves, the team absorbs the work with better tools instead of replacing them. Over three years that adds up to a meaningful fall in openings without a single dramatic layoff. It is also harder to see in headline data, because unemployment rises only slowly when the effect falls on people looking to enter or move jobs rather than on people already employed.</p>
      <p>That has a practical consequence. The people most affected are not current employees but job seekers, particularly those trying to enter exposed occupations or switch into them. Graduates and career changers aiming at junior administrative, analytical or content roles face the steepest competition. For them, the strongest strategy is to aim slightly above the most automatable tasks: roles that combine routine work with client contact, coordination or specialist knowledge.</p>

      <h2>What it means for job seekers in the UK</h2>
      <ol>
        <li><strong>Expect fewer openings in exposed roles, not none.</strong> A 15 percent fall in vacancies over three years is significant but gradual. Applications that show you use AI tools well are increasingly expected.</li>
        <li><strong>Look at UK-open remote roles, not just UK-based ones.</strong> Many remote listings are open to the UK as part of "Europe" or "EMEA". Our guide to <a href="/posts/remote-job-region-labels-explained">what EMEA and other region labels mean</a> explains which include the UK, and the <a href="/tools/remote-job-location-checker">location checker</a> reads any listing for you.</li>
        <li><strong>Lean toward roles AI makes more valuable.</strong> Work that combines judgement, client contact and accountability, such as account management, solutions engineering and specialist roles, is growing as routine tasks shrink.</li>
        <li><strong>Check the contract terms.</strong> UK candidates hired by overseas companies are often offered contractor or employer-of-record arrangements. Our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a> explains the trade-offs.</li>
      </ol>
      <p>Our <a href="/posts/remote-jobs-london">guide to remote jobs for London and the UK</a> covers where UK candidates find remote work, and the <a href="/jobs">board</a> lets you filter to roles open in the UK.</p>
    `,
    faq: [
      {
        q: "What did the Bank of England find about AI and jobs?",
        a: "Its 2026 analysis found UK firms using AI are becoming more productive, but the gains are coming with fewer jobs, and vacancies in the most AI-exposed occupations fell about 15 percent over three years.",
      },
      {
        q: "How many firms have adopted AI?",
        a: "In a survey of nearly 6,000 executives in the US, UK, Germany and Australia co-authored by Bank of England staff, about 70 percent of firms said they had adopted AI, though over 80 percent saw no measurable effect yet.",
      },
      {
        q: "Is the UK losing more jobs to AI than other countries?",
        a: "Morgan Stanley reported an 8 percent net job loss linked to AI at UK firms over the past year, the highest among the major economies it studied, though a Lloyds survey found 54 percent of UK firms said AI had created jobs.",
      },
      {
        q: "Which jobs are most exposed to AI?",
        a: "Mainly office-based roles such as administrative and clerical work, some customer service, junior analysis, translation and content production, where AI can handle routine tasks.",
      },
    ],
  },

  {
    slug: "openai-devday-2026-dots-agents-jobs",
    title: "OpenAI's Always-On Agents Get Their Own Computers: What It Means",
    description:
      "OpenAI's DevDay 2026 launched Dots, always-on agents with their own computers you assign work in Slack or Teams. What changes for knowledge workers.",
    date: "2026-11-08T02:25:00.000Z",
    author: "Bhargav",
    tags: ["OpenAI", "AI Agents", "DevDay 2026", "Future of Work", "AI and Jobs"],
    readMinutes: 5,
    html: `
      <p>At its DevDay conference on 29 September 2026, OpenAI announced more than 20 updates across its models, ChatGPT, Codex and enterprise products. The one with the most direct bearing on how people work was a new kind of agent called <strong>Dots</strong>: always-on AI agents that run on their own computers and can be handed tasks from the tools teams already use, such as Slack and Microsoft Teams.</p>

      <h2>What OpenAI announced</h2>
      <ul>
        <li><strong>Dots:</strong> persistent agents that keep working in the background on assigned tasks, with their own computer environment rather than borrowing yours.</li>
        <li><strong>GPT-6.1 Sol:</strong> a cheaper model aimed at running agents at scale, alongside a faster paid speed tier priced at $500.</li>
        <li><strong>A shelved flagship:</strong> several outlets reported that OpenAI held back its next flagship model, GPT-6.1 Astra, after it did not meet the company's safety standards.</li>
        <li><strong>A follow-up model:</strong> in late October, OpenAI released GPT-6.1 Terra, a mid-tier model for operating computers, at roughly half the price of its predecessor, according to release trackers.</li>
      </ul>
      <p>Days later, Google announced a similar idea: a unified Gemini agent for businesses that gets its own Workspace account, email address and a task inbox showing what it is doing. Two of the largest AI companies converging on "an agent with its own desk" in the same fortnight is the real news.</p>

      <h2>Why "its own computer" matters</h2>
      <p>Earlier assistants waited for a prompt and returned an answer. An always-on agent with its own machine can do multi-step work across applications: gather data from several systems, fill in a spreadsheet, draft a report, file a ticket and report back. That moves AI from helping with a task to owning a task, at least a narrow and well-defined one.</p>
      <p>It also changes who manages the work. Someone has to assign the agent tasks, check its output and decide what it is allowed to touch. In practice, many knowledge workers will find part of their job becoming supervision: briefing, reviewing and correcting automated work.</p>

      <h2>Which jobs it touches first</h2>
      <p>Narrow, repeatable, computer-based tasks are the first candidates: report compilation, data entry across systems, first-line support triage, scheduling, routine research. Those tasks are spread across many jobs rather than concentrated in a few, which is why the effect so far shows up as changed job content more than eliminated roles. Outplacement firm Challenger, Gray &amp; Christmas counted only 1,265 job cuts attributed to AI in October 2026, the lowest month of the year.</p>
      <p>Remote workers are well placed in one respect: teams that already work in writing through tools like Slack are the ones where an agent can most easily be given work. Clear written briefs, well-documented processes and good judgement about what to check are exactly the habits remote work rewards.</p>

      <h2>The safety question behind the headlines</h2>
      <p>The shelved model was the other story of DevDay. Reports that OpenAI held back GPT-6.1 Astra because it did not meet its safety standards, while launching agents designed to act on their own, captured the tension running through the industry. An agent that can operate a computer can also make mistakes at scale, send the wrong email, change the wrong record or be manipulated by malicious content it reads along the way.</p>
      <p>For employers, that means agents arrive with governance work attached: deciding what each agent may access, logging what it does, and having a person review anything consequential. For employees, it creates new responsibilities that look a lot like management. Security, compliance and operations teams will spend much of the next year writing the rules. People who understand both the business process and the risks will be in demand, and those roles, from AI operations to governance and security, are among the newer titles appearing on job boards this autumn.</p>

      <h2>What to do about it</h2>
      <ol>
        <li><strong>Get good at briefing.</strong> Writing a task clearly enough for an agent is the same skill as writing a clear brief for a colleague in another time zone.</li>
        <li><strong>Own the outcome, not the steps.</strong> Roles defined by results and judgement are harder to hand to an agent than roles defined by procedures.</li>
        <li><strong>Show it in applications.</strong> Employers increasingly ask how candidates use AI tools. A concrete example of automating part of your own work is a strong answer; our guide to <a href="/posts/remote-job-interview-questions">remote job interview questions</a> covers how to frame it.</li>
      </ol>
      <p>For the bigger picture on which roles are growing, read our coverage of <a href="/posts/ai-machine-learning-jobs-up-91-percent-2026">AI job postings up 91 percent</a>, and browse current <a href="/jobs">remote roles on the board</a>.</p>
    `,
    faq: [
      {
        q: "What are OpenAI Dots agents?",
        a: "Dots are always-on AI agents OpenAI announced at DevDay on 29 September 2026. They run on their own computers and can be assigned tasks from tools like Slack and Microsoft Teams.",
      },
      {
        q: "Did OpenAI delay a model in 2026?",
        a: "Several outlets reported that OpenAI held back its next flagship model, GPT-6.1 Astra, because it did not meet the company's safety standards, while releasing the cheaper GPT-6.1 Sol and later GPT-6.1 Terra.",
      },
      {
        q: "Will AI agents replace office jobs?",
        a: "So far they mostly take over narrow, repeatable tasks within jobs. That changes what many roles involve, with more briefing and reviewing, rather than eliminating them outright.",
      },
      {
        q: "How can I prepare for AI agents at work?",
        a: "Practise writing clear briefs, focus on work defined by outcomes and judgement, and be ready to describe concretely how you use AI tools to do your job better.",
      },
    ],
  },

  {
    slug: "spacex-cursor-acquisition-developers",
    title: "SpaceX Bought Cursor for $60 Billion. What It Means for Developers",
    description:
      "SpaceX agreed to buy Anysphere, maker of the Cursor coding tool, for about $60 billion. What the deal means for developers and AI coding tools.",
    date: "2026-11-08T02:30:00.000Z",
    author: "Bhargav",
    tags: ["Cursor", "SpaceX", "AI Coding Tools", "Software Developers", "Tech News"],
    readMinutes: 5,
    html: `
      <p>One of the most surprising technology deals of 2026 put the most popular AI coding editor inside a rocket company. On 16 June, SpaceX agreed to acquire Anysphere, the company behind the Cursor code editor, in an all-stock deal valued at roughly <strong>$60 billion</strong>, according to reports citing the company's regulatory filing. The agreement followed an option SpaceX secured in April to either buy Anysphere later in the year or pay $10 billion for a partnership; it chose to buy.</p>

      <h2>Why a rocket company wants a code editor</h2>
      <p>The deal makes more sense in the context of SpaceX's AI business. Reports earlier in the year said Cursor had agreed to use the Colossus supercomputer run by Elon Musk's AI company, and SpaceX said its AI unit had been jointly training a model with Cursor, to be released in Cursor and in its own Grok coding product. Owning the editor that millions of developers use every day gives that model a distribution channel competitors would struggle to match.</p>
      <p>The announcement came days after SpaceX's stock market listing and was expected to close in the third quarter of 2026, subject to regulatory approval.</p>

      <h2>What it means for developers using Cursor</h2>
      <ul>
        <li><strong>Model choice may narrow.</strong> Cursor has relied heavily on third-party models, including Anthropic's Claude and OpenAI's models. A move toward an in-house model is the obvious direction. One report said OpenAI would stop supplying its models to Cursor from 12 November 2026; we could not confirm that independently, so treat it as unverified.</li>
        <li><strong>Pricing and terms can change.</strong> Ownership changes usually bring revised plans. Teams that depend on Cursor should check their contracts and keep their workflows portable.</li>
        <li><strong>Competition intensifies.</strong> OpenAI, Anthropic, Google and GitHub all offer AI coding agents. A consolidated market with a few large owners tends to compete on features in the short term and on lock-in in the long term.</li>
      </ul>

      <h2>How big the AI coding market has become</h2>
      <p>The price itself is a signal. Valuing a code editor at around $60 billion only makes sense if AI-assisted development becomes the default way software is written, and if whoever owns the tool can capture a share of that work. Every major AI company now competes for the same developers: OpenAI with Codex, Anthropic with Claude Code, Google with its Gemini tools and GitHub with Copilot. The tools are converging on the same idea, an agent that can read a whole codebase, make changes across many files and run the tests, with the developer reviewing the result.</p>
      <p>For working developers, that shifts where the value lies. Writing boilerplate is becoming cheap. Understanding a system well enough to know what should change, specifying it precisely and checking that the change is right is becoming the job. Teams also need people who can set up the guardrails: test suites good enough to catch an agent's mistakes, and review processes that do not wave through large AI-written changes unread.</p>

      <h2>What it means for developer jobs</h2>
      <p>The $60 billion price tag is a bet that AI coding tools will change how most software is written. That is already visible in hiring. Developers are increasingly expected to work with coding agents, and job postings mention AI-assisted development more often. At the same time, junior developer hiring has weakened: our analysis of <a href="/posts/is-ai-killing-entry-level-jobs-2026-evidence">the 2026 evidence on entry-level jobs</a> covers why AI is one cause among several.</p>
      <p>The practical response is the same whichever editor wins:</p>
      <ol>
        <li><strong>Stay tool-agnostic.</strong> Know the underlying skills, such as reading code, testing, debugging and design, well enough to switch tools when terms change.</li>
        <li><strong>Get good at reviewing AI-written code.</strong> As agents write more, the scarce skill is spotting what they got wrong.</li>
        <li><strong>Show it in your portfolio.</strong> A project where you used an agent and can explain what you changed and why is more convincing than either "I don't use AI" or "AI wrote it".</li>
      </ol>
      <p>Our guide to <a href="/posts/remote-software-engineering-jobs">remote software engineering jobs</a> covers what the field pays and where it hires, and the <a href="/jobs">board</a> lists current remote engineering roles, each labelled with where you can work from.</p>
      <p>One more practical point for teams: AI coding tools see your code. Before adopting any of them, or when ownership changes, check where code and prompts are processed and stored, whether they are used for training, and what the contract says about both. Security and legal reviews of these tools are becoming routine at larger employers, and candidates who understand those questions stand out in interviews.</p>
    `,
    faq: [
      {
        q: "Did SpaceX buy Cursor?",
        a: "Yes. On 16 June 2026 SpaceX agreed to acquire Anysphere, the maker of the Cursor code editor, in an all-stock deal valued at about $60 billion, expected to close in the third quarter of 2026.",
      },
      {
        q: "Why did SpaceX buy Cursor?",
        a: "To give its AI models a large developer audience. SpaceX said its AI unit had been jointly training a model with Cursor for release in Cursor and its own Grok coding product.",
      },
      {
        q: "Will Cursor still use OpenAI and Claude models?",
        a: "That is unclear. Cursor has relied on third-party models, but the deal points toward an in-house model. One report said OpenAI would stop supplying Cursor from 12 November 2026, which we could not confirm.",
      },
      {
        q: "How should developers respond to AI coding tool changes?",
        a: "Keep core skills like reading, testing and debugging code sharp, avoid locking workflows to one tool, and build experience reviewing AI-generated code critically.",
      },
    ],
  },

  {
    slug: "big-tech-ai-capex-2026-jobs-data-centers",
    title: "Big Tech Will Spend $700 Billion on AI in 2026. Where Are the Jobs?",
    description:
      "Amazon, Alphabet, Meta and Microsoft guided to about $700 billion of 2026 capital spending. The jobs that money creates, and which of them are remote.",
    date: "2026-11-08T02:35:00.000Z",
    author: "Bhargav",
    tags: ["AI Spending", "Data Centers", "Big Tech Earnings", "Tech Jobs", "Infrastructure"],
    readMinutes: 5,
    html: `
      <p>The largest technology companies told investors in their autumn 2026 earnings reports that they will spend more on AI infrastructure than ever. Estimates that add up their disclosures put the combined 2026 capital spending of Amazon, Alphabet, Meta and Microsoft at roughly <strong>$700 billion to $745 billion</strong>. Most of it goes on data centres, chips, networking and power.</p>
      <p>Spending on that scale creates jobs. The question for job seekers is which ones, and how many of them can be done remotely.</p>

      <h2>What the companies said</h2>
      <ul>
        <li><strong>Amazon</strong> raised its 2026 spending plan to about $220 billion, from $200 billion, citing rising memory costs.</li>
        <li><strong>Alphabet</strong> guided to $195 billion to $205 billion for 2026 and flagged a "significant increase" for 2027. Its chief financial officer, Anat Ashkenazi, said the company had started renting third-party computing capacity because supply is constrained.</li>
        <li><strong>Meta</strong> narrowed its range to $135 billion to $145 billion and disclosed $279 billion of future data centre lease obligations, up 53 percent from the previous quarter.</li>
        <li><strong>Microsoft</strong>'s chief financial officer, Amy Hood, said she expected capital spending of more than $50 billion in a single quarter.</li>
      </ul>
      <p>The funding is changing too. The Bank for International Settlements noted in late October that long-dated bonds from these companies made up about a quarter of corporate issuance at those maturities in 2026. AI infrastructure is now being financed like utilities.</p>

      <h2>The jobs it creates, by type</h2>
      <h3>On-site work (mostly not remote)</h3>
      <p>The largest number of jobs is in building and running data centres: electricians, construction trades, mechanical and cooling technicians, power engineers and data centre operations staff. These roles are in short supply in many regions and pay well, but they are tied to a site.</p>
      <h3>Infrastructure engineering (often remote)</h3>
      <p>Behind every data centre are the engineers who manage fleets of machines in software: site reliability, platform and infrastructure engineers, network engineers and capacity planners. Much of this work is remote. Our analysis of <a href="/posts/remote-devops-sre-jobs">remote DevOps and SRE jobs</a> found these fields are several times more likely than average to be open worldwide.</p>
      <h3>AI engineering and data (often remote)</h3>
      <p>The machines exist to train and run models, which needs ML engineers, MLOps engineers and data engineers. Job board Dice reported AI and machine learning postings up 91 percent year on year in October 2026; our coverage of <a href="/posts/ai-machine-learning-jobs-up-91-percent-2026">which AI roles are growing</a> explains the mix.</p>
      <h3>Selling and supporting it (often remote)</h3>
      <p>Cloud and AI products need solutions engineers, account executives and customer success managers, among the most consistently remote roles on our board.</p>

      <h2>The risk side</h2>
      <p>Spending at this pace has to be paid for. The same companies have been cutting elsewhere: Meta cut about 10 percent of staff in April 2026, and Amazon has made roughly 30,000 corporate cuts since late 2025. Money that goes into data centres does not go into headcount in other teams. If AI revenue disappoints, analysts expect the correction to show up first in hiring.</p>

      <h2>The power problem, and the jobs it creates</h2>
      <p>Electricity is the constraint companies mention most often. New AI data centres draw as much power as small towns, and in many regions the grid cannot connect them as fast as they are built. That has turned power into a hiring story of its own. Utilities, grid operators and energy developers are hiring electrical engineers, transmission planners and project managers. Data centre operators are signing long-term contracts for new generation, including renewables, gas and nuclear projects, each of which needs engineers, permitting specialists and construction managers.</p>
      <p>Most of those roles are on site or hybrid, but the planning, modelling and commercial work behind them is often remote. Energy analysts, project finance specialists and the software engineers who build grid and power-management tools can work from anywhere a company can employ them. If you have a background in energy, construction management or electrical engineering, AI infrastructure is one of the strongest hiring markets of 2026, even though you may never touch a model.</p>

      <h2>How to position yourself</h2>
      <ol>
        <li>If you work in operations or IT infrastructure, cloud and data centre skills are in demand; certifications in a major cloud help.</li>
        <li>If you are in sales or support, cloud and AI products are where budgets are growing.</li>
        <li>Wherever you are, check where a role can be done from before you apply; the <a href="/tools/remote-job-location-checker">location checker</a> reads any listing.</li>
      </ol>
      <p>Browse current infrastructure and AI roles on the <a href="/jobs">board</a>, or compare fields in the <a href="/tools/remote-field-explorer">remote field explorer</a>.</p>
    `,
    faq: [
      {
        q: "How much is Big Tech spending on AI in 2026?",
        a: "Estimates combining the companies' disclosures put 2026 capital spending by Amazon, Alphabet, Meta and Microsoft at roughly $700 billion to $745 billion, mostly on data centres, chips and power.",
      },
      {
        q: "What jobs does AI data centre spending create?",
        a: "On-site trades such as electricians and cooling technicians, plus remote-friendly roles in infrastructure and site reliability engineering, ML and data engineering, and cloud sales and support.",
      },
      {
        q: "Are data centre jobs remote?",
        a: "Construction and operations roles are on site. The software side, such as site reliability, platform, network and ML engineering, is frequently remote.",
      },
      {
        q: "Is AI spending causing layoffs?",
        a: "Indirectly, in some companies. Budget going into data centres has coincided with cuts in other teams, such as Meta's 10 percent reduction in April 2026 and Amazon's rolling corporate cuts.",
      },
    ],
  },

  {
    slug: "amazon-corporate-layoffs-2026-what-it-signals",
    title: "Amazon Keeps Cutting Corporate Jobs in Small Rounds. What It Signals",
    description:
      "Amazon cut under 1,000 corporate roles in October 2026, after about 30,000 since late 2025, while raising AI spending to $220 billion. What the pattern means.",
    date: "2026-11-08T02:40:00.000Z",
    author: "Bhargav",
    tags: ["Amazon Layoffs", "Corporate Layoffs", "Big Tech", "AI and Jobs", "Job Market 2026"],
    readMinutes: 5,
    html: `
      <p>Amazon made another round of corporate job cuts in early October 2026. Reports put it at <strong>under 1,000 roles</strong>, mostly in its retail Stores division, with affected teams including customer service, marketplace support and retail engineering operations. Notices reportedly went out on 6 and 7 October.</p>
      <p>On its own, a cut of that size would barely make the news at a company of Amazon's scale. In context, it is part of a pattern that matters for anyone working in, or applying to, large technology companies.</p>

      <h2>The pattern</h2>
      <ul>
        <li><strong>October 2025:</strong> about 14,000 corporate roles cut.</li>
        <li><strong>January 2026:</strong> about 16,000 more.</li>
        <li><strong>October 2026:</strong> under 1,000, in retail.</li>
      </ul>
      <p>That is roughly 30,000 corporate roles in a year, delivered in a series of rounds rather than one event. At the same time Amazon raised its planned 2026 capital spending to about $220 billion, much of it for AI computing and data centres. Chief executive Andy Jassy has said publicly that efficiency gains from using AI across the company will reduce the size of its corporate workforce over time.</p>

      <h2>Why companies cut in small rounds</h2>
      <p>Repeated small cuts have become common across large employers in 2026. They let a company adjust team by team, avoid the disruption of one large layoff, and stay below thresholds that trigger some disclosure requirements. They also keep uncertainty high for everyone else: when cuts can come at any time, staff become more cautious, and fewer people move jobs voluntarily.</p>
      <p>Outplacement firm Challenger, Gray &amp; Christmas has tracked the same thing in its data. Total announced cuts through October 2026 were about 44 percent lower than in 2025, but they arrived steadily all year.</p>

      <h2>What it signals about AI and jobs</h2>
      <p>Amazon's cuts have not been officially attributed to AI in any single round. But the combination of rising AI investment, a stated expectation of a smaller corporate workforce and steady trimming is the clearest example of how AI is affecting large-company employment in practice: gradually, through fewer roles in support functions and slower replacement of leavers, rather than through dramatic overnight replacement.</p>

      <h2>How Amazon compares with other large employers</h2>
      <p>Amazon is not alone. Meta cut about 10 percent of its workforce in April 2026, roughly 8,000 people, and closed around 6,000 open roles at the same time. Layoff trackers have listed Oracle, Dell and others among the year's largest cutters. Across the technology sector, outplacement firm Challenger, Gray &amp; Christmas counted 171,501 announced cuts through October, more than any other industry.</p>
      <p>The common thread is that the largest companies are spending heavily on AI infrastructure while holding or reducing headcount elsewhere. That is different from the 2022 and 2023 layoffs, which mostly reversed pandemic over-hiring. The 2026 version is a reallocation: money moves from salaries in some functions to data centres and AI talent in others. For anyone planning a career inside big tech, the safest place has rarely been clearer. It is close to the products the company is investing in, and far from the internal processes it hopes AI will streamline.</p>

      <h2>What it means if you work at, or want to join, a big tech company</h2>
      <ol>
        <li><strong>Prefer teams close to revenue and growth.</strong> Cuts have fallen most often on internal operations and support functions. Teams building or selling growing products are safer.</li>
        <li><strong>Keep your options warm.</strong> In an environment of rolling cuts, an updated CV and a light, continuous search are sensible insurance, not disloyalty.</li>
        <li><strong>Look beyond the largest employers.</strong> Many smaller companies hire remotely and hire across more countries. The <a href="/posts/most-remote-friendly-companies-hiring-worldwide">most remote-friendly companies hiring worldwide</a> are mostly not household names.</li>
        <li><strong>Read offers carefully.</strong> If you are joining a company that has cut recently, ask about team stability and notice terms. Our <a href="/posts/before-you-accept-a-remote-job-offer">checklist before you accept a remote offer</a> covers what to get in writing.</li>
      </ol>
      <p>Browse remote roles across more than 600 employers on the <a href="/jobs">board</a>, or use the <a href="/tools/company-remote-score">company remote score</a> to see how remote-friendly an employer's listings really are.</p>
      <p>If you are affected by a cut, move quickly but deliberately. Negotiate the severance terms you are offered where you can, ask for a reference before you leave, and update your profile while your achievements are fresh. Many people laid off in rolling rounds find their next role through former colleagues who left in earlier rounds, so keep those connections active.</p>
    `,
    faq: [
      {
        q: "Did Amazon have layoffs in October 2026?",
        a: "Yes. Amazon cut under 1,000 corporate roles in early October 2026, mostly in its retail Stores division, including customer service, marketplace support and retail engineering operations.",
      },
      {
        q: "How many corporate jobs has Amazon cut?",
        a: "About 30,000 since October 2025: roughly 14,000 in October 2025, 16,000 in January 2026, and under 1,000 in October 2026.",
      },
      {
        q: "Is Amazon cutting jobs because of AI?",
        a: "Amazon has not tied individual rounds to AI, but chief executive Andy Jassy has said AI efficiency gains will reduce the corporate workforce over time, while the company raised 2026 AI-related spending to about $220 billion.",
      },
      {
        q: "Why do companies make repeated small layoffs?",
        a: "Small rounds let companies adjust team by team and avoid one large disruptive event, but they keep uncertainty high for remaining staff.",
      },
    ],
  },

  {
    slug: "h1b-100000-fee-2026-remote-hiring-abroad",
    title: "The $100,000 H-1B Fee One Year On: Hiring Moves Abroad and Remote",
    description:
      "The $100,000 H-1B fee was extended in 2026 and a wage-weighted lottery replaced random selection. What it means for foreign tech workers and remote hiring.",
    date: "2026-11-08T02:45:00.000Z",
    author: "Bhargav",
    tags: ["H-1B Visa", "Immigration", "Remote Hiring", "Tech Workers", "Work Abroad"],
    readMinutes: 6,
    html: `
      <p>A year after the US introduced a <strong>$100,000 payment</strong> for new H-1B visa petitions, the policy is still in place and still in court. In September 2026, President Trump extended the requirement for another year. Meanwhile a separate rule replaced the random H-1B lottery with a selection process weighted toward higher wages. Together, the two changes have reshaped how US companies hire foreign tech workers.</p>
      <p>This is general information, not legal advice. Immigration rules change often, and anyone affected should check with an immigration lawyer.</p>

      <h2>What changed</h2>
      <ul>
        <li><strong>The fee:</strong> $100,000 for new H-1B petitions for workers outside the US. According to reporting by Bloomberg Law and law firm guidance, workers changing status inside the US, such as international students moving from an F-1 visa, and renewals are not covered.</li>
        <li><strong>The legal status:</strong> contested. Court challenges have been filed, reports in August 2026 described the fee as partly blocked, and the administration proposed a regulation to make it permanent. Check the current position before relying on any reading of it.</li>
        <li><strong>The lottery:</strong> for the fiscal 2027 cap season, a rule effective 27 February 2026 replaced random selection with a wage-weighted process, so higher-paid positions have better odds.</li>
      </ul>

      <h2>The effect on demand</h2>
      <p>Registrations fell sharply. Bloomberg Law reported that lottery entries fell by 85 to 100 percent for the firms most affected, and that IT services company Cognizant entered no registrations at all, after 3,752 the year before. Large technology companies can absorb the cost more easily; Y Combinator's Garry Tan said the fee "won't bother big tech" but would "kneecap startups".</p>

      <h2>Where the hiring went instead</h2>
      <p>Companies that still need the skills have three main options, and remote hiring is one of them:</p>
      <ol>
        <li><strong>Hire graduates already in the US</strong>, who are exempt from the fee when changing status. That intensifies competition for domestic talent.</li>
        <li><strong>Hire in another country through an office or employer of record.</strong> Canada, the UK, Poland, India and Latin America are common choices, often with time-zone overlap in mind.</li>
        <li><strong>Hire remote contractors abroad</strong> for work that does not require presence in the US.</li>
      </ol>
      <p>For workers outside the US, that means some roles that once required relocation are now offered remotely from home, usually through an employer of record or as a contract. Our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a> explains what each arrangement means for your pay and protections.</p>

      <h2>Why the wage-weighted lottery matters as much as the fee</h2>
      <p>The fee attracts the headlines, but the new selection process may matter more over time. Under the old random lottery, a junior developer and a senior architect had roughly the same chance of being selected. Under the wage-weighted process, positions paying more have better odds. That pushes H-1B hiring toward senior and specialist roles and away from entry-level ones, and it makes the visa route least accessible to exactly the workers who were most likely to use it to start a US career.</p>
      <p>For companies, it changes the calculation for junior foreign hires in particular. A graduate hire abroad who would once have been brought to the US is now more likely to be employed remotely from their home country, or not hired at all. For workers, it means the remote route is increasingly the realistic first step into a US company, with relocation, if it comes, later in a career when salary and seniority improve the odds.</p>

      <h2>What foreign tech workers should do</h2>
      <ol>
        <li><strong>Search for roles open to your country, not just US roles.</strong> Many US companies list roles as "Remote - Canada", "LATAM" or "EMEA". Our guide to <a href="/posts/remote-job-region-labels-explained">region labels in remote job ads</a> explains which countries each includes.</li>
        <li><strong>Prioritise time-zone fit.</strong> Companies replacing relocation with remote hiring often want overlap with US hours. The <a href="/tools/timezone-overlap">timezone overlap finder</a> shows what a given team means for your day.</li>
        <li><strong>Be ready to invoice.</strong> If you are offered a contract, our guide to <a href="/posts/how-to-invoice-international-clients">invoicing international clients</a> and the free <a href="/tools/contractor-invoice-generator">invoice generator</a> cover the paperwork.</li>
        <li><strong>Check the location line before applying.</strong> The <a href="/tools/remote-job-location-checker">location checker</a> tells you whether a listing is open where you live.</li>
      </ol>
      <p>Our guide to <a href="/posts/getting-hired-remotely-from-outside-the-us">getting hired remotely from outside the US</a> covers the rest, and the <a href="/jobs?scope=worldwide">work-from-anywhere board</a> lists roles open in every country.</p>
      <p>Finally, remember that remote employment abroad and US immigration are separate questions. Working remotely for a US company from your own country does not give you any right to work in the US, and spending long periods in the US while working remotely can create visa and tax problems. Keep your work location and your travel consistent with what your contract and visa allow.</p>
    `,
    faq: [
      {
        q: "Is the $100,000 H-1B fee still in effect?",
        a: "It was extended for another year in September 2026, but court challenges are ongoing and reports have described it as partly blocked. Check its current legal status with an immigration lawyer.",
      },
      {
        q: "Who has to pay the H-1B fee?",
        a: "Employers filing new H-1B petitions for workers outside the US. According to reporting and law firm guidance, change-of-status cases, such as F-1 students in the US, and renewals are not covered.",
      },
      {
        q: "How does the new H-1B lottery work?",
        a: "For the fiscal 2027 season, a rule effective 27 February 2026 replaced random selection with a wage-weighted process, giving higher-paid positions better odds.",
      },
      {
        q: "Are US companies hiring remotely abroad instead of using H-1B?",
        a: "Many are considering it. Hiring through employers of record or as contractors in countries such as Canada, India, Poland and Latin America is one of the main alternatives to sponsorship.",
      },
    ],
  },
];
