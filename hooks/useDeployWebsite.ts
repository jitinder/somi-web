"use client";

import { useCallback, useState } from "react";
import { useWalletClient, usePublicClient } from "wagmi";
import { somiWebsiteAbi, somiWebsiteBytecode } from "@/lib/contract";

export function useDeployWebsite() {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deployWebsite = useCallback(
    async (websiteJson: string) => {
      if (!walletClient || !publicClient) {
        throw new Error("Wallet not connected");
      }

      setIsPending(true);
      setError(null);

      try {
        // Deploy contract
        const hash = await walletClient.deployContract({
          abi: somiWebsiteAbi,
          bytecode: somiWebsiteBytecode,
          args: [websiteJson],
        });

        // Wait for transaction receipt
        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        if (!receipt.contractAddress) {
          throw new Error("Contract deployment failed - no address returned");
        }

        return {
          hash,
          contractAddress: receipt.contractAddress,
        };
      } catch (e) {
        const err = e instanceof Error ? e : new Error("Deployment failed");
        setError(err);
        throw err;
      } finally {
        setIsPending(false);
      }
    },
    [walletClient, publicClient]
  );

  return { deployWebsite, isPending, error };
}
