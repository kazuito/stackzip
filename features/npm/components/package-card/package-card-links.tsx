"use client";

import { GitBranch, GlobeIcon, Package } from "lucide-react";
import { usePackageCard } from "./package-card-context";

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
  const data = usePackageCard();
  const showHomepage = data.homepage && data.homepage !== data.repositoryUrl;

  return (
    <div className="flex items-center gap-2 pointer-fine:group-hover/item:opacity-100 pointer-fine:opacity-30 transition-opacity duration-200 group-hover/item:duration-0">
      <LinkIcon href={`https://npmjs.com/package/${data.name}`} label="npm">
        <Package className="size-3.5" />
      </LinkIcon>
      {data.repositoryUrl && (
        <LinkIcon href={data.repositoryUrl} label="GitHub">
          <GitBranch className="size-3.5" />
        </LinkIcon>
      )}
      {showHomepage && (
        <LinkIcon href={data.homepage as string} label="Homepage">
          <GlobeIcon className="size-3.5" />
        </LinkIcon>
      )}
    </div>
  );
};
