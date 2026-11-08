import { Crosshair, DoorOpen, Eye, Moon, Navigation, Plug } from "lucide-react";
import type { Challenge } from "@/app/lib/challenges/data";

const icons = {
  target: Crosshair,
  eye: Eye,
  navigation: Navigation,
  plug: Plug,
  moon: Moon,
  door: DoorOpen,
};

export function ChallengeIcon({ type }: { type: Challenge["icon"] }) {
  const Icon = icons[type];
  return (
    <span className="ui-icon-tile">
      <Icon aria-hidden="true" />
    </span>
  );
}
