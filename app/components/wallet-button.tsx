"use client";
import { useState, useRef, useEffect, useId } from "react";
import Image from "next/image";
import { Check, Copy, ExternalLink, LogOut, Wallet, X } from "lucide-react";
import { useWallet } from "../lib/wallet/context";
import { useBalance } from "../lib/hooks/use-balance";
import { lamportsToSolString } from "../lib/lamports";
import { ellipsify } from "../lib/explorer";
import { useCluster, CLUSTERS } from "./cluster-context";

export function WalletButton() {
  const { connectors, connect, disconnect, wallet, status, error, isReady } =
    useWallet();
  const { cluster, setCluster, getExplorerUrl } = useCluster();
  const [isOpen, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const id = useId();
  const address = wallet?.account.address;
  const balance = useBalance(address);
  const connected = status === "connected" && !!address;
  const connecting = status === "connecting";
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  useEffect(() => {
    if (!isOpen) return;
    panel.current?.focus();
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", key);
    };
  }, [isOpen]);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  const copy = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setCopyError("");
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(
        "Couldn’t copy automatically. Select and copy the address below."
      );
    }
  };
  return (
    <div className="wallet-control" ref={root}>
      <button
        ref={trigger}
        className="wallet-trigger"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        disabled={!isReady}
      >
        <Wallet size={18} aria-hidden="true" />
        <span>
          {connected
            ? ellipsify(address, 4)
            : connecting
              ? "Connecting…"
              : "Connect wallet"}
        </span>
      </button>
      {isOpen && (
        <div
          ref={panel}
          tabIndex={-1}
          role="dialog"
          aria-labelledby={`${id}-title`}
          id={id}
          className="wallet-panel"
        >
          <div className="wallet-panel-heading">
            <strong id={`${id}-title`}>
              {connected ? "Your wallet" : "Connect a wallet"}
            </strong>
            <button
              type="button"
              onClick={close}
              aria-label="Close wallet panel"
            >
              <X size={20} />
            </button>
          </div>
          <label className="wallet-network">
            Network
            <select
              value={cluster}
              onChange={(event) =>
                setCluster(event.target.value as typeof cluster)
              }
            >
              {CLUSTERS.map((network) => (
                <option key={network} value={network}>
                  {network === "mainnet"
                    ? "Mainnet"
                    : network === "localnet"
                      ? "Localnet"
                      : network === "testnet"
                        ? "Testnet"
                        : "Devnet"}
                </option>
              ))}
            </select>
          </label>
          {!connected ? (
            <>
              {connectors.length ? (
                <div className="wallet-options">
                  {connectors.map((connector) => (
                    <button
                      type="button"
                      key={connector.id}
                      disabled={connecting}
                      onClick={() => void connect(connector.id)}
                    >
                      {connector.icon && (
                        <Image
                          src={connector.icon}
                          alt=""
                          width={28}
                          height={28}
                          unoptimized
                        />
                      )}
                      <span>{connector.name}</span>
                      <ExternalLink size={16} />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="wallet-empty">
                  <p>No Solana wallet detected.</p>
                  <p>
                    Open this page in a wallet-enabled browser, or install a
                    wallet and reload.
                  </p>
                  <div>
                    <a
                      href="https://phantom.com/download"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Phantom <ExternalLink size={16} />
                    </a>
                    <a
                      href="https://www.solflare.com/download/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Solflare <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              )}
              {connecting && (
                <p role="status">Approve the connection in your wallet.</p>
              )}
              {error != null && (
                <p className="wallet-error" role="alert">
                  {error instanceof Error ? error.message : String(error)} Try
                  connecting again.
                </p>
              )}
              <p className="wallet-note">
                Connecting shares your public address. It does not move funds.
              </p>
            </>
          ) : (
            <>
              <div className="wallet-balance">
                <span>SOL balance · {cluster}</span>
                <strong>
                  {balance.isLoading
                    ? "Loading…"
                    : balance.lamports !== null
                      ? `${lamportsToSolString(balance.lamports)} SOL`
                      : "Unavailable"}
                </strong>
                {balance.error && (
                  <div className="wallet-error">
                    <p>Couldn’t load this network’s balance.</p>
                    <button type="button" onClick={() => void balance.mutate()}>
                      Retry balance
                    </button>
                  </div>
                )}
              </div>
              <p className="wallet-address" key={address}>
                {address}
              </p>
              <div className="wallet-account-actions">
                <button type="button" onClick={copy}>
                  {copied ? <Check size={17} /> : <Copy size={17} />}{" "}
                  {copied ? "Copied" : "Copy address"}
                </button>
                <a
                  href={getExplorerUrl(`/address/${address}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explorer <ExternalLink size={17} />
                </a>
              </div>
              {copyError && (
                <p className="wallet-error" role="alert">
                  {copyError}
                </p>
              )}
              <button
                className="wallet-disconnect"
                type="button"
                onClick={() => {
                  void disconnect();
                  close();
                }}
              >
                <LogOut size={17} />
                Disconnect
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
