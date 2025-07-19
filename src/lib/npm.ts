import parseGithubUrl from "parse-github-url";
import z from "zod";
import { fetchRepoStars } from "./github";

const NpmPackageMetadataSchema = z.object({
  license: z.string().optional(),
  description: z.string().optional(),
  repository: z
    .object({
      url: z.string(),
    })
    .optional(),
});

export async function fetchPackagesData(url: string) {
  const packages = await fetchPackageJson(url);

  const packagesWithNpmMetadata = await Promise.all(
    packages.map(async (pkg) => {
      const packageData = await fetchNpmPackageMetadata(pkg.name);
      const repo = parseGithubUrl(packageData.repository?.url ?? "");
      return {
        ...pkg,
        npm: {
          ...packageData,
          url: `https://www.npmjs.com/package/${pkg.name}`,
          repository: {
            url: packageData.repository?.url ?? "",
            owner: repo?.owner ?? null,
            name: repo?.name ?? null,
          },
        },
      };
    })
  );

  const packageStarsData = await fetchRepoStars(
    packagesWithNpmMetadata
      .map((pkg) => ({
        owner: pkg.npm.repository.owner,
        name: pkg.npm.repository.name,
      }))
      .filter((repo) => repo.owner && repo.name)
  );

  const packagesData = packagesWithNpmMetadata.map((pkg) => {
    const star = packageStarsData.find(
      (repo) =>
        repo.owner === pkg.npm.repository.owner &&
        repo.name === pkg.npm.repository.name
    );
    return {
      ...pkg,
      github: {
        url: `https://github.com/${pkg.npm.repository.owner}/${pkg.npm.repository.name}`,
        stars: star?.stars ?? null,
      },
    };
  });

  return packagesData;
}

export async function fetchNpmPackageMetadata(packageName: string) {
  const res = await fetch(`https://registry.npmjs.org/${packageName}`);

  if (!res.ok) {
    // throw new Error("Failed to fetch npm package data");
    return {};
  }

  const data = await res.json();
  const parsedData = NpmPackageMetadataSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Invalid npm package data format");
  }

  return parsedData.data;
}

const packageJsonSchema = z.object({
  dependencies: z.record(z.string(), z.string()).optional(),
  devDependencies: z.record(z.string(), z.string()).optional(),
  peerDependencies: z.record(z.string(), z.string()).optional(),
});

export async function fetchPackageJson(url: string) {
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
  const parsedData = packageJsonSchema.safeParse(JSON.parse(data));

  if (!parsedData.success) {
    throw new Error("Invalid package.json format");
  }

  const packages = Object.entries(parsedData.data).reduce<
    { name: string; version: string; group: string }[]
  >(
    (acc, [groupName, deps]) => [
      ...acc,
      ...Object.entries(deps).map(([name, version]) => ({
        name,
        version,
        group: groupName,
      })),
    ],
    []
  );

  return packages;
}

export type NpmPackage = Awaited<ReturnType<typeof fetchPackagesData>>[number];
