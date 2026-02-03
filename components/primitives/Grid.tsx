import { cn } from "@/lib/utils";
import type { GridProps } from "@/lib/types";

export function Grid({ children, className, cols = 1, rows, gap }: GridProps) {
  const colsClass =
    typeof cols === "number"
      ? `grid-cols-${cols}`
      : Object.entries(cols)
          .map(([breakpoint, value]) =>
            breakpoint === "sm"
              ? `sm:grid-cols-${value}`
              : breakpoint === "md"
                ? `md:grid-cols-${value}`
                : `lg:grid-cols-${value}`
          )
          .join(" ");

  const rowsClass = rows ? `grid-rows-${rows}` : "";

  const gapStyle = gap
    ? { gap: typeof gap === "number" ? `${gap * 0.25}rem` : gap }
    : {};

  return (
    <div className={cn("grid", colsClass, rowsClass, className)} style={gapStyle}>
      {children}
    </div>
  );
}
