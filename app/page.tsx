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
    </>
  );
}
