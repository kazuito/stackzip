import { Package } from "@/lib/packages";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import numeral from "numeral";
import parseGithubUrl from "parse-github-url";
import ExternalLink from "../external-link";
import { Badge } from "../ui/badge";
import { Scroller } from "../ui/scroller";

type Props = {
  pkg: Package;
  onClick?: () => void;
};

const PackageCard = ({ pkg, onClick }: Props) => {
  const formattedStars = numeral(pkg?.github?.stargazerCount).format("0,0");
  const repo = parseGithubUrl(pkg?.npm?.repository?.url || "");

  return (
    <div
      className="group/card hover:bg-sidebar -mr-px -mb-px flex cursor-default flex-col border p-4 font-mono transition-all"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <Image
            alt=""
            src={`https://github.com/${repo?.owner}.png`}
            width={40}
            height={40}
            className="size-6 rounded-sm"
          />
          <h3 className="truncate font-medium">{pkg.name}</h3>
        </div>
        <div className="text-foreground/60 max-w-1/2 truncate text-sm">{pkg.version}</div>
      </div>
      <div className="text-foreground/60 mt-3 line-clamp-3 min-h-[2lh] sm:line-clamp-2 sm:text-sm">
        {pkg.npm?.description}
      </div>
      {pkg.npm?.keywords && (
        <Scroller className="mt-3 flex gap-1" orientation="horizontal" hideScrollbar>
          {pkg.npm.keywords.map((keyword, i) => (
            <Badge key={`${keyword}-${i}`} variant="outline">
              {keyword}
            </Badge>
          ))}
        </Scroller>
      )}
      <div className="mt-auto flex justify-between pt-3">
        <div className="flex items-center gap-1">
          <StarIcon className="size-3" />
          <span className="text-sm">{formattedStars}</span>
        </div>
        <div className="text-foreground/60 text-sm group-hover/card:hidden">{pkg.npm?.license}</div>
        <div className="text-foreground/60 hidden gap-3 group-hover/card:flex">
          {pkg.npm?.url && <ExternalLink href={pkg.npm?.url}>npm</ExternalLink>}
          {pkg.github?.url && <ExternalLink href={pkg.github?.url}>GitHub</ExternalLink>}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
