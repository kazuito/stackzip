import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const PackageCardSkeleton = ({ className }: { className?: string }) => (
  <Skeleton className={cn("border min-h-34 h-full", className)}></Skeleton>
);
