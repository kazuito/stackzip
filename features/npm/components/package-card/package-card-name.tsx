"use client";

import { usePackageCard } from "./package-card-context";

export const PackageCardName = () => {
  const data = usePackageCard();
  return (
    <h3 className="font-semibold text-sm truncate" title={data.name}>
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
