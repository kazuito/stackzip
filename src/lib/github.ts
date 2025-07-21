import { Repo } from "./packages";

export async function fetchReadme(repo: Repo) {
  const url = `https://api.github.com/repos/${repo.owner}/${repo.name}/readme`;

  const headers = new Headers({
    Accept: "application/vnd.github.v3.raw",
  });

  const res = await fetch(url, {
    headers,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch README: ${res.statusText}`);
  }

  const readme = await res.text();
  return readme;
}
