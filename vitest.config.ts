import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "node",
    // scripts/ carries the build-time logic that decides what gets published —
    // the completeness rule and the boilerplate stripper both live there, and
    // both are the kind of thing that fails silently if it regresses.
    include: ["src/**/*.test.ts", "scripts/**/*.test.ts"],
  },
});
