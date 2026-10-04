import { cn } from "@/lib/utils";

type ProgressiveBlurProps = React.ComponentProps<"div"> & {
  /** Edge where the blur is strongest. */
  side?: "top" | "bottom" | "left" | "right";
  /** Maximum blur in px, reached at `side`. Each layer halves it. */
  strength?: number;
  layers?: number;
};

export const ProgressiveBlur = ({
  side = "top",
  strength = 16,
  layers = 6,
  className,
  ...props
}: ProgressiveBlurProps) => {
  const step = 100 / (layers + 2);

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      {...props}
    >
      {Array.from({ length: layers }, (_, i) => {
        const end = i === layers - 1 ? "black" : "transparent";
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static layer list
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${strength / 2 ** (layers - 1 - i)}px)`,
              maskImage: `linear-gradient(to ${side}, transparent ${i * step}%, black ${(i + 1) * step}%, black ${(i + 2) * step}%, ${end} ${(i + 3) * step}%)`,
            }}
          />
        );
      })}
    </div>
  );
};
