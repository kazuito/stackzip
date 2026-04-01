"use client";

import { Package } from "lucide-react";
import { use, useMemo, useState } from "react";
import { PackageCardContext } from "./package-card-context";

export const PackageCardIcon = () => {
  const data = use(PackageCardContext)!;
  const [srcIndex, setSrcIndex] = useState(0);

  const sources = useMemo(() => {
    const srcs: string[] = [];

    if (data.repositoryUrl) {
      const match = data.repositoryUrl.match(/github\.com\/([^/]+)/);
      if (match) {
        srcs.push(`https://github.com/${match[1]}.png?size=64`);
      }
    }

    if (data.homepage) {
      try {
        const origin = new URL(data.homepage).origin;
        srcs.push(`${origin}/favicon.svg`);
        srcs.push(`${origin}/favicon.png`);
        srcs.push(`${origin}/favicon.ico`);
      } catch {
        // invalid URL — skip homepage favicons
      }
    }

    return srcs;
  }, [data.repositoryUrl, data.homepage]);

  if (srcIndex >= sources.length) {
    return <Package className="size-6 shrink-0 text-muted-foreground" />;
  }

  return (
    // biome-ignore lint/performance/noImgElement: external URLs with onError fallback chain — next/image can't handle this
    <img
      src={sources[srcIndex]}
      alt=""
      className="size-6 shrink-0 rounded"
      onError={() => setSrcIndex((i) => i + 1)}
    />
  );
};
