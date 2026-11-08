"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCluster } from "../cluster-context";
import { useFundBounty } from "@/app/lib/hooks/use-fund-bounty";
import { bountyExplorer } from "@/app/lib/bounty/client";
import { useSWRConfig } from "swr";
import { ArrowLeft, ArrowRight, Check, FileText } from "lucide-react";
import { useWallet } from "@/app/lib/wallet/context";
import { bountyCategories } from "@/app/lib/challenges/bounties";
import { WalletButton } from "../wallet-button";

const emptyDraft = {
  title: "",
  category: "LLMs",
  description: "",
  model: "",
  metric: "",
  direction: "higher",
  baseline: "",
  target: "",
  pool: "",
  stake: "0.10",
  deadline: "",
  format: "",
  requirements: "",
  evaluation: "",
  host: "",
};
export function HostBountyForm() {
  const { wallet, status, isReady } = useWallet();
  const { cluster, setCluster } = useCluster();
  const { fund, busy, stage } = useFundBounty();
  const { mutate } = useSWRConfig();
  const [published, setPublished] = useState<{
    address: string;
    signature?: string;
  } | null>(null);
  async function publish() {
    setError("");
    try {
      const receipt = await fund(draft);
      setPublished(receipt);
      void mutate("kynetic:devnet:bounties");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Could not publish the bounty. Your draft is preserved."
      );
    }
  }
  const [draft, setDraft] = useState(emptyDraft);
  const [review, setReview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const change = (key: keyof typeof emptyDraft, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setError("");
    setSaved(false);
  };
  const connected = status === "connected" && !!wallet;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!connected) {
      setError("Connect your wallet before continuing.");
      return;
    }
    const baseline = Number(draft.baseline),
      target = Number(draft.target),
      pool = Number(draft.pool),
      stake = Number(draft.stake);
    if (
      ![baseline, target, pool, stake].every(Number.isFinite) ||
      pool <= 0 ||
      stake < 0
    ) {
      setError(
        "Enter valid scores, a positive reward pool, and a non-negative stake."
      );
      return;
    }
    if (
      (draft.direction === "higher" && target <= baseline) ||
      (draft.direction === "lower" && target >= baseline)
    ) {
      setError(
        "The target must improve on the baseline in your chosen metric direction."
      );
      return;
    }
    if (Date.parse(`${draft.deadline}T23:59:59`) < Date.now()) {
      setError("Choose a future submission deadline.");
      return;
    }
    setError("");
    setReview(true);
  }
  function save() {
    if (!wallet || status !== "connected") {
      setError("Reconnect your wallet to save this draft.");
      return;
    }
    try {
      localStorage.setItem(
        `kynetic:bounty-draft:${wallet.account.address}`,
        JSON.stringify({
          ...draft,
          owner: wallet.account.address,
          savedAt: new Date().toISOString(),
          status: "Draft",
        })
      );
      setError("");
      setSaved(true);
    } catch {
      setError(
        "Your browser could not save the draft. Keep this page open and try again."
      );
    }
  }
  function load() {
    if (!wallet) return;
    try {
      const value = localStorage.getItem(
        `kynetic:bounty-draft:${wallet.account.address}`
      );
      if (!value) {
        setError("No saved draft for this wallet on this device.");
        return;
      }
      const parsed = JSON.parse(value);
      const next = { ...emptyDraft };
      for (const key of Object.keys(next) as (keyof typeof next)[])
        if (typeof parsed[key] === "string") next[key] = parsed[key];
      setDraft(next);
      setError("");
    } catch {
      setError("The saved draft could not be loaded.");
    }
  }
  return (
    <main className="n-main n-host-page">
      <Link href="/challenges" className="n-back-link">
        <ArrowLeft size={14} />
        Bounties
      </Link>
      <p className="n-eyebrow">
        Host workspace / {review ? "Review" : "Bounty details"}
      </p>
      <h1>
        {published
          ? "Your bounty is live."
          : saved
            ? "Your draft is saved."
            : review
              ? "Review your bounty."
              : "Put a bounty on better data."}
      </h1>
      <p className="n-description">
        Define what the model needs, how you’ll measure improvement, and what
        contributors can earn.
      </p>
      {!isReady ? (
        <p className="n-description">Loading your wallet…</p>
      ) : !connected ? (
        <div className="n-host-connect">
          <h2>Connect your wallet to continue.</h2>
          <p>
            Your wallet identifies you as the host. Your draft stays in this
            browser.
          </p>
          <WalletButton />
        </div>
      ) : published ? (
        <section className="n-saved-draft">
          <Check size={24} />
          <h2>{draft.title}</h2>
          <p>{draft.pool} SOL locked in bounty escrow on Solana Devnet.</p>
          <p className="n-description">
            The bounty is published on-chain and discoverable from the board.
          </p>
          <div className="n-actions">
            <Link
              className="n-button n-primary"
              href={`/challenges/${published.address}`}
            >
              Open bounty <ArrowRight size={15} />
            </Link>
            <a
              className="n-button"
              href={bountyExplorer(`address/${published.address}`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              View escrow
            </a>
            {published.signature && (
              <a
                className="n-text-link"
                href={bountyExplorer(`tx/${published.signature}`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Funding transaction
              </a>
            )}
          </div>
        </section>
      ) : saved ? (
        <section className="n-saved-draft">
          <Check size={24} />
          <h2>{draft.title}</h2>
          <p>
            Saved on this device for {wallet.account.address.slice(0, 6)}…
            {wallet.account.address.slice(-6)}.
          </p>
          <p className="n-description">
            This is an unpublished draft. No SOL has moved.
          </p>
          <div className="n-actions">
            <button
              className="n-button"
              type="button"
              onClick={() => {
                setSaved(false);
                setReview(false);
              }}
            >
              Edit draft
            </button>
            <Link href="/challenges" className="n-button n-primary">
              Back to bounties <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      ) : !review ? (
        <form className="n-host-form" onSubmit={submit}>
          <div className="n-host-form-heading">
            <span className="n-status-tag">
              <Check size={12} /> Wallet connected
            </span>
            <button type="button" className="n-text-link" onClick={load}>
              Load saved draft
            </button>
          </div>
          <fieldset>
            <legend>
              <FileText size={17} /> The challenge
            </legend>
            <label>
              Bounty title
              <input
                required
                maxLength={100}
                value={draft.title}
                onChange={(event) => change("title", event.target.value)}
                placeholder="e.g. Detect reflective tools in low light"
              />
            </label>
            <div className="n-form-columns">
              <label>
                Model category
                <select
                  value={draft.category}
                  onChange={(event) => change("category", event.target.value)}
                >
                  {bountyCategories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label>
                Host / organization
                <input
                  required
                  maxLength={80}
                  value={draft.host}
                  onChange={(event) => change("host", event.target.value)}
                  placeholder="Your name or team"
                />
              </label>
            </div>
            <label>
              What needs to improve?
              <textarea
                required
                maxLength={2000}
                rows={3}
                value={draft.description}
                onChange={(event) => change("description", event.target.value)}
                placeholder="Describe the specific cases where your model fails."
              />
            </label>
            <label>
              Baseline model
              <input
                required
                value={draft.model}
                onChange={(event) => change("model", event.target.value)}
                placeholder="Model name, version, and checkpoint"
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Dataset requirements</legend>
            <label>
              Submission format
              <input
                required
                value={draft.format}
                onChange={(event) => change("format", event.target.value)}
                placeholder="e.g. COCO annotations + RGB images, or JSONL"
              />
            </label>
            <label>
              Tasks & subtasks
              <textarea
                required
                rows={4}
                value={draft.requirements}
                onChange={(event) => change("requirements", event.target.value)}
                placeholder="What should curators collect, label, and deliver? Include quality and licensing requirements."
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Evaluation rules</legend>
            <div className="n-form-columns">
              <label>
                Primary metric
                <input
                  required
                  value={draft.metric}
                  onChange={(event) => change("metric", event.target.value)}
                  placeholder="e.g. mAP@0.5, F1, accuracy"
                />
              </label>
              <label>
                Metric direction
                <select
                  value={draft.direction}
                  onChange={(event) => change("direction", event.target.value)}
                >
                  <option value="higher">Higher is better</option>
                  <option value="lower">Lower is better</option>
                </select>
              </label>
            </div>
            <div className="n-form-columns">
              <label>
                Baseline score
                <input
                  required
                  type="number"
                  step="any"
                  value={draft.baseline}
                  onChange={(event) => change("baseline", event.target.value)}
                  placeholder="61"
                />
              </label>
              <label>
                Target score
                <input
                  required
                  type="number"
                  step="any"
                  value={draft.target}
                  onChange={(event) => change("target", event.target.value)}
                  placeholder="80"
                />
              </label>
            </div>
            <label>
              Training & benchmark protocol
              <textarea
                required
                rows={3}
                value={draft.evaluation}
                onChange={(event) => change("evaluation", event.target.value)}
                placeholder="Specify the training settings, held-out benchmark, and how contribution gains determine reward shares."
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Rewards & timeline</legend>
            <div className="n-form-columns">
              <label>
                Reward pool · SOL
                <input
                  required
                  min="0.001"
                  step="any"
                  type="number"
                  value={draft.pool}
                  onChange={(event) => change("pool", event.target.value)}
                  placeholder="12"
                />
              </label>
              <label>
                Refundable entry stake · SOL
                <input
                  required
                  min="0"
                  step="any"
                  type="number"
                  value={draft.stake}
                  onChange={(event) => change("stake", event.target.value)}
                />
              </label>
            </div>
            <label>
              Submission deadline
              <input
                required
                type="date"
                value={draft.deadline}
                onChange={(event) => change("deadline", event.target.value)}
              />
            </label>
          </fieldset>
          {error && (
            <p className="n-form-error" role="alert">
              {error}
            </p>
          )}
          <div className="n-form-actions">
            <span className="n-description">
              Review before saving. No funds move in this step.
            </span>
            <button className="n-button n-primary" type="submit">
              Review bounty <ArrowRight size={15} />
            </button>
          </div>
        </form>
      ) : (
        <section className="n-host-review">
          <h2>{draft.title}</h2>
          <p className="n-description">{draft.description}</p>
          <dl className="n-detail-properties">
            {[
              ["Host", draft.host],
              ["Category", draft.category],
              ["Model", draft.model],
              ["Metric", `${draft.metric} · ${draft.direction} is better`],
              ["Baseline → target", `${draft.baseline} → ${draft.target}`],
              ["Reward pool", `${draft.pool} SOL`],
              ["Entry stake", `${draft.stake} SOL`],
              ["Deadline", draft.deadline],
              ["Format", draft.format],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <h3>Tasks & subtasks</h3>
          <p className="n-preserve-lines">{draft.requirements}</p>
          <h3>Evaluation protocol</h3>
          <p className="n-preserve-lines">{draft.evaluation}</p>
          <p className="n-description n-draft-note">
            Publish the bounty details on Devnet, then approve the SOL transfer
            into escrow. Your wallet may request several confirmations; reward
            funds move only in the final funding transaction.
          </p>
          {error && (
            <p role="alert" className="n-form-error">
              {error}
            </p>
          )}
          {stage && (
            <p role="status" className="n-funding-stage">
              {stage}
            </p>
          )}
          <div className="n-form-actions">
            <button
              type="button"
              className="n-button"
              disabled={busy}
              onClick={() => setReview(false)}
            >
              Back to edit
            </button>
            <button
              type="button"
              className="n-button"
              disabled={busy}
              onClick={save}
            >
              Save bounty draft <Check size={15} />
            </button>
            {cluster !== "devnet" ? (
              <button
                type="button"
                className="n-button n-primary"
                onClick={() => setCluster("devnet")}
                disabled={busy}
              >
                Switch to Devnet
              </button>
            ) : (
              <button
                type="button"
                className="n-button n-primary"
                onClick={() => void publish()}
                disabled={busy}
              >
                {busy ? "Publishing…" : "Fund & publish on Devnet"}
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </section>
      )}
      {!review && error && !connected && (
        <p role="alert" className="n-form-error">
          {error}
        </p>
      )}
    </main>
  );
}
