"use client";

import { useRouter } from "next/navigation";

const EXAMPLE_GROUPS = [
  {
    label: "Package",
    examples: [
      { label: "react", value: "react" },
      { label: "next@16.2.2", value: "next@16.2.2" },
      { label: "@babel/core@7.29.0", value: "@babel/core@7.29.0" },
    ],
  },
  {
    label: "URL",
    examples: [
      {
        label: "Next.js repo",
        value:
          "https://raw.githubusercontent.com/vercel/next.js/canary/package.json",
      },
      {
        label: "Vite repo",
        value:
          "https://raw.githubusercontent.com/vitejs/vite/main/package.json",
      },
      {
        label: "shadcn/ui repo",
        value:
          "https://raw.githubusercontent.com/shadcn-ui/ui/main/package.json",
      },
    ],
  },
];

export const QuickStartButtons = () => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-border/70 bg-card/40 p-4 text-left">
      <p className="text-sm text-muted-foreground">
        Examples. Click one to load it instantly.
      </p>
      {EXAMPLE_GROUPS.map((group) => (
        <div key={group.label} className="flex flex-wrap items-center gap-2">
          <span className="min-w-16 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/80">
            {group.label}
          </span>
          {group.examples.map((example) => (
            <button
              key={example.label}
              type="button"
              onClick={() =>
                router.push(`/package?src=${encodeURIComponent(example.value)}`)
              }
              className="rounded-md border border-border/70 bg-background px-3 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {example.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
