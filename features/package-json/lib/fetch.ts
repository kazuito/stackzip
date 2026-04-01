import type { PackageJson } from "../types";

const JSDELIVR_NPM_BASE = "https://cdn.jsdelivr.net/npm";

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

function isUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function parseNpmPackageSpec(spec: string) {
  if (spec.startsWith("@")) {
    const slashIndex = spec.indexOf("/");
    if (slashIndex <= 1) return null;

    const versionIndex = spec.indexOf("@", slashIndex + 1);
    const name = versionIndex === -1 ? spec : spec.slice(0, versionIndex);
    const version =
      versionIndex === -1 ? undefined : spec.slice(versionIndex + 1);

    if (!/^@[^/\s]+\/[^/\s@]+$/.test(name)) return null;
    if (version !== undefined && !/^[^\s/]+$/.test(version)) return null;

    return { name, version };
  }

  const versionIndex = spec.indexOf("@");
  const name = versionIndex === -1 ? spec : spec.slice(0, versionIndex);
  const version =
    versionIndex === -1 ? undefined : spec.slice(versionIndex + 1);

  if (!/^[^/\s@]+$/.test(name)) return null;
  if (version !== undefined && !/^[^\s/]+$/.test(version)) return null;

  return { name, version };
}

function resolvePackageJsonSource(input: string): string {
  const normalizedInput = input.trim();

  if (isUrl(normalizedInput)) {
    return toRawGitHubUrl(normalizedInput);
  }

  const parsed = parseNpmPackageSpec(normalizedInput);
  if (!parsed) {
    throw new Error(
      "Enter a public package.json URL or an npm package name like react or @babel/core@7.29.0.",
    );
  }

  const versionSuffix = parsed.version
    ? `@${encodeURIComponent(parsed.version)}`
    : "";
  return `${JSDELIVR_NPM_BASE}/${parsed.name}${versionSuffix}/package.json`;
}

export async function fetchPackageJson(input: string): Promise<PackageJson> {
  const rawUrl = resolvePackageJsonSource(input);
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
