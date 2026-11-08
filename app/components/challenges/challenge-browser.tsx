"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetchFundedBounties } from "@/app/lib/bounty/client";
import {
  ArrowDownWideNarrow,
  ArrowUpRight,
  Check,
  Columns3,
  FileText,
  Search,
  Users,
  X,
} from "lucide-react";
import { bounties, bountyCategories } from "@/app/lib/challenges/bounties";
import { HostBountyButton } from "../host-bounty-button";

export function ChallengeBrowser() {
  const {
    data: funded = [],
    error: fundedError,
    isLoading: loadingFunded,
  } = useSWR("kynetic:devnet:bounties", fetchFundedBounties, {
    refreshInterval: 30000,
    shouldRetryOnError: false,
  });
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recent");
  const visible = [...funded, ...bounties].filter((bounty) =>
    `${bounty.title} ${bounty.description} ${bounty.host} ${bounty.category} ${bounty.model}`
      .toLowerCase()
      .includes(query.toLowerCase().trim())
  );
  const sorted = [...visible].sort((a, b) =>
    sort === "reward"
      ? b.pool - a.pool
      : sort === "deadline"
        ? a.deadline.localeCompare(b.deadline)
        : 0
  );
  return (
    <section
      className="n-bounty-section"
      id="bounties"
      aria-labelledby="bounty-board-title"
    >
      <div className="n-section-heading">
        <div>
          <p className="n-eyebrow">The marketplace</p>
          <h2 id="bounty-board-title">Find a model you can make better.</h2>
          <p className="n-description">
            Choose a challenge. Curate targeted data. Get rewarded for the
            improvement.
          </p>
        </div>
        <HostBountyButton />
      </div>
      <div className="n-board-toolbar">
        <span className="n-view-label">
          <Columns3 size={16} /> Board{" "}
          <span className="n-count" aria-live="polite">
            {visible.length}
          </span>
        </span>
        <div className="n-board-controls">
          <label className="n-search">
            <Search size={15} aria-hidden="true" />
            <input
              aria-label="Search bounties"
              placeholder="Search bounties…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
              >
                <X size={14} />
              </button>
            )}
          </label>
          <label className="n-sort">
            <ArrowDownWideNarrow size={15} aria-hidden="true" />
            <select
              aria-label="Sort bounties"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="recent">Default order</option>
              <option value="reward">Highest reward</option>
              <option value="deadline">Closing soon</option>
            </select>
          </label>
        </div>
      </div>
      <div className="n-board" aria-label="Bounties grouped by model category">
        {bountyCategories.map((category) => {
          const entries = sorted.filter(
            (bounty) => bounty.category === category
          );
          return (
            <section
              className="n-board-column"
              key={category}
              aria-label={`${category} bounties`}
            >
              <div className="n-column-heading">
                <h3>
                  <span className="n-category-dot" />
                  {category}
                </h3>
                <span className="n-count">{entries.length}</span>
              </div>
              <div className="n-card-stack">
                {entries.map((bounty) => (
                  <Link
                    href={`/challenges/${bounty.id.startsWith("KY-") ? bounty.id.toLowerCase() : bounty.id}`}
                    className="n-bounty-card"
                    key={bounty.id}
                    aria-label={`View ${bounty.title}`}
                  >
                    <span className="n-card-top">
                      <span className="n-host">
                        <span className="n-avatar">{bounty.initials}</span>
                        {bounty.host}
                      </span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                    <span className="n-card-title">{bounty.title}</span>
                    <span className="n-card-description">
                      {bounty.description}
                    </span>
                    {!bounty.id.startsWith("KY-") && (
                      <span className="n-status-tag">Devnet escrow funded</span>
                    )}
                    <span className="n-model">
                      <FileText size={13} aria-hidden="true" />
                      {bounty.model}
                    </span>
                    <span className="n-card-properties">
                      <span>
                        <span className="n-property-label">Reward pool</span>
                        <strong>{bounty.pool} SOL</strong>
                      </span>
                      <span>
                        <span className="n-property-label">Entry stake</span>
                        <span>{bounty.stake.toFixed(2)} SOL</span>
                      </span>
                    </span>
                    <span className="n-card-bottom">
                      <span>
                        <Users size={13} aria-hidden="true" />{" "}
                        {bounty.contributors} curators
                      </span>
                      <span>Closes {bounty.deadline}</span>
                    </span>
                  </Link>
                ))}
              </div>
              {entries.length === 0 && (
                <p className="n-column-empty">No matching bounties.</p>
              )}
            </section>
          );
        })}
      </div>
      {visible.length === 0 && (
        <div className="n-empty">
          <p>No bounties match “{query}”.</p>
          <button
            type="button"
            className="n-button"
            onClick={() => setQuery("")}
          >
            Clear search
          </button>
        </div>
      )}
      {fundedError && (
        <p className="n-board-note" role="status">
          Live Devnet bounties could not load.{" "}
          <button
            type="button"
            className="n-text-link"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </p>
      )}
      {loadingFunded && (
        <p className="n-board-note" role="status">
          Loading funded Devnet bounties…
        </p>
      )}
      <div className="n-board-note">
        <Check size={14} aria-hidden="true" /> Entry stakes are returned at
        settlement. Rewards follow measured gains.
      </div>
    </section>
  );
}
