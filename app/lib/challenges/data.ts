export type Challenge = {
  id: string;
  slug: string;
  title: string;
  task: "Perception" | "Manipulation" | "Navigation";
  environment: "Real World" | "Simulation" | "Sim + Real";
  status: "Active" | "Review";
  description: string;
  overview: string;
  host: string;
  pool: number;
  stake: number;
  deadline: string;
  deadlineLabel: string;
  participants: number;
  baseline: number;
  target: number;
  metric: string;
  icon: "target" | "eye" | "navigation" | "plug" | "moon" | "door";
};

// Illustrative challenge records. No escrow accounts or transactions are implied.
export const challenges: Challenge[] = [
  {
    id: "CH-041",
    slug: "reach-elevated-targets",
    title: "Reach elevated targets",
    task: "Manipulation",
    environment: "Real World",
    status: "Active",
    description: "Improve arm reach and success rate for high-shelf objects.",
    overview:
      "Robotic arms struggle to localize objects on high shelves and plan stable reaches. Contribute annotated scenes with varied shelf heights, object positions, and camera angles to improve the host’s perception model.",
    host: "Aster Robotics",
    pool: 25,
    stake: 0.05,
    deadline: "2026-11-10",
    deadlineLabel: "Nov 10, 2026",
    participants: 86,
    baseline: 0.58,
    target: 0.78,
    metric: "Success rate",
    icon: "target",
  },
  {
    id: "CH-042",
    slug: "shiny-object-detection",
    title: "Improve detection of shiny objects",
    task: "Perception",
    environment: "Sim + Real",
    status: "Active",
    description:
      "Help robots detect reflective objects across changing light and angles.",
    overview:
      "Current perception models often miss or mislocalize reflective and shiny objects due to glare, specular highlights, and varying lighting conditions. The goal is to contribute high-quality, diverse data that helps the model generalize across real-world scenarios.",
    host: "Forma Robotics",
    pool: 12,
    stake: 0.1,
    deadline: "2026-11-17",
    deadlineLabel: "Nov 17, 2026",
    participants: 523,
    baseline: 0.61,
    target: 0.8,
    metric: "mAP@0.5",
    icon: "eye",
  },
  {
    id: "CH-043",
    slug: "warehouse-aisle-navigation",
    title: "Warehouse aisle navigation",
    task: "Navigation",
    environment: "Real World",
    status: "Active",
    description:
      "Improve end-to-end navigation in dynamic warehouse environments.",
    overview:
      "Moving carts, workers, and changing aisle layouts make warehouses difficult for mobile robots. Contribute labeled obstacle and scene data to help the host’s perception stack recognize safe paths and unexpected obstacles.",
    host: "Northline Labs",
    pool: 60,
    stake: 0.2,
    deadline: "2026-11-18",
    deadlineLabel: "Nov 18, 2026",
    participants: 142,
    baseline: 0.64,
    target: 0.82,
    metric: "Success rate",
    icon: "navigation",
  },
  {
    id: "CH-044",
    slug: "cable-insertion-precision",
    title: "Cable insertion precision",
    task: "Manipulation",
    environment: "Simulation",
    status: "Review",
    description:
      "Increase success rate for inserting cables into ports with tight tolerance.",
    overview:
      "Small connector geometry and partial occlusion cause perception errors during cable insertion. Submitted close-up datasets are now being evaluated against the challenge’s held-out connector benchmark.",
    host: "Aster Robotics",
    pool: 30,
    stake: 0.1,
    deadline: "2026-11-04",
    deadlineLabel: "Nov 4, 2026",
    participants: 74,
    baseline: 0.55,
    target: 0.77,
    metric: "Success rate",
    icon: "plug",
  },
  {
    id: "CH-045",
    slug: "low-light-bin-picking",
    title: "Low-light bin picking",
    task: "Perception",
    environment: "Real World",
    status: "Active",
    description:
      "Improve object detection and picking performance in low-light conditions.",
    overview:
      "Robots frequently miss small parts when bins are dimly lit or cast deep shadows. Contribute diverse low-light RGB scenes and bounding-box annotations to improve the host’s object detector.",
    host: "Forma Robotics",
    pool: 35,
    stake: 0.1,
    deadline: "2026-11-15",
    deadlineLabel: "Nov 15, 2026",
    participants: 118,
    baseline: 0.52,
    target: 0.75,
    metric: "mAP@0.5",
    icon: "moon",
  },
  {
    id: "CH-046",
    slug: "door-handle-grasping",
    title: "Door handle grasping",
    task: "Manipulation",
    environment: "Real World",
    status: "Review",
    description: "Improve grasping and turning of different door handle types.",
    overview:
      "Handle shape, reflectivity, and orientation affect grasp planning. The host is evaluating contributed annotated handle images against a fixed benchmark covering unfamiliar doors and viewpoints.",
    host: "Northline Labs",
    pool: 45,
    stake: 0.15,
    deadline: "2026-11-03",
    deadlineLabel: "Nov 3, 2026",
    participants: 63,
    baseline: 0.6,
    target: 0.81,
    metric: "Success rate",
    icon: "door",
  },
];

export function getChallenge(slug: string) {
  return challenges.find((challenge) => challenge.slug === slug);
}

export const contributionSamples = [
  {
    name: "Mira",
    dataset: "Reflective warehouse v3",
    images: 1200,
    gain: 4.8,
    share: 40,
  },
  {
    name: "Dev",
    dataset: "Metal parts, varied light",
    images: 2200,
    gain: 3.6,
    share: 30,
  },
  {
    name: "Lin",
    dataset: "Specular edge cases",
    images: 800,
    gain: 2.4,
    share: 20,
  },
  {
    name: "Anya",
    dataset: "Reflective occlusions",
    images: 3000,
    gain: 1.2,
    share: 10,
  },
  {
    name: "Omar",
    dataset: "Indoor metal samples",
    images: 4000,
    gain: 0,
    share: 0,
  },
  {
    name: "Niko",
    dataset: "Mixed reflections",
    images: 4800,
    gain: -0.3,
    share: 0,
  },
];

export const tabs = [
  "Overview",
  "Data",
  "Code",
  "Discussion",
  "Leaderboard",
  "Rules",
] as const;
export type ChallengeTab = (typeof tabs)[number];
