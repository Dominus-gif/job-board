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
      "Return-to-office headlines say remote is over. Our data on 3,998 live listings says something else: remote didn't die in 2026 — it stratified, and the top tier is now one employer plus a long tail.",
    date: "2026-09-06T09:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Work Trends", "Return to Office", "RTO 2026", "Future of Work", "Remote Work Statistics"],
    readMinutes: 8,
    html: `
      <p>Every few months a new headline declares remote work dead. A bank orders everyone back five days a week, a tech CEO says collaboration only happens in person, and the story writes itself: <em>the experiment is over</em>.</p>
      <p>Then you look at the actual listings, and the story falls apart.</p>
      <p class="text-sm"><em>Updated 5 October 2026. The work-from-anywhere board moved sharply overnight: Canonical, which had been posting 99 of the 173 location-free roles, retired most of them, and the total fell to 91 from 23 employers. The figures below are the 5 October numbers. The direction of every finding here is unchanged, but the absolute counts in a market this concentrated can halve when one employer closes a hiring round — which is itself the most useful thing to know about it.</em></p>
      <p>We track this for a living. On <strong>5 October 2026</strong> our board held <strong>3,871 published remote roles</strong>. That is not the footprint of a dying category. But it isn't a victory lap either — because of those 3,871 roles, only <strong>91 are genuinely work-from-anywhere</strong>. That's <strong>2.4%</strong>.</p>
      <p>That single ratio explains the entire debate.</p>

      <h2>Remote didn't die. It stratified.</h2>
      <p>Both sides of the argument are looking at real numbers and reaching opposite conclusions, because they're measuring different things.</p>
      <ul>
        <li><strong>The "remote is dead" camp</strong> counts job <em>postings</em> tagged on-site. Employers did pull back. RTO mandates are real, and the share of listings that are fully open has shrunk hard.</li>
        <li><strong>The "remote is fine" camp</strong> counts <em>people actually working remotely</em>. That number has stayed remarkably stable, because the people who already have remote roles mostly kept them.</li>
      </ul>
      <p>Both are true at once. What changed isn't the existence of remote work — it's the <strong>distribution</strong>. Remote split into tiers:</p>
      <ol>
        <li><strong>Tier 1 — Work-from-anywhere (2.4% of our board).</strong> No country, no timezone, no work-authorization gate. Genuinely rare, genuinely competitive.</li>
        <li><strong>Tier 2 — Region-locked remote (97.6%).</strong> "Remote, US only." "Remote, EU." Fully remote in practice, but you must live in a named place. This is where the volume is now.</li>
        <li><strong>Tier 3 — Hybrid dressed as remote.</strong> The listings that say remote and mean "three days in the office."</li>
      </ol>
      <blockquote>Remote work in 2026 isn't shrinking. It's hardening into a class system — and the top tier is small enough that most people never see it.</blockquote>

      <h2>What the RTO mandates actually did</h2>
      <p>RTO announcements are loud because they come from large, recognisable employers. But large legacy employers were never where work-from-anywhere lived. The roles in our top tier come overwhelmingly from companies that were <em>built</em> distributed — the GitLabs, Canonicals and Supabases of the world — not from firms that tolerated remote for two years and then changed their minds.</p>
      <p>So the mandates removed a category of jobs that were mostly never truly location-free to begin with. The headline reads "remote collapses." The reality is closer to "the pretenders left."</p>

      <h2>Where the remaining opportunity actually is</h2>
      <p>Here's the part the doom coverage misses. Within that 91-role work-from-anywhere tier, the mix is nothing like what you'd guess. Counted by job title, and these overlap (an engineering manager counts in two rows), so they do not sum to 173:</p>
      <ul>
        <li><strong>Engineering — 39 of the 91 roles (42.9%).</strong> The largest single block on the work-from-anywhere board by some distance. If you want a job with no location condition, this is overwhelmingly where they are.</li>
        <li><strong>Management and leadership — 65 roles (37.6%).</strong> Titles containing manager, director, head of or lead. Many are engineering leadership, which is why this row overlaps so heavily with the one above.</li>
        <li><strong>Sales — 23 roles (13.3%).</strong> Far smaller in the location-free tier than its volume on the wider board would suggest.</li>
        <li><strong>Customer support — 9 roles (5.2%).</strong> Small in absolute terms, but the one field here that regularly hires without a technical background.</li>
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
      <p>One number is worth carrying away. The work-from-anywhere tier is not just small, it is <strong>concentrated and unstable</strong>: 91 roles from 23 employers, with the top four holding 56% of them. A single employer closing a hiring round halved this tier between 4 and 5 October. If your plan depends on location-free work, it depends on a short list of companies, and short lists move.</p>
      <p class="text-sm"><em>Correction, 4 October 2026: the tier mix above was previously reported from our category filter, which files any listing it cannot classify under "Product" and so cannot be used to size a field: it named Management &amp; Finance as the largest work-from-anywhere category with 140 roles. Counted by title, engineering is the largest by a wide margin. The board totals in this piece were also months out of date and have been refreshed.</em></p>
      <p>The people who struggle are the ones still searching as if it's one market. The people who do well are the ones who pick a tier and search it deliberately.</p>
      <p><a href="/find-remote-jobs">Start with a filtered search →</a></p>
    `,
  },
  {
    slug: "remote-job-tier-list-2026",
    title: "The Remote Job Tier List: Ranked by Volume, Pay and Whether the Job Travels",
    description:
      "Remote roles ranked from 3,998 live listings on three axes: how many exist, what they pay, and how likely they are to be open to someone anywhere. One popular 'remote job' still scores zero.",
    date: "2026-09-05T09:00:00.000Z",
    updated: "2026-10-04T07:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Jobs 2026", "Tier List", "Career Advice", "Job Market Data", "Best Remote Jobs"],
    readMinutes: 10,
    html: `
      <p>Counted on <strong>4 October 2026</strong> from <strong>3,998 live remote listings</strong>. Figures come from the board itself and change nightly.</p>

      <p class="text-sm"><em>Correction, 4 October 2026: this list was previously built from our category filter, which files any listing it cannot classify under "Product". That inflated some fields, invented others, and produced a $80,000 frontend median we have since retracted elsewhere. Everything below is counted by job title instead, and the tiers have been re-derived from scratch. Two rankings changed materially: AI and machine learning dropped out of the top tier, and DevOps moved into it.</em></p>

      <p>Tier lists are usually vibes. This one is built on three things that can be counted: <strong>how many roles exist</strong>, <strong>what the ones that publish pay actually pay</strong>, and — the axis most tier lists ignore — <strong>how likely the work is to be open to someone living anywhere</strong>.</p>
      <p>That third axis does most of the work here. Only 4.3% of the board carries no country, region or timezone condition, and that scarcity is distributed very unevenly between fields. A role can have excellent volume and still be a bad bet if you need it to travel.</p>

      <h2>The whole table first</h2>
      <p>Counted by title. The pay column is the median of the listings in that family that publish a range, and the count beside it is how many that is — a median of 5 is an anecdote, not a market.</p>
      <table>
        <thead><tr><th>Field (by title)</th><th>Roles</th><th>Work-from-anywhere</th><th>Median pay</th><th>Pay sample</th></tr></thead>
        <tbody>
          <tr><td>Software engineering (all)</td><td>504</td><td>6.3%</td><td>$212,000</td><td>163</td></tr>
          <tr><td>Sales (all titles)</td><td>478</td><td>4.0%</td><td>$170,000</td><td>73</td></tr>
          <tr><td>Account executive</td><td>316</td><td>1.6%</td><td>$188,750</td><td>50</td></tr>
          <tr><td>Customer support / success</td><td>125</td><td>5.6%</td><td>$115,525</td><td>20</td></tr>
          <tr><td>Product management</td><td>121</td><td>3.3%</td><td>$225,900</td><td>40</td></tr>
          <tr><td>AI / ML / applied AI</td><td>93</td><td>1.1%</td><td>$209,750</td><td>21</td></tr>
          <tr><td>Marketing</td><td>90</td><td>0.0%</td><td>$147,813</td><td>22</td></tr>
          <tr><td>Data (eng / science / analytics)</td><td>89</td><td>1.1%</td><td>$187,000</td><td>15</td></tr>
          <tr><td>DevOps / SRE / platform</td><td>84</td><td><strong>10.7%</strong></td><td>$215,500</td><td>19</td></tr>
          <tr><td>Backend engineer</td><td>68</td><td>0.0%</td><td>$192,485</td><td>17</td></tr>
          <tr><td>Design</td><td>64</td><td>1.6%</td><td>$233,500</td><td>12</td></tr>
          <tr><td>Security</td><td>43</td><td>4.7%</td><td>$222,000</td><td>9</td></tr>
          <tr><td>Full-stack engineer</td><td>41</td><td>2.4%</td><td>$185,000</td><td>11</td></tr>
          <tr><td>Project / programme management</td><td>26</td><td>3.8%</td><td>$218,306</td><td>10</td></tr>
          <tr><td>Content writing</td><td>16</td><td>6.3%</td><td>—</td><td>1</td></tr>
          <tr><td>QA / test</td><td>14</td><td>0.0%</td><td>$144,735</td><td>3</td></tr>
          <tr><td>Frontend / web development</td><td>12</td><td>0.0%</td><td>$130,000</td><td>5</td></tr>
          <tr><td>Virtual / executive assistant</td><td>11</td><td>0.0%</td><td>—</td><td>1</td></tr>
          <tr><td><strong>Data entry</strong></td><td><strong>0</strong></td><td>—</td><td>—</td><td>0</td></tr>
        </tbody>
      </table>

      <h2>Tier A — volume, pay and portability all hold up</h2>
      <p><strong>DevOps, SRE and platform engineering — 84 roles, $215,500 median, 10.7% work-from-anywhere</strong><br/>
      The highest portability of any field on the board, by a distance — more than two and a half times the board average. Infrastructure work is judged by whether the system stays up, which is the easiest kind of output to assess across twelve timezones, and it is the hardest to fake. Smaller in raw volume than engineering overall, but if you want a job that will follow you to another country, this is the strongest position on the list.</p>
      <p><strong>Software engineering generally — 504 roles, $212,000 median from 163 published ranges, 6.3% work-from-anywhere</strong><br/>
      The largest field by title, the best pay sample on the board by a wide margin, and above-average portability. It is Tier A on every axis at once, which nothing else manages.</p>

      <h2>Tier B — strong, with a condition attached</h2>
      <p><strong>Product management — 121 roles, $225,900 median, 3.3% work-from-anywhere</strong><br/>
      Pay near the top of the table and a decent sample behind it. Held at B because the work is the most calendar-coupled on this list and the portability shows it, and because there is no entry rung at all — we found zero roles titled associate or junior product manager. Full breakdown in our <a href="/posts/remote-product-manager-jobs">remote product manager guide</a>.</p>
      <p><strong>Security — 43 roles, $222,000 median, 4.7% work-from-anywhere</strong><br/>
      Small but healthy on every axis, with above-average portability. B rather than A purely on volume: 43 roles is a thin market to run a job search against.</p>
      <p><strong>Sales — 478 roles across all sales titles, 316 of them account executive</strong><br/>
      Enormous volume, genuinely remote-native work, and the widest pay spread of anything we track — a 25th-to-75th range of $143,500 to $256,250 for AEs. What it is not is portable: 1.6% of AE listings carry no location condition, because selling into a market is a reason to hire someone who lives in it. Take it for the ceiling, not for the freedom. We compare it with engineering in <a href="/posts/account-executives-beat-software-engineers-remote">remote sales versus remote engineering</a>.</p>

      <h2>Tier C — real work, but know what you are signing up for</h2>
      <p><strong>AI, machine learning and applied AI — 93 roles, $209,750 median, 1.1% work-from-anywhere</strong><br/>
      This moved down, and the reason is the whole point of this list. The pay is excellent and the demand is real. But 1 role in 93 is open to someone anywhere, which is a quarter of the board average — these jobs cluster at well-funded companies hiring into specific countries. If you are moving into AI expecting it to make you location-independent, the data does not support that.</p>
      <p><strong>Data engineering, science and analytics — 89 roles, $187,000 median, 1.1% work-from-anywhere</strong><br/>
      Same shape as AI, a little less pay. Solid career, poor portability.</p>
      <p><strong>Customer support and success — 125 roles, $115,525 median, 5.6% work-from-anywhere</strong><br/>
      The lowest median in the table, and also the widest open door: it remains the most realistic entry point into remote work without a technical background, and its portability is above average. The caveat is durability rather than pay — scripted first-line queue work is the most exposed to automation on this list, while troubleshooting and account ownership are not.</p>
      <p><strong>Design — 64 roles, $233,500 median, 1.6% work-from-anywhere</strong><br/>
      The highest median in the table, from only 12 published ranges, so treat the figure as indicative. C on volume and competition: a small market against one of the largest applicant pools in remote work.</p>

      <h2>Tier D — do not build a plan around these</h2>
      <p><strong>Data entry — 0 roles</strong><br/>
      Not "few". Zero, out of 3,998 live remote listings, which is the same answer we got when the board was more than twice this size. It is among the most-searched remote job phrases on the internet and it does not meaningfully exist as a legitimate remote career. It was the first thing automated, and a great deal of the search demand that remains is serviced by fraud. <strong>If a listing offers well-paid remote data entry with no experience required, treat it as a scam until proven otherwise</strong> — our <a href="/tools/fake-job-checker">fake job posting checker</a> covers the signals, and <a href="/posts/remote-job-scams-how-they-make-money">how remote job scams actually make money</a> explains the mechanisms.</p>
      <p><strong>Virtual and executive assistant — 11 roles</strong><br/>
      A legitimate job that barely exists on boards like this one, because it is hired through agencies and personal networks rather than advertised. Low volume here is a statement about where the hiring happens, not about whether the work exists.</p>
      <p><strong>Generic frontend and web development — 12 roles by title</strong><br/>
      A note on why this number is so small, because the previous version of this page got it badly wrong. Counting by title, almost nobody advertises for a "frontend engineer" as such any more; the work is folded into full-stack and general software engineering postings, which is where the 504 figure comes from. We previously reported a $80,000 median here and built an argument about commoditisation on it. That figure came from a sample too thin to carry the claim, and we have retracted it. The honest statement is narrower: <strong>the job title is disappearing into broader ones, which is not the same as the work being devalued.</strong></p>

      <h2>The thing the tiers do not show: there is barely a bottom rung</h2>
      <p>Across the whole board, <strong>149 of 3,998 listings carry a junior, entry-level, graduate, associate or internship title — 3.7%</strong>. On the work-from-anywhere board it is 8 roles out of 173, and seven of those eight are at a single employer.</p>
      <p>No tier on this list is realistically enterable without existing experience. If you are starting out, the fields with any entry-level presence at all are support, sales development and general software engineering, and our guide to <a href="/posts/first-remote-job-2026-no-experience">getting a first remote job</a> deals with that directly.</p>

      <h2>How we counted</h2>
      <ul>
        <li>Figures are from the live board on <strong>4 October 2026</strong>: 3,998 published listings, 173 of them work-from-anywhere, 732 publishing a salary range.</li>
        <li><strong>Fields are counted by job title</strong>, not by the site's category filter. The filter files unclassifiable listings under "Product", so it cannot be used to size a field. This is the change that re-derived the whole list.</li>
        <li>Families are matched by title pattern and <strong>can overlap</strong> — a platform engineer counts in both software engineering and DevOps — so the rows do not sum to the board.</li>
        <li>Pay is the median USD midpoint of the listings in that family that publish a range. The sample column is how many that is, and small samples are flagged rather than smoothed.</li>
        <li>"Work-from-anywhere" means no country, region, timezone or local work-authorisation requirement of any kind. Our <a href="/posts/how-we-source-and-verify-listings">sourcing method</a> sets out what qualifies.</li>
        <li>Counts change nightly. If a figure here disagrees with the board, the board is right.</li>
      </ul>
    `,
  },
  {
    slug: "how-to-find-work-from-anywhere-jobs",
    title: "How to Find Work-From-Anywhere Jobs (When Only 7% of Remote Roles Are Truly Location-Free)",
    description:
      "Most 'remote' jobs quietly require a country or timezone. Only 4.3% of the 3,998 listings we track are location-free, they come from 23 employers, and one of them is 57% of the market. Here is how to find them.",
    date: "2026-09-04T09:00:00.000Z",
    author: "Bhargav",
    tags: ["Work From Anywhere", "Location Independent Jobs", "Remote Job Search", "Digital Nomad Jobs", "WFA Jobs"],
    readMinutes: 7,
    html: `
      <p>You search "remote jobs." You find thousands. You apply to forty. You hear back from none — and then you notice the line you skipped: <em>Remote (US only).</em> Or <em>Must overlap 9am–1pm ET.</em> Or <em>Must be authorised to work in the EU.</em></p>
      <p>You weren't unlucky. You were applying to the wrong tier.</p>
      <p class="text-sm"><em>Updated 5 October 2026. The work-from-anywhere board moved sharply overnight: Canonical, which had been posting 99 of the 173 location-free roles, retired most of them, and the total fell to 91 from 23 employers. The figures below are the 5 October numbers. The direction of every finding here is unchanged, but the absolute counts in a market this concentrated can halve when one employer closes a hiring round — which is itself the most useful thing to know about it.</em></p>
      <p>Of the <strong>3,871 remote roles</strong> we tracked on <strong>5 October 2026</strong>, only <strong>91 — 2.4% — are genuinely work-from-anywhere</strong>. Everything else names a country, a region, or a timezone you have to live in.</p>

      <h2>Remote vs work-from-anywhere: the distinction that costs people months</h2>
      <p>These are different products wearing the same word.</p>
      <ul>
        <li><strong>Remote</strong> means you don't come to an office. It says nothing about <em>where you may live</em>. "Remote, US only" is a remote job.</li>
        <li><strong>Work-from-anywhere (WFA)</strong> means no country requirement, no region requirement, no timezone-overlap requirement, and no local work-authorization gate. You could move to a different continent and nothing about your employment changes.</li>
      </ul>
      <blockquote>If a listing names a place you must be, it's remote. If it names nowhere, it's work-from-anywhere. That one test filters out 95.7% of the market.</blockquote>

      <h2>Why real WFA roles are so rare</h2>
      <p>It isn't reluctance — it's payroll, tax and employment law. To hire someone in a country, a company generally needs a legal entity there or an employer-of-record service, and it takes on that country's tax and compliance exposure. Every additional country is real cost and real risk.</p>
      <p>So companies that hire genuinely globally have usually made a deliberate structural decision: they run on an employer-of-record, they hire contractors, or they were built distributed from day one. That's why WFA roles cluster so heavily in a specific set of employers rather than spreading evenly across the market.</p>

      <h2>Which companies actually post work-from-anywhere roles</h2>
      <p>Those 91 roles come from just <strong>23 employers</strong>, and they are nothing like evenly spread:</p>
      <table>
        <thead><tr><th>Employer</th><th>Location-free roles</th><th>Share of its own hiring</th></tr></thead>
        <tbody>
          <tr><td>Canonical</td><td><strong>17</strong></td><td>17 of 25 (68.0%)</td></tr>
          <tr><td>Supabase</td><td><strong>17</strong></td><td>17 of 36 (47.2%)</td></tr>
          <tr><td>Camunda</td><td>11</td><td>11 of 20 (55.0%)</td></tr>
          <tr><td>Metabase</td><td>6</td><td>6 of 11 (54.5%)</td></tr>
          <tr><td>Goodstack</td><td>6</td><td>6 of 7 (85.7%)</td></tr>
          <tr><td>ElevenLabs</td><td>5</td><td>5 of 39 (12.8%)</td></tr>
          <tr><td>InBeat Agency</td><td>4</td><td>4 of 6 (66.7%)</td></tr>
        </tbody>
      </table>
      <p><strong>The top four employers hold 51 of the 91 roles — 56.0%</strong>, and a third of the 23 are posting exactly one. The practical consequence is the most useful thing on this page: there are not enough location-free roles, spread widely enough, for keyword search to be the right tool. <strong>Following a dozen employers is.</strong> The right-hand column is how you pick them — an employer posting 99 of its 148 roles location-free has made a structural decision; one posting 5 of 42 has made an exception five times.</p>
      <p class="text-sm"><em>Correction, 4 October 2026: this page previously named GitLab, ElevenLabs, Grafana Labs and Vanta among the biggest posters of location-free roles, with counts in the hundreds. Those figures were badly out of date and wrong in substance: GitLab currently has 127 open roles and none are location-free, and the same is true of Grafana Labs and Vanta. All three are genuinely remote companies that hire only where they hold a legal entity, which is a different thing. See <a href="/posts/async-first-companies-hiring-2026">async-first does not mean hire-from-anywhere</a>.</em></p>
      <p>Notice what they have in common. Every one of them has built the legal and operational machinery to employ people in many countries — entities or an employer of record, plus a way of working that does not depend on everyone being awake at once. That is expensive and deliberate, which is exactly why only 23 employers on a 3,998-role board do it. What it is <em>not</em> is the same as being a well-known remote company: several of the most famous all-remote employers hire in a fixed list of countries and appear nowhere on this table.</p>

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
      <p>And be realistic about entry level: of those 91 work-from-anywhere roles, only <strong>3</strong> carry a junior, entry-level or graduate title — <strong>3.3%</strong> — and two of the three are at Canonical. The entry-level work-from-anywhere market is, on any given day, a couple of openings at one or two employers. Beyond it, WFA is a mid-to-senior market — worth knowing before you spend three months applying.</p>

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
      <p>We cover the overlap question in detail in <a href="/posts/timezone-overlap-how-much-you-need">how much timezone overlap you actually need</a>, and the vocabulary problem in <a href="/posts/work-from-home-vs-work-from-anywhere">work from home versus work from anywhere</a>.</p>

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
  {
    slug: "contractor-employee-or-employer-of-record",
    title: "Contractor, Employee or Employer of Record? How Remote Workers Abroad Actually Get Paid",
    description:
      "The three ways a company abroad can pay you, what each one really costs you, and the arithmetic for turning a contractor rate into a number you can compare with a salary.",
    date: "2026-10-04T07:00:00.000Z",
    author: "Bhargav",
    tags: ["Employer of Record", "Remote Contracts", "Contractor vs Employee", "Remote Work Abroad", "Remote Pay"],
    readMinutes: 11,
    html: `
      <p>You have an offer from a company in another country. Before the salary number means anything, you need to know something the offer letter often answers in one ambiguous line: <strong>who is actually employing you?</strong></p>
      <p>There are three answers, they are not interchangeable, and the difference between them is worth more than most of the salary negotiations people have.</p>

      <p class="text-sm"><em>This is a practical explainer, not legal or tax advice. Employment and tax rules are national, they change, and the consequences of getting them wrong land on you rather than on a job board. Treat everything below as the questions to ask, and confirm the answers for your own country with an accountant or employment lawyer before you sign.</em></p>

      <h2>What the job listing will not tell you</h2>
      <p>On our board on <strong>4 October 2026</strong>, of 4,013 remote listings:</p>
      <table>
        <thead><tr><th>Advertised as</th><th>Listings</th><th>Share</th></tr></thead>
        <tbody>
          <tr><td>Full-time</td><td>3,967</td><td><strong>98.9%</strong></td></tr>
          <tr><td>Part-time</td><td>27</td><td>0.7%</td></tr>
          <tr><td>Contract</td><td>19</td><td>0.5%</td></tr>
        </tbody>
      </table>
      <p>That table is less useful than it looks, and it is worth being precise about why. <strong>"Full-time" describes the hours, not the legal arrangement.</strong> A listing advertised as full-time can still turn out to be an employer-of-record placement, or a contractor engagement where you invoice monthly. The structured field every job board publishes answers "how many hours", and almost no listing answers "under what legal relationship" anywhere a filter can reach.</p>
      <p>We cannot put a number on how often employers do spell it out, and it would be easy to pretend otherwise: the descriptions we store are short company blurbs, a few hundred characters each, so searching them for "employer of record" measures our own pipeline rather than the market. What we can say is that the question is not answerable from the listing in the overwhelming majority of cases. <strong>You will have to ask.</strong></p>

      <h2>The three arrangements</h2>

      <h3>1. Direct employee of a local entity</h3>
      <p>The company has a registered legal entity in your country and puts you on its payroll there.</p>
      <p>This is the arrangement everything else is measured against. Your employer handles payroll tax and social contributions, you get the statutory package where you live — paid leave, sick pay, notice period, redundancy rules, parental leave, whatever your country mandates — and your relationship with the tax authority is the ordinary one.</p>
      <p>It is also the rarest of the three for a job in another country, for an unglamorous reason: a company cannot employ you in France unless it has set something up in France. Entities cost money to open and maintain, so companies open them where they already have several people. That is why so many "remote" listings name a country — our guide on <a href="/posts/async-first-companies-hiring-2026">async-first companies</a> found employers with over a hundred open roles and not one of them location-free, and the listings are country-scoped precisely because that is where the paperwork already exists.</p>

      <h3>2. Employer of record (EOR)</h3>
      <p>A third-party company that already has an entity in your country employs you on paper, and the company you actually work for pays that third party a fee.</p>
      <p>You are a real employee with a real local contract. You get local statutory entitlements, payroll tax is withheld, and you have the protections your country gives employees. On paper your employer is a company whose name you may never otherwise hear.</p>
      <p>What to understand about it:</p>
      <ul>
        <li><strong>Your statutory rights come from the EOR's contract</strong>, under your country's law. They are real, and they are the local minimum plus whatever the hiring company chose to buy.</li>
        <li><strong>Benefits are a menu, not a given.</strong> Health cover, pension contributions above the statutory minimum and equity are decisions the hiring company makes and pays for separately. Ask which ones were bought.</li>
        <li><strong>The fee is the company's cost, not yours</strong> — but it is real money, usually billed monthly per person, and it is the reason a company may offer a lower salary through an EOR than it would through its own entity. It is a legitimate thing to raise in a negotiation.</li>
        <li><strong>Equity is the common casualty.</strong> Share schemes are often written around direct employees of the parent company. If equity matters to you, ask specifically whether an EOR employee is eligible, in writing.</li>
        <li><strong>You can usually be released faster than a direct employee</strong>, within the limits of local notice law, because ending the EOR arrangement is a commercial decision between two companies.</li>
      </ul>

      <h3>3. Independent contractor</h3>
      <p>You invoice the company. There is no employment relationship at all.</p>
      <p>You are running a small business: registering it where required, charging and remitting any sales tax, paying your own income tax and social contributions, and funding everything an employer would otherwise provide. Nothing is withheld for you, which feels like more money every month and is not.</p>
      <p>It is the fastest arrangement to set up and the one most likely to be offered for work outside the company's existing countries, short engagements, and anything the company treats as a trial.</p>

      <h2>The comparison that actually matters</h2>
      <p>A contractor rate and a salary are not the same unit, and comparing them directly is the single most expensive mistake in this whole area. Here is everything that sits between the two numbers:</p>
      <table>
        <thead><tr><th>Who pays for it</th><th>Employee (direct or EOR)</th><th>Contractor</th></tr></thead>
        <tbody>
          <tr><td>Income tax</td><td>Withheld for you</td><td>You, usually in instalments you must plan for</td></tr>
          <tr><td>Social contributions / payroll taxes</td><td>Split, employer pays its share</td><td>You pay both sides in most countries</td></tr>
          <tr><td>Paid annual leave</td><td>Paid</td><td>Unpaid — every day off is a day unbilled</td></tr>
          <tr><td>Public holidays</td><td>Paid</td><td>Unpaid</td></tr>
          <tr><td>Sick days</td><td>Statutory, often topped up</td><td>Unpaid, and uncapped as a risk</td></tr>
          <tr><td>Pension / retirement</td><td>Employer contributes</td><td>Entirely yours to fund</td></tr>
          <tr><td>Health insurance</td><td>Statutory or provided</td><td>Yours to buy</td></tr>
          <tr><td>Notice period</td><td>Statutory, often months</td><td>Often days, sometimes none</td></tr>
          <tr><td>Severance / redundancy</td><td>Statutory in most countries</td><td>None</td></tr>
          <tr><td>Parental leave</td><td>Statutory</td><td>Depends entirely on your own country's self-employed scheme</td></tr>
          <tr><td>Accountant, registration, invoicing admin</td><td>None</td><td>Yours, in money and in hours</td></tr>
          <tr><td>Equipment</td><td>Usually provided or expensed</td><td>Yours</td></tr>
          <tr><td>Late payment and currency conversion</td><td>Not your problem</td><td>Your cash-flow problem</td></tr>
        </tbody>
      </table>

      <h3>Doing the arithmetic</h3>
      <p>The method, in the order that keeps it honest:</p>
      <ol>
        <li><strong>Start from what you would actually bill.</strong> Not the day rate times 365. Take your working days, subtract the leave you intend to take, the public holidays where you live, and a realistic allowance for sick days. Many people discover the billable year is nearer 220 days than 260.</li>
        <li><strong>Subtract the contributions you now pay on both sides.</strong> This is the biggest single line and it is entirely country-specific — it is the number to get from an accountant rather than from an article.</li>
        <li><strong>Subtract what you must now buy:</strong> health cover, pension contributions at whatever rate you would have received as an employee, insurance, accountancy fees, equipment.</li>
        <li><strong>Price the risk you are absorbing.</strong> No notice period and no severance has a value. If the engagement can end on seven days' notice, some of that rate is compensation for carrying a risk an employee does not carry.</li>
        <li><strong>Only then compare</strong> the remaining figure with the salary, and compare both against what they buy where you live rather than in the company's currency.</li>
      </ol>
      <p>Our <a href="/tools/offer-comparator">offer comparison calculator</a> runs exactly this. Set one offer to <em>Employee</em> and the other to <em>Contractor</em>, and it swaps "paid leave days" for "days off (unpaid)", applies a percentage for the costs you would cover, and converts both totals into purchasing power in the country you would be living in. Everything stays in your browser.</p>
      <blockquote>The tool defaults the contractor cost line to 20%. That is a placeholder to make the form usable, not a rule of thumb — the real figure ranges widely by country and by how much pension and insurance you choose to replace. Replace it with your own number before you trust the output.</blockquote>

      <h2>The risk nobody mentions in the interview: misclassification</h2>
      <p>Most countries decide whether you are an employee by looking at the substance of the relationship rather than at what the contract calls it. Broadly, the more the arrangement looks like employment, the more likely an authority is to treat it as employment, whatever the paperwork says.</p>
      <p>The signals that tend to matter are familiar across a lot of jurisdictions, even though the tests differ in the details: fixed hours set by the company, working only for that one client, using their equipment and systems, being managed day to day rather than delivering an agreed outcome, having no right to send a substitute, and open-ended duration.</p>
      <p>Why you should care, even though the company usually carries the larger penalty:</p>
      <ul>
        <li>A reclassification can land you with back contributions, and the bill arrives years later.</li>
        <li>It is usually triggered by something ordinary — a tax audit, or your own claim for unemployment or sick pay that prompts a question about why you were never an employee.</li>
        <li>A company that structures a long-term, full-time, closely-managed role as a contract is making a choice about who carries that risk, and the answer is you.</li>
      </ul>
      <p>If the role is indefinite, full-time and managed like a job, a contractor arrangement is worth questioning rather than assuming is normal.</p>

      <h2>What to ask before you sign</h2>
      <ol>
        <li><strong>Which of the three is this?</strong> If the answer is vague, that is itself information.</li>
        <li><strong>If EOR: which provider, and which benefits did you buy?</strong> Statutory minimum and "a good package" are very different purchases.</li>
        <li><strong>Am I eligible for equity, and under what document?</strong> Get it in writing before you accept, not after.</li>
        <li><strong>What is the notice period, both ways?</strong> For contractors this is often the single most important clause in the agreement.</li>
        <li><strong>Which currency am I paid in, on what date, and who absorbs the conversion?</strong> A rate quoted in a currency you do not spend is a rate with a variable attached.</li>
        <li><strong>If contractor: what happens if I am ill for a month?</strong> The answer is usually "nothing", and it is better to know that in advance.</li>
        <li><strong>Does this change if I move countries?</strong> Relevant before you plan anything — our guide on <a href="/posts/remote-work-taxes-living-abroad">tax when you work abroad</a> covers the residency side, and the <a href="/tools/tax-residency-day-counter">183-day counter</a> tracks the thing that usually triggers it.</li>
      </ol>

      <h2>So which is best?</h2>
      <p>There is no general answer, but there are reliable patterns.</p>
      <ul>
        <li><strong>Direct employment</strong> is the strongest position if the company already has an entity where you live. Ask whether it does before assuming it does not.</li>
        <li><strong>EOR</strong> is usually the best realistic outcome when it does not. You keep employee protections and the company absorbs the fee and the complexity. The things to watch are equity eligibility and which optional benefits were actually purchased.</li>
        <li><strong>Contractor</strong> is genuinely better for some people — several clients, real control over your schedule, a rate that reflects the risk, and a country where self-employment is well served. It is a bad deal when it is a full-time job wearing a different hat, priced as though it were a salary.</li>
      </ul>
      <p>The test that cuts through it: <strong>if you converted this contractor rate into an employee-equivalent using the steps above, would you still take it over a salaried offer?</strong> If yes, it is a good contract. If you have never done that sum, you do not yet know what you have been offered.</p>

      <h2>Related reading</h2>
      <ul>
        <li><a href="/tools/offer-comparator">Offer comparison calculator</a> — the arithmetic above, with your own numbers</li>
        <li><a href="/posts/hourly-vs-annual-remote-pay-converting-offers">Hourly vs annual remote pay</a> — converting between the units offers arrive in</li>
        <li><a href="/posts/remote-benefits-decoded-by-region">Remote benefits by region</a> — what is standard where, and what changes as a contractor</li>
        <li><a href="/posts/remote-work-taxes-living-abroad">Working remotely from abroad and your taxes</a> — residency, the 183-day rule and your employer's exposure</li>
        <li><a href="/posts/cost-of-living-arbitrage-remote-salary">Cost-of-living arbitrage</a> — what does and does not get cheaper when you move</li>
        <li><a href="/tools/salary-purchasing-power">Salary purchasing-power calculator</a> — what a figure is worth where you would live</li>
      </ul>

      <h2>How we counted</h2>
      <ul>
        <li>Listing figures are from the live board on <strong>4 October 2026</strong>: 4,013 published remote listings. Counts change nightly; if a figure here disagrees with the board, the board is right.</li>
        <li>The employment-type split comes from the structured field employers publish, which encodes <strong>hours, not legal status</strong>. We do not claim it tells you how a given role is engaged, because it does not.</li>
        <li>We deliberately do not report how many listings mention employer-of-record or contractor terms in their text. The descriptions we store are short company summaries, so that search would measure our own pipeline rather than employer behaviour. Our <a href="/posts/how-we-source-and-verify-listings">sourcing method</a> explains what we do and do not capture.</li>
        <li>Everything about tax, contributions and employment rights is general explanation, not country-specific advice, and no figures are asserted for any particular jurisdiction.</li>
      </ul>
    `,
    faq: [
      {
        q: "What is an employer of record?",
        a: "An employer of record is a third-party company that already has a legal entity in your country and employs you on paper, while you work for the company that hired you. That company pays the EOR a fee, usually monthly per person. You get a local employment contract and your country's statutory entitlements; the main things to check are whether you are eligible for equity and which optional benefits, such as private health cover or above-minimum pension contributions, the hiring company actually paid for.",
      },
      {
        q: "Is it better to be a contractor or an employee for a remote job abroad?",
        a: "It depends on the rate and on your country, but the comparison is not between the two headline numbers. As a contractor you fund your own leave, public holidays, sick days, pension, health cover, accountancy and equipment, you usually pay both sides of social contributions, and you typically have little or no notice period. Convert the contractor rate into an employee-equivalent first — billable days rather than calendar days, minus contributions and the benefits you must now buy — and only then compare.",
      },
      {
        q: "How much should I add to a contractor rate to match a salary?",
        a: "There is no single percentage, and anyone quoting one is guessing at your country's contribution rates. The honest method is to build it: start from the days you will actually bill after leave, public holidays and sick days, subtract the social contributions you now pay on both sides, subtract the cost of the pension, insurance and health cover you must replace, and price the lack of notice and severance. Our offer comparison calculator runs that arithmetic with your own figures.",
      },
      {
        q: "Does a job listing say whether a role is contractor or employee?",
        a: "Rarely in any way you can filter on. The employment type published with a listing describes the hours — on our board on 4 October 2026, 98.9% of 4,013 listings were advertised as full-time — and a full-time listing can still be an employer-of-record placement or a contractor engagement. You have to ask directly, and a vague answer is itself informative.",
      },
      {
        q: "What is worker misclassification and why does it matter to me?",
        a: "Most countries judge whether you are an employee by the substance of the working relationship rather than by what the contract is called. Fixed hours, a single client, the company's equipment, day-to-day management and open-ended duration all point towards employment. If an authority reclassifies the arrangement, back contributions can be owed and the question often surfaces years later, frequently triggered by an audit or by your own claim for sick pay or unemployment support. If a role is indefinite, full-time and closely managed, a contractor structure is worth questioning.",
      },
    ],
  },
  {
    slug: "remote-design-jobs",
    title: "Remote Design Jobs: 87 Open, One Junior Role, and a Title That Has Swallowed the Field",
    description:
      "Every remote design role on our board, counted: what they pay, why brand design earns $101,000 less than product design, and why almost nobody advertises for a UX designer any more.",
    date: "2026-10-05T07:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Design Jobs", "Product Designer", "UX Design", "Remote Salaries", "Design Careers"],
    readMinutes: 9,
    html: `
      <p>This is a count of every remote design role open on getremotejobsnow.com on <strong>5 October 2026</strong>: <strong>87 roles from 72 employers</strong>, out of 3,871 remote listings. No survey, no estimates. The board is rebuilt nightly, so today's figures on the site will differ from these.</p>

      <h2>Design is a small field, and "product designer" has eaten it</h2>
      <p>87 roles is 2.2% of the board. For scale, there are 504 software engineering roles and 316 account executive roles on the same board. Design is not a volume market in remote hiring.</p>
      <p>Within it, one title dominates to a degree that surprised me:</p>
      <table>
        <thead><tr><th>Discipline (by title)</th><th>Roles</th><th>Publish pay</th><th>Median</th></tr></thead>
        <tbody>
          <tr><td><strong>Product designer</strong></td><td><strong>50</strong></td><td>10</td><td><strong>$238,500</strong></td></tr>
          <tr><td>Visual / graphic / brand</td><td>9</td><td>3</td><td>$137,500</td></tr>
          <tr><td>Design leadership (lead, head, director)</td><td>6</td><td>0</td><td>—</td></tr>
          <tr><td>Design systems</td><td>3</td><td>2</td><td>$247,000</td></tr>
          <tr><td>UX / UI designer</td><td>1</td><td>0</td><td>—</td></tr>
          <tr><td>UX research</td><td>1</td><td>0</td><td>—</td></tr>
        </tbody>
      </table>
      <p>One role on the entire board is advertised as a "UX designer" or "UI designer". One is advertised for UX research. Fifty are advertised as product designers.</p>
      <p>That is not because UX work stopped existing — it is inside those fifty jobs. It is a hiring-language change, and it has a practical consequence: <strong>if your CV, your portfolio and your job alerts are built around the phrase "UX designer", you are searching for a title employers have largely stopped typing.</strong> Rename the search before you conclude there is no work.</p>

      <h2>The pay gap inside design is larger than the gap to other fields</h2>
      <p>17 of 87 roles publish a salary range — 19.5%, close to the board-wide 18.9%. Among those that do:</p>
      <table>
        <thead><tr><th></th><th>25th pct</th><th>Median</th><th>75th pct</th><th>Range</th></tr></thead>
        <tbody>
          <tr><td>All design roles</td><td>$155,000</td><td>$215,000</td><td>$240,000</td><td>$86,000 – $306,000</td></tr>
          <tr><td>Whole board</td><td>—</td><td>$195,000</td><td>—</td><td>—</td></tr>
        </tbody>
      </table>
      <p>Design sits above the board median overall. But the aggregate hides the thing worth knowing: <strong>product design shows a median of $238,500 and visual, graphic and brand design shows $137,500</strong>. That is a gap of $101,000 between two jobs that both say "designer" on the door, and it is wider than the gap between design and almost any other field on this board.</p>
      <p>Both samples are small — 10 published ranges and 3 — so treat the exact figures as indicative rather than precise. The direction is not subtle, though, and it matches what the role descriptions imply: product design is priced as a product function with engineering adjacency, and brand and visual design is priced as a creative service.</p>
      <blockquote>If you are a brand or visual designer looking at the headline design median and wondering why your offers come in far below it, this table is the answer. You are not being lowballed against the design market; you are in a different market that shares a word.</blockquote>

      <h3>A caveat on the seniority figures</h3>
      <p>Senior-titled design roles show a median of $165,000 from 6 published ranges, while roles with no level in the title show $237,000 from 11. Taken at face value that says seniority pays less, which is obviously wrong. With samples that small a couple of well-paid staff-level roles with no "senior" in the title move the second number more than it should. We are reporting it rather than hiding it, and you should not plan anything around it.</p>

      <h2>There is one junior design role</h2>
      <p>Across all 87 listings, exactly <strong>one</strong> carries a junior, associate, graduate or internship title.</p>
      <p>This is the same pattern we found in <a href="/posts/remote-product-manager-jobs">remote product management</a>, where the count was zero, and it is the board-wide story in miniature: remote hiring is a senior market. 31 of the 87 design roles say "senior" in the title and a further 7 are lead, principal or staff level. Remote design, as advertised, is a job you move into with a portfolio already built, not one you enter.</p>
      <p>If you are starting out, the honest read is that a remote-first job search is the hard way in. Our guide to <a href="/posts/first-remote-job-2026-no-experience">getting a first remote job</a> covers the realistic routes.</p>

      <h2>Where the roles are, and how fast they move</h2>
      <p>Resolving each listing to a country:</p>
      <table>
        <thead><tr><th>Open to</th><th>Roles</th><th>Share</th></tr></thead>
        <tbody>
          <tr><td>United States</td><td>49</td><td>56.3%</td></tr>
          <tr><td>United Kingdom</td><td>8</td><td>9.2%</td></tr>
          <tr><td>India</td><td>5</td><td>5.7%</td></tr>
          <tr><td>Philippines, Brazil, Argentina, Canada</td><td>3 each</td><td>3.4% each</td></tr>
          <tr><td>No country named</td><td>9</td><td>10.2%</td></tr>
        </tbody>
      </table>
      <p>Only <strong>2 of the 87 roles are work-from-anywhere</strong>, carrying no country, region or timezone condition at all. That is 2.3%, which happens to sit right at the board average today, and in absolute terms it means the location-free remote design market is two jobs. If location independence is the goal, design is a hard field to pursue it in.</p>
      <p>Design hiring is also slow. The median listing has been open <strong>30 days</strong>, and only <strong>3 of 87</strong> were posted in the last week. Compare that with fields where listings turn over weekly: a design search is a long game, and setting up an alert beats refreshing a board.</p>

      <h2>Almost every employer wants exactly one designer</h2>
      <p><strong>72 employers for 87 roles.</strong> The largest single hirers are Tempo and Rho AI with 3 each, then Vanta, FamPay, Assured, Linear, Humaans.io, Rula, Maven Clinic and Brilliant with 2.</p>
      <p>That distribution tells you how to run the search. There is no cluster of design-heavy employers to follow the way there is for engineering. Nearly every opening is a one-off at a company that may not hire another designer for a year, which makes breadth and speed matter more than targeting a shortlist.</p>

      <h2>What to do with this</h2>
      <ol>
        <li><strong>Search "product designer" first</strong>, then the specialisms. It is 57% of the field by title. <a href="/jobs?q=product%20designer">Product designer roles on the board</a>.</li>
        <li><strong>Know which market you are in.</strong> Brand and visual design is a different pay market from product design; pricing yourself against the wrong one costs real money in a negotiation.</li>
        <li><strong>Treat design systems work as a specialism worth naming.</strong> Three roles is a tiny sample, but both that publish pay sit at the top of the table, and it is the kind of scarce specialism that survives a crowded applicant pool.</li>
        <li><strong>Set alerts rather than refreshing.</strong> With 3 new roles a week across the whole field, the cost of missing a listing is high and the cost of checking daily is wasted time.</li>
        <li><strong>Filter by region early.</strong> 56% of these roles are US-only; finding that out from a filter is cheaper than finding it in paragraph nine.</li>
        <li><strong>Browse the live list</strong>: <a href="/remote-design-jobs">remote design jobs</a>, or the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> if location freedom is non-negotiable.</li>
      </ol>

      <h2>How we counted</h2>
      <ul>
        <li>Figures are from the live board on <strong>5 October 2026</strong>: 3,871 published listings, 87 of them design roles.</li>
        <li><strong>Roles are identified by job title</strong>, not by the site's category filter, which files unclassifiable listings under "Product" and so cannot size a field. A listing counts if its title contains designer, design lead, design manager, head of design, design director, UX or UI designer, UX researcher or design system. Hardware, electrical, circuit, mechanical and chip "design" titles are excluded — they share the word, not the job.</li>
        <li><strong>Pay covers only the 17 listings that publish a range</strong>, converted to a USD midpoint. Listings with no number are not counted as low; they are not counted. That sample leans towards US employers covered by pay-transparency laws — see <a href="/posts/salary-transparency-laws-2026">where ranges are required</a>.</li>
        <li>Discipline and level are read from the title. A company's internal level for a role titled "Product Designer" is not visible to us.</li>
        <li>Small samples are stated with their size rather than smoothed. Three roles is not a market.</li>
        <li>This is one board. Our <a href="/posts/how-we-source-and-verify-listings">sourcing method</a> sets out what is in and what is out. Counts change nightly; if a figure here disagrees with the board, the board is right.</li>
      </ul>
    `,
    faq: [
      {
        q: "How many remote design jobs are there?",
        a: "On our board on 5 October 2026 there were 87 open remote design roles from 72 employers, out of 3,871 remote listings — about 2.2% of the board. Design is a small field in remote hiring compared with software engineering (504 roles) or sales (478).",
      },
      {
        q: "What do remote product designers earn?",
        a: "Among the design listings that published a salary range on 5 October 2026, the median USD midpoint was $215,000 across all design roles, with a 25th-to-75th band of $155,000 to $240,000. Split by discipline, product design showed a median of $238,500 from 10 published ranges and visual, graphic and brand design showed $137,500 from 3. Those samples are small, so treat the exact figures as indicative.",
      },
      {
        q: "Why are there so few UX designer jobs?",
        a: "The title has largely been replaced rather than the work. On our board on 5 October 2026, one listing was advertised as a UX or UI designer and 50 were advertised as product designers. UX work sits inside those product design roles. If your CV and job alerts are built around 'UX designer', you are searching for a phrase employers have mostly stopped using.",
      },
      {
        q: "Are there entry-level remote design jobs?",
        a: "Barely. Of 87 remote design roles on our board on 5 October 2026, exactly one carried a junior, associate, graduate or internship title, while 31 said senior and a further 7 were lead, principal or staff level. Remote design is advertised almost entirely as a mid-to-senior market.",
      },
      {
        q: "Can you work as a designer from anywhere in the world?",
        a: "Rarely. Only 2 of the 87 remote design roles on our board on 5 October 2026 carried no country, region or timezone condition. In absolute terms the location-free remote design market was two jobs. Design is a difficult field in which to pursue full location independence.",
      },
    ],
  },
  {
    slug: "remote-jobs-bay-area",
    title: "Remote Jobs in the Bay Area: The Biggest Single Market on Our Board",
    description:
      "838 remote roles name the Bay Area — 17.7% of everything we list. What they pay, who is hiring, and why a third of them publish a salary when most of the board does not.",
    date: "2026-10-06T07:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Jobs Bay Area", "San Francisco Remote Jobs", "Remote Salaries", "Tech Jobs", "Remote Job Market"],
    readMinutes: 8,
    html: `
      <p>Counted on <strong>6 October 2026</strong> across 4,730 remote listings. Figures come from the board itself and change nightly.</p>

      <p class="text-sm"><em>Figures refreshed 6 October 2026. The board grew from 3,749 to 4,730 listings earlier the same day, when we added 135 further employer career boards as sources, so the counts below are higher than the ones first published here. Every finding is unchanged.</em></p>

      <p><strong>838 listings name the Bay Area</strong> — San Francisco, Palo Alto, Mountain View, San Jose, Oakland, Berkeley and the rest of the peninsula. That is <strong>17.7% of our entire board</strong>, and it makes the Bay Area comfortably the largest single place in remote hiring that we track. The next biggest, London and the wider UK, has 356.</p>

      <h2>The pay is high, and unusually visible</h2>
      <p><strong>293 of the 838 publish a salary range — 35.0%</strong>, against 18.5% across the whole board. California's pay-transparency law is the obvious reason, and it makes this the best-documented local market we have.</p>
      <table>
        <thead><tr><th></th><th>25th pct</th><th>Median</th><th>75th pct</th><th>Sample</th></tr></thead>
        <tbody>
          <tr><td><strong>Bay Area</strong></td><td>$185,000</td><td><strong>$223,500</strong></td><td>$275,000</td><td>293</td></tr>
          <tr><td>Whole board</td><td>—</td><td>$192,494</td><td>—</td><td>874</td></tr>
        </tbody>
      </table>
      <p>A $223,500 median against $192,494 is a real premium, and the sample behind it is large enough to lean on. Read it as "what Bay Area employers advertise" rather than "what people earn" — the listings that publish a range skew to larger, better-funded companies even within one market.</p>

      <h3>By field</h3>
      <table>
        <thead><tr><th>Field (by title)</th><th>Roles</th><th>Share</th><th>Median</th><th>Sample</th></tr></thead>
        <tbody>
          <tr><td>Software engineering</td><td>131</td><td>15.6%</td><td>$225,000</td><td>77</td></tr>
          <tr><td>Sales</td><td>83</td><td>9.9%</td><td>$210,000</td><td>29</td></tr>
          <tr><td>Product</td><td>35</td><td>4.2%</td><td><strong>$251,750</strong></td><td>24</td></tr>
          <tr><td>Data / AI</td><td>35</td><td>4.2%</td><td>$250,000</td><td>11</td></tr>
          <tr><td>Finance, legal, HR</td><td>36</td><td>4.3%</td><td>$190,000</td><td>10</td></tr>
          <tr><td>Marketing</td><td>36</td><td>4.3%</td><td>$177,500</td><td>10</td></tr>
          <tr><td>Design</td><td>16</td><td>1.9%</td><td>$220,000</td><td>5</td></tr>
          <tr><td>Customer support</td><td>13</td><td>1.6%</td><td>$142,500</td><td>2</td></tr>
        </tbody>
      </table>
      <p>Product tops the table at $251,750 from 24 published ranges, with data and AI just behind at $250,000 from 11 — the smaller of those two is a signal rather than a figure. Customer support sits at $142,500 from only 2 ranges, far too few to read as a field salary.</p>

      <h2>Who is hiring</h2>
      <p><strong>170 employers</strong> share the 838 roles, so this is a broad market rather than a handful of big names. The most active: Pragmatike (28), Mercor (17), Wealthfront (15), Baseten (14), Character.AI (13) and Codeium/Exa (12).</p>
      <p>That list skews heavily towards AI companies, which matches the Data/AI pay figure above. If you are watching where Bay Area money is going, it is going there.</p>

      <h2>It moves fast</h2>
      <p>The median Bay Area listing has been open <strong>23 days</strong>, and <strong>117 were posted in the last week</strong>. That is more new roles per week than most entire countries on this board produce, and it is the main practical argument for checking weekly rather than monthly.</p>

      <h2>The thing to understand before you apply</h2>
      <p>None of these 838 roles is work-from-anywhere. A listing that names the Bay Area is, by definition, telling you where it expects you to be — usually "remote, but in the US", sometimes "remote, but able to come in". That is not a complaint about the market, it is what the location field means.</p>
      <p>So there are two different searches here, and conflating them wastes weeks:</p>
      <ul>
        <li><strong>If you live in the Bay Area</strong>, these 838 roles are your local market, and the <a href="/remote-jobs-in-the-bay-area">Bay Area job list</a> is the place to work through them. It also carries every work-from-anywhere role on the board, since those are open to you too.</li>
        <li><strong>If you do not</strong>, most of this market is closed to you regardless of how remote the role is, and the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> is the honest starting point. Our guide to <a href="/posts/how-to-find-work-from-anywhere-jobs">finding location-free roles</a> explains why that list is so much shorter.</li>
      </ul>
      <p>Either way, filter by region before reading job descriptions. It is the single cheapest thing you can do.</p>

      <h2>How we counted</h2>
      <ul>
        <li>Figures are from the live board on <strong>6 October 2026</strong>: 4,730 published remote listings, 874 of which publish a salary range.</li>
        <li><strong>A listing counts for a place if its own location text names it</strong>, using the same pattern the matching job page uses, so the guide and the list cannot disagree.</li>
        <li>These counts cover <strong>region-locked</strong> listings only. The matching job page also shows every work-from-anywhere role on the board, because those are open to you here as well — they are just not <em>about</em> this place, so counting them would flatter the local figure.</li>
        <li><strong>Pay covers only listings that publish a range</strong>, converted to a USD midpoint. A listing with no number is not counted as low; it is not counted. Sample sizes are printed next to every median, and small ones are flagged rather than smoothed.</li>
        <li>Fields are matched on job title, not our category filter, which files unclassifiable listings under "Product".</li>
        <li>Counts change nightly. If a figure here disagrees with the board, the board is right. Our <a href="/posts/how-we-source-and-verify-listings">sourcing method</a> sets out what is in and what is out.</li>
      </ul>
    `,
    faq: [
      {
        q: "How many remote jobs are there in the Bay Area?",
        a: "On our board on 6 October 2026 there were 838 remote listings naming the Bay Area — San Francisco, Palo Alto, Mountain View, San Jose, Oakland and the surrounding area — from 170 employers. That is 17.7% of the whole board, making it the largest single location we track.",
      },
      {
        q: "What do remote Bay Area jobs pay?",
        a: "Among the 293 of 838 Bay Area listings that published a salary range on 6 October 2026, the median USD midpoint was $223,500, with a 25th-to-75th band of $185,000 to $275,000. The board-wide median was $192,494. Software engineering showed $225,000 from 77 ranges and product roles showed $251,750 from 24.",
      },
      {
        q: "Why do so many Bay Area listings show a salary?",
        a: "35.0% of Bay Area listings publish a pay range against 18.5% board-wide, and California's pay-transparency law is the most likely reason. It makes the Bay Area the best-documented local market on our board.",
      },
      {
        q: "Can I apply to Bay Area remote jobs from another country?",
        a: "Usually not. A listing that names the Bay Area is stating where it expects you to be, most often 'remote within the US'. If you are outside the US, the work-from-anywhere board is the realistic starting point instead, though it is a far smaller list.",
      },
    ],
  },
  {
    slug: "remote-jobs-seattle",
    title: "Remote Jobs in Seattle: A Small Market That Pays Like a Big One",
    description:
      "Only 71 remote roles name Seattle, but every published quartile lands on $275,000 — the highest of any place on our board. What is behind that, and who is hiring.",
    date: "2026-10-06T08:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Jobs Seattle", "Seattle Tech Jobs", "Remote Salaries", "Remote Job Market"],
    readMinutes: 7,
    html: `
      <p>Counted on <strong>6 October 2026</strong> across 4,730 remote listings. Figures come from the board itself and change nightly.</p>

      <p class="text-sm"><em>Figures refreshed 6 October 2026. The board grew from 3,749 to 4,730 listings earlier the same day, when we added 135 further employer career boards as sources, so the counts below are higher than the ones first published here. Every finding is unchanged.</em></p>

      <p><strong>71 listings name Seattle</strong> or its tech suburbs — Bellevue, Redmond, Kirkland. That is 1.5% of the board, which makes it a small market by volume. It is also, by some distance, the <strong>best-paid</strong> place we track.</p>

      <h2>The headline number, and why it needs a caveat first</h2>
      <table>
        <thead><tr><th></th><th>25th pct</th><th>Median</th><th>75th pct</th><th>Published ranges</th></tr></thead>
        <tbody>
          <tr><td><strong>Seattle</strong></td><td>$275,000</td><td><strong>$275,000</strong></td><td>$275,000</td><td>33 of 71</td></tr>
          <tr><td>Bay Area</td><td>$185,000</td><td>$223,500</td><td>$275,000</td><td>293 of 838</td></tr>
          <tr><td>Whole board</td><td>—</td><td>$192,494</td><td>—</td><td>874 of 4,730</td></tr>
        </tbody>
      </table>
      <p>Look at the shape of that Seattle row before the size of it. The 25th percentile, the median and the 75th are all <strong>$275,000</strong> — not a band at all, from 33 published ranges. That is not what a market looks like. That is what a handful of employers advertising similar senior roles looks like, and the refreshed figures made it starker rather than softer.</p>
      <p>Washington State's pay-transparency law is why 46.5% of Seattle listings publish a range at all, the highest rate of any place here. But 33 ranges landing on a single number says the sample is dominated by a few companies hiring at one level, not that Seattle pays everyone $275,000.</p>
      <blockquote>The honest version: senior remote roles advertised in Seattle are advertised at very high numbers. That is a real and useful fact. It is not the same as "the median Seattle remote job pays $275,000", and anyone quoting it that way is over-reading 33 listings.</blockquote>

      <h2>Who is hiring</h2>
      <p>Just <strong>20 employers</strong> for 71 roles — the most concentrated market on our board. Pragmatike leads with 24, then OpenAI (8), HackerOne (5), Ashby (5), Truveta (5) and Docker (4).</p>
      <p>With a list that short, the practical move is obvious: follow those companies directly rather than running searches. Twenty employers is a list you can check by hand.</p>

      <h3>By field</h3>
      <table>
        <thead><tr><th>Field (by title)</th><th>Roles</th><th>Share</th><th>Median</th><th>Sample</th></tr></thead>
        <tbody>
          <tr><td>Software engineering</td><td>16</td><td>22.5%</td><td>$226,875</td><td>8</td></tr>
          <tr><td>Sales</td><td>9</td><td>12.7%</td><td>—</td><td>0</td></tr>
          <tr><td>Product</td><td>5</td><td>7.0%</td><td>$275,000</td><td>5</td></tr>
          <tr><td>Data / AI</td><td>4</td><td>5.6%</td><td>$210,000</td><td>3</td></tr>
          <tr><td>Design</td><td>2</td><td>2.8%</td><td>—</td><td>0</td></tr>
        </tbody>
      </table>
      <p>Software engineering is 22.5% of the market, the highest engineering concentration of any place we track. Several fields have no published pay at all, which is what a 71-role market looks like once you split it.</p>

      <h2>It is fresher than its size suggests</h2>
      <p>The median Seattle listing has been open <strong>16 days</strong> and <strong>20 of the 71 were posted in the last week</strong>. For a market this small that is a lot of turnover — more than a quarter of it is new within a week. Worth an alert rather than a monthly check.</p>

      <h2>What to do with this</h2>
      <ol>
        <li><strong>If you are in the Seattle area</strong>, work the <a href="/remote-jobs-in-seattle">Seattle job list</a> and follow the 20 employers directly. The list also carries every work-from-anywhere role on the board, since those are open to you as well.</li>
        <li><strong>Do not anchor your expectations to $275,000.</strong> Anchor to the field table, and to what the specific company is advertising. Our <a href="/posts/remote-salaries-2026-negotiate-the-premium">guide to published remote ranges</a> covers how to use these numbers in a negotiation without over-claiming.</li>
        <li><strong>If you are not in the US</strong>, this market is almost entirely closed to you — a listing naming Seattle is telling you where it expects you to be. The <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> is the honest alternative.</li>
        <li><strong>Compare with the Bay Area.</strong> It is nearly twelve times the size at a lower median, which is a genuine trade between choice and price. Our <a href="/posts/remote-jobs-bay-area">Bay Area guide</a> has the other half of that picture.</li>
      </ol>

      <h2>How we counted</h2>
      <ul>
        <li>Figures are from the live board on <strong>6 October 2026</strong>: 4,730 published remote listings, 874 of which publish a salary range.</li>
        <li><strong>A listing counts for a place if its own location text names it</strong>, using the same pattern the matching job page uses, so the guide and the list cannot disagree.</li>
        <li>These counts cover <strong>region-locked</strong> listings only. The matching job page also shows every work-from-anywhere role on the board, because those are open to you here as well — they are just not <em>about</em> this place, so counting them would flatter the local figure.</li>
        <li><strong>Pay covers only listings that publish a range</strong>, converted to a USD midpoint. A listing with no number is not counted as low; it is not counted. Sample sizes are printed next to every median, and small ones are flagged rather than smoothed.</li>
        <li>Fields are matched on job title, not our category filter, which files unclassifiable listings under "Product".</li>
        <li>Counts change nightly. If a figure here disagrees with the board, the board is right. Our <a href="/posts/how-we-source-and-verify-listings">sourcing method</a> sets out what is in and what is out.</li>
      </ul>
    `,
    faq: [
      {
        q: "How many remote jobs are there in Seattle?",
        a: "On our board on 6 October 2026 there were 71 remote listings naming Seattle, Bellevue, Redmond or Kirkland, from just 20 employers. That is 1.5% of the board, making it a small but highly concentrated market.",
      },
      {
        q: "What do remote Seattle jobs pay?",
        a: "Among the 33 of 71 Seattle listings that published a range on 6 October 2026, the 25th percentile, median and 75th percentile were all $275,000. There is no band at all, because the sample is small and dominated by a few employers hiring at senior level — it is not evidence that the typical Seattle remote job pays $275,000.",
      },
      {
        q: "Which companies hire remotely in Seattle?",
        a: "On 6 October 2026 the most active were Pragmatike with 24 roles, OpenAI with 8, then HackerOne, Ashby and Truveta with 5 each and Docker with 4. With only 20 employers in the market, following them directly is more effective than running searches.",
      },
    ],
  },
  {
    slug: "remote-jobs-london",
    title: "Remote Jobs in London and the UK: Big Market, Quiet About Pay",
    description:
      "356 remote roles name London or the UK. Sales out-hires engineering, only one in seven publishes a salary, and the advertised median is far below the US markets. The numbers, and what they mean for a search.",
    date: "2026-10-06T09:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Jobs London", "Remote Jobs UK", "Remote Salaries", "Remote Job Market"],
    readMinutes: 8,
    html: `
      <p>Counted on <strong>6 October 2026</strong> across 4,730 remote listings. Figures come from the board itself and change nightly.</p>

      <p class="text-sm"><em>Figures refreshed 6 October 2026. The board grew from 3,749 to 4,730 listings earlier the same day, when we added 135 further employer career boards as sources, so the counts below are higher than the ones first published here. Every finding is unchanged.</em></p>

      <p><strong>356 listings name London or the wider UK</strong> — 7.5% of the board, the second largest place we track after the Bay Area.</p>
      <p>One clarification first, because it changes how you should read everything below. Our London matching catches listings that say London <em>and</em> listings that say England, the UK or United Kingdom, because that is how employers actually write these roles — "Remote, UK" is far more common than "Remote, London". So this is a UK picture with a London centre of gravity, not a London-only one, and the matching <a href="/remote-jobs-in-london">job list</a> works the same way.</p>

      <h2>Sales out-hires engineering here</h2>
      <table>
        <thead><tr><th>Field (by title)</th><th>Roles</th><th>Share</th><th>Median</th><th>Sample</th></tr></thead>
        <tbody>
          <tr><td><strong>Sales</strong></td><td><strong>66</strong></td><td>18.5%</td><td>$132,080</td><td>5</td></tr>
          <tr><td>Software engineering</td><td>53</td><td>14.9%</td><td>$145,230</td><td>11</td></tr>
          <tr><td>Marketing</td><td>20</td><td>5.6%</td><td>—</td><td>5</td></tr>
          <tr><td>Data / AI</td><td>16</td><td>4.5%</td><td>$145,066</td><td>3</td></tr>
          <tr><td>Design</td><td>10</td><td>2.8%</td><td>—</td><td>1</td></tr>
          <tr><td>Customer support</td><td>10</td><td>2.8%</td><td>—</td><td>0</td></tr>
          <tr><td>Finance, legal, HR</td><td>6</td><td>1.7%</td><td>—</td><td>0</td></tr>
          <tr><td>Product</td><td>5</td><td>1.4%</td><td>—</td><td>1</td></tr>
        </tbody>
      </table>
      <p>Sales leading engineering by 66 to 53 is unusual — board-wide it is the other way round. It fits what the UK is for a lot of US software companies: the first office outside the US, opened to sell into Europe. A sales hire there covers a timezone and a market; an engineering hire mostly just costs more than one elsewhere.</p>
      <p>The medians in that table mostly rest on three to five published ranges, which is not enough to quote as a field salary. They are in the table because leaving them out would be hiding the sample size rather than the number.</p>

      <h2>The real finding is how little pay is published</h2>
      <p><strong>49 of 356 listings publish a range — 13.8%</strong>, against 18.5% board-wide and 35.0% in the Bay Area. The UK has no pay-transparency law requiring a range in the advert, and it shows.</p>
      <table>
        <thead><tr><th></th><th>Publishes pay</th><th>25th pct</th><th>Median</th><th>75th pct</th></tr></thead>
        <tbody>
          <tr><td><strong>London / UK</strong></td><td>13.8%</td><td>$74,930</td><td><strong>$123,825</strong></td><td>$158,750</td></tr>
          <tr><td>Bay Area</td><td>35.0%</td><td>$185,000</td><td>$223,500</td><td>$275,000</td></tr>
          <tr><td>Whole board</td><td>18.5%</td><td>—</td><td>$192,494</td><td>—</td></tr>
        </tbody>
      </table>
      <p>A $123,825 median against the Bay Area's $223,500 is a very large gap, and it is partly real and partly an artefact. Real: UK salaries for the same role genuinely sit below US ones, and the figures here are converted from pounds. Artefact: with only 49 ranges, and a 25th percentile at $74,930, this sample spans junior and senior roles in a way the much larger US samples do not.</p>
      <p>The practical consequence matters more than the number. In a market where 86% of listings show nothing, you will usually be asked for your expectations first, with no anchor to work from. Our <a href="/posts/remote-salaries-2026-negotiate-the-premium">guide to negotiating without a published range</a> is written for exactly that situation, and <a href="/posts/salary-transparency-laws-2026">where pay ranges are legally required</a> explains why the UK is not on that list.</p>

      <h2>Who is hiring</h2>
      <p><strong>153 employers</strong> for 356 roles — a broad market. The most active: GitLab (25), Reedsy (10), Ashby (10), ElevenLabs (9), Humaans.io (9) and Cohere (7).</p>
      <p>GitLab at the top is worth noting: it is an all-remote company that hires into named countries, and the UK is one of them. That is the common shape here — US or global companies with a UK hiring entity, rather than UK-headquartered employers.</p>

      <h2>How to run this search</h2>
      <ol>
        <li><strong>Search "UK" as well as "London".</strong> Most of these listings say the country, not the city, and a London-only search misses them.</li>
        <li><strong>Expect no salary, and prepare an anchor.</strong> In 85% of cases you will be naming a number first. Have a researched range and the reasoning for it before the first call.</li>
        <li><strong>If you are in sales, this is one of the better markets on the board</strong> — it is the field with the most UK openings, by a margin.</li>
        <li><strong>Work the <a href="/remote-jobs-in-london">London and UK job list</a></strong>, which also carries every work-from-anywhere role, since those are open to you too. For roles with no country condition at all, start from the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a>.</li>
        <li><strong>Check the European picture too.</strong> Our <a href="/posts/remote-jobs-in-europe-where-to-look">guide to remote jobs in Europe</a> covers the continent, where several countries do require a published range.</li>
      </ol>

      <h2>How we counted</h2>
      <ul>
        <li>Figures are from the live board on <strong>6 October 2026</strong>: 4,730 published remote listings, 874 of which publish a salary range.</li>
        <li><strong>A listing counts for a place if its own location text names it</strong>, using the same pattern the matching job page uses, so the guide and the list cannot disagree.</li>
        <li>These counts cover <strong>region-locked</strong> listings only. The matching job page also shows every work-from-anywhere role on the board, because those are open to you here as well — they are just not <em>about</em> this place, so counting them would flatter the local figure.</li>
        <li><strong>Pay covers only listings that publish a range</strong>, converted to a USD midpoint. A listing with no number is not counted as low; it is not counted. Sample sizes are printed next to every median, and small ones are flagged rather than smoothed.</li>
        <li>Fields are matched on job title, not our category filter, which files unclassifiable listings under "Product".</li>
        <li>Counts change nightly. If a figure here disagrees with the board, the board is right. Our <a href="/posts/how-we-source-and-verify-listings">sourcing method</a> sets out what is in and what is out.</li>
      </ul>
    `,
    faq: [
      {
        q: "How many remote jobs are there in London?",
        a: "On our board on 6 October 2026 there were 356 remote listings naming London or the wider UK, from 153 employers — 7.5% of the board and the second largest location we track. The count includes listings that say 'Remote, UK' as well as those naming London, because that is how most employers write these roles.",
      },
      {
        q: "What do remote jobs in London pay?",
        a: "Only 49 of 356 London and UK listings published a salary range on 6 October 2026 — 13.8%, against 18.5% board-wide. Among those that did, the median USD-converted midpoint was $123,825, with a 25th-to-75th band of $74,930 to $158,750. That sample is small and spans junior to senior roles, so treat it as indicative rather than a market rate.",
      },
      {
        q: "Why do so few UK job listings show a salary?",
        a: "The UK has no law requiring a pay range in a job advert, unlike several US states. On our board on 6 October 2026, 13.8% of UK listings published a range against 35.0% in the Bay Area, where California's transparency law applies. In practice it means you will usually be asked for your expectations first.",
      },
      {
        q: "What kind of remote roles does the UK hire for most?",
        a: "Sales, which is unusual. On 6 October 2026 there were 66 sales-titled roles against 53 software engineering roles among UK listings, reversing the board-wide pattern. It fits the UK's common role as the first non-US office for American software companies selling into Europe.",
      },
    ],
  },
  {
    slug: "remote-jobs-germany",
    title: "Remote Jobs in Germany: 300 Roles, and Almost None of Them Will Tell You the Salary",
    description:
      "Germany is one of the biggest remote markets on our board and the most secretive about pay — 10 of 300 listings publish a range. Marketing out-hires engineering two to one. The numbers.",
    date: "2026-10-06T10:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Jobs Germany", "Remote Jobs Europe", "Remote Salaries", "Pay Transparency"],
    readMinutes: 8,
    html: `
      <p>Counted on <strong>6 October 2026</strong> across 4,730 remote listings. Figures come from the board itself and change nightly.</p>

      <p class="text-sm"><em>Figures refreshed 6 October 2026. The board grew from 3,749 to 4,730 listings earlier the same day, when we added 135 further employer career boards as sources, so the counts below are higher than the ones first published here. Every finding is unchanged.</em></p>

      <p><strong>300 listings name Germany</strong> or a German city — Berlin, Munich, Hamburg, Frankfurt, Cologne, Stuttgart, Düsseldorf. That is 6.3% of the board, behind the Bay Area and London.</p>
      <p>It is also the most opaque market we track, by a distance.</p>

      <h2>Seven listings out of 275 publish a salary</h2>
      <table>
        <thead><tr><th></th><th>Listings</th><th>Publish a range</th><th>Rate</th></tr></thead>
        <tbody>
          <tr><td><strong>Germany</strong></td><td>300</td><td><strong>10</strong></td><td><strong>3.3%</strong></td></tr>
          <tr><td>London / UK</td><td>356</td><td>49</td><td>13.8%</td></tr>
          <tr><td>Canada</td><td>222</td><td>48</td><td>21.6%</td></tr>
          <tr><td>Bay Area</td><td>838</td><td>293</td><td>35.0%</td></tr>
          <tr><td>Whole board</td><td>4,730</td><td>874</td><td>18.5%</td></tr>
        </tbody>
      </table>
      <p>Germany at 300 listings and the UK at 356 are comparable markets, and one publishes pay four times as often as the other. Against the Bay Area it is more than ten times.</p>
      <p>We are not going to quote a German median off 10 ranges. It would be a number with no claim to represent anything, and the point of this page is the 3.3%, not the figure hiding behind it.</p>
      <blockquote>The practical reading: in Germany you should assume you will be asked for your expectations first, every time, with nothing published to anchor against. That is a negotiating position you have to prepare for rather than discover on the call.</blockquote>
      <p>The EU Pay Transparency Directive is due to change this — member states have to have it in national law by June 2026, and it requires employers to give pay information to applicants. Our guide to <a href="/posts/salary-transparency-laws-2026">where pay ranges are required</a> tracks what applies where. What our board shows is what German listings look like today, which is: silent.</p>

      <h2>Marketing out-hires engineering, two to one</h2>
      <table>
        <thead><tr><th>Field (by title)</th><th>Roles</th><th>Share of German listings</th></tr></thead>
        <tbody>
          <tr><td><strong>Marketing</strong></td><td><strong>64</strong></td><td>21.3%</td></tr>
          <tr><td>Sales</td><td>43</td><td>14.3%</td></tr>
          <tr><td>Software engineering</td><td>29</td><td>9.7%</td></tr>
          <tr><td>Customer support</td><td>7</td><td>2.3%</td></tr>
          <tr><td>Finance, legal, HR</td><td>5</td><td>1.7%</td></tr>
          <tr><td>Data / AI</td><td>5</td><td>1.7%</td></tr>
          <tr><td>Product</td><td>4</td><td>1.3%</td></tr>
          <tr><td>Design</td><td>2</td><td>0.7%</td></tr>
        </tbody>
      </table>
      <p>Marketing at 21.3% is the highest concentration of any field in any market on this board. Nowhere else does marketing lead, and in most places engineering does. Sales and marketing together are 36% of German remote listings against 10% for engineering.</p>
      <p>That is a commercial market, not a technical one. If you are a German-speaking marketer it is the best market here by some way. If you are an engineer, 29 roles is thin for a country this size, and the European picture is more useful than the national one — our <a href="/posts/remote-jobs-in-europe-where-to-look">guide to remote jobs in Europe</a> covers the wider continent.</p>

      <h2>Nobody is hiring at scale</h2>
      <p><strong>182 employers</strong> share 300 roles. That is 1.6 roles per employer, the most fragmented market on the board — the Bay Area runs 4.9, Canada 3.0.</p>
      <p>The most active are Scalable Capital (10), DataGuard (10), Ashby (9), GitLab (7), EGYM (7) and Studyflix (5). There is no cluster of large remote employers to follow here the way there is in North America; almost every opening is a one-off.</p>
      <p>Practically, that means breadth beats targeting. A shortlist of employers works in Seattle, where 18 companies hold the whole market. It does not work in Germany, where you would need to watch 182.</p>

      <h2>Language is the filter nobody mentions</h2>
      <p>One thing our data cannot measure and you should check on every listing: German-language requirements. A meaningful share of these roles, particularly in marketing, sales and support, are advertised in German or expect business German, and the location field says nothing about it. We can tell you a role is open to someone in Germany; we cannot tell you it is open to someone who does not speak German.</p>
      <p>Read the description rather than the location on this one. It is the most common reason an otherwise-matching application goes nowhere.</p>

      <h2>How to run this search</h2>
      <ol>
        <li><strong>Prepare a number before the first conversation.</strong> With 3.3% disclosure you will be asked, and "what are your expectations?" with no published anchor is where money is lost.</li>
        <li><strong>Search broadly rather than by employer.</strong> 182 employers for 300 roles means no shortlist will cover it.</li>
        <li><strong>Check the language requirement in the body of every listing.</strong></li>
        <li><strong>Work the <a href="/remote-jobs-in-germany">Germany job list</a></strong>, which also carries every work-from-anywhere role, since those are open to you too. For roles with no country condition at all, the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> is the place to start.</li>
      </ol>

      <h2>How we counted</h2>
      <ul>
        <li>Figures are from the live board on <strong>6 October 2026</strong>: 4,730 published remote listings, 874 of which publish a salary range.</li>
        <li><strong>A listing counts for a place if its own location text names it</strong>, using the same pattern the matching job page uses, so the guide and the list cannot disagree.</li>
        <li>These counts cover <strong>region-locked</strong> listings only. The matching job page also shows every work-from-anywhere role on the board, because those are open to you here too — they are just not <em>about</em> this place.</li>
        <li><strong>Pay covers only listings that publish a range</strong>, converted to a USD midpoint. A listing with no number is not counted as low; it is not counted. Sample sizes are printed next to every median.</li>
        <li>Fields are matched on job title, not our category filter, which files unclassifiable listings under "Product".</li>
        <li>Counts change nightly. If a figure here disagrees with the board, the board is right. Our <a href="/posts/how-we-source-and-verify-listings">sourcing method</a> sets out what is in and what is out.</li>
      </ul>
    `,
    faq: [
      {
        q: "How many remote jobs are there in Germany?",
        a: "On our board on 6 October 2026 there were 300 remote listings naming Germany or a German city, from 182 employers — 6.3% of the board, behind the Bay Area and London.",
      },
      {
        q: "Why do German job listings not show salaries?",
        a: "Germany currently has no requirement to publish a pay range in an advert, and the effect is stark: only 10 of 300 German listings on our board published one on 6 October 2026 — 3.3%, against 13.8% in the UK and 35.0% in the Bay Area. The EU Pay Transparency Directive is due to change this as member states bring it into national law.",
      },
      {
        q: "What kind of remote work does Germany hire for?",
        a: "Commercial roles, more than technical ones. On 6 October 2026, marketing was the largest field at 64 of 300 listings (21.3%) and sales second at 43 (14.3%), against 29 software engineering roles (9.7%). Marketing leads in no other market we track.",
      },
      {
        q: "Do I need to speak German for remote jobs in Germany?",
        a: "Often, and the location field will not tell you. A meaningful share of these roles, especially in marketing, sales and support, are advertised in German or expect business German. It is the most common reason an otherwise-matching application fails, so read the description rather than relying on the location.",
      },
    ],
  },
  {
    slug: "remote-jobs-canada-latin-america",
    title: "Remote Jobs in Canada and Latin America: One Mature Market, One Barely Started",
    description:
      "Canada has 222 remote roles, publishes pay on a fifth of them and is the freshest market on our board. Latin America has 76 and four published salaries. Why the gap, and how to search each.",
    date: "2026-10-06T11:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Jobs Canada", "Remote Jobs Latin America", "Remote Job Market", "Remote Salaries"],
    readMinutes: 9,
    html: `
      <p>Counted on <strong>6 October 2026</strong> across 4,730 remote listings. Figures come from the board itself and change nightly.</p>

      <p class="text-sm"><em>Figures refreshed 6 October 2026. The board grew from 3,749 to 4,730 listings earlier the same day, when we added 135 further employer career boards as sources, so the counts below are higher than the ones first published here. Every finding is unchanged.</em></p>

      <p>These two regions get mentioned in the same breath as "the Americas outside the US", and on this board they could hardly be less alike.</p>
      <table>
        <thead><tr><th></th><th>Listings</th><th>Employers</th><th>Publish pay</th><th>Median</th><th>Posted this week</th></tr></thead>
        <tbody>
          <tr><td><strong>Canada</strong></td><td>222</td><td>74</td><td>48 (21.6%)</td><td>$179,868</td><td>75</td></tr>
          <tr><td><strong>Latin America</strong></td><td>76</td><td>46</td><td>4 (5.3%)</td><td>too few to quote</td><td>17</td></tr>
        </tbody>
      </table>

      <h2>Canada: small, mature, and moving faster than anywhere else</h2>
      <p>222 listings is 4.7% of the board — a mid-sized market. What stands out is not the size but the churn: <strong>75 of the 222 were posted in the last week</strong>, and the median listing is only <strong>15 days old</strong>. Both are the best figures of any place we track. Compare the Bay Area, nearly four times the size, where the median listing has been open 23 days.</p>
      <p>A market this fresh rewards frequency. Checking weekly in Canada surfaces roughly a third of the market as new; checking monthly means competing on listings that have already been open a month.</p>
      <h3>Pay</h3>
      <p>48 of 222 publish a range — 21.6%, above the board's 18.5%, helped by pay-transparency rules in British Columbia and Ontario. Among those that do: a median of <strong>$179,868</strong>, with a 25th-to-75th band of $154,800 to $205,005.</p>
      <p>That sits below the US markets, as expected, and the band is notably tight — about $50,000 between the quartiles, against $90,000 in the Bay Area. Canadian remote pay, as advertised, is more predictable than American remote pay.</p>
      <h3>Who is hiring</h3>
      <p>74 employers, and the distribution is lopsided: <strong>GitLab alone has 44 of the 222 roles</strong> — one in five. Then Ashby (26), Mercury (7), Float (7), Grafana Labs (6) and Elation Health (6).</p>
      <p>That concentration is worth planning around. Two employers account for nearly a third of Canadian remote hiring on this board, and both are companies that hire into named countries rather than from anywhere. Following them directly is a legitimate strategy here.</p>
      <h3>By field</h3>
      <p>Software engineering leads at 38 roles (17.1%, median $187,200 from 15 ranges), then sales at 20, product at 15, marketing at 14 and support at 13 (median $120,725). It is a conventional technical market, unlike Germany's commercial one.</p>

      <h2>Latin America: a market that has not really started</h2>
      <p>76 listings, 1.6% of the board, from 46 employers. The most active are Webflow (5), Nortal (5), VTEX (5), Tempo (5), TilthQ (3) and Pragmatike (3) — nobody hiring at scale.</p>
      <p><strong>Four listings publish a salary range.</strong> Four, out of 76. We are not going to compute a regional median from that, and you should be sceptical of anyone who does.</p>
      <p>The field breakdown is similarly thin: 12 software engineering roles, 9 sales, 4 marketing, 3 support, 3 design, 3 data. Those are not fields, they are handfuls.</p>
      <h3>Why it looks like this, and why that is not the whole story</h3>
      <p>This is the part to read carefully, because the obvious conclusion is wrong.</p>
      <p>A listing lands in this count only if its location text names Latin America or a country in it. Plenty of work genuinely done from the region never says so: it is hired as "Remote — Americas", as a contractor arrangement with no location in the advert, or through local job boards and networks that we do not read. Our board reads employers' own career pages, which skews towards companies large enough to run a formal hiring system and to name a region when they do.</p>
      <p>So the honest claim is narrow: <strong>few companies advertise Latin America as a hiring region on their own career pages.</strong> That is not the same as "there is little remote work in Latin America", and we cannot support the second from this data.</p>
      <p>What it does mean practically is that searching by region will underserve you here, and two other routes matter more:</p>
      <ul>
        <li><strong>Work-from-anywhere roles</strong>, which are open to you by definition. There are few of them — 105 on the whole board today — but they are the ones with no country gate at all. Start from the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a>.</li>
        <li><strong>"Americas" roles</strong>, which often include Latin America without naming a country. Several employers write timezone-based postings this way.</li>
      </ul>

      <h2>If you are hired from Latin America, the arrangement matters more than the salary</h2>
      <p>Remote hiring into the region leans heavily on contractor arrangements, because a company needs an entity or an employer of record to employ you properly and far fewer have one here than in Canada. That is a materially different deal from employment, and the headline rate is not comparable with a salary.</p>
      <p>Before accepting anything, work through <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a> and run the numbers in the <a href="/tools/offer-comparator">offer comparison calculator</a>. A contractor rate that looks generous against a local salary can be worse once you fund your own leave, contributions and insurance.</p>

      <h2>How to search each</h2>
      <ol>
        <li><strong>Canada:</strong> check weekly, not monthly — a third of the market turns over in a week. Follow GitLab and Ashby directly, since they are a third of it. Work the <a href="/remote-jobs-in-canada">Canada job list</a>, which also carries every work-from-anywhere role.</li>
        <li><strong>Latin America:</strong> lead with the <a href="/work-from-anywhere-jobs">work-from-anywhere board</a> and with "Americas" postings rather than country searches, and expect contractor terms. Our guide to <a href="/posts/getting-hired-remotely-from-outside-the-us">getting hired remotely from outside the US</a> covers the application side.</li>
        <li><strong>Both:</strong> filter by region before reading descriptions. It is the cheapest filter there is.</li>
      </ol>

      <h2>How we counted</h2>
      <ul>
        <li>Figures are from the live board on <strong>6 October 2026</strong>: 4,730 published remote listings, 874 of which publish a salary range.</li>
        <li><strong>A listing counts for a place if its own location text names it</strong>, using the same pattern the matching job page uses, so the guide and the list cannot disagree.</li>
        <li>These counts cover <strong>region-locked</strong> listings only. The matching job page also shows every work-from-anywhere role on the board, because those are open to you here too — they are just not <em>about</em> this place.</li>
        <li><strong>Pay covers only listings that publish a range</strong>, converted to a USD midpoint. A listing with no number is not counted as low; it is not counted. Sample sizes are printed next to every median.</li>
        <li>Fields are matched on job title, not our category filter, which files unclassifiable listings under "Product".</li>
        <li>Counts change nightly. If a figure here disagrees with the board, the board is right. Our <a href="/posts/how-we-source-and-verify-listings">sourcing method</a> sets out what is in and what is out.</li>
      </ul>
    `,
    faq: [
      {
        q: "How many remote jobs are there in Canada?",
        a: "On our board on 6 October 2026 there were 222 remote listings naming Canada or a Canadian city, from 74 employers — 4.7% of the board. It is also the freshest market we track: 75 of the 222 were posted within the previous week and the median listing was 15 days old.",
      },
      {
        q: "What do remote jobs in Canada pay?",
        a: "Among the 48 of 222 Canadian listings that published a range on 6 October 2026, the median USD-converted midpoint was $179,868, with a 25th-to-75th band of $154,800 to $205,005. That is below the US markets but notably more consistent — about $50,000 between the quartiles, against $90,000 in the Bay Area.",
      },
      {
        q: "Which companies hire remotely in Canada?",
        a: "Hiring is concentrated. On 6 October 2026, GitLab alone accounted for 44 of the 222 Canadian listings — about one in five — followed by Ashby with 26, then Mercury, Float, Grafana Labs and Elation Health. Two employers covered nearly a third of the market.",
      },
      {
        q: "Are there many remote jobs in Latin America?",
        a: "Few are advertised as such. On 6 October 2026 our board carried 76 listings naming Latin America or a country in it, from 46 employers, with only 4 publishing a salary. That reflects how little work is advertised with the region named on a company career page, which is what we read — it is not evidence that little remote work is done from the region. Work-from-anywhere roles and postings written as 'Americas' are the more productive search.",
      },
      {
        q: "Will I be hired as an employee or a contractor in Latin America?",
        a: "Contractor arrangements are common, because employing someone in a country requires a legal entity there or an employer of record, and far fewer companies have one in Latin America than in Canada. A contractor rate is not comparable with a salary until you account for unpaid leave, social contributions, insurance and the lack of notice — convert it before you compare.",
      },
    ],
  },
  {
    slug: "online-jobs-what-they-actually-are",
    title: "\"Online Jobs\": What That Search Actually Returns on a Real Job Board",
    description:
      "Data entry: 1 role. Transcription: 0. Typing: 0. Surveys: 0. We counted the jobs people search for under \"online jobs\" across 4,730 listings — and what to search instead.",
    date: "2026-10-06T12:00:00.000Z",
    author: "Bhargav",
    tags: ["Online Jobs", "Work From Home", "Remote Job Scams", "Entry Level Remote"],
    readMinutes: 8,
    html: `
      <p>Counted on <strong>6 October 2026</strong> across 4,730 remote listings from 964 employers. Figures come from the board itself and change nightly.</p>

      <p class="text-sm"><em>Figures refreshed 6 October 2026. The board grew from 3,749 to 4,730 listings earlier the same day, when we added 135 further employer career boards as sources, so the counts below are higher than the ones first published here. Every finding is unchanged.</em></p>

      <p>"Online jobs" is one of the most-searched job phrases on the internet. It is also one of the least useful, because the roles people have in mind when they type it are, on a board of real employer listings, almost entirely absent.</p>
      <p>Here is the count. Every row is a title search across all 4,730 listings:</p>
      <table>
        <thead><tr><th>What people search for</th><th>Roles on our board</th><th>Publish pay</th><th>Median</th></tr></thead>
        <tbody>
          <tr><td>Customer service / support</td><td><strong>29</strong></td><td>7</td><td>$107,000</td></tr>
          <tr><td>Online tutor / teacher</td><td><strong>16</strong></td><td>0</td><td>—</td></tr>
          <tr><td>Writer / copywriter</td><td><strong>13</strong></td><td>3</td><td>$110,000</td></tr>
          <tr><td>Data annotation / AI training</td><td>3</td><td>0</td><td>—</td></tr>
          <tr><td>Data entry</td><td><strong>1</strong></td><td>0</td><td>—</td></tr>
          <tr><td>Virtual assistant</td><td><strong>1</strong></td><td>0</td><td>—</td></tr>
          <tr><td>Transcription</td><td><strong>0</strong></td><td>—</td><td>—</td></tr>
          <tr><td>Typing</td><td><strong>0</strong></td><td>—</td><td>—</td></tr>
          <tr><td>Surveys / microtasks</td><td><strong>0</strong></td><td>—</td><td>—</td></tr>
          <tr><td>Content moderation</td><td><strong>0</strong></td><td>—</td><td>—</td></tr>
        </tbody>
      </table>
      <p>Four of those categories return nothing at all. Data entry — among the most-searched remote job phrases there is — returns one listing out of 4,730.</p>

      <h2>The caveat that makes this honest</h2>
      <p>Before drawing the obvious conclusion, here is what this board does and does not see, because it changes what the zeros mean.</p>
      <p>We read employers' own career pages and hiring systems. That captures companies with a formal hiring process and a jobs page. It does <strong>not</strong> capture freelance marketplaces, gig platforms, agency rosters or the informal hiring that happens through networks and local groups.</p>
      <p>So transcription, virtual assistance, survey work and microtasks genuinely exist — on Upwork, on Fiverr, on specialist platforms, through agencies. What the zeros tell you is narrower and still useful: <strong>these are not advertised as jobs by companies with career pages.</strong> They are bought as tasks on marketplaces, which is a different market with different economics, no employment relationship, and no salary to compare.</p>
      <p>That distinction is the single most useful thing on this page. If you are looking for a <em>job</em> — a contract, a salary, a manager, paid leave — searching for these phrases will not find one, because the work is not sold that way.</p>

      <h2>Why the empty rows are empty</h2>
      <p>Two different mechanisms, and it is worth knowing which is which.</p>
      <p><strong>Automated away.</strong> Data entry, typing and transcription were the first office tasks to be done by software. Optical character recognition and speech-to-text did the bulk of it years ago; what remains is error correction, priced accordingly. The work did not move online — it stopped being work.</p>
      <p><strong>Never a job in the first place.</strong> Surveys and microtasks were always piecework sold by the unit on platforms. There was never an employer advertising a survey-taking position, so there is nothing for a job board to list. Any listing that does advertise this as a salaried role should be treated with suspicion.</p>

      <h2>The scam problem, in plain terms</h2>
      <p>This matters because search demand does not disappear when supply does. Hundreds of thousands of people search for remote data entry work every month, and the legitimate supply is roughly nothing. That gap is filled by fraud.</p>
      <p>The pattern is consistent: a role that requires no experience, promises unusually good pay for simple work, moves the conversation to a chat app quickly, and at some point asks you for money — for equipment, for training, for a background check — or for bank details to "set up payroll". No real employer does any of that.</p>
      <p>We have written this up properly elsewhere, and if you are searching these phrases it is worth reading before you apply to anything:</p>
      <ul>
        <li><a href="/posts/how-to-spot-fake-remote-job-postings">How to spot a fake remote job posting</a> — the contact, domain, pay and pressure signals</li>
        <li><a href="/posts/remote-job-scams-how-they-make-money">Seven remote job scams, explained by how each one makes money</a> — the mechanisms rather than the scripts</li>
        <li><a href="/tools/fake-job-checker">Fake job posting checker</a> — paste an advert or a recruiter message and get a red-flag report, in your browser</li>
      </ul>
      <blockquote>A simple rule that costs nothing: a legitimate employer never asks you for money, and never asks for bank details before you have a signed contract. If either happens, it is not a job.</blockquote>

      <h2>What actually exists, and what to search instead</h2>
      <p>The top three rows of that table are real work with real employers, and they are the honest answer to what most people mean by "online jobs".</p>
      <p><strong>Customer support — 29 roles.</strong> The widest open door in remote work for someone without a technical background, and the field with the lowest barrier on this board. Median advertised pay of $107,000 from 7 published ranges, so treat the figure as indicative. Search <a href="/jobs?q=customer%20support">customer support</a> rather than "online jobs".</p>
      <p><strong>Tutoring and teaching — 16 roles.</strong> Genuinely remote, genuinely hiring, and usually requiring a subject you can demonstrate rather than a particular degree.</p>
      <p><strong>Writing — 13 roles</strong>, three of which are work-from-anywhere, which is a better ratio than most fields manage.</p>
      <p>Be realistic about the entry level, though. Across the whole board, <strong>190 of 4,730 listings carry a junior, entry-level, graduate or internship title — 4.0%</strong>. Remote hiring in general is a senior market, and no search phrase changes that. Our guide to <a href="/posts/first-remote-job-2026-no-experience">getting a first remote job with no experience</a> deals with the realistic routes in.</p>

      <h2>Better searches than "online jobs"</h2>
      <ol>
        <li><strong>Search the job, not the medium.</strong> "Online" describes where the work happens, which is true of nearly every listing here. Search the role: customer support, bookkeeping, tutor, writer, scheduler.</li>
        <li><strong>Search a skill you can evidence.</strong> Employers hire for things they can check. "Online jobs" is not a skill; Excel, Zendesk, Spanish, QuickBooks and Shopify are.</li>
        <li><strong>Filter by region first.</strong> Most remote roles still name a country. Doing this before you read descriptions saves more time than any other single habit.</li>
        <li><strong>Use the work-from-anywhere board if you are outside the usual hiring countries.</strong> It is short — 105 roles today — but every role on it is open to you without a country gate. <a href="/work-from-anywhere-jobs">Browse it here</a>.</li>
        <li><strong>Check anything that looks too good.</strong> That is what the <a href="/tools/fake-job-checker">fake job checker</a> is for.</li>
      </ol>

      <h2>How we counted</h2>
      <ul>
        <li>Figures are from the live board on <strong>6 October 2026</strong>: 4,730 published remote listings from 964 employers, 874 of which publish a salary range.</li>
        <li>Each row is a <strong>job-title search</strong> across every listing, region-locked and work-from-anywhere alike.</li>
        <li><strong>We read employers' own career pages and hiring systems.</strong> Freelance marketplaces, gig platforms and agency rosters are not in scope, which is why marketplace work shows as zero here. That is a statement about how the work is sold, not about whether it exists. Our <a href="/posts/how-we-source-and-verify-listings">sourcing method</a> sets out exactly what we capture.</li>
        <li>Pay covers only listings publishing a range, converted to a USD midpoint, with the sample size shown. Several rows have too few to quote and are left blank rather than filled in.</li>
        <li>Counts change nightly. If a figure here disagrees with the board, the board is right.</li>
      </ul>
    `,
    faq: [
      {
        q: "Are online data entry jobs real?",
        a: "Almost none are advertised by real employers. On our board on 6 October 2026, one listing out of 4,730 had a data entry title, and transcription, typing, surveys and content moderation returned zero. The work was largely automated by OCR and speech-to-text, while search demand stayed high — and that gap is heavily targeted by fraud. Treat well-paid remote data entry requiring no experience as a scam until proven otherwise.",
      },
      {
        q: "Why does this board show no transcription or virtual assistant jobs?",
        a: "Because we read employers' career pages and hiring systems, not freelance marketplaces. Transcription, virtual assistance and microtask work genuinely exists, but it is sold as tasks on platforms like Upwork and Fiverr rather than advertised as jobs by companies. If you want a contract, a salary and a manager, these phrases will not find one.",
      },
      {
        q: "What online jobs actually exist for beginners?",
        a: "On 6 October 2026 the real categories were customer support (29 roles, median advertised pay $107,000 from 7 published ranges), online tutoring and teaching (16 roles) and writing (13 roles, 3 of them work-from-anywhere). Be realistic about level, though: only 190 of 4,730 listings board-wide carried a junior, entry-level or graduate title — 4.0%.",
      },
      {
        q: "What should I search instead of \"online jobs\"?",
        a: "Search the role rather than the medium — customer support, bookkeeping, tutor, writer — or a skill an employer can verify, such as Zendesk, Excel, QuickBooks or a language. Nearly every listing on a remote job board is 'online', so the word does no filtering, while a role or skill does.",
      },
    ],
  },
  {
    slug: "linkedin-for-remote-jobs",
    title: "LinkedIn for Remote Jobs: Use the Words Employers Actually Type",
    description:
      "Nobody advertises for a UX designer any more — 62 listings say product designer and zero say UX designer. What our board shows about the titles, locations and seniority words that decide whether your profile is found.",
    date: "2026-10-07T07:00:00.000Z",
    author: "Bhargav",
    tags: ["LinkedIn", "Remote Job Search", "Job Search Strategy", "Personal Branding"],
    readMinutes: 9,
    html: `
      <p>Most LinkedIn advice is about you: your headline, your story, your brand. This one is about <strong>the words on the other side of the search box</strong>, because that is what decides whether a recruiter filtering for a role ever sees your profile at all.</p>
      <p>We can answer that part with evidence. Counted on <strong>7 October 2026</strong> across 4,722 remote listings on our board, here is the language employers are actually using.</p>

      <h2>The title gap, which is bigger than anyone expects</h2>
      <p>Job titles drift, and profiles do not drift with them. Counting job titles on the board:</p>
      <table>
        <thead><tr><th>What employers write</th><th>Listings</th><th>What people still put on profiles</th><th>Listings</th></tr></thead>
        <tbody>
          <tr><td>Product designer</td><td><strong>62</strong></td><td>UX designer</td><td><strong>0</strong></td></tr>
          <tr><td>Account executive</td><td><strong>369</strong></td><td>Salesperson</td><td><strong>0</strong></td></tr>
          <tr><td>Software engineer</td><td><strong>409</strong></td><td>Programmer</td><td>5</td></tr>
          <tr><td>Engineering manager</td><td><strong>98</strong></td><td>Tech lead</td><td>6</td></tr>
          <tr><td>Customer success</td><td><strong>79</strong></td><td>Customer service</td><td>8</td></tr>
          <tr><td>Data scientist</td><td>39</td><td>Data analyst</td><td>18</td></tr>
        </tbody>
      </table>
      <p>Zero listings on a 4,722-role board are advertised for a "UX designer". Sixty-two are advertised for a product designer, and the UX work is inside those jobs. If your headline says UX designer, you are optimised for a phrase that employers have stopped typing — we take that apart in the <a href="/posts/remote-design-jobs">remote design jobs guide</a>.</p>
      <p>The fix is not to abandon the words you identify with. It is to put the employer's word where the search looks and yours where a human reads:</p>
      <ul>
        <li><strong>Headline:</strong> the title employers advertise. "Product Designer" beats "UX Designer" on current evidence; "Account Executive" beats "Sales Professional".</li>
        <li><strong>About section:</strong> your own framing, in full sentences, where nuance costs you nothing.</li>
        <li><strong>Experience titles:</strong> if your official job title was unusual, add the standard one in brackets. "Growth Ninja (Marketing Manager)" is findable; "Growth Ninja" is not.</li>
      </ul>

      <h2>Your location field is doing more work than your headline</h2>
      <p>This is the single most consequential setting on a remote job seeker's profile, and it is usually set carelessly.</p>
      <p>On our board, <strong>4,617 of 4,722 listings — 97.8% — name a country or region</strong>. Only 105 carry no location condition at all. Remote hiring is overwhelmingly hiring into specific places, for the ordinary reason that employing someone in a country needs a legal entity or an employer of record there. Our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a> explains the mechanics.</p>
      <p>What that means in practice:</p>
      <ul>
        <li><strong>Put your real country in the location field.</strong> Recruiters filter on it before they read anything. A profile showing a city the employer cannot hire in is filtered out before your experience is seen, and a profile showing nothing is often filtered out too.</li>
        <li><strong>Do not set your location to a place you are not legally able to work in</strong> to catch more searches. It wastes the recruiter's time and yours, and it is found out at the first screening question.</li>
        <li><strong>Use the About section for nuance</strong> the location field cannot hold: existing work authorisation, a company entity you can be employed through, willingness to overlap specific hours.</li>
        <li><strong>If you want genuinely location-free work</strong>, understand that you are fishing in the 2.2%. Our <a href="/posts/how-to-find-work-from-anywhere-jobs">guide to finding work-from-anywhere roles</a> covers why following a short list of employers beats searching.</li>
      </ul>

      <h2>Seniority words are priced, and they are visible</h2>
      <p>Counting the words that appear in job titles, with the median advertised pay of the listings that publish a range:</p>
      <table>
        <thead><tr><th>Word in the title</th><th>Listings</th><th>Share of board</th><th>Median advertised pay</th><th>Sample</th></tr></thead>
        <tbody>
          <tr><td>Principal</td><td>106</td><td>2.2%</td><td><strong>$274,400</strong></td><td>28</td></tr>
          <tr><td>Head of</td><td>75</td><td>1.6%</td><td>$269,250</td><td>8</td></tr>
          <tr><td>Staff</td><td>301</td><td>6.4%</td><td>$233,750</td><td>105</td></tr>
          <tr><td>Director</td><td>258</td><td>5.5%</td><td>$217,500</td><td>41</td></tr>
          <tr><td>Lead</td><td>228</td><td>4.8%</td><td>$191,250</td><td>36</td></tr>
          <tr><td>Senior</td><td>799</td><td>16.9%</td><td>$180,940</td><td>201</td></tr>
          <tr><td>Junior, graduate, entry-level</td><td>189</td><td>4.0%</td><td>$95,850</td><td>22</td></tr>
        </tbody>
      </table>
      <p>Two things to take from that. First, "staff" and "principal" are <em>separate</em> rungs above senior and they are paid like it — a $53,000 gap between the senior and staff medians, on samples of 201 and 105. If you are operating at that level and your profile says "Senior", you are filtered into a lower band before anyone speaks to you.</p>
      <p>Second, this is a senior market: 16.9% of listings say senior and only 4.0% say junior, graduate or entry-level. Claiming a level you have not reached is a bad trade, but failing to claim one you have reached is a common and expensive mistake.</p>

      <h2>What to do, in order</h2>
      <ol>
        <li><strong>Search the board for your own job title first.</strong> If it returns little, you have the wrong word. <a href="/jobs">Search the live board</a> and compare what comes back with what your profile says.</li>
        <li><strong>Rewrite the headline as a title, not a slogan.</strong> "Product Designer · Design systems · Fintech" is findable. "Designing delightful experiences ✨" is not.</li>
        <li><strong>Set the location field honestly and specifically</strong>, and put the work-authorisation detail in About.</li>
        <li><strong>Name your level accurately</strong>, including staff or principal if that is where you operate.</li>
        <li><strong>Mirror the employer's own words from real listings</strong>, not from a keyword tool. Open five live postings for the role you want and write down the nouns they repeat. Our <a href="/tools/ats-keyword-checker">ATS keyword checker</a> does the same comparison between your CV and one job description.</li>
        <li><strong>Turn on "open to work" with the recruiter-only setting</strong>, and list the job titles you want using the employer's words from step 1.</li>
      </ol>

      <h2>What this data cannot tell you</h2>
      <ul>
        <li><strong>Nothing here is measured on LinkedIn.</strong> We read employers' own career pages and hiring systems, so this is evidence about the language of job postings, which is what recruiters write their searches from. How LinkedIn ranks profiles internally is not something we or anyone outside LinkedIn can measure.</li>
        <li><strong>Pay figures cover only the listings that publish a range</strong> — 874 of 4,722 — converted to a USD midpoint, with the sample size beside each one. They skew towards US employers covered by pay-transparency laws. See <a href="/posts/salary-transparency-laws-2026">where ranges are required</a>.</li>
        <li><strong>Title counts are a snapshot.</strong> The board is rebuilt nightly, and "zero UX designer roles" means zero today, not zero forever. If a figure here disagrees with the board, the board is right.</li>
      </ul>
    `,
    faq: [
      {
        q: "What should my LinkedIn headline say for remote jobs?",
        a: "The job title employers actually advertise, not the one you identify with. On our board on 7 October 2026 there were 62 listings for a product designer and zero for a UX designer, and 369 for an account executive against zero for a salesperson. Put the employer's word in the headline, where searches look, and your own framing in the About section, where a human reads.",
      },
      {
        q: "Does my LinkedIn location matter for remote jobs?",
        a: "More than almost anything else on the profile. 4,617 of 4,722 remote listings on our board — 97.8% — name a country or region, because employing someone somewhere requires a legal entity or an employer of record there. Recruiters filter on location before reading your experience, so set it to your real country and put work-authorisation detail in the About section.",
      },
      {
        q: "Should I put 'senior' in my LinkedIn title?",
        a: "Only if it is accurate, but do not under-claim either. On our board, listings with 'staff' in the title showed a median advertised salary of $233,750 from 105 published ranges against $180,940 for 'senior' from 201 — a $53,000 gap between two adjacent rungs. If you operate at staff or principal level and your profile says senior, you are being filtered into a lower band before anyone speaks to you.",
      },
      {
        q: "How do I find the right keywords for my profile?",
        a: "Read five live job postings for the role you want and write down the nouns they repeat, rather than relying on a keyword tool. Those postings are what recruiters build their searches from. Our ATS keyword checker does the same comparison between a CV and a single job description, in your browser.",
      },
    ],
  },
  {
    slug: "upskilling-for-remote-work",
    title: "Upskilling for Remote Work: What Listings Reward, and What They Barely Mention",
    description:
      "Certifications appear in almost no remote job titles — 3 of 4,722 say 'certified' and none say PMP or CPA. What the pay ladder actually rewards, and how to think about courses given that.",
    date: "2026-10-07T08:00:00.000Z",
    author: "Bhargav",
    tags: ["Upskilling", "Remote Career", "Certifications", "Career Advancement"],
    readMinutes: 8,
    html: `
      <p>"Which course should I take to earn more remotely?" is the most common career question there is, and most answers to it are written by people selling courses.</p>
      <p>We cannot tell you which course to buy — we have no data on course outcomes and no business having an opinion on vendors. What we can do is read 4,722 remote job listings and tell you what employers are asking for in them. Counted on <strong>7 October 2026</strong>.</p>

      <h2>Certifications barely appear</h2>
      <p>Searching every job title on the board:</p>
      <table>
        <thead><tr><th>Appears in the job title</th><th>Listings</th></tr></thead>
        <tbody>
          <tr><td>Salesforce</td><td>10</td></tr>
          <tr><td>AWS</td><td>8</td></tr>
          <tr><td>"Certified" (any certification)</td><td>3</td></tr>
          <tr><td>Kubernetes</td><td>2</td></tr>
          <tr><td>Security clearance</td><td>2</td></tr>
          <tr><td>PMP</td><td><strong>0</strong></td></tr>
          <tr><td>CPA</td><td><strong>0</strong></td></tr>
        </tbody>
      </table>
      <p>Out of 4,722 listings, three say "certified" anywhere in the title. PMP and CPA — two of the most heavily marketed professional certifications — appear in none.</p>
      <p>Be careful about what that does and does not prove. It is a statement about <strong>titles</strong>, not about requirements: a CPA may well be demanded in the body of an accounting listing without appearing in its title, and we cannot measure that reliably because most of the descriptions we store are short company summaries rather than full postings. What it does show is that certifications are not the thing employers lead with, which is worth knowing before you spend six months and a few thousand on one expecting it to be the headline.</p>
      <blockquote>The honest framing: a certification is a credential that passes a filter in some regulated fields. It is rarely the thing that gets a remote job offer, because remote hiring is unusually evidence-driven — nobody can see you working, so they look at what you have produced.</blockquote>

      <h2>What the pay ladder actually rewards</h2>
      <p>This is the clearest signal on our board, and it is about <em>scope</em> rather than credentials. Median advertised pay for listings whose title carries each word:</p>
      <table>
        <thead><tr><th>Level in the title</th><th>Listings</th><th>Median advertised pay</th><th>Sample</th></tr></thead>
        <tbody>
          <tr><td>Principal</td><td>106</td><td><strong>$274,400</strong></td><td>28</td></tr>
          <tr><td>Head of</td><td>75</td><td>$269,250</td><td>8</td></tr>
          <tr><td>Staff</td><td>301</td><td>$233,750</td><td>105</td></tr>
          <tr><td>Director</td><td>258</td><td>$217,500</td><td>41</td></tr>
          <tr><td>Lead</td><td>228</td><td>$191,250</td><td>36</td></tr>
          <tr><td>Senior</td><td>799</td><td>$180,940</td><td>201</td></tr>
          <tr><td>Junior, graduate, entry-level</td><td>189</td><td>$95,850</td><td>22</td></tr>
        </tbody>
      </table>
      <p>The distance from junior to senior is about $85,000 at the median; from senior to staff, another $53,000. Those two steps are worth more than any certification on the market, and neither is bought.</p>
      <p>The skills that move someone from senior to staff are consistently the unglamorous ones: writing a design document other teams can act on, breaking an ambiguous problem into shippable pieces, and making a decision with incomplete information and then defending it. In an async company those are doubly valuable, because they are precisely the skills that survive being written down — see our guide to <a href="/posts/async-first-companies-hiring-2026">how async-first companies hire</a>.</p>

      <h2>Where the money is by field, which should inform what you learn</h2>
      <p>If you are choosing a direction rather than a course, the field matters more than the credential. From our <a href="/posts/remote-job-tier-list-2026">remote job tier list</a>, which ranks fields on volume, pay and portability:</p>
      <ul>
        <li><strong>DevOps, SRE and platform engineering</strong> has the highest work-from-anywhere share of any field we track, and a strong median. If location independence is the goal, this is the best-evidenced direction on the board.</li>
        <li><strong>Software engineering generally</strong> is the largest field by title and has the best pay sample on the board by a distance.</li>
        <li><strong>AI and machine learning</strong> pays very well and is <em>not</em> portable — about 1 role in 93 carries no location condition. Worth knowing if you are moving into it expecting to work from anywhere.</li>
        <li><strong>Customer support</strong> is the widest open door without a technical background, and the honest entry route for many people. Our guide to <a href="/posts/best-remote-jobs-without-tech-background-2026">remote jobs without a tech background</a> covers it.</li>
      </ul>

      <h2>A sensible way to choose, given all that</h2>
      <ol>
        <li><strong>Start from live listings, not a syllabus.</strong> Open ten postings for the job you want in two years and list what they repeat. That is your curriculum, and it is free to produce.</li>
        <li><strong>Prefer evidence you can show over credentials you can claim.</strong> Remote hiring cannot watch you work, so a thing you built, shipped or wrote is worth more than a certificate attesting that you could.</li>
        <li><strong>Take the certification when it is a gate, not a boost.</strong> Regulated and compliance-heavy fields genuinely require specific credentials. Outside those, treat a certification as a tiebreaker.</li>
        <li><strong>Invest in the scope skills.</strong> The senior-to-staff step is the best-paid move in the table above and it is earned by taking on ambiguity, not by completing a course.</li>
        <li><strong>Check the market before committing.</strong> The <a href="/tools/salary-band-estimator">salary band estimator</a> shows what employers publish for a field, level and region, with the sample size next to every figure.</li>
      </ol>

      <h2>How we counted, and what we deliberately did not use</h2>
      <ul>
        <li>Figures are from the live board on <strong>7 October 2026</strong>: 4,722 published remote listings, 874 of which publish a salary range.</li>
        <li>Certification and level counts are <strong>job-title searches</strong>. A requirement stated only in the body of a posting is not counted.</li>
        <li><strong>We did not use our own skills data, and that is deliberate.</strong> The board extracts skill tags from listing descriptions, but most of the descriptions we store are short company summaries, so those tags measure our own capture rather than employer demand. Reporting "the most in-demand remote skill" from them would be reporting an artefact. We would rather leave the question unanswered than answer it wrongly.</li>
        <li>Pay is the median USD midpoint of listings publishing a range, with sample sizes shown. It skews towards US employers covered by pay-transparency laws.</li>
        <li>Counts change nightly. If a figure here disagrees with the board, the board is right.</li>
      </ul>
    `,
    faq: [
      {
        q: "Are certifications worth it for remote jobs?",
        a: "Rarely as a headline. Of 4,722 remote listings on our board on 7 October 2026, three mentioned 'certified' anywhere in the title, and PMP and CPA appeared in none. That is a measure of titles rather than of every stated requirement, but it shows certifications are not what employers lead with. They matter most as a gate in regulated fields, and least as a general boost.",
      },
      {
        q: "What skills increase remote salary the most?",
        a: "Scope, more than any specific tool. On our board, median advertised pay ran from $95,850 for junior and graduate titles to $180,940 for senior, $233,750 for staff and $274,400 for principal. The junior-to-senior and senior-to-staff steps are each worth more than any certification on the market, and both are earned by taking on ambiguity and responsibility rather than by completing a course.",
      },
      {
        q: "Which remote field should I move into?",
        a: "It depends on whether you are optimising for pay, volume or location freedom. DevOps, SRE and platform engineering has the highest work-from-anywhere share of any field we track; software engineering is the largest by title; AI and machine learning pays very well but only about 1 role in 93 is location-free; and customer support remains the widest entry point without a technical background.",
      },
      {
        q: "What is the most in-demand skill in remote jobs?",
        a: "We will not answer that from our data, because we cannot answer it honestly. Our skill tags are extracted from listing descriptions, and most of the descriptions we store are short company summaries rather than full postings, so the tags measure our own capture rather than employer demand. Reading ten live postings for the role you want is a better guide than any single ranked list.",
      },
    ],
  },
  {
    slug: "assessing-remote-fit-when-hiring",
    title: "Hiring for Distribution: How to Assess Remote Fit Without Guessing",
    description:
      "97.8% of remote listings name a country, and most interviews still test for an office job. A practical guide to writing the posting, running the process, and the signals that actually predict remote performance.",
    date: "2026-10-07T09:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Hiring", "Interviewing", "Distributed Teams", "Employers"],
    readMinutes: 9,
    html: `
      <p>This one is for the other side of the table. We run a job board, so we read a great many postings — 4,722 live on <strong>7 October 2026</strong> — and the same avoidable mistakes show up over and over.</p>

      <h2>Start with the posting, because most of the damage happens there</h2>
      <p><strong>Say where you can actually employ someone, in the first line.</strong> 4,617 of our 4,722 listings — 97.8% — name a country or region, which is honest, because employing someone somewhere needs an entity or an employer of record there. The problem is where it is said. A role headlined "Remote" that reveals "must be US-based" in paragraph nine wastes everyone's time and earns you a reputation among candidates who track this. We built a <a href="/tools/jd-remote-analyzer">job description analyser</a> that flags exactly these clauses, and it is worth running your own posting through it.</p>
      <p><strong>Decide whether you mean remote or distributed, and write the one you mean.</strong> Those are different products. Our filter rejects a large share of listings as office or hybrid roles wearing the word remote, and candidates have learned to assume the worst — see <a href="/posts/how-to-spot-hybrid-bait-in-remote-job-descriptions">how to spot hybrid bait</a> for the phrasing they are scanning for.</p>
      <p><strong>Publish a salary range if you can.</strong> Only 18.5% of listings on our board do. The ones that do get better-calibrated applicants and shorter processes, and in several US states and increasingly across the EU it is becoming a legal requirement anyway — see <a href="/posts/salary-transparency-laws-2026">where ranges are required</a>. Where it is optional it is still a filter that works in your favour.</p>
      <p><strong>Name the timezone expectation as a number.</strong> "Must overlap four hours with Pacific" is a location requirement in disguise, and candidates would rather know. Our <a href="/posts/timezone-overlap-how-much-you-need">guide to how much overlap a team really needs</a> has the arithmetic if you are deciding what to ask for.</p>

      <h2>What actually predicts remote performance</h2>
      <p>The uncomfortable part: most interview processes test for an office job and then hire for a remote one. The things that differ are specific and testable.</p>
      <h3>1. Written clarity, assessed from real artefacts</h3>
      <p>In a distributed team, most decisions are made in writing and most context is read rather than overheard. Someone who writes clearly is cheaper to work with every single day, and someone who does not will quietly consume other people's time forever.</p>
      <p>Assess it from things that already exist: the application itself, a short written response to a real problem, a document from previous work. Do not run a timed essay — you are testing thinking under a constraint that does not resemble the job.</p>
      <h3>2. Working without a prompt</h3>
      <p>Office work is full of ambient correction: someone notices you are stuck. Remote work is not. The signal to look for is a candidate describing a time they noticed something was wrong, decided what to do, and said so — rather than waiting to be asked.</p>
      <p>A useful question: "Tell me about something you shipped that nobody asked you for." The answer separates people who need direction from people who need context.</p>
      <h3>3. Asking rather than stalling</h3>
      <p>The counterweight to independence. The failure mode of remote hires is not laziness, it is being stuck for three days without telling anyone. Ask candidates how they handle being blocked, and listen for a specific threshold — "if I have not moved in an hour I write it up and post it" is a real answer; "I just push through" is a warning.</p>
      <h3>4. Handover quality</h3>
      <p>Across timezones, work is passed rather than discussed. Ask what they leave behind at the end of a day for someone who will pick it up while they sleep. People who have genuinely worked distributed have a concrete answer.</p>

      <h2>Run the process the way the job runs</h2>
      <ul>
        <li><strong>Make at least one stage asynchronous.</strong> If the job is mostly written, a process that is entirely live calls tests the wrong thing — and favours people who are good at meetings over people who are good at the work.</li>
        <li><strong>Pay for substantial take-home work</strong>, and keep it under a few hours. An unpaid multi-day exercise selects for people who can afford to do it, which is not the trait you are hiring for.</li>
        <li><strong>Interview across the timezone gap you will actually have.</strong> If the role overlaps you by three hours, run a conversation inside that window and see how it feels for both sides.</li>
        <li><strong>Tell them the arrangement before the offer.</strong> Employee of a local entity, employer of record, or contractor — these are materially different deals and a candidate who finds out at the offer stage may walk. Our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a> sets out what each means for them.</li>
        <li><strong>Keep the process short.</strong> The median listing on our board has been open several weeks; strong remote candidates are usually in several processes at once, and length is the cheapest reason to lose one.</li>
      </ul>

      <h2>Two things not to screen on</h2>
      <p><strong>Previous remote experience, as a hard filter.</strong> It correlates with having had the opportunity, which correlates with things you should not be selecting on. Assess the behaviours directly; they are visible in people who have never worked remotely.</p>
      <p><strong>Responsiveness during the process.</strong> A candidate replying within minutes is demonstrating that they are job hunting, not that they will be a good colleague — and treating it as a signal selects for exactly the always-on behaviour that causes remote burnout later.</p>

      <h2>How we counted</h2>
      <ul>
        <li>Figures are from the live board on <strong>7 October 2026</strong>: 4,722 published remote listings from 964 employers, 874 of which publish a salary range.</li>
        <li>The 97.8% is listings whose location text names a country or region rather than carrying no location condition at all.</li>
        <li>Everything in the assessment sections is practice rather than measurement, and is presented as such. We can count what postings say; we cannot measure which interview questions predict performance, and we are not going to pretend otherwise.</li>
        <li>Counts change nightly. If a figure here disagrees with the board, the board is right. Our <a href="/posts/how-we-source-and-verify-listings">sourcing method</a> sets out what we capture.</li>
      </ul>
    `,
    faq: [
      {
        q: "How do you assess whether someone will work well remotely?",
        a: "Assess four behaviours directly rather than screening for previous remote experience: written clarity judged from real artefacts, acting without being prompted, raising blockers quickly rather than stalling silently, and the quality of what they hand over at the end of a day. Previous remote experience mostly measures who has had the opportunity.",
      },
      {
        q: "Should a remote job posting say which country you hire in?",
        a: "Yes, in the first line. 97.8% of remote listings on our board name a country or region, because employing someone requires a legal entity or an employer of record there — the honest ones say so up front. Burying 'must be US-based' in paragraph nine wastes candidates' time and damages your reputation with the people who track it.",
      },
      {
        q: "Should we publish a salary range in a remote job ad?",
        a: "If you can. Only 18.5% of listings on our board do, so it is a genuine differentiator, it produces better-calibrated applicants and shorter processes, and it is becoming a legal requirement in several US states and across the EU.",
      },
      {
        q: "How long should a remote hiring process be?",
        a: "Short, and with at least one asynchronous stage if the job is mostly written work. A process made entirely of live calls tests how good someone is at meetings rather than at the job, and length is the cheapest way to lose strong candidates who are usually in several processes at once.",
      },
    ],
  },
  {
    slug: "setting-expectations-distributed-teams",
    title: "Setting Expectations in a Distributed Team: What to Write Down Before It Breaks",
    description:
      "Most remote management problems are unwritten-expectation problems. The specific things to agree in writing — availability, response times, decision rights and what 'done' means — and why presence is the wrong measure.",
    date: "2026-10-07T10:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Management", "Distributed Teams", "Employers", "Async Work"],
    readMinutes: 8,
    html: `
      <p>A distributed team does not fail because people are at home. It fails because expectations that were obvious in an office were never made explicit, and nobody noticed until they had already been broken.</p>
      <p>This is a practical list of what to write down. It is drawn from how distributed companies describe their own working practices rather than from our listing data — we can count what employers advertise, not what works inside them, and we say so in the method note at the end.</p>

      <h2>Presence is the wrong measure, and measuring it is expensive</h2>
      <p>The instinct when you cannot see people is to measure whether they are there: green dots, activity monitoring, cameras on. It is worth being blunt about why this fails.</p>
      <p>Presence measures availability, not output. Someone can be online for nine hours and produce nothing, and the measure cannot tell. Worse, it is trivially gameable, so you end up selecting for the gaming rather than the work — and the people most willing to perform availability are rarely your strongest contributors.</p>
      <p>It also actively damages the thing that makes distributed work valuable. The reason a company can hire across twelve timezones is that work does not depend on everyone being awake together. A presence metric reinstates that dependency through the back door and gives up the advantage.</p>
      <blockquote>The replacement is not "trust everyone and hope". It is agreeing what finished work looks like, and reviewing the work.</blockquote>

      <h2>The six things to agree in writing</h2>
      <h3>1. Core hours, as an actual number</h3>
      <p>Not "be reasonably available". A specific window — "10:00 to 14:00 UTC, Monday to Thursday" — and what it is for. Everything outside it is the person's own to arrange. Our <a href="/posts/timezone-overlap-how-much-you-need">guide to how much overlap a team needs</a> works through what is realistic across common timezone pairs.</p>
      <h3>2. Response-time expectations, by channel</h3>
      <p>The most common source of low-grade stress on a distributed team is not knowing how fast you are supposed to reply. Write it down: chat within the working day, email within two, an explicit escalation route for things that genuinely cannot wait. Then hold the line on it — the expectation is worthless if managers reply at 23:00 and everyone infers that they should too.</p>
      <h3>3. What "done" means</h3>
      <p>In an office, "done" is negotiated in passing. Distributed, it has to be stated: what the deliverable is, what quality bar it meets, who reviews it, and by when. Most perceived performance problems are actually two people holding different definitions of done for the same task.</p>
      <h3>4. Who decides what</h3>
      <p>Ambiguous decision rights are expensive everywhere and ruinous across timezones, because the cost of checking is a day. Say which decisions a person makes alone, which need one other named person, and which go to a group. Write it where people can find it rather than explaining it per case.</p>
      <h3>5. How work gets handed over</h3>
      <p>If people finish at different times, work is passed rather than discussed. Agree what a handover contains — current state, next step, where things are, what is blocked — and have people write it as a matter of routine rather than when they remember.</p>
      <h3>6. What is written down versus said</h3>
      <p>The rule distributed companies converge on is that decisions live in documents and the meeting is where a document is discussed. If it was only said, it did not happen, because the person asleep at the time has no way to find it. Our guide to <a href="/posts/async-first-companies-hiring-2026">async-first companies</a> covers what that looks like in practice, and the distinction it rests on: async-first is how a company works, which is separate from where it is willing to employ you.</p>

      <h2>Reviewing performance without watching people</h2>
      <ul>
        <li><strong>Review artefacts, not activity.</strong> The work exists — documents, shipped changes, resolved tickets, closed deals. Read it.</li>
        <li><strong>Set expectations per cycle, not per day.</strong> What should exist in two weeks, agreed up front, is both fairer and easier to assess than whether someone looked busy on Tuesday.</li>
        <li><strong>Make one-to-ones about blockers and direction.</strong> Status belongs in writing where everyone can read it; the live time is worth more spent on what is stuck.</li>
        <li><strong>Watch for the quiet failure mode.</strong> Remote underperformance usually presents as silence, not as visible struggle. A person who has gone quiet for a week is a signal, and the response is a conversation, not a monitoring tool.</li>
        <li><strong>Be explicit about promotion criteria.</strong> Distributed teams lose people to ambiguity about advancement more than to pay, because there is no corridor in which to pick up signals about how you are doing.</li>
      </ul>

      <h2>Protect against the failure that costs you people</h2>
      <p>The risk in a distributed team is not slacking — it is the opposite. Without the physical boundary of leaving a building, work expands, and the people most committed to the job are the ones most exposed. Burnout costs more than any amount of underperformance you are worried about.</p>
      <p>Concretely: do not reward out-of-hours replies, publicly or implicitly. Make leave genuinely taken rather than accrued. If you are in the timezone everyone else bends around, notice who is taking the 22:00 call every week, and rotate it. Our guide to <a href="/posts/working-across-timezones-without-burning-out">working across timezones without burning out</a> covers the patterns from the other side of the relationship, and it is worth reading as a manager.</p>

      <h2>How we counted</h2>
      <ul>
        <li><strong>This guide is practice, not measurement.</strong> Our board can tell you what employers advertise — on 7 October 2026 it carried 4,722 listings from 964 employers — but it cannot tell you which management practices work inside those companies. Nothing here is presented as a finding from our data.</li>
        <li>Where a figure does appear, it comes from the live board and is dated. Counts change nightly; if one disagrees with the board, the board is right.</li>
        <li>Our <a href="/posts/how-we-source-and-verify-listings">sourcing method</a> sets out what we capture and what we do not.</li>
      </ul>
    `,
    faq: [
      {
        q: "How do you measure performance in a remote team?",
        a: "By reviewing the work rather than the activity. Distributed work produces artefacts — documents, shipped changes, resolved tickets, closed deals — and those are what to assess, against expectations agreed per cycle rather than per day. Presence metrics measure availability, are trivially gamed, and give up the asynchrony that makes distributed hiring possible in the first place.",
      },
      {
        q: "What should a remote team agree in writing?",
        a: "Six things: core hours as a specific window, response-time expectations by channel, what 'done' means for a piece of work, who decides what, what a handover contains, and the rule that decisions live in documents rather than in meetings. Most perceived performance problems turn out to be two people holding different unwritten definitions of one of these.",
      },
      {
        q: "Should we monitor remote employees' activity?",
        a: "It measures the wrong thing and costs you more than it returns. Activity monitoring tracks availability rather than output, is easy to game, and selects for people willing to perform presence over people doing the best work. Agreeing what finished work looks like and then reviewing the work is both cheaper and more accurate.",
      },
      {
        q: "What is the biggest risk when managing a distributed team?",
        a: "Burnout, not slacking. Without the boundary of leaving a building, work expands, and the people most committed to the job are the most exposed. Practically: do not reward out-of-hours replies, make leave genuinely taken, and rotate the unsociable calls rather than letting the same timezone absorb them every week.",
      },
    ],
  },
];
