"use server";

import { fetchPackagesData } from "../../lib/npm";

export async function getPackagesData(url: string) {
  try {
    return {
      data: await fetchPackagesData(url),
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
