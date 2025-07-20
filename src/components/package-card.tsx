import { Package } from "@/lib/packages";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import numeral from "numeral";
import parseGithubUrl from "parse-github-url";
import ExternalLink from "./external-link";

type Props = {
  pkg: Package;
};

const PackageCard = ({ pkg }: Props) => {
  const formattedStars = numeral(pkg?.github?.stargazerCount).format("0,0");
  const repo = parseGithubUrl(pkg?.npm?.repository?.url || "");

  return (
    <div className="p-4 border -mr-px group/card -mb-px flex font-mono flex-col hover:bg-sidebar transition-all">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <Image
            alt=""
            src={`https://github.com/${repo?.owner}.png`}
            width={40}
            height={40}
            className="size-6 rounded-sm"
          />
          <h3 className="truncate font-medium">{pkg.name}</h3>
        </div>
        <div className="text-sm text-foreground/60 truncate max-w-1/2">
          {pkg.version}
        </div>
      </div>
      <div className="mt-3 text-foreground/60 sm:text-sm line-clamp-3 min-h-[60px]">
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
          {pkg.npm?.url && <ExternalLink href={pkg.npm?.url}>npm</ExternalLink>}
          {pkg.github?.url && (
            <ExternalLink href={pkg.github?.url}>GitHub</ExternalLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
