const FAQS = [
  {
    q: "What is Stackzip?",
    a: "Stackzip is a free tool that visualizes the npm dependencies of any package.json file. Just paste a URL and explore.",
  },
  {
    q: "How do I get my package.json URL?",
    a: 'Navigate to your package.json on GitHub and click the "Raw" button. Copy that URL and paste it here.',
  },
  {
    q: "Does this work with private packages?",
    a: "The package.json URL must be publicly accessible. Private GitHub repos require authentication which isn't supported yet.",
  },
  {
    q: "Is my data sent to a server?",
    a: "No. Everything runs in your browser. We fetch the package.json and npm registry data directly from the client.",
  },
  {
    q: "What npm registries are supported?",
    a: "Currently only the public npmjs.org registry. Support for custom registries may be added in the future.",
  },
  {
    q: "Why is a package missing from the list?",
    a: "If a package can't be found on the npm registry, its card is silently skipped. This can happen with private or scoped packages.",
  },
];

export const FaqSection = () => (
  <section className="mx-auto max-w-2xl px-4 py-16">
    <h2 className="text-center text-2xl font-bold tracking-tight mb-10">FAQ</h2>
    <div className="space-y-6">
      {FAQS.map((faq) => (
        <div key={faq.q} className="space-y-1">
          <h3 className="font-semibold">{faq.q}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {faq.a}
          </p>
        </div>
      ))}
    </div>
  </section>
);
