import { VIEWS, rect, line, ellipse, spark } from "./fun";
import { jolt, float, slide, sparkle } from "./motions";
import type { Icon, Layer } from "./fun";

const { tilt, extrude } = VIEWS.right;
const base = {
  frames: 180,
  still: 100,
  line: 5,
  ink: "#17253e" as const,
  extrude,
};
const shine = (parent: string): Layer => ({
  parent,
  p: [132, -112],
  m: sparkle(25),
  shapes: [{ d: spark(0, 0, 20), fill: "white" }],
});

// A chart rises on its own raised plot plate. The bars follow the body with a lag.
export const graph: Icon = {
  ...base,
  name: "graph",
  layers: [
    {
      id: "body",
      p: [250, 270],
      tilt,
      m: jolt([0, -8]),
      shapes: [
        {
          d: rect(-132, -108, 264, 216, 16),
          fill: "white",
          depth: 1,
          side: "tint",
        },
      ],
    },
    {
      parent: "body",
      shapes: [
        { d: rect(-112, -88, 224, 175, 8), fill: "tint", depth: 0.25 },
        { d: line([-86, -64], [-86, 63], [88, 63]) },
      ],
    },
    ...[
      [-60, 16, 47],
      [-8, -12, 75],
      [44, -51, 114],
    ].map(([x, y, h], i): Layer => ({
      parent: "body",
      m: { ...slide([0, -14 - i * 6], 5 + i * 8, 35, 40), k: 0.7 },
      shapes: [
        {
          d: rect(x, y, 30, h, 3),
          fill: i === 2 ? "deep" : "main",
          depth: 0.55,
        },
      ],
    })),
    shine("body"),
  ],
};

// A cloud floats above a three-part server stack; the upload chip follows through.
export const cloud: Icon = {
  ...base,
  name: "cloud",
  layers: [
    {
      id: "server",
      p: [250, 305],
      tilt,
      m: jolt([0, 6]),
      shapes: [
        { d: rect(-115, -24, 230, 61, 10), fill: "deep", depth: 1 },
        { d: rect(-115, 48, 230, 61, 10), fill: "white", depth: 1 },
        { d: line([-85, 5], [-25, 5]) },
        { d: line([-85, 77], [-25, 77]) },
        { d: ellipse(82, 5, 7, 7), fill: "white", line: false },
        { d: ellipse(82, 77, 7, 7), fill: "main", line: false },
      ],
    },
    {
      id: "cloud",
      p: [244, 193],
      tilt,
      m: float,
      shapes: [
        {
          d: "M-92 38C-145 38 -144 -29 -96 -35C-104 -100 -12 -119 14 -67C60 -104 112 -66 104 -24C154 -10 137 48 93 48L-92 48Z",
          fill: "white",
          depth: 0.8,
          side: "tint",
        },
      ],
    },
    {
      parent: "cloud",
      m: { ...jolt([0, -14]), at: 5, k: 0.6 },
      shapes: [
        { d: rect(-29, -30, 58, 63, 9), fill: "main", depth: 0.5 },
        { d: line([-15, 2], [0, -12], [15, 2]) },
        { d: line([0, -12], [0, 20]) },
      ],
    },
    shine("cloud"),
  ],
};

// A test harness checks a model chip, with three raised status plates.
export const harness: Icon = {
  ...base,
  name: "harness",
  layers: [
    {
      id: "body",
      p: [250, 260],
      tilt,
      m: jolt([-4, 8]),
      shapes: [
        {
          d: rect(-130, -112, 260, 224, 16),
          fill: "white",
          depth: 1,
          side: "tint",
        },
      ],
    },
    {
      parent: "body",
      shapes: [
        { d: rect(-106, -85, 94, 104, 10), fill: "main", depth: 0.6 },
        { d: rect(-86, -64, 54, 61, 5), fill: "tint", depth: 0.3 },
        { d: line([-69, -75], [-69, -90]) },
        { d: line([-49, -75], [-49, -90]) },
        { d: line([-69, 8], [-69, 27]) },
        { d: line([-49, 8], [-49, 27]) },
      ],
    },
    ...[-65, -8, 49].map((y, i): Layer => ({
      parent: "body",
      m: { ...jolt([8, 0]), at: 5 + i * 6, k: 0.7 },
      shapes: [
        {
          d: rect(13, y, 92, 37, 6),
          fill: i === 2 ? "tint" : "white",
          depth: 0.4,
        },
        { d: line([28, y + 18], [37, y + 26], [51, y + 10]) },
        { d: line([65, y + 18], [89, y + 18]) },
      ],
    })),
    {
      parent: "body",
      shapes: [{ d: rect(-105, 60, 84, 22, 5), fill: "deep", depth: 0.3 }],
    },
    shine("body"),
  ],
};

export const robot: Icon = {
  ...base,
  name: "robot",
  layers: [
    {
      id: "body",
      p: [250, 260],
      tilt,
      m: jolt([8, -4]),
      shapes: [
        {
          d: rect(-115, -84, 230, 168, 24),
          fill: "white",
          depth: 1,
          side: "tint",
        },
      ],
    },
    {
      parent: "body",
      shapes: [
        { d: rect(-88, -58, 176, 88, 17), fill: "deep", depth: 0.4 },
        { d: ellipse(-41, -16, 15, 20), fill: "white", line: false },
        { d: ellipse(41, -16, 15, 20), fill: "white", line: false },
        { d: line([-34, 58], [34, 58]) },
      ],
    },
    {
      parent: "body",
      m: { ...jolt([0, -12]), at: 5, k: 0.8 },
      shapes: [
        { d: rect(-16, -119, 32, 26, 5), fill: "main", depth: 0.5 },
        { d: ellipse(0, -141, 18, 18), fill: "main", depth: 0.4 },
      ],
    },
    {
      parent: "body",
      shapes: [
        { d: rect(-146, -29, 21, 68, 6), fill: "main", depth: 0.7 },
        { d: rect(125, -29, 21, 68, 6), fill: "main", depth: 0.7 },
      ],
    },
    shine("body"),
  ],
};
