"use client";

import { Minus as MinusIcon, Plus as PlusIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "What can I paste into the input?",
    a: 'An npm package name like "react" or "@babel/core@7.29.0", or a public package.json URL such as a GitHub Raw link.',
  },
  {
    q: "Does this work with private packages?",
    a: "Only public sources. Private repos require auth that isn't supported yet, and private npm packages won't resolve from the public registry.",
  },
  {
    q: "Is any data sent to a server?",
    a: "No. Everything runs in your browser. Registry and download data are fetched directly from the client.",
  },
  {
    q: "Why is a package missing?",
    a: "If a package can't be found on the npm registry, its card is silently skipped. This typically happens with private or unpublished scoped packages.",
  },
];

const FaqItem = ({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b border-border/50">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between py-5 text-left text-sm font-medium transition-colors hover:text-foreground"
    >
      {q}
      {open ? (
        <MinusIcon className="size-4 shrink-0 text-muted-foreground" />
      ) : (
        <PlusIcon className="size-4 shrink-0 text-muted-foreground" />
      )}
    </button>
    <div
      className={cn(
        "grid transition-all duration-200 ease-out",
        open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">
        <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
      </div>
    </div>
  </div>
);

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-2xl px-4 py-24">
      <div className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground/50 mb-3">
          questions
        </p>
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Frequently asked
        </h2>
      </div>

      <div>
        {FAQS.map((faq, i) => (
          <FaqItem
            key={faq.q}
            q={faq.q}
            a={faq.a}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
};
