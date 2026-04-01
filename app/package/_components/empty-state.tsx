import { Package } from "lucide-react";

export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
    <Package className="size-10 text-muted-foreground" />
    <h2 className="text-lg font-medium">No dependencies found</h2>
    <p className="text-sm text-muted-foreground max-w-sm">
      This package.json doesn't declare any dependencies.
    </p>
  </div>
);
