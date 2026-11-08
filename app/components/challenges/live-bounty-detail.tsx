"use client";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { address } from "@solana/kit";
import { ArrowLeft, ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import {
  fetchBounty,
  fetchEntries,
  entryAddress,
  instruction,
  unsigned,
  solAmount,
  bountyExplorer,
  type OnchainEntry,
} from "@/app/lib/bounty/client";
import { useWallet } from "@/app/lib/wallet/context";
import { useCluster } from "../cluster-context";
import { useSendTransaction } from "@/app/lib/hooks/use-send-transaction";
import { WalletButton } from "../wallet-button";

export function LiveBountyDetail({ account }: { account: string }) {
  const key = address(account);
  const {
    data: bounty,
    error: loadError,
    mutate: refreshBounty,
  } = useSWR(["live-bounty", account], () => fetchBounty(key), {
    refreshInterval: 15000,
  });
  const { data: entries = [], mutate: refreshEntries } = useSWR(
    ["bounty-entries", account],
    () => fetchEntries(key),
    { refreshInterval: 15000 }
  );
  const { wallet, signer, status } = useWallet();
  const { cluster, setCluster } = useCluster();
  const { send, isSending } = useSendTransaction();
  const [error, setError] = useState("");
  const [lastSignature, setLastSignature] = useState("");
  const [gains, setGains] = useState<Record<string, string>>({});
  const spec = bounty?.spec;
  async function action(
    name:
      | "enter_bounty"
      | "refund_stake"
      | "claim_reward"
      | "record_evaluation"
      | "settle_bounty"
      | "cancel_bounty"
      | "sweep_rounding_dust",
    entry?: OnchainEntry
  ) {
    setError("");
    if (!signer || cluster !== "devnet") {
      setError("Connect your wallet on Devnet.");
      return;
    }
    try {
      let args = new Uint8Array();
      if (name === "record_evaluation") {
        const value = Number(gains[entry!.address]);
        if (
          !gains[entry!.address]?.trim() ||
          !Number.isFinite(value) ||
          value < 0 ||
          value > 1_000_000
        )
          throw new Error(
            "Enter a non-negative model gain. Use 0 for no improvement."
          );
        args = unsigned(BigInt(Math.round(value * 1000)));
      }
      const entryKey =
        entry?.address ??
        (["enter_bounty", "refund_stake", "claim_reward"].includes(name)
          ? await entryAddress(key, signer.address)
          : undefined);
      const sig = await send({
        instructions: [instruction(name, signer, key, args, entryKey)],
      });
      setLastSignature(sig);
      await Promise.all([refreshBounty(), refreshEntries()]);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Transaction failed. Refresh the bounty before retrying."
      );
    }
  }
  if (loadError)
    return (
      <main className="n-main n-host-page">
        <h1>Couldn’t load this bounty.</h1>
        <p className="n-description">
          The Devnet RPC could not return its escrow account.
        </p>
        <button
          className="n-button"
          type="button"
          onClick={() => void refreshBounty()}
        >
          Retry
        </button>
      </main>
    );
  if (!bounty || !spec)
    return (
      <main className="n-main n-host-page">
        <p role="status">Loading bounty from Devnet…</p>
      </main>
    );
  const host = wallet?.account.address === bounty.host;
  const ownEntry = entries.find(
    (entry) => entry.curator === wallet?.account.address
  );
  const closed = BigInt(Math.floor(Date.now() / 1000)) >= bounty.deadline;
  const state =
    ["Draft", "Open", "Settled", "Cancelled"][bounty.status] ?? "Unknown";
  const ranked = [...entries].sort((a, b) =>
    a.gain > b.gain ? -1 : a.gain < b.gain ? 1 : 0
  );
  return (
    <main className="n-main n-bounty-detail-page">
      <Link className="n-back-link" href="/challenges">
        <ArrowLeft size={14} />
        Bounties / {spec.category}
      </Link>
      <div className="n-detail-title">
        <div>
          <p className="n-eyebrow">
            Hosted by {spec.host} ·{" "}
            <span className="n-status-tag">{state} · Devnet</span>
          </p>
          <h1>{spec.title}</h1>
          <p className="n-description">{spec.description}</p>
        </div>
        <a
          className="n-button"
          href={bountyExplorer(`address/${account}`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LockKeyhole size={15} />
          View escrow <ArrowUpRight size={14} />
        </a>
      </div>
      <dl className="n-bounty-summary">
        <div>
          <dt>Funded reward pool</dt>
          <dd>{solAmount(bounty.pool)} SOL</dd>
        </div>
        <div>
          <dt>Entry stake</dt>
          <dd>{solAmount(bounty.stake)} SOL</dd>
        </div>
        <div>
          <dt>Baseline → target</dt>
          <dd>
            {spec.baseline} → {spec.target}
          </dd>
        </div>
        <div>
          <dt>Submission deadline · UTC</dt>
          <dd>{spec.deadline}</dd>
        </div>
      </dl>
      <div className="n-live-transaction">
        <div>
          <strong>
            {host ? "Host controls" : "Participate in this bounty"}
          </strong>
          <p className="n-description">
            {host
              ? "Record off-chain evaluation gains after the deadline, then settle the pool."
              : "Your entry stake is separate from the reward pool and refundable after the deadline."}
          </p>
        </div>
        {status !== "connected" ? (
          <WalletButton />
        ) : cluster !== "devnet" ? (
          <button
            type="button"
            className="n-button n-primary"
            onClick={() => setCluster("devnet")}
          >
            Switch to Devnet
          </button>
        ) : (
          <div className="n-actions">
            {!host && !ownEntry && bounty.status === 1 && !closed && (
              <button
                type="button"
                className="n-button n-primary"
                disabled={isSending}
                onClick={() => void action("enter_bounty")}
              >
                Stake {solAmount(bounty.stake)} SOL to enter
              </button>
            )}
            {ownEntry && !ownEntry.refunded && closed && (
              <button
                type="button"
                className="n-button"
                disabled={isSending}
                onClick={() => void action("refund_stake", ownEntry)}
              >
                Refund entry stake
              </button>
            )}
            {ownEntry &&
              bounty.status === 2 &&
              ownEntry.gain > 0n &&
              !ownEntry.claimed && (
                <button
                  type="button"
                  className="n-button n-primary"
                  disabled={isSending}
                  onClick={() => void action("claim_reward", ownEntry)}
                >
                  Claim SOL reward
                </button>
              )}
            {host && bounty.status === 1 && closed && (
              <button
                type="button"
                className="n-button n-primary"
                disabled={isSending || bounty.evaluated !== bounty.entries}
                onClick={() => void action("settle_bounty")}
              >
                Settle rewards ({bounty.evaluated}/{bounty.entries} evaluated)
              </button>
            )}
            {host && bounty.status === 1 && bounty.entries === 0 && (
              <button
                type="button"
                className="n-button"
                disabled={isSending}
                onClick={() => void action("cancel_bounty")}
              >
                Cancel & recover pool
              </button>
            )}
            {host &&
              bounty.status === 2 &&
              bounty.claims === bounty.positiveEntries &&
              bounty.totalPaid < bounty.pool && (
                <button
                  type="button"
                  className="n-button"
                  disabled={isSending}
                  onClick={() => void action("sweep_rounding_dust")}
                >
                  Recover rounding remainder
                </button>
              )}
            {ownEntry && (
              <span className="n-status-tag">
                <Check size={13} />
                Entry registered{ownEntry.refunded ? " · stake refunded" : ""}
              </span>
            )}
          </div>
        )}
      </div>
      {isSending && (
        <p role="status" className="n-funding-stage">
          Approve the transaction in your wallet. Waiting for confirmation…
        </p>
      )}
      {error && (
        <p role="alert" className="n-form-error">
          {error}
        </p>
      )}
      {lastSignature && (
        <a
          className="n-text-link n-chain-receipt"
          href={bountyExplorer(`tx/${lastSignature}`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          View transaction <ArrowUpRight size={14} />
        </a>
      )}
      <section className="n-detail-overview">
        <article>
          <h2>Tasks & subtasks</h2>
          <p className="n-preserve-lines">{spec.requirements}</p>
          <h3>Dataset format</h3>
          <p>{spec.format}</p>
          <h3>Evaluation protocol</h3>
          <p className="n-preserve-lines">{spec.evaluation}</p>
        </article>
        <dl>
          <div>
            <dt>Model</dt>
            <dd>{spec.model}</dd>
          </div>
          <div>
            <dt>Primary metric</dt>
            <dd>
              {spec.metric} · {spec.direction} is better
            </dd>
          </div>
          <div>
            <dt>Reward rules</dt>
            <dd>
              Pool × your positive gain ÷ total positive gains. Stake refunds
              are independent of reward eligibility.
            </dd>
          </div>
          <div>
            <dt>Escrow remaining</dt>
            <dd>{solAmount(bounty.pool - bounty.totalPaid)} SOL</dd>
          </div>
          <div>
            <dt>Host wallet</dt>
            <dd className="n-chain-address">{bounty.host}</dd>
          </div>
        </dl>
      </section>
      <section>
        <div className="n-section-heading">
          <div>
            <h2>On-chain participants & rewards</h2>
            <p className="n-description">
              {bounty.entries} entries · {bounty.evaluated} host-recorded
              evaluations. Rewards become claimable after settlement.
            </p>
          </div>
        </div>
        {entries.length === 0 ? (
          <div className="n-evaluation-pending">
            <h3>No entries yet.</h3>
            <p>
              Participant stakes and evaluation results will appear here as this
              bounty progresses.
            </p>
          </div>
        ) : (
          <div className="n-entries-scroll">
            <table className="n-data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Curator wallet</th>
                  <th>Stake</th>
                  <th>Evaluation</th>
                  <th>Positive gain</th>
                  <th>Reward share</th>
                  <th>Reward</th>
                  <th>Stake refund</th>
                  {host && closed && bounty.status === 1 && (
                    <th>Record evaluation</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {ranked.map((entry, i) => {
                  const share =
                    bounty.totalGain > 0n
                      ? Number((entry.gain * 10000n) / bounty.totalGain) / 100
                      : 0;
                  const reward =
                    bounty.totalGain > 0n
                      ? (bounty.pool * entry.gain) / bounty.totalGain
                      : 0n;
                  return (
                    <tr key={entry.address}>
                      <td>{i + 1}</td>
                      <td>
                        <a
                          href={bountyExplorer(`address/${entry.curator}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {entry.curator.slice(0, 6)}…{entry.curator.slice(-6)}
                        </a>
                      </td>
                      <td>{solAmount(entry.stake)} SOL</td>
                      <td>{entry.evaluated ? "Recorded" : "Pending"}</td>
                      <td>
                        {entry.evaluated
                          ? (Number(entry.gain) / 1000).toFixed(3)
                          : "—"}
                      </td>
                      <td>{entry.evaluated ? `${share.toFixed(2)}%` : "—"}</td>
                      <td>
                        {entry.claimed
                          ? "Claimed · "
                          : bounty.status === 2
                            ? "Claimable · "
                            : "Estimated · "}
                        {solAmount(reward)} SOL
                      </td>
                      <td>
                        {entry.refunded ? "Refunded" : "Locked until deadline"}
                      </td>
                      {host && closed && bounty.status === 1 && (
                        <td>
                          <div className="n-score-entry">
                            <input
                              type="number"
                              aria-label={`Positive gain for ${entry.curator}`}
                              placeholder="Gain (0 if none)"
                              min="0"
                              step="0.001"
                              value={gains[entry.address] ?? ""}
                              onChange={(event) =>
                                setGains((current) => ({
                                  ...current,
                                  [entry.address]: event.target.value,
                                }))
                              }
                            />
                            <button
                              className="n-button"
                              type="button"
                              disabled={isSending}
                              onClick={() =>
                                void action("record_evaluation", entry)
                              }
                            >
                              Record
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
