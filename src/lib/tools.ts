/** Free tools — SEO-friendly utility pages that pull in remote-work searches. */
export interface ToolMeta {
  slug: string;
  title: string;
  short: string; // footer/nav label
  description: string;
  keywords: string[];
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "remote-salary-converter",
    title: "Remote Salary Converter",
    short: "Salary converter",
    description:
      "Convert a remote salary between USD, EUR, GBP, CAD and more — with monthly and hourly equivalents. Compare offers across US and European currencies.",
    keywords: ["remote salary converter", "usd to eur salary", "salary calculator remote", "remote pay converter"],
  },
  {
    slug: "timezone-overlap",
    title: "Timezone Overlap Finder",
    short: "Timezone overlap",
    description:
      "See how many 9-to-5 working hours you'd share with a remote team in another timezone — US, Europe, Asia and beyond. Plan async remote work.",
    keywords: ["timezone overlap tool", "working hours overlap", "remote timezone calculator", "time zone overlap"],
  },
  {
    slug: "world-time-buddy",
    title: "World Time Buddy",
    short: "World time buddy",
    description:
      "Compare times across cities and timezones at a glance. Add any city, drag the timeline, and instantly see everyone's local time — perfect for remote teams.",
    keywords: ["world time buddy", "world clock", "time zone converter", "compare time zones", "meeting planner"],
  },
  {
    slug: "password-generator",
    title: "Strong Password Generator",
    short: "Password generator",
    description:
      "Generate strong, random, secure passwords in your browser. Choose length and character types, see the strength, and copy — nothing is stored or sent.",
    keywords: ["strong password generator", "random password generator", "secure password", "password creator"],
  },
];

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
