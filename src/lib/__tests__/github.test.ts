import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchReadme } from "../github";

describe("github.ts", () => {
  describe("fetchReadme", () => {
    it("should fetch README from GitHub", async () => {
      const readme = await fetchReadme({
        owner: "facebook",
        name: "react",
      });
      // see https://github.com/facebook/react#readme
      expect(readme).contains("# [React](https://react.dev/)");
    });
  });
});
