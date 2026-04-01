"use client";

import { use } from "react";
import { PackageCardContext } from "./package-card-context";

export const PackageCardMeta = () => {
  const data = use(PackageCardContext)!;
  if (!data.license) return null;
  return (
    <span className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
      {data.license}
    </span>
  );
};
