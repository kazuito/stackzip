"use client";

import { usePackageCard } from "./package-card-context";

export const PackageCardName = () => {
  const data = usePackageCard();
  return <h3 className="font-semibold text-sm truncate">{data.name}</h3>;
};
