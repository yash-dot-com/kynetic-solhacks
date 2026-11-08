"use client";
import { useRef, useState } from "react";
import { signature } from "@solana/kit";
import { useWallet } from "../wallet/context";
import { useCluster } from "../../components/cluster-context";
import { useSendTransaction } from "./use-send-transaction";
import {
  BOUNTY_PROGRAM,
  BOUNTY_ACCOUNT_BYTES,
  MAX_METADATA_BYTES,
  bountyRpc,
  bountyAddress,
  unsigned,
  utf8,
  joinBytes,
  hashSpec,
  bytesHex,
  instruction,
  fetchBounty,
  solToLamports,
  type BountySpec,
} from "../bounty/client";

export function useFundBounty() {
  const { signer } = useWallet();
  const { cluster } = useCluster();
  const { send } = useSendTransaction();
  const [stage, setStage] = useState("");
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const current = useRef({ host: signer?.address, cluster });
  current.current = { host: signer?.address, cluster };
  async function fund(spec: BountySpec) {
    if (lock.current) throw new Error("A funding request is already running.");
    if (!signer || cluster !== "devnet")
      throw new Error("Connect your wallet and switch to Solana Devnet.");
    lock.current = true;
    setBusy(true);
    const host = signer.address;
    const rpc = bountyRpc();
    const assertContext = () => {
      if (current.current.host !== host || current.current.cluster !== "devnet")
        throw new Error(
          "Wallet or network changed. Reconnect on Devnet and resume publishing."
        );
    };
    const confirm = async (sig: string) => {
      for (let i = 0; i < 40; i++) {
        const response = await rpc
          .getSignatureStatuses([signature(sig)], {
            searchTransactionHistory: true,
          })
          .send();
        const value = response.value[0];
        if (value?.err)
          throw new Error(`Transaction failed: ${JSON.stringify(value.err)}`);
        if (
          value?.confirmationStatus === "confirmed" ||
          value?.confirmationStatus === "finalized"
        )
          return;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      throw new Error(
        "Confirmation is taking longer than expected. Resume publishing to check the existing escrow before sending again."
      );
    };
    try {
      setStage("Checking Devnet program and balance…");
      const program = await rpc
        .getAccountInfo(BOUNTY_PROGRAM, {
          encoding: "base64",
          commitment: "confirmed",
        })
        .send();
      if (!program.value?.executable)
        throw new Error(
          "The Kynetic escrow program is not deployed on Devnet yet."
        );
      const bytes = utf8(JSON.stringify(spec));
      if (bytes.length > MAX_METADATA_BYTES)
        throw new Error(
          `Bounty details are ${bytes.length} bytes. Shorten them to ${MAX_METADATA_BYTES} bytes or fewer.`
        );
      const hash = await hashSpec(bytes),
        pool = solToLamports(spec.pool),
        stake = solToLamports(spec.stake);
      const deadline = BigInt(
        Math.floor(Date.parse(`${spec.deadline}T23:59:59Z`) / 1000)
      );
      if (pool <= 0n || deadline <= BigInt(Math.floor(Date.now() / 1000)))
        throw new Error("Use a positive reward pool and a future deadline.");
      const receiptKey = `kynetic:publish:devnet:${BOUNTY_PROGRAM}:${host}:${bytesHex(hash)}`;
      let nonce: bigint;
      const stored = localStorage.getItem(receiptKey);
      if (stored) nonce = BigInt(JSON.parse(stored).nonce);
      else {
        const random = crypto.getRandomValues(new Uint8Array(8));
        nonce = new DataView(random.buffer).getBigUint64(0, true);
        localStorage.setItem(
          receiptKey,
          JSON.stringify({ nonce: nonce.toString() })
        );
      }
      const key = await bountyAddress(host, nonce);
      let account = await fetchBounty(key);
      if (
        account &&
        (bytesHex(account.metadataHash) !== bytesHex(hash) ||
          account.pool !== pool ||
          account.stake !== stake ||
          account.deadline !== deadline)
      )
        throw new Error(
          "The saved transaction belongs to different bounty details. Edit and save a new draft."
        );
      if (account?.status === 1) {
        setStage("Escrow already funded and confirmed.");
        return {
          address: key,
          signature: stored
            ? (JSON.parse(stored).signature as string | undefined)
            : undefined,
        };
      }
      if (account && account.status !== 0)
        throw new Error("This bounty has already been settled or cancelled.");
      const rent = account
        ? 0n
        : await rpc
            .getMinimumBalanceForRentExemption(BigInt(BOUNTY_ACCOUNT_BYTES))
            .send();
      const balance = (await rpc.getBalance(host).send()).value;
      if (balance < pool + rent + 1_000_000n)
        throw new Error(
          "Insufficient Devnet SOL for the bounty, account rent, and transaction fees. Fund your wallet from the Solana Devnet faucet."
        );
      if (!account) {
        assertContext();
        setStage("Approve bounty account creation in your wallet…");
        const args = joinBytes(
          unsigned(nonce),
          unsigned(pool),
          unsigned(stake),
          unsigned(deadline),
          hash,
          unsigned(bytes.length, 2)
        );
        const sig = await send({
          instructions: [instruction("initialize_bounty", signer, key, args)],
        });
        await confirm(sig);
        account = await fetchBounty(key);
      }
      if (!account)
        throw new Error(
          "Bounty account is not visible yet. Resume publishing shortly."
        );
      if (
        !bytes
          .slice(0, account.metadata.length)
          .every((byte, i) => byte === account!.metadata[i])
      )
        throw new Error("Uploaded bounty details differ from this draft.");
      for (
        let offset = account.metadata.length;
        offset < bytes.length;
        offset += 600
      ) {
        assertContext();
        const chunk = bytes.slice(offset, offset + 600);
        setStage(
          `Approve bounty details · ${Math.ceil((offset + chunk.length) / 600)} of ${Math.ceil(bytes.length / 600)}…`
        );
        const sig = await send({
          instructions: [
            instruction(
              "append_metadata",
              signer,
              key,
              joinBytes(unsigned(offset, 2), unsigned(chunk.length, 4), chunk)
            ),
          ],
        });
        await confirm(sig);
      }
      assertContext();
      setStage(`Approve ${spec.pool} SOL into bounty escrow…`);
      const sig = await send({
        instructions: [instruction("fund_bounty", signer, key)],
      });
      try {
        localStorage.setItem(
          receiptKey,
          JSON.stringify({ nonce: nonce.toString(), signature: sig })
        );
      } catch {
        /* The confirmed account remains the source of truth. */
      }
      setStage("Confirming escrow funding on Devnet…");
      await confirm(sig);
      const funded = await fetchBounty(key);
      if (funded?.status !== 1 || funded.pool !== pool)
        throw new Error(
          "Funding confirmation is pending. Resume publishing to re-check; do not create a second bounty."
        );
      setStage("Bounty funded and published.");
      return { address: key, signature: sig };
    } finally {
      setBusy(false);
      lock.current = false;
    }
  }
  return { fund, busy, stage };
}
