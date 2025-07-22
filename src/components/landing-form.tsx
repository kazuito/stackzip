"use client";

import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const LandingForm = () => {
  const [query, setQuery] = useState("https://github.com/kazuito/droll/blob/main/package.json");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/zip?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-md items-center justify-center"
      >
        <Input
          placeholder="URL for package.json"
          className="flex-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" className="whitespace-nowrap">
          Explore now <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </form>
      <p className="text-sm text-gray-500">Try it with any public GitHub package.json URL</p>
    </div>
  );
};

export default LandingForm;
