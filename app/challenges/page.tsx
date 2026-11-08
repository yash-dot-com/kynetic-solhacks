import { ChallengeBrowser } from "../components/challenges/challenge-browser";
export default function ChallengesPage() {
  return (
    <main className="n-main n-board-page">
      <div className="n-page-breadcrumb">Kynetic / Workspace</div>
      <h1>Bounties</h1>
      <p className="n-description">
        Targeted data. Measured improvement. Shared rewards.
      </p>
      <ChallengeBrowser />
    </main>
  );
}
