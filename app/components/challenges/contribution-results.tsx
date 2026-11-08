"use client";

import { useState } from "react";
import { Download, Info, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { contributionSamples, type Challenge } from "@/app/lib/challenges/data";

export function ContributionResults({ challenge }: { challenge: Challenge }) {
  const [view, setView] = useState("table");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const results = contributionSamples.filter((item) =>
    `${item.name} ${item.dataset}`.toLowerCase().includes(query.toLowerCase())
  );
  const current = contributionSamples[selected];

  function exportCsv() {
    const csv = [
      "Curator,Dataset,Images,Gain (pp),Reward share (%),Estimated reward (SOL)",
      ...results.map(
        (row) =>
          `${row.name},"${row.dataset}",${row.images},${row.gain},${row.share},${((challenge.pool * row.share) / 100).toFixed(2)}`
      ),
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" })
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${challenge.id}-sample-results.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="detail-section contribution-results">
      <div className="section-toolbar">
        <div>
          <h2>Contribution leaderboard</h2>
          <p className="text-muted-foreground">
            Measured dataset improvement, with illustrative reward estimates.
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={exportCsv}>
          <Download />
          Export CSV
        </Button>
      </div>
      <p className="market-notice">
        <Info />
        Sample results · No evaluation has been run for these demo challenges.
      </p>
      <div className="section-toolbar">
        <div className="result-search">
          <Search />
          <Input
            aria-label="Search contributor results"
            placeholder="Search curators or datasets"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <Tabs value={view} onValueChange={(value) => setView(String(value))}>
          <TabsList aria-label="Result display">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="chart">Chart</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {view === "table" ? (
        <div className="results-table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Curator / dataset</TableHead>
                <TableHead>Gain</TableHead>
                <TableHead>Share</TableHead>
                <TableHead>Est. reward</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{contributionSamples.indexOf(row) + 1}</TableCell>
                  <TableCell>
                    <strong>{row.name}</strong>
                    <span className="table-dataset">{row.dataset}</span>
                  </TableCell>
                  <TableCell
                    className={
                      row.gain > 0 ? "text-success" : "text-muted-foreground"
                    }
                  >
                    {row.gain > 0 ? "+" : ""}
                    {row.gain.toFixed(1)} pp
                  </TableCell>
                  <TableCell>{row.share}%</TableCell>
                  <TableCell>
                    {row.share
                      ? `${((challenge.pool * row.share) / 100).toFixed(2)} SOL`
                      : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {results.length === 0 && (
            <p className="p-5 text-muted-foreground">
              No matching dataset results.
            </p>
          )}
        </div>
      ) : (
        <div className="impact-layout">
          <div className="impact-plot">
            <h3 className="font-medium">Dataset size vs. improvement</h3>
            <svg
              viewBox="0 0 620 360"
              role="img"
              aria-labelledby="impact-title impact-description"
            >
              <title id="impact-title">Dataset impact comparison</title>
              <desc id="impact-description">
                Horizontal axis: submitted images, zero to five thousand.
                Vertical axis: benchmark gain, minus one to six percentage
                points. Select a point to inspect a dataset.
              </desc>
              {[-1, 0, 1, 2, 3, 4, 5, 6].map((tick) => {
                const y = 292 - ((tick + 1) / 7) * 250;
                return (
                  <g key={tick}>
                    <line
                      x1="58"
                      x2="590"
                      y1={y}
                      y2={y}
                      className={tick === 0 ? "plot-zero" : "plot-grid"}
                    />
                    <text x="44" y={y + 5} textAnchor="end">
                      {tick}
                    </text>
                  </g>
                );
              })}
              {[0, 1000, 2000, 3000, 4000, 5000].map((tick) => {
                const x = 58 + (tick / 5000) * 532;
                return (
                  <g key={tick}>
                    <line
                      x1={x}
                      x2={x}
                      y1="42"
                      y2="292"
                      className="plot-grid"
                    />
                    <text x={x} y="315" textAnchor="middle">
                      {tick.toLocaleString("en-US")}
                    </text>
                  </g>
                );
              })}
              <text x="320" y="345" textAnchor="middle">
                Images submitted
              </text>
              <text
                x="16"
                y="170"
                textAnchor="middle"
                transform="rotate(-90 16 170)"
              >
                Gain (pp)
              </text>
              {results.map((row) => {
                const index = contributionSamples.indexOf(row);
                return (
                  <circle
                    key={row.name}
                    cx={58 + (row.images / 5000) * 532}
                    cy={292 - ((row.gain + 1) / 7) * 250}
                    r={selected === index ? 9 : 6}
                    className={
                      selected === index
                        ? "plot-selected"
                        : row.gain > 0
                          ? "plot-positive"
                          : "plot-neutral"
                    }
                    tabIndex={0}
                    role="button"
                    aria-label={`Inspect ${row.name}, ${row.gain} percentage point gain`}
                    aria-pressed={selected === index}
                    onClick={() => setSelected(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelected(index);
                      }
                    }}
                  >
                    <title>
                      {row.name}: {row.dataset} · {row.gain} pp
                    </title>
                  </circle>
                );
              })}
            </svg>
            <p className="text-muted-foreground">
              Select a point to inspect its dataset. Gains are relative to the
              same baseline.
            </p>
          </div>
          <aside className="impact-inspector">
            <span className="eyebrow">Selected dataset</span>
            <h3 className="font-semibold">{current.dataset}</h3>
            <p className="text-muted-foreground">Curated by {current.name}</p>
            <dl>
              <div>
                <dt>Images</dt>
                <dd>{current.images.toLocaleString("en-US")}</dd>
              </div>
              <div>
                <dt>Baseline</dt>
                <dd>{(challenge.baseline * 100).toFixed(1)}%</dd>
              </div>
              <div>
                <dt>Evaluated</dt>
                <dd>{(challenge.baseline * 100 + current.gain).toFixed(1)}%</dd>
              </div>
              <div>
                <dt>Improvement</dt>
                <dd className={current.gain > 0 ? "text-success" : ""}>
                  {current.gain > 0 ? "+" : ""}
                  {current.gain} pp
                </dd>
              </div>
              <div>
                <dt>Est. reward</dt>
                <dd>
                  {((challenge.pool * current.share) / 100).toFixed(2)} SOL
                </dd>
              </div>
              <div>
                <dt>Refundable stake</dt>
                <dd>{challenge.stake.toFixed(2)} SOL</dd>
              </div>
            </dl>
          </aside>
        </div>
      )}
      <p className="result-footnote">
        Illustrative proportional scoring. Final attribution must follow the
        published evaluation protocol. Zero or negative gain earns no reward;
        the entry stake is still returned at settlement.
      </p>
    </section>
  );
}
