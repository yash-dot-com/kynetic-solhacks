"use client";

import { Player } from "@remotion/player";
import {
  DURATION,
  FPS,
  HEIGHT,
  KyneticFilm,
  WIDTH,
} from "../../video/kynetic/Film";

export function FilmPlayer() {
  return (
    <Player
      component={KyneticFilm}
      durationInFrames={DURATION}
      fps={FPS}
      compositionWidth={WIDTH}
      compositionHeight={HEIGHT}
      controls
      clickToPlay
      doubleClickToFullscreen
      spaceKeyToPlayOrPause
      style={{ width: "100%", aspectRatio: "16 / 9", background: "#f7f6f4" }}
    />
  );
}
