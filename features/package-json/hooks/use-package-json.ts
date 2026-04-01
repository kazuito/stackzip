"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPackageJson } from "../lib/fetch";

export function usePackageJson(src: string | null) {
  return useQuery({
    queryKey: ["package-json", src],
    queryFn: () => fetchPackageJson(src as string),
    enabled: !!src,
    staleTime: 5 * 60 * 1000,
  });
}
