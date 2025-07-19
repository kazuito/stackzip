import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRightIcon,
  FilterIcon,
  PackageIcon,
  StarIcon,
  TelescopeIcon,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen font-monos">
      {/* Hero Section */}
      <div className="px-6 max-w-6xl mx-auto pt-20 pb-16">
        <div className="text-center space-y-8">
          <h1 className="text-3xl sm:text-5xl transition-all duration-400 lg:text-7xl font-bold font-mono tracking-tight">
            Dependencies decoded,
            <br />
            <div className="">
              <span className="inline-flex items-center border px-2 py-1 rounded-xl shadow-xl -rotate-4 bg-card active:scale-95 active:-rotate-3 active:shadow-sm transition-all duration-400 cursor-default">
                <TelescopeIcon className="size-[0.8lh]" />
                insights
              </span>{" "}
              <span className="inline-flex transition-all mask-b-from-50% starting:blur-lg duration-1000 starting:opacity-0">
                revealed
              </span>
            </div>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform any package.json URL into a rich, visual dependency
            explorer.
          </p>

          <div className="flex justify-center items-center max-w-md mx-auto">
            <Input placeholder="URL for package.json" className="flex-1" />
            <Button asChild className="whitespace-nowrap">
              <Link href="/zip" className="flex items-center gap-2">
                Explore now <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Try it with any public GitHub package.json URL
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-sidebar py-20">
        <div className="px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to understand dependencies
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-lg mx-auto">
                <StarIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">GitHub Integration</h3>
              <p className="text-gray-600">
                Automatically fetch GitHub stars, repository info, and project
                descriptions
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-lg mx-auto">
                <FilterIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Smart Filtering</h3>
              <p className="text-gray-600">
                Group by dependencies, devDependencies, and peerDependencies
                with easy filtering
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-lg mx-auto">
                <PackageIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Rich Package Info</h3>
              <p className="text-gray-600">
                View licenses, descriptions, and sort by popularity or name
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="px-6 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold font-mono">
            Ready to explore your dependencies?
          </h2>
          <p className="text-xl text-gray-600">
            Paste any package.json URL and start discovering insights about your
            project&apos;s dependencies.
          </p>
          <Button asChild size="lg">
            <Link href="/zip" className="flex items-center gap-2">
              Get started <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
