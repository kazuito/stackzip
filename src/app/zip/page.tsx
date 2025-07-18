import InputForm from "@/components/input-form";
import PackageCard from "@/components/package-card";
import { fetchPackages } from "@/lib/npm";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<{
    q: string | undefined;
  }>;
};

export default async function ZipPage({ searchParams }: Props) {
  const { q: query } = await searchParams;

  if (!query) {
    notFound();
  }

  const packageGroups = await fetchPackages(query);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div>
        <InputForm defaultQuery={query} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {packageGroups.map((group) =>
            group.packages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
