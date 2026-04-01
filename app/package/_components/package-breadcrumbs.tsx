"use client";

import { ChevronRight as ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PackageBreadcrumbItem {
  label: string;
  src: string;
}

export const PackageBreadcrumbs = ({
  items,
  onNavigate,
}: {
  items: PackageBreadcrumbItem[];
  onNavigate: (index: number) => void;
}) => {
  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <PackageBreadcrumbRow
              key={`${item.src}-${index}`}
              index={index}
              isLast={isLast}
              item={item}
              onNavigate={onNavigate}
            />
          );
        })}
      </ol>
    </nav>
  );
};

const PackageBreadcrumbRow = ({
  index,
  isLast,
  item,
  onNavigate,
}: {
  index: number;
  isLast: boolean;
  item: PackageBreadcrumbItem;
  onNavigate: (index: number) => void;
}) => (
  <>
    <li className="inline-flex items-center gap-1">
      {isLast ? (
        <span
          aria-current="page"
          className="max-w-48 truncate text-foreground sm:max-w-none"
        >
          {item.label}
        </span>
      ) : (
        <a
          href={`?src=${encodeURIComponent(item.src)}`}
          className={cn(
            "max-w-40 truncate transition-colors hover:text-foreground sm:max-w-none",
          )}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(index);
          }}
        >
          {item.label}
        </a>
      )}
    </li>
    {!isLast && (
      <li aria-hidden="true" className="[&>svg]:size-3.5">
        <ChevronRightIcon />
      </li>
    )}
  </>
);
