/**
 * Reader-facing skill names, kept dependency-free so client components can
 * use them. Re-exported from landing.ts for existing imports.
 */

/**
 * How each skill tag is written when it faces a reader.
 *
 * The tags are lowercase storage keys ("aws", "ci_cd", "next.js"). Printing
 * them raw is what produced titles like "Remote aws Jobs" and "Remote python
 * Jobs" across 34 landing pages — the single most obvious tell that the set was
 * generated rather than written. A tag with no entry here is Title Cased, so a
 * new skill never reintroduces the bug.
 */
const SKILL_DISPLAY: Record<string, string> = {
  aws: "AWS", gcp: "GCP", azure: "Azure", sql: "SQL", seo: "SEO", php: "PHP",
  "ci_cd": "CI/CD", "ui/ux": "UI/UX", "c#": "C#", "next.js": "Next.js",
  node: "Node.js", postgres: "PostgreSQL", mysql: "MySQL", mongodb: "MongoDB",
  graphql: "GraphQL", rest: "REST", javascript: "JavaScript", typescript: "TypeScript",
  react: "React", vue: "Vue", svelte: "Svelte", python: "Python", ruby: "Ruby",
  rust: "Rust", java: "Java", go: "Go", elixir: "Elixir", kafka: "Kafka",
  redis: "Redis", spark: "Spark", docker: "Docker", kubernetes: "Kubernetes",
  terraform: "Terraform", salesforce: "Salesforce", hubspot: "HubSpot",
  zendesk: "Zendesk", figma: "Figma",
};

export function skillLabel(skill: string): string {
  return (
    SKILL_DISPLAY[skill.toLowerCase()] ??
    skill.replace(/[-_]/g, " ").replace(/\b[a-z]/g, (c) => c.toUpperCase())
  );
}
