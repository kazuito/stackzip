"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  defaultQuery: string;
};

const InputForm = ({ defaultQuery }: Props) => {
  const [query, setQuery] = useState(defaultQuery || "");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) {
      router.push(`/zip?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <Input
            placeholder="URL for package.json"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" size="icon">
            <SearchIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
