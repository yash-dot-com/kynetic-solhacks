import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Database,
  FlaskConical,
  LockKeyhole,
  Wallet,
} from "lucide-react";
import { WorkspaceHeader } from "./components/workspace-header";
import { HostBountyButton } from "./components/host-bounty-button";
import { ChallengeBrowser } from "./components/challenges/challenge-browser";

const steps = [
  {
    icon: LockKeyhole,
    title: "Define & fund",
    text: "Hosts name a model weakness, choose a benchmark, and commit a SOL bounty.",
  },
  {
    icon: Database,
    title: "Curate & contribute",
    text: "Curators stake to enter and submit data made for that specific problem.",
  },
  {
    icon: FlaskConical,
    title: "Evaluate & reward",
    text: "The host measures model improvement. Useful contributions share the bounty.",
  },
];
export default function Home() {
  return (
    <div className="n-workspace">
      <WorkspaceHeader />
      <main className="n-main">
        <section className="n-hero" aria-labelledby="hero-title">
          <p className="n-eyebrow">
            <span className="n-small-mark">K</span> A workspace for better AI
          </p>
          <h1 id="hero-title">
            Better models.
            <br />
            It starts with the right data.
          </h1>
          <p className="n-hero-description">
            Put a bounty on a model weakness. Find people who can curate the
            data to fix it. Reward the improvement.
          </p>
          <div className="n-actions">
            <HostBountyButton />
            <Link href="#bounties" className="n-button">
              Explore bounties <ArrowRight size={15} />
            </Link>
          </div>
          <p className="n-hero-note">
            For language models, vision models, and robotics. Settled in SOL.
          </p>
        </section>
        <ChallengeBrowser />
        <section
          className="n-how-section"
          id="how-it-works"
          aria-labelledby="how-title"
        >
          <div className="n-section-heading">
            <div>
              <p className="n-eyebrow">A simple loop</p>
              <h2 id="how-title">Pay for progress you can measure.</h2>
              <p className="n-description">
                Data earns its value by making the model better.
              </p>
            </div>
          </div>
          <div className="n-steps">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <article key={title}>
                <span className="n-step-icon">
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                <p className="n-eyebrow">0{index + 1}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="n-audiences" aria-label="Who Kynetic is for">
          <article>
            <h2>Have a model that needs better data?</h2>
            <p>
              Define the gap and the evaluation rules. Bring in focused datasets
              from curators who understand the problem.
            </p>
            <HostBountyButton />
          </article>
          <article>
            <h2>Know how to build a useful dataset?</h2>
            <p>
              Choose a challenge, contribute your expertise, and earn a share of
              the reward when your data improves the model.
            </p>
            <Link className="n-text-link" href="/challenges">
              Find your next challenge <ArrowUpRight size={16} />
            </Link>
          </article>
        </section>
        <section
          className="n-solana-section"
          id="solana"
          aria-labelledby="solana-title"
        >
          <div>
            <p className="n-eyebrow">The settlement layer</p>
            <h2 id="solana-title">
              Solana handles the money.
              <br />
              The benchmark measures the value.
            </h2>
            <p className="n-description">
              Training and evaluation happen off-chain. Funding, participation
              stakes, and SOL payouts belong on-chain.
            </p>
          </div>
          <dl>
            <div>
              <dt>
                <LockKeyhole size={17} /> Bounty escrow
              </dt>
              <dd>Hosts commit funds to the challenge.</dd>
            </div>
            <div>
              <dt>
                <Wallet size={17} /> Participation stakes
              </dt>
              <dd>
                Curators stake SOL to enter. Less spam, serious submissions.
              </dd>
            </div>
            <div>
              <dt>
                <ArrowUpRight size={17} /> Reward payouts
              </dt>
              <dd>
                Measured gains determine shares. Low fees make smaller payouts
                practical.
              </dd>
            </div>
          </dl>
        </section>
      </main>
      <footer className="n-footer">
        <Link href="/" className="n-wordmark">
          Kynetic<span>.</span>
        </Link>
        <span>Data with a measurable purpose.</span>
        <Link href="/challenges">
          Explore bounties <ArrowUpRight size={14} />
        </Link>
      </footer>
    </div>
  );
}
