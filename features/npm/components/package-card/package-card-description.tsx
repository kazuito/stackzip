"use client";

import { use } from "react";
import { PackageCardContext } from "./package-card-context";

export const PackageCardDescription = () => {
  const data = use(PackageCardContext)!;
  if (!data.description) return null;
  return (
    <p className="text-xs text-muted-foreground line-clamp-4 leading-relaxed">
      {data.description}
    </p>
  );
};
