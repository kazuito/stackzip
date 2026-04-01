"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { usePackageCard } from "./package-card-context";

const statusColor = {
  current: "text-muted-foreground",
  minor: "border-b border-dashed text-yellow-400 border-yellow-400",
  major: "border-b border-dashed text-red-400 border-red-400",
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
    <Tooltip>
      <TooltipTrigger className="ml-auto shrink-0" delay={100}>
        <span
          className={cn(
            "font-mono text-xs font-medium text-muted-foreground",
            statusColor[data.outdatedStatus],
          )}
        >
          {data.range}
        </span>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};
