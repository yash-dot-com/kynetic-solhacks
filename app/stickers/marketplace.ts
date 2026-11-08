import { VIEWS, rect, ellipse, line, poly } from "./fun";
import { float, jolt, slide, shackle, erase, glint, twinkle } from "./motions";
import type { Icon, Layer, Vec } from "./fun";
const { tilt } = VIEWS.right;
const base = {
  frames: 180,
  still: 120,
  line: 3,
  ink: "#293246" as const,
  extrude: [-4, 12] as const,
};
const body = (shapes: Layer["shapes"], motion = false): Layer => ({
  id: "body",
  p: [250, 250],
  tilt,
  ...(motion ? { m: { ...float, k: 0.5 } } : {}),
  shapes,
});
const chip = (x: number, y: number): Layer["shapes"] => [
  { d: ellipse(x, y, 24, 17), fill: "white", depth: 0.5, side: "tint" },
  { d: ellipse(x, y, 13, 9), fill: "deep", line: false },
];
// Reveal colored routes through a moving mask, using the kit's line-reveal keys.
function trace(
  id: string,
  points: readonly Vec[],
  fill: "hot" | "deep",
  delay: number
): Layer[] {
  return [
    {
      id,
      parent: "body",
      p: [-150, -150],
      m: {
        s: erase(0, delay).map(
          ([t, value, ease]) => [t, [value * 100, 100], ease] as const
        ),
      },
      shapes: [{ d: rect(0, 0, 300, 300), line: false }],
    },
    {
      parent: "body",
      clip: id,
      shapes: points.slice(1).map((point, i) => {
        const start = points[i];
        const dx = point[0] - start[0];
        const dy = point[1] - start[1];
        const length = Math.hypot(dx, dy);
        const x = (-dy / length) * 2.5;
        const y = (dx / length) * 2.5;
        return {
          d: poly([
            [start[0] + x, start[1] + y],
            [point[0] + x, point[1] + y],
            [point[0] - x, point[1] - y],
            [start[0] - x, start[1] - y],
          ]),
          fill,
          line: false,
        };
      }),
    },
  ];
}

export const vault: Icon = {
  ...base,
  name: "vault",
  layers: [
    body([
      {
        d: rect(-111, -90, 222, 187, 16),
        fill: "white",
        depth: 1,
        side: "tint",
      },
      { d: rect(-85, -65, 170, 137, 11), fill: "paper", depth: 0.2 },
      { d: rect(-59, -96, 118, 13, 3), fill: "ink", depth: 0.1 },
    ]),
    {
      parent: "body",
      p: [0, 0],
      a: [0, 0],
      m: { ...shackle, k: 0.45 },
      shapes: [
        { d: ellipse(0, 0, 43, 43), fill: "deep", depth: 0.5 },
        { d: ellipse(0, 0, 24, 24), fill: "white", depth: 0.2 },
        { d: line([-15, 0], [15, 0]) },
        { d: line([0, -15], [0, 15]) },
      ],
    },
    { parent: "body", m: slide([0, 37], 8, 35, 32), shapes: chip(0, -124) },
    { parent: "body", shapes: [...chip(-125, 107), ...chip(-78, 125)] },
  ],
};
export const dataset: Icon = {
  ...base,
  name: "dataset",
  layers: [
    body([
      {
        d: rect(-113, -64, 226, 167, 12),
        fill: "white",
        depth: 0.6,
        side: "tint",
      },
    ]),
    ...[0, 1, 2].map((i): Layer => ({
      parent: "body",
      m: { ...jolt([0, -14 - i * 4]), at: i * 7, k: 0.5 },
      shapes: [
        {
          d: rect(-102 + i * 9, -87 - i * 28, 202, 148, 10),
          fill: i === 2 ? "white" : "tint",
          depth: 0.5,
        },
        {
          d: rect(-82 + i * 9, -66 - i * 28, 73, 57, 5),
          fill: i === 2 ? "deep" : "main",
          depth: 0.2,
        },
        { d: line([8 + i * 9, -49 - i * 28], [76 + i * 9, -49 - i * 28]) },
        { d: line([8 + i * 9, -24 - i * 28], [58 + i * 9, -24 - i * 28]) },
      ],
    })),
    {
      parent: "body",
      m: { ...jolt([0, -10]), at: 10, k: 0.3 },
      shapes: [
        { d: rect(72, 0, 53, 58, 7), fill: "main", depth: 0.4 },
        { d: line([84, 27], [99, 12], [114, 27]) },
        { d: line([99, 12], [99, 45]) },
      ],
    },
  ],
};
export const improvement: Icon = {
  ...base,
  name: "improvement",
  ink: "#6347b7",
  layers: [
    body([
      {
        d: rect(-132, -106, 264, 212, 15),
        fill: "white",
        depth: 0.7,
        side: "tint",
      },
      { d: line([-101, -65], [-101, 70], [106, 70]) },
    ]),
    {
      parent: "body",
      shapes: [
        {
          d: line([-100, 48], [-52, 31], [-13, 35], [38, -13], [93, -59]),
          fill: undefined,
          line: 5,
          trim: erase(0, 24),
        },
      ],
    },
    {
      parent: "body",
      p: [93, -59],
      m: glint(28, 100),
      shapes: [{ d: ellipse(0, 0, 13, 13), fill: "deep", line: false }],
    },
    {
      parent: "body",
      shapes: [
        { d: rect(-65, -88, 88, 35, 6), fill: "tint", depth: 0.2 },
        {
          d: "M-53 -70H-39M-46 -77V-63M-29 -76L-24 -79V-62M-9 -79C-23 -79 -23 -68 -9 -68C5 -68 5 -57 -9 -57C-23 -57 -23 -68 -9 -68C5 -68 5 -79 -9 -79M10 -61L24 -79M12 -78L14 -78M21 -62L23 -62",
          line: 2,
        },
      ],
    },
  ],
};
export const rover: Icon = {
  ...base,
  name: "rover",
  layers: [
    body([], true),
    ...[
      [-89, 42],
      [-27, 75],
      [56, 42],
      [111, 15],
    ].map(([x, y], i): Layer => ({
      parent: "body",
      m: { ...jolt([3, 0]), at: i * 6, k: 0.3 },
      shapes: [
        {
          d: poly([
            [x, y],
            [x + 19, y + 2],
            [x + 10, y + 71],
            [x - 9, y + 68],
          ]),
          fill: "white",
          depth: 0.5,
          side: "tint",
        },
        { d: rect(x - 16, y + 68, 38, 16, 5), fill: "ink", depth: 0.3 },
      ],
    })),
    {
      parent: "body",
      shapes: [
        {
          d: rect(-113, -47, 231, 110, 24),
          fill: "white",
          depth: 1,
          side: "tint",
        },
        { d: rect(-84, -24, 124, 64, 12), fill: "paper", depth: 0.2 },
        { d: rect(63, -31, 63, 66, 12), fill: "ink", depth: 0.5 },
        { d: ellipse(104, -1, 9, 12), fill: "main", line: false },
        { d: rect(-47, -68, 75, 21, 6), fill: "deep", depth: 0.4 },
      ],
    },
    {
      parent: "body",
      p: [104, -1],
      m: glint(10, 75),
      shapes: [{ d: ellipse(0, 0, 11, 13), fill: "ok", line: false }],
    },
  ],
};
export const cloudHarness: Icon = {
  ...base,
  name: "cloudHarness",
  layers: [
    body([
      {
        d: rect(-139, 21, 124, 70, 10),
        fill: "white",
        depth: 0.8,
        side: "tint",
      },
      { d: line([-119, 44], [-65, 44]) },
      { d: ellipse(-39, 45, 5, 5), fill: "deep", line: false },
      { d: line([-15, 65], [23, 65], [23, -5], [44, -5]), line: 3 },
    ]),
    {
      parent: "body",
      shapes: [
        {
          d: "M-127 -8C-166 -8 -166 -54 -131 -59C-134 -103 -78 -117 -58 -79C-26 -103 9 -78 3 -47C35 -34 21 1 -9 1L-127 1Z",
          fill: "white",
          depth: 0.5,
          side: "tint",
        },
      ],
    },
    {
      parent: "body",
      shapes: [
        {
          d: rect(41, -66, 109, 107, 9),
          fill: "white",
          depth: 0.6,
          side: "tint",
        },
        { d: rect(55, -51, 80, 71, 4), fill: "tint", depth: 0.1 },
        { d: line([65, 4], [82, -12], [99, -5], [124, -34]), line: 4 },
        { d: rect(76, 48, 58, 12, 3), fill: "deep", depth: 0.2 },
      ],
    },
    {
      parent: "body",
      m: slide([58, -70], 5, 20, 40),
      shapes: [{ d: ellipse(-15, 65, 7, 7), fill: "deep", line: false }],
    },
  ],
};
export const payout: Icon = {
  ...base,
  name: "payout",
  layers: [
    body([
      { d: line([0, -17], [0, 22], [-104, 88]) },
      { d: line([0, 22], [0, 111]) },
      { d: line([0, 22], [104, 88]) },
      { d: ellipse(0, -53, 51, 34), fill: "white", depth: 0.8, side: "tint" },
      { d: ellipse(0, -67, 51, 34), fill: "white", depth: 0.5 },
      { d: ellipse(0, -81, 51, 34), fill: "deep", depth: 0.5 },
    ]),
    ...[
      [-104, 99],
      [0, 127],
      [104, 99],
    ].map(([x, y], i): Layer => ({
      parent: "body",
      m: { ...jolt([0, -5]), at: 15 + i * 12, k: 0.3 },
      shapes: [
        {
          d: rect(x - 37, y - 24, 74, 51, 8),
          fill: "white",
          depth: 0.5,
          side: "tint",
        },
        { d: rect(x + 9, y - 7, 26, 19, 3), fill: "tint", depth: 0.2 },
        { d: ellipse(x + 21, y + 2, 3, 3), fill: "deep", line: false },
      ],
    })),
    ...[
      [-104, 88],
      [0, 111],
      [104, 88],
    ].map(([x, y], i): Layer => ({
      parent: "body",
      m: slide([x, y - 22], i * 13, 10, 35),
      shapes: [{ d: ellipse(0, 22, 6, 6), fill: "deep", line: false }],
    })),
  ],
};
export const failure: Icon = {
  ...base,
  name: "failure",
  layers: [
    body([
      {
        d: rect(-132, -110, 264, 220, 13),
        fill: "white",
        depth: 0.6,
        side: "tint",
      },
      ...[-65, 0, 65].map((x) => ({ d: line([x, -90], [x, 90]), line: 1 })),
      ...[-45, 20].map((y) => ({ d: line([-110, y], [110, y]), line: 1 })),
      { d: rect(-13, -15, 43, 43, 5), fill: "tint", depth: 0.35 },
    ]),
    ...trace(
      "failed-route",
      [
        [-99, 74],
        [-71, 53],
        [-37, 53],
        [-21, 22],
        [6, 7],
      ],
      "hot",
      14
    ),
    ...trace(
      "corrected-route",
      [
        [-99, 74],
        [-71, 22],
        [-71, -66],
        [77, -66],
        [94, -86],
      ],
      "deep",
      39
    ),
    {
      parent: "body",
      shapes: [
        { d: ellipse(-99, 74, 8, 8), fill: "main", line: false },
        { d: ellipse(94, -86, 10, 10), fill: "deep", line: false },
        { d: line([-5, -5], [9, 9]), line: 3 },
        { d: line([9, -5], [-5, 9]), line: 3 },
      ],
    },
  ],
};
export const score: Icon = {
  ...base,
  name: "score",
  layers: [
    body([
      {
        d: rect(-123, -111, 246, 222, 13),
        fill: "white",
        depth: 0.7,
        side: "tint",
      },
    ]),
    ...[-65, -7, 51].map((y, i): Layer => ({
      parent: "body",
      m: { ...jolt([5, 0]), at: i * 7, k: 0.25 },
      shapes: [
        { d: ellipse(-83, y, 15, 15), fill: "tint", depth: 0.2 },
        { d: rect(-52, y - 13, 139, 27, 5), fill: "paper", depth: 0.2 },
        {
          d: rect(-48, y - 9, 112 - i * 28, 19, 4),
          fill: i === 0 ? "deep" : "main",
          depth: 0.2,
        },
      ],
    })),
    {
      parent: "body",
      p: [102, -94],

      shapes: [
        { d: ellipse(0, 0, 25, 25), fill: "white", depth: 0.4 },
        { d: line([-12, 0], [-3, 9], [13, -10]), line: 4 },
      ],
    },
  ],
};
