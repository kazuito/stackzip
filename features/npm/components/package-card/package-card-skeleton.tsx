import { cn } from "@/lib/utils";

export const PackageCardSkeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "rounded-lg border bg-card p-4 space-y-3 animate-pulse",
      className,
    )}
  >
    <div className="flex items-center gap-2">
      <div className="size-6 shrink-0 rounded bg-muted" />
      <div className="h-4 w-2/3 rounded bg-muted" />
    </div>
    <div className="space-y-1.5">
      <div className="h-3 w-full rounded bg-muted" />
      <div className="h-3 w-4/5 rounded bg-muted" />
    </div>
    <div className="h-3 w-1/2 rounded bg-muted" />
    <div className="flex gap-2">
      <div className="h-3.5 w-3.5 rounded bg-muted" />
      <div className="h-3.5 w-3.5 rounded bg-muted" />
    </div>
    <div className="flex gap-2">
      <div className="h-5 w-10 rounded bg-muted" />
      <div className="h-5 w-16 rounded bg-muted" />
    </div>
  </div>
);
