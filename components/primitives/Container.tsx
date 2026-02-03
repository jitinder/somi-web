import { cn } from "@/lib/utils";
import type { ContainerProps } from "@/lib/types";

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
};

export function Container({
  children,
  className,
  maxWidth = "lg",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto px-4", maxWidthClasses[maxWidth], className)}>
      {children}
    </div>
  );
}
