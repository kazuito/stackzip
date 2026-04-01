"use client";

import { cn } from "@/lib/utils";

export type SortKey = "name" | "published" | "latest";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "name", label: "Name (A → Z)" },
  { value: "published", label: "Last Published" },
  { value: "latest", label: "Latest Version" },
];

export const SortSelect = ({
  value,
  onChange,
  className,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
  className?: string;
}) => (
  <div className={cn("flex items-center gap-2 text-sm", className)}>
    <label htmlFor="sort-select" className="text-muted-foreground">
      Sort by
    </label>
    <select
      id="sort-select"
      value={value}
      onChange={(e) => onChange(e.target.value as SortKey)}
      className="rounded-md border bg-background px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-ring/50"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
