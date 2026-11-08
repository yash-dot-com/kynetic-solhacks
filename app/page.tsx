import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Bot,
  Check,
  CircleDollarSign,
  Database,
  FlaskConical,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Layers3,
  ScanEye,
  Target,
  Users,
  WalletCards,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LandingSticker } from "./components/landing/landing-sticker";

const steps = [
  {
    number: "01",
    title: "Fund a challenge",
    description:
      "Set the model or robotics task, benchmark, and bounty. The host arranges the cloud machines and evaluation setup.",
    icon: Target,
  },
  {
    number: "02",
    title: "Stake and submit",
    description:
      "Curators stake SOL to enter and submit data targeted to the model weakness.",
    icon: Database,
  },
  {
    number: "03",
    title: "Fine-tune and evaluate",
    description:
      "Models run through cloud-hosted evaluation harnesses and tests. Robotics policies can be retrained, tested, or simulated on cloud machines.",
    icon: FlaskConical,
  },
  {
    number: "04",
    title: "Attribute and pay",
    description:
      "Positive impact earns a share of the bounty. Every participant gets their stake back.",
    icon: CircleDollarSign,
  },
];

const outcomes = [
  { name: "Reflective objects", detail: "More reliable detection", lift: "+18%", width: "82%" },
  { name: "Clause extraction", detail: "More accurate field capture", lift: "+11%", width: "64%" },
  { name: "Medical coding", detail: "Fewer coding errors", lift: "+7%", width: "47%" },
];

const comparisonRows = [
  ["You pay for", "Rows delivered", "Measured improvement"],
  ["The data is", "Generic or broad", "Made for one named weakness"],
  ["Proof", "Impact may be unclear", "Scored on a challenge benchmark"],
  ["Rules", "Can be hard to compare", "Published before submissions"],
  ["Bounty", "Paid for delivery", "Escrowed and paid by impact"],
  ["Contributor stake", "Not part of the model", "Returned to participants at settlement"],
];

const useCases = [
  { title: "Robotics and physical AI", description: "Retrain and test perception, navigation, and manipulation in cloud simulations.", icon: Bot },
  { title: "Task-specific models", description: "Evaluate classification, extraction, and reasoning with cloud-hosted tests.", icon: Target },
  { title: "Domain-specific models", description: "Measure healthcare, finance, and legal capabilities against host-defined benchmarks.", icon: Layers3 },
  { title: "LLMs and vision models", description: "Evaluate targeted capability gains with cloud-hosted harnesses.", icon: ScanEye },
];

export default function Home() {
  return (
    <main id="top" className="page-surface landing-page">
      <header className="site-header landing-header">
        <div className="site-header-inner landing-header-inner">
          <Link href="#top" className="landing-wordmark" aria-label="Kynetic home">
            Kynetic<span aria-hidden="true">.</span>
          </Link>
          <nav className="landing-nav" aria-label="Main navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#use-cases">Use cases</a>
            <a href="#impact">Rewards</a>
            <a href="#solana">Solana</a>
          </nav>
          <div className="landing-header-action">
            <Button nativeButton={false} render={<a href="#how-it-works" />}>Discover Kynetic <ArrowRight data-icon="inline-end" /></Button>
          </div>
        </div>
      </header>

      <section className="page-container landing-hero" aria-labelledby="hero-title">
        <div className="landing-hero-copy">
          <Badge variant="outline" className="network-pill">
            <span className="landing-live-dot" aria-hidden="true" />
            AI models and robotics, measured by outcomes
          </Badge>
          <h1 id="hero-title" className="hero-title">
            Improve AI models and robots.
            <br className="hidden sm:block" /> Reward the data that helps.
          </h1>
          <p className="hero-description">
            Teams post AI model and robotics challenges. Contributors submit targeted datasets.
            <br className="hidden md:block" /> Host-provided cloud tests measure improvement. Contributors earn for results.
          </p>
          <div className="hero-actions landing-hero-actions">
            <Button
              nativeButton={false}
              render={<Link href="#how-it-works" />}
            >
              See how it works <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href="#how-it-works" />}
            >
              How it works
            </Button>
          </div>
        </div>
      </section>

      <section className="page-container landing-feature-grid" aria-label="How Kynetic works">
        <article className="landing-feature-card">
          <span className="landing-feature-icon"><Database aria-hidden="true" /></span>
          <h2>Fund Challenges</h2>
          <p>Create a challenge for an AI model or robotics weakness and lock the bounty in escrow.</p>
        </article>
        <article className="landing-feature-card">
          <span className="landing-feature-icon"><Target aria-hidden="true" /></span>
          <h2>Submit Targeted Data</h2>
          <p>Upload data made for that exact problem. Stake SOL to participate.</p>
        </article>
        <article className="landing-feature-card">
          <span className="landing-feature-icon"><Sparkles aria-hidden="true" /></span>
          <h2>Get Rewarded for Results</h2>
          <p>Positive contributions share the bounty, and all entry stakes are returned.</p>
        </article>
      </section>

      <section className="page-container landing-thesis" aria-label="Kynetic's premise">
        <div>
          <span className="landing-eyebrow">THE PROBLEM</span>
          <h2>Marketplaces sell volume.<br />Kynetic pays for results.</h2>
        </div>
        <p>
          Buying more data does not show whether a model got better. Kynetic
          connects each contribution to a challenge metric so teams can see
          whether it helped.
        </p>
      </section>

      <section className="page-container landing-compare" aria-labelledby="compare-title">
        <div className="landing-section-heading">
          <p className="home-kicker">A DIFFERENT INCENTIVE</p>
          <h2 id="compare-title">Targeted data. Measured gain.</h2>
        </div>
        <div className="landing-compare-grid">
          <article className="landing-compare-card">
            <div className="landing-compare-title"><span>Typical marketplace</span><Badge variant="outline">Volume-led</Badge></div>
            <div className="landing-compare-visual landing-compare-volume" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <p>Lots of data can arrive with little proof that it helped the model.</p>
          </article>
          <article className="landing-compare-card landing-compare-card-focus">
            <div className="landing-compare-title"><span>Kynetic challenge</span><Badge variant="outline">Outcome-linked</Badge></div>
            <div className="landing-compare-visual landing-compare-outcome" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <p>A focused dataset is evaluated against the challenge benchmark; positive impact earns a share of the bounty.</p>
          </article>
        </div>
        <div className="landing-comparison-table" role="table" aria-label="Typical marketplace and Kynetic comparison">
          <div className="landing-comparison-row landing-comparison-head" role="row">
            <span role="columnheader">Compared</span><span role="columnheader">Typical marketplace</span><span role="columnheader">Kynetic</span>
          </div>
          {comparisonRows.map(([label, typical, kynetic]) => (
            <div className="landing-comparison-row" role="row" key={label}>
              <span role="rowheader">{label}</span><span role="cell">{typical}</span><span role="cell"><Check aria-hidden="true" />{kynetic}</span>
            </div>
          ))}
        </div>
        <p className="landing-compare-note"><FlaskConical aria-hidden="true" /> The challenge host provides the cloud infrastructure, evaluation harness, tests, and published benchmark.</p>
      </section>

      <section id="how-it-works" className="page-container landing-section" aria-labelledby="how-title">
        <div className="landing-section-heading">
          <p className="home-kicker">HOW KYNETIC WORKS</p>
          <h2 id="how-title">A clear path from failure case to payout</h2>
          <p>One challenge, one shared benchmark, and rewards tied to contribution.</p>
        </div>
        <div className="landing-steps">
          {steps.map(({ number, title, description, icon: Icon }) => (
            <article className="landing-step" key={number}>
              <div className="landing-step-top">
                <span className="landing-step-number">{number}</span>
                <span className="landing-step-icon"><Icon aria-hidden="true" /></span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              {number !== "04" && <ArrowDownRight className="landing-step-connector" aria-hidden="true" />}
            </article>
          ))}
        </div>
      </section>

      <section id="impact" className="page-container landing-section landing-impact" aria-labelledby="impact-title">
        <div className="landing-impact-copy">
          <p className="home-kicker">REWARD THE CONTRIBUTION</p>
          <h2 id="impact-title">A dataset earns when it moves the needle.</h2>
          <p>
            Each challenge defines its benchmark and scoring method up front. The host
            evaluates AI models through cloud-hosted harnesses and tests. Robotics
            policies can be retrained and tested or simulated on host-arranged cloud
            machines. Datasets with positive impact share the bounty.
          </p>
          <div className="landing-impact-notes">
            <p><CircleDollarSign aria-hidden="true" /> The bounty rewards measured improvement.</p>
            <p><RotateCcw aria-hidden="true" /> Entry stake is returned to every participant.</p>
          </div>
          <Link href="#how-it-works" className="landing-inline-link">Understand the challenge lifecycle <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="landing-scorecard">
          <div className="landing-scorecard-header">
            <div><span className="landing-eyebrow">EXAMPLE EVALUATION</span><h3>Contribution impact</h3></div>
            <Badge variant="outline">Illustrative</Badge>
          </div>
          <div className="landing-score-summary">
            <div><span>Baseline model</span><strong>61%</strong></div>
            <ArrowRight aria-hidden="true" />
            <div><span>With curated data</span><strong className="landing-positive">79%</strong></div>
          </div>
          <div className="landing-outcome-list">
            {outcomes.map((outcome) => (
              <div className="landing-outcome" key={outcome.name}>
                <div className="landing-outcome-line">
                  <span><b>{outcome.name}</b><small>{outcome.detail}</small></span>
                  <strong>{outcome.lift}</strong>
                </div>
                <div className="landing-meter"><i style={{ width: outcome.width }} /></div>
              </div>
            ))}
          </div>
          <div className="landing-scorecard-footer">
            <span><ShieldCheck aria-hidden="true" /> Held-out benchmark</span>
            <span>Reward share follows published rules</span>
          </div>
        </div>
      </section>

      <section className="page-container landing-section" aria-labelledby="audience-title">
        <div className="landing-section-heading">
          <p className="home-kicker">VALUE FOR BOTH SIDES</p>
          <h2 id="audience-title">Built for both sides.</h2>
        </div>
        <div className="landing-audience-grid">
          <article className="landing-audience-card">
            <span className="landing-audience-icon"><Target aria-hidden="true" /></span>
            <div><h3>AI teams</h3><p>Fund a weakness in your model. Pay for results.</p></div>
            <ul>
              <li><Check aria-hidden="true" /> Get relevant edge-case data, not just more volume.</li>
              <li><Check aria-hidden="true" /> Set evaluation rules before contributions arrive.</li>
              <li><Check aria-hidden="true" /> Pay for impact and see what improved performance.</li>
            </ul>
          </article>
          <article className="landing-audience-card">
            <span className="landing-audience-icon"><Users aria-hidden="true" /></span>
            <div><h3>Data curators</h3><p>Share the bounty when your data helps.</p></div>
            <ul>
              <li><Check aria-hidden="true" /> Choose challenges with clear needs and benchmarks.</li>
              <li><Check aria-hidden="true" /> Earn a proportional share when your data helps.</li>
              <li><Check aria-hidden="true" /> Get your entry stake back when the challenge settles.</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="solana" className="page-container landing-section" aria-labelledby="solana-title">
        <div className="landing-chain-panel">
          <div className="landing-chain-copy">
            <p className="home-kicker">AI MEASURES. SOLANA SETTLES.</p>
            <h2 id="solana-title">Use the chain for commitments and payouts.</h2>
            <p>
              Training and evaluation happen off-chain on cloud infrastructure arranged
              by the challenge host. AI models run through hosted harnesses and tests;
              robotics policies can be retrained, tested, or simulated on cloud machines.
              Solana records the challenge funds and executes settlement under the published rules.
            </p>
            <div className="landing-chain-footnote"><Sparkles aria-hidden="true" /> Fast, low-cost transactions make small contributor payouts practical.</div>
          </div>
          <div className="landing-chain-flow">
            <div className="landing-chain-node">
              <span className="landing-chain-icon"><FlaskConical aria-hidden="true" /></span>
              <div><b>Cloud evaluation</b><span>Host-provided training, tests and simulation</span></div>
              <Badge variant="outline">AI layer</Badge>
            </div>
            <div className="landing-chain-rail"><i /><span>published result + scoring rules</span><i /></div>
            <div className="landing-chain-node landing-chain-node-onchain">
              <span className="landing-chain-icon"><WalletCards aria-hidden="true" /></span>
              <div><b>On-chain settlement</b><span>Escrow, refund stakes, distribute rewards</span></div>
              <Badge variant="outline">Solana</Badge>
            </div>
          </div>
        </div>
        <p className="landing-integrity-note"><ShieldCheck aria-hidden="true" /> Solana makes the agreed settlement inspectable; it does not independently verify model quality or benchmark results.</p>
      </section>

      <section id="use-cases" className="page-container landing-usecases" aria-labelledby="usecases-title">
        <div className="landing-section-heading">
          <p className="home-kicker">USE CASES</p>
          <h2 id="usecases-title">One mechanism. Any AI model.</h2>
          <p>Each challenge defines its own model, data needs, metric, and rewards.</p>
        </div>
        <div className="landing-usecase-grid">
          {useCases.map(({ title, description, icon: Icon }, index) => (
            <article className="landing-usecase-card" key={title}>
              {index === 0 && <Badge variant="outline">First example</Badge>}
              <span className="landing-usecase-icon"><Icon aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-container landing-final" aria-labelledby="final-title">
        <div className="landing-final-sticker"><LandingSticker name="gift" label="Isometric reward gift sticker" /></div>
        <div>
          <p className="home-kicker">THE NEXT BETTER DATASET STARTS HERE</p>
          <h2 id="final-title">Find an AI challenge worth solving.</h2>
          <p>Help improve AI models and robotics with targeted data and measurable results. Challenge participation is coming soon.</p>
        </div>
        <Button nativeButton={false} render={<Link href="#how-it-works" />}>
          See how it works <ArrowRight data-icon="inline-end" />
        </Button>
      </section>

      <footer className="page-container landing-footer">
        <Link href="#top" className="landing-wordmark">Kynetic<span aria-hidden="true">.</span></Link>
        <div><Link href="#use-cases">Use cases</Link><a href="#how-it-works">How it works</a><a href="#solana">Solana</a></div>
        <p>Landing page preview. Challenge participation is coming soon.</p>
      </footer>
    </main>
  );
}
