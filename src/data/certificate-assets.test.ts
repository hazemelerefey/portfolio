import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { portfolioData } from "./portfolio";

const certificateDirectory = resolve(process.cwd(), "public", "certificate");
const sourceFiles = [
  "src/components/sections/CertificateHeroScroll.tsx",
  "src/components/ui/certificate-marquee.tsx",
  "src/data/portfolio.ts",
];

describe("certificate assets", () => {
  it("uses optimized WebP images only and excludes the removed PDF", () => {
    const directoryFiles = readdirSync(certificateDirectory);
    const imageFiles = directoryFiles.filter((file) => file.endsWith(".webp"));
    const certificateImagePaths = portfolioData.achievements
      .map((achievement) => achievement.image)
      .filter(
        (image): image is string =>
          typeof image === "string" && image.startsWith("/certificate/"),
      );

    expect(imageFiles).toHaveLength(10);
    expect(directoryFiles.some((file) => /\.(jpg|jpeg|pdf)$/i.test(file))).toBe(false);
    expect(certificateImagePaths).toHaveLength(10);

    for (const imagePath of certificateImagePaths) {
      expect(imagePath).toMatch(/^\/certificate\/.+\.webp$/);
      expect(existsSync(resolve(process.cwd(), "public", imagePath.slice(1)))).toBe(true);
    }

    for (const sourceFile of sourceFiles) {
      const source = readFileSync(resolve(process.cwd(), sourceFile), "utf8");
      expect(source).not.toContain("/certificate/Generative AI.pdf");
      expect(source).not.toMatch(/\/certificate\/[^"']+\.(jpg|jpeg)/i);
    }
  });
});
