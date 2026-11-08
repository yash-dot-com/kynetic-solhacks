import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ChallengeHeader } from "../components/challenges/challenge-header";

export const metadata: Metadata = {
  title: "Challenges · Kynetic",
  description:
    "Contribute targeted robotics datasets. Earn SOL for measured improvement.",
};

export default function ChallengesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="page-surface market-surface">
      <ChallengeHeader />
      {children}
      <footer className="market-container market-footer">
        <span>Kynetic · Data that moves robots forward.</span>
        <span>Preview · Sample challenges and results</span>
      </footer>
    </div>
  );
}
