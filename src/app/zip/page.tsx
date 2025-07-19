"use client";

import { getPackagesData } from "@/app/zip/actions";
import InputForm from "@/components/input-form";
import PackageCard from "@/components/package-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NpmPackage } from "@/lib/npm";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { Suspense, useEffect, useMemo, useState } from "react";

const sortBy = {
  stars: {
    label: "Stars",
    fn: (a: NpmPackage, b: NpmPackage) =>
      (b.github.stars ?? 0) - (a.github.stars ?? 0),
  },
  name: {
    label: "Name",
    fn: (a: NpmPackage, b: NpmPackage) => a.name.localeCompare(b.name),
  },
};

function ZipPageContent() {
  const [query, setQuery] = useQueryState("q", {
    defaultValue: "",
  });
  const [packages, setPackages] = useState<NpmPackage[]>([]);
  const [loading, setLoading] = useState(!!query);
  const [error, setError] = useState<string | null>(null);
  const [activeGroups, setActiveGroups] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<keyof typeof sortBy>("stars");

  const groupNames = useMemo(
    () =>
      packages.reduce((acc, pkg) => {
        if (!acc.includes(pkg.group)) acc.push(pkg.group);
        return acc;
      }, [] as string[]),
    [packages]
  );

  const computedPackages = useMemo(() => {
    return packages
      .filter((pkg) => activeGroups.includes(pkg.group))
      .sort(sortBy[sortKey].fn);
  }, [packages, activeGroups, sortKey]);

  const onSubmit = (q: string) => {
    if (q.trim() === "" || query === q) return;
    setQuery(q);
  };

  const fetchData = async (q: string) => {
    setLoading(true);
    setError(null);
    const result = await getPackagesData(q);
    setPackages(result.data);
    setError(result.error);
    setLoading(false);
  };

  useEffect(() => {
    if (!query) return;
    fetchData(query);
  }, [query]);

  useEffect(() => {
    setActiveGroups(groupNames);
  }, [groupNames]);

  return (
    <div className="max-w-5xl mx-auto px-6 font-mono">
      <InputForm onSubmit={onSubmit} defaultQuery={query} />
      <div className="flex items-center mt-4">
        <div className="flex gap-px">
          {groupNames.map((groupName) => {
            const isActive = activeGroups.includes(groupName);
            return (
              <Button
                key={groupName}
                size="sm"
                variant={isActive ? "default" : "outline"}
                className={cn("", !isActive && "opacity-50")}
                onClick={() => {
                  setActiveGroups((prev) =>
                    isActive
                      ? prev.filter((g) => g !== groupName)
                      : [...prev, groupName]
                  );
                }}
              >
                {groupName}
              </Button>
            );
          })}
        </div>
        <div className="ml-auto">
          <Select
            value={sortKey}
            onValueChange={(value) => setSortKey(value as keyof typeof sortBy)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent align="end">
              {Object.entries(sortBy).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {loading && (
        <div className="flex items-center justify-center gap-2 mt-20 animate-bounce">
          Loading packages...
          <div className="w-[4px] h-[0.7lh] bg-foreground/80 animate-caret-blink"></div>
        </div>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && computedPackages.length === 0 && (
        <p className="flex justify-center mt-20 text-foreground/60">
          No packages found.
        </p>
      )}
      {!loading && !error && computedPackages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {computedPackages.map((pkg, index) => (
            <PackageCard key={index} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ZipPage() {
  return (
    <Suspense>
      <ZipPageContent />
    </Suspense>
  );
}
