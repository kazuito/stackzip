import type { NpmPackage } from "../types";

export async function fetchNpmPackage(name: string): Promise<NpmPackage> {
  const res = await fetch(
    `https://registry.npmjs.org/${encodeURIComponent(name)}`,
    {
      headers: { Accept: "application/json" },
    },
  );
  if (!res.ok) {
    throw new Error(`npm registry error: ${res.status}`);
  }
  return res.json();
}
