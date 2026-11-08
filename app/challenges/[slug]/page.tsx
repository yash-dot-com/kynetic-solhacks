import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { challenges, getChallenge } from "@/app/lib/challenges/data";
import { ChallengeDetail } from "@/app/components/challenges/challenge-detail";

export function generateStaticParams() {
  return challenges.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const challenge = getChallenge(slug);
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
