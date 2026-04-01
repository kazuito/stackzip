import type { PackageJson } from "../types";

export async function fetchPackageJson(url: string): Promise<PackageJson> {
  const res = await fetch(url);
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
