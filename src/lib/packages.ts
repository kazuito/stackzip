import parseGithubUrl from "parse-github-url";
import z from "zod";
import crypto from "crypto";

type Repo = {
  owner: string | null;
  name: string | null;
};

const NpmPackageDataSchema = z.object({
  license: z.string(),
  description: z.string().optional(),
  repository: z.object({
    url: z.string(),
  }),
  homepage: z.string()
});

const GithubGraphqlApiResponseSchema = z.object({
  data: z.record(
    z.string(),
    z.union([
      z.object({
        stargazerCount: z.number(),
      }),
      z.null(),
    ])
  ),
});

const PackageJsonSchema = z.object({
  dependencies: z.record(z.string(), z.string()).optional(),
  acceptDependencies: z.record(z.string(), z.string()).optional(),
  optionalDependencies: z.record(z.string(), z.string()).optional(),
  devDependencies: z.record(z.string(), z.string()).optional(),
  bundleDependencies: z.record(z.string(), z.string()).optional(),
  peerDependencies: z.record(z.string(), z.string()).optional(),
});

export const repoHash = (repo: Repo) => {
  const hash = crypto
    .createHash("sha256")
    .update(`${repo.owner}/${repo.name}`)
    .digest("hex");
  return `repo_${hash}`;
};

/**
 * Fetches github repository data for a list of repositories.
 * @param packageName
 * @returns
 */
export async function fetchGithubReposData(npmPackages: NpmPackageData[]) {
  if (npmPackages.length === 0) {
    return [];
  }

  const usedAliases = new Set<string>();

  const repositoryQueries = npmPackages
    .map((pkg) => {
      if (!pkg?.description || !pkg.repository?.url) {
        return;
      }

      const repo = parseGithubUrl(pkg.repository.url);

      if (!repo) {
        return;
      }

      const alias = repoHash(repo);

      if (usedAliases.has(alias)) {
        return;
      }
      usedAliases.add(alias);

      return `
        ${alias}: repository(owner: "${repo.owner}", name: "${repo.name}") {
          stargazerCount
        }
      `;
    })
    .join("\n");

  const query = `
    query {
      ${repositoryQueries}
    }`;

  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  });

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API returned ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  const parsedData = GithubGraphqlApiResponseSchema.safeParse(data);

  if (!parsedData.success || !parsedData.data) {
    throw new Error(parsedData.error.message);
  }

  return npmPackages.map((pkg) => {
    if (!pkg || !pkg.repository?.url) {
      return null;
    }
    const repo = parseGithubUrl(pkg.repository.url);
    if (!repo) {
      return null;
    }
    const alias = repoHash(repo);
    const repoData = parsedData.data.data[alias];
    return {
      packageName: pkg.name,
      url: `https://github.com/${repo.owner}/${repo.name}`,
      ...repoData,
    };
  });
}

/**
 * Fetches npm package data from the npm registry.
 * @param packageName
 * @returns
 */
export async function fetchNpmPackageData(packageName: string) {
  const res = await fetch(`https://registry.npmjs.org/${packageName}`);

  if (!res.ok) {
    // throw new Error("Failed to fetch npm package data");
    return null;
  }

  const data = await res.json();
  const parsedData = NpmPackageDataSchema.safeParse(data);

  if (!parsedData.success) {
    // throw new Error(
    //   `Invalid npm package data for ${packageName}: ${parsedData.error.message}`
    // );
    return null;
  }

  return {
    name: packageName,
    url: `https://www.npmjs.com/package/${packageName}`,
    ...parsedData.data,
  };
}

/**
 * Fetches npm package data for a list of package names.
 * @param packageNames
 * @returns
 */
export async function fetchNpmPackagesData(packageNames: string[]) {
  if (packageNames.length === 0) {
    return [];
  }

  const results = await Promise.all(
    packageNames.map((pkg) => fetchNpmPackageData(pkg))
  );

  return results;
}

/**
 * Fetches dependencies from package.json hosted on a GitHub repository.
 * @param url
 * @returns
 */
export async function fetchDependencies(url: string) {
  const parsed = parseGithubUrl(url);

  if (!parsed) {
    throw new Error("Invalid GitHub URL");
  }

  const rowUrl = `https://raw.githubusercontent.com/${parsed.owner}/${parsed.name}/${parsed.branch}/${parsed.filepath}`;
  const res = await fetch(rowUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch package.json");
  }

  const data = await res.text();
  const parsedData = PackageJsonSchema.safeParse(JSON.parse(data));

  if (!parsedData.success) {
    throw new Error("Invalid package.json format");
  }

  const dependencies: { name: string; version: string; group: string }[] = [];

  for (const [groupName, deps] of Object.entries(parsedData.data)) {
    for (const [name, version] of Object.entries(deps)) {
      dependencies.push({ name, version, group: groupName });
    }
  }

  return dependencies;
}

export type NpmPackageData = Awaited<ReturnType<typeof fetchNpmPackageData>>;
export type GithubRepoData = Awaited<
  ReturnType<typeof fetchGithubReposData>
>[number];
export type Dependency = Awaited<ReturnType<typeof fetchDependencies>>[number];
export type Package = Dependency & {
  npm: NpmPackageData | null;
  github: GithubRepoData | null;
};
