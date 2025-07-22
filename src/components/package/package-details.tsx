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
    <div className="overflow-y-auto font-mono md:px-4">
      <div className="bg-background sticky top-0 flex items-center gap-3 p-4 md:pt-8">
        <Image
          src={`https://github.com/${pkg.npm.repository.owner}.png`}
          width={40}
          height={40}
          alt={`Avatar of ${pkg.npm.repository.owner || "repository owner"}`}
          className="size-7 shrink-0 rounded-sm"
        />
        <div className="shrink-0 text-lg font-semibold">{pkg.name}</div>
        <div className="ml-auto flex min-w-0 items-center gap-4">
          <div className="text-foreground/60 truncate text-sm">{pkg.version}</div>
          {pkg.npm.license && (
            <Badge variant="secondary" className="text-foreground/60 text-sm">
              <ScaleIcon />
              {pkg.npm.license}
            </Badge>
          )}
        </div>
      </div>
      <div className="p-4 pt-0">
        <div className="text-foreground/60 text-base sm:text-sm">{pkg.npm.description}</div>
        {pkg.npm.keywords && (
          <div className="mt-4 flex flex-wrap gap-1">
            {pkg.npm.keywords.map((keyword, i) => (
              <Badge key={i} variant="outline">
                {keyword}
              </Badge>
            ))}
          </div>
        )}
        <div className="mt-4 flex gap-3">
          <ExternalLink href={pkg.npm.url}>npm</ExternalLink>
          <ExternalLink href={pkg.npm.repository.url}>GitHub</ExternalLink>
        </div>
        <div className="mt-6">
          {loading ? (
            <Skeleton className="h-[100vh] w-full" />
          ) : (
            <div className="markdown-body transition-all duration-200 starting:opacity-0">
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
