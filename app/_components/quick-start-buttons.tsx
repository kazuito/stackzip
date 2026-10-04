"use client";

import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { PackageLogo } from "@/features/npm/components/package-logo";
import { useNpmPackage } from "@/features/npm/hooks/use-npm-package";

const EXAMPLES = ["next", "eslint", "vite", "express"];

const ExampleCard = ({ name, offset }: { name: string; offset: number }) => {
  const router = useRouter();
  const { data, isLoading } = useNpmPackage(name, "*");

  return (
    <button
      type="button"
      onClick={() => router.push(`/package?src=${encodeURIComponent(name)}`)}
      style={
        {
          "--o": offset,
          "--arc": `${offset * offset * 4}px`,
        } as React.CSSProperties
      }
      className="group/example absolute bottom-6 left-1/2 -ml-22 flex h-36 w-44 sm:-ml-26 sm:w-52 origin-bottom translate-x-[calc(var(--o)*var(--spread))] translate-y-[calc(var(--arc)-var(--lift,0px))] rotate-[calc(var(--o)*var(--tilt))] flex-col gap-2 border border-border/60 bg-card p-3 text-left shadow-lg shadow-black/20 transition-all duration-300 ease-out hover:z-10 hover:border-border hover:[--lift:20px] hover:[--tilt:0deg] focus-visible:z-10 focus-visible:[--lift:20px] focus-visible:[--tilt:0deg] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
    >
      <div className="flex w-full items-center gap-2">
        {isLoading ? (
          <Skeleton className="size-5 shrink-0" />
        ) : (
          <PackageLogo
            repositoryUrl={data?.repositoryUrl}
            homepage={data?.homepage}
            className="size-5"
          />
        )}
        <span className="truncate font-mono text-sm font-medium">{name}</span>
        {data?.latest && (
          <span className="ml-auto shrink-0 font-mono text-[11px] text-muted-foreground">
            v{data.latest}
          </span>
        )}
      </div>
      {isLoading ? (
        <div className="w-full space-y-1.5">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      ) : (
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {data?.description}
        </p>
      )}
      <span className="mt-auto flex items-center gap-1 text-[11px] text-muted-foreground/60 transition-colors group-hover/example:text-foreground">
        View dependencies
        <ArrowRightIcon className="size-3 transition-transform group-hover/example:translate-x-0.5" />
      </span>
    </button>
  );
};

export const QuickStartButtons = () => (
  <div className="flex flex-col items-center gap-3">
    <span className="text-[11px] uppercase tracking-widest text-muted-foreground/50">
      try
    </span>
    <div className="relative h-52 w-full [--spread:40px] [--tilt:4deg] sm:[--spread:110px] sm:[--tilt:6deg] sm:hover:[--spread:160px] sm:hover:[--tilt:3deg] sm:has-focus-visible:[--spread:160px]">
      {EXAMPLES.map((name, i) => (
        <ExampleCard
          key={name}
          name={name}
          offset={i - (EXAMPLES.length - 1) / 2}
        />
      ))}
    </div>
  </div>
);
