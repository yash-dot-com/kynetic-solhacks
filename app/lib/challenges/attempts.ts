import type { Bounty } from "./bounties";

export type CuratorAttempt = {
  id: string;
  curator: string;
  initials: string;
  dataset: string;
  version: number;
  rows: number;
  status: "Evaluated" | "Training" | "Queued";
  score: number | null;
  gain: number | null;
  error: number | null;
  reward: number;
  share: number;
  submitted: string;
};
const curators = [
  "Mira Shah",
  "Dev Patel",
  "Lin Wei",
  "Anya Brooks",
  "Omar Hassan",
  "Niko Park",
  "Sofia Reyes",
  "Arjun Mehta",
  "Elena Rossi",
  "Sam Okafor",
  "Yuki Tanaka",
  "Ada Wilson",
];
const datasets: Record<string, string[]> = {
  "KY-101": [
    "Nested instructions",
    "Constraint-following pairs",
    "Ordered task breakdowns",
    "Long-context instructions",
  ],
  "KY-102": [
    "Evidence-backed answers",
    "Missing-answer negatives",
    "Citation alignment",
    "Conflicting source passages",
  ],
  "KY-103": [
    "Termination clauses",
    "Renewal edge cases",
    "Obligation spans",
    "Cross-reference contracts",
  ],
  "KY-201": [
    "Dense chart legends",
    "Small axis labels",
    "Overlapping series",
    "Multi-panel figures",
  ],
  "KY-202": [
    "Nested financial tables",
    "Two-column reading order",
    "Footnote links",
    "Mixed page layouts",
  ],
  "KY-203": [
    "Occluded object counts",
    "Small crowded objects",
    "Repeated patterns",
    "Dense shelf scenes",
  ],
  "KY-301": [
    "Reflective tools · multi-angle",
    "Glare and specular edges",
    "Metal under mixed lighting",
    "Transparent and shiny negatives",
  ],
  "KY-302": [
    "Dark-bin small parts",
    "Shadowed fasteners",
    "Low-exposure picking scenes",
    "Uneven warehouse lighting",
  ],
  "KY-303": [
    "Blocked aisle scenes",
    "Moving carts and people",
    "Loose packaging obstacles",
    "Unseen warehouse layouts",
  ],
};

// Deterministic showcase submissions; never sourced from wallet activity or chain events.
export function getAttempts(bounty: Bounty): CuratorAttempt[] {
  const gains = [12.4, 9.1, 6.3, 4.7, 3.2, 1.8, 0.6, 0, -1.1];
  const total = gains.reduce((sum, gain) => sum + Math.max(0, gain), 0);
  return curators.map((curator, i) => {
    const gain = gains[i] ?? null;
    const status: CuratorAttempt["status"] =
      i < 9 ? "Evaluated" : i === 9 ? "Training" : "Queued";
    const share = gain !== null ? Math.max(0, gain) / total : 0;
    return {
      id: `${bounty.id}-S${String(i + 1).padStart(3, "0")}`,
      curator,
      initials: curator
        .split(" ")
        .map((name) => name[0])
        .join(""),
      dataset: (datasets[bounty.id] ?? ["Targeted training examples"])[
        i % (datasets[bounty.id]?.length ?? 1)
      ],
      version: 1 + (i % 3),
      rows: [
        1240, 2180, 860, 3200, 1650, 2480, 980, 4400, 1920, 1400, 2680, 750,
      ][i],
      status,
      score: gain === null ? null : Number((bounty.baseline + gain).toFixed(1)),
      gain,
      error:
        gain === null
          ? null
          : Number(
              (Math.max(1.2, 100 - bounty.baseline - gain) * 0.63).toFixed(1)
            ),
      share: share * 100,
      reward: share * bounty.pool,
      submitted: [
        "Nov 8, 10:42",
        "Nov 8, 10:10",
        "Nov 8, 09:36",
        "Nov 8, 09:02",
        "Nov 7, 23:18",
        "Nov 7, 22:44",
        "Nov 7, 21:10",
        "Nov 7, 20:06",
        "Nov 7, 19:32",
        "Nov 8, 11:04",
        "Nov 8, 11:12",
        "Nov 8, 11:18",
      ][i],
    };
  });
}
export function attemptContext(bounty: Bounty) {
  if (bounty.category === "Robot Perception")
    return {
      samples: "Frames",
      error: bounty.id === "KY-303" ? "Sim collision rate" : "Sim failure rate",
      condition:
        bounty.id === "KY-302"
          ? "5–40 lux · 3 bin layouts"
          : bounty.id === "KY-303"
            ? "4 aisle layouts · moving obstacles"
            : "6 light setups · 12 camera angles",
      benchmark:
        bounty.id === "KY-303"
          ? "240 held-out aisle runs"
          : "300 held-out simulation episodes",
      secondary:
        bounty.id === "KY-303" ? "Obstacle miss rate" : "Localization error",
      secondaryUnit: bounty.id === "KY-303" ? "%" : "cm",
    };
  if (bounty.category === "VLMs")
    return {
      samples: "Images",
      error: "Visual error rate",
      condition: "Unseen images · fixed prompt set",
      benchmark: "800 held-out visual questions",
      secondary: "Answer rejection rate",
      secondaryUnit: "%",
    };
  return {
    samples: "Examples",
    error: "Task failure rate",
    condition: "Fixed prompts · no test-set overlap",
    benchmark: "1,000 held-out tasks",
    secondary: "Format violation rate",
    secondaryUnit: "%",
  };
}
