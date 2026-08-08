/**
 * NordHarton — a hand-curated, featured partner company (spec: manual / paid
 * placement). Not an ATS board we scrape; these listings are authored from
 * https://nordharton.com/careers and injected as always-present, featured jobs
 * so they pin to the top of their board and get their own indexable job pages.
 *
 * Scope is set honestly: only the truly global role lives on the worldwide
 * board; the timezone-restricted roles go to the regional board. This keeps the
 * site's "every worldwide job is truly location-independent" promise intact
 * while still giving NordHarton a featured presence.
 */
import type { Company, Job, RawJob } from "../types";
import { toPublishedJob } from "../pipeline";

const DAY = 24 * 60 * 60 * 1000;
const daysAgo = (n: number) => new Date(Date.now() - n * DAY).toISOString();

export const NORDHARTON_COMPANY: Company = {
  slug: "nordharton",
  name: "NordHarton",
  domain: "nordharton.com",
  logo: "https://logo.clearbit.com/nordharton.com",
  description: "Senior, fully-remote engineering studio building complex systems designed for scale.",
  about:
    "NordHarton is a senior, fully-remote company where complex business needs meet elegant engineering. Founded in 2011, we're a completely distributed team of 100–200 people, with no office anywhere. We partner with enterprise clients to turn hard, high-stakes problems into calm, scalable software — the kind of infrastructure and product work that's boring in the best way, because it just works and nobody has to think about it. We're actively hiring across engineering, platform, and design.",
  founded: 2011,
  employees: "100–200",
  headquarters: "All-remote",
};

interface Seed {
  raw: RawJob;
  scope: Job["scope"];
  region?: string;
  category: Job["category"];
}

const SEEDS: Seed[] = [
  {
    scope: "worldwide",
    category: "DevOps",
    raw: {
      external_id: "manual:nordharton:cloud-infrastructure-engineer",
      provider: "greenhouse", // placeholder; overridden to source:"manual" below
      company_name: "NordHarton",
      company_domain: "nordharton.com",
      title: "Cloud & Infrastructure Engineer",
      apply_url: "https://nordharton.com/careers",
      location_raw: "Remote — Anywhere in the World",
      employment_type: "Full-Time",
      posted_at: daysAgo(21),
      salary_raw: "$125k–$165k + equity",
      description_html:
        "<p>You'll build the scalable, cost-predictable foundation our client platforms run on — the kind of infrastructure that's boring in the best way, because it just works and nobody has to think about it.</p>" +
        "<p>This is a fully remote, work-from-anywhere role on our Platform team (team of 4). No country, region, or timezone restriction — we hire globally and work asynchronously.</p>" +
        "<h3>What you'll do</h3><ul>" +
        "<li>Design and run our infrastructure on <strong>AWS</strong> and <strong>GCP</strong> with <strong>Terraform</strong> as the single source of truth.</li>" +
        "<li>Own containerized workloads on <strong>Kubernetes</strong> and <strong>Docker</strong>, and keep our <strong>CI/CD</strong> (GitHub Actions) fast and reliable.</li>" +
        "<li>Tune <strong>PostgreSQL</strong> and Redis for scale, cost, and predictable latency.</li>" +
        "<li>Make the platform observable and self-healing so on-call is quiet.</li></ul>" +
        "<h3>What we offer</h3><ul>" +
        "<li>Home office / equipment budget and a yearly learning budget for courses and conferences.</li>" +
        "<li>Meaningful equity / stock options.</li>" +
        "<li>Health insurance and unlimited PTO.</li></ul>",
    },
  },
  {
    scope: "regional",
    region: "Europe & Americas",
    category: "Fullstack",
    raw: {
      external_id: "manual:nordharton:senior-full-stack-engineer",
      provider: "greenhouse",
      company_name: "NordHarton",
      company_domain: "nordharton.com",
      title: "Senior Full-Stack Engineer",
      apply_url: "https://nordharton.com/careers",
      location_raw: "Remote (Europe / Americas timezones)",
      employment_type: "Full-Time",
      posted_at: daysAgo(14),
      salary_raw: "$130k–$170k + equity",
      description_html:
        "<p>We're looking for a senior engineer who's happiest shipping real features to real users — someone who can own a slice of a product end to end, from the database schema to the last pixel, and who cares as much about the empty state as the happy path.</p>" +
        "<p>Remote within European and Americas timezones (we need a few hours of daily overlap with the Product Engineering team of 6).</p>" +
        "<h3>Our stack</h3><ul>" +
        "<li><strong>TypeScript</strong> everywhere — <strong>React</strong> and <strong>Next.js</strong> on the front end, <strong>Node.js</strong> services on the back.</li>" +
        "<li><strong>PostgreSQL</strong>, <strong>GraphQL</strong>, and a <strong>Tailwind</strong> design system.</li>" +
        "<li>Thoughtful tests, real code review, and fast CI/CD.</li></ul>" +
        "<h3>What we offer</h3><ul>" +
        "<li>Equipment budget and a learning budget for professional development.</li>" +
        "<li>Equity / stock options and health insurance.</li></ul>",
    },
  },
  {
    scope: "regional",
    region: "Europe & Americas",
    category: "Design",
    raw: {
      external_id: "manual:nordharton:product-designer-enterprise-ux",
      provider: "greenhouse",
      company_name: "NordHarton",
      company_domain: "nordharton.com",
      title: "Product Designer (Enterprise UX)",
      apply_url: "https://nordharton.com/careers",
      location_raw: "Remote (Europe / Americas timezones)",
      employment_type: "Full-Time",
      posted_at: daysAgo(5),
      salary_raw: "$110k–$145k + equity",
      description_html:
        "<p>Enterprise software has a reputation for being ugly and confusing. We're looking for a designer who takes that personally — someone who can make genuinely complex, data-dense products feel calm, obvious, and even pleasant to use.</p>" +
        "<p>Remote within European and Americas timezones, joining our Design team of 3.</p>" +
        "<h3>What you'll do</h3><ul>" +
        "<li>Own end-to-end product design (UX and UI) for complex enterprise workflows in <strong>Figma</strong>.</li>" +
        "<li>Turn dense requirements into clear information architecture and interaction design.</li>" +
        "<li>Partner closely with engineering to ship, not just to mock up.</li></ul>" +
        "<h3>What we offer</h3><ul>" +
        "<li>Equipment budget and a learning budget for courses and conferences.</li>" +
        "<li>Equity / stock options and health insurance.</li></ul>",
    },
  },
];

/**
 * Fully-published, featured NordHarton jobs. Built through the normal enrichment
 * pipeline (skills / benefits / salary / category), then flagged as manual and
 * featured. Evaluated once per process, so `posted_at` stays fresh on each boot.
 */
export const NORDHARTON_JOBS: Job[] = SEEDS.map(({ raw, scope, region, category }) => ({
  ...toPublishedJob(raw, { scope, region }),
  source: "manual",
  provider: undefined,
  board_token: undefined,
  ats_job_id: undefined,
  is_featured: true,
  category,
}));
