"use client";

import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { UrlInput } from "@/components/url-input";
import { usePackageJson } from "@/features/package-json/hooks/use-package-json";
import { DEP_TYPES, type DepEntry } from "@/features/package-json/types";
import { DepSection } from "./dep-section";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import {
  type PackageBreadcrumbItem,
  PackageBreadcrumbs,
} from "./package-breadcrumbs";
import { SourceSidebar } from "./source-sidebar";

const BREADCRUMB_ITEM_SEPARATOR = "|";
const BREADCRUMB_VALUE_SEPARATOR = ">";

function parseBreadcrumbs(value: string | null): PackageBreadcrumbItem[] {
  if (!value) return [];

  return value.split(BREADCRUMB_ITEM_SEPARATOR).flatMap((item) => {
    if (!item) return [];

    const separatorIndex = item.indexOf(BREADCRUMB_VALUE_SEPARATOR);

    try {
      if (separatorIndex === -1) {
        const src = decodeURIComponent(item);
        return src ? [{ label: src, src }] : [];
      }

      const label = decodeURIComponent(item.slice(0, separatorIndex));
      const src = decodeURIComponent(item.slice(separatorIndex + 1));

      if (!label || !src) return [];
      return [{ label, src }];
    } catch {
      return [];
    }
  });
}

function serializeBreadcrumbs(items: PackageBreadcrumbItem[]): string | null {
  if (items.length === 0) return null;

  return items
    .map(({ label, src }) => {
      const encodedSrc = encodeURIComponent(src);
      if (label === src) return encodedSrc;

      return `${encodeURIComponent(label)}${BREADCRUMB_VALUE_SEPARATOR}${encodedSrc}`;
    })
    .join(BREADCRUMB_ITEM_SEPARATOR);
}

export const PackagePageClient = () => {
  const router = useRouter();
  const [src, setSrc] = useQueryState(
    "src",
    parseAsString.withOptions({ history: "push" }),
  );
  const [breadcrumbsQuery, setBreadcrumbsQuery] = useQueryState(
    "breadcrumbs",
    parseAsString.withOptions({ history: "push" }),
  );
  const breadcrumbs = parseBreadcrumbs(breadcrumbsQuery);
  const { data: pkg, isLoading, isError, error, refetch } = usePackageJson(src);
  const currentBreadcrumb = src ? { label: pkg?.name ?? src, src } : null;
  const breadcrumbItems = currentBreadcrumb
    ? [...breadcrumbs, currentBreadcrumb]
    : breadcrumbs;

  const handleSubmit = (nextSrc: string) => {
    void Promise.all([setSrc(nextSrc), setBreadcrumbsQuery(null)]);
  };

  const handlePackageSelect = (nextSrc: string) => {
    if (!src || nextSrc === src) return;

    const nextBreadcrumbs = serializeBreadcrumbs([
      ...breadcrumbs,
      { label: pkg?.name ?? src, src },
    ]);

    void Promise.all([setSrc(nextSrc), setBreadcrumbsQuery(nextBreadcrumbs)]);
  };

  const handleBreadcrumbNavigate = (index: number) => {
    const target = breadcrumbs[index];
    if (!target) return;

    void Promise.all([
      setSrc(target.src),
      setBreadcrumbsQuery(serializeBreadcrumbs(breadcrumbs.slice(0, index))),
    ]);
  };

  const handleClear = () => {
    router.push("/");
  };

  if (!src) {
    router.push("/");
    return null;
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
      <UrlInput defaultValue={src ?? ""} onSubmit={handleSubmit} />
      <PackageBreadcrumbs
        items={breadcrumbItems}
        onNavigate={handleBreadcrumbNavigate}
      />

      {isError && (
        <ErrorState
          message={error?.message ?? "Unknown error"}
          onRetry={() => refetch()}
          onClear={handleClear}
        />
      )}

      {!isError && isLoading && (
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

      {!isError && pkg && totalDeps === 0 && <EmptyState />}

      {!isError && pkg && totalDeps > 0 && (
        <div className="flex gap-8">
          <div className="flex-1 min-w-0 space-y-8">
            {DEP_TYPES.map((type) =>
              entriesByType[type] ? (
                <DepSection
                  key={type}
                  type={type}
                  entries={entriesByType[type]}
                  onPackageSelect={handlePackageSelect}
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
