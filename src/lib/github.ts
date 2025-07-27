import { env } from "./env";
import { Package, Repo } from "./packages";
import parseGithubUrl from "parse-github-url";

export async function fetchPackageDetails(pkg: Package) {
  const repo = parseGithubUrl(pkg.npm?.repository?.url ?? "");
  if (!repo) return null;

  const readme = await fetchReadme(repo);

  return {
    readme,
  };
}

export async function fetchReadme(repo: Repo) {
  const url = `https://api.github.com/repos/${repo.owner}/${repo.name}/readme`;

  const headers = new Headers({
    Accept: "application/vnd.github.v3.raw",
    Authorization: `Bearer ${env.secret.GITHUB_TOKEN}`,
  });

  const res = await fetch(url, {
    headers,
    next: { revalidate: 86400 }, // 24 hours
  });

  if (!res.ok) {
    return null;
  }

  const readme = await res.text();
  return readme;
}

export type PackageDetails = Awaited<ReturnType<typeof fetchPackageDetails>>;
