/**
 * Cluster K: where you can apply from, how you apply, and how you get paid.
 * Written 28 October 2026, alongside three new tools (the location checker,
 * the cover letter builder and the invoice generator) and a board that grew
 * from 3,350 to 4,134 listings when 45 employers were added.
 *
 * Board figures come from scripts/report-locations.ts, report-devops.ts and
 * report-applications.ts, run on 28 October 2026 against the committed
 * snapshot. Tax and late-payment rules were checked on the same day and are
 * phrased as general rules with a pointer to local advice, because both
 * change and both depend on where the contractor is registered.
 */
import type { Post } from "./posts";

export const POSTS_CLUSTER_K: Post[] = [
  {
    slug: "remote-job-region-labels-explained",
    title: "EMEA, APAC, LATAM: What Region Labels in Remote Job Ads Mean",
    description:
      "What EMEA, APAC, LATAM, AMER and DACH cover in a remote job ad, which countries are in doubt, and how to tell whether a region-locked role is open to you.",
    date: "2026-10-28T09:00:00.000Z",
    author: "Bhargav",
    tags: ["EMEA Meaning", "Remote Job Locations", "LATAM Remote Jobs", "APAC Remote Jobs", "Remote Job Search"],
    readMinutes: 7,
    html: `
      <p>Most remote jobs come with a place attached, and the place is often written as an acronym. "Remote - EMEA", "LATAM only", "AMER" and "DACH" each stand for a list of countries, and the lists are not always the ones you would draw on a map. This guide explains what each label usually covers, where employers disagree, and how often each one appears on our board.</p>
      <p>The figures come from every listing on getremotejobsnow.com on <strong>28 October 2026</strong>: <strong>4,134 remote roles from 625 employers</strong>. Only <strong>86 (2.1%)</strong> could be done from anywhere in the world. The other 4,048 name a country, a region, or nothing at all.</p>

      <h2>How remote jobs say where you can work</h2>
      <p>Region labels are less common than you might expect. Of the 4,048 region-locked listings, <strong>3,306 (81.7%) name exactly one country</strong>, usually the United States. Only 225 use a region label, 176 of them on its own and 49 alongside named countries. Another <strong>300 name no place at all</strong>: 250 of those say just "Remote".</p>
      <p>When a label does appear, these were the most common on the board:</p>
      <table>
        <thead><tr><th>Label</th><th>Listings</th></tr></thead>
        <tbody>
          <tr><td>EMEA</td><td>55</td></tr>
          <tr><td>Americas / AMER</td><td>53</td></tr>
          <tr><td>Europe</td><td>48</td></tr>
          <tr><td>North America / NAMER</td><td>41</td></tr>
          <tr><td>APAC</td><td>20</td></tr>
          <tr><td>LATAM</td><td>17</td></tr>
          <tr><td>EU</td><td>8</td></tr>
        </tbody>
      </table>

      <h2>The labels, one by one</h2>
      <h3>EMEA</h3>
      <p>Europe, the Middle East and Africa: around 75 countries, from Iceland and Senegal at UTC+0 to the United Arab Emirates at UTC+4. It is the widest label in common use and the one most likely to be narrower in practice than on paper. An employer can usually pay people only in countries where it has a legal entity or an employer-of-record partner, so "EMEA" often means "the EMEA countries we can hire in". Russia and Belarus are frequently excluded because of sanctions, and Turkey and the Caucasus vary.</p>
      <h3>Europe, the EU and the EEA</h3>
      <p>These are three different things. The <strong>EU</strong> is the 27 member states, which leaves out the United Kingdom, Switzerland and Norway. The <strong>EEA</strong> is the EU plus Iceland, Liechtenstein and Norway. <strong>"Europe"</strong> in a job ad usually means the EU plus the UK, Switzerland and Norway, and often the Balkans and Ukraine. If you live in the UK, a listing that says "EU" is not open to you, while one that says "Europe" normally is.</p>
      <h3>DACH, Benelux, the Nordics and CEE</h3>
      <p>Smaller European groupings with settled meanings. <strong>DACH</strong> is Germany, Austria and Switzerland. <strong>Benelux</strong> is Belgium, the Netherlands and Luxembourg. The <strong>Nordics</strong> are Denmark, Finland, Iceland, Norway and Sweden, though ads use "Scandinavia" for the same group. <strong>CEE</strong>, Central and Eastern Europe, usually means Poland, Czechia, Slovakia, Hungary, Romania, Bulgaria, the Baltic states and the Western Balkans, and it often marks an engineering hub.</p>
      <h3>North America, LATAM and the Americas</h3>
      <p><strong>North America</strong> (or NAMER) almost always means the United States and Canada. Mexico is geographically North American, and some employers include it, so it is the country to ask about. <strong>LATAM</strong> covers Mexico, Central and South America and the Spanish- and Portuguese-speaking Caribbean. <strong>Americas</strong> or <strong>AMER</strong> joins the two, from Hawaii at UTC-10 to Brazil at UTC-3.</p>
      <h3>APAC and its parts</h3>
      <p><strong>APAC</strong>, Asia-Pacific, usually covers East Asia, Southeast Asia, South Asia, Australia and New Zealand: from India at UTC+5:30 to New Zealand at UTC+12. Some employers count India as its own region and some leave out China, so both are worth checking. <strong>ANZ</strong> is Australia and New Zealand, and <strong>Southeast Asia</strong> means Singapore, Malaysia, Indonesia, Thailand, Vietnam, the Philippines and their neighbours.</p>
      <h3>MENA, the Middle East and Africa</h3>
      <p><strong>MENA</strong> is the Middle East and North Africa. <strong>GCC</strong> means the six Gulf Cooperation Council states. "Africa" on its own means the whole continent, while "sub-Saharan Africa" leaves out Algeria, Egypt, Morocco and Tunisia.</p>

      <h2>Why the label is narrower than the map</h2>
      <p>A region label is a statement about the employer's paperwork, not about you. To employ someone legally, a company needs a way to run payroll and pay social contributions in that person's country: its own entity, or an <a href="/posts/contractor-employee-or-employer-of-record">employer of record</a> that does it on its behalf. Time zones are the second reason. A team in Berlin hiring "EMEA" wants someone within a few hours of Central European Time, which an applicant in the Gulf at UTC+4 meets and one in the Pacific does not. Our guide to <a href="/posts/timezone-overlap-how-much-you-need">how much overlap a team needs</a> explains why most teams want three or four shared hours.</p>

      <h2>When the line just says "Remote"</h2>
      <p>A bare "Remote" names nowhere, and 300 listings on the board say only that, or "Distributed". In practice it usually means remote within the employer's home country, and the description says so further down, often in a sentence about work authorisation. Read to the end of the posting before you apply, or paste it into the <a href="/tools/jd-remote-analyzer">remote job description analyzer</a>, which marks every location, visa and time-zone clause. Time-zone windows are almost never in the location line itself. Only 3 of the 4,048 region-locked lines on the board carried one. They sit in the description, which is why <a href="/posts/how-to-spot-hybrid-bait-in-remote-job-descriptions">reading the whole posting</a> matters.</p>

      <h2>How many roles are open to you</h2>
      <p>We counted, for each country, the listings whose location names that country or a region that clearly includes it, plus the 86 open worldwide. A listing for "North America" was not counted for Mexico, and one for "Europe" was not counted for Turkey, because those are exactly the cases employers disagree on.</p>
      <table>
        <thead><tr><th>If you live in</th><th>Roles open to you</th><th>Share of the board</th></tr></thead>
        <tbody>
          <tr><td>United States</td><td>2,402</td><td>58.1%</td></tr>
          <tr><td>Canada</td><td>526</td><td>12.7%</td></tr>
          <tr><td>United Kingdom</td><td>492</td><td>11.9%</td></tr>
          <tr><td>Germany</td><td>338</td><td>8.2%</td></tr>
          <tr><td>Poland</td><td>246</td><td>6.0%</td></tr>
          <tr><td>India</td><td>233</td><td>5.6%</td></tr>
          <tr><td>Brazil</td><td>184</td><td>4.5%</td></tr>
          <tr><td>Mexico</td><td>180</td><td>4.4%</td></tr>
          <tr><td>South Africa</td><td>149</td><td>3.6%</td></tr>
          <tr><td>Nigeria</td><td>142</td><td>3.4%</td></tr>
          <tr><td>Philippines</td><td>141</td><td>3.4%</td></tr>
          <tr><td>Pakistan</td><td>111</td><td>2.7%</td></tr>
        </tbody>
      </table>
      <p>The gap is large. Someone in the United States can apply to more than half the board; someone in Pakistan to under 3% of it, most of that the work-from-anywhere roles. That is why, outside North America and Western Europe, the <a href="/jobs?scope=worldwide">work-from-anywhere listings</a> and the region labels that include you matter so much more than the headline number of remote jobs. The <a href="/remote-regional-jobs">region-locked board</a> lets you filter by region once you know which labels cover you.</p>

      <h2>A quick way to check a listing</h2>
      <ol>
        <li>Read the location line first, not the title. The title is marketing; the location line is the employer's statement about this role.</li>
        <li>Expand any label into countries, and note whether your country is at a disputed edge.</li>
        <li>Look for work authorisation and time-zone sentences in the description. Either can close a role the label left open.</li>
        <li>If your country is at an edge, ask the recruiter one direct question before applying: "Can you hire someone based in [country]?"</li>
      </ol>
      <p>The <a href="/tools/remote-job-location-checker">remote job location checker</a> does the first three steps for you: paste the line, pick your country and time zone, and it shows which places the line names, whether each includes you, and how many roles on the board are open to someone where you live.</p>
    `,
    faq: [
      {
        q: "Does EMEA include the UK?",
        a: "Yes. EMEA stands for Europe, the Middle East and Africa, and the United Kingdom is part of Europe in that sense. A listing that says EU is different: the UK left the European Union in 2020, so an EU-only role is normally not open to someone living in the UK.",
      },
      {
        q: "Is Mexico in North America or LATAM in job postings?",
        a: "Mexico is part of LATAM in almost every job ad. Whether it counts as North America varies: most employers use North America to mean the United States and Canada, and some include Mexico. If a listing says North America and you live in Mexico, ask before applying.",
      },
      {
        q: "Does APAC include India?",
        a: "Usually, yes. APAC normally covers East, Southeast and South Asia plus Australia and New Zealand. Some employers treat India as a separate region with its own hiring, so a role listed for APAC may still be closed to India. The description or the recruiter will say.",
      },
      {
        q: "What does a remote job mean when the location just says Remote?",
        a: "It names no place, so the location line alone cannot tell you. In practice it usually means remote within the employer's home country. Check the description for a work authorisation or time-zone requirement, which is where the real restriction is normally written.",
      },
      {
        q: "Why do remote jobs restrict which countries you can live in?",
        a: "Mostly because of employment law and payroll. To employ someone, a company needs a legal entity or an employer of record in that person's country. Time zones are the other reason: teams want several working hours in common, which rules out applicants too far away.",
      },
    ],
  },

  {
    slug: "how-to-write-a-remote-job-cover-letter",
    title: "How to Write a Cover Letter for a Remote Job (With Template)",
    description:
      "A remote cover letter answers what a CV can't: where you are, which hours you share and how you can be hired. What to write, a template, and mistakes to avoid.",
    date: "2026-10-28T09:10:00.000Z",
    author: "Bhargav",
    tags: ["Remote Cover Letter", "Cover Letter Template", "Remote Job Application", "Job Search", "Remote Work"],
    readMinutes: 7,
    html: `
      <p>Few remote employers ask for a cover letter, and most application forms make it optional. Of the 2,113 listings on our board whose full text we hold, only <strong>11, from 7 employers</strong>, mention a cover letter at all (counted on 28 October 2026). One of them says it would rather see something you have built.</p>
      <p>That does not make the letter useless. It changes its job. A remote application raises three questions a CV rarely answers: where you are, which hours you can share with the team, and on what basis the company can pay you. A short letter that answers them, in clear writing, does something no other part of the application can. This guide covers when to write one, what goes in it, and a template you can adapt.</p>

      <h2>When a cover letter is worth writing</h2>
      <ul>
        <li><strong>When the posting asks for one.</strong> Then it is part of the test, and skipping it usually ends the application.</li>
        <li><strong>When the form has a free-text box</strong>, such as "Anything else you'd like us to know?" A short version of the letter belongs there.</li>
        <li><strong>When your situation needs explaining</strong>: you live outside the employer's main country, you would work as a contractor, or your time zone is at the edge of what the team covers.</li>
      </ul>
      <p>If none of these apply and the form has no space for it, put the effort into your CV and the application questions instead. Our guide to <a href="/posts/what-recruiters-see-when-you-apply-remotely">what recruiters see when you apply remotely</a> shows which parts of an application get read first.</p>

      <h2>The letter is your first writing sample</h2>
      <p>Remote teams work in writing: updates, documents, handovers, decisions recorded in tickets rather than corridors. Employers say so in their postings. On our board, <strong>147 listings (7.0%), from 86 employers</strong>, ask for strong written communication by name, and <strong>142</strong> describe asynchronous work. Whoever reads your letter is judging how you write before they reach your experience. A clear, specific, short letter is evidence in itself. A long, general one is evidence too, of the wrong kind.</p>

      <h2>What to put in it</h2>
      <h3>1. Why this company, specifically</h3>
      <p>One or two sentences that could not be sent to any other employer. Name the product, a post they published, a problem they are solving, or something you have used. "I'm passionate about your mission" says nothing; "I've built two client integrations on your API, and your rate-limit docs are the standard I hold my own writing to" says a great deal.</p>
      <h3>2. Two or three results, each with a number</h3>
      <p>Pick the results that match the posting's top requirements, and give each a figure: a percentage, a count, a time saved. Do not restate your CV; choose the two things you most want them to remember.</p>
      <h3>3. The remote paragraph</h3>
      <p>This is the part most letters leave out. In three or four sentences, say:</p>
      <ul>
        <li><strong>Where you are based</strong>, as a city and country.</li>
        <li><strong>Which hours you share with the team.</strong> Work it out rather than writing "flexible". Lisbon and New York, for example, share three hours of a normal 9:00 to 17:00 day. If you are willing to shift, say by how much.</li>
        <li><strong>One example of working in writing</strong>: a document you wrote that replaced a meeting, a handover across time zones, a decision you drove asynchronously.</li>
        <li><strong>How you can be hired</strong>, if it is relevant and true: you already have the right to work where the role is based, or you can work as a contractor or through an employer of record. Our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractors, employees and employers of record</a> explains the difference.</li>
      </ul>
      <h3>4. A short close</h3>
      <p>One sentence asking for the conversation and one thanking them. Nothing more is needed.</p>

      <h2>A template</h2>
      <p>Keep it between 150 and 400 words. Replace every bracket; delete any sentence you cannot make true.</p>
      <blockquote>
        <p>Hello [name, or the team],</p>
        <p>I'm applying for the [role] role at [company]. [One or two sentences on why this company, naming something specific.]</p>
        <p>In my current role I [result with a number]. I also [second result with a number].</p>
        <p>I've worked remotely for [years], so writing things down is how I work by default. [One example of working in writing.] I'm based in [city, country], and a normal working day gives me [hours] of overlap with [team's city]; I can shift my hours to cover your core hours. [How you can be hired, if relevant.]</p>
        <p>I'd welcome the chance to talk about how I could help [company]. Thank you for reading.</p>
        <p>Best regards,<br/>[Your name]</p>
      </blockquote>
      <p>The <a href="/tools/remote-cover-letter-builder">remote cover letter builder</a> fills this in from your answers, works out the overlap between your city and the team's on today's clocks, and checks the letter against the points above.</p>

      <h2>Mistakes that cost remote applicants</h2>
      <ul>
        <li><strong>Hiding where you live.</strong> If the listing is limited to a country you are not in, the letter will not change that, and a recruiter who finds out late will not be pleased. Check the location line first with the <a href="/tools/remote-job-location-checker">remote job location checker</a>, or start from the <a href="/jobs?scope=worldwide">work-from-anywhere roles</a>, which are open wherever you live.</li>
        <li><strong>Promising hours you cannot keep.</strong> Offering to work until midnight every day reads as keen in a letter and becomes a problem in month three.</li>
        <li><strong>Raising visa sponsorship when nobody asked.</strong> If the role is open where you live, sponsorship is irrelevant. If it is not, the application question will ask, and you should answer it truthfully there.</li>
        <li><strong>Writing about remote work instead of your work.</strong> "I love the flexibility of remote work" is about you. The employer wants to know what you would do for them.</li>
        <li><strong>Opening with "To whom it may concern".</strong> A name, a team, or a plain "Hello" all read better.</li>
      </ul>
      <p>Before you send it, run the posting through the <a href="/tools/ats-keyword-checker">ATS keyword checker</a> against your CV, so the documents use the employer's own words for the skills they want. Then browse the <a href="/jobs">full board</a> for the next role worth writing to.</p>
    `,
    faq: [
      {
        q: "Do remote jobs need a cover letter?",
        a: "Usually not. On our board, only 11 of 2,113 full postings mentioned a cover letter. Write one when the posting asks, when the form has a free-text box, or when you need to explain where you are, which hours you share with the team, or how you can be hired.",
      },
      {
        q: "How long should a remote job cover letter be?",
        a: "Between 150 and 400 words. Remote teams work in writing, so the letter doubles as a writing sample, and a short, specific letter shows the skill they are hiring for better than a long one.",
      },
      {
        q: "Should I mention my time zone in a cover letter?",
        a: "Yes, as a city and country plus the working hours you share with the team. Work out the overlap rather than writing that you are flexible, and say by how much you can shift your day if you are willing to.",
      },
      {
        q: "Should I say I need visa sponsorship in a remote cover letter?",
        a: "Only if it is relevant and the employer has not asked elsewhere. If the role is open in the country where you live, sponsorship does not arise. If it is not, the application form normally asks directly, and that is the place to answer truthfully.",
      },
    ],
  },

  {
    slug: "remote-job-resume-tips",
    title: "How to Write a Resume for Remote Jobs: What to Change",
    description:
      "What a remote resume needs that an office one doesn't: location and time zone in the header, proof of written work, remote results, and titles employers use.",
    date: "2026-10-28T09:20:00.000Z",
    author: "Bhargav",
    tags: ["Remote Resume", "Remote CV", "Resume Tips", "ATS Resume", "Remote Job Application"],
    readMinutes: 7,
    html: `
      <p>A resume for a remote job does the same work as any other, with two additions. It has to answer where you are, because almost every remote role is limited to somewhere, and it has to show that you can work without a manager in the room. Both can be done in a few lines, and most resumes do neither.</p>
      <p>This guide uses what the employers on our board ask for. On <strong>28 October 2026</strong> the board held <strong>4,134 remote listings from 625 employers</strong>; we read the full text of 2,113 of them for the figures below.</p>

      <h2>Put your location and time zone in the header</h2>
      <p>Only <strong>86 of those 4,134 listings (2.1%)</strong> could be done from anywhere. Everything else names a country or region, so the first thing a recruiter checks is whether you are in it. Make that easy:</p>
      <ul>
        <li>Write your <strong>city and country</strong>, and add your time zone as a UTC offset: "Lisbon, Portugal (UTC+0/+1)". Leave out your street address.</li>
        <li>If the role is in a country you are not in but you can be hired there, say how in one short line: "Right to work in the UK", or "Available as a contractor".</li>
        <li>If you are planning a move, write the destination and the date, not the place you are leaving.</li>
      </ul>
      <p>If you are not sure whether a listing's region includes you, the <a href="/tools/remote-job-location-checker">remote job location checker</a> reads the location line and tells you, and our guide to <a href="/posts/remote-job-region-labels-explained">region labels like EMEA and LATAM</a> explains the disputed edges.</p>

      <h2>Show written work, not "great communicator"</h2>
      <p>Employers name writing as a requirement more than any other remote trait we measured: <strong>147 listings (7.0%) from 86 employers</strong> ask for strong written communication by name, and <strong>142</strong> describe asynchronous work. A line in a skills section claiming you communicate well proves nothing. A bullet describing something you wrote does:</p>
      <ul>
        <li>"Wrote the incident-review template adopted by four engineering teams."</li>
        <li>"Replaced a weekly status meeting with a written update read across three time zones."</li>
        <li>"Documented the onboarding process; new hires reached their first shipped change in 6 days instead of 15."</li>
      </ul>
      <p>If you have public writing, such as documentation, a blog, design case studies or open-source pull requests with good descriptions, link one in the header.</p>

      <h2>Turn remote experience into results</h2>
      <p>If you have worked remotely before, say so in the job line ("Remote, team across UK, US and India") rather than in a summary paragraph. Then make the bullets show what remote work requires: deciding without waiting, handing work across time zones, unblocking yourself. Very few postings demand previous remote experience, so do not worry if you have none. Show the same habits from an office job instead: projects you ran end to end, work you documented, teams in other offices you worked with.</p>

      <h2>Use the titles and words employers use</h2>
      <p>Applicant tracking systems and recruiters both search for the employer's own words. If you call yourself a UX designer, consider this: on the day we counted, <strong>49 titles on the board said "product designer" and none said "UX designer"</strong>. Search for the titles your work goes by with the <a href="/tools/job-title-finder">job title finder</a>, and mirror them where they truthfully describe what you did.</p>
      <p>Then compare each resume to the posting with the <a href="/tools/ats-keyword-checker">ATS keyword checker</a>. It lists the skills and terms in the posting your resume does not mention, so you can add the ones you have.</p>

      <h2>Format for a machine first, then a person</h2>
      <ul>
        <li><strong>One column, standard headings</strong> (Experience, Education, Skills). Tables, text boxes and icons can scramble when an applicant tracking system parses the file.</li>
        <li><strong>PDF unless the posting asks for Word.</strong> Name it with your name and the role.</li>
        <li><strong>One page for under ten years of experience, two at most beyond that.</strong></li>
        <li><strong>No photo, age or marital status</strong> for employers in the United States, the UK or Canada. Some European countries still expect a photo; follow the norm of the country the employer hires from.</li>
        <li><strong>Dates as month and year</strong>, so gaps and overlaps are clear without guessing.</li>
      </ul>

      <h2>If you have worked as a contractor</h2>
      <p>List contract work like employment, with the client's name if you are allowed to share it and "Contract" beside the dates. Remote employers often hire through contracts or an employer of record, so contract work reads as relevant experience, not as a gap. Our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractors, employees and employers of record</a> explains how the arrangements differ when an offer arrives.</p>

      <h2>Tailor, but not from scratch</h2>
      <p>Keep one complete master resume and cut a version for each application: reorder the bullets so the posting's top three requirements are answered first, adjust the summary line, and check the keywords. Fifteen minutes per application is enough. A short cover letter can carry what the resume cannot, and our guide to <a href="/posts/how-to-write-a-remote-job-cover-letter">writing a remote cover letter</a> covers the remote paragraph. When you are ready, start with the <a href="/jobs">full board</a> or the <a href="/jobs?scope=worldwide">work-from-anywhere roles</a>.</p>
    `,
    faq: [
      {
        q: "Should I write remote on my resume?",
        a: "Write it beside the jobs that were remote, such as 'Remote, team across UK, US and India', rather than as a headline claim. It tells the reader you have done the work under remote conditions, which a summary line cannot prove.",
      },
      {
        q: "Should I put my time zone on my resume?",
        a: "Yes. Add it to your location in the header as a UTC offset, for example 'Lisbon, Portugal (UTC+0/+1)'. Almost every remote job is limited to a country or region, and recruiters check location and hours first.",
      },
      {
        q: "How long should a resume for a remote job be?",
        a: "One page if you have under ten years of experience, two pages at most beyond that. The same rule applies as for any job, and a concise resume is also a small proof of the clear writing remote teams look for.",
      },
      {
        q: "Do I need a different resume for every remote job?",
        a: "Keep one master resume and tailor a copy for each application: put the bullets that answer the posting's top requirements first, and use the employer's own words for skills you have. That usually takes about fifteen minutes.",
      },
    ],
  },

  {
    slug: "how-to-invoice-international-clients",
    title: "How to Invoice an International Client as a Remote Contractor",
    description:
      "What to put on an invoice to a foreign client: numbering, currency, payment terms, VAT and reverse charge, bank details, and the tax form US clients ask for.",
    date: "2026-10-28T09:30:00.000Z",
    author: "Bhargav",
    tags: ["Invoicing", "Remote Contractor", "Reverse Charge", "Freelance Invoice", "Getting Paid"],
    readMinutes: 8,
    html: `
      <p>Working remotely for a company in another country often means working as a contractor. The employer has no legal entity where you live, so instead of putting you on payroll it asks you to invoice it. That makes you responsible for something employees never think about: a document that gets you paid on time, in the right currency, without tax problems at either end.</p>
      <p>This guide covers what an international invoice should contain and the cross-border points that trip people up. It is practical guidance, not tax advice. Invoicing rules depend on where you are registered, and for anything significant it is worth asking an accountant in your own country.</p>

      <h2>How common contracting is</h2>
      <p>Most remote jobs are still employment. Of the <strong>4,134 listings on our board on 28 October 2026</strong>, 4,094 were advertised as full-time and 29 as contract. Contracting usually comes later, at the offer: a company that can hire you only where it has an entity offers a contract instead, or uses an employer of record. Our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a> compares the three, and the <a href="/tools/freelance-rate-calculator">freelance rate calculator</a> shows how much higher a contract rate must be to match a salary.</p>

      <h2>What every invoice needs</h2>
      <ul>
        <li><strong>Your name or business name, address and contact email.</strong></li>
        <li><strong>The client's legal name and address</strong>, as they appear in your contract.</li>
        <li><strong>A unique, sequential invoice number.</strong> EU rules require numbering in one or more series that identifies each invoice uniquely, and most tax authorities expect the same.</li>
        <li><strong>The issue date and the due date</strong>, or the payment terms that set it.</li>
        <li><strong>What you did and for which period</strong>: "Product design, 1 to 31 October 2026", with hours or days and the rate.</li>
        <li><strong>The currency and the total</strong>, written as a code. "$5,200" could be US, Canadian or Australian dollars; "USD 5,200" cannot be misread.</li>
        <li><strong>Tax details</strong>: your tax or VAT number if you have one, and any tax line or note that applies (see below).</li>
        <li><strong>How to pay you</strong>: account name, account number or IBAN, SWIFT/BIC code, bank name, or a payment link.</li>
      </ul>
      <p>Add a purchase-order number or contract reference if the client gave you one. Large companies route invoices by it, and an invoice without it can sit in an inbox for weeks.</p>

      <h2>Currency: whose risk is the exchange rate?</h2>
      <p>Invoice in the currency your contract names. If it names none, agree one before the first invoice. Billing in the client's currency is easier for them and leaves the exchange-rate risk with you; billing in yours does the opposite. Either way, find out who pays the transfer fees. An international bank transfer can lose a noticeable amount to the sending bank, any intermediary bank and the conversion margin, so a line in your contract saying fees are paid by the sender is worth asking for. Multi-currency accounts that give you a local account number in the client's country often cost less than a SWIFT transfer, and the client pays as if domestically.</p>
      <p>Keep a record of the exchange rate on the day each payment arrived. Your tax return will be in your own currency, and that is the figure you will need.</p>

      <h2>VAT, GST and the reverse charge</h2>
      <p>Whether you add tax depends on where you are registered and where your client is. Three common cases:</p>
      <h3>You are in the EU, invoicing a business in another EU country</h3>
      <p>For most services between businesses, the customer accounts for the VAT in its own country rather than you charging it: the reverse charge. The EU VAT Directive requires the invoice to carry the words <strong>"Reverse charge"</strong>, and it should show the customer's VAT identification number, since that is the number under which they receive the service. You do not add VAT to the total.</p>
      <h3>You are in the UK, invoicing a business outside the UK</h3>
      <p>Most services supplied to business customers abroad are outside the scope of UK VAT, so no UK VAT is added. HMRC staff have said no special wording is required on the invoice, though many contractors add a short note, such as "Outside the scope of UK VAT", so the treatment is clear to the client and on inspection.</p>
      <h3>Everywhere else</h3>
      <p>Many countries treat exported services differently from domestic ones, often at a zero rate or outside their sales tax, but the conditions and the paperwork vary. If you are registered for VAT, GST or a sales tax at home, check with a local accountant before your first foreign invoice.</p>

      <h2>US clients and Form W-8BEN</h2>
      <p>A US company paying a contractor outside the United States will usually ask for <strong>Form W-8BEN</strong> (or W-8BEN-E if you invoice through a company). It certifies that you are not a US person, and lets the client document why it is not withholding US tax or issuing a US tax form for you. Income for work you do outside the United States is generally not US-source income. You send the form to the client, not to the US tax authority, and you do not need a US tax number to fill it in for this purpose in most cases.</p>

      <h2>Payment terms and late payment</h2>
      <p>Net 14 or Net 30 (payment within 14 or 30 days of the invoice date) is normal for contractors. Put the due date on the invoice itself, not only the terms. If a client pays late, the law may be on your side. In the EU, the Late Payment Directive limits business payment terms to 60 days unless expressly agreed otherwise and not grossly unfair, and entitles the supplier to statutory interest of at least 8 percentage points above the European Central Bank's reference rate, plus a fixed €40 for recovery costs. In the UK, the Late Payment of Commercial Debts (Interest) Act 1998 sets interest at 8% above the Bank of England base rate, with fixed compensation from £40 to £100 depending on the size of the debt. Most contractors never claim either, but stating the terms on the invoice tends to make payment arrive sooner.</p>

      <h2>A routine that keeps you paid</h2>
      <ol>
        <li>Agree the currency, the terms and who pays fees in the contract.</li>
        <li>Invoice on the same day each month, numbered in sequence.</li>
        <li>Send it to the address the client named for invoices, with any PO number.</li>
        <li>Note the expected payment date, and send a polite reminder on the day after it.</li>
        <li>Keep a copy of each invoice and the exchange rate on the day it was paid.</li>
      </ol>
      <p>The <a href="/tools/contractor-invoice-generator">contractor invoice generator</a> lays out an invoice with all of the above, in any currency, with an optional tax line or reverse-charge note. It runs in your browser and saves nothing to our servers. If you are moving countries while contracting, our guide to <a href="/posts/remote-work-taxes-living-abroad">taxes when you work from abroad</a> covers residency, and the <a href="/posts/before-you-accept-a-remote-job-offer">checklist before you accept a remote offer</a> covers what to settle first. If you would rather be employed, the <a href="/jobs">board</a> lists remote roles from 625 employers, including <a href="/jobs?scope=worldwide">work-from-anywhere roles</a> open in every country.</p>
    `,
    faq: [
      {
        q: "What currency should I invoice a foreign client in?",
        a: "The currency your contract names. If it names none, agree one before the first invoice. Invoicing in the client's currency leaves the exchange-rate risk with you, and invoicing in yours leaves it with them. Always write the currency as a code, such as USD or CAD, rather than a symbol.",
      },
      {
        q: "Do I charge VAT to a client in another country?",
        a: "Often not, but it depends on where you are registered. Between EU businesses most services fall under the reverse charge, so the customer accounts for the VAT. UK contractors supplying business customers abroad usually charge no UK VAT. Elsewhere, check with a local accountant.",
      },
      {
        q: "What is a reverse charge invoice?",
        a: "An invoice where the customer, not the supplier, accounts for the VAT. It is used for most business-to-business services between EU countries. The invoice shows no VAT, carries the words 'Reverse charge', and should include the customer's VAT identification number.",
      },
      {
        q: "Do I need a W-8BEN to work for a US company from abroad?",
        a: "Usually, yes, if you are a contractor rather than an employee. Form W-8BEN certifies that you are not a US person, so the company can document why it does not withhold US tax on your payments. You give it to the client; it is not filed with the IRS.",
      },
      {
        q: "What payment terms are normal for a remote contractor?",
        a: "Net 14 or Net 30, meaning payment within 14 or 30 days of the invoice date. Put the due date on the invoice. In the EU, business payment terms are limited to 60 days unless expressly agreed, and late payers owe statutory interest.",
      },
    ],
  },

  {
    slug: "remote-devops-sre-jobs",
    title: "Remote DevOps and SRE Jobs: Pay, Skills and Who Hires Worldwide",
    description:
      "85 remote DevOps, SRE and platform roles on 28 October 2026: what they pay, the skills they ask for, and why about one in eight is open worldwide.",
    date: "2026-10-28T09:40:00.000Z",
    author: "Bhargav",
    tags: ["Remote DevOps Jobs", "Remote SRE Jobs", "Platform Engineering", "DevOps Salary", "Remote Tech Jobs"],
    readMinutes: 7,
    html: `
      <p>This is a count of every remote DevOps, site reliability, platform and infrastructure engineering role open on getremotejobsnow.com on <strong>28 October 2026</strong>: <strong>85 roles from 55 employers</strong>, out of 942 software engineering roles and 4,134 remote listings. It comes from the listings themselves. The board is rebuilt every night, so the live numbers will have moved by the time you read this.</p>
      <p>The field is small, and it stands out in one way: it is far more likely than remote work in general to be open to someone anywhere in the world.</p>

      <h2>How we counted</h2>
      <p>By job title, using the same rule as our <a href="/posts/remote-software-engineering-jobs">software engineering guide</a>: a title counts if it names DevOps, site reliability (or SRE), platform engineering, infrastructure engineering or cloud engineering, and is not a sales, support or data role that shares a word. We do not use the site's category filter for this, because it files anything it cannot classify under one catch-all heading. By the main word in the title:</p>
      <table>
        <thead><tr><th>Title word</th><th>Roles</th></tr></thead>
        <tbody>
          <tr><td>Platform engineer</td><td>28</td></tr>
          <tr><td>Site reliability / SRE</td><td>27</td></tr>
          <tr><td>Infrastructure engineer</td><td>15</td></tr>
          <tr><td>DevOps</td><td>13</td></tr>
          <tr><td>Cloud engineer</td><td>3</td></tr>
        </tbody>
      </table>
      <p>"DevOps engineer" is a smaller title than you might expect. Much of the same work is now advertised as platform engineering or site reliability, so search for all three. The <a href="/tools/job-title-finder">job title finder</a> shows the variants employers use, with live counts.</p>

      <h2>One in eight is open worldwide</h2>
      <p><strong>10 of the 85 roles (11.8%)</strong> could be done from anywhere, against <strong>2.1%</strong> of the board as a whole. Infrastructure teams were working across time zones long before the rest of the company: production runs around the clock, so a team spread across continents can cover on-call without anyone working nights.</p>
      <p>The worldwide roles are concentrated, though. Six of the ten came from one employer, Supabase, and the other four from four different employers, Canonical and Brave among them. One hiring round can move this share a long way, so treat it as a sign of where to look rather than a stable rate. The <a href="/jobs?scope=worldwide">work-from-anywhere listings</a> show what is open today.</p>
      <p>Where the rest are open:</p>
      <ul>
        <li>United States: 40 roles (47.1%)</li>
        <li>Europe: 15 (17.6%)</li>
        <li>United Kingdom: 8 (9.4%)</li>
        <li>Canada: 5 (5.9%)</li>
        <li>India, Asia-Pacific and the Middle East: 2 each</li>
      </ul>
      <p>A role can be open in more than one region. If your country is not on the list, the <a href="/tools/remote-job-location-checker">remote job location checker</a> reads any listing's location line and tells you whether it includes you.</p>

      <h2>What they pay</h2>
      <p><strong>29 of the 85 roles (34.1%)</strong> published a salary range in US dollars, mostly because US state laws require it. Across those ranges, using the midpoint of each:</p>
      <ul>
        <li>25th percentile: <strong>$175,000</strong></li>
        <li>Median: <strong>$215,500</strong></li>
        <li>75th percentile: <strong>$247,500</strong></li>
      </ul>
      <p>The 21 ranges for US-located roles had a median of $225,800. These are high because the field is senior (see below), and because the employers that publish ranges are disproportionately US companies paying US rates. Roles outside the US rarely publish a range, so there is no fair median to quote for Europe or elsewhere from this board. The <a href="/tools/salary-band-estimator">salary band estimator</a> breaks published ranges down by field, level and region.</p>

      <h2>A senior field</h2>
      <p><strong>54 of the 85 titles (63.5%)</strong> say senior, staff, principal or lead, and exactly one says junior. That fits how people enter the work: most move into it from backend engineering, systems administration or technical support, after learning how production systems fail. If you are early in your career, a backend or support role on a team that runs its own infrastructure is a more realistic first step than applying straight to SRE roles. Our guide to <a href="/posts/first-remote-job-2026-no-experience">getting a first remote job</a> covers the wider picture.</p>

      <h2>The skills employers ask for</h2>
      <p>Across the 85 listings:</p>
      <table>
        <thead><tr><th>Skill</th><th>Listings</th><th>Share</th></tr></thead>
        <tbody>
          <tr><td>AWS</td><td>33</td><td>38.8%</td></tr>
          <tr><td>Terraform</td><td>33</td><td>38.8%</td></tr>
          <tr><td>Kubernetes</td><td>32</td><td>37.6%</td></tr>
          <tr><td>Python</td><td>21</td><td>24.7%</td></tr>
          <tr><td>Google Cloud</td><td>20</td><td>23.5%</td></tr>
          <tr><td>CI/CD</td><td>20</td><td>23.5%</td></tr>
          <tr><td>Azure</td><td>15</td><td>17.6%</td></tr>
          <tr><td>Docker</td><td>9</td><td>10.6%</td></tr>
        </tbody>
      </table>
      <p>The core is consistent: one major cloud (AWS most often), infrastructure as code with Terraform, Kubernetes, and a scripting language, usually Python. Being strong in one cloud matters more than a little of all three. Check your resume against each posting with the <a href="/tools/ats-keyword-checker">ATS keyword checker</a> so these words appear where you have the experience.</p>

      <h2>Who hires most</h2>
      <p>The 85 roles came from 55 employers, so no single company dominates. GitLab had the most (9), then Supabase (6) and Grafana Labs (5). Several are infrastructure companies themselves, which tends to mean the platform team is close to the product rather than a cost centre.</p>

      <h2>What remote infrastructure work is like</h2>
      <ul>
        <li><strong>On-call is part of it.</strong> Ask how the rotation works, how often you would be paged at night, and whether on-call is paid. Distributed teams often run "follow the sun" rotations, where each region covers its own daytime.</li>
        <li><strong>Incidents are run in writing.</strong> A clear incident channel and a written review afterwards are normal, and good written communication is tested in interviews.</li>
        <li><strong>Overlap still matters.</strong> Even worldwide teams usually want a few shared hours. The <a href="/tools/timezone-overlap">timezone overlap finder</a> shows what a given team would mean for your day.</li>
      </ul>
      <p>To compare this field with others, open the <a href="/tools/remote-field-explorer">remote field explorer</a>, or browse the <a href="/jobs">full board</a>.</p>
    `,
    faq: [
      {
        q: "Are DevOps and SRE jobs good for remote work?",
        a: "Yes. On our board on 28 October 2026, 11.8% of remote DevOps, SRE and platform roles were open worldwide, against 2.1% of all remote listings. Infrastructure teams already work around the clock, so spreading them across time zones helps cover on-call.",
      },
      {
        q: "How much do remote SRE and DevOps engineers make?",
        a: "Of 85 roles on our board, 29 published a US-dollar range. The median midpoint was $215,500, with a 25th percentile of $175,000 and a 75th of $247,500. Most published ranges come from US employers, so pay outside the US is usually lower and rarely published.",
      },
      {
        q: "What skills do remote DevOps jobs require?",
        a: "Most often AWS, Terraform and Kubernetes, each named in roughly 38% of listings, then Python, Google Cloud and CI/CD in about a quarter. Depth in one cloud provider and infrastructure as code matters more than a little of everything.",
      },
      {
        q: "Can I get a junior remote DevOps job?",
        a: "It is hard. Only one of the 85 roles we counted had a junior title, and 63.5% were senior or above. Most people move into DevOps or SRE from backend engineering, systems administration or technical support, which are more realistic first remote roles.",
      },
    ],
  },
];
