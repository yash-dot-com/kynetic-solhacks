import Link from "next/link";
import { WalletButton } from "./wallet-button";

export function WorkspaceHeader() {
  return (
    <header className="n-header">
      <Link href="/" className="n-wordmark" aria-label="Kynetic home">
        Kynetic<span>.</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/challenges">Bounties</Link>
        <Link href="/#how-it-works">How it works</Link>
        <Link href="/#solana">Why Solana</Link>
      </nav>
      <WalletButton />
    </header>
  );
}
