"use client";

import { usePackageCard } from "./package-card-context";

export const PackageCardDescription = () => {
  const data = usePackageCard();
  if (!data.description) return null;
  return (
    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
      {data.description}
    </p>
  );
};
