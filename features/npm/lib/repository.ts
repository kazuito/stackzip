const SHORTHAND_HOSTS: Record<string, string> = {
  github: "github.com",
  gitlab: "gitlab.com",
  bitbucket: "bitbucket.org",
};

export function normalizeRepoUrl(
  repo?: string | { type?: string; url?: string },
): string | undefined {
  const url = typeof repo === "string" ? repo : repo?.url;
  if (!url) return undefined;

  const shorthand = url.match(
    /^(?:(github|gitlab|bitbucket):)?([\w.-]+\/[\w.-]+)$/,
  );
  if (shorthand) {
    return `https://${SHORTHAND_HOSTS[shorthand[1] ?? "github"]}/${shorthand[2]}`;
  }

  return url
    .replace(/^git\+/, "")
    .replace(/\.git$/, "")
    .replace(/^git:\/\//, "https://")
    .replace(/^ssh:\/\/git@/, "https://");
}
