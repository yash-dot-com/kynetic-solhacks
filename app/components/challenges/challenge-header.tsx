import Image from "next/image";
import Link from "next/link";
import { Bot, ArrowUpRight, BookOpen, Layers3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WalletButton } from "../wallet-button";

export function ChallengeHeader() {
  return (
    <header className="market-header">
      <div className="market-container market-header-inner">
        <Link href="/" className="market-brand" aria-label="Kynetic home">
          <span className="brand-mark">
            <Bot aria-hidden="true" />
          </span>
          <span className="text-heading font-semibold tracking-tight">
            Kynetic
          </span>
        </Link>
        <nav className="market-nav" aria-label="Challenge navigation">
          <Link className="market-nav-active" href="/challenges">
            <Layers3 />
            Explore
          </Link>
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/challenges/shiny-object-detection?tab=leaderboard">
            Leaderboard
          </Link>
          <Link href="/challenges/shiny-object-detection?tab=rules">
            <BookOpen />
            Guide
          </Link>
        </nav>
        <div className="market-header-actions">
          <Badge variant="outline" className="network-pill market-network">
            <Image src="/solana-mark.svg" alt="" width={20} height={20} />
            Solana
          </Badge>
          <WalletButton />
          <Link className="market-home-link" href="/" aria-label="Back to home">
            <ArrowUpRight />
          </Link>
        </div>
      </div>
    </header>
  );
}
