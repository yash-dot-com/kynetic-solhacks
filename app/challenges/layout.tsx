import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChallengeHeader } from "../components/challenges/challenge-header";

export const metadata: Metadata = {
  title: "Bounties · Kynetic",
  description:
    "Find AI model challenges. Contribute targeted datasets and earn SOL for measurable improvements.",
};
export default function ChallengesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="n-workspace n-market-workspace">
      <ChallengeHeader />
      {children}
      <footer className="n-footer">
        <Link href="/" className="n-wordmark">
          Kynetic<span>.</span>
        </Link>
        <span>Data with a measurable purpose.</span>
        <Link href="/#how-it-works">How it works</Link>
      </footer>
    </div>
  );
}
