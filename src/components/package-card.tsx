import { fetchNpmPackageData, fetchPackages } from "@/lib/npm";
import { StarIcon } from "lucide-react";
import numeral from "numeral";

type Props = {
  pkg: Awaited<ReturnType<typeof fetchPackages>>[number]["packages"][number];
};

const PackageCard = async ({ pkg }: Props) => {
  const formattedStars = numeral(pkg.stars).format("0,0");

  return (
    <div className="p-4 border rounded-lg flex flex-col">
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-nowrap">{pkg.name}</h3>
        <div className="text-sm text-foreground/60 truncate">{pkg.version}</div>
      </div>
      <div className="mt-2 text-foreground/60">{pkg.npm?.description}</div>
      <div className="flex justify-between mt-auto pt-3">
        <div className="flex items-center gap-1">
          <StarIcon className="size-3" />
          <span className="text-sm">{formattedStars}</span>
        </div>
        <div className="text-sm text-foreground/60">{pkg.npm?.license}</div>
      </div>
    </div>
  );
};

export default PackageCard;
