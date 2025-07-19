"use client";

import { getPackagesData } from "@/app/zip/actions";
import InputForm from "@/components/input-form";
import PackageCard from "@/components/package-card";
import { LoaderIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

export default function ZipPage() {
  const [query, setQuery] = useQueryState("q", {
    defaultValue: "",
  });
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (q: string) => {
    if (q.trim() === "" || query === q) return;
    setQuery(q);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const result = await getPackagesData(query);
    setPackages(result.data);
    setError(result.error);
    setLoading(false);
  };

  useEffect(() => {
    if (!query) return;
    fetchData();
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div>
        <InputForm onSubmit={onSubmit} defaultQuery={query} />
        {loading && (
          <div className="flex items-center justify-center gap-2 mt-20 animate-bounce">
            <LoaderIcon className="size-4 animate-spin" />
            Loading packages...
          </div>
        )}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {packages.map((pkg, index) => (
              <PackageCard key={index} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
