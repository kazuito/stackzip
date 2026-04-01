"use client";

import { ExternalLink } from "lucide-react";
import type { PackageJson } from "@/features/package-json/types";

function repoUrl(repo: PackageJson["repository"]): string | undefined {
  if (!repo) return undefined;
  if (typeof repo === "string") return repo;
  return repo.url
    ?.replace(/^git\+/, "")
    .replace(/\.git$/, "")
    .replace(/^git:\/\//, "https://")
    .replace(/^ssh:\/\/git@/, "https://");
}

function licenseLabel(license: PackageJson["license"]): string | undefined {
  if (!license) return undefined;
  if (typeof license === "string") return license;
  return license.type ?? license.url;
}

export const SourceSidebar = ({
  pkg,
  depCounts,
}: {
  pkg: PackageJson;
  depCounts: Record<string, number>;
}) => {
  const repo = repoUrl(pkg.repository);
  const license = licenseLabel(pkg.license);
  const depCountEntries = Object.entries(depCounts);

  return (
    <aside className="rounded-lg border bg-card p-5 space-y-4 text-sm">
      <div className="font-accent text-lg">{pkg.name ?? "(Unknown)"}</div>
      {pkg.version && (
        <div>
          <span className="text-muted-foreground">Version</span>
          <p className="font-mono">{pkg.version}</p>
        </div>
      )}
      {pkg.description && (
        <div>
          <span className="text-muted-foreground">Description</span>
          <p>{pkg.description}</p>
        </div>
      )}
      {license && (
        <div>
          <span className="text-muted-foreground">License</span>
          <p>{license}</p>
        </div>
      )}

      {(pkg.homepage || repo) && (
        <div className="flex flex-col gap-1">
          {pkg.homepage && (
            <a
              href={pkg.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="size-3.5" /> Homepage
            </a>
          )}
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="size-3.5" /> Repository
            </a>
          )}
        </div>
      )}

      <div>
        <span className="text-muted-foreground">Dependencies</span>
        <div className="mt-1 space-y-0.5">
          {depCountEntries.length > 0 ? (
            depCountEntries.map(([type, count]) => (
              <div key={type} className="flex justify-between">
                <span>{type}</span>
                <span className="font-mono text-muted-foreground">{count}</span>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No dependencies</p>
          )}
        </div>
      </div>
    </aside>
  );
};
