"use client";

import { useCallback, useState } from "react";
import Editor from "@monaco-editor/react";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

export function JsonEditor({ value, onChange, error }: JsonEditorProps) {
  const [internalError, setInternalError] = useState<string | null>(null);

  const handleChange = useCallback(
    (newValue: string | undefined) => {
      if (newValue === undefined) return;

      try {
        JSON.parse(newValue);
        setInternalError(null);
      } catch {
        setInternalError("Invalid JSON syntax");
      }

      onChange(newValue);
    },
    [onChange]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 border rounded-lg overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="json"
          value={value}
          onChange={handleChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            wordWrap: "on",
            formatOnPaste: true,
            automaticLayout: true,
          }}
        />
      </div>
      {(error || internalError) && (
        <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
          {error || internalError}
        </div>
      )}
    </div>
  );
}
