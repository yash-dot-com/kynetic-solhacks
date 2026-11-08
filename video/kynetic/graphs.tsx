import { Img, staticFile, interpolate, useCurrentFrame } from "remotion";
import { Ground, Kinetic, GROUND, ease, smooth, travel } from "./motion";
import { C, DATASETS } from "./theme";
import {
  clamp,
  FooterNote,
  Frame,
  Heading,
  inStyle,
  progress,
} from "./primitives";

const X = 160,
  Y = 365,
  W = 1260,
  H = 470;
const yAt = (score: number) => Y + H - ((score - 50) / 35) * H;
const xAt = (checkpoint: number) => X + (checkpoint / 4) * W;

export function Flatline() {
  const f = useCurrentFrame();
  const p = progress(f, 12, 56);
  return (
    <Frame label="The volume problem">
      <Heading>But does the model improve?</Heading>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 340,
          width: 1700,
          height: 530,
        }}
      >
        <div style={{ fontSize: 24, color: C.muted }}>MODEL PERFORMANCE</div>
        <svg width="1700" height="440" style={{ marginTop: 20 }}>
          {[80, 180, 280, 380].map((y) => (
            <line
              key={y}
              x1="10"
              x2="1680"
              y1={y}
              y2={y}
              stroke={C.grid}
              strokeDasharray="6 8"
            />
          ))}
          <path
            d="M10 300 C350 300 440 298 600 297 S1100 293 1680 288"
            fill="none"
            stroke={C.ink}
            strokeWidth="7"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - p}
          />
          <circle cx={10 + 1670 * p} cy={300 - 12 * p} r="9" fill={C.ink} />
        </svg>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 29,
            color: C.muted,
          }}
        >
          <span>More data purchased</span>
          <span style={{ color: C.coral, ...inStyle(f, 30) }}>
            Almost no improvement.
          </span>
        </div>
      </div>
    </Frame>
  );
}

// Synchronous checkpoint progression: every contributor advances on the same clock.
export function PerformanceGraph() {
  const f = useCurrentFrame();
  const t = interpolate(f, [34, 226], [0, 4], clamp);
  const segment = Math.min(3, Math.floor(t));
  const local = t >= 4 ? 1 : smooth(t, segment, 1);
  const u = local;
  const curveX =
    3 * (1 - u) ** 2 * u * 0.45 + 3 * (1 - u) * u * u * 0.55 + u * u * u;
  const curveY = 3 * u * u - 2 * u * u * u;
  const checkpoint = segment + curveX;
  const gx = 180,
    gy = 360,
    gw = 1170,
    gh = 470;
  const px = (v: number) => gx + (v / 4) * gw;
  const py = (v: number) => gy + gh - ((v - 55) / 30) * gh;
  const reveal = ease(f, 8, 30);
  return (
    <Ground>
      <Kinetic
        text="Same model. Different datasets."
        top={128}
        size={108}
        style={{
          fontFamily: "Instrument Serif",
          fontWeight: 400,
          letterSpacing: "-.025em",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 259,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 28,
          color: "#526385",
          ...travel(f, 12, 30),
        }}
      >
        One baseline. One benchmark. Four curated datasets.
      </div>
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <clipPath id="dataset-reveal">
            <rect
              x={gx - 12}
              y={gy - 30}
              width={px(checkpoint) - gx + 14}
              height={gh + 60}
            />
          </clipPath>
        </defs>
        <g opacity={reveal}>
          <text x={gx} y={gy - 30} fontSize="23" fill="#526385">
            Benchmark score (%)
          </text>
          {[55, 60, 70, 80, 85].map((v) => (
            <g key={v}>
              <line
                x1={gx}
                x2={gx + gw}
                y1={py(v)}
                y2={py(v)}
                stroke="#8fa3c6"
                strokeDasharray="3 9"
                opacity=".55"
              />
              <text
                x={gx - 30}
                y={py(v) + 8}
                textAnchor="end"
                fontSize="24"
                fill="#526385"
              >
                {v}
              </text>
            </g>
          ))}
          {[0, 1, 2, 3, 4].map((v) => (
            <g key={v}>
              <line
                x1={px(v)}
                x2={px(v)}
                y1={gy}
                y2={gy + gh}
                stroke="#8fa3c6"
                strokeDasharray="3 9"
                opacity=".35"
              />
              <text
                x={px(v)}
                y={gy + gh + 48}
                textAnchor="middle"
                fontSize="23"
                fill="#526385"
              >
                {v === 0 ? "Baseline" : `Checkpoint ${v}`}
              </text>
            </g>
          ))}
          <line
            x1={gx}
            x2={gx + gw}
            y1={py(61)}
            y2={py(61)}
            stroke="#607493"
            strokeDasharray="9 9"
            opacity=".7"
          />
          <text x={gx + 12} y={py(61) + 34} fontSize="23" fill="#526385">
            61% baseline
          </text>
        </g>
        <line
          x1={px(checkpoint)}
          x2={px(checkpoint)}
          y1={gy}
          y2={gy + gh}
          stroke="#526385"
          opacity={t > 0 && t < 4 ? 0.2 : 0}
        />
        {DATASETS.map((d, i) => {
          const value =
            d.points[segment] +
            (d.points[segment + 1] - d.points[segment]) * curveY;
          const cy = py(value),
            cx = px(checkpoint);
          const path = d.points.slice(1).reduce(
            (path, v, j) => {
              const x0 = px(j),
                x1 = px(j + 1),
                y0 = py(d.points[j]),
                y1 = py(v);
              return (
                path +
                ` C${x0 + (x1 - x0) * 0.45} ${y0},${x1 - (x1 - x0) * 0.45} ${y1},${x1} ${y1}`
              );
            },
            `M${gx} ${py(61)}`
          );
          const row = 386 + i * 112;
          const settle = ease(f, 227, 26);
          return (
            <g key={d.creator}>
              <g clipPath="url(#dataset-reveal)">
                <path
                  d={path}
                  fill="none"
                  stroke={d.color}
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                {d.points.map((v, j) => (
                  <circle
                    key={j}
                    cx={px(j)}
                    cy={py(v)}
                    r={4 + 3 * ease(checkpoint, j - 0.06, 0.18)}
                    fill={d.color}
                    stroke={GROUND}
                    strokeWidth="3"
                    opacity={ease(checkpoint, j - 0.04, 0.1)}
                  />
                ))}
              </g>
              <circle
                cx={cx}
                cy={cy}
                r={18}
                fill={d.color}
                opacity={t > 0 && t < 4 ? 0.12 : 0}
              />
              <circle
                cx={cx}
                cy={cy}
                r={8}
                fill={d.color}
                stroke={GROUND}
                strokeWidth="3"
                opacity={reveal}
              />
              <path
                d={`M${gx + gw + 15} ${py(d.score)} C1405 ${py(d.score)},1390 ${row + 17},1440 ${row + 17}`}
                stroke={d.color}
                fill="none"
                strokeWidth="1.5"
                opacity={settle * 0.7}
              />
              <g opacity={ease(f, 18 + i * 3, 20)}>
                <circle cx="1460" cy={row + 15} r="6" fill={d.color} />
                <text
                  x="1482"
                  y={row + 25}
                  fontSize="31"
                  fontWeight="500"
                  fill={C.ink}
                >
                  {d.creator}
                </text>
                <text
                  x="1760"
                  y={row + 25}
                  fontSize="37"
                  textAnchor="end"
                  fontWeight="500"
                  fill={C.ink}
                >
                  {Math.round(value)}%
                </text>
                <text x="1482" y={row + 64} fontSize="23" fill="#526385">
                  {d.gain
                    ? `+${Math.round(value - 61)} percentage points`
                    : "No measured gain"}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 180,
          right: 100,
          top: 960,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          ...travel(f, 18, 25),
        }}
      >
        {DATASETS.map((d) => (
          <span
            key={d.creator}
            style={{ display: "flex", gap: 12, alignItems: "center" }}
          >
            <i
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                background: d.color,
              }}
            />
            {d.name}
          </span>
        ))}
      </div>
    </Ground>
  );
}

export function Leaderboard() {
  const f = useCurrentFrame();
  const pay = ease(f, 20, 80);
  return (
    <Ground>
      <Kinetic
        text="More impact. More reward."
        top={128}
        size={120}
        style={{
          fontFamily: "Instrument Serif",
          fontWeight: 400,
          letterSpacing: "-.025em",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 275,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          fontSize: 31,
          ...travel(f, 10, 35),
        }}
      >
        <Img
          src={staticFile("video/assets/solana-mark.svg")}
          style={{ width: 37, height: 32 }}
        />
        <span>12 SOL bounty</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1130,
          top: 365,
          fontSize: 24,
          color: "#526385",
        }}
      >
        Model gain
      </div>
      <div
        style={{
          position: "absolute",
          left: 1510,
          top: 365,
          fontSize: 24,
          color: "#526385",
        }}
      >
        Your reward
      </div>
      {DATASETS.map((d, i) => {
        const p = pay;
        const y = 437 + i * 124;
        const length = (d.gain / 18) * 720 * p;
        return (
          <div key={d.creator}>
            <div
              style={{
                position: "absolute",
                left: 200,
                top: y + 8,
                width: 170,
                fontSize: 34,
                fontWeight: 500,
                ...travel(f, 10 + i * 4, 30),
              }}
            >
              {d.creator}
            </div>
            <div
              style={{
                position: "absolute",
                left: 400,
                top: y,
                width: 720,
                height: 52,
                borderRadius: 5,
                background: "#ffffff25",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: length,
                  height: "100%",
                  background: d.color,
                  borderRadius: 5,
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: 1160,
                top: y + 8,
                fontSize: 31,
                fontVariantNumeric: "tabular-nums",
                ...travel(f, 35, 25),
              }}
            >
              +{Math.round(d.gain * p)} pp
            </div>
            <div
              style={{
                position: "absolute",
                left: 1500,
                top: y + 5,
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: ease(f, 14, 16),
                transform: `translateX(${(1 - ease(f, 14, 20)) * 28}px)`,
                filter: "none",
              }}
            >
              <Img
                src={staticFile("video/assets/solana-mark.svg")}
                style={{ width: 34, height: 29 }}
              />
              <span
                style={{
                  fontSize: 37,
                  fontWeight: 500,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {(d.reward * pay).toFixed(pay < 0.999 ? 1 : 0)} SOL
              </span>
            </div>
          </div>
        );
      })}
    </Ground>
  );
}
