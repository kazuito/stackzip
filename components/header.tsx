import { Package as PackageIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Header = ({
  className,
  ...props
}: React.ComponentProps<"header">) => (
  <header
    className={cn(
      "border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50",
      className,
    )}
    {...props}
  >
    <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
      <Link href="/" className="flex items-center gap-2 tracking-tight">
        <PackageIcon className="size-4" />
        <span className="font-accent">Stackzip</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 text-sm text-muted-foreground">
        <a
          href="https://github.com/kazuito/stackzip"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          GitHub
        </a>
      </nav>
    </div>
  </header>
);
