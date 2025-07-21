"use server";

import {
  fetchGithubReposData,
  fetchNpmPackagesData,
  fetchPackageJson,
  NpmPackageData,
} from "../../lib/packages";

export async function getPackageJson(query: string) {
  return await fetchPackageJson(query);
}

export async function getNpmPackagesData(packageNames: string[]) {
  return await fetchNpmPackagesData(packageNames);
}

export async function getGithubReposData(packages: NpmPackageData[]) {
  return await fetchGithubReposData(packages);
}
