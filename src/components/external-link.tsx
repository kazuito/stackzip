import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
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
      className={cn("flex text-sm items-end gap-0.25 hover:text-foreground group/link", className)}
      {...props}
    >
      <span>{props.children}</span>
      <ArrowUpRightIcon className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" strokeWidth={1.6} />
    </Link>
  );
};

export default ExternalLink;
