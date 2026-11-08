"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Check,
  Columns3,
  FileText,
  Search,
  Table2,
  Trophy,
} from "lucide-react";
import type { Bounty } from "@/app/lib/challenges/bounties";
import {
  getAttempts,
  attemptContext,
  type CuratorAttempt,
} from "@/app/lib/challenges/attempts";
import { WalletButton } from "../wallet-button";

const shades = ["#242424", "#74736e", "#aaa9a4"];
const number = (value: number) => value.toLocaleString("en-US");
const signed = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(1)}`;

export function BountyDetail({ bounty }: { bounty: Bounty }) {
  const attempts = getAttempts(bounty);
  const context = attemptContext(bounty);
  const [tab, setTab] = useState("Overview");
  const [view, setView] = useState("Table");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(attempts[0].id);
  const selected =
    attempts.find((attempt) => attempt.id === selectedId) ?? attempts[0];
  const visible = attempts.filter((attempt) =>
    `${attempt.curator} ${attempt.dataset} ${attempt.id}`
      .toLowerCase()
      .includes(query.toLowerCase().trim())
  );
  const ranked = attempts
    .filter((attempt) => attempt.score !== null)
    .sort((a, b) => (b.gain ?? 0) - (a.gain ?? 0));
  const choose = (attempt: CuratorAttempt) => {
    setSelectedId(attempt.id);
  };
  return (
    <main className="n-main n-bounty-detail-page">
      <Link className="n-back-link" href="/challenges">
        <ArrowLeft size={14} /> Bounties{" "}
        <span>
          / {bounty.category} / {bounty.id}
        </span>
      </Link>
      <div className="n-detail-title">
        <div>
          <p className="n-host">
            <span className="n-avatar">{bounty.initials}</span>Hosted by{" "}
            {bounty.host}
          </p>
          <h1>{bounty.title}</h1>
          <p className="n-description">{bounty.description}</p>
        </div>
        <WalletButton />
      </div>
      <dl className="n-bounty-summary">
        <div>
          <dt>Reward pool</dt>
          <dd>{bounty.pool} SOL</dd>
        </div>
        <div>
          <dt>Entry stake</dt>
          <dd>{bounty.stake.toFixed(2)} SOL</dd>
        </div>
        <div>
          <dt>Baseline → target</dt>
          <dd>
            {bounty.baseline}% → {bounty.target}%
          </dd>
        </div>
        <div>
          <dt>Closes</dt>
          <dd>{bounty.deadline}, 2026</dd>
        </div>
      </dl>
      <div className="n-detail-nav" role="tablist" aria-label="Bounty sections">
        {["Overview", "Submissions", "Leaderboard"].map((name) => (
          <button
            type="button"
            key={name}
            role="tab"
            aria-selected={tab === name}
            aria-controls="bounty-section"
            id={`tab-${name}`}
            className={tab === name ? "is-active" : ""}
            onClick={() => setTab(name)}
          >
            {name === "Overview" ? (
              <FileText size={15} />
            ) : name === "Submissions" ? (
              <Table2 size={15} />
            ) : (
              <Trophy size={15} />
            )}
            {name}
            {name === "Submissions" && (
              <span className="n-count">{attempts.length}</span>
            )}
          </button>
        ))}
      </div>
      <section
        id="bounty-section"
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
      >
        {tab === "Overview" && (
          <>
            <div className="n-detail-overview">
              <article>
                <h2>The challenge</h2>
                <p>
                  {bounty.description} The host evaluates every dataset
                  independently from the same baseline, using the same
                  fine-tuning settings and held-out benchmark.
                </p>
                <h3>Tasks & subtasks</h3>
                <ol className="n-task-list">
                  <li>
                    <strong>Collect targeted examples.</strong>
                    <span>{bounty.description}</span>
                  </li>
                  <li>
                    <strong>Annotate and validate.</strong>
                    <span>
                      Deliver {bounty.format.toLowerCase()}. Check labels,
                      remove duplicates, and document edge cases.
                    </span>
                  </li>
                  <li>
                    <strong>Document the dataset.</strong>
                    <span>
                      Include data provenance, licensing, collection conditions,
                      and a versioned manifest.
                    </span>
                  </li>
                  <li>
                    <strong>Keep evaluation independent.</strong>
                    <span>
                      Exclude held-out test examples. The host retrains the
                      baseline and evaluates {bounty.metric} under fixed
                      conditions.
                    </span>
                  </li>
                </ol>
                <h3>Participation & rewards</h3>
                <p>
                  Stake {bounty.stake.toFixed(2)} SOL to enter. The{" "}
                  {bounty.pool} SOL pool is shared in proportion to positive
                  measured gains. Entry stakes are returned at settlement,
                  including when a dataset produces no improvement. Submissions
                  close {bounty.deadline}, 2026.
                </p>
              </article>
              <dl>
                <div>
                  <dt>Model</dt>
                  <dd>{bounty.model}</dd>
                </div>
                <div>
                  <dt>Primary metric</dt>
                  <dd>{bounty.metric} · higher is better</dd>
                </div>
                <div>
                  <dt>Evaluation set</dt>
                  <dd>{context.benchmark}</dd>
                </div>
                <div>
                  <dt>Conditions</dt>
                  <dd>{context.condition}</dd>
                </div>
              </dl>
            </div>
            <div className="n-section-heading">
              <div>
                <h2>Evaluation at a glance</h2>
                <p className="n-description">
                  Same model. Same benchmark. Different training data.
                </p>
              </div>
              <button
                type="button"
                className="n-button"
                onClick={() => setTab("Submissions")}
              >
                Explore submissions <ArrowUpRight size={14} />
              </button>
            </div>
            <EvaluationCharts
              bounty={bounty}
              attempts={ranked.slice(0, 3)}
              selected={selected}
            />
            <Leaderboard
              bounty={bounty}
              attempts={ranked.slice(0, 5)}
              onSelect={(attempt) => {
                choose(attempt);
                setTab("Submissions");
              }}
            />
          </>
        )}
        {tab === "Submissions" && (
          <>
            <div className="n-submission-toolbar">
              <div className="n-view-switch" aria-label="Submission view">
                {["Table", "Board"].map((name) => (
                  <button
                    type="button"
                    key={name}
                    aria-pressed={view === name}
                    className={view === name ? "is-active" : ""}
                    onClick={() => setView(name)}
                  >
                    {name === "Table" ? (
                      <Table2 size={15} />
                    ) : (
                      <Columns3 size={15} />
                    )}
                    {name}
                  </button>
                ))}
              </div>
              <label className="n-search">
                <Search size={15} />
                <input
                  aria-label="Search curator submissions"
                  placeholder="Find a curator or dataset…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
            </div>
            {view === "Table" ? (
              <div
                className="n-entries-scroll"
                tabIndex={0}
                aria-label="Scrollable curator submissions"
              >
                <table className="n-data-table">
                  <thead>
                    <tr>
                      <th>Curator / dataset</th>
                      <th>{context.samples}</th>
                      <th>Attempt</th>
                      <th>{bounty.metric}</th>
                      <th>Gain</th>
                      <th>{context.error} ↓</th>
                      <th>Est. reward</th>
                      <th>Status</th>
                      <th>Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((attempt) => (
                      <tr
                        key={attempt.id}
                        className={
                          selected.id === attempt.id ? "n-row-selected" : ""
                        }
                      >
                        <td>
                          <button
                            type="button"
                            className="n-entry-name"
                            onClick={() => choose(attempt)}
                            aria-pressed={selected.id === attempt.id}
                          >
                            <span className="n-avatar">{attempt.initials}</span>
                            <span>
                              <strong>{attempt.curator}</strong>
                              <span>{attempt.dataset}</span>
                            </span>
                          </button>
                        </td>
                        <td>{number(attempt.rows)}</td>
                        <td>v{attempt.version}</td>
                        <td>
                          {attempt.score === null
                            ? "—"
                            : `${attempt.score.toFixed(1)}%`}
                        </td>
                        <td>
                          {attempt.gain === null
                            ? "—"
                            : `${signed(attempt.gain)} pp`}
                        </td>
                        <td>
                          {attempt.error === null
                            ? "—"
                            : `${attempt.error.toFixed(1)}%`}
                        </td>
                        <td>
                          {attempt.score === null
                            ? "—"
                            : `${attempt.reward.toFixed(2)} SOL`}
                        </td>
                        <td>
                          <span className="n-status-tag">
                            {attempt.status === "Evaluated" && (
                              <Check size={12} />
                            )}
                            {attempt.status}
                          </span>
                        </td>
                        <td>{attempt.submitted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {visible.length === 0 && (
                  <p className="n-column-empty">
                    No submissions match your search.
                  </p>
                )}
              </div>
            ) : (
              <div className="n-attempt-board">
                {["Evaluated", "Training", "Queued"].map((status) => (
                  <section className="n-board-column" key={status}>
                    <div className="n-column-heading">
                      <h3>{status}</h3>
                      <span className="n-count">
                        {
                          visible.filter((attempt) => attempt.status === status)
                            .length
                        }
                      </span>
                    </div>
                    <div className="n-attempt-stack">
                      {visible
                        .filter((attempt) => attempt.status === status)
                        .map((attempt) => (
                          <button
                            type="button"
                            className={`n-bounty-card ${selected.id === attempt.id ? "n-selected-card" : ""}`}
                            key={attempt.id}
                            onClick={() => choose(attempt)}
                          >
                            <span className="n-host">
                              <span className="n-avatar">
                                {attempt.initials}
                              </span>
                              {attempt.curator}
                            </span>
                            <span className="n-card-title">
                              {attempt.dataset}
                            </span>
                            <span className="n-card-description">
                              {number(attempt.rows)}{" "}
                              {context.samples.toLowerCase()} · v
                              {attempt.version}
                            </span>
                            <span className="n-attempt-card-numbers">
                              {attempt.score === null
                                ? "Awaiting evaluation"
                                : `${attempt.score}% score · ${signed(attempt.gain ?? 0)} pp`}
                            </span>
                            <span className="n-status-tag">
                              {attempt.status}
                            </span>
                          </button>
                        ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
            <div className="n-selected-attempt" aria-live="polite">
              <div>
                <p className="n-eyebrow">Selected attempt · {selected.id}</p>
                <h2>{selected.dataset}</h2>
                <p className="n-description">
                  {selected.curator} · {number(selected.rows)}{" "}
                  {context.samples.toLowerCase()} · Version {selected.version}
                </p>
              </div>
              <div>
                <span className="n-property-label">Estimated reward</span>
                <strong>{selected.reward.toFixed(2)} SOL</strong>
                <span>{selected.share.toFixed(1)}% of the pool</span>
              </div>
            </div>
            {selected.score === null ? (
              <div className="n-evaluation-pending">
                <BarChart3 size={24} />
                <h3>
                  {selected.status === "Training"
                    ? "Fine-tuning in progress"
                    : "Waiting for an evaluation slot"}
                </h3>
                <p>
                  Metrics and reward allocation appear after this run is
                  evaluated.
                </p>
              </div>
            ) : (
              <EvaluationCharts
                bounty={bounty}
                attempts={[
                  selected,
                  ...ranked
                    .filter((attempt) => attempt.id !== selected.id)
                    .slice(0, 2),
                ]}
                selected={selected}
              />
            )}
          </>
        )}
        {tab === "Leaderboard" && (
          <>
            <div className="n-section-heading n-leaderboard-heading">
              <div>
                <h2>Leaderboard</h2>
                <p className="n-description">
                  Ranked by improvement over the {bounty.baseline}% baseline.
                  Positive gains determine reward shares.
                </p>
              </div>
              <span className="n-status-tag">{ranked.length} evaluated</span>
            </div>
            <Leaderboard
              bounty={bounty}
              attempts={ranked}
              onSelect={(attempt) => {
                choose(attempt);
                setTab("Submissions");
              }}
            />
            <p className="n-board-note">
              Stake refunds are separate from rewards. Zero or negative gains
              receive no bounty share.
            </p>
          </>
        )}
      </section>
    </main>
  );
}

function EvaluationCharts({
  bounty,
  attempts,
  selected,
}: {
  bounty: Bounty;
  attempts: CuratorAttempt[];
  selected: CuratorAttempt;
}) {
  const context = attemptContext(bounty);
  const low = Math.max(0, bounty.baseline - 8);
  const high = Math.min(
    100,
    Math.max(
      bounty.target,
      ...attempts.map((attempt) => attempt.score ?? bounty.baseline)
    ) + 5
  );
  const x = (i: number) => 58 + i * 112;
  const y = (score: number) => 231 - ((score - low) / (high - low)) * 190;
  const baseError = Number(((100 - bounty.baseline) * 0.63).toFixed(1));
  const rows = [
    {
      label: `${bounty.metric} ↑`,
      baseline: bounty.baseline,
      current: selected.score ?? bounty.baseline,
      max: 100,
      unit: "%",
    },
    {
      label: `${context.error} ↓`,
      baseline: baseError,
      current: selected.error ?? baseError,
      max: Math.max(30, baseError + 5),
      unit: "%",
    },
    {
      label: `${context.secondary} ↓`,
      baseline:
        bounty.category === "Robot Perception" && bounty.id !== "KY-303"
          ? 6.4
          : 14.2,
      current: Math.max(
        0.3,
        (bounty.category === "Robot Perception" && bounty.id !== "KY-303"
          ? 6.4
          : 14.2) -
          (selected.gain ?? 0) * 0.3
      ),
      max: 20,
      unit: context.secondaryUnit,
    },
  ];
  return (
    <div className="n-evaluation-grid">
      <article className="n-chart-panel">
        <h3>Model performance</h3>
        <p className="n-description">
          {bounty.metric} (%) · independent fine-tuning runs
        </p>
        <svg
          viewBox="0 0 550 285"
          role="img"
          aria-label={`Model scores from ${bounty.baseline}% baseline over four fine-tuning checkpoints`}
        >
          <title>Performance across checkpoints</title>
          {Array.from({ length: 5 }, (_, i) => {
            const value = low + ((high - low) * i) / 4;
            return (
              <g key={i}>
                <line
                  x1="58"
                  x2="506"
                  y1={y(value)}
                  y2={y(value)}
                  stroke="#e8e8e5"
                />
                <text x="44" y={y(value) + 4} textAnchor="end">
                  {value.toFixed(0)}
                </text>
              </g>
            );
          })}
          <line
            x1="58"
            x2="506"
            y1={y(bounty.baseline)}
            y2={y(bounty.baseline)}
            stroke="#92918c"
            strokeDasharray="4 5"
          />
          {attempts.map((attempt, index) => {
            const points = [0, 0.22, 0.49, 0.79, 1]
              .map(
                (p, i) =>
                  `${x(i)},${y(bounty.baseline + (attempt.gain ?? 0) * p)}`
              )
              .join(" ");
            return (
              <g key={attempt.id}>
                <polyline
                  points={points}
                  fill="none"
                  stroke={shades[index]}
                  strokeWidth={index === 0 ? 2.8 : 1.8}
                  strokeDasharray={index === 1 ? "6 3" : undefined}
                />
                {[0, 0.22, 0.49, 0.79, 1].map((p, i) => (
                  <circle
                    key={i}
                    cx={x(i)}
                    cy={y(bounty.baseline + (attempt.gain ?? 0) * p)}
                    r="3"
                    fill={shades[index]}
                  />
                ))}
              </g>
            );
          })}
          {["Base", "Epoch 1", "Epoch 2", "Epoch 3", "Epoch 4"].map(
            (label, i) => (
              <text key={label} x={x(i)} y="260" textAnchor="middle">
                {label}
              </text>
            )
          )}
        </svg>
        <div className="n-chart-legend">
          <span>
            <i className="n-baseline-key" />
            Baseline · {bounty.baseline}%
          </span>
          {attempts.map((attempt, index) => (
            <span key={attempt.id}>
              <i style={{ background: shades[index] }} />
              {attempt.curator} · {attempt.score?.toFixed(1)}%
            </span>
          ))}
        </div>
      </article>
      <article className="n-chart-panel">
        <h3>What changed with this dataset?</h3>
        <p className="n-description">
          {selected.curator} · same evaluation conditions
        </p>
        <div className="n-metric-comparisons">
          {rows.map((row) => (
            <div key={row.label}>
              <div className="n-metric-label">
                <span>{row.label}</span>
                <span>
                  {row.baseline.toFixed(1)} →{" "}
                  <strong>
                    {row.current.toFixed(1)}
                    {row.unit}
                  </strong>
                </span>
              </div>
              <div className="n-comparison-track">
                <i
                  style={{
                    width: `${Math.min(100, (row.baseline / row.max) * 100)}%`,
                  }}
                />
              </div>
              <div className="n-comparison-track n-comparison-current">
                <i
                  style={{
                    width: `${Math.min(100, (row.current / row.max) * 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="n-chart-legend">
          <span>
            <i style={{ background: "#d3d2ce" }} />
            Baseline model
          </span>
          <span>
            <i style={{ background: "#242424" }} />
            With selected dataset
          </span>
        </div>
        <p className="n-chart-footnote">
          ↑ Higher is better · ↓ Lower is better. Each metric uses its own
          scale.
        </p>
      </article>
    </div>
  );
}

function Leaderboard({
  bounty,
  attempts,
  onSelect,
}: {
  bounty: Bounty;
  attempts: CuratorAttempt[];
  onSelect: (attempt: CuratorAttempt) => void;
}) {
  return (
    <div className="n-leaderboard">
      <div className="n-leaderboard-caption">
        <span>
          <Trophy size={15} /> Contribution ranking
        </span>
        <span>{bounty.pool} SOL reward pool</span>
      </div>
      <div
        className="n-entries-scroll n-leaderboard-scroll"
        tabIndex={0}
        aria-label="Scrollable contribution leaderboard"
      >
        <table className="n-data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Curator / dataset</th>
              <th>{bounty.metric}</th>
              <th>Gain</th>
              <th>Est. share</th>
              <th>Estimated reward</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt, i) => (
              <tr key={attempt.id}>
                <td>{i + 1}</td>
                <td>
                  <button
                    type="button"
                    className="n-entry-name"
                    onClick={() => onSelect(attempt)}
                  >
                    <span className="n-avatar">{attempt.initials}</span>
                    <span>
                      <strong>{attempt.curator}</strong>
                      <span>{attempt.dataset}</span>
                    </span>
                  </button>
                </td>
                <td>{attempt.score?.toFixed(1)}%</td>
                <td>{signed(attempt.gain ?? 0)} pp</td>
                <td>
                  <span className="n-share-value">
                    {attempt.share.toFixed(1)}%
                    <span className="n-share-track">
                      <i style={{ width: `${attempt.share}%` }} />
                    </span>
                  </span>
                </td>
                <td>
                  <strong>{attempt.reward.toFixed(2)} SOL</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
