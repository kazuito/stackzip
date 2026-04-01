"use client";

import { use } from "react";
import { formatDownloads } from "../../lib/format";
import { PackageCardContext } from "./package-card-context";

export const PackageCardMeta = () => {
  const data = use(PackageCardContext)!;
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      {data.license && (
        <span className="rounded bg-muted px-1.5 py-0.5 font-medium">
          {data.license}
        </span>
      )}
      {data.downloads > 0 && <span>{formatDownloads(data.downloads)}/wk</span>}
    </div>
  );
};
