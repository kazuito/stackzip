export const SectionHeader = ({
  label,
  title,
}: {
  label: string;
  title: string;
}) => (
  <div className="mb-12 text-center">
    <p className="text-[11px] uppercase tracking-widest text-muted-foreground/50 mb-3">
      {label}
    </p>
    <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">{title}</h2>
  </div>
);
