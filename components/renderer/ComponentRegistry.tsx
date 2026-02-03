import type { ComponentType as ReactComponentType } from "react";
import type { ComponentType } from "@/lib/types";
import {
  Container,
  Flex,
  Grid,
  Stack,
  Heading,
  Text,
  Link,
  Image,
  Button,
  Icon,
} from "@/components/primitives";

// Type-safe component mapping
export const componentRegistry: Record<
  ComponentType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReactComponentType<any>
> = {
  Container,
  Flex,
  Grid,
  Stack,
  Heading,
  Text,
  Link,
  Image,
  Button,
  Icon,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getComponent(type: string): ReactComponentType<any> | null {
  if (type in componentRegistry) {
    return componentRegistry[type as ComponentType];
  }
  return null;
}

export function isValidComponentType(type: string): type is ComponentType {
  return type in componentRegistry;
}
