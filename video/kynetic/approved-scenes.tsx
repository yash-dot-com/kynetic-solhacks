import { type ReactNode, type CSSProperties } from "react";
import {
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  Sequence,
} from "remotion";
import { C, FONT } from "./theme";
import { RosterGrant } from "@/components/snap-cn/roster-grant";
import { GatherLockup } from "@/components/snap-cn/gather-lockup";
import { GROUND, Ground, Lift, ease, smooth, travel } from "./motion";
import {
  Title,
  Copy,
  Logo,
  Coin,
  Arrow,
  Lock,
  UploadIcon,
  CheckIcon,
  FlowStep,
  SERIF,
  tile,
} from "./storyboard";
import { clamp } from "./primitives";

function Words({
  text,
  at = 0,
  style,
}: {
  text: string;
  at?: number;
  style?: CSSProperties;
}) {
  const f = useCurrentFrame();
  return (
    <>
      {text.split(" ").map((w, i) => {
        const p = ease(f, at + i * 3, 24);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              marginRight: ".2em",
              opacity: ease(f, at + i * 3, 10),
              transform: `translate3d(${(1 - p) * (i % 2 ? 20 : -20)}px,${(1 - p) * (i % 2 ? -42 : 55)}px,0)`,
              filter: p > 0.999 ? "none" : `blur(${(1 - p) * 12}px)`,
              ...style,
            }}
          >
            {w}
          </span>
        );
      })}
    </>
  );
}
function Head({
  text,
  top = 150,
  size = 120,
  at = 0,
  style,
}: {
  text: string;
  top?: number;
  size?: number;
  at?: number;
  style?: CSSProperties;
}) {
  return (
    <Title top={top} size={size} style={style}>
      <Words text={text} at={at} />
    </Title>
  );
}
function Reveal({
  at = 0,
  children,
  style,
}: {
  at?: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const f = useCurrentFrame();
  return <div style={{ ...style, ...travel(f, at, 65) }}>{children}</div>;
}
function Tick({ p = 1 }: { p?: number }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <path
        d="m5 16 8 8L28 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - p}
      />
    </svg>
  );
}
function Spinner() {
  const f = useCurrentFrame();
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 32 32"
      style={{ transform: `rotate(${f * 10}deg)` }}
    >
      <circle
        cx="16"
        cy="16"
        r="12"
        stroke="currentColor"
        opacity=".25"
        fill="none"
        strokeWidth="2.5"
      />
      <path
        d="M16 4a12 12 0 0 1 12 12"
        stroke="currentColor"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
const datasetRows = [
  [
    { name: "Object detection", role: "12,000 labelled images", initials: "▤" },
    { name: "Street scenes", role: "8,400 annotated frames", initials: "▤" },
    { name: "Product images", role: "32,000 labelled images", initials: "▤" },
    { name: "Document scans", role: "6,200 labelled pages", initials: "▤" },
  ],
  [
    { name: "Low-light images", role: "4,800 labelled images", initials: "▤" },
    { name: "Training examples", role: "24,000 examples", initials: "▤" },
    {
      name: "Reflective objects",
      role: "7,500 labelled images",
      initials: "▤",
    },
    { name: "Unusual angles", role: "3,600 labelled images", initials: "▤" },
  ],
  [
    { name: "Medical images", role: "18,000 labelled images", initials: "▤" },
    {
      name: "Navigation scenes",
      role: "9,200 annotated frames",
      initials: "▤",
    },
    { name: "Reasoning tasks", role: "16,000 examples", initials: "▤" },
    { name: "Warehouse scenes", role: "11,000 labelled images", initials: "▤" },
  ],
];

export function SpiralOpening() {
  return (
    <Ground>
      <Sequence
        from={0}
        layout="absolute-fill"
        width={1920}
        height={850}
        style={{ top: 230 }}
      >
        <RosterGrant
          rows={datasetRows}
          label="Buy datasets"
          fontFamily={FONT}
          accentColor="#294cc7"
          theme={{
            background: "transparent",
            secondary: "#d2ddf4",
            card: "#b2c3e8",
            foreground: C.ink,
            mutedForeground: "#526385",
            border: "#8fa7d6",
          }}
        />
      </Sequence>
      <Head text="Buying more data?" top={76} size={126} at={2} />
    </Ground>
  );
}
export function ModelQuestion() {
  const f = useCurrentFrame();
  const p = ease(f, 10, 58);
  return (
    <Ground>
      <Head text="Getting better models?" top={245} size={128} />
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
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - p}
        />
        <circle cx={1120 * p} cy={145 - 15 * p} r="9" fill={C.ink} />
      </svg>
      <Head
        text="Not always."
        top={750}
        size={108}
        at={32}
        style={{ color: "#294cc7", fontStyle: "italic" }}
      />
    </Ground>
  );
}
export function PayForImprovement() {
  return (
    <Ground>
      <Head text="Then pay for" top={275} size={108} />
      <Head
        text="improvement."
        top={405}
        size={170}
        at={16}
        style={{ color: "#294cc7", fontStyle: "italic" }}
      />
      <Copy top={690} style={travel(useCurrentFrame(), 34, 35)}>
        Reward data that improves your model.
      </Copy>
    </Ground>
  );
}
export function MeetKynetic() {
  const f = useCurrentFrame();
  const p = ease(f, 18, 35);
  return (
    <Ground>
      <Head text="Meet" top={290} size={105} at={3} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 440,
          textAlign: "center",
          opacity: p,
          transform: `translateY(${(1 - p) * 80}px) scale(${0.93 + p * 0.07})`,
          filter: p > 0.999 ? "none" : `blur(${(1 - p) * 17}px)`,
        }}
      >
        <Logo size={250} />
      </div>
    </Ground>
  );
}
export function SolanaStamp() {
  const f = useCurrentFrame();
  const p = ease(f, 0, 19);
  const settle = interpolate(f, [0, 9, 17, 25], [0.25, 1.12, 0.97, 1], clamp);
  return (
    <Ground>
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
        <div style={{ fontFamily: SERIF, fontSize: 126, ...travel(f, 25, 55) }}>
          <Words text="Built on" at={25} />
        </div>
        <Coin
          size={150}
          style={{
            opacity: p,
            transform: `rotate(${-10 - (1 - p) * 24}deg) scale(${settle})`,
            boxShadow: "inset 0 -7px 0 #3a3a3a, 9px 12px 0 #9eafd0",
          }}
        />
        <span
          style={{ fontFamily: SERIF, fontSize: 126, ...travel(f, 34, 55) }}
        >
          Solana
        </span>
      </div>
    </Ground>
  );
}
export function HostBounty() {
  const f = useCurrentFrame();
  const pending = f >= 75 && f < 100;
  const done = f >= 100;
  const press = 1 - Math.sin(smooth(f, 68, 12) * Math.PI) * 0.04;
  return (
    <Ground>
      <Head text="Host a data bounty." top={130} size={124} />
      <Lift
        at={9}
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
        <div style={{ fontSize: 28, color: "#526385", ...travel(f, 22, 26) }}>
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
          <Words text="Help our model spot shiny objects." at={30} />
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
          <div style={travel(f, 46, 35)}>
            <div style={{ fontSize: 26, color: "#526385", marginBottom: 12 }}>
              Bounty pool
            </div>
            <div
              style={{
                fontSize: 55,
                display: "flex",
                gap: 18,
                alignItems: "center",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <Img
                src={staticFile("video/assets/solana-mark.svg")}
                style={{ width: 48, height: 42 }}
              />
              {Math.round(12 * ease(f, 46, 24))} SOL
            </div>
          </div>
          <div
            style={{
              background: C.ink,
              color: "white",
              width: 310,
              height: 90,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              fontSize: 32,
              borderRadius: 16,
              transform: `scale(${press})`,
              opacity: ease(f, 49, 18),
            }}
          >
            {pending ? (
              <Spinner />
            ) : done ? (
              <Tick p={ease(f, 100, 15)} />
            ) : null}
            <span
              key={done ? 2 : pending ? 1 : 0}
              style={travel(f, done ? 100 : pending ? 75 : 49, 16)}
            >
              {done ? "Bounty funded" : pending ? "Funding" : "Fund bounty"}
            </span>
          </div>
        </div>
      </Lift>
    </Ground>
  );
}
export function StakeUpload() {
  const f = useCurrentFrame();
  const upload = smooth(f, 48, 43);
  const done = f >= 94;
  const transfer = smooth(f, 21, 26);
  return (
    <Ground>
      <Head text="Have the right data?" top={150} size={127} />
      <Reveal at={7}>
        <FlowStep x={440} y={380} label="Stake SOL">
          <div
            style={{
              transform: `translateX(${transfer * 90}px) scale(${1 - transfer * 0.25})`,
            }}
          >
            <Coin size={122} />
          </div>
        </FlowStep>
      </Reveal>
      <Reveal at={17}>
        <Arrow style={{ position: "absolute", left: 905, top: 453 }} />
      </Reveal>
      <Reveal at={24}>
        <FlowStep x={1130} y={380} label="Upload your dataset">
          <UploadIcon />
        </FlowStep>
      </Reveal>
      <div
        style={{
          position: "absolute",
          left: 1180,
          top: 525 + transfer * 230,
          opacity: Math.sin(transfer * Math.PI),
          transform: `scale(${0.65 - transfer * 0.4}) rotate(${transfer * 10}deg)`,
          width: 155,
          height: 194,
          overflow: "hidden",
          borderRadius: 9,
        }}
      >
        <Img
          src={staticFile("video/datasets/0.svg")}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
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
          overflow: "hidden",
          opacity: ease(f, 33, 15),
        }}
      >
        {done ? <Tick p={ease(f, 94, 15)} /> : <Spinner />}
        <span key={done ? 1 : 0} style={done ? travel(f, 94, 18) : undefined}>
          {done ? "Uploaded" : "Uploading"}
        </span>
        {!done && (
          <span
            style={{
              color: "#a7bff0",
              fontVariantNumeric: "tabular-nums",
              width: 76,
            }}
          >
            {Math.round(upload * 100)}%
          </span>
        )}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: `${upload * 100}%`,
            height: 4,
            background: "#a7bff0",
          }}
        />
      </div>
    </Ground>
  );
}
export function TrainEvaluate() {
  const f = useCurrentFrame();
  return (
    <Ground>
      <Head text="Let’s see what your data improves." top={150} size={120} />
      <Reveal at={7}>
        <FlowStep x={260} y={405} label="Fine-tune">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,19px)",
              gap: 7,
            }}
          >
            {Array.from({ length: 16 }, (_, i) => (
              <i
                key={i}
                style={{
                  width: 19,
                  height: 19,
                  borderRadius: 3,
                  background: C.blue,
                  opacity: 0.22 + 0.78 * ease(f, 14 + i * 2, 18),
                  transform: `scale(${0.6 + 0.4 * ease(f, 14 + i * 2, 18)})`,
                }}
              />
            ))}
          </div>
        </FlowStep>
      </Reveal>
      <Reveal at={30}>
        <Arrow style={{ position: "absolute", left: 680, top: 475 }} />
      </Reveal>
      <Reveal at={42}>
        <FlowStep x={805} y={405} label="Evaluate">
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle
              cx="45"
              cy="45"
              r="35"
              fill="none"
              stroke={C.ink}
              strokeWidth="4"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - ease(f, 44, 22)}
            />
            <path
              d="m25 45 13 13 26-28"
              fill="none"
              stroke={C.ink}
              strokeWidth="5"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - ease(f, 64, 18)}
            />
          </svg>
        </FlowStep>
      </Reveal>
      <Reveal at={67}>
        <Arrow style={{ position: "absolute", left: 1220, top: 475 }} />
      </Reveal>
      <Reveal at={80}>
        <FlowStep x={1350} y={405} label="Publish results">
          <svg width="130" height="105" viewBox="0 0 130 105">
            <path d="M5 95H125M5 95V5" stroke="#8299be" strokeWidth="2" />
            <path
              d="m9 81 29-14 28-9 26-25 28-18"
              stroke={C.blue}
              strokeWidth="5"
              fill="none"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - ease(f, 82, 28)}
            />
            <circle
              cx="120"
              cy="15"
              r="6"
              fill={C.blue}
              opacity={ease(f, 106, 10)}
            />
          </svg>
        </FlowStep>
      </Reveal>
    </Ground>
  );
}
export function WhySolana() {
  const f = useCurrentFrame();
  const pulse = smooth(f, 105, 42);
  const explanation: CSSProperties = {
    position: "absolute",
    top: 300,
    left: -65,
    width: 430,
    fontSize: 30,
    lineHeight: 1.45,
    color: "#526385",
  };
  return (
    <Ground>
      <Head text="Why Solana?" top={110} size={130} />
      <Copy top={280} style={travel(f, 9, 25)}>
        Solana handles the money.
      </Copy>
      <Reveal at={18}>
        <FlowStep x={250} y={380} label="Bounty escrow">
          <div style={{ position: "relative" }}>
            <Lock />
            <div
              style={{
                position: "absolute",
                left: 2,
                top: -80,
                opacity: 1 - ease(f, 36, 18),
                transform: `translateY(${ease(f, 20, 34) * 70}px)`,
              }}
            >
              <Coin size={72} />
            </div>
          </div>
          <div style={explanation}>
            Companies lock bounty funds.
          </div>
        </FlowStep>
      </Reveal>
      <Reveal at={47}>
        <FlowStep x={810} y={380} label="Entry stakes">
          <Coin size={112} />
          <div style={explanation}>
            Curators stake. Less spam.
          </div>
        </FlowStep>
      </Reveal>
      <Reveal at={77}>
        <FlowStep x={1370} y={380} label="SOL payouts">
          <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
            <Coin size={75} />
            <Arrow />
            <Coin size={75} style={{ opacity: ease(f, 105, 18) }} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 30 + pulse * 160,
              top: 75,
              opacity: Math.sin(pulse * Math.PI),
            }}
          >
            <Coin size={50} />
          </div>
          <div style={explanation}>
            Pay by impact. Low fees.
          </div>
        </FlowStep>
      </Reveal>
      <Copy
        top={920}
        style={{ ...travel(f, 105, 25), color: "#526385", fontSize: 28 }}
      >
        Training and evaluation stay off-chain.
      </Copy>
    </Ground>
  );
}
export function BetterOutro() {
  const f = useCurrentFrame();
  const words = ["data.", "models.", "rewards."];
  const step = Math.min(2, Math.floor(f / 30));
  const at = step * 30;
  const enter = ease(f, at, 14);
  const exit = smooth(f, at + 23, 8);
  const close = smooth(f, 88, 24);

  return (
    <Ground>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 330,
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          gap: 32,
          fontFamily: SERIF,
          fontSize: 160,
          letterSpacing: "-.025em",
          opacity: 1 - close,
          transform: `translateY(${-close * 60}px)`,
          filter: close < 0.001 ? "none" : `blur(${close * 14}px)`,
        }}
      >
        <span>Better</span>
        <span
          key={step}
          style={{
            fontStyle: "italic",
            color: "#294cc7",
            width: 550,
            opacity: enter * (1 - exit),
            transform: `translateY(${(1 - enter) * 80 - exit * 70}px)`,
            filter:
              enter > 0.999 && exit < 0.001
                ? "none"
                : `blur(${(1 - enter) * 13 + exit * 13}px)`,
          }}
        >
          {words[step]}
        </span>
      </div>
      <Sequence from={90} name="Solana coins gather into Kynetic">
        <GatherLockup
          images={Array.from({ length: 15 }, () =>
            staticFile("video/assets/solana-lockup-coin.svg")
          )}
          captions={[]}
          lines={[]}
          wordmark="Kynetic"
          logo={{ width: 1, height: 1, shapes: [] }}
          font={'"Instrument Serif", serif'}
          backdrop={GROUND}
          wordmarkColor={C.ink}
          speed={0.82}
        />
      </Sequence>
    </Ground>
  );
}
