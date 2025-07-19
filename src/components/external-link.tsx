import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  href: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

const ExternalLink = ({ href, className, ...props }: Props) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("flex text-sm items-end gap-0.5 hover:text-foreground", className)}
      {...props}
    >
      <span>{props.children}</span>
      <ArrowUpRightIcon className="size-4" strokeWidth={1.6} />
    </Link>
  );
};

export default ExternalLink;
