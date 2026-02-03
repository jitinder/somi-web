// Supported component types
export type ComponentType =
  | "Container"
  | "Flex"
  | "Grid"
  | "Stack"
  | "Heading"
  | "Text"
  | "Link"
  | "Image"
  | "Button"
  | "Icon";

// Base node structure matching json-render format
export interface JsonNode {
  key?: string;
  type: ComponentType;
  props?: Record<string, unknown>;
  children?: JsonNode[] | string;
}

// Website metadata
export interface WebsiteMetadata {
  title?: string;
  description?: string;
  favicon?: string;
}

// Full website JSON structure
export interface WebsiteJson {
  version: "1.0";
  metadata?: WebsiteMetadata;
  root: JsonNode;
}

// Props for each component type
export interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export interface FlexProps {
  children?: React.ReactNode;
  className?: string;
  direction?: "row" | "col" | "row-reverse" | "col-reverse";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "stretch" | "baseline";
  gap?: number | string;
  wrap?: boolean;
}

export interface GridProps {
  children?: React.ReactNode;
  className?: string;
  cols?: number | { sm?: number; md?: number; lg?: number };
  rows?: number;
  gap?: number | string;
}

export interface StackProps {
  children?: React.ReactNode;
  className?: string;
  gap?: number | string;
  direction?: "vertical" | "horizontal";
}

export interface HeadingProps {
  children?: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TextProps {
  children?: React.ReactNode;
  className?: string;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  color?: string;
}

export interface LinkProps {
  children?: React.ReactNode;
  className?: string;
  href: string;
  target?: "_blank" | "_self";
  rel?: string;
}

export interface ImageProps {
  className?: string;
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  objectFit?: "contain" | "cover" | "fill" | "none";
}

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  disabled?: boolean;
}

export interface IconProps {
  name: string;
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}
