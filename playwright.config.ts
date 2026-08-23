import { defineConfig } from "@playwright/test";

/** Runs the built app and asserts mobile layout invariants (see tests/). */
export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 1,
  use: { baseURL: "http://localhost:3000" },
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
    env: { ANYWHERE_LIVE: "false" },
  },
});
