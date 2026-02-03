import { cn } from "@/lib/utils";
import type { ImageProps } from "@/lib/types";
import NextImage from "next/image";

const objectFitClasses = {
  contain: "object-contain",
  cover: "object-cover",
  fill: "object-fill",
  none: "object-none",
};

export function Image({
  className,
  src,
  alt,
  width,
  height,
  objectFit = "cover",
}: ImageProps) {
  // If width and height are provided as numbers, use Next.js Image
  if (typeof width === "number" && typeof height === "number") {
    return (
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(objectFitClasses[objectFit], className)}
      />
    );
  }

  // Otherwise use a regular img tag with style dimensions
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={style}
      className={cn(objectFitClasses[objectFit], className)}
    />
  );
}
