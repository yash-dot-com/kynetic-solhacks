"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { PropsWithChildren } from "react";
import { ClusterProvider } from "./cluster-context";
import { WalletProvider } from "../lib/wallet/context";
import { SolanaClientProvider } from "../lib/solana-client-context";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
    >
      <TooltipProvider>
        <ClusterProvider>
          <SolanaClientProvider>
            <WalletProvider>{children}</WalletProvider>
          </SolanaClientProvider>
          <Toaster position="bottom-right" richColors />
        </ClusterProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
