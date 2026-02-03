import { cn } from "@/lib/utils";
import type { HeadingProps } from "@/lib/types";

const defaultStyles: Record<number, string> = {
  1: "text-4xl font-bold",
  2: "text-3xl font-bold",
  3: "text-2xl font-semibold",
  4: "text-xl font-semibold",
  5: "text-lg font-medium",
  6: "text-base font-medium",
};

export function Heading({ children, className, level = 1 }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return <Tag className={cn(defaultStyles[level], className)}>{children}</Tag>;
}
