import { cn } from "@/lib/utils";
import type { TextProps } from "@/lib/types";

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const weightClasses = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export function Text({
  children,
  className,
  size = "base",
  weight = "normal",
  color,
}: TextProps) {
  const colorStyle = color ? { color } : {};

  return (
    <p
      className={cn(sizeClasses[size], weightClasses[weight], className)}
      style={colorStyle}
    >
      {children}
    </p>
  );
}
