"use client";

import { PackageCard } from "@/features/npm/components/package-card";
import { useNpmPackage } from "@/features/npm/hooks/use-npm-package";
import type { DepEntry } from "@/features/package-json/types";
import { cn } from "@/lib/utils";

const DEP_LABELS: Record<string, string> = {
  dependencies: "dependencies",
  devDependencies: "devDependencies",
  peerDependencies: "peerDependencies",
  optionalDependencies: "optionalDependencies",
};

const PackageCardItem = ({ entry }: { entry: DepEntry }) => {
  const { data, isLoading, isError } = useNpmPackage(entry.name, entry.range);

  if (isError) return null;
  if (isLoading || !data) return <PackageCard.Skeleton />;

  return (
    <PackageCard.Root data={data}>
      <div className="flex items-center gap-2">
        <PackageCard.Icon />
        <PackageCard.Name />
        <PackageCard.Version />
      </div>
      <PackageCard.Description />
      <div className="flex items-center gap-3">
        <PackageCard.Meta />
        <PackageCard.Links />
      </div>
    </PackageCard.Root>
  );
};

export const DepSection = ({
  type,
  entries,
  className,
}: {
  type: string;
  entries: DepEntry[];
  className?: string;
}) => {
  if (entries.length === 0) return null;

  const sorted = [...entries].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="flex items-center gap-2 text-base font-semibold">
        {DEP_LABELS[type] ?? type}
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {entries.length}
        </span>
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((entry) => (
          <PackageCardItem key={entry.name} entry={entry} />
        ))}
      </div>
    </section>
  );
};
