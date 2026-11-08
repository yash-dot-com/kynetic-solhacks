import {
  createContext,
  useContext,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "./theme";
import { clamp } from "./primitives";

const BeatLength = createContext(100000);

export const GROUND = "#bdcdf0";
export const ease = (f: number, start = 0, duration = 24) =>
  interpolate(f, [start, start + duration], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.18, 0.9, 0.24, 1),
  });
export const smooth = (f: number, start = 0, duration = 24) =>
  interpolate(f, [start, start + duration], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
export function travel(f: number, start = 0, distance = 110): CSSProperties {
  const p = ease(f, start, 27);
  return {
    opacity: ease(f, start, 11),
    transform: `translate3d(0,${(1 - p) * distance}px,0) scale(${0.98 + p * 0.02})`,
    filter: p > 0.999 ? "none" : `blur(${Math.pow(1 - p, 1.3) * 13}px)`,
  };
}
export function Ground({ children }: { children: ReactNode }) {
  return (
    <AbsoluteFill
      style={{
        background: GROUND,
        color: C.ink,
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      {children}
    </AbsoluteFill>
  );
}
export function Kinetic({
  text,
  at = 0,
  top = 445,
  size = 92,
  accent = -1,
  style,
}: {
  text: string;
  at?: number;
  top?: number;
  size?: number;
  accent?: number;
  style?: CSSProperties;
}) {
  const f = useCurrentFrame();
  const length = useContext(BeatLength);
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        top,
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        gap: size * 0.23,
        fontSize: size,
        fontWeight: 500,
        letterSpacing: "-.055em",
        lineHeight: 1.15,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {text.split(" ").map((word, i) => {
        const p = ease(f, at + i * 4, 25);
        const y = (i % 2 ? -1 : 1) * (62 + i * 17);
        const out = smooth(f, length - 10 + i * 2, 18);
        return (
          <span
            key={`${i}-${word}`}
            style={{
              display: "inline-block",
              opacity: ease(f, at + i * 4, 9) * (1 - out),
              transform: `translate3d(${(1 - p) * (i - 1) * 23 + out * (i - 1) * 90}px,${(1 - p) * y - out * (i % 2 ? 90 : -90)}px,0)`,
              filter:
                p > 0.999 && out < 0.001
                  ? "none"
                  : `blur(${(1 - p) * 12 + out * 14}px)`,
              color: i === accent ? C.blue : C.ink,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
export function Lift({
  children,
  at = 0,
  style,
}: {
  children: ReactNode;
  at?: number;
  style?: CSSProperties;
}) {
  const f = useCurrentFrame();
  // One deliberate overshoot, followed by a quiet settle; no looping bounce.
  const p = ease(f, at, 32);
  const settle = interpolate(
    f,
    [at, at + 15, at + 25, at + 39],
    [0.89, 1.025, 0.996, 1],
    clamp
  );
  return (
    <div
      style={{
        ...style,
        opacity: ease(f, at, 12),
        transform: `perspective(1800px) translate3d(0,${(1 - p) * 240}px,0) rotateX(${(1 - p) * 12}deg) scale(${settle})`,
        filter: p > 0.999 ? "none" : `blur(${Math.pow(1 - p, 1.4) * 14}px)`,
      }}
    >
      {children}
    </div>
  );
}
export function ShotTransition({
  children,
  frames,
  last = false,
}: {
  children: ReactNode;
  frames: number;
  last?: boolean;
}) {
  const f = useCurrentFrame();
  const enter = ease(f, 0, 15);
  const exit = last ? 0 : smooth(f, frames - 4, 18);
  return (
    <AbsoluteFill
      key={f}
      style={{
        opacity: enter * (1 - exit),
        transform: `translate3d(0,${(1 - enter) * 42 - exit * 65}px,0) scale(${1 - (1 - enter) * 0.015 + exit * 0.035})`,
        filter:
          enter > 0.999 && exit < 0.001
            ? "none"
            : `blur(${(1 - enter) * 9 + exit * 18}px)`,
      }}
    >
      <BeatLength.Provider value={last ? 100000 : frames}>
        {children}
      </BeatLength.Provider>
    </AbsoluteFill>
  );
}
