/**
 * Landing-page resolver.
 *
 * A single dynamic route (`/[landing]`) renders every filtered view:
 *   - /remote-<category>-jobs        (9 categories)
 *   - /remote-<skill>-jobs           (any skill present in live jobs)
 *   - a curated set of SEO landing pages with bespoke copy + FAQ
 *
 * Each resolves to a `LandingView`: a title, intro, the filtered jobs, and a
 * unique FAQ block (SEO requirement — every landing page has its own FAQ).
 */
import type { Job } from "./types";
import { CATEGORIES, categoryToSlug, CATEGORY_INTRO, slugToCategory } from "./taxonomy";
import {
  getAllJobs,
  getAllSkills,
  getJobsByBenefit,
  getJobsByCategory,
  getJobsBySkill,
  getJobsByEmploymentType,
  getJobsWhere,
  getRegionalJobs,
} from "./db";
import { jobRegions } from "./region";
import { toText } from "./pipeline/text";

export interface FaqItem {
  q: string;
  a: string;
}

export interface LandingView {
  slug: string;
  title: string; // <h1>
  metaTitle: string;
  metaDescription: string;
  intro: string;
  jobs: Job[];
  faq: FaqItem[];
  rss: string; // path to this view's RSS feed
}

const BASE_FAQ: FaqItem[] = [
  {
    q: "Are these jobs really open to people anywhere in the world?",
    a: "Yes. Every listing passes our strict Work-From-Anywhere filter, which rejects any role that names a required country, state, city, work-authorization, or timezone-overlap requirement. If a job says 'US only' or 'must overlap EST', it never reaches this page.",
  },
  {
    q: "Do I have to pay to apply?",
    a: "Never. Applying is always free. A legitimate employer will never ask you to pay to apply or to buy your own equipment upfront. Treat any such request as a scam.",
  },
];

/** SEO landing pages with bespoke copy + FAQ (spec section 4). */
const SEO_PAGES: Record<string, Omit<LandingView, "jobs" | "rss">> = {
  "work-from-home-jobs": {
    slug: "work-from-home-jobs",
    title: "Work From Home Jobs — From Anywhere on Earth",
    metaTitle: "Work From Home Jobs (Truly Anywhere) | getremotejobsnow.com",
    metaDescription:
      "Browse work-from-home jobs with zero location restriction. Every role is genuinely remote worldwide — no country or timezone gate.",
    intro:
      "Not just 'work from home' — work from anywhere. These roles have no home base, no required country, and no timezone you must live in. Your kitchen table, a cabin, or a beach: all fine.",
    faq: [
      {
        q: "How is this different from other work-from-home boards?",
        a: "Most 'remote' boards still list roles restricted to one country or timezone. We reject those. Here, 'work from home' means any home, anywhere on the planet.",
      },
      ...BASE_FAQ,
    ],
  },
  "remote-part-time-jobs": {
    slug: "remote-part-time-jobs",
    title: "Remote Part-Time Jobs — Work From Anywhere",
    metaTitle: "Remote Part-Time Jobs, Worldwide | getremotejobsnow.com",
    metaDescription:
      "Part-time remote jobs open to candidates anywhere in the world. Flexible hours, no location restriction.",
    intro:
      "Part-time roles you can do from anywhere in the world. Perfect for building income around study, family, travel, or another job — with no country or timezone requirement.",
    faq: [
      {
        q: "Are these roles genuinely part-time?",
        a: "Yes — each is tagged Part-Time straight from the employer's listing. Hours are flexible because there is no timezone you must align to.",
      },
      ...BASE_FAQ,
    ],
  },
  "fully-remote-no-experience-jobs": {
    slug: "fully-remote-no-experience-jobs",
    title: "Fully Remote Jobs With No Experience Required",
    metaTitle: "Remote Jobs, No Experience, Worldwide | getremotejobsnow.com",
    metaDescription:
      "Entry-level, no-experience remote jobs open worldwide. Start a location-independent career from anywhere.",
    intro:
      "Entry-level and junior-friendly roles that welcome first-timers — and that you can do from anywhere in the world. No degree gatekeeping, no relocation, no timezone rule.",
    faq: [
      {
        q: "Which jobs count as 'no experience'?",
        a: "Roles whose descriptions welcome juniors, offer mentorship, or state no experience is required. Always read the listing for the specifics.",
      },
      ...BASE_FAQ,
    ],
  },
  "remote-jobs-no-talking": {
    slug: "remote-jobs-no-talking",
    title: "Remote Jobs With No Talking (Written / Async)",
    metaTitle: "Remote Jobs With No Talking (Async) | getremotejobsnow.com",
    metaDescription:
      "Quiet, written-first remote jobs with little or no phone/video — open to candidates anywhere in the world.",
    intro:
      "Prefer to keep the calls to a minimum? These written-first, asynchronous-friendly roles lean on chat, docs, and email rather than phones or video — and they're open worldwide.",
    faq: [
      {
        q: "Do these roles really involve no talking?",
        a: "They emphasize written, async communication (chat, email, docs) over calls. 'No talking' is a spectrum — check each listing for the exact expectations.",
      },
      ...BASE_FAQ,
    ],
  },
  "remote-jobs-with-health-insurance": {
    slug: "remote-jobs-with-health-insurance",
    title: "Remote Jobs With Health Insurance",
    metaTitle: "Remote Jobs With Health Insurance, Worldwide | getremotejobsnow.com",
    metaDescription:
      "Work-from-anywhere jobs that include health insurance. Location-independent roles with real benefits.",
    intro:
      "Location-independent roles that come with health insurance or medical coverage — because working from anywhere shouldn't mean giving up benefits.",
    faq: [...BASE_FAQ],
  },
  "remote-jobs-with-retirement-plan": {
    slug: "remote-jobs-with-retirement-plan",
    title: "Remote Jobs With a Retirement Plan",
    metaTitle: "Remote Jobs With Retirement Plans (401k) | getremotejobsnow.com",
    metaDescription:
      "Work-from-anywhere jobs offering a retirement plan, pension, or 401(k). Global-remote roles with long-term benefits.",
    intro:
      "Work-from-anywhere roles that offer a retirement plan, pension, or 401(k) — build your future from wherever you are.",
    faq: [...BASE_FAQ],
  },
  "remote-jobs-with-equipment-budget": {
    slug: "remote-jobs-with-equipment-budget",
    title: "Remote Jobs With an Equipment Budget",
    metaTitle: "Remote Jobs With Equipment/Home-Office Budget | getremotejobsnow.com",
    metaDescription:
      "Work-from-anywhere jobs that give you a home-office or equipment budget. Get set up wherever you work.",
    intro:
      "Roles that hand you a home-office or equipment budget so you can build a great workspace — anywhere in the world you happen to be.",
    faq: [...BASE_FAQ],
  },
  "remote-jobs-with-learning-budget": {
    slug: "remote-jobs-with-learning-budget",
    title: "Remote Jobs With a Learning Budget",
    metaTitle: "Remote Jobs With a Learning Budget | getremotejobsnow.com",
    metaDescription:
      "Work-from-anywhere jobs offering a learning or professional-development budget. Keep growing from anywhere.",
    intro:
      "Roles that invest in you with a learning budget for courses, books, conferences, and certifications — from anywhere on earth.",
    faq: [...BASE_FAQ],
  },
};

const BENEFIT_LANDINGS: Record<string, string> = {
  "remote-jobs-with-health-insurance": "health-insurance",
  "remote-jobs-with-retirement-plan": "retirement-plan",
  "remote-jobs-with-equipment-budget": "equipment-budget",
  "remote-jobs-with-learning-budget": "learning-budget",
};

/* -------------------------------------------------------------------------- */
/* Geo-targeted landing pages (US & European markets).                        */
/*                                                                            */
/* The honest angle: every *worldwide* role is one a US/EU seeker can do from */
/* home (no work-authorization or timezone gate), so these pages surface the  */
/* worldwide board PLUS any region-locked roles that match the geo. This wins */
/* high-intent geo searches ("remote jobs usa", "remote jobs europe") without */
/* diluting the worldwide board.                                              */
/* -------------------------------------------------------------------------- */
interface GeoConfig {
  slug: string;
  region?: string; // region.ts bucket (broad — country/continent pages)
  keywords?: RegExp; // location substring match (city/area pages, e.g. Bay Area)
  place: string; // "the United States" / "the Bay Area"
  short: string; // "the US" / "the Bay Area"
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
}

const GEO_PAGES: Record<string, GeoConfig> = {
  "remote-jobs-in-usa": {
    slug: "remote-jobs-in-usa",
    region: "United States",
    place: "the United States",
    short: "the US",
    title: "Remote Jobs in the USA — Work From Home Anywhere in the US",
    metaTitle: "Remote Jobs in the USA — Work From Home (Hiring Now) | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Find remote jobs in the USA you can do from home — thousands of work-from-anywhere roles open to US candidates, plus jobs hiring specifically in the United States. Software, marketing, design, support, finance & more. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in the United States. Every worldwide role here is open to US candidates with no work-authorization or timezone gate — plus roles hiring specifically across the US. Work from home in New York, California, Texas, or anywhere in between.",
  },
  "remote-jobs-in-europe": {
    slug: "remote-jobs-in-europe",
    region: "Europe",
    place: "Europe",
    short: "Europe",
    title: "Remote Jobs in Europe — Work From Home Across the EU",
    metaTitle: "Remote Jobs in Europe — Work From Home Across the EU (Hiring Now) | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Browse remote jobs in Europe you can do from home — work-from-anywhere roles open to European candidates, plus jobs hiring across the EU. Tech, marketing, customer support, design & finance. English-speaking, no relocation. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Europe. Every worldwide role here is open to candidates across the EU, UK, and the wider continent — no relocation, no timezone gate — plus roles hiring specifically in Europe. Work from home in Germany, the Netherlands, Portugal, Spain, Ireland, the Nordics, and beyond.",
  },
  "remote-jobs-in-uk": {
    slug: "remote-jobs-in-uk",
    region: "UK",
    place: "the United Kingdom",
    short: "the UK",
    title: "Remote Jobs in the UK — Work From Home Anywhere in Britain",
    metaTitle: "Remote Jobs in the UK — Work From Home (Hiring Now) | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Find remote jobs in the UK you can do from home — work-from-anywhere roles open to UK candidates, plus jobs hiring specifically across Britain. Software, marketing, support, design & finance. No commute, no relocation. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in the UK. Every worldwide role here is open to British candidates with no timezone gate — plus roles hiring specifically across the UK. Work from home in London, Manchester, Edinburgh, or anywhere else.",
  },
  "remote-jobs-in-germany": {
    slug: "remote-jobs-in-germany",
    region: "Europe",
    place: "Germany",
    short: "Germany",
    title: "Remote Jobs in Germany — Work From Home (English-Speaking)",
    metaTitle: "Remote Jobs in Germany — English-Speaking, Work From Home | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Browse remote jobs in Germany you can do from home — English-speaking, work-from-anywhere roles open to candidates in Germany, plus roles hiring across Europe. Tech, marketing, design, finance & support. 100% home office. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Germany. Every worldwide role here is open to candidates based in Germany — many English-speaking, 100% home office, no relocation — plus roles hiring across Europe. Work from home in Berlin, Munich, Hamburg, or anywhere in the country.",
  },
  "remote-jobs-in-canada": {
    slug: "remote-jobs-in-canada",
    region: "Canada",
    place: "Canada",
    short: "Canada",
    title: "Remote Jobs in Canada — Work From Home Anywhere in Canada",
    metaTitle: "Remote Jobs in Canada — Work From Home (Hiring Now) | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Find remote jobs in Canada you can do from home — work-from-anywhere roles open to Canadian candidates, plus jobs hiring specifically across Canada. Software, marketing, design, support & finance. No relocation. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Canada. Every worldwide role here is open to Canadian candidates with no timezone gate — plus roles hiring specifically across Canada. Work from home in Toronto, Vancouver, Montréal, or anywhere else.",
  },
  "remote-jobs-in-the-bay-area": {
    slug: "remote-jobs-in-the-bay-area",
    keywords: /san francisco|bay area|palo alto|mountain view|menlo|santa clara|sunnyvale|cupertino|redwood|san jose|berkeley|oakland/i,
    place: "the Bay Area",
    short: "the Bay Area",
    title: "Remote Jobs in the Bay Area — San Francisco & Silicon Valley",
    metaTitle: "Remote Jobs in the Bay Area (San Francisco) — Hiring Now | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote and hybrid jobs in the San Francisco Bay Area — work-from-anywhere roles open to Bay Area candidates, plus roles hiring across SF, Silicon Valley, Oakland and San Jose. AI, software, fintech, design & more. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in the San Francisco Bay Area. Every worldwide role here is open to Bay Area candidates — plus thousands of roles hiring specifically across San Francisco, Silicon Valley, Oakland, San Jose and Palo Alto, many at fast-growing AI and tech companies.",
  },
  "remote-jobs-in-new-york": {
    slug: "remote-jobs-in-new-york",
    keywords: /new york|nyc|manhattan|brooklyn/i,
    place: "New York",
    short: "New York",
    title: "Remote Jobs in New York — Work From Home in NYC",
    metaTitle: "Remote Jobs in New York (NYC) — Work From Home | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in New York you can do from home — work-from-anywhere roles open to NYC candidates, plus jobs hiring specifically across New York City. Software, fintech, marketing, design & more. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in New York. Every worldwide role here is open to New York candidates — plus roles hiring specifically across NYC, from fintech and media to software and design.",
  },
  "remote-jobs-in-london": {
    slug: "remote-jobs-in-london",
    keywords: /london|england|\buk\b|united kingdom/i,
    place: "London",
    short: "London",
    title: "Remote Jobs in London — Work From Home in the UK",
    metaTitle: "Remote Jobs in London — Work From Home (Hiring Now) | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in London you can do from home — work-from-anywhere roles open to London candidates, plus roles hiring specifically across London and the UK. Tech, finance, marketing, design & support. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in London. Every worldwide role here is open to London candidates with no timezone gate — plus roles hiring specifically across London and the wider UK.",
  },
  "remote-jobs-in-berlin": {
    slug: "remote-jobs-in-berlin",
    keywords: /berlin|munich|hamburg|frankfurt/i,
    place: "Berlin",
    short: "Berlin",
    title: "Remote Jobs in Berlin — English-Speaking, Work From Home",
    metaTitle: "Remote Jobs in Berlin — English-Speaking, Work From Home | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Berlin you can do from home — English-speaking, work-from-anywhere roles open to Berlin candidates, plus roles hiring across Germany. Tech, product, design & more. 100% home office, visa options. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Berlin. Every worldwide role here is open to Berlin candidates — many English-speaking — plus roles hiring specifically across Berlin and Germany, including visa-sponsoring employers.",
  },
  "remote-jobs-in-amsterdam": {
    slug: "remote-jobs-in-amsterdam",
    keywords: /amsterdam|netherlands|rotterdam|utrecht|the hague/i,
    place: "Amsterdam",
    short: "the Netherlands",
    title: "Remote Jobs in Amsterdam — Work From Home in the Netherlands",
    metaTitle: "Remote Jobs in Amsterdam (Netherlands) — Work From Home | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Amsterdam and the Netherlands you can do from home — English-speaking, work-from-anywhere roles plus roles hiring across the Netherlands. Tech, product, design & finance. Visa options. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Amsterdam and the Netherlands. Every worldwide role here is open to Dutch candidates — many English-speaking — plus roles hiring specifically across Amsterdam, Rotterdam and Utrecht.",
  },
  "remote-jobs-in-japan": {
    slug: "remote-jobs-in-japan",
    keywords: /japan|tokyo|osaka|kyoto|yokohama/i,
    place: "Japan",
    short: "Japan",
    title: "Remote Jobs in Japan — English-Speaking & Visa-Sponsored",
    metaTitle: "Remote Jobs in Japan — English-Speaking, Visa-Sponsored | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote and on-site tech jobs in Japan — English-speaking engineering roles at companies that sponsor work visas and relocate to Tokyo, plus work-from-anywhere roles open to candidates in Japan. Apply free.",
    intro:
      "Remote and relocation tech jobs in Japan. Includes English-speaking engineering roles at Tokyo companies that sponsor work visas, plus worldwide roles you can do from anywhere in Japan.",
  },
  "remote-jobs-in-india": {
    slug: "remote-jobs-in-india",
    keywords: /india|bangalore|bengaluru|mumbai|delhi|hyderabad|pune|chennai|gurgaon|noida/i,
    place: "India",
    short: "India",
    title: "Remote Jobs in India — Work From Home Anywhere in India",
    metaTitle: "Remote Jobs in India — Work From Home (Hiring Now) | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in India you can do from home — work-from-anywhere roles open to Indian candidates, plus roles hiring specifically across Bengaluru, Hyderabad, Mumbai and Pune. Software, support, design & more. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in India. Every worldwide role here is open to Indian candidates — plus roles hiring specifically across Bengaluru, Hyderabad, Mumbai, Pune and Delhi NCR.",
  },
  "remote-jobs-in-singapore": {
    slug: "remote-jobs-in-singapore",
    keywords: /singapore/i,
    place: "Singapore",
    short: "Singapore",
    title: "Remote Jobs in Singapore — Work From Home in Singapore",
    metaTitle: "Remote Jobs in Singapore — Work From Home (Hiring Now) | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Singapore you can do from home — work-from-anywhere roles open to candidates in Singapore, plus roles hiring specifically in Singapore. Tech, fintech, product & design. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Singapore. Every worldwide role here is open to Singapore candidates — plus roles hiring specifically across Singapore's tech and fintech scene.",
  },
  "remote-jobs-in-australia": {
    slug: "remote-jobs-in-australia",
    keywords: /australia|sydney|melbourne|brisbane|perth/i,
    place: "Australia",
    short: "Australia",
    title: "Remote Jobs in Australia — Work From Home Anywhere in Australia",
    metaTitle: "Remote Jobs in Australia — Work From Home (Hiring Now) | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Australia you can do from home — work-from-anywhere roles open to Australian candidates, plus roles hiring specifically across Sydney, Melbourne and Brisbane. Software, product, design & more. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Australia. Every worldwide role here is open to Australian candidates — plus roles hiring specifically across Sydney, Melbourne, Brisbane and Perth.",
  },
  "remote-jobs-in-seattle": {
    slug: "remote-jobs-in-seattle",
    keywords: /seattle|bellevue|redmond|kirkland/i,
    place: "Seattle",
    short: "Seattle",
    title: "Remote Jobs in Seattle — Work From Home in Seattle",
    metaTitle: "Remote Jobs in Seattle — Work From Home (Hiring Now) | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Seattle you can do from home — work-from-anywhere roles open to Seattle candidates, plus roles hiring across Seattle, Bellevue and Redmond. Cloud, AI, software & more. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Seattle. Every worldwide role here is open to Seattle candidates — plus roles hiring specifically across Seattle, Bellevue and Redmond, home to major cloud and AI employers.",
  },
  "remote-jobs-in-toronto": {
    slug: "remote-jobs-in-toronto",
    keywords: /toronto|ontario|waterloo|ottawa/i,
    place: "Toronto",
    short: "Toronto",
    title: "Remote Jobs in Toronto — Work From Home in Canada",
    metaTitle: "Remote Jobs in Toronto — Work From Home (Hiring Now) | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Toronto you can do from home — work-from-anywhere roles open to Toronto candidates, plus roles hiring across Toronto, Waterloo and Ottawa. Software, fintech, design & more. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Toronto. Every worldwide role here is open to Toronto candidates — plus roles hiring specifically across Toronto, Waterloo and Ottawa.",
  },
  "remote-jobs-in-austin": {
    slug: "remote-jobs-in-austin",
    keywords: /austin/i,
    place: "Austin",
    short: "Austin",
    title: "Remote Jobs in Austin — Work From Home in Austin, Texas",
    metaTitle: "Remote Jobs in Austin, TX — Work From Home (Hiring Now) | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Austin you can do from home — work-from-anywhere roles open to Austin candidates, plus roles hiring specifically in Austin, Texas. Software, crypto, fintech & more. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Austin. Every worldwide role here is open to Austin candidates — plus roles hiring specifically across Austin, Texas's fast-growing tech scene.",
  },
  "remote-jobs-in-los-angeles": {
    slug: "remote-jobs-in-los-angeles",
    keywords: /los angeles|santa monica|pasadena|culver city|el segundo/i,
    place: "Los Angeles",
    short: "LA",
    title: "Remote Jobs in Los Angeles — Work From Home in LA",
    metaTitle: "Remote Jobs in Los Angeles (LA) — Work From Home | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Los Angeles you can do from home — work-from-anywhere roles open to LA candidates, plus roles hiring across Los Angeles, Santa Monica and Culver City. Media, software, AI & more. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Los Angeles. Every worldwide role here is open to LA candidates — plus roles hiring specifically across Los Angeles, Santa Monica and Culver City.",
  },
  "remote-jobs-in-chicago": {
    slug: "remote-jobs-in-chicago",
    keywords: /chicago/i,
    place: "Chicago",
    short: "Chicago",
    title: "Remote Jobs in Chicago — Work From Home in Chicago",
    metaTitle: "Remote Jobs in Chicago — Work From Home (Hiring Now) | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Chicago you can do from home — work-from-anywhere roles open to Chicago candidates, plus roles hiring specifically in Chicago. Software, fintech, logistics & more. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Chicago. Every worldwide role here is open to Chicago candidates — plus roles hiring specifically across Chicago.",
  },
  "remote-jobs-in-boston": {
    slug: "remote-jobs-in-boston",
    keywords: /boston|cambridge, ma/i,
    place: "Boston",
    short: "Boston",
    title: "Remote Jobs in Boston — Work From Home in Boston",
    metaTitle: "Remote Jobs in Boston — Work From Home (Hiring Now) | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Boston you can do from home — work-from-anywhere roles open to Boston candidates, plus roles hiring across Boston and Cambridge. Biotech, software, AI & more. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Boston. Every worldwide role here is open to Boston candidates — plus roles hiring specifically across Boston and Cambridge, a biotech and software hub.",
  },
  "remote-jobs-in-vancouver": {
    slug: "remote-jobs-in-vancouver",
    keywords: /vancouver/i,
    place: "Vancouver",
    short: "Vancouver",
    title: "Remote Jobs in Vancouver — Work From Home in Canada",
    metaTitle: "Remote Jobs in Vancouver — Work From Home (Hiring Now) | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Vancouver you can do from home — work-from-anywhere roles open to Vancouver candidates, plus roles hiring specifically in Vancouver, BC. Software, gaming, design & more. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Vancouver. Every worldwide role here is open to Vancouver candidates — plus roles hiring specifically across Vancouver, BC.",
  },
  "remote-jobs-in-paris": {
    slug: "remote-jobs-in-paris",
    keywords: /paris|france/i,
    place: "Paris",
    short: "France",
    title: "Remote Jobs in Paris — Work From Home in France",
    metaTitle: "Remote Jobs in Paris (France) — Work From Home | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Paris and France you can do from home — work-from-anywhere roles plus roles hiring across Paris. Tech, product, design & finance. English-speaking, visa options. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Paris and France. Every worldwide role here is open to French candidates — many English-speaking — plus roles hiring specifically across Paris.",
  },
  "remote-jobs-in-madrid": {
    slug: "remote-jobs-in-madrid",
    keywords: /madrid|barcelona|spain/i,
    place: "Madrid",
    short: "Spain",
    title: "Remote Jobs in Madrid & Barcelona — Work From Home in Spain",
    metaTitle: "Remote Jobs in Madrid & Barcelona (Spain) — Work From Home | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Madrid, Barcelona and Spain you can do from home — English-speaking, work-from-anywhere roles plus roles hiring across Spain. Tech, product & design. Visa options. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Spain. Every worldwide role here is open to Spanish candidates — many English-speaking — plus roles hiring specifically across Madrid and Barcelona.",
  },
  "remote-jobs-in-dublin": {
    slug: "remote-jobs-in-dublin",
    keywords: /dublin|ireland/i,
    place: "Dublin",
    short: "Ireland",
    title: "Remote Jobs in Dublin — Work From Home in Ireland",
    metaTitle: "Remote Jobs in Dublin (Ireland) — Work From Home | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Dublin and Ireland you can do from home — English-speaking, work-from-anywhere roles plus roles hiring across Dublin. Tech, SaaS, finance & more. Visa options. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Dublin and Ireland. Every worldwide role here is open to Irish candidates — plus roles hiring specifically across Dublin, Europe's tech-HQ hub.",
  },
  "remote-jobs-in-bengaluru": {
    slug: "remote-jobs-in-bengaluru",
    keywords: /bangalore|bengaluru/i,
    place: "Bengaluru",
    short: "Bengaluru",
    title: "Remote Jobs in Bengaluru — Work From Home in Bangalore",
    metaTitle: "Remote Jobs in Bengaluru (Bangalore) — Work From Home | getremotejobsnow.com — Remote Jobs",
    metaDescription:
      "Remote jobs in Bengaluru you can do from home — work-from-anywhere roles open to candidates in Bangalore, plus roles hiring specifically in Bengaluru. Software, data, AI & more. Apply free.",
    intro:
      "Remote jobs you can do from anywhere in Bengaluru. Every worldwide role here is open to candidates in Bangalore — plus roles hiring specifically across Bengaluru, India's tech capital.",
  },
};

/** Jobs for a geo page: the worldwide board + regional roles matching the geo. */
async function geoJobs(cfg: GeoConfig): Promise<Job[]> {
  const [worldwide, regional] = await Promise.all([getAllJobs(), getRegionalJobs()]);
  const matched = cfg.keywords
    ? regional.filter((j) => cfg.keywords!.test(j.location)) // city/area pages
    : regional.filter((j) => jobRegions(j.location).includes(cfg.region!)); // country/continent
  // Worldwide first (the honest headline offer), then geo-specific regional roles.
  return [...worldwide, ...matched];
}

function geoView(cfg: GeoConfig, jobs: Job[]): LandingView {
  return {
    slug: cfg.slug,
    title: cfg.title,
    metaTitle: cfg.metaTitle,
    metaDescription: cfg.metaDescription,
    intro: cfg.intro,
    jobs,
    faq: [
      {
        q: `Can I really do these remote jobs from ${cfg.place}?`,
        a: `Yes. Every worldwide role on this page has no country, work-authorization, or timezone requirement, so you can do it from anywhere in ${cfg.place}. We also include roles that hire specifically in ${cfg.short}, clearly labelled on each card.`,
      },
      {
        q: `Are these remote jobs in ${cfg.short} open to applicants right now?`,
        a: `Yes — listings are pulled continuously from company hiring systems and refreshed automatically, so what you see is currently open. You apply free, directly on the employer's site.`,
      },
      ...BASE_FAQ,
    ],
    rss: `/${cfg.slug}/rss.xml`,
  };
}

/** Resolve a landing slug to a full view, or null if it isn't a known page. */
export async function resolveLanding(slug: string): Promise<LandingView | null> {
  // 1. Category pages: /remote-<category>-jobs
  const catMatch = /^remote-(.+)-jobs$/.exec(slug);
  if (catMatch) {
    const category = slugToCategory(catMatch[1]);
    if (category) {
      return {
        slug,
        title: `Remote ${category} Jobs — Work From Anywhere`,
        metaTitle: `Remote ${category} Jobs, Worldwide | getremotejobsnow.com`,
        metaDescription: CATEGORY_INTRO[category],
        intro: CATEGORY_INTRO[category],
        jobs: await getJobsByCategory(category),
        faq: [
          {
            q: `Are these ${category} roles open worldwide?`,
            a: `Yes. Every ${category} role here passed our Work-From-Anywhere filter — no country, region, or timezone requirement.`,
          },
          ...BASE_FAQ,
        ],
        rss: `/${slug}/rss.xml`,
      };
    }
  }

  // 1b. Geo-targeted pages: /remote-jobs-in-<place>
  const geo = GEO_PAGES[slug];
  if (geo) {
    return geoView(geo, await geoJobs(geo));
  }

  // 2. Curated SEO pages (some are benefit-backed).
  const seo = SEO_PAGES[slug];
  if (seo) {
    let jobs: Job[];
    if (BENEFIT_LANDINGS[slug]) {
      jobs = await getJobsByBenefit(BENEFIT_LANDINGS[slug]);
    } else if (slug === "remote-part-time-jobs") {
      jobs = await getJobsByEmploymentType("Part-Time");
    } else if (slug === "fully-remote-no-experience-jobs") {
      jobs = await getJobsWhere((j) => /no experience|entry.?level|junior|no degree|welcome/i.test(toText(j.description_html)));
    } else if (slug === "remote-jobs-no-talking") {
      jobs = await getJobsWhere((j) => /no cold calling|no talking|written|async|email and chat|no phone/i.test(toText(j.description_html)));
    } else {
      jobs = await getJobsWhere(() => true);
    }
    return { ...seo, jobs, rss: `/${slug}/rss.xml` };
  }

  // 3. Skill pages: /remote-<skill>-jobs
  if (catMatch) {
    const skillSlug = catMatch[1];
    const dotted = await getJobsBySkill(skillSlug.replace(/-/g, ".")); // next.js
    const jobs = dotted.length ? dotted : await getJobsBySkill(skillSlug);
    if (jobs.length) {
      const label = skillSlug.replace(/-/g, " ");
      return {
        slug,
        title: `Remote ${label} Jobs — Work From Anywhere`,
        metaTitle: `Remote ${label} Jobs, Worldwide | getremotejobsnow.com`,
        metaDescription: `Work-from-anywhere ${label} jobs with no location restriction. Every role is genuinely remote worldwide.`,
        intro: `Location-independent roles that use ${label}. No country, region, or timezone requirement — apply from anywhere.`,
        jobs,
        faq: [
          {
            q: `Where can I do these ${label} jobs from?`,
            a: `Anywhere in the world. Each role passed our strict Work-From-Anywhere filter.`,
          },
          ...BASE_FAQ,
        ],
        rss: `/${slug}/rss.xml`,
      };
    }
  }

  return null;
}

/** All landing slugs to pre-render (generateStaticParams / sitemap). */
export async function allLandingSlugs(): Promise<string[]> {
  const categorySlugs = CATEGORIES.map((c) => `remote-${categoryToSlug(c)}-jobs`);
  const seoSlugs = Object.keys(SEO_PAGES);
  const geoSlugs = Object.keys(GEO_PAGES);
  const skills = await getAllSkills();
  const skillSlugs = skills.map((s) => `remote-${s.skill.replace(/[.]/g, "-")}-jobs`);
  return Array.from(new Set([...categorySlugs, ...seoSlugs, ...geoSlugs, ...skillSlugs]));
}
