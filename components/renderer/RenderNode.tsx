"use client";

import React from "react";
import type { JsonNode } from "@/lib/types";
import { getComponent, isValidComponentType } from "./ComponentRegistry";
import { ErrorBoundary } from "./ErrorBoundary";

interface RenderNodeProps {
  node: JsonNode;
  depth?: number;
}

const MAX_DEPTH = 50; // Prevent infinite recursion

function NodeErrorFallback({ type }: { type: string }) {
  return (
    <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-700 text-sm">
      Error rendering: {type}
    </div>
  );
}

export function RenderNode({ node, depth = 0 }: RenderNodeProps) {
  // Depth guard
  if (depth > MAX_DEPTH) {
    console.warn("Max render depth exceeded");
    return null;
  }

  // Validate component type
  if (!isValidComponentType(node.type)) {
    console.warn(`Unknown component type: ${node.type}`);
    return (
      <div className="p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
        Unknown component: {node.type}
      </div>
    );
  }

  const Component = getComponent(node.type);
  if (!Component) return null;

  // Render children
  let children: React.ReactNode = null;

  if (typeof node.children === "string") {
    // Text content
    children = node.children;
  } else if (Array.isArray(node.children)) {
    // Child nodes
    children = node.children.map((child, index) => (
      <RenderNode
        key={child.key || `${node.type}-${depth}-${index}`}
        node={child}
        depth={depth + 1}
      />
    ));
  }

  return (
    <ErrorBoundary fallback={<NodeErrorFallback type={node.type} />}>
      <Component {...(node.props || {})}>{children}</Component>
    </ErrorBoundary>
  );
}
