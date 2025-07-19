"use server";

import {
  fetchDependencies,
  fetchGithubReposData,
  fetchNpmPackagesData,
  Package,
} from "../../lib/npm";

export async function getDependencies(query: string) {
  return await fetchDependencies(query);
}

export async function getNpmPackagesData(packageNames: string[]) {
  return await fetchNpmPackagesData(packageNames);
}

export async function getGithubReposData(packages: Package[]) {
  return await fetchGithubReposData(packages);
}
