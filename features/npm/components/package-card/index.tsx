"use client";

import { cn } from "@/lib/utils";
import type { NpmPackageData } from "../../types";
import { PackageCardContext } from "./package-card-context";
import { PackageCardDescription } from "./package-card-description";
import { PackageCardIcon } from "./package-card-icon";
import { PackageCardLinks } from "./package-card-links";
import { PackageCardMeta } from "./package-card-meta";
import { PackageCardName } from "./package-card-name";
import { PackageCardSkeleton } from "./package-card-skeleton";
import { PackageCardVersion } from "./package-card-version-row";

const PackageCardRoot = ({
  data,
  className,
  ...props
}: React.ComponentProps<"div"> & { data: NpmPackageData }) => (
  <PackageCardContext value={data}>
    <div
      className={cn("rounded-lg border bg-card p-4 space-y-2.5", className)}
      {...props}
    />
  </PackageCardContext>
);

export const PackageCard = {
  Root: PackageCardRoot,
  Icon: PackageCardIcon,
  Name: PackageCardName,
  Version: PackageCardVersion,
  Description: PackageCardDescription,
  Links: PackageCardLinks,
  Meta: PackageCardMeta,
  Skeleton: PackageCardSkeleton,
};
