"use client";

import {
  ChevronUp as ChevronUpIcon,
  ExternalLink as ExternalLinkIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PackageLogo } from "@/features/npm/components/package-logo";
import type { PackageJson } from "@/features/package-json/types";
import { npmxKeywordSearchUrl, npmxPackageUrl } from "@/lib/npmx";
import { cn } from "@/lib/utils";

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

function authorLabel(author: PackageJson["author"]): string | undefined {
  if (!author) return undefined;
  if (typeof author === "string") return author;
  return author.name ?? author.email ?? author.url;
}

function bugsUrl(bugs: PackageJson["bugs"]): string | undefined {
  if (!bugs) return undefined;
  if (typeof bugs === "string") return bugs;
  return bugs.url;
}

function keywordList(keywords: PackageJson["keywords"]): string[] {
  if (!keywords) return [];
  const list = typeof keywords === "string" ? keywords.split(",") : keywords;
  return [...new Set(list.map((keyword) => keyword.trim()).filter(Boolean))];
}

function bugsEmail(bugs: PackageJson["bugs"]): string | undefined {
  if (!bugs || typeof bugs === "string") return undefined;
  return bugs.email;
}

const SidebarField = ({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) => (
  <div className="min-w-0">
    <span className="text-muted-foreground">{label}</span>
    <p className={cn("min-w-0 wrap-anywhere", mono && "font-mono")}>{value}</p>
  </div>
);

const SidebarLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
  >
    <ExternalLinkIcon className="size-3.5" /> {label}
  </a>
);

type SourceSidebarProps = {
  pkg: PackageJson;
  depCounts: Record<string, number>;
};

export const SourceSidebar = ({
  pkg,
  depCounts,
  className,
}: SourceSidebarProps & { className?: string }) => {
  const repo = repoUrl(pkg.repository);
  const license = licenseLabel(pkg.license);
  const author = authorLabel(pkg.author);
  const bugs = bugsUrl(pkg.bugs);
  const bugsContact = bugsEmail(pkg.bugs);
  const keywords = keywordList(pkg.keywords);
  const entryPoints = [
    { label: "main", value: pkg.main },
    { label: "module", value: pkg.module },
    { label: "types", value: pkg.types ?? pkg.typings },
  ].filter((entry): entry is { label: string; value: string } =>
    Boolean(entry.value),
  );
  const depCountEntries = Object.entries(depCounts);

  return (
    <aside
      className={cn(
        "min-w-0 rounded-lg border bg-card p-5 text-sm space-y-4",
        className,
      )}
    >
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <PackageLogo
            key={pkg.name}
            repositoryUrl={repo}
            homepage={pkg.homepage}
          />
          {pkg.name ? (
            <Link
              href={npmxPackageUrl(pkg.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-accent text-lg hover:underline"
            >
              {pkg.name}
            </Link>
          ) : (
            <div className="font-accent text-lg">(Unknown)</div>
          )}
          {pkg.private && <Badge variant="secondary">private</Badge>}
        </div>
        {pkg.description && (
          <p className="text-muted-foreground">{pkg.description}</p>
        )}
      </div>

      <div className="space-y-4">
        {pkg.version && (
          <SidebarField label="Version" value={pkg.version} mono />
        )}
        {license && <SidebarField label="License" value={license} />}
        {author && <SidebarField label="Author" value={author} />}
        {pkg.packageManager && (
          <SidebarField
            label="Package Manager"
            value={pkg.packageManager}
            mono
          />
        )}
        {pkg.type && <SidebarField label="Module Type" value={pkg.type} mono />}
        {pkg.engines?.node && (
          <SidebarField label="Node" value={pkg.engines.node} mono />
        )}
      </div>

      {entryPoints.length > 0 && (
        <div className="flex flex-col gap-1">
          <div className="text-muted-foreground">Entry Points</div>
          <div>
            {entryPoints.map((entry) => (
              <div
                key={entry.label}
                className="flex min-w-0 justify-between gap-3"
              >
                <span className="shrink-0">{entry.label}</span>
                <span className="min-w-0 truncate font-mono text-muted-foreground">
                  {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {keywords.length > 0 && (
        <div className="space-y-2">
          <div className="text-muted-foreground">Keywords</div>
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((keyword) => (
              <Badge
                render={
                  <Link
                    href={npmxKeywordSearchUrl(keyword)}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                key={keyword}
                variant="outline"
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {(pkg.homepage || repo || bugs || bugsContact) && (
        <div className="flex flex-col gap-1">
          {pkg.homepage && <SidebarLink href={pkg.homepage} label="Homepage" />}
          {repo && <SidebarLink href={repo} label="Repository" />}
          {bugs && <SidebarLink href={bugs} label="Issues" />}
          {bugsContact && (
            <a
              href={`mailto:${bugsContact}`}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLinkIcon className="size-3.5" /> Bugs Email
            </a>
          )}
        </div>
      )}

      <div>
        <div className="text-muted-foreground">Dependencies</div>
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

export const SourceSidebarDrawer = ({ pkg, depCounts }: SourceSidebarProps) => (
  <Drawer showSwipeHandle>
    <DrawerTrigger
      render={
        <Button
          variant="outline"
          size="lg"
          className="w-full justify-start gap-2 bg-card"
        />
      }
    >
      <PackageLogo
        key={pkg.name}
        repositoryUrl={repoUrl(pkg.repository)}
        homepage={pkg.homepage}
        className="size-5"
      />
      <span className="truncate font-accent">{pkg.name ?? "(Unknown)"}</span>
      {pkg.version && (
        <span className="font-mono text-muted-foreground">{pkg.version}</span>
      )}
      <ChevronUpIcon className="ml-auto text-muted-foreground" />
    </DrawerTrigger>
    <DrawerContent>
      <DrawerTitle className="sr-only">Package details</DrawerTitle>
      <div className="overflow-y-auto">
        <SourceSidebar
          pkg={pkg}
          depCounts={depCounts}
          className="rounded-none border-0 bg-transparent"
        />
      </div>
    </DrawerContent>
  </Drawer>
);
