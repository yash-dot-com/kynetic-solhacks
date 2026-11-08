export type BountyCategory = "LLMs" | "VLMs" | "Robot Perception";
export type Bounty = {
  id: string;
  title: string;
  category: BountyCategory;
  host: string;
  initials: string;
  description: string;
  model: string;
  metric: string;
  baseline: number;
  target: number;
  pool: number;
  stake: number;
  contributors: number;
  deadline: string;
  format: string;
};

// Seeded showcase records, independent of live wallet balances or escrow accounts.
// Hosts are fictional personas and teams; no company endorsement is implied.
export const bountyCategories: BountyCategory[] = [
  "LLMs",
  "VLMs",
  "Robot Perception",
];
export const bounties: Bounty[] = [
  {
    id: "KY-101",
    category: "LLMs",
    title: "Follow multi-step instructions",
    host: "Maya Chen",
    initials: "MC",
    description:
      "Curate examples that help a small language model follow every step, in order.",
    model: "Llama 3.2 · 3B",
    metric: "Instruction accuracy",
    baseline: 68,
    target: 85,
    pool: 24,
    stake: 0.1,
    contributors: 18,
    deadline: "Nov 18",
    format: "JSONL · instruction, input, output",
  },
  {
    id: "KY-102",
    category: "LLMs",
    title: "Keep answers grounded in sources",
    host: "Groundwork Research",
    initials: "GR",
    description:
      "Build question–answer pairs with citations, including when the answer is missing.",
    model: "Qwen2.5 · 7B",
    metric: "Grounded answer accuracy",
    baseline: 72,
    target: 88,
    pool: 36,
    stake: 0.15,
    contributors: 26,
    deadline: "Nov 22",
    format: "JSONL · context, question, answer, citations",
  },
  {
    id: "KY-103",
    category: "LLMs",
    title: "Find the right contract clauses",
    host: "Ishan Rao",
    initials: "IR",
    description:
      "Label obligations, renewal dates, and termination clauses in difficult legal text.",
    model: "Mistral · 7B",
    metric: "Extraction F1",
    baseline: 71,
    target: 87,
    pool: 18,
    stake: 0.05,
    contributors: 12,
    deadline: "Nov 25",
    format: "JSONL · text and span annotations",
  },
  {
    id: "KY-201",
    category: "VLMs",
    title: "Read charts with tiny labels",
    host: "Plotline Labs",
    initials: "PL",
    description:
      "Pair charts with precise questions about legends, axes, and closely spaced values.",
    model: "Qwen2.5-VL · 3B",
    metric: "Chart question accuracy",
    baseline: 62,
    target: 80,
    pool: 30,
    stake: 0.1,
    contributors: 21,
    deadline: "Nov 20",
    format: "Images + JSONL question–answer pairs",
  },
  {
    id: "KY-202",
    category: "VLMs",
    title: "Understand complex page layouts",
    host: "Noor Ahmed",
    initials: "NA",
    description:
      "Collect document pages with nested tables, footnotes, and multiple reading orders.",
    model: "SmolVLM · 2B",
    metric: "Document question accuracy",
    baseline: 65,
    target: 82,
    pool: 22,
    stake: 0.1,
    contributors: 14,
    deadline: "Nov 24",
    format: "Page images + region and text annotations",
  },
  {
    id: "KY-203",
    category: "VLMs",
    title: "Count objects in crowded scenes",
    host: "Scene Study",
    initials: "SS",
    description:
      "Annotate small, overlapping objects that vision-language models tend to miss.",
    model: "Qwen2-VL · 7B",
    metric: "Exact count accuracy",
    baseline: 57,
    target: 76,
    pool: 28,
    stake: 0.1,
    contributors: 17,
    deadline: "Nov 28",
    format: "Images + object counts and point labels",
  },
  {
    id: "KY-301",
    category: "Robot Perception",
    title: "Detect reflective objects reliably",
    host: "Fieldwork Robotics",
    initials: "FR",
    description:
      "Capture metal tools and shiny objects across changing light and viewing angles.",
    model: "YOLO11 · small",
    metric: "mAP@0.5",
    baseline: 61,
    target: 80,
    pool: 12,
    stake: 0.1,
    contributors: 32,
    deadline: "Nov 17",
    format: "Images + COCO bounding-box annotations",
  },
  {
    id: "KY-302",
    category: "Robot Perception",
    title: "See parts in low-light bins",
    host: "Alex Morgan",
    initials: "AM",
    description:
      "Label small parts in dim bins, deep shadows, and uneven warehouse lighting.",
    model: "YOLO11 · nano",
    metric: "mAP@0.5",
    baseline: 54,
    target: 75,
    pool: 20,
    stake: 0.05,
    contributors: 16,
    deadline: "Nov 21",
    format: "Low-light images + COCO annotations",
  },
  {
    id: "KY-303",
    category: "Robot Perception",
    title: "Recognize unexpected aisle obstacles",
    host: "Aisle Research",
    initials: "AR",
    description:
      "Collect scenes of carts, loose packaging, and people blocking a robot’s path.",
    model: "SegFormer · B0",
    metric: "Obstacle segmentation IoU",
    baseline: 64,
    target: 82,
    pool: 40,
    stake: 0.15,
    contributors: 24,
    deadline: "Nov 26",
    format: "RGB images + semantic segmentation masks",
  },
];
