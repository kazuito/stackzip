"use client";

import InputForm from "@/components/input-form";
import PackageJsonCard from "@/components/pacage-json-card";
import PackageCard from "@/components/package/package-card";
import PackageDrawer from "@/components/package/package-drawer";
import { Button } from "@/components/ui/button";
import { Scroller } from "@/components/ui/scroller";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dependency,
  GithubRepoData,
  NpmPackageData,
  Package,
  PackageJsonData,
} from "@/lib/packages";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { Suspense, useEffect, useMemo, useState } from "react";
import { getGithubReposData, getNpmPackagesData, getPackageJson } from "./actions";

const sortBy = {
  stars: {
    label: "Stars",
    fn: (a: Package, b: Package) =>
      (b.github?.stargazerCount ?? 0) - (a.github?.stargazerCount ?? 0),
  },
  name: {
    label: "Name",
    fn: (a: Package, b: Package) => a.name.localeCompare(b.name) ?? 0,
  },
};

const LOADING_MESSAGES = {
  initial: "Reading package.json...",
  npm: "Loading npm data...",
  github: "Loading GitHub data...",
};

function ZipPageContent() {
  const [query, setQuery] = useQueryState("q", {
    defaultValue: "",
  });
  const [loadingMessage, setLoadingMessage] = useState(!!query ? LOADING_MESSAGES.initial : null);
  const [error, setError] = useState<string | null>(null);
  const [activeGroups, setActiveGroups] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<keyof typeof sortBy>("stars");
  const [sortDesc, setSortDesc] = useState(true);

  const [packageJsonData, setPackageJsonData] = useState<PackageJsonData>();

  const [dependencies, setDependencies] = useState<Dependency[]>([]);
  const [npmDataList, setNpmDataList] = useState<NpmPackageData[]>([]);
  const [githubDataList, setGithubDataList] = useState<GithubRepoData[]>([]);

  const [activePackage, setActivePackage] = useState<Package | null>(null);

  const packages = useMemo(() => {
    return dependencies.map((dep) => {
      const npmData = npmDataList.find((data) => data?.name === dep.name);
      const githubData = githubDataList.find((data) => data?.packageName === dep.name);
      return {
        ...dep,
        npm: npmData || null,
        github: githubData || null,
      };
    });
  }, [dependencies, npmDataList, githubDataList]);

  const computedPackages = useMemo(() => {
    const sorted = packages
      .filter((pkg) => activeGroups.includes(pkg.group))
      .sort(sortBy[sortKey].fn);
    return sortDesc ? sorted : sorted.reverse();
  }, [packages, activeGroups, sortKey, sortDesc]);

  const groupNames = useMemo(() => {
    const groupsSet = new Set<string>();
    dependencies.forEach((pkg) => groupsSet.add(pkg.group));
    const groups = Array.from(groupsSet).sort();
    setActiveGroups(groups);
    return groups;
  }, [dependencies]);

  const onSubmit = (q: string) => {
    if (q.trim() === "" || query === q) return;
    setQuery(q);
  };

  const fetchData = async (q: string) => {
    setError(null);
    try {
      setLoadingMessage(LOADING_MESSAGES.initial);
      const { metadata, dependencies: deps } = await getPackageJson(q);
      setPackageJsonData(metadata);
      setDependencies(deps);
      setLoadingMessage(LOADING_MESSAGES.npm);
      const npmDataListTemp = await getNpmPackagesData(deps.map((dep) => dep.name));
      setNpmDataList(npmDataListTemp);
      setLoadingMessage(LOADING_MESSAGES.github);
      const githubDataListTemp = await getGithubReposData(
        npmDataListTemp.filter((pkg): pkg is NpmPackageData => pkg !== null),
      );
      setGithubDataList(githubDataListTemp);
    } catch (err) {
      setError((err as Error).message || "An error occurred while fetching data.");
    } finally {
      setLoadingMessage(null);
    }
  };

  useEffect(() => {
    if (!query) return;
    fetchData(query);
  }, [query]);

  useEffect(() => {
    setActiveGroups(groupNames);
  }, [groupNames]);

  return (
    <div className="mx-auto max-w-5xl px-6 font-mono">
      <InputForm onSubmit={onSubmit} defaultQuery={query} />
      {packageJsonData && (
        <div className="transition-all duration-400 starting:scale-98 starting:blur-sm">
          <div className="mt-4">
            <PackageJsonCard data={packageJsonData} />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Scroller orientation="horizontal" className="flex grow" hideScrollbar>
              {groupNames.map((groupName) => {
                const isActive = activeGroups.includes(groupName);
                return (
                  <Button
                    key={groupName}
                    size="sm"
                    variant={isActive ? "default" : "outline"}
                    className={cn("-mr-px border", !isActive && "opacity-50")}
                    onClick={() => {
                      setActiveGroups((prev) =>
                        isActive ? prev.filter((g) => g !== groupName) : [...prev, groupName],
                      );
                    }}
                  >
                    {groupName}
                  </Button>
                );
              })}
              {activeGroups.length < groupNames.length && (
                <Button
                  size="sm"
                  variant="link"
                  className="ml-1 text-blue-500"
                  onClick={() => setActiveGroups(groupNames)}
                >
                  Show all
                </Button>
              )}
            </Scroller>
            <div className="ml-auto flex">
              <Button
                size="icon"
                variant="outline"
                className="-mr-px"
                onClick={() => setSortDesc(!sortDesc)}
                title="Toggle sort order"
              >
                <ListFilterIcon
                  className={cn("transition-all duration-400", !sortDesc && "rotate-x-180")}
                />
              </Button>
              <Select
                value={sortKey}
                onValueChange={(value) => setSortKey(value as keyof typeof sortBy)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectGroup>
                    <SelectLabel>Sort by</SelectLabel>
                    {Object.entries(sortBy).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
      {loadingMessage && (
        <div className="mt-20 flex animate-bounce items-center justify-center gap-2">
          {loadingMessage}
          <div className="bg-foreground/80 animate-caret-blink h-[0.7lh] w-[4px]"></div>
        </div>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loadingMessage && !error && computedPackages.length === 0 && (
        <p className="text-foreground/60 mt-20 flex justify-center transition-all duration-400 starting:-translate-y-2 starting:opacity-0 starting:blur-xs">
          No packages found.
        </p>
      )}
      {!loadingMessage && !error && computedPackages.length > 0 && (
        <div className="my-4 grid grid-cols-1 transition-all duration-400 sm:grid-cols-2 lg:grid-cols-3 starting:translate-y-2 starting:opacity-0 starting:blur-sm">
          {computedPackages.map((pkg) => (
            <PackageCard
              key={`${pkg.name}-${pkg.version}`}
              onClick={() => setActivePackage(pkg)}
              pkg={pkg}
            />
          ))}
        </div>
      )}
      <PackageDrawer pkg={activePackage} onClose={() => setActivePackage(null)} />
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
