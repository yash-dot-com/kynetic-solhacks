"use client";

import { useState, useRef, useEffect } from "react";
import { useWallet } from "../lib/wallet/context";
import { useBalance } from "../lib/hooks/use-balance";
import { lamportsToSolString } from "../lib/lamports";
import { ellipsify } from "../lib/explorer";
import { useCluster } from "./cluster-context";
import { Button } from "@/components/ui/button";

export function WalletButton() {
  const { connectors, connect, disconnect, wallet, status, error } =
    useWallet();

  const { getExplorerUrl } = useCluster();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const address = wallet?.account.address;
  const balance = useBalance(address);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status !== "connected") {
    return (
      <div className="relative" ref={ref}>
        <Button onClick={() => (isOpen ? close() : open())}>
          Connect Wallet
        </Button>

        {isOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-border bg-popover p-(--space-overlay) shadow-xl">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Choose a wallet
            </p>
            <div className="space-y-1">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={async () => {
                    try {
                      await connect(connector.id);
                      close();
                    } catch {
                      // connection errors are surfaced through context state
                    }
                  }}
                  disabled={status === "connecting"}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition hover:bg-surface-alt disabled:opacity-50 disabled:pointer-events-none"
                >
                  {connector.icon && (
                    <img
                      src={connector.icon}
                      alt=""
                      className="h-5 w-5 rounded"
                    />
                  )}
                  <span>{connector.name}</span>
                </button>
              ))}
            </div>
            {status === "connecting" && (
              <p className="mt-2 text-xs text-muted-foreground">
                Connecting...
              </p>
            )}
            {error != null && (
              <p className="mt-2 text-xs text-destructive">
                {error instanceof Error ? error.message : String(error)}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="outline"
        onClick={() => (isOpen ? close() : open())}
        className="gap-2"
      >
        <span className="size-2 rounded-full bg-success" />
        <span className="font-mono">{ellipsify(address!, 4)}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-border bg-popover p-(--space-overlay) shadow-xl">
          <div className="mb-3">
            <p className="text-xs text-muted-foreground">Balance</p>
            <p className="text-lg font-bold tabular-nums">
              {balance.lamports != null
                ? lamportsToSolString(balance.lamports)
                : "\u2014"}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                SOL
              </span>
            </p>
          </div>

          <div className="mb-3 rounded-xl border border-border bg-surface-alt px-3 py-2">
            <p className="break-all font-mono text-xs">{address}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 cursor-pointer rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium transition hover:bg-surface-alt"
            >
              {copied ? "Copied!" : "Copy address"}
            </button>
            <a
              href={getExplorerUrl(`/address/${address}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full border border-border bg-surface px-3 py-2 text-center text-xs font-medium transition hover:bg-surface-alt"
            >
              Explorer
            </a>
          </div>

          <button
            onClick={() => {
              disconnect();
              close();
            }}
            className="mt-2 w-full cursor-pointer rounded-full border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs font-medium text-destructive transition hover:bg-destructive/10"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
