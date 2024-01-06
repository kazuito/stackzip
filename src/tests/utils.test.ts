import {
  formatNumberWithCommas,
  isGitHubUrl,
  parseGitHubUrl,
  rmGitUrlPrefix,
} from "@/lib/utils/utils";

describe("utils: parseGitHubUrl", () => {
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

describe("utils: formatNumberWithCommas", () => {
  it("should return formatted number", () => {
    const cases: Array<[number, string]> = [
      [0, "0"],
      [999, "999"],
      [1000, "1,000"],
      [33847294, "33,847,294"],
      [-1234, "-1,234"],
      [-33847294, "-33,847,294"],
    ];

    cases.forEach((c) => {
      expect(formatNumberWithCommas(c[0])).toBe(c[1]);
    });
  });

  it("should return null", () => {
    const cases = [null, undefined, "string", {}, []];

    cases.forEach((c) => {
      expect(formatNumberWithCommas(c as any)).toBeNull();
    });
  });
});

describe("utils: rmGitUrlPrefix", () => {
  it("should remove git url prefix", () => {
    const cases: Array<[string, string]> = [
      ["git+https://abc.com", "https://abc.com"],
      ["git+http://abc.com", "http://abc.com"],
      ["git@https://abc.com", "https://abc.com"],
      ["git:https://abc.com", "https://abc.com"],
    ];

    cases.forEach((c) => {
      expect(rmGitUrlPrefix(c[0])).toBe(c[1]);
    });
  });
});

describe("utils: isGitHubUrl", () => {
  it("should detect github urls", () => {
    const cases: Array<[string, boolean]> = [
      ["https://github.com/abc/def", true],
      ["http://github.com/abc/def", true],
      ["git+https://github.com/abc/def", true],
      ["git+https://ghub.com/abc/def", true],
      ["https://abc.com/abc/def", false],
      ["http://abc.com/abc/def", false],
      ["git+https://abc.com/abc/def", false],
    ];

    cases.forEach((c) => {
      expect(isGitHubUrl(c[0])).toBe(c[1]);
    });
  });
});
