"use client";

import { use } from "react";
import { PackageCardContext } from "./package-card-context";

export const PackageCardName = () => {
  const data = use(PackageCardContext)!;
  return (
    <h3 className="font-semibold text-sm truncate">
      <a
        href={`https://npmx.dev/package/${data.name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {data.name}
      </a>
    </h3>
  );
};
