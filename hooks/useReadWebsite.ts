"use client";

import { useReadContract } from "wagmi";
import { somiWebsiteAbi } from "@/lib/contract";

// Read website JSON
export function useReadWebsite(contractAddress: `0x${string}` | undefined) {
  return useReadContract({
    address: contractAddress,
    abi: somiWebsiteAbi,
    functionName: "websiteJson",
    query: {
      enabled: !!contractAddress,
    },
  });
}

// Read website info (owner, timestamps)
export function useWebsiteInfo(contractAddress: `0x${string}` | undefined) {
  return useReadContract({
    address: contractAddress,
    abi: somiWebsiteAbi,
    functionName: "getWebsiteInfo",
    query: {
      enabled: !!contractAddress,
    },
  });
}
