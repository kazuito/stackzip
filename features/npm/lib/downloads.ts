import type { NpmDownloads } from "../types";

export async function fetchNpmDownloads(name: string): Promise<NpmDownloads> {
  const res = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(name)}`,
  );
  if (!res.ok) {
    throw new Error(`npm downloads error: ${res.status}`);
  }
  return res.json();
}
