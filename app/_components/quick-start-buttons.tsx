"use client";

import { useRouter } from "next/navigation";

const EXAMPLES = [
  { label: "react", value: "react" },
  { label: "next", value: "next" },
  { label: "eslint", value: "eslint" },
  { label: "vite", value: "vite" },
  { label: "axios", value: "axios" },
  { label: "express", value: "express" },
];

export const QuickStartButtons = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground/50">
        try
      </span>
      <div className="flex flex-wrap justify-center gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example.label}
            type="button"
            onClick={() =>
              router.push(`/package?src=${encodeURIComponent(example.value)}`)
            }
            className="border border-border/40 bg-card/50 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-200 hover:border-border hover:bg-card hover:text-foreground hover:shadow-[0_0_20px_-5px] hover:shadow-foreground/5"
          >
            {example.label}
          </button>
        ))}
      </div>
    </div>
  );
};
