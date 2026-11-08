"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronRight,
  Copy,
  Database,
  FileArchive,
  Info,
  Layers3,
  ShieldCheck,
  Tag,
  Target,
  TrendingUp,
  Users,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabs, type Challenge } from "@/app/lib/challenges/data";
import { ContributionResults } from "./contribution-results";
import { SubmissionDialog } from "./submission-dialog";

export function ChallengeDetail({
  challenge,
  initialTab,
}: {
  challenge: Challenge;
  initialTab?: string;
}) {
  const selectedTab =
    tabs.find((tab) => tab.toLowerCase() === initialTab?.toLowerCase()) ??
    "Overview";
  const [tab, setTab] = useState<string>(selectedTab);
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const [preparedName, setPreparedName] = useState("");
  const [copied, setCopied] = useState(false);
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);

  const manifest = JSON.stringify(
    {
      dataset: "your-dataset-name",
      challenge: challenge.id,
      format: "COCO",
      files: ["images/", "annotations.json"],
      license: "your-dataset-license",
    },
    null,
    2
  );

  function changeTab(value: unknown) {
    const next = String(value);
    setTab(next);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", next.toLowerCase());
    window.history.replaceState(null, "", url);
  }

  return (
    <main className="market-container challenge-detail">
      <nav aria-label="Breadcrumb" className="challenge-breadcrumb">
        <Link href="/challenges">Challenges</Link>
        <ChevronRight />
        <span>{challenge.task}</span>
        <ChevronRight />
        <span>{challenge.id}</span>
      </nav>
      <div
        className={`detail-hero ${challenge.slug === "shiny-object-detection" ? "has-hero-image" : ""}`}
      >
        <div>
          <p className="challenge-host">
            Hosted by {challenge.host}{" "}
            <span>
              ·{" "}
              {challenge.status === "Active"
                ? "Accepting datasets"
                : "Evaluation in progress"}
            </span>
          </p>
          <h1 className="text-display font-semibold tracking-tight">
            {challenge.id}: {challenge.title}
          </h1>
          <p className="detail-subtitle">{challenge.description}</p>
        </div>
        {challenge.slug === "shiny-object-detection" && (
          <Image
            src="/reflective-robotics.png"
            width={720}
            height={405}
            alt="Robot perception sensor detecting a reflective metal mug in a laboratory"
            className="detail-hero-image"
            priority
          />
        )}
      </div>
      <Tabs value={tab} onValueChange={changeTab} className="detail-tabs">
        <div className="detail-tabs-scroll">
          <TabsList variant="line" aria-label="Challenge sections">
            {tabs.map((item) => (
              <TabsTrigger key={item} value={item}>
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="detail-layout">
          <div className="detail-main">
            <TabsContent value="Overview">
              <section className="detail-section">
                <h2>Overview</h2>
                <p className="market-notice">
                  <Info />A {challenge.environment.toLowerCase()}{" "}
                  {challenge.task.toLowerCase()} challenge. Contribute data to
                  improve a specific robot capability.
                </p>
                <p>{challenge.overview}</p>
                <div className="challenge-timeline">
                  <div>
                    <strong>Start</strong>
                    <span>Nov 3, 2026</span>
                  </div>
                  <div>
                    <strong>
                      {challenge.status === "Review" ? "Closed" : "Close"}
                    </strong>
                    <span>{challenge.deadlineLabel}</span>
                  </div>
                  <div
                    className="timeline-track"
                    aria-label="Illustrative challenge timeline"
                  >
                    <span
                      style={{
                        width: challenge.status === "Review" ? "100%" : "20%",
                      }}
                    />
                  </div>
                </div>
              </section>
              <section className="detail-section">
                <h2>Evaluation</h2>
                <div className="evaluation-grid">
                  <Metric
                    icon={<Target />}
                    label="Primary metric"
                    value={`${challenge.metric} ↑`}
                    description="Higher is better"
                  />
                  <Metric
                    icon={<Layers3 />}
                    label="Baseline"
                    value={challenge.baseline.toFixed(2)}
                    description="Current model performance"
                  />
                  <Metric
                    icon={<TrendingUp />}
                    label="Target"
                    value={`≥ ${challenge.target.toFixed(2)}`}
                    description="Challenge goal"
                  />
                </div>
                <p className="text-muted-foreground">
                  The host fine-tunes the same perception model with each
                  dataset and evaluates it on a held-out benchmark. The target
                  is a goal, rather than a minimum threshold for positive
                  contribution.
                </p>
              </section>
              <section className="detail-section">
                <h2>Dataset</h2>
                <p>
                  Contribute annotated images or video frames across varied
                  lighting, backgrounds, and viewpoints. Include edge cases,
                  clean labels, and a description of how the data was collected.
                </p>
                <div className="evaluation-steps">
                  <span>
                    <Upload />
                    Submit targeted data
                  </span>
                  <ArrowRight />
                  <span>
                    <Database />
                    Host trains model
                  </span>
                  <ArrowRight />
                  <span>
                    <BarChart3 />
                    Measure improvement
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => changeTab("Data")}
                >
                  View dataset requirements
                  <ArrowRight />
                </Button>
              </section>
            </TabsContent>
            <TabsContent value="Data">
              <section className="detail-section">
                <h2>Dataset requirements</h2>
                <p>
                  Submit a ZIP archive with an image directory and COCO-format
                  annotations. This challenge asks for targeted data, not model
                  weights or prediction files.
                </p>
                <ul className="detail-list">
                  <li>
                    RGB images or sampled video frames with bounding-box
                    annotations.
                  </li>
                  <li>
                    Coverage of the challenge’s failure cases, including varied
                    light and viewpoints.
                  </li>
                  <li>
                    A manifest describing collection method, license, class
                    labels, and limitations.
                  </li>
                  <li>
                    No benchmark images, private personal data, or
                    duplicate-heavy submissions.
                  </li>
                </ul>
                <div className="market-notice">
                  <FileArchive />
                  Preview file limit: 250 MB. Production limits will be
                  published with the live challenge.
                </div>
                <h3 className="font-semibold">Expected structure</h3>
                <pre className="code-block">{`dataset.zip\n├── images/\n│   ├── scene-001.jpg\n│   └── scene-002.jpg\n├── annotations.json\n└── manifest.json`}</pre>
                <Button
                  disabled={challenge.status !== "Active"}
                  onClick={() => setSubmissionOpen(true)}
                >
                  Prepare dataset submission
                  <ArrowRight />
                </Button>
                {preparedName && (
                  <p className="prepared-note">
                    <Check />
                    Prepared locally: {preparedName}. No files uploaded or funds
                    transferred.
                  </p>
                )}
              </section>
            </TabsContent>
            <TabsContent value="Code">
              <section className="detail-section">
                <h2>Submission manifest</h2>
                <p>
                  Use this example as the starting point for your dataset
                  metadata. Evaluation runs on the host’s side; contributors
                  submit datasets.
                </p>
                <pre className="code-block">{manifest}</pre>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(manifest);
                      setCopied(true);
                    } catch {
                      setCopied(false);
                    }
                  }}
                >
                  <Copy />
                  {copied ? "Copied manifest" : "Copy manifest"}
                </Button>
                <p className="text-muted-foreground">
                  The training configuration and reproducible evaluation runner
                  will be published with the live challenge. No evaluation code
                  is available in this preview.
                </p>
              </section>
            </TabsContent>
            <TabsContent value="Discussion">
              <section className="detail-section">
                <h2>Discussion</h2>
                <div className="discussion-post">
                  <strong>Host · Dataset guidance</strong>
                  <p>
                    Prioritize diverse examples of the specified failure case.
                    Explain collection conditions and known limitations in your
                    manifest.
                  </p>
                </div>
                {questions.map((text, index) => (
                  <div className="discussion-post" key={index}>
                    <strong>You · Local preview</strong>
                    <p>{text}</p>
                  </div>
                ))}
                <form
                  className="discussion-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (question.trim()) {
                      setQuestions([...questions, question.trim()]);
                      setQuestion("");
                    }
                  }}
                >
                  <label htmlFor="challenge-question">
                    Ask about this challenge
                  </label>
                  <textarea
                    id="challenge-question"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="What would you like to clarify?"
                    required
                    maxLength={1000}
                    rows={4}
                  />
                  <Button type="submit" size="sm">
                    Add preview comment
                  </Button>
                  <p className="text-muted-foreground">
                    Comments stay in this page session and are not sent to the
                    host.
                  </p>
                </form>
              </section>
            </TabsContent>
            <TabsContent value="Leaderboard">
              <ContributionResults challenge={challenge} />
            </TabsContent>
            <TabsContent value="Rules">
              <section className="detail-section">
                <h2>Challenge rules</h2>
                <ol className="detail-list numbered">
                  <li>
                    Enter with the published SOL stake before submitting your
                    dataset.
                  </li>
                  <li>
                    The company funds the reward pool in escrow before the live
                    challenge opens.
                  </li>
                  <li>
                    The host evaluates submitted data against a fixed baseline
                    and held-out benchmark.
                  </li>
                  <li>
                    Positive contributions earn proportional rewards according
                    to the published attribution method.
                  </li>
                  <li>
                    Every participant’s entry stake is returned at settlement,
                    including zero or negative improvements.
                  </li>
                  <li>
                    Contribute only data you have the right to share. Describe
                    its source and license.
                  </li>
                </ol>
                <p className="market-notice">
                  <Info />
                  These are preview rules. The live challenge must publish the
                  evaluation, attribution, data-use, and settlement terms before
                  accepting stakes.
                </p>
              </section>
            </TabsContent>
          </div>
          <aside className="challenge-sidebar">
            <Card>
              <CardContent>
                <Button
                  className="w-full"
                  disabled={challenge.status !== "Active"}
                  onClick={() => setSubmissionOpen(true)}
                >
                  {challenge.status === "Active"
                    ? "Stake & submit dataset"
                    : "Under evaluation"}
                  <ArrowRight />
                </Button>
                <p className="sidebar-preview">Preview flow · No transaction</p>
                <SidebarFact
                  icon={<Database />}
                  label="Bounty pool (demo)"
                  value={`${challenge.pool.toFixed(1)} SOL`}
                />
                <SidebarFact
                  icon={<Layers3 />}
                  label="Refundable entry stake"
                  value={`${challenge.stake.toFixed(2)} SOL`}
                />
                <SidebarFact
                  icon={<BarChart3 />}
                  label="Reward type"
                  value="Performance-based"
                />
                <SidebarFact
                  icon={<CalendarDays />}
                  label="Deadline"
                  value={challenge.deadlineLabel}
                />
                <SidebarFact
                  icon={<Users />}
                  label="Participants (demo)"
                  value={String(challenge.participants)}
                />
                <div className="sidebar-tags">
                  <Tag />
                  <div>
                    <p>Tags</p>
                    <div className="challenge-tags">
                      <Badge variant="secondary">{challenge.task}</Badge>
                      <Badge variant="secondary">{challenge.environment}</Badge>
                    </div>
                  </div>
                </div>
                <p className="stake-note">
                  <ShieldCheck />
                  Your entry stake is returned when the challenge ends, even if
                  your dataset does not improve the model.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Tabs>
      {submissionOpen && (
        <SubmissionDialog
          challenge={challenge}
          onClose={() => setSubmissionOpen(false)}
          onPrepared={setPreparedName}
        />
      )}
    </main>
  );
}

function Metric({
  icon,
  label,
  value,
  description,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <Card className="evaluation-metric">
      <CardContent>
        <span className="metric-icon">{icon}</span>
        <div>
          <p className="text-muted-foreground">{label}</p>
          <strong className="text-heading">{value}</strong>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function SidebarFact({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="sidebar-fact">
      <span className="metric-icon">{icon}</span>
      <div>
        <p className="text-muted-foreground">{label}</p>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
