import { z } from "zod/v4";
import type { JsonNode, WebsiteJson } from "./types";

const componentTypes = [
  "Container",
  "Flex",
  "Grid",
  "Stack",
  "Heading",
  "Text",
  "Link",
  "Image",
  "Button",
  "Icon",
] as const;

// Base node schema (recursive)
const jsonNodeSchema: z.ZodType<JsonNode> = z.lazy(() =>
  z.object({
    key: z.string().optional(),
    type: z.enum(componentTypes),
    props: z.record(z.string(), z.unknown()).optional(),
    children: z.union([z.array(jsonNodeSchema), z.string()]).optional(),
  })
);

// Full website schema
export const websiteJsonSchema = z.object({
  version: z.literal("1.0"),
  metadata: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      favicon: z.string().url().optional(),
    })
    .optional(),
  root: jsonNodeSchema,
});

export function validateWebsiteJson(json: unknown): {
  success: boolean;
  data?: WebsiteJson;
  error?: z.ZodError;
} {
  const result = websiteJsonSchema.safeParse(json);
  if (result.success) {
    return { success: true, data: result.data as WebsiteJson };
  }
  return { success: false, error: result.error };
}
