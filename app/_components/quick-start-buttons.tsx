"use client";

import { Link2Icon, PackageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const EXAMPLE_GROUPS = [
  {
    label: "Package",
    icon: PackageIcon,
    examples: [
      { label: "eslint", value: "eslint" },
      { label: "axios", value: "axios" },
      { label: "typescript@6.0.2", value: "typescript@6.0.2" },
    ],
  },
  {
    label: "URL",
    icon: Link2Icon,
    examples: [
      {
        label: "Next.js",
        value:
          "https://raw.githubusercontent.com/vercel/next.js/canary/package.json",
      },
      {
        label: "Vite",
        value:
          "https://raw.githubusercontent.com/vitejs/vite/main/package.json",
      },
      {
        label: "shadcn/ui",
        value:
          "https://raw.githubusercontent.com/shadcn-ui/ui/main/package.json",
      },
    ],
  },
];

export const QuickStartButtons = () => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-2.5 text-left">
      <p className="text-center text-xs text-muted-foreground/60 tracking-wide">
        or try an example
      </p>
      <div className="flex flex-col items-center gap-2">
        {EXAMPLE_GROUPS.map((group) => {
          const Icon = group.icon;
          return (
            <div
              key={group.label}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="flex items-center gap-1.5 mr-2 text-sm text-muted-foreground max-sm:hidden">
                <Icon className="size-4" />
                {group.label}
              </span>
              {group.examples.map((example) => (
                <button
                  key={example.label}
                  type="button"
                  onClick={() =>
                    router.push(
                      `/package?src=${encodeURIComponent(example.value)}`,
                    )
                  }
                  className="rounded-md border border-border/50 bg-muted/40 px-2.5 py-1 font-mono text-xs text-muted-foreground/80 transition-colors hover:border-border hover:bg-muted hover:text-foreground"
                >
                  {example.label}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
