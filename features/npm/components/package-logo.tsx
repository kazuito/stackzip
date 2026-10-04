"use client";

import { Package as PackageIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export const PackageLogo = ({
  repositoryUrl,
  homepage,
  className,
}: {
  repositoryUrl?: string;
  homepage?: string;
  className?: string;
}) => {
  const [srcIndex, setSrcIndex] = useState(0);

  const sources = useMemo(() => {
    const srcs: string[] = [];

    if (repositoryUrl) {
      const match = repositoryUrl.match(/github\.com\/([^/]+)/);
      if (match) {
        srcs.push(`https://github.com/${match[1]}.png?size=64`);
      }
    }

    if (homepage) {
      try {
        const origin = new URL(homepage).origin;
        srcs.push(`${origin}/favicon.svg`);
        srcs.push(`${origin}/favicon.png`);
        srcs.push(`${origin}/favicon.ico`);
      } catch {
        // invalid URL — skip homepage favicons
      }
    }

    return srcs;
  }, [repositoryUrl, homepage]);

  if (srcIndex >= sources.length) {
    return (
      <PackageIcon
        className={cn("size-6 shrink-0 text-muted-foreground", className)}
      />
    );
  }

  return (
    // biome-ignore lint/performance/noImgElement: external URLs with onError fallback chain — next/image can't handle this
    <img
      src={sources[srcIndex]}
      alt=""
      className={cn("size-6 shrink-0 rounded", className)}
      onError={() => setSrcIndex((i) => i + 1)}
    />
  );
};
