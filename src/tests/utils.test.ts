import { parseGitHubUrl } from "@/lib/utils/utils";

describe("Parse GitHub URL", () => {
  it("should return owner and repo", () => {
    const cases = [
      {
        url: "https://github.com/facebook/react",
        owner: "facebook",
        repo: "react",
      },
      {
        url: "https://github.com/vercel/next.js",
        owner: "vercel",
        repo: "next.js",
      },
    ];

    cases.forEach((c) => {
      const { owner, repo } = parseGitHubUrl(c.url);

      expect(owner).toBe(c.owner);
      expect(repo).toBe(c.repo);
    });
  });
});
