"use client";

import { Badge } from "@/components/ui/badge";
import { usePackageCard } from "./package-card-context";

export const PackageCardMeta = () => {
  const data = usePackageCard();
  if (!data.license) return null;
  return <Badge variant="secondary">{data.license}</Badge>;
};
