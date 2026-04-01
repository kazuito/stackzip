import { FaqSection } from "./_components/faq-section";
import { FeaturesSection } from "./_components/features-section";
import { Hero } from "./_components/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <FaqSection />
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        Built with Next.js. All data fetched client-side from the npm registry.
      </footer>
    </>
  );
}
