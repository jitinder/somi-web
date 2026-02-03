import type { Metadata } from "next";
import { createPublicClient, http } from "viem";
import { somniaTestnet } from "@/lib/chains";
import { somiWebsiteAbi } from "@/lib/contract";
import { WebsiteRenderer } from "@/components/renderer/WebsiteRenderer";

interface PageProps {
  params: Promise<{ address: string }>;
}

// Create a public client for server-side data fetching
const publicClient = createPublicClient({
  chain: somniaTestnet,
  transport: http(),
});

// Fetch website data server-side
async function getWebsiteData(address: string) {
  try {
    // Validate address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return null;
    }

    const data = await publicClient.readContract({
      address: address as `0x${string}`,
      abi: somiWebsiteAbi,
      functionName: "getWebsiteInfo",
    });

    return {
      owner: data[0],
      websiteJson: data[1],
      createdAt: Number(data[2]),
      updatedAt: Number(data[3]),
    };
  } catch (error) {
    console.error("Error fetching website:", error);
    return null;
  }
}

// Generate metadata from website JSON
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { address } = await params;
  const data = await getWebsiteData(address);

  if (!data) {
    return { title: "Website Not Found | Somi Web" };
  }

  try {
    const parsed = JSON.parse(data.websiteJson);
    return {
      title: parsed.metadata?.title || "Somi Web",
      description: parsed.metadata?.description || "On-chain website",
    };
  } catch {
    return { title: "Somi Web" };
  }
}

export default async function WebsitePage({ params }: PageProps) {
  const { address } = await params;
  const data = await getWebsiteData(address);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Website Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            No website exists at this contract address, or the address is
            invalid.
          </p>
          <p className="text-sm text-gray-500 font-mono break-all">{address}</p>
          <a
            href="/"
            className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create a Website
          </a>
        </div>
      </div>
    );
  }

  return <WebsiteRenderer jsonString={data.websiteJson} />;
}
