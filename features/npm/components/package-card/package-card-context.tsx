"use client";

import { createContext, use } from "react";
import type { NpmPackageData } from "../../types";

export const PackageCardContext = createContext<NpmPackageData | null>(null);

export function usePackageCard(): NpmPackageData {
  const data = use(PackageCardContext);
  if (!data) throw new Error("usePackageCard must be used within PackageCard");
  return data;
}
