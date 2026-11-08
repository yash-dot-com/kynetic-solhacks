import {
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ButtonPress } from "@/components/snap-cn/button-press";
import { Coin, Wordmark, clamp } from "./primitives";
import { C, DATASETS, FILM_THEME } from "./theme";
import { Ground, Kinetic, Lift, ease, smooth, travel } from "./motion";

const panel = {
  background: "#fafbfd",
  border: "1px solid #ffffffa0",
  borderRadius: 22,
  boxShadow: "0 28px 70px -30px #273c6850, 0 5px 16px -10px #273c6838",
};
function Mark({ size = 60 }: { size?: number }) {
  return (
    <Img
      src={staticFile("video/assets/solana-mark.svg")}
      style={{ width: size, height: size * 0.86, objectFit: "contain" }}
    />
  );
}
export function Opening() {
  const f = useCurrentFrame();
  const second = f >= 48;
  const p = ease(f, second ? 48 : 0, 26);
  return (
    <Ground>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 260,
          textAlign: "center",
          fontSize: 26,
          color: "#526385",
          ...travel(f, 3, 30),
        }}
      >
        THE DATA PROBLEM
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 365,
          textAlign: "center",
          fontSize: 110,
          letterSpacing: "-.06em",
          fontWeight: 500,
          filter: `blur(${(1 - p) * 12}px)`,
          transform: `translateY(${(1 - p) * 70}px)`,
          opacity: p,
        }}
        key={second ? "spending" : "data"}
      >
        {second ? "More spending." : "More data."}
      </div>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = ease(f, 8 + i * 3, 32);
        const fan = smooth(f, 78, 40);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 960 + (i - 2) * 245 - 106,
              top: 610 + Math.abs(i - 2) * 21,
              width: 212,
              height: 265,
              ...panel,
              overflow: "hidden",
              opacity: a * (1 - fan * 0.65),
              transform: `translateY(${(1 - a) * 180 + fan * 100}px) rotate(${(i - 2) * (3 + fan * 8)}deg) scale(${0.87 + a * 0.13 - fan * 0.16})`,
              filter: `blur(${(1 - a) * 8 + fan * 2}px)`,
            }}
          >
            <Img
              src={staticFile(`video/datasets/${i}.svg`)}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        );
      })}
    </Ground>
  );
}

export function Weakness() {
  const f = useCurrentFrame();
  const p = ease(f, 12, 60);
  return (
    <Ground>
      <Kinetic text="Better models?" at={0} top={315} size={105} />
      <svg
        width="840"
        height="220"
        viewBox="0 0 840 220"
        style={{
          position: "absolute",
          left: 540,
          top: 490,
          ...travel(f, 9, 70),
        }}
      >
        <line
          x1="0"
          x2="840"
          y1="160"
          y2="160"
          stroke="#8e9fbe"
          strokeDasharray="4 8"
        />
        <path
          d="M0 152 C140 154 190 145 280 148 S490 138 580 141 S720 135 840 137"
          fill="none"
          stroke={C.ink}
          strokeWidth="5"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - p}
        />
        <circle cx={840 * p} cy={152 - p * 15} r="8" fill={C.ink} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 775,
          textAlign: "center",
          fontSize: 50,
          letterSpacing: "-.04em",
          color: C.coral,
          ...travel(f, 30, 45),
        }}
      >
        Not always.
      </div>
    </Ground>
  );
}
export function PromiseScene() {
  const f = useCurrentFrame();
  const cut = smooth(f, 52, 24);
  return (
    <Ground>
      <Kinetic
        text="Pay for improvement."
        at={2}
        top={430}
        size={108}
        accent={2}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 600,
          textAlign: "center",
          fontSize: 32,
          color: "#526385",
          ...travel(f, 30, 45),
        }}
      >
        Reward the data that makes a difference.
      </div>
      <div
        style={{
          position: "absolute",
          left: 640,
          top: 567,
          width: 650 * cut,
          height: 3,
          background: C.blue,
          opacity: 0.45,
        }}
      />
    </Ground>
  );
}
export function BrandReveal() {
  const f = useCurrentFrame();
  const p = ease(f, 14, 34);
  return (
    <Ground>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 310,
          textAlign: "center",
          fontSize: 36,
          letterSpacing: "-.035em",
          ...travel(f, 0, 30),
        }}
      >
        Introducing
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 408,
          textAlign: "center",
          opacity: p,
          filter: `blur(${(1 - p) * 18}px)`,
          transform: `translateY(${(1 - p) * 80}px) scale(${0.94 + p * 0.06})`,
        }}
      >
        <Wordmark size={154} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 640,
          textAlign: "center",
          fontSize: 35,
          letterSpacing: "-.03em",
          color: "#526385",
          ...travel(f, 33, 45),
        }}
      >
        A marketplace for model improvement.
      </div>
    </Ground>
  );
}
export function SolanaScene() {
  const f = useCurrentFrame();
  const p = ease(f, 9, 33);
  const collapse = smooth(f, 88, 28);
  return (
    <Ground>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 353,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 36,
          ...travel(f, 4, 85),
        }}
      >
        <span
          style={{ fontSize: 90, letterSpacing: "-.055em", fontWeight: 500 }}
        >
          Built on
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <Mark size={108} />
          <span
            style={{ fontSize: 90, fontWeight: 600, letterSpacing: "-.055em" }}
          >
            Solana
          </span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 535,
          textAlign: "center",
          fontSize: 36,
          color: "#526385",
          ...travel(f, 30, 50),
        }}
      >
        Funded escrow. Transparent payouts.
      </div>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 960 + (i - 1) * 145 * (1 - collapse),
            top: 745 - collapse * 50,
            opacity: p,
            filter: `blur(${collapse * 2}px)`,
          }}
        >
          <Coin x={0} y={0} size={76} scale={1 - collapse * 0.13} />
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 874,
          textAlign: "center",
          fontSize: 26,
          color: "#526385",
          ...travel(f, 45, 30),
        }}
      >
        Low fees for many contributors. One visible settlement trail.
      </div>
    </Ground>
  );
}

export function FundScene() {
  const f = useCurrentFrame();
  return (
    <Ground>
      <Kinetic text="Fund a model weakness." at={0} top={175} size={78} />
      <Lift
        at={8}
        style={{
          position: "absolute",
          left: 490,
          top: 335,
          width: 940,
          height: 555,
          ...panel,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            padding: "28px 36px",
            borderBottom: "1px solid #e0e5ee",
          }}
        >
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: C.blue,
            }}
          />
          <span style={{ fontSize: 25, color: "#65718a" }}>
            CH-042 · ROBOT PERCEPTION
          </span>
        </div>
        <div style={{ padding: "33px 38px" }}>
          <div
            style={{ fontSize: 46, letterSpacing: "-.04em", fontWeight: 500 }}
          >
            Detect reflective objects.
          </div>
          <div style={{ marginTop: 18, fontSize: 27, color: "#65718a" }}>
            Baseline 61% · Targeted training data
          </div>
          <div
            style={{
              display: "flex",
              gap: 23,
              alignItems: "center",
              marginTop: 35,
            }}
          >
            <Mark size={50} />
            <span
              style={{
                fontSize: 52,
                fontWeight: 500,
                letterSpacing: "-.045em",
              }}
            >
              12 SOL
            </span>
            <span style={{ fontSize: 26, color: "#65718a" }}>
              bounty escrow
            </span>
          </div>
        </div>
        <Sequence width={940} height={720} style={{ top: 104, left: 0 }}>
          <ButtonPress
            label="Fund challenge"
            pending="Funding escrow"
            done="12 SOL escrowed"
            width={520}
            theme={{ ...FILM_THEME, background: "#ffffff00", primary: C.ink }}
            mode="light"
            speed={1.25}
          />
        </Sequence>
      </Lift>
    </Ground>
  );
}

export function TrainScene() {
  const f = useCurrentFrame();
  const stage = f < 43 ? 0 : f < 81 ? 1 : 2;
  const titles = ["Fine-tune.", "Evaluate.", "Measure the gain."];
  const progress = ease(f, 12, 65);
  const gain = ease(f, 82, 27);
  return (
    <Ground>
      <div
        key={stage}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 178,
          textAlign: "center",
          fontSize: 85,
          letterSpacing: "-.055em",
          fontWeight: 500,
          ...travel(f, [0, 43, 81][stage], 38),
        }}
      >
        {titles[stage]}
      </div>
      <Lift
        at={5}
        style={{
          position: "absolute",
          left: 545,
          top: 340,
          width: 830,
          height: 530,
          ...panel,
          padding: 38,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 25,
            color: "#65718a",
          }}
        >
          <span>PERCEPTION MODEL</span>
          <span>
            {stage === 0
              ? "Training"
              : stage === 1
                ? "Held-out benchmark"
                : "Evaluation complete"}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            marginTop: 45,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 10,
              width: 220,
            }}
          >
            {Array.from({ length: 16 }, (_, i) => {
              const a = ease(f, 12 + i * 2, 20);
              return (
                <div
                  key={i}
                  style={{
                    height: 42,
                    borderRadius: 4,
                    background: i / 16 < progress ? C.blue : "#dce4f1",
                    opacity: 0.4 + a * 0.6,
                    transform: `scale(${0.85 + a * 0.15})`,
                  }}
                />
              );
            })}
          </div>
          <div style={{ fontSize: 44, color: "#91a1bc", padding: "0 12px" }}>
            →
          </div>
          <div
            style={{
              fontSize: 112,
              fontWeight: 500,
              letterSpacing: "-.06em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {Math.round(61 + 18 * gain)}
            <span style={{ fontSize: 60 }}>%</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 43,
            height: 5,
            background: "#dce4f1",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: "100%",
              background: C.blue,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 27,
            fontSize: 26,
            color: "#65718a",
          }}
        >
          <span>Reflective surfaces · Maya</span>
          <span style={{ color: gain > 0.5 ? C.green : "#65718a" }}>
            {gain > 0.5 ? "+18 percentage points" : "Baseline 61%"}
          </span>
        </div>
      </Lift>
    </Ground>
  );
}

export function ReturnsScene() {
  const f = useCurrentFrame();
  const p = smooth(f, 19, 56);
  return (
    <Ground>
      <Kinetic
        text="Every entry stake comes back."
        at={0}
        top={212}
        size={76}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 365,
          textAlign: "center",
          fontSize: 29,
          color: "#526385",
          ...travel(f, 10, 30),
        }}
      >
        Including contributions with no measured gain.
      </div>
      <div
        style={{
          position: "absolute",
          left: 770,
          top: 475,
          width: 380,
          height: 110,
          ...panel,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 29,
          opacity: 1 - ease(f, 65, 18),
        }}
      >
        Refundable entry stakes
      </div>
      {DATASETS.map((d, i) => {
        const a = smooth(f, 20 + i * 8, 42);
        const endX = 345 + i * 410;
        return (
          <div key={d.creator}>
            <div
              style={{
                position: "absolute",
                left: 960 + (endX - 960) * a,
                top: 530 + 185 * a - Math.sin(a * Math.PI) * 100,
                filter:
                  a > 0.999 ? "none" : `blur(${Math.sin(a * Math.PI) * 5}px)`,
              }}
            >
              <Coin x={0} y={0} size={82} />
            </div>
            <div
              style={{
                position: "absolute",
                left: endX - 150,
                top: 805,
                width: 300,
                textAlign: "center",
                ...travel(f, 35 + i * 8, 35),
              }}
            >
              <div style={{ fontSize: 33, fontWeight: 500 }}>{d.creator}</div>
              <div style={{ fontSize: 26, color: "#476b55", marginTop: 15 }}>
                0.1 SOL returned
              </div>
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 975,
          textAlign: "center",
          fontSize: 25,
          color: "#526385",
          opacity: p,
        }}
      >
        Rewards recognize impact. Entry stakes are refunded.
      </div>
    </Ground>
  );
}

export function EndScene() {
  const f = useCurrentFrame();
  const p = ease(f, 4, 35);
  return (
    <Ground>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          opacity: p,
          filter: `blur(${(1 - p) * 15}px)`,
          transform: `translateY(${(1 - p) * 75}px) scale(${0.96 + p * 0.04})`,
        }}
      >
        <Wordmark size={118} />
        <span style={{ fontSize: 64, fontWeight: 300, color: "#7486a8" }}>
          ×
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <Mark size={99} />
          <span
            style={{ fontSize: 104, fontWeight: 500, letterSpacing: "-.05em" }}
          >
            Solana
          </span>
        </div>
      </div>
      <Kinetic text="Better data. Better models." at={25} top={555} size={65} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 708,
          textAlign: "center",
          fontSize: 31,
          color: "#526385",
          ...travel(f, 47, 45),
        }}
      >
        Crowd-curated training data. Rewards for impact.
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 816,
          display: "flex",
          justifyContent: "center",
          gap: 35,
          fontSize: 25,
          color: "#526385",
          ...travel(f, 60, 30),
        }}
      >
        <span>Robotics</span>
        <span>·</span>
        <span>Vision</span>
        <span>·</span>
        <span>LLMs</span>
      </div>
    </Ground>
  );
}
