import { PackageJsonData } from "@/lib/packages";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ScaleIcon } from "lucide-react";

type Props = {
  data: PackageJsonData;
};

const PackageJsonCard = ({ data }: Props) => {
  return (
    <div className="p-4 flex flex-col gap-4 md:flex-row border">
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
            <div className="flex flex-wrap gap-2 mt-2">
              {data.keywords.map((keyword) => (
                <Badge
                  variant="outline"
                  key={keyword}
                  className="text-sm font-medium"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {data.scripts && (
          <div>
            <div className="text-sm">Scripts</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(data.scripts).map(
                ([scriptName, scriptCommand]) => (
                  <Badge
                    variant="outline"
                    key={scriptName}
                    className="text-sm font-medium"
                  >
                    {scriptName}
                  </Badge>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageJsonCard;
