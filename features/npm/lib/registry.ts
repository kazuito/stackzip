import type { NpmPackageAbbreviated, NpmPackageLatest } from "../types";

const NPM_REGISTRY = "https://registry.npmjs.org";

/**
 * Fetch the latest version metadata (~1-2 KB instead of many MB).
 */
export async function fetchNpmPackageLatest(
  name: string,
): Promise<NpmPackageLatest> {
  const res = await fetch(`${NPM_REGISTRY}/${encodeURIComponent(name)}/latest`);
  if (!res.ok) {
    throw new Error(`npm registry error: ${res.status}`);
  }
  return res.json();
}

/**
 * Fetch abbreviated metadata (dist-tags + modified) using the install header.
 */
export async function fetchNpmPackageAbbreviated(
  name: string,
): Promise<NpmPackageAbbreviated> {
  const res = await fetch(`${NPM_REGISTRY}/${encodeURIComponent(name)}`, {
    headers: { Accept: "application/vnd.npm.install-v1+json" },
  });
  if (!res.ok) {
    throw new Error(`npm registry error: ${res.status}`);
  }
  return res.json();
}
