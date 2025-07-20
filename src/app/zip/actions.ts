"use server";

import {
  fetchDependencies,
  fetchGithubReposData,
  fetchNpmPackagesData,
  NpmPackageData,
  Package,
} from "../../lib/packages";

export async function getDependencies(query: string) {
  return await fetchDependencies(query);
}

export async function getNpmPackagesData(packageNames: string[]) {
  return await fetchNpmPackagesData(packageNames);
}

export async function getGithubReposData(packages: NpmPackageData[]) {
  return await fetchGithubReposData(packages);
}
