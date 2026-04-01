"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchNpmPackageAbbreviated,
  fetchNpmPackageLatest,
} from "../lib/registry";
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
      const [latest, abbreviated] = await Promise.all([
        fetchNpmPackageLatest(name),
        fetchNpmPackageAbbreviated(name),
      ]);

      return {
        name: latest.name,
        description: latest.description,
        license: latest.license,
        homepage: latest.homepage,
        repositoryUrl: normalizeRepoUrl(latest.repository),
        latest: abbreviated["dist-tags"].latest,
        modified: abbreviated.modified,
        outdatedStatus: getOutdatedStatus(
          range,
          abbreviated["dist-tags"].latest,
        ),
        range,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}
