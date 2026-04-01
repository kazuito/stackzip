import {
  AlertTriangle as AlertTriangleIcon,
  ArrowUpRight as ArrowUpRightIcon,
  Eye as EyeIcon,
  Globe as GlobeIcon,
  Search as SearchIcon,
  Zap as ZapIcon,
} from "lucide-react";

const FEATURES = [
  {
    icon: EyeIcon,
    title: "Instant overview",
    description:
      "Every dependency rendered as a card with name, version, description, and links.",
    span: "sm:col-span-2",
  },
  {
    icon: ZapIcon,
    title: "Zero config",
    description: "Paste and go. No setup, no login, no API key.",
    span: "",
  },
  {
    icon: AlertTriangleIcon,
    title: "Version drift",
    description:
      "Color-coded badges flag which deps are current, behind, or a major version out.",
    span: "",
  },
  {
    icon: ArrowUpRightIcon,
    title: "One-click links",
    description: "Jump to npm, GitHub, or homepage for any package.",
    span: "",
  },
  {
    icon: SearchIcon,
    title: "Deep drill-down",
    description:
      "Click any dependency to explore its own dependency tree. Breadcrumb trail keeps you oriented.",
    span: "",
  },
  {
    icon: GlobeIcon,
    title: "Fully client-side",
    description:
      "All data comes straight from the npm registry. Nothing hits our servers.",
    span: "sm:col-span-2",
  },
];

export const FeaturesSection = () => (
  <section className="mx-auto max-w-4xl px-4 py-24">
    <div className="mb-12 text-center">
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground/50 mb-3">
        what you get
      </p>
      <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
        Everything at a glance
      </h2>
    </div>

    <div className="grid gap-px bg-border/50 sm:grid-cols-4">
      {FEATURES.map((f) => (
        <div
          key={f.title}
          className={`group bg-background p-6 sm:p-8 transition-colors hover:bg-muted/30 ${f.span}`}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-8 items-center justify-center border border-border/60 bg-muted/40 text-muted-foreground transition-colors group-hover:border-foreground/20 group-hover:text-foreground">
              <f.icon className="size-4" />
            </div>
            <h3 className="font-medium tracking-tight">{f.title}</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {f.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);
