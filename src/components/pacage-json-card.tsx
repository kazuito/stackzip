import { PackageJsonData } from "@/lib/packages";
import { ScaleIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Scroller } from "./ui/scroller";

type Props = {
  data: PackageJsonData;
};

const PackageJsonCard = ({ data }: Props) => {
  return (
    <div className="p-4 flex flex-col gap-4 md:flex-row border border-dashed">
      <div className="flex-1">
        <div className="flex items-center">
          <Link href={data.url} className="font-semibold">
            {data.name}
          </Link>
          <div className="text-sm text-foreground/60 ml-3" title="Version">
            {data.version}
          </div>
          <div className="flex ml-3">
            {data.license && (
              <Badge variant="secondary" title="License">
                <ScaleIcon />
                {data.license}
              </Badge>
            )}
          </div>
        </div>
        <div className="text-sm mt-2">
          {data.description || "No description available"}
        </div>
      </div>
      <div className="flex-1 space-y-4">
        {data.keywords && (
          <div>
            <div className="text-sm">Keywords</div>
            <Scroller className="flex flex-wrap gap-2 mt-2 max-h-32">
              {data.keywords.map((keyword) => (
                <Badge
                  variant="outline"
                  key={keyword}
                  className="text-sm font-medium"
                >
                  {keyword}
                </Badge>
              ))}
            </Scroller>
          </div>
        )}
        {data.scripts && (
          <div>
            <div className="text-sm">Scripts</div>
            <Scroller className="flex flex-wrap gap-2 mt-2 max-h-32">
              {Object.entries(data.scripts).map(([scriptName, _]) => (
                <Badge
                  variant="outline"
                  key={scriptName}
                  className="text-sm font-medium"
                >
                  {scriptName}
                </Badge>
              ))}
            </Scroller>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageJsonCard;
