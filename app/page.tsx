import { FaqSection } from "./_components/faq-section";
import { FeaturesSection } from "./_components/features-section";
import { Hero } from "./_components/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <hr className="border-t" />
      <FeaturesSection />
      <hr className="border-t" />
      <FaqSection />
      <footer className="border-t py-10 text-center">
        <p className="text-xs text-muted-foreground/50">
          Built with Next.js. All data fetched client-side from the npm
          registry.
        </p>
      </footer>
    </>
  );
}
