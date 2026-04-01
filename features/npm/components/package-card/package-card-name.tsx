"use client";

import { npmxPackageUrl } from "@/lib/npmx";
import { usePackageCard } from "./package-card-context";

export const PackageCardName = () => {
  const data = usePackageCard();
  return (
    <h3 className="relative z-20 min-w-0 text-sm font-semibold">
      <a
        href={npmxPackageUrl(data.name)}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:underline truncate transition-colors hover:text-foreground"
      >
        {data.name}
      </a>
    </h3>
  );
};
