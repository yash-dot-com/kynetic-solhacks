import { Img, staticFile, useCurrentFrame } from "remotion";
import { C } from "./theme";
import { Ground, Kinetic, ease, smooth, travel } from "./motion";

const stages = [
  "Upload dataset",
  "Uploading",
  "Uploaded",
  "Testing",
  "Evaluate",
  "Evaluation complete",
];
const starts = [0, 55, 110, 143, 198, 245];
export function DatasetFlow() {
  const f = useCurrentFrame();
  const index = starts.reduce((last, at, i) => (f >= at ? i : last), 0);
  const upload = smooth(f, 55, 51);
  const gather = smooth(f, 22, 32);
  const center = ease(f, 55, 50);
  const buttonX = 1170 - center * 210;
  const itemX = 620 + gather * 550;
  const itemScale = 1 - gather * 0.88;
  const press = 1 - Math.sin(smooth(f, 49, 12) * Math.PI) * 0.035;
  const done = index === 2 || index === 5;
  const busy = index === 1 || index === 3 || index === 4;
  return (
    <Ground>
      <Kinetic
        text={
          index < 3
            ? "Curate. Stake. Upload."
            : "Test the data. Measure the gain."
        }
        at={index < 3 ? 0 : 143}
        top={190}
        size={76}
      />
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 28,
          color: "#526385",
          ...travel(f, 10, 30),
        }}
      >
        Reflective surfaces · Maya · 0.1 SOL refundable stake
      </div>
      <div
        style={{
          position: "absolute",
          left: itemX - 175,
          top: 420 + gather * 165,
          width: 350,
          height: 390,
          opacity: (1 - gather) * ease(f, 0, 15),
          transform: `scale(${itemScale}) rotate(${gather * 8}deg)`,
          filter:
            gather > 0 && gather < 1
              ? `blur(${Math.sin(gather * Math.PI) * 5}px)`
              : "none",
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 20px 45px -25px #263f6c60",
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
          left: buttonX - 325,
          top: 545,
          width: 650,
          height: 120,
          borderRadius: 22,
          background: done ? "#233a60" : C.ink,
          color: "white",
          transform: `scale(${press})`,
          boxShadow: "0 14px 25px -17px #122c5b80",
          overflow: "hidden",
          opacity: ease(f, 9, 18),
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            fontSize: 39,
            letterSpacing: "-.035em",
          }}
        >
          {busy ? (
            <svg
              width="34"
              height="34"
              viewBox="0 0 40 40"
              style={{ transform: `rotate(${f * 8}deg)` }}
            >
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="#ffffff30"
                strokeWidth="3"
              />
              <path
                d="M20 4A16 16 0 0 1 36 20"
                fill="none"
                stroke="#b4cdfa"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          ) : done ? (
            <svg width="35" height="35" viewBox="0 0 30 30">
              <path
                d="m5 15 7 7L26 8"
                fill="none"
                stroke="#c3d7fb"
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - ease(f, starts[index], 15)}
              />
            </svg>
          ) : (
            <span style={{ fontSize: 40 }}>↑</span>
          )}
          <span key={index} style={travel(f, starts[index], 20)}>
            {stages[index]}
          </span>
          {index === 1 && (
            <span
              style={{
                fontSize: 26,
                color: "#b4cdfa",
                width: 64,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {Math.round(upload * 100)}%
            </span>
          )}
        </div>
        {index === 1 && (
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              height: 4,
              width: `${upload * 100}%`,
              background: "#b4cdfa",
            }}
          />
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 744,
          textAlign: "center",
          fontSize: 28,
          color: "#526385",
          ...travel(f, 113, 25),
        }}
      >
        {index === 2
          ? "1,250 labelled images uploaded"
          : index === 3
            ? "Fine-tuning the same base model"
            : index >= 4
              ? "Evaluating on the same held-out benchmark"
              : ""}
      </div>
      <div
        style={{
          position: "absolute",
          left: 540,
          right: 540,
          top: 860,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          ...travel(f, 143, 25),
        }}
      >
        {["Dataset", "Fine-tune", "Test", "Evaluate"].map((name, i) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 24,
              color: i <= index - 2 ? C.ink : "#7589ac",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 8,
                background: i <= index - 2 ? C.blue : "#92a6c9",
              }}
            />
            {name}
          </div>
        ))}
      </div>
    </Ground>
  );
}
