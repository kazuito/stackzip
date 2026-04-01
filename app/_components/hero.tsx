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
    <section className="relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="glow-orb -top-30 left-1/2 -translate-x-1/2 h-100 w-150 bg-foreground/3 animate-pulse-subtle" />
      <div className="glow-orb top-50 left-[15%] h-50 w-75 bg-foreground/2 animate-glow" />
      <div className="glow-orb top-37.5 right-[15%] h-62.5 w-87.5 bg-foreground/2 animate-glow [animation-delay:1.5s]" />

      {/* Dot grid overlay */}
      <div className="dot-grid absolute inset-0" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 pt-32 pb-24 text-center">
        {/* Headline */}
        <h1 className="animate-fade-up [animation-delay:100ms] text-3xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
          <span className="shimmer-text animate-shimmer">See what your</span>
          <br />
          <span className="text-foreground">packages depend on</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up [animation-delay:200ms] max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Paste any npm package name or{" "}
          <code className="border border-border/50 bg-muted/60 px-1.5 py-0.5 text-[0.85em] font-mono">
            package.json
          </code>{" "}
          URL. Every dependency, visualized with live registry data.
        </p>

        {/* Input */}
        <div className="animate-fade-up [animation-delay:300ms] w-full max-w-xl">
          <div className="relative group">
            {/* Glow behind input on hover */}
            <div className="absolute -inset-0.5 bg-foreground/4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl" />
            <div className="relative">
              <UrlInput onSubmit={handleSubmit} />
            </div>
          </div>
        </div>

        {/* Quick start */}
        <div className="animate-fade-up [animation-delay:400ms] w-full">
          <QuickStartButtons />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent" />
    </section>
  );
};
