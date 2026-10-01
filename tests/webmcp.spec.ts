import { expect, test } from "@playwright/test";

/**
 * The WebMCP tools have to work in a browser, and no browser in CI implements
 * WebMCP: Chrome needs an origin trial token or a flag, and Safari has filed an
 * `oppose` position. So these tests install a minimal `document.modelContext`
 * before the page's own scripts run, exactly the shape the spec draft defines,
 * and then do what an agent would do — read the tool list and call one.
 *
 * What this protects: the registration script is an inline string built on the
 * server (src/components/AgentTools.tsx). TypeScript cannot check it and the
 * unit tests only see the specs, not the handlers. Without this, a typo in a
 * handler would ship silently and show up as an assistant giving a visitor the
 * wrong answer about the board.
 *
 * It also pins the thing the whole arrangement exists for: the number the tool
 * reports and the number on the page are the same number.
 */
const SHIM = () => {
  const registered: Record<string, unknown>[] = [];
  Object.defineProperty(document, "modelContext", {
    configurable: true,
    value: {
      registerTool(tool: Record<string, unknown>) {
        registered.push(tool);
        return Promise.resolve();
      },
      getTools: () => registered,
    },
  });
  // A handle for the assertions below, since `registered` is closure-scoped.
  (window as unknown as { __tools: Record<string, unknown>[] }).__tools = registered;
};

/** Call a registered tool the way an agent would, and parse the MCP content payload. */
async function callTool(page: import("@playwright/test").Page, name: string, input: unknown) {
  return page.evaluate(
    async ([toolName, args]) => {
      const tools = (window as unknown as { __tools: { name: string; execute: (i: unknown) => Promise<unknown> }[] }).__tools;
      const tool = tools.find((t) => t.name === toolName);
      if (!tool) throw new Error(`tool ${toolName} was never registered`);
      const result = (await tool.execute(args)) as { content: { type: string; text: string }[] };
      return result.content[0].text;
    },
    [name, input] as const,
  );
}

test.describe("WebMCP tools", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(SHIM);
  });

  test("registers its tools on an ordinary page load", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const tools = await page.evaluate(() =>
      (window as unknown as { __tools: { name: string; title: string; description: string; annotations: Record<string, boolean> }[] }).__tools.map(
        (t) => ({ name: t.name, title: t.title, description: t.description, annotations: t.annotations }),
      ),
    );

    expect(tools.map((t) => t.name).sort()).toEqual([
      "check_remote_job_still_open",
      "explain_remote_location_scopes",
      "search_remote_jobs",
    ]);
    for (const t of tools) {
      expect(t.title, `${t.name} title`).toBeTruthy();
      expect(t.description.length, `${t.name} description`).toBeGreaterThan(40);
      // Nothing an agent can call here may act on the visitor's behalf.
      expect(t.annotations.readOnlyHint, `${t.name} read-only`).toBe(true);
      expect(t.annotations.consequentialHint ?? false, `${t.name} not consequential`).toBe(false);
    }
  });

  test("every parameter is fully described, as the Lighthouse audit requires", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const problems = await page.evaluate(() => {
      type Tool = { name: string; inputSchema?: { properties?: Record<string, { title?: string; description?: string }> } };
      const out: string[] = [];
      for (const t of (window as unknown as { __tools: Tool[] }).__tools) {
        for (const [p, s] of Object.entries(t.inputSchema?.properties ?? {})) {
          if (!s.title) out.push(`${t.name}.${p} has no title`);
          if (!s.description) out.push(`${t.name}.${p} has no description`);
        }
      }
      return out;
    });
    expect(problems).toEqual([]);
  });

  test("search returns the same total the page shows", async ({ page }) => {
    await page.goto("/jobs?q=engineer&scope=worldwide", { waitUntil: "domcontentloaded" });

    // "Showing 1–20 of 63" — the count the visitor is looking at.
    const shown = await page.locator("body").innerText();
    const match = shown.match(/of\s+([\d,]+)/);
    expect(match, "the page should state a result total").not.toBeNull();
    const pageTotal = Number(match![1].replace(/,/g, ""));

    const raw = await callTool(page, "search_remote_jobs", { query: "engineer", scope: "worldwide", limit: 3 });
    const data = JSON.parse(raw) as {
      total_matched: number;
      returned: number;
      results: { title: string; url: string; scope: string }[];
      query: Record<string, unknown>;
    };

    expect(data.total_matched, "tool and page disagree about how many jobs match").toBe(pageTotal);
    expect(data.returned).toBe(Math.min(3, pageTotal));
    // Absolute and followable, without naming a host. The host comes from
    // NEXT_PUBLIC_SITE_URL, which differs in all three places this runs: unset
    // in CI (so the local origin), the production domain in a local build that
    // reads .gitignored .env.production, and the production domain on a deploy.
    // Asserting the host here would only pin which machine ran the test.
    for (const r of data.results) {
      expect(r.scope, "scope=worldwide must not return regional roles").toBe("worldwide");
      expect(r.url, "results must carry a followable absolute URL").toMatch(/^https?:\/\/[^/]+\/jobs\/.+/);
    }
  });

  test("search reports back the filters it actually applied", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // An unknown category is dropped rather than erroring, so the echo is the
    // only way a caller learns its filter did not take effect.
    const raw = await callTool(page, "search_remote_jobs", { category: "Wizardry", limit: 1 });
    const data = JSON.parse(raw) as { query: { category: string | null }; accepted_values: { category: string[] } };
    expect(data.query.category).toBeNull();
    expect(data.accepted_values.category.length).toBeGreaterThan(5);
  });

  test("the scope explainer answers without a network call", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const text = await callTool(page, "explain_remote_location_scopes", {});
    expect(text).toContain("work-from-anywhere");
    expect(text).toContain("regional");
    expect(text.length).toBeGreaterThan(200);
  });

  test("the liveness tool accepts a slug or a whole URL", async ({ page }) => {
    await page.goto("/jobs", { waitUntil: "domcontentloaded" });
    const slug = await page.evaluate(() => {
      const a = document.querySelector('a[href^="/jobs/"]') as HTMLAnchorElement | null;
      return a ? a.getAttribute("href")!.replace("/jobs/", "") : "";
    });
    expect(slug, "the board should list at least one job to check").toBeTruthy();

    for (const input of [slug, `https://getremotejobsnow.com/jobs/${slug}`]) {
      const raw = await callTool(page, "check_remote_job_still_open", { slug: input });
      const data = JSON.parse(raw) as { slug: string; still_open: boolean; note: string };
      expect(data.slug).toBe(slug);
      expect(typeof data.still_open).toBe("boolean");
      expect(data.note.length).toBeGreaterThan(10);
    }
  });

  test("a missing slug is reported, not thrown", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const raw = await callTool(page, "check_remote_job_still_open", {});
    expect(JSON.parse(raw)).toHaveProperty("error");
  });

  test("the script leaves browsers without WebMCP alone", async ({ browser }) => {
    // No shim this time: the page must not throw, and must not invent the API.
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/", { waitUntil: "load" });
    expect(errors).toEqual([]);
    expect(await page.evaluate(() => "modelContext" in document)).toBe(false);
    await context.close();
  });
});

test("llms.txt is served as fast plain text with the parts the audit needs", async ({ request }) => {
  // It is a file in public/, served by Cloudflare's asset layer. The point is
  // that it never reaches the worker: the audit scored this zero when the old
  // path fell through to the 404 renderer and the fetch timed out.
  const res = await request.get("/llms.txt");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("text/plain");

  const body = await res.text();
  expect(body.length).toBeGreaterThan(50);
  expect(body).toMatch(/^\s*#\s+.+/m); // an H1
  expect(body).toMatch(/\[[^\]]+\]\([^)]+\)/); // a Markdown link
  expect(body).not.toMatch(/localhost/);
});
