"use client";

import { useRouter } from "next/navigation";
import { UrlInput } from "@/components/url-input";
import { QuickStartButtons } from "./quick-start-buttons";

export const Hero = () => {
  const router = useRouter();

  const handleSubmit = (url: string) => {
    router.push(`/package?src=${encodeURIComponent(url)}`);
  };

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 pt-24 pb-16 text-center">
      <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
        Visualize your npm dependencies
      </h1>
      <p className="text-lg text-muted-foreground max-w-lg">
        Paste any npm package name or{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
          package.json
        </code>{" "}
        URL and instantly see every dependency with metadata straight from the
        npm registry.
      </p>
      <div className="w-full max-w-xl">
        <UrlInput onSubmit={handleSubmit} />
      </div>
      <QuickStartButtons />
    </section>
  );
};
