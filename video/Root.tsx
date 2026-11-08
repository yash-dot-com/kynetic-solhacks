import { KyneticStoryboard } from "./kynetic/storyboard";
import { Composition } from "remotion";
import { DURATION, FPS, HEIGHT, KyneticFilm, WIDTH } from "./kynetic/Film";

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="KyneticStoryboard"
        component={KyneticStoryboard}
        width={3792}
        height={3490}
        fps={30}
        durationInFrames={1}
      />
      <Composition
        id="KyneticHackathon"
        component={KyneticFilm}
        width={WIDTH}
        height={HEIGHT}
        fps={FPS}
        durationInFrames={DURATION}
      />
    </>
  );
}
