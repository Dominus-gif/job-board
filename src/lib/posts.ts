/**
 * Editorial posts (the "Posts" section). Content is authored HTML — supports
 * full formatting (headings, lists, bold, links, quotes) rendered with the
 * `.prose-post` styles. Each post is its own SEO-optimised, indexable page with
 * Article JSON-LD. Kept as data (no CMS/DB) to match the rest of the app.
 */
import type { FaqItem } from "./landing";

export interface Post {
  slug: string;
  title: string;
  description: string; // meta description (<160 chars)
  date: string; // ISO published date
  updated?: string; // ISO last-updated
  author: string;
  tags: string[];
  readMinutes: number;
  html: string; // authored body (rendered with .prose-post)
  /**
   * Questions a reader is likely to arrive with, answered in plain text.
   * Rendered under the article and emitted as FAQPage JSON-LD, so each answer
   * has to stand on its own without the surrounding prose.
   */
  faq?: FaqItem[];
}

import { POSTS_2026 } from "./posts-2026";
import { POSTS_GUIDES } from "./posts-guides";

export const POSTS: Post[] = [
  {
    slug: "how-to-find-remote-jobs-in-the-usa",
    title: "How to Find Remote Jobs in the USA (2026 Guide)",
    description:
      "Where US remote jobs are, what they pay and how to spot the office-anchored ones, based on 3,000+ US-open listings on our board. Plus how to apply well.",
    date: "2026-07-28T09:00:00.000Z",
    updated: "2026-09-17T10:00:00.000Z",
    author: "getremotejobsnow.com Editorial",
    tags: ["Remote Jobs USA", "Job Search", "Work From Home"],
    readMinutes: 7,
    html: `
      <p>If you live in the United States, you are in the largest remote job market there is. That is good news and a trap at the same time. There are more remote listings open to you than to anyone else, but a big share of them are "remote" only in a narrow sense: remote from an office you are still expected to live near, or remote within a list of approved states. This guide uses the listings on our own board to show where US remote jobs actually are, what they pay, and how to tell a genuinely remote role from one that will ask you to commute after the offer.</p>

      <h2>How big the US remote market is on our board</h2>
      <p>At the time of writing, our board carries 5,707 remote roles from 1,045 employers. Of the 5,405 that are limited to particular regions, 3,072 are open to people in the United States, which is 57% of every region-locked role we list. Most of those (2,914) are open to the US and nowhere else. No other region comes close: Europe and the UK together account for about 1,300.</p>
      <p>By field, the US-open roles break down like this:</p>
      <ul>
        <li><strong>Product:</strong> 1,022 roles, the largest group by far. Browse them on the <a href="/remote-product-jobs">remote product jobs</a> page.</li>
        <li><strong>Management and finance:</strong> 788 roles, from payroll and accounting to operations. See <a href="/remote-management-finance-jobs">management and finance</a>.</li>
        <li><strong>Sales and marketing:</strong> 631 roles, see <a href="/remote-sales-marketing-jobs">sales and marketing</a>.</li>
        <li><strong>DevOps and infrastructure:</strong> 216 roles on <a href="/remote-devops-jobs">DevOps</a>.</li>
        <li><strong>Design, customer support and backend:</strong> 147, 93 and 86 roles respectively.</li>
      </ul>
      <p>Almost all of them (3,041 of 3,072) are full-time. Part-time and contract remote work exists, but on the evidence of this sample it is a small corner of the market rather than a parallel track.</p>

      <h2>What US remote jobs pay</h2>
      <p>Pay is where the US market is most transparent. A growing list of states, including California, Colorado, Washington, New York, Illinois, Massachusetts and New Jersey, now require employers to publish a pay range in job adverts, and many companies simply publish a range everywhere rather than work out which applicant lives where. On our board, 859 of the 3,072 US-open roles (28%) include a US dollar range. For comparison, only 7% of the roles open to Europe do.</p>
      <p>Taking the midpoint of each published range, the median US-open role pays about <strong>$200,500</strong> a year, with the middle half of roles between <strong>$160,000 and $247,750</strong>. That figure leans high because the sample is heavy with senior product, engineering and go-to-market roles at venture-funded software companies, which are the employers most likely to publish ranges. By field, the medians look like this:</p>
      <ul>
        <li>Customer support: about $109,000 (22 roles with pay)</li>
        <li>Sales and marketing: about $174,600 (186 roles)</li>
        <li>Management and finance: about $190,000 (190 roles)</li>
        <li>Product: about $209,300 (270 roles)</li>
        <li>DevOps: about $247,500 (82 roles)</li>
      </ul>
      <p>Treat those as a description of this board, not of the whole economy. If you want a range for your own field and level, the <a href="/tools/salary-band-estimator">salary band estimator</a> filters the same data by category, region and seniority and shows you the sample size behind each number.</p>

      <h2>The location line tells you more than the word "remote"</h2>
      <p>Look at where US-open listings say they are, and a pattern appears. 960 of them name somewhere in the San Francisco Bay Area and 518 name New York. Boston, Austin, Los Angeles, Seattle and Chicago follow with 59 to 78 each. About half (1,523) name no city at all.</p>
      <p>A city in the location line does not make a role fake, but it changes the question you should ask. "Remote, San Francisco" can mean any of three things:</p>
      <ol>
        <li>The company is headquartered there and the role is genuinely remote anywhere in the US.</li>
        <li>The role is remote, but only for people within commuting distance, because the team meets in person every week or month.</li>
        <li>The role is hybrid, and "remote" was added to the listing because it performs better in search.</li>
      </ol>
      <p>The description almost always settles it. Look for phrases like "in office two days a week", "must be based within 50 miles", "relocation to" or a list of states the company can hire in. Our <a href="/tools/jd-remote-analyzer">remote job description analyzer</a> highlights those clauses for you: paste the full description and it marks every hybrid, office, location and timezone condition it finds, using the same rules that decide which roles appear on our worldwide board.</p>

      <h2>State lists and time zones</h2>
      <p>Two restrictions regularly catch US applicants out. The first is the state list. Employing someone in a state means registering for payroll tax, unemployment insurance and sometimes local benefits there, so smaller companies often hire only in the states where they are already set up. If a listing says "we can currently hire in the following states", check the list before you spend an evening on the application.</p>
      <p>The second is the time zone. A role that must overlap with Eastern hours is open to a Californian in principle, but it means a 6am start. Before you apply to a role in a different zone, work out the real overlap with the <a href="/tools/timezone-overlap">timezone overlap finder</a>, and decide whether you would still want the job on a Tuesday in February.</p>

      <h2>Where to look</h2>
      <ul>
        <li><strong>Our US board.</strong> The <a href="/remote-jobs-in-usa">remote jobs in the USA</a> page combines every worldwide role, which you can take from any state, with roles restricted to the US.</li>
        <li><strong>City pages.</strong> If you are happy with a hybrid or commutable role, the <a href="/remote-jobs-in-the-bay-area">Bay Area</a> and <a href="/remote-jobs-in-new-york">New York</a> pages gather the listings anchored there.</li>
        <li><strong>Employer pages.</strong> Our company pages, such as <a href="/companies/gitlab">GitLab</a>, show everything a company has open. GitLab alone had 94 US-open roles at the time of writing.</li>
      </ul>

      <h2>How to apply and stand out</h2>
      <ol>
        <li><strong>Apply early.</strong> The median US-open listing on our board was 21 days old at the time of writing, and only 16% had been posted in the previous week. Fresh roles get read; month-old ones often already have a shortlist.</li>
        <li><strong>Write like a remote colleague.</strong> Remote teams hire people whose written updates they can act on. A short, specific cover note beats a long generic one.</li>
        <li><strong>Show remote evidence.</strong> Name the async tools you have used and describe a project you ran across locations or time zones.</li>
        <li><strong>Match the posting's language.</strong> The <a href="/tools/ats-keyword-checker">ATS keyword checker</a> shows which terms a description leans on and which of them your CV already covers.</li>
      </ol>

      <h2>Is it free to apply?</h2>
      <p>Always. A legitimate US employer will never ask you to pay to apply, buy equipment from a vendor it chooses, or deposit a cheque before you start. If a recruiter message has any of those features, run it through the <a href="/tools/fake-job-checker">fake job posting checker</a> before you reply.</p>

      <p>Ready to start? <a href="/remote-jobs-in-usa">Browse remote jobs in the USA</a>, or go straight to the <a href="/work-from-anywhere-jobs">work-from-anywhere roles</a> that no state list can rule you out of.</p>
    `,
    faq: [
      {
        q: "How many remote jobs are open to people in the US?",
        a: "At the time of writing, 3,072 of the 5,405 region-locked remote roles on getremotejobsnow.com were open to US residents, about 57%. On top of that, every worldwide role on the board can be done from any US state.",
      },
      {
        q: "What do remote jobs in the USA pay?",
        a: "Among US-open roles on our board that publish a US dollar range, the median midpoint was about $200,500, with the middle half between $160,000 and $247,750. The sample leans towards senior software-company roles, so customer support roles sat much lower, at about $109,000.",
      },
      {
        q: "Why does a remote job list a city like San Francisco or New York?",
        a: "Usually because the company is headquartered there. The role may still be remote anywhere in the US, remote only within commuting distance, or hybrid. Read the description for office days, a mileage radius or a list of states before applying.",
      },
      {
        q: "Can a US remote job be limited to certain states?",
        a: "Yes. Employing someone in a state means registering for payroll tax and insurance there, so many companies only hire in states where they are already set up. Listings that do this usually say so in the description.",
      },
    ],
  },
  {
    slug: "remote-jobs-in-europe-where-to-look",
    title: "Remote Jobs in Europe: Where to Look and How to Apply",
    description:
      "Which European countries have the most remote roles, what they pay and why most hide the salary, from 1,293 Europe-open listings on our board.",
    date: "2026-07-20T09:00:00.000Z",
    updated: "2026-09-17T10:00:00.000Z",
    author: "getremotejobsnow.com Editorial",
    tags: ["Remote Jobs Europe", "EU", "Work From Home"],
    readMinutes: 7,
    html: `
      <p>Europe's remote job market looks different from America's. It is smaller, more fragmented by country, and far less open about pay. It is also where many of the best-known distributed companies do much of their hiring. This guide uses the listings on our board to show which countries the roles are in, who is hiring, what the jobs pay when employers say, and how to apply when the country in the location line isn't the one you live in.</p>

      <h2>How many remote roles are open to Europe</h2>
      <p>At the time of writing, 1,293 of the 5,405 region-locked remote roles on our board are open to people in Europe or the UK, just under a quarter. 889 name somewhere in continental Europe and 434 name the UK (a few name both). On top of those, every worldwide role on the board is open to you wherever in Europe you live.</p>
      <p>The roles are spread across 481 different employers, which is a sign of how fragmented the market is. The biggest European hirers on the board were <a href="/companies/gitlab">GitLab</a> (53 roles), <a href="/companies/grafana-labs">Grafana Labs</a> (45) and <a href="/companies/canonical">Canonical</a> (35), followed by ElevenLabs and Ashby.</p>

      <h2>Which countries the roles are in</h2>
      <p>Counting the countries and cities named in each listing's location line, the UK and Germany dominate:</p>
      <ul>
        <li><strong>United Kingdom:</strong> 429 listings, most naming London. See <a href="/remote-jobs-in-uk">remote jobs in the UK</a> and <a href="/remote-jobs-in-london">London</a>.</li>
        <li><strong>Germany:</strong> 367 listings, with Berlin and Munich the most common cities. See <a href="/remote-jobs-in-germany">remote jobs in Germany</a> and <a href="/remote-jobs-in-berlin">Berlin</a>.</li>
        <li><strong>Spain:</strong> 93, mostly Barcelona and Madrid.</li>
        <li><strong>Netherlands and Ireland:</strong> 61 and 60.</li>
        <li><strong>France, Poland, Italy and Portugal:</strong> between 39 and 54 each.</li>
        <li><strong>Romania, Sweden, Switzerland, Austria and Czechia:</strong> between 17 and 33 each.</li>
      </ul>
      <p>Another 50 listings say only "EMEA", and 26 of those use the phrase "Home based - EMEA". Those are often the most flexible roles in the European market, because the employer has already set up a way to hire in several countries.</p>

      <h2>What European remote jobs pay</h2>
      <p>Here is the biggest difference from the US: only 92 of the 1,293 Europe-open roles (7%) publish any pay at all, against 28% of US-open roles. The published figures are useful but thin, so treat them as a rough guide:</p>
      <ul>
        <li><strong>Roles paid in euros:</strong> 32 with a range, median midpoint about <strong>€102,500</strong>, middle half between €83,000 and €125,000.</li>
        <li><strong>Roles paid in pounds:</strong> 39 with a range, median midpoint about <strong>£97,500</strong>.</li>
        <li><strong>Roles paid in US dollars:</strong> 21, usually at US companies hiring in Europe.</li>
      </ul>
      <p>Those are mostly senior software-company roles, which is why they sit well above typical national salaries. That may change. The EU Pay Transparency Directive requires employers to tell candidates the starting pay or pay range before the interview. Member states had until 7 June 2026 to bring it into national law, but only a handful met that deadline and several have announced 2027 start dates, so expect uneven practice for a while. Until then, it is reasonable to ask for the range in your first conversation with the recruiter.</p>
      <p>Because the same salary goes much further in Lisbon than in Zurich, compare offers in terms of what they buy. The <a href="/tools/salary-purchasing-power">salary purchasing-power calculator</a> uses World Bank price levels for 70 countries to show what a salary is worth where you live.</p>

      <h2>What a European location line really means</h2>
      <p>A listing that says "Germany" is usually open to people who live in Germany, because the employer runs payroll there. It is not normally open to someone in Portugal, even though both are in the EU. Freedom of movement lets you move to Germany to take the job; it doesn't oblige a German employer to employ you from Lisbon, with Portuguese payroll, tax and social security.</p>
      <p>There are three common ways around this, and listings often hint at which one applies:</p>
      <ol>
        <li><strong>Local entities.</strong> The company has legal entities in several countries and lists them all. "Remote, UK or Netherlands" means exactly those two.</li>
        <li><strong>Employer of record.</strong> The company employs you through a provider that runs local payroll for it. Listings that say "EMEA" or "anywhere in Europe" often work this way.</li>
        <li><strong>Contracting.</strong> You invoice as a self-employed contractor. This is flexible, but check the tax and social-security position in your own country first. Our guide to <a href="/posts/remote-work-taxes-living-abroad">remote work taxes when living abroad</a> covers the basics.</li>
      </ol>
      <p>Time zone is the other filter. Most European teams are spread across one to three hours, so a role based in Berlin rarely troubles someone in Dublin or Athens. The friction starts when a European role expects overlap with US colleagues. If a listing mentions US hours, check the <a href="/tools/timezone-overlap">timezone overlap finder</a> before you apply.</p>

      <h2>Do you need the local language?</h2>
      <p>For most roles on our board, no. The large distributed employers work in English, and English is the default language of their job adverts. Local-language requirements cluster in customer-facing roles such as sales, support and account management, where you will be speaking to customers in that market. When a listing is written in German or French, treat that as a strong hint that fluency is expected even if the requirements don't say so.</p>

      <h2>How to apply from anywhere in Europe</h2>
      <ol>
        <li><strong>Read the location line first.</strong> If it names a country you don't live in, check the description for EMEA, employer-of-record or relocation wording before you invest time.</li>
        <li><strong>Say where you are and how you can be employed.</strong> One line such as "Based in Lisbon, happy to work through an employer of record or as a contractor" answers the recruiter's first question.</li>
        <li><strong>Ask about pay early.</strong> With so few ranges published, a polite question in the first call saves both sides time.</li>
        <li><strong>Check the employer.</strong> The <a href="/tools/company-remote-score">company remote score</a> shows how many roles an employer has open, where it hires and whether it publishes pay.</li>
      </ol>
      <p>If you are thinking of moving within Europe for a remote job, the <a href="/tools/nomad-visa-checker">digital nomad visa checker</a> covers the programmes for non-EU citizens in Spain, Portugal, Croatia, Estonia, Greece, Malta, Hungary, Italy and Cyprus.</p>

      <p><a href="/remote-jobs-in-europe">Browse remote jobs in Europe</a>, or start from the <a href="/work-from-anywhere-jobs">work-from-anywhere roles</a> that are open to you in every European country.</p>
    `,
    faq: [
      {
        q: "Which European country has the most remote jobs?",
        a: "On getremotejobsnow.com at the time of writing, the UK (429 listings) and Germany (367) were well ahead, followed by Spain (93), the Netherlands (61) and Ireland (60). Another 50 listings were open across EMEA rather than tied to one country.",
      },
      {
        q: "Can I work for a company in another EU country while living at home?",
        a: "Only if the employer can employ you where you live, through its own local entity, an employer of record, or a contractor arrangement. A listing that names one country is usually limited to residents of that country.",
      },
      {
        q: "Why don't European remote jobs show salaries?",
        a: "Publishing ranges has not been standard practice or a legal requirement in most of Europe. Only 7% of Europe-open roles on our board show pay. The EU Pay Transparency Directive requires pay information before interview, but many member states are late in bringing it into national law.",
      },
      {
        q: "Do I need to speak the local language for a remote job in Europe?",
        a: "Usually not for roles at distributed companies, which mostly work in English. Customer-facing roles such as sales and support often do require the language of the market, and adverts written in the local language usually expect fluency.",
      },
    ],
  },
  {
    slug: "work-from-home-vs-work-from-anywhere",
    title: "Work From Home vs Work From Anywhere: What's the Difference?",
    description:
      "Work from home and work from anywhere aren't the same. Only 5% of remote roles on our board are truly location-free. Here's why, and how to find them.",
    date: "2026-07-12T09:00:00.000Z",
    updated: "2026-09-17T10:00:00.000Z",
    author: "getremotejobsnow.com Editorial",
    tags: ["Work From Home", "Remote Work", "Guide"],
    readMinutes: 6,
    html: `
      <p>"Work from home" and "work from anywhere" get used as if they meant the same thing. For a job seeker they don't, and mixing them up is the most common reason people spend evenings on applications they were never eligible for. This guide explains the difference, shows how rare truly location-free roles are using the listings on our board, and explains how to find each kind.</p>

      <h2>Work from home: remote, but somewhere specific</h2>
      <p><strong>Work from home</strong> means you don't commute. It says nothing about where your home has to be. In practice almost every work-from-home role is tied to a country, and often to a region, a state list or a time zone, because the employer needs to run payroll where you live and wants you online when your colleagues are.</p>
      <p>A "remote" US role that requires Eastern hours is a work-from-home role for people in the eastern United States. A "remote, Germany" role is a work-from-home role for people who live in Germany. Both are real remote jobs and good ones. They just aren't open to everyone.</p>

      <h2>Work from anywhere: no location condition at all</h2>
      <p><strong>Work from anywhere</strong>, or location-independent, means the job names no required country, region, city, time zone or local work authorisation. You could do it from your current home, from another city next year, or from another continent. The employer has decided where you sit doesn't matter, and has set up a way to pay people wherever they are, usually through contracts or an employer-of-record provider.</p>
      <p>That is a much stronger promise, and our main board only lists roles that make it. A role that says "remote" but also says "must be based in the EU" or "overlap with Pacific time" goes to the separate <a href="/remote-regional-jobs">regional remote board</a> instead.</p>

      <h2>How rare work-from-anywhere roles are</h2>
      <p>At the time of writing, our board holds 5,707 remote roles. Only <strong>302 of them (5.3%)</strong> pass the worldwide test. The other 5,405 are genuinely remote but region-locked. Of those, 2,914 are open only to the United States, 823 only to Europe, 369 only to the UK, and the rest are spread across Asia-Pacific, India, Canada, Latin America, the Middle East and Africa.</p>
      <p>The gap is even starker by employer. The 302 worldwide roles come from just <strong>27 companies</strong>, against 1,039 companies posting region-locked remote roles. A handful of employers carry most of the location-free market: Canonical had 101 worldwide roles, Supabase 43, ElevenLabs 41 and Remote 40. Our guide to <a href="/posts/how-to-tell-if-a-company-is-truly-distributed">telling whether a company is truly distributed</a> covers what these employers have in common.</p>
      <p>Some fields are far more location-free than others. Across the whole board, the share of roles that are worldwide was:</p>
      <ul>
        <li>Frontend: 14.3% (10 of 70)</li>
        <li>Backend: 13.5% (35 of 259)</li>
        <li>Design: 9.1% (26 of 286)</li>
        <li>DevOps: 8.2% (32 of 391)</li>
        <li>Management and finance: 6.5% (92 of 1,409)</li>
        <li>Customer support: 5.9% (11 of 186)</li>
        <li>Sales and marketing: 5.0% (61 of 1,222)</li>
        <li>Product: 1.8% (32 of 1,782)</li>
      </ul>
      <p>Engineering and design work that can be judged by its output travels well. Product roles, which depend on close collaboration with a specific team and market, are the most likely to be tied to a place.</p>

      <h2>The pay trade-off</h2>
      <p>Work-from-anywhere roles publish pay less often, and when they do, the numbers are lower. 37 of the 302 worldwide roles (12%) show a US dollar range, with a median midpoint of about <strong>$89,400</strong>. Among region-locked roles, 944 show a dollar range, with a median of about <strong>$200,000</strong>.</p>
      <p>Don't read that as "location freedom halves your pay". The two samples contain different jobs: the region-locked group is dominated by senior roles at US software companies, and many worldwide employers set one global rate that sits below San Francisco levels but well above local rates in most countries. What it does mean is that the premium US salaries you see quoted almost always come with a location condition attached. Our guide to <a href="/posts/what-work-from-anywhere-jobs-pay">what work-from-anywhere jobs pay</a> goes into the numbers, and the <a href="/tools/salary-purchasing-power">purchasing-power calculator</a> shows what a global rate is worth where you live.</p>

      <h2>Which one should you look for?</h2>
      <p>Choose work from home if you are settled where you are and want the widest choice of roles and the highest published pay. You will compete for more jobs, and a country-locked role can offer local benefits such as health insurance and pension contributions that contractor-based worldwide roles often don't.</p>
      <p>Choose work from anywhere if you want the freedom to move, live somewhere with fewer local remote employers, or travel for long stretches. Expect fewer openings and more competition for each, and plan for the tax side: working from another country for long enough can make you tax resident there. The <a href="/tools/tax-residency-day-counter">tax residency day counter</a> helps you keep track.</p>

      <h2>How to filter for each</h2>
      <ul>
        <li><strong>Work from home, anywhere in a region:</strong> the <a href="/work-from-home-jobs">work-from-home jobs</a> page, or a region such as <a href="/remote-jobs-in-usa">the USA</a> or <a href="/remote-jobs-in-europe">Europe</a>. Our <a href="/posts/remote-jobs-in-asia-pacific-timezone-filters">Asia-Pacific guide</a> covers time-zone filters for that region.</li>
        <li><strong>Work from anywhere:</strong> the <a href="/work-from-anywhere-jobs">work-from-anywhere jobs</a> page, or <a href="/fully-remote-jobs">fully remote jobs</a> if what you want is simply "no office, ever".</li>
        <li><strong>Only employer-verified worldwide roles:</strong> <a href="/real-work-from-anywhere-jobs">verified work-from-anywhere jobs</a>, where every listing came from the employer's own careers page and names no location at all.</li>
      </ul>
      <p>Whatever you choose, read the whole description, not just the location line. Conditions like "must overlap with CET" or "occasional travel to our Austin office" often appear halfway down. The <a href="/tools/jd-remote-analyzer">remote job description analyzer</a> finds them for you.</p>
    `,
    faq: [
      {
        q: "What is the difference between work from home and work from anywhere?",
        a: "Work from home means you don't commute, but the job is usually still tied to a country, region or time zone. Work from anywhere means the job names no location, time zone or work-authorisation condition, so you can do it from any country.",
      },
      {
        q: "How many remote jobs are truly work from anywhere?",
        a: "Very few. At the time of writing, 302 of the 5,707 remote roles on getremotejobsnow.com (5.3%) had no location condition, and they came from just 27 employers.",
      },
      {
        q: "Do work-from-anywhere jobs pay less?",
        a: "Published ranges are lower on average: about $89,400 median midpoint for worldwide roles on our board, against about $200,000 for region-locked roles. The samples contain different jobs, and many worldwide employers pay one global rate rather than San Francisco rates.",
      },
      {
        q: "Which fields have the most work-from-anywhere jobs?",
        a: "Engineering and design. On our board, 14.3% of frontend roles and 13.5% of backend roles were worldwide, against 1.8% of product roles.",
      },
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...POSTS, ...POSTS_2026, ...POSTS_GUIDES].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
