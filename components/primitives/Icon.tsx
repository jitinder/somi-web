import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

export interface IconProps {
  name: string;
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

// Get all available icon names for validation
export const iconNames = Object.keys(LucideIcons).filter(
  (key) => key !== "createLucideIcon" && key !== "default" && !key.startsWith("Lucide")
);

export function Icon({
  name,
  className,
  size = 24,
  color,
  strokeWidth = 2,
}: IconProps) {
  // Convert name to PascalCase if needed (e.g., "arrow-right" -> "ArrowRight")
  const pascalCaseName = name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");

  // Get the icon component from Lucide
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<LucideProps>>)[pascalCaseName];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return (
      <span
        className={cn("inline-flex items-center justify-center text-gray-400", className)}
        style={{ width: size, height: size }}
      >
        ?
      </span>
    );
  }

  return (
    <IconComponent
      className={className}
      size={typeof size === "number" ? size : undefined}
      style={typeof size === "string" ? { width: size, height: size } : undefined}
      color={color}
      strokeWidth={strokeWidth}
    />
  );
}
