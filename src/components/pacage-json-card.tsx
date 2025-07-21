import { PackageJsonData } from "@/lib/packages";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ScaleIcon } from "lucide-react";

type Props = {
  data: PackageJsonData;
};

const PackageJsonCard = ({ data }: Props) => {
  return (
    <div className="border p-4">
      <div className="flex items-center">
        <Link href={data.url} className="font-medium">
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
      <div className="flex flex-col gap-4 sm:flex-row mt-4">
        <div className="flex-1">
          <div className="text-sm">
            {data.description || "No description available"}
          </div>
        </div>
        <div className="flex-1">
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
    </div>
  );
};

export default PackageJsonCard;
