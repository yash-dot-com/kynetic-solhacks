"use client";

import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
} from "remotion";
import { SnapCnUIProvider } from "@/lib/snap-cn-ui";
import { FILM_THEME, FONT } from "./theme";
import { Leaderboard, PerformanceGraph } from "./graphs";
import {
  SpiralOpening,
  ModelQuestion,
  PayForImprovement,
  MeetKynetic,
  SolanaStamp,
  HostBounty,
  StakeUpload,
  TrainEvaluate,
  WhySolana,
  BetterOutro,
} from "./approved-scenes";
import { GROUND, ShotTransition } from "./motion";

export const FPS = 30;
export const DURATION = 58 * FPS;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const SHOTS = [
  { from: 0, to: 4, name: "Dataset roster and purchase", component: SpiralOpening },
  { from: 4, to: 7, name: "Getting better models?", component: ModelQuestion },
  {
    from: 7,
    to: 10,
    name: "Pay for improvement",
    component: PayForImprovement,
  },
  { from: 10, to: 13, name: "Meet Kynetic", component: MeetKynetic },
  { from: 13, to: 16, name: "Solana stamp", component: SolanaStamp },
  { from: 16, to: 21, name: "Host a bounty", component: HostBounty },
  { from: 21, to: 25, name: "Stake and upload", component: StakeUpload },
  {
    from: 25,
    to: 29,
    name: "Train, evaluate, publish",
    component: TrainEvaluate,
  },
  {
    from: 29,
    to: 39,
    name: "Parallel performance",
    component: PerformanceGraph,
  },
  { from: 39, to: 45, name: "Parallel rewards", component: Leaderboard },
  { from: 45, to: 52, name: "Why Solana", component: WhySolana },
  {
    from: 52,
    to: 58,
    name: "Better data, models, rewards",
    component: BetterOutro,
  },
] as const;

let fontPromise: Promise<FontFace[]> | undefined;
function ensureFont() {
  if (!fontPromise)
    fontPromise = Promise.all(
      [
        [FONT, "video/fonts/Inter.ttf", "normal"],
        [
          "Instrument Serif",
          "video/fonts/InstrumentSerif-Regular.ttf",
          "normal",
        ],
        [
          "Instrument Serif",
          "video/fonts/InstrumentSerif-Italic.ttf",
          "italic",
        ],
      ].map(async ([family, file, style]) => {
        const face = new FontFace(family, `url(${staticFile(file)})`, {
          style,
          weight: family === FONT ? "100 900" : "400",
        });
        document.fonts.add(face);
        return face.load();
      })
    );
  return fontPromise;
}

export function KyneticFilm() {
  const [ready, setReady] = useState(false);
  const [handle] = useState(() => delayRender("Load bundled Kynetic font"));
  useEffect(() => {
    let live = true;
    ensureFont()
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
  return (
    <AbsoluteFill style={{ background: GROUND, fontFamily: FONT }}>
      {ready && (
        <SnapCnUIProvider theme={FILM_THEME} mode="light">
          {SHOTS.map(({ from, to, name, component: Shot }, index) => (
            <Sequence
              key={from}
              from={from * FPS}
              durationInFrames={
                (to - from) * FPS + (index === SHOTS.length - 1 ? 0 : 14)
              }
              name={name}
            >
              <ShotTransition
                frames={(to - from) * FPS}
                last={index === SHOTS.length - 1}
              >
                <Shot />
              </ShotTransition>
            </Sequence>
          ))}
          <Audio
            src={staticFile("video/assets/score-master.wav")}
            volume={0.8}
          />
        </SnapCnUIProvider>
      )}
    </AbsoluteFill>
  );
}
