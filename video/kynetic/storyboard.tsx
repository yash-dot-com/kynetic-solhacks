import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  continueRender,
  delayRender,
  cancelRender,
  staticFile,
} from "remotion";
import { C, DATASETS, FONT } from "./theme";
import { GROUND } from "./motion";
import { PerformanceGraph, Leaderboard } from "./graphs";

export const SERIF = "Instrument Serif";
const MUTED = "#526385";
export const tile = {
  background: "#d7e1f5",
  border: "1px solid #ffffff75",
  borderRadius: 26,
  boxShadow: "0 24px 55px -35px #233a6b66",
};
export function Title({
  children,
  top = 170,
  size = 120,
  style,
}: {
  children: ReactNode;
  top?: number;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        right: 100,
        top,
        textAlign: "center",
        fontFamily: SERIF,
        fontWeight: 400,
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: "-.025em",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
export function Copy({
  children,
  top,
  size = 37,
  style,
}: {
  children: ReactNode;
  top: number;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        right: 100,
        top,
        textAlign: "center",
        fontSize: size,
        lineHeight: 1.3,
        color: MUTED,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
export function Logo({ size = 195 }: { size?: number }) {
  return (
    <span
      style={{
        fontFamily: SERIF,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "-.035em",
      }}
    >
      Kynetic<span style={{ color: C.blue }}>.</span>
    </span>
  );
}
export function Coin({
  size = 112,
  style,
}: {
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: "50%",
        background: C.ink,
        display: "grid",
        placeItems: "center",
        boxShadow: "inset 0 -7px 0 #3a3a3a",
        ...style,
      }}
    >
      <Img
        src={staticFile("video/assets/solana-mark.svg")}
        style={{ width: size * 0.53, height: size * 0.46 }}
      />
    </div>
  );
}
export function Arrow({ style }: { style?: CSSProperties }) {
  return <div style={{ fontSize: 60, color: "#7089b0", ...style }}>→</div>;
}
export function Lock() {
  return (
    <svg width="86" height="95" viewBox="0 0 86 95">
      <path
        d="M24 40V26a19 19 0 0 1 38 0v14"
        fill="none"
        stroke={C.ink}
        strokeWidth="5"
      />
      <rect x="10" y="39" width="66" height="49" rx="10" fill={C.ink} />
      <circle cx="43" cy="60" r="5" fill={GROUND} />
      <path d="M43 63v10" stroke={GROUND} strokeWidth="4" />
    </svg>
  );
}
export function UploadIcon() {
  return (
    <svg width="92" height="92" viewBox="0 0 92 92">
      <path
        d="M46 65V15m-18 18 18-18 18 18M15 59v19h62V59"
        stroke={C.ink}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function ModelIcon() {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(4,19px)", gap: 7 }}
    >
      {Array.from({ length: 16 }, (_, i) => (
        <i
          key={i}
          style={{
            width: 19,
            height: 19,
            borderRadius: 3,
            background: C.blue,
            opacity: 0.45 + (i % 4) * 0.15,
          }}
        />
      ))}
    </div>
  );
}
export function CheckIcon() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90">
      <circle
        cx="45"
        cy="45"
        r="35"
        fill="none"
        stroke={C.ink}
        strokeWidth="4"
      />
      <path
        d="m25 45 13 13 26-28"
        stroke={C.ink}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function FlowStep({
  x,
  y,
  label,
  children,
  active = true,
}: {
  x: number;
  y: number;
  label: string;
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 300,
        textAlign: "center",
        opacity: active ? 1 : 0.4,
      }}
    >
      <div
        style={{
          height: 210,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
      <div style={{ fontSize: 35, marginTop: 25 }}>{label}</div>
    </div>
  );
}
function Shot({ index }: { index: number }) {
  if (index === 0)
    return (
      <>
        <Title top={135} size={136}>
          Buying more data?
        </Title>
        <Title
          top={310}
          size={94}
          style={{ fontStyle: "italic", color: MUTED }}
        >
          And spending more?
        </Title>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const a = -2.2 + i * 0.65;
          const depth = i / 6;
          const size = 220 + depth * 130;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 960 + Math.sin(a) * (430 - depth * 100) - size / 2,
                top: 660 + Math.cos(a) * 130 - depth * 35,
                width: size,
                height: size * 1.25,
                transform: `rotate(${-25 + i * 9}deg)`,
                ...tile,
                overflow: "hidden",
                boxShadow: "0 18px 38px -20px #263f6c66",
                opacity: 0.4 + depth * 0.6,
              }}
            >
              <Img
                src={staticFile(`video/datasets/${i}.svg`)}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          );
        })}
      </>
    );
  if (index === 1)
    return (
      <>
        <Title top={245} size={128}>
          Getting better models?
        </Title>
        <svg
          width="1120"
          height="220"
          style={{ position: "absolute", left: 400, top: 490 }}
        >
          <path
            d="M0 145C220 146 280 143 450 140S820 136 1120 130"
            fill="none"
            stroke={C.ink}
            strokeWidth="5"
          />
          <circle cx="1120" cy="130" r="9" fill={C.ink} />
        </svg>
        <Title
          top={750}
          size={108}
          style={{ color: "#294cc7", fontStyle: "italic" }}
        >
          Not always.
        </Title>
      </>
    );
  if (index === 2)
    return (
      <>
        <Title top={275} size={108}>
          Then pay for
        </Title>
        <Title
          top={405}
          size={170}
          style={{ color: "#294cc7", fontStyle: "italic" }}
        >
          improvement.
        </Title>
        <Copy top={690}>Reward data that improves your model.</Copy>
      </>
    );
  if (index === 3)
    return (
      <>
        <Title top={290} size={105}>
          Meet
        </Title>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 440,
            textAlign: "center",
          }}
        >
          <Logo size={250} />
        </div>
      </>
    );
  if (index === 4)
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 38,
        }}
      >
        <span style={{ fontFamily: SERIF, fontSize: 126 }}>Built on</span>
        <Coin
          size={150}
          style={{
            transform: "rotate(-10deg)",
            boxShadow: "inset 0 -7px 0 #3a3a3a, 9px 12px 0 #9eafd0",
          }}
        />
        <span style={{ fontFamily: SERIF, fontSize: 126 }}>Solana</span>
      </div>
    );
  if (index === 5)
    return (
      <>
        <Title top={130} size={124}>
          Host a data bounty.
        </Title>
        <div
          style={{
            position: "absolute",
            left: 430,
            top: 350,
            width: 1060,
            height: 525,
            ...tile,
            padding: 52,
          }}
        >
          <div style={{ fontSize: 28, color: MUTED }}>
            HOSTED BY A ROBOTICS TEAM
          </div>
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 72,
              lineHeight: 1.1,
              marginTop: 24,
              maxWidth: 880,
            }}
          >
            Help our model spot shiny objects.
          </div>
          <div
            style={{
              position: "absolute",
              left: 52,
              right: 52,
              bottom: 55,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 26, color: MUTED, marginBottom: 12 }}>
                Bounty pool
              </div>
              <div
                style={{
                  fontSize: 55,
                  display: "flex",
                  gap: 18,
                  alignItems: "center",
                }}
              >
                <Img
                  src={staticFile("video/assets/solana-mark.svg")}
                  style={{ width: 48, height: 42 }}
                />
                12 SOL
              </div>
            </div>
            <div
              style={{
                background: C.ink,
                color: "white",
                padding: "25px 37px",
                fontSize: 32,
                borderRadius: 16,
              }}
            >
              Fund bounty
            </div>
          </div>
        </div>
      </>
    );
  if (index === 6)
    return (
      <>
        <Title top={150} size={127}>
          Have the right data?
        </Title>
        <FlowStep x={440} y={380} label="Stake SOL">
          <Coin size={122} />
        </FlowStep>
        <Arrow style={{ position: "absolute", left: 905, top: 453 }} />
        <FlowStep x={1130} y={380} label="Upload your dataset">
          <UploadIcon />
        </FlowStep>
        <div
          style={{
            position: "absolute",
            left: 650,
            right: 650,
            top: 820,
            background: C.ink,
            borderRadius: 18,
            height: 100,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            fontSize: 34,
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            <circle
              cx="15"
              cy="15"
              r="12"
              stroke="#ffffff40"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M15 3a12 12 0 0 1 12 12"
              stroke="white"
              strokeWidth="3"
              fill="none"
            />
          </svg>
          Uploading <span style={{ color: "#a7bff0" }}>68%</span>
        </div>
      </>
    );
  if (index === 7)
    return (
      <>
        <Title top={150} size={120}>
          Let’s see what your data improves.
        </Title>
        <FlowStep x={260} y={405} label="Fine-tune">
          <ModelIcon />
        </FlowStep>
        <Arrow style={{ position: "absolute", left: 680, top: 475 }} />
        <FlowStep x={805} y={405} label="Evaluate">
          <CheckIcon />
        </FlowStep>
        <Arrow style={{ position: "absolute", left: 1220, top: 475 }} />
        <FlowStep x={1350} y={405} label="Publish results">
          <svg width="130" height="105" viewBox="0 0 130 105">
            <path d="M5 95H125M5 95V5" stroke="#8299be" strokeWidth="2" />
            <path
              d="m9 81 29-14 28-9 26-25 28-18"
              stroke={C.blue}
              strokeWidth="5"
              fill="none"
            />
            <circle cx="120" cy="15" r="6" fill={C.blue} />
          </svg>
        </FlowStep>
      </>
    );
  if (index === 8 || index === 9)
    return (
      <>
        <style>{`.board-chart [style*="top: 150px"] { visibility:hidden; }`}</style>
        <div className="board-chart" style={{ position: "absolute", inset: 0 }}>
          <Sequence from={-280} durationInFrames={1000} layout="none">
            {index === 8 ? <PerformanceGraph /> : <Leaderboard />}
          </Sequence>
        </div>
        <Title top={128} size={index === 8 ? 108 : 120}>
          {index === 8
            ? "Same model. Different datasets."
            : "More impact. More reward."}
        </Title>
      </>
    );
  if (index === 10)
    return (
      <>
        <Title top={145} size={130}>
          Why Solana?
        </Title>
        <FlowStep x={250} y={410} label="Lock the bounty">
          <Lock />
        </FlowStep>
        <FlowStep x={810} y={410} label="Stake to reduce spam">
          <Coin size={112} />
        </FlowStep>
        <FlowStep x={1370} y={410} label="Fast, low-cost payouts">
          <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
            <Coin size={75} />
            <Arrow />
            <Coin size={75} />
          </div>
        </FlowStep>
      </>
    );
  return (
    <>
      <Title top={205} size={153}>
        Better{" "}
        <span style={{ fontStyle: "italic", color: "#294cc7" }}>models.</span>
      </Title>
      <Copy top={425} size={31}>
        data → models → rewards
      </Copy>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 645,
          textAlign: "center",
        }}
      >
        <Logo size={201} />
      </div>
    </>
  );
}
const PLAN = [
  [
    "01",
    "00:00–00:04",
    "Spiral arrival",
    "Cards enter in a trailing spiral across the lower half.",
  ],
  [
    "02",
    "00:04–00:07",
    "Question → answer",
    "The line barely moves. “Not always” resolves in blue.",
  ],
  [
    "03",
    "00:07–00:10",
    "The alternative",
    "“Improvement” settles last, with a quick blur.",
  ],
  [
    "04",
    "00:10–00:13",
    "The introduction",
    "Large centered type; the whole name stays together.",
  ],
  [
    "05",
    "00:13–00:16",
    "Solana first",
    "Coin lands like a scrapbook cutout; words follow.",
  ],
  [
    "06",
    "00:16–00:21",
    "Host a bounty",
    "Host → plain-language objective → amount → fund.",
  ],
  [
    "07",
    "00:21–00:25",
    "Stake → upload",
    "Dataset enters the button. Uploading → Uploaded.",
  ],
  [
    "08",
    "00:25–00:29",
    "Fine-tune → evaluate",
    "One process in motion; labels replace extra paragraphs.",
  ],
  [
    "09",
    "00:29–00:39",
    "Parallel performance",
    "Keep all four curves, scores, and names synchronized.",
  ],
  [
    "10",
    "00:39–00:45",
    "Parallel rewards",
    "Gain bars and SOL rewards count up together.",
  ],
  [
    "11",
    "00:45–00:52",
    "Why Solana belongs",
    "Escrow → entry stakes → fast, low-cost payouts.",
  ],
  [
    "12",
    "00:52–00:58",
    "Word swap → logo",
    "Better data → models → rewards. Then Kynetic holds.",
  ],
];
export function KyneticStoryboard() {
  const [ready, setReady] = useState(false);
  const [handle] = useState(() => delayRender("Storyboard fonts"));
  useEffect(() => {
    let live = true;
    Promise.all(
      [
        [SERIF, "video/fonts/InstrumentSerif-Regular.ttf", "normal"],
        [SERIF, "video/fonts/InstrumentSerif-Italic.ttf", "italic"],
        [FONT, "video/fonts/Inter.ttf", "normal"],
      ].map(async ([family, file, style]) => {
        const face = new FontFace(family, `url(${staticFile(file)})`, {
          style,
          weight: family === FONT ? "100 900" : "400",
        });
        document.fonts.add(face);
        await face.load();
      })
    )
      .then(() => {
        if (live) {
          setReady(true);
          continueRender(handle);
        }
      })
      .catch(cancelRender);
    return () => {
      live = false;
    };
  }, [handle]);
  if (!ready) return null;
  return (
    <AbsoluteFill
      style={{
        background: "#111a2c",
        color: C.ink,
        fontFamily: FONT,
        padding: 48,
      }}
    >
      <div
        style={{
          height: 140,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          color: "#edf1fa",
        }}
      >
        <span style={{ fontFamily: SERIF, fontSize: 66 }}>
          Kynetic — film storyboard
        </span>
        <span style={{ fontSize: 25, color: "#a7b8d7" }}>
          58 seconds · Instrument Serif · 12 key frames
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1200px)",
          columnGap: 48,
          rowGap: 33,
        }}
      >
        {PLAN.map(([n, time, title, note], i) => (
          <div key={n} style={{ width: 1200 }}>
            <div
              style={{
                position: "relative",
                width: 1200,
                height: 675,
                overflow: "hidden",
                borderRadius: 12,
                background: GROUND,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 1920,
                  height: 1080,
                  transform: "scale(.625)",
                  transformOrigin: "0 0",
                  background: GROUND,
                  overflow: "hidden",
                }}
              >
                <Shot index={i} />
              </div>
            </div>
            <div
              style={{
                color: "#edf1fa",
                marginTop: 19,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 28,
              }}
            >
              <span>
                <span style={{ color: "#8da7d3", marginRight: 17 }}>{n}</span>
                {title}
              </span>
              <span
                style={{
                  color: "#a7b8d7",
                  fontVariantNumeric: "tabular-nums",
                  fontSize: 25,
                }}
              >
                {time}
              </span>
            </div>
            <div
              style={{
                color: "#a7b8d7",
                fontSize: 24,
                lineHeight: 1.4,
                marginTop: 10,
              }}
            >
              {note}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}
