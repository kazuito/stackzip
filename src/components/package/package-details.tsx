import { getPackageDetails } from "@/app/zip/actions";
import { type PackageDetails } from "@/lib/github";
import { Package } from "@/lib/packages";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Badge } from "../ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "github-markdown-css/github-markdown-light.css";
import "highlight.js/styles/github.css";
import { Skeleton } from "../ui/skeleton";
import ExternalLink from "../external-link";
import { ScaleIcon } from "lucide-react";

type Props = {
  pkg: Package;
};

const PackageDetails = ({ pkg }: Props) => {
  const [details, setDetails] = useState<PackageDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (fetchingRef.current) return;

    const fetchDetails = async () => {
      fetchingRef.current = true;
      setLoading(true);
      try {
        const result = await getPackageDetails(pkg);
        setDetails(result);
      } finally {
        setLoading(false);
        fetchingRef.current = false;
      }
    };

    fetchDetails();
  }, [pkg]);

  if (!pkg.npm?.repository?.url) return null;
  return (
    <div className="font-mono overflow-y-auto md:px-4">
      <div className="flex gap-3 items-center sticky top-0 bg-background p-4 md:pt-8">
        <Image
          src={`https://github.com/${pkg.npm.repository.owner}.png`}
          width={40}
          height={40}
          alt={`Avatar of ${pkg.npm.repository.owner || "repository owner"}`}
          className="rounded-sm size-7 shrink-0"
        />
        <div className="font-semibold text-lg shrink-0">{pkg.name}</div>
        <div className="ml-auto flex gap-4 items-center min-w-0">
          <div className="text-sm text-foreground/60 truncate">
            {pkg.version}
          </div>
          {pkg.npm.license && (
            <Badge variant="secondary" className="text-sm text-foreground/60">
              <ScaleIcon />
              {pkg.npm.license}
            </Badge>
          )}
        </div>
      </div>
      <div className="p-4 pt-0">
        <div className="text-base sm:text-sm text-foreground/60">
          {pkg.npm.description}
        </div>
        {pkg.npm.keywords && (
          <div className="mt-4 flex flex-wrap gap-1">
            {pkg.npm.keywords.map((keyword, i) => (
              <Badge key={i} variant="outline">
                {keyword}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex mt-4 gap-3">
          <ExternalLink href={pkg.npm.url}>npm</ExternalLink>
          <ExternalLink href={pkg.npm.repository.url}>GitHub</ExternalLink>
        </div>
        <div className="mt-6">
          {loading ? (
            <Skeleton className="w-full h-[100vh]" />
          ) : (
            <div className="markdown-body starting:opacity-0 transition-all duration-200">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
              >
                {details?.readme}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
