import { cn } from "@/lib/utils";

export const PackageCardSkeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "border bg-card p-4 animate-pulse space-y-2.5 flex flex-col",
      className,
    )}
  >
    <div className="flex items-center gap-2">
      <div className="size-6 shrink-0 rounded bg-muted" />
      <div className="h-4 min-w-0 flex-1 rounded bg-muted" />
      <div className="ml-auto h-4 w-12 rounded bg-muted" />
    </div>
    <div className="space-y-1.5">
      <div className="h-3 w-full rounded bg-muted" />
      <div className="h-3 w-4/5 rounded bg-muted" />
    </div>
    <div className="mt-auto flex items-center justify-between gap-3">
      <div className="h-5 w-10 rounded bg-muted" />
      <div className="flex gap-2">
        <div className="h-3.5 w-3.5 rounded bg-muted" />
        <div className="h-3.5 w-3.5 rounded bg-muted" />
        <div className="h-3.5 w-3.5 rounded bg-muted" />
      </div>
    </div>
  </div>
);
