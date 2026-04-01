"use client";

import { ArrowRight } from "lucide-react";
import { type SubmitEvent, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const UrlInput = ({
  defaultValue = "",
  onSubmit,
  className,
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  defaultValue?: string;
  onSubmit: (url: string) => void;
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full items-center gap-2", className)}
      {...props}
    >
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Paste a package.json URL or npm package..."
          className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/50"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Analyze
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
};
