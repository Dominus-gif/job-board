import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { AGENT_TOOLS } from "./AgentTools";
import { CATEGORIES } from "@/lib/taxonomy";
import { REGIONS, TYPES } from "@/lib/job-search";
import { SALARY_BANDS } from "@/lib/salary";

/**
 * The WebMCP tools and llms.txt both have rules that fail quietly.
 *
 * Lighthouse's `webmcp-schema-validity` audit scores a *warning* as 0.5, which
 * its own scoring counts as a failure, and the only thing needed to earn one is
 * a parameter without a description. Nothing in the app breaks when that
 * happens: the tool keeps working and the agentic score silently drops. Same for
 * llms.txt, where a file missing its H1 scores zero while serving perfectly.
 *
 * So both are asserted here rather than discovered on the next audit.
 */
describe("WebMCP tool schemas", () => {
  it("registers at least one tool", () => {
    expect(AGENT_TOOLS.length).toBeGreaterThan(0);
  });

  it("gives every tool a name, a title and a description", () => {
    for (const t of AGENT_TOOLS) {
      expect(t.name, "tool name").toMatch(/^[a-z][a-z0-9_]*$/);
      expect(t.title.trim().length, `${t.name}: title`).toBeGreaterThan(0);
      // Short descriptions are what make an agent guess. Lighthouse only checks
      // for presence; this is the useful floor.
      expect(t.description.trim().length, `${t.name}: description`).toBeGreaterThan(40);
    }
  });

  it("uses each tool name once", () => {
    const names = AGENT_TOOLS.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("gives every parameter a title and a description", () => {
    for (const t of AGENT_TOOLS) {
      for (const [param, schema] of Object.entries(t.inputSchema.properties)) {
        const where = `${t.name}.${param}`;
        expect(schema.type, `${where}: type`).toBeTruthy();
        expect(schema.title?.trim().length, `${where}: title (a missing one is a Lighthouse warning)`).toBeGreaterThan(0);
        expect(
          schema.description?.trim().length,
          `${where}: description (a missing one is a Lighthouse warning, scored 0.5)`,
        ).toBeGreaterThan(10);
      }
    }
  });

  it("only requires parameters it declares", () => {
    for (const t of AGENT_TOOLS) {
      for (const req of t.inputSchema.required ?? []) {
        expect(Object.keys(t.inputSchema.properties), `${t.name}: required "${req}"`).toContain(req);
      }
    }
  });

  it("exposes nothing that writes, sends or spends", () => {
    for (const t of AGENT_TOOLS) {
      // Every tool here is a read. If a future tool genuinely needs to act, it
      // needs consequentialHint AND a human confirmation step in the UI — at
      // which point this assertion should be narrowed, not deleted.
      expect(t.annotations.readOnlyHint, `${t.name} must be read-only`).toBe(true);
      expect(t.annotations.consequentialHint ?? false, `${t.name} must not be consequential`).toBe(false);
    }
  });

  it("marks tools that return third-party text as untrusted", () => {
    // Job titles, company names and descriptions are written by employers, so
    // anything returning them could be carrying text aimed at the agent.
    const search = AGENT_TOOLS.find((t) => t.name === "search_remote_jobs");
    expect(search?.annotations.untrustedContentHint).toBe(true);
  });

  it("never tells an agent to skip asking the user", () => {
    // A description is the one place an instruction to the agent is invisible to
    // the person. Wording like this is a safety finding, not a style issue.
    const banned = /\b(no need to (confirm|ask)|without (asking|confirming)|skip (the )?confirmation|do not ask)\b/i;
    for (const t of AGENT_TOOLS) {
      expect(banned.test(t.description), `${t.name}: description instructs the agent to bypass the user`).toBe(false);
      for (const [param, schema] of Object.entries(t.inputSchema.properties)) {
        expect(banned.test(schema.description), `${t.name}.${param}`).toBe(false);
      }
    }
  });

  it("offers only filter values the board actually accepts", () => {
    // An enum that drifts from the taxonomy sends agents to filters the search
    // silently drops, which looks like the board lying about its own contents.
    const search = AGENT_TOOLS.find((t) => t.name === "search_remote_jobs")!;
    const props = search.inputSchema.properties;
    expect(props.category.enum).toEqual(CATEGORIES);
    expect(props.region.enum).toEqual(REGIONS);
    expect(props.employment_type.enum).toEqual(TYPES);
    expect(props.min_salary_band.enum).toEqual(SALARY_BANDS.map((b) => b.id));
    expect(props.scope.enum).toEqual(["worldwide", "regional"]);
  });
});

describe("llms.txt", () => {
  const text = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf-8");

  it("meets the three things the Lighthouse audit checks", () => {
    expect(text.length, "50+ characters").toBeGreaterThan(50);
    expect(/^\s*#\s+.+/m.test(text), "a Markdown H1").toBe(true);
    expect(/\[[^\]]+\]\([^)]+\)/.test(text), "at least one Markdown link").toBe(true);
  });

  it("links to absolute production URLs, never localhost", () => {
    // SITE.url falls back to localhost without NEXT_PUBLIC_SITE_URL, and a local
    // build would otherwise bake those links into a shipped file.
    expect(text).not.toMatch(/localhost/);
    const links = [...text.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]);
    expect(links.length).toBeGreaterThan(10);
    for (const href of links) expect(href, "absolute https link").toMatch(/^https:\/\//);
  });
});
