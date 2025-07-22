import LandingForm from "@/components/landing-form";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, FilterIcon, PackageIcon, StarIcon, TelescopeIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="font-monos min-h-screen">
      {/* Hero Section */}
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        <div className="space-y-8 text-center">
          <h1 className="font-mono text-3xl font-bold tracking-tight transition-all duration-400 sm:text-5xl lg:text-7xl">
            Dependencies decoded,
            <br />
            <div className="">
              <span className="bg-card inline-flex -rotate-4 cursor-default items-center rounded-xl border px-2 py-1 shadow-xl transition-all duration-400 active:scale-95 active:-rotate-3 active:shadow-sm">
                <TelescopeIcon className="size-[0.8lh]" />
                insights
              </span>{" "}
              <span className="inline-flex mask-b-from-50% transition-all duration-1000 starting:opacity-0 starting:blur-lg">
                revealed
              </span>
            </div>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Transform any package.json URL into a rich, visual dependency explorer.
          </p>
        </div>

        <LandingForm />
      </div>

      {/* Features Section */}
      <div className="bg-sidebar py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Everything you need to understand dependencies
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4 text-center">
              <div className="bg-primary mx-auto flex h-12 w-12 items-center justify-center rounded-lg">
                <StarIcon className="text-primary-foreground h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">GitHub Integration</h3>
              <p className="text-gray-600">
                Automatically fetch GitHub stars, repository info, and project descriptions
              </p>
            </div>

            <div className="space-y-4 text-center">
              <div className="bg-primary mx-auto flex h-12 w-12 items-center justify-center rounded-lg">
                <FilterIcon className="text-primary-foreground h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Smart Filtering</h3>
              <p className="text-gray-600">
                Group by dependencies, devDependencies, and peerDependencies with easy filtering
              </p>
            </div>

            <div className="space-y-4 text-center">
              <div className="bg-primary mx-auto flex h-12 w-12 items-center justify-center rounded-lg">
                <PackageIcon className="text-primary-foreground h-6 w-6" />
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
        <div className="mx-auto max-w-4xl space-y-8 px-6 text-center">
          <h2 className="font-mono text-3xl font-bold">Ready to explore your dependencies?</h2>
          <p className="text-xl text-gray-600">
            Paste any package.json URL and start discovering insights about your project&apos;s
            dependencies.
          </p>
          <Button asChild size="lg">
            <Link href="/zip" className="flex items-center gap-2">
              Get started <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
