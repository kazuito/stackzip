import type { PackageJson } from "../types";

/**
 * Convert a GitHub blob URL to a raw.githubusercontent.com URL.
 * e.g. https://github.com/vercel/next.js/blob/canary/package.json
 *    → https://raw.githubusercontent.com/vercel/next.js/canary/package.json
 */
function toRawGitHubUrl(url: string): string {
  const match = url.match(
    /^https?:\/\/github\.com\/([^/]+\/[^/]+)\/blob\/(.+)$/,
  );
  if (match) {
    return `https://raw.githubusercontent.com/${match[1]}/${match[2]}`;
  }
  return url;
}

function withCorsProxy(url: string): string {
  return `https://corsmirror.com/v1?url=${encodeURIComponent(url)}`;
}

export async function fetchPackageJson(url: string): Promise<PackageJson> {
  const rawUrl = toRawGitHubUrl(url);
  const res = await fetch(withCorsProxy(rawUrl));
  if (!res.ok) {
    throw new Error(
      `Failed to fetch package.json: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid package.json: expected an object");
  }
  return data as PackageJson;
}
