"use client";

import { cn } from "@/lib/utils";
import { usePackageCard } from "./package-card-context";

const statusColor = {
  current: "text-green-400",
  minor: "text-amber-400",
  major: "text-red-400",
} as const;

const statusMessage = {
  current: "Up to date",
  minor: "Minor update available",
  major: "Major update available",
} as const;

export const PackageCardVersion = () => {
  const data = usePackageCard();

  const tooltip =
    data.outdatedStatus === "current"
      ? statusMessage.current
      : `${statusMessage[data.outdatedStatus]}: ${data.latest}`;

  return (
    <span
      className={cn(
        "ml-auto shrink-0 font-mono text-xs font-medium",
        statusColor[data.outdatedStatus],
      )}
      title={tooltip}
    >
      {data.range}
    </span>
  );
};
