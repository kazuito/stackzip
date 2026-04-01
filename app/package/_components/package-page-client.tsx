"use client";

import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { UrlInput } from "@/components/url-input";
import { usePackageJson } from "@/features/package-json/hooks/use-package-json";
import { DEP_TYPES, type DepEntry } from "@/features/package-json/types";
import { DepSection } from "./dep-section";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { SourceSidebar } from "./source-sidebar";

export const PackagePageClient = () => {
  const router = useRouter();
  const [src, setSrc] = useQueryState("src", parseAsString);
  const { data: pkg, isLoading, isError, error, refetch } = usePackageJson(src);

  const handleSubmit = (url: string) => {
    setSrc(url);
  };

  const handleClear = () => {
    router.push("/");
  };

  if (!src) {
    router.push("/");
    return null;
  }

  if (isError) {
    return (
      <ErrorState
        message={error?.message ?? "Unknown error"}
        onRetry={() => refetch()}
        onClear={handleClear}
      />
    );
  }

  const entriesByType: Record<string, DepEntry[]> = {};
  const depCounts: Record<string, number> = {};
  let totalDeps = 0;

  if (pkg) {
    for (const type of DEP_TYPES) {
      const deps = pkg[type];
      if (!deps) continue;
      const entries = Object.entries(deps).map(([name, range]) => ({
        name,
        range,
        type,
      }));
      if (entries.length > 0) {
        entriesByType[type] = entries;
        depCounts[type] = entries.length;
        totalDeps += entries.length;
      }
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
      <UrlInput defaultValue={src} onSubmit={handleSubmit} />

      {isLoading && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list never reorders
              key={`skeleton-${i}`}
              className="rounded-lg border bg-card p-4 space-y-3 animate-pulse"
            >
              <div className="h-4 w-2/3 rounded bg-muted" />
              <div className="h-3 w-full rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted" />
            </div>
          ))}
        </div>
      )}

      {pkg && totalDeps === 0 && <EmptyState />}

      {pkg && totalDeps > 0 && (
        <div className="flex gap-8">
          <div className="flex-1 min-w-0 space-y-8">
            {DEP_TYPES.map((type) =>
              entriesByType[type] ? (
                <DepSection
                  key={type}
                  type={type}
                  entries={entriesByType[type]}
                />
              ) : null,
            )}
          </div>
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-20">
              <SourceSidebar pkg={pkg} depCounts={depCounts} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
