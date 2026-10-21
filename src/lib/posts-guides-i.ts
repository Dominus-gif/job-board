/**
 * Cluster I — fields the board had no guide for, and the two ends of a remote
 * job (the interview, and the first 90 days). Written 2026-10-20 after the third
 * AdSense "low value content" rejection.
 *
 * The three field guides are counted from the board on 20 October 2026 with
 * scripts/report-fields.ts, by job TITLE (never by category — see
 * product-category-is-a-catch-all). No median is quoted from fewer than 15
 * published ranges.
 */
import type { Post } from "./posts";

export const POSTS_CLUSTER_I: Post[] = [
  {
    slug: "remote-software-engineering-jobs",
    title: "Remote Software Engineering Jobs: Big Field, Almost No Junior Roles",
    description:
      "651 remote software engineering roles on 20 October 2026: what they pay, where they hire, and why only 20 are open worldwide and 5 are junior.",
    date: "2026-10-20T09:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Software Engineering Jobs", "Remote Developer Jobs", "Software Engineer Salary", "Remote Tech Jobs", "Engineering Careers"],
    readMinutes: 7,
    html: `
      <p>This is a count of every remote software engineering role open on getremotejobsnow.com on <strong>20 October 2026</strong>: <strong>651 roles from 252 employers</strong>, out of 2,887 remote listings. It comes from the listings themselves, not from a survey. The board is rebuilt every night, so the live numbers on the site will have moved by the time you read this.</p>

      <h2>The largest field on the board, by a distance</h2>
      <p>651 roles is 22.5% of everything we list. Nothing else comes close: data and machine learning roles number 181 and marketing 113. If you write software, remote hiring is a large market, and the question is less whether roles exist than which of them you can realistically get.</p>
      <p>Split by the specialism named in the title, the field looks like this. A title can name more than one specialism, so the rows overlap.</p>
      <table>
        <thead><tr><th>Specialism (by title)</th><th>Roles</th><th>Open worldwide</th></tr></thead>
        <tbody>
          <tr><td>Backend</td><td>100</td><td>4</td></tr>
          <tr><td>Engineering management</td><td>61</td><td>5</td></tr>
          <tr><td>DevOps, SRE, platform and infrastructure</td><td>60</td><td>5</td></tr>
          <tr><td>Full-stack</td><td>52</td><td>1</td></tr>
          <tr><td>Security</td><td>28</td><td>0</td></tr>
          <tr><td>Frontend</td><td>23</td><td>1</td></tr>
          <tr><td>Mobile</td><td>20</td><td>1</td></tr>
          <tr><td>QA and test</td><td>9</td><td>0</td></tr>
        </tbody>
      </table>
      <p>The biggest group is not in the table. <strong>305 of the 651 titles (47%) name no specialism at all.</strong> They read "Software Engineer" or "Senior Software Engineer", sometimes followed by a team name such as Billing or Data Infrastructure. That matters when you search. A filter for "backend" alone misses most of the roles that would suit a backend engineer, because the employer put the specialism in the description rather than the title.</p>

      <h2>Pay is published more often here, and it is high</h2>
      <p>196 of the 651 listings publish a salary range, 30.1%, against 20.5% across the whole board. Among those, the USD midpoints run like this:</p>
      <ul>
        <li><strong>Lower quarter:</strong> $187,500</li>
        <li><strong>Median:</strong> $220,000</li>
        <li><strong>Upper quarter:</strong> $250,000</li>
      </ul>
      <p>Two things to keep in mind before you anchor on those numbers. First, publication follows the law. Most published ranges come from US employers in states that require them, and 58% of these roles are in the US anyway, so a figure built mostly from San Francisco and New York ranges is not a global rate. Second, the sample shrinks fast when you slice it. Backend roles have 21 published ranges with a median of $193,500, DevOps and platform roles 17 with $215,500, and full-stack roles 16 with $209,000. Every other specialism has fewer than 15, which is too few to quote as a market rate, so I won't.</p>
      <p>By level, the 47 senior roles that publish pay have a median of $190,000 and the 57 staff, principal and lead roles $230,000. The step from senior to staff is worth about $40,000 at the median, which makes the title on your offer worth negotiating as hard as the number. Our <a href="/tools/salary-band-estimator">salary band estimator</a> narrows this to a region and level, and the <a href="/posts/salary-transparency-laws-2026">salary transparency laws guide</a> explains why the published sample leans American.</p>

      <h2>Five junior roles out of 651</h2>
      <p>This is the number that should shape an early-career search. Only <strong>5 of the 651 roles</strong> carry a junior, graduate, associate, intern or entry-level title: 0.8%. Across the whole board, 3.6% of listings do. Remote software engineering is roughly four times less open to beginners than remote hiring in general.</p>
      <p>The rest of the field skews senior. 172 roles (26.4%) are titled senior and 152 (23.3%) staff, principal, lead or architect, with another 62 (9.5%) in engineering management. Remote engineering teams hire people who can work without someone at the next desk, and they pay for that by hiring experience.</p>
      <p>If you are early in your career, remote engineering is still possible, but the route changes. The common one is a first role that is hybrid or office-based, a year or two of shipped work, and then the move to remote. Open-source contributions help more here than in most fields, because they are a public record of you working asynchronously with strangers, which is the exact skill a remote team is screening for. Our guide to <a href="/posts/first-remote-job-2026-no-experience">getting a first remote job</a> covers the wider picture.</p>

      <h2>Where the roles are</h2>
      <p>A remote role still has a country attached in almost every case. Resolved from the location text:</p>
      <table>
        <thead><tr><th>Country</th><th>Roles</th><th>Share</th></tr></thead>
        <tbody>
          <tr><td>United States</td><td>380</td><td>58.4%</td></tr>
          <tr><td>United Kingdom</td><td>55</td><td>8.4%</td></tr>
          <tr><td>Canada</td><td>51</td><td>7.8%</td></tr>
          <tr><td>India</td><td>26</td><td>4.0%</td></tr>
          <tr><td>Germany</td><td>16</td><td>2.5%</td></tr>
          <tr><td>No country named</td><td>53</td><td>8.1%</td></tr>
        </tbody>
      </table>
      <p>Ireland, Poland and Spain follow with 12 or 13 roles each. Outside North America and the UK the numbers fall away quickly. That says less about where engineers live than about where employers have the legal entities to pay them, and our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a> explains why that is the deciding factor.</p>

      <h2>Only 20 can be done from anywhere</h2>
      <p>Of the 651, <strong>20 carry no country, region or time-zone condition</strong>: 3.1%. They come from just 10 employers: Supabase (5), Canonical (4), Mattermost, Camunda and HFT Architecture (2 each), and NordHarton, Socket, Brave, Metabase and Nova Credit (1 each).</p>
      <p>That list is short enough to follow by hand. If work-from-anywhere is what you want, watching those ten careers pages will serve you better than any search, and our guide on <a href="/posts/how-to-find-work-from-anywhere-jobs">finding work-from-anywhere jobs</a> explains how this tier behaves. It is concentrated, and it moves: one employer closing a hiring round can halve it.</p>

      <h2>A wide, scattered market</h2>
      <p>The 651 roles come from 252 employers, and the top five (GitLab with 43, Ashby with 16, Grafana Labs with 15, Assured and Ubiquiti with 11 each) hold only 14.7% of them. Most employers are hiring one or two engineers at a time.</p>
      <p>In practice that means two things. Employers who hire in volume, like GitLab, deserve a close look, because one good application can be considered for several teams. And because everyone else is spread thin, a search that relies on a single job board misses a lot. The employer's own careers page is always the most current source, which is why our board reads from them directly. The listings do not move fast by job-board standards: the median role here was posted 25 days ago, and 70 of the 651 in the last week.</p>

      <h2>What to do with this</h2>
      <ol>
        <li><strong>Search the job, not the specialism.</strong> Half the titles name no specialism, so search "software engineer" and judge each role by what the description asks for. Our <a href="/tools/job-title-finder">job title finder</a> shows the titles employers use for a given kind of work.</li>
        <li><strong>Read the location line before anything else.</strong> 97% of these roles are tied to a named country or region. If yours is not on it, the role is not open to you, however remote it sounds.</li>
        <li><strong>Pitch at senior level if you can honestly claim it.</strong> Senior and staff roles are the bulk of the market, and the published pay step between them is large.</li>
        <li><strong>If you are early in your career, plan a two-step route</strong> rather than spending months on five junior listings.</li>
      </ol>
      <p>The <a href="/tools/remote-field-explorer">remote field explorer</a> compares this field with the others on the board, including how many roles in each are open worldwide and how many are junior.</p>

      <h2>How we counted</h2>
      <ul>
        <li>Figures are from the board on <strong>20 October 2026</strong>: 2,887 published listings, 651 of them software engineering roles.</li>
        <li><strong>Roles are identified by job title</strong>, not by the site's category filter, which files unclassifiable listings under "Product" and so cannot size a field. A listing counts if its title names software engineering or development, a backend, frontend, full-stack, mobile, platform, infrastructure, DevOps, SRE, security or QA role, or engineering management. Sales, solutions, support and field engineers are excluded, as are machine learning, data and research engineers (they are counted in our <a href="/posts/remote-data-and-machine-learning-jobs">data and machine learning guide</a>) and engineering outside software, such as mechanical or electrical.</li>
        <li><strong>Pay covers only the 196 listings that publish a range</strong>, converted to a USD midpoint. Listings without a number are left out, not counted as low.</li>
        <li>Specialism and level are read from the title, so a role titled "Software Engineer" counts as having no specialism even when the description makes one clear.</li>
        <li>Medians from fewer than 15 published ranges are not quoted.</li>
        <li>This is one board. Our <a href="/posts/how-we-source-and-verify-listings">sourcing method</a> sets out what is in and what is out. Counts change nightly; if a figure here disagrees with the board, the board is right.</li>
      </ul>
    `,
    faq: [
      {
        q: "How many remote software engineering jobs are there?",
        a: "On our board on 20 October 2026 there were 651 remote software engineering roles from 252 employers, out of 2,887 listings. That is 22.5% of the board and by far the largest field, more than three times the size of data and machine learning (181 roles).",
      },
      {
        q: "What do remote software engineers earn?",
        a: "Among the 196 software engineering listings that published a salary on 20 October 2026, the median USD midpoint was $220,000, with the middle half running from $187,500 to $250,000. Most published ranges come from US employers, where pay transparency laws apply, so treat this as a guide to US-based remote roles rather than a global average.",
      },
      {
        q: "Can a junior developer get a remote job?",
        a: "It is hard. Only 5 of the 651 remote software engineering roles on our board carried a junior, graduate, intern or entry-level title on 20 October 2026, against 3.6% of listings across the whole board. The more common route is a first hybrid or office role, then a move to remote once you have a record of shipped work.",
      },
      {
        q: "How many remote software engineering jobs can be done from anywhere in the world?",
        a: "20 of 651 on 20 October 2026, or 3.1%, carried no country, region or time-zone condition. They came from 10 employers, led by Supabase and Canonical. The other 97% were tied to a named country or region, most often the United States.",
      },
    ],
  },
  {
    slug: "remote-data-and-machine-learning-jobs",
    title: "Remote Data and ML Jobs: AI Engineers Outnumber Data Scientists",
    description:
      "181 remote data and machine learning roles on 20 October 2026: AI engineering leads, what the roles pay, where they hire, and why only 5 are open worldwide.",
    date: "2026-10-20T09:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Data Science Jobs", "Remote Machine Learning Jobs", "AI Engineer Jobs", "Remote Data Engineer", "Data Careers"],
    readMinutes: 6,
    html: `
      <p>This is a count of every remote data and machine learning role open on getremotejobsnow.com on <strong>20 October 2026</strong>: <strong>181 roles from 118 employers</strong>, out of 2,887 remote listings. It is drawn from the listings, not a survey, and it is a single snapshot. The board is rebuilt nightly.</p>

      <h2>AI engineering is the biggest part of the field</h2>
      <p>Split by what the title names (rows overlap where a title names two things):</p>
      <table>
        <thead><tr><th>Discipline (by title)</th><th>Roles</th><th>Open worldwide</th></tr></thead>
        <tbody>
          <tr><td>Machine learning and AI engineering</td><td>69</td><td>3</td></tr>
          <tr><td>Research scientist or research engineer</td><td>36</td><td>0</td></tr>
          <tr><td>Data engineering</td><td>31</td><td>1</td></tr>
          <tr><td>Data science</td><td>26</td><td>0</td></tr>
          <tr><td>Data and BI analysis</td><td>14</td><td>0</td></tr>
          <tr><td>Quantitative research</td><td>6</td><td>1</td></tr>
        </tbody>
      </table>
      <p>Titles built around machine learning or AI engineering (ML engineer, AI engineer, applied AI, LLM, computer vision) outnumber data scientist titles by more than two and a half to one: 69 to 26. One snapshot cannot tell you how fast that happened, but it does tell you where the openings are today. A data scientist who searches only for "data scientist" sees a fraction of the roles that use their skills.</p>
      <p>The difference between the two jobs is mostly the deliverable. A data scientist's output is usually an analysis, or a model that informs a decision. An ML or AI engineer's output is a system that runs in production. If you have shipped models that other people depend on, you are qualified for more of the second list than its titles suggest.</p>

      <h2>What it pays</h2>
      <p>42 of the 181 listings publish a salary range, 23.2%, close to the board-wide rate of 20.5%. Their USD midpoints:</p>
      <ul>
        <li><strong>Lower quarter:</strong> $184,150</li>
        <li><strong>Median:</strong> $220,000</li>
        <li><strong>Upper quarter:</strong> $280,000</li>
      </ul>
      <p>The spread between the lower and upper quarter is wider than in software engineering or marketing on the same day, pulled up by research roles at AI companies. The only discipline with enough published ranges to quote on its own is machine learning and AI engineering: 21 ranges, with a median of $205,000. Research, data science and data engineering each have fewer than 10 published ranges, so a median for any of them would be an anecdote. The <a href="/tools/salary-band-estimator">salary band estimator</a> shows the spread with its sample size attached.</p>

      <h2>Junior roles are rare</h2>
      <p>4 of the 181 roles carry a junior, graduate, intern or entry-level title (2.2%), below the board-wide 3.6%. Senior titles account for 39 roles (21.5%) and staff, principal, lead or architect titles for another 39. Seven are management.</p>
      <p>The way in looks different from software engineering. Many data careers grow out of analysis, and data and BI analyst roles (14 here) are the most common first step. A quantitative background, a portfolio project that runs from messy data to a decision, and SQL you can use fluently will take you further than another course certificate. Our guide to <a href="/posts/upskilling-for-remote-work">upskilling for remote work</a> looks at which skills employers name in their listings.</p>

      <h2>Where the roles are</h2>
      <table>
        <thead><tr><th>Country</th><th>Roles</th><th>Share</th></tr></thead>
        <tbody>
          <tr><td>United States</td><td>99</td><td>54.7%</td></tr>
          <tr><td>United Kingdom</td><td>21</td><td>11.6%</td></tr>
          <tr><td>Spain</td><td>7</td><td>3.9%</td></tr>
          <tr><td>Malaysia</td><td>4</td><td>2.2%</td></tr>
          <tr><td>No country named</td><td>10</td><td>5.5%</td></tr>
        </tbody>
      </table>
      <p>The UK share, 11.6%, is higher than in software engineering (8.4%). India, South Korea, Serbia and Poland have 3 roles each. As in every field, "remote" almost always means remote within a named country.</p>

      <h2>Only five can be done from anywhere</h2>
      <p>5 of the 181 roles (2.8%) carry no location condition. Three are from HFT Architecture, which builds short-horizon price prediction and hires its research and machine learning roles from anywhere. One is a robotics ML role at Diligent Robotics and one is at Oddball.</p>
      <p>That is fewer, proportionally, than in software engineering (3.1%). One likely reason, though the listings do not say so, is that data work often touches personal or regulated data, and employers tend to keep it inside a jurisdiction they can audit.</p>

      <h2>Who is hiring</h2>
      <p>The 181 roles come from 118 employers. The top five (Inworld AI with 10, then Symantec, Windsurf, Character.AI and Preply with 5 each) hold 16.6% of them. The list leans heavily towards AI product companies, which fits the title split above. The median role was posted 26 days ago, and 25 of the 181 in the last week.</p>

      <h2>What to do with this</h2>
      <ol>
        <li><strong>Search the system titles as well as the analysis ones.</strong> If you build models, search "machine learning engineer" and "AI engineer", not only "data scientist". Our <a href="/tools/job-title-finder">job title finder</a> shows the titles employers use and how often.</li>
        <li><strong>Show production work.</strong> The largest group of roles wants systems that run, so a deployed project counts for more than a notebook.</li>
        <li><strong>Check the location line first.</strong> 97% of these roles are tied to a named country or region.</li>
        <li><strong>Use analyst roles as a way in</strong> if you are starting out. They are the most common entry point in this field.</li>
      </ol>
      <p>Compare this field with others in the <a href="/tools/remote-field-explorer">remote field explorer</a>, or read the companion guide on <a href="/posts/remote-software-engineering-jobs">remote software engineering jobs</a>.</p>

      <h2>How we counted</h2>
      <ul>
        <li>Figures are from the board on <strong>20 October 2026</strong>: 2,887 published listings, 181 of them data and machine learning roles.</li>
        <li><strong>Roles are identified by job title</strong>, not by the site's category filter. A listing counts if its title names a data engineer, scientist, analyst or architect, an analytics engineer, machine learning or an ML engineer, MLOps, an AI engineer, applied AI or an applied scientist, a research scientist or research engineer, NLP, computer vision, deep learning, LLMs, BI or business intelligence, a quantitative researcher or analyst, a statistician or a decision scientist. Data entry and data centre roles are excluded, as are sales and recruiting titles that mention data.</li>
        <li><strong>Pay covers only the 42 listings that publish a range</strong>, converted to a USD midpoint.</li>
        <li>Discipline and level are read from the title. Medians from fewer than 15 published ranges are not quoted.</li>
        <li>This is one board. Our <a href="/posts/how-we-source-and-verify-listings">sourcing method</a> sets out what is in and what is out. Counts change nightly; if a figure here disagrees with the board, the board is right.</li>
      </ul>
    `,
    faq: [
      {
        q: "How many remote data science and machine learning jobs are there?",
        a: "On our board on 20 October 2026 there were 181 remote data and machine learning roles from 118 employers, out of 2,887 listings (6.3% of the board). Machine learning and AI engineering titles were the largest group, with 69 roles.",
      },
      {
        q: "Are there more AI engineer or data scientist jobs?",
        a: "On our board on 20 October 2026, titles built around machine learning or AI engineering outnumbered data scientist titles 69 to 26. It is a single snapshot, so it does not show a trend, but it does mean a search for 'data scientist' alone misses most of the openings.",
      },
      {
        q: "What do remote machine learning engineers earn?",
        a: "Among the 21 machine learning and AI engineering listings that published a salary range on 20 October 2026, the median USD midpoint was $205,000. Across all 42 data and ML listings with published pay, the median was $220,000, with the middle half from $184,150 to $280,000. Most published ranges are from US employers.",
      },
      {
        q: "Can I get a remote data job from anywhere in the world?",
        a: "Rarely. Only 5 of the 181 data and machine learning roles on our board on 20 October 2026 had no country, region or time-zone condition, and three of those were from one employer. The rest were tied to a named country or region, most often the United States (55%) or the United Kingdom (12%).",
      },
    ],
  },
  {
    slug: "remote-marketing-jobs",
    title: "Remote Marketing Jobs: Why Two-Thirds of Titles Say Manager",
    description:
      "113 remote marketing roles on 20 October 2026, counted: why most titles say 'manager', what the roles pay, where they hire, and how few are open worldwide.",
    date: "2026-10-20T09:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Marketing Jobs", "Product Marketing", "Growth Marketing", "Marketing Manager", "Non-Tech Remote Jobs"],
    readMinutes: 6,
    html: `
      <p>This is a count of every remote marketing role open on getremotejobsnow.com on <strong>20 October 2026</strong>: <strong>113 roles from 91 employers</strong>, out of 2,887 remote listings. It is a snapshot taken from the listings themselves, and the board is rebuilt nightly.</p>

      <h2>A small field with a particular shape</h2>
      <p>113 roles is 3.9% of the board. Software engineering has 651 and data and machine learning 181. Marketing is a real but modest remote market, and it is spread thin: 91 employers for 113 roles, and no employer hiring more than four.</p>
      <p>By specialism (a title can name more than one, so the rows overlap):</p>
      <table>
        <thead><tr><th>Specialism (by title)</th><th>Roles</th></tr></thead>
        <tbody>
          <tr><td>Product marketing</td><td>28</td></tr>
          <tr><td>Growth, performance and paid</td><td>14</td></tr>
          <tr><td>Brand, communications, PR and social</td><td>14</td></tr>
          <tr><td>Content, SEO and copywriting</td><td>9</td></tr>
          <tr><td>Demand generation, lifecycle and email</td><td>6</td></tr>
          <tr><td>Field, partner and events</td><td>5</td></tr>
        </tbody>
      </table>
      <p>Product marketing is the largest specialism by a clear margin, which fits a board weighted towards software companies: every product that launches needs positioning, and positioning is what product marketers do. Content and SEO roles, often assumed to be the easiest marketing work to do remotely, number only 9.</p>

      <h2>Two-thirds of the titles say "manager"</h2>
      <p>75 of the 113 titles (66.4%) contain manager, head of, director, VP or chief. Across the whole board the figure is 24.3%. At first glance that looks like a field that only hires leaders, but the word means something different in marketing.</p>
      <p>In marketing, "manager" is the usual title for someone who owns a function, and that person often manages nobody. A Product Marketing Manager or a Demand Generation Manager is commonly an individual contributor responsible for a channel or a product line. If you skip every listing with "manager" in it because you have not run a team, you skip most of the field.</p>
      <p>The description tells you which kind of role it is. Phrases like "direct reports", "lead a team of" or "hire and develop" mean real people management. Words like "own", "drive" and "work cross-functionally" usually describe an individual role with a large remit.</p>

      <h2>What it pays</h2>
      <p>29 of the 113 listings publish a range (25.7%). Their USD midpoints:</p>
      <ul>
        <li><strong>Lower quarter:</strong> $92,500</li>
        <li><strong>Median:</strong> $157,500</li>
        <li><strong>Upper quarter:</strong> $170,000</li>
      </ul>
      <p>The roles titled manager or above are the only slice large enough to quote separately: 20 published ranges with a median of $158,750, almost the same as the field as a whole. That supports the point above, because in marketing a "manager" title is not a reliable signal of a higher pay band. Each specialism has 7 or fewer published ranges, so I won't put a number on any of them.</p>
      <p>The lower quarter, $92,500, is far below software engineering's $187,500, and the spread is wide. Marketing pay depends heavily on the channel and on whether the role carries revenue targets. The <a href="/tools/salary-band-estimator">salary band estimator</a> shows the spread with sample sizes.</p>

      <h2>Where the roles are</h2>
      <table>
        <thead><tr><th>Country</th><th>Roles</th><th>Share</th></tr></thead>
        <tbody>
          <tr><td>United States</td><td>74</td><td>65.5%</td></tr>
          <tr><td>Canada</td><td>9</td><td>8.0%</td></tr>
          <tr><td>United Kingdom</td><td>8</td><td>7.1%</td></tr>
          <tr><td>India</td><td>3</td><td>2.7%</td></tr>
          <tr><td>No country named</td><td>14</td><td>12.4%</td></tr>
        </tbody>
      </table>
      <p>Marketing is the most US-centred of the three fields we counted this month: 65.5% of roles are American, against 58.4% in software engineering and 54.7% in data and machine learning. Marketing is closely tied to a market, its language, culture and regulations, so employers tend to hire marketers who live in the market they sell to. That is reasoning rather than something the listings state, but it fits the numbers.</p>

      <h2>Three roles can be done from anywhere</h2>
      <p>Only 3 of the 113 (2.7%) carry no location condition: an influencer marketer at ElevenLabs, a part-time B2C marketing internship at Clera, and a director of solution and product marketing at Camunda. Three roles is not a market. If work-from-anywhere marketing is your goal, expect to build it as a freelancer or contractor, or through a company with a strong remote culture, rather than find it on a board. Our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a> covers that route, and the <a href="/tools/freelance-rate-calculator">freelance rate calculator</a> turns a target income into a day rate.</p>

      <h2>Getting in</h2>
      <p>7 roles (6.2%) carry a junior, associate, intern or entry-level title. That is above the board-wide 3.6%, and far above software engineering's 0.8%, which makes marketing one of the more open remote fields for people early in their career. The few junior roles that publish pay are low, though, and several are part-time or internships.</p>
      <p>The most useful thing you can bring is evidence. A remote marketing team is hiring someone who will report results in writing, often across time zones, so a short case study with the numbers (what you tried, what it cost, what it moved) does more than a list of tools. Our guide to <a href="/posts/best-remote-jobs-without-tech-background-2026">remote jobs without a tech background</a> covers the neighbouring fields.</p>

      <h2>What to do with this</h2>
      <ol>
        <li><strong>Don't filter out "manager" titles.</strong> Read the description for direct reports before you decide a role is too senior for you.</li>
        <li><strong>Search product marketing</strong> if you have any product or B2B experience. It is the largest specialism.</li>
        <li><strong>Expect a country requirement.</strong> 97% of these roles have one, and two-thirds are in the US.</li>
        <li><strong>Lead with measured results</strong> in your application, written the way you would write a report.</li>
      </ol>
      <p>The <a href="/tools/remote-field-explorer">remote field explorer</a> compares marketing with the other fields on the board.</p>

      <h2>How we counted</h2>
      <ul>
        <li>Figures are from the board on <strong>20 October 2026</strong>: 2,887 published listings, 113 of them marketing roles.</li>
        <li><strong>Roles are identified by job title</strong>, not by the site's category filter. A listing counts if its title names marketing or a marketer, growth, demand generation, content, SEO, SEM, PPC, paid media, social media, a community manager, a brand manager, lifecycle or email marketing, a copywriter, communications or public relations. Engineers and data scientists who build marketing systems are excluded (they share the word, not the job), as are sales development roles.</li>
        <li><strong>Pay covers only the 29 listings that publish a range</strong>, converted to a USD midpoint.</li>
        <li>"Manager or above" means the title contains manager, head of, director, VP or chief. It says nothing about whether the role manages people, which is the point of the section above.</li>
        <li>Medians from fewer than 15 published ranges are not quoted.</li>
        <li>This is one board. Our <a href="/posts/how-we-source-and-verify-listings">sourcing method</a> sets out what is in and what is out. Counts change nightly; if a figure here disagrees with the board, the board is right.</li>
      </ul>
    `,
    faq: [
      {
        q: "How many remote marketing jobs are there?",
        a: "On our board on 20 October 2026 there were 113 remote marketing roles from 91 employers, out of 2,887 listings (3.9% of the board). Product marketing was the largest specialism, with 28 roles.",
      },
      {
        q: "Do remote marketing manager jobs require managing a team?",
        a: "Often not. In marketing, 'manager' is the usual title for someone who owns a channel or a product line, and many of those roles have no direct reports. Check the description for phrases like 'direct reports' or 'lead a team' before assuming a manager title means people management.",
      },
      {
        q: "What do remote marketing jobs pay?",
        a: "Among the 29 remote marketing listings that published a salary range on 20 October 2026, the median USD midpoint was $157,500, with the middle half from $92,500 to $170,000. Most published ranges come from US employers, so treat this as a guide to US-based roles.",
      },
      {
        q: "Can I do a remote marketing job from anywhere?",
        a: "It is rare. Only 3 of the 113 remote marketing roles on our board on 20 October 2026 had no country, region or time-zone condition. Work-from-anywhere marketing is more often built as freelance or contract work than found as a salaried job.",
      },
    ],
  },
  {
    slug: "remote-job-interview-questions",
    title: "Remote Job Interview Questions: What They Test and How to Answer",
    description:
      "The questions remote employers ask that office interviews don't, what each one is testing, how to answer well, and the questions to ask them back.",
    date: "2026-10-20T09:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Job Interview", "Interview Questions", "Remote Work Skills", "Async Communication", "Job Search"],
    readMinutes: 9,
    html: `
      <p>Most of a remote interview is the same as any other: can you do the work, and will you work well with this team? But remote employers have a second question that an office interview rarely asks out loud. Can you do the work when nobody is watching, and will they be able to tell? The questions below are the ones that probe it. For each, this guide sets out what the interviewer is trying to learn, what a strong answer contains, and what makes an answer weak.</p>

      <h2>What a remote interview is testing</h2>
      <p>Strip away the wording and nearly every remote-specific question checks one of four things:</p>
      <ul>
        <li><strong>Self-direction.</strong> Do you move work forward without someone to ask in person?</li>
        <li><strong>Written communication.</strong> Can a colleague eight hours away understand your update without a follow-up call?</li>
        <li><strong>Reliability at a distance.</strong> Will you be available when you said you would, and raise problems early?</li>
        <li><strong>Self-management.</strong> Will you look after your hours, your setup and yourself, so the arrangement lasts?</li>
      </ul>
      <p>Keep those four in mind and you can handle questions you have never seen before, because you will know what each question is for.</p>

      <h2>The questions, and how to answer them</h2>

      <h3>1. "Why do you want to work remotely?"</h3>
      <p><strong>What it tests:</strong> whether you want the job or only the arrangement.</p>
      <p><strong>A strong answer</strong> connects remote work to doing better work: longer stretches of focus, a schedule that fits when you think best, experience working with distributed colleagues. Then it turns quickly to why this role and this team.</p>
      <p><strong>A weak answer</strong> is only about you: no commute, more time at home, the freedom to travel. All true and all reasonable, but they tell the employer what you get and nothing about what they get.</p>

      <h3>2. "Tell me about a time you were blocked and nobody was online to help."</h3>
      <p><strong>What it tests:</strong> self-direction, and how you behave when the usual route is closed.</p>
      <p><strong>A strong answer</strong> shows three moves. You looked for the answer yourself, in documentation, past discussions or the work itself. You wrote the question down clearly, so whoever came online first could answer it quickly. And you switched to other useful work instead of waiting. It is even better if you then wrote the answer up, so the next person was not blocked by the same thing.</p>
      <p><strong>A weak answer</strong> is "I'd message my manager", which describes an office habit, or "I'd figure it out", which skips the part where you communicate.</p>

      <h3>3. "How do you keep your team updated on your progress?"</h3>
      <p><strong>What it tests:</strong> written communication and visibility.</p>
      <p><strong>A strong answer</strong> describes a habit rather than an intention: a short written update at a regular point, end of day or end of week, covering what you finished, what you are stuck on and what comes next. If you can, describe one you actually wrote. An anonymised example is very persuasive.</p>
      <p><strong>A weak answer</strong> is "I over-communicate". Almost everyone says it, and on a remote team, communication without structure is noise.</p>

      <h3>4. "Describe a disagreement you resolved in writing."</h3>
      <p><strong>What it tests:</strong> whether you can handle friction without a meeting, which is where remote teams most often go wrong.</p>
      <p><strong>A strong answer</strong> shows that you stated the other person's position fairly before your own, kept the discussion on the decision rather than the person, proposed a way forward, and recognised when to move to a call because writing was making it worse.</p>
      <p><strong>A weak answer</strong> either avoids the conflict ("I just went along with it") or treats the written thread as something to win.</p>

      <h3>5. "What hours can you reliably work with the team?"</h3>
      <p><strong>What it tests:</strong> logistics, and how honest you are about them.</p>
      <p><strong>A strong answer</strong> gives specific hours, in UTC or the team's time zone, and the number of overlapping hours you can commit to each week. "I can cover 14:00 to 18:00 UTC every weekday" is something they can plan around.</p>
      <p><strong>A weak answer</strong> is "I'm flexible", which sounds accommodating and tells them nothing. Our guide to <a href="/posts/timezone-overlap-how-much-you-need">how much time-zone overlap you need</a> explains what employers usually look for, and the <a href="/tools/timezone-overlap">overlap calculator</a> gives you the numbers.</p>

      <h3>6. "Where are you based, and are you eligible to work there?"</h3>
      <p><strong>What it tests:</strong> whether they can legally employ you at all. This is often the first screening question, and it ends more remote applications than any other.</p>
      <p><strong>A strong answer</strong> is exact: your country, your right to work there, and whether hiring you would need an employer of record or a contractor arrangement. If the role names countries and yours is not among them, say so plainly and ask whether they can hire through an employer of record. Our guide to <a href="/posts/contractor-employee-or-employer-of-record">contractor, employee or employer of record</a> explains the options.</p>

      <h3>7. "Walk me through your work setup."</h3>
      <p><strong>What it tests:</strong> whether you have thought about the practical side, and what happens when it fails.</p>
      <p><strong>A strong answer</strong> covers a quiet space where you can take calls, a reliable connection, and a backup plan if it drops, such as a phone you can tether or a coworking space nearby. If the role handles customer data, mention your security habits: disk encryption, a password manager, and work and personal accounts kept apart.</p>

      <h3>8. "Have you worked across time zones? How did you handle handovers?"</h3>
      <p><strong>What it tests:</strong> whether you understand asynchronous work in practice.</p>
      <p><strong>A strong answer</strong> describes a concrete handover, written at the end of your day, saying what is done, what is blocked and what the next person should pick up first. If you have not worked across time zones, say so and describe how you would go about it. Being honest about a gap beats a vague claim.</p>

      <h3>9. "How do you avoid burning out or feeling isolated?"</h3>
      <p><strong>What it tests:</strong> whether the arrangement will last. Remote teams lose people to isolation more often than to the work itself.</p>
      <p><strong>A strong answer</strong> names habits you actually keep: a clear end to the working day, notifications off outside agreed hours, regular contact with people outside work. Our guide to <a href="/posts/working-across-timezones-without-burning-out">working across time zones without burning out</a> has practical ones.</p>

      <h3>10. "How do you prioritise when everything seems urgent?"</h3>
      <p><strong>What it tests:</strong> judgement, without a manager in the room to arbitrate.</p>
      <p><strong>A strong answer</strong> explains how you decide (impact, deadlines, who is waiting on you), how you make the decision visible ("I'm doing X before Y; tell me if that's wrong"), and when you escalate.</p>

      <h2>The stages office interviews don't have</h2>
      <p>Remote hiring often adds steps that test the skills above directly.</p>
      <ul>
        <li><strong>Written questions in the application.</strong> These are frequently the real first interview. Answer them as carefully as you would answer on a call: specific, concise and in plain language.</li>
        <li><strong>Take-home exercises.</strong> Ask how long the employer expects it to take and keep to it, noting in your submission what you would do with more time. A multi-day unpaid task is a warning sign, and some good employers pay for longer exercises.</li>
        <li><strong>Recorded video answers.</strong> Keep them short and look at the camera rather than your own image. Have notes, but don't read from them.</li>
        <li><strong>Paid trial work.</strong> Some fully distributed companies run a short paid trial. Treat it as the job: communicate in the open, ask good questions and deliver what you said you would.</li>
      </ul>

      <h2>Questions to ask them</h2>
      <p>A remote interview is your best chance to find out whether the job is really remote and well run. These questions reveal a great deal:</p>
      <ul>
        <li><strong>"How are decisions made and recorded?"</strong> A team that writes decisions down is set up for remote work. One that decides in meetings will leave you out of the loop.</li>
        <li><strong>"What hours does the team overlap, and how much of the week is in meetings?"</strong></li>
        <li><strong>"What does the first month look like for a new hire?"</strong> A vague answer predicts a hard start.</li>
        <li><strong>"How is performance measured?"</strong> You want to hear about outcomes, not hours online.</li>
        <li><strong>"Does anyone else on the team work from another country?"</strong> If everyone else shares one office, you will be the exception.</li>
        <li><strong>"Is there an equipment or home-office budget?"</strong></li>
      </ul>
      <p>The answers also catch roles that are remote in name only. Our guide to <a href="/posts/how-to-spot-hybrid-bait-in-remote-job-descriptions">hybrid bait</a> covers the warning signs, and <a href="/posts/how-to-tell-if-a-company-is-truly-distributed">how to tell if a company is truly distributed</a> goes further.</p>

      <h2>On the call itself</h2>
      <p>Treat the logistics as part of the interview, because the interviewer will. Confirm the time in both time zones in writing the day before, since missing an interview over a daylight-saving change is a poor first impression. Test your audio: people forgive a weak picture far more readily than bad sound. Keep a phone ready in case the connection drops, and if it does, message straight away rather than waiting. Our guide to <a href="/posts/remote-job-interviews-across-time-zones">interviewing across time zones</a> covers the scheduling in detail.</p>
    `,
    faq: [
      {
        q: "What are the most common remote job interview questions?",
        a: "Beyond questions about the work itself, remote employers commonly ask why you want to work remotely, how you stay productive without supervision, how you keep the team updated, what hours you can overlap with the team, where you are based and whether you are eligible to work there, and how you avoid burnout and isolation.",
      },
      {
        q: "How do I answer 'Why do you want to work remotely?'",
        a: "Connect remote work to doing better work, such as longer focus time or experience with distributed teams, then move on to why you want this particular role. Answers that are only about personal benefits, such as no commute, tell the employer what you gain but not what they gain.",
      },
      {
        q: "Should I do an unpaid take-home assignment?",
        a: "A short, clearly scoped exercise is a normal part of remote hiring. Ask how long it should take and keep to that. A task that would take several days unpaid is a warning sign, and some employers pay for longer exercises.",
      },
      {
        q: "What should I ask in a remote job interview?",
        a: "Ask how decisions are made and recorded, how many hours the team overlaps, what the first month looks like for a new hire, how performance is measured, and whether anyone else on the team works from another country. The answers show whether the role is remote in practice and how well the team runs.",
      },
    ],
  },
  {
    slug: "first-90-days-in-a-remote-job",
    title: "Your First 90 Days in a Remote Job: A Week-by-Week Plan",
    description:
      "How to start a remote job well: what to settle before day one, what to do in your first week and month, and how to make your work visible by day 90.",
    date: "2026-10-20T09:00:00.000Z",
    author: "Bhargav",
    tags: ["Remote Onboarding", "First Remote Job", "Remote Work Tips", "Working Remotely", "Career Advice"],
    readMinutes: 7,
    html: `
      <p>Starting a remote job is harder than starting an office job in one specific way. In an office you learn by being near people: you overhear how decisions get made, you see who everyone goes to with questions, and your manager sees you working. Remotely, none of that happens unless you arrange it. The first 90 days are when you build the habits and the reputation the rest of the job runs on, and most of it is within your control.</p>
      <p>This is a practical plan, from the week before you start to the end of your third month.</p>

      <h2>Before day one</h2>
      <p>A remote first day goes wrong in small, avoidable ways: a laptop that has not arrived, an account nobody set up, a welcome call at 03:00 your time. A short message to your manager or recruiter the week before prevents most of them. Ask:</p>
      <ul>
        <li>Has the equipment shipped, and who do I contact if it hasn't arrived?</li>
        <li>What will I have access to on day one, and who sets it up?</li>
        <li>What is the plan for my first week, and when are those calls in my time zone?</li>
        <li>Apart from you, who is my main contact for questions?</li>
      </ul>
      <p>Set up your workspace before day one rather than during it: a quiet place for calls, a connection you have tested, and basic security in place. Our guide to <a href="/posts/cost-of-working-from-home-by-country">what working from home really costs</a> includes a setup checklist.</p>

      <h2>Week one: read, ask, write things down</h2>
      <p>Your job in the first week is to learn how this team works, not to prove yourself.</p>
      <ul>
        <li><strong>Read before you ask.</strong> Remote teams that work well keep a lot in writing: handbooks, decision records, project documents. Reading them first makes your questions better, and it shows you respect other people's time.</li>
        <li><strong>Keep a running list of questions</strong> and send them in batches rather than one by one as they occur to you. Ask anything that is blocking you straight away.</li>
        <li><strong>Agree working arrangements with your manager.</strong> In one conversation, settle your working hours, the hours you overlap with the team, how quickly people expect replies, and how to flag that you are stuck. Then send a short written summary back. It prevents misunderstandings later, and it demonstrates exactly the written habits a remote manager hopes to see. Our guide to <a href="/posts/setting-expectations-distributed-teams">setting expectations on a distributed team</a> covers what to agree.</li>
        <li><strong>Ship something small.</strong> A fix, a documentation correction, any small piece of real work. Finishing something early builds confidence on both sides.</li>
      </ul>

      <h2>Weeks two to four: arrange the relationships an office would give you</h2>
      <p>In an office, relationships form as a side effect of sharing a space. Remotely, you have to set them up.</p>
      <ul>
        <li><strong>Book short introduction calls</strong>, around 20 minutes each, with the people you will work with most and a few you won't. Ask what they work on, what they wish new people knew, and how they prefer to be contacted. Most people are glad to be asked.</li>
        <li><strong>Work out who decides what.</strong> Org charts rarely show it. Notice who answers questions in the shared channels and whose view others defer to.</li>
        <li><strong>Start a weekly written update</strong> to your manager: what you did, what is next, where you need help. Keep it short. It makes your work visible without adding meetings.</li>
        <li><strong>Learn the team's rhythm.</strong> What counts as urgent, what can wait until tomorrow, which channel is for what. Copy what experienced colleagues do before inventing habits of your own.</li>
      </ul>

      <h2>Months two and three: own something and make it visible</h2>
      <p>By the second month, move from learning to owning.</p>
      <ul>
        <li><strong>Take on a piece of work from start to finish</strong>, with a clear outcome you can point to. It becomes the evidence of what you can do.</li>
        <li><strong>Write up what you ship.</strong> Short notes on what you delivered and why, posted where your team reads. On a remote team, work nobody sees might as well not have happened, so this is part of the job rather than self-promotion.</li>
        <li><strong>Ask for feedback directly</strong> at around 30, 60 and 90 days. Remote managers give less unprompted feedback than office ones, because they see less of your work. A specific question gets a useful answer: "What should I do more of, and less of?"</li>
        <li><strong>Agree what success looks like</strong> for the next six months, in writing, so your first review is measured against something you both signed up to.</li>
      </ul>

      <h2>Common traps</h2>
      <ul>
        <li><strong>Staying invisible.</strong> Doing good work quietly and assuming it will be noticed. Remotely, it often isn't.</li>
        <li><strong>Always being online</strong> to make up for not being seen. It wears you down and sets an expectation you can't keep. Our guide to <a href="/posts/working-across-timezones-without-burning-out">working across time zones without burning out</a> has better habits.</li>
        <li><strong>Asking nothing</strong> to avoid looking slow. New starters who ask good questions early get up to speed faster than those who struggle alone.</li>
        <li><strong>Reading tone into text.</strong> Written messages come across colder than they are meant. Assume good intent, and switch to a quick call when a thread is going badly.</li>
      </ul>

      <h2>If onboarding is thin</h2>
      <p>Plenty of companies, good ones included, run thin onboarding for remote hires. If yours does, run it yourself. Ask your manager for a named person to direct questions to, build your own list of key documents and people, and write down what you learn as you go. That last habit pays twice: it helps you now, and if you share it, it helps the next person who joins, which is the kind of contribution remote teams remember.</p>
      <p>If you are still looking for that first remote role, our guides to <a href="/posts/remote-job-interview-questions">remote interview questions</a> and <a href="/posts/first-remote-job-2026-no-experience">getting a first remote job</a> cover the steps before day one.</p>
    `,
    faq: [
      {
        q: "How long does it take to settle into a remote job?",
        a: "There is no fixed answer, but plan on the first three months to learn how the team works and to own a first piece of work end to end. It can take longer than in an office, because the informal learning that happens by sitting near colleagues has to be arranged on purpose.",
      },
      {
        q: "How do I make a good impression in a new remote job?",
        a: "Read the team's documentation before asking questions, agree your working hours and communication expectations with your manager in writing, ship something small in the first week, and send a short weekly written update. On a remote team, visible and reliable written work is what builds a reputation.",
      },
      {
        q: "How do I build relationships with remote colleagues?",
        a: "Arrange them deliberately. Book short introduction calls with the people you will work with, ask what they work on and how they prefer to be contacted, and keep in touch through regular informal contact rather than only through work threads.",
      },
      {
        q: "What should I do if my remote onboarding is poor?",
        a: "Run it yourself. Ask your manager for a named person to direct questions to, make your own list of key documents and contacts, and write down what you learn as you go. Sharing those notes also helps the next new starter.",
      },
    ],
  },
];
