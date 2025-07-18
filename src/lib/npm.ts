import parseGithubUrl from "parse-github-url";
import z from "zod";
import { fetchRepoStars } from "./github";

const NpmPackageMetadataSchema = z.object({
  name: z.string(),
  license: z.string().optional(),
  description: z.string().optional(),
  repository: z
    .object({
      url: z.string(),
    })
    .optional(),
});

export async function fetchPackages(url: string) {
  const packageGroups = await fetchPackageJson(url);
  const flatPackages = await Promise.all(
    packageGroups
      .flatMap((group) => group.packages.map((pkg) => pkg))
      .map(async (pkg) => {
        const packageData = await fetchNpmPackageData(pkg.name);
        const repo = parseGithubUrl(packageData.repository?.url ?? "");
        return {
          ...pkg,
          npm: {
            ...packageData,
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
    flatPackages
      .map((pkg) => ({
        owner: pkg.npm.repository.owner,
        name: pkg.npm.repository.name,
      }))
      .filter((repo) => repo.owner && repo.name)
  );
  const packages = packageGroups.map((group) => ({
    group: group.group,
    packages: group.packages.map((pkg) => {
      const enrichedPkg = flatPackages.find(
        (fp) => fp.name === pkg.name && fp.version === pkg.version
      );
      const starsData = packageStarsData.find(
        (repo) =>
          repo.owner === enrichedPkg?.npm.repository.owner &&
          repo.name === enrichedPkg?.npm.repository.name
      );
      return {
        ...pkg,
        ...enrichedPkg,
        stars: starsData ? starsData.stars : null,
      };
    }),
  }));
  return packages;
}

export async function fetchNpmPackageData(packageName: string) {
  const res = await fetch(`https://registry.npmjs.org/${packageName}`);

  if (!res.ok) {
    throw new Error("Failed to fetch npm package data");
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

  return Object.entries(parsedData.data).map(
    ([groupName, deps]) => ({
      group: groupName,
      packages: Object.entries(deps as Record<string, string>).map(
        ([name, version]) => ({
          name,
          version,
        })
      ),
    }),
    {} as Record<string, { name: string; version: string }[]>
  );
}
