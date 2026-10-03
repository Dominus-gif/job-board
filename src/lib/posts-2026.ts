/**
 * 2026 editorial series.
 *
 * Every statistic attributed to "our data" is computed from the live board
 * snapshot that ships with the deploy (8,794 published listings at time of
 * writing: 443 work-from-anywhere + 8,351 region-locked). Using our own
 * first-party numbers is the point — it's what makes these pages citable, and
 * it keeps us honest about claims we can't independently verify.
 */
import type { Post } from "./posts";

export const POSTS_2026: Post[] = [
  {
    slug: "is-remote-work-dying-2026-rto-data",
    title: "Is Remote Work Dying in 2026? What the RTO Data Actually Says",
    description:
      "Return-to-office headlines say remote is over. Our data on 8,794 live listings says something else: remote didn't die in 2026 — it stratified.",
    date: "2026-09-06T09:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Work Trends", "Return to Office", "RTO 2026", "Future of Work", "Remote Work Statistics"],
    readMinutes: 8,
    html: `
      <p>Every few months a new headline declares remote work dead. A bank orders everyone back five days a week, a tech CEO says collaboration only happens in person, and the story writes itself: <em>the experiment is over</em>.</p>
      <p>Then you look at the actual listings, and the story falls apart.</p>
      <p>We track this for a living. At the time of writing our board holds <strong>8,794 published remote roles</strong>. That is not the footprint of a dying category. But it isn't a victory lap either — because of those 8,794 roles, only <strong>443 are genuinely work-from-anywhere</strong>. That's <strong>5.0%</strong>.</p>
      <p>That single ratio explains the entire debate.</p>

      <h2>Remote didn't die. It stratified.</h2>
      <p>Both sides of the argument are looking at real numbers and reaching opposite conclusions, because they're measuring different things.</p>
      <ul>
        <li><strong>The "remote is dead" camp</strong> counts job <em>postings</em> tagged on-site. Employers did pull back. RTO mandates are real, and the share of listings that are fully open has shrunk hard.</li>
        <li><strong>The "remote is fine" camp</strong> counts <em>people actually working remotely</em>. That number has stayed remarkably stable, because the people who already have remote roles mostly kept them.</li>
      </ul>
      <p>Both are true at once. What changed isn't the existence of remote work — it's the <strong>distribution</strong>. Remote split into tiers:</p>
      <ol>
        <li><strong>Tier 1 — Work-from-anywhere (5.0% of our board).</strong> No country, no timezone, no work-authorization gate. Genuinely rare, genuinely competitive.</li>
        <li><strong>Tier 2 — Region-locked remote (95.0%).</strong> "Remote, US only." "Remote, EU." Fully remote in practice, but you must live in a named place. This is where the volume is now.</li>
        <li><strong>Tier 3 — Hybrid dressed as remote.</strong> The listings that say remote and mean "three days in the office."</li>
      </ol>
      <blockquote>Remote work in 2026 isn't shrinking. It's hardening into a class system — and the top tier is small enough that most people never see it.</blockquote>

      <h2>What the RTO mandates actually did</h2>
      <p>RTO announcements are loud because they come from large, recognisable employers. But large legacy employers were never where work-from-anywhere lived. The roles in our top tier come overwhelmingly from companies that were <em>built</em> distributed — the GitLabs, Canonicals and Supabases of the world — not from firms that tolerated remote for two years and then changed their minds.</p>
      <p>So the mandates removed a category of jobs that were mostly never truly location-free to begin with. The headline reads "remote collapses." The reality is closer to "the pretenders left."</p>

      <h2>Where the remaining opportunity actually is</h2>
      <p>Here's the part the doom coverage misses. Within that 443-role work-from-anywhere tier, the mix is nothing like what you'd guess:</p>
      <ul>
        <li><strong>Management &amp; Finance — 140 roles.</strong> The single largest work-from-anywhere category, by a wide margin.</li>
        <li><strong>Sales &amp; Marketing — 95 roles.</strong> Effectively level with all of engineering put together.</li>
        <li><strong>Engineering (backend, frontend, full-stack, DevOps) — 102 roles.</strong></li>
        <li><strong>Product — 60.</strong> <strong>Design — 26.</strong> <strong>Customer Support — 20.</strong></li>
      </ul>
      <p>If your mental model of remote work is "it's for developers," that model is four years out of date. In the truly location-independent tier, <strong>commercial and finance roles outnumber engineering roles more than two to one</strong> — and finance alone beats every engineering discipline combined.</p>

      <h2>What this means for your job search</h2>
      <p>Stop asking whether remote work is dying. Start asking which tier you're searching in — because the tactics are completely different.</p>
      <ol>
        <li><strong>If you want work-from-anywhere,</strong> accept that you're competing for a slice of roles that is small and global. Applying to twenty of them properly beats applying to two hundred carelessly. Start with the <a href="/page/1">main board</a>, where every listing has already passed that filter.</li>
        <li><strong>If you just want to work from home,</strong> the region-locked tier is enormous and far less contested. Look at <a href="/remote-jobs-in-usa">the USA</a>, <a href="/remote-jobs-in-europe">Europe</a>, or <a href="/remote-jobs-in-uk">the UK</a> boards.</li>
        <li><strong>Read the location line, not the word "remote."</strong> If a listing names a country, a state, or a timezone overlap, it belongs to tier two. That's fine — just know what you're applying to.</li>
      </ol>

      <h2>The honest conclusion</h2>
      <p>Remote work in 2026 is not dying. It is smaller at the top, much larger in the middle, and considerably harder to navigate than it was in 2021, because the word "remote" now covers three very different products.</p>
      <p>The people who struggle are the ones still searching as if it's one market. The people who do well are the ones who pick a tier and search it deliberately.</p>
      <p><a href="/find-remote-jobs">Start with a filtered search →</a></p>
    `,
  },
  {
    slug: "remote-job-tier-list-2026",
    title: "The Remote Job Tier List for 2026: Where Demand Is Real and Where It's Dead",
    description:
      "We ranked remote roles A to D using 8,794 live listings — real posting volume, competition and remote viability. One popular 'remote job' scored zero.",
    date: "2026-09-05T09:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Jobs 2026", "Tier List", "Career Advice", "Job Market Data", "Best Remote Jobs"],
    readMinutes: 9,
    html: `
      <p>Tier lists are usually vibes. This one isn't — it's built from <strong>8,794 live remote listings</strong> on our board, scored on three things that actually matter: how many roles exist, how remote-viable the work is, and how brutal the competition looks.</p>
      <p>One role that appears in every "best remote jobs" listicle scored <strong>literally zero postings</strong>. We'll get to it.</p>

      <h2>Tier A — Real demand, durable, remote-native</h2>
      <p><strong>AI, Data &amp; Machine Learning — 883 postings</strong><br/>
      The clearest Tier A in the dataset. These roles are remote-viable by nature (the work is code, models and documents), demand is rising rather than eroding, and they're the least exposed to being automated by the thing they build. If you can credibly move toward data engineering, ML or applied AI, that's the strongest bet on this list.</p>
      <p><strong>DevOps / Platform / Infrastructure — 531 postings</strong><br/>
      Median disclosed salary in our data: <strong>$201,000</strong>. Infrastructure work is inherently location-independent and painfully hard to fake, which keeps competition down relative to volume. Consistently one of the best-paid categories we track.</p>
      <p><strong>Sales — Account Executive &amp; revenue roles — 323 AE postings, 485 across all sales titles</strong><br/>
      Sales is remote-native (the customer was always on a screen) and performance is objectively measurable, which is why the volume is here. What it is not is portable: only 1.5% of account executive listings carry no location condition, against 6.3% of engineering ones, because selling into a market is a reason to hire someone who lives in it. Median disclosed pay: <strong>$188,750</strong> from 50 listings, with the widest quartile spread of any role we track. Full comparison in <a href="/posts/account-executives-beat-software-engineers-remote">remote sales versus remote engineering</a>.</p>

      <h2>Tier B — Strong, but crowded or conditional</h2>
      <p><strong>Management &amp; Finance — 2,163 postings</strong><br/>
      The biggest work-from-anywhere category we have (341 of 443 truly location-free roles). Volume is excellent. It lands in B rather than A only because seniority requirements are steep — this is not where you break in.</p>
      <p><strong>Backend Engineering — 405 postings, $193,500 median</strong><br/>
      Still healthy, still well paid, still fully remote-viable. Down from A purely on competition: it's the default destination for every career-changer, so applicant pools are deep.</p>
      <p><strong>Product Management — 3,100 postings</strong><br/>
      Enormous raw volume and a $195,000 median. Held at B because "product" is a broad bucket and the roles skew senior — and because PM work is the most meeting-dependent on this list, which makes it fragile in async-first companies.</p>

      <h2>Tier C — Viable, but you need an angle</h2>
      <p><strong>Generic frontend / web development — 235 postings, $80,000 median</strong><br/>
      Note that median. Frontend has the <em>lowest</em> disclosed median of every engineering category we track — less than half of backend or DevOps. Generic "I build websites in React" positioning is heavily commoditised. Frontend specialists who pair it with something scarce (accessibility, design systems, performance, data visualisation) still do fine; generalists get buried.</p>
      <p><strong>Customer Support — 224 postings, $123,500 median</strong><br/>
      Perfectly remote-viable and a genuine entry point into tech. But it's the front line of AI deflection: tier-one ticket work is being automated fastest. Support roles involving technical troubleshooting or account ownership are safe; scripted queue-clearing is not.</p>
      <p><strong>Design — 332 postings, $197,500 median</strong><br/>
      That median is the highest in our dataset, which looks like an A. It's a C on <em>volume plus competition</em>: 350 roles against one of the largest applicant pools in remote work. The pay is real if you get in. Getting in is the hard part.</p>

      <h2>Tier D — Don't build a plan around these</h2>
      <p><strong>Data entry — 0 postings</strong><br/>
      Not "few." Zero, out of 8,794 live remote listings. This is among the most-searched "remote job" phrases on the internet and it does not meaningfully exist as a legitimate remote career any more. It was the first thing automated, and much of the search demand that remains is serviced by scams. If a listing offers well-paid remote data entry with no experience required, treat it as fraud until proven otherwise.</p>
      <p><strong>Generic content writing — 66 postings</strong><br/>
      Sixty-seven, against 1,324 software engineering roles. Undifferentiated "content writer" work has been hit harder than almost any category. Writers who moved into technical content, developer relations, or subject-matter-expert positioning are still in demand — the generalist blog-post mill is gone.</p>

      <h2>How to use this list</h2>
      <p>A tier list is a map of the market, not a verdict on your career. Two rules for reading it:</p>
      <ol>
        <li><strong>Tier isn't destiny — it's difficulty.</strong> A Tier C role you're genuinely excellent at beats a Tier A role you're faking.</li>
        <li><strong>Move adjacent, not across.</strong> Support → technical support → solutions engineering is a real path. Data entry → machine learning engineer is not, at least not in one jump.</li>
      </ol>
      <p>Browse the categories that matter: <a href="/remote-devops-jobs">DevOps</a>, <a href="/remote-backend-jobs">backend</a>, <a href="/remote-sales-marketing-jobs">sales &amp; marketing</a>, <a href="/remote-management-finance-jobs">management &amp; finance</a>, or see <a href="/remote-jobs-categories">every category ranked by live volume</a>.</p>
    `,
  },
  {
    slug: "how-to-find-work-from-anywhere-jobs",
    title: "How to Find Work-From-Anywhere Jobs (When Only 7% of Remote Roles Are Truly Location-Free)",
    description:
      "Most 'remote' jobs quietly require a country or timezone. Only 5.0% of the 8,794 listings we track are genuinely location-free. Here's how to find them.",
    date: "2026-09-04T09:00:00.000Z",
    author: "Bhargav",
    tags: ["Work From Anywhere", "Location Independent Jobs", "Remote Job Search", "Digital Nomad Jobs", "WFA Jobs"],
    readMinutes: 7,
    html: `
      <p>You search "remote jobs." You find thousands. You apply to forty. You hear back from none — and then you notice the line you skipped: <em>Remote (US only).</em> Or <em>Must overlap 9am–1pm ET.</em> Or <em>Must be authorised to work in the EU.</em></p>
      <p>You weren't unlucky. You were applying to the wrong tier.</p>
      <p>Of the <strong>8,794 remote roles</strong> we currently track, only <strong>443 — 5.0% — are genuinely work-from-anywhere</strong>. Everything else names a country, a region, or a timezone you have to live in.</p>

      <h2>Remote vs work-from-anywhere: the distinction that costs people months</h2>
      <p>These are different products wearing the same word.</p>
      <ul>
        <li><strong>Remote</strong> means you don't come to an office. It says nothing about <em>where you may live</em>. "Remote, US only" is a remote job.</li>
        <li><strong>Work-from-anywhere (WFA)</strong> means no country requirement, no region requirement, no timezone-overlap requirement, and no local work-authorization gate. You could move to a different continent and nothing about your employment changes.</li>
      </ul>
      <blockquote>If a listing names a place you must be, it's remote. If it names nowhere, it's work-from-anywhere. That one test filters out 95.0% of the market.</blockquote>

      <h2>Why real WFA roles are so rare</h2>
      <p>It isn't reluctance — it's payroll, tax and employment law. To hire someone in a country, a company generally needs a legal entity there or an employer-of-record service, and it takes on that country's tax and compliance exposure. Every additional country is real cost and real risk.</p>
      <p>So companies that hire genuinely globally have usually made a deliberate structural decision: they run on an employer-of-record, they hire contractors, or they were built distributed from day one. That's why WFA roles cluster so heavily in a specific set of employers rather than spreading evenly across the market.</p>

      <h2>Which companies actually post work-from-anywhere roles</h2>
      <p>From our current dataset, the employers posting the most genuinely remote roles include <strong>GitLab</strong> (222 listings), <strong>Canonical</strong> (164), <strong>ElevenLabs</strong> (159), <strong>Grafana Labs</strong> (122), <strong>Remote</strong> (82), <strong>Supabase</strong> (79) and <strong>Vanta</strong> (76).</p>
      <p>Notice the pattern: these are companies whose product, culture or business model is itself distributed. Canonical and GitLab have been all-remote for over a decade. Remote and Deel literally sell the infrastructure that makes global hiring possible — of course they use it. That pattern is your search heuristic: <strong>look for companies that would be embarrassed not to hire globally.</strong></p>

      <h2>Five filters that actually work</h2>
      <ol>
        <li><strong>Search the location field, not the title.</strong> "Remote" in a job title is marketing. The location line is the contract. Reject anything naming a country, state or timezone.</li>
        <li><strong>Treat "timezone overlap" as a location requirement.</strong> "Must overlap 4 hours with PST" excludes most of the planet just as effectively as "US only."</li>
        <li><strong>Watch for the work-authorization tell.</strong> "Must be eligible to work in X" is a hard geographic gate, however remote the role is.</li>
        <li><strong>Use a board that pre-filters.</strong> This is the whole reason our <a href="/page/1">main board</a> exists — every listing on it has already passed the WFA test, and region-locked roles are kept on a <a href="/remote-regional-jobs">separate, clearly-labelled board</a>.</li>
        <li><strong>Go direct to all-remote employers.</strong> For the companies above, apply on their own careers pages too — you'll often see roles before aggregators pick them up.</li>
      </ol>

      <h2>Adjust your expectations about competition</h2>
      <p>A truly location-free role is open to candidates on every continent, so applicant pools are global and deep. Two consequences worth internalising:</p>
      <ul>
        <li><strong>Volume applying doesn't work here.</strong> Twenty tailored applications will beat two hundred generic ones, because you're being compared against a worldwide field.</li>
        <li><strong>Async proof is the differentiator.</strong> These companies can't assess you in a hallway. Clear written communication is the single most transferable signal you can show — in your CV, your cover note, and your first reply.</li>
      </ul>
      <p>And be realistic about entry level: of those 443 work-from-anywhere roles, only 8 carry a junior, entry-level or graduate title. That's roughly <strong>1%</strong>. WFA is largely a mid-to-senior market — worth knowing before you spend three months applying.</p>

      <h2>Start here</h2>
      <p>Browse <a href="/page/1">every work-from-anywhere role we track</a>, or narrow by function — <a href="/remote-management-finance-jobs">management &amp; finance</a> (our largest WFA category), <a href="/remote-sales-marketing-jobs">sales &amp; marketing</a>, <a href="/remote-backend-jobs">backend</a>, or <a href="/remote-devops-jobs">DevOps</a>.</p>
    `,
  },
  {
    slug: "best-remote-jobs-without-tech-background-2026",
    title: "The Best Remote Jobs Without a Tech Background in 2026",
    description:
      "Non-technical roles are 48% of the remote jobs on our board against 15% for engineering. Here are the fields hiring, what they pay, and how to get in.",
    date: "2026-09-03T09:00:00.000Z",
    updated: "2026-09-30T13:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Jobs No Experience", "Non-Technical Remote Jobs", "Career Change", "Remote Sales Jobs", "Work From Home"],
    readMinutes: 8,
    html: `
      <p>The most persistent myth in remote work is that it is a developers-only club. The listings say otherwise, and it is not close.</p>
      <p>Of the 4,534 remote roles on our board at the time of writing, the four engineering categories (backend, frontend, fullstack and DevOps) hold <strong>682 roles, about 15%</strong>. Management and finance, sales and marketing, and customer support together hold <strong>2,192, about 48%</strong>. If you do not write code, you are not at the edge of this market. You are in the middle of it.</p>
      <p>The same is true of the roles with no location requirement at all. The largest work-from-anywhere category on the board is management and finance (72 roles), followed by sales and marketing (46). All four engineering categories combined come to 73.</p>

      <h2>The non-technical fields with real remote demand</h2>
      <table>
        <thead><tr><th>Field (by job title)</th><th>Roles</th><th>Worldwide</th><th>Median published pay</th></tr></thead>
        <tbody>
          <tr><td>Account executive and closing sales</td><td>362</td><td>5</td><td>$210,000</td></tr>
          <tr><td>Marketing (all specialisms)</td><td>215</td><td>5</td><td>$162,500</td></tr>
          <tr><td>Operations</td><td>154</td><td>10</td><td>$150,000</td></tr>
          <tr><td>Design</td><td>134</td><td>3</td><td>$232,500</td></tr>
          <tr><td>Accounting and finance</td><td>123</td><td>11</td><td>$153,900</td></tr>
          <tr><td>Customer support</td><td>144</td><td>8</td><td>$107,000</td></tr>
          <tr><td>Sales development (SDR and BDR)</td><td>93</td><td>7</td><td>$97,500</td></tr>
          <tr><td>Data and business analysis</td><td>75</td><td>4</td><td>$171,000</td></tr>
          <tr><td>Customer success</td><td>74</td><td>7</td><td>$135,450</td></tr>
          <tr><td>Writing and content</td><td>43</td><td>3</td><td>$110,000</td></tr>
        </tbody>
      </table>
      <p>Medians come from the minority of listings that publish a range in US dollars, which skews towards US employers, so read them as the shape of the market rather than a promise.</p>

      <h2>Sales is the strongest non-technical bet</h2>
      <p>362 account executive roles, with a median published midpoint of $210,000 across the 57 that disclose. The structural reason is simple: the job was already done through a screen, and nobody needs you in an office to run a discovery call. Output is measured in numbers, which removes the "how do we know they are working" objection that follows other remote roles around.</p>
      <p>Pay is usually a base plus commission quoted as on-target earnings. Check the split and the quota before you sign, because a generous OTE against an unrealistic quota is a pay cut with extra steps. If you have no sales background, start in sales development (93 roles on the board) and move to closing in 12 to 24 months.</p>

      <h2>Finance and operations travel best</h2>
      <p>Accounting and finance roles are the most likely non-technical work to be genuinely location-free: 11 of 123 are worldwide, and management and finance is the largest work-from-anywhere category overall. The work is documents, systems and spreadsheets, none of which needs a room. Bookkeeping, financial analysis, FP&amp;A, controller and payroll roles all appear regularly.</p>
      <p>The catch is credentials. This field rewards formal qualifications such as ACCA, CPA or CIMA more than most. If you have one, you are in an unusually strong position for remote work. If you do not, they are among the highest-return certifications you can take for this market.</p>
      <p>Operations sits alongside it: 154 roles, median $150,000, ten of them worldwide. It rewards people who can own a process end to end rather than complete tasks.</p>

      <h2>Support and customer success: the on-ramp and the step up</h2>
      <p>Support remains the most common front door into a software company without a technical background, at 144 roles and a median of $107,000. Be strategic about which support job you take: scripted tier-one ticket clearing is the most automatable work in this category, while technical support, onboarding and escalation ownership are durable and lead somewhere.</p>
      <p>Customer success is where that somewhere usually is. 74 roles, median $135,450, and it rewards exactly what people build in hospitality, teaching, account management and support: patience, clarity and the ability to run a difficult conversation without losing the relationship.</p>

      <h2>Marketing, but specialised</h2>
      <p>Marketing is 215 roles with a sharp internal divide. General content production has thinned to 43 writing and content roles across the whole board. Lifecycle marketing, demand generation, SEO and product marketing remain in steady demand at a median of $162,500.</p>
      <p>The difference is ownership of a number. "I write blog posts" is commoditised. "I own pipeline from organic search, and here is the revenue" is not.</p>

      <h2>Design pays better than most people expect</h2>
      <p>134 design roles with a median published midpoint of $232,500, the highest of any non-technical field here. Product design and UX carry it, and the portfolio does the work that a degree does elsewhere.</p>

      <h2>Where the worldwide non-technical roles come from</h2>
      <p>A short list of employers supplies most of them: <a href="/companies/canonical">Canonical</a> (51 non-technical worldwide roles), <a href="/companies/remote">Remote</a> (25), <a href="/companies/elevenlabs">ElevenLabs</a> (14), <a href="/companies/supabase">Supabase</a> (11) and <a href="/companies/goodstack">Goodstack</a> (8). If location freedom matters more to you than field, following a handful of employers beats searching every day. The <a href="/tools/company-remote-score">company remote score</a> tool scores any employer on the board on how widely it hires.</p>

      <h2>The honest caveats</h2>
      <ul>
        <li><strong>Non-technical does not mean non-skilled.</strong> Every field above rewards a demonstrable specialism. The roles that disappeared from this market were the ones that needed neither judgement nor domain knowledge.</li>
        <li><strong>Entry-level is scarce everywhere.</strong> Only 128 roles on the board (2.8%) carry an entry-level title. Expect to enter through sales development, support or contract work, as our <a href="/posts/first-remote-job-2026-no-experience">first remote job guide</a> sets out.</li>
        <li><strong>Most of this is region-locked.</strong> 94.8% of the board names a country or region. That is not a problem, it just means searching the right board.</li>
        <li><strong>Healthcare administration is a special case.</strong> Medical billing, coding and claims work has moved remote in volume, but licensing and patient-data rules make it almost entirely country-bound. We list 15 such roles and none is worldwide.</li>
      </ul>

      <p>Browse <a href="/remote-sales-marketing-jobs">sales and marketing</a>, <a href="/remote-management-finance-jobs">management and finance</a>, <a href="/remote-customer-support-jobs">customer support</a> or <a href="/remote-design-jobs">design</a>. To see what a role should pay for your field and level, use the <a href="/tools/salary-band-estimator">salary band estimator</a>.</p>
    `,
    faq: [
      {
        q: "What remote jobs can I do without a tech background?",
        a: "Sales, marketing, operations, finance, design, customer support and customer success all hire remotely at volume. On our board those non-technical fields hold about 48% of listings, against about 15% for the four engineering categories combined.",
      },
      {
        q: "Which non-technical remote job pays the most?",
        a: "Among roles that publish a range, design has the highest median midpoint at about $232,500, followed by account executive roles at $210,000 including commission targets, and data and business analysis at $171,000. Customer support sits lowest at about $107,000.",
      },
      {
        q: "Which non-technical roles are most likely to be work from anywhere?",
        a: "Finance and operations. Management and finance is the largest work-from-anywhere category on our board with 72 roles, and 11 of 123 accounting and finance roles carry no location requirement. Healthcare administration is the opposite: licensing rules keep it country-bound.",
      },
      {
        q: "How do I move into remote sales with no sales experience?",
        a: "Start in sales development. Our board carries 93 SDR and BDR roles, hired mainly on temperament and persistence, with a median published midpoint near $97,500 before commission. The usual path to a closing role takes 12 to 24 months.",
      },
    ],
  },
  {
    slug: "account-executives-beat-software-engineers-remote",
    title: "Remote Sales vs Remote Engineering: Which One Actually Travels",
    description:
      "323 account executive roles against 511 engineering roles on our board. Engineering is four times more likely to be location-free, and its pay is a band where sales pay is a lottery.",
    date: "2026-09-02T09:00:00.000Z",
    updated: "2026-10-04T07:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Sales Jobs", "Account Executive", "Remote Job Market", "Tech Sales", "Remote Salaries"],
    readMinutes: 8,
    html: `
      <p>Counted on <strong>4 October 2026</strong>, across 4,024 remote listings from 899 employers. Figures come from the board itself and change nightly.</p>

      <p class="text-sm"><em>Correction, 4 October 2026: this piece previously argued that sales had overtaken engineering as remote work's biggest category, and that sales was the shorter path to geographic freedom. Both claims have been removed. The first rested on our category filter, which files any listing it cannot classify under "Product" and so understates engineering; counted by job title, engineering is the larger field. The second is the reverse of what the board now shows. The original figures are kept below where they still stand, and the rest has been rewritten.</em></p>

      <h2>The headline count, done honestly</h2>
      <p>Counting by job title rather than by our category filter, which is the only way to compare two fields without a classification artefact deciding the answer:</p>
      <table>
        <thead><tr><th>Counted by title</th><th>Roles</th><th>Work-from-anywhere</th><th>Publish pay</th><th>Median</th></tr></thead>
        <tbody>
          <tr><td>Software engineering</td><td><strong>511</strong></td><td>32 (6.3%)</td><td>165 (32.3%)</td><td><strong>$210,000</strong></td></tr>
          <tr><td>Account executive</td><td><strong>323</strong></td><td>5 (1.5%)</td><td>50 (15.5%)</td><td><strong>$188,750</strong></td></tr>
          <tr><td>All sales titles</td><td>485</td><td>19 (3.9%)</td><td>73 (15.1%)</td><td>$170,000</td></tr>
        </tbody>
      </table>
      <p>Engineering is the bigger field, pays more at the median, and is four times more likely to be open to someone anywhere in the world. Sales is close on volume and nowhere near on freedom.</p>
      <p>Why the earlier version got this wrong is worth a sentence, because it is a trap anyone analysing a job board can fall into. Our category filter has a fallback: a listing whose title and description match no keyword is filed under "Product". That bucket holds 1,270 listings, and the most common word in its titles is "engineer". Comparing the "Sales &amp; Marketing" category against the four engineering categories therefore compares a real category against four leaky ones. Titles do not have that problem.</p>

      <h2>The real difference is the shape of the pay, not the size of it</h2>
      <p>The medians are close enough to argue about. The spread is not:</p>
      <table>
        <thead><tr><th>Counted by title</th><th>25th percentile</th><th>Median</th><th>75th percentile</th><th>Spread</th></tr></thead>
        <tbody>
          <tr><td>Software engineering</td><td>$185,000</td><td>$210,000</td><td>$243,500</td><td><strong>$58,500</strong></td></tr>
          <tr><td>Account executive</td><td>$143,500</td><td>$188,750</td><td>$256,250</td><td><strong>$112,750</strong></td></tr>
        </tbody>
      </table>
      <p>An engineering offer lands in a band. A sales offer lands somewhere in a range nearly twice as wide: the top quartile of advertised AE pay beats the top quartile of engineering pay, and the bottom quartile sits $41,500 below engineering's. That is before commission risk, which these figures cannot see at all — a published OTE is a target, not an outcome.</p>
      <p>So the practical difference is not "which pays more". It is that engineering pay is mostly decided by the market before you walk in, and sales pay is mostly decided by where you land in that spread and whether the number is real.</p>
      <blockquote>Read the split, not the headline. A $220K OTE on a quota nobody on the team has ever hit is worth less than a $160K OTE that reps actually clear. Ask what percentage of the team hit quota last year — a good sales org answers immediately, with a number.</blockquote>

      <h2>Sales publishes pay half as often</h2>
      <p>50 of 323 account executive listings publish a range (15.5%), against 165 of 511 engineering listings (32.3%). Both sit against a board-wide rate of 18.3%.</p>
      <p>That gap compounds the spread problem. The field where the advertised number varies most is also the field that shows you a number least often, so you are negotiating with less information in exactly the situation where information is worth most. Our guide to <a href="/posts/salary-transparency-laws-2026">where pay ranges are legally required</a> is the fastest way to work out whether a given role should have shown you one.</p>

      <h2>Why sales still went remote early</h2>
      <p>None of the above contradicts the thing sales genuinely got right. Three reasons it works remotely, which still hold:</p>
      <p><strong>1. The job was already mediated.</strong> B2B software sales stopped being a room-and-handshake business years ago. Discovery calls, demos, procurement and closing happen over video and email. Once the office stopped being where the customer was, it stopped being where the seller needed to be.</p>
      <p><strong>2. Output is unambiguous.</strong> The anxiety behind return-to-office mandates is measurement — managers who cannot see work assume it is not happening. Quota attainment is a number, visible from any timezone.</p>
      <p><strong>3. Coverage is the point.</strong> A company selling into EMEA or APAC wants sellers living in those markets.</p>
      <p>But notice what the third reason actually produces: sellers hired <em>into named markets</em>. That is a region-locked job. It explains why sales roles are widely remote and rarely location-free — 1.5% of AE listings carry no location condition at all. The thing that makes sales remote-friendly is the same thing that ties it to a place.</p>

      <h2>What this means if you are choosing between them</h2>
      <ul>
        <li><strong>If geographic freedom is the priority</strong>, engineering is the better bet on this board — 6.3% against 1.5%, and the location-free engineering roles come from employers that hire worldwide across the board rather than as an exception.</li>
        <li><strong>If earning ceiling is the priority</strong>, sales has the higher top quartile, with the variance and the commission risk that implies.</li>
        <li><strong>If predictability is the priority</strong>, engineering, by a wide margin. The $58,500 interquartile band is the whole argument.</li>
        <li><strong>The hybrid worth knowing about</strong> is solutions engineering and sales engineering, where technical depth is the product and you sit on the revenue team. Those roles inherit sales' remote-friendliness and engineering's floor.</li>
      </ul>

      <h2>If you want into sales anyway</h2>
      <ol>
        <li><strong>Start as an SDR or BDR.</strong> Booking meetings is the standard entry point and the hiring bar is lower. Expect 12 to 24 months before moving to a closing seat.</li>
        <li><strong>Ask for quota attainment data before you ask about OTE.</strong> The percentage of the team that hit quota last year tells you what the OTE is worth; the OTE alone tells you nothing.</li>
        <li><strong>Check which market you are being hired into.</strong> "Remote" in a sales listing usually means "remote within this country", and that is the single most common reason an application goes nowhere.</li>
        <li><strong>Browse the live lists</strong>: <a href="/jobs?q=account%20executive">account executive roles</a>, <a href="/remote-sales-marketing-jobs">remote sales and marketing jobs</a>, or the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> if location freedom is what you are after.</li>
      </ol>

      <h2>How we counted</h2>
      <ul>
        <li>Figures are from the live board on <strong>4 October 2026</strong>: 4,024 published listings from 899 employers.</li>
        <li><strong>Fields are counted by job title</strong>, not by the site's category filter, for the reason given above. "Software engineering" matches software engineer, software developer, backend, frontend, full-stack and platform engineer titles; "account executive" matches account executive, enterprise AE and sales executive.</li>
        <li><strong>Pay covers only listings that publish a range</strong>, converted to a USD midpoint. A listing with no number is not counted as low; it is not counted. That sample leans towards US employers covered by pay-transparency laws.</li>
        <li>Published sales figures are on-target earnings where the employer says so. We cannot see what was actually earned.</li>
        <li>Counts change nightly. If a figure here disagrees with the board, the board is right.</li>
      </ul>
    `,
    faq: [
      {
        q: "Are there more remote sales jobs or more remote engineering jobs?",
        a: "Counted by job title on our board on 4 October 2026, engineering is larger: 511 software engineering roles against 485 sales roles, of which 323 are account executive positions. Category-level counts can suggest the opposite, but our category filter files unclassifiable listings under 'Product', which understates engineering.",
      },
      {
        q: "Do remote account executives earn more than remote software engineers?",
        a: "At the median, no. Among listings publishing a range on 4 October 2026, account executives showed a median of $188,750 against $210,000 for software engineering. Sales has the higher ceiling — a 75th percentile of $256,250 against $243,500 — but also a far lower floor, and its advertised figures are usually on-target earnings rather than guaranteed pay.",
      },
      {
        q: "Which remote roles are most likely to let you work from anywhere?",
        a: "Engineering, by a wide margin over sales. On 4 October 2026, 6.3% of software engineering listings carried no country, region or timezone condition, against 1.5% of account executive listings. Sales roles are widely remote but usually tied to a named market, because selling into a region is a reason to hire someone who lives there.",
      },
      {
        q: "Why do so few sales jobs show a salary?",
        a: "Only 15.5% of account executive listings on our board published a pay range on 4 October 2026, against 32.3% of engineering listings and 18.3% board-wide. Sales pay is also the most variable, so the field that shows a number least often is the one where the number matters most.",
      },
    ],
  },
  {
    slug: "digital-nomad-visas-2026",
    title: "Digital Nomad Visas in 2026: Income Requirements and Tax Rules",
    description:
      "Income thresholds, durations and tax treatment for the main digital nomad visas in 2026, plus the 183-day rule and the employer questions nobody asks first.",
    date: "2026-09-01T09:00:00.000Z",
    updated: "2026-09-30T13:00:00.000Z",
    author: "Bhargav",
    tags: ["Digital Nomad Visa", "Remote Work Abroad", "Nomad Tax", "Work From Anywhere", "Relocation"],
    readMinutes: 9,
    html: `
      <p>A work-from-anywhere job is only half the equation. The other half is the legal right to be somewhere. Since 2020 more than 50 countries have created visas aimed specifically at remote workers earning foreign income, and the details vary far more than the marketing suggests.</p>
      <p>Below are the programmes remote workers ask about most, followed by the three things that matter more than the headline tax rate.</p>

      <div class="callout-warning">
        <p><strong>Read this before the table.</strong> Immigration rules and tax regimes change often, and most thresholds are tied to a local minimum or average wage, so they move every year. Your own tax outcome depends on your citizenship, your employer's structure and how long you stay. The figures here were checked in September 2026 and are indicative, not advice. Confirm every number with the country's own consulate or immigration portal, and take cross-border tax advice, before you commit to anything.</p>
      </div>

      <h2>The main programmes at a glance</h2>
      <table>
        <thead><tr><th>Country</th><th>Income requirement</th><th>Initial duration</th><th>Tax treatment (indicative)</th></tr></thead>
        <tbody>
          <tr><td>Italy</td><td>About €2,333 a month</td><td>Up to 1 year, renewable</td><td>Normal Italian rules once resident; consulates began accepting applications in March 2026</td></tr>
          <tr><td>Spain</td><td>€2,849 a month, twice the national minimum wage</td><td>1 year from a consulate, or up to 3 years applying inside Spain</td><td>Employees can opt into the regime for incoming workers: 24% on employment income up to €600,000. Freelancers registered as autónomos are excluded</td></tr>
          <tr><td>Hungary</td><td>€3,000 a month</td><td>1 year, renewable once</td><td>You must keep earning at that level while you hold the White Card</td></tr>
          <tr><td>Greece</td><td>€3,500 a month</td><td>12 months, then a renewable 2-year permit</td><td>Since February 2026 you must apply through a Greek consulate before travelling</td></tr>
          <tr><td>Malta</td><td>€3,500 a month</td><td>1 year, renewable to 4</td><td>The threshold does not rise with dependants</td></tr>
          <tr><td>Croatia</td><td>About €3,622 a month, or €43,470 in savings</td><td>Up to 18 months</td><td>Foreign income is not taxed locally under the scheme</td></tr>
          <tr><td>Portugal</td><td>€3,680 a month, four times the minimum wage, plus about €11,040 in savings</td><td>1 year, renewable to 5</td><td>The old non-habitual resident regime is closed to newcomers; its replacement covers only certain qualifying roles</td></tr>
          <tr><td>Estonia</td><td>€4,500 a month gross</td><td>Up to 1 year</td><td>Tax residency can start after 183 days</td></tr>
          <tr><td>UAE</td><td>US$3,500 a month from outside the UAE</td><td>1 year, renewable</td><td>No personal income tax</td></tr>
          <tr><td>Costa Rica</td><td>US$3,000 a month</td><td>1 year, extendable to 2</td><td>Foreign income exempt under the scheme</td></tr>
          <tr><td>Brazil</td><td>US$1,500 a month, or US$18,000 in savings</td><td>1 year, renewable</td><td>The lowest income bar of the major programmes</td></tr>
        </tbody>
      </table>
      <p>To check your own income against these and five more programmes, including Japan, Thailand, Indonesia, Malaysia and Cyprus, use our <a href="/tools/nomad-visa-checker">digital nomad visa checker</a>. It shows which you clear, by how much, and which authority to confirm with.</p>

      <h2>The 183-day rule is what actually catches people</h2>
      <p>Most countries treat you as tax resident once you have spent roughly 183 days there in a 12-month period. A nomad visa grants the right to stay. It does not automatically exempt you from becoming tax resident, and those are separate questions decided by different rules.</p>
      <p>This is where the expensive surprises live. Stay under the threshold and you are usually taxed at home. Cross it and you may owe tax locally as well, depending on whether a double-taxation treaty applies and how it is written. Some schemes, such as Croatia's and Costa Rica's, explicitly exempt foreign income; others simply apply the normal rules once you are resident.</p>
      <p>Counting matters, and it is easy to get wrong when trips are split across a year. Our <a href="/tools/tax-residency-day-counter">tax residency day counter</a> does the arithmetic, including the rolling 12-month window that several countries use rather than the calendar year.</p>
      <p>US citizens are in a different position from almost everyone else: the United States taxes on citizenship rather than residence, so you file regardless of where you live. Look into the Foreign Earned Income Exclusion and the Foreign Tax Credit, and get professional advice rather than guessing.</p>

      <h2>Your employer may be the real blocker</h2>
      <p>This is the step most guides skip. Even with a valid nomad visa, your employer may not be able to let you go.</p>
      <ul>
        <li><strong>Permanent establishment risk.</strong> An employee working from another country can, in some circumstances, create a taxable presence for the company there. Legal teams are genuinely cautious about this, and it is the most common reason a request is refused.</li>
        <li><strong>Payroll and social security.</strong> Once you are tax resident somewhere, your employer may be obliged to register and contribute locally.</li>
        <li><strong>Data and compliance rules.</strong> Regulated industries often restrict the countries from which you may access systems at all.</li>
      </ul>
      <p>This is exactly why genuinely location-free jobs are rare. Only 235 of the 4,534 roles on our board, about 5.2%, carry no location requirement. The companies most likely to say yes are the ones already structured for it: all-remote employers, and those hiring through an employer of record. Our guide to <a href="/posts/how-to-tell-if-a-company-is-truly-distributed">telling whether a company is truly distributed</a> covers the signals worth checking before you ask.</p>

      <h2>What these visas do not give you</h2>
      <ul>
        <li><strong>The right to work for local clients.</strong> Most schemes require your income to come from outside the country. Spain's, for example, caps Spanish-sourced income at 20%.</li>
        <li><strong>Healthcare.</strong> Nearly every programme requires private insurance meeting a minimum level of cover for the whole stay.</li>
        <li><strong>A straight path to permanent residency.</strong> Some count towards it, many do not. Check before you plan a life around one.</li>
        <li><strong>Cover for your family automatically.</strong> Dependants usually raise the income threshold, often by 50% for a partner and 25 to 30% per child.</li>
      </ul>

      <h2>A practical checklist before you move</h2>
      <ol>
        <li>Get written confirmation from your employer that you may work from the specific country. Do this first, because everything else is wasted effort otherwise.</li>
        <li>Check the current requirements on the consulate or immigration site rather than a blog, including this one. Thresholds move annually with local wages.</li>
        <li>Model your day count against the 183-day line in both the country you are leaving and the one you are entering.</li>
        <li>Check whether a double-taxation treaty exists between the two, and what it says about employment income.</li>
        <li>Price private health insurance that meets the scheme's minimum, and check whether it covers repatriation.</li>
        <li>Work out what your salary is actually worth locally. Our <a href="/tools/salary-purchasing-power">purchasing-power calculator</a> compares 70 countries using World Bank price levels.</li>
        <li>Talk to a cross-border tax adviser before you commit. One consultation costs far less than a mistake.</li>
      </ol>

      <h2>First, get the job</h2>
      <p>A nomad visa is only useful with income that travels. Start from the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a>, where no listing names a country, and read <a href="/posts/remote-work-taxes-living-abroad">what working abroad does to your taxes</a> before you hand in notice.</p>
    `,
    faq: [
      {
        q: "Which digital nomad visa has the lowest income requirement?",
        a: "Of the major programmes, Brazil is lowest at about US$1,500 a month, or US$18,000 in savings. Costa Rica asks US$3,000 and Italy about €2,333. Estonia is among the highest in Europe at €4,500 a month gross.",
      },
      {
        q: "Do you pay tax on a digital nomad visa?",
        a: "It depends on the country and how long you stay. Croatia and Costa Rica exempt foreign income under their schemes. Spain offers employees 24% on employment income up to €600,000, though freelancers registered as autónomos are excluded. Most countries treat you as tax resident after about 183 days, which is a separate question from your visa.",
      },
      {
        q: "Can my employer stop me using a digital nomad visa?",
        a: "In practice, often yes. An employee working abroad can create a taxable presence for the company, trigger local payroll and social security duties, or breach data rules in regulated industries. Get written approval for the specific country before applying for anything.",
      },
      {
        q: "How long can you stay on a digital nomad visa?",
        a: "Usually one year to start. Croatia allows up to 18 months, Malta renews to a total of four years, Portugal's route leads to a five-year residence path, and Spain grants up to three years if you apply from inside the country. Thailand's long-term resident visa runs up to 10 years but has much higher income and asset tests.",
      },
    ],
  },
  {
    slug: "remote-salaries-2026-negotiate-the-premium",
    title: "Remote Salaries in 2026: What the Published Ranges Actually Say",
    description:
      "Only 18.3% of remote listings publish a salary. Here are the medians by role from the ones that do, why the usual explanations for a remote premium do not hold, and how to negotiate without a number.",
    date: "2026-08-31T09:00:00.000Z",
    updated: "2026-10-04T07:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Salaries", "Salary Negotiation", "Remote Work Pay", "Compensation 2026", "Pay Transparency"],
    readMinutes: 9,
    html: `
      <p>Counted on <strong>4 October 2026</strong>, across 4,024 remote listings from 899 employers. Figures come from the board itself and change nightly.</p>

      <p class="text-sm"><em>Correction, 4 October 2026: this piece was published under the title "Why Remote Workers Earn More" and reported a $80,000 median for frontend engineering, which it used to argue that frontend work had been commoditised. Both are gone. We have no non-remote salaries to compare against, so we were never in a position to say remote workers earn more than anyone; and the frontend figure came from a sample too small to carry the claim — the same cut today reads far higher. The pay table, the counts and the premium section have been rewritten. The negotiation advice is unchanged.</em></p>

      <p>Here is the number that shapes every remote salary negotiation: of the <strong>4,024 remote roles</strong> on our board, only <strong>735 — 18.3% — publish a salary range at all</strong>.</p>
      <p>More than four in five listings ask you to name a figure first, into an information vacuum. That asymmetry is the single biggest reason people leave money on the table.</p>
      <p>So here is what the disclosing minority actually says, and a method for the rest.</p>

      <h2>Median disclosed pay by role</h2>
      <p>Midpoint of the published range, in USD, counted <strong>by job title</strong> rather than by our category filter. That matters: the filter files any listing it cannot classify under "Product", so category medians mix fields together. Titles do not.</p>
      <table>
        <thead><tr><th>Role (by title)</th><th>25th pct</th><th>Median</th><th>75th pct</th><th>Listings with a range</th></tr></thead>
        <tbody>
          <tr><td>Designer</td><td>$220,000</td><td><strong>$238,500</strong></td><td>$260,500</td><td>10</td></tr>
          <tr><td>Product manager</td><td>$192,488</td><td>$225,900</td><td>$260,000</td><td>40</td></tr>
          <tr><td>DevOps / SRE</td><td>$145,230</td><td>$215,500</td><td>$247,500</td><td>19</td></tr>
          <tr><td>Software engineering</td><td>$185,000</td><td>$210,000</td><td>$243,500</td><td>165</td></tr>
          <tr><td>Backend engineer</td><td>$175,000</td><td>$192,485</td><td>$206,000</td><td>18</td></tr>
          <tr><td>Account executive</td><td>$143,500</td><td>$188,750</td><td>$256,250</td><td>50</td></tr>
          <tr><td>Data</td><td>$145,066</td><td>$187,000</td><td>$280,000</td><td>15</td></tr>
          <tr><td>Sales (all titles)</td><td>$132,080</td><td>$170,000</td><td>$225,425</td><td>73</td></tr>
          <tr><td>Marketing</td><td>$110,000</td><td>$147,813</td><td>$175,000</td><td>22</td></tr>
          <tr><td>Customer support</td><td>$89,700</td><td>$115,525</td><td>$150,000</td><td>20</td></tr>
        </tbody>
      </table>
      <p>The right-hand column is the one that decides how much weight a row can carry. A median of 10 designer salaries tells you roughly where designers sit; it does not tell you what designers earn. Only software engineering, with 165, has a sample worth treating as a market signal, and the board-wide median across all 735 disclosing listings is <strong>$195,000</strong>.</p>
      <p>What the percentile columns show is more useful than the medians anyway. <strong>Customer support is the only row that sits clearly below the rest</strong>, and it is also the field with the widest open door for people without a technical background. <strong>Account executive has the widest spread</strong> — $112,750 between the quartiles, nearly twice software engineering's $58,500 — which is what commission-heavy pay looks like in a table. We take that comparison apart in <a href="/posts/account-executives-beat-software-engineers-remote">remote sales versus remote engineering</a>.</p>
      <blockquote>Read all of this as directional. It comes only from employers willing to publish a range, and those employers skew larger, better funded, and disproportionately American — several US states require a range in the posting, so the sample is partly a map of pay-transparency law. See <a href="/posts/salary-transparency-laws-2026">which rules apply where</a>.</blockquote>

      <h2>Is there a remote premium? Not one we can see</h2>
      <p>The honest answer is that this board cannot tell you. Every listing on it is remote, so there is no office-based control group to compare against. Anyone quoting a precise remote-versus-office premium from a job board is quoting something they did not measure, and this guide used to be guilty of that.</p>
      <p>What the data does show is that the usual explanation is not the one people reach for:</p>
      <ul>
        <li><strong>Location freedom does not cost you money.</strong> Work-from-anywhere roles show a median of $194,965 against $195,000 for region-locked ones — a difference of $35, which is nothing. The common fear that going fully location-independent means accepting less is not visible here. (The worldwide sample is small, 8 disclosing listings, so treat it as "no evidence of a penalty" rather than proof of none.)</li>
        <li><strong>Remote hiring skews heavily senior, and that is where the money is.</strong> Titles containing senior, staff, lead, principal, head, director or VP outnumber junior, graduate, associate and intern titles by <strong>9.8 to 1</strong> (1,460 against 149). Senior-titled roles that publish pay show a median of <strong>$205,005</strong>; junior-titled ones show <strong>$100,000</strong>. If remote work looks well paid in aggregate, a large part of that is simply which jobs get offered remotely at all.</li>
        <li><strong>The talent pool cuts both ways.</strong> A company hiring worldwide competes against every other company hiring worldwide. That is a real pressure, but it is an argument, not a measurement.</li>
        <li><strong>The employer does save money</strong> on desks, offices and relocation. Also an argument, and a usable one at the table.</li>
      </ul>
      <p>The practical version: do not walk into a negotiation claiming a remote premium exists. Walk in knowing that the role you are applying for is probably a senior one, that senior roles on this board cluster around $205,000 when they publish, and that going location-free does not appear to cost anything.</p>

      <h2>Geographic pay adjustment: the fight you need to be ready for</h2>
      <p>Many companies apply a location multiplier — the same role paying less in Lisbon than San Francisco. Increasingly this is automated, applied from your address before a human is involved.</p>
      <p>Your counter-arguments, in order of effectiveness:</p>
      <ol>
        <li><strong>Value is not indexed to your rent.</strong> The work produces the same value to the company wherever it's done. Cost-of-living pricing is a policy choice, not an economic law.</li>
        <li><strong>Anchor to the role, not the region.</strong> Ask what the band is for this role at this level — before disclosing where you live, if you can.</li>
        <li><strong>Use the market, not your history.</strong> Never anchor to your previous salary. Anchor to what the role pays.</li>
        <li><strong>Ask about the policy explicitly.</strong> "Do you apply geographic pay adjustment, and what's the band for this level?" A company with a clean answer is one you can plan around.</li>
      </ol>

      <h2>How to negotiate when four in five listings show no number</h2>
      <ol>
        <li><strong>Make them go first.</strong> "I'd rather understand the band for the role before I anchor — what range is budgeted?" is a completely normal thing to say, and most recruiters will answer.</li>
        <li><strong>If forced, give a researched range,</strong> anchored to the medians above for your role and level — and say which sample size it rests on, because "the median of 165 published engineering ranges" is a far harder number to wave away than "market rate".</li>
        <li><strong>Negotiate the whole package.</strong> Equity, home-office budget, learning budget, extra leave and a written work-from-anywhere clause are all real compensation — and often easier to move than base.</li>
        <li><strong>Get location freedom in writing.</strong> If you plan to relocate, an explicit clause is worth more than a verbal "sure, we're remote-friendly."</li>
        <li><strong>Use disclosure as a filter.</strong> Employers who publish ranges tend to have defined levels and fewer arbitrary decisions. You can find them fast on our board — filter for <a href="/jobs?disc=1">roles with a published salary</a>.</li>
      </ol>

      <h2>Check the market before your next conversation</h2>
      <p>Browse by category to see live ranges: <a href="/remote-devops-jobs">DevOps</a>, <a href="/remote-backend-jobs">backend</a>, <a href="/remote-design-jobs">design</a>, <a href="/remote-sales-marketing-jobs">sales &amp; marketing</a> or <a href="/remote-management-finance-jobs">management &amp; finance</a>. The <a href="/tools/salary-band-estimator">salary band estimator</a> gives the same figures filtered to your field, level and region, with the sample size shown next to every number.</p>

      <h2>How we counted</h2>
      <ul>
        <li>Figures are from the live board on <strong>4 October 2026</strong>: 4,024 published listings from 899 employers, of which 735 publish a salary range.</li>
        <li><strong>Roles are counted by job title</strong>, not by the site's category filter, because that filter files unclassifiable listings under "Product" and so mixes fields together.</li>
        <li>Published ranges are converted to a <strong>USD midpoint</strong>. A listing with no number is not counted as low — it is not counted at all.</li>
        <li>Sales figures are usually on-target earnings, which is a target rather than an outcome.</li>
        <li>Counts change nightly. If a figure here disagrees with the board, the board is right.</li>
      </ul>
    `,
  },
  {
    slug: "ai-is-killing-these-remote-jobs-what-to-do-instead",
    title: "AI Is Killing These 10 Remote Jobs — Here's What to Do Instead",
    description:
      "Data entry now returns zero results across 8,794 remote listings. Here are the roles AI is hollowing out — and the specific bridge path out of each one.",
    date: "2026-08-30T09:00:00.000Z",
    author: "Bhargav",
    tags: ["AI and Jobs", "Career Change", "Future of Work", "Remote Jobs 2026", "Reskilling"],
    readMinutes: 10,
    html: `
      <p>Here's a statistic that stopped us mid-analysis. We searched our board of <strong>8,794 live remote listings</strong> for "data entry."</p>
      <p><strong>Zero results.</strong> Not a handful. None.</p>
      <p>That's a role which, five years ago, was the single most-searched remote job phrase on the internet. It hasn't shrunk — as a legitimate remote career, it has effectively ceased to exist.</p>
      <p>This article isn't doom-scrolling. Every declining role below is paired with a concrete bridge path — an adjacent role that uses skills you already have and that the automation is currently <em>creating</em> demand for.</p>

      <h2>1. Data entry → Data operations / analytics</h2>
      <p><strong>Status: 0 postings.</strong> Fully automated. The bridge: the data still has to be <em>trusted</em>. Data quality, validation and operations roles exist precisely because automated pipelines produce garbage silently. Learn SQL and a BI tool, and you're doing the judgement half of the job you already understand.</p>

      <h2>2. Generic content writing → Technical / B2B SaaS content</h2>
      <p><strong>Status: 66 postings, against 1,324 engineering roles.</strong> The blog-post mill is gone. What survives is content requiring domain expertise a model can't fake: developer documentation, technical tutorials, B2B SaaS content with real product knowledge, and subject-matter-expert writing in regulated fields. The path is narrowing, not leaving — pick a vertical and go deep enough that being wrong is obvious.</p>

      <h2>3. Tier-one customer support → Technical support / Customer Success</h2>
      <p><strong>Status: 224 postings, but the mix is shifting.</strong> Scripted ticket-clearing is the most automated work in the category. What's durable: technical troubleshooting, escalation ownership, and account-owning roles. Customer Success in particular (<strong>140 postings</strong>) rewards the exact relationship skills support builds — and pays significantly more.</p>

      <h2>4. Basic bookkeeping → Financial analysis / FP&amp;A</h2>
      <p>Transaction categorisation and reconciliation are largely automated. But Management &amp; Finance is our <strong>largest work-from-anywhere category (140 of 443 location-free roles)</strong>, with a <strong>$162,500</strong> median. The demand moved up the stack: analysis, forecasting, business partnering. If you know the books, you already understand the business — that's the hard part.</p>

      <h2>5. Generic frontend development → Specialised frontend</h2>
      <p><strong>Status: 235 postings, $80,000 median — the lowest of any engineering category we track.</strong> "I build React components" is the most AI-assisted work in software. Specialise where correctness is expensive to fake: accessibility, design systems, performance engineering, complex data visualisation. Or move toward full-stack ($215,000 median) or platform work ($201,000).</p>

      <h2>6. Basic QA / manual testing → Test automation &amp; QA engineering</h2>
      <p>Click-through regression testing is being generated automatically. The bridge is the same skill applied one level up: automation frameworks, CI pipelines, and the judgement to decide what's worth testing at all.</p>

      <h2>7. Transcription and captioning → Localisation &amp; quality review</h2>
      <p>Speech-to-text is effectively solved. What remains is judgement work: post-editing, localisation, cultural adaptation and accuracy review in high-stakes contexts (legal, medical, accessibility compliance) where an error has consequences.</p>

      <h2>8. Template graphic design → Product / UX design</h2>
      <p>Generated assets have eaten the low end. Yet Design carries the <strong>highest median in our dataset at $197,500</strong>. The value moved to work that requires understanding a user and a system: product design, UX research, design systems. A model can produce an image; it can't decide what should be on the screen.</p>

      <h2>9. Cold-call-only SDR work → Full-cycle sales</h2>
      <p>Sequencing and outreach are heavily automated — but sales is booming (<strong>627 AE postings, $179,500 median</strong>). The dying part is mechanical volume outreach. The growing part is discovery, qualification and closing. SDR remains an excellent entry point <em>if</em> you treat it as a 12–24 month runway to a closing seat, not a career.</p>

      <h2>10. Generic virtual assistant → Operations / Chief of Staff</h2>
      <p>Scheduling and inbox triage are automated. Ownership isn't. Operations roles — running processes, vendors, and the systems a distributed team relies on — need someone accountable for outcomes, not tasks.</p>

      <h2>The pattern across all ten</h2>
      <p>Every declining role shares one property: <strong>the output is verifiable without judgement.</strong> If a task has a single correct answer that can be checked mechanically, it's automatable. If it requires deciding what the right answer <em>is</em>, weighing trade-offs, or being accountable when it's wrong, it isn't — yet.</p>
      <blockquote>The move is almost never "learn a completely new field." It's "move one level up in the same field, from executing the task to owning the outcome."</blockquote>

      <h2>Where the demand actually is</h2>
      <p>For reference, the strongest categories in our current data: <strong>AI/data/ML (883 postings)</strong>, <strong>DevOps (531, $201K median)</strong>, and <strong>Sales (627 AE roles)</strong>. Browse <a href="/remote-devops-jobs">DevOps</a>, <a href="/remote-backend-jobs">backend</a>, <a href="/remote-sales-marketing-jobs">sales &amp; marketing</a>, or see the <a href="/posts/remote-job-tier-list-2026">full 2026 tier list</a>.</p>
    `,
  },
  {
    slug: "async-first-companies-hiring-2026",
    title: "Async-First Companies Are Hiring — But Async-First Does Not Mean Hire-From-Anywhere",
    description:
      "GitLab has 127 open roles and not one is location-free. The companies that genuinely hire from anywhere are a different, much shorter list — and they hire differently.",
    date: "2026-08-29T09:00:00.000Z",
    updated: "2026-10-04T07:00:00.000Z",
    author: "Bhargav",
    tags: ["Async Work", "Remote First Companies", "GitLab", "Remote Hiring", "Distributed Teams"],
    readMinutes: 9,
    html: `
      <p>Counted on <strong>4 October 2026</strong>, across 4,024 remote listings from 899 employers. Figures come from the board itself and change nightly.</p>

      <p class="text-sm"><em>Correction, 4 October 2026: this piece previously opened by naming GitLab, ElevenLabs, Grafana Labs and Vanta as the biggest posters of work-from-anywhere roles, with counts in the hundreds. Those figures are long out of date and the ranking was wrong in substance, not just in scale — three of those four currently post no location-free roles at all. The advice in the second half still stands and is unchanged; the data and the thesis above it have been rewritten.</em></p>

      <h2>The thing almost everyone gets wrong</h2>
      <p>GitLab is the most-cited async-first company in the world. It has a public handbook, it runs on written decisions, and it is all-remote with no offices. On our board today it has <strong>127 open roles, of which zero are work-from-anywhere</strong>.</p>
      <p>That is not a contradiction. It is the distinction the whole thing turns on: <strong>async-first describes how a company works. It says nothing about where that company is willing to employ you.</strong></p>
      <p>Look at what those listings actually say. GitLab's 127 roles carry 34 different location strings, and the most common are "Remote, United States" (23 roles), "Remote, Canada · Remote, United States" (23) and "Remote, United Kingdom" (10). Grafana Labs: 59 roles, every one country-scoped, led by "United States (Remote)" (21) and "Canada (Remote)" (8). Vanta: 33 roles, 30 of them "Remote U.S.".</p>
      <p>All three are genuinely remote companies. None of them will hire you wherever you happen to live, because hiring across a border means a legal entity or an employer of record in that country, and that is an expensive, country-by-country decision that has nothing to do with how you run a standup.</p>

      <h2>Who actually hires from anywhere</h2>
      <p>176 of the 4,024 roles on the board carry no country, region or timezone condition — 4.4%. They come from just <strong>23 employers</strong>, and four of them hold 76% of the total:</p>
      <table>
        <thead><tr><th>Employer</th><th>Work-from-anywhere roles</th><th>Of its total</th><th>Share of its own hiring</th></tr></thead>
        <tbody>
          <tr><td>Canonical</td><td><strong>99</strong></td><td>148</td><td>66.9%</td></tr>
          <tr><td>Supabase</td><td>18</td><td>37</td><td>48.6%</td></tr>
          <tr><td>Camunda</td><td>11</td><td>20</td><td>55.0%</td></tr>
          <tr><td>Metabase</td><td>6</td><td>11</td><td>54.5%</td></tr>
          <tr><td>Goodstack</td><td>6</td><td>7</td><td>85.7%</td></tr>
          <tr><td>ElevenLabs</td><td>5</td><td>42</td><td>11.9%</td></tr>
          <tr><td>InBeat Agency</td><td>4</td><td>6</td><td>66.7%</td></tr>
          <tr><td>Mattermost</td><td>3</td><td>7</td><td>42.9%</td></tr>
          <tr><td>Remote</td><td>3</td><td>5</td><td>60.0%</td></tr>
          <tr><td>Linear</td><td>3</td><td>14</td><td>21.4%</td></tr>
        </tbody>
      </table>
      <p>The right-hand column is the one to read. An employer that posts 99 location-free roles out of 148 has made a structural decision; an employer posting 5 out of 42 has made an exception for five roles. If you are job hunting for location freedom, the first kind is worth following and the second kind is worth a job alert, not a strategy.</p>
      <p>Canonical is the clearest case on the board: 99 of its 148 listings say "Anywhere in the World" outright, and most of the rest say "Home based" with a broad region attached. That is a company that has built the legal and operational machinery to employ people almost anywhere, and it is rarer than the discourse suggests.</p>

      <h2>Why so few, and why that will not change quickly</h2>
      <p>Two structural reasons, and only one of them is about culture.</p>
      <p><strong>The legal one.</strong> Employing someone in a country means an entity there, or an employer of record charging a monthly fee per head, plus local payroll, benefits, notice periods and termination rules. Companies solve this country by country, which is why "Remote, United States · Remote, Canada" is such a common listing shape — it is a list of the places where the paperwork already exists.</p>
      <p><strong>The operational one.</strong> A company that needs four hours of overlap has a location requirement whether or not it calls it one. Async-first is what removes that requirement, which is why the genuinely global employers are usually async-first — but the reverse does not follow, as GitLab demonstrates. Async-first is necessary and nowhere near sufficient.</p>
      <p>We cover the overlap question in detail in <a href="/posts/timezone-overlap-how-much-you-need">how much timezone overlap you actually need</a>, and the vocabulary problem in <a href="/posts/work-from-anywhere-meaning">what work from anywhere really means</a>.</p>

      <h2>What "async-first" actually means in practice</h2>
      <p>Worth knowing regardless of where a company will employ you, because it changes how you are assessed:</p>
      <ul>
        <li><strong>Writing is the primary interface.</strong> Decisions are made in documents and issues, not meetings. If it wasn't written down, it didn't happen.</li>
        <li><strong>Meetings are the exception and are expensive.</strong> A meeting means several people couldn't be served by a document, which is treated as a small failure.</li>
        <li><strong>Defaults are public.</strong> GitLab's handbook is famously public and enormous. Internal transparency isn't a value statement; it's the mechanism that lets people in twelve timezones act without asking permission.</li>
        <li><strong>Progress is asynchronous by design.</strong> Work is structured so nobody is blocked waiting for someone else to wake up.</li>
        <li><strong>Output is judged, not hours.</strong> There's no presence to perform.</li>
      </ul>
      <blockquote>The uncomfortable implication: in an async-first company, being charming in a meeting is worth almost nothing. Being clear in writing is worth almost everything.</blockquote>

      <h2>What "async-first" actually means in practice</h2>
      <p>Async-first isn't "remote with flexible hours." It's a specific operating model with real consequences:</p>
      <ul>
        <li><strong>Writing is the primary interface.</strong> Decisions are made in documents and issues, not meetings. If it wasn't written down, it didn't happen.</li>
        <li><strong>Meetings are the exception and are expensive.</strong> A meeting means several people couldn't be served by a document, which is treated as a small failure.</li>
        <li><strong>Defaults are public.</strong> GitLab's handbook is famously public and enormous. Internal transparency isn't a value statement; it's the mechanism that lets people in twelve timezones act without asking permission.</li>
        <li><strong>Progress is asynchronous by design.</strong> Work is structured so nobody is blocked waiting for someone else to wake up.</li>
        <li><strong>Output is judged, not hours.</strong> There's no presence to perform, which is exactly why these companies can hire globally without anxiety.</li>
      </ul>
      <blockquote>The uncomfortable implication: in an async-first company, being charming in a meeting is worth almost nothing. Being clear in writing is worth almost everything.</blockquote>

      <h2>How to pass an async-first hiring process</h2>
      <p>There's no office culture to signal for, no hallway rapport, no "great energy in the room." Here's what replaces it.</p>

      <h3>1. Your written application <em>is</em> the work sample</h3>
      <p>At a company where decisions live in documents, your application is a live demonstration of the core skill. Structure it. Lead with the conclusion. Cut adjectives. If your cover note rambles, you have shown them exactly what your internal comms would look like.</p>

      <h3>2. Read the handbook and reference it specifically</h3>
      <p>Many of these companies publish their entire operating manual. Almost no applicants read it. Referencing a specific practice — and how you'd work within it — is the single highest-signal thing you can do, because it proves you can self-onboard from written material. Which is the job.</p>

      <h3>3. Show async proof, not remote experience</h3>
      <p>"I worked from home for three years" is weak. Strong evidence looks like:</p>
      <ul>
        <li>Documentation, RFCs or specs you wrote that others acted on</li>
        <li>Public work — open-source issues, PR descriptions, technical writing</li>
        <li>A concrete example of unblocking yourself instead of waiting for a reply</li>
        <li>Evidence you've made a decision in writing and recorded the reasoning</li>
      </ul>

      <h3>4. Expect a take-home, and treat it as the interview</h3>
      <p>Async companies lean on written exercises and paid trial projects because they predict the job better than conversation. Follow the brief exactly, explain your trade-offs, and state what you'd do with more time. The reasoning is often marked higher than the artefact.</p>

      <h3>5. Answer the timezone question before it's asked</h3>
      <p>Say plainly where you are, what hours you'll reliably be reachable, and how you'll handle handoffs. Confidence here signals you've genuinely done this. Vagueness signals you haven't.</p>

      <h2>The trade-off nobody mentions</h2>
      <p>Async-first is not automatically better — it's a different set of costs. It can be isolating. Feedback arrives slowly. Ambiguity is resolved by reading rather than asking. People who thrive are comfortable with written communication and self-direction; people who need momentum from a room often struggle.</p>
      <p>Be honest with yourself about which you are, because these roles are hard to win and harder to hold if the fit is wrong.</p>

      <h2>See who's hiring</h2>
      <p>Browse <a href="/companies">every company on the board</a>, or jump to the <a href="/page/1">work-from-anywhere roles</a> these employers are posting right now.</p>
    `,
  },
  {
    slug: "first-remote-job-2026-no-experience",
    title: "How to Get Your First Remote Job in 2026 With No Experience",
    description:
      "Only 128 of 4,534 remote roles on our board carry an entry-level title, and 8 of those are work-from-anywhere. Here is the path in that actually works.",
    date: "2026-08-28T09:00:00.000Z",
    updated: "2026-09-30T13:00:00.000Z",
    author: "Bhargav",
    tags: ["Entry Level Remote Jobs", "First Remote Job", "No Experience", "Junior Remote Roles", "Career Advice"],
    readMinutes: 8,
    html: `
      <p>Start with the number, because most articles on this subject avoid it. Of the 4,534 remote roles on our board at the time of writing, <strong>128 (2.8%) carry an entry-level title</strong>, and only 8 of those are open worldwide. Narrow it to listings that actually use the words junior, graduate, entry-level or intern and you are down to 58 roles. For every one of those, the board carries 29 roles asking for senior, staff, lead or director.</p>
      <p>Entry-level remote work is the scarcest part of this market. Knowing that changes the strategy, because the winning move is not to apply harder to those 58 roles.</p>

      <h2>Why entry-level remote is rare</h2>
      <p>This is economics rather than prejudice. A junior hire needs supervision, feedback and correction, which are the things distributed work makes most expensive. An experienced hire is largely self-directing. Attention across time zones is the scarcest resource a remote company has, so the roles that survive a budget conversation are the ones that need least of it.</p>
      <p>So the useful question is not "how do I convince someone to take a chance on me remotely?" It is "how do I stop being expensive to supervise?" Everything below follows from that.</p>

      <h2>Where juniors do get hired</h2>
      <p>The entry-level roles on the board are not spread evenly. They cluster:</p>
      <ul>
        <li><strong>Product and operations:</strong> 63 of the 128, the largest single group, mostly coordination and analyst roles inside product teams.</li>
        <li><strong>Sales and marketing:</strong> 25, almost all sales development.</li>
        <li><strong>Management and finance:</strong> 19, typically bookkeeping, payroll and finance operations.</li>
        <li><strong>Engineering and infrastructure:</strong> 15 across DevOps, backend and fullstack combined.</li>
        <li><strong>Customer support:</strong> 5.</li>
      </ul>
      <p>Where pay is published, the median entry-level midpoint is <strong>$112,500</strong>, though only 10 of the 128 name a figure, so treat that as a signal rather than a benchmark.</p>

      <h2>The four on-ramps that actually work</h2>
      <h3>1. Sales development</h3>
      <p>The board carries <strong>93 SDR and business development roles</strong>, with a median published midpoint of about $97,500 across the six that disclose. The hiring bar is about temperament and persistence rather than credentials, the work is entirely phone, email and CRM, and the path from booking meetings to closing them typically takes 12 to 24 months. It is the most reliable front door in remote work for someone with no track record.</p>
      <h3>2. Customer support, chosen carefully</h3>
      <p>144 support roles, median published pay $107,000, though support job titles specifically sit nearer $89,700. Aim for technical support, onboarding, or roles that own escalations and accounts. Scripted tier-one ticket clearing is the most automatable work in this category and it leads nowhere. Treat support as a two-year on-ramp towards customer success, solutions engineering or product operations, which is a well-worn path. Our <a href="/posts/remote-customer-support-careers">guide to remote support careers</a> maps it out.</p>
      <h3>3. Operations and data</h3>
      <p>154 operations roles and 75 analyst roles sit on the board, and they reward process ownership rather than years served. If you can take a messy recurring task, document it, and hand back something that runs without you, you are doing the job.</p>
      <h3>4. Quality assurance</h3>
      <p>Only 18 roles, so it is thin, but QA and test automation remain more accessible than development roles while using overlapping skills, and it is a genuine route into engineering from the inside.</p>

      <h2>Replace credentials with evidence</h2>
      <p>Nobody can vouch for you in a hallway. Your evidence has to be visible without a reference:</p>
      <ul>
        <li><strong>Public work.</strong> Open-source contributions, a written case study, a portfolio that shows your reasoning rather than a finished tutorial. Decisions are the thing worth showing.</li>
        <li><strong>Written communication.</strong> This is the one that moves the needle, because it is the core competency of distributed work and an employer can assess it directly from your application. A short, specific, well-structured message is itself the work sample.</li>
        <li><strong>Paid work of any size.</strong> Even small freelance projects turn "no experience" into "worked with clients remotely, delivered on a deadline".</li>
        <li><strong>Volunteering for a distributed organisation.</strong> Non-profits and open-source projects run on exactly the tools and habits employers are looking for.</li>
      </ul>

      <h2>Two structural moves worth more than any CV tweak</h2>
      <p><strong>Take the region-locked roles first.</strong> 4,299 of the 4,534 roles on the board (94.8%) are limited to a country or region, against 235 open worldwide. The region-locked pool is roughly eighteen times larger and competes against a smaller field. Land a "remote, US only" or "remote, EU" job, do it well for two years, and you will apply for work-from-anywhere roles as an experienced remote worker rather than an unknown. Work from anywhere is a destination, not a starting point.</p>
      <p><strong>Consider contract-to-permanent.</strong> A company that will not risk a permanent junior hire will often risk a three-month contract, because the downside is capped. Be realistic about supply: only 50 of the roles we list (1.1%) are contract or part-time, so this usually means approaching companies directly with a defined trial project rather than waiting for a posting.</p>

      <h2>Mistakes that keep people stuck</h2>
      <ul>
        <li><strong>Mass applying.</strong> Two hundred generic applications to worldwide roles will lose to twenty tailored ones. Use the <a href="/tools/ats-keyword-checker">ATS keyword checker</a> to see which terms a posting actually leans on before you write.</li>
        <li><strong>Waiting to feel ready.</strong> Apply at roughly 60% of the listed requirements. The list is a wish, not a gate.</li>
        <li><strong>Not tracking anything.</strong> After thirty applications you will not remember who you spoke to. The <a href="/tools/application-tracker">application tracker</a> keeps it in your browser, free, no account.</li>
        <li><strong>Ignoring scams.</strong> Beginners are the main target for fake remote jobs. Anything asking you to pay, to buy equipment through them, or to deposit a cheque is a scam. Run it through the <a href="/tools/fake-job-checker">fake job checker</a> and read <a href="/posts/how-to-spot-fake-remote-job-postings">how to spot fake postings</a>.</li>
      </ul>

      <h2>What to do this week</h2>
      <ol>
        <li>Pick one on-ramp above and commit to it for three months rather than applying to everything.</li>
        <li>Publish one piece of evidence: a case study, a repository, a written breakdown of a problem you solved.</li>
        <li>Apply to ten <a href="/remote-regional-jobs">region-locked roles</a> in your own country, tailored, rather than fifty worldwide ones.</li>
        <li>Follow the <a href="/posts/30-minute-remote-job-search-routine">30-minute daily routine</a> so the search does not eat your week.</li>
      </ol>
      <p>Browse <a href="/remote-customer-support-jobs">customer support roles</a>, <a href="/remote-sales-marketing-jobs">sales and marketing</a>, or the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> when you are ready for it.</p>
    `,
    faq: [
      {
        q: "Can you get a remote job with no experience?",
        a: "Yes, but the entry-level end of remote work is small. On our board, 128 of 4,534 roles (2.8%) carry an entry-level title and only 8 of those are open worldwide. The realistic route is a region-locked role in sales development, customer support, operations or QA, rather than competing for the handful of junior work-from-anywhere jobs.",
      },
      {
        q: "Which remote jobs are easiest to get with no experience?",
        a: "Sales development is the most reliable: 93 roles on our board, hired on temperament rather than credentials, with a 12 to 24 month path to a closing role. Customer support is next, with 144 roles, though it is worth choosing technical support or onboarding over scripted tier-one work.",
      },
      {
        q: "What do entry-level remote jobs pay?",
        a: "Among entry-level roles on our board that publish a range, the median midpoint is about $112,500, but only 10 of 128 disclose pay, so that figure rests on a small sample. Sales development roles that publish a range sit closer to $97,500 before commission.",
      },
      {
        q: "Should I apply for work-from-anywhere jobs as a beginner?",
        a: "Usually not first. They are 5.2% of the board and attract global competition, and only 8 entry-level roles among them. Region-locked remote roles are an eighteen times larger pool. Two years in one of those makes you an experienced remote candidate, which is who worldwide employers hire.",
      },
    ],
  },
  {
    slug: "work-from-anywhere-meaning",
    title: "Work From Anywhere: What It Actually Means (and How It Differs From Remote)",
    description:
      "Work from anywhere means no country, region or timezone requirement — a stricter thing than remote or work from home. Here's the difference, with data.",
    date: "2026-09-08T09:00:00.000Z",
    author: "Bhargav",
    tags: ["Work From Anywhere", "WFA Meaning", "Remote Work Definitions", "Location Independent", "Work From Home"],
    readMinutes: 6,
    html: `
      <p><strong>Work from anywhere (WFA) means a job with no geographic requirement at all: no country you must live in, no region, no timezone you must overlap, and no local work-authorization gate.</strong> If you moved to another continent tomorrow, nothing about your employment would change.</p>
      <p>That is a much stricter definition than "remote" — and the gap between the two is where most job seekers lose months. Of the <strong>8,794 remote roles</strong> we track, only <strong>443 (5.0%)</strong> meet the work-from-anywhere bar. The other 95% name a place.</p>

      <h2>Work from anywhere vs remote vs work from home</h2>
      <p>These three phrases get used interchangeably. They are not the same thing.</p>
      <table>
        <thead><tr><th>Term</th><th>What it actually means</th><th>Can you move abroad?</th></tr></thead>
        <tbody>
          <tr><td><strong>Work from anywhere</strong></td><td>No country, region or timezone requirement</td><td>Yes</td></tr>
          <tr><td><strong>Remote</strong></td><td>No office attendance — but usually a named country or region</td><td>Usually no</td></tr>
          <tr><td><strong>Work from home</strong></td><td>You work from your home, in a specific area</td><td>No</td></tr>
          <tr><td><strong>Hybrid</strong></td><td>Split between home and an office</td><td>No</td></tr>
        </tbody>
      </table>
      <blockquote>The one-line test: if the listing names a place you must be, it is remote. If it names nowhere, it is work from anywhere.</blockquote>

      <h2>Why the distinction exists at all</h2>
      <p>It isn't marketing sloppiness — it's employment law. To employ someone in a country, a company generally needs a legal entity there or an employer-of-record service, and it takes on that country's payroll, tax and compliance obligations. Every extra country is real cost and real risk.</p>
      <p>So most "remote" employers pick a small set of countries they're already set up in and hire only there. A company offering genuine work-from-anywhere has usually made a deliberate structural choice: an employer-of-record, contractor arrangements, or being built distributed from day one.</p>

      <h2>What work from anywhere does <em>not</em> mean</h2>
      <ul>
        <li><strong>It doesn't mean no hours.</strong> Many WFA roles still expect meeting availability or on-call rotations. Async-first and location-free are related but separate.</li>
        <li><strong>It doesn't mean no tax obligations.</strong> Spend enough time in a country — commonly 183 days — and you may become tax resident there. See our guide to <a href="/posts/digital-nomad-visas-2026">digital nomad visas and tax</a>.</li>
        <li><strong>It doesn't mean your employer has agreed.</strong> Even in a WFA role, confirm in writing which countries are actually permitted before you move.</li>
        <li><strong>It doesn't mean easier.</strong> A location-free role is open to candidates on every continent, so the applicant pool is global and deep.</li>
      </ul>

      <h2>How to spot a real work-from-anywhere job</h2>
      <ol>
        <li><strong>Read the location field, not the title.</strong> "Remote" in a job title is marketing; the location line is the contract.</li>
        <li><strong>Treat timezone overlap as a location requirement.</strong> "Must overlap 4 hours with PST" rules out most of the planet just as effectively as "US only."</li>
        <li><strong>Watch for the authorization tell.</strong> "Must be eligible to work in X" is a hard geographic gate however remote the role is.</li>
        <li><strong>Use a board that pre-filters.</strong> Every listing on our <a href="/work-from-anywhere-jobs">work from anywhere jobs</a> board has already passed this test, and the <a href="/real-work-from-anywhere-jobs">verified subset</a> narrows it further to roles pulled straight from the employer's own careers page. Region-locked roles live on a <a href="/remote-regional-jobs">separate, clearly-labelled board</a>.</li>
      </ol>

      <h2>Is work from anywhere worth targeting?</h2>
      <p>If geographic freedom is genuinely your priority, yes — but go in informed. It's 5% of the market, it skews mid-to-senior (only 8 of our 443 location-free roles carry a junior title), and in that tier commercial and finance roles outnumber engineering ones by more than two to one.</p>
      <p>If you mainly want to stop commuting, the region-locked 95% is a far larger and less contested pool, and it's where most people should start.</p>
      <p><a href="/work-from-anywhere-jobs">Browse work from anywhere jobs →</a>, narrow to <a href="/real-work-from-anywhere-jobs">verified location-independent roles</a>, or see every <a href="/fully-remote-jobs">fully remote job</a> on the board. You can also read <a href="/posts/how-to-find-work-from-anywhere-jobs">how to find them</a>.</p>
    `,
  },
  {
    slug: "remote-jobs-at-ai-labs-and-space-companies",
    title: "Remote Jobs at AI Labs and Space Companies: Who Really Hires Remotely",
    description:
      "How AI labs and space companies really hire: office policies, export rules, and why only 4 of 464 AI roles on our board are open worldwide. Plus where to look.",
    date: "2026-09-27T02:00:00.000Z",
    author: "Bhargav",
    tags: ["AI Careers", "Aerospace Jobs", "Remote AI Jobs", "Deep Tech Careers", "Remote Job Search"],
    readMinutes: 7,
    html: `
      <p>People search for "SpaceX remote jobs", "Safe Superintelligence careers" or "remote OpenAI jobs" hoping the most exciting employers in technology will let them work from home. The honest answer is that the frontier of AI and space is one of the least remote corners of the job market. This guide uses the listings on our board, and the employers' own job postings, to show how these companies actually hire and where remote work in AI and deep tech really is.</p>

      <h2>What our board shows</h2>
      <p>At the time of writing, our board carries 4,785 remote roles. 464 of them, just under 10%, are AI, machine learning or data science roles by title. Only 4 of those 464 are open worldwide with no location condition: two at Canonical, one at Camunda and one at Diligent Robotics. Every other AI role on the board is tied to a country or region.</p>
      <ul>
        <li><strong>Where they are:</strong> 270 are limited to the United States, 54 to Europe and 33 to the UK. 141 of the 464 name somewhere in the San Francisco Bay Area in their location line, and 36 name New York.</li>
        <li><strong>What they pay:</strong> 94 publish a US dollar range. The median midpoint is about $248,750 a year, with the middle half between about $206,000 and $275,000, among the highest figures on the board.</li>
      </ul>
      <p>High pay and a tight location go together here. The employers paying the most for AI talent are the ones that want that talent in a few specific cities.</p>

      <h2>Frontier AI labs are office-based by policy</h2>
      <p>The labs building the largest models say plainly in their own postings that they expect people in an office:</p>
      <ul>
        <li><strong>Anthropic</strong> postings state that "we expect all staff to be in one of our offices at least 25% of the time", and add that some roles need more. On our board, each of its 7 current roles names an office city, and the ones marked "Remote-Friendly" are limited to the United States.</li>
        <li><strong>OpenAI</strong> postings describe "a hybrid work model of 3 days in the office per week" and offer relocation assistance to new employees. It had 29 roles on our board at the time of writing, none open worldwide, with a handful listed as remote within the US.</li>
        <li><strong>Cohere</strong> had 16 roles on the board, mostly tied to office cities such as London, Paris and Toronto.</li>
      </ul>
      <p><strong>Safe Superintelligence</strong> (SSI) is a special case. It is a small company with offices in Palo Alto and Tel Aviv, it publishes very few open roles, and reporting on the company describes a deliberately slow hiring approach focused on senior researchers and engineers. If you cannot find its listings on any job board, that is why. There are no SSI roles on our board.</p>
      <p>The usual reasons labs keep people close are easy to see. Research moves fastest when a small team can argue over unpublished results in the same room. Model weights and unreleased work carry serious security requirements. Decisions about very expensive compute are made by small groups. Those reasons do not apply equally to every role inside a lab, which is why sales, operations and some engineering roles tend to be more flexible than research.</p>

      <h2>Space companies: export rules come first</h2>
      <p>Space and aerospace hiring has a harder limit than office culture: export control. Rockets, satellites and the technical data behind them are covered by US export regulations, known as ITAR and EAR, which restrict who may access that information. In practice most roles require you to be a "US person": a US citizen, a permanent resident, or a refugee or asylee.</p>
      <p>You can see this in the postings themselves. Astranis, a satellite company with roles on our board, states that "U.S. Citizenship, Lawful Permanent Residency, or Refugee/Asylee Status" is required "to comply with U.S. Government space technology export regulations". SpaceX's postings carry a similar export-regulation requirement, and its roles are advertised at its own sites rather than as remote positions.</p>
      <p>Our board reflects this. We carry only a handful of roles at space companies, such as Relativity Space in Long Beach and Astranis in San Francisco, and none is open worldwide. We list no SpaceX roles at all, which is the expected result for a board that checks location conditions: the work is built, tested and launched in physical places.</p>
      <p>One warning. Aggregators sometimes attach famous company names to unrelated listings. If you see a posting that promises "work from anywhere at SpaceX", check that the apply link goes to the company's own careers site before you spend any time on it. Our guide to <a href="/posts/how-to-spot-fake-remote-job-postings">spotting fake remote job postings</a> covers the other warning signs.</p>

      <h2>Where the remote AI and deep-tech jobs are</h2>
      <p>"AI job" is much broader than "frontier lab". Most remote AI work sits in the applied layer: companies building products on top of models, and the infrastructure those products need.</p>
      <ul>
        <li><strong>AI-native product companies.</strong> ElevenLabs had 68 roles on our board, and 29 of them were open worldwide. Some of its postings say simply that "this role is remote, so it can be executed globally". See its <a href="/companies/elevenlabs">company page</a>.</li>
        <li><strong>Remote-first software companies adding AI.</strong> The four worldwide AI roles on the board came from companies that already hire as distributed teams, such as <a href="/companies/canonical">Canonical</a>.</li>
        <li><strong>Remote within one country.</strong> Many AI roles are remote inside a single country rather than worldwide. OpenAI lists some roles as "US - Remote", and several AI startups list US-remote roles. If you live in that country, these are real remote jobs. The <a href="/tools/jd-remote-analyzer">remote job description analyzer</a> shows exactly which location, office and time zone conditions a posting sets.</li>
        <li><strong>Space-adjacent software.</strong> The further a role sits from flight hardware and controlled technical data, the more remote it tends to be: satellite imagery and geospatial analytics, ground-station and mission software, and tooling companies that sell to aerospace. This follows from how export rules work rather than from a count on our board, which carries few such roles.</li>
      </ul>

      <h2>How to get into AI or deep tech without moving</h2>
      <ol>
        <li><strong>Build in the applied layer first.</strong> Retrieval systems, evaluation, fine-tuning and inference infrastructure are hired for remotely, and they build directly relevant experience. Browse <a href="/remote-backend-jobs">backend</a> and <a href="/remote-devops-jobs">DevOps and platform</a> roles.</li>
        <li><strong>Make your work visible.</strong> A reproduction of a paper, a benchmark or a useful open-source tool is how people get noticed by employers that barely advertise.</li>
        <li><strong>Look at infrastructure and operations roles.</strong> Labs need platform, security and operations engineers as much as researchers, and those roles are often more flexible about location.</li>
        <li><strong>Know your pay range.</strong> AI roles pay at the top of the board. The <a href="/tools/salary-band-estimator">salary band estimator</a> shows the published ranges for your field and level, with the sample size behind each figure.</li>
        <li><strong>Apply on the employer's own site.</strong> For well-known names in particular, the official careers page is the only listing you can fully trust.</li>
      </ol>

      <p>If working at a frontier lab or a launch company is the goal, plan for relocation and apply through their official careers pages. If location freedom is the goal, the applied AI and infrastructure layer is the better target. Start with the <a href="/work-from-anywhere-jobs">work-from-anywhere roles</a> we track, or read our <a href="/posts/remote-job-tier-list-2026">remote job tier list</a> for the fields that stay remote.</p>
    `,
    faq: [
      {
        q: "Does SpaceX have remote jobs?",
        a: "Very few, if any. SpaceX builds and tests hardware at its own sites, and its postings require US person status under US export regulations. At the time of writing we listed no SpaceX roles, because none met our location checks. If location freedom matters, satellite data, ground software and aerospace tooling companies are more likely to hire remotely.",
      },
      {
        q: "Does Safe Superintelligence hire remotely?",
        a: "There is no sign that it does. Safe Superintelligence is a small company with offices in Palo Alto and Tel Aviv, and it publishes very few open roles, mostly for senior researchers and engineers. There were no SSI roles on our board at the time of writing.",
      },
      {
        q: "Can I work for OpenAI or Anthropic remotely?",
        a: "Mostly not from anywhere. OpenAI's postings describe a hybrid model of three office days a week, and Anthropic's say staff are expected in an office at least 25% of the time. Some roles at both are listed as remote within the United States, but neither had a worldwide role on our board at the time of writing.",
      },
      {
        q: "Where can I find remote AI jobs?",
        a: "In the applied layer: AI product companies and remote-first software companies building with AI. At the time of writing our board listed 464 AI and data roles, but only 4 were open worldwide. ElevenLabs, with 29 worldwide roles across all functions, was the largest AI company hiring without location limits.",
      },
    ],
  },
  {
    slug: "remote-hiring-report-september-2026",
    title: "Remote Hiring Report, September 2026: 4,581 Jobs Analysed",
    description:
      "Every open role on our board, counted: where the jobs are, what they pay, which fields hire worldwide, and the 24 employers behind the location-free roles.",
    date: "2026-09-29T07:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Work Data", "Remote Salaries", "Hiring Report", "Work From Anywhere", "Remote Job Market"],
    readMinutes: 8,
    html: `
      <p>This is a count of every job on getremotejobsnow.com on <strong>29 September 2026</strong>: 4,581 open remote roles from 956 employers. No survey, no panel, no estimates. Just what employers were actually advertising on the day, and what it says about remote hiring right now. The board is rebuilt every night, so today's figures on the site will differ a little from the ones below.</p>

      <h2>The headline: location-free work is still rare</h2>
      <p>Of the 4,581 roles, only <strong>237 (5.2%)</strong> carry no location condition at all. The other 4,344 are genuinely remote but tied to a country, a region or a set of time zones. That ratio is the single most useful number on this page, and it has barely moved since we started counting.</p>
      <p>The concentration is sharper still by employer. Those 237 worldwide roles come from just <strong>24 companies</strong>, while 951 companies post the region-locked ones. Four employers account for about three quarters of the location-free market on our board.</p>

      <h2>Where the roles are</h2>
      <p>Counting each region-locked role by the regions it is open to:</p>
      <table>
        <thead><tr><th>Open to</th><th>Roles</th><th>Share</th></tr></thead>
        <tbody>
          <tr><td>United States</td><td>2,295</td><td>52.8%</td></tr>
          <tr><td>Europe (excluding the UK)</td><td>691</td><td>15.9%</td></tr>
          <tr><td>United Kingdom</td><td>286</td><td>6.6%</td></tr>
          <tr><td>Asia-Pacific</td><td>215</td><td>4.9%</td></tr>
          <tr><td>More than one region</td><td>182</td><td>4.2%</td></tr>
          <tr><td>Canada</td><td>130</td><td>3.0%</td></tr>
          <tr><td>India</td><td>122</td><td>2.8%</td></tr>
          <tr><td>Latin America</td><td>56</td><td>1.3%</td></tr>
          <tr><td>Middle East</td><td>31</td><td>0.7%</td></tr>
          <tr><td>Africa</td><td>3</td><td>0.1%</td></tr>
          <tr><td>Location we could not classify</td><td>333</td><td>7.7%</td></tr>
        </tbody>
      </table>
      <p>The United States is more than half the region-locked market on its own, and the gap between it and everywhere else is the main reason remote job hunting feels so different depending on where you live. If you are outside the US, the practical move is to work the worldwide board and your own region together: see <a href="/remote-jobs-in-europe">Europe</a>, <a href="/remote-jobs-in-uk">the UK</a>, <a href="/remote-jobs-in-canada">Canada</a> or <a href="/remote-jobs-in-india">India</a>, and read <a href="/posts/getting-hired-remotely-from-outside-the-us">getting hired remotely from outside the US</a>.</p>

      <h2>Which fields hire, and which hire worldwide</h2>
      <table>
        <thead><tr><th>Field</th><th>Roles</th><th>Worldwide</th><th>Share worldwide</th><th>Median pay</th></tr></thead>
        <tbody>
          <tr><td>Product</td><td>1,454</td><td>23</td><td>1.6%</td><td>$210,000</td></tr>
          <tr><td>Management and finance</td><td>1,077</td><td>72</td><td>6.7%</td><td>$178,875</td></tr>
          <tr><td>Sales and marketing</td><td>988</td><td>46</td><td>4.7%</td><td>$172,600</td></tr>
          <tr><td>DevOps</td><td>334</td><td>30</td><td>9.0%</td><td>$230,000</td></tr>
          <tr><td>Design</td><td>224</td><td>13</td><td>5.8%</td><td>$230,000</td></tr>
          <tr><td>Backend</td><td>212</td><td>32</td><td>15.1%</td><td>$205,503</td></tr>
          <tr><td>Customer support</td><td>147</td><td>10</td><td>6.8%</td><td>$107,000</td></tr>
          <tr><td>Fullstack</td><td>88</td><td>3</td><td>3.4%</td><td>$229,400</td></tr>
          <tr><td>Frontend</td><td>57</td><td>8</td><td>14.0%</td><td>$200,000</td></tr>
        </tbody>
      </table>
      <p>Two patterns are worth pulling out. First, <strong>volume and freedom point in opposite directions</strong>. Backend and frontend engineering hire worldwide at around nine times the rate product work does. Counting by job title rather than by the category filter, 5.9% of software engineering roles were location-free against 2.3% of product management roles — the full breakdown is in our <a href="/posts/remote-product-manager-jobs">remote product manager guide</a>. Work that is judged by what it produces travels; work that depends on being in the room with one team and one market does not.</p>
      <p class="text-sm"><em>Correction, 2 October 2026: this section originally described product as the largest field on the board, citing 1,454 roles. That figure came from our category filter, which files any listing it cannot classify under Product, so it counted a great deal of work that is not product management. Counted by job title, product management is about 3% of the board. The engineering-versus-product pattern above is unchanged.</em></p>
      <p>Second, <strong>customer support is the outlier on pay</strong>. Its median of $107,000 is less than half what DevOps and design pay, and it is the field where the widest range of people can get in without a technical background. Our <a href="/posts/remote-customer-support-careers">remote customer support guide</a> covers what those roles actually involve.</p>

      <h2>Pay: most employers still say nothing</h2>
      <p>Only <strong>17.3% of listings publish a salary range</strong>. Among those that do (794 roles quoting US dollars), the median midpoint is <strong>$200,000</strong>, with the middle half between $154,125 and $242,375.</p>
      <p>Read that figure with its sample in mind. Pay disclosure is driven mostly by US state laws, so the roles that publish a range skew towards well-funded US software companies, and the median reflects them rather than the whole market. Roles limited to the United States had a median of $205,000 across 657 published ranges. Everywhere else the samples are too thin to quote: Europe produced 14 US-dollar ranges, the UK two.</p>
      <p>By seniority, using the level named in the job title:</p>
      <table>
        <thead><tr><th>Level</th><th>Roles</th><th>With pay</th><th>Median</th><th>Middle half</th></tr></thead>
        <tbody>
          <tr><td>Entry</td><td>128</td><td>10</td><td>$112,500</td><td>$100,000 to $153,000</td></tr>
          <tr><td>Mid</td><td>2,299</td><td>335</td><td>$187,500</td><td>$130,000 to $235,000</td></tr>
          <tr><td>Senior</td><td>661</td><td>146</td><td>$187,200</td><td>$155,250 to $215,500</td></tr>
          <tr><td>Staff or lead</td><td>656</td><td>164</td><td>$229,750</td><td>$197,500 to $275,000</td></tr>
          <tr><td>Manager</td><td>476</td><td>84</td><td>$170,500</td><td>$141,650 to $213,625</td></tr>
          <tr><td>Director and above</td><td>361</td><td>55</td><td>$235,000</td><td>$198,750 to $301,800</td></tr>
        </tbody>
      </table>
      <p>Senior looks no better paid than mid here, which is a measurement artefact worth naming: "Mid" is where every title without a level word lands, so it holds both genuine mid-level roles and senior ones that simply do not say so. The pattern that does hold is the jump at staff and director level, where the middle half starts near $200,000.</p>
      <p>The <strong>worldwide roles pay differently</strong>: 24 published ranges, median $93,588. That is not a like-for-like comparison, because those employers pay one global rate rather than a San Francisco rate, and the roles are spread across support, operations and engineering. It does mean the very high figures you see quoted for remote work almost always have a country attached. <a href="/posts/what-work-from-anywhere-jobs-pay">What work-from-anywhere jobs pay</a> goes into that in detail, and the <a href="/tools/salary-band-estimator">salary band estimator</a> filters the same data by field, level and region.</p>

      <h2>Who is actually hiring</h2>
      <p>By open roles on the board:</p>
      <ul>
        <li><a href="/companies/canonical">Canonical</a>: 150 roles, 101 of them worldwide. It is, on its own, the largest source of location-free work we list.</li>
        <li><a href="/companies/gitlab">GitLab</a>: 138 roles, all region-locked.</li>
        <li><a href="/companies/grafana-labs">Grafana Labs</a>: 79. <a href="/companies/elevenlabs">ElevenLabs</a>: 55, of which 20 worldwide. Ashby: 53. <a href="/companies/supabase">Supabase</a>: 44, of which 30 worldwide.</li>
      </ul>
      <p>For location-free work specifically, the order changes: Canonical (101), Supabase (30), Remote (25), ElevenLabs (20) and Camunda (14). Those five supply about 80% of the worldwide roles on the board. If work from anywhere is what you want, following a handful of employers is a more efficient strategy than searching every day. Our guide to <a href="/posts/most-remote-friendly-companies-hiring-worldwide">the most remote-friendly companies hiring worldwide</a> covers what they have in common, and the <a href="/tools/company-remote-score">company remote score</a> tool scores any employer on the board.</p>
      <p>At the other end, <strong>373 of the 956 employers (39%) have exactly one role open</strong>, and only 102 have ten or more. Remote hiring is a long tail of small employers with one opening, plus a short head of companies hiring at volume.</p>

      <h2>What the roles ask for</h2>
      <p>The most common skills named across the board are Python (179 roles), Salesforce (141), Kubernetes (138), PostgreSQL (111) and AWS (89). Among worldwide roles the mix tilts harder towards infrastructure: Python (76 of 237 roles), Kubernetes (46), PostgreSQL (43) and Rust (25). Rust is the clearest signal here: it appears in about one in ten location-free roles against one in eighty across the board, because the companies building infrastructure in it are the same ones hiring without a map.</p>
      <p>Almost everything is a permanent job: <strong>4,531 full-time</strong>, 29 part-time and 21 contract. If you are looking for part-time remote work, this board is not where the volume is, and that is worth knowing before you spend weeks searching.</p>

      <h2>How fresh the board is</h2>
      <p>The median listing is 25 days old. 440 roles (9.6%) were posted in the last week, and 2,824 (61.6%) in the last month. Nothing is older than 60 days, because listings expire at that point and their pages return a real "not found" rather than quietly showing a dead role.</p>

      <h2>How these numbers were produced, and what they are not</h2>
      <p>Everything above is counted from the same data the site serves, using the location rules described in <a href="/how-it-works">how the board works</a>. A few limits, stated plainly:</p>
      <ul>
        <li><strong>This board is a sample, not the market.</strong> It carries roles from employers' own hiring systems plus a few remote job sources, filtered for genuinely remote work. It is not everything being advertised anywhere.</li>
        <li><strong>Pay covers only ranges quoted in US dollars</strong>: 794 usable ranges, out of 796 in dollars and 855 listings quoting a range in any currency. Figures are midpoints of the published range, so a role advertised at $180,000 to $220,000 counts as $200,000.</li>
        <li><strong>Posting dates are approximate for some listings.</strong> About 14% of roles share a batch timestamp from when they were imported rather than the employer's own posting date, so treat the freshness section as a guide rather than a precise measure.</li>
        <li><strong>Seniority comes from the job title</strong>, not from the description, which is why the mid-level bucket is so large.</li>
        <li><strong>333 listings name a location we could not classify</strong> into a region, usually a city-only or multi-country string. They are counted in the totals but not in the regional breakdown.</li>
      </ul>
      <p>If you spot something that looks wrong, tell me and I will check it: the address is on the <a href="/contact">contact page</a>. I plan to repeat this count each month, so the changes become visible over time.</p>

      <p>Browse the <a href="/work-from-anywhere-jobs">237 work-from-anywhere roles</a>, the <a href="/remote-regional-jobs">region-locked board</a>, or start from <a href="/jobs">search</a>.</p>
    `,
    faq: [
      {
        q: "What share of remote jobs are truly work from anywhere?",
        a: "On getremotejobsnow.com on 29 September 2026, 237 of 4,581 open remote roles carried no country, region or time zone condition. That is 5.2%. The remaining 4,344 roles were genuinely remote but limited to a named region.",
      },
      {
        q: "What do remote jobs pay in 2026?",
        a: "Among the 17.3% of listings that publish a range in US dollars, the median midpoint was $200,000, with the middle half between $154,125 and $242,375. That sample skews towards US software companies, which publish ranges because state law requires it. Roles open worldwide had a median of $93,588 across 24 published ranges.",
      },
      {
        q: "Which companies hire the most remote workers?",
        a: "By open roles on our board: Canonical (150), GitLab (138), Grafana Labs (79), ElevenLabs (55), Ashby (53) and Supabase (44). For roles with no location requirement, Canonical, Supabase, Remote, ElevenLabs and Camunda supply about 80% of what we list.",
      },
      {
        q: "Which remote fields are most likely to hire worldwide?",
        a: "Engineering. 15.1% of backend roles and 14.0% of frontend roles were open worldwide on 29 September 2026. Product work is the least likely to be location-free: counted by job title on 2 October 2026, 2.3% of product management roles carried no location condition, against 5.9% of software engineering roles.",
      },
    ],
  },
  {
    slug: "remote-product-manager-jobs",
    title: "Remote Product Manager Jobs: 130 Open, and Only 3 You Can Do From Anywhere",
    description:
      "Every remote product manager role on our board, counted: what they pay, who is hiring, why almost none are work-from-anywhere, and why there is no junior rung.",
    date: "2026-10-02T07:00:00.000Z",
    author: "Bhargav",
    tags: ["Product Management", "Remote Jobs Data", "Remote Salaries", "Work From Anywhere", "Product Manager"],
    readMinutes: 9,
    html: `
      <p>This is a count of every product manager role open on getremotejobsnow.com on <strong>2 October 2026</strong>: <strong>130 roles from 93 employers</strong>, out of 4,066 remote listings in total. No survey and no estimates — just what employers were advertising on the day. The board is rebuilt nightly, so today's figures on the site will differ a little from these.</p>

      <p>Three things stood out, and none of them is the thing I expected to write about.</p>

      <h2>Product management is a small slice of remote hiring, not a large one</h2>
      <p>Product manager roles are <strong>130 of 4,066 listings, or 3.2%</strong>. For comparison, 490 listings on the same board are titled as software engineering roles and 405 are sales or account roles. If you are searching for remote product work, you are fishing in a much smaller pond than the volume of "we're hiring PMs" posts on LinkedIn suggests.</p>
      <p>One number that is easy to misread: 205 further listings have the word "product" in the title but are not product management jobs — product designers, product marketing managers, product engineers. They are worth knowing about if you are open to adjacent work, but counting them as PM roles would inflate the field by more than half again.</p>

      <h2>Almost none of them are work-from-anywhere</h2>
      <p>Of the 130 roles, <strong>3 carry no location condition at all</strong>. That is 2.3%, against 4.4% for the board as a whole — product management is roughly half as likely to be location-free as the average remote job, and the least location-free of the role families big enough to compare:</p>
      <table>
        <thead><tr><th>Role family (by title)</th><th>Roles</th><th>Work-from-anywhere</th><th>Share</th></tr></thead>
        <tbody>
          <tr><td>Software engineer</td><td>490</td><td>29</td><td>5.9%</td></tr>
          <tr><td>Customer support / success</td><td>97</td><td>4</td><td>4.1%</td></tr>
          <tr><td>Designer</td><td>58</td><td>2</td><td>3.4%</td></tr>
          <tr><td>Sales / account management</td><td>405</td><td>11</td><td>2.7%</td></tr>
          <tr><td><strong>Product manager</strong></td><td><strong>130</strong></td><td><strong>3</strong></td><td><strong>2.3%</strong></td></tr>
        </tbody>
      </table>
      <p>All three of the location-free roles come from two companies: <strong>Supabase</strong> (a Product Lead for Infrastructure, and a Product Manager for Strategic Partner Integrations advertising a $235,000 midpoint) and <strong>Going</strong> (a Senior Technical Product Manager). Both are companies that already hire worldwide across their other openings. If you want work-from-anywhere product work, the practical move is to follow the handful of employers that work that way rather than to search for the role and hope.</p>

      <h3>Why so few? A reasonable explanation, not a finding</h3>
      <p>Our data shows the pattern; it does not explain it. The explanation below is my reading, and you should treat it as that.</p>
      <p>Product management is the job most tightly coupled to other people's calendars. A PM's week is largely spent in conversation — with engineers, designers, sales, support and customers — and that is the kind of work that degrades fastest across a twelve-hour gap. Engineering work can be written down, reviewed asynchronously and judged by what it produces; a prioritisation argument usually cannot. Add to that the fact that product decisions are made against a specific market, and a company selling mainly to US buyers has a real reason to want its PMs on US hours.</p>
      <p>None of that makes a location-free PM role impossible — three of them exist on this board today. It does mean they cluster at companies that have made asynchronous work an explicit discipline rather than a perk. We have written separately about <a href="/posts/async-first-companies-hiring-2026">how async-first employers hire</a>.</p>

      <h2>They pay well, and they say so more often</h2>
      <p>Of the 130 roles, <strong>46 publish a salary range (35.4%)</strong>. That is close to double the board-wide rate of 18.2%, and it is the most useful thing on this page if you are negotiating. Converted to USD midpoints:</p>
      <table>
        <thead><tr><th></th><th>Product manager roles</th><th>Whole board</th></tr></thead>
        <tbody>
          <tr><td>Listings publishing pay</td><td>46 of 130 (35.4%)</td><td>740 of 4,066 (18.2%)</td></tr>
          <tr><td>25th percentile</td><td>$200,500</td><td>—</td></tr>
          <tr><td><strong>Median</strong></td><td><strong>$234,375</strong></td><td><strong>$195,000</strong></td></tr>
          <tr><td>75th percentile</td><td>$274,400</td><td>—</td></tr>
          <tr><td>Full range</td><td>$146,500 – $311,000</td><td>—</td></tr>
        </tbody>
      </table>
      <p>Two warnings before you anchor on $234,375. First, it is a median of 46 listings, not of the market. Second, and more important, the sample is dominated by US employers, and US employers are the ones legally obliged to publish a range in several states — so the listings that disclose pay are not a random sample of the listings that exist. The number is best read as "what US-weighted, transparency-law-covered product roles were advertising", not "what remote PMs earn". Our guide to <a href="/posts/salary-transparency-laws-2026">where pay ranges are required</a> covers which rules bite where.</p>

      <h3>By seniority, with the sample sizes attached</h3>
      <table>
        <thead><tr><th>Level (read from the title)</th><th>Roles</th><th>With pay published</th><th>Median</th></tr></thead>
        <tbody>
          <tr><td>Chief product officer, VP, Head, Director</td><td>11</td><td>6</td><td>$274,700</td></tr>
          <tr><td>Group / Principal / Staff / Lead</td><td>41</td><td>13</td><td>$259,000</td></tr>
          <tr><td>Senior product manager</td><td>30</td><td>11</td><td>$187,200</td></tr>
          <tr><td>Product manager, no level stated</td><td>48</td><td>16</td><td>$237,500</td></tr>
          <tr><td>Associate or junior product manager</td><td>0</td><td>0</td><td>—</td></tr>
        </tbody>
      </table>
      <p>The oddity in that table is real and I am not going to smooth it over: "Senior product manager" shows a lower median than unlevelled "Product manager". With 11 and 16 disclosed salaries respectively, that is almost certainly sample noise rather than a fact about the market — a single $300,000 unlevelled role at a US company moves the second number more than it should. Do not plan a career around it. The levels with enough listings to trust, at the top of the table, behave exactly as you would expect.</p>

      <h2>There is no bottom rung</h2>
      <p>Across all 130 roles, the number titled associate product manager, junior product manager or APM is <strong>zero</strong>.</p>
      <p>This matches what we found when we looked at <a href="/posts/first-remote-job-2026-no-experience">entry-level remote work generally</a>, but it is starker here. Remote product management, as advertised today, is not a job you can enter — it is a job you move into once someone has already decided you can do it. If you are trying to break in, the realistic routes are the ones that put you next to the product function first: support, implementation, solutions engineering, business analysis or data analysis at a company that promotes internally, and then a sideways move once you are inside.</p>
      <p>The adjacent-title count from earlier is useful here too. Those 205 product-adjacent listings — product designer, product marketing, product engineer — are a far larger surface than the 130 PM roles, and several of them are genuine on-ramps.</p>

      <h2>Who is hiring</h2>
      <p>93 employers for 130 roles, so the field is spread thin: most companies are hiring exactly one product manager. The exceptions:</p>
      <ul>
        <li><strong>Grafana Labs</strong> — 7 roles</li>
        <li><strong>GitLab</strong> — 5 roles</li>
        <li><strong>Assured</strong> — 4 roles</li>
        <li><strong>Vanta, Confluent, HIMS &amp; Hers, Chronograph, Render, Supabase, Pragmatike</strong> — 3 roles each</li>
      </ul>
      <p>Grafana Labs and GitLab at the top is not a coincidence: both are long-standing distributed companies with public handbooks about how they work. You can check any employer's record on our <a href="/tools/company-remote-score">company remote hiring score</a> tool, which shows how widely a company hires and whether it publishes pay.</p>

      <h2>Where the roles actually are</h2>
      <p>Resolving each listing's location to a country:</p>
      <table>
        <thead><tr><th>Open to</th><th>Roles</th><th>Share</th></tr></thead>
        <tbody>
          <tr><td>United States</td><td>87</td><td>66.9%</td></tr>
          <tr><td>Canada</td><td>12</td><td>9.2%</td></tr>
          <tr><td>India</td><td>4</td><td>3.1%</td></tr>
          <tr><td>Germany</td><td>4</td><td>3.1%</td></tr>
          <tr><td>United Kingdom</td><td>3</td><td>2.3%</td></tr>
          <tr><td>Everywhere else (one or two roles each)</td><td>11</td><td>8.5%</td></tr>
          <tr><td>No country named (includes the 3 worldwide roles)</td><td>16</td><td>12.3%</td></tr>
        </tbody>
      </table>
      <p>Two thirds of remote product management on this board is American. A listing can be open to more than one country, so the column adds to more than 130. If you are outside the US and Canada, the honest summary is that roughly one in five of these roles is plausibly open to you, and you should be filtering by region from the first search rather than reading 130 descriptions.</p>

      <h2>How to search for these roles without wasting your evenings</h2>
      <ol>
        <li><strong>Search the title, not the category.</strong> <a href="/jobs?q=product%20manager">Search "product manager"</a> and you get the roles; browsing a broad product category gets you a lot of things that merely touch product.</li>
        <li><strong>Set the scope filter before anything else.</strong> If you need location-free work, <a href="/work-from-anywhere-jobs">start from the work-from-anywhere board</a> — there were 3 PM roles on it today, and reading 3 listings properly beats skimming 130.</li>
        <li><strong>Filter by your region early.</strong> Two thirds of these roles are US-only; finding that out from a filter is cheaper than finding it out in paragraph nine of a job description.</li>
        <li><strong>Sort by newest and check back often.</strong> The median role on this list was posted 22 days ago, and 25 of the 130 were posted within the last 7 days. Product roles do not sit open forever.</li>
        <li><strong>Follow employers, not postings.</strong> With 93 employers for 130 roles, the companies that hire PMs remotely more than once are a much shorter list than the roles themselves — and they are the ones likely to be hiring again next quarter.</li>
      </ol>

      <h2>How we counted, and what this cannot tell you</h2>
      <p>Figures are from the live board on <strong>2 October 2026</strong>, covering 4,066 published listings.</p>
      <ul>
        <li><strong>Roles are identified by job title</strong>, not by the category filter on the site. A listing counts if its title contains product manager, product owner, product lead, head of product, director or VP of product, chief product officer, or product management. Titles containing product designer, product marketing, product engineer, product analyst, product support, product specialist or product operations are excluded — they share the word, not the job. Six listings matched both and were excluded.</li>
        <li><strong>Pay figures cover only the 46 listings that publish a range</strong>, converted to a USD midpoint. Listings that publish no pay are not counted as low — they are not counted at all. That sample skews towards US employers covered by pay-transparency laws.</li>
        <li><strong>Seniority is read from the title.</strong> A company's internal level for a role titled "Product Manager" is not visible to us.</li>
        <li><strong>This is one board, not the market.</strong> We read employers' own career pages and hiring systems nightly; we do not see roles that are never advertised publicly, filled internally, or posted only on a platform we do not read. Our <a href="/posts/how-we-source-and-verify-listings">sourcing and verification method</a> sets out exactly what is in and what is out.</li>
        <li><strong>Counts change nightly.</strong> If a figure here disagrees with the live board, the board is right.</li>
      </ul>
      <p>If you want the whole-board version of this analysis rather than the product slice, the <a href="/posts/remote-hiring-report-september-2026">September 2026 hiring report</a> covers every field.</p>
    `,
    faq: [
      {
        q: "How many remote product manager jobs are there?",
        a: "On our board on 2 October 2026 there were 130 open remote product manager roles from 93 employers, out of 4,066 remote listings in total — about 3.2% of the board. A further 205 listings had 'product' in the title but were product design, product marketing or product engineering roles rather than product management.",
      },
      {
        q: "Can you work as a product manager from anywhere in the world?",
        a: "Rarely. Of 130 remote product manager roles on our board on 2 October 2026, only 3 carried no country, region or timezone condition — 2.3%, against 4.4% across the whole board. All three came from two employers, Supabase and Going. Product management is the least location-free of the major remote role families, most likely because the job is built around other people's calendars.",
      },
      {
        q: "What do remote product managers earn?",
        a: "Among the 46 of 130 roles that published a salary range on 2 October 2026, the median USD midpoint was $234,375, with a 25th-to-75th percentile band of $200,500 to $274,400 and a full range of $146,500 to $311,000. The board-wide median across all fields was $195,000. That sample is weighted towards US employers covered by pay-transparency laws, so it is not a global average.",
      },
      {
        q: "Are there entry-level or associate remote product manager jobs?",
        a: "Not on our board. Of 130 remote product manager roles open on 2 October 2026, zero were titled associate product manager, junior product manager or APM. Remote product management is advertised almost entirely at senior level and above, so the realistic entry route is a role adjacent to product — support, implementation, solutions engineering or analysis — at a company that promotes internally.",
      },
      {
        q: "Which companies hire remote product managers?",
        a: "On 2 October 2026 the most active were Grafana Labs with 7 roles, GitLab with 5 and Assured with 4, followed by Vanta, Confluent, HIMS & Hers, Chronograph, Render, Supabase and Pragmatike with 3 each. The field is spread thin overall: 93 employers advertised 130 roles, so most companies were hiring a single product manager.",
      },
      {
        q: "Do remote product manager jobs publish salaries more often than other roles?",
        a: "Yes. 35.4% of remote product manager listings on our board published a salary range on 2 October 2026, against 18.2% across all fields. The most likely reason is where the roles are: two thirds are open to the United States, where several states require a pay range in the posting.",
      },
    ],
  },
];
