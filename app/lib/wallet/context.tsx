"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  type PropsWithChildren,
} from "react";
import type { TransactionSigner } from "@solana/kit";
import type { WalletConnector, WalletSession } from "./types";
import { discoverWallets, watchWallets, watchWalletSession } from "./standard";
import { createWalletSigner } from "./signer";
import { useCluster } from "../../components/cluster-context";

type WalletStatus = "disconnected" | "connecting" | "connected" | "error";
type WalletContextValue = {
  connectors: WalletConnector[];
  status: WalletStatus;
  wallet: WalletSession | undefined;
  signer: TransactionSigner | undefined;
  error: unknown;
  connect: (connectorId: string) => Promise<void>;
  disconnect: () => Promise<void>;
  isReady: boolean;
};
const WalletContext = createContext<WalletContextValue | null>(null);
const STORAGE_KEY = "solana:last-connector";
function remember(id?: string) {
  try {
    if (id) localStorage.setItem(STORAGE_KEY, id);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* Connection remains usable when browser storage is unavailable. */
  }
}
function remembered() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function WalletProvider({ children }: PropsWithChildren) {
  const { cluster } = useCluster();
  const [connectors, setConnectors] = useState<WalletConnector[]>([]);
  const [session, setSession] = useState<WalletSession>();
  const [status, setStatus] = useState<WalletStatus>("disconnected");
  const [error, setError] = useState<unknown>();
  const [isReady, setReady] = useState(false);
  const connectorsRef = useRef<WalletConnector[]>([]);
  const sessionRef = useRef<WalletSession | undefined>(undefined);
  const generation = useRef(0);
  const busy = useRef(false);
  const autoConnectAttempted = useRef(false);
  const establish = useCallback(
    async (connector: WalletConnector, silent = false) => {
      const request = ++generation.current;
      busy.current = true;
      setStatus("connecting");
      setError(undefined);
      try {
        const next = await connector.connect(
          silent ? { silent: true } : undefined
        );
        if (request !== generation.current) return;
        sessionRef.current = next;
        setSession(next);
        setStatus("connected");
        remember(connector.id);
      } catch (err) {
        if (request !== generation.current) return;
        sessionRef.current = undefined;
        setSession(undefined);
        remember();
        setError(silent ? undefined : err);
        setStatus(silent ? "disconnected" : "error");
      } finally {
        if (request === generation.current) busy.current = false;
      }
    },
    []
  );
  useEffect(() => {
    const update = (updated: WalletConnector[]) => {
      connectorsRef.current = updated;
      setConnectors(updated);
      setReady(true);
      if (
        sessionRef.current &&
        !updated.some(
          (connector) => connector.id === sessionRef.current?.connector.id
        )
      ) {
        generation.current++;
        busy.current = false;
        sessionRef.current = undefined;
        setSession(undefined);
        setStatus("disconnected");
        setError(undefined);
        remember();
      }
      const lastId = remembered();
      const connector = updated.find((connector) => connector.id === lastId);
      if (
        connector &&
        !sessionRef.current &&
        !busy.current &&
        !autoConnectAttempted.current
      ) {
        autoConnectAttempted.current = true;
        void establish(connector, true);
      }
    };
    const off = watchWallets(update);
    const initial = requestAnimationFrame(() => update(discoverWallets()));
    return () => {
      cancelAnimationFrame(initial);
      off();
      generation.current++;
      busy.current = false;
      autoConnectAttempted.current = false;
    };
  }, [establish]);
  useEffect(() => {
    if (!session) return;
    return watchWalletSession(session, (next) => {
      generation.current++;
      busy.current = false;
      sessionRef.current = next;
      setSession(next);
      setStatus(next ? "connected" : "disconnected");
      setError(undefined);
      if (!next) remember();
    });
  }, [session]);
  const connect = useCallback(
    async (connectorId: string) => {
      if (busy.current) return;
      const connector = connectorsRef.current.find(
        (connector) => connector.id === connectorId
      );
      if (!connector) throw new Error(`Unknown connector: ${connectorId}`);
      autoConnectAttempted.current = true;
      await establish(connector);
    },
    [establish]
  );
  const disconnect = useCallback(async () => {
    const current = sessionRef.current;
    generation.current++;
    busy.current = false;
    sessionRef.current = undefined;
    setSession(undefined);
    setStatus("disconnected");
    setError(undefined);
    remember();
    try {
      await current?.disconnect();
    } catch {
      /* Local disconnection has already completed. */
    }
  }, []);
  const signer = useMemo(
    () =>
      session ? createWalletSigner(session, `solana:${cluster}`) : undefined,
    [session, cluster]
  );
  const value = useMemo<WalletContextValue>(
    () => ({
      connectors,
      status,
      wallet: session,
      signer,
      error,
      connect,
      disconnect,
      isReady,
    }),
    [connectors, status, session, signer, error, connect, disconnect, isReady]
  );
  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}
export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within WalletProvider");
  return context;
}
