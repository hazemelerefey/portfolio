import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import {
  FEATURED_GITHUB_REPOSITORIES,
  GITHUB_ACCOUNT,
} from "./github-ecosystem";

describe("GitHub ecosystem identity", () => {
  it("uses Hazem’s account and verified featured repositories only", () => {
    expect(GITHUB_ACCOUNT).toBe("hazemelerefey");
    expect(FEATURED_GITHUB_REPOSITORIES.map((repository) => repository.name)).toEqual([
      "AutoAnalyst-AI",
      "DigiSteel-YOLO",
      "NeuroScope",
      "n8n-projects",
      "jobpulse",
      "DigiSteel-World",
    ]);
  });

  it("does not retain copied repository names or fabricated showcase metrics", () => {
    const source = readFileSync(
      resolve(process.cwd(), "src/components/ui/github-showcase.tsx"),
      "utf8",
    );

    for (const unrelatedRepository of [
      "Browser-Automation-Agent",
      "Security-Automation-GenAI",
      "POLABDC",
      "Digilibzx",
      "Swarm-Agent-Orchestrator",
    ]) {
      expect(source).not.toContain(unrelatedRepository);
    }

    expect(source).not.toContain("<Counter value={1469}");
    expect(source).not.toContain("Math.random() * 500");
    expect(source).toContain("FEATURED_GITHUB_REPOSITORIES");
  });
});
