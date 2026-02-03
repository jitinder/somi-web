"use client";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { somiWebsiteAbi } from "@/lib/contract";

export function useUpdateWebsite() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const updateWebsite = (
    contractAddress: `0x${string}`,
    websiteJson: string
  ) => {
    writeContract({
      address: contractAddress,
      abi: somiWebsiteAbi,
      functionName: "updateWebsite",
      args: [websiteJson],
    });
  };

  return {
    updateWebsite,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}
