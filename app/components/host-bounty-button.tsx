"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Wallet, X } from "lucide-react";
import { useWallet } from "../lib/wallet/context";
import { WalletButton } from "./wallet-button";

export function HostBountyButton() {
  const [open, setOpen] = useState(false);
  const { wallet, status } = useWallet();
  const router = useRouter();
  return (
    <>
      <button
        type="button"
        className="n-button n-primary"
        onClick={() => {
          if (status === "connected" && wallet) router.push("/challenges/new");
          else setOpen(true);
        }}
      >
        Host a bounty <ArrowRight size={15} aria-hidden="true" />
      </button>
      {open && <HostWalletGate onClose={() => setOpen(false)} />}
    </>
  );
}
function HostWalletGate({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { wallet, status } = useWallet();
  const connected = status === "connected" && !!wallet;
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="n-dialog n-wallet-gate"
      onCancel={onClose}
      onClose={onClose}
      aria-labelledby="host-wallet-title"
    >
      <button
        type="button"
        className="n-icon-button n-dialog-close"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={18} />
      </button>
      <div className="n-dialog-icon">
        {connected ? <Check size={23} /> : <Wallet size={23} />}
      </div>
      <p className="n-eyebrow">Host a bounty · Step 1</p>
      <h2 id="host-wallet-title">
        {connected
          ? "You’re ready to set up a bounty."
          : "Start with your wallet."}
      </h2>
      <p className="n-description">
        {connected
          ? "Add the task, dataset requirements, evaluation rules, and reward pool next."
          : "Connect a Solana wallet to identify yourself as the bounty host."}
      </p>
      {connected ? (
        <>
          <p className="n-connected-address">
            <Check size={15} />
            {wallet.account.address.slice(0, 6)}…
            {wallet.account.address.slice(-6)}
          </p>
          <Link
            href="/challenges/new"
            className="n-button n-primary n-host-continue"
            onClick={onClose}
          >
            Continue to bounty details <ArrowRight size={15} />
          </Link>
        </>
      ) : (
        <WalletButton />
      )}
      <p className="n-wallet-status">
        Connecting your wallet does not move any funds.
      </p>
      <div className="n-dialog-footer">
        <span>1. Connect wallet</span>
        <span>2. Bounty details</span>
        <span>3. Review</span>
      </div>
    </dialog>
  );
}
