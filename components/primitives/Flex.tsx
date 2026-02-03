import { cn } from "@/lib/utils";
import type { FlexProps } from "@/lib/types";

const directionClasses = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
};

const justifyClasses = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const alignClasses = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

export function Flex({
  children,
  className,
  direction = "row",
  justify = "start",
  align = "stretch",
  gap,
  wrap = false,
}: FlexProps) {
  const gapStyle = gap
    ? { gap: typeof gap === "number" ? `${gap * 0.25}rem` : gap }
    : {};

  return (
    <div
      className={cn(
        "flex",
        directionClasses[direction],
        justifyClasses[justify],
        alignClasses[align],
        wrap && "flex-wrap",
        className
      )}
      style={gapStyle}
    >
      {children}
    </div>
  );
}
