"use client";

import { useState, useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { JsonEditor } from "@/components/editor/JsonEditor";
import { WebsiteRenderer } from "@/components/renderer/WebsiteRenderer";
import { useDeployWebsite } from "@/hooks/useDeployWebsite";
import { useUpdateWebsite } from "@/hooks/useUpdateWebsite";
import { validateWebsiteJson } from "@/lib/schemas";

const defaultTemplate = `{
  "version": "1.0",
  "metadata": {
    "title": "My On-Chain Website"
  },
  "root": {
    "type": "Container",
    "props": { "maxWidth": "lg", "className": "py-12" },
    "children": [
      {
        "type": "Stack",
        "props": { "gap": 8, "className": "text-center" },
        "children": [
          {
            "type": "Heading",
            "props": { "level": 1, "className": "text-4xl font-bold" },
            "children": "Welcome to Somi Web"
          },
          {
            "type": "Text",
            "props": { "className": "text-gray-600 text-lg" },
            "children": "Your website lives on-chain forever."
          },
          {
            "type": "Flex",
            "props": { "justify": "center", "gap": 4 },
            "children": [
              {
                "type": "Button",
                "props": { "variant": "primary", "href": "#" },
                "children": "Get Started"
              },
              {
                "type": "Button",
                "props": { "variant": "outline", "href": "#" },
                "children": "Learn More"
              }
            ]
          }
        ]
      }
    ]
  }
}`;

export default function EditorPage() {
  const [json, setJson] = useState(defaultTemplate);
  const [contractAddress, setContractAddress] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [deployError, setDeployError] = useState<string | null>(null);
  const [deployedAddress, setDeployedAddress] = useState<string | null>(null);

  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { deployWebsite, isPending: isDeploying } = useDeployWebsite();
  const { updateWebsite, isPending: isUpdating } = useUpdateWebsite();

  // Validate JSON
  const validation = useMemo(() => {
    try {
      const parsed = JSON.parse(json);
      return validateWebsiteJson(parsed);
    } catch {
      return { success: false, error: { message: "Invalid JSON" } };
    }
  }, [json]);

  const handleDeploy = async () => {
    if (!validation.success) {
      setDeployError("Please fix JSON errors before deploying");
      return;
    }

    setDeployError(null);

    try {
      const result = await deployWebsite(json);
      setContractAddress(result.contractAddress);
      setDeployedAddress(result.contractAddress);
    } catch (e) {
      setDeployError(e instanceof Error ? e.message : "Deployment failed");
    }
  };

  const handleUpdate = () => {
    if (!contractAddress || !validation.success) return;
    updateWebsite(contractAddress as `0x${string}`, json);
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(json);
      setJson(JSON.stringify(parsed, null, 2));
    } catch {
      // Can't format invalid JSON
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900">Somi Web</h1>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
            Testnet
          </span>
        </div>
        <div className="flex items-center gap-4">
          {isConnected ? (
            <>
              <span className="text-sm text-gray-600 font-mono">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-100 transition-colors"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={() => connect({ connector: connectors[0] })}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* Deployed Address Banner */}
      {deployedAddress && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-green-700 text-sm">Deployed at:</span>
            <code className="text-green-800 text-sm font-mono bg-green-100 px-2 py-0.5 rounded">
              {deployedAddress}
            </code>
          </div>
          <a
            href={`/${deployedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-700 hover:text-green-900 underline"
          >
            View Website →
          </a>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Editor Panel */}
        <div className="w-1/2 border-r bg-white flex flex-col">
          <div className="border-b px-4 py-2 flex items-center justify-between">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab("editor")}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  activeTab === "editor"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  activeTab === "preview"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Preview
              </button>
            </div>
            <div className="flex gap-2">
              {!validation.success && (
                <span className="text-xs text-red-600 self-center">
                  Invalid JSON
                </span>
              )}
              <button
                onClick={handleDeploy}
                disabled={!isConnected || isDeploying || !validation.success}
                className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
              >
                {isDeploying ? "Deploying..." : "Deploy"}
              </button>
              {contractAddress && (
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating || !validation.success}
                  className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
              )}
            </div>
          </div>

          {/* Contract Address Input */}
          <div className="border-b px-4 py-2">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Contract:</label>
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="0x... (paste to update existing)"
                className="flex-1 text-sm font-mono px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Editor Toolbar */}
          {activeTab === "editor" && (
            <div className="border-b px-4 py-2 flex justify-end">
              <button
                onClick={handleFormat}
                className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                Format JSON
              </button>
            </div>
          )}

          <div className="flex-1 p-4">
            {activeTab === "editor" ? (
              <JsonEditor value={json} onChange={setJson} error={deployError} />
            ) : (
              <div className="h-full border rounded-lg overflow-auto bg-white">
                <WebsiteRenderer jsonString={json} />
              </div>
            )}
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="w-1/2 flex flex-col">
          <div className="border-b px-4 py-2 bg-white">
            <span className="font-medium text-gray-700">Live Preview</span>
          </div>
          <div className="flex-1 overflow-auto">
            <WebsiteRenderer jsonString={json} />
          </div>
        </div>
      </div>
    </div>
  );
}
