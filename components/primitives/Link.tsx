import { cn } from "@/lib/utils";
import type { LinkProps } from "@/lib/types";

export function Link({
  children,
  className,
  href,
  target,
  rel,
}: LinkProps) {
  const linkRel = target === "_blank" ? rel || "noopener noreferrer" : rel;

  return (
    <a
      href={href}
      target={target}
      rel={linkRel}
      className={cn(
        "text-blue-600 hover:text-blue-800 underline",
        className
      )}
    >
      {children}
    </a>
  );
}
