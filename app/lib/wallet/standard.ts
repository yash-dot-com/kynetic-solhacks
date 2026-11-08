import { getWallets } from "@wallet-standard/app";
import type {
  Wallet as StandardWallet,
  WalletAccount as StandardAccount,
} from "@wallet-standard/base";
import {
  StandardConnect,
  StandardDisconnect,
  StandardEvents,
  type StandardConnectFeature,
  type StandardDisconnectFeature,
  type StandardEventsFeature,
} from "@wallet-standard/features";
import {
  SolanaSignTransaction,
  SolanaSignAndSendTransaction,
  type SolanaSignTransactionFeature,
  type SolanaSignAndSendTransactionFeature,
} from "@solana/wallet-standard-features";
import { address } from "@solana/kit";
import type {
  WalletConnector,
  WalletConnectorMetadata,
  WalletSession,
} from "./types";

function isSolanaWallet(wallet: StandardWallet): boolean {
  return (
    StandardConnect in wallet.features &&
    wallet.chains.some((chain) => chain.startsWith("solana:")) &&
    (SolanaSignTransaction in wallet.features ||
      SolanaSignAndSendTransaction in wallet.features)
  );
}
function supportedAccount(account: StandardAccount) {
  return (
    account.chains.some((chain) => chain.startsWith("solana:")) &&
    (account.features.includes(SolanaSignTransaction) ||
      account.features.includes(SolanaSignAndSendTransaction))
  );
}
function createSession(
  wallet: StandardWallet,
  account: StandardAccount
): WalletSession {
  const metadata: WalletConnectorMetadata = {
    id: wallet.name,
    name: wallet.name,
    icon: wallet.icon,
  };
  function checkChain(chain: string) {
    if (!account.chains.includes(chain as `${string}:${string}`))
      throw new Error(
        "This wallet account does not support the selected network. Choose another network or wallet account."
      );
    if (!wallet.accounts.some((current) => current.address === account.address))
      throw new Error(
        "Wallet account is no longer connected. Connect your wallet again."
      );
  }
  return {
    account: {
      address: address(account.address),
      publicKey: new Uint8Array(account.publicKey),
      label: account.label,
    },
    connector: metadata,
    disconnect: async () => {
      if (StandardDisconnect in wallet.features)
        await (
          wallet.features[
            StandardDisconnect
          ] as StandardDisconnectFeature[typeof StandardDisconnect]
        ).disconnect();
    },
    signTransaction:
      account.features.includes(SolanaSignTransaction) &&
      SolanaSignTransaction in wallet.features
        ? async (transaction, chain) => {
            checkChain(chain);
            const [result] = await (
              wallet.features[
                SolanaSignTransaction
              ] as SolanaSignTransactionFeature[typeof SolanaSignTransaction]
            ).signTransaction({
              account,
              transaction,
              chain: chain as `${string}:${string}`,
            });
            if (!result)
              throw new Error("Wallet did not return a signed transaction.");
            return new Uint8Array(result.signedTransaction);
          }
        : undefined,
    sendTransaction:
      account.features.includes(SolanaSignAndSendTransaction) &&
      SolanaSignAndSendTransaction in wallet.features
        ? async (transaction, chain) => {
            checkChain(chain);
            const [result] = await (
              wallet.features[
                SolanaSignAndSendTransaction
              ] as SolanaSignAndSendTransactionFeature[typeof SolanaSignAndSendTransaction]
            ).signAndSendTransaction({
              account,
              transaction,
              chain: chain as `${string}:${string}`,
            });
            if (!result)
              throw new Error("Wallet did not return a transaction signature.");
            return new Uint8Array(result.signature);
          }
        : undefined,
  };
}
function createConnector(wallet: StandardWallet): WalletConnector {
  return {
    id: wallet.name,
    name: wallet.name,
    icon: wallet.icon,
    connect: async (options) => {
      const feature = wallet.features[
        StandardConnect
      ] as StandardConnectFeature[typeof StandardConnect];
      const { accounts } = await feature.connect(
        options?.silent ? { silent: true } : undefined
      );
      const account = accounts.find(supportedAccount);
      if (!account)
        throw new Error(
          "No Solana account with transaction signing is available in this wallet."
        );
      return createSession(wallet, account);
    },
  };
}
export function discoverWallets(): WalletConnector[] {
  return getWallets().get().filter(isSolanaWallet).map(createConnector);
}
export function watchWallets(
  onChange: (connectors: WalletConnector[]) => void
): () => void {
  const wallets = getWallets();
  const update = () => onChange(discoverWallets());
  const offRegister = wallets.on("register", update);
  const offUnregister = wallets.on("unregister", update);
  return () => {
    offRegister();
    offUnregister();
  };
}
// Internal adapter subscription: account changes rebuild the existing session shape.
export function watchWalletSession(
  session: WalletSession,
  onChange: (session: WalletSession | undefined) => void
): () => void {
  const wallet = getWallets()
    .get()
    .find((wallet) => wallet.name === session.connector.id);
  if (!wallet || !(StandardEvents in wallet.features)) return () => {};
  const events = wallet.features[
    StandardEvents
  ] as StandardEventsFeature[typeof StandardEvents];
  return events.on("change", (properties) => {
    if (!properties.accounts && !properties.features && !properties.chains)
      return;
    const account = (properties.accounts ?? wallet.accounts).find(
      supportedAccount
    );
    onChange(
      account && isSolanaWallet(wallet)
        ? createSession(wallet, account)
        : undefined
    );
  });
}
