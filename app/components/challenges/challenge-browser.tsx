"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Layers3, Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { challenges } from "@/app/lib/challenges/data";
import { ChallengeIcon } from "./challenge-icon";

const categories = [
  "All",
  "Perception",
  "Manipulation",
  "Navigation",
  "Simulation",
  "Real World",
];

export function ChallengeBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(false);
  const [ending, setEnding] = useState(false);
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        event.key === "/" &&
        !target.closest("input, textarea, [contenteditable]")
      ) {
        event.preventDefault();
        search.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const visible = challenges.filter((challenge) => {
    const matchesText =
      `${challenge.title} ${challenge.description} ${challenge.task} ${challenge.host}`
        .toLowerCase()
        .includes(query.trim().toLowerCase());
    const matchesCategory =
      category === "All" ||
      challenge.task === category ||
      challenge.environment === category ||
      (category === "Simulation" && challenge.environment === "Sim + Real");
    return (
      matchesText &&
      matchesCategory &&
      (!active || challenge.status === "Active") &&
      (!ending ||
        (challenge.status === "Active" && challenge.deadline <= "2026-11-12"))
    );
  });

  function reset() {
    setQuery("");
    setCategory("All");
    setActive(false);
    setEnding(false);
  }

  return (
    <main>
      <section className="market-container explore-hero">
        <Badge variant="outline" className="network-pill">
          <Layers3 />
          Challenge marketplace
        </Badge>
        <h1 className="text-display font-semibold tracking-tight">
          Explore challenges
        </h1>
        <p>
          Browse robotics problems, contribute targeted datasets,
          <br className="hidden sm:block" /> and earn rewards for measured
          improvement.
        </p>
        <div className="challenge-search">
          <Search aria-hidden="true" />
          <Input
            ref={search}
            aria-label="Search challenges"
            placeholder="Search challenges by name, task, or keyword…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <kbd aria-hidden="true">/</kbd>
          <Button
            size="icon-sm"
            variant="default"
            onClick={() => search.current?.focus()}
            aria-label="Focus challenge search"
          >
            <Search />
          </Button>
        </div>
        <div className="challenge-filters">
          <ToggleGroup
            aria-label="Challenge category"
            value={[category]}
            onValueChange={(values) => setCategory(values[0] ?? "All")}
            className="market-filter-group"
          >
            {categories.map((item) => (
              <ToggleGroupItem
                key={item}
                value={item}
                className="market-filter"
              >
                {item}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <span className="filter-divider" />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={active ? "default" : "outline"}
              aria-pressed={active}
              onClick={() => setActive(!active)}
            >
              Active
            </Button>
            <Button
              size="sm"
              variant={ending ? "default" : "outline"}
              aria-pressed={ending}
              onClick={() => setEnding(!ending)}
            >
              Ending soon
            </Button>
          </div>
        </div>
      </section>
      <section
        className="market-container challenge-results"
        aria-label="Challenge results"
      >
        <div className="results-caption">
          <span aria-live="polite">
            {visible.length} {visible.length === 1 ? "challenge" : "challenges"}
          </span>
          <span>
            <Check />
            Entry stakes returned at settlement
          </span>
        </div>
        {visible.length > 0 && (
          <div className="challenge-table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Challenge</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Environment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reward pool</TableHead>
                  <TableHead>Refundable stake</TableHead>
                  <TableHead>Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((challenge) => (
                  <TableRow key={challenge.slug}>
                    <TableCell className="challenge-table-name">
                      <div className="challenge-table-identity">
                        <ChallengeIcon type={challenge.icon} />
                        <div>
                          <Link
                            href={`/challenges/${challenge.slug}`}
                            className="challenge-table-link"
                          >
                            {challenge.title}
                          </Link>
                          <p>{challenge.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{challenge.task}</TableCell>
                    <TableCell>{challenge.environment}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`challenge-status ${challenge.status === "Review" ? "status-review" : "status-active"}`}
                      >
                        <span />
                        {challenge.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {challenge.pool.toFixed(1)} SOL
                    </TableCell>
                    <TableCell>{challenge.stake.toFixed(2)} SOL</TableCell>
                    <TableCell>{challenge.deadlineLabel}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {visible.length === 0 && (
          <div className="challenge-empty">
            <SlidersHorizontal />
            <h2 className="text-heading font-semibold">
              No matching challenges
            </h2>
            <p>Try another keyword or a different set of filters.</p>
            <Button variant="outline" onClick={reset}>
              <X />
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
