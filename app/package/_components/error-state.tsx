"use client";

import { AlertTriangle } from "lucide-react";

export const ErrorState = ({
  message,
  onRetry,
  onClear,
}: {
  message: string;
  onRetry: () => void;
  onClear: () => void;
}) => (
  <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
    <AlertTriangle className="size-10 text-destructive" />
    <h2 className="text-lg font-medium">Failed to load package.json</h2>
    <p className="text-sm text-muted-foreground max-w-md">{message}</p>
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
      >
        Retry
      </button>
      <button
        type="button"
        onClick={onClear}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Clear Input
      </button>
    </div>
  </div>
);
