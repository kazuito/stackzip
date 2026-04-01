"use client";

import { ExternalLink, GitBranch, Package } from "lucide-react";
import { use } from "react";
import { PackageCardContext } from "./package-card-context";

const LinkIcon = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-muted-foreground hover:text-foreground transition-colors"
  >
    {children}
  </a>
);

export const PackageCardLinks = () => {
  const data = use(PackageCardContext)!;
  const showHomepage = data.homepage && data.homepage !== data.repositoryUrl;

  return (
    <div className="flex items-center gap-2">
      <LinkIcon href={`https://npmjs.com/package/${data.name}`} label="npm">
        <Package className="size-3.5" />
      </LinkIcon>
      {data.repositoryUrl && (
        <LinkIcon href={data.repositoryUrl} label="GitHub">
          <GitBranch className="size-3.5" />
        </LinkIcon>
      )}
      {showHomepage && (
        <LinkIcon href={data.homepage!} label="Homepage">
          <ExternalLink className="size-3.5" />
        </LinkIcon>
      )}
    </div>
  );
};
