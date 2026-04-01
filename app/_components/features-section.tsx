import {
  AlertTriangle as AlertTriangleIcon,
  ExternalLink as ExternalLinkIcon,
  Eye as EyeIcon,
  Globe as GlobeIcon,
} from "lucide-react";

const FEATURES = [
  {
    icon: EyeIcon,
    title: "Instant visualization",
    description:
      "See every dependency at a glance — names, versions, descriptions, and links in a card grid.",
  },
  {
    icon: ExternalLinkIcon,
    title: "Direct npm links",
    description:
      "One click to npm, GitHub, or the homepage of any package. No more tab-hunting.",
  },
  {
    icon: AlertTriangleIcon,
    title: "Outdated detection",
    description:
      "Color-coded version badges show which deps are current, behind, or a major version out of date.",
  },
  {
    icon: GlobeIcon,
    title: "Zero server — runs in your browser",
    description:
      "All data is fetched client-side from the npm registry. Nothing is sent to our servers.",
  },
];

export const FeaturesSection = () => (
  <section className="mx-auto max-w-4xl px-4 py-16">
    <h2 className="text-center text-2xl tracking-tight mb-10 font-accent">
      Features
    </h2>
    <div className="grid gap-6 sm:grid-cols-2">
      {FEATURES.map((f) => (
        <div key={f.title} className="rounded-lg border bg-card p-6 space-y-2">
          <f.icon className="size-5 text-muted-foreground" />
          <h3 className="font-semibold">{f.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {f.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);
