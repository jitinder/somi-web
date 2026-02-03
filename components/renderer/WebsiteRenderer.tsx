"use client";

import React, { useMemo } from "react";
import { validateWebsiteJson } from "@/lib/schemas";
import { RenderNode } from "./RenderNode";
import { ErrorBoundary } from "./ErrorBoundary";

interface WebsiteRendererProps {
  jsonString: string;
  onError?: (error: Error) => void;
}

function GlobalErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-600">This website could not be rendered.</p>
      </div>
    </div>
  );
}

export function WebsiteRenderer({ jsonString, onError }: WebsiteRendererProps) {
  const { website, error } = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonString);
      const validation = validateWebsiteJson(parsed);

      if (!validation.success) {
        return {
          website: null,
          error: new Error(
            `Validation failed: ${validation.error?.message || "Unknown error"}`
          ),
        };
      }

      return { website: validation.data, error: null };
    } catch (e) {
      return {
        website: null,
        error: e instanceof Error ? e : new Error("Failed to parse JSON"),
      };
    }
  }, [jsonString]);

  React.useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Failed to render website
          </h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!website) {
    return null;
  }

  return (
    <ErrorBoundary fallback={<GlobalErrorFallback />}>
      <div className="min-h-screen">
        <RenderNode node={website.root} />
      </div>
    </ErrorBoundary>
  );
}
