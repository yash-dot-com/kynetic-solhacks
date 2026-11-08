"use client";
import { Sticker } from "../../stickers/Sticker";
import { graph, cloud, harness, robot } from "../../stickers/evaluation";
import { coins, folder } from "../../stickers/icons";
import {
  vault,
  dataset,
  improvement,
  rover,
  cloudHarness,
  payout,
  failure,
  score,
} from "../../stickers/marketplace";
const icons = {
  graph,
  cloud,
  harness,
  robot,
  coins,
  folder,
  vault,
  dataset,
  improvement,
  rover,
  cloudHarness,
  payout,
  failure,
  score,
};
const palette = {
  main: "#4166df",
  gold: "#7953dc",
  tint: "#e9e8f8",
  ok: "#52a99a",
  hot: "#cf6b7b",
  deep: "#7953dc",
  white: "#ffffff",
  grey: "#bdc5d2",
  paper: "#f3f5fa",
  ink: "#293246",
};
export function EvaluationSticker({
  name,
  className,
  offset = 0,
  idle = false,
}: {
  name: keyof typeof icons;
  className?: string;
  offset?: number;
  idle?: boolean;
}) {
  return (
    <Sticker
      icon={icons[name]}
      palette={palette}
      offset={offset}
      loop={idle}
      replayOnHover
      className={className}
      label={`${name} isometric illustration`}
    />
  );
}
