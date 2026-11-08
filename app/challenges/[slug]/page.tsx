import type { Metadata } from "next";
import { address, isAddress } from "@solana/kit";
import { fetchBounty } from "@/app/lib/bounty/client";
import { LiveBountyDetail } from "@/app/components/challenges/live-bounty-detail";
import { notFound } from "next/navigation";
import { challenges, getChallenge } from "@/app/lib/challenges/data";
import { bounties } from "@/app/lib/challenges/bounties";
import { BountyDetail } from "@/app/components/challenges/bounty-detail";
import { ChallengeDetail } from "@/app/components/challenges/challenge-detail";

export function generateStaticParams() {
  return [
    ...challenges.map(({ slug }) => ({ slug })),
    ...bounties.map(({ id }) => ({ slug: id.toLowerCase() })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const challenge =
    getChallenge(slug) ??
    bounties.find((bounty) => bounty.id.toLowerCase() === slug);
  return {
    title: challenge
      ? `${challenge.title} · Kynetic`
      : "Challenge not found · Kynetic",
  };
}

export default async function ChallengePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const bounty = bounties.find((entry) => entry.id.toLowerCase() === slug);
  if (bounty) return <BountyDetail bounty={bounty} />;
  if (isAddress(slug)) {
    const live = await fetchBounty(address(slug));
    if (!live?.spec || live.status === 0) notFound();
    return <LiveBountyDetail account={slug} />;
  }
  const challenge = getChallenge(slug);
  if (!challenge) notFound();
  return (
    <ChallengeDetail
      key={`${slug}:${query.tab ?? "overview"}`}
      challenge={challenge}
      initialTab={query.tab}
    />
  );
}
