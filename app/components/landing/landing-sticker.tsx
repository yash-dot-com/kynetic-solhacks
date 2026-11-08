"use client";

import { useMemo } from "react";
import { brand, type Icon } from "../../stickers/fun";
import { Sticker } from "../../stickers/Sticker";
import { battery, camera, coins, folder, gift } from "../../stickers/icons";

const icons: Record<string, Icon> = { battery, camera, coins, folder, gift };

export function LandingSticker({
  name,
  label,
}: {
  name: keyof typeof icons;
  label: string;
}) {
  const palette = useMemo(() => brand("#91adff", "#4169e1"), []);
  return (
    <Sticker
      icon={icons[name]}
      palette={palette}
      label={label}
      replayOnHover
      style={{ width: "100%", height: "100%" }}
    />
  );
}
