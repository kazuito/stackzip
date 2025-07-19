"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

type Props = {
  onSubmit: (query: string) => void;
  defaultQuery?: string;
};

const InputForm = ({ onSubmit, defaultQuery }: Props) => {
  const [query, setQuery] = useState(defaultQuery || "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(query);
      }}
    >
      <div className="flex">
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
  );
};

export default InputForm;
