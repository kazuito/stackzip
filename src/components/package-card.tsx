import { fetchPackagesData, NpmPackage } from "@/lib/npm";
import { StarIcon } from "lucide-react";
import numeral from "numeral";
import ExternalLink from "./external-link";

type Props = {
  pkg: NpmPackage;
};

const PackageCard = ({ pkg }: Props) => {
  const formattedStars = numeral(pkg.github.stars).format("0,0");

  return (
    <div className="p-4 border -mr-px group/card -mb-px flex font-mono flex-col hover:bg-sidebar transition-all">
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-nowrap font-medium">{pkg.name}</h3>
        <div className="text-sm text-foreground/60 truncate">{pkg.version}</div>
      </div>
      <div className="mt-2 text-foreground/60 sm:text-sm line-clamp-3">
        {pkg.npm?.description}
      </div>
      <div className="flex justify-between mt-auto pt-3">
        <div className="flex items-center gap-1">
          <StarIcon className="size-3" />
          <span className="text-sm">{formattedStars}</span>
        </div>
        <div className="text-sm text-foreground/60 group-hover/card:hidden">
          {pkg.npm?.license}
        </div>
        <div className="hidden gap-3 group-hover/card:flex text-foreground/60">
          <ExternalLink href={pkg.npm.url}>npm</ExternalLink>
          <ExternalLink href={pkg.github.url}>GitHub</ExternalLink>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
