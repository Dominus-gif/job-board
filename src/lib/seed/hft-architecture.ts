/**
 * HFT Architecture — an employer that submitted roles directly for the board.
 *
 * Unlike NordHarton (a featured partner synced nightly from its careers page),
 * these five roles were sent to us as copy, so they live here as data rather
 * than being scraped. They are ordinary listings — not pinned/featured — built
 * the same way the pipeline builds any job, with:
 *   - source "manual", so ingest never tries to poll an ATS board for them;
 *   - scope "worldwide", because every role is stated as open from anywhere in
 *     the world with no country, region or time-zone condition;
 *   - has_full_description true, because the copy below IS the whole posting —
 *     there is no longer version on an ATS to fetch and merge.
 *
 * The apply links carry the employer's own ?utm_source=getremotejobsnow
 * attribution, which cleanApplyUrl() keeps (it only strips OTHER sites' tags).
 *
 * To update: edit ROLES. To remove a role, delete its entry.
 */
import type { Category, Company, Job, RawJob } from "../types";
import { toPublishedJob } from "../pipeline";

export const HFT_COMPANY: Company = {
  slug: "hft-architecture",
  name: "HFT Architecture",
  domain: "hftarchitecture.com",
  logo: "https://logo.clearbit.com/hftarchitecture.com",
  description:
    "Builds short-horizon price prediction and the trading system around it: forecasting, data pipelines, low-latency connectivity and the tools to run it.",
  about:
    "HFT Architecture builds short-horizon price prediction and the trading system around it — forecasts of the next mid-price move from order-book data, the pipeline that turns raw records into validated models, the low-latency path that carries market data in and orders out, and the interfaces to control and replay all of it. It hires fully remote, from anywhere in the world, across quantitative research, machine learning, and backend and frontend engineering. Every role here links to the company's own careers page, which is where you apply.",
  headquarters: "All-remote",
};

interface Role {
  slug: string;
  title: string;
  category: Category;
  level: string;
  salaryRaw: string;
  /** What the role works on (the "This role…" paragraph). */
  summary: string;
  /** The "You have…" expectations, as full sentences. */
  need: string;
  /** The role-specific application instruction. */
  apply: string;
}

/**
 * The company's one-line framing, prepended to every role so each listing stands
 * on its own as a search result rather than opening on role-specific detail.
 */
const INTRO = "HFT Architecture builds short-horizon price prediction and the trading system around it.";

const ROLES: Role[] = [
  {
    slug: "quantitative-researcher",
    title: "Quantitative Researcher",
    category: "Backend",
    level: "Middle+ to senior",
    salaryRaw: "USD 220,000 - 300,000 a year",
    summary:
      "This role works on the prediction: forecasts of the next mid-price move from order-book data, one market and one horizon at a time, shown out of sample with leakage controls and embargoed walk-forward validation.",
    need:
      "You have carried research on market data from a question to a result somebody else could check, use statistics you can defend, write Python, and know how an order book works: levels, queue, spread, and what a fill costs.",
    apply:
      "Send a link to your résumé, LinkedIn or GitHub, and an answer to one question about our article on Binance to Bybit latency arbitrage. No file, no cover letter.",
  },
  {
    slug: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    category: "Backend",
    level: "Middle+ to senior",
    salaryRaw: "USD 180,000 - 240,000 a year",
    summary:
      "This role builds the pipeline from raw order-book records to a fitted, validated model: data preparation, features, training and out-of-sample measurement, reproducible run to run, with leakage controls built in.",
    need:
      "You have built and run machine learning systems yourself, write Python with tests and versioned data, handle time series without leakage, and work with tens of millions of rows a day on ordinary hardware.",
    apply:
      'Send a link to your résumé, LinkedIn or GitHub, and an answer to one question about our article "Why Your Market Maker Loses Money". No file, no cover letter.',
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    category: "Backend",
    level: "Middle+ to senior",
    salaryRaw: "USD 165,000 - 210,000 a year",
    summary:
      "This role builds the part that carries data in and orders out: market-data connectors that turn an exchange feed into a correct order book, the hot path from a market event to an order, and the control and replay path beside it.",
    need:
      "You have built and run backend systems in production where being late or wrong had a cost, know a systems language well, handle sockets, WebSocket and REST feeds, reconnects and sequence gaps, and measure before you optimise.",
    apply:
      "Send a link to your résumé, LinkedIn or GitHub, and one sentence on any of our articles. No file, no cover letter.",
  },
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    category: "Frontend",
    level: "Middle+ to senior",
    salaryRaw: "USD 150,000 - 190,000 a year",
    summary:
      "This role builds what people look at beside the trading path: control, oversight, replay and dashboards, with dense charts and tables drawn so the numbers can be read.",
    need:
      "You have shipped web interfaces with real data behind them, know TypeScript and one modern framework in depth, draw data by hand in SVG or canvas, and have measured rendering performance on streaming data.",
    apply:
      "Send a link to your résumé, LinkedIn or GitHub, and one sentence on any of our articles. No file, no cover letter.",
  },
  {
    slug: "junior-machine-learning-engineer",
    title: "Junior Machine Learning Engineer",
    category: "Backend",
    level: "Junior",
    salaryRaw: "USD 125,000 - 155,000 a year",
    summary:
      "This role works on the pipeline that turns order-book records into validated models, next to more experienced engineers: data preparation, experiments end to end, and the checks that keep the future out of a training set.",
    need:
      "You write Python every day, with tests; can explain the machine learning basics, including why ordinary cross-validation breaks on time series; and have one project of your own you can show and talk through.",
    apply:
      "Send a link to your résumé, LinkedIn or GitHub, and one sentence on any of our articles. No file, no cover letter.",
  },
];

/** Posted the day the employer submitted them. */
const POSTED_AT = "2026-10-15T00:00:00.000Z";
const CAMPAIGN = "utm_source=getremotejobsnow&utm_medium=jobboard&utm_campaign=careers-2026-10";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function descriptionOf(role: Role): string {
  return [
    `<p>${esc(INTRO)} ${esc(role.summary)}</p>`,
    `<p>This is a fully remote role open worldwide, with no country, region or time-zone requirement. Level: ${esc(role.level)}. Base salary: ${esc(role.salaryRaw)}.</p>`,
    `<h3>What you bring</h3>`,
    `<p>${esc(role.need)}</p>`,
    `<h3>How to apply</h3>`,
    `<p>${esc(role.apply)} Apply on the HFT Architecture careers page.</p>`,
  ].join("");
}

function toJob(role: Role): Job {
  const raw: RawJob = {
    external_id: `manual:hft-architecture:${role.slug}`,
    provider: "greenhouse", // placeholder for the pipeline; overridden to "manual" below
    company_name: "HFT Architecture",
    company_domain: "hftarchitecture.com",
    title: role.title,
    apply_url: `https://hftarchitecture.com/careers/${role.slug}?${CAMPAIGN}`,
    location_raw: "Remote · Worldwide",
    employment_type: "Full-Time",
    posted_at: POSTED_AT,
    salary_raw: role.salaryRaw,
    description_html: descriptionOf(role),
  };
  return {
    ...toPublishedJob(raw, { scope: "worldwide" }),
    source: "manual",
    provider: undefined,
    board_token: undefined,
    ats_job_id: undefined,
    is_featured: false,
    has_full_description: true,
    // Keep the employer's chosen category rather than the keyword classifier's,
    // which has no bucket for quant/ML and would file them under "Product".
    category: role.category,
  };
}

/** The five HFT Architecture listings. */
export const HFT_JOBS: Job[] = ROLES.map(toJob);
