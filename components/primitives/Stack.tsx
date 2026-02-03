import { cn } from "@/lib/utils";
import type { StackProps } from "@/lib/types";

export function Stack({
  children,
  className,
  gap,
  direction = "vertical",
}: StackProps) {
  const gapStyle = gap
    ? { gap: typeof gap === "number" ? `${gap * 0.25}rem` : gap }
    : {};

  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      style={gapStyle}
    >
      {children}
    </div>
  );
}
