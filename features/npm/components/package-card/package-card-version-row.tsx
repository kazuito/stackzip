"use client";

import { use } from "react";
import { cn } from "@/lib/utils";
import { PackageCardContext } from "./package-card-context";

const statusColor = {
  current: "text-green-400",
  minor: "text-amber-400",
  major: "text-red-400",
} as const;

export const PackageCardVersionRow = () => {
  const data = use(PackageCardContext)!;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-muted-foreground font-mono">{data.range}</span>
      <span className="text-muted-foreground">→</span>
      <span
        className={cn(
          "font-mono font-medium",
          statusColor[data.outdatedStatus],
        )}
      >
        {data.latest}
      </span>
    </div>
  );
};
