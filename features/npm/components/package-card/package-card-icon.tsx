"use client";

import { PackageLogo } from "../package-logo";
import { usePackageCard } from "./package-card-context";

export const PackageCardIcon = () => {
  const data = usePackageCard();
  return (
    <PackageLogo repositoryUrl={data.repositoryUrl} homepage={data.homepage} />
  );
};
