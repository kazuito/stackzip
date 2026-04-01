"use client";

import { createContext } from "react";
import type { NpmPackageData } from "../../types";

export const PackageCardContext = createContext<NpmPackageData | null>(null);
