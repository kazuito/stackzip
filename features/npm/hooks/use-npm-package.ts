"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNpmDownloads } from "../lib/downloads";
import { fetchNpmPackage } from "../lib/registry";
import { getOutdatedStatus } from "../lib/semver";
import type { NpmPackageData } from "../types";

function normalizeRepoUrl(repo?: {
  type?: string;
  url?: string;
}): string | undefined {
  if (!repo?.url) return undefined;
  return repo.url
    .replace(/^git\+/, "")
    .replace(/\.git$/, "")
    .replace(/^git:\/\//, "https://")
    .replace(/^ssh:\/\/git@/, "https://");
}

export function useNpmPackage(name: string, range: string) {
  return useQuery<NpmPackageData>({
    queryKey: ["npm-package", name],
    queryFn: async () => {
      const [pkg, downloads] = await Promise.all([
        fetchNpmPackage(name),
        fetchNpmDownloads(name).catch(
          () => ({ downloads: 0 }) as { downloads: number },
        ),
      ]);

      return {
        name: pkg.name,
        description: pkg.description,
        license: pkg.license,
        homepage: pkg.homepage,
        repositoryUrl: normalizeRepoUrl(pkg.repository),
        latest: pkg["dist-tags"].latest,
        modified: pkg.time.modified,
        downloads: downloads.downloads,
        outdatedStatus: getOutdatedStatus(range, pkg["dist-tags"].latest),
        range,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}
