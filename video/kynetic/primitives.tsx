import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { C, FONT } from "./theme";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
export const progress = (f: number, start = 0, length = 24) =>
  interpolate(f, [start, start + length], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
export const inStyle = (
  frame: number,
  from = 0,
  distance = 42
): CSSProperties => {
  const p = progress(frame, from, 24);
  return {
    opacity: p,
    transform: `translateY(${(1 - p) * distance}px)`,
    filter: p > 0.999 ? "none" : `blur(${(1 - p) * 9}px)`,
  };
};

export function Wordmark({
  size = 35,
  style,
}: {
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        fontFamily: FONT,
        fontSize: size,
        letterSpacing: "-.055em",
        fontWeight: 700,
        lineHeight: 1,
        ...style,
      }}
    >
      Kynetic<span style={{ color: C.blue }}>.</span>
    </div>
  );
}

export function SolanaBadge({
  large = false,
  style,
}: {
  large?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: large ? 26 : 16,
        background: C.ink,
        color: "white",
        padding: large ? "26px 38px" : "16px 24px",
        ...style,
      }}
    >
      <Img
        src={staticFile("video/assets/solana-mark.svg")}
        style={{
          width: large ? 68 : 40,
          height: large ? 58 : 35,
          objectFit: "contain",
        }}
      />
      <span
        style={{
          fontSize: large ? 46 : 28,
          fontWeight: 500,
          letterSpacing: "-.03em",
        }}
      >
        Built on Solana
      </span>
    </div>
  );
}

export function Frame({
  children,
  label,
  number,
  style,
}: {
  children: ReactNode;
  label?: string;
  number?: string;
  style?: CSSProperties;
}) {
  return (
    <AbsoluteFill
      style={{
        background: C.paper,
        fontFamily: FONT,
        color: C.ink,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          top: 48,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Wordmark />
        <div
          style={{
            display: "flex",
            gap: 18,
            alignItems: "center",
            fontSize: 23,
            color: C.muted,
          }}
        >
          <span>{label}</span>
          {number && (
            <span
              style={{
                background: C.light,
                padding: "9px 12px",
                color: C.ink,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {number}
            </span>
          )}
        </div>
      </div>
      {children}
    </AbsoluteFill>
  );
}

export function Heading({
  eyebrow,
  children,
  sub,
  left = 110,
  top = 145,
  width = 1700,
  size = 75,
}: {
  eyebrow?: string;
  children: ReactNode;
  sub?: string;
  left?: number;
  top?: number;
  width?: number;
  size?: number;
}) {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left, top, width, ...inStyle(f) }}>
      {eyebrow && (
        <div
          style={{
            fontSize: 23,
            textTransform: "uppercase",
            letterSpacing: ".09em",
            marginBottom: 20,
            color: C.muted,
          }}
        >
          {eyebrow}
        </div>
      )}
      <div
        style={{
          fontSize: size,
          lineHeight: 1.07,
          letterSpacing: "-.055em",
          fontWeight: 600,
        }}
      >
        {children}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 29,
            color: C.muted,
            marginTop: 24,
            lineHeight: 1.4,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

export function Coin({
  x,
  y,
  size = 100,
  scale = 1,
  opacity = 1,
}: {
  x: number;
  y: number;
  size?: number;
  scale?: number;
  opacity?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        transform: `scale(${scale})`,
        opacity,
        borderRadius: "50%",
        background: C.ink,
        boxShadow: "inset 0 -6px 0 #383838, inset 0 0 0 2px #555",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Img
        src={staticFile("video/assets/solana-mark.svg")}
        style={{
          width: size * 0.51,
          height: size * 0.44,
          objectFit: "contain",
        }}
      />
    </div>
  );
}

export function Check({
  color = C.ink,
  size = 32,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="m4 12 5 5L20 6" fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function FooterNote({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: 110,
        fontSize: 22,
        color: C.muted,
      }}
    >
      {children}
    </div>
  );
}
