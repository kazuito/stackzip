"use client";

import { useRouter } from "next/navigation";

const EXAMPLES = [
  {
    label: "Next.js",
    url: "https://raw.githubusercontent.com/vercel/next.js/canary/package.json",
  },
  {
    label: "Vite",
    url: "https://raw.githubusercontent.com/vitejs/vite/main/package.json",
  },
  {
    label: "shadcn/ui",
    url: "https://raw.githubusercontent.com/shadcn-ui/ui/main/package.json",
  },
];

export const QuickStartButtons = () => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Try:</span>
      {EXAMPLES.map((ex) => (
        <button
          key={ex.label}
          type="button"
          onClick={() =>
            router.push(`/package?src=${encodeURIComponent(ex.url)}`)
          }
          className="rounded-md border px-3 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          {ex.label}
        </button>
      ))}
    </div>
  );
};
