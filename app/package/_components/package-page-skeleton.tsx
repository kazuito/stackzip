import { PackageCard } from "@/features/npm/components/package-card";

const SECTION_CARD_COUNTS = [6, 3];

const SectionSkeleton = ({
  titleWidthClassName,
  cardCount,
}: {
  titleWidthClassName: string;
  cardCount: number;
}) => (
  <section className="space-y-4">
    <div className="flex animate-pulse items-center gap-2">
      <div className={`h-5 rounded bg-muted ${titleWidthClassName}`} />
      <div className="h-5 w-10 rounded-md border border-border bg-muted/60" />
    </div>
    <div className="m-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: cardCount }).map((_, index) => (
        <PackageCard.Skeleton
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list never reorders
          key={index}
          className="-m-px"
        />
      ))}
    </div>
  </section>
);

const SourceSidebarSkeleton = () => (
  <aside className="rounded-lg border bg-card p-5 text-sm">
    <div className="animate-pulse space-y-4">
      <div className="h-7 w-2/3 rounded bg-muted" />

      <div className="space-y-1.5">
        <div className="h-3 w-16 rounded bg-muted" />
        <div className="h-4 w-20 rounded bg-muted" />
      </div>

      <div className="space-y-1.5">
        <div className="h-3 w-20 rounded bg-muted" />
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-5/6 rounded bg-muted" />
      </div>

      <div className="space-y-1.5">
        <div className="h-3 w-14 rounded bg-muted" />
        <div className="h-4 w-12 rounded bg-muted" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="h-4 w-28 rounded bg-muted" />
      </div>

      <div className="space-y-2">
        <div className="h-3 w-20 rounded bg-muted" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list never reorders
            key={index}
            className="flex items-center justify-between"
          >
            <div className="h-3 w-28 rounded bg-muted" />
            <div className="h-3 w-6 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  </aside>
);

export const PackagePageSkeleton = () => (
  <div className="flex gap-8">
    <div className="min-w-0 flex-1 space-y-8">
      <SectionSkeleton
        titleWidthClassName="w-32"
        cardCount={SECTION_CARD_COUNTS[0]}
      />
      <SectionSkeleton
        titleWidthClassName="w-40"
        cardCount={SECTION_CARD_COUNTS[1]}
      />
    </div>
    <div className="hidden w-72 shrink-0 lg:block">
      <div className="sticky top-20">
        <SourceSidebarSkeleton />
      </div>
    </div>
  </div>
);
